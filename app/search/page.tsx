'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// デフォルトの検索項目（実際のデータのキーに合わせる）
const defaultSearchFields = [
  { id: '1', name: '図番', enabled: true },
  { id: '2', name: '機種', enabled: true },
  { id: '3', name: '大きさ', enabled: true },
  { id: '4', name: '見積番号', enabled: true },
  { id: '5', name: '製図者', enabled: true },
  { id: '6', name: '営業所', enabled: true },
];

// ダミーデータ（画像のテーブルに基づいて拡張）
const sampleData = Array.from({ length: 50 }, (_, i) => ({
  図番: `H${i % 2 === 0 ? '5' : 'B'}FTA5${9134 + i}`,
  機種: ['L H 5', 'K K S', 'H K S', 'H H K'][i % 4],
  大きさ: ['5 0 6 0', '2 0 5 0', '7 0 6 0', '9 0 5 0', '3 0 3 1', '8 0 3 1'][i % 6],
  見積番号: i % 3 === 0 ? '' : `000${188018 + i}`,
  製図者: ['金下幸', '滝澤宗彦', '山田太郎', '佐藤花子'][i % 4],
  作成年月日: `2025.0${(i % 3) + 3}.${String(10 + (i % 20)).padStart(2, '0')}`,
  仕様変更: ['2 0 2 2年 1 0月改定', '2 0 1 9年 1 0月改定', '2 0 2 3年 4月改定'][i % 3],
  営業所: ['広島営業所', '郡山営業所', '相模原営業所', '東京営業所'][i % 4],
  特別仕様23: i % 4 === 3 ? '' : ['1 8 0 0', '2 0 0 0', '1 6 0 0'][i % 3],
  特別仕様24: i % 5 === 0 ? '切詰' : '',
  特別仕様27: i % 7 === 0 ? '間仕切' : '',
  特別仕様28: i % 6 === 0 ? '前壁' : '',
  特別仕様30: i % 8 === 0 ? 'その他' : '',
}));

