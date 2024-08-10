export type ErrorWithMessage = {
  status: number;
  data: {
    msg: string;
  };
};

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  img?: string;
  subscribers?: number;
  subscribedUsers?: string[];
  fromGoogle?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: boolean;
}

export interface Video {
  _id: string;
  userId: string;
  title: string;
  desc: string;
  imgUrl: string;
  videoUrl: string;
  views?: number;
  tags?: string[];
  likes?: string[];
  dislikes?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VideoState {
  currentVideo: Video | null;
  loading: boolean;
  error: boolean;
}

export interface UserChannel {
  _id: string;
  img?: string;
  name?: string;
  subscribers?: number;
}

export interface UserComment {
  _id: string;
  userId: string;
  videoId: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
}
