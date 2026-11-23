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
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { InternshipConfig, AppLanguage, FestivalEvent } from '../types/festival';
import { getInternshipInfo, saveInternshipInfo } from '../data/internshipInfo';
import { LEGAL_DISCLAIMER, AUTHORITATIVE_SOURCES } from '../data/legalReferences';
import { FESTIVALS_DATA } from '../data/festivalsData';
import { getTranslation } from '../utils/i18n';
import { isValidPublicUrl } from '../utils/urlValidator';

interface AboutViewProps {
  lang?: AppLanguage;
  events?: FestivalEvent[];
}

export const AboutView: React.FC<AboutViewProps> = ({ lang = 'vi', events = FESTIVALS_DATA }) => {
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
            ? `Nền tảng mở (không cần đăng nhập) hỗ trợ tra cứu lịch Âm - Dương và thông tin văn hóa cho ${events.length} lễ hội, phong tục và sự kiện lịch sử tiêu biểu tại Việt Nam.`
            : `An open public portal (no login required) for researching Lunar-Solar schedules and cultural heritage for ${events.length} digitized Vietnamese festivals, customs, and historical events.`}
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
              <span>{lang === 'vi' ? 'Đơn vị đào tạo:' : 'Institution:'} <strong>FPT Polytechnic</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-amber-200">
              <Building2 className="w-4 h-4 text-red-700 shrink-0" />
              <span>{lang === 'vi' ? 'Doanh nghiệp hướng dẫn:' : 'Partner Company:'} <strong>IMTA TECH</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-amber-200">
              <Calendar className="w-4 h-4 text-red-700 shrink-0" />
              <span>{lang === 'vi' ? 'Thời gian:' : 'Cohort:'} <strong>{lang === 'vi' ? 'Đợt 15 (Năm 2026)' : 'Batch 15 (2026)'}</strong></span>
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
            <span>{lang === 'vi' ? 'Mục Nguồn Dữ Liệu Chính Thống' : 'Official Data Sources'}</span>
          </div>
          <ul className="text-xs sm:text-sm text-stone-700 space-y-2 leading-relaxed">
            {AUTHORITATIVE_SOURCES.map((src) => (
              <li key={src.id} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>{lang === 'en' ? src.nameEn : src.name}</strong> ({src.organization})
                  {isValidPublicUrl(src.url) && (
                    <>
                      {' — '}
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-red-800 font-semibold hover:underline"
                      >
                        <span>{src.url}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
            <Code2 className="w-5 h-5" />
            <span>{lang === 'vi' ? 'Thuật Toán Quy Đổi & Địa Danh 2025' : 'Astronomical Engine & 2025 Geography'}</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {lang === 'vi'
              ? 'Hệ thống áp dụng thuật toán tính Âm lịch Việt Nam chuẩn múi giờ GMT+7 của nhà toán học Hồ Ngọc Đức dựa trên công thức cơ học thiên văn của Jean Meeus. Địa danh các tỉnh/thành đã được rà soát theo Nghị quyết 202/2025/QH15 (34 đơn vị cấp tỉnh, mô hình chính quyền 2 cấp) và ghi chú song song tên gọi trước sáp nhập.'
              : 'Uses Dr. Ho Ngoc Duc’s GMT+7 Vietnamese Lunar-Solar astronomical calculation based on Jean Meeus’s formulas. Provincial names follow Vietnam’s 2025 reorganization (Resolution 202/2025/QH15) with former names clearly preserved.'}
          </p>
        </div>
      </div>

      {/* Truthfulness & Beneficiary Transparency Disclosure */}
      <section className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
          <Globe className="w-5 h-5" />
          <h2 className="text-base font-black text-stone-900 font-serif">
            {lang === 'vi'
              ? 'Minh bạch Số liệu & Đối tượng Thụ hưởng'
              : 'Truthful Scope & Beneficiary Disclosure'}
          </h2>
        </div>
        <ul className="text-xs sm:text-sm text-stone-700 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              {lang === 'vi'
                ? `Quy mô dữ liệu thực tế hiện tại: ${events.length} sự kiện văn hóa/lịch sử tiêu biểu thuộc ${new Set(events.map((e) => e.province)).size} tỉnh/khu vực (trong đó có ${events.filter((e) => e.unescoRecognized).length} di sản UNESCO).`
                : `Current digitized dataset: ${events.length} cultural and historical events across ${new Set(events.map((e) => e.province)).size} provinces/areas (including ${events.filter((e) => e.unescoRecognized).length} UNESCO-recognized items).`}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              {lang === 'vi'
                ? 'Đối tượng thụ hưởng & trạng thái triển khai: Ứng dụng mở công khai miễn phí phục vụ cộng đồng, du khách, người cao tuổi/khiếm thị (hỗ trợ trợ năng đọc to và chữ lớn) và mục đích đánh giá thực tập; hiện là bản thử nghiệm nên không thống kê hay công bố số người thụ hưởng phóng đại.'
                : 'Beneficiaries & deployment status: Free public pilot serving general visitors, researchers, elderly/low-vision users (large text, high contrast, voice reader), and internship evaluation; currently a pilot release with no inflated beneficiary headcount claimed.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              {lang === 'vi'
                ? 'Quyền riêng tư & Thu thập dữ liệu: Ứng dụng mở công khai hoàn toàn, không yêu cầu đăng nhập và không gửi dữ liệu cá nhân về máy chủ. Nếu người dùng tự nguyện nhập tên hiển thị, email hoặc số điện thoại ở mục Hồ sơ / Cộng đồng, thông tin chỉ lưu cục bộ trên trình duyệt nhằm giữ tùy chọn cá nhân hoặc điền sẵn tên tác giả và có thể xóa bất cứ lúc nào.'
                : 'Privacy & Data Collection Disclosure: Public open access with no login or server-side personal data collection. Optional profile fields (name, email, phone) are stored solely in your local browser to retain preferences or prefill story authorship and can be cleared anytime.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              {lang === 'vi'
                ? 'Lưu ý nội dung do Gemini AI tạo: Toàn bộ yêu cầu AI đi qua máy chủ ứng dụng (/api/gemini/cultural-guide) mà không lộ khóa API trên trình duyệt; mọi câu trả lời đều tách bạch phần đã đối chiếu hồ sơ di sản của cổng và phần mở rộng chưa kiểm chứng thủ công.'
                : 'Gemini AI Content Review: All AI requests route securely via the backend server (/api/gemini/cultural-guide) with zero client API key exposure, and explicitly label reviewed portal context versus unverified AI-generated extensions.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              {lang === 'vi'
                ? 'Đạo đức tư liệu, bản quyền ảnh/âm thanh & quyền riêng tư: Toàn bộ ảnh dùng ảnh chụp thật có giấy phép mở Pexels kèm số ID nguồn (không dùng ảnh AI giả làm di tích/hiện vật/nghệ nhân thật); âm thanh đọc to tổng hợp cục bộ qua Web Speech API; biểu mẫu cộng đồng yêu cầu cam kết giữ kín phần người giữ tư liệu dặn không công bố và không đăng thông tin riêng người khác.'
                : 'Media & Custodial Ethics: All imagery uses real Pexels-licensed photography with explicit photo IDs (zero AI images depicting real monuments, artifacts, or artisans), audio relies on local browser Web Speech API, and submissions require custodian non-disclosure and third-party privacy consent.'}
            </span>
          </li>
        </ul>
      </section>

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
