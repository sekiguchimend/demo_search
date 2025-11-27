'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Upload, X, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isHostTransferOpen, setIsHostTransferOpen] = useState(false);
  const [isSpecSectionOpen, setIsSpecSectionOpen] = useState(true);
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
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
    // 仕様フォーム
    spec間口切詰左: '',
    spec間口切詰右: '',
    spec間口切詰中: '',
    spec前柱中追加: '',
    specカスケード無し: '',
    spec屋根の出寸法変更: '',
    spec屋根断熱材変更: '',
    spec屋根表面持出: '',
    spec妻開放ラーメン構造: '',
    spec特注シャッター下地: '',
    spec軒高切詰: '',
    spec前入隅左: '',
    spec前入隅右: '',
    spec後入隅左: '',
    spec後入隅右: '',
    spec積雪補強仕様: '',
    spec前出隅左: '',
    spec前出隅右: '',
    spec後出隅左: '',
    spec後出隅右: '',
    spec胴縁間隔変更: '',
    spec長期地耐力: '',
    spec水下シャッター下地: '',
    spec間仕切: '',
    spec前壁: '',
    specこりゃエエ蔵: '',
    specその他: '',
  });

  const handleSubmit = () => {
    console.log('OK clicked:', formData);
    // 保存処理などをここに実装
    setIsSuccessModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsSuccessModalOpen(false);
    router.push('/search');
  };

  const handleSpecSubmit = () => {
    console.log('仕様登録 clicked:', formData);
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  const handleSpecChange = () => {
    console.log('仕様変更 clicked');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      const newImages = imageFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8e8e8] p-4 font-sans">
      <div className="mx-auto max-w-6xl bg-white rounded-lg shadow-lg">
        {/* タイトルバー */}
        <div className="bg-[#6487AF] px-4 py-3 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Link href="/" className="hover:bg-white/20 p-1 rounded transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-base">📋</span>
            <span>表題欄記入</span>
          </div>
          <div className="bg-white/90 px-3 py-1 text-xs text-[#6487AF] font-semibold rounded">
            登録画面
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="p-4 space-y-4">
          {/* 第1行: 図番、図面種類 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 text-sm whitespace-nowrap">図番:</label>
              <input
                type="text"
                value={formData.drawingNumber}
                onChange={(e) => setFormData({ ...formData, drawingNumber: e.target.value })}
                className="flex-1 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 text-sm whitespace-nowrap">図面種類:</label>
              <select
                value={formData.drawingType}
                onChange={(e) => setFormData({ ...formData, drawingType: e.target.value })}
                className="flex-1 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
              >
                <option>F:確認図面</option>
                <option>A:承認図面</option>
                <option>B:施工図面</option>
              </select>
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


          {/* 第5行: 機種、大きさ、壁仕様 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 text-sm whitespace-nowrap">機種:</label>
              <select
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="flex-1 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
              >
                <option>KKS</option>
                <option>KKM</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 text-sm whitespace-nowrap">大きさ:</label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="flex-1 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
              >
                <option>8031</option>
                <option>9031</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 text-sm whitespace-nowrap">壁仕様:</label>
              <select
                value={formData.wallSpec}
                onChange={(e) => setFormData({ ...formData, wallSpec: e.target.value })}
                className="flex-1 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
              >
                <option>2019年10月改定</option>
                <option>2020年1月改定</option>
              </select>
            </div>
          </div>

          {/* 第6行: 尺度、作成年月日 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 text-sm whitespace-nowrap">尺度:</label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={formData.scale1}
                  onChange={(e) => setFormData({ ...formData, scale1: e.target.value })}
                  className="w-12 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                />
                <span className="text-black text-sm">/</span>
                <input
                  type="text"
                  value={formData.scale2}
                  onChange={(e) => setFormData({ ...formData, scale2: e.target.value })}
                  className="w-16 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 text-sm whitespace-nowrap">作成年月日:</label>
              <input
                type="text"
                value={formData.creationDate}
                onChange={(e) => setFormData({ ...formData, creationDate: e.target.value })}
                className="flex-1 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
              />
            </div>
          </div>

          {/* 第7行: 製図者 */}
          <div className="flex items-center gap-2">
            <label className="text-gray-700 text-sm whitespace-nowrap">製図者:</label>
            <select
              value={formData.drafter}
              onChange={(e) => setFormData({ ...formData, drafter: e.target.value })}
              className="w-64 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
            >
              <option>田中花子</option>
              <option>山田太郎</option>
            </select>
          </div>

          {/* 営業所、見積番号、受注番号 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 text-sm whitespace-nowrap">営業所:</label>
              <select
                value={formData.office}
                onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                className="flex-1 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
              >
                <option>相模原営業所</option>
                <option>東京営業所</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 text-sm whitespace-nowrap">見積番号:</label>
              <input
                type="text"
                value={formData.estimateNo}
                onChange={(e) => setFormData({ ...formData, estimateNo: e.target.value })}
                className="flex-1 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 text-sm whitespace-nowrap">受注番号:</label>
              <input
                type="text"
                value={formData.orderNo}
                onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
                className="flex-1 border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
              />
            </div>
          </div>

          {/* 注意書き */}
          <div className="text-red-700 text-sm">
            図番と図面種類は必ず入力してください。
          </div>

          {/* 仕様セクション（register2の内容） */}
          <div className="border-t-2 border-gray-300 pt-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">仕様</h2>
              <button
                onClick={handleSpecChange}
                className="px-6 py-1 bg-[#6487AF] text-white text-sm rounded hover:bg-[#5476a0] active:bg-[#4465a0] transition-colors"
              >
                仕様変更
              </button>
            </div>

            {/* 3列グリッドフォーム */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-3">
              {/* 左列 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-40 flex-shrink-0">間口切詰 左:</label>
                  <select
                    value={formData.spec間口切詰左}
                    onChange={(e) => setFormData({ ...formData, spec間口切詰左: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-40 flex-shrink-0">間口切詰 右:</label>
                  <select
                    value={formData.spec間口切詰右}
                    onChange={(e) => setFormData({ ...formData, spec間口切詰右: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-40 flex-shrink-0">間口切詰 中:</label>
                  <select
                    value={formData.spec間口切詰中}
                    onChange={(e) => setFormData({ ...formData, spec間口切詰中: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-40 flex-shrink-0">前柱中追加:</label>
                  <select
                    value={formData.spec前柱中追加}
                    onChange={(e) => setFormData({ ...formData, spec前柱中追加: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-40 flex-shrink-0">カスケード無し:</label>
                  <select
                    value={formData.specカスケード無し}
                    onChange={(e) => setFormData({ ...formData, specカスケード無し: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-40 flex-shrink-0">屋根の出寸法変更:</label>
                  <select
                    value={formData.spec屋根の出寸法変更}
                    onChange={(e) => setFormData({ ...formData, spec屋根の出寸法変更: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-40 flex-shrink-0">屋根断熱材変更:</label>
                  <select
                    value={formData.spec屋根断熱材変更}
                    onChange={(e) => setFormData({ ...formData, spec屋根断熱材変更: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-40 flex-shrink-0">屋根表面持出:</label>
                  <select
                    value={formData.spec屋根表面持出}
                    onChange={(e) => setFormData({ ...formData, spec屋根表面持出: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-40 flex-shrink-0">妻開放ラーメン構造:</label>
                  <select
                    value={formData.spec妻開放ラーメン構造}
                    onChange={(e) => setFormData({ ...formData, spec妻開放ラーメン構造: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-40 flex-shrink-0">特注シャッター下地:</label>
                  <select
                    value={formData.spec特注シャッター下地}
                    onChange={(e) => setFormData({ ...formData, spec特注シャッター下地: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>
              </div>

              {/* 中央列 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-32 flex-shrink-0">軒高切詰:</label>
                  <select
                    value={formData.spec軒高切詰}
                    onChange={(e) => setFormData({ ...formData, spec軒高切詰: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-32 flex-shrink-0">前入隅 左:</label>
                  <select
                    value={formData.spec前入隅左}
                    onChange={(e) => setFormData({ ...formData, spec前入隅左: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-32 flex-shrink-0">前入隅 右:</label>
                  <select
                    value={formData.spec前入隅右}
                    onChange={(e) => setFormData({ ...formData, spec前入隅右: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-32 flex-shrink-0">後入隅 左:</label>
                  <select
                    value={formData.spec後入隅左}
                    onChange={(e) => setFormData({ ...formData, spec後入隅左: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-32 flex-shrink-0">後入隅 右:</label>
                  <select
                    value={formData.spec後入隅右}
                    onChange={(e) => setFormData({ ...formData, spec後入隅右: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-32 flex-shrink-0">積雪補強仕様:</label>
                  <select
                    value={formData.spec積雪補強仕様}
                    onChange={(e) => setFormData({ ...formData, spec積雪補強仕様: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-32 flex-shrink-0">前出隅 左:</label>
                  <select
                    value={formData.spec前出隅左}
                    onChange={(e) => setFormData({ ...formData, spec前出隅左: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-32 flex-shrink-0">前出隅 右:</label>
                  <select
                    value={formData.spec前出隅右}
                    onChange={(e) => setFormData({ ...formData, spec前出隅右: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-32 flex-shrink-0">後出隅 左:</label>
                  <select
                    value={formData.spec後出隅左}
                    onChange={(e) => setFormData({ ...formData, spec後出隅左: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-32 flex-shrink-0">後出隅 右:</label>
                  <select
                    value={formData.spec後出隅右}
                    onChange={(e) => setFormData({ ...formData, spec後出隅右: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>
              </div>

              {/* 右列 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-36 flex-shrink-0">胴縁間隔変更:</label>
                  <select
                    value={formData.spec胴縁間隔変更}
                    onChange={(e) => setFormData({ ...formData, spec胴縁間隔変更: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-36 flex-shrink-0">長期地耐力:</label>
                  <select
                    value={formData.spec長期地耐力}
                    onChange={(e) => setFormData({ ...formData, spec長期地耐力: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-36 flex-shrink-0">水下シャッター下地:</label>
                  <select
                    value={formData.spec水下シャッター下地}
                    onChange={(e) => setFormData({ ...formData, spec水下シャッター下地: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-36 flex-shrink-0">間仕切:</label>
                  <select
                    value={formData.spec間仕切}
                    onChange={(e) => setFormData({ ...formData, spec間仕切: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-36 flex-shrink-0">前壁:</label>
                  <select
                    value={formData.spec前壁}
                    onChange={(e) => setFormData({ ...formData, spec前壁: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-36 flex-shrink-0">こりゃエエ蔵:</label>
                  <select
                    value={formData.specこりゃエエ蔵}
                    onChange={(e) => setFormData({ ...formData, specこりゃエエ蔵: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 text-sm whitespace-nowrap w-36 flex-shrink-0">その他:</label>
                  <select
                    value={formData.specその他}
                    onChange={(e) => setFormData({ ...formData, specその他: e.target.value })}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#6487AF] focus:border-transparent"
                  >
                    <option value=""></option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 画像アップロードセクション */}
          <div className="border-t-2 border-gray-300 pt-6 mt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">画像アップロード</h2>

            <div className="space-y-4">
              {/* アップロードエリア */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-[#6487AF] bg-blue-50'
                    : 'border-gray-300 hover:border-[#6487AF] hover:bg-gray-50'
                }`}
              >
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 text-sm">
                  {isDragging ? '画像をドロップしてください' : 'クリックまたはドラッグ&ドロップで画像を選択'}
                </p>
                <p className="text-gray-400 text-xs mt-1">PNG, JPG, GIF形式に対応</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* アップロードされた画像のプレビュー */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={image.preview}
                          alt={`アップロード画像 ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-gray-500 mt-1 truncate">{image.file.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ボタン */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="px-8 py-2 bg-[#6487AF] text-white text-sm font-bold rounded-md hover:bg-[#5476a0] active:bg-[#4465a0] transition-colors shadow-sm"
            >
              OK
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>

      {/* 登録完了モーダル */}
      {isSuccessModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* モーダルタイトルバー */}
            <div className="bg-[#6487AF] px-4 py-3 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>登録完了</span>
              </div>
            </div>

            {/* モーダルコンテンツ */}
            <div className="p-6 text-center">
              <div className="mb-4">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">登録が完了しました</h3>
              <p className="text-gray-600 text-sm mb-6">
                図面情報が正常に登録されました。
              </p>
              <button
                onClick={handleModalConfirm}
                className="w-full px-6 py-2 bg-[#6487AF] text-white text-sm font-semibold rounded-md hover:bg-[#5476a0] active:bg-[#4465a0] transition-colors"
              >
                検索画面へ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
