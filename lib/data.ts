// ─────────────────────────────────────────────────────────────
// Sample data — replace freely with your own trips/notes/vault.
// All content here is bundled into the public JS — anything
// "secret" placed in this file is visible to anyone with browser
// devtools. The Vault password below is intentionally playful.
// ─────────────────────────────────────────────────────────────

export type TripStatus = 'planned' | 'in-progress' | 'completed';

export interface Trip {
  id: string;
  title: string;
  location: string;
  lat: number;
  lng: number;
  date: string;       // YYYY-MM-DD
  days: number;
  highlights: string[];
  rating: number;     // 1-5
  status: TripStatus;
}

export interface Note {
  id: string;
  date: string;
  title: string;
  body: string;
}

export interface VaultEntry {
  date: string;
  title: string;
  body: string;
}

// ── Trips ──────────────────────────────────────────────────────
export const trips: Trip[] = [
  {
    id: 'jeju-2026-07',
    title: '제주도 3박4일',
    location: '제주특별자치도',
    lat: 33.4996,
    lng: 126.5312,
    date: '2026-07-15',
    days: 4,
    highlights: ['함덕 해변', '돈사돈 흑돼지', '카페 그초'],
    rating: 5,
    status: 'planned',
  },
  {
    id: 'busan-2026-03',
    title: '부산 주말여행',
    location: '부산광역시',
    lat: 35.1796,
    lng: 129.0756,
    date: '2026-03-08',
    days: 2,
    highlights: ['광안리 야경', '돼지국밥', '감천문화마을'],
    rating: 4,
    status: 'completed',
  },
  {
    id: 'gangneung-2026-05',
    title: '강릉 바다 보러',
    location: '강원도 강릉시',
    lat: 37.7519,
    lng: 128.8761,
    date: '2026-05-04',
    days: 2,
    highlights: ['경포해변', '안목 커피거리'],
    rating: 4,
    status: 'completed',
  },
  {
    id: 'gyeongju-2026-04',
    title: '경주 벚꽃',
    location: '경상북도 경주시',
    lat: 35.8562,
    lng: 129.2247,
    date: '2026-04-12',
    days: 2,
    highlights: ['보문호 벚꽃길', '첨성대', '황리단길'],
    rating: 5,
    status: 'completed',
  },
  {
    id: 'tokyo-2026-10',
    title: '도쿄 첫 해외여행',
    location: '일본 도쿄',
    lat: 35.6762,
    lng: 139.6503,
    date: '2026-10-20',
    days: 5,
    highlights: ['아사쿠사', '시부야 스크램블', '디즈니씨'],
    rating: 5,
    status: 'planned',
  },
];

// ── Notes ──────────────────────────────────────────────────────
export const notes: Note[] = [
  {
    id: 'n-2026-06-09',
    date: '2026-06-09',
    title: '비 오는 토요일',
    body: '오늘은 비가 와서 집에서 영화 봤다.\n같이 만든 김치찌개가 잘 됐다.',
  },
  {
    id: 'n-2026-05-18',
    date: '2026-05-18',
    title: '한강 산책',
    body: '날씨가 좋아서 잠수교까지 걸었다. 노을이 진짜 예뻤다.',
  },
  {
    id: 'n-2026-04-30',
    date: '2026-04-30',
    title: '벚꽃 다 떨어지기 전에',
    body: '서울숲 한 바퀴. 핸드폰 배터리가 다 닳을 정도로 사진 찍었다.',
  },
  {
    id: 'n-2026-03-22',
    date: '2026-03-22',
    title: '동네 카페 새로 발견',
    body: '집 근처 골목에 작은 로스터리. 라떼가 진짜 부드러웠다.',
  },
];

// ── Vault ──────────────────────────────────────────────────────
// 주의: 이 값은 클라이언트 번들에 포함됩니다. "재미용" 자물쇠입니다.
export const VAULT_PASSWORD = '0815';

export const vaultEntries: VaultEntry[] = [
  {
    date: '2025-08-15',
    title: '첫 만남',
    body:
      '그날의 모든 것이 어색했고, 어색해서 좋았다.\n까만 셔츠를 입고 나갔던 게 잘한 선택이었던 것 같다.',
  },
  {
    date: '2025-12-25',
    title: '첫 크리스마스',
    body:
      '엄청 추웠던 거리, 호떡 사 먹으며 걸은 명동.\n사람이 많아서 손을 더 꼭 잡았다.',
  },
  {
    date: '2026-08-15',
    title: '1주년 약속',
    body:
      '이날까지 다녀온 모든 여행 다시 같이 보기로.\n그리고 새로운 곳 한 군데 더 가기로 약속.',
  },
];
