# 루미노칩 기업 홈페이지 (Next.js + Tailwind)

- Framework: Next.js 14 (App Router)
- Style: Tailwind CSS (다크 테마)
- 배포 대상: Vercel (Zero-config)

## 개발
```
npm install
npm run dev
```
http://localhost:3000

## 빌드/배포
```
npm run build
npm start
```
Vercel에 레포 연결 시 Build Command/OutputDirectory 자동 인식됩니다.

### 섹션 구성
회사소개 / 제품소개 / 물성표 / 거래처 / 인증서 / 견적문의 / 오시는 길

### 커스터마이즈
- 회사 정보: `app/page.jsx`의 COMPANY 객체
- 제품/물성/거래처: 상단 배열 수정
- 로고/파비콘: `public/logo.svg`, `public/favicon.svg`
- 지도 주소: `app/page.jsx`의 iframe 쿼리 수정
