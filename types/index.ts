export interface UserFiltered {
  id: string;
  username: string;
  nickname: string;
  bio: string | null;
  profile_picture: string | null;
  _count: { followers: number };
}

export interface PostFiltered {
  id: string;
  content: string;
  is_edited: boolean;
  user_id: string;
  user: UserFiltered;
  created_at: Date | string;
  updated_at: Date | string;
  _count: { likes: number; comments: number; replies: number };
}
