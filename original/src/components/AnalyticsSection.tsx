import { Post } from '../App';
import { Clock, Heart, Tag, Sparkles, Star, Smile, Users, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

type AnalyticsSectionProps = {
  posts: Post[];
};

export function AnalyticsSection({ posts }: AnalyticsSectionProps) {
  // 時間帯別分析
  const getTimeSlot = (date: Date) => {
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) return '朝 (5-12時)';
    if (hour >= 12 && hour < 17) return '昼 (12-17時)';
    if (hour >= 17 && hour < 21) return '夕方 (17-21時)';
    return '夜 (21-5時)';
  };

  const timeSlots = posts.reduce((acc, post) => {
    const slot = getTimeSlot(post.timestamp);
    acc[slot] = (acc[slot] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxTimeCount = Math.max(...Object.values(timeSlots), 1);
  const mostActiveTime = Object.entries(timeSlots).sort((a, b) => b[1] - a[1])[0];

  // 感謝の対象別分析
  const targetCounts = posts.reduce((acc, post) => {
    if (post.target) {
      acc[post.target] = (acc[post.target] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const maxTargetCount = Math.max(...Object.values(targetCounts), 1);
  const mostTarget = Object.entries(targetCounts).sort((a, b) => b[1] - a[1])[0];

  // カテゴリー別分析
  const categoryCounts = posts.reduce((acc, post) => {
    if (post.category) {
      acc[post.category] = (acc[post.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const maxCategoryCount = Math.max(...Object.values(categoryCounts), 1);
  const mostCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

  // 感謝の影響を計算
  const getImpacts = () => {
    const totalPosts = posts.length;
    const impacts: Array<{ icon: React.ReactNode; text: string; color: string }> = [];

    // 投稿数による基本的な影響
    if (totalPosts >= 1) {
      impacts.push({
        icon: <Smile className="w-4 h-4" />,
        text: '幸福感が高まりました',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300'
      });
    }
    
    if (totalPosts >= 3) {
      impacts.push({
        icon: <TrendingUp className="w-4 h-4" />,
        text: 'ポジティブ思考が向上しました',
        color: 'bg-green-100 text-green-800 border-green-300'
      });
    }

    if (totalPosts >= 7) {
      impacts.push({
        icon: <Star className="w-4 h-4" />,
        text: '自己肯定感が向上しました',
        color: 'bg-orange-100 text-orange-800 border-orange-300'
      });
    }

    if (totalPosts >= 14) {
      impacts.push({
        icon: <Heart className="w-4 h-4" />,
        text: 'ストレスが軽減されました',
        color: 'bg-pink-100 text-pink-800 border-pink-300'
      });
    }

    if (totalPosts >= 21) {
      impacts.push({
        icon: <Sparkles className="w-4 h-4" />,
        text: '人生の満足度が向上しました',
        color: 'bg-purple-100 text-purple-800 border-purple-300'
      });
    }

    // 対象による影響
    const familyCount = targetCounts['家族'] || 0;
    const friendCount = targetCounts['友人'] || 0;
    const coworkerCount = targetCounts['同僚'] || 0;
    const selfCount = targetCounts['自分'] || 0;

    if (familyCount >= 3) {
      impacts.push({
        icon: <Users className="w-4 h-4" />,
        text: '家族との絆が深まりました',
        color: 'bg-blue-100 text-blue-800 border-blue-300'
      });
    }

    if (friendCount >= 3) {
      impacts.push({
        icon: <Users className="w-4 h-4" />,
        text: '友人関係が良好になりました',
        color: 'bg-cyan-100 text-cyan-800 border-cyan-300'
      });
    }

    if (coworkerCount >= 3) {
      impacts.push({
        icon: <Users className="w-4 h-4" />,
        text: '職場の人間関係が改善されました',
        color: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      });
    }

    if (selfCount >= 5) {
      impacts.push({
        icon: <Heart className="w-4 h-4" />,
        text: 'セルフコンパッションが高まりました',
        color: 'bg-rose-100 text-rose-800 border-rose-300'
      });
    }

    // カテゴリーによる影響
    const supportCount = categoryCounts['サポート'] || 0;
    const encouragementCount = categoryCounts['励まし'] || 0;
    const growthCount = categoryCounts['成長'] || 0;

    if (supportCount >= 3) {
      impacts.push({
        icon: <Heart className="w-4 h-4" />,
        text: '周囲のストレスを減らしました',
        color: 'bg-teal-100 text-teal-800 border-teal-300'
      });
    }

    if (encouragementCount >= 3) {
      impacts.push({
        icon: <Sparkles className="w-4 h-4" />,
        text: '相手のモチベーションが向上しました',
        color: 'bg-amber-100 text-amber-800 border-amber-300'
      });
    }

    if (growthCount >= 5) {
      impacts.push({
        icon: <TrendingUp className="w-4 h-4" />,
        text: '個人的成長が加速しました',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      });
    }

    return impacts;
  };

  const impacts = getImpacts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400 text-sm">
        投稿を追加すると分析が表示されます
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 感謝がもたらす影響 */}
      <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm text-amber-900">感謝がもたらす影響</h3>
        </div>
        <div className="space-y-2">
          {impacts.map((impact, index) => (
            <Badge
              key={index}
              variant="outline"
              className={`w-full justify-start py-2 px-3 ${impact.color}`}
            >
              <span className="mr-2">{impact.icon}</span>
              <span className="text-sm">{impact.text}</span>
            </Badge>
          ))}
          {impacts.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-2">
              もっと感謝を記録すると、影響が表示されます
            </p>
          )}
        </div>
      </Card>

      {/* 投稿の多い時間帯 */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm text-blue-900">感謝が多い時間帯</h3>
        </div>
        {mostActiveTime && (
          <div className="mb-3">
            <Badge className="bg-blue-600 text-white">
              {mostActiveTime[0]} - {mostActiveTime[1]}回
            </Badge>
          </div>
        )}
        <div className="space-y-2">
          {['朝 (5-12時)', '昼 (12-17時)', '夕方 (17-21時)', '夜 (21-5時)'].map((slot) => (
            <div key={slot}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>{slot}</span>
                <span>{timeSlots[slot] || 0}回</span>
              </div>
              <Progress
                value={((timeSlots[slot] || 0) / maxTimeCount) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* 感謝の対象 */}
      <Card className="p-4 bg-pink-50 border-pink-200">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-pink-600" />
          <h3 className="text-sm text-pink-900">感謝の対象</h3>
        </div>
        {mostTarget && (
          <div className="mb-3">
            <Badge className="bg-pink-600 text-white">
              {mostTarget[0]} - {mostTarget[1]}回
            </Badge>
          </div>
        )}
        <div className="space-y-2">
          {['家族', '友人', '同僚', '自分', 'その他'].map((target) => (
            <div key={target}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>{target}</span>
                <span>{targetCounts[target] || 0}回</span>
              </div>
              <Progress
                value={((targetCounts[target] || 0) / maxTargetCount) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* カテゴリー分析 */}
      <Card className="p-4 bg-purple-50 border-purple-200">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm text-purple-900">感謝のカテゴリー</h3>
        </div>
        {mostCategory && (
          <div className="mb-3">
            <Badge className="bg-purple-600 text-white">
              {mostCategory[0]} - {mostCategory[1]}回
            </Badge>
          </div>
        )}
        <div className="space-y-2">
          {['サポート', '励まし', '協力', '成長', '日常', 'その他'].map((category) => (
            <div key={category}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>{category}</span>
                <span>{categoryCounts[category] || 0}回</span>
              </div>
              <Progress
                value={((categoryCounts[category] || 0) / maxCategoryCount) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}