# 윤회수선전 세이브 에디터 (v1.0.0)

《윤회수선전(Re-xiuxian Legend)》용 100% 오프라인·무의존 세이브 에디터입니다.

## 제공 형태 (3-Surface)

1. **Surface A — 단일 오프라인 HTML (`dist/ReincarnationCultivationSaveEditor-v1.0.0.html`)**
   - 외부 네트워크 연결(`connect-src 'none'`), 외부 스크립트, 한자/가나 노출이 없는 순수 한국어 단일 파일입니다.
   - `GameData` 폴더 내 JSON 묶음 또는 단일 `.json` 파일을 열어 편집한 뒤 내려받을 수 있습니다.
2. **Surface B — Python 3 표준 라이브러리 CLI & 로컬 서버 (`lrs_editor.py`)**
   - `inspect`, `validate`, `presets`, `edit`, `serve`, `--self-test` 명령을 지원합니다.
   - 루프백(`127.0.0.1`) 서버는 `Host`, `Origin`/`Sec-Fetch-Site`, 랜덤 `X-Lrs-Token` 헤더를 검증합니다.
3. **Surface C — Windows 독립 실행 파일 (`ReincarnationCultivationSaveEditor-v1.0.0.exe`)**
   - `.NET Framework 4.8` WinForms + `Microsoft.Web.WebView2` 기반 단일 실행 파일로 로컬 저장 폴더에 직접 연결됩니다.
   - 배포 시 같은 폴더에 `Microsoft.Web.WebView2.Core.dll`, `Microsoft.Web.WebView2.WinForms.dll`, `WebView2Loader.dll`을 함께 두세요.

## 게임 저장 경로 및 형식

- 기본 저장 폴더 (Windows): `%USERPROFILE%\AppData\LocalLow\Collider Studio\Re-xiuxian Legend\GameData\`
- 저장 형식: UTF-8 JSON (별도 암호화 없음)
- 주요 지원 파일:
  - `GameData.json` (환생석, 전생·클리어·실패 횟수, 난이도/편의 옵션)
  - `NewPlayerInfo.json` (이름, 경지, 영석, 기연, 인연 호감도, 생명/영력/수위, 전투·연단·연기 능력치, 영근)
  - `GameEventInfo.json` (현재 연도, 지역, 수련/연단/연기/연체 횟수)
  - `PlayerBagDataInfo.json` (가방 보유 아이템 목록 및 수량)
  - `PlayerEquipDataInfo.json` (무기/의복/신발 장비 3슬롯)
  - `PlayerFaBaoDataInfo.json` (개방된 법보 슬롯 수 및 장착 법보)
  - `PlayerSkillDataInfo.json` (보유 법술 목록 및 `existedSkillIDs` 동기화)
  - `MDTalentData.json` (윤회 특전 및 단계)
  - `BSTalentData.json` (선천 자질 목록)
  - `LingGenData.json` (오행 기반/추가 영근 수치)
  - `EndingData.json` (해금된 엔딩 목록)
  - `AchievementData.json` (업적 활성화 사전)
  - 기타 동반 파일(`GameEventModelOutSideInfo.json`, `DanYaoEffectInfo.json`, `ReleaseQueueInfo.json`, `BattlePlayerData.json`, `SteamAchievementData.json`) 무손실 보존

## 사용 방법

### Windows 독립 실행기
1. 릴리스 압축(`ReincarnationCultivationSaveEditor-v1.0.0-Windows.zip`)을 원하는 폴더에 풉니다.
2. 게임을 완전히 종료한 뒤 `ReincarnationCultivationSaveEditor-v1.0.0.exe`를 실행합니다.
3. 기본 경로가 자동 감지되지 않으면 `저장 폴더 불러오기` 또는 `파일/폴더 열기`로 `GameData` 폴더나 개별 `.json` 파일을 여세요.
4. 수정 후 `저장/내려받기`를 누르면 `.lrs_backups` 아래에 SHA-256 검증 백업(최대 20개)을 자동 생성한 뒤 원자적으로 저장합니다.

### Python CLI / 로컬 웹 서버
```bash
# 저장 폴더 요약 조회
python3 lrs_editor.py inspect /path/to/GameData

# 무결성 검증
python3 lrs_editor.py validate /path/to/GameData

# 프리셋 확인 및 적용 (dry-run 선행 가능)
python3 lrs_editor.py presets
python3 lrs_editor.py edit /path/to/GameData --preset starter_boost --dry-run
python3 lrs_editor.py edit /path/to/GameData --preset starter_boost

# 로컬 브라우저 연동 서버 실행
python3 lrs_editor.py serve /path/to/GameData
```

### 단일 HTML 빌드 및 검증
```bash
python3 tools/extract_catalog.py --check-only
python3 build.py
python3 build.py --check
node tests/test_editor.cjs
python3 -W error -B -m unittest discover -s tests -v
node tests/test_playwright_e2e.cjs
```

## 안전 원칙

- 게임 프로세스 실행 중에는 저장·복원을 차단합니다.
- UNC 네트워크 경로, NTFS 대체 데이터 스트림(ADS), Windows 예약 장치 이름, 심볼릭 링크/정션/다중 하드링크를 거부합니다.
- 모든 저장 작업은 임시 파일 기록 및 플러시 후 원자적으로 교체하며, 기존 상태를 최대 20세대까지 자동 백업합니다.

## 라이선스

[MIT License](LICENSE) · WebView2 재배포 라이선스는 `WebView2-LICENSE.txt`를 참고하세요.
