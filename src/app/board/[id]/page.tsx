import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getPost, timeAgo } from "@/lib/mock";

export default async function PostDetailPage(props: PageProps<"/board/[id]">) {
  const { id } = await props.params;
  const post = getPost(id);
  if (!post) notFound();

  return (
    <>
      <Header title={post.category} back="/board" />
      <article className="detail">
        <span className="badge">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="meta">
          <span>
            {post.author.avatar} {post.author.name}
          </span>
          <span>{timeAgo(post.createdAt)}</span>
          <span>조회 {post.views}</span>
        </div>
        <p className="detail-body">{post.content}</p>
      </article>
      <h2 className="section-title" style={{ padding: "16px 16px 0" }}>
        댓글 {post.comments.length}
      </h2>
      {post.comments.length === 0 ? (
        <p className="empty">첫 댓글을 남겨보세요</p>
      ) : (
        post.comments.map((c) => (
          <div key={c.id} className="comment">
            <b>
              {c.author.avatar} {c.author.name}
            </b>{" "}
            <span className="meta" style={{ display: "inline" }}>
              {timeAgo(c.createdAt)}
            </span>
            <p>{c.content}</p>
          </div>
        ))
      )}
    </>
  );
}
