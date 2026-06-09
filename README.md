# 우리의 여행 · Our Journey

커플(또는 누구든) 두 사람을 위한 정적 여행 기록 웹사이트입니다.
무료로 호스팅 · 누구나 링크로 접속 · 로그인 없음 · DB 없음.

- **Next.js 14 (App Router)** + TypeScript
- **Tailwind CSS** 스타일
- **Leaflet + OpenStreetMap** 무료 지도 타일 (Google Maps API 미사용)
- **Vercel Hobby Plan**(무료) 배포 전용
- `.vercel.app` 자동 발급 URL — 도메인 구매 불필요

페이지 구성:

| 경로 | 내용 |
|---|---|
| `/` | 홈 — 히어로, KPI, 최근 여행/기록 |
| `/travels` | 여행지도 (Leaflet/OSM) + 여행 목록 |
| `/notes` | 자잘한 기록 타임라인 |
| `/vault` | 비밀 금고 — **재미용 비밀번호** (실제 보안 아님) |

데이터는 모두 [`lib/data.ts`](lib/data.ts) 한 파일에서 관리됩니다. 새 여행/기록/비밀 항목을 추가하려면 이 파일만 수정하면 됩니다.

---

## 🚀 무료 배포 가이드 (Vercel Hobby)

전체 비용 ₩0. 신용카드·결제정보 입력 없이 완료됩니다.

### 사전 준비 (한 번만)

- [ ] [GitHub 계정](https://github.com/signup) 무료 가입
- [ ] [Git](https://git-scm.com/downloads) 설치 (이미 있으면 스킵)
- [ ] [Vercel 계정](https://vercel.com/signup) — **"Continue with GitHub"** 로 가입 (별도 비밀번호 없음)
- [ ] 로컬에 Node.js 18+ 설치 (선택 — 빌드는 Vercel이 클라우드에서 함)

### 1. 코드를 GitHub에 푸시

PowerShell 또는 Git Bash에서 이 폴더(`our-journey`)에 들어와서:

```bash
git init
git add .
git commit -m "Initial commit: 우리의 여행 site"
git branch -M main
```

GitHub에서 **새 저장소(repository)** 생성 → 이름 예: `our-journey` → **Public** 선택 → "Create repository".
저장소 만들면 안내 페이지에 URL이 나옵니다. 그걸 복사해서:

```bash
git remote add origin https://github.com/<your-username>/our-journey.git
git push -u origin main
```

> 💡 GitHub에서 첫 푸시 때 비밀번호 입력창이 나오면, GitHub은 **Personal Access Token**을 요구합니다. Settings → Developer settings → Personal access tokens → Tokens (classic) → `repo` 권한으로 토큰 발급해서 비밀번호 대신 붙여넣으면 됩니다.

### 2. Vercel에 저장소 임포트

1. [vercel.com/new](https://vercel.com/new) 접속 (GitHub로 로그인)
2. 좌측 "Import Git Repository" 목록에서 방금 만든 `our-journey` 옆 **Import** 클릭
   - 처음이면 "Install Vercel on GitHub" 안내가 뜸 → 권한 부여 → 저장소 다시 선택
3. **Framework Preset**은 자동으로 "Next.js" 감지됨 — 그대로 두기
4. **Root Directory**, **Build Command**, **Output Directory** 전부 기본값 그대로
5. **Environment Variables** — 추가할 것 없음 (DB · API 키 없음)

### 3. Hobby 플랜으로 배포

- 화면 우하단 **Deploy** 클릭
- "What plan do you want to use?" 가 뜨면 **Hobby (Free)** 선택
  - Hobby 플랜은 신용카드 등록 없이 바로 사용 가능
- 빌드 진행 (~1~2분) → "🎉 Congratulations!" 화면

### 4. 공개 `.vercel.app` URL 받기

배포 성공 화면 또는 프로젝트 대시보드에 다음과 같은 URL이 발급됩니다:

```
https://<your-project>.vercel.app
https://<your-project>-<random>-<username>.vercel.app
```

대시보드 → **Project Settings → Domains** 에서도 확인 가능합니다.

### 5. URL 공유

위 URL을 누구에게나 **카톡/문자/메일/QR**로 공유하면 됩니다. 로그인 없이 바로 접속.

### 6. 로그인 없이 공개 상태 유지

이 프로젝트는 기본 설정에서 누구나 볼 수 있도록 되어있습니다.
**아무것도 안 하면** 공개 상태가 유지됩니다. 추가로 신경 쓸 것 없음.

- Vercel 대시보드의 "Deployment Protection" 옵션은 **Off** 그대로 두면 됩니다.
- Vercel "Password Protection" 기능은 Pro 플랜 유료 기능이므로, Hobby에서는 켜고 싶어도 안 켜집니다 — 그래서 더 안전하게 무료 상태 유지.

### 7. 결제 정보 / 유료 서비스 회피 방법

- ✅ Vercel: **Hobby** 플랜 그대로 사용 (카드 정보 없음)
- ✅ 지도: **OpenStreetMap** 타일 직접 호출 (API 키 없음, 무료)
- ✅ 폰트: **Pretendard** CDN (jsDelivr, 무료)
- ✅ 도메인: `.vercel.app` 자동 발급 사용 (구매 X)
- ✅ DB: 없음 — 모든 데이터는 `lib/data.ts`에 정적 텍스트로 들어있음
- ✅ 인증: 없음 — `vault` 비밀번호도 프론트엔드 체크라 서버/API 불필요
- ❌ 절대 하지 말 것: Vercel Pro 업그레이드, 도메인 구매, "Add Payment Method", Google Maps Platform 가입

### 8. 무료 플랜의 한계

| 항목 | Hobby (무료) 제한 | 이 사이트에서 의미 |
|---|---|---|
| 대역폭 | 월 100GB | 개인 사용으로는 거의 안 닿음 |
| 빌드 시간 | 월 6,000분 | 한 번 빌드 30초 — 충분 |
| 서버리스 함수 호출 | 월 100,000 | 이 사이트는 정적이라 거의 0 |
| 팀 멤버 | 1명 | 본인만 배포 권한, 사이트는 공개 가능 |
| 커스텀 도메인 SSL | 무료 (단, 도메인은 따로 구매 필요) | 그냥 `.vercel.app` 사용하면 무관 |
| OSM 타일 | 자체 정책: 과도한 트래픽 금지 | 개인 사이트 수준은 문제 없음 |
| Vault 비밀번호 | **클라이언트에서 검증 → 누구나 source 보기로 답 확인 가능** | "재미용 자물쇠"라고 표기, 실제 보안 X |
| 로컬 저장 | sessionStorage만 사용 (브라우저 닫으면 잠금 복귀) | 의도된 동작 |

---

## 🛠 로컬에서 미리보기 (선택)

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기.

## 📁 내용 수정

| 무엇을 | 어디에서 |
|---|---|
| 여행 추가/수정 | `lib/data.ts` → `trips` 배열 |
| 기록 추가/수정 | `lib/data.ts` → `notes` 배열 |
| 비밀 항목 / 비밀번호 변경 | `lib/data.ts` → `vaultEntries`, `VAULT_PASSWORD` |
| 컬러 / 폰트 | `tailwind.config.ts`, `app/globals.css` |
| 네비게이션 항목 | `components/Nav.tsx` |

수정 후 `git add . && git commit -m "..." && git push` 하면 Vercel이 자동으로 새 버전 배포합니다.

---

made with 💗
