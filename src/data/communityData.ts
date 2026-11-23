import { CommunityStory } from '../types/festival';

export const INITIAL_STORIES: CommunityStory[] = [
  {
    id: 'story-sample-1',
    title: '[Mẫu minh họa] Tìm hiểu nghi thức rước kiệu vùng ven núi Nghĩa Lĩnh tại Lễ hội Đền Hùng',
    authorName: 'Biên tập tư liệu (Mẫu minh họa)',
    authorRole: 'Dữ liệu minh họa hệ thống',
    festivalId: 'gio-to-hung-vuong',
    festivalName: 'Giỗ Tổ Hùng Vương - Lễ hội Đền Hùng',
    province: 'Phú Thọ',
    ethnicGroup: 'Kinh',
    content:
      'Vào dịp đầu tháng 3 Âm lịch, các xã vùng ven khu di tích Đền Hùng tổ chức rước kiệu truyền thống về núi Nghĩa Lĩnh. Bài viết này là dữ liệu minh họa cấu trúc chia sẻ tư liệu lễ hội của hệ thống để người dùng tham khảo hoặc đóng góp trải nghiệm thực tế của mình.',
    images: [
      'https://images.pexels.com/photos/30732172/pexels-photo-30732172.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    status: 'approved',
    submittedAt: '2026-01-15T00:00:00Z',
    likes: 0,
    tags: ['Đền Hùng', 'Rước kiệu', 'Phú Thọ', 'Mẫu minh họa'],
    sourceReference: 'Tư liệu tham khảo tổng hợp phục vụ minh họa giao diện',
    isSample: true,
  },
  {
    id: 'story-sample-2',
    title: '[Mẫu minh họa] Tìm hiểu âm nhạc kèn Saranai và trống Paranưng trong Lễ hội Katê',
    authorName: 'Biên tập tư liệu (Mẫu minh họa)',
    authorRole: 'Dữ liệu minh họa hệ thống',
    festivalId: 'le-hoi-kate-dong-bao-cham',
    festivalName: 'Lễ hội Katê của đồng bào Chăm',
    province: 'Khánh Hòa (trước 2025: Ninh Thuận)',
    ethnicGroup: 'Chăm',
    content:
      'Tại tháp Po Klong Garai (tỉnh Ninh Thuận cũ, nay thuộc tỉnh Khánh Hòa sau sắp xếp hành chính năm 2025), lễ hội Katê của đồng bào Chăm gắn liền với tiếng kèn Saranai, trống Paranưng và các điệu múa quạt truyền thống. Đây là bài viết mẫu minh họa cách hiển thị đóng góp cộng đồng trên hệ thống.',
    images: [
      'https://images.pexels.com/photos/29534974/pexels-photo-29534974.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    status: 'approved',
    submittedAt: '2026-01-15T00:00:00Z',
    likes: 0,
    tags: ['Katê', 'Người Chăm', 'Khánh Hòa', 'Ninh Thuận cũ', 'Mẫu minh họa'],
    sourceReference: 'Tư liệu tham khảo tổng hợp phục vụ minh họa giao diện',
    isSample: true,
  },
  {
    id: 'story-sample-3',
    title: '[Mẫu minh họa] Giới thiệu tục cúng Bến nước truyền thống của đồng bào Ê Đê',
    authorName: 'Biên tập tư liệu (Mẫu minh họa)',
    authorRole: 'Dữ liệu minh họa hệ thống',
    festivalId: 'khong-gian-van-hoa-cong-chieng-tay-nguyen',
    festivalName: 'Không gian Văn hóa Cồng chiêng Tây Nguyên',
    province: 'Đắk Lắk',
    ethnicGroup: 'Ê Đê',
    content:
      'Lễ cúng Bến nước là phong tục truyền thống gắn với đời sống buôn làng Tây Nguyên sau vụ thu hoạch, kết hợp âm thanh cồng chiêng và nghi thức bảo vệ nguồn nước. Bài viết ở trạng thái chờ duyệt để minh họa tính năng kiểm duyệt công khai.',
    images: [
      'https://images.pexels.com/photos/35212881/pexels-photo-35212881.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    status: 'pending',
    submittedAt: '2026-01-15T00:00:00Z',
    likes: 0,
    tags: ['Cúng bến nước', 'Tây Nguyên', 'Đắk Lắk', 'Mẫu minh họa'],
    sourceReference: 'Tư liệu tham khảo tổng hợp phục vụ minh họa quy trình duyệt',
    isSample: true,
  },
];

const STORIES_STORAGE_KEY = 'bancunglehoi_community_stories_v2';

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
    status: 'pending',
    isSample: false,
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
