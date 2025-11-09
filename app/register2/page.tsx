'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Register2() {
  const [formData, setFormData] = useState({
    製品名: '広スペースハウス',
    種類: 'KKS',
    開口切詰左: '',
    開口切詰右: '',
    開口切詰中: '',
    前柱中追加: '',
    カスケード張レ: '',
    屋根の出寸法変更: '',
    屋根軒軒材変更: '',
    屋根妻面持出: '',
    妻開きドラーメン構造: '',
    特主シャッター下地: '',
    軒高切詰: '',
    前入隅左: '',
    前入隅右: '',
    後入隅左: '',
    後入隅右: '',
    種雷補強仕様: '',
    前出隅左: '',
    前出隅右: '',
    後出隅左: '',
    後出隅右: '',
    期途開高変更: '',
    長期地耐力: '',
    field1: '',
    field2: '',
    field3: '',
    水下シャッター下地: '',
    間仕切: '',
    前壁: '',
    こりゃ工工床: '',
    その他: '',
  });

  const handleOk = () => {
    console.log('Form submitted:', formData);
  };

  const handleSpecChange = () => {
    console.log('Spec change clicked');
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
            <span className="text-base">📋</span>
            <span>仕様</span>
          </div>
          <div className="bg-[#c0c0c0] px-3 py-0.5 text-xs text-black border border-white border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080]">
            登録画面②
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="p-4 space-y-4">
          {/* 製品名と種類 */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">製品名</label>
              <select
                value={formData.製品名}
                onChange={(e) => setFormData({ ...formData, 製品名: e.target.value })}
                className="px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm w-48"
              >
                <option value="広スペースハウス">広スペースハウス</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">種類</label>
              <select
                value={formData.種類}
                onChange={(e) => setFormData({ ...formData, 種類: e.target.value })}
                className="px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm w-48"
              >
                <option value="KKS">KKS</option>
              </select>
            </div>

            <button
              onClick={handleSpecChange}
              className="ml-auto border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-6 py-1 bg-[#c0c0c0] text-black text-sm active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]"
            >
              仕様変更
            </button>
          </div>

          {/* 3列グリッドフォーム */}
          <div className="grid grid-cols-3 gap-x-6 gap-y-3">
            {/* 左列 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">開口切詰 左:</label>
                <select
                  value={formData.開口切詰左}
                  onChange={(e) => setFormData({ ...formData, 開口切詰左: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">開口切詰 右:</label>
                <select
                  value={formData.開口切詰右}
                  onChange={(e) => setFormData({ ...formData, 開口切詰右: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">開口切詰 中:</label>
                <select
                  value={formData.開口切詰中}
                  onChange={(e) => setFormData({ ...formData, 開口切詰中: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">前柱中追加:</label>
                <select
                  value={formData.前柱中追加}
                  onChange={(e) => setFormData({ ...formData, 前柱中追加: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">カスケード張レ:</label>
                <select
                  value={formData.カスケード張レ}
                  onChange={(e) => setFormData({ ...formData, カスケード張レ: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">屋根の出寸法変更:</label>
                <select
                  value={formData.屋根の出寸法変更}
                  onChange={(e) => setFormData({ ...formData, 屋根の出寸法変更: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">屋根軒軒材変更:</label>
                <select
                  value={formData.屋根軒軒材変更}
                  onChange={(e) => setFormData({ ...formData, 屋根軒軒材変更: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">屋根妻面持出:</label>
                <select
                  value={formData.屋根妻面持出}
                  onChange={(e) => setFormData({ ...formData, 屋根妻面持出: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">妻開きドラーメン構造:</label>
                <select
                  value={formData.妻開きドラーメン構造}
                  onChange={(e) => setFormData({ ...formData, 妻開きドラーメン構造: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">特主シャッター下地:</label>
                <select
                  value={formData.特主シャッター下地}
                  onChange={(e) => setFormData({ ...formData, 特主シャッター下地: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>
            </div>

            {/* 中央列 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">軒高切詰:</label>
                <select
                  value={formData.軒高切詰}
                  onChange={(e) => setFormData({ ...formData, 軒高切詰: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">前入隅 左:</label>
                <select
                  value={formData.前入隅左}
                  onChange={(e) => setFormData({ ...formData, 前入隅左: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">前入隅 右:</label>
                <select
                  value={formData.前入隅右}
                  onChange={(e) => setFormData({ ...formData, 前入隅右: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">後入隅 左:</label>
                <select
                  value={formData.後入隅左}
                  onChange={(e) => setFormData({ ...formData, 後入隅左: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">後入隅 右:</label>
                <select
                  value={formData.後入隅右}
                  onChange={(e) => setFormData({ ...formData, 後入隅右: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">種雷補強仕様:</label>
                <select
                  value={formData.種雷補強仕様}
                  onChange={(e) => setFormData({ ...formData, 種雷補強仕様: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">前出隅 左:</label>
                <select
                  value={formData.前出隅左}
                  onChange={(e) => setFormData({ ...formData, 前出隅左: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">前出隅 右:</label>
                <select
                  value={formData.前出隅右}
                  onChange={(e) => setFormData({ ...formData, 前出隅右: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">後出隅 左:</label>
                <select
                  value={formData.後出隅左}
                  onChange={(e) => setFormData({ ...formData, 後出隅左: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">後出隅 右:</label>
                <select
                  value={formData.後出隅右}
                  onChange={(e) => setFormData({ ...formData, 後出隅右: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>
            </div>

            {/* 右列 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">期途開高変更:</label>
                <select
                  value={formData.期途開高変更}
                  onChange={(e) => setFormData({ ...formData, 期途開高変更: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">長期地耐力:</label>
                <select
                  value={formData.長期地耐力}
                  onChange={(e) => setFormData({ ...formData, 長期地耐力: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">:</label>
                <select
                  value={formData.field1}
                  onChange={(e) => setFormData({ ...formData, field1: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">:</label>
                <select
                  value={formData.field2}
                  onChange={(e) => setFormData({ ...formData, field2: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">:</label>
                <select
                  value={formData.field3}
                  onChange={(e) => setFormData({ ...formData, field3: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">水下シャッター下地:</label>
                <select
                  value={formData.水下シャッター下地}
                  onChange={(e) => setFormData({ ...formData, 水下シャッター下地: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">間仕切:</label>
                <select
                  value={formData.間仕切}
                  onChange={(e) => setFormData({ ...formData, 間仕切: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">前壁:</label>
                <select
                  value={formData.前壁}
                  onChange={(e) => setFormData({ ...formData, 前壁: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">こりゃ工工床:</label>
                <select
                  value={formData.こりゃ工工床}
                  onChange={(e) => setFormData({ ...formData, こりゃ工工床: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap w-32 flex-shrink-0">その他:</label>
                <select
                  value={formData.その他}
                  onChange={(e) => setFormData({ ...formData, その他: e.target.value })}
                  className="flex-1 px-2 py-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] bg-white text-black text-sm"
                >
                  <option value=""></option>
                </select>
              </div>
            </div>
          </div>

          {/* ボタン */}
          <div className="flex justify-end gap-4">
            <button
              onClick={handleOk}
              className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-8 py-2 bg-[#c0c0c0] text-black text-sm font-bold active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
