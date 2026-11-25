import type { LegalDocument } from '../types/festival.ts';

export const LEGAL_DISCLAIMER =
  'Lưu ý quan trọng: Thông tin về lễ hội, sự kiện lịch sử và các căn cứ pháp lý trên hệ thống chỉ mang tính chất tham khảo, nghiên cứu và hỗ trợ cộng đồng trẩy hội văn minh; không thay thế văn bản pháp luật chính thức do cơ quan nhà nước có thẩm quyền ban hành.';

export interface AuthoritativeSource {
  id: string;
  name: string;
  nameEn: string;
  organization: string;
  url: string;
  scope: string;
  scopeEn: string;
}

export const AUTHORITATIVE_SOURCES: AuthoritativeSource[] = [
  {
    id: 'src-vbpl',
    name: 'Cơ sở dữ liệu Quốc gia về Văn bản Pháp luật',
    nameEn: 'National Database of Legal Normative Documents',
    organization: 'Bộ Tư pháp',
    url: 'https://vbpl.vn',
    scope: 'Tra cứu toàn văn Luật Di sản văn hóa 45/2024/QH15, Nghị quyết 202/2025/QH15, Nghị định và Thông tư.',
    scopeEn: 'Official full texts of Cultural Heritage Law 45/2024/QH15, Resolution 202/2025/QH15, Decrees, and Circulars.',
  },
  {
    id: 'src-chinhphu',
    name: 'Cổng Thông tin điện tử Chính phủ',
    nameEn: 'Portal of the Government of Vietnam',
    organization: 'Chính phủ nước CHXHCN Việt Nam',
    url: 'https://chinhphu.vn',
    scope: 'Quyết định của Thủ tướng Chính phủ về Di tích quốc gia đặc biệt và sắp xếp đơn vị hành chính năm 2025.',
    scopeEn: 'Prime Minister decisions on Special National Monuments and 2025 administrative reorganization.',
  },
  {
    id: 'src-bvhttdl',
    name: 'Cổng Thông tin điện tử Bộ Văn hóa, Thể thao và Du lịch',
    nameEn: 'Ministry of Culture, Sports and Tourism Portal',
    organization: 'Bộ Văn hóa, Thể thao và Du lịch',
    url: 'https://bvhttdl.gov.vn',
    scope: 'Chủ trương quản lý lễ hội, thực hiện nếp sống văn minh và công bố Danh mục Di sản văn hóa phi vật thể quốc gia.',
    scopeEn: 'Festival governance, civilized conduct regulations, and National Intangible Cultural Heritage announcements.',
  },
  {
    id: 'src-dsvh',
    name: 'Cục Di sản Văn hóa',
    nameEn: 'Department of Cultural Heritage',
    organization: 'Bộ Văn hóa, Thể thao và Du lịch',
    url: 'https://dsvh.gov.vn',
    scope: 'Hồ sơ khoa học Di tích quốc gia đặc biệt và Danh mục Di sản văn hóa phi vật thể quốc gia.',
    scopeEn: 'Official heritage dossiers for national intangible cultural heritage and special national monuments.',
  },
  {
    id: 'src-unesco',
    name: 'Danh sách Di sản Văn hóa Phi vật thể UNESCO',
    nameEn: 'UNESCO Intangible Cultural Heritage Lists',
    organization: 'UNESCO',
    url: 'https://ich.unesco.org/en/lists',
    scope: 'Hồ sơ ghi danh chính thức quốc tế (Quan họ Bắc Ninh, Hội Gióng, Tín ngưỡng Hùng Vương, Cồng chiêng Tây Nguyên, Lễ hội Vía Bà Chúa Xứ Núi Sam).',
    scopeEn: 'Official UNESCO inscriptions including Quan Ho, Giong Festival, Hung Kings Worship, Central Highlands Gongs, and Ba Chua Xu Sam Mountain.',
  },
];

