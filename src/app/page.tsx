import Link from "next/link";
import Header from "@/components/Header";
import PostItem from "@/components/PostItem";
import WriteButton from "@/components/WriteButton";
import { posts } from "@/lib/mock";

export default function Home() {
  const notice = posts.find((p) => p.category === "공지");
  const normal = posts.filter((p) => p.category !== "공지");
  const popular = [...normal].sort((a, b) => b.likes - a.likes).slice(0, 2);
  const popularIds = new Set(popular.map((p) => p.id));
  const latest = normal.filter((p) => !popularIds.has(p.id)).sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
  );

  return (
    <>
      <Header title="우리 커뮤니티" />
      {notice && (
        <section className="section">
          <Link href={`/board/${notice.id}`} className="card list-item">
            <span className="badge">공지</span>
            {notice.title}
          </Link>
        </section>
      )}
      <section className="section" style={{ paddingTop: 0 }}>
        <h2 className="section-title">🔥 인기글</h2>
        <div className="list card" style={{ overflow: "hidden" }}>
          {popular.map((p) => (
            <PostItem key={p.id} post={p} />
          ))}
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <h2 className="section-title">🆕 최신글</h2>
        <div className="list card" style={{ overflow: "hidden" }}>
          {latest.map((p) => (
            <PostItem key={p.id} post={p} />
          ))}
        </div>
      </section>
      <WriteButton />
    </>
  );
}
