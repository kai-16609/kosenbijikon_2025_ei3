"use client";

import { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

type SignInPageProps = {
  onSignIn: (email: string, password: string) => void;
  onSwitchToSignUp: () => void;
};

export function SignInPage({ onSignIn, onSwitchToSignUp }: SignInPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      // 簡易的なログイン処理
      setTimeout(() => {
        onSignIn(email, password);
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-2xl">
          {/* ロゴ・タイトル */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">TUG</h1>
            <p className="text-sm text-gray-500">
              The unnamed gratitude
            </p>
          </div>

          {/* サインインフォーム */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-gray-500" />
                メールアドレス
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-gray-500" />
                パスワード
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                '処理中...'
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  サインイン
                </>
              )}
            </Button>
          </form>

          {/* サインアップへのリンク */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">
              アカウントをお持ちでないですか？
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={onSwitchToSignUp}
              disabled={isLoading}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              新規登録
            </Button>
          </div>
        </Card>

        {/* デモ用の情報 */}
        <Card className="mt-4 p-4 bg-blue-50 border-blue-200">
          <p className="text-xs text-blue-800 text-center">
            💡 デモ版：任意のメールアドレスとパスワードでログインできます
          </p>
        </Card>
      </div>
    </div>
  );
}
