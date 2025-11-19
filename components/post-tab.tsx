"use client";

import { useState } from 'react';
import { Send, Sparkles, Heart, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type PostTabProps = {
  onPost: (content: string, target: string, category: string) => void;
  onPostComplete?: () => void;
};

export function PostTab({ onPost, onPostComplete }: PostTabProps) {
  const [content, setContent] = useState('');
  const [target, setTarget] = useState('自分');
  const [category, setCategory] = useState('成長');
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = () => {
    if (content.trim()) {
      setIsPosting(true);
      // 投稿アニメーション
      setTimeout(() => {
        onPost(content, target, category);
        setContent('');
        setTarget('自分');
        setCategory('成長');
        setIsPosting(false);
        // 投稿完了後のコールバックを実行
        onPostComplete?.();
      }, 500);
    }
  };

  const suggestions = [
    '今日も頑張りました！',
    '継続は力なり',
    '小さな一歩を積み重ねています',
    '目標に向かって前進中',
  ];

  return (
    <div className="h-full flex flex-col">
      {/* ヘッダー */}
      <div className="p-6 border-b">
        <h1 className="text-xl">投稿する</h1>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-auto">
        {/* 投稿エリア */}
        <div>
          <Label htmlFor="content" className="block mb-2 text-gray-700">今日の記録</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今日の頑張りを記録しましょう..."
            className="min-h-[150px] resize-none"
            disabled={isPosting}
          />
          <div className="mt-2 text-right text-sm text-gray-400">
            {content.length} / 280
          </div>
        </div>

        {/* 感謝の対象 */}
        <div>
          <Label className="flex items-center gap-2 mb-2 text-gray-700">
            <Heart className="w-4 h-4 text-pink-500" />
            感謝の対象
          </Label>
          <Select value={target} onValueChange={setTarget} disabled={isPosting}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="家族">家族</SelectItem>
              <SelectItem value="友人">友人</SelectItem>
              <SelectItem value="同僚">同僚</SelectItem>
              <SelectItem value="自分">自分</SelectItem>
              <SelectItem value="その他">その他</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* カテゴリー */}
        <div>
          <Label className="flex items-center gap-2 mb-2 text-gray-700">
            <Tag className="w-4 h-4 text-blue-500" />
            カテゴリー
          </Label>
          <Select value={category} onValueChange={setCategory} disabled={isPosting}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="サポート">サポート</SelectItem>
              <SelectItem value="励まし">励まし</SelectItem>
              <SelectItem value="協力">協力</SelectItem>
              <SelectItem value="成長">成長</SelectItem>
              <SelectItem value="日常">日常</SelectItem>
              <SelectItem value="その他">その他</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 投稿ボタン */}
        <Button
          onClick={handlePost}
          disabled={!content.trim() || isPosting}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600"
          size="lg"
        >
          {isPosting ? (
            <>投稿中...</>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              投稿する
            </>
          )}
        </Button>

        {/* サジェスチョン */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <h3 className="text-sm text-gray-600">投稿のヒント</h3>
          </div>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <Card
                key={index}
                className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setContent(suggestion)}
              >
                <p className="text-sm text-gray-700">{suggestion}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
