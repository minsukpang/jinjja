import Link from "next/link";
import type { Post } from "@/lib/types";
import { timeAgo } from "@/lib/mock";

export default function PostItem({ post }: { post: Post }) {
  return (
    <Link href={`/board/${post.id}`} className="list-item">
      <div className="list-title">
        <span className="badge">{post.category}</span>
        {post.title}
      </div>
      <div className="meta">
        <span>{post.author.name}</span>
        <span>{timeAgo(post.createdAt)}</span>
        <span>조회 {post.views}</span>
        <span>♥ {post.likes}</span>
        <span>💬 {post.comments.length}</span>
      </div>
    </Link>
  );
}
