import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "권수린의 포트폴리오",
  description: "계란판 컨셉으로 하루하루의 개발 기록을 남기는 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