export interface AttributionCreditItem {
  id: string;
  categoryVi: string;
  categoryEn: string;
  titleVi: string;
  titleEn: string;
  detailVi: string;
  detailEn: string;
  url?: string;
}

export const MEDIA_AND_ETHICS_CREDITS: AttributionCreditItem[] = [
  {
    id: 'credit-photos',
    categoryVi: 'Hình ảnh',
    categoryEn: 'Photography',
    titleVi: 'Ảnh chụp thật minh họa từ kho ảnh mở Pexels (Giấy phép Pexels)',
    titleEn: 'Real Illustrative Photographs via Pexels Open License',
    detailVi:
      'Toàn bộ 18 ảnh lễ hội và 3 ảnh mẫu cộng đồng đều là ảnh chụp thật sử dụng theo Giấy phép Pexels miễn phí (cho phép sử dụng hợp pháp kèm ghi nguồn ID từng ảnh). Ứng dụng tuyệt đối KHÔNG sử dụng ảnh do AI/máy sinh để thay thế cho hiện vật, di tích hay nghệ nhân có thật.',
    detailEn:
      'All 18 festival photos and 3 community sample photos are real photographs under the Pexels Free-to-Use License with per-photo ID links. Zero AI-generated images are used to depict real artifacts, monuments, or artisans.',
    url: 'https://www.pexels.com/license/',
  },
  {
    id: 'credit-audio',
    categoryVi: 'Âm thanh & Giọng đọc',
    categoryEn: 'Audio & Narration',
    titleVi: 'Tổng hợp giọng nói cục bộ Web Speech API (Trình duyệt)',
    titleEn: 'Local Browser Voice Synthesis (Web Speech API)',
    detailVi:
      'Tính năng đọc thành tiếng cho người khiếm thị và người cao tuổi tạo giọng nói trực tiếp bằng bộ tổng hợp Web Speech API tích hợp sẵn trên trình duyệt thiết bị; hoàn toàn không phát hoặc sao chép trái phép bản ghi âm, nhạc dân ca hay giọng nghệ nhân có bản quyền.',
    detailEn:
      'Read-aloud accessibility uses your browser’s built-in Web Speech API locally, avoiding unauthorized third-party recordings of chants, folk songs, or artisans.',
  },
  {
    id: 'credit-algorithm',
    categoryVi: 'Thuật toán Âm – Dương',
    categoryEn: 'Lunar–Solar Engine',
    titleVi: 'Công thức thiên văn Jean Meeus & Thuật toán Âm lịch Việt Nam TS. Hồ Ngọc Đức',
    titleEn: 'Jean Meeus Astronomical Algorithms & Dr. Ho Ngoc Duc Vietnamese Calendar',
    detailVi:
      'Ghi nhận công trình chuẩn hóa lịch Việt Nam múi giờ GMT+7 của TS. Hồ Ngọc Đức dựa trên tính toán Sóc – Trung Khí của Jean Meeus.',
    detailEn:
      'Credits Dr. Ho Ngoc Duc’s GMT+7 Vietnamese calendar computation grounded in Jean Meeus astronomical formulas.',
  },
  {
    id: 'credit-tech',
    categoryVi: 'Thư viện & Công nghệ',
    categoryEn: 'Libraries & AI Notice',
    titleVi: 'React, Tailwind CSS, Lucide Icons & Gemini API (qua proxy máy chủ)',
    titleEn: 'React, Tailwind CSS, Lucide Icons & Server-Proxied Gemini API',
    detailVi:
      'Biểu tượng giao diện dùng bộ mã nguồn mở Lucide; câu trả lời trợ lý văn hóa từ Google Gemini luôn hiển thị rõ nhãn tách biệt phần đối chiếu hồ sơ di sản và phần gợi ý bổ sung chưa kiểm chứng.',
    detailEn:
      'Open-source icons from Lucide; Gemini responses clearly distinguish portal-verified records from unverified exploratory extensions.',
  },
];

