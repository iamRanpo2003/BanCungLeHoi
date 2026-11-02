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
  Award,
} from 'lucide-react';
import { InternshipConfig, AppLanguage } from '../types/festival';
import { getInternshipInfo, saveInternshipInfo } from '../data/internshipInfo';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';
import { getTranslation } from '../utils/i18n';

interface AboutViewProps {
  lang?: AppLanguage;
}

export const AboutView: React.FC<AboutViewProps> = ({ lang = 'vi' }) => {
  const [internship, setInternship] = useState<InternshipConfig>(() => getInternshipInfo());
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(internship.studentName);
  const [editId, setEditId] = useState(internship.studentId);
  const [editGroup, setEditGroup] = useState(internship.groupNumber);
  const [saveToast, setSaveToast] = useState(false);

  const t = getTranslation(lang);

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveInternshipInfo({
      studentName: editName.trim() || 'Nguyễn Viết Hải',
      studentId: editId.trim() || 'PH63500',
      groupNumber: editGroup.trim() || 'Nhóm 01',
    });
    setInternship(updated);
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="heritage-gradient-bar text-amber-50 p-6 sm:p-10 rounded-3xl shadow-xl space-y-4 border border-amber-600/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-amber-300" />
          <span>{lang === 'vi' ? 'Báo cáo dự án thực tập tốt nghiệp' : 'Graduation Internship Project Report'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-serif leading-tight">
          {lang === 'vi' ? 'Về Dự Án Bancunglehoi' : 'About Bancunglehoi Project'}
        </h1>
        <p className="text-xs sm:text-base text-amber-100 max-w-2xl leading-relaxed">
          {lang === 'vi'
            ? 'Nền tảng tra cứu lịch lễ hội truyền thống toàn quốc, bảo tồn và lan tỏa giá trị văn hóa 54 dân tộc Việt Nam với độ chính xác cao về thiên văn học và pháp lý.'
            : 'A national portal for researching traditional festivals, preserving and sharing cultural values of the 54 ethnic groups of Vietnam with astronomical and legal precision.'}
        </p>
      </div>

      {/* Mandatory Internship Declaration Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-red-700/60 shadow-md space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-red-50 text-red-700">
              <GraduationCap className="w-6 h-6" />
            </span>
            <div>
              <span className="text-xs font-bold text-red-800 uppercase tracking-wider block">
                {lang === 'vi' ? 'Thông tin bản quyền & Công nhận thực tập' : 'Copyright & Internship Accreditation'}
              </span>
              <h2 className="text-xl font-black text-stone-900 font-serif">
                {lang === 'vi' ? 'Xác Nhận Sản Phẩm Thực Tập Sinh' : 'Internship Accreditation Certificate'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-800 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? (lang === 'vi' ? 'Đóng chỉnh sửa' : 'Close editing') : (lang === 'vi' ? 'Chỉnh sửa thông tin thực tập sinh' : 'Edit intern credentials')}</span>
          </button>
        </div>

        {saveToast && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'vi' ? 'Đã cập nhật thông tin sinh viên thành công!' : 'Student credentials updated successfully!'}</span>
          </div>
        )}

        {/* The Exact Mandatory Accreditation Phrasing */}
        <div className="bg-gradient-to-r from-amber-50 to-red-50/50 p-6 rounded-2xl border border-amber-300 text-stone-900 leading-relaxed space-y-3">
          <p className="text-base sm:text-lg font-bold text-red-950 font-serif">
            {lang === 'vi' ? (
              <>
                Sản phẩm thực tập của{' '}
                <span className="text-red-800 underline decoration-amber-500 decoration-2 font-extrabold">
                  {internship.studentName}
                </span>
                , mã sinh viên{' '}
                <span className="text-red-800 underline decoration-amber-500 decoration-2 font-extrabold font-mono">
                  {internship.studentId}
                </span>
                ,{' '}
                <span className="text-red-800 underline decoration-amber-500 decoration-2 font-extrabold">
                  {internship.groupNumber}
                </span>
                , {internship.program}{' '}
                <span className="font-extrabold text-stone-950">
                  {internship.school}
                </span>{' '}
                và{' '}
                <span className="font-extrabold text-stone-950">
                  {internship.partnerCompany}
                </span>
                .
              </>
            ) : (
              <>
                Internship project of{' '}
                <span className="text-red-800 underline decoration-amber-500 decoration-2 font-extrabold">
                  {internship.studentName}
                </span>
                , student ID{' '}
                <span className="text-red-800 underline decoration-amber-500 decoration-2 font-extrabold font-mono">
                  {internship.studentId}
                </span>
                ,{' '}
                <span className="text-red-800 underline decoration-amber-500 decoration-2 font-extrabold">
                  {internship.groupNumber}
                </span>
                , {internship.program}{' '}
                <span className="font-extrabold text-stone-950">
                  {internship.school}
                </span>{' '}
                and{' '}
                <span className="font-extrabold text-stone-950">
                  {internship.partnerCompany}
                </span>
                .
              </>
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-700">
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-amber-200">
              <GraduationCap className="w-4 h-4 text-red-700 shrink-0" />
              <span>Đơn vị đào tạo: <strong>FPT Polytechnic</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-amber-200">
              <Building2 className="w-4 h-4 text-red-700 shrink-0" />
              <span>Doanh nghiệp hướng dẫn: <strong>IMTA TECH</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-amber-200">
              <Calendar className="w-4 h-4 text-red-700 shrink-0" />
              <span>Thời gian: <strong>Đợt 15 (Năm 2026)</strong></span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSaveInfo} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3 text-xs">
            <h4 className="font-bold text-stone-800 uppercase">Cập nhật thông tin nộp báo cáo:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Họ và tên thực tập sinh</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-white px-3 py-2 border border-stone-200 rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Mã sinh viên [MSV]</label>
                <input
                  type="text"
                  required
                  value={editId}
                  onChange={(e) => setEditId(e.target.value)}
                  className="w-full bg-white px-3 py-2 border border-stone-200 rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Nhóm [số nhóm]</label>
                <input
                  type="text"
                  required
                  value={editGroup}
                  onChange={(e) => setEditGroup(e.target.value)}
                  className="w-full bg-white px-3 py-2 border border-stone-200 rounded-xl font-bold"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 border border-stone-200 rounded-lg text-stone-600 font-bold"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg shadow-xs"
              >
                Lưu vào hệ thống
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Project Architecture & Methodology */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
            <Database className="w-5 h-5" />
            <span>{lang === 'vi' ? 'Nguồn Dữ Liệu Chính Thống' : 'Official Data Sources'}</span>
          </div>
          <ul className="text-xs sm:text-sm text-stone-700 space-y-2 leading-relaxed">
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

        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
            <Code2 className="w-5 h-5" />
            <span>{lang === 'vi' ? 'Thuật Toán Quy Đổi Âm - Dương Lịch' : 'Astronomical Lunar-Solar Engine'}</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Hệ thống áp dụng thuật toán tính Âm lịch Việt Nam chuẩn múi giờ GMT+7 của nhà toán học Hồ Ngọc Đức dựa trên công thức cơ học thiên văn của Jean Meeus. Tự động quy đổi các ngày lễ âm lịch truyền thống sang ngày dương lịch tương ứng theo từng năm, bảo đảm tuyệt đối tính chính xác khi hiển thị trên lịch điện tử.
          </p>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-5 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
        <Info className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-extrabold text-sm text-amber-900 uppercase tracking-wider mb-1">
            {lang === 'vi' ? 'Khuyến cáo pháp lý bắt buộc:' : 'Mandatory Legal Notice:'}
          </h2>
          <p>{LEGAL_DISCLAIMER}</p>
        </div>
      </div>
    </div>
  );
};
