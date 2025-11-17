'use client';

import Link from 'next/link';
import { FileEdit, Search, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e8e8e8] font-sans">
      {/* ヘッダー */}
      <div className="bg-[#6487AF] px-6 py-4">
        <h1 className="text-white font-bold text-2xl text-center">図面管理システム</h1>
      </div>

      {/* メインコンテンツ */}
      <div className="flex items-center justify-center p-8">
        <div className="bg-[#fff] rounded-lg p-12">
          {/* ボタングリッド */}
          <div className="grid grid-cols-3 gap-10">
            <Link href="/register">
              <button className="w-full min-w-[280px] px-16 py-12 bg-[#6487AF] text-white text-2xl font-bold rounded-md hover:bg-[#5476a0] active:bg-[#4465a0] transition-colors shadow-sm flex flex-col items-center justify-center gap-4">
                <FileEdit className="w-12 h-12" />
                <span>登録画面</span>
              </button>
            </Link>

            <Link href="/search">
              <button className="w-full min-w-[280px] px-16 py-12 bg-[#6487AF] text-white text-2xl font-bold rounded-md hover:bg-[#5476a0] active:bg-[#4465a0] transition-colors shadow-sm flex flex-col items-center justify-center gap-4">
                <Search className="w-12 h-12" />
                <span>検索画面</span>
              </button>
            </Link>

            <Link href="/settings">
              <button className="w-full min-w-[280px] px-16 py-12 bg-[#6487AF] text-white text-2xl font-bold rounded-md hover:bg-[#5476a0] active:bg-[#4465a0] transition-colors shadow-sm flex flex-col items-center justify-center gap-4">
                <Settings className="w-12 h-12" />
                <span>設定画面</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
