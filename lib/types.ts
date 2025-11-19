export type Post = {
  id: string;
  content: string;
  timestamp: Date;
  author?: string;
  target?: '家族' | '友人' | '同僚' | '自分' | 'その他';
  category?: 'サポート' | '励まし' | '協力' | '成長' | '日常' | 'その他';
};

export type User = {
  name: string;
  email: string;
  avatar: string;
};
