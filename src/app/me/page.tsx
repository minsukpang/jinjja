import Link from "next/link";
import Header from "@/components/Header";
import { me } from "@/lib/mock";

export default function MePage() {
  return (
    <>
      <Header title="내 정보" />
      <div className="profile">
        <div className="avatar">{me.avatar}</div>
        <div>
          <b>{me.name}</b>
          <div className="meta">로그인 기능은 준비 중이에요</div>
        </div>
      </div>
      <nav className="menu" style={{ marginTop: 8 }}>
        <Link href="/board">내가 쓴 글</Link>
        <Link href="/feed">내 피드</Link>
        <Link href="/write">글쓰기</Link>
      </nav>
    </>
  );
}
