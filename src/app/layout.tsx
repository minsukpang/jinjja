import type { Metadata, Viewport } from "next";
import "./globals.css";
import TabBar from "@/components/TabBar";

export const metadata: Metadata = {
  title: "우리 커뮤니티",
  description: "친구와 함께 만드는 모바일 커뮤니티",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <div className="app">{children}</div>
        <TabBar />
      </body>
    </html>
  );
}
