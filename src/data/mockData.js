export const actionItems = [
  {
    id: "refill",
    title: "리필 요청 확인",
    value: "재고 20% 미만 스테이션: 3곳",
    description: "서울숲, 판교테크노, 광안리 비치 스테이션이 임계치 이하입니다.",
    severity: "critical",
  },
  {
    id: "offline",
    title: "기기 상태",
    value: "오프라인 스테이션: 1곳",
    description: "강릉 오션뷰 스테이션이 08:10 이후 응답 없음",
    severity: "warning",
  },
];

export const kpiSummary = [
  {
    id: "today",
    label: "오늘 발생 매출",
    value: "1,350,000원",
    subLabel: "평균 객단가 18,000원",
  },
  {
    id: "month",
    label: "이달 누적 매출",
    value: "24,500,000원",
    delta: "+15%",
    subLabel: "지난달 동기 대비",
  },
  {
    id: "stations",
    label: "총 스테이션 수",
    value: "58개",
    subLabel: "서울 21 · 수도권 15 · 기타 22",
  },
];

export const salesTrend = [
  { day: "월", amount: 180 },
  { day: "화", amount: 210 },
  { day: "수", amount: 175 },
  { day: "목", amount: 260 },
  { day: "금", amount: 320 },
  { day: "토", amount: 400 },
  { day: "일", amount: 295 },
];

export const topProducts = [
  { rank: 1, name: "비건 샴푸", supplier: "알맹상점", sales: "18,900g" },
  { rank: 2, name: "라벤더 핸드워시", supplier: "아모레퍼시픽", sales: "15,300g" },
  { rank: 3, name: "주방 세제 ZERO", supplier: "에코버", sales: "11,450g" },
  { rank: 4, name: "넛트리션 바디워시", supplier: "올가", sales: "9,870g" },
  { rank: 5, name: "시트러스 다목적 세정제", supplier: "메종오가닉", sales: "8,120g" },
];

export const stationList = [
  {
    id: "ST-021",
    partner: "서울숲 알맹상점",
    location: "서울 성동구",
    status: "online",
    inventory: 18,
    refillItem: "린스, 주방세제",
    lastInspection: "2024-10-02",
    address: "서울 성동구 서울숲2길 45",
    contact: "02-123-4567 / 박운영",
    dispensers: [
      { slot: "1번", product: "비건 샴푸", percent: 82 },
      { slot: "2번", product: "라벤더 린스", percent: 15 },
      { slot: "3번", product: "주방세제 ZERO", percent: 12 },
    ],
    recentSales: [
      { time: "10:15", product: "비건 샴푸", amount: "230g" },
      { time: "09:40", product: "주방세제 ZERO", amount: "180g" },
    ],
    maintenanceLogs: [
      { date: "2024-09-28", note: "노즐 세척" },
      { date: "2024-09-20", note: "결제 모듈 점검" },
    ],
  },
  {
    id: "ST-037",
    partner: "판교테크노몰",
    location: "경기 성남시",
    status: "online",
    inventory: 22,
    refillItem: "샴푸",
    lastInspection: "2024-10-01",
    address: "경기 성남시 분당구 판교역로 235",
    contact: "031-987-4567 / 이현수",
    dispensers: [
      { slot: "1번", product: "라벤더 핸드워시", percent: 64 },
      { slot: "2번", product: "넛트리션 바디워시", percent: 42 },
      { slot: "3번", product: "시트러스 세정제", percent: 18 },
    ],
    recentSales: [
      { time: "11:10", product: "라벤더 핸드워시", amount: "320g" },
      { time: "10:05", product: "시트러스 세정제", amount: "260g" },
    ],
    maintenanceLogs: [
      { date: "2024-09-30", note: "충전 모듈 점검" },
      { date: "2024-09-22", note: "소모품 교체" },
    ],
  },
  {
    id: "ST-044",
    partner: "광안리 비치마켓",
    location: "부산 수영구",
    status: "online",
    inventory: 16,
    refillItem: "바디워시",
    lastInspection: "2024-09-29",
    address: "부산 수영구 광안해변로 203",
    contact: "051-345-8844 / 김해솔",
    dispensers: [
      { slot: "1번", product: "코코넛 바디워시", percent: 14 },
      { slot: "2번", product: "라벤더 린스", percent: 45 },
      { slot: "3번", product: "주방세제 ZERO", percent: 33 },
    ],
    recentSales: [
      { time: "12:05", product: "코코넛 바디워시", amount: "410g" },
      { time: "11:47", product: "라벤더 린스", amount: "198g" },
    ],
    maintenanceLogs: [
      { date: "2024-09-26", note: "관제 소프트웨어 업데이트" },
    ],
  },
  {
    id: "ST-012",
    partner: "강릉 오션뷰 카페",
    location: "강원 강릉시",
    status: "offline",
    inventory: 48,
    refillItem: "없음",
    lastInspection: "2024-09-25",
    address: "강원 강릉시 창해로 123",
    contact: "033-765-5521 / 최운영",
    dispensers: [
      { slot: "1번", product: "시트러스 세정제", percent: 52 },
      { slot: "2번", product: "비건 샴푸", percent: 71 },
      { slot: "3번", product: "라벤더 핸드워시", percent: 65 },
    ],
    recentSales: [
      { time: "전일 16:20", product: "라벤더 핸드워시", amount: "150g" },
    ],
    maintenanceLogs: [
      { date: "2024-09-15", note: "펌프 교체" },
      { date: "2024-09-10", note: "오프라인 이슈 재발" },
    ],
  },
];

