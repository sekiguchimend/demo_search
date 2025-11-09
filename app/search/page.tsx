'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// デフォルトの検索項目（todo.mdに基づく）
const defaultSearchFields = [
  { id: '1', name: '図番', enabled: true },
  { id: '2', name: '図面種類', enabled: true },
  { id: '3', name: '製品名', enabled: true },
  { id: '4', name: '機種', enabled: true },
  { id: '5', name: '大きさ', enabled: true },
  { id: '6', name: '製品仕様', enabled: true },
  { id: '7', name: '作成年月日', enabled: true },
  { id: '8', name: '製図者', enabled: true },
  { id: '9', name: '営業所', enabled: true },
  { id: '10', name: '見積番号', enabled: true },
  { id: '11', name: '受注番号', enabled: true },
  { id: '12', name: '特別仕様', enabled: true },
];

// ダミーデータ（todo.mdの項目に基づいて拡張）
const sampleData = Array.from({ length: 30 }, (_, i) => ({
  図番: `H5FTA5${9134 + i}`,
  図面種類: ['確認図面', '基礎図', '鉄骨詳細図', '小屋伏軸組図'][i % 4],
  製品名: ['広スペースハウス', 'キャノポート', 'Gポート'][i % 3],
  機種: ['KKS', 'HKS', 'HHK', 'LH5'][i % 4],
  大きさ: ['2031', '3040', '5060', '2050', '7060', '9050'][i % 6],
  製品仕様: ['2019年10月改定', '2022年10月改定', '2025年4月改定'][i % 3],
  作成年月日: '2025.03.31',
  製図者: ['滝澤宗彦', '佐藤健一', '山田太郎'][i % 3],
  営業所: ['郡山営業所', '広島営業所', '東京営業所'][i % 3],
  見積番号: i % 3 === 0 ? '' : `000${188018 + i}`,
  受注番号: i % 2 === 0 ? '' : `KK${20250000 + i}`,
  特別仕様: i % 4 === 0 ? '' : ['間口切詰', '間仕切', '前壁', 'その他'][i % 4],
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
    // 検索パラメータに基づいてフィルタリング
    const filtered = sampleData.filter((row) => {
      for (const [key, value] of Object.entries(searchParams)) {
        if (value && value.trim() !== '') {
          const rowValue = String(row[key as keyof typeof row] || '');
          if (key in row && rowValue) {
            if (!rowValue.toLowerCase().includes(value.toLowerCase())) {
              return false;
            }
          }
        }
      }
      return true;
    });
    setResults(filtered);
    setSelectedRow(filtered.length > 0 ? 0 : null);
  };

  const handleExportCSV = () => {
    const headers = ['図番', '図面種類', '製品名', '機種', '大きさ', '製品仕様', '作成年月日', '製図者', '営業所', '見積番号', '受注番号', '特別仕様'];
    let csvContent = '\uFEFF'; // BOM for Excel UTF-8
    csvContent += headers.join(',') + '\n';

    results.forEach((row) => {
      const values = [
        row.図番,
        row.図面種類,
        row.製品名,
        row.機種,
        row.大きさ,
        row.製品仕様,
        row.作成年月日,
        row.製図者,
        row.営業所,
        row.見積番号,
        row.受注番号,
        row.特別仕様,
      ];
      csvContent += values.map(v => `"${v}"`).join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `検索結果_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">図面種類</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">製品名</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">機種</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">大きさ</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">製品仕様</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">作成年月日</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">製図者</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">営業所</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">見積番号</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">受注番号</th>
                    <th className="border border-[#808080] px-2 py-1 text-left text-black font-normal">特別仕様</th>
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
                      <td className="border border-[#808080] px-2 py-1">{row.図面種類}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.製品名}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.機種}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.大きさ}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.製品仕様}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.作成年月日}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.製図者}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.営業所}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.見積番号}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.受注番号}</td>
                      <td className="border border-[#808080] px-2 py-1">{row.特別仕様}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* フッター（3.png参照） */}
          <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] p-3 bg-[#c0c0c0]">
            <div className="space-y-3">
              {/* 選択された図面情報（1行表示） */}
              <div className="border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-3 py-2 bg-white">
                {selectedRow !== null && results[selectedRow] ? (
                  <div className="flex gap-4 text-xs text-black overflow-x-auto">
                    <span>{results[selectedRow].図番}</span>
                    <span>{results[selectedRow].機種} {results[selectedRow].大きさ}</span>
                    <span>{results[selectedRow].見積番号}</span>
                    <span>{results[selectedRow].図面種類}</span>
                    <span>{results[selectedRow].作成年月日}</span>
                    <span>{results[selectedRow].製図者}</span>
                    <span>{results[selectedRow].営業所}</span>
                    <span>{results[selectedRow].製品名}</span>
                    <span>{results[selectedRow].製品仕様}</span>
                    <span>{results[selectedRow].特別仕様}</span>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">図面が選択されていません</div>
                )}
              </div>

              {/* ボタン */}
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <button
                    className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1.5 bg-[#c0c0c0] text-xs text-black active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0]"
                    disabled={selectedRow === null}
                  >
                    物件検索
                  </button>
                  <button
                    className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1.5 bg-[#c0c0c0] text-xs text-black active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0]"
                    disabled={selectedRow === null}
                  >
                    積算検索
                  </button>
                  <button
                    className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1.5 bg-[#c0c0c0] text-xs text-black active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0]"
                    disabled={selectedRow === null}
                  >
                    展開登録
                  </button>
                  <button
                    className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1.5 bg-[#c0c0c0] text-xs text-black active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0]"
                    disabled={selectedRow === null}
                  >
                    図面削除
                  </button>
                  <button
                    className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1.5 bg-[#c0c0c0] text-xs text-black active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0]"
                    disabled={selectedRow === null}
                  >
                    図面出力
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1.5 bg-[#c0c0c0] text-xs text-black active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0]"
                    disabled={results.length === 0}
                  >
                    CSV出力
                  </button>
                  <button
                    className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1.5 bg-[#c0c0c0] text-xs text-black active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0]"
                    disabled={selectedRow === null}
                  >
                    詳細選択
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-6 py-1.5 bg-[#c0c0c0] text-xs text-black active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0]"
                    disabled={selectedRow === null}
                  >
                    起動
                  </button>
                  <button
                    className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1.5 bg-[#c0c0c0] text-xs text-black active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0]"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