export const CUSTODIAL_ETHICS_PRINCIPLES: {
  id: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
}[] = [
  {
    id: 'ethics-license',
    titleVi: 'Ảnh, âm thanh & tư liệu của người khác phải có phép và ghi nguồn',
    titleEn: 'Third-party photos, audio & materials must be permitted and credited',
    descVi:
      'Mỗi hình ảnh hiển thị kèm nguồn Pexels và số ID ảnh cụ thể; người đóng góp câu chuyện hoặc thêm lễ hội mới bắt buộc khai báo nguồn tư liệu và xác nhận quyền sử dụng hợp lệ.',
    descEn:
      'Every curated image shows its specific Pexels source ID; community contributors and CMS editors must declare references and confirm usage permission.',
  },
  {
    id: 'ethics-no-ai-image',
    titleVi: 'Không dùng ảnh do máy/AI sinh thay cho hiện vật, di tích, nghệ nhân có thật',
    titleEn: 'No AI-generated images replacing real artifacts, monuments, or artisans',
    descVi:
      'Hệ thống không nhúng hay sinh ảnh AI minh họa di tích, cổ vật, trang phục truyền thống hay chân dung nghệ nhân; mọi ảnh sử dụng đều được gắn nhãn rõ là ảnh chụp thật minh họa.',
    descEn:
      'No AI-synthesized images are generated or displayed in place of authentic heritage objects, temples, or practitioners.',
  },
  {
    id: 'ethics-custodian',
    titleVi: 'Không công bố phần người giữ tư liệu dặn không công bố',
    titleEn: 'Never publish restricted details custodians asked to keep unpublished',
    descVi:
      'Tôn trọng quy ước bảo mật nghi lễ mật, bí quyết nghề cổ truyền hoặc lời dặn giữ kín của nghệ nhân, bô lão, ban quản lý di tích thông qua bước cam kết bắt buộc trước khi gửi bài.',
    descEn:
      'Mandatory contributor confirmation ensures secret rites, sacred prayers, or details restricted by tradition-bearers are never published.',
  },
  {
    id: 'ethics-privacy',
    titleVi: 'Không công bố thông tin riêng của người khác khi chưa đồng ý',
    titleEn: 'Never publish others’ private information without consent',
    descVi:
      'Hỗ trợ đăng bài ẩn danh; chặn số điện thoại/email lọt vào nội dung công khai và yêu cầu xác nhận đồng ý trước khi lưu hiển thị bút danh.',
    descEn:
      'Supports anonymous posting, blocks exposed phone numbers/emails in public stories, and requires explicit consent before publishing.',
  },
];