export const productList = [
  {
    id: "PR-101",
    name: "라벤더 핸드워시",
    supplier: "아모레퍼시픽",
    category: "핸드워시",
    unitPrice: 30,
    status: "판매 중",
    hygieneInfo: "EWG 그린 등급, 2024-09-28 소분",
    lastRefillAt: "2024-09-28",
    compliance: "비건 인증 · 자연 유래 계면활성제",
    description: "보태니컬 라벤더 향과 보습 성분으로 잔여감 없이 세정해 주는 프리미엄 핸드워시.",
    image: "/lavender_handwash.jpg",
  },
  {
    id: "PR-088",
    name: "비건 샴푸",
    supplier: "알맹상점",
    category: "헤어",
    unitPrice: 35,
    status: "판매 중",
    hygieneInfo: "비건 인증, 2024-09-30 소분",
    lastRefillAt: "2024-09-30",
    compliance: "EWG Green · 무실리콘",
    description: "두피 자극을 최소화한 저자극 포뮬러로 수분·영양 밸런스를 맞춰 주는 비건 샴푸.",
    image: "/vegan_shampoo.jpg",
  },
  {
    id: "PR-077",
    name: "코코넛 바디워시",
    supplier: "에코버",
    category: "바디",
    unitPrice: 28,
    status: "판매 중",
    hygieneInfo: "EWG Green, 2024-09-26 소분",
    lastRefillAt: "2024-09-26",
    compliance: "코코넛 기반 계면활성제 · 저자극 테스트 완료",
    description: "코코넛 오일과 알로에 추출물이 건조함 없이 세정해 주는 데일리 바디워시.",
    image: "/coconut_bodywash.jpg",
  },
  {
    id: "PR-055",
    name: "시트러스 다목적 세정제",
    supplier: "메종오가닉",
    category: "생활세제",
    unitPrice: 22,
    status: "숨김",
    hygieneInfo: "친환경 세정 성분, 2024-09-18 소분",
    lastRefillAt: "2024-09-18",
    compliance: "USDA 인증 · 생분해 98%",
    description: "주방/욕실 어디서나 사용할 수 있는 시트러스향 다목적 세정제.",
    image: "/citrus_washer.jpg",
  },
];

export const productFormDefaults = {
  name: "",
  supplier: "",
  category: "",
  unitPrice: "",
  description: "",
  compliance: "",
  lastRefillAt: "",
  image: null,
};

export const salesAnalytics = {
  summary: {
    total: "64,800,000원",
    avgOrder: "17,800원",
    repeatRate: "42%",
  },
  daily: [
    { label: "10/01", sales: 1.4, transactions: 52, avgOrder: 16.8 },
    { label: "10/02", sales: 1.6, transactions: 58, avgOrder: 17.2 },
    { label: "10/03", sales: 1.3, transactions: 49, avgOrder: 17.9 },
    { label: "10/04", sales: 1.9, transactions: 63, avgOrder: 19.5 },
    { label: "10/05", sales: 2.3, transactions: 71, avgOrder: 20.1 },
    { label: "10/06", sales: 2.7, transactions: 86, avgOrder: 18.4 },
    { label: "10/07", sales: 2.1, transactions: 64, avgOrder: 19.3 },
  ],
  weekly: [
    { label: "8월 4주", sales: 8.4, transactions: 250, avgOrder: 16.5 },
    { label: "9월 1주", sales: 9.1, transactions: 270, avgOrder: 16.8 },
    { label: "9월 2주", sales: 9.5, transactions: 288, avgOrder: 17.1 },
    { label: "9월 3주", sales: 10.2, transactions: 305, avgOrder: 17.8 },
    { label: "9월 4주", sales: 10.9, transactions: 320, avgOrder: 18.2 },
    { label: "10월 1주", sales: 11.5, transactions: 338, avgOrder: 18.6 },
  ],
  monthly: [
    { label: "4월", sales: 32, transactions: 920, avgOrder: 16.1 },
    { label: "5월", sales: 36, transactions: 985, avgOrder: 16.5 },
    { label: "6월", sales: 40, transactions: 1_050, avgOrder: 16.9 },
    { label: "7월", sales: 44, transactions: 1_120, avgOrder: 17.5 },
    { label: "8월", sales: 48, transactions: 1_210, avgOrder: 17.8 },
    { label: "9월", sales: 56, transactions: 1_360, avgOrder: 18.4 },
  ],
};
