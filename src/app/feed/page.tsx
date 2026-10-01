"use client";

import { useState } from "react";
import Header from "@/components/Header";
import WriteButton from "@/components/WriteButton";
import { feed, timeAgo } from "@/lib/mock";
import type { FeedItem } from "@/lib/types";

function FeedCard({ item }: { item: FeedItem }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="feed-card">
      <div className="feed-head">
        <div className="avatar">{item.author.avatar}</div>
        <div>
          <b>{item.author.name}</b>
          <div className="meta" style={{ marginTop: 0 }}>
            {timeAgo(item.createdAt)}
          </div>
        </div>
      </div>
      {item.images.length > 0 && (
        <div className="feed-images">
          {item.images.map((color, i) => (
            <div key={i} className="feed-image" style={{ background: color }} />
          ))}
        </div>
      )}
      <p className="feed-text">{item.content}</p>
      <div className="actions">
        <button
          className={liked ? "on" : ""}
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
        >
          {liked ? "♥" : "♡"} {item.likes + (liked ? 1 : 0)}
        </button>
        <button>💬 {item.commentCount}</button>
      </div>
    </article>
  );
}

export default function FeedPage() {
  return (
    <>
      <Header title="피드" />
      {feed.map((item) => (
        <FeedCard key={item.id} item={item} />
      ))}
      <WriteButton />
    </>
  );
}
