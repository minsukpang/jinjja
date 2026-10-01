"use client";

import { useState } from "react";
import Header from "@/components/Header";
import PostItem from "@/components/PostItem";
import WriteButton from "@/components/WriteButton";
import { CATEGORIES, posts } from "@/lib/mock";
import type { Category } from "@/lib/types";

export default function BoardPage() {
  const [selected, setSelected] = useState<Category | "전체">("전체");
  const filtered =
    selected === "전체" ? posts : posts.filter((p) => p.category === selected);

  return (
    <>
      <Header title="게시판" />
      <div className="chips" role="tablist">
        {(["전체", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={selected === c}
            className={`chip${selected === c ? " active" : ""}`}
            onClick={() => setSelected(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="list">
        {filtered.length === 0 ? (
          <p className="empty">아직 글이 없어요</p>
        ) : (
          filtered.map((p) => <PostItem key={p.id} post={p} />)
        )}
      </div>
      <WriteButton />
    </>
  );
}
