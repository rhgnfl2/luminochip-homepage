import "./globals.css";

export const metadata = {
  title: "루미노칩 | 반도체 정밀 가공 · 기업 홈페이지",
  description: "ESC 초미세홀, 사파이어·쿼츠·알루미나·SiC 가공 및 장비 호환 부품 제조. 루미노칩 기업 홈페이지.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "루미노칩",
    description: "반도체 정밀 가공 · 장비 호환 부품",
    url: "https://example.com",
    siteName: "루미노칩",
    type: "website",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
