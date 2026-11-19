(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LrsCatalogData = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LrsCatalogData = {
  "items": [
    {
      "id": 1,
      "name": "영석",
      "desc": "",
      "icon": "",
      "type": 0,
      "quality": 1,
      "stack": 0,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [],
      "value1": [],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "영석"
    },
    {
      "id": 2,
      "name": "윤회점",
      "desc": "",
      "icon": "",
      "type": 100,
      "quality": 1,
      "stack": 0,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [],
      "value1": [],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": ""
    },
    {
      "id": 11000,
      "name": "차품 요수 내단",
      "desc": "복용 후, 매번 수련 시 추가로 수위 1 증가, 1회 수련으로 연화 필요",
      "icon": "pill_01",
      "type": 1,
      "quality": 1,
      "stack": 99,
      "price": 40,
      "time": 1,
      "timeReduce": 3,
      "condition": 1,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 2,
      "typeLabel": "단약"
    },
    {
      "id": 12000,
      "name": "하품 요수 내단",
      "desc": "복용 후, 매번 수련 시 추가로 수위 1 증가, 2회 수련으로 연화 필요",
      "icon": "pill_01",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 60,
      "time": 2,
      "timeReduce": 3,
      "condition": 1,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 2,
      "typeLabel": "단약"
    },
    {
      "id": 13000,
      "name": "중품 요수 내단",
      "desc": "복용 후, 매번 수련 시 추가로 수위 1 증가, 3회 수련으로 연화 필요",
      "icon": "pill_01",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 70,
      "time": 3,
      "timeReduce": 3,
      "condition": 1,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 2,
      "typeLabel": "단약"
    },
    {
      "id": 14000,
      "name": "상품 요수 내단",
      "desc": "복용 후, 매번 수련 시 추가로 수위 2 증가, 2회 수련으로 연화 필요",
      "icon": "pill_01",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 120,
      "time": 2,
      "timeReduce": 3,
      "condition": 1,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 2,
      "typeLabel": "단약"
    },
    {
      "id": 15000,
      "name": "극품 요수 내단",
      "desc": "복용 후, 매번 수련 시 추가로 수위 2 증가, 3회 수련으로 연화 필요",
      "icon": "pill_01",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 140,
      "time": 3,
      "timeReduce": 3,
      "condition": 1,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 2,
      "typeLabel": "단약"
    },
    {
      "id": 12001,
      "name": "흉호 내단",
      "desc": "복용 후, 매번 수련 시 추가로 수위 1과 공격 1 증가, 3회 수련으로 연화 필요",
      "icon": "pill_101",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 90,
      "time": 3,
      "timeReduce": 3,
      "condition": 1,
      "effect": [
        1,
        1
      ],
      "value1": [
        15,
        22
      ],
      "value2": [
        1,
        1
      ],
      "value3": [],
      "eat": 2,
      "typeLabel": "단약"
    },
    {
      "id": 13001,
      "name": "수사 금단",
      "desc": "연화 후, 수위 +2",
      "icon": "pill_102",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 14001,
      "name": "췌백단",
      "desc": "복용 후, 생명 +100, 영력 +20",
      "icon": "pill_103",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1,
        1
      ],
      "value1": [
        21,
        12
      ],
      "value2": [
        100,
        20
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 14002,
      "name": "노산삼",
      "desc": "식용 후, 수명 +6, 체백 +3",
      "icon": "special_laoshanshen",
      "type": 11,
      "quality": 4,
      "stack": 99,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1,
        1
      ],
      "value1": [
        14,
        11
      ],
      "value2": [
        6,
        3
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "영지"
    },
    {
      "id": 15001,
      "name": "낙성 오행단",
      "desc": "복용 후, 수명 10년 감소, 생명 최대 상한 영구 30% 감소, 그러나 전 영근 +2, 치명타율 +10%",
      "icon": "pill_104",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2
      ],
      "value1": [
        31,
        32,
        33,
        34,
        35,
        24,
        14,
        21
      ],
      "value2": [
        2,
        2,
        2,
        2,
        2,
        10,
        -10,
        -30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15002,
      "name": "역천단",
      "desc": "복용 후, 생명 +20%, 공격 +20%, 속도 +20%, 1년 지속",
      "icon": "pill_105",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 120,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2,
        2,
        2
      ],
      "value1": [
        21,
        22,
        23
      ],
      "value2": [
        20,
        20,
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15003,
      "name": "오도과",
      "desc": "식용 후, 오성 +10, 수명 +10",
      "icon": "special_15003",
      "type": 11,
      "quality": 5,
      "stack": 99,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1,
        1
      ],
      "value1": [
        13,
        14
      ],
      "value2": [
        10,
        10
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "영지"
    },
    {
      "id": 15004,
      "name": "진룡 정혈",
      "desc": "연화 후, 생명 상한 20% 상승",
      "icon": "special_15004",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15005,
      "name": "삼식 도과",
      "desc": "식용 후, 매번 수련 시 추가로 생명 100과 영력 30 증가, 1회 수련으로 연화 필요",
      "icon": "special_15005",
      "type": 11,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 1,
      "timeReduce": 3,
      "condition": 1,
      "effect": [
        1,
        1
      ],
      "value1": [
        21,
        12
      ],
      "value2": [
        100,
        30
      ],
      "value3": [],
      "eat": 2,
      "typeLabel": "영지"
    },
    {
      "id": 11101,
      "name": "하품 세수단",
      "desc": "복용 후 생명 +40",
      "icon": "pill_02",
      "type": 1,
      "quality": 1,
      "stack": 99,
      "price": 20,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        21
      ],
      "value2": [
        40
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 11102,
      "name": "하품 용호단",
      "desc": "복용 후 공격 +2",
      "icon": "pill_03",
      "type": 1,
      "quality": 1,
      "stack": 99,
      "price": 20,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        22
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 11103,
      "name": "하품 청풍단",
      "desc": "복용 후 속도 +2",
      "icon": "pill_04",
      "type": 1,
      "quality": 1,
      "stack": 99,
      "price": 20,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        23
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 11104,
      "name": "하품 연혈단",
      "desc": "복용 후 수위 +1, 그러나 수명 -4",
      "icon": "pill_05",
      "type": 1,
      "quality": 1,
      "stack": 99,
      "price": 20,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1,
        1
      ],
      "value1": [
        15,
        14
      ],
      "value2": [
        1,
        -4
      ],
      "value3": [],
      "eat": 3,
      "typeLabel": "단약"
    },
    {
      "id": 11201,
      "name": "하품 호명단",
      "desc": "복용 후 생명 10% 증가, 1년 지속",
      "icon": "pill_20",
      "type": 1,
      "quality": 1,
      "stack": 99,
      "price": 20,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 11202,
      "name": "하품 대력단",
      "desc": "복용 후 공격 10% 증가, 1년 지속",
      "icon": "pill_21",
      "type": 1,
      "quality": 1,
      "stack": 99,
      "price": 20,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 11203,
      "name": "하품 청허단",
      "desc": "복용 후 속도 10% 증가, 1년 지속",
      "icon": "pill_22",
      "type": 1,
      "quality": 1,
      "stack": 99,
      "price": 20,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 12101,
      "name": "중품 세수단",
      "desc": "복용 후 생명 +80",
      "icon": "pill_02",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        21
      ],
      "value2": [
        80
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 12102,
      "name": "중품 용호단",
      "desc": "복용 후 공격 +4",
      "icon": "pill_03",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        22
      ],
      "value2": [
        4
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 12103,
      "name": "중품 청풍단",
      "desc": "복용 후 속도 +4",
      "icon": "pill_04",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        23
      ],
      "value2": [
        4
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 12104,
      "name": "하품 근골단",
      "desc": "복용 후 체백 +1",
      "icon": "pill_06",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 30,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        11
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 12105,
      "name": "하품 혼원단",
      "desc": "복용 후 영력 +20",
      "icon": "pill_07",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        12
      ],
      "value2": [
        20
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 12106,
      "name": "하품 요상단",
      "desc": "복용 후 즉시 현재 생명력 상한의 30% 회복",
      "icon": "pill_12",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        61
      ],
      "value2": [
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 12107,
      "name": "하품 회원단",
      "desc": "복용 후 즉시 현재 영력 상한의 30% 영력 회복",
      "icon": "pill_13",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        62
      ],
      "value2": [
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 12201,
      "name": "중품 호명단",
      "desc": "복용 후 생명 15% 증가, 1년 지속",
      "icon": "pill_20",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 12202,
      "name": "중품 대력단",
      "desc": "복용 후 공격 15% 증가, 1년 지속",
      "icon": "pill_21",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 12203,
      "name": "중품 청허단",
      "desc": "복용 후 속도 15% 증가, 1년 지속",
      "icon": "pill_22",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 12204,
      "name": "보기단",
      "desc": "복용 후, 전투 중 법술 시전 시 소모 영력 30% 감소, 1년 지속",
      "icon": "pill_25",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        122040
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 12205,
      "name": "생골단",
      "desc": "복용 후, 매번 수련 시 추가로 체백 1 증가, 2회 수련으로 연화 필요",
      "icon": "pill_26",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 50,
      "time": 2,
      "timeReduce": 3,
      "condition": 1,
      "effect": [
        1
      ],
      "value1": [
        11
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 2,
      "typeLabel": "단약"
    },
    {
      "id": 12206,
      "name": "익기단",
      "desc": "복용 후, 매번 수련 시 추가로 영력 20 증가, 2회 수련으로 연화 필요",
      "icon": "pill_27",
      "type": 1,
      "quality": 2,
      "stack": 99,
      "price": 60,
      "time": 2,
      "timeReduce": 3,
      "condition": 1,
      "effect": [
        1
      ],
      "value1": [
        12
      ],
      "value2": [
        20
      ],
      "value3": [],
      "eat": 2,
      "typeLabel": "단약"
    },
    {
      "id": 13101,
      "name": "상품 세수단",
      "desc": "복용 후 생명 +120",
      "icon": "pill_02",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        21
      ],
      "value2": [
        120
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 13102,
      "name": "상품 용호단",
      "desc": "복용 후 공격 +6",
      "icon": "pill_03",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        22
      ],
      "value2": [
        6
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 13103,
      "name": "상품 청풍단",
      "desc": "복용 후 속도 +6",
      "icon": "pill_04",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        23
      ],
      "value2": [
        6
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 13104,
      "name": "중품 근골단",
      "desc": "복용 후 체백 +2",
      "icon": "pill_06",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        11
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 13105,
      "name": "중품 혼원단",
      "desc": "복용 후 영력 +30",
      "icon": "pill_07",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        12
      ],
      "value2": [
        30
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 13106,
      "name": "양혼단",
      "desc": "복용 후 오성 +4",
      "icon": "pill_08",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        13
      ],
      "value2": [
        4
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 13107,
      "name": "연수단",
      "desc": "복용 후 수명 +8",
      "icon": "pill_09",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        14
      ],
      "value2": [
        8
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 13108,
      "name": "고본단",
      "desc": "복용 후 수위 +1",
      "icon": "pill_10",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 13109,
      "name": "중품 연혈단",
      "desc": "복용 후 수위 +2, 그러나 수명 -4",
      "icon": "pill_05",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1,
        1
      ],
      "value1": [
        15,
        14
      ],
      "value2": [
        2,
        -4
      ],
      "value3": [],
      "eat": 3,
      "typeLabel": "단약"
    },
    {
      "id": 13110,
      "name": "망진단",
      "desc": "복용 후, 임의의 법술 하나를 선택해 망각 가능",
      "icon": "pill_11",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        101
      ],
      "value1": [],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 13201,
      "name": "상품 호명단",
      "desc": "복용 후 생명 20% 증가, 1년 지속",
      "icon": "pill_20",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 13202,
      "name": "상품 대력단",
      "desc": "복용 후 공격 20% 증가, 1년 지속",
      "icon": "pill_21",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 13203,
      "name": "상품 청허단",
      "desc": "복용 후 속도 20% 증가, 1년 지속",
      "icon": "pill_22",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 13204,
      "name": "피독단",
      "desc": "복용 후, 전투 중 중독 면역, 1년 지속",
      "icon": "pill_28",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        132040
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 13205,
      "name": "빙심단",
      "desc": "복용 후, 전투 중 화상 면역, 1년 지속",
      "icon": "pill_29",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        132050
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 13206,
      "name": "적련단",
      "desc": "복용 후, 전투 중 빙결 면역, 1년 지속",
      "icon": "pill_30",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        132060
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 13207,
      "name": "취기단",
      "desc": "복용 후, 매번 수련 시 추가로 수위 1 증가, 2회 수련으로 연화 필요",
      "icon": "pill_31",
      "type": 1,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 2,
      "timeReduce": 3,
      "condition": 1,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 2,
      "typeLabel": "단약"
    },
    {
      "id": 14101,
      "name": "극품 세수단",
      "desc": "복용 후 생명 +160",
      "icon": "pill_02",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        21
      ],
      "value2": [
        160
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 14102,
      "name": "극품 용호단",
      "desc": "복용 후 공격 +8",
      "icon": "pill_03",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        22
      ],
      "value2": [
        8
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 14103,
      "name": "극품 청풍단",
      "desc": "복용 후 속도 +8",
      "icon": "pill_04",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        23
      ],
      "value2": [
        8
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 14104,
      "name": "상품 근골단",
      "desc": "복용 후 체백 +3",
      "icon": "pill_06",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 90,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        11
      ],
      "value2": [
        3
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 14105,
      "name": "상품 혼원단",
      "desc": "복용 후 영력 +40",
      "icon": "pill_07",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        12
      ],
      "value2": [
        40
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 14106,
      "name": "안혼단",
      "desc": "복용 후 오성 +6",
      "icon": "pill_08",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 90,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        13
      ],
      "value2": [
        6
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 14107,
      "name": "상품 연혈단",
      "desc": "복용 후 수위 +3, 그러나 수명 -8",
      "icon": "pill_05",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1,
        1
      ],
      "value1": [
        15,
        14
      ],
      "value2": [
        3,
        -8
      ],
      "value3": [],
      "eat": 3,
      "typeLabel": "단약"
    },
    {
      "id": 14108,
      "name": "상품 요상단",
      "desc": "복용 후 즉시 현재 생명력 상한의 60% 회복",
      "icon": "pill_12",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        61
      ],
      "value2": [
        60
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 14109,
      "name": "상품 회원단",
      "desc": "복용 후 즉시 현재 영력 상한의 60% 영력 회복",
      "icon": "pill_13",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        62
      ],
      "value2": [
        60
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 14201,
      "name": "극품 호명단",
      "desc": "복용 후 생명 25% 증가, 1년 지속",
      "icon": "pill_20",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 14202,
      "name": "극품 대력단",
      "desc": "복용 후 공격 25% 증가, 1년 지속",
      "icon": "pill_21",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 14203,
      "name": "극품 청허단",
      "desc": "복용 후 속도 25% 증가, 1년 지속",
      "icon": "pill_22",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 14204,
      "name": "회심단",
      "desc": "복용 후 치명타 20% 증가, 1년 지속",
      "icon": "pill_23",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        24
      ],
      "value2": [
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 14205,
      "name": "금강단",
      "desc": "복용 후 치명타 피해 50% 증가, 1년 지속",
      "icon": "pill_24",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        25
      ],
      "value2": [
        50
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 14206,
      "name": "신행단",
      "desc": "복용 후, 매번 전투 시작 시 즉시 1회 행동 가능, 1년 지속",
      "icon": "pill_32",
      "type": 1,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        142060
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15101,
      "name": "수원증수단",
      "desc": "복용 후, 수위 +3",
      "icon": "pill_14",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        3
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 15102,
      "name": "금령보천단",
      "desc": "복용 후 금 영근 +1",
      "icon": "pill_15",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        31
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 15103,
      "name": "목령보천단",
      "desc": "복용 후 목 영근 +1",
      "icon": "pill_16",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        32
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 15104,
      "name": "수령보천단",
      "desc": "복용 후 수 영근 +1",
      "icon": "pill_17",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        33
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 15105,
      "name": "화령보천단",
      "desc": "복용 후 화 영근 +1",
      "icon": "pill_18",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        34
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 15106,
      "name": "토령보천단",
      "desc": "복용 후 토 영근 +1",
      "icon": "pill_19",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        35
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 15107,
      "name": "선품 세수단",
      "desc": "복용 후 생명 +1%",
      "icon": "pill_02",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15108,
      "name": "선품 용호단",
      "desc": "복용 후 공격 +1%",
      "icon": "pill_03",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15109,
      "name": "선품 청풍단",
      "desc": "복용 후 속도 +1%",
      "icon": "pill_04",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15110,
      "name": "선품 혼원단",
      "desc": "복용 후 영력 +2%",
      "icon": "pill_07",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        12
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15111,
      "name": "선품 회심단",
      "desc": "복용 후 치명타 +1%",
      "icon": "pill_23",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        24
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 15112,
      "name": "선품 금강단",
      "desc": "복용 후 치명타 피해 +2%",
      "icon": "pill_24",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        25
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 15113,
      "name": "선품 환신단",
      "desc": "복용 후 명중 +1%",
      "icon": "pill_15113",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        28
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 15114,
      "name": "선품 신목단",
      "desc": "복용 후 회피 +1%",
      "icon": "pill_15114",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        29
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "단약"
    },
    {
      "id": 15201,
      "name": "영롱 금단",
      "desc": "복용 후, 전투 중 매 턴 최대 생명력의 5% 회복, 1년 지속",
      "icon": "pill_33",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        152010
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15202,
      "name": "금귀하해단",
      "desc": "복용 후, 매번 전투 시작 시 보호막 3중첩 획득, 1년 지속",
      "icon": "pill_34",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        152020
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15203,
      "name": "구전환혼단",
      "desc": "복용 후, 전투 중 패배 시 즉시 생명 30%로 부활, 전투당 1회만 발동, 1년 지속",
      "icon": "pill_35",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        152030
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15204,
      "name": "오기조원단",
      "desc": "복용 후, 현재 영력 및 상한 100% 증가, 1년 지속",
      "icon": "pill_36",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        12
      ],
      "value2": [
        100
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15205,
      "name": "금강복마단",
      "desc": "복용 후, 피해증가 30% 획득, 1년 지속",
      "icon": "pill_37",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        26
      ],
      "value2": [
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15206,
      "name": "오금단",
      "desc": "복용 후, 피해감소 30% 획득, 1년 지속",
      "icon": "pill_38",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 1,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        27
      ],
      "value2": [
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15301,
      "name": "진룡 비늘",
      "desc": "복용 후, 생명 25% 증가, 3년 지속",
      "icon": "special_15301",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 3,
      "timeReduce": 1,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 15302,
      "name": "신선주",
      "desc": "마신 후, 공격 10% 증가, 그러나 매번 전투 시작 시 기절 1중첩 획득",
      "icon": "special_15302",
      "type": 1,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 1,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3,
        2
      ],
      "value1": [
        1,
        22
      ],
      "value2": [
        10,
        10
      ],
      "value3": [
        1,
        0
      ],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 21001,
      "name": "장천병",
      "desc": "전투 중, 매번 행동 종료 시 최대 생명력의 1% 회복",
      "icon": "fabao_01",
      "type": 2,
      "quality": 1,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        210010
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 21002,
      "name": "만령산",
      "desc": "전투 중, 매번 행동 종료 시 최대 영력의 2% 회복",
      "icon": "fabao_02",
      "type": 2,
      "quality": 1,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        210020
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 21003,
      "name": "답운화",
      "desc": "전투 중, 매번 행동 종료 시 행동 게이지 5% 증가",
      "icon": "fabao_03",
      "type": 2,
      "quality": 1,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        210030
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 21004,
      "name": "원자신석",
      "desc": "전투 중, 적의 속도 5% 감소",
      "icon": "fabao_04",
      "type": 2,
      "quality": 1,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        210040
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 22001,
      "name": "시혈주",
      "desc": "전투 중, 매번 행동 종료 시 상대의 생명력(자신 공격력의 15%) 흡수",
      "icon": "fabao_05",
      "type": 2,
      "quality": 2,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3,
        3
      ],
      "value1": [
        2,
        1
      ],
      "value2": [
        220010,
        220011
      ],
      "value3": [
        1,
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 22002,
      "name": "동황종",
      "desc": "전투 중, 매번 행동 종료 시 적의 행동 게이지 8% 감소",
      "icon": "fabao_06",
      "type": 2,
      "quality": 2,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        220020
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 22003,
      "name": "칠보유리탑",
      "desc": "전투 중, 공격 4% 증가, 치명타 4% 증가, 치명타 피해 8% 증가",
      "icon": "fabao_07",
      "type": 2,
      "quality": 2,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        220030
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 22004,
      "name": "구룡신화갑",
      "desc": "전투 중, 매번 피격 시 30% 확률로 적에게 화상 1중첩 부여",
      "icon": "fabao_08",
      "type": 2,
      "quality": 2,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        220040
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 22101,
      "name": "한기옥패",
      "desc": "착용 후, 추가 수 영근 4 획득",
      "icon": "fabao_22101",
      "type": 2,
      "quality": 2,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        33
      ],
      "value2": [
        4
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 23001,
      "name": "혼원태극도",
      "desc": "전투 중, 기절 효과 면역",
      "icon": "fabao_13",
      "type": 2,
      "quality": 3,
      "stack": 1,
      "price": 240,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        230010
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 23002,
      "name": "구천현녀금",
      "desc": "전투 중, 양측이 매번 행동 종료 시 적에게 고정 피해(공격력의 20%)를 입힘",
      "icon": "fabao_10",
      "type": 2,
      "quality": 3,
      "stack": 1,
      "price": 240,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        230020
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 23003,
      "name": "현무은갑",
      "desc": "전투 중, 매번 피격 시 적에게 고정 피해(공격력의 40%)를 입힘",
      "icon": "fabao_11",
      "type": 2,
      "quality": 3,
      "stack": 1,
      "price": 240,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        230030
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 23004,
      "name": "현음환",
      "desc": "전투 중, 매번 공격 시 적에게 추가로 고정 피해(최대 영력의 8%)를 입힘",
      "icon": "fabao_12",
      "type": 2,
      "quality": 3,
      "stack": 1,
      "price": 240,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        230040
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 24001,
      "name": "신행화",
      "desc": "전투 중, 매번 행동 종료 시 속도 +3%",
      "icon": "fabao_09",
      "type": 2,
      "quality": 4,
      "stack": 1,
      "price": 320,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        240010
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 24002,
      "name": "용린방패",
      "desc": "전투 중, 매번 피해를 받을 때 50% 확률로 공격력 100%의 생명력 회복",
      "icon": "fabao_14",
      "type": 2,
      "quality": 4,
      "stack": 1,
      "price": 320,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        240020
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 24003,
      "name": "뇌령주",
      "desc": "전투 중, 매번 공격 시 25% 확률로 적에게 마비 1중첩 추가",
      "icon": "fabao_15",
      "type": 2,
      "quality": 4,
      "stack": 1,
      "price": 320,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        240030
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 24004,
      "name": "옥청부",
      "desc": "전투 중, 매번 행동 시작 시 자신의 무작위 약화 효과 2중첩 해제",
      "icon": "fabao_16",
      "type": 2,
      "quality": 4,
      "stack": 1,
      "price": 320,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        240040
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 24005,
      "name": "도화부",
      "desc": "착용 후, 피해감소 10% 획득",
      "icon": "fabao_24005",
      "type": 2,
      "quality": 4,
      "stack": 1,
      "price": 320,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        27
      ],
      "value2": [
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 25001,
      "name": "시혼번",
      "desc": "전투 중, 매번 피해를 입힐 때 그 피해의 20% 회복",
      "icon": "fabao_17",
      "type": 2,
      "quality": 5,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        250010
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 25002,
      "name": "형천갑",
      "desc": "전투 중, 매번 패배 시 25% 확률로 자신의 생명력 20% 회복 및 부활",
      "icon": "fabao_18",
      "type": 2,
      "quality": 5,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        250020
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 25003,
      "name": "춘추선",
      "desc": "전투 중, 매번 행동 종료 시 20% 확률로 한 턴 더 행동",
      "icon": "fabao_19",
      "type": 2,
      "quality": 5,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        250030
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 25004,
      "name": "현정호심경",
      "desc": "전투 중, 매번 행동 시작 시 40% 확률로 보호막 1중첩 획득",
      "icon": "fabao_20",
      "type": 2,
      "quality": 5,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        250040
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 26001,
      "name": "상사진령",
      "desc": "전투 중, 매번 공격 시 적에게 화상 1중첩 부여",
      "icon": "fabao_42",
      "type": 2,
      "quality": 5,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        260010
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 26002,
      "name": "골령냉화",
      "desc": "전투 중, 매번 적 턴 종료 시 적이 화상을 보유했다면 30% 확률로 1턴 빙결",
      "icon": "fabao_26002",
      "type": 2,
      "quality": 5,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        260020
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 26003,
      "name": "장천병",
      "desc": "전투 중, 매번 행동 종료 시 최대 생명력의 5% 회복",
      "icon": "fabao_01",
      "type": 2,
      "quality": 5,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        260030
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "지속형 법보"
    },
    {
      "id": 31001,
      "name": "상한검",
      "desc": "발동 후, 공격력 175% 피해를 입히고 50% 확률로 적에게 빙결 1중첩 부여",
      "icon": "fabao_21",
      "type": 3,
      "quality": 1,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        31001
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 31002,
      "name": "열화검",
      "desc": "발동 후, 공격력 100% 피해를 입히고 적에게 화상 2중첩 부여",
      "icon": "fabao_22",
      "type": 3,
      "quality": 1,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        31002
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 31003,
      "name": "구전영롱경",
      "desc": "발동 후, 적에게 현혹 3중첩 부여",
      "icon": "fabao_23",
      "type": 3,
      "quality": 1,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        31003
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 31004,
      "name": "무영신침",
      "desc": "발동 후, 공격력 100% 피해를 입히고 적에게 방어파괴 3중첩 부여",
      "icon": "fabao_24",
      "type": 3,
      "quality": 1,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        31004
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 32001,
      "name": "풍뢰고",
      "desc": "발동 후, 공격력 200% 피해를 입히고 적에게 마비 2중첩 부여",
      "icon": "fabao_25",
      "type": 3,
      "quality": 2,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        32001
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 32002,
      "name": "광풍검",
      "desc": "발동 후, 공격력 50% 피해 3회를 입히고 연격 발동",
      "icon": "fabao_26",
      "type": 3,
      "quality": 2,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        32002
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 32003,
      "name": "파마도",
      "desc": "발동 후, 공격력 200% 피해를 입히고 적의 모든 강화 효과 해제",
      "icon": "fabao_27",
      "type": 3,
      "quality": 2,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        32003
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 32004,
      "name": "명혼주",
      "desc": "발동 후, 공격력 100% 피해를 입히고 적에게 허약 3중첩 부여",
      "icon": "fabao_28",
      "type": 3,
      "quality": 2,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        32004
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 33001,
      "name": "청죽풍운검",
      "desc": "발동 후, 공격력 50% 피해 5회를 입히며 각 피해마다 50% 확률로 적에게 마비 1중첩 부여",
      "icon": "fabao_29",
      "type": 3,
      "quality": 3,
      "stack": 1,
      "price": 240,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        33001
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 33002,
      "name": "천화섭혼기",
      "desc": "발동 후, 공격력 250% 피해를 입히고 입힌 피해 수치만큼 회복",
      "icon": "fabao_30",
      "type": 3,
      "quality": 3,
      "stack": 1,
      "price": 240,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        33002
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 33003,
      "name": "홍련삼첨창",
      "desc": "발동 후, 공격력 120% 피해 3회를 입히며 각 피해마다 50% 확률로 상대 생명력 5%의 고정 피해 추가",
      "icon": "fabao_31",
      "type": 3,
      "quality": 3,
      "stack": 1,
      "price": 240,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        33003
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 33004,
      "name": "허천정",
      "desc": "발동 후, 적에게 자신 생명 상한의 25% 피해를 입힘",
      "icon": "fabao_32",
      "type": 3,
      "quality": 3,
      "stack": 1,
      "price": 240,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        33004
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 34001,
      "name": "번천인",
      "desc": "발동 후, 공격력 300% 피해를 입히고 적을 1턴 기절",
      "icon": "fabao_33",
      "type": 3,
      "quality": 4,
      "stack": 1,
      "price": 320,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        34001
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 34002,
      "name": "참백도",
      "desc": "발동 후, 적에게 적 생명력 상한의 25% 고정 피해를 입힘",
      "icon": "fabao_34",
      "type": 3,
      "quality": 4,
      "stack": 1,
      "price": 320,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        34002
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 34003,
      "name": "만독섭심등",
      "desc": "발동 후, 적에게 중독 7중첩 부여",
      "icon": "fabao_35",
      "type": 3,
      "quality": 4,
      "stack": 1,
      "price": 320,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        34003
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 34004,
      "name": "양혼옥련",
      "desc": "발동 후, 자신의 생명력 20% 회복 및 치유 4중첩 획득 (생명력 70% 미만일 때만 발동)",
      "icon": "fabao_36",
      "type": 3,
      "quality": 4,
      "stack": 1,
      "price": 320,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        34004
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 35001,
      "name": "오행박룡쇄",
      "desc": "발동 후, 적을 3턴 기절",
      "icon": "fabao_37",
      "type": 3,
      "quality": 5,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        35001
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 35002,
      "name": "주선검",
      "desc": "발동 후, 공격력 800% 피해를 입힘",
      "icon": "fabao_38",
      "type": 3,
      "quality": 5,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        35002
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 35003,
      "name": "개천부",
      "desc": "발동 후, 적 현재 생명력의 50% 고정 피해를 입힘",
      "icon": "fabao_39",
      "type": 3,
      "quality": 5,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        35003
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 35004,
      "name": "유명섭령탑",
      "desc": "발동 후, 상대 영력 상한의 50%에 해당하는 영력 흡수",
      "icon": "fabao_40",
      "type": 3,
      "quality": 5,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        35004
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 36001,
      "name": "봉천검",
      "desc": "발동 후 (공격력 400%) 피해를 입히고 적을 2턴 침묵시킨다.",
      "icon": "fabao_41",
      "type": 3,
      "quality": 5,
      "stack": 1,
      "price": 500,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        36001
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 36002,
      "name": "전격곤",
      "desc": "발동 후 (공격력 300%) 피해를 입히고 적에게 마비 3중첩을 부여한다.",
      "icon": "fabao_36002",
      "type": 3,
      "quality": 3,
      "stack": 1,
      "price": 300,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        36002
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 36003,
      "name": "좌륜총",
      "desc": "발동 후 6연타(공격력 80%) 피해. 각 타격마다 50% 확률로 적 생명력 5%의 고정 피해를 추가로 입힌다.",
      "icon": "fabao_36003",
      "type": 3,
      "quality": 4,
      "stack": 1,
      "price": 400,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        36003
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 36004,
      "name": "로켓포",
      "desc": "발동 후 대상 최대 생명력 30%의 고정 피해를 입히고 1턴 기절시킨다.",
      "icon": "fabao_36004",
      "type": 3,
      "quality": 5,
      "stack": 1,
      "price": 500,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        36004
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "발동형 법보"
    },
    {
      "id": 41101,
      "name": "현철검",
      "desc": "공격력+15%",
      "icon": "equipment_01",
      "type": 4,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 41201,
      "name": "현철장도",
      "desc": "공격력+10%; 치명타+10%",
      "icon": "equipment_02",
      "type": 4,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        24
      ],
      "value2": [
        10,
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 41301,
      "name": "현철장창",
      "desc": "공격력+10%; 치명타 피해+20%",
      "icon": "equipment_03",
      "type": 4,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        25
      ],
      "value2": [
        10,
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 41401,
      "name": "현철장곤",
      "desc": "공격력+10%; 피해증가+10%",
      "icon": "equipment_04",
      "type": 4,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        26
      ],
      "value2": [
        10,
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 42101,
      "name": "현철검",
      "desc": "공격력+25%",
      "icon": "equipment_01",
      "type": 4,
      "quality": 2,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 42201,
      "name": "현철장도",
      "desc": "공격력+15%; 치명타+15%",
      "icon": "equipment_02",
      "type": 4,
      "quality": 2,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        24
      ],
      "value2": [
        15,
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 42301,
      "name": "현철장창",
      "desc": "공격력+15%; 치명타 피해+30%",
      "icon": "equipment_03",
      "type": 4,
      "quality": 2,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        25
      ],
      "value2": [
        15,
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 42401,
      "name": "현철장곤",
      "desc": "공격력+15%; 피해증가+15%",
      "icon": "equipment_04",
      "type": 4,
      "quality": 2,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        26
      ],
      "value2": [
        15,
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 43101,
      "name": "현철검",
      "desc": "공격력+35%",
      "icon": "equipment_01",
      "type": 4,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        35
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 43201,
      "name": "현철장도",
      "desc": "공격력+20%; 치명타+20%",
      "icon": "equipment_02",
      "type": 4,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        24
      ],
      "value2": [
        20,
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 43301,
      "name": "현철장창",
      "desc": "공격력+20%; 치명타 피해+40%",
      "icon": "equipment_03",
      "type": 4,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        25
      ],
      "value2": [
        20,
        40
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 43401,
      "name": "현철장곤",
      "desc": "공격력+20%; 피해증가+20%",
      "icon": "equipment_04",
      "type": 4,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        26
      ],
      "value2": [
        20,
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 43501,
      "name": "현천운성검",
      "desc": "공격력+20%; 속도-20%; 공격 필중",
      "icon": "equipment_101",
      "type": 4,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        2,
        1
      ],
      "value1": [
        22,
        23,
        28
      ],
      "value2": [
        20,
        -20,
        1000
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 43502,
      "name": "주사참요검",
      "desc": "적이 요수 또는 영체일 때 입히는 피해 60% 증가",
      "icon": "equipment_102",
      "type": 4,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        435020
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 44101,
      "name": "현철검",
      "desc": "공격력+45%",
      "icon": "equipment_01",
      "type": 4,
      "quality": 4,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        45
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 44201,
      "name": "현철장도",
      "desc": "공격력+25%; 치명타+25%",
      "icon": "equipment_02",
      "type": 4,
      "quality": 4,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        24
      ],
      "value2": [
        25,
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 44301,
      "name": "현철장창",
      "desc": "공격력+25%; 치명타 피해+50%",
      "icon": "equipment_03",
      "type": 4,
      "quality": 4,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        25
      ],
      "value2": [
        25,
        50
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 44401,
      "name": "현철장곤",
      "desc": "공격력+25%; 피해증가+25%",
      "icon": "equipment_04",
      "type": 4,
      "quality": 4,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        26
      ],
      "value2": [
        25,
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 45101,
      "name": "현철검",
      "desc": "공격력+55%",
      "icon": "equipment_01",
      "type": 4,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        55
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 45201,
      "name": "현철장도",
      "desc": "공격력+30%; 치명타+30%",
      "icon": "equipment_02",
      "type": 4,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        24
      ],
      "value2": [
        30,
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 45301,
      "name": "현철장창",
      "desc": "공격력+30%; 치명타 피해+60%",
      "icon": "equipment_03",
      "type": 4,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        25
      ],
      "value2": [
        30,
        60
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 45401,
      "name": "현철장곤",
      "desc": "공격력+30%; 피해증가+30%",
      "icon": "equipment_04",
      "type": 4,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        26
      ],
      "value2": [
        30,
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 45501,
      "name": "호천운성검",
      "desc": "공격력+20%; 공격 필중",
      "icon": "equipment_103",
      "type": 4,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        22,
        28
      ],
      "value2": [
        20,
        1000
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 45502,
      "name": "멸요참신검",
      "desc": "적이 요수 또는 영체일 때 입히는 피해 100% 증가",
      "icon": "equipment_104",
      "type": 4,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        455020
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 45503,
      "name": "요천검",
      "desc": "치명타+30%; 치명타 피해+100%",
      "icon": "equipment_45503",
      "type": 4,
      "quality": 5,
      "stack": 1,
      "price": 300,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1,
        1
      ],
      "value1": [
        24,
        25
      ],
      "value2": [
        30,
        100
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 45504,
      "name": "요기흑곤",
      "desc": "피해증가+100%; 피해감소-30%",
      "icon": "equipment_45504",
      "type": 4,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1,
        1
      ],
      "value1": [
        26,
        27
      ],
      "value2": [
        100,
        -30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "무기"
    },
    {
      "id": 51101,
      "name": "성신의",
      "desc": "최대 생명력+15%",
      "icon": "equipment_05",
      "type": 5,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 51201,
      "name": "청명포",
      "desc": "최대 생명력+10%; 최대 영력+10%",
      "icon": "equipment_06",
      "type": 5,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        2
      ],
      "value1": [
        21,
        12
      ],
      "value2": [
        10,
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 51301,
      "name": "현은갑",
      "desc": "최대 생명력+10%; 피해감소+10%",
      "icon": "equipment_07",
      "type": 5,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        21,
        27
      ],
      "value2": [
        10,
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 52101,
      "name": "성신의",
      "desc": "최대 생명력+25%",
      "icon": "equipment_05",
      "type": 5,
      "quality": 2,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 52201,
      "name": "청명포",
      "desc": "최대 생명력+15%; 최대 영력+15%",
      "icon": "equipment_06",
      "type": 5,
      "quality": 2,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        2
      ],
      "value1": [
        21,
        12
      ],
      "value2": [
        15,
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 52301,
      "name": "현은갑",
      "desc": "최대 생명력+15%; 피해감소+15%",
      "icon": "equipment_07",
      "type": 5,
      "quality": 2,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        21,
        27
      ],
      "value2": [
        15,
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 53101,
      "name": "성신의",
      "desc": "최대 생명력+35%",
      "icon": "equipment_05",
      "type": 5,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        35
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 53201,
      "name": "청명포",
      "desc": "최대 생명력+20%; 최대 영력+20%",
      "icon": "equipment_06",
      "type": 5,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        2
      ],
      "value1": [
        21,
        12
      ],
      "value2": [
        20,
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 53301,
      "name": "현은갑",
      "desc": "최대 생명력+20%; 피해감소+20%",
      "icon": "equipment_07",
      "type": 5,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        21,
        27
      ],
      "value2": [
        20,
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 53401,
      "name": "현철멜빵바지",
      "desc": "매 전투 승리 시 체백 1점 획득",
      "icon": "equipment_53401",
      "type": 5,
      "quality": 3,
      "stack": 1,
      "price": 250,
      "time": 0,
      "timeReduce": 0,
      "condition": 4,
      "effect": [
        1
      ],
      "value1": [
        11
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 54101,
      "name": "성신의",
      "desc": "최대 생명력+45%",
      "icon": "equipment_05",
      "type": 5,
      "quality": 4,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        45
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 54201,
      "name": "청명포",
      "desc": "최대 생명력+25%; 최대 영력+25%",
      "icon": "equipment_06",
      "type": 5,
      "quality": 4,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        2
      ],
      "value1": [
        21,
        12
      ],
      "value2": [
        25,
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 54301,
      "name": "현은갑",
      "desc": "최대 생명력+25%; 피해감소+25%",
      "icon": "equipment_07",
      "type": 5,
      "quality": 4,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        21,
        27
      ],
      "value2": [
        25,
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 55101,
      "name": "성신의",
      "desc": "최대 생명력+55%",
      "icon": "equipment_05",
      "type": 5,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        55
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 55201,
      "name": "청명포",
      "desc": "최대 생명력+30%; 최대 영력+30%",
      "icon": "equipment_06",
      "type": 5,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        2
      ],
      "value1": [
        21,
        12
      ],
      "value2": [
        30,
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 55301,
      "name": "현은갑",
      "desc": "최대 생명력+30%; 피해감소+30%",
      "icon": "equipment_07",
      "type": 5,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        21,
        27
      ],
      "value2": [
        30,
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 55401,
      "name": "행화장포",
      "desc": "최대 생명력+100%; 피해감소-30%",
      "icon": "equipment_55401",
      "type": 5,
      "quality": 5,
      "stack": 1,
      "price": 300,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        21,
        27
      ],
      "value2": [
        100,
        -30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "의복"
    },
    {
      "id": 61101,
      "name": "청운화",
      "desc": "속도+15%",
      "icon": "equipment_08",
      "type": 6,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 61201,
      "name": "용골화",
      "desc": "속도+10%; 명중+10%",
      "icon": "equipment_09",
      "type": 6,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        23,
        28
      ],
      "value2": [
        10,
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 61301,
      "name": "교피장화",
      "desc": "속도+10%; 회피+10%",
      "icon": "equipment_10",
      "type": 6,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        23,
        29
      ],
      "value2": [
        10,
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 62101,
      "name": "청운화",
      "desc": "속도+25%",
      "icon": "equipment_08",
      "type": 6,
      "quality": 2,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 62201,
      "name": "용골화",
      "desc": "속도+15%; 명중+15%",
      "icon": "equipment_09",
      "type": 6,
      "quality": 2,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        23,
        28
      ],
      "value2": [
        15,
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 62301,
      "name": "교피장화",
      "desc": "속도+15%; 회피+15%",
      "icon": "equipment_10",
      "type": 6,
      "quality": 2,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        23,
        29
      ],
      "value2": [
        15,
        15
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 63101,
      "name": "청운화",
      "desc": "속도+35%",
      "icon": "equipment_08",
      "type": 6,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        35
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 63201,
      "name": "용골화",
      "desc": "속도+20%; 명중+20%",
      "icon": "equipment_09",
      "type": 6,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        23,
        28
      ],
      "value2": [
        20,
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 63301,
      "name": "교피장화",
      "desc": "속도+20%; 회피+20%",
      "icon": "equipment_10",
      "type": 6,
      "quality": 3,
      "stack": 1,
      "price": 120,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        23,
        29
      ],
      "value2": [
        20,
        20
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 64101,
      "name": "청운화",
      "desc": "속도+45%",
      "icon": "equipment_08",
      "type": 6,
      "quality": 4,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        45
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 64201,
      "name": "용골화",
      "desc": "속도+25%; 명중+25%",
      "icon": "equipment_09",
      "type": 6,
      "quality": 4,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        23,
        28
      ],
      "value2": [
        25,
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 64301,
      "name": "교피장화",
      "desc": "속도+25%; 회피+25%",
      "icon": "equipment_10",
      "type": 6,
      "quality": 4,
      "stack": 1,
      "price": 160,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        23,
        29
      ],
      "value2": [
        25,
        25
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 65101,
      "name": "청운화",
      "desc": "속도+55%",
      "icon": "equipment_08",
      "type": 6,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        55
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 65201,
      "name": "용골화",
      "desc": "속도+30%; 명중+30%",
      "icon": "equipment_09",
      "type": 6,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        23,
        28
      ],
      "value2": [
        30,
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 65301,
      "name": "교피장화",
      "desc": "속도+30%; 회피+30%",
      "icon": "equipment_10",
      "type": 6,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        1
      ],
      "value1": [
        23,
        29
      ],
      "value2": [
        30,
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 65302,
      "name": "진악화",
      "desc": "속도-30%; 최대 생명력+100%; 피해감소+30%",
      "icon": "equipment_65302",
      "type": 6,
      "quality": 5,
      "stack": 1,
      "price": 300,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        2,
        1
      ],
      "value1": [
        23,
        21,
        27
      ],
      "value2": [
        -30,
        100,
        30
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 65303,
      "name": "풍뢰익",
      "desc": "속도+100%; 공격력-50%",
      "icon": "equipment_65303",
      "type": 6,
      "quality": 5,
      "stack": 1,
      "price": 300,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2,
        2
      ],
      "value1": [
        23,
        22
      ],
      "value2": [
        100,
        -50
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "신발"
    },
    {
      "id": 71101,
      "name": "《농부삼권》",
      "desc": "수련 후 법술 습득: 3연타(공격력 70%) 피해",
      "icon": "book_01",
      "type": 7,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        71101
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "비급"
    },
    {
      "id": 71102,
      "name": "《암권》",
      "desc": "수련 후 법술 습득: (공격력 180%) 피해, 10% 확률로 적 기절 1턴",
      "icon": "book_01",
      "type": 7,
      "quality": 1,
      "stack": 1,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        71102
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "비급"
    },
    {
      "id": 71201,
      "name": "《비검술》",
      "desc": "수련 후 법술 습득: (공격력 100%) 금속성 피해",
      "icon": "book_01",
      "type": 7,
      "quality": 1,
      "stack": 1,
      "price": 10,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        1101
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "비급"
    },
    {
      "id": 71202,
      "name": "《목령술》",
      "desc": "수련 후 법술 습득: 2연타(공격력 50%) 목속성 피해",
      "icon": "book_01",
      "type": 7,
      "quality": 1,
      "stack": 1,
      "price": 10,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        2101
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "비급"
    },
    {
      "id": 71203,
      "name": "《수령주》",
      "desc": "수련 후 법술 습득: (최대 영력 20%) 수속성 피해",
      "icon": "book_01",
      "type": 7,
      "quality": 1,
      "stack": 1,
      "price": 10,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        3101
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "비급"
    },
    {
      "id": 71204,
      "name": "《연화술》",
      "desc": "수련 후 법술 습득: (공격력 50%) 화속성 피해, 적에게 화상 1중첩 부여",
      "icon": "book_01",
      "type": 7,
      "quality": 1,
      "stack": 1,
      "price": 10,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        4101
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "비급"
    },
    {
      "id": 71205,
      "name": "《낙석술》",
      "desc": "수련 후 법술 습득: (자신 최대 생명력 5%) 토속성 피해",
      "icon": "book_01",
      "type": 7,
      "quality": 1,
      "stack": 1,
      "price": 10,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        5101
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "비급"
    },
    {
      "id": 72101,
      "name": "《열화신장》",
      "desc": "수련 후 법술 습득: (공격력 100%) 화속성 피해, 적에게 화상 2중첩 부여",
      "icon": "book_01",
      "type": 7,
      "quality": 2,
      "stack": 1,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        72101
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "비급"
    },
    {
      "id": 73101,
      "name": "《열천패참》",
      "desc": "수련 후 법술 습득, (500% 공격력) 피해를 입힌 뒤 자신은 1턴 기절",
      "icon": "book_01",
      "type": 7,
      "quality": 3,
      "stack": 1,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        73101
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "비급"
    },
    {
      "id": 74101,
      "name": "《금종조》",
      "desc": "수련 후 법술 습득, 보호막 2중첩 획득",
      "icon": "book_01",
      "type": 7,
      "quality": 4,
      "stack": 1,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        4
      ],
      "value1": [
        74101
      ],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "비급"
    },
    {
      "id": 81001,
      "name": "목빗과 편지",
      "desc": "영안 장군이 산녀에게 전해 달라고 부탁한 목빗과 편지",
      "icon": "item_81001",
      "type": 8,
      "quality": 1,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [],
      "value1": [],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "기타"
    },
    {
      "id": 81002,
      "name": "향낭",
      "desc": "이완아가 왕마자에게 준 향낭",
      "icon": "item_81002",
      "type": 8,
      "quality": 1,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [],
      "value1": [],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "기타"
    },
    {
      "id": 82001,
      "name": "대진주",
      "desc": "품질이 온전하고 화광을 발하는 진주",
      "icon": "item_04",
      "type": 8,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [],
      "value1": [],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "기타"
    },
    {
      "id": 83001,
      "name": "백호 모피",
      "desc": "부드럽고 매끄러운 백호 모피, 품질 온전",
      "icon": "item_01",
      "type": 8,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [],
      "value1": [],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "기타"
    },
    {
      "id": 84001,
      "name": "정련 운철괴",
      "desc": "천외석에서 얻은 정련 운철괴, 상등 재료이나 가공이 어렵다",
      "icon": "item_02",
      "type": 8,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [],
      "value1": [],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "기타"
    },
    {
      "id": 84002,
      "name": "뇌격도목",
      "desc": "천뢰로 인해 탄화된 복숭아나무 목재, 매우 강한 벽사력을 지님",
      "icon": "item_03",
      "type": 8,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [],
      "value1": [],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "기타"
    },
    {
      "id": 85001,
      "name": "채색 보석",
      "desc": "각지 이역의 찬란한 보석들, 빛을 받으면 오색찬란한 광채를 발한다",
      "icon": "item_05",
      "type": 8,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [],
      "value1": [],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "기타"
    },
    {
      "id": 95001,
      "name": "인과의 조각",
      "desc": "인과의 시작을 상징하는 조각. 매년 10 윤회점 획득, 전투 승리 시마다 추가 윤회점 획득",
      "icon": "suipian_01",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 5,
      "effect": [
        5
      ],
      "value1": [
        100
      ],
      "value2": [
        2
      ],
      "value3": [
        10
      ],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95002,
      "name": "혼귀의 조각",
      "desc": "영혼의 귀환을 인도하는 조각. 전투 승리 시마다 생명과 영력 10% 회복",
      "icon": "suipian_02",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 4,
      "effect": [
        2,
        2
      ],
      "value1": [
        61,
        62
      ],
      "value2": [
        10,
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95003,
      "name": "세월의 조각",
      "desc": "세월의 흐름을 기록하는 조각. 전투 승리 시마다 수명 1년 획득",
      "icon": "suipian_03",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 4,
      "effect": [
        1
      ],
      "value1": [
        14
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95004,
      "name": "억몽의 조각",
      "desc": "전생의 꿈을 새긴 조각. 이제 잠든 꿈속에서도 강해지며, 매년 연초에 생명 10점 획득",
      "icon": "suipian_04",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 5,
      "effect": [
        1
      ],
      "value1": [
        21
      ],
      "value2": [
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95005,
      "name": "숙명의 조각",
      "desc": "운명의 교차를 대표하는 조각. 전투 중 매 턴 시작 시 생명력이 50% 미만이면 피해 증가 1중첩 획득",
      "icon": "suipian_05",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        950050
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95006,
      "name": "불멸의 조각",
      "desc": "영원과 불멸을 상징하는 조각. 전투 승리 시마다 체백 1점 획득",
      "icon": "suipian_06",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 4,
      "effect": [
        1
      ],
      "value1": [
        11
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95007,
      "name": "계약의 조각",
      "desc": "맹약과 서약을 대표하는 조각. 전투 시작 시마다 적에게 마비 2중첩 부여",
      "icon": "suipian_07",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        950070
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95008,
      "name": "인연의 조각",
      "desc": "깊은 정을 담은 조각. 전투 시작 시마다 보호막 3중첩 획득",
      "icon": "suipian_08",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        950080
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95009,
      "name": "윤회의 조각",
      "desc": "윤회전생의 힘을 지닌 조각. 즉시 수위 100점 획득",
      "icon": "suipian_09",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        100
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95101,
      "name": "혈색 펜던트",
      "desc": "이 도구 보유 시 수련할 때마다 수위 1점 추가 증가",
      "icon": "special_95101",
      "type": 9,
      "quality": 4,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 1,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95102,
      "name": "혈혼석",
      "desc": "이 도구 보유 시 수련할 때마다 수위 2점 추가 증가, 그러나 수명 2점 소모",
      "icon": "special_95102",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 1,
      "effect": [
        1,
        1
      ],
      "value1": [
        15,
        14
      ],
      "value2": [
        2,
        -2
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95103,
      "name": "무명 연단로",
      "desc": "이 도구 보유 시 연단할 때마다 하품 세수단 1개 추가 획득",
      "icon": "special_95103",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 2,
      "effect": [
        5
      ],
      "value1": [
        100
      ],
      "value2": [
        11101
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95104,
      "name": "영호 혼환",
      "desc": "이 도구 보유 시 영구적으로 회피율 40% 획득",
      "icon": "special_95104",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 0,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        29
      ],
      "value2": [
        40
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95105,
      "name": "식금 영충",
      "desc": "이 영총 보유 시 매년 50% 확률로 영석 10 획득",
      "icon": "special_95105",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 5,
      "effect": [
        5
      ],
      "value1": [
        50
      ],
      "value2": [
        1
      ],
      "value3": [
        10
      ],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95106,
      "name": "무명 반지",
      "desc": "이 도구 보유 시 연단할 때마다 수위 1점 획득",
      "icon": "special_95106",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 2,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95107,
      "name": "백련의 망치",
      "desc": "이 도구 보유 시 법보 제련할 때마다 수위 1점 획득",
      "icon": "special_95107",
      "type": 9,
      "quality": 5,
      "stack": 1,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 3,
      "effect": [
        1
      ],
      "value1": [
        15
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "기능"
    },
    {
      "id": 95108,
      "name": "수령주",
      "desc": "이 도구를 연화하면 수 영근 5점 추가 획득",
      "icon": "special_95108",
      "type": 1,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        33
      ],
      "value2": [
        5
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 95109,
      "name": "금령주",
      "desc": "이 도구를 연화하면 금 영근 5점 추가 획득",
      "icon": "special_95109",
      "type": 1,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        31
      ],
      "value2": [
        5
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 95110,
      "name": "토령주",
      "desc": "이 도구를 연화하면 토 영근 5점 추가 획득",
      "icon": "special_95110",
      "type": 1,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        35
      ],
      "value2": [
        5
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 95111,
      "name": "화령주",
      "desc": "이 도구를 연화하면 화 영근 5점 추가 획득",
      "icon": "special_95111",
      "type": 1,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        34
      ],
      "value2": [
        5
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 95112,
      "name": "목령주",
      "desc": "이 도구를 연화하면 목 영근 5점 추가 획득",
      "icon": "special_95112",
      "type": 1,
      "quality": 5,
      "stack": 1,
      "price": 200,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        32
      ],
      "value2": [
        5
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "단약"
    },
    {
      "id": 111001,
      "name": "범품 영초",
      "desc": "섭취 후 영력 +10",
      "icon": "lingzhi_001",
      "type": 11,
      "quality": 1,
      "stack": 99,
      "price": 20,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        12
      ],
      "value2": [
        10
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "영지"
    },
    {
      "id": 111002,
      "name": "범품 용혈화",
      "desc": "섭취 후 생명 +40",
      "icon": "lingzhi_002",
      "type": 11,
      "quality": 1,
      "stack": 99,
      "price": 20,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        21
      ],
      "value2": [
        40
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "영지"
    },
    {
      "id": 111003,
      "name": "범품 검의란",
      "desc": "섭취 후 공격 +2",
      "icon": "lingzhi_003",
      "type": 11,
      "quality": 1,
      "stack": 99,
      "price": 20,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        22
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "영지"
    },
    {
      "id": 111004,
      "name": "범품 급행등",
      "desc": "섭취 후 속도 +2",
      "icon": "lingzhi_004",
      "type": 11,
      "quality": 1,
      "stack": 99,
      "price": 20,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        23
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "영지"
    },
    {
      "id": 112001,
      "name": "중품 영초",
      "desc": "섭취 후 영력 +20",
      "icon": "lingzhi_001",
      "type": 11,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        12
      ],
      "value2": [
        20
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "영지"
    },
    {
      "id": 112002,
      "name": "중품 용혈화",
      "desc": "섭취 후 생명 +80",
      "icon": "lingzhi_002",
      "type": 11,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        21
      ],
      "value2": [
        80
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "영지"
    },
    {
      "id": 112003,
      "name": "중품 검의란",
      "desc": "섭취 후 공격 +4",
      "icon": "lingzhi_003",
      "type": 11,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        22
      ],
      "value2": [
        4
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "영지"
    },
    {
      "id": 112004,
      "name": "중품 급행등",
      "desc": "섭취 후 속도 +4",
      "icon": "lingzhi_004",
      "type": 11,
      "quality": 2,
      "stack": 99,
      "price": 40,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        1
      ],
      "value1": [
        23
      ],
      "value2": [
        4
      ],
      "value3": [],
      "eat": 1,
      "typeLabel": "영지"
    },
    {
      "id": 113001,
      "name": "상품 영초",
      "desc": "섭취 후 영력 상한 2% 증가",
      "icon": "lingzhi_001",
      "type": 11,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        12
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 113002,
      "name": "상품 용혈화",
      "desc": "섭취 후 생명 상한 1% 증가",
      "icon": "lingzhi_002",
      "type": 11,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 113003,
      "name": "상품 검의란",
      "desc": "섭취 후 공격 상한 1% 증가",
      "icon": "lingzhi_003",
      "type": 11,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 113004,
      "name": "상품 급행등",
      "desc": "섭취 후 속도 상한 1% 증가",
      "icon": "lingzhi_004",
      "type": 11,
      "quality": 3,
      "stack": 99,
      "price": 60,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        1
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 114001,
      "name": "극품 영초",
      "desc": "섭취 후 영력 상한 4% 증가",
      "icon": "lingzhi_001",
      "type": 11,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        12
      ],
      "value2": [
        4
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 114002,
      "name": "극품 용혈화",
      "desc": "섭취 후 생명 상한 2% 증가",
      "icon": "lingzhi_002",
      "type": 11,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 114003,
      "name": "극품 검의란",
      "desc": "섭취 후 공격 상한 2% 증가",
      "icon": "lingzhi_003",
      "type": 11,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 114004,
      "name": "극품 급행등",
      "desc": "섭취 후 속도 상한 2% 증가",
      "icon": "lingzhi_004",
      "type": 11,
      "quality": 4,
      "stack": 99,
      "price": 80,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        2
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 115001,
      "name": "선품 영초",
      "desc": "섭취 후 영력 상한 10% 증가",
      "icon": "lingzhi_001",
      "type": 11,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        12
      ],
      "value2": [
        10
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 115002,
      "name": "선품 용혈화",
      "desc": "섭취 후 생명 상한 5% 증가",
      "icon": "lingzhi_002",
      "type": 11,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        21
      ],
      "value2": [
        5
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 115003,
      "name": "선품 검의란",
      "desc": "섭취 후 공격 상한 5% 증가",
      "icon": "lingzhi_003",
      "type": 11,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        22
      ],
      "value2": [
        5
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 115004,
      "name": "선품 급행등",
      "desc": "섭취 후 속도 상한 5% 증가",
      "icon": "lingzhi_004",
      "type": 11,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [
        2
      ],
      "value1": [
        23
      ],
      "value2": [
        5
      ],
      "value3": [],
      "eat": 0,
      "typeLabel": "영지"
    },
    {
      "id": 121001,
      "name": "폐부",
      "desc": "제작 실패한 부적, 아무 효과 없음, 제작 재료를 회수할 수 있을지도 모른다",
      "icon": "fuzhou_101",
      "type": 12,
      "quality": 1,
      "stack": 99,
      "price": 10,
      "time": 0,
      "timeReduce": 0,
      "condition": 0,
      "effect": [],
      "value1": [],
      "value2": [],
      "value3": [],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 122001,
      "name": "분뢰부",
      "desc": "전투 시작 시 적에게 마비 1중첩 부여, 1회 전투 동안 지속",
      "icon": "fuzhou_201",
      "type": 12,
      "quality": 2,
      "stack": 99,
      "price": 15,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        120
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 122002,
      "name": "이화부",
      "desc": "전투 시작 시 적에게 화상 2중첩 부여, 1회 전투 동안 지속",
      "icon": "fuzhou_202",
      "type": 12,
      "quality": 2,
      "stack": 99,
      "price": 15,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        30
      ],
      "value3": [
        2
      ],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 123001,
      "name": "봉령부",
      "desc": "전투 시작 시 적에게 침묵 1중첩 부여, 1회 전투 동안 지속",
      "icon": "fuzhou_301",
      "type": 12,
      "quality": 3,
      "stack": 99,
      "price": 20,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        80
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 123002,
      "name": "쇠패부",
      "desc": "전투 시작 시 적에게 허약 2중첩 부여, 1회 전투 동안 지속",
      "icon": "fuzhou_302",
      "type": 12,
      "quality": 3,
      "stack": 99,
      "price": 20,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        130
      ],
      "value3": [
        2
      ],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 123003,
      "name": "응체부",
      "desc": "전투 시작 시 적에게 감속 3중첩 부여, 1회 전투 동안 지속",
      "icon": "fuzhou_303",
      "type": 12,
      "quality": 3,
      "stack": 99,
      "price": 20,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        190
      ],
      "value3": [
        3
      ],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 124001,
      "name": "장목부",
      "desc": "전투 시작 시 적에게 현혹 2중첩 부여, 1회 전투 동안 지속",
      "icon": "fuzhou_401",
      "type": 12,
      "quality": 4,
      "stack": 99,
      "price": 25,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        140
      ],
      "value3": [
        2
      ],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 124002,
      "name": "장기부",
      "desc": "전투 시작 시 적에게 중독 4중첩 부여, 1회 전투 동안 지속",
      "icon": "fuzhou_402",
      "type": 12,
      "quality": 4,
      "stack": 99,
      "price": 25,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        20
      ],
      "value3": [
        4
      ],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 124003,
      "name": "파강부",
      "desc": "전투 시작 시 적에게 방어파괴 2중첩 부여, 1회 전투 동안 지속",
      "icon": "fuzhou_403",
      "type": 12,
      "quality": 4,
      "stack": 99,
      "price": 25,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        60
      ],
      "value3": [
        2
      ],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 124004,
      "name": "형극부",
      "desc": "전투 시작 시 적에게 가시 2중첩 부여, 1회 전투 동안 지속",
      "icon": "fuzhou_404",
      "type": 12,
      "quality": 4,
      "stack": 99,
      "price": 25,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        200
      ],
      "value3": [
        2
      ],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 125001,
      "name": "빙백부",
      "desc": "전투 시작 시 적에게 빙결 1중첩 부여, 1회 전투 동안 지속",
      "icon": "fuzhou_501",
      "type": 12,
      "quality": 5,
      "stack": 99,
      "price": 30,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        40
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 125002,
      "name": "천손부",
      "desc": "전투 시작 시 적이 최대 생명력 20%의 고정 피해를 즉시 받게 함, 1회 전투 동안 지속",
      "icon": "fuzhou_502",
      "type": 12,
      "quality": 5,
      "stack": 99,
      "price": 30,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        2
      ],
      "value2": [
        1250020
      ],
      "value3": [
        1
      ],
      "eat": 0,
      "typeLabel": "부적"
    },
    {
      "id": 126001,
      "name": "금람깃",
      "desc": "전투 시작 시 가속 4중첩 획득, 1회 전투 동안 지속",
      "icon": "fuzhou_601",
      "type": 12,
      "quality": 5,
      "stack": 99,
      "price": 100,
      "time": 1,
      "timeReduce": 2,
      "condition": 0,
      "effect": [
        3
      ],
      "value1": [
        1
      ],
      "value2": [
        180
      ],
      "value3": [
        4
      ],
      "eat": 0,
      "typeLabel": "부적"
    }
  ],
  "skills": [
    {
      "id": 1,
      "name": "참격",
      "desc": "공격력 100% 피해를 입히고 영력 5%를 회복한다",
      "icon": "skill_1",
      "sfx": "skill_1_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        1
      ],
      "buff": [
        1
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 2,
      "name": "중격",
      "desc": "공격력 100% 피해를 입히고 영력 5%를 회복한다",
      "icon": "skill_2",
      "sfx": "skill_2_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        1
      ],
      "buff": [
        1
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 3,
      "name": "조격",
      "desc": "공격력 100% 피해를 입히고 영력 5%를 회복한다",
      "icon": "skill_3",
      "sfx": "skill_3_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        1
      ],
      "buff": [
        1
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 4,
      "name": "조격",
      "desc": "공격력 100% 피해를 입히고 중독 1중첩을 부여한다",
      "icon": "skill_3",
      "sfx": "skill_3_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        20
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 5,
      "name": "물어뜯기",
      "desc": "공격력 100% 피해를 입히고 중독 1중첩을 부여한다",
      "icon": "skill_5",
      "sfx": "skill_5_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        20
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 101,
      "name": "비엽뢰법",
      "desc": "목속성 공격력 12% 피해를 8회 입히며 이 공격은 반드시 명중하고 적에게 마비 2중첩을 부여한다",
      "icon": "skill_101",
      "sfx": "skill_101_hit",
      "element": 2,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 520,
      "segment": 8,
      "interval": [
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 12,
      "buffTarget": [
        1,
        2
      ],
      "buff": [
        160,
        120
      ],
      "layer": [
        1,
        2
      ],
      "elementLabel": "화"
    },
    {
      "id": 102,
      "name": "월명빙검술",
      "desc": "수속성 공격력 25% 피해를 4회 입히며 각 타격마다 30% 확률로 적에게 빙결 1중첩을 부여한다",
      "icon": "skill_102",
      "sfx": "skill_102_hit",
      "element": 3,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 520,
      "segment": 4,
      "interval": [
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 25,
      "buffTarget": [
        1
      ],
      "buff": [
        1020
      ],
      "layer": [
        4
      ],
      "elementLabel": "토"
    },
    {
      "id": 103,
      "name": "이화진광술",
      "desc": "화속성 공격력 150% 피해를 입히고 적에게 화상이 있으면 적에게 침묵 2중첩을 부여한다",
      "icon": "skill_103",
      "sfx": "skill_103_hit",
      "element": 4,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 520,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [
        2
      ],
      "buff": [
        1030
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 104,
      "name": "빙뢰주",
      "desc": "수속성 공격력 150% 피해를 입히고 적에게 감속 2중첩과 마비 2중첩을 부여한다",
      "icon": "skill_104",
      "sfx": "skill_104_hit",
      "element": 3,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 520,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [
        2,
        2
      ],
      "buff": [
        190,
        120
      ],
      "layer": [
        2,
        2
      ],
      "elementLabel": "토"
    },
    {
      "id": 105,
      "name": "질풍난검법",
      "desc": "금속성 공격력 50% 피해를 4회 입히고 가속 2중첩을 얻으며 50% 확률로 연격을 얻는다",
      "icon": "skill_105",
      "sfx": "skill_105_hit",
      "element": 1,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 520,
      "segment": 4,
      "interval": [
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        1,
        1
      ],
      "buff": [
        180,
        1050
      ],
      "layer": [
        2,
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1101,
      "name": "비검술",
      "desc": "금속성 공격력 100% 피해를 입힌다",
      "icon": "skill_1101",
      "sfx": "skill_1101_hit",
      "element": 1,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "목"
    },
    {
      "id": 1102,
      "name": "금망술",
      "desc": "금속성 공격력 50% 피해를 입히고 자신에게 피해 증폭 2중첩을 부여한다",
      "icon": "skill_1102",
      "sfx": "skill_1102_hit",
      "element": 1,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 30,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        1
      ],
      "buff": [
        50
      ],
      "layer": [
        2
      ],
      "elementLabel": "목"
    },
    {
      "id": 1103,
      "name": "금인술",
      "desc": "금속성 공격력 50% 피해를 입히고 적에게 파갑 2중첩을 부여한다",
      "icon": "skill_1103",
      "sfx": "skill_1103_hit",
      "element": 1,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 30,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        2
      ],
      "buff": [
        60
      ],
      "layer": [
        2
      ],
      "elementLabel": "목"
    },
    {
      "id": 1201,
      "name": "질검주",
      "desc": "금속성 공격력 100% 피해를 입히고 추가로 속도 100%의 고정 피해를 입힌다",
      "icon": "skill_1201",
      "sfx": "skill_1201_hit",
      "element": 1,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        12010
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1202,
      "name": "집기검무",
      "desc": "집기 1중첩을 얻는다",
      "icon": "skill_1202",
      "sfx": "skill_1202_hit",
      "element": 1,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 1,
      "mana": 30,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1
      ],
      "buff": [
        70
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1203,
      "name": "금침술",
      "desc": "금속성 공격력 50% 피해를 입히고 적을 상처 입히면 적에게 파갑 3중첩을 부여한다",
      "icon": "skill_1203",
      "sfx": "skill_1203_hit",
      "element": 1,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 70,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        1
      ],
      "buff": [
        12030
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1301,
      "name": "거검술",
      "desc": "금속성 공격력 135% 피해를 입히며 장비한 무기의 품질 1당 이 법술이 추가로 피해 증폭 20%를 얻는다",
      "icon": "skill_1301",
      "sfx": "skill_1301_hit",
      "element": 1,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 135,
      "buffTarget": [
        1
      ],
      "buff": [
        13010
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1302,
      "name": "추풍검술",
      "desc": "금속성 공격력 50% 피해를 입히고 적을 상처 입히면 피해 증폭 3중첩을 얻는다",
      "icon": "skill_1302",
      "sfx": "skill_1302_hit",
      "element": 1,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        1
      ],
      "buff": [
        13020
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1303,
      "name": "은검결",
      "desc": "금속성 공격력 160% 피해를 입히고 적을 상처 입히면 추가로 공격력 100%의 고정 피해를 입힌다",
      "icon": "skill_1303",
      "sfx": "skill_1303_hit",
      "element": 1,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 160,
      "buffTarget": [
        1
      ],
      "buff": [
        13030
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1304,
      "name": "승풍어검술",
      "desc": "금속성 공격력 30% 피해를 5회 입히고 자신에게 가속 2중첩을 부여한다",
      "icon": "skill_1304",
      "sfx": "skill_1304_hit",
      "element": 1,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 125,
      "segment": 5,
      "interval": [
        100,
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 30,
      "buffTarget": [
        1
      ],
      "buff": [
        180
      ],
      "layer": [
        2
      ],
      "elementLabel": "목"
    },
    {
      "id": 1401,
      "name": "개산검참술",
      "desc": "금속성 공격력 130% 피해를 입히며 법보를 1개 지닐 때마다 이 법술이 추가로 피해 증폭 15%를 얻는다",
      "icon": "skill_1401",
      "sfx": "skill_1401_hit",
      "element": 1,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 130,
      "buffTarget": [
        1
      ],
      "buff": [
        14010
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1402,
      "name": "성명검무",
      "desc": "이번 전투에서 입히는 피해가 30% 증가한다 (중첩 가능)",
      "icon": "skill_1402",
      "sfx": "skill_1402_hit",
      "element": 1,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 1,
      "mana": 200,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1
      ],
      "buff": [
        14020
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1403,
      "name": "검영술",
      "desc": "금속성 공격력 65% 피해를 2회 입히고 자신에게 피해 증폭이 있으면 추가로 공격력 300%의 고정 피해를 입힌다",
      "icon": "skill_1403",
      "sfx": "skill_1403_hit",
      "element": 1,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 2,
      "interval": [
        100,
        100
      ],
      "attr": 1,
      "value": 65,
      "buffTarget": [
        1
      ],
      "buff": [
        14030
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1404,
      "name": "융풍허영술",
      "desc": "금속성 공격력 50% 피해를 2회 입히고 미종 2중첩을 얻는다",
      "icon": "skill_1404",
      "sfx": "skill_1404_hit",
      "element": 1,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 240,
      "segment": 2,
      "interval": [
        100,
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        1
      ],
      "buff": [
        150
      ],
      "layer": [
        2
      ],
      "elementLabel": "목"
    },
    {
      "id": 1501,
      "name": "만검귀일결",
      "desc": "금속성 공격력 135% 피해를 입히며 지닌 법보의 품질 1당 이 법술이 추가로 피해 증폭 4%를 얻는다",
      "icon": "skill_1501",
      "sfx": "skill_1501_hit",
      "element": 1,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 135,
      "buffTarget": [
        1
      ],
      "buff": [
        15010
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1502,
      "name": "금강복마인",
      "desc": "금속성 공격력 220% 피해를 입히고 적을 상처 입히면 집기 1중첩을 얻는다",
      "icon": "skill_1502",
      "sfx": "skill_1502_hit",
      "element": 1,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 220,
      "buffTarget": [
        1
      ],
      "buff": [
        15020
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1503,
      "name": "칠성파군인",
      "desc": "금속성 공격력 190% 피해를 입히고 적에게 파갑이 있으면 이번 공격으로 적이 받는 피해가 100% 증가한다",
      "icon": "skill_1503",
      "sfx": "skill_1503_hit",
      "element": 1,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 190,
      "buffTarget": [
        2
      ],
      "buff": [
        15030
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 1504,
      "name": "삼매신풍주",
      "desc": "금속성 공격력 190% 피해를 입히고 적을 상처 입히면 연격을 발동한다",
      "icon": "skill_1504",
      "sfx": "skill_1504_hit",
      "element": 1,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 450,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 190,
      "buffTarget": [
        1
      ],
      "buff": [
        15040
      ],
      "layer": [
        1
      ],
      "elementLabel": "목"
    },
    {
      "id": 2101,
      "name": "목령술",
      "desc": "목속성 공격력 50% 피해를 2회 입힌다",
      "icon": "skill_2101",
      "sfx": "skill_2101_hit",
      "element": 2,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 2,
      "interval": [
        100,
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "화"
    },
    {
      "id": 2102,
      "name": "독자주",
      "desc": "목속성 공격력 25% 피해를 2회 입히고 적에게 중독 2중첩을 부여한다",
      "icon": "skill_2102",
      "sfx": "skill_2102_hit",
      "element": 2,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 30,
      "segment": 2,
      "interval": [
        100,
        100
      ],
      "attr": 1,
      "value": 25,
      "buffTarget": [
        2
      ],
      "buff": [
        20
      ],
      "layer": [
        2
      ],
      "elementLabel": "화"
    },
    {
      "id": 2103,
      "name": "고영술",
      "desc": "이번 전투에서 적의 공격력을 10% 감소시킨다 (중첩 가능)",
      "icon": "skill_2103",
      "sfx": "skill_2103_hit",
      "element": 2,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2
      ],
      "buff": [
        21030
      ],
      "layer": [
        1
      ],
      "elementLabel": "화"
    },
    {
      "id": 2201,
      "name": "영엽술",
      "desc": "목속성 공격력 60% 피해를 3회 입히고 시전 후 60% 확률로 목령술을 추가 시전한다",
      "icon": "skill_2201",
      "sfx": "skill_2201_hit",
      "element": 2,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 3,
      "interval": [
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 60,
      "buffTarget": [
        1
      ],
      "buff": [
        22010
      ],
      "layer": [
        1
      ],
      "elementLabel": "화"
    },
    {
      "id": 2202,
      "name": "목뢰술",
      "desc": "목속성 공격력 45% 피해를 2회 입히고 적의 진행도를 30% 감소시킨다",
      "icon": "skill_2202",
      "sfx": "skill_2202_hit",
      "element": 2,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 2,
      "interval": [
        100,
        100
      ],
      "attr": 1,
      "value": 45,
      "buffTarget": [
        2
      ],
      "buff": [
        22020
      ],
      "layer": [
        1
      ],
      "elementLabel": "화"
    },
    {
      "id": 2203,
      "name": "독무술",
      "desc": "적에게 중독 4중첩을 부여한다",
      "icon": "skill_2203",
      "sfx": "skill_2203_hit",
      "element": 2,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2
      ],
      "buff": [
        20
      ],
      "layer": [
        4
      ],
      "elementLabel": "화"
    },
    {
      "id": 2301,
      "name": "형극술",
      "desc": "목속성 공격력 18% 피해를 3회 입히고 적에게 가시 2중첩을 부여한다",
      "icon": "skill_2301",
      "sfx": "skill_2301_hit",
      "element": 2,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 125,
      "segment": 3,
      "interval": [
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 18,
      "buffTarget": [
        2
      ],
      "buff": [
        200
      ],
      "layer": [
        2
      ],
      "elementLabel": "화"
    },
    {
      "id": 2302,
      "name": "회춘술",
      "desc": "생명력 공격력 200%를 회복한다 (목령근 보정 적용) (생명력 80% 미만일 때만 시전)",
      "icon": "skill_2302",
      "sfx": "skill_2302_hit",
      "element": 2,
      "quality": 3,
      "condition": [
        1
      ],
      "condValue": [
        80
      ],
      "target": 1,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": -200,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "화"
    },
    {
      "id": 2303,
      "name": "독폭술",
      "desc": "적에게 중독이 있으면 중독 3중첩을 추가하고 즉시 중독 피해를 1회 발동한다",
      "icon": "skill_2303",
      "sfx": "skill_2303_hit",
      "element": 2,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2,
        2
      ],
      "buff": [
        23030,
        21
      ],
      "layer": [
        1,
        1
      ],
      "elementLabel": "화"
    },
    {
      "id": 2304,
      "name": "뇌격술",
      "desc": "목속성 공격력 150% 피해를 입히고 50% 확률로 적에게 마비 2중첩을 부여한다",
      "icon": "skill_2304",
      "sfx": "skill_2304_hit",
      "element": 2,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 125,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [
        1
      ],
      "buff": [
        23040
      ],
      "layer": [
        1
      ],
      "elementLabel": "화"
    },
    {
      "id": 2401,
      "name": "염화비엽술",
      "desc": "목속성 공격력 50% 피해를 4회 입히고 상대의 중독 중첩마다 자신의 생명력을 1% 회복한다",
      "icon": "skill_2401",
      "sfx": "skill_2401_hit",
      "element": 2,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 4,
      "interval": [
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        2
      ],
      "buff": [
        24010
      ],
      "layer": [
        1
      ],
      "elementLabel": "화"
    },
    {
      "id": 2402,
      "name": "화우술",
      "desc": "목속성 공격력 30% 피해를 4회 입히고 입힌 피해에 비례해 생명력을 회복한다",
      "icon": "skill_2402",
      "sfx": "skill_2402_hit",
      "element": 2,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 4,
      "interval": [
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 30,
      "buffTarget": [
        1
      ],
      "buff": [
        24020
      ],
      "layer": [
        4
      ],
      "elementLabel": "화"
    },
    {
      "id": 2403,
      "name": "독엽술",
      "desc": "목속성 공격력 38% 피해를 4회 입히며 각 타격마다 50% 확률로 적에게 중독 1중첩을 부여한다",
      "icon": "skill_2403",
      "sfx": "skill_2403_hit",
      "element": 2,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 4,
      "interval": [
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 38,
      "buffTarget": [
        1
      ],
      "buff": [
        24030
      ],
      "layer": [
        4
      ],
      "elementLabel": "화"
    },
    {
      "id": 2404,
      "name": "천뢰탕마결",
      "desc": "목속성 공격력 200% 피해를 입히며 이 공격은 반드시 명중한다",
      "icon": "skill_2404",
      "sfx": "skill_2404_hit",
      "element": 2,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 240,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [
        1
      ],
      "buff": [
        160
      ],
      "layer": [
        1
      ],
      "elementLabel": "화"
    },
    {
      "id": 2501,
      "name": "비엽폭풍술",
      "desc": "목속성 공격력 30% 피해를 5회 입히고 시전 후 50% 확률로 이 법술을 반복 시전한다",
      "icon": "skill_2501",
      "sfx": "skill_2501_hit",
      "element": 2,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 5,
      "interval": [
        100,
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 30,
      "buffTarget": [
        1
      ],
      "buff": [
        25010
      ],
      "layer": [
        1
      ],
      "elementLabel": "화"
    },
    {
      "id": 2502,
      "name": "신목결",
      "desc": "목속성 공격력 20% 피해를 5회 입히고 적의 중독 중첩을 2배로 만든다",
      "icon": "skill_2502",
      "sfx": "skill_2502_hit",
      "element": 2,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 5,
      "interval": [
        100,
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 20,
      "buffTarget": [
        2
      ],
      "buff": [
        25020
      ],
      "layer": [
        1
      ],
      "elementLabel": "화"
    },
    {
      "id": 2503,
      "name": "보리목인",
      "desc": "목속성 공격력 10% 피해를 5회 입히고 적에게 가시 3중첩을 부여한다",
      "icon": "skill_2503",
      "sfx": "skill_2503_hit",
      "element": 2,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 450,
      "segment": 5,
      "interval": [
        100,
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 10,
      "buffTarget": [
        2
      ],
      "buff": [
        200
      ],
      "layer": [
        3
      ],
      "elementLabel": "화"
    },
    {
      "id": 2504,
      "name": "오뢰정법",
      "desc": "목속성 공격력 30% 피해를 5회 입히며 각 타격마다 20% 확률로 적에게 마비 2중첩을 부여한다",
      "icon": "skill_2504",
      "sfx": "skill_2504_hit",
      "element": 2,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 450,
      "segment": 5,
      "interval": [
        100,
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 30,
      "buffTarget": [
        1
      ],
      "buff": [
        25040
      ],
      "layer": [
        5
      ],
      "elementLabel": "화"
    },
    {
      "id": 3101,
      "name": "수령주",
      "desc": "수속성 영력 상한 20% 피해를 입힌다",
      "icon": "skill_3101",
      "sfx": "skill_3101_hit",
      "element": 3,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 3,
      "value": 20,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "토"
    },
    {
      "id": 3102,
      "name": "회령결",
      "desc": "영력 상한 20%의 영력을 회복한다 (영력 80% 미만일 때만 시전)",
      "icon": "skill_3102",
      "sfx": "skill_3102_hit",
      "element": 3,
      "quality": 1,
      "condition": [
        2
      ],
      "condValue": [
        80
      ],
      "target": 1,
      "mana": 0,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1
      ],
      "buff": [
        31020
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3103,
      "name": "춘수술",
      "desc": "생명 상한 5%의 생명력을 회복한다 (수령근 보정 적용) (생명력 80% 미만일 때만 시전)",
      "icon": "skill_3103",
      "sfx": "skill_3103_hit",
      "element": 3,
      "quality": 1,
      "condition": [
        1
      ],
      "condValue": [
        80
      ],
      "target": 1,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 2,
      "value": -5,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "토"
    },
    {
      "id": 3201,
      "name": "수전술",
      "desc": "수속성 공격력 100% 피해를 입히고 적의 영력이 50% 미만이면 추가로 영력 상한 40%의 고정 피해를 입힌다",
      "icon": "skill_3201",
      "sfx": "skill_3201_hit",
      "element": 3,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        32010
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3202,
      "name": "춘풍화우술",
      "desc": "자신의 무작위 약화 2중첩을 정화하고 치유 3중첩을 얻는다",
      "icon": "skill_3202",
      "sfx": "skill_3202_hit",
      "element": 3,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 1,
      "mana": 50,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1,
        1
      ],
      "buff": [
        32020,
        210
      ],
      "layer": [
        1,
        3
      ],
      "elementLabel": "토"
    },
    {
      "id": 3203,
      "name": "수뢰술",
      "desc": "수속성 공격력 125% 피해를 입히고 적의 영력을 10% 감소시킨다",
      "icon": "skill_3203",
      "sfx": "skill_3203_hit",
      "element": 3,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 125,
      "buffTarget": [
        2
      ],
      "buff": [
        32030
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3301,
      "name": "수창술",
      "desc": "수속성 공격력 85% 피해를 입히고 자신의 영력이 80% 초과면 80% 확률로 이 법술을 다시 시전한다",
      "icon": "skill_3301",
      "sfx": "skill_3301_hit",
      "element": 3,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 85,
      "buffTarget": [
        1
      ],
      "buff": [
        33010
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3302,
      "name": "호풍환우주",
      "desc": "수속성 공격력 150% 피해를 입히고 영력이 50% 미만이면 추가로 공격력 200%의 고정 피해를 입힌다",
      "icon": "skill_3302",
      "sfx": "skill_3302_hit",
      "element": 3,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [
        1
      ],
      "buff": [
        33020
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3303,
      "name": "수파회령술",
      "desc": "수속성 공격력 175% 피해를 입히고 영력이 50% 미만이면 회령 4중첩을 얻는다",
      "icon": "skill_3303",
      "sfx": "skill_3303_hit",
      "element": 3,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 175,
      "buffTarget": [
        1
      ],
      "buff": [
        33030
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3304,
      "name": "한빙술",
      "desc": "수속성 공격력 125% 피해를 입히고 50% 확률로 적에게 빙결 1중첩을 부여한다",
      "icon": "skill_3304",
      "sfx": "skill_3304_hit",
      "element": 3,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 125,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 125,
      "buffTarget": [
        1
      ],
      "buff": [
        33040
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3401,
      "name": "수폭술",
      "desc": "수속성 공격력 125% 피해를 입히며 이 법술을 사용할 때마다 이 법술이 추가로 피해 증폭 50%를 얻는다 (중첩 가능)",
      "icon": "skill_3401",
      "sfx": "skill_3401_hit",
      "element": 3,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 125,
      "buffTarget": [
        1,
        1
      ],
      "buff": [
        34010,
        34011
      ],
      "layer": [
        1,
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3402,
      "name": "심수령압술",
      "desc": "수속성 공격력 165% 피해를 입히고 영력이 50% 미만이면 이 법술이 추가로 피해 증폭 100%를 얻는다",
      "icon": "skill_3402",
      "sfx": "skill_3402_hit",
      "element": 3,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 165,
      "buffTarget": [
        1
      ],
      "buff": [
        34020
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3403,
      "name": "주령법",
      "desc": "자신의 영력 30%를 소모하고 생명 상한 60%의 생명력을 회복한다 (수령근 보정 적용) (영력 30% 초과일 때만 시전)",
      "icon": "skill_3403",
      "sfx": "skill_3403_hit",
      "element": 3,
      "quality": 4,
      "condition": [
        4
      ],
      "condValue": [
        30
      ],
      "target": 1,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 3,
      "value": -60,
      "buffTarget": [
        1
      ],
      "buff": [
        34030
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3404,
      "name": "빙전술",
      "desc": "수속성 공격력 150% 피해를 입히고 적에게 감속 3중첩을 부여한다",
      "icon": "skill_3404",
      "sfx": "skill_3404_hit",
      "element": 3,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 240,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [
        2
      ],
      "buff": [
        190
      ],
      "layer": [
        3
      ],
      "elementLabel": "토"
    },
    {
      "id": 3501,
      "name": "수포술",
      "desc": "수속성 영력 상한 120% 피해를 입히며 이 법술은 자신의 영력 50%를 소모한다 (영력 50% 초과일 때만 시전)",
      "icon": "skill_3501",
      "sfx": "skill_3501_hit",
      "element": 3,
      "quality": 5,
      "condition": [
        4
      ],
      "condValue": [
        50
      ],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 3,
      "value": 120,
      "buffTarget": [
        1
      ],
      "buff": [
        35010
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3502,
      "name": "삼광응수법",
      "desc": "치유 3중첩과 회령 3중첩을 얻고 이번 전투에서 영력 상한이 10% 증가한다 (중첩 가능) (영력 또는 생명력 80% 미만일 때만 시전)",
      "icon": "skill_3502",
      "sfx": "skill_3502_hit",
      "element": 3,
      "quality": 5,
      "condition": [
        1,
        2
      ],
      "condValue": [
        80,
        80
      ],
      "target": 1,
      "mana": 400,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1,
        1,
        1
      ],
      "buff": [
        210,
        220,
        35020
      ],
      "layer": [
        3,
        3,
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 3503,
      "name": "수만금산주",
      "desc": "수속성 공격력 450% 피해를 입힌다",
      "icon": "skill_3503",
      "sfx": "skill_3503_hit",
      "element": 3,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 800,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 500,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "토"
    },
    {
      "id": 3504,
      "name": "현빙술",
      "desc": "수속성 공격력 100% 피해를 입히고 적에게 빙결 1중첩을 부여한다",
      "icon": "skill_3504",
      "sfx": "skill_3504_hit",
      "element": 3,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 450,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        40
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 4101,
      "name": "연화술",
      "desc": "화속성 공격력 50% 피해를 입히고 적에게 화상 1중첩을 부여한다",
      "icon": "skill_4101",
      "sfx": "skill_4101_hit",
      "element": 4,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        2
      ],
      "buff": [
        30
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4102,
      "name": "인화술",
      "desc": "화속성 공격력 60% 피해를 입히고 적에게 화상이 있으면 추가로 공격력 100%의 고정 피해를 입힌다",
      "icon": "skill_4102",
      "sfx": "skill_4102_hit",
      "element": 4,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 60,
      "buffTarget": [
        2
      ],
      "buff": [
        41020
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4103,
      "name": "분신술",
      "desc": "자신의 생명력 5%를 소모하고 적에게 최대 생명력 15%의 고정 피해를 입힌다 (생명력 5% 초과일 때만 시전)",
      "icon": "skill_4103",
      "sfx": "skill_4103_hit",
      "element": 4,
      "quality": 1,
      "condition": [
        3
      ],
      "condValue": [
        5
      ],
      "target": 2,
      "mana": 20,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1,
        2
      ],
      "buff": [
        41030,
        41031
      ],
      "layer": [
        1,
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4201,
      "name": "열화인",
      "desc": "적에게 화상 3중첩을 부여한다",
      "icon": "skill_4201",
      "sfx": "skill_4201_hit",
      "element": 4,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2
      ],
      "buff": [
        30
      ],
      "layer": [
        3
      ],
      "elementLabel": "금"
    },
    {
      "id": 4202,
      "name": "염폭술",
      "desc": "화속성 공격력 70% 피해를 입히고 적에게 화상이 있으면 화상 중첩마다 적에게 생명력 2%의 고정 피해를 입힌다",
      "icon": "skill_4202",
      "sfx": "skill_4202_hit",
      "element": 4,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 70,
      "buffTarget": [
        2
      ],
      "buff": [
        31
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4203,
      "name": "귀화술",
      "desc": "화속성 공격력 30% 피해를 입히고 적에게 화상이 있으면 적에게 화상 3중첩을 추가 부여한다",
      "icon": "skill_4203",
      "sfx": "skill_4203_hit",
      "element": 4,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 30,
      "buffTarget": [
        2
      ],
      "buff": [
        42030
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4301,
      "name": "유명화주",
      "desc": "화속성 공격력 100% 피해를 입히고 적에게 치유 금지 2중첩을 부여한다",
      "icon": "skill_4301",
      "sfx": "skill_4301_hit",
      "element": 4,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        240
      ],
      "layer": [
        2
      ],
      "elementLabel": "금"
    },
    {
      "id": 4302,
      "name": "천화주",
      "desc": "화속성 공격력 135% 피해를 입히며 이 법술은 추가로 치명타율 50%를 얻는다",
      "icon": "skill_4302",
      "sfx": "skill_4302_hit",
      "element": 4,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 135,
      "buffTarget": [
        1
      ],
      "buff": [
        230
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4303,
      "name": "구천화인",
      "desc": "화속성 공격력 120% 피해를 입히고 적에게 화상이 있으면 적의 현재 생명력 20%를 추가로 감소시킨다",
      "icon": "skill_4303",
      "sfx": "skill_4303_hit",
      "element": 4,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 120,
      "buffTarget": [
        2
      ],
      "buff": [
        43030
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4304,
      "name": "열양광주",
      "desc": "화속성 공격력 170% 피해를 입히고 적의 무작위 강화 2중첩을 해산한다",
      "icon": "skill_4304",
      "sfx": "skill_4304_hit",
      "element": 4,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 125,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 170,
      "buffTarget": [
        2
      ],
      "buff": [
        43040
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4401,
      "name": "비화류성주",
      "desc": "화속성 공격력 150% 피해를 입히고 적의 생명력이 20% 미만이면 즉시 참살한다",
      "icon": "skill_4401",
      "sfx": "skill_4401_hit",
      "element": 4,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [
        2
      ],
      "buff": [
        44010
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4402,
      "name": "연혼폭염술",
      "desc": "자신의 생명력 10%를 소모하고 화속성 공격력 200% 피해를 입히며 이번 전투에서 치명타율 10%와 치명타 피해 20%가 증가한다 (중첩 가능) (생명력 10% 초과일 때만 시전)",
      "icon": "skill_4402",
      "sfx": "skill_4402_hit",
      "element": 4,
      "quality": 4,
      "condition": [
        3
      ],
      "condValue": [
        10
      ],
      "target": 2,
      "mana": 200,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [
        1,
        1
      ],
      "buff": [
        44020,
        44021
      ],
      "layer": [
        1,
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4403,
      "name": "서염술",
      "desc": "화속성 공격력 50% 피해를 입히고 적의 화상 1중첩마다 자신의 생명력을 공격력 100%만큼 회복한다",
      "icon": "skill_4403",
      "sfx": "skill_4403_hit",
      "element": 4,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 240,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        2
      ],
      "buff": [
        44030
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4404,
      "name": "태양진인",
      "desc": "화속성 공격력 100% 피해를 입히고 적에게 현혹 2중첩을 부여한다",
      "icon": "skill_4404",
      "sfx": "skill_4404_hit",
      "element": 4,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 240,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        140
      ],
      "layer": [
        2
      ],
      "elementLabel": "금"
    },
    {
      "id": 4501,
      "name": "삼매진화술",
      "desc": "화속성 공격력 50% 피해를 입히고 적에게 화상 8중첩을 부여한다",
      "icon": "skill_4501",
      "sfx": "skill_4501_hit",
      "element": 4,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        2
      ],
      "buff": [
        30
      ],
      "layer": [
        8
      ],
      "elementLabel": "금"
    },
    {
      "id": 4502,
      "name": "남명리화인",
      "desc": "화속성 공격력 200% 피해를 입히고 자신의 생명력이 50% 미만이면 적에게 생명력 20%의 고정 피해를 추가로 입힌다",
      "icon": "skill_4502",
      "sfx": "skill_4502_hit",
      "element": 4,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [
        1
      ],
      "buff": [
        45020
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4503,
      "name": "홍련업화결",
      "desc": "자신의 생명력 25%를 소모하고 화속성 공격력 550% 피해를 입힌다 (생명력 25% 초과일 때만 시전)",
      "icon": "skill_4503",
      "sfx": "skill_4503_hit",
      "element": 4,
      "quality": 5,
      "condition": [
        3
      ],
      "condValue": [
        25
      ],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 550,
      "buffTarget": [
        1
      ],
      "buff": [
        45030
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 4504,
      "name": "광요구천결",
      "desc": "화속성 공격력 200% 피해를 입히고 적에게 침묵 1중첩을 부여한다",
      "icon": "skill_4504",
      "sfx": "skill_4504_hit",
      "element": 4,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 450,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [
        2
      ],
      "buff": [
        80
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 5101,
      "name": "낙석술",
      "desc": "자신의 생명 상한 5%만큼 토속성 피해를 입힌다",
      "icon": "skill_5101",
      "sfx": "skill_5101_hit",
      "element": 5,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 2,
      "value": 5,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "수"
    },
    {
      "id": 5102,
      "name": "붕지술",
      "desc": "토속성 공격력 50% 피해를 입히고 5% 확률로 적을 즉사시킨다",
      "icon": "skill_5102",
      "sfx": "skill_5102_hit",
      "element": 5,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        1
      ],
      "buff": [
        51020
      ],
      "layer": [
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 5103,
      "name": "지진술",
      "desc": "토속성 공격력 60% 피해를 입히고 20% 확률로 적에게 기절 1턴을 부여한다",
      "icon": "skill_5103",
      "sfx": "skill_5103_hit",
      "element": 5,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 60,
      "buffTarget": [
        1
      ],
      "buff": [
        51030
      ],
      "layer": [
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 5201,
      "name": "비석술",
      "desc": "토속성 공격력 110% 피해를 입히고 자신의 생명력이 50% 초과면 추가로 공격력 100%의 고정 피해를 입힌다",
      "icon": "skill_5201",
      "sfx": "skill_5201_hit",
      "element": 5,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 110,
      "buffTarget": [
        1
      ],
      "buff": [
        52010
      ],
      "layer": [
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 5202,
      "name": "반석술",
      "desc": "반상 3중첩을 얻는다",
      "icon": "skill_5202",
      "sfx": "skill_5202_hit",
      "element": 5,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 1,
      "mana": 50,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1,
        1
      ],
      "buff": [
        110
      ],
      "layer": [
        3
      ],
      "elementLabel": "수"
    },
    {
      "id": 5203,
      "name": "암석술",
      "desc": "피해 감소 1중첩을 얻고 이번 전투에서 피해 감소가 2% 증가한다 (중첩 가능)",
      "icon": "skill_5203",
      "sfx": "skill_5203_hit",
      "element": 5,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 1,
      "mana": 50,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1,
        1
      ],
      "buff": [
        90,
        52030
      ],
      "layer": [
        1,
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 5301,
      "name": "지룡번신술",
      "desc": "토속성 공격력 100% 피해를 입히고 이번 전투에서 생명 상한이 5% 증가한다 (중첩 가능)",
      "icon": "skill_5301",
      "sfx": "skill_5301_hit",
      "element": 5,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        1
      ],
      "buff": [
        53010
      ],
      "layer": [
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 5302,
      "name": "암정술",
      "desc": "토속성 공격력 40% 피해를 입히고 적의 생명력이 50% 초과면 추가로 자신의 생명력 20%만큼 고정 피해를 입힌다",
      "icon": "skill_5302",
      "sfx": "skill_5302_hit",
      "element": 5,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 40,
      "buffTarget": [
        2
      ],
      "buff": [
        53020
      ],
      "layer": [
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 5303,
      "name": "비석진탕술",
      "desc": "공격력의 40%만큼 토속성 피해를 입힌다. 적 생명력이 50% 초과면 1턴 기절시킨다.",
      "icon": "skill_5303",
      "sfx": "skill_5303_hit",
      "element": 5,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 40,
      "buffTarget": [
        2
      ],
      "buff": [
        53030
      ],
      "layer": [
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 5304,
      "name": "지지음토법",
      "desc": "공격력의 100%만큼 토속성 피해를 입히고 적에게 허약 2중첩을 부여한다.",
      "icon": "skill_5304",
      "sfx": "skill_5304_hit",
      "element": 5,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 125,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        130
      ],
      "layer": [
        2
      ],
      "elementLabel": "수"
    },
    {
      "id": 5401,
      "name": "이산법",
      "desc": "자신 생명력 5%를 소모해 적에게 자신 생명력 상한의 15%만큼 토속성 피해를 입힌다. 생명력 5% 초과 시에만 발동",
      "icon": "skill_5401",
      "sfx": "skill_5401_hit",
      "element": 5,
      "quality": 4,
      "condition": [
        3
      ],
      "condValue": [
        5
      ],
      "target": 2,
      "mana": 200,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 2,
      "value": 20,
      "buffTarget": [
        1
      ],
      "buff": [
        54010
      ],
      "layer": [
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 5402,
      "name": "취토성갑술",
      "desc": "공격력의 50%만큼 토속성 피해를 입히고 피해 감소 2중첩을 얻는다.",
      "icon": "skill_5402",
      "sfx": "skill_5402_hit",
      "element": 5,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        1
      ],
      "buff": [
        90
      ],
      "layer": [
        3
      ],
      "elementLabel": "수"
    },
    {
      "id": 5403,
      "name": "십절지열진",
      "desc": "공격력의 50%만큼 토속성 피해를 입히고 반사 피해 4중첩을 얻는다.",
      "icon": "skill_5403",
      "sfx": "skill_5403_hit",
      "element": 5,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        1
      ],
      "buff": [
        110
      ],
      "layer": [
        4
      ],
      "elementLabel": "수"
    },
    {
      "id": 5404,
      "name": "유토섭혼술",
      "desc": "자신 생명력 상한의 8%만큼 토속성 피해를 입히고 그 수치만큼 회복한다.",
      "icon": "skill_5404",
      "sfx": "skill_5404_hit",
      "element": 5,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 240,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 2,
      "value": 8,
      "buffTarget": [
        1
      ],
      "buff": [
        54040
      ],
      "layer": [
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 5501,
      "name": "반산설령술",
      "desc": "공격력의 200%만큼 토속성 피해를 입힌다. 자신의 피해 감소에 비례해 이 법술의 피해에 상응 보너스를 얻는다.",
      "icon": "skill_5501",
      "sfx": "skill_5501_hit",
      "element": 5,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [
        1
      ],
      "buff": [
        55010
      ],
      "layer": [
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 5502,
      "name": "후토인",
      "desc": "공격력의 100%만큼 토속성 피해를 입히고 보호막 2중첩을 얻는다.",
      "icon": "skill_5502",
      "sfx": "skill_5502_hit",
      "element": 5,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        1
      ],
      "buff": [
        100
      ],
      "layer": [
        2
      ],
      "elementLabel": "수"
    },
    {
      "id": 5503,
      "name": "현명지살인",
      "desc": "공격력의 100%만큼 토속성 피해를 입히고 적을 1턴 기절시킨다.",
      "icon": "skill_5503",
      "sfx": "skill_5503_hit",
      "element": 5,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        10
      ],
      "layer": [
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 5504,
      "name": "지장결",
      "desc": "공격력의 200%만큼 토속성 피해를 입히고 적이 이번 전투에서 가하는 피해를 10% 감소시킨다. 중첩 가능",
      "icon": "skill_5504",
      "sfx": "skill_5504_hit",
      "element": 5,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 450,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [
        2
      ],
      "buff": [
        55040
      ],
      "layer": [
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 6011,
      "name": "야만의 물어뜯기",
      "desc": "3회 공격력의 50%만큼 피해를 입힌다.",
      "icon": "skill_6011",
      "sfx": "skill_6011_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 3,
      "interval": [
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": ""
    },
    {
      "id": 6021,
      "name": "야만의 돌진",
      "desc": "공격력의 150%만큼 피해를 입힌다.",
      "icon": "skill_6021",
      "sfx": "skill_6021_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": ""
    },
    {
      "id": 6031,
      "name": "매혹",
      "desc": "공격력의 100%만큼 피해를 입히고 25% 확률로 적을 1턴 기절시킨다.",
      "icon": "skill_6031",
      "sfx": "skill_6031_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        1
      ],
      "buff": [
        60310
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 6032,
      "name": "호화",
      "desc": "공격력의 50%만큼 피해를 입히고 적에게 화상 1중첩을 부여한다.",
      "icon": "skill_6032",
      "sfx": "skill_6032_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        2
      ],
      "buff": [
        30
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 6033,
      "name": "호념지술",
      "desc": "공격력의 200%만큼 피해를 입힌다.",
      "icon": "skill_6033",
      "sfx": "skill_6033_hit",
      "element": 0,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": ""
    },
    {
      "id": 6041,
      "name": "결박",
      "desc": "공격력의 30%만큼 피해를 입히고 적에게 감속 2중첩을 부여한다.",
      "icon": "skill_6041",
      "sfx": "skill_6041_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 30,
      "buffTarget": [
        2
      ],
      "buff": [
        190
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 6042,
      "name": "독액 분사",
      "desc": "공격력의 80%만큼 피해를 입히고 적에게 중독 3중첩을 부여한다.",
      "icon": "skill_6042",
      "sfx": "skill_6042_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 20,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 80,
      "buffTarget": [
        2
      ],
      "buff": [
        20
      ],
      "layer": [
        3
      ],
      "elementLabel": ""
    },
    {
      "id": 6043,
      "name": "미환지술",
      "desc": "공격력의 100%만큼 피해를 입히고 적에게 현혹 1중첩을 부여한다.",
      "icon": "skill_6043",
      "sfx": "skill_6043_hit",
      "element": 0,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        140
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 6051,
      "name": "귀수",
      "desc": "공격력의 150%만큼 수속성 피해를 입히고 가속 1중첩을 얻는다.",
      "icon": "skill_6051",
      "sfx": "skill_6051_hit",
      "element": 3,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [
        1
      ],
      "buff": [
        180
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 6052,
      "name": "극한귀기",
      "desc": "공격력의 75%만큼 수속성 피해를 입히고 50% 확률로 적에게 빙결 1중첩을 부여한다.",
      "icon": "skill_6052",
      "sfx": "skill_6052_hit",
      "element": 3,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 75,
      "buffTarget": [
        1
      ],
      "buff": [
        60520
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 6053,
      "name": "한기참",
      "desc": "공격력의 150%만큼 수속성 피해를 입힌다. 적이 빙결 상태면 빙결 1중첩을 추가한다.",
      "icon": "skill_6053",
      "sfx": "skill_6053_hit",
      "element": 3,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [
        2
      ],
      "buff": [
        60530
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 6061,
      "name": "거석 투척",
      "desc": "공격력의 200%만큼 토속성 피해를 입힌다.",
      "icon": "skill_6061",
      "sfx": "skill_6061_hit",
      "element": 5,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "수"
    },
    {
      "id": 6062,
      "name": "경화암석",
      "desc": "보호막 1중첩과 반사 피해 1중첩을 얻는다.",
      "icon": "skill_6062",
      "sfx": "skill_6062_hit",
      "element": 5,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1,
        1
      ],
      "buff": [
        100,
        110
      ],
      "layer": [
        1,
        1
      ],
      "elementLabel": "수"
    },
    {
      "id": 6071,
      "name": "시독술",
      "desc": "적에게 중독 5중첩을 부여한다.",
      "icon": "skill_6071",
      "sfx": "skill_6071_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2
      ],
      "buff": [
        20
      ],
      "layer": [
        5
      ],
      "elementLabel": ""
    },
    {
      "id": 6072,
      "name": "시독폭발",
      "desc": "중독 1중첩을 부여하고 독폭발을 발동한다.",
      "icon": "skill_6072",
      "sfx": "skill_6072_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2,
        2
      ],
      "buff": [
        20,
        21
      ],
      "layer": [
        1,
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 6073,
      "name": "시폭술",
      "desc": "공격력의 200%만큼 피해를 입히고 중독 2중첩을 부여한다.",
      "icon": "skill_6073",
      "sfx": "skill_6073_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [
        2
      ],
      "buff": [
        20
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 6081,
      "name": "연혈술",
      "desc": "자신에게 화상 2중첩과 기력집중 2중첩을 부여한다.",
      "icon": "skill_6081",
      "sfx": "skill_6081_hit",
      "element": 4,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1,
        1
      ],
      "buff": [
        30,
        70
      ],
      "layer": [
        2,
        2
      ],
      "elementLabel": "금"
    },
    {
      "id": 6082,
      "name": "기혈주",
      "desc": "공격력의 125%만큼 화속성 피해를 입히고 피해 수치만큼 회복한다.",
      "icon": "skill_6082",
      "sfx": "skill_6082_hit",
      "element": 4,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 125,
      "buffTarget": [
        1
      ],
      "buff": [
        60820
      ],
      "layer": [
        1
      ],
      "elementLabel": "금"
    },
    {
      "id": 6083,
      "name": "사화술",
      "desc": "공격력의 150%만큼 화속성 피해를 입히고 적에게 화상 3중첩을 부여한다.",
      "icon": "skill_6083",
      "sfx": "skill_6083_hit",
      "element": 4,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [
        2
      ],
      "buff": [
        30
      ],
      "layer": [
        3
      ],
      "elementLabel": "금"
    },
    {
      "id": 6091,
      "name": "맹호조",
      "desc": "공격력의 300%만큼 피해를 입힌다.",
      "icon": "skill_6091",
      "sfx": "skill_6091_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 300,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": ""
    },
    {
      "id": 6092,
      "name": "열호참",
      "desc": "공격력의 250%만큼 피해를 입힌다. 이번 공격은 추가 치명타율 50%를 얻는다.",
      "icon": "skill_6092",
      "sfx": "skill_6092_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 250,
      "buffTarget": [
        1
      ],
      "buff": [
        230
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 6101,
      "name": "용식",
      "desc": "공격력의 100%만큼 수속성 피해를 입히고 적을 1턴 빙결시킨다.",
      "icon": "skill_6101",
      "sfx": "skill_6101_hit",
      "element": 3,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        40
      ],
      "layer": [
        1
      ],
      "elementLabel": "토"
    },
    {
      "id": 6102,
      "name": "강뢰",
      "desc": "공격력의 250%만큼 목속성 피해를 입히고 적을 1턴 마비시킨다.",
      "icon": "skill_6102",
      "sfx": "skill_6102_hit",
      "element": 2,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 250,
      "buffTarget": [
        2
      ],
      "buff": [
        120
      ],
      "layer": [
        1
      ],
      "elementLabel": "화"
    },
    {
      "id": 6103,
      "name": "천상룡섬",
      "desc": "공격력의 500%만큼 금속성 피해를 입힌다.",
      "icon": "skill_6103",
      "sfx": "skill_6103_hit",
      "element": 1,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 800,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 500,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "목"
    },
    {
      "id": 7011,
      "name": "가시덩굴",
      "desc": "4회 공격력의 25%만큼 목속성 피해를 입히고 적에게 가시 2중첩을 부여한다.",
      "icon": "skill_7011",
      "sfx": "skill_7011_hit",
      "element": 2,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 4,
      "interval": [
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 25,
      "buffTarget": [
        2
      ],
      "buff": [
        200
      ],
      "layer": [
        2
      ],
      "elementLabel": "화"
    },
    {
      "id": 7012,
      "name": "자기재생",
      "desc": "공격력의 200%만큼 생명력을 회복한다.",
      "icon": "skill_7012",
      "sfx": "skill_7012_hit",
      "element": 2,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 1,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": -200,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "화"
    },
    {
      "id": 7013,
      "name": "채찍 공격",
      "desc": "5회 공격력의 40%만큼 목속성 피해를 입힌다.",
      "icon": "skill_7013",
      "sfx": "skill_7013_hit",
      "element": 2,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 4,
      "interval": [
        100,
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "화"
    },
    {
      "id": 7021,
      "name": "거미줄 속박",
      "desc": "공격력의 80%만큼 피해를 입히고 적에게 감속 2중첩을 부여한다.",
      "icon": "skill_7021",
      "sfx": "skill_7021_hit",
      "element": 0,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 80,
      "buffTarget": [
        2
      ],
      "buff": [
        190
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 7022,
      "name": "맹독 주입",
      "desc": "공격력의 80%만큼 피해를 입히고 적에게 중독 3중첩을 부여한다.",
      "icon": "skill_7022",
      "sfx": "skill_7022_hit",
      "element": 0,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 80,
      "buffTarget": [
        2
      ],
      "buff": [
        20
      ],
      "layer": [
        3
      ],
      "elementLabel": ""
    },
    {
      "id": 7023,
      "name": "궁극 흡수",
      "desc": "공격력의 100%만큼 피해를 입히고 피해 수치만큼 회복한다.",
      "icon": "skill_7023",
      "sfx": "skill_7023_hit",
      "element": 0,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 50,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        1
      ],
      "buff": [
        70230
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 7031,
      "name": "집력 도끼 베기",
      "desc": "공격력의 240%만큼 피해를 입히고 피해 증가 2중첩을 얻는다.",
      "icon": "skill_7031",
      "sfx": "skill_7031_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 240,
      "buffTarget": [
        1
      ],
      "buff": [
        50
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 7032,
      "name": "파갑 강타",
      "desc": "공격력의 240%만큼 피해를 입히고 적에게 방어파괴 2중첩을 부여한다.",
      "icon": "skill_7032",
      "sfx": "skill_7032_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 240,
      "buffTarget": [
        2
      ],
      "buff": [
        60
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 7033,
      "name": "전쟁의 함성",
      "desc": "공격력의 200%만큼 피해를 입히고 적에게 마비 1중첩을 부여한다.",
      "icon": "skill_7033",
      "sfx": "skill_7033_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [
        2
      ],
      "buff": [
        120
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 7041,
      "name": "발도참",
      "desc": "공격력의 350%만큼 피해를 입힌 뒤 자신이 1턴 기절한다.",
      "icon": "skill_7041",
      "sfx": "skill_7041_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 350,
      "buffTarget": [
        1
      ],
      "buff": [
        10
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 7051,
      "name": "정신 충격",
      "desc": "공격력의 50%만큼 피해를 입히고 적을 1턴 기절시킨다.",
      "icon": "skill_7051",
      "sfx": "skill_7051_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        2
      ],
      "buff": [
        10
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 7052,
      "name": "환시",
      "desc": "공격력의 150%만큼 피해를 입히고 적에게 마비 1중첩을 부여한다.",
      "icon": "skill_7052",
      "sfx": "skill_7052_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [
        2
      ],
      "buff": [
        120
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 7053,
      "name": "식몽",
      "desc": "공격력의 100%만큼 피해를 입히고 자신 생명력을 공격력의 150%만큼 회복한다.",
      "icon": "skill_7053",
      "sfx": "skill_7053_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 100,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        1
      ],
      "buff": [
        70530
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 7061,
      "name": "독액 주입",
      "desc": "9회 공격력의 10%만큼 피해를 입힌다. 각 타격마다 50% 확률로 적에게 중독 1중첩을 부여한다.",
      "icon": "skill_7061",
      "sfx": "skill_7061_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 9,
      "interval": [
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 10,
      "buffTarget": [
        1
      ],
      "buff": [
        70610
      ],
      "layer": [
        9
      ],
      "elementLabel": ""
    },
    {
      "id": 7062,
      "name": "안개 분사",
      "desc": "공격력의 100%만큼 피해를 입히고 자신에게 회피증가 2중첩을 부여한다.",
      "icon": "skill_7062",
      "sfx": "skill_7062_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 200,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        1
      ],
      "buff": [
        150
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 7071,
      "name": "야성의 함성",
      "desc": "공격력의 150%만큼 피해를 입히고 적에게 침묵 2중첩을 부여한다.",
      "icon": "skill_7071",
      "sfx": "skill_7071_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 150,
      "buffTarget": [
        2
      ],
      "buff": [
        80
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 7072,
      "name": "제왕의 발톱",
      "desc": "공격력의 350%만큼 피해를 입힌다.",
      "icon": "skill_7072",
      "sfx": "skill_7072_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 350,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": ""
    },
    {
      "id": 7073,
      "name": "제왕휘광",
      "desc": "공격력의 170%만큼 피해를 입히고 적에게 현혹 3중첩을 부여한다.",
      "icon": "skill_7073",
      "sfx": "skill_7073_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 170,
      "buffTarget": [
        2
      ],
      "buff": [
        140
      ],
      "layer": [
        3
      ],
      "elementLabel": ""
    },
    {
      "id": 7081,
      "name": "천지일검",
      "desc": "공격력의 700%만큼 피해를 입힌 뒤 자신이 1턴 기절한다.",
      "icon": "skill_7081",
      "sfx": "skill_7081_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 400,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 700,
      "buffTarget": [
        1
      ],
      "buff": [
        10
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 7091,
      "name": "신력폭발",
      "desc": "피해 증가 4중첩, 피해 감소 4중첩, 가속 4중첩, 회피증가 4중첩을 얻는다.",
      "icon": "skill_7091",
      "sfx": "skill_7091_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 1,
      "mana": 500,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1,
        1,
        1,
        1
      ],
      "buff": [
        50,
        90,
        150,
        180
      ],
      "layer": [
        4,
        4,
        4,
        4
      ],
      "elementLabel": ""
    },
    {
      "id": 7092,
      "name": "대황천지",
      "desc": "공격력의 800%만큼 피해를 입히고 적에게 침묵 2중첩을 부여한다.",
      "icon": "skill_7092",
      "sfx": "skill_7092_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 500,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 800,
      "buffTarget": [
        2
      ],
      "buff": [
        80
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 7093,
      "name": "천겁지뢰",
      "desc": "공격력의 800%만큼 피해를 입히고 적에게 마비 2중첩을 부여한다.",
      "icon": "skill_7093",
      "sfx": "skill_7093_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 500,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 800,
      "buffTarget": [
        2
      ],
      "buff": [
        120
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 7094,
      "name": "죽음의 장막",
      "desc": "공격력의 880%만큼 피해를 입히고 적에게 허약 4중첩을 부여한다.",
      "icon": "skill_7094",
      "sfx": "skill_7094_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 500,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 880,
      "buffTarget": [
        2
      ],
      "buff": [
        130
      ],
      "layer": [
        4
      ],
      "elementLabel": ""
    },
    {
      "id": 7095,
      "name": "파멸의 빛",
      "desc": "공격력의 2000%만큼 피해를 입힌다.",
      "icon": "skill_7095",
      "sfx": "skill_7095_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 1000,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 2000,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": ""
    },
    {
      "id": 31001,
      "name": "상한검",
      "desc": "발동 후 공격력의 175%만큼 피해를 입히고 50% 확률로 적에게 빙결 1중첩을 부여한다.",
      "icon": "fabao_21",
      "sfx": "skill_31001_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 175,
      "buffTarget": [
        1
      ],
      "buff": [
        310010
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 31002,
      "name": "열화검",
      "desc": "발동 후 공격력의 100%만큼 피해를 입히고 적에게 화상 2중첩을 부여한다.",
      "icon": "fabao_22",
      "sfx": "skill_31002_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        30
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 31003,
      "name": "구전영롱경",
      "desc": "발동 후 적에게 현혹 3중첩을 부여한다.",
      "icon": "fabao_23",
      "sfx": "skill_31003_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2
      ],
      "buff": [
        140
      ],
      "layer": [
        3
      ],
      "elementLabel": ""
    },
    {
      "id": 31004,
      "name": "무영신침",
      "desc": "발동 후 공격력의 100%만큼 피해를 입히고 적에게 방어파괴 3중첩을 부여한다.",
      "icon": "fabao_24",
      "sfx": "skill_31004_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        60
      ],
      "layer": [
        3
      ],
      "elementLabel": ""
    },
    {
      "id": 32001,
      "name": "풍뢰고",
      "desc": "발동 후 공격력의 200%만큼 피해를 입히고 적에게 마비 2중첩을 부여한다.",
      "icon": "fabao_25",
      "sfx": "skill_32001_hit",
      "element": 0,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [
        2
      ],
      "buff": [
        120
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 32002,
      "name": "광풍검",
      "desc": "발동 후 3회 공격력의 50%만큼 피해를 입히고 연격을 발동한다.",
      "icon": "fabao_26",
      "sfx": "skill_32002_hit",
      "element": 0,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 3,
      "interval": [
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        1
      ],
      "buff": [
        170
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 32003,
      "name": "파마도",
      "desc": "발동 후 공격력의 200%만큼 피해를 입히고 적의 모든 이로운 효과를 해제한다.",
      "icon": "fabao_27",
      "sfx": "skill_32003_hit",
      "element": 0,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 200,
      "buffTarget": [
        2
      ],
      "buff": [
        320030
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 32004,
      "name": "명혼주",
      "desc": "발동 후 공격력의 100%만큼 피해를 입히고 적에게 허약 3중첩을 부여한다.",
      "icon": "fabao_28",
      "sfx": "skill_32004_hit",
      "element": 0,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        130
      ],
      "layer": [
        3
      ],
      "elementLabel": ""
    },
    {
      "id": 33001,
      "name": "청죽풍운검",
      "desc": "발동 후 5회 공격력의 50%만큼 피해를 입힌다. 각 타격마다 50% 확률로 적에게 마비 1중첩을 부여한다.",
      "icon": "fabao_29",
      "sfx": "skill_33001_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 5,
      "interval": [
        100,
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 50,
      "buffTarget": [
        1
      ],
      "buff": [
        330010
      ],
      "layer": [
        5
      ],
      "elementLabel": ""
    },
    {
      "id": 33002,
      "name": "천화섭혼기",
      "desc": "발동 후 공격력의 250%만큼 피해를 입히고 입힌 피해 수치만큼 회복한다.",
      "icon": "fabao_30",
      "sfx": "skill_33002_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 250,
      "buffTarget": [
        1
      ],
      "buff": [
        330020
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 33003,
      "name": "홍련삼첨창",
      "desc": "발동 후 3회 공격력의 120%만큼 피해를 입힌다. 각 타격마다 50% 확률로 적 생명력의 5%만큼 추가 고정 피해를 입힌다.",
      "icon": "fabao_31",
      "sfx": "skill_33003_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 3,
      "interval": [
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 120,
      "buffTarget": [
        1
      ],
      "buff": [
        330030
      ],
      "layer": [
        3
      ],
      "elementLabel": ""
    },
    {
      "id": 33004,
      "name": "허천정",
      "desc": "발동 후 적에게 자신 생명력 상한의 25%만큼 피해를 입힌다.",
      "icon": "fabao_32",
      "sfx": "skill_33004_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 2,
      "value": 25,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": ""
    },
    {
      "id": 34001,
      "name": "번천인",
      "desc": "발동 후 공격력의 300%만큼 피해를 입히고 적을 1턴 기절시킨다.",
      "icon": "fabao_33",
      "sfx": "skill_34001_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 300,
      "buffTarget": [
        2
      ],
      "buff": [
        10
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 34002,
      "name": "참백도",
      "desc": "발동 후 적에게 적 생명력 상한의 25%만큼 고정 피해를 입힌다.",
      "icon": "fabao_34",
      "sfx": "skill_34002_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2
      ],
      "buff": [
        340020
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 34003,
      "name": "만독섭심등",
      "desc": "발동 후 적에게 중독 7중첩을 부여한다.",
      "icon": "fabao_35",
      "sfx": "skill_34003_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2
      ],
      "buff": [
        20
      ],
      "layer": [
        7
      ],
      "elementLabel": ""
    },
    {
      "id": 34004,
      "name": "양혼옥련",
      "desc": "발동 후 자신 생명력 20%를 회복하고 치유 4중첩을 얻는다. 생명력 70% 미만일 때만 발동",
      "icon": "fabao_36",
      "sfx": "skill_34004_hit",
      "element": 0,
      "quality": 4,
      "condition": [
        1
      ],
      "condValue": [
        70
      ],
      "target": 1,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 2,
      "value": -20,
      "buffTarget": [
        1
      ],
      "buff": [
        210
      ],
      "layer": [
        4
      ],
      "elementLabel": ""
    },
    {
      "id": 35001,
      "name": "오행박룡쇄",
      "desc": "발동 후 적을 3턴 기절시킨다.",
      "icon": "fabao_37",
      "sfx": "skill_35001_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2
      ],
      "buff": [
        10
      ],
      "layer": [
        3
      ],
      "elementLabel": ""
    },
    {
      "id": 35002,
      "name": "주선검",
      "desc": "발동 후 공격력의 800%만큼 피해를 입힌다.",
      "icon": "fabao_38",
      "sfx": "skill_35002_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 800,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": ""
    },
    {
      "id": 35003,
      "name": "개천부",
      "desc": "발동 후 적 현재 생명력의 50%만큼 고정 피해를 입힌다.",
      "icon": "fabao_39",
      "sfx": "skill_35003_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2
      ],
      "buff": [
        350030
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 35004,
      "name": "유명섭령탑",
      "desc": "발동 후 상대 영력 상한의 50%만큼 영력을 흡수한다.",
      "icon": "fabao_40",
      "sfx": "skill_35004_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2,
        1
      ],
      "buff": [
        350040,
        350041
      ],
      "layer": [
        1,
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 36001,
      "name": "봉천검",
      "desc": "발동 후 공격력의 400%만큼 피해를 입히고 적을 2턴 침묵시킨다.",
      "icon": "fabao_41",
      "sfx": "skill_36001_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 400,
      "buffTarget": [
        2
      ],
      "buff": [
        80
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 36002,
      "name": "전격곤",
      "desc": "발동 후 공격력의 300%만큼 피해를 입히고 적에게 마비 3중첩을 부여한다.",
      "icon": "fabao_36002",
      "sfx": "skill_36002_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 300,
      "buffTarget": [
        2
      ],
      "buff": [
        120
      ],
      "layer": [
        3
      ],
      "elementLabel": ""
    },
    {
      "id": 36003,
      "name": "좌륜총",
      "desc": "발동 후 6회 공격력의 80%만큼 피해를 입힌다. 각 타격마다 50% 확률로 적 생명력의 5%만큼 추가 고정 피해를 입힌다.",
      "icon": "fabao_36003",
      "sfx": "skill_36003_hit",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 6,
      "interval": [
        100,
        100,
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 80,
      "buffTarget": [
        1
      ],
      "buff": [
        360030
      ],
      "layer": [
        6
      ],
      "elementLabel": ""
    },
    {
      "id": 36004,
      "name": "로켓포",
      "desc": "발동 후 적에게 적 생명력 상한의 30%만큼 고정 피해를 입히고 1턴 기절시킨다.",
      "icon": "fabao_36004",
      "sfx": "skill_36004_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        2,
        2
      ],
      "buff": [
        360040,
        10
      ],
      "layer": [
        1,
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 71101,
      "name": "농부삼권",
      "desc": "3회 공격력의 70%만큼 피해를 입힌다.",
      "icon": "skill_71101",
      "sfx": "skill_71101_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 3,
      "interval": [
        100,
        100,
        100,
        100,
        100
      ],
      "attr": 1,
      "value": 70,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": ""
    },
    {
      "id": 71102,
      "name": "암권",
      "desc": "공격력의 180%만큼 피해를 입힌다. 10% 확률로 적을 1턴 기절시킨다.",
      "icon": "skill_71102",
      "sfx": "skill_71102_hit",
      "element": 0,
      "quality": 1,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 180,
      "buffTarget": [
        1
      ],
      "buff": [
        711020
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 72101,
      "name": "열화신장",
      "desc": "공격력의 100%만큼 화속성 피해를 입히고 적에게 화상 2중첩을 부여한다.",
      "icon": "skill_72101",
      "sfx": "skill_72101_hit",
      "element": 4,
      "quality": 2,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 100,
      "buffTarget": [
        2
      ],
      "buff": [
        30
      ],
      "layer": [
        2
      ],
      "elementLabel": "금"
    },
    {
      "id": 73101,
      "name": "열천패참",
      "desc": "공격력의 500%만큼 피해를 입힌 뒤 자신이 1턴 기절한다.",
      "icon": "skill_73101",
      "sfx": "skill_73101_hit",
      "element": 0,
      "quality": 3,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 500,
      "buffTarget": [
        1
      ],
      "buff": [
        10
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 74101,
      "name": "금종조",
      "desc": "보호막 2중첩을 얻는다.",
      "icon": "skill_74101",
      "sfx": "",
      "element": 0,
      "quality": 4,
      "condition": [],
      "condValue": [],
      "target": 1,
      "mana": 0,
      "segment": 0,
      "interval": [],
      "attr": 0,
      "value": 0,
      "buffTarget": [
        1
      ],
      "buff": [
        100
      ],
      "layer": [
        2
      ],
      "elementLabel": ""
    },
    {
      "id": 75101,
      "name": "봉천검결",
      "desc": "공격력의 300%만큼 피해를 입히고 적을 1턴 침묵시킨다.",
      "icon": "skill_75101",
      "sfx": "skill_36001_hit",
      "element": 0,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 300,
      "buffTarget": [
        2
      ],
      "buff": [
        80
      ],
      "layer": [
        1
      ],
      "elementLabel": ""
    },
    {
      "id": 75102,
      "name": "화권",
      "desc": "공격력의 300%만큼 화속성 피해를 입힌다.",
      "icon": "skill_75102",
      "sfx": "skill_75102_hit",
      "element": 4,
      "quality": 5,
      "condition": [],
      "condValue": [],
      "target": 2,
      "mana": 0,
      "segment": 1,
      "interval": [
        100
      ],
      "attr": 1,
      "value": 300,
      "buffTarget": [],
      "buff": [],
      "layer": [],
      "elementLabel": "금"
    }
  ],
  "births": [
    {
      "id": 1101,
      "name": "천도가 시기한 영재",
      "desc": "뛰어난 오성을 지녔으나 운명이 무거운 대가를 주었다. 오성 +10, 수명 -20.",
      "level": 1,
      "priority": 1,
      "weight": 50
    },
    {
      "id": 1102,
      "name": "천생 우둔",
      "desc": "오성은 다소 부족하나 강건한 체백으로 전투에서 우위를 점한다. 오성 -2, 체백 +2.",
      "level": 1,
      "priority": 1,
      "weight": 50
    },
    {
      "id": 1103,
      "name": "겁 많은 생쥐",
      "desc": "소심한 성격으로 공격력은 약하나 민첩한 몸놀림으로 전투에서 선수를 친다. 공격 -5, 속도 +10.",
      "level": 1,
      "priority": 1,
      "weight": 50
    },
    {
      "id": 1104,
      "name": "문약한 서생",
      "desc": "타고난 오성은 높으나 허약한 몸 때문에 자주 다친다. 생명 -20, 오성 +4.",
      "level": 1,
      "priority": 1,
      "weight": 50
    },
    {
      "id": 2101,
      "name": "강건한 신체",
      "desc": "강건한 몸으로 전투에서 공격을 더 잘 버티고 피해를 견딘다. 체백 +3.",
      "level": 2,
      "priority": 1,
      "weight": 83
    },
    {
      "id": 2102,
      "name": "영력 친화",
      "desc": "영력과의 적합도가 매우 높아 법술을 더 효율적으로 시전한다. 영력 +50.",
      "level": 2,
      "priority": 1,
      "weight": 75
    },
    {
      "id": 2103,
      "name": "밝은 눈과 명석한 마음",
      "desc": "통찰력이 매우 뛰어나 주변의 미세한 변화를 예민하게 포착한다. 오성 +6.",
      "level": 2,
      "priority": 1,
      "weight": 83
    },
    {
      "id": 2104,
      "name": "평온한 마음",
      "desc": "내면이 고요하여 생명의 길이를 늘리고 더 긴 세월을 누린다. 수명 +20.",
      "level": 2,
      "priority": 1,
      "weight": 75
    },
    {
      "id": 3101,
      "name": "피격 내성 체질",
      "desc": "몸이 매우 질겨 더 많은 피해를 견디며 생존 능력이 크게 향상된다. 생명 +400.",
      "level": 3,
      "priority": 1,
      "weight": 125
    },
    {
      "id": 3102,
      "name": "격한 성미",
      "desc": "성미가 격해 전투에서 더 공격적으로 변한다. 공격 +20.",
      "level": 3,
      "priority": 1,
      "weight": 125
    },
    {
      "id": 3103,
      "name": "한발 빠른 행동",
      "desc": "행동이 빨라 결정적인 순간에 먼저 움직여 전투의 주도권을 잡는다. 속도 +20.",
      "level": 3,
      "priority": 1,
      "weight": 125
    },
    {
      "id": 4101,
      "name": "강인한 신체",
      "desc": "강력한 체백으로 전투에서 비범한 힘과 지구력을 발휘한다. 체백 +8.",
      "level": 3,
      "priority": 1,
      "weight": 104
    },
    {
      "id": 3104,
      "name": "매서운 눈빛",
      "desc": "매부리 같은 예리한 눈빛으로 목표를 정확히 명중한다. 명중 +10%.",
      "level": 4,
      "priority": 1,
      "weight": 65
    },
    {
      "id": 4102,
      "name": "천생 영력",
      "desc": "타고난 영력이 매우 강해 법술 수련에 적합한 자질이다. 영력 +300.",
      "level": 4,
      "priority": 1,
      "weight": 108
    },
    {
      "id": 4103,
      "name": "총명한 천자",
      "desc": "오성이 매우 높아 복잡한 지식과 기술을 빠르게 이해하고 익힌다. 오성 +40.",
      "level": 4,
      "priority": 1,
      "weight": 108
    },
    {
      "id": 4104,
      "name": "장수 체질",
      "desc": "장수하는 체질로 더 긴 생명과 경험을 누린다. 수명 +120.",
      "level": 4,
      "priority": 1,
      "weight": 108
    },
    {
      "id": 4105,
      "name": "날렵한 몸놀림",
      "desc": "건강한 몸과 뛰어난 몸놀림으로 전투에서 우위를 점한다. 생명 +1200.",
      "level": 4,
      "priority": 1,
      "weight": 108
    },
    {
      "id": 4106,
      "name": "소 같은 괴력",
      "desc": "소처럼 강한 힘으로 전투에서 막대한 피해를 입힌다. 공격 +60.",
      "level": 4,
      "priority": 1,
      "weight": 108
    },
    {
      "id": 4107,
      "name": "나는 듯한 걸음",
      "desc": "바람처럼 빨리 움직여 전장을 누비며 상황에 유연하게 대응한다. 속도 +60.",
      "level": 4,
      "priority": 1,
      "weight": 108
    },
    {
      "id": 4108,
      "name": "파죽지세",
      "desc": "뛰어난 전투 소양으로 적의 방어선을 쉽게 무너뜨린다. 치명타 +10%.",
      "level": 4,
      "priority": 1,
      "weight": 65
    },
    {
      "id": 4109,
      "name": "막을 수 없는 예봉",
      "desc": "전투에서 비할 데 없는 공격력을 보여 적을 두려움에 떨게 한다. 증뎀(추가피해) +10%.",
      "level": 4,
      "priority": 1,
      "weight": 65
    },
    {
      "id": 4110,
      "name": "두꺼운 피부와 살",
      "desc": "질긴 몸으로 적의 공격을 더 잘 막아낸다. 감뎀(피해감소) +10%.",
      "level": 4,
      "priority": 1,
      "weight": 65
    },
    {
      "id": 4111,
      "name": "유연하고 가벼움",
      "desc": "몸놀림이 유연해 전투에서 공격을 더 잘 피하고 자신을 보호한다. 회피 +10%.",
      "level": 4,
      "priority": 1,
      "weight": 65
    },
    {
      "id": 4112,
      "name": "윤회의 기운",
      "desc": "몸이 윤회의 기운에 자양되어 매년 시작 시 윤회점 10 획득.",
      "level": 4,
      "priority": 1,
      "weight": 65
    },
    {
      "id": 4113,
      "name": "풍족한 가문",
      "desc": "가문이 비교적 부유해 출생 시 영석 1000 보유.",
      "level": 4,
      "priority": 1,
      "weight": 65
    },
    {
      "id": 4114,
      "name": "선검 동반",
      "desc": "출생 시 하늘에서 선검이 내려와 상서로움으로 여겨진다. 주선검 1자루 획득.",
      "level": 4,
      "priority": 1,
      "weight": 81
    },
    {
      "id": 4115,
      "name": "조숙 체질",
      "desc": "성장 속도가 남다르며 출생 후 15년 동안 매년 추가로 체백 2 획득.",
      "level": 4,
      "priority": 1,
      "weight": 72
    },
    {
      "id": 4116,
      "name": "천생 도선",
      "desc": "출생 시 동반 고충이 있어 시간에 영향을 주는 듯하다. 춘추선 1마리 획득.",
      "level": 4,
      "priority": 1,
      "weight": 81
    },
    {
      "id": 5201,
      "name": "불로 성체",
      "desc": "불로의 체질로 수명이 시간의 흐름에 따라 줄지 않는다.",
      "level": 4,
      "priority": 1,
      "weight": 72
    },
    {
      "id": 5202,
      "name": "약령 성체",
      "desc": "단약을 복용할 때마다 25% 확률로 추가로 수위 1 획득.",
      "level": 5,
      "priority": 1,
      "weight": 35
    },
    {
      "id": 5203,
      "name": "수련 성체",
      "desc": "수련 시 67% 확률로 추가로 수위 2 획득, 법술 깨달음 확률 +10%.",
      "level": 5,
      "priority": 1,
      "weight": 38
    },
    {
      "id": 5204,
      "name": "연단 성체",
      "desc": "연단 시마다 경험 50% 증가, 45% 확률로 추가 단약 2개 획득.",
      "level": 5,
      "priority": 1,
      "weight": 35
    },
    {
      "id": 5205,
      "name": "법보 제련 성체",
      "desc": "법보 제련 시마다 경험 50% 증가, 28% 확률로 추가 법보 1개 획득.",
      "level": 5,
      "priority": 1,
      "weight": 35
    },
    {
      "id": 5206,
      "name": "유리 몸 암살자",
      "desc": "체백 1당 전환되는 생명 -16, 동시에 체백 1당 추가 공격 +1.",
      "level": 5,
      "priority": 1,
      "weight": 40
    },
    {
      "id": 5207,
      "name": "육신 성인",
      "desc": "수위는 더 이상 영력으로 전환되지 않으나, 체백 1당 추가 공격 +1 및 생명 +5.",
      "level": 5,
      "priority": 1,
      "weight": 40
    },
    {
      "id": 5208,
      "name": "금 영근 성체",
      "desc": "금속성에 친화력이 있어 금 영근 1당 금속성 법술 보너스가 추가로 +5%.",
      "level": 5,
      "priority": 1,
      "weight": 32
    },
    {
      "id": 5209,
      "name": "목 영근 성체",
      "desc": "목속성에 친화력이 있어 목 영근 1당 목속성 법술 보너스가 추가로 +5%.",
      "level": 5,
      "priority": 1,
      "weight": 32
    },
    {
      "id": 5210,
      "name": "수 영근 성체",
      "desc": "수속성에 친화력이 있어 수 영근 1당 수속성 법술 보너스가 추가로 +5%.",
      "level": 5,
      "priority": 1,
      "weight": 32
    },
    {
      "id": 5211,
      "name": "화 영근 성체",
      "desc": "화속성에 친화력이 있어 화 영근 1당 화속성 법술 보너스가 추가로 +5%.",
      "level": 5,
      "priority": 1,
      "weight": 32
    },
    {
      "id": 5212,
      "name": "토 영근 성체",
      "desc": "토속성에 친화력이 있어 토 영근 1당 토속성 법술 보너스가 추가로 +5%.",
      "level": 5,
      "priority": 1,
      "weight": 32
    },
    {
      "id": 5213,
      "name": "기운의 아들",
      "desc": "운명의 신이 항상 돌봐 뜻밖의 행운을 준다. 기연 조우 확률 +100%.",
      "level": 5,
      "priority": 1,
      "weight": 5
    },
    {
      "id": 5214,
      "name": "직남 시스템",
      "desc": "직남 시스템을 각성하여 인연 이벤트에서 호감도 1 감소 시마다 수위 4 획득.",
      "level": 5,
      "priority": 1,
      "weight": 22
    },
    {
      "id": 5215,
      "name": "연애 고수 시스템",
      "desc": "연애 고수 시스템을 각성하여 인연 이벤트에서 호감도 1 상승 시마다 수위 3 획득.",
      "level": 5,
      "priority": 1,
      "weight": 25
    },
    {
      "id": 5216,
      "name": "오행 성체",
      "desc": "모든 원소 속성에 친화하며 모든 속성 보너스가 총 영근 기준으로 계산되나, 영근 1당 기본 보너스는 5%가 된다.",
      "level": 5,
      "priority": 2,
      "weight": 16
    },
    {
      "id": 5217,
      "name": "만법귀일",
      "desc": "한 점에 집중해 극에 오른다. 법술을 1개만 배웠을 때 증뎀(추가피해) +50%.",
      "level": 5,
      "priority": 1,
      "weight": 32
    },
    {
      "id": 5218,
      "name": "삼라만상",
      "desc": "여러 유파의 장점을 모아 강해진다. 법술 목록에 법술 1개마다 증뎀(추가피해) +1%.",
      "level": 5,
      "priority": 1,
      "weight": 34
    },
    {
      "id": 5219,
      "name": "법술 포식 성체",
      "desc": "몸이 습득한 법술을 스스로 삼킨다. 법술을 잊을 때 망진단 소모가 없고 수위 1 획득.",
      "level": 5,
      "priority": 1,
      "weight": 35
    },
    {
      "id": 5220,
      "name": "백련지체",
      "desc": "몸이 최고의 법보이다. 어떤 법보도 장비할 수 없으나 생명과 공격 +100%.",
      "level": 5,
      "priority": 1,
      "weight": 40
    },
    {
      "id": 5221,
      "name": "이인지구",
      "desc": "육신이 다른 세계 같아 어떤 법술과 공법도 배울 수 없으나 생명, 공격, 속도 +60%.",
      "level": 5,
      "priority": 1,
      "weight": 32
    },
    {
      "id": 5222,
      "name": "연화 성체",
      "desc": "몸이 복용한 모든 단약을 스스로 연화한다. 수련해야 효과가 발동하는 모든 단약은 매년 자동으로 효과가 발동된다.",
      "level": 5,
      "priority": 1,
      "weight": 40
    },
    {
      "id": 5223,
      "name": "사수",
      "desc": "연혈 수련의 사수 법을 얻었다. 수련으로 얻는 기본 수위 2배, 그러나 수련 시마다 수명 10 감소.",
      "level": 5,
      "priority": 1,
      "weight": 23
    },
    {
      "id": 5224,
      "name": "혼 포식자",
      "desc": "전투 후 적의 혼을 뽑아 연화한다. 전투 승리 시마다 50% 확률로 수위 1 획득.",
      "level": 5,
      "priority": 1,
      "weight": 39
    },
    {
      "id": 5225,
      "name": "역천개명",
      "desc": "역천개명 능력을 얻어 버튼으로 이벤트 품질을 갱신할 수 있다.",
      "level": 5,
      "priority": 1,
      "weight": 5
    },
    {
      "id": 5226,
      "name": "극경의 힘",
      "desc": "극경의 힘을 얻었다. 경지가 자신보다 높지 않은 모든 상대와 전투할 때 증뎀(추가피해) +1000%, 그러나 경지는 화신 단계로 돌파할 수 없다.",
      "level": 5,
      "priority": 1,
      "weight": 40
    },
    {
      "id": 5227,
      "name": "수색 대가",
      "desc": "신식이 예민해 놓친 재물을 항상 발견한다. 전투 승리 시마다 추가로 영석 20을 획득한다.",
      "level": 5,
      "priority": 1,
      "weight": 39
    }
  ],
  "talents": [
    {
      "id": 1,
      "name": "금 영근+",
      "desc": "초기 최저 금 영근 증가",
      "icon": "talent_01",
      "value": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "cost": [
        200,
        240,
        290,
        350,
        420
      ],
      "maxLevel": 5
    },
    {
      "id": 2,
      "name": "목 영근+",
      "desc": "초기 최저 목 영근 증가",
      "icon": "talent_02",
      "value": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "cost": [
        200,
        240,
        290,
        350,
        420
      ],
      "maxLevel": 5
    },
    {
      "id": 3,
      "name": "수 영근+",
      "desc": "초기 최저 수 영근 증가",
      "icon": "talent_03",
      "value": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "cost": [
        200,
        240,
        290,
        350,
        420
      ],
      "maxLevel": 5
    },
    {
      "id": 4,
      "name": "화 영근+",
      "desc": "초기 최저 화 영근 증가",
      "icon": "talent_04",
      "value": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "cost": [
        200,
        240,
        290,
        350,
        420
      ],
      "maxLevel": 5
    },
    {
      "id": 5,
      "name": "토 영근+",
      "desc": "초기 최저 토 영근 증가",
      "icon": "talent_05",
      "value": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "cost": [
        200,
        240,
        290,
        350,
        420
      ],
      "maxLevel": 5
    },
    {
      "id": 6,
      "name": "체백+",
      "desc": "초기 체백 증가",
      "icon": "talent_06",
      "value": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ],
      "cost": [
        30,
        40,
        50,
        60,
        70,
        80,
        100,
        120,
        140,
        170,
        200,
        240,
        290,
        350,
        420,
        500,
        600,
        720,
        860,
        1030
      ],
      "maxLevel": 20
    },
    {
      "id": 7,
      "name": "오성+",
      "desc": "초기 오성 증가",
      "icon": "talent_07",
      "value": [
        0,
        2,
        4,
        6,
        8,
        10,
        12,
        14,
        16,
        18,
        20,
        22,
        24,
        26,
        28,
        30,
        32,
        34,
        36,
        38,
        40
      ],
      "cost": [
        30,
        40,
        50,
        60,
        70,
        80,
        100,
        120,
        140,
        170,
        200,
        240,
        290,
        350,
        420,
        500,
        600,
        720,
        860,
        1030
      ],
      "maxLevel": 20
    },
    {
      "id": 8,
      "name": "공격+",
      "desc": "초기 공격 증가",
      "icon": "talent_08",
      "value": [
        0,
        3,
        6,
        9,
        12,
        15,
        18,
        21,
        24,
        27,
        30,
        33,
        36,
        39,
        42,
        45,
        48,
        51,
        54,
        57,
        60
      ],
      "cost": [
        30,
        40,
        50,
        60,
        70,
        80,
        100,
        120,
        140,
        170,
        200,
        240,
        290,
        350,
        420,
        500,
        600,
        720,
        860,
        1030
      ],
      "maxLevel": 20
    },
    {
      "id": 9,
      "name": "생명+",
      "desc": "초기 생명 증가",
      "icon": "talent_09",
      "value": [
        0,
        60,
        120,
        180,
        240,
        300,
        360,
        420,
        480,
        540,
        600,
        660,
        720,
        780,
        840,
        900,
        960,
        1020,
        1080,
        1140,
        1200
      ],
      "cost": [
        30,
        40,
        50,
        60,
        70,
        80,
        100,
        120,
        140,
        170,
        200,
        240,
        290,
        350,
        420,
        500,
        600,
        720,
        860,
        1030
      ],
      "maxLevel": 20
    },
    {
      "id": 10,
      "name": "속도+",
      "desc": "초기 속도 증가",
      "icon": "talent_10",
      "value": [
        0,
        3,
        6,
        9,
        12,
        15,
        18,
        21,
        24,
        27,
        30,
        33,
        36,
        39,
        42,
        45,
        48,
        51,
        54,
        57,
        60
      ],
      "cost": [
        30,
        40,
        50,
        60,
        70,
        80,
        100,
        120,
        140,
        170,
        200,
        240,
        290,
        350,
        420,
        500,
        600,
        720,
        860,
        1030
      ],
      "maxLevel": 20
    },
    {
      "id": 11,
      "name": "증뎀(추가피해)+",
      "desc": "초기 증뎀(추가피해) 증가",
      "icon": "talent_11",
      "value": [
        0,
        2,
        4,
        6,
        8,
        10,
        12,
        14,
        16,
        18,
        20,
        22,
        24,
        26,
        28,
        30
      ],
      "cost": [
        200,
        240,
        290,
        350,
        420,
        500,
        600,
        720,
        860,
        1030,
        1240,
        1490,
        1790,
        2150,
        2580
      ],
      "maxLevel": 15
    },
    {
      "id": 12,
      "name": "감뎀(피해감소)+",
      "desc": "초기 감뎀(피해감소) 증가",
      "icon": "talent_12",
      "value": [
        0,
        2,
        4,
        6,
        8,
        10,
        12,
        14,
        16,
        18,
        20,
        22,
        24,
        26,
        28,
        30
      ],
      "cost": [
        200,
        240,
        290,
        350,
        420,
        500,
        600,
        720,
        860,
        1030,
        1240,
        1490,
        1790,
        2150,
        2580
      ],
      "maxLevel": 15
    },
    {
      "id": 13,
      "name": "치명타+",
      "desc": "초기 치명타 증가",
      "icon": "talent_13",
      "value": [
        0,
        2,
        4,
        6,
        8,
        10,
        12,
        14,
        16,
        18,
        20,
        22,
        24,
        26,
        28,
        30
      ],
      "cost": [
        200,
        240,
        290,
        350,
        420,
        500,
        600,
        720,
        860,
        1030,
        1240,
        1490,
        1790,
        2150,
        2580
      ],
      "maxLevel": 15
    },
    {
      "id": 14,
      "name": "치명타피해+",
      "desc": "초기 치명타피해 증가",
      "icon": "talent_14",
      "value": [
        0,
        4,
        8,
        12,
        16,
        20,
        24,
        28,
        32,
        36,
        40,
        44,
        48,
        52,
        56,
        60
      ],
      "cost": [
        200,
        240,
        290,
        350,
        420,
        500,
        600,
        720,
        860,
        1030,
        1240,
        1490,
        1790,
        2150,
        2580
      ],
      "maxLevel": 15
    },
    {
      "id": 15,
      "name": "윤회점 획득+",
      "desc": "적 처치 시마다 추가 윤회점 획득",
      "icon": "talent_15",
      "value": [
        0,
        1,
        3,
        5
      ],
      "cost": [
        50,
        100,
        150
      ],
      "maxLevel": 3
    },
    {
      "id": 16,
      "name": "영근+",
      "desc": "초기 총 영근 수 증가",
      "icon": "talent_16",
      "value": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "cost": [
        100,
        120,
        140,
        170,
        200
      ],
      "maxLevel": 5
    },
    {
      "id": 17,
      "name": "수명+",
      "desc": "초기 수명 증가",
      "icon": "talent_17",
      "value": [
        0,
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100
      ],
      "cost": [
        30,
        40,
        50,
        60,
        70,
        80,
        100,
        120,
        140,
        170
      ],
      "maxLevel": 10
    },
    {
      "id": 18,
      "name": "영력+",
      "desc": "초기 영력 증가",
      "icon": "talent_18",
      "value": [
        0,
        15,
        30,
        45,
        60,
        75,
        90,
        105,
        120,
        135,
        150,
        165,
        180,
        195,
        210,
        225,
        240,
        255,
        270,
        285,
        300
      ],
      "cost": [
        30,
        40,
        50,
        60,
        70,
        80,
        100,
        120,
        140,
        170,
        200,
        240,
        290,
        350,
        420,
        500,
        600,
        720,
        860,
        1030
      ],
      "maxLevel": 20
    },
    {
      "id": 19,
      "name": "연단 경험+",
      "desc": "초기 추가 연단 경험 보유",
      "icon": "talent_19",
      "value": [
        0,
        100,
        200,
        300,
        400
      ],
      "cost": [
        50,
        60,
        70,
        80
      ],
      "maxLevel": 4
    },
    {
      "id": 20,
      "name": "법보 제련 경험+",
      "desc": "초기 추가 법보 제련 경험 보유",
      "icon": "talent_20",
      "value": [
        0,
        100,
        200,
        300,
        400
      ],
      "cost": [
        50,
        60,
        70,
        80
      ],
      "maxLevel": 4
    },
    {
      "id": 21,
      "name": "수련 품급+",
      "desc": "수련 이벤트에서 고품급 출현 확률 증가",
      "icon": "talent_21",
      "value": [
        0,
        10,
        20,
        30,
        40,
        50
      ],
      "cost": [
        400,
        480,
        580,
        700,
        840
      ],
      "maxLevel": 5
    },
    {
      "id": 22,
      "name": "연단 품급+",
      "desc": "연단 이벤트에서 고품급 출현 확률 증가",
      "icon": "talent_22",
      "value": [
        0,
        10,
        20,
        30,
        40,
        50
      ],
      "cost": [
        400,
        480,
        580,
        700,
        840
      ],
      "maxLevel": 5
    },
    {
      "id": 23,
      "name": "법보 제련 품급+",
      "desc": "법보 제련 이벤트에서 고품급 출현 확률 증가",
      "icon": "talent_23",
      "value": [
        0,
        10,
        20,
        30,
        40,
        50
      ],
      "cost": [
        400,
        480,
        580,
        700,
        840
      ],
      "maxLevel": 5
    },
    {
      "id": 24,
      "name": "초기 영석+",
      "desc": "초기 추가 영석 보유",
      "icon": "talent_24",
      "value": [
        0,
        50,
        100,
        150,
        200
      ],
      "cost": [
        50,
        60,
        70,
        80
      ],
      "maxLevel": 4
    },
    {
      "id": 25,
      "name": "윤회 결말+",
      "desc": "결말 발동 시마다 추가 윤회점 획득",
      "icon": "talent_25",
      "value": [
        0,
        50,
        100,
        150,
        200
      ],
      "cost": [
        100,
        200,
        300,
        400
      ],
      "maxLevel": 4
    },
    {
      "id": 26,
      "name": "내 운명은 내가+",
      "desc": "속성 요구를 충족하지 않는 선택지를 강제로 선택할 수 있으나, 강제 선택 시 수명 10 감소",
      "icon": "talent_26",
      "value": [
        0,
        1
      ],
      "cost": [
        300
      ],
      "maxLevel": 1
    },
    {
      "id": 27,
      "name": "신념 예측+",
      "desc": "전투 패배 후 결과를 예행으로 바꾸어 전투 이전으로 돌아갈 수 있다",
      "icon": "talent_27",
      "value": [
        0,
        1
      ],
      "cost": [
        300
      ],
      "maxLevel": 1
    },
    {
      "id": 28,
      "name": "기운 감지+",
      "desc": "탐색에서 기연 이벤트 발생 여부를 미리 감지할 수 있다",
      "icon": "talent_28",
      "value": [
        0,
        1
      ],
      "cost": [
        300
      ],
      "maxLevel": 1
    },
    {
      "id": 29,
      "name": "영전+",
      "desc": "재배 기초 이벤트 해금, 영석을 소모해 영초 재배 가능",
      "icon": "talent_29",
      "value": [
        0,
        1
      ],
      "cost": [
        1000
      ],
      "maxLevel": 1
    },
    {
      "id": 30,
      "name": "부적+",
      "desc": "제부 기초 이벤트 해금, 영석을 소모해 부적 제작 가능",
      "icon": "talent_30",
      "value": [
        0,
        1
      ],
      "cost": [
        1000
      ],
      "maxLevel": 1
    }
  ],
  "realms": [
    {
      "id": 1,
      "name": "연체",
      "upgrade": 10,
      "physique": 5,
      "mana": 25,
      "life": 5,
      "equip": 1
    },
    {
      "id": 2,
      "name": "연기",
      "upgrade": 40,
      "physique": 15,
      "mana": 75,
      "life": 15,
      "equip": 2
    },
    {
      "id": 3,
      "name": "축기",
      "upgrade": 90,
      "physique": 20,
      "mana": 100,
      "life": 20,
      "equip": 4
    },
    {
      "id": 4,
      "name": "금단",
      "upgrade": 200,
      "physique": 40,
      "mana": 200,
      "life": 40,
      "equip": 6
    },
    {
      "id": 5,
      "name": "원영",
      "upgrade": 400,
      "physique": 60,
      "mana": 300,
      "life": 60,
      "equip": 8
    },
    {
      "id": 6,
      "name": "화신",
      "upgrade": 999,
      "physique": 0,
      "mana": 0,
      "life": 0,
      "equip": 10
    }
  ],
  "alchemys": [
    {
      "id": 1,
      "name": "단도 초보",
      "cost": 20,
      "upgrade": 400
    },
    {
      "id": 2,
      "name": "단도 입문",
      "cost": 30,
      "upgrade": 800
    },
    {
      "id": 3,
      "name": "단도 소성",
      "cost": 40,
      "upgrade": 1600
    },
    {
      "id": 4,
      "name": "단도 대성",
      "cost": 50,
      "upgrade": 3200
    },
    {
      "id": 5,
      "name": "단도 종사",
      "cost": 60,
      "upgrade": 0
    }
  ],
  "refines": [
    {
      "id": 1,
      "name": "법보 제련 초보",
      "cost": 20,
      "upgrade": 400
    },
    {
      "id": 2,
      "name": "법보 제련 입문",
      "cost": 30,
      "upgrade": 800
    },
    {
      "id": 3,
      "name": "법보 제련 소성",
      "cost": 40,
      "upgrade": 1600
    },
    {
      "id": 4,
      "name": "법보 제련 대성",
      "cost": 50,
      "upgrade": 3200
    },
    {
      "id": 5,
      "name": "법보 제련 종사",
      "cost": 60,
      "upgrade": 0
    }
  ],
  "scenes": [
    {
      "id": 1,
      "name": "마을",
      "background": "scene_01"
    },
    {
      "id": 2,
      "name": "선문",
      "background": "scene_02"
    },
    {
      "id": 3,
      "name": "마문",
      "background": "scene_03"
    },
    {
      "id": 4,
      "name": "도시",
      "background": "scene_04"
    },
    {
      "id": 5,
      "name": "신비한 동굴",
      "background": "scene_05"
    },
    {
      "id": 6,
      "name": "북방 비경",
      "background": "scene_06"
    },
    {
      "id": 61,
      "name": "북방 유적",
      "background": "scene_61"
    },
    {
      "id": 62,
      "name": "남방 비경",
      "background": "scene_62"
    },
    {
      "id": 63,
      "name": "서방 고찰",
      "background": "scene_63"
    },
    {
      "id": 64,
      "name": "동방 산맥",
      "background": "scene_64"
    },
    {
      "id": 8,
      "name": "고신 유적",
      "background": "scene_08"
    },
    {
      "id": 9,
      "name": "고대 검총",
      "background": "scene_09"
    },
    {
      "id": 10,
      "name": "전염병 도시",
      "background": "scene_10"
    },
    {
      "id": 11,
      "name": "잠든 도시",
      "background": "scene_11"
    },
    {
      "id": 20,
      "name": "선계",
      "background": "scene_20"
    }
  ],
  "endings": [
    {
      "id": 1,
      "type": 1,
      "name": "죽음과 도의 소멸",
      "desc": "결국, 당신은 태어난 지 {0}년째에 {1}의 손에 패배했습니다.",
      "luckPoint": 100,
      "image": "ending_1"
    },
    {
      "id": 2,
      "type": 1,
      "name": "천도에 삼켜짐",
      "desc": "결국, 당신은 천도 화신과의 결전에서 패배해 천도에 삼켜졌습니다.",
      "luckPoint": 100,
      "image": "ending_2"
    },
    {
      "id": 3,
      "type": 1,
      "name": "한 수 부족",
      "desc": "결국, 당신은 선계로 비상해 천도와의 결전에서 패배했고, 삼생석 조각은 다시 흩어져 인간 세상으로 떨어졌습니다...",
      "luckPoint": 100,
      "image": "ending_3"
    },
    {
      "id": 4,
      "type": 1,
      "name": "수명 고갈",
      "desc": "결국, 당신은 태어난 지 {0}년째에 수명이 다해 사망했습니다.",
      "luckPoint": 100,
      "image": "ending_4"
    },
    {
      "id": 10,
      "type": 1,
      "name": "선계 독존",
      "desc": "결국, 당신은 새로운 천도가 되어 이 세계를 다스렸지만, 알 수 없는 힘이 모든 것을 찢어발겼습니다...",
      "luckPoint": 100,
      "image": "ending_10"
    },
    {
      "id": 101,
      "type": 1,
      "name": "낙엽귀근",
      "desc": "결국, 당신은 임소엽과 부부가 되어 소박한 시골 생활에서 행복하게 한평생을 보냈습니다.",
      "luckPoint": 100,
      "image": "ending_101"
    },
    {
      "id": 102,
      "type": 1,
      "name": "여생을 지키는 사랑",
      "desc": "결국, 당신은 임소엽과 부부가 되었고, 그녀가 죽은 뒤에도 외롭게 그녀의 묘를 지키며 늙어갔습니다...",
      "luckPoint": 100,
      "image": "ending_102"
    },
    {
      "id": 201,
      "type": 1,
      "name": "검그림자와 긴 사랑",
      "desc": "결국, 당신은 조명월과 도려가 되어 인간 세상을 유람했고, 마지막 큰눈 속에서 서로 기대어 늙어갔습니다.",
      "luckPoint": 100,
      "image": "ending_201"
    },
    {
      "id": 301,
      "type": 1,
      "name": "도원의 꿈",
      "desc": "결국, 당신은 소유리와 부부가 되어 세상 밖 도원에 은거하며 행복하게 한평생을 보냈습니다.",
      "luckPoint": 100,
      "image": "ending_301"
    },
    {
      "id": 401,
      "type": 1,
      "name": "신선 부부",
      "desc": "결국, 당신은 새로운 천도가 되어 낙홍안을 부활시켜 함께 선계에서 살았지만, 알 수 없는 힘이 모든 것을 찢어발겼습니다...",
      "luckPoint": 100,
      "image": "ending_401"
    },
    {
      "id": 1000,
      "type": 1,
      "name": "자손이 가득한 집",
      "desc": "결국, 당신은 임소엽, 조명월과 함께 살며 많은 자녀를 두고 행복하게 한평생을 보냈습니다.",
      "luckPoint": 100,
      "image": "ending_1000"
    },
    {
      "id": 3000,
      "type": 1,
      "name": "삼계 밖",
      "desc": "결국, 당신은 알 수 없는 힘의 통제를 깨고 허공을 찢어 사랑하는 이들과 함께 떠났으며, 그 후 행방은 알 수 없습니다...",
      "luckPoint": 100,
      "image": "ending_3000"
    },
    {
      "id": 10101,
      "type": 2,
      "name": "붉은 실이 맺은 인연",
      "desc": "",
      "luckPoint": 0,
      "image": "cg_101"
    },
    {
      "id": 10102,
      "type": 2,
      "name": "밤이 치유한 마음",
      "desc": "",
      "luckPoint": 0,
      "image": "cg_102"
    },
    {
      "id": 10201,
      "type": 2,
      "name": "사월이 전한 정",
      "desc": "",
      "luckPoint": 0,
      "image": "cg_201"
    },
    {
      "id": 10202,
      "type": 2,
      "name": "꽃과 달이 함께 빛남",
      "desc": "",
      "luckPoint": 0,
      "image": "cg_202"
    },
    {
      "id": 10301,
      "type": 2,
      "name": "유리가 치유한 마음",
      "desc": "",
      "luckPoint": 0,
      "image": "cg_301"
    },
    {
      "id": 10401,
      "type": 2,
      "name": "홍안의 숙명",
      "desc": "",
      "luckPoint": 0,
      "image": "cg_401"
    },
    {
      "id": 10501,
      "type": 2,
      "name": "영혼 융합",
      "desc": "",
      "luckPoint": 0,
      "image": "cg_501"
    }
  ],
  "achievements": [
    {
      "id": 1,
      "name": "인과의 시작",
      "desc": "인과의 조각 획득",
      "cond": 1,
      "value": [
        95001
      ]
    },
    {
      "id": 2,
      "name": "두꺼비 요괴 격파",
      "desc": "혼귀의 조각 획득",
      "cond": 1,
      "value": [
        95002
      ]
    },
    {
      "id": 3,
      "name": "나무 요괴 격파",
      "desc": "세월의 조각 획득",
      "cond": 1,
      "value": [
        95003
      ]
    },
    {
      "id": 4,
      "name": "몽맥 격파",
      "desc": "억몽의 조각 획득",
      "cond": 1,
      "value": [
        95004
      ]
    },
    {
      "id": 5,
      "name": "상류 격파",
      "desc": "숙명의 조각 획득",
      "cond": 1,
      "value": [
        95005
      ]
    },
    {
      "id": 6,
      "name": "고신 격파",
      "desc": "불멸의 조각 획득",
      "cond": 1,
      "value": [
        95006
      ]
    },
    {
      "id": 7,
      "name": "폐한 격파",
      "desc": "계약의 조각 획득",
      "cond": 1,
      "value": [
        95007
      ]
    },
    {
      "id": 8,
      "name": "홍안 소멸",
      "desc": "인연의 조각 획득",
      "cond": 1,
      "value": [
        95008
      ]
    },
    {
      "id": 9,
      "name": "당호 격파",
      "desc": "윤회의 조각 획득",
      "cond": 1,
      "value": [
        95009
      ]
    },
    {
      "id": 11,
      "name": "연기 소아",
      "desc": "수련으로 연기 단계 도달",
      "cond": 2,
      "value": [
        1,
        2
      ]
    },
    {
      "id": 12,
      "name": "축기 고수",
      "desc": "수련으로 축기 단계 도달",
      "cond": 2,
      "value": [
        1,
        3
      ]
    },
    {
      "id": 13,
      "name": "금단 대사",
      "desc": "수련으로 금단 단계 도달",
      "cond": 2,
      "value": [
        1,
        4
      ]
    },
    {
      "id": 14,
      "name": "원영 노괴",
      "desc": "수련으로 원영 단계 도달",
      "cond": 2,
      "value": [
        1,
        5
      ]
    },
    {
      "id": 15,
      "name": "화신 대능",
      "desc": "수련으로 화신 단계 도달",
      "cond": 2,
      "value": [
        1,
        6
      ]
    },
    {
      "id": 21,
      "name": "단도 입문",
      "desc": "단도 입문 경지 도달",
      "cond": 2,
      "value": [
        2,
        2
      ]
    },
    {
      "id": 22,
      "name": "단도 소성",
      "desc": "단도 소성 경지 도달",
      "cond": 2,
      "value": [
        2,
        3
      ]
    },
    {
      "id": 23,
      "name": "단도 대성",
      "desc": "단도 대성 경지 도달",
      "cond": 2,
      "value": [
        2,
        4
      ]
    },
    {
      "id": 24,
      "name": "단도 종사",
      "desc": "단도 종사 경지 도달",
      "cond": 2,
      "value": [
        2,
        5
      ]
    },
    {
      "id": 31,
      "name": "법보 제련 입문",
      "desc": "법보 제련 입문 경지 도달",
      "cond": 2,
      "value": [
        3,
        2
      ]
    },
    {
      "id": 32,
      "name": "법보 제련 소성",
      "desc": "법보 제련 소성 경지 도달",
      "cond": 2,
      "value": [
        3,
        3
      ]
    },
    {
      "id": 33,
      "name": "법보 제련 대성",
      "desc": "법보 제련 대성 경지 도달",
      "cond": 2,
      "value": [
        3,
        4
      ]
    },
    {
      "id": 34,
      "name": "법보 제련 종사",
      "desc": "법보 제련 종사 경지 도달",
      "cond": 2,
      "value": [
        3,
        5
      ]
    },
    {
      "id": 41,
      "name": "체수 대능",
      "desc": "체백 1000 초과",
      "cond": 2,
      "value": [
        11,
        1000
      ]
    },
    {
      "id": 42,
      "name": "영력 팽배",
      "desc": "영력 값 5000 초과",
      "cond": 2,
      "value": [
        12,
        5000
      ]
    },
    {
      "id": 43,
      "name": "오성 초군",
      "desc": "오성 값 100 초과",
      "cond": 2,
      "value": [
        13,
        100
      ]
    },
    {
      "id": 44,
      "name": "끊임없는 생명",
      "desc": "생명력 40000 초과",
      "cond": 2,
      "value": [
        21,
        40000
      ]
    },
    {
      "id": 45,
      "name": "천균의 힘",
      "desc": "공격력 2000 초과",
      "cond": 2,
      "value": [
        22,
        2000
      ]
    },
    {
      "id": 46,
      "name": "순식간에 천 리",
      "desc": "속도 2000 초과",
      "cond": 2,
      "value": [
        23,
        2000
      ]
    },
    {
      "id": 101,
      "name": "죽음과 도의 소멸",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        1
      ]
    },
    {
      "id": 102,
      "name": "천도에 삼켜짐",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        2
      ]
    },
    {
      "id": 103,
      "name": "한 수 부족",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        3
      ]
    },
    {
      "id": 104,
      "name": "수명 고갈",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        4
      ]
    },
    {
      "id": 105,
      "name": "선계 독존",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        10
      ]
    },
    {
      "id": 106,
      "name": "낙엽귀근",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        101
      ]
    },
    {
      "id": 107,
      "name": "여생을 지키는 사랑",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        102
      ]
    },
    {
      "id": 108,
      "name": "검그림자와 긴 사랑",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        201
      ]
    },
    {
      "id": 109,
      "name": "도원의 꿈",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        301
      ]
    },
    {
      "id": 110,
      "name": "신선 부부",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        401
      ]
    },
    {
      "id": 111,
      "name": "자손이 가득한 집",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        1000
      ]
    },
    {
      "id": 112,
      "name": "삼계 밖",
      "desc": "결말 달성",
      "cond": 3,
      "value": [
        3000
      ]
    },
    {
      "id": 201,
      "name": "가장 아름다운 불꽃",
      "desc": "서브 스토리 결말 완료",
      "cond": 4,
      "value": [
        9600150
      ]
    },
    {
      "id": 211,
      "name": "마지막 보은",
      "desc": "서브 스토리 결말 1 완료",
      "cond": 4,
      "value": [
        9600251
      ]
    },
    {
      "id": 212,
      "name": "한평생 한을 품다",
      "desc": "서브 스토리 결말 2 완료",
      "cond": 4,
      "value": [
        9600252
      ]
    },
    {
      "id": 213,
      "name": "영호의 수호",
      "desc": "서브 스토리 결말 3 완료",
      "cond": 4,
      "value": [
        9600292
      ]
    },
    {
      "id": 214,
      "name": "영혼 융합",
      "desc": "서브 스토리 결말 4 완료",
      "cond": 4,
      "value": [
        8000501
      ]
    },
    {
      "id": 221,
      "name": "피의 대가",
      "desc": "서브 스토리 결말 1 완료",
      "cond": 4,
      "value": [
        9600360
      ]
    },
    {
      "id": 222,
      "name": "방종의 결과",
      "desc": "서브 스토리 결말 2 완료",
      "cond": 4,
      "value": [
        9600361
      ]
    },
    {
      "id": 231,
      "name": "편히 쉬지 못함",
      "desc": "서브 스토리 결말 1 완료",
      "cond": 4,
      "value": [
        9600460
      ]
    },
    {
      "id": 232,
      "name": "다시 돌아오지 않음",
      "desc": "서브 스토리 결말 2 완료",
      "cond": 4,
      "value": [
        9600470
      ]
    },
    {
      "id": 233,
      "name": "피 묻은 장창",
      "desc": "서브 스토리 결말 3 완료",
      "cond": 4,
      "value": [
        9600480
      ]
    },
    {
      "id": 241,
      "name": "검을 휘두르는 이유",
      "desc": "서브 스토리 결말 완료",
      "cond": 4,
      "value": [
        9600590
      ]
    },
    {
      "id": 301,
      "name": "시대가 변했다",
      "desc": "모든 차원 거래 물품 수집",
      "cond": 4,
      "value": [
        9163011
      ]
    },
    {
      "id": 302,
      "name": "오행 고수",
      "desc": "모든 불로옹 문답 완료",
      "cond": 4,
      "value": [
        9164010
      ]
    }
  ],
  "names": [
    {
      "id": 1,
      "name": "한립",
      "talent": [
        5202,
        5209
      ]
    },
    {
      "id": 2,
      "name": "여비우",
      "talent": [
        5206
      ]
    },
    {
      "id": 3,
      "name": "왕림",
      "talent": [
        5226
      ]
    },
    {
      "id": 4,
      "name": "당삼",
      "talent": [
        5205
      ]
    },
    {
      "id": 5,
      "name": "소염",
      "talent": [
        5204
      ]
    },
    {
      "id": 6,
      "name": "고창가",
      "talent": [
        5223
      ]
    },
    {
      "id": 7,
      "name": "나정",
      "talent": [
        5220
      ]
    },
    {
      "id": 8,
      "name": "사염",
      "talent": [
        5215
      ]
    },
    {
      "id": 9,
      "name": "장소범",
      "talent": [
        5213,
        5224
      ]
    },
    {
      "id": 10,
      "name": "진행자 양수",
      "talent": [
        5202
      ]
    },
    {
      "id": 11,
      "name": "zard1991",
      "talent": [
        5225
      ]
    },
    {
      "id": 12,
      "name": "노피 모험기",
      "talent": [
        5227
      ]
    },
    {
      "id": 13,
      "name": "비우 선광",
      "talent": [
        4114
      ]
    },
    {
      "id": 14,
      "name": "죽성성성",
      "talent": [
        5207
      ]
    },
    {
      "id": 15,
      "name": "심상목",
      "talent": [
        5209
      ]
    },
    {
      "id": 16,
      "name": "낙금묵",
      "talent": [
        4112
      ]
    },
    {
      "id": 17,
      "name": "고월방원",
      "talent": [
        4116,
        4103
      ]
    },
    {
      "id": 18,
      "name": "진평안",
      "talent": [
        5207,
        4110
      ]
    },
    {
      "id": 19,
      "name": "엽범",
      "talent": [
        5221
      ]
    },
    {
      "id": 20,
      "name": "석호",
      "talent": [
        5207
      ]
    },
    {
      "id": 21,
      "name": "이화왕",
      "talent": [
        5222
      ]
    },
    {
      "id": 22,
      "name": "장우",
      "talent": [
        5227
      ]
    },
    {
      "id": 23,
      "name": "이장수",
      "talent": [
        5201
      ]
    },
    {
      "id": 24,
      "name": "한절",
      "talent": [
        5203
      ]
    }
  ],
  "buffs": [
    {
      "id": 1,
      "name": "일반공격 영력회복 5%",
      "desc": ""
    },
    {
      "id": 2,
      "name": "극한의 힘",
      "desc": "피해증가 1000% 증가"
    },
    {
      "id": 10,
      "name": "기절",
      "desc": "행동 불가"
    },
    {
      "id": 20,
      "name": "중독",
      "desc": "턴 종료 시 생명력 1%×중독 중첩 피해"
    },
    {
      "id": 21,
      "name": "독폭",
      "desc": ""
    },
    {
      "id": 22,
      "name": "중독 피해증가",
      "desc": ""
    },
    {
      "id": 30,
      "name": "화상",
      "desc": "턴 종료 시 생명력 5% 피해"
    },
    {
      "id": 31,
      "name": "염폭",
      "desc": ""
    },
    {
      "id": 40,
      "name": "빙결",
      "desc": "행동 불가, 받는 피해 50% 증가"
    },
    {
      "id": 50,
      "name": "피해증가",
      "desc": "주는 피해 50% 증가"
    },
    {
      "id": 60,
      "name": "방어파괴",
      "desc": "받는 피해 50% 증가"
    },
    {
      "id": 70,
      "name": "기력집중",
      "desc": "다음 1타 피해 100% 추가 증가"
    },
    {
      "id": 80,
      "name": "침묵",
      "desc": "법술 시전 불가"
    },
    {
      "id": 90,
      "name": "피해감소",
      "desc": "받는 피해 50% 감소"
    },
    {
      "id": 100,
      "name": "보호막",
      "desc": "임의의 1타 피해 방어"
    },
    {
      "id": 110,
      "name": "반사피해",
      "desc": "1타 피해를 받을 때마다 적에게 자신 공격력 50%의 고정피해"
    },
    {
      "id": 111,
      "name": "반사피해량",
      "desc": ""
    },
    {
      "id": 120,
      "name": "마비",
      "desc": "50% 확률로 행동 불가"
    },
    {
      "id": 130,
      "name": "허약",
      "desc": "주는 피해 50% 감소"
    },
    {
      "id": 140,
      "name": "현혹",
      "desc": "명중률 50% 감소"
    },
    {
      "id": 150,
      "name": "회피증가",
      "desc": "회피 50% 증가"
    },
    {
      "id": 160,
      "name": "필중",
      "desc": ""
    },
    {
      "id": 170,
      "name": "연격",
      "desc": ""
    },
    {
      "id": 180,
      "name": "가속",
      "desc": "속도 30% 증가"
    },
    {
      "id": 190,
      "name": "감속",
      "desc": "속도 30% 감소"
    },
    {
      "id": 200,
      "name": "가시",
      "desc": "피격 시마다 공격자 공격력 50%의 고정피해 추가 피해"
    },
    {
      "id": 210,
      "name": "치유",
      "desc": "턴 시작 시 생명력 5% 회복"
    },
    {
      "id": 220,
      "name": "영력회복",
      "desc": "턴 시작 시 영력 5% 회복"
    },
    {
      "id": 230,
      "name": "추가 치명타 50%",
      "desc": ""
    },
    {
      "id": 240,
      "name": "치유금지",
      "desc": "생명력 회복 불가"
    },
    {
      "id": 1020,
      "name": "30%1",
      "desc": "각 타마다 30% 확률로 적에게 빙결 1중첩 부여"
    },
    {
      "id": 1030,
      "name": "，2",
      "desc": "적에게 화상이 있으면 적에게 침묵 2중첩 부여"
    },
    {
      "id": 1050,
      "name": "50%",
      "desc": "50% 확률로 연격 획득"
    },
    {
      "id": 12010,
      "name": "（100%）",
      "desc": "상대 속도 100% 피해를 받음"
    },
    {
      "id": 12030,
      "name": "3",
      "desc": "적중 시 방어파괴 3중첩 부여"
    },
    {
      "id": 13010,
      "name": "120%",
      "desc": "장착 무기 품질 1당 피해증가 20% 증가"
    },
    {
      "id": 13020,
      "name": "3",
      "desc": "적중 시 피해증가 3중첩 획득"
    },
    {
      "id": 13030,
      "name": "100%",
      "desc": "적중 시 공격력 100% 피해 추가"
    },
    {
      "id": 13031,
      "name": "100%",
      "desc": "상대 공격력 100% 피해를 받음"
    },
    {
      "id": 14010,
      "name": "1，15%",
      "desc": "법보 1개당 이 스킬 피해증가 15% 증가"
    },
    {
      "id": 14020,
      "name": "성명검무",
      "desc": "이번 전투에서 주는 피해 30% 증가 (중첩 가능)"
    },
    {
      "id": 14030,
      "name": "，（300%）",
      "desc": "자신에게 피해증가가 있으면 공격력 300% 피해 추가"
    },
    {
      "id": 14031,
      "name": "300%",
      "desc": "상대 공격력 300% 피해를 받음"
    },
    {
      "id": 15010,
      "name": "14%",
      "desc": "장착 법보 품질 1당 이 스킬 피해증가 4% 증가"
    },
    {
      "id": 15020,
      "name": "1",
      "desc": "적중 시 기력집중 1중첩 획득"
    },
    {
      "id": 15030,
      "name": "，100%",
      "desc": "자신에게 방어파괴가 있으면 이번 공격으로 적이 받는 피해 100% 증가"
    },
    {
      "id": 15031,
      "name": "100%",
      "desc": "받는 피해 100% 증가"
    },
    {
      "id": 15040,
      "name": "상태 15040",
      "desc": "적중 시 연격"
    },
    {
      "id": 21030,
      "name": "고영술",
      "desc": "이번 전투 동안 공격력 10% 감소 (중첩 가능)"
    },
    {
      "id": 22010,
      "name": "60%",
      "desc": "시전 후 60% 확률로 목령술 추가 시전"
    },
    {
      "id": 22020,
      "name": "30%",
      "desc": "진행 게이지 30% 감소"
    },
    {
      "id": 23030,
      "name": "3",
      "desc": "자신에게 중독이 있으면 중독 3중첩 추가"
    },
    {
      "id": 23040,
      "name": "50%2",
      "desc": "50% 확률로 적에게 마비 2중첩 부여"
    },
    {
      "id": 24010,
      "name": "1%",
      "desc": "중독 1중첩당 상대 생명력 1% 회복"
    },
    {
      "id": 24011,
      "name": "1%",
      "desc": "생명력 1% 회복"
    },
    {
      "id": 24020,
      "name": "상태 24020",
      "desc": "피해량에 해당하는 수치만큼 회복"
    },
    {
      "id": 24030,
      "name": "50%1",
      "desc": "각 타 피해마다 50% 확률로 적에게 중독 1중첩 부여"
    },
    {
      "id": 25010,
      "name": "50%",
      "desc": "시전할 때마다 50% 확률로 이 법술 반복 시전"
    },
    {
      "id": 25020,
      "name": "상태 25020",
      "desc": "중독 중첩 2배"
    },
    {
      "id": 25040,
      "name": "20%2",
      "desc": "각 타 피해마다 20% 확률로 적에게 마비 2중첩 부여"
    },
    {
      "id": 31020,
      "name": "20%",
      "desc": "영력 20% 회복"
    },
    {
      "id": 32010,
      "name": "50%，（40%）",
      "desc": "적 영력이 50% 미만이면 영력 상한 40% 피해 추가"
    },
    {
      "id": 32011,
      "name": "40%",
      "desc": "상대 영력 상한 40% 피해를 받음"
    },
    {
      "id": 32020,
      "name": "2debuff",
      "desc": "자신의 무작위 디버프 2중첩 제거"
    },
    {
      "id": 32030,
      "name": "10%",
      "desc": "영력 10% 감소"
    },
    {
      "id": 33010,
      "name": "80%，",
      "desc": "자신 영력이 80% 초과면 이 법술 다시 시전"
    },
    {
      "id": 33011,
      "name": "80%",
      "desc": "80% 확률로 이 법술 다시 시전"
    },
    {
      "id": 33020,
      "name": "50%200%",
      "desc": "영력 50% 미만이면 공격력 200% 피해 추가"
    },
    {
      "id": 33021,
      "name": "200%",
      "desc": "상대 공격력 200% 피해를 받음"
    },
    {
      "id": 33030,
      "name": "50%，4",
      "desc": "영력 50% 미만이면 영력회복 4중첩 획득"
    },
    {
      "id": 33040,
      "name": "50%1",
      "desc": "50% 확률로 적에게 빙결 1중첩 부여"
    },
    {
      "id": 34010,
      "name": "50%",
      "desc": "사용 횟수에 따라 피해증가 50% 증가"
    },
    {
      "id": 34011,
      "name": "수폭술",
      "desc": "수폭술 피해 50% 증가 (중첩 가능)"
    },
    {
      "id": 34012,
      "name": "50%（）",
      "desc": "피해증가 50% (중첩 가능)"
    },
    {
      "id": 34020,
      "name": "50%，100%",
      "desc": "영력 50% 초과면 이 법술 피해 100% 증가"
    },
    {
      "id": 34021,
      "name": "100%",
      "desc": "피해증가 100%"
    },
    {
      "id": 34030,
      "name": "30%",
      "desc": "영력 30% 소모"
    },
    {
      "id": 35010,
      "name": "50%",
      "desc": "영력 50% 소모"
    },
    {
      "id": 35020,
      "name": "삼광응수법",
      "desc": "영력 상한 10% 증가 (중첩 가능)"
    },
    {
      "id": 41020,
      "name": "100%",
      "desc": "자신에게 화상이 있으면 공격력 100% 피해 추가"
    },
    {
      "id": 41021,
      "name": "100%",
      "desc": "상대 공격력 100% 피해를 받음"
    },
    {
      "id": 41030,
      "name": "5%",
      "desc": "자신 생명력 5% 소모"
    },
    {
      "id": 41031,
      "name": "15%",
      "desc": "생명력 15% 소모"
    },
    {
      "id": 42030,
      "name": "3",
      "desc": "자신에게 화상이 있으면 화상 3중첩 추가"
    },
    {
      "id": 43030,
      "name": "，20%",
      "desc": "적에게 화상이 있으면 적 현재 생명력 20% 추가 감소"
    },
    {
      "id": 43031,
      "name": "20%",
      "desc": "현재 생명력 20% 감소"
    },
    {
      "id": 43040,
      "name": "2buff",
      "desc": "적의 무작위 버프 2중첩 해제"
    },
    {
      "id": 44010,
      "name": "20%，",
      "desc": "적 생명력이 20% 미만이면 즉시 처형"
    },
    {
      "id": 44011,
      "name": "20%",
      "desc": "생명력 20% 감소"
    },
    {
      "id": 44020,
      "name": "10%",
      "desc": "자신 생명력 10% 소모"
    },
    {
      "id": 44021,
      "name": "연혼폭염술",
      "desc": "치명타 +10%, 치명타 피해 +20% (중첩 가능)"
    },
    {
      "id": 44030,
      "name": "1，100%",
      "desc": "적에게 화상 1중첩이 붙을 때마다 자신의 공격력 100%만큼 생명력 회복"
    },
    {
      "id": 44031,
      "name": "100%",
      "desc": "자신의 공격력 100%만큼 생명력 회복"
    },
    {
      "id": 45010,
      "name": "50%，10",
      "desc": "생명력이 50% 미만이면 적에게 화상 10중첩 부여"
    },
    {
      "id": 45020,
      "name": "50%，20%",
      "desc": "생명력이 50% 미만이면 적에게 생명력 20%의 피해"
    },
    {
      "id": 45021,
      "name": "20%",
      "desc": "생명력 20% 차감"
    },
    {
      "id": 45030,
      "name": "25%",
      "desc": "자신의 생명력 25% 차감"
    },
    {
      "id": 51020,
      "name": "5%",
      "desc": "5% 확률로 적 즉사"
    },
    {
      "id": 51021,
      "name": "100%",
      "desc": "생명력 100% 피해"
    },
    {
      "id": 51030,
      "name": "20%1",
      "desc": "20% 확률로 적 기절 1턴"
    },
    {
      "id": 52010,
      "name": "50%，（100%）",
      "desc": "자신의 생명력이 50% 초과이면 추가로 (공격력 100%) 피해"
    },
    {
      "id": 52011,
      "name": "（100%）",
      "desc": "(공격력 100%) 피해"
    },
    {
      "id": 52030,
      "name": "암석술",
      "desc": "피해 감소 +2% (중첩 가능)"
    },
    {
      "id": 53010,
      "name": "지룡번신술",
      "desc": "최대 생명력 +5% (중첩 가능)"
    },
    {
      "id": 53020,
      "name": "50%，（20%）",
      "desc": "적 생명력이 50% 초과이면 추가로 (자신 생명력 20%) 피해"
    },
    {
      "id": 53021,
      "name": "20%",
      "desc": "상대 생명력 20%의 피해를 받음"
    },
    {
      "id": 53030,
      "name": "50%，1",
      "desc": "적 생명력이 50% 초과이면 1턴 기절"
    },
    {
      "id": 54010,
      "name": "5%",
      "desc": "자신의 생명력 5% 차감"
    },
    {
      "id": 54040,
      "name": "상태 54040",
      "desc": "입힌 피해량만큼 회복"
    },
    {
      "id": 55010,
      "name": "상태 55010",
      "desc": "자신의 피해 감소에 비례해 이 법술 피해에 보너스 적용"
    },
    {
      "id": 55040,
      "name": "지장결",
      "desc": "가하는 피해 10% 감소"
    },
    {
      "id": 60310,
      "name": "25%1",
      "desc": "25% 확률로 적 기절 1턴"
    },
    {
      "id": 60520,
      "name": "50%1",
      "desc": "50% 확률로 적에게 빙결 1중첩 부여"
    },
    {
      "id": 60530,
      "name": "，1",
      "desc": "빙결이 부여되어 있으면 추가로 빙결 1중첩"
    },
    {
      "id": 60820,
      "name": "100%",
      "desc": "입힌 피해의 100% 회복"
    },
    {
      "id": 70230,
      "name": "100%",
      "desc": "입힌 피해의 100% 회복"
    },
    {
      "id": 70530,
      "name": "150%",
      "desc": "공격력 150%만큼 생명력 회복"
    },
    {
      "id": 70610,
      "name": "50%1",
      "desc": "각 타격마다 50% 확률로 적에게 중독 1중첩 부여"
    },
    {
      "id": 122040,
      "name": "30%",
      "desc": "전투 중 법술 시전 시 소모 영력 30% 감소"
    },
    {
      "id": 132040,
      "name": "상태 132040",
      "desc": "전투 중 중독 면역"
    },
    {
      "id": 132050,
      "name": "상태 132050",
      "desc": "전투 중 화상 면역"
    },
    {
      "id": 132060,
      "name": "상태 132060",
      "desc": "전투 중 빙결 면역"
    },
    {
      "id": 142060,
      "name": "상태 142060",
      "desc": "전투 시작 시 즉시 1회 행동"
    },
    {
      "id": 152010,
      "name": "5%",
      "desc": "매 턴 최대 생명력 5%만큼 생명력 회복"
    },
    {
      "id": 152020,
      "name": "3",
      "desc": "전투 시작 시 보호막 3중첩 획득"
    },
    {
      "id": 152030,
      "name": "30%",
      "desc": "패배 시 즉시 생명력 30%로 부활"
    },
    {
      "id": 210010,
      "name": "，，1%",
      "desc": "전투 중, 행동 종료 시마다 최대 생명력 1% 회복"
    },
    {
      "id": 210020,
      "name": "，，2%",
      "desc": "전투 중, 행동 종료 시마다 최대 영력 2% 회복"
    },
    {
      "id": 210030,
      "name": "，，5%",
      "desc": "전투 중, 행동 종료 시마다 행동 게이지 5% 증가"
    },
    {
      "id": 210040,
      "name": "，5%",
      "desc": "전투 중, 적 속도 5% 감소"
    },
    {
      "id": 220010,
      "name": "，，15%（）",
      "desc": "전투 중, 행동 종료 시마다 상대 공격력 15%만큼 생명력 흡수(생명력 감소)"
    },
    {
      "id": 220011,
      "name": "，，15%（）",
      "desc": "전투 중, 행동 종료 시마다 상대 공격력 15%만큼 생명력 흡수(생명력 회복)"
    },
    {
      "id": 220020,
      "name": "，，8%",
      "desc": "전투 중, 행동 종료 시마다 적 행동 게이지 8% 감소"
    },
    {
      "id": 220030,
      "name": "，4%，4%，8%",
      "desc": "전투 중, 공격력 +4%, 치명타 +4%, 치명타 피해 +8%"
    },
    {
      "id": 220040,
      "name": "，，30%1【，5%】",
      "desc": "전투 중, 피격 시마다 30% 확률로 적에게 화상 1중첩 부여"
    },
    {
      "id": 230010,
      "name": "，",
      "desc": "전투 중, 기절 효과 면역"
    },
    {
      "id": 230020,
      "name": "，，20%",
      "desc": "전투 중, 양측이 행동을 종료할 때마다 적에게 자신 공격력 20%의 피해를 입힘"
    },
    {
      "id": 230030,
      "name": "，，40%",
      "desc": "전투 중, 피격 시마다 적에게 공격력 40%의 피해를 입힘"
    },
    {
      "id": 230040,
      "name": "，，8%",
      "desc": "전투 중, 공격 시마다 추가로 적에게 최대 영력 8%의 피해를 입힘"
    },
    {
      "id": 240010,
      "name": "，，+3%",
      "desc": "전투 중, 행동 종료 시마다 속도 +3%"
    },
    {
      "id": 240020,
      "name": "，，50%100%",
      "desc": "전투 중, 피해를 받을 때마다 50% 확률로 공격력 100%만큼 생명력 회복"
    },
    {
      "id": 240021,
      "name": "100%",
      "desc": "공격력 100%만큼 생명력 회복"
    },
    {
      "id": 240030,
      "name": "，，25%1【50%】",
      "desc": "전투 중, 공격 시마다 25% 확률로 적에게 마비 1중첩 부여"
    },
    {
      "id": 240040,
      "name": "，，2buff",
      "desc": "전투 중, 행동 시작 시마다 자신의 무작위 약화 버프 2중첩 해제"
    },
    {
      "id": 250010,
      "name": "，，20%",
      "desc": "전투 중, 피해를 입힐 때마다 그 피해의 20% 회복"
    },
    {
      "id": 250020,
      "name": "，，25%20%",
      "desc": "전투 중, 패배 시마다 25% 확률로 자신의 생명력 20% 회복 및 부활"
    },
    {
      "id": 250021,
      "name": "20%",
      "desc": "자신의 생명력 20% 회복"
    },
    {
      "id": 250030,
      "name": "，，20%",
      "desc": "전투 중, 행동 종료 시마다 20% 확률로 한 턴 더 행동"
    },
    {
      "id": 250040,
      "name": "，，40%1【】",
      "desc": "전투 중, 행동 시작 시마다 40% 확률로 보호막 1중첩 획득"
    },
    {
      "id": 260010,
      "name": "，，1",
      "desc": "전투 중, 공격 시마다 적에게 화상 1중첩 부여"
    },
    {
      "id": 260020,
      "name": "，，，30%1",
      "desc": "전투 중, 적 턴 종료 시마다 적에게 화상이 있으면 30% 확률로 1턴 빙결"
    },
    {
      "id": 260021,
      "name": "30%1",
      "desc": "30% 확률로 빙결 1턴 부여"
    },
    {
      "id": 260030,
      "name": "，，5%",
      "desc": "전투 중, 행동 종료 시마다 최대 생명력 5% 회복"
    },
    {
      "id": 310010,
      "name": "50%1",
      "desc": "50% 확률로 적에게 빙결 1중첩 부여"
    },
    {
      "id": 320030,
      "name": "buff",
      "desc": "적의 모든 강화 버프 해제"
    },
    {
      "id": 330010,
      "name": "50%1",
      "desc": "각 피해마다 50% 확률로 적에게 마비 1중첩 부여"
    },
    {
      "id": 330020,
      "name": "상태 330020",
      "desc": "입힌 피해량만큼 회복"
    },
    {
      "id": 330030,
      "name": "50%5%",
      "desc": "각 피해마다 50% 확률로 추가로 상대 생명력 5%의 피해"
    },
    {
      "id": 330031,
      "name": "5%",
      "desc": "생명력 5% 차감"
    },
    {
      "id": 340020,
      "name": "25%",
      "desc": "생명력 25% 차감"
    },
    {
      "id": 350030,
      "name": "50%",
      "desc": "현재 생명력 50% 차감"
    },
    {
      "id": 350040,
      "name": "50%（）",
      "desc": "영력 50% 흡수(상대 감소)"
    },
    {
      "id": 350041,
      "name": "50%（）",
      "desc": "영력 50% 흡수(자신 증가)"
    },
    {
      "id": 360030,
      "name": "50%5%",
      "desc": "각 피해마다 50% 확률로 추가로 상대 생명력 5%의 피해"
    },
    {
      "id": 360031,
      "name": "5%",
      "desc": "생명력 5% 차감"
    },
    {
      "id": 360040,
      "name": "30%",
      "desc": "생명력 30% 차감"
    },
    {
      "id": 435020,
      "name": "，60%",
      "desc": "적이 요수 또는 영체일 때 입히는 피해 60% 증가"
    },
    {
      "id": 435021,
      "name": "60%",
      "desc": "공격력 60% 증가"
    },
    {
      "id": 455020,
      "name": "，100%",
      "desc": "적이 요수 또는 영체일 때 입히는 피해 100% 증가"
    },
    {
      "id": 455021,
      "name": "100%",
      "desc": "공격력 100% 증가"
    },
    {
      "id": 711020,
      "name": "10%1",
      "desc": "10% 확률로 적 기절 1턴"
    },
    {
      "id": 950050,
      "name": "，50%，1",
      "desc": "매 턴 시작 시 생명력이 50% 미만이면 피해 증가 1중첩 획득"
    },
    {
      "id": 950070,
      "name": "，2",
      "desc": "전투 시작 시 적에게 마비 2중첩 부여"
    },
    {
      "id": 950080,
      "name": "3",
      "desc": "전투 시작 시 보호막 3중첩 획득"
    },
    {
      "id": 1250020,
      "name": "，20%",
      "desc": "전투 시작 시 적이 즉시 최대 생명력 20%의 고정 피해를 받음"
    }
  ],
  "attributes": [
    {
      "id": 1,
      "name": "경지",
      "type": 1,
      "init": 1,
      "max": 6,
      "min": 1
    },
    {
      "id": 2,
      "name": "연단 등급",
      "type": 1,
      "init": 1,
      "max": 5,
      "min": 1
    },
    {
      "id": 3,
      "name": "법보 제련 등급",
      "type": 1,
      "init": 1,
      "max": 5,
      "min": 1
    },
    {
      "id": 4,
      "name": "연단 경험",
      "type": 1,
      "init": 0,
      "max": 9999,
      "min": 0
    },
    {
      "id": 5,
      "name": "법보 제련 경험",
      "type": 1,
      "init": 0,
      "max": 9999,
      "min": 0
    },
    {
      "id": 11,
      "name": "체백",
      "type": 1,
      "init": 1,
      "max": 9999,
      "min": 0
    },
    {
      "id": 12,
      "name": "영력",
      "type": 1,
      "init": 0,
      "max": 999999,
      "min": 0
    },
    {
      "id": 13,
      "name": "오성",
      "type": 1,
      "init": 0,
      "max": 9999,
      "min": 0
    },
    {
      "id": 14,
      "name": "수명",
      "type": 1,
      "init": 60,
      "max": 999999,
      "min": 0
    },
    {
      "id": 15,
      "name": "수위",
      "type": 1,
      "init": 0,
      "max": 9999,
      "min": 0
    },
    {
      "id": 21,
      "name": "생명",
      "type": 1,
      "init": 20,
      "max": 999999,
      "min": 0
    },
    {
      "id": 22,
      "name": "공격력",
      "type": 1,
      "init": 0,
      "max": 9999,
      "min": 0
    },
    {
      "id": 23,
      "name": "속도",
      "type": 1,
      "init": 0,
      "max": 9999,
      "min": 0
    },
    {
      "id": 24,
      "name": "치명타",
      "type": 2,
      "init": 5,
      "max": 100,
      "min": 0
    },
    {
      "id": 25,
      "name": "치명타피해",
      "type": 2,
      "init": 200,
      "max": 999,
      "min": 0
    },
    {
      "id": 26,
      "name": "증뎀(추가피해)",
      "type": 2,
      "init": 0,
      "max": 1000,
      "min": -95
    },
    {
      "id": 27,
      "name": "감뎀(피해감소)",
      "type": 2,
      "init": 0,
      "max": 95,
      "min": -10000
    },
    {
      "id": 28,
      "name": "명중률",
      "type": 2,
      "init": 100,
      "max": 200,
      "min": 0
    },
    {
      "id": 29,
      "name": "회피율",
      "type": 2,
      "init": 0,
      "max": 100,
      "min": 0
    },
    {
      "id": 30,
      "name": "총 영근",
      "type": 1,
      "init": 10,
      "max": 500,
      "min": 0
    },
    {
      "id": 31,
      "name": "금 영근",
      "type": 1,
      "init": 0,
      "max": 100,
      "min": 0
    },
    {
      "id": 32,
      "name": "목 영근",
      "type": 1,
      "init": 0,
      "max": 100,
      "min": 0
    },
    {
      "id": 33,
      "name": "수 영근",
      "type": 1,
      "init": 0,
      "max": 100,
      "min": 0
    },
    {
      "id": 34,
      "name": "화 영근",
      "type": 1,
      "init": 0,
      "max": 100,
      "min": 0
    },
    {
      "id": 35,
      "name": "토 영근",
      "type": 1,
      "init": 0,
      "max": 100,
      "min": 0
    },
    {
      "id": 41,
      "name": "임소엽 호감도",
      "type": 1,
      "init": 0,
      "max": 10,
      "min": -10
    },
    {
      "id": 42,
      "name": "조명월 호감도",
      "type": 1,
      "init": 0,
      "max": 10,
      "min": -10
    },
    {
      "id": 43,
      "name": "소유리 호감도",
      "type": 1,
      "init": 0,
      "max": 10,
      "min": -10
    },
    {
      "id": 61,
      "name": "현재 생명",
      "type": 1,
      "init": 0,
      "max": 999999,
      "min": 0
    },
    {
      "id": 62,
      "name": "현재 영력",
      "type": 1,
      "init": 0,
      "max": 999999,
      "min": 0
    },
    {
      "id": 71,
      "name": "금 영근 보너스",
      "type": 2,
      "init": 10,
      "max": 9999,
      "min": 0
    },
    {
      "id": 72,
      "name": "목 영근 보너스",
      "type": 2,
      "init": 10,
      "max": 9999,
      "min": 0
    },
    {
      "id": 73,
      "name": "수 영근 보너스",
      "type": 2,
      "init": 10,
      "max": 9999,
      "min": 0
    },
    {
      "id": 74,
      "name": "화 영근 보너스",
      "type": 2,
      "init": 10,
      "max": 9999,
      "min": 0
    },
    {
      "id": 75,
      "name": "토 영근 보너스",
      "type": 2,
      "init": 10,
      "max": 9999,
      "min": 0
    },
    {
      "id": 81,
      "name": "생명 보너스 %",
      "type": 2,
      "init": 0,
      "max": 100000,
      "min": -100000
    },
    {
      "id": 82,
      "name": "영력 보너스 %",
      "type": 2,
      "init": 0,
      "max": 100000,
      "min": -100000
    },
    {
      "id": 83,
      "name": "공격 보너스 %",
      "type": 2,
      "init": 0,
      "max": 100000,
      "min": -100000
    },
    {
      "id": 84,
      "name": "속도 보너스 %",
      "type": 2,
      "init": 0,
      "max": 100000,
      "min": -100000
    },
    {
      "id": 85,
      "name": "영력 소모 %",
      "type": 2,
      "init": 100,
      "max": 100000,
      "min": 0
    },
    {
      "id": 91,
      "name": "무기 품질",
      "type": 1,
      "init": 0,
      "max": 5,
      "min": 0
    },
    {
      "id": 92,
      "name": "의복 품질",
      "type": 1,
      "init": 0,
      "max": 5,
      "min": 0
    },
    {
      "id": 93,
      "name": "신발 품질",
      "type": 1,
      "init": 0,
      "max": 5,
      "min": 0
    },
    {
      "id": 101,
      "name": "법보 수",
      "type": 1,
      "init": 0,
      "max": 10,
      "min": 0
    },
    {
      "id": 102,
      "name": "법보 품질 합계",
      "type": 1,
      "init": 0,
      "max": 50,
      "min": 0
    }
  ],
  "itemTypes": {
    "0": "영석",
    "1": "단약",
    "2": "지속형 법보",
    "3": "발동형 법보",
    "4": "무기",
    "5": "의복",
    "6": "신발",
    "7": "비급",
    "8": "기타",
    "9": "기능",
    "11": "영지",
    "12": "부적"
  },
  "equipEnumKeys": {
    "4": "Weapon",
    "5": "Clothes",
    "6": "Shoes"
  }
};
  return LrsCatalogData;
}));
