'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#c0c0c0] p-8 font-sans flex items-center justify-center">
      <div className="bg-[#c0c0c0] border-2 border-white border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] p-12">
        {/* タイトル */}
        <div className="bg-gradient-to-r from-[#0a246a] to-[#a6caf0] px-6 py-3 mb-10">
          <h1 className="text-white font-bold text-2xl text-center">図面管理システム</h1>
        </div>

        {/* ボタングリッド */}
        <div className="grid grid-cols-2 gap-10">
          <Link href="/register">
            <button className="w-full min-w-[280px] border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-16 py-12 bg-[#c0c0c0] text-black text-2xl font-bold active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0] transition-colors">
              登録画面
            </button>
          </Link>

          <Link href="/register2">
            <button className="w-full min-w-[280px] border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-16 py-12 bg-[#c0c0c0] text-black text-2xl font-bold active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0] transition-colors">
              登録画面②
            </button>
          </Link>

          <Link href="/search">
            <button className="w-full min-w-[280px] border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-16 py-12 bg-[#c0c0c0] text-black text-2xl font-bold active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0] transition-colors">
              検索画面
            </button>
          </Link>

          <Link href="/settings">
            <button className="w-full min-w-[280px] border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-16 py-12 bg-[#c0c0c0] text-black text-2xl font-bold active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0] transition-colors">
              設定画面
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