export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'luat-di-san-van-hoa-2024',
    code: 'Luật số 45/2024/QH15 (kế thừa Luật 28/2001 & 32/2009)',
    title: 'Luật Di sản văn hóa năm 2024 (hiệu lực từ 01/07/2025)',
    issuingBody: 'Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    date: '23/11/2024 (hiệu lực từ 01/07/2025)',
    type: 'Luật',
    summary:
      'Quy định toàn diện về quản lý, bảo vệ và phát huy giá trị di sản văn hóa phi vật thể, di sản văn hóa vật thể và di sản tư liệu; xác định quyền, nghĩa vụ của Nhà nước, cộng đồng và cá nhân đối với di sản văn hóa Việt Nam.',
    keyArticles: [
      'Kế thừa và thay thế Luật Di sản văn hóa số 28/2001/QH10 và Luật sửa đổi, bổ sung số 32/2009/QH12 kể từ ngày 01/07/2025.',
      'Khẳng định vai trò chủ thể của cộng đồng trong việc bảo vệ, thực hành và trao truyền di sản văn hóa phi vật thể qua nhiều thế hệ.',
      'Khuyến khích ứng dụng công nghệ số trong lưu giữ, kiểm kê và phổ biến giá trị di sản văn hóa gắn với bảo vệ bản sắc dân tộc.',
    ],
    linkRef: 'https://vbpl.vn',
  },
  {
    id: 'nghi-quyet-202-2025',
    code: 'Nghị quyết số 202/2025/QH15',
    title: 'Nghị quyết về việc sắp xếp đơn vị hành chính cấp tỉnh năm 2025',
    issuingBody: 'Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    date: '12/06/2025',
    type: 'Luật',
    summary:
      'Nghị quyết sắp xếp lại đơn vị hành chính cấp tỉnh từ 63 xuống còn 34 tỉnh, thành phố trực thuộc Trung ương (28 tỉnh và 6 thành phố) gắn với mô hình chính quyền địa phương 2 cấp, làm cơ sở cập nhật địa danh di sản trong ứng dụng.',
    keyArticles: [
      'Cả nước còn 34 đơn vị hành chính cấp tỉnh (11 tỉnh, thành giữ nguyên và 23 tỉnh, thành hình thành sau sắp xếp).',
      'Không tổ chức đơn vị hành chính cấp huyện; các xã, phường, đặc khu trực thuộc trực tiếp cấp tỉnh/thành phố.',
      'Ứng dụng Bancunglehoi hiển thị song song địa danh sau sắp xếp năm 2025 và tên tỉnh/huyện trước sắp xếp để thuận tiện tra cứu lịch sử.',
    ],
    linkRef: 'https://chinhphu.vn',
  },
  {
    id: 'nghi-dinh-110-2018',
    code: 'Nghị định số 110/2018/NĐ-CP',
    title: 'Nghị định quy định về quản lý và tổ chức lễ hội',
    issuingBody: 'Chính phủ',
    date: '29/08/2018',
    type: 'Nghị định',
    summary:
      'Văn bản pháp quy quy định nguyên tắc tổ chức lễ hội; phân cấp quản lý nhà nước; quyền và trách nhiệm của Ban tổ chức lễ hội, người tham gia lễ hội; điều kiện thông báo, đăng ký tổ chức lễ hội.',
    keyArticles: [
      'Điều 5: Việc tổ chức lễ hội nhằm giáo dục truyền thống yêu nước, lòng tự hào dân tộc, đạo lý "Uống nước nhớ nguồn" và phát huy giá trị văn hóa tốt đẹp.',
      'Điều 6: Người tham gia lễ hội chấp hành quy định pháp luật, ứng xử có văn hóa, trang phục lịch sự, không mê tín dị đoan và bảo vệ môi trường.',
      'Điều 8 - 11: Quy trình đăng ký và thông báo tổ chức lễ hội truyền thống định kỳ.',
    ],
    linkRef: 'https://chinhphu.vn',
  },
  {
    id: 'thong-tu-04-2011',
    code: 'Thông tư số 04/2011/TT-BVHTTDL',
    title: 'Quy định về thực hiện nếp sống văn minh trong việc cưới, việc tang và lễ hội',
    issuingBody: 'Bộ Văn hóa, Thể thao và Du lịch',
    date: '21/01/2011',
    type: 'Thông tư',
    summary:
      'Quy định việc thực hiện nếp sống văn minh tại các không gian lễ hội, đền chùa, di tích lịch sử - văn hóa trên phạm vi toàn quốc.',
    keyArticles: [
      'Nghiêm cấm các hành vi biến tướng lễ hội, bói toán, cờ bạc, đổi tiền lẻ thu phí chênh lệch tại nơi thờ tự.',
      'Bảo đảm không gian trang nghiêm cho phần Lễ và các hoạt động văn hóa, thể thao lành mạnh cho phần Hội.',
      'Ban quản lý di tích niêm yết công khai bảng chỉ dẫn, nội quy lễ hội và quy tắc ứng xử.',
    ],
    linkRef: 'https://bvhttdl.gov.vn',
  },
  {
    id: 'thong-tu-04-2023-btc',
    code: 'Thông tư số 04/2023/TT-BTC',
    title: 'Hướng dẫn quản lý, thu chi tài chính cho công tác tổ chức lễ hội và tiền công đức, tài trợ cho di tích và hoạt động lễ hội',
    issuingBody: 'Bộ Tài chính',
    date: '19/01/2023',
    type: 'Thông tư',
    summary:
      'Minh bạch hóa quản lý tài chính lễ hội, tiền công đức, tài trợ tại các di tích lịch sử - văn hóa trên toàn quốc.',
    keyArticles: [
      'Quy định rõ việc tiếp nhận, kiểm đếm và mở tài khoản hoặc sổ sách theo dõi công khai tiền công đức, tài trợ.',
      'Mục đích sử dụng kinh phí phục vụ tu bổ di tích, tổ chức lễ hội và hoạt động văn hóa địa phương.',
    ],
    linkRef: 'https://vbpl.vn',
  },
  {
    id: 'unesco-convention-2003',
    code: 'Công ước UNESCO 2003',
    title: 'Công ước quốc tế về Bảo vệ Di sản văn hóa phi vật thể (UNESCO 2003)',
    issuingBody: 'Tổ chức Giáo dục, Khoa học và Văn hóa Liên Hợp Quốc (UNESCO)',
    date: '17/10/2003 (Việt Nam tham gia 05/09/2005)',
    type: 'Công ước quốc tế',
    summary:
      'Văn kiện nền tảng toàn cầu bảo vệ các tập quán, sự biểu đạt, tri thức, kỹ năng và không gian văn hóa gắn liền với cộng đồng.',
    keyArticles: [
      'Khoản 2 Điều 2: Các lĩnh vực di sản bao gồm các tập quán xã hội, nghi lễ và các lễ hội.',
      'Nghĩa vụ tôn trọng các giá trị cộng đồng và bảo đảm tính kế thừa bền vững qua nhiều thế hệ.',
    ],
    linkRef: 'https://ich.unesco.org/en/convention',
  },
  {
    id: 'danh-muc-di-san-quoc-gia',
    code: 'Hệ thống Quyết định Công bố DSVHPVTQG',
    title: 'Các Quyết định của Bộ VHTTDL về Danh mục Di sản văn hóa phi vật thể quốc gia',
    issuingBody: 'Bộ Văn hóa, Thể thao và Du lịch',
    date: 'Công bố định kỳ từ năm 2012 đến nay',
    type: 'Quyết định',
    summary:
      'Tổng hợp các quyết định công bố Danh mục Di sản văn hóa phi vật thể quốc gia đối với lễ hội truyền thống và tập quán xã hội tiêu biểu tại Việt Nam.',
    keyArticles: [
      'Hội Gióng ở đền Phù Đổng và đền Sóc (TP. Hà Nội) - UNESCO 2010',
      'Tín ngưỡng thờ cúng Hùng Vương (Phú Thọ) - UNESCO 2012',
      'Không gian văn hóa Cồng chiêng Tây Nguyên - UNESCO 2005/2008',
      'Dân ca Quan họ Bắc Ninh (UNESCO 2009) & Lễ hội truyền thống Hội Lim (QĐ 1744/QĐ-BVHTTDL năm 2025)',
      'Lễ hội Vía Bà Chúa Xứ Núi Sam (An Giang) - UNESCO ngày 04/12/2024',
      'Lễ hội Đền Trần (QĐ 4205/QĐ-BVHTTDL - Nam Định cũ, nay thuộc Ninh Bình)',
      'Lễ Khao lề thế lính Hoàng Sa (QĐ 1524/QĐ-BVHTTDL - Đặc khu Lý Sơn, Quảng Ngãi)',
    ],
    linkRef: 'https://dsvh.gov.vn',
  },
];
