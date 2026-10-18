import React, { useState } from 'react';
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
import { CommunityStory, FestivalEvent, UserProfile } from '../types/festival';
import { getStoredStories, saveStory, likeStory } from '../data/communityData';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';

interface CommunityStoriesViewProps {
  festivals: FestivalEvent[];
  user: UserProfile;
}

export const CommunityStoriesView: React.FC<CommunityStoriesViewProps> = ({ festivals, user }) => {
  const [stories, setStories] = useState<CommunityStory[]>(() => getStoredStories());
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'my' | 'pending'>('all');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState(user.fullName || 'Người yêu văn hóa');
  const [authorRole, setAuthorRole] = useState('Du khách trẩy hội');
  const [selectedFestivalId, setSelectedFestivalId] = useState(festivals[0]?.id || '');
  const [province, setProvince] = useState(festivals[0]?.province || 'Phú Thọ');
  const [ethnicGroup, setEthnicGroup] = useState('Kinh');
  const [content, setContent] = useState('');
  const [sourceReference, setSourceReference] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleLike = (storyId: string) => {
    likeStory(storyId);
    setStories(getStoredStories());
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenFest = festivals.find((f) => f.id === selectedFestivalId);
    saveStory({
      title,
      authorName,
      authorRole,
      festivalId: selectedFestivalId,
      festivalName: chosenFest ? chosenFest.name : 'Lễ hội dân gian địa phương',
      province: province || chosenFest?.province || 'Toàn quốc',
      ethnicGroup,
      content,
      images: imageUrl.trim()
        ? [imageUrl.trim()]
        : ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'],
      tags: [chosenFest?.province || 'Văn hóa', ethnicGroup, 'Cộng đồng'],
      sourceReference: sourceReference.trim() || 'Tư liệu điền dã dân gian của tác giả',
    });

    setStories(getStoredStories());
    setSubmitSuccess(true);
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
    // 'all' shows approved, plus user's own pending
    return s.status === 'approved' || s.authorName === user.fullName;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 font-sans">
              Khám Phá & Đóng Góp Cộng Đồng
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Không gian chia sẻ trải nghiệm trẩy hội, hình ảnh check-in và tư liệu lịch sử dân gian 54 dân tộc
          </p>
        </div>

        <button
          onClick={() => setIsSubmitOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          <PenTool className="w-4 h-4" />
          <span>Đóng góp câu chuyện văn hóa</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            filterType === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Tất cả câu chuyện ({stories.filter((s) => s.status === 'approved').length})
        </button>
        <button
          onClick={() => setFilterType('my')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            filterType === 'my'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Bài viết của tôi
        </button>
        <button
          onClick={() => setFilterType('pending')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            filterType === 'pending'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Chờ kiểm duyệt ({stories.filter((s) => s.status === 'pending').length})
        </button>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedStories.map((story) => (
          <article
            key={story.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Image banner */}
              {story.images && story.images.length > 0 && (
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={story.images[0]}
                    alt={story.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute top-3 right-3">
                    {story.status === 'approved' ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                        <CheckCircle2 className="w-3 h-3" /> Đã kiểm duyệt chính thức
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-xs">
                        <Clock className="w-3 h-3" /> Chờ Ban Quản Trị duyệt
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                    {story.festivalName}
                  </div>
                </div>
              )}

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{story.authorName}</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold">
                      {story.authorRole}
                    </span>
                  </div>
                  <span>{new Date(story.submittedAt).toLocaleDateString('vi-VN')}</span>
                </div>

                <h2 className="text-lg font-black text-slate-900 font-sans leading-snug">
                  {story.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-4">
                  {story.content}
                </p>

                {story.sourceReference && (
                  <div className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    Nguồn tư liệu tham khảo: <strong>{story.sourceReference}</strong>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex flex-wrap gap-1">
                {story.tags.map((t) => (
                  <span key={t} className="text-[10px] text-slate-500 flex items-center gap-0.5">
                    <Tag className="w-2.5 h-2.5" /> {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleLike(story.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 font-bold text-xs transition cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>{story.likes} Yêu thích</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Crowdsourcing Submission Modal */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white relative">
              <button
                onClick={() => setIsSubmitOpen(false)}
                className="absolute top-4 right-4 p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Cơ chế đóng góp cộng đồng (Crowdsourcing)
                </span>
              </div>
              <h2 className="text-2xl font-bold font-sans">
                Đóng Góp Tư Liệu Lịch Sử & Check-in Lễ Hội
              </h2>
              <p className="text-xs text-blue-100 mt-1">
                Bài viết sẽ được Ban Quản Trị đối chiếu với tài liệu chính thống và phê duyệt công khai
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Đã gửi bài đóng góp thành công!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Cảm ơn bạn đã chung tay bảo tồn di sản văn hóa 54 dân tộc. Bài viết của bạn đã được đưa vào hàng đợi kiểm duyệt CMS.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitStory} className="p-6 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tiêu đề bài viết / câu chuyện
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ví dụ: Lễ rước kiệu làng tôi và tục hát then đêm rằm..."
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Họ và tên người đóng góp
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Tư cách người đóng góp
                    </label>
                    <select
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                    >
                      <option value="Du khách trẩy hội">Du khách trẩy hội</option>
                      <option value="Nhà nghiên cứu văn hóa dân gian">Nhà nghiên cứu văn hóa dân gian</option>
                      <option value="Người dân địa phương">Người dân địa phương</option>
                      <option value="Ban quản lý di tích">Ban quản lý di tích</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Lễ hội liên quan
                    </label>
                    <select
                      value={selectedFestivalId}
                      onChange={(e) => {
                        setSelectedFestivalId(e.target.value);
                        const found = festivals.find((f) => f.id === e.target.value);
                        if (found) setProvince(found.province);
                      }}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                    >
                      {festivals.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Tỉnh thành
                    </label>
                    <input
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Dân tộc
                    </label>
                    <input
                      type="text"
                      value={ethnicGroup}
                      onChange={(e) => setEthnicGroup(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nội dung chia sẻ / Tư liệu lịch sử
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Mô tả chi tiết nghi thức, trải nghiệm không gian lễ hội, giai thoại lịch sử..."
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nguồn tư liệu căn cứ / Sách tham khảo
                  </label>
                  <input
                    type="text"
                    value={sourceReference}
                    onChange={(e) => setSourceReference(e.target.value)}
                    placeholder="Ví dụ: Địa chí địa phương, lời kể các cụ cao niên, sách Lịch sử Đảng bộ..."
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Đường dẫn hình ảnh minh họa (URL)
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitOpen(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Gửi kiểm duyệt
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Mandatory Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-950 text-xs leading-relaxed flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Lưu ý: </strong>
          {LEGAL_DISCLAIMER}
        </p>
      </div>
    </div>
  );
};
