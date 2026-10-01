export type User = {
  id: string;
  name: string;
  avatar: string; // 이모지 (나중에 이미지 URL로 교체)
};

export type Category = "공지" | "자유" | "질문" | "정보";

export type Comment = {
  id: string;
  author: User;
  content: string;
  createdAt: string; // ISO
};

export type Post = {
  id: string;
  category: Category;
  title: string;
  content: string;
  author: User;
  createdAt: string; // ISO
  views: number;
  likes: number;
  comments: Comment[];
};

export type FeedItem = {
  id: string;
  author: User;
  content: string;
  images: string[]; // 색상(임시) 또는 이미지 URL
  createdAt: string; // ISO
  likes: number;
  commentCount: number;
};
