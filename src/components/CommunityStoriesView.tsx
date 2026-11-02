import React, { useState, useEffect } from 'react';
import {
  Users,
  PenTool,
  Heart,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  Tag,
  Send,
  X,
  Plus,
} from 'lucide-react';
import { CommunityStory, FestivalEvent, UserProfile, AppLanguage } from '../types/festival';
import { getStoredStories, saveStory, likeStory } from '../data/communityData';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';
import {
  getSavedStoryDraft,
  saveStoryDraft,
  clearStoryDraft,
  StoryFormDraft,
} from '../utils/storage';
import { getTranslation } from '../utils/i18n';

interface CommunityStoriesViewProps {
  festivals: FestivalEvent[];
  user: UserProfile;
  lang?: AppLanguage;
}

export const CommunityStoriesView: React.FC<CommunityStoriesViewProps> = ({
  festivals,
  user,
  lang = 'vi',
}) => {
  const t = getTranslation(lang);
  const [stories, setStories] = useState<CommunityStory[]>(() => getStoredStories());
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'my' | 'pending'>('all');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize draft from LocalStorage persistence!
  const savedDraft = getSavedStoryDraft();
  const [title, setTitle] = useState(savedDraft.title || '');
  const [authorName, setAuthorName] = useState(
    savedDraft.authorName || user.fullName || (lang === 'vi' ? 'Người yêu văn hóa' : 'Cultural Enthusiast')
  );
  const [authorRole, setAuthorRole] = useState(
    savedDraft.authorRole || (lang === 'vi' ? 'Du khách trẩy hội' : 'Visitor')
  );
  const [selectedFestivalId, setSelectedFestivalId] = useState(
    savedDraft.festivalId || festivals[0]?.id || ''
  );
  const [province, setProvince] = useState(
    savedDraft.province || festivals[0]?.province || 'Phú Thọ'
  );
  const [ethnicGroup, setEthnicGroup] = useState(savedDraft.ethnicGroup || 'Kinh');
  const [content, setContent] = useState(savedDraft.content || '');
  const [sourceReference, setSourceReference] = useState(savedDraft.sourceReference || '');
  const [imageUrl, setImageUrl] = useState(savedDraft.imageUrl || '');

  // Auto-save form draft on every input change
  const handleDraftChange = (field: keyof StoryFormDraft, value: string) => {
    if (field === 'title') setTitle(value);
    if (field === 'authorName') setAuthorName(value);
    if (field === 'authorRole') setAuthorRole(value);
    if (field === 'festivalId') setSelectedFestivalId(value);
    if (field === 'province') setProvince(value);
    if (field === 'ethnicGroup') setEthnicGroup(value);
    if (field === 'content') setContent(value);
    if (field === 'sourceReference') setSourceReference(value);
    if (field === 'imageUrl') setImageUrl(value);

    saveStoryDraft({
      title: field === 'title' ? value : title,
      authorName: field === 'authorName' ? value : authorName,
      authorRole: field === 'authorRole' ? value : authorRole,
      festivalId: field === 'festivalId' ? value : selectedFestivalId,
      province: field === 'province' ? value : province,
      ethnicGroup: field === 'ethnicGroup' ? value : ethnicGroup,
      content: field === 'content' ? value : content,
      sourceReference: field === 'sourceReference' ? value : sourceReference,
      imageUrl: field === 'imageUrl' ? value : imageUrl,
    });
  };

  const handleLike = (storyId: string) => {
    likeStory(storyId);
    setStories(getStoredStories());
  };

  const isValidHttpUrl = (urlStr: string): boolean => {
    try {
      const parsed = new URL(urlStr);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenFest = festivals.find((f) => f.id === selectedFestivalId);
    const safeImage =
      imageUrl.trim() && isValidHttpUrl(imageUrl.trim())
        ? imageUrl.trim()
        : 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80';

    saveStory({
      title: title.trim(),
      authorName: authorName.trim(),
      authorRole,
      festivalId: selectedFestivalId,
      festivalName: chosenFest ? (lang === 'en' && chosenFest.en?.name ? chosenFest.en.name : chosenFest.name) : 'Lễ hội dân gian địa phương',
      province: province || chosenFest?.province || 'Toàn quốc',
      ethnicGroup,
      content: content.trim(),
      images: [safeImage],
      tags: [chosenFest?.province || 'Văn hóa', ethnicGroup, 'Cộng đồng'],
      sourceReference: sourceReference.trim() || 'Tư liệu điền dã dân gian của tác giả',
    });

    setStories(getStoredStories());
    setSubmitSuccess(true);
    clearStoryDraft();

    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitOpen(false);
      setTitle('');
      setContent('');
      setSourceReference('');
      setImageUrl('');
    }, 2000);
  };

  const displayedStories = stories.filter((s) => {
    if (filterType === 'pending') return s.status === 'pending';
    if (filterType === 'my') return s.authorName === user.fullName;
    return s.status === 'approved' || s.authorName === user.fullName;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-50 text-red-700">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-stone-900 font-serif">
              {t.community.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {t.community.subtitle}
          </p>
        </div>

        <button
          onClick={() => setIsSubmitOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-red-700/20 transition cursor-pointer"
        >
          <PenTool className="w-4 h-4" />
          <span>{t.community.contributeBtn}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            filterType === 'all'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
          }`}
        >
          {lang === 'vi' ? 'Tất cả câu chuyện' : 'All Stories'}
        </button>
        <button
          onClick={() => setFilterType('my')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            filterType === 'my'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
          }`}
        >
          {lang === 'vi' ? 'Bài viết của tôi' : 'My Contributions'}
        </button>
        {user.role === 'admin' && (
          <button
            onClick={() => setFilterType('pending')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              filterType === 'pending'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            {lang === 'vi' ? 'Đang chờ duyệt' : 'Pending Moderation'}
          </button>
        )}
      </div>

      {/* Submit Story Modal with draft persistence */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-red-700" />
                <h2 className="text-lg font-black text-stone-900 font-serif">
                  {t.community.contributeBtn}
                </h2>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-mono font-bold">
                  {lang === 'vi' ? 'Bản nháp tự lưu' : 'Auto-saved Draft'}
                </span>
              </div>
              <button
                onClick={() => setIsSubmitOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-emerald-950 text-base">
                  {lang === 'vi' ? 'Đã gửi câu chuyện thành công!' : 'Story submitted successfully!'}
                </h4>
                <p className="text-xs text-emerald-800">
                  {lang === 'vi'
                    ? 'Bài viết của bạn đã được lưu và đưa vào hàng chờ kiểm duyệt CMS trước khi hiển thị công khai.'
                    : 'Your story has been saved and queued for CMS editorial review before public display.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitStory} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Tiêu đề câu chuyện / Trải nghiệm *' : 'Story Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'vi' ? 'VD: Trải nghiệm lễ rước kiệu đền Hùng rực rỡ sắc màu' : 'e.g., Majestic procession at Hung King Temple'}
                    value={title}
                    onChange={(e) => handleDraftChange('title', e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">
                      {lang === 'vi' ? 'Tác giả chia sẻ' : 'Author Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => handleDraftChange('authorName', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">
                      {lang === 'vi' ? 'Vai trò / Góc nhìn' : 'Role / Perspective'}
                    </label>
                    <select
                      value={authorRole}
                      onChange={(e) => handleDraftChange('authorRole', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 font-semibold focus:outline-none focus:border-red-600"
                    >
                      <option value="Du khách trẩy hội">{lang === 'vi' ? 'Du khách trẩy hội' : 'Visitor'}</option>
                      <option value="Người dân bản địa">{lang === 'vi' ? 'Người dân bản địa' : 'Local Resident'}</option>
                      <option value="Nhà nghiên cứu văn hóa">{lang === 'vi' ? 'Nhà nghiên cứu văn hóa' : 'Cultural Researcher'}</option>
                      <option value="Nhiếp ảnh gia điền dã">{lang === 'vi' ? 'Nhiếp ảnh gia điền dã' : 'Field Photographer'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">
                      {lang === 'vi' ? 'Lễ hội liên quan' : 'Associated Festival'}
                    </label>
                    <select
                      value={selectedFestivalId}
                      onChange={(e) => handleDraftChange('festivalId', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-red-600"
                    >
                      {festivals.map((f) => (
                        <option key={f.id} value={f.id}>
                          {lang === 'en' && f.en?.name ? f.en.name : f.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">
                      {lang === 'vi' ? 'Tỉnh / Thành' : 'Province'}
                    </label>
                    <input
                      type="text"
                      value={province}
                      onChange={(e) => handleDraftChange('province', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">
                      {lang === 'vi' ? 'Dân tộc' : 'Ethnic Group'}
                    </label>
                    <input
                      type="text"
                      value={ethnicGroup}
                      onChange={(e) => handleDraftChange('ethnicGroup', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Nội dung chia sẻ & Cảm xúc trẩy hội *' : 'Story Content *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={lang === 'vi' ? 'Mô tả không khí, nghi lễ tâm đắc, món ăn truyền thống, điều cần chú ý khi tới tham quan...' : 'Describe the atmosphere, rituals, traditional food, or tips for visitors...'}
                    value={content}
                    onChange={(e) => handleDraftChange('content', e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 font-medium focus:outline-none focus:border-red-600 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Nguồn gốc tư liệu / Căn cứ điền dã' : 'Source / Fieldwork References'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'vi' ? 'VD: Ghi chép điền dã cá nhân tại bản làng, phỏng vấn nghệ nhân...' : 'e.g., Personal fieldwork notes, artisan interview...'}
                    value={sourceReference}
                    onChange={(e) => handleDraftChange('sourceReference', e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Link ảnh minh họa (tùy chọn)' : 'Illustration Image URL (Optional)'}
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={(e) => handleDraftChange('imageUrl', e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsSubmitOpen(false)}
                    className="px-4 py-2 border border-stone-200 text-stone-600 font-bold rounded-xl"
                  >
                    {lang === 'vi' ? 'Hủy bỏ' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shadow-xs"
                  >
                    {lang === 'vi' ? 'Gửi duyệt bài viết' : 'Submit for Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedStories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-3xl overflow-hidden border border-amber-200/80 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {story.images && story.images.length > 0 && (
                <div className="h-44 relative bg-stone-900">
                  <img
                    src={story.images[0]}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                    {story.festivalName}
                  </div>
                  {story.status === 'pending' && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded">
                      {lang === 'vi' ? 'Chờ kiểm duyệt' : 'Pending review'}
                    </div>
                  )}
                </div>
              )}

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>{story.province} • Dân tộc {story.ethnicGroup}</span>
                  <span>{story.submittedAt}</span>
                </div>

                <h3 className="font-extrabold text-base text-stone-900 font-serif leading-snug">
                  {story.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {story.content}
                </p>

                <div className="text-[11px] text-stone-400 italic">
                  {lang === 'vi' ? 'Nguồn: ' : 'Source: '} {story.sourceReference}
                </div>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-bold text-[10px]">
                  {story.authorName.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-stone-800 block text-[11px]">
                    {story.authorName}
                  </span>
                  <span className="text-[9px] text-stone-400">{story.authorRole}</span>
                </div>
              </div>

              <button
                onClick={() => handleLike(story.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition font-bold"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>{story.likes}</span>
              </button>
            </div>
          </div>
        ))}
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
