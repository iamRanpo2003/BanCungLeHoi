import { CommunityStory } from '../types/festival';

export const INITIAL_STORIES: CommunityStory[] = [
  {
    id: 'story-1',
    title: 'Ký sự trẩy hội Đền Hùng: Xúc động lễ rước kiệu của 7 xã vùng ven núi Nghĩa Lĩnh',
    authorName: 'Nguyễn Thanh Tùng',
    authorRole: 'Nhà nghiên cứu văn hóa dân gian',
    festivalId: 'gio-to-hung-vuong',
    festivalName: 'Giỗ Tổ Hùng Vương - Lễ hội Đền Hùng',
    province: 'Phú Thọ',
    ethnicGroup: 'Kinh',
    content:
      'Hàng năm, từ sáng tinh mơ ngày mùng 8 tháng 3 Âm lịch, các làng Tiên Kiên, Chu Hóa, Hùng Lô, Kim Đức... đồng loạt rước kiệu về Đền Hùng. Từng đoàn kiệu sơn son thiếp vàng, cờ ngũ sắc rợp trời cùng dàn nhạc bát âm réo rắt. Người dân hai bên đường thành kính chắp tay đón đoàn rước. Đây không chỉ là nghi thức phụng nghinh mà còn là biểu tượng gắn kết cộng đồng làng xã ngàn đời nay.',
    images: [
      'https://images.unsplash.com/photo-1599837565318-67429bde7162?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'approved',
    submittedAt: '2026-04-12T08:30:00Z',
    likes: 142,
    tags: ['Đền Hùng', 'Rước kiệu', 'Nghi thức', 'Phú Thọ'],
    sourceReference: 'Tài liệu điền dã di sản văn hóa phi vật thể vùng đất Tổ (Viện Văn hóa Nghệ thuật)',
  },
  {
    id: 'story-2',
    title: 'Huyền thoại kèn Saranai và tiếng trống Paranưng trong mùa Katê Ninh Thuận',
    authorName: 'Trương Thị Mai Linh',
    authorRole: 'Du khách trẩy hội',
    festivalId: 'le-hoi-kate-dong-bao-cham',
    festivalName: 'Lễ hội Katê của đồng bào Chăm',
    province: 'Ninh Thuận',
    ethnicGroup: 'Chăm',
    content:
      'Lần đầu tiên được hòa mình vào dòng người trẩy hội Katê tại tháp Po Klong Garai. Tiếng kèn Saranai réo rắt quyện cùng nhịp trống Paranưng trầm hùng như rung chuyển cả đồi Trầu. Điệu múa quạt tha thướt của các thiếu nữ Chăm trong tà áo dài thổ cẩm thật mê hoặc. Người dân địa phương đón tiếp du khách bằng lòng hiếu khách chân tình và những đĩa bánh gừng vàng ươm thơm lừng.',
    images: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'approved',
    submittedAt: '2026-10-05T14:15:00Z',
    likes: 89,
    tags: ['Katê', 'Người Chăm', 'Tháp Po Klong Garai', 'Ninh Thuận'],
    sourceReference: 'Ghi chép trải nghiệm thực tế mùa hội Katê 2026',
  },
  {
    id: 'story-3',
    title: 'Khám phá tục cúng Bến nước cổ truyền của người Ê Đê bên dòng Sêrêpôk',
    authorName: 'Y Krông Niê',
    authorRole: 'Người dân địa phương',
    festivalId: 'khong-gian-van-hoa-cong-chieng-tay-nguyen',
    festivalName: 'Không gian Văn hóa Cồng chiêng Tây Nguyên',
    province: 'Đắk Lắk',
    ethnicGroup: 'Ê Đê',
    content:
      'Lễ cúng Bến nước (K’pơh) là một trong những phong tục lâu đời nhất của buôn làng chúng tôi. Sau mùa thu hoạch lúa rẫy, già làng họp bà con nạo vét bến nước, sửa máng tre dẫn nước ngọt từ rừng sâu về. Khi tiếng cồng chiêng ngân vang, thầy cúng dâng ché rượu cần và tiết gà tạ ơn Thần Nước (Yang Ea), cầu mong buôn làng ấm no, nước nguồn không bao giờ cạn.',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'pending',
    submittedAt: '2026-10-17T09:20:00Z',
    likes: 24,
    tags: ['Cúng bến nước', 'Người Ê Đê', 'Tây Nguyên', 'Buôn Ma Thuột'],
    sourceReference: 'Gia phả buôn Ako Dhông, TP. Buôn Ma Thuột',
  },
  {
    id: 'story-4',
    title: 'Đêm Cúng Trăng lung linh trên sông Maspero và giải đua ghe Ngo cuồng nhiệt',
    authorName: 'Thạch Sanh Sóc Trăng',
    authorRole: 'Người dân địa phương',
    festivalId: 'le-hoi-ok-om-bok-dua-ghe-ngo',
    festivalName: 'Lễ hội Ok Om Bok và Đua ghe Ngo',
    province: 'Sóc Trăng',
    ethnicGroup: 'Khmer Nam Bộ',
    content:
      'Không khí đôi bờ sông Maspero những ngày diễn ra giải đua ghe Ngo thật không bút nào tả xiết. Tiếng còi, tiếng trống giục giã, hàng vạn người reo hò cổ vũ theo từng nhịp chèo dũng mãnh. Đêm xuống, cả dòng sông lại bừng sáng bởi hàng ngàn chiếc đèn nước hoa đăng lấp lánh trôi nhẹ theo dòng nước, mang theo ước vọng bình an của đồng bào Khmer.',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'approved',
    submittedAt: '2026-10-15T19:40:00Z',
    likes: 112,
    tags: ['Ok Om Bok', 'Đua ghe Ngo', 'Khmer', 'Sóc Trăng'],
    sourceReference: 'Ban quản trị Chùa Kh’leang Sóc Trăng',
  },
];

const STORIES_STORAGE_KEY = 'bancunglehoi_community_stories';

export function getStoredStories(): CommunityStory[] {
  try {
    const raw = localStorage.getItem(STORIES_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return INITIAL_STORIES;
}

export function saveStory(story: Omit<CommunityStory, 'id' | 'submittedAt' | 'likes' | 'status'>): CommunityStory {
  const current = getStoredStories();
  const newStory: CommunityStory = {
    ...story,
    id: `story-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    likes: 0,
    status: 'pending', // Cần kiểm duyệt theo quy định
  };
  const updated = [newStory, ...current];
  try {
    localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return newStory;
}

export function updateStoryStatus(
  storyId: string,
  status: 'approved' | 'rejected',
  rejectionReason?: string
): void {
  const current = getStoredStories();
  const updated = current.map((s) => {
    if (s.id === storyId) {
      return { ...s, status, rejectionReason };
    }
    return s;
  });
  try {
    localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function likeStory(storyId: string): void {
  const current = getStoredStories();
  const updated = current.map((s) => {
    if (s.id === storyId) {
      return { ...s, likes: s.likes + 1 };
    }
    return s;
  });
  try {
    localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}
