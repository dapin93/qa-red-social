export interface User {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing?: boolean;
}

export interface Post {
  id: string;
  author: User;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export interface UploadFile {
  uri: string;
  fileName: string;
  fileSizeInBytes: number;
  type: 'image' | 'video';
}
