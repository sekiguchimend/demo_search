'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, X, GripVertical } from 'lucide-react';

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

export default function SettingsPage() {
  const [searchFields, setSearchFields] = useState(defaultSearchFields);
  const [newFieldName, setNewFieldName] = useState('');

  // localStorageから検索項目を読み込み
  useEffect(() => {
    const saved = localStorage.getItem('searchFields');
    if (saved) {
      setSearchFields(JSON.parse(saved));
    }
  }, []);

  const [settings, setSettings] = useState({
    // 権限設定
    enableEditProtection: true,
    enableDeleteProtection: true,
    allowCopyOnly: true,

    // 作図者ランク設定
    enableDrafterRank: true,
    rankLevels: [
      { name: 'ランクA', description: '流用可能', enabled: true },
      { name: 'ランクB', description: '参考図として使用可', enabled: true },
      { name: 'ランクC', description: '流用不可', enabled: true },
    ],

    // 流用不可表示設定
    enableNoReuseWarning: true,
    noReuseCategories: {
      specialOrder: true,
      reducedPerformance: true,
      customDesign: true,
    },

    // 表示範囲設定
    enableViewRestriction: true,
    builderOnlyReusable: true,
    internalFullAccess: true,
  });

  const handleSave = () => {
    // 検索項目をlocalStorageに保存
    localStorage.setItem('searchFields', JSON.stringify(searchFields));
    console.log('Settings saved:', settings, 'Search fields:', searchFields);
    alert('設定を保存しました');
  };

  const handleCancel = () => {
    window.history.back();
  };

  // 検索項目の追加
  const handleAddField = () => {
    if (newFieldName.trim()) {
      const newField = {
        id: Date.now().toString(),
        name: newFieldName.trim(),
        enabled: true,
      };
      setSearchFields([...searchFields, newField]);
      setNewFieldName('');
    }
  };

  // 検索項目の削除
  const handleRemoveField = (id: string) => {
    setSearchFields(searchFields.filter(field => field.id !== id));
  };

  // 検索項目の有効/無効切り替え
  const handleToggleField = (id: string) => {
    setSearchFields(searchFields.map(field =>
      field.id === id ? { ...field, enabled: !field.enabled } : field
    ));
  };

  return (
    <div className="min-h-screen bg-[#c0c0c0] p-4 font-sans">
      <div className="mx-auto max-w-6xl bg-[#c0c0c0] border-2 border-white border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080]">
        {/* タイトルバー */}
        <div className="bg-gradient-to-r from-[#0a246a] to-[#a6caf0] px-2 py-1 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Link href="/" className="hover:bg-white/20 p-1 rounded transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-base">⚙️</span>
            <span>システム設定</span>
          </div>
          <div className="bg-[#c0c0c0] px-3 py-0.5 text-xs border border-white border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080]">
            設定画面
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="p-6 space-y-6">
          {/* 検索項目設定セクション */}
          <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] p-4 bg-[#c0c0c0]">
            <h2 className="text-black text-sm font-bold mb-4 pb-2 border-b-2 border-[#808080]">検索項目設定</h2>
            <div className="space-y-3">
              <p className="text-xs text-gray-700">
                ※検索画面に表示する項目を管理できます
              </p>

              {/* 検索項目リスト */}
              <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
                {searchFields.map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-3 p-2 bg-white border border-[#808080]"
                  >
                    <GripVertical className="w-4 h-4 text-gray-500" />
                    <label className="flex items-center gap-2 flex-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.enabled}
                        onChange={() => handleToggleField(field.id)}
                        className="w-4 h-4"
                      />
                      <span className={`text-sm ${!field.enabled ? 'text-gray-500 line-through' : 'text-black'}`}>
                        {field.name}
                      </span>
                    </label>
                    <button
                      onClick={() => handleRemoveField(field.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                      title="削除"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>

              {/* 新規項目追加 */}
              <div className="mt-4 pt-4 border-t-2 border-[#808080]">
                <p className="text-black text-xs font-bold mb-2">新しい検索項目を追加：</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddField()}
                    placeholder="項目名を入力"
                    className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm placeholder:text-black"
                  />
                  <button
                    onClick={handleAddField}
                    className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1 bg-[#c0c0c0] text-black text-sm active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff] flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    追加
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 権限設定セクション */}
          <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] p-4 bg-[#c0c0c0]">
            <h2 className="text-black text-sm font-bold mb-4 pb-2 border-b-2 border-[#808080]">権限設定</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <label className="flex items-center gap-2 text-black text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableEditProtection}
                    onChange={(e) => setSettings({ ...settings, enableEditProtection: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>作成者以外の上書きを禁止する</span>
                </label>
              </div>
              <div className="flex items-start gap-3">
                <label className="flex items-center gap-2 text-black text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableDeleteProtection}
                    onChange={(e) => setSettings({ ...settings, enableDeleteProtection: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>作成者以外の削除を禁止する</span>
                </label>
              </div>
              <div className="flex items-start gap-3">
                <label className="flex items-center gap-2 text-black text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowCopyOnly}
                    onChange={(e) => setSettings({ ...settings, allowCopyOnly: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>他のユーザーはコピーのみ可能にする</span>
                </label>
              </div>
              <p className="text-xs text-gray-700 mt-2 pl-6">
                ※不注意による上書きや削除を防止します（ユーザー100名以上対応）
              </p>
            </div>
          </div>

          {/* 作図者ランク設定セクション */}
          <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] p-4 bg-[#c0c0c0]">
            <h2 className="text-black text-sm font-bold mb-4 pb-2 border-b-2 border-[#808080]">作図者ランク表示設定</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <label className="flex items-center gap-2 text-black text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableDrafterRank}
                    onChange={(e) => setSettings({ ...settings, enableDrafterRank: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>作図者ランクを表示する</span>
                </label>
              </div>
              <p className="text-xs text-gray-700 pl-6">
                ※流用可否や参考図としての使用判断に活用
              </p>

              {settings.enableDrafterRank && (
                <div className="pl-6 mt-4 space-y-2">
                  {settings.rankLevels.map((rank, index) => (
                    <div key={index} className="flex items-center gap-4 text-black text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rank.enabled}
                          onChange={(e) => {
                            const newRanks = [...settings.rankLevels];
                            newRanks[index].enabled = e.target.checked;
                            setSettings({ ...settings, rankLevels: newRanks });
                          }}
                          className="w-4 h-4"
                        />
                        <span className="font-bold">{rank.name}:</span>
                      </label>
                      <span className="text-gray-700">{rank.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 流用不可表示設定セクション */}
          <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] p-4 bg-[#c0c0c0]">
            <h2 className="text-black text-sm font-bold mb-4 pb-2 border-b-2 border-[#808080]">流用不可表示設定</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <label className="flex items-center gap-2 text-black text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableNoReuseWarning}
                    onChange={(e) => setSettings({ ...settings, enableNoReuseWarning: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>流用不可の警告を表示する</span>
                </label>
              </div>
              <p className="text-xs text-gray-700 pl-6">
                ※流用によるトラブル発生を予防
              </p>

              {settings.enableNoReuseWarning && (
                <div className="pl-6 mt-4 space-y-2">
                  <p className="text-black text-xs font-bold mb-2">対象カテゴリー：</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-black text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.noReuseCategories.specialOrder}
                        onChange={(e) => setSettings({
                          ...settings,
                          noReuseCategories: { ...settings.noReuseCategories, specialOrder: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                      <span>個別対応（特注範囲外の設計）</span>
                    </label>
                    <label className="flex items-center gap-2 text-black text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.noReuseCategories.reducedPerformance}
                        onChange={(e) => setSettings({
                          ...settings,
                          noReuseCategories: { ...settings.noReuseCategories, reducedPerformance: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                      <span>外力性能を落として提案した物件</span>
                    </label>
                    <label className="flex items-center gap-2 text-black text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.noReuseCategories.customDesign}
                        onChange={(e) => setSettings({
                          ...settings,
                          noReuseCategories: { ...settings.noReuseCategories, customDesign: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                      <span>特殊カスタム設計</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 表示範囲設定セクション */}
          <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] p-4 bg-[#c0c0c0]">
            <h2 className="text-black text-sm font-bold mb-4 pb-2 border-b-2 border-[#808080]">表示範囲設定</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <label className="flex items-center gap-2 text-black text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableViewRestriction}
                    onChange={(e) => setSettings({ ...settings, enableViewRestriction: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>表示範囲の制限を有効にする</span>
                </label>
              </div>

              {settings.enableViewRestriction && (
                <div className="pl-6 mt-4 space-y-3">
                  <label className="flex items-center gap-2 text-black text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.builderOnlyReusable}
                      onChange={(e) => setSettings({ ...settings, builderOnlyReusable: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>ビルダーには流用可能図面のみ表示</span>
                  </label>
                  <label className="flex items-center gap-2 text-black text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.internalFullAccess}
                      onChange={(e) => setSettings({ ...settings, internalFullAccess: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>社内ユーザーには全図面を表示</span>
                  </label>
                  <p className="text-xs text-gray-700 mt-2">
                    ※ユーザー権限に応じて表示内容を制御
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ボタン */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={handleSave}
              className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-8 py-2 bg-[#c0c0c0] text-black text-sm font-bold active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]"
            >
              保存
            </button>
            <button
              onClick={handleCancel}
              className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-6 py-2 bg-[#c0c0c0] text-black text-sm active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
