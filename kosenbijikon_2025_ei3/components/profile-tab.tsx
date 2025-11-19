"use client";

import { useState } from 'react';
import { User as UserType } from '@/lib/types';
import { User, LogOut, Edit2, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

type ProfileTabProps = {
  user: UserType;
  onUpdateProfile: (name: string, avatar: string) => void;
  onLogout: () => void;
  totalPosts: number;
};

const avatarOptions = [
  { emoji: '😊', label: 'スマイル' },
  { emoji: '🌟', label: 'スター' },
  { emoji: '🎉', label: 'パーティー' },
  { emoji: '💪', label: '筋肉' },
  { emoji: '🌈', label: '虹' },
  { emoji: '🔥', label: '炎' },
  { emoji: '✨', label: 'キラキラ' },
  { emoji: '🌸', label: '桜' },
  { emoji: '🍀', label: 'クローバー' },
  { emoji: '🦋', label: '蝶' },
  { emoji: '🎨', label: 'アート' },
  { emoji: '🎵', label: '音楽' },
];

export function ProfileTab({ user, onUpdateProfile, onLogout, totalPosts }: ProfileTabProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  const handleSaveName = () => {
    if (editedName.trim()) {
      onUpdateProfile(editedName.trim(), selectedAvatar);
      setIsEditingName(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedName(user.name);
    setIsEditingName(false);
  };

  const handleSelectAvatar = (emoji: string) => {
    setSelectedAvatar(emoji);
    onUpdateProfile(user.name, emoji);
    setShowAvatarSelector(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* ヘッダー */}
      <div className="p-6 border-b">
        <h1 className="text-xl">プロフィール</h1>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          {/* プロフィールカード */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex flex-col items-center">
              {/* アバター */}
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg text-4xl">
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500">
                    {selectedAvatar}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 shadow-md"
                  onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>

              {/* 名前編集 */}
              {isEditingName ? (
                <div className="w-full space-y-2">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-center"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleSaveName}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      保存
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-1" />
                      キャンセル
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl">{user.name}</h2>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingName(true)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </Card>

          {/* アバター選択 */}
          {showAvatarSelector && (
            <Card className="p-4">
              <h3 className="text-sm mb-3">アイコンを選択</h3>
              <div className="grid grid-cols-4 gap-3">
                {avatarOptions.map((option) => (
                  <button
                    key={option.emoji}
                    onClick={() => handleSelectAvatar(option.emoji)}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                      selectedAvatar === option.emoji
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    title={option.label}
                  >
                    <span className="text-3xl">{option.emoji}</span>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* 統計情報 */}
          <Card className="p-4">
            <h3 className="text-sm text-gray-600 mb-3">活動統計</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl text-blue-600 mb-1">{totalPosts}</div>
                <div className="text-xs text-gray-600">投稿数</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl text-purple-600 mb-1">{totalPosts}</div>
                <div className="text-xs text-gray-600">継続日数</div>
              </div>
            </div>
          </Card>

          {/* アカウント設定 */}
          <Card className="p-4">
            <h3 className="text-sm text-gray-600 mb-3">アカウント設定</h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full"
                  size="lg"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  ログアウト
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>ログアウトしますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    ログアウトすると、サインイン画面に戻ります。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onLogout}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    ログアウト
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Card>
        </div>
      </div>
    </div>
  );
}
