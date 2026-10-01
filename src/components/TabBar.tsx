"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "홈", icon: "🏠" },
  { href: "/board", label: "게시판", icon: "📋" },
  { href: "/feed", label: "피드", icon: "📸" },
  { href: "/me", label: "내 정보", icon: "👤" },
];

export default function TabBar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="tabbar" aria-label="하단 메뉴">
      {TABS.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className={`tab${isActive(t.href) ? " active" : ""}`}
          aria-current={isActive(t.href) ? "page" : undefined}
        >
          <span className="icon">{t.icon}</span>
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
