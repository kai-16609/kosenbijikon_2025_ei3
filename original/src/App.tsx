import { useState } from 'react';
import { HomeTab } from './components/HomeTab';
import { PostTab } from './components/PostTab';
import { FeedTab } from './components/FeedTab';
import { ProfileTab } from './components/ProfileTab';
import { BottomNav } from './components/BottomNav';
import { SignInPage } from './components/SignInPage';
import { SignUpPage } from './components/SignUpPage';

export type Post = {
  id: string;
  content: string;
  timestamp: Date;
  author?: string;
  target?: '家族' | '友人' | '同僚' | '自分' | 'その他';
  category?: 'サポート' | '励まし' | '協力' | '成長' | '日常' | 'その他';
};

type User = {
  name: string;
  email: string;
  avatar: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<'signin' | 'signup'>('signin');
  const [activeTab, setActiveTab] = useState<'home' | 'post' | 'feed' | 'profile'>('home');
  const [myPosts, setMyPosts] = useState<Post[]>([
    {
      id: '1',
      content: '今日も頑張りました！継続は力なり。',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      target: '自分',
      category: '成長',
    },
    {
      id: '2',
      content: '3日目達成！調子が良くなってきた。',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      target: '自分',
      category: '励まし',
    },
  ]);
  const [allPosts, setAllPosts] = useState<Post[]>([
    {
      id: 'a1',
      content: '100日達成！みなさんもがんばってください！',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      author: 'ユーザーA',
      target: '自分',
      category: '成長',
    },
    {
      id: 'a2',
      content: '今日から始めます。よろしくお願いします。',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      author: 'ユーザーB',
      target: '友人',
      category: '励まし',
    },
    {
      id: 'a3',
      content: '50日継続中！習慣化できてきました。',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      author: 'ユーザーC',
      target: '家族',
      category: 'サポート',
    },
    {
      id: 'a4',
      content: '雨の日も続けています。',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      author: 'ユーザーD',
      target: '自分',
      category: '日常',
    },
  ]);

  const handleSignIn = (email: string, password: string) => {
    // デモ版：簡易的なサインイン処理
    setUser({ 
      name: email.split('@')[0], 
      email,
      avatar: '😊' 
    });
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    // デモ版：簡易的なサインアップ処理
    setUser({ 
      name, 
      email,
      avatar: '😊' 
    });
  };

  const handleUpdateProfile = (name: string, avatar: string) => {
    if (user) {
      setUser({ ...user, name, avatar });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
    setAuthView('signin');
  };

  const handleNewPost = (content: string, target: string, category: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      target: target as Post['target'],
      category: category as Post['category'],
    };
    setMyPosts([newPost, ...myPosts]);
    
    // みんなの投稿にも追加（あなたとして）
    const newAllPost: Post = {
      ...newPost,
      author: user?.name || 'あなた',
    };
    setAllPosts([newAllPost, ...allPosts]);
  };

  // 認証されていない場合はサインイン/サインアップページを表示
  if (!user) {
    if (authView === 'signin') {
      return (
        <SignInPage
          onSignIn={handleSignIn}
          onSwitchToSignUp={() => setAuthView('signup')}
        />
      );
    } else {
      return (
        <SignUpPage
          onSignUp={handleSignUp}
          onSwitchToSignIn={() => setAuthView('signin')}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* スマホ風の縦型レイアウト */}
      <div className="w-full max-w-md h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* メインコンテンツエリア */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'home' && <HomeTab posts={myPosts} />}
          {activeTab === 'post' && (
            <PostTab 
              onPost={handleNewPost} 
              onPostComplete={() => setActiveTab('home')}
            />
          )}
          {activeTab === 'feed' && <FeedTab posts={allPosts} />}
          {activeTab === 'profile' && (
            <ProfileTab
              user={user}
              onUpdateProfile={handleUpdateProfile}
              onLogout={handleLogout}
              totalPosts={myPosts.length}
            />
          )}
        </div>

        {/* 下部ナビゲーション */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}