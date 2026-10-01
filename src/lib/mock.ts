import type { Category, FeedItem, Post, User } from "./types";

export const CATEGORIES: Category[] = ["공지", "자유", "질문", "정보"];

export const me: User = { id: "u1", name: "나", avatar: "😎" };
const friend: User = { id: "u2", name: "친구", avatar: "🐻" };
const guest: User = { id: "u3", name: "지나가던사람", avatar: "🐱" };

const ago = (minutes: number) =>
  new Date(Date.now() - minutes * 60_000).toISOString();

export const posts: Post[] = [
  {
    id: "1",
    category: "공지",
    title: "커뮤니티에 오신 걸 환영해요 👋",
    content:
      "아직 만드는 중이라 부족한 점이 많아요.\n불편한 점이나 바라는 기능은 자유게시판에 남겨주세요!",
    author: me,
    createdAt: ago(60 * 24),
    views: 120,
    likes: 8,
    comments: [
      { id: "c1", author: friend, content: "오픈 축하해!", createdAt: ago(60 * 20) },
    ],
  },
  {
    id: "2",
    category: "자유",
    title: "오늘 점심 뭐 먹었어요?",
    content: "저는 김치찌개 먹었어요. 여러분은요?",
    author: friend,
    createdAt: ago(45),
    views: 34,
    likes: 3,
    comments: [
      { id: "c2", author: guest, content: "저는 라면이요 🍜", createdAt: ago(30) },
      { id: "c3", author: me, content: "돈까스!", createdAt: ago(12) },
    ],
  },
  {
    id: "3",
    category: "질문",
    title: "모바일에서 글쓰기 버튼이 안 보여요",
    content: "스크롤하면 사라지는 것 같은데 저만 그런가요?",
    author: guest,
    createdAt: ago(180),
    views: 51,
    likes: 1,
    comments: [],
  },
  {
    id: "4",
    category: "정보",
    title: "주말에 가볼 만한 곳 모음",
    content: "근처 공원, 전시회, 맛집 정리했어요. 댓글로 더 추가해 주세요.",
    author: friend,
    createdAt: ago(60 * 5),
    views: 88,
    likes: 12,
    comments: [],
  },
];

export const feed: FeedItem[] = [
  {
    id: "f1",
    author: friend,
    content: "퇴근길 하늘이 너무 예뻐서 🌇",
    images: ["#ffb4a2", "#e5989b"],
    createdAt: ago(20),
    likes: 14,
    commentCount: 3,
  },
  {
    id: "f2",
    author: me,
    content: "사이트 만드는 중. 드디어 화면이 나온다!",
    images: ["#a2d2ff"],
    createdAt: ago(90),
    likes: 9,
    commentCount: 2,
  },
  {
    id: "f3",
    author: guest,
    content: "사진 없이 글만 올려도 되나요?",
    images: [],
    createdAt: ago(60 * 6),
    likes: 2,
    commentCount: 1,
  },
];

export function getPost(id: string) {
  return posts.find((p) => p.id === id);
}

export function timeAgo(iso: string) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  if (m < 1) return "방금 전";
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  return `${Math.floor(h / 24)}일 전`;
}
