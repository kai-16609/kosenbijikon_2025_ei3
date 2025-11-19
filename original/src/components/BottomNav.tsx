import { Home, PlusCircle, Users, User } from 'lucide-react';

type BottomNavProps = {
  activeTab: 'home' | 'post' | 'feed' | 'profile';
  onTabChange: (tab: 'home' | 'post' | 'feed' | 'profile') => void;
};

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, label: 'ホーム', icon: Home },
    { id: 'post' as const, label: '投稿', icon: PlusCircle },
    { id: 'feed' as const, label: 'みんな', icon: Users },
    { id: 'profile' as const, label: 'プロフィール', icon: User },
  ];

  return (
    <div className="border-t bg-white">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === id
                ? 'text-blue-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}