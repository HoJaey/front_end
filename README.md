# HoJaey — 주식 뉴스 감성분석 대시보드

주식 관련 뉴스를 실시간으로 감성 분석하여 호재·악재 신호를 시각화하는 투자 보조 대시보드입니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 빌드 도구 | Vite 8 |
| 스타일 | 인라인 스타일 (Tailwind CSS v4 포함) |
| 상태 관리 | React useState (내장) |
| 차트 | 커스텀 SVG |
| 배포 | Docker + Nginx |

## 주요 기능

- **대시보드** — 호재·악재 뉴스 통계, Top5 랭킹, 시장 히트맵 미리보기
- **랭킹** — 전 종목 감성 점수 순위 (호재/악재 2열)
- **히트맵** — 감성 강도 시각화 (빨강/파랑 타일)
- **종목 상세** — 14일 감성 점수 차트, 관련 뉴스 타임라인
- **관심종목** — 종목 추가/삭제, 알림 토글
- **AI 챗봇** — 키워드 기반 감성 분석 응답
- **다크 모드** — 전체 페이지 지원

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## Docker 실행

### 프로덕션 (포트 80)

```bash
docker compose up -d
```

빌드 후 `http://localhost` 에서 확인합니다.

### 개발 환경 (핫 리로드, 포트 5173)

```bash
docker compose -f docker-compose.dev.yml up
```

소스 파일을 수정하면 자동으로 반영됩니다.

### 이미지 단독 빌드 및 실행

```bash
docker build -t hojaey-frontend .
docker run -p 80:80 hojaey-frontend
```

## 브랜치 전략

| 브랜치 | 용도 |
|--------|------|
| `main` | 프로젝트 초기 설정 (스캐폴딩) |
| `develop` | 기능 개발 및 배포 설정 |

## 프로젝트 구조

```
src/
├── App.jsx               # 페이지 라우팅
├── index.css             # 전역 스타일
├── main.jsx              # 진입점
├── components/
│   ├── Sidebar.jsx       # 사이드바 네비게이션
│   └── Toggle.jsx        # 토글 스위치
├── data/
│   └── mockData.js       # 목업 데이터
└── pages/
    ├── Dashboard.jsx
    ├── Ranking.jsx
    ├── Heatmap.jsx
    ├── Search.jsx
    ├── Watchlist.jsx
    ├── StockDetail.jsx
    ├── Chatbot.jsx
    ├── Profile.jsx
    ├── Settings.jsx
    ├── Login.jsx
    └── Register.jsx
```
