# 2025 인천대학교 웹프로그래밍 프로젝트 과제

## 디렉토리 구조

```
coin_project/
├── client/                # React 프론트엔드
│   ├── src/
│   │   ├── api/           # API 호출 함수 (coingecko.js, perplexity.js 등)
│   │   ├── components/    # 재사용 컴포넌트 (CoinTable, CoinLargeChart, AISummary 등)
│   │   ├── pages/         # 페이지 컴포넌트 (Home, Favorites, CoinDetailPage 등)
│   │   └── store/         # zustand 전역 상태 (useCryptoStore.js)
│   ├── public/
│   └── package.json
├── nginx/                 # (선택) Nginx 설정
├── .github/               # Github Actions 등 워크플로우
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── README.md
└── vercel.json            # (선택) Vercel 배포 설정
```

### 1. React (Vite 기반) 프론트엔드

- Vite로 개발/빌드, React로 구성

### 2. Vercel Serverless Functions (서버리스 백엔드)

- CoinGecko/Perplexity 등 외부 API와 프론트엔드 사이의 프록시 역할

```
[사용자 브라우저]
        │
        ▼
[React (Vite) 프론트엔드]
        │  (API 요청)
        ▼
[Vercel Serverless Functions (api/coins 등)]
        │  (외부 API 호출)
        ▼
[CoinGecko, Perplexity 등 외부 API]

```

### 3. Nginx

- 정적 파일(React build 결과물)을 서빙

### 4. Docker

- 개발·배포 환경을 컨테이너화

프론트엔드는 React/Vite로 개발, 빌드 후 정적 파일로 배포

API 요청은 /api/coins 등으로 서버리스 함수에 전달

서버리스 함수는 외부 API와 통신, 필요한 데이터만 프론트로 반환

Nginx/Docker는 선택적으로 정적 파일 서빙 또는 로컬 개발환경에 사용

Vercel이 전체 프로젝트를 자동으로 배포 및 관리

---

### 실행 명령어

```
docker-compose up -d --build
```
