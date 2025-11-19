"use client";

import { Post } from '@/lib/types';
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { AnalyticsSection } from './analytics-section';
import { useState } from 'react';
import { Button } from './ui/button';

type HomeTabProps = {
  posts: Post[];
};

export function HomeTab({ posts }: HomeTabProps) {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const continuousDays = posts.length;
  
  const getMessage = (days: number) => {
    if (days === 0) return '今日から始めましょう！';
    if (days < 7) return 'いいスタートです！';
    if (days < 30) return '素晴らしい！継続できていますね';
    if (days < 100) return 'すごい！習慣化できています';
    return '驚異的な継続力です！';
  };

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

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* ヘッダー */}
      <div className="p-6 border-b flex-shrink-0">
        <h1 className="text-xl">ホーム</h1>
      </div>

      {/* スクロール可能なコンテンツエリア */}
      <div className="flex-1 overflow-y-auto">
        {/* 継続記録セクション */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
          <Card className="p-6 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg text-blue-900">継続記録</h2>
            </div>
            <div className="text-center mb-4">
              <div className="flex items-end justify-center gap-2">
                <span className="text-6xl text-blue-600">{continuousDays}</span>
                <span className="text-2xl text-gray-600 mb-2">日</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-purple-700">
              <TrendingUp className="w-4 h-4" />
              <p className="text-center">{getMessage(continuousDays)}</p>
            </div>
          </Card>
        </div>

        {/* 分析・投稿記録の切り替え */}
        <div className="px-6 py-3 flex gap-2 border-b bg-white sticky top-0 z-10">
          <Button
            variant={!showAnalytics ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowAnalytics(false)}
            className="flex-1"
          >
            投稿記録
          </Button>
          <Button
            variant={showAnalytics ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowAnalytics(true)}
            className="flex-1"
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            分析
          </Button>
        </div>

        {/* コンテンツエリア */}
        <div className="px-6 py-4">
          {!showAnalytics ? (
            // 投稿記録
            <div className="space-y-3 pb-6">
              {posts.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  まだ投稿がありません
                </div>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="p-4 hover:shadow-md transition-shadow">
                    <p className="text-gray-800 mb-2">{post.content}</p>
                    <p className="text-sm text-gray-400">{formatDate(post.timestamp)}</p>
                  </Card>
                ))
              )}
            </div>
          ) : (
            // 分析
            <div className="pb-6">
              <AnalyticsSection posts={posts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
