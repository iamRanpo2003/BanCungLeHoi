import React, { useState } from 'react';
import {
  ShieldCheck,
  GraduationCap,
  Building2,
  Calendar,
  Code2,
  CheckCircle2,
  Edit2,
  Check,
  Info,
  Database,
  Globe,
} from 'lucide-react';
import { InternshipConfig } from '../types/festival';
import { getInternshipInfo, saveInternshipInfo } from '../data/internshipInfo';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';

export const AboutView: React.FC = () => {
  const [internship, setInternship] = useState<InternshipConfig>(() => getInternshipInfo());
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(internship.studentName);
  const [editId, setEditId] = useState(internship.studentId);
  const [editGroup, setEditGroup] = useState(internship.groupNumber);
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveInternshipInfo({
      studentName: editName.trim() || 'Nguyễn Văn Hải',
      studentId: editId.trim() || 'PK02752',
      groupNumber: editGroup.trim() || 'Nhóm 03',
    });
    setInternship(updated);
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>Báo cáo dự án thực tập tốt nghiệp</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans leading-tight">
          Về Dự Án Bancunglehoi
        </h1>
        <p className="text-xs sm:text-base text-blue-100 max-w-2xl leading-relaxed">
          Nền tảng tra cứu lịch lễ hội truyền thống toàn quốc, bảo tồn và lan tỏa giá trị văn hóa 54 dân tộc Việt Nam với độ chính xác cao về thiên văn học và pháp lý.
        </p>
      </div>

      {/* Mandatory Internship Declaration Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-300 shadow-md space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-blue-50 text-blue-700">
              <GraduationCap className="w-6 h-6" />
            </span>
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                Thông tin bản quyền & Công nhận thực tập
              </span>
              <h2 className="text-xl font-black text-slate-900 font-sans">
                Xác Nhận Sản Phẩm Thực Tập Sinh
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Đóng chỉnh sửa' : 'Chỉnh sửa thông tin thực tập sinh'}</span>
          </button>
        </div>

        {saveToast && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" /> Đã cập nhật thông tin sinh viên thành công!
          </div>
        )}

        {/* The Exact Mandatory Phrasing */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-6 rounded-2xl border border-blue-200 text-slate-900 leading-relaxed space-y-3">
          <p className="text-base sm:text-lg font-bold text-blue-950 font-sans">
            Sản phẩm thực tập của{' '}
            <span className="text-blue-700 underline decoration-blue-400 decoration-2 font-extrabold">
              {internship.studentName}
            </span>
            , mã sinh viên{' '}
            <span className="text-blue-700 underline decoration-blue-400 decoration-2 font-extrabold font-mono">
              {internship.studentId}
            </span>
            ,{' '}
            <span className="text-blue-700 underline decoration-blue-400 decoration-2 font-extrabold">
              {internship.groupNumber}
            </span>
            , {internship.program}{' '}
            <span className="font-extrabold text-slate-900">
              {internship.school}
            </span>{' '}
            và{' '}
            <span className="font-extrabold text-slate-900">
              {internship.partnerCompany}
            </span>
            .
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-blue-100">
              <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Đơn vị đào tạo: <strong>FPT Polytechnic</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-blue-100">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Doanh nghiệp hướng dẫn: <strong>IMTA TECH</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-blue-100">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Thời gian: <strong>Đợt 15 (Năm 2026)</strong></span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSaveInfo} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 uppercase">Cập nhật thông tin nộp báo cáo:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Họ và tên thực tập sinh</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-white px-3 py-2 border border-slate-200 rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Mã sinh viên [MSV]</label>
                <input
                  type="text"
                  required
                  value={editId}
                  onChange={(e) => setEditId(e.target.value)}
                  className="w-full bg-white px-3 py-2 border border-slate-200 rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nhóm [số nhóm]</label>
                <input
                  type="text"
                  required
                  value={editGroup}
                  onChange={(e) => setEditGroup(e.target.value)}
                  className="w-full bg-white px-3 py-2 border border-slate-200 rounded-xl font-bold"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 font-bold"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs"
              >
                Lưu vào hệ thống
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Project Architecture & Methodology */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
            <Database className="w-5 h-5" />
            <span>Nguồn Dữ Liệu Chính Thống</span>
          </div>
          <ul className="text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Cơ sở dữ liệu Nhà nước:</strong> Danh mục Di sản văn hóa phi vật thể Quốc gia do Bộ Văn hóa, Thể thao và Du lịch công bố.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Cơ sở dữ liệu Địa phương:</strong> Hồ sơ khoa học từ các Sở VHTTDL tỉnh thành và Ban quản lý di tích lịch sử - văn hóa.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Cộng đồng & Điền dã:</strong> Tư liệu trải nghiệm, hình ảnh check-in và câu chuyện văn hóa đã qua quy trình kiểm duyệt CMS.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
            <Code2 className="w-5 h-5" />
            <span>Thuật Toán Quy Đổi Âm - Dương Lịch</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Hệ thống áp dụng thuật toán tính Âm lịch Việt Nam chuẩn múi giờ GMT+7 của nhà toán học Hồ Ngọc Đức dựa trên công thức cơ học thiên văn của Jean Meeus. Tự động quy đổi các ngày lễ âm lịch truyền thống sang ngày dương lịch tương ứng theo từng năm, bảo đảm tuyệt đối tính chính xác khi hiển thị trên lịch điện tử.
          </p>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
        <Info className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-extrabold text-sm text-amber-900 uppercase tracking-wider mb-1">
            Khuyến cáo pháp lý bắt buộc:
          </h2>
          <p>{LEGAL_DISCLAIMER}</p>
        </div>
      </div>
    </div>
  );
};
