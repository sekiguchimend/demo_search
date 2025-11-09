'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// デフォルトの検索項目
const defaultSearchFields = [
  { id: '1', name: '図番', enabled: true },
  { id: '2', name: '図面種類', enabled: true },
  { id: '3', name: '機種', enabled: true },
  { id: '4', name: '製図者', enabled: true },
  { id: '5', name: '製品名', enabled: true },
  { id: '6', name: '大きさ', enabled: true },
  { id: '7', name: '仕様', enabled: true },
];

// ダミーデータ（画像のテーブルに基づいて拡張）
const sampleData = Array.from({ length: 30 }, (_, i) => ({
  図番: `H5FTA5${9134 + i}`,
  機種: 'L H 5',
  大きさ: ['5 0 6 0', '2 0 5 0', '7 0 6 0', '9 0 5 0'][i % 4],
  見積番号: i % 3 === 0 ? '' : `000${188018 + i}`,
  製図者: '金下幸',
  作成年月日: '2025.03.31',
  仕様変更: '2 0 2 2年 1 0月改定',
  営業所: '広島営業所',
  特別仕様23: i % 4 === 3 ? '' : '1 8 0 0',
  特別仕様24: '',
  特別仕様27: '',
  特別仕様28: '',
  特別仕様30: '',
}));

export default function SearchPage() {
  const [searchFields, setSearchFields] = useState(defaultSearchFields);
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});

  // localStorageから検索項目を読み込み
  useEffect(() => {
    const saved = localStorage.getItem('searchFields');
    if (saved) {
      const fields = JSON.parse(saved);
      setSearchFields(fields);

      // 検索パラメータを初期化
      const params: Record<string, string> = {};
      fields.forEach((field: any) => {
        params[field.name] = '';
      });
      setSearchParams(params);
    } else {
      // デフォルトの検索パラメータを初期化
      const params: Record<string, string> = {};
      defaultSearchFields.forEach((field) => {
        params[field.name] = '';
      });
      setSearchParams(params);
    }
  }, []);

  const [results, setResults] = useState(sampleData);
  const [selectedRow, setSelectedRow] = useState<number | null>(0);

  const handleSearch = () => {
    setResults(sampleData);
  };

  return (
    <div className="min-h-screen bg-[#c0c0c0] p-4 font-sans">
      <div className="mx-auto max-w-7xl bg-[#c0c0c0] border-2 border-white border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080]">
        {/* タイトルバー */}
        <div className="bg-gradient-to-r from-[#0a246a] to-[#a6caf0] px-2 py-1 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Link href="/" className="hover:bg-white/20 p-1 rounded transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-base">🔍</span>
            <span>検索</span>
          </div>
          <div className="bg-[#c0c0c0] px-3 py-0.5 text-xs text-black border border-white border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080]">
            検索画面
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="p-4 space-y-4">
          {/* 検索条件 */}
          <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] p-3 bg-[#c0c0c0]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-bold text-black">検索条件</div>
              <Link href="/settings">
                <button className="text-xs text-blue-700 hover:underline">
                  検索項目を編集
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {searchFields
                .filter(field => field.enabled)
                .map((field) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <label className="text-sm text-black whitespace-nowrap">{field.name}:</label>
                    <input
                      type="text"
                      value={searchParams[field.name] || ''}
                      onChange={(e) => setSearchParams({ ...searchParams, [field.name]: e.target.value })}
                      className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-sm text-black"
                    />
                  </div>
                ))}
            </div>

            {/* 検索ボタン */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleSearch}
                className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-8 py-2 bg-[#c0c0c0] text-sm text-black font-bold active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0]"
              >
                検索
              </button>
            </div>
          </div>

          {/* 検索結果テーブル */}
          <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] p-3 bg-[#c0c0c0]">
            <div className="text-sm font-bold text-black mb-3">検索結果（{results.length}件）</div>
            <div className="overflow-auto max-h-96 bg-white border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff]">
              <table className="w-full text-xs">
                <thead className="bg-[#c0c0c0] sticky top-0">
                  <tr>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">図番</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">機種</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">大きさ</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">見積番号</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">製図者</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">作成年月日</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">仕様変更</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">営業所</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, index) => (
                    <tr
                      key={index}
                      className={`cursor-pointer ${
                        selectedRow === index ? 'bg-[#0a246a] text-white' : 'hover:bg-gray-100 text-black'
                      }`}
                      onClick={() => setSelectedRow(index)}
                    >
                      <td className="border border-[#808080] px-2 py-1">{row.図番}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.機種}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.大きさ}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.見積番号}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.製図者}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.作成年月日}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.仕様変更}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.営業所}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
