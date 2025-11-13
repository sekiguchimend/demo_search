'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isHostTransferOpen, setIsHostTransferOpen] = useState(false);
  const [formData, setFormData] = useState({
    drawingNumber: 'HBFTA59253',
    drawingType: 'F:確認図面',
    notificationNo: '',
    productNo: '',
    obsolete: false,
    productName: '広スペースハウス',
    partName: '',
    partSpec: '',
    partProperty: '',
    model: 'KKS',
    size: '8031',
    wallSpec: '2019年10月改定',
    scale1: '1',
    scale2: '100',
    creationDate: '2025.04.11',
    finish: '',
    drafter: '田中花子',
    reviewer: '',
    approver: '',
    materialName: '',
    materialSize: '',
    thickness1: '',
    thickness2: '',
    length: '',
    material: '',
    office: '相模原営業所',
    estimateNo: '',
    orderNo: '',
    hostTransfer: true,
    transferStatus: '未転送',
  });

  const handleSubmit = () => {
    console.log('OK clicked:', formData);
  };

  const handleSpecSubmit = () => {
    console.log('仕様登録 clicked:', formData);
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
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
            <span className="text-base">📋</span>
            <span>表題欄記入</span>
          </div>
          <div className="bg-[#c0c0c0] px-3 py-0.5 text-xs text-black border border-white border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080]">
            登録画面
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="p-4 space-y-4">
          {/* 第1行: 図番、図面種類 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">図番:</label>
              <input
                type="text"
                value={formData.drawingNumber}
                onChange={(e) => setFormData({ ...formData, drawingNumber: e.target.value })}
                className="flex-1 border-2 border-inset border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">図面種類:</label>
              <select
                value={formData.drawingType}
                onChange={(e) => setFormData({ ...formData, drawingType: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              >
                <option>F:確認図面</option>
                <option>A:承認図面</option>
                <option>B:施工図面</option>
              </select>
            </div>
          </div>

          {/* 第2行: 通知No、部品No、廃図対象外 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">通知No:</label>
              <input
                type="text"
                value={formData.notificationNo}
                onChange={(e) => setFormData({ ...formData, notificationNo: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">部品No:</label>
              <input
                type="text"
                value={formData.productNo}
                onChange={(e) => setFormData({ ...formData, productNo: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-black text-sm border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-3 py-2 bg-[#c0c0c0]">
                <input
                  type="checkbox"
                  checked={formData.obsolete}
                  onChange={(e) => setFormData({ ...formData, obsolete: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>廃図対象外</span>
              </label>
            </div>
          </div>

          {/* 第3行: 製品名称 */}
          <div className="flex items-center gap-2">
            <label className="text-black text-sm whitespace-nowrap">製品名称:</label>
            <select
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="w-64 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
            >
              <option>広スペースハウス</option>
              <option>コンパクトハウス</option>
            </select>
          </div>

          {/* 第4行: 部品名称、部品仕様、部品特性 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">部品名称:</label>
              <select
                value={formData.partName}
                onChange={(e) => setFormData({ ...formData, partName: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              >
                <option value=""></option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">部品仕様:</label>
              <select
                value={formData.partSpec}
                onChange={(e) => setFormData({ ...formData, partSpec: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              >
                <option value=""></option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">部品特性:</label>
              <select
                value={formData.partProperty}
                onChange={(e) => setFormData({ ...formData, partProperty: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              >
                <option value=""></option>
              </select>
            </div>
          </div>

          {/* 第5行: 機種、大きさ、壁仕様 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">機種:</label>
              <select
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              >
                <option>KKS</option>
                <option>KKM</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">大きさ:</label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              >
                <option>8031</option>
                <option>9031</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">壁仕様:</label>
              <select
                value={formData.wallSpec}
                onChange={(e) => setFormData({ ...formData, wallSpec: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              >
                <option>2019年10月改定</option>
                <option>2020年1月改定</option>
              </select>
            </div>
          </div>

          {/* 第6行: 尺度、作成年月日、仕上げ */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">尺度:</label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={formData.scale1}
                  onChange={(e) => setFormData({ ...formData, scale1: e.target.value })}
                  className="w-12 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-black text-sm text-center"
                />
                <span className="text-black text-sm">/</span>
                <input
                  type="text"
                  value={formData.scale2}
                  onChange={(e) => setFormData({ ...formData, scale2: e.target.value })}
                  className="w-16 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-black text-sm text-center"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">作成年月日:</label>
              <input
                type="text"
                value={formData.creationDate}
                onChange={(e) => setFormData({ ...formData, creationDate: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">仕上げ:</label>
              <select
                value={formData.finish}
                onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              >
                <option value=""></option>
              </select>
            </div>
          </div>

          {/* 第7行: 製図者、検図者、承認者 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">製図者:</label>
              <select
                value={formData.drafter}
                onChange={(e) => setFormData({ ...formData, drafter: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              >
                <option>田中花子</option>
                <option>山田太郎</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">検図者:</label>
              <select
                value={formData.reviewer}
                onChange={(e) => setFormData({ ...formData, reviewer: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              >
                <option value=""></option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-black text-sm whitespace-nowrap">承認者:</label>
              <select
                value={formData.approver}
                onChange={(e) => setFormData({ ...formData, approver: e.target.value })}
                className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
              >
                <option value=""></option>
              </select>
            </div>
          </div>

          {/* 2カラムレイアウト */}
          <div className="grid grid-cols-2 gap-4 items-start">
            {/* 左側: 材料/材質 */}
            <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] overflow-hidden">
              <button
                onClick={() => setIsMaterialOpen(!isMaterialOpen)}
                className="w-full text-left p-3 hover:bg-[#d0d0d0] active:bg-[#b0b0b0] transition-colors duration-200"
              >
                <h3 className="text-black text-sm font-bold">材料/材質 {isMaterialOpen ? '▼' : '▶'}</h3>
              </button>
              <div
                className={`transition-all duration-200 ease-in-out ${
                  isMaterialOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-3 pb-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-black text-sm whitespace-nowrap">名称:</label>
                    <select
                      value={formData.materialName}
                      onChange={(e) => setFormData({ ...formData, materialName: e.target.value })}
                      className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
                    >
                      <option value=""></option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-black text-sm whitespace-nowrap">サイズ:</label>
                    <select
                      value={formData.materialSize}
                      onChange={(e) => setFormData({ ...formData, materialSize: e.target.value })}
                      className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
                    >
                      <option value=""></option>
                    </select>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-1">
                      <label className="text-black text-sm whitespace-nowrap">板厚1:</label>
                      <input
                        type="text"
                        value={formData.thickness1}
                        onChange={(e) => setFormData({ ...formData, thickness1: e.target.value })}
                        className="w-16 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label className="text-black text-sm whitespace-nowrap">板厚2:</label>
                      <input
                        type="text"
                        value={formData.thickness2}
                        onChange={(e) => setFormData({ ...formData, thickness2: e.target.value })}
                        className="w-16 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label className="text-black text-sm whitespace-nowrap">長さ:</label>
                      <input
                        type="text"
                        value={formData.length}
                        onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                        className="w-16 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-black text-sm whitespace-nowrap">材質:</label>
                    <select
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
                    >
                      <option value=""></option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 右側: 営業所、見積番号、受注番号、ホスト転送 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap">営業所:</label>
                <select
                  value={formData.office}
                  onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                  className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
                >
                  <option>相模原営業所</option>
                  <option>東京営業所</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap">見積番号:</label>
                <input
                  type="text"
                  value={formData.estimateNo}
                  onChange={(e) => setFormData({ ...formData, estimateNo: e.target.value })}
                  className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-black text-sm whitespace-nowrap">受注番号:</label>
                <input
                  type="text"
                  value={formData.orderNo}
                  onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
                  className="flex-1 border-2 border-[#808080] border-t-[#000000] border-l-[#000000] border-b-[#ffffff] border-r-[#ffffff] px-2 py-1 bg-white text-black text-sm"
                />
              </div>

              {/* ホスト転送セクション */}
              <div className="border-2 border-[#808080] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] overflow-hidden">
                <button
                  onClick={() => setIsHostTransferOpen(!isHostTransferOpen)}
                  className="w-full text-left p-3 hover:bg-[#d0d0d0] active:bg-[#b0b0b0] transition-colors duration-200"
                >
                  <h3 className="text-black text-sm font-bold">ホスト転送 {isHostTransferOpen ? '▼' : '▶'}</h3>
                </button>
                <div
                  className={`transition-all duration-200 ease-in-out ${
                    isHostTransferOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-3 pb-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-1 text-black text-sm">
                        <input
                          type="checkbox"
                          checked={formData.hostTransfer}
                          onChange={(e) => setFormData({ ...formData, hostTransfer: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span>する</span>
                      </label>
                      <div className="text-black text-sm">
                        状態: <span className="font-bold text-black">{formData.transferStatus}</span>
                      </div>
                      <button
                        onClick={handleSpecSubmit}
                        className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-4 py-1 bg-[#c0c0c0] text-black text-sm active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]"
                      >
                        仕様登録
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 注意書き */}
          <div className="text-red-700 text-sm">
            図番と図面種類は必ず入力してください。
          </div>

          {/* ボタン */}
          <div className="flex justify-end gap-4">
            <button
              onClick={handleSubmit}
              className="border-2 border-[#ffffff] border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] px-8 py-2 bg-[#c0c0c0] text-black text-sm font-bold active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]"
            >
              OK
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