export default function SearchPage() {
  // 初期searchParamsを生成
  const getInitialSearchParams = () => {
    const params: Record<string, string> = {};
    defaultSearchFields.forEach((field) => {
      params[field.name] = '';
    });
    return params;
  };

  const [searchFields, setSearchFields] = useState(defaultSearchFields);
  const [searchParams, setSearchParams] = useState<Record<string, string>>(getInitialSearchParams());

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
    }
  }, []);

  const [results, setResults] = useState(sampleData);
  const [selectedRow, setSelectedRow] = useState<number | null>(0);

  const handleSearch = () => {
    // 検索パラメータに基づいてフィルタリング
    const filtered = sampleData.filter((row) => {
      // 各検索条件でフィルタリング
      for (const [key, value] of Object.entries(searchParams)) {
        if (value && value.trim() !== '') {
          // データの中に該当するキーが存在する場合のみチェック
          const rowValue = String(row[key as keyof typeof row] || '');
          // キーが存在しない場合は無視（検索条件として使わない）
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
    // CSV用のヘッダー
    const headers = [
      '図番',
      '機種',
      '大きさ',
      '見積番号',
      '製図者',
      '作成年月日',
      '仕様変更',
      '営業所',
      '特別仕様2-3',
      '特別仕様2-4',
      '特別仕様2-7',
      '特別仕様2-8',
      '特別仕様3-0',
    ];

    // CSV形式の文字列を生成
    let csvContent = '\uFEFF'; // BOM for Excel UTF-8
    csvContent += headers.join(',') + '\n';

    results.forEach((row) => {
      const values = [
        row.図番,
        row.機種,
        row.大きさ,
        row.見積番号,
        row.製図者,
        row.作成年月日,
        row.仕様変更,
        row.営業所,
        row.特別仕様23,
        row.特別仕様24,
        row.特別仕様27,
        row.特別仕様28,
        row.特別仕様30,
      ];
      csvContent += values.map(v => `"${v}"`).join(',') + '\n';
    });

    // ダウンロード
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
          <div className="bg-[#c0c0c0] px-3 py-0.5 text-xs border border-white border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080]">
            検索画面
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="p-4 space-y-4">
          {/* 検索条件 */}
          <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] p-3 bg-[#c0c0c0]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-black text-sm font-bold">検索条件</div>
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
                    <label className="text-black text-sm whitespace-nowrap">{field.name}:</label>
                    <input
                      type="text"
                      value={searchParams[field.name] || ''}
                      onChange={(e) => setSearchParams({ ...searchParams, [field.name]: e.target.value })}
                      className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
                    />
                  </div>
                ))}
            </div>

            {/* 検索実行ボタン */}
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleSearch}
                className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-6 py-1 bg-[#c0c0c0] text-sm font-bold active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]"
              >
                検索実行
              </button>
            </div>
          </div>

          {/* 検索結果テーブル */}
          <div className="border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white overflow-auto" style={{ height: '400px' }}>
            <table className="w-full text-black text-xs border-collapse">
              <thead className="sticky top-0">
                <tr className="bg-[#c0c0c0]">
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">図番</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">機種</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">大きさ</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">見積番号</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">製図者</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">作成年月日</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">仕様変更</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">営業所</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">特別仕様2-3</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">特別仕様2-4</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">特別仕様2-7</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">特別仕様2-8</th>
                  <th className="border border-[#808080] px-2 py-1 font-normal whitespace-nowrap">特別仕様3-0</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer ${selectedRow === index ? 'bg-[#000080] text-white' : 'hover:bg-[#e0e0e0]'}`}
                    onClick={() => setSelectedRow(index)}
                  >
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.図番}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.機種}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.大きさ}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.見積番号}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.製図者}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.作成年月日}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.仕様変更}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.営業所}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.特別仕様23}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.特別仕様24}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.特別仕様27}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.特別仕様28}</td>
                    <td className="border border-[#808080] px-2 py-1 whitespace-nowrap">{row.特別仕様30}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* フッター */}
          <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0]">
            {/* 選択された図面情報 */}
            <div className="border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white px-2 py-1 text-xs flex items-center gap-3 m-2">
              {selectedRow !== null && results.length > 0 && results[selectedRow] && (
                <>
                  <span>{results[selectedRow].図番}</span>
                  <span>{results[selectedRow].機種}</span>
                  <span>{results[selectedRow].大きさ}</span>
                  <span>{results[selectedRow].見積番号}</span>
                  <span>製図者:{results[selectedRow].製図者}</span>
                  <span>{results[selectedRow].作成年月日}</span>
                  <span>{results[selectedRow].仕様変更}</span>
                  <span>{results[selectedRow].営業所}</span>
                </>
              )}
              {results.length === 0 && (
                <span className="text-gray-500">検索結果がありません</span>
              )}
            </div>

            {/* ボタン群 */}
            <div className="p-2 flex items-center justify-between">
              <div className="flex gap-2">
                <button className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-3 py-1 bg-[#c0c0c0] text-xs active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]">
                  指定検索
                </button>
                <button className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-3 py-1 bg-[#c0c0c0] text-xs active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]">
                  標準検索
                </button>
                <button className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-3 py-1 bg-[#c0c0c0] text-xs active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]">
                  履歴登録
                </button>
                <button className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-3 py-1 bg-[#c0c0c0] text-xs active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]">
                  図面削除
                </button>
                <button className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-3 py-1 bg-[#c0c0c0] text-xs active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]">
                  図面出力
                </button>
                <button
                  onClick={handleExportCSV}
                  className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-3 py-1 bg-[#c0c0c0] text-xs active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] hover:bg-[#d0d0d0]"
                  disabled={results.length === 0}
                >
                  CSV出力
                </button>
                <button className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-3 py-1 bg-[#c0c0c0] text-xs active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]">
                  &/I連携
                </button>
              </div>
              <div className="flex gap-2">
                <button className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1 bg-[#c0c0c0] text-xs active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]">
                  起動
                </button>
                <button className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1 bg-[#c0c0c0] text-xs active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]">
                  やり直
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
