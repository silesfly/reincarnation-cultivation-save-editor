#!/usr/bin/env python3
"""빌드 스크립트."""

from __future__ import annotations

import argparse
import os
import re
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SRC_DIR = ROOT / "src"
EDITOR_PAGE = SRC_DIR / "editor-page.html"
DIST_DIR = ROOT / "dist"
OUTPUT_NAME = "ReincarnationCultivationSaveEditor-v1.0.1.html"
OUTPUT_PATH = DIST_DIR / OUTPUT_NAME

SCRIPT_ORDER = [
    "catalog-data.js",
    "lrs-codec.js",
    "editor-core.js",
    "editor-ui.js",
]

MAX_SIZE = 10 * 1024 * 1024

RE_SCRIPT_SRC = re.compile(r"<script\b[^>]*\bsrc\s*=", re.IGNORECASE)
RE_INLINE_SCRIPT_TAG = re.compile(
    r"<script\b(?P<attrs>[^>]*)>(?P<body>.*?)</script\s*>",
    re.IGNORECASE | re.DOTALL,
)
RE_SRC_ATTR = re.compile(
    r"\bsrc\s*=\s*(?P<quote>['\"]?)(?P<src>[^'\"\s>]+)(?P=quote)",
    re.IGNORECASE,
)
RE_CSP_META = re.compile(
    r"<meta\b[^>]*\bhttp-equiv\s*=\s*(?P<q1>['\"]?)Content-Security-Policy(?P=q1)[^>]*>",
    re.IGNORECASE,
)
RE_CONTENT_ATTR = re.compile(
    r"\bcontent\s*=\s*(?P<quote>['\"])(?P<content>.*?)(?P=quote)",
    re.IGNORECASE | re.DOTALL,
)
RE_EXTERNAL_URL = re.compile(r"https?://|ftp://|wss?://|//[a-z0-9-]", re.IGNORECASE)
RE_HANZI = re.compile(r"[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\U00020000-\U0002ebef]")
RE_KANA = re.compile(r"[\u3040-\u309f\u30a0-\u30ff]")
RE_DANGEROUS = re.compile(r"innerHTML|outerHTML|eval\(|new Function\(", re.IGNORECASE)


class BuildError(RuntimeError):
    """빌드 오류."""


def _read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _insert_csp_if_missing(html: str) -> str:
    if RE_CSP_META.search(html):
        return html

    meta = (
        '<meta http-equiv="Content-Security-Policy" '
        'content="default-src \'none\'; connect-src \'none\'">'
    )
    head_match = re.search(r"<head\b[^>]*>", html, re.IGNORECASE)
    if head_match:
        pos = head_match.end()
        return html[:pos] + "\n" + meta + html[pos:]

    html_match = re.search(r"<html\b[^>]*>", html, re.IGNORECASE)
    if html_match:
        pos = html_match.end()
        return html[:pos] + "\n<head>\n" + meta + "\n</head>" + html[pos:]

    return meta + "\n" + html


def _inline_scripts(html: str) -> str:
    sources: dict[str, str] = {}
    for name in SCRIPT_ORDER:
        path = SRC_DIR / name
        if not path.is_file():
            raise BuildError(f"스크립트 파일을 찾을 수 없습니다: {path}")
        sources[name] = _read_text(path)

    inlined: set[str] = set()

    def replace_tag(match: re.Match[str]) -> str:
        attrs = match.group("attrs")
        src_match = RE_SRC_ATTR.search(attrs)
        if not src_match:
            return match.group(0)

        raw_src = src_match.group("src").strip()
        name = Path(raw_src).name

        if name not in sources:
            return match.group(0)

        if name in inlined:
            raise BuildError(f"스크립트가 중복 삽입되었습니다: {name}")

        inlined.add(name)
        body = sources[name]
        return f"<script>\n{body}\n</script>"

    html = RE_INLINE_SCRIPT_TAG.sub(replace_tag, html)

    missing = [name for name in SCRIPT_ORDER if name not in inlined]
    if missing:
        raise BuildError("인라인할 스크립트 태그를 찾지 못했습니다: " + ", ".join(missing))

    return html


def _get_csp_content(html: str) -> str | None:
    for meta_match in RE_CSP_META.finditer(html):
        tag = meta_match.group(0)
        content_match = RE_CONTENT_ATTR.search(tag)
        if content_match:
            return content_match.group("content")
    return None


def _validate_html(html: str, *, check_size: bool = True) -> None:
    data = html.encode("utf-8")
    size = len(data)

    if check_size:
        if not (0 < size < MAX_SIZE):
            raise BuildError(f"출력 크기가 허용 범위를 벗어났습니다: {size} 바이트")

    if RE_SCRIPT_SRC.search(html):
        raise BuildError("외부 스크립트 태그가 남아 있습니다.")

    csp = _get_csp_content(html)
    if csp is None:
        raise BuildError("Content-Security-Policy 메타 태그가 없습니다.")

    normalized_csp = " ".join(csp.lower().split())
    if "default-src 'none'" not in normalized_csp:
        raise BuildError("CSP에 default-src 'none'이 없습니다.")
    if "connect-src 'none'" not in normalized_csp:
        raise BuildError("CSP에 connect-src 'none'이 없습니다.")

    if RE_EXTERNAL_URL.search(html):
        raise BuildError("외부 URL 문자열이 남아 있습니다.")

    if RE_HANZI.search(html):
        raise BuildError("한자가 남아 있습니다.")

    if RE_KANA.search(html):
        raise BuildError("가나 문자가 남아 있습니다.")

    if RE_DANGEROUS.search(html):
        raise BuildError("위험한 문자열이 남아 있습니다.")


def _atomic_write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    data = text.encode("utf-8")
    fd, tmp_name = tempfile.mkstemp(prefix=path.name + ".", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(fd, "wb") as handle:
            handle.write(data)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(tmp_name, path)
    except BaseException:
        try:
            os.unlink(tmp_name)
        except FileNotFoundError:
            pass
        raise


def build() -> str:
    if not EDITOR_PAGE.is_file():
        raise BuildError(f"편집기 페이지를 찾을 수 없습니다: {EDITOR_PAGE}")

    html = _read_text(EDITOR_PAGE)
    html = _insert_csp_if_missing(html)
    html = _inline_scripts(html)
    _validate_html(html)
    return html


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="저장 편집기 단일 HTML 파일을 생성합니다.")
    parser.add_argument("--check", action="store_true", help="생성 결과가 현재 파일과 같은지 확인합니다.")
    args = parser.parse_args(argv)

    try:
        html = build()
    except BuildError as exc:
        print(f"오류: {exc}", file=sys.stderr)
        return 1

    if args.check:
        if not OUTPUT_PATH.is_file():
            print(f"오류: 출력 파일이 없습니다: {OUTPUT_PATH}", file=sys.stderr)
            return 1

        current = OUTPUT_PATH.read_text(encoding="utf-8")
        if current != html:
            print("오류: 출력 파일이 최신 상태가 아닙니다.", file=sys.stderr)
            return 1

        try:
            _validate_html(current)
        except BuildError as exc:
            print(f"오류: {exc}", file=sys.stderr)
            return 1

        print("확인 완료: 출력 파일이 최신 상태입니다.")
        return 0

    try:
        _atomic_write(OUTPUT_PATH, html)
    except OSError as exc:
        print(f"오류: 파일을 저장하지 못했습니다: {exc}", file=sys.stderr)
        return 1

    print(f"생성 완료: {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
