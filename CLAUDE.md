# Our Travel Atlas — AI Handoff

> 이 문서는 Claude Code, Cursor, Aider, GitHub Copilot Chat 등 AI 어시스턴트가 이 저장소를 처음 열었을 때 자동으로 컨텍스트를 잡을 수 있도록 작성되었습니다. 새 세션을 시작하면 이 파일을 먼저 읽어주세요.

---

## TL;DR
**태윤(`tylerlim0225`)과 지은의 커플 여행 기록 사이트.** 단일 페이지 시네마틱 스크롤 스토리. **무료** 배포가 절대 규칙.

- **Live:** https://our-journey-black.vercel.app
- **Repo:** https://github.com/tylerlim0225/our-journey (public, main branch)
- **Vercel project:** `tylerlim0225-5527s-projects/our-journey`
- **Local clone:** `C:\Users\User\Desktop\Claude Coding\our-journey\`

---

## Tech Stack (locked-in)

| | |
|---|---|
| Framework | Next.js 14 App Router (`app/`) + TypeScript strict |
| Styling | Tailwind CSS 3.4 (다크 ink + cream + gold 팔레트) |
| Maps | `react-leaflet` + `leaflet` + **CARTO Dark free tiles** (no API key) |
| Motion | `framer-motion@^11` |
| Icons | `lucide-react` |
| Fonts | Pretendard (Pretendard CDN) + Cormorant Garamond + Noto Serif KR (Google Fonts CDN) |
| Data | **Local TypeScript only** — `lib/data.ts`. No DB, no API routes. |

다른 스택으로 갈아끼우지 말 것. 사용자가 명시적으로 요청할 때만.

---

## Hard Constraints (어기면 안 됨)

1. **무료 배포 유지** — Vercel Hobby, OSM/CARTO 무료 타일, 카드 정보 등록 금지, 유료 도메인 금지
2. **백엔드/DB/유료 API 금지** — Google Maps API, OpenAI API, Firebase 등 추가 금지
3. **로그인/인증 없음** — 사이트 자체는 누구나 URL로 접속 가능
4. **Vault는 재미용** — `VAULT_PASSWORD`와 `vaultEntries`가 클라이언트 번들에 포함됨. 의도된 것. 실제 보안 추가 제안 금지 (사용자가 명시적으로 원할 때만)
5. **Leaflet은 client-only** — `dynamic({ ssr: false })`로 감싸야 함. `AtlasMap.tsx`에서 `window` 접근

---

## Project Structure

```
our-journey/
├─ app/
│  ├─ layout.tsx          # 루트 레이아웃 (폰트 + AtlasProvider)
│  ├─ globals.css         # Tailwind + glass/ink-grain 유틸 + leaflet 톤다운
│  └─ page.tsx            # 6개 섹션 단일 페이지
├─ components/
│  ├─ FloatingNav.tsx     # 데스크 우측 도트 / 모바일 하단 알약, IntersectionObserver
│  ├─ IntroSection.tsx    # 풀스크린 인트로, 패럴랙스 + 토포 라인 배경
│  ├─ MapSection.tsx      # AtlasMap 래퍼 + 글래스 stat 카드 + 범례
│  ├─ AtlasMap.tsx        # react-leaflet, 커스텀 div 핀, dashed route, flyTo
│  ├─ PlaceCard.tsx       # 데스크 우측 슬라이드 / 모바일 바텀시트 with 드래그 핸들
│  ├─ JourneySection.tsx  # 스크롤 진행률 골드 라인 + 좌우 교차 챕터
│  ├─ MemoriesSection.tsx # 갤러리 카드, 클릭 시 지도로 점프 + 핀 자동선택
│  ├─ NotesSection.tsx    # 저널 타임라인
│  └─ VaultSection.tsx    # 시네마틱 락 → 언락 → 편지 reveal
├─ lib/
│  ├─ data.ts             # ★ 모든 콘텐츠 한 곳 — places/chapters/notes/vaultEntries
│  ├─ motion.ts           # 공유 framer-motion variants
│  └─ atlas-context.tsx   # selectedId + scrollToSection 공유 상태
├─ public/                # (현재 비어있음 — 사진 추가 시 여기)
└─ package.json           # next 14.2.33, framer-motion 11, lucide-react
```

---

## Content Authoring

### 새 여행 장소 추가
[`lib/data.ts`](lib/data.ts)의 `places: Place[]`에 객체 추가:

```ts
{
  id: 'unique-id',              // URL-safe
  name: '장소 이름',
  nameEn: 'English Name',       // optional
  region: '경기 양주시',
  lat: 37.78,
  lng: 127.07,                  // 좌표 — Naver/Kakao 지도에서 확인
  date: '2026-07-15',           // YYYY-MM-DD
  day: 1,                       // optional — trip 내 일차
  trip: 'alov-2026',            // 같은 trip이면 같은 챕터로 묶임
  theme: '도착',                 // optional, 짧은 테마
  quote: '한 줄 인용.',           // optional, 시적인 한 줄
  emotion: ['설렘', '함께'],      // 감정 태그 배열
  memories: ['오늘의 장면.'],     // 짧은 한 줄들
  photoColor: 'from-amber-100 to-stone-300',  // tailwind gradient (사진 자리)
  favorite: true,               // 골드 핀 + ❤️ 표시
  status: 'completed',          // 'planned' | 'in-progress' | 'completed'
  isSecret: false,              // true면 미스터리한 secret 핀 (이름이 ???로 표시됨)
}
```

### Day chapters (Journey 섹션)
`chapters: Chapter[]` — `number / date / title / theme / summary / placeIds[] / color`

### 저널 메모 (Notes 섹션)
`notes: Note[]` — `id / date / title / body / mood`

### Vault 편지
`vaultEntries: VaultEntry[]` — `date / title / body / meta`
비밀번호: `VAULT_PASSWORD = '0815'` (변경 자유)

---

## Local Dev

```powershell
cd "C:\Users\User\Desktop\Claude Coding\our-journey"
npm install                # 첫 클론 시
npm run dev                # http://localhost:3000
npm run build              # 배포 전 타입 체크
```

**Node 24.16.0 / npm 11.13.0** 이 사용자 머신에 설치되어 있음.

---

## Deploy

```powershell
cd "C:\Users\User\Desktop\Claude Coding\our-journey"
git add . ; git commit -m "..." ; git push origin main
vercel --prod --yes
```

⚠️ **GitHub→Vercel 자동배포 미연결**: `git push`만으로 자동 배포 안 됨. 반드시 `vercel --prod --yes` 직접 실행. 자동화 원하면 Vercel 대시보드 → Settings → Git → Connect Repository.

`vercel` 명령은 `C:\Users\User\AppData\Roaming\npm\vercel.cmd`. PATH 비어있으면:
```powershell
$env:Path = "$env:ProgramFiles\nodejs;C:\Users\User\AppData\Roaming\npm;$env:Path"
```

---

## CLI Auth State

| Tool | 위치 | 로그인 |
|---|---|---|
| `gh` (GitHub CLI 2.93) | `C:\Program Files\GitHub CLI\gh.exe` | `tylerlim0225`, scopes `gist, read:org, repo, workflow`, 토큰 Windows keyring 저장 |
| `vercel` (54.10) | `~\AppData\Roaming\npm\vercel.cmd` | scope `tylerlim0225-5527` |
| `git` | 시스템 git, identity `tylerlim0225 / tylerlim0225@users.noreply.github.com` |

세션 사이에 인증이 풀려있다면:
- `gh auth login --hostname github.com --git-protocol https --web -s repo,workflow`
- `vercel login` (디바이스 코드 → 브라우저 → 사용자가 Confirm)

---

## Common Gotchas

| 증상 | 원인 / 해결 |
|---|---|
| `Transition['ease']` does not exist | framer-motion 11에서 타입 제거됨. `[0.22, 1, 0.36, 1] as const`로 raw array 사용 |
| Leaflet marker 아이콘 깨짐 | `AtlasMap.tsx`에서 unpkg CDN 경로로 보정 중 — 건드리지 말 것 |
| 코드는 푸시했는데 사이트 안 바뀜 | `vercel --prod --yes` 안 돌렸음 (위 참조) |
| `gh.exe` 백그라운드 프로세스가 인증 못 잡음 | OAuth 완료 후 5초 대기 → `gh auth status`로 확인. 안 잡히면 `gh auth login` 재실행 |
| Korean text broken in PowerShell script | UTF-8 BOM 필요. `[System.Text.UTF8Encoding]::new($true)`로 ReadAllText 사용 |
| Excel COM 시도 금지 | 이전 세션에서 `0x800AC472`로 실패. ImportExcel/openpyxl 등 사용 |

---

## Design Reference

영감: https://mont-fort.com/ (시네마틱 스크롤 스토리텔링, glassmorphism, 시네마틱 입장)
**직접 베끼지 말고 느낌만 차용.** 이 사이트의 톤: cinematic, editorial, warm, intimate, premium. SaaS 대시보드 느낌 / 부킹 사이트 느낌 / 시끄러운 컬러 피할 것.

---

## When User Asks for Changes

- 콘텐츠 변경 (장소 추가, 비밀번호, 일지) → `lib/data.ts` 한 곳만 수정 → push → `vercel --prod --yes`
- 디자인 변경 → 해당 `components/*.tsx` 수정 → 빌드 확인 → 배포
- 새 섹션 추가 → 컴포넌트 작성 → `page.tsx`에 추가 → `FloatingNav.tsx`의 `items` 배열에 id/label 추가
- 사진 추가 → `public/images/` 폴더 만들고 `next/image` 사용. `Place`에 `photoUrl` 필드 추가 후 컴포넌트에서 표시

**항상 빌드 통과 + 라이브 URL이 200을 반환하는지 확인 후 완료 보고.**

---

## What Not To Do

- ❌ Google Maps API, Mapbox 유료 티어, 유료 폰트 추가
- ❌ Vault를 "실제 인증"으로 업그레이드 (사용자 명시 동의 없이)
- ❌ DB나 백엔드 도입 (사용자 명시 동의 없이)
- ❌ 사용자 동의 없이 `winget`으로 시스템 도구 추가 설치
- ❌ `.gitignore`에 있는 `.vercel/`을 커밋하기
- ❌ `package-lock.json` 무시하기 (재현성 위해 커밋됨)
