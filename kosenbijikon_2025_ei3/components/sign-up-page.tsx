"use client";

import { useState } from 'react';
import { Mail, Lock, User, UserPlus, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

type SignUpPageProps = {
  onSignUp: (name: string, email: string, password: string) => void;
  onSwitchToSignIn: () => void;
};

export function SignUpPage({ onSignUp, onSwitchToSignIn }: SignUpPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください');
      return;
    }

    if (name && email && password) {
      setIsLoading(true);
      // 簡易的な登録処理
      setTimeout(() => {
        onSignUp(name, email, password);
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-2xl">
          {/* ロゴ・タイトル */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl mb-2">アカウント作成</h1>
            <p className="text-sm text-gray-500">
              感謝の習慣を今日から始めましょう
            </p>
          </div>

          {/* サインアップフォーム */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-gray-500" />
                お名前
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="山田 太郎"
                required
                disabled={isLoading}
              />
            </div>

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
                placeholder="6文字以上"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-gray-500" />
                パスワード（確認）
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="もう一度入力"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              disabled={isLoading}
            >
              {isLoading ? (
                '処理中...'
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  アカウント作成
                </>
              )}
            </Button>
          </form>

          {/* サインインへのリンク */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">
              すでにアカウントをお持ちですか？
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={onSwitchToSignIn}
              disabled={isLoading}
            >
              <LogIn className="w-4 h-4 mr-2" />
              サインイン
            </Button>
          </div>
        </Card>

        {/* デモ用の情報 */}
        <Card className="mt-4 p-4 bg-purple-50 border-purple-200">
          <p className="text-xs text-purple-800 text-center">
            💡 デモ版：任意の情報で登録できます
          </p>
        </Card>
      </div>
    </div>
  );
}
