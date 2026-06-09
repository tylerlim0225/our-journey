// ─────────────────────────────────────────────────────────────
// Our Travel Atlas — local data only.
// All content here is bundled into the public JS, so anything
// "secret" placed in this file is visible to anyone with browser
// devtools. The Vault password below is intentionally playful.
// ─────────────────────────────────────────────────────────────

export type TripStatus = 'planned' | 'in-progress' | 'completed';

export interface Place {
  id: string;
  name: string;
  nameEn?: string;
  region: string;
  lat: number;
  lng: number;
  date: string;        // YYYY-MM-DD
  day?: number;        // day-index within its trip
  trip?: string;       // group id
  theme?: string;
  quote?: string;
  emotion: string[];
  memories: string[];
  photoColor?: string; // tailwind gradient e.g. 'from-rose-200 to-amber-200'
  favorite?: boolean;
  status?: TripStatus;
  isSecret?: boolean;
}

export interface Chapter {
  number: number;
  date: string;
  title: string;
  theme: string;
  summary: string;
  placeIds: string[];
  color?: string;
}

export interface Note {
  id: string;
  date: string;
  title: string;
  body: string;
  mood?: string;
}

export interface VaultEntry {
  date: string;
  title: string;
  body: string;
  meta?: string;
}

// ── Atlas meta ──────────────────────────────────────────────
export const atlas = {
  title: 'Our Travel Atlas',
  titleKo: '태윤💛지은 여행 일지',
  tagline: 'A map of where we went, and what stayed with us.',
  taglineKo: '우리가 머문 자리, 우리에게 남은 풍경.',
  period: { from: '2025', to: '2026' },
  authors: ['태윤', '지은'],
};

// ── Places (markers on the atlas) ───────────────────────────
export const places: Place[] = [
  {
    id: 'alov-yangju',
    name: 'ALOV 양주',
    nameEn: 'ALOV Yangju Villa',
    region: '경기 양주시 · 회암동',
    lat: 37.78,
    lng: 127.07,
    date: '2026-07-15',
    day: 1,
    trip: 'alov-2026',
    theme: '다음 챕터',
    quote: '아직 가지 않은 곳을 함께 그려본다.',
    emotion: ['설렘', '기대', '함께'],
    memories: [
      '빌라 독채에서 늦은 아침을 천천히.',
      '회암사 산책길의 적막을 기억하기로.',
    ],
    photoColor: 'from-amber-100 to-stone-300',
    status: 'planned',
  },
  {
    id: 'hamdeok',
    name: '함덕 해변',
    nameEn: 'Hamdeok Beach',
    region: '제주 조천읍',
    lat: 33.5435,
    lng: 126.6685,
    date: '2025-09-04',
    day: 2,
    trip: 'jeju-2025',
    theme: '에메랄드 오후',
    quote: '바닷빛은 매번 다르고, 매번 같다.',
    emotion: ['청량함', '느림', '햇살'],
    memories: [
      '발끝까지 차오른 모래의 온도.',
      '갈매기 그림자가 모자를 스쳐갔다.',
    ],
    photoColor: 'from-teal-200 to-cyan-400',
    favorite: true,
    status: 'completed',
  },
  {
    id: 'gwangalli',
    name: '광안리 해변',
    nameEn: 'Gwangalli',
    region: '부산 수영구',
    lat: 35.1531,
    lng: 129.1183,
    date: '2026-03-08',
    day: 1,
    trip: 'busan-2026',
    theme: '야경의 다리',
    quote: '도시의 끝에서 바다가 시작될 때.',
    emotion: ['반짝임', '밤', '도시'],
    memories: ['광안대교 불빛이 파도 위에서 흔들렸다.'],
    photoColor: 'from-indigo-400 to-purple-600',
    status: 'completed',
  },
  {
    id: 'gyeongpo',
    name: '경포 해변',
    nameEn: 'Gyeongpo Beach',
    region: '강원 강릉시',
    lat: 37.796,
    lng: 128.9091,
    date: '2026-05-04',
    day: 1,
    trip: 'gangneung-2026',
    theme: '오월의 바람',
    quote: '바다는 조용해서 멀리까지 들렸다.',
    emotion: ['고요', '바람'],
    memories: ['긴 백사장을 한참 걸었다.'],
    photoColor: 'from-sky-200 to-blue-400',
    status: 'completed',
  },
  {
    id: 'anmok',
    name: '안목 커피거리',
    nameEn: 'Anmok Coffee Street',
    region: '강원 강릉시',
    lat: 37.7717,
    lng: 128.9462,
    date: '2026-05-05',
    day: 2,
    trip: 'gangneung-2026',
    theme: '커피 한 잔의 풍경',
    quote: '바다를 끓여 만든 커피라는 농담.',
    emotion: ['여유'],
    memories: ['통창 너머 아침 바다.'],
    photoColor: 'from-amber-200 to-orange-300',
    status: 'completed',
  },
  {
    id: 'bomun',
    name: '보문호 벚꽃길',
    nameEn: 'Bomun Cherry Path',
    region: '경북 경주시',
    lat: 35.8537,
    lng: 129.2542,
    date: '2026-04-12',
    day: 1,
    trip: 'gyeongju-2026',
    theme: '꽃비가 내리던 날',
    quote: '봄은 짧고 우리는 길게 걸었다.',
    emotion: ['두근거림', '봄', '꽃'],
    memories: ['벚꽃이 바람에 한꺼번에 쏟아졌다.'],
    photoColor: 'from-pink-200 to-rose-300',
    favorite: true,
    status: 'completed',
  },
  {
    id: 'hwangridanggil',
    name: '황리단길',
    nameEn: 'Hwangridanggil',
    region: '경북 경주시',
    lat: 35.8344,
    lng: 129.2118,
    date: '2026-04-13',
    day: 2,
    trip: 'gyeongju-2026',
    theme: '느린 골목들',
    quote: '오래된 것은 가끔 가장 새롭게 보인다.',
    emotion: ['따스함', '오래된'],
    memories: ['한옥 카페에서 마신 한 잔.'],
    photoColor: 'from-stone-200 to-amber-200',
    status: 'completed',
  },
  {
    id: 'hanriver',
    name: '잠수교 산책',
    nameEn: 'Jamsu Bridge',
    region: '서울 서초구',
    lat: 37.5191,
    lng: 126.9977,
    date: '2026-05-18',
    day: 1,
    trip: 'seoul-2026',
    theme: '도시의 노을',
    quote: '도시도 가끔은 자연처럼 빛난다.',
    emotion: ['평온함'],
    memories: ['노을이 한강에 천천히 내려앉았다.'],
    photoColor: 'from-orange-200 to-pink-300',
    status: 'completed',
  },
  // Hidden / vault-related pin — appears as mysterious marker on the map
  {
    id: 'secret-first-meet',
    name: '???',
    nameEn: 'Unknown',
    region: '비밀',
    lat: 37.564,
    lng: 126.9805,
    date: '2025-08-15',
    theme: '시작의 좌표',
    quote: '여기서 모든 게 시작되었다.',
    emotion: [],
    memories: [],
    photoColor: 'from-stone-700 to-stone-900',
    isSecret: true,
  },
];

