import { Post } from '../App';
import { Users } from 'lucide-react';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';

type FeedTabProps = {
  posts: Post[];
};

export function FeedTab({ posts }: FeedTabProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}分前`;
    if (hours < 24) return `${hours}時間前`;
    return `${days}日前`;
  };

  const getAvatarColor = (author: string) => {
    const colors = [
      'bg-red-400',
      'bg-blue-400',
      'bg-green-400',
      'bg-yellow-400',
      'bg-purple-400',
      'bg-pink-400',
    ];
    const index = author.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="h-full flex flex-col">
      {/* ヘッダー */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <h1 className="text-xl">みんなの投稿</h1>
        </div>
      </div>

      {/* 投稿一覧 */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4 pb-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-3">
                {/* アバター */}
                <Avatar className="w-10 h-10">
                  <AvatarFallback className={getAvatarColor(post.author || '')}>
                    {post.author?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>

                {/* 投稿内容 */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-900">{post.author || 'ユーザー'}</span>
                    <span className="text-sm text-gray-400">
                      {formatDate(post.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-800">{post.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
