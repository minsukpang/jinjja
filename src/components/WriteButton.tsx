import Link from "next/link";

export default function WriteButton() {
  return (
    <Link href="/write" className="fab" aria-label="글쓰기">
      ＋
    </Link>
  );
}