// ── Journey chapters (scroll-linked story) ──────────────────
export const chapters: Chapter[] = [
  {
    number: 1,
    date: '2026-07-15',
    title: '양주로 향하는 길',
    theme: '도착',
    summary:
      '북쪽으로 한 시간 반. 익숙한 도시가 멀어지고, 능선이 보이기 시작했다. 우리만의 시간이 천천히 열렸다.',
    placeIds: ['alov-yangju'],
    color: 'from-amber-100/60 to-stone-200/60',
  },
  {
    number: 2,
    date: '2026-07-16',
    title: '회암사 산책과 빌라의 조식',
    theme: '느림',
    summary:
      '바람이 아직 시원했던 아침. 가지 않아도 되는 곳들을 천천히 골랐다. 시간이 우리를 기다려준 하루.',
    placeIds: [],
    color: 'from-emerald-100/60 to-stone-200/60',
  },
  {
    number: 3,
    date: '2026-04-12',
    title: '경주의 봄, 보문호 한 바퀴',
    theme: '꽃',
    summary:
      '오래된 도시에 꽃이 내렸다. 자전거 페달을 천천히 굴리며 같은 길을 두 번 돌았다.',
    placeIds: ['bomun', 'hwangridanggil'],
    color: 'from-pink-100/60 to-rose-200/60',
  },
  {
    number: 4,
    date: '2025-09-04',
    title: '제주, 그 해의 짧은 9월',
    theme: '바다',
    summary:
      '여름의 끝자락에 도착한 섬. 함덕의 빛은 처음 보는 것 같았고, 마지막인 것 같았다.',
    placeIds: ['hamdeok'],
    color: 'from-teal-100/60 to-cyan-200/60',
  },
];

// ── Notes (journal) ─────────────────────────────────────────
export const notes: Note[] = [
  {
    id: 'n-2026-06-09',
    date: '2026-06-09',
    title: '비 오는 토요일',
    body: '오늘은 비가 와서 집에서 영화 봤다.\n같이 만든 김치찌개가 잘 됐다.',
    mood: '잔잔함',
  },
  {
    id: 'n-2026-05-18',
    date: '2026-05-18',
    title: '한강 산책',
    body: '날씨가 좋아서 잠수교까지 걸었다. 노을이 진짜 예뻤다.',
    mood: '노을',
  },
  {
    id: 'n-2026-04-30',
    date: '2026-04-30',
    title: '벚꽃 다 떨어지기 전에',
    body: '서울숲 한 바퀴. 핸드폰 배터리가 다 닳을 정도로 사진 찍었다.',
    mood: '봄',
  },
  {
    id: 'n-2026-03-22',
    date: '2026-03-22',
    title: '동네 카페 새로 발견',
    body: '집 근처 골목에 작은 로스터리. 라떼가 진짜 부드러웠다.',
    mood: '발견',
  },
];

// ── Vault — playful frontend "lock", not real security ──────
// NOTE: VAULT_PASSWORD ships in the client bundle. Anyone with
// devtools can read it. Treat this as a romantic interaction,
// not access control.
export const VAULT_PASSWORD = '0815';

export const vaultEntries: VaultEntry[] = [
  {
    date: '2025-08-15',
    title: '첫 만남의 골목',
    body:
      '그날의 모든 것이 어색했고, 어색해서 좋았다.\n까만 셔츠를 입고 나갔던 게 잘한 선택이었던 것 같다.',
    meta: '여행의 마지막 밤에 열어보기로 약속한 편지.',
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
    meta: '다음 여행지 후보: ALOV 양주 빌라스테이.',
  },
];

// ── helpers ─────────────────────────────────────────────────
export const visiblePlaces = places.filter(p => !p.isSecret);
export const secretPlaces = places.filter(p => p.isSecret);
export function getPlace(id: string) {
  return places.find(p => p.id === id) ?? null;
}
