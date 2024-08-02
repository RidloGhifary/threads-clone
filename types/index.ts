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
  likes: LikesProps[];
  created_at: Date | string;
  updated_at: Date | string;
  _count: { likes: number; comments: number; replies: number };
}

export interface LikesProps {
  id: string;
  user_id: string;
  post_id: string;
}

export interface UserSessionProps {
  name: string;
  email: string;
  image: string | null;
  id: string;
}
