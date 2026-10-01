"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { CATEGORIES } from "@/lib/mock";
import type { Category } from "@/lib/types";

type Mode = "board" | "feed";

export default function WritePage() {
  const [mode, setMode] = useState<Mode>("board");
  const [category, setCategory] = useState<Category>("자유");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const canSubmit =
    content.trim().length > 0 && (mode === "feed" || title.trim().length > 0);

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const urls = Array.from(e.target.files ?? []).map((f) =>
      URL.createObjectURL(f),
    );
    setPreview(urls);
  }

  return (
    <>
      <Header title="글쓰기" back="/" />
      <div className="chips">
        <button
          className={`chip${mode === "board" ? " active" : ""}`}
          onClick={() => setMode("board")}
        >
          게시글
        </button>
        <button
          className={`chip${mode === "feed" ? " active" : ""}`}
          onClick={() => setMode("feed")}
        >
          피드
        </button>
      </div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: 서버 연결 후 실제 저장
          setDone(true);
        }}
      >
        {mode === "board" && (
          <>
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              className="input"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </>
        )}
        <textarea
          className="textarea"
          placeholder={mode === "feed" ? "무슨 일이 있었나요?" : "내용을 입력하세요"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {mode === "feed" && (
          <>
            <input type="file" accept="image/*" multiple onChange={onFiles} />
            <div className="feed-images" style={{ gap: 8 }}>
              {preview.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt="미리보기"
                  style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 8 }}
                />
              ))}
            </div>
          </>
        )}
        <button className="btn" disabled={!canSubmit}>
          올리기
        </button>
        {done && (
          <p className="meta">
            아직 서버가 없어서 저장되지는 않아요. 화면만 확인하는 단계예요.
          </p>
        )}
      </form>
    </>
  );
}
