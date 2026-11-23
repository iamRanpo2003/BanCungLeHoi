import type { FestivalEvent } from '../types/festival.ts';

export const FESTIVALS_DATA: FestivalEvent[] = [
  {
    id: 'gio-to-hung-vuong',
    name: 'Giỗ Tổ Hùng Vương - Lễ hội Đền Hùng',
    alternateNames: ['Ngày Giỗ Quốc Tổ', 'Hội Đền Hùng'],
    category: 'Lễ hội',
    ethnicGroup: 'Kinh (và khối đại đoàn kết 54 dân tộc)',
    region: 'Bắc',
    province: 'Phú Thọ (hợp nhất Phú Thọ, Vĩnh Phúc, Hòa Bình - 2025)',
    district: 'Khu vực TP. Việt Trì (trước sắp xếp 2025)',
    locationName: 'Khu Di tích lịch sử Đền Hùng, Núi Nghĩa Lĩnh, xã Hy Cương',
    coordinates: { lat: 21.3653, lng: 105.3267 },
    timingType: 'lunar',
    lunarRule: {
      month: 3,
      day: 10,
      endMonth: 3,
      endDay: 10,
      recurringNote: 'Chính lễ vào ngày 10 tháng 3 Âm lịch hằng năm (hoạt động từ mùng 1 đến mùng 10)',
    },
    historicalOrigin:
      'Gắn liền với truyền thuyết thời kỳ Hồng Bàng, dựng nước Văn Lang của 18 đời Vua Hùng. Lễ hội là đỉnh cao của truyền thống "Uống nước nhớ nguồn", tôn vinh công lao mở cõi và dựng nước của các Vua Hùng.',
    culturalMeaning:
      'Biểu tượng thiêng liêng cố kết cộng đồng dân tộc Việt Nam. Là minh chứng sống động cho tín ngưỡng thờ cúng tổ tiên chung của cả một quốc gia - giá trị văn hóa tiêu biểu của nhân loại.',
    mainRituals: {
      le: [
        'Lễ dâng hương tưởng niệm các Vua Hùng tại Đền Thượng do Lãnh đạo Đảng, Nhà nước chủ trì',
        'Lễ giỗ Đức Quốc Tổ Lạc Long Quân tại Đền Lạc Long Quân',
        'Lễ dâng hương tưởng niệm Tổ Mẫu Âu Cơ',
        'Lễ rước kiệu truyền thống của các xã vùng ven Đền Hùng',
      ],
      hoi: [
        'Hội thi gói, nấu bánh chưng và giã bánh giầy dâng Vua Hùng',
        'Hát Xoan Phú Thọ tại các di tích đình cổ An Thái, Kim Đới, Thét',
        'Hội thi bơi chải trên sông Lô',
        'Trình diễn võ thuật cổ truyền, kéo co, bắn nỏ, cờ tướng dân gian',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 1272/QĐ-TTg (12/08/2009) & Hồ sơ UNESCO số 00735',
      issuingAuthority: 'Thủ tướng Chính phủ & UNESCO',
      issueDate: '06/12/2012 (UNESCO) / 12/08/2009 (Di tích QGĐB)',
      title: 'Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại',
      recognitionType: 'Di sản phi vật thể đại diện của nhân loại (UNESCO)',
      excerpt:
        'Khu Di tích Đền Hùng được xếp hạng Di tích quốc gia đặc biệt theo Quyết định 1272/QĐ-TTg (12/08/2009). Tín ngưỡng thờ cúng Hùng Vương thể hiện lòng biết ơn sâu sắc đối với tổ tiên.',
    },
    directionsGuide:
      'Từ Hà Nội di chuyển theo cao tốc Nội Bài - Lào Cai (CT05), rẽ nút giao Phù Ninh/Việt Trì theo QL2 khoảng 85km. Có thể đi tàu hỏa tuyến Hà Nội - Việt Trì rồi bắt xe buýt tuyến 19 đến cổng Đền Hùng.',
    visitorAdvice: [
      'Trang phục lịch sự, kín đáo khi vào dâng hương tại các đền Hạ, Trung, Thượng, Giếng.',
      'Tuân thủ luồng di chuyển một chiều lên núi Nghĩa Lĩnh trong ngày chính hội 10/3 tránh ùn tắc.',
      'Giữ gìn vệ sinh môi trường, không cắm hương tùy tiện vào thân cây hoặc vách đá.',
    ],
    imageUrl: 'https://images.pexels.com/photos/30732172/pexels-photo-30732172.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: true,
    nationalHeritage: true,
    tags: ['Di sản UNESCO', 'Đền Hùng', 'Quốc lễ', 'Hát Xoan', 'Phú Thọ'],
  },
  {
    id: 'le-hoi-chua-huong',
    name: 'Lễ hội Chùa Hương (Hương Sơn)',
    alternateNames: ['Hội Chùa Hương', 'Lễ hội Hương Sơn'],
    category: 'Lễ hội',
    ethnicGroup: 'Kinh',
    region: 'Bắc',
    province: 'TP. Hà Nội',
    district: 'Khu vực Mỹ Đức (trước sắp xếp 2025)',
    locationName: 'Quần thể danh thắng Hương Sơn, xã Hương Sơn',
    coordinates: { lat: 20.6186, lng: 105.7533 },
    timingType: 'lunar',
    lunarRule: {
      month: 1,
      day: 6,
      endMonth: 3,
      endDay: 25,
      recurringNote: 'Khai hội mùng 6 tháng Giêng, kéo dài đến hết tháng 3 Âm lịch',
    },
    historicalOrigin:
      'Gắn với tín ngưỡng Phật giáo Đại thừa và truyền thuyết Bồ Tát Quán Thế Âm hóa thân thành công chúa Diệu Thiện tu hành đắc đạo tại Động Hương Tích.',
    culturalMeaning:
      'Một trong những lễ hội kéo dài nhất cả nước, kết hợp hài hòa giữa tín ngưỡng Phật giáo, văn hóa thờ Mẫu dân gian và cảnh quan thiên nhiên sông nước núi non.',
    mainRituals: {
      le: [
        'Lễ khai sơn mùng 6 tháng Giêng tại đền Ngũ Nhạc',
        'Nghi thức dâng hương, lễ Phật, cầu quốc thái dân an tại Chùa Thiên Trù và Động Hương Tích',
        'Lễ rước nước thiêng đầu năm',
      ],
      hoi: [
        'Hành hương ngồi đò vãn cảnh dòng suối Yến',
        'Leo núi vãn cảnh các danh lam Tuyết Sơn, Long Vân, Thanh Sơn',
        'Hát chèo, hát ca trù tại các bến đò và sân đền',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 2082/QĐ-TTg ngày 25/12/2017',
      issuingAuthority: 'Thủ tướng Chính phủ',
      issueDate: '25/12/2017',
      title: 'Xếp hạng Di tích quốc gia đặc biệt Quần thể danh lam thắng cảnh Hương Sơn (Chùa Hương)',
      recognitionType: 'Di tích quốc gia đặc biệt & Di sản văn hóa phi vật thể',
      excerpt:
        'Cụm di tích Hương Sơn hội tụ các giá trị lịch sử, văn hóa, kiến trúc cảnh quan độc đáo, được bảo vệ nghiêm ngặt theo Luật Di sản văn hóa.',
    },
    directionsGuide:
      'Cách trung tâm Hà Nội khoảng 60km về phía Tây Nam theo hướng QL21B qua Ba La, Vân Đình đến khu vực Đại Nghĩa (huyện Mỹ Đức cũ) rồi vào bến Đục (suối Yến). Có tuyến xe buýt kết nối hằng ngày.',
    visitorAdvice: [
      'Mặc áo phao an toàn trong suốt hành trình ngồi thuyền đò suối Yến.',
      'Chuẩn bị giày đế mềm chống trơn trượt khi leo bậc đá Hương Tích.',
      'Bỏ rác đúng nơi quy định, từ chối dịch vụ không niêm yết giá.',
    ],
    imageUrl: 'https://images.pexels.com/photos/34997380/pexels-photo-34997380.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Chùa Hương', 'Suối Yến', 'Hà Nội', 'Hành hương xuân', 'Di tích đặc biệt'],
  },
  {
    id: 'hoi-giong-phu-dong-soc-son',
    name: 'Hội Gióng đền Phù Đổng và đền Sóc',
    alternateNames: ['Hội làng Phù Đổng', 'Hội đền Sóc'],
    category: 'Lễ hội',
    ethnicGroup: 'Kinh',
    region: 'Bắc',
    province: 'TP. Hà Nội',
    district: 'Khu vực Gia Lâm & Sóc Sơn (trước sắp xếp 2025)',
    locationName: 'Đền Phù Đổng (xã Phù Đổng) và Đền Sóc (khu vực Sóc Sơn)',
    coordinates: { lat: 21.0667, lng: 105.95 },
    timingType: 'lunar',
    lunarRule: {
      month: 4,
      day: 9,
      endMonth: 4,
      endDay: 9,
      recurringNote: 'Hội Đền Sóc từ mùng 6-8 tháng Giêng; Hội Phù Đổng mùng 7-9 tháng 4 Âm lịch',
    },
    historicalOrigin:
      'Tôn vinh vị anh hùng huyền thoại Thánh Gióng (Phù Đổng Thiên Vương), một trong "Tứ bất tử" của tín ngưỡng dân gian Việt Nam, người có công đánh tan giặc Ân thời Hùng Vương thứ 6.',
    culturalMeaning:
      'Di sản đại diện của nhân loại phản ánh tinh thần thượng võ, ý chí độc lập quật cường của dân tộc và nghệ thuật diễn xướng dân gian mang tính sử thi.',
    mainRituals: {
      le: [
        'Lễ khai quang tắm rửa tượng Thánh (lễ Mộc dục)',
        'Lễ rước nước sông Đuống tôi gươm lệnh',
        'Lễ tế hội đồng và rước cỗ chín bậc',
        'Lễ rước kiệu hoa tre và tướng giặc quy hàng',
      ],
      hoi: [
        'Diễn xướng trận đánh giặc Ân với đạo quân áo đỏ, áo đen, cờ lệnh và múa Hổ',
        'Hát ải lao tại bãi Đống Đàm và bãi Soi Bia',
        'Tục khao quân và phát lộc đầu năm',
      ],
    },
    legalBasis: {
      documentNumber: 'Hồ sơ UNESCO số 00443 & Quyết định Bộ VHTTDL',
      issuingAuthority: 'UNESCO & Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '16/11/2010',
      title: 'Hội Gióng ở đền Phù Đổng và đền Sóc được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại',
      recognitionType: 'Di sản phi vật thể đại diện của nhân loại (UNESCO)',
      excerpt:
        'Hội Gióng là biểu tượng sinh động của lòng yêu nước nồng nàn, được cộng đồng lưu truyền qua nhiều thế hệ.',
    },
    directionsGuide:
      'Đền Phù Đổng cách trung tâm Hà Nội 18km qua cầu Đuống, đường Đê Vàng (huyện Gia Lâm cũ). Đền Sóc cách trung tâm 35km theo hướng cầu Nhật Tân/Thăng Long lên núi Sóc (huyện Sóc Sơn cũ).',
    visitorAdvice: [
      'Tôn trọng thứ tự rước kiệu, tuyệt đối không chen lấn xô đẩy tranh cướp giò hoa tre.',
      'Không đứng chắn trước khu vực diễn xướng của đội quân cờ lệnh.',
    ],
    imageUrl: 'https://images.pexels.com/photos/36635973/pexels-photo-36635973.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: true,
    nationalHeritage: true,
    tags: ['UNESCO', 'Hội Gióng', 'Thánh Gióng', 'Tứ bất tử', 'Hà Nội'],
  },
  {
    id: 'le-hoi-den-tran',
    name: 'Lễ hội Khai ấn Đền Trần',
    alternateNames: ['Hội Đền Trần Nam Định', 'Lễ Khai ấn Đền Trần'],
    category: 'Lễ hội',
    ethnicGroup: 'Kinh',
    region: 'Bắc',
    province: 'Ninh Bình (trước 2025: tỉnh Nam Định)',
    district: 'Phường Nam Định (trước 2025: phường Lộc Vượng, TP. Nam Định)',
    locationName: 'Khu di tích lịch sử Đền Trần - Chùa Phổ Minh (Nam Định cũ)',
    coordinates: { lat: 20.4431, lng: 106.1834 },
    timingType: 'lunar',
    lunarRule: {
      month: 1,
      day: 14,
      endMonth: 1,
      endDay: 16,
      recurringNote: 'Đêm 14 rạng sáng 15 tháng Giêng (Khai ấn) và ngày 15-20/8 Âm lịch (Giỗ Đức Thánh Trần)',
    },
    historicalOrigin:
      'Bắt nguồn từ tục lệ triều Trần tế tổ tiên Tiên Miếu sau thắng lợi chống quân xâm lược Nguyên Mông, ban ân lộc cho trăm họ và mở ấn trị quốc.',
    culturalMeaning:
      'Biểu dương hào khí Đông A oanh liệt thời Trần, giáo dục lòng yêu nước, ý chí độc lập tự chủ và rèn luyện đạo đức người làm việc công vì nước vì dân.',
    mainRituals: {
      le: [
        'Lễ rước kiệu Ngọc Lộ từ Chùa Phổ Minh sang Đền Thiên Trường',
        'Lễ rước Nước và tế cá đầu năm',
        'Nghi thức thiêng Khai ấn vào giờ Tý đêm 14 tháng Giêng',
        'Lễ dâng hương tưởng niệm 14 vị Hoàng đế triều Trần',
      ],
      hoi: [
        'Múa lân, rồng, sư tử rộn ràng tại sân đền Trùng Hoa',
        'Hội chọi gà dân gian, đấu vật truyền thống',
        'Biểu diễn nghệ thuật hát chèo cổ và chầu văn',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 4205/QĐ-BVHTTDL ngày 19/12/2014',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '19/12/2014',
      title: 'Đưa Lễ hội Đền Trần (Nam Định cũ, nay thuộc tỉnh Ninh Bình) vào Danh mục Di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia & Di tích đặc biệt',
      excerpt:
        'Lễ hội thể hiện truyền thống đạo lý "Uống nước nhớ nguồn" và tinh thần đoàn kết hào khí Đông A đại thắng giặc ngoại xâm.',
    },
    directionsGuide:
      'Đi cao tốc Cầu Giẽ - Ninh Bình (CT01), rẽ nút giao Liêm Tuyền theo QL21 hướng về khu vực TP. Nam Định cũ (nay thuộc tỉnh Ninh Bình) khoảng 85km. Đền Trần nằm trên đường Trần Thừa.',
    visitorAdvice: [
      'Nhà đền phát ấn kéo dài nhiều ngày sau lễ Khai ấn, du khách không cần chen lấn trong đêm 14.',
      'Cảnh giác bảo quản tư trang cá nhân nơi đông người.',
    ],
    imageUrl: 'https://images.pexels.com/photos/38127383/pexels-photo-38127383.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Đền Trần', 'Hào khí Đông A', 'Khai ấn', 'Ninh Bình', 'Nam Định cũ', 'Di sản Quốc gia'],
  },
  {
    id: 'hoi-lim-bac-ninh',
    name: 'Hội Lim - Vùng đất Dân ca Quan họ',
    alternateNames: ['Hội Lim Tiên Du', 'Lễ hội hát Quan họ'],
    category: 'Lễ hội',
    ethnicGroup: 'Kinh',
    region: 'Bắc',
    province: 'Bắc Ninh (hợp nhất Bắc Giang, Bắc Ninh - 2025)',
    district: 'Khu vực Tiên Du (trước sắp xếp 2025)',
    locationName: 'Đồi Lim, xã Tiên Du (trước 2025: thị trấn Lim, huyện Tiên Du) và các làng quan họ cổ',
    coordinates: { lat: 21.1685, lng: 105.9984 },
    timingType: 'lunar',
    lunarRule: {
      month: 1,
      day: 12,
      endMonth: 1,
      endDay: 14,
      recurringNote: 'Chính hội vào ngày 13 tháng Giêng Âm lịch hằng năm',
    },
    historicalOrigin:
      'Tôn vinh vị tổ phụng xướng danh tướng Nguyễn Đình Diễn thời Lê - Trịnh và truyền thống hát giao duyên Kinh Bắc ngàn năm văn hiến.',
    culturalMeaning:
      'Không gian sinh hoạt văn hóa độc đáo nơi diễn ra nghệ thuật Dân ca Quan họ Bắc Ninh - di sản phi vật thể đại diện của nhân loại được UNESCO vinh danh.',
    mainRituals: {
      le: [
        'Lễ rước kiệu từ đình làng Đình Cả lên núi Lim trang nghiêm',
        'Lễ tế thần tại đền thờ danh tướng Nguyễn Đình Diễn',
        'Lễ cầu may, cầu mưa thuận gió hòa đầu xuân',
      ],
      hoi: [
        'Hát canh quan họ thâu đêm suốt sáng tại các lán trại và nhà chứa',
        'Hát đối đáp giao duyên trên thuyền rồng tại hồ nước chân núi',
        'Trò chơi đu tiên, đập niêu đất, cờ người, đấu vật cổ truyền',
      ],
    },
    legalBasis: {
      documentNumber: 'Hồ sơ UNESCO số 00183 (2009) & Quyết định số 1744/QĐ-BVHTTDL (10/06/2025)',
      issuingAuthority: 'UNESCO & Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '30/09/2009 (UNESCO) / 10/06/2025 (QĐ 1744)',
      title: 'Dân ca Quan họ Bắc Ninh (UNESCO) & Lễ hội truyền thống Hội Lim được ghi danh Di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản phi vật thể đại diện của nhân loại (UNESCO) & Di sản Quốc gia',
      excerpt:
        'Hội Lim là không gian văn hóa cộng đồng cốt lõi nuôi dưỡng và trao truyền các làn điệu Quan họ mượt mà đượm tình quê hương; Lễ hội truyền thống Hội Lim được Bộ VHTTDL ghi danh ngày 10/06/2025.',
    },
    directionsGuide:
      'Cách trung tâm Hà Nội khoảng 25km theo Quốc lộ 1A cũ hoặc cao tốc Hà Nội - Bắc Giang. Ga xe lửa Lim nằm gần khu vực đồi Lim, thuận tiện đi lại.',
    visitorAdvice: [
      'Thưởng thức trọn vẹn văn hóa quan họ qua tục têm trầu cánh phượng và chén trà ấm đón khách.',
      'Không ngả nón xin tiền, giữ gìn nét đẹp thanh lịch của liền anh liền chị quan họ.',
    ],
    imageUrl: 'https://images.pexels.com/photos/6875356/pexels-photo-6875356.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: true,
    nationalHeritage: true,
    tags: ['Quan họ Bắc Ninh', 'Hội Lim', 'UNESCO', 'Văn hóa Kinh Bắc'],
  },
  {
    id: 'le-hoi-long-tong',
    name: 'Lễ hội Lồng Tồng (Xuống đồng)',
    alternateNames: ['Hội Xuống đồng', 'Lễ hội Roóng Poọc'],
    category: 'Phong tục',
    ethnicGroup: 'Tày, Nùng, Giáy',
    region: 'Bắc',
    province: 'Cao Bằng, Thái Nguyên (gồm Bắc Kạn cũ), Tuyên Quang, Lào Cai',
    district: 'Các xã vùng Việt Bắc & Tây Bắc (bỏ cấp huyện từ 2025)',
    locationName: 'Cánh đồng các bản làng Tày, Nùng (như Định Hóa - Thái Nguyên, Ba Bể - Thái Nguyên mới/Bắc Kạn cũ, Lâm Bình - Tuyên Quang)',
    coordinates: { lat: 22.4167, lng: 105.8333 },
    timingType: 'lunar',
    lunarRule: {
      month: 1,
      day: 4,
      endMonth: 1,
      endDay: 15,
      recurringNote: 'Thường diễn ra từ mùng 4 đến rằm tháng Giêng tùy từng bản làng',
    },
    historicalOrigin:
      'Bắt nguồn từ tín ngưỡng nông nghiệp lúa nước lâu đời của cư dân ngữ hệ Tày - Thái, tạ ơn Thành hoàng, Thần Nông và cầu mùa màng bội thu.',
    culturalMeaning:
      'Bức tranh sinh hoạt văn hóa dân gian đặc sắc vùng Việt Bắc, gắn liền với tình yêu lao động, sự gắn kết cộng đồng bản làng qua nhiều thế hệ.',
    mainRituals: {
      le: [
        'Lễ cúng Thần Nông, Thần Núi, Thần Suối dâng xôi ngũ sắc, gà thiến, thịt lợn quay',
        'Nghi thức đường cày tịch điền đầu xuân của già làng uy tín',
        'Lễ phát lộc hạt giống tốt cho các gia đình trong bản',
      ],
      hoi: [
        'Hội thi tung còn qua vòng tròn giấy đỏ trên cây nêu tre cao',
        'Hát Then, đàn Tính dặt dìu',
        'Kéo co bằng dây song rừng, đẩy gậy, đi cà kheo',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 5079/QĐ-BVHTTDL (và các quyết định bổ sung theo địa phương)',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '27/12/2012',
      title: 'Đưa Lễ hội Lồng Tồng (như của người Tày Tuyên Quang, Thái Nguyên, Bắc Kạn cũ) vào Danh mục Di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
      excerpt:
        'Lễ hội bảo tồn hệ thống nghi lễ nông nghiệp cổ truyền và nghệ thuật hát Then, đàn Tính độc đáo của các dân tộc thiểu số miền núi phía Bắc.',
    },
    directionsGuide:
      'Có thể tham dự tại khu vực ATK Định Hóa hoặc Hồ Ba Bể (nay cùng thuộc tỉnh Thái Nguyên sau hợp nhất Bắc Kạn - Thái Nguyên 2025) theo tuyến QL3 từ Hà Nội khoảng 150 - 220km.',
    visitorAdvice: [
      'Ăn mặc gọn gàng, chuẩn bị áo ấm vì tiết trời xuân vùng cao còn se lạnh.',
      'Cùng tham gia ném còn cầu may cùng bà con nhưng lưu ý giữ an toàn khu vực bên dưới vòng còn.',
    ],
    imageUrl: 'https://images.pexels.com/photos/31700090/pexels-photo-31700090.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Lồng Tồng', 'Người Tày', 'Người Nùng', 'Hát Then', 'Xuống đồng'],
  },
  {
    id: 'le-hoi-gau-tao-hmong',
    name: 'Lễ hội Gầu Tào của người H’Mông',
    alternateNames: ['Hội cầu phúc cầu mệnh', 'Grâu Taox'],
    category: 'Phong tục',
    ethnicGroup: 'H’Mông',
    region: 'Bắc',
    province: 'Tuyên Quang (gồm Hà Giang cũ), Lào Cai, Lai Châu',
    district: 'Khu vực Đồng Văn, Mèo Vạc (Hà Giang cũ), Bắc Hà, Mường Khương',
    locationName: 'Bãi đất dốc thoải trên đồi cao của bản người H’Mông',
    coordinates: { lat: 23.279, lng: 105.362 },
    timingType: 'lunar',
    lunarRule: {
      month: 1,
      day: 1,
      endMonth: 1,
      endDay: 15,
      recurringNote: 'Thường mở hội vào dịp đầu xuân từ mùng 1 đến mùng 15 tháng Giêng',
    },
    historicalOrigin:
      'Gắn với phong tục cầu phúc (cầu con cái) hoặc cầu mệnh (cầu sức khỏe, xua đuổi rủi ro) của các dòng họ người H’Mông vùng núi cao.',
    culturalMeaning:
      'Thể hiện ước vọng sinh sôi nảy nở, tinh thần kiên cường vượt qua thiên nhiên khắc nghiệt và bảo lưu âm vang khèn Mông truyền thống.',
    mainRituals: {
      le: [
        'Lễ dựng cây nêu thiêng (được chọn kỹ từ cây tre/mai thẳng, còn ngọn lá)',
        'Thầy cúng dâng lễ vật truyền thống tế thần linh trời đất',
        'Nghi thức hạ cây nêu tạ ơn vào ngày kết thúc hội',
      ],
      hoi: [
        'Hội múa khèn Mông với những động tác lộn vòng, nhảy ngồi điêu luyện',
        'Thi đấu bắn nỏ, ném pao giao duyên của thanh niên H’Mông',
        'Các trò chơi dân gian vùng cao',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 5079/QĐ-BVHTTDL',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '27/12/2012',
      title: 'Công nhận Lễ hội Gầu Tào của đồng bào H’Mông vào Danh mục Di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
      excerpt:
        'Lễ hội khẳng định bản sắc tộc người H’Mông và tính liên kết dòng họ bền chặt giữa các bản làng vùng Cao nguyên đá Đồng Văn (nay thuộc tỉnh Tuyên Quang sau hợp nhất 2025) và Tây Bắc.',
    },
    directionsGuide:
      'Từ khu vực phường Hà Giang (TP. Hà Giang cũ, nay thuộc tỉnh Tuyên Quang sau hợp nhất 2025) theo QL4C qua Quản Bạ, Yên Minh đến vùng Đồng Văn hoặc Mèo Vạc.',
    visitorAdvice: [
      'Không tự ý chạm tay vào gốc cây nêu khi lễ cúng chưa hoàn tất.',
      'Tôn trọng phong tục bản địa, xin phép trước khi chụp ảnh người dân trong trang phục truyền thống.',
    ],
    imageUrl: 'https://images.pexels.com/photos/35750363/pexels-photo-35750363.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Người H’Mông', 'Gầu Tào', 'Cao nguyên đá Đồng Văn', 'Múa khèn'],
  },
  {
    id: 'le-hoi-lam-kinh',
    name: 'Lễ hội Lam Kinh - Hào khí Lê sơ',
    alternateNames: ['Hội Đền Lê Thái Tổ', 'Lễ tưởng niệm Khởi nghĩa Lam Sơn'],
    category: 'Sự kiện lịch sử',
    ethnicGroup: 'Kinh (và người Mường Thanh Hóa)',
    region: 'Trung',
    province: 'Thanh Hóa (giữ nguyên cấp tỉnh - 2025)',
    district: 'Khu vực Thọ Xuân & Ngọc Lặc (trước sắp xếp 2025)',
    locationName: 'Khu Di tích lịch sử quốc gia đặc biệt Lam Kinh, xã Lam Sơn',
    coordinates: { lat: 19.9167, lng: 105.4167 },
    timingType: 'lunar',
    lunarRule: {
      month: 8,
      day: 22,
      endMonth: 8,
      endDay: 23,
      recurringNote: 'Ngày 22 tháng 8 Âm lịch (ngày giỗ Vua Lê Thái Tổ: "Hai mốt Lê Lai, hai hai Lê Lợi")',
    },
    historicalOrigin:
      'Kỷ niệm ngày mất của Anh hùng dân tộc Lê Lợi (Vua Lê Thái Tổ) và tôn vinh chiến thắng của cuộc Khởi nghĩa Lam Sơn (1418–1427) đánh đuổi quân Minh xâm lược, mở đầu vương triều Lê sơ năm 1428.',
    culturalMeaning:
      'Khơi dậy niềm tự hào về ý chí tự lực tự cường dân tộc, áng thiên cổ hùng văn "Bình Ngô Đại Cáo" và mối quan hệ gắn bó giữa người Kinh và người Mường nơi căn cứ địa Lam Sơn.',
    mainRituals: {
      le: [
        'Lễ tế rước thần vị vua Lê Thái Tổ về Chính điện Lam Kinh',
        'Lễ đọc chúc văn tưởng niệm công lao Thái Tổ Cao Hoàng Đế',
        'Lễ dâng hương tại lăng mộ các vua và thái hậu triều Lê sơ',
      ],
      hoi: [
        'Chương trình nghệ thuật tái hiện Hội thề Lũng Nhai',
        'Trình diễn múa đèn chạy chữ, hát trò Xuân Phả di sản quốc gia',
        'Hội cờ tướng, bắn nỏ cổ truyền và các làn điệu hò sông Mã',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 1419/QĐ-TTg ngày 27/09/2012',
      issuingAuthority: 'Thủ tướng Chính phủ',
      issueDate: '27/09/2012',
      title: 'Xếp hạng Di tích quốc gia đặc biệt Di tích lịch sử và kiến trúc nghệ thuật Lam Kinh',
      recognitionType: 'Di tích quốc gia đặc biệt & Di sản văn hóa phi vật thể',
      excerpt:
        'Khu di tích Lam Kinh là kinh thành thứ hai thời Lê sơ, lưu giữ cây đa - thị cổ thụ và bia Vĩnh Lăng (bảo vật quốc gia).',
    },
    directionsGuide:
      'Từ khu vực trung tâm tỉnh Thanh Hóa theo QL47 hướng Tây khoảng 50km đến xã Lam Sơn (thị trấn Lam Sơn/huyện Thọ Xuân cũ). Gần sân bay Thọ Xuân (khoảng 15km).',
    visitorAdvice: [
      'Ghé thăm Bia Vĩnh Lăng (bảo vật quốc gia do danh nhân Nguyễn Trãi soạn văn bia).',
      'Giữ gìn trật tự và tôn nghiêm quanh khu vực các lăng mộ triều Lê.',
    ],
    imageUrl: 'https://images.pexels.com/photos/18498681/pexels-photo-18498681.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Lam Kinh', 'Lê Lợi', 'Khởi nghĩa Lam Sơn', 'Thanh Hóa', 'Bình Ngô Đại Cáo'],
  },
  {
    id: 'le-khao-le-the-linh-hoang-sa',
    name: 'Lễ Khao lề thế lính Hoàng Sa',
    alternateNames: ['Lễ tế lính Hoàng Sa', 'Tế vong hồn nghĩa sĩ Hoàng Sa'],
    category: 'Sự kiện lịch sử',
    ethnicGroup: 'Kinh',
    region: 'Trung',
    province: 'Quảng Ngãi (hợp nhất Kon Tum, Quảng Ngãi - 2025)',
    district: 'Đặc khu Lý Sơn (trước 2025: huyện đảo Lý Sơn)',
    locationName: 'Đình làng An Vĩnh, Âm Linh Tự và Đài tưởng niệm Đội Hoàng Sa kiêm quản Bắc Hải',
    coordinates: { lat: 15.3833, lng: 109.1167 },
    timingType: 'lunar',
    lunarRule: {
      month: 3,
      day: 15,
      endMonth: 3,
      endDay: 16,
      recurringNote: 'Thường diễn ra vào trung tuần tháng 2 hoặc rằm tháng 3 Âm lịch hằng năm',
    },
    historicalOrigin:
      'Ra đời từ thế kỷ XVII dưới thời chúa Nguyễn và tiếp nối dưới triều Nguyễn. Nhà nước cử Đội Hoàng Sa gồm những tráng đinh Lý Sơn vượt biển ra Hoàng Sa, Trường Sa cắm mốc chủ quyền, đo đạc hải trình và thu lượm sản vật.',
    culturalMeaning:
      'Bằng chứng lịch sử - văn hóa sống động khẳng định chủ quyền của Việt Nam đối với hai quần đảo Hoàng Sa và Trường Sa; tri ân những người con anh dũng hy sinh vì biển đảo.',
    mainRituals: {
      le: [
        'Lễ rước linh vị và bài vị các bậc tiền hiền hải đội Hoàng Sa về Đình An Vĩnh',
        'Nghi thức tế sống "thế lính": làm các thuyền nan tượng trưng và hình nhân thế mạng bằng bột gạo, đòn tre, chiếu cói và thẻ tre khắc tên binh phu',
        'Thả thuyền câu hình nhân ra biển hướng về quần đảo Hoàng Sa',
      ],
      hoi: [
        'Hội đua thuyền truyền thống Tứ linh (Long, Lân, Quy, Phụng)',
        'Trình diễn nghệ thuật diễn xướng dân gian bài chòi miền Trung',
        'Triển lãm tư liệu Hán Nôm và bản đồ cổ về chủ quyền biển đảo',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 1524/QĐ-BVHTTDL ngày 24/04/2013',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '24/04/2013',
      title: 'Đưa Lễ Khao lề thế lính Hoàng Sa vào Danh mục Di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
      excerpt:
        'Nghi lễ là chứng cứ lịch sử vô giá về sự thực thi chủ quyền của các nhà nước phong kiến Việt Nam đối với quần đảo Hoàng Sa và Trường Sa.',
    },
    directionsGuide:
      'Từ trung tâm tỉnh Quảng Ngãi đi xuống Cảng Sa Kỳ (khoảng 20km), sau đó đi tàu cao tốc ra Đặc khu Lý Sơn (huyện đảo Lý Sơn cũ) mất khoảng 35 - 45 phút.',
    visitorAdvice: [
      'Nên đặt vé tàu cao tốc và phòng lưu trú trước khi đến Lý Sơn vào mùa lễ hội.',
      'Bảo vệ rạn san hô và cảnh quan núi lửa Thới Lới, Chùa Hang, Cổng Tò Vò.',
    ],
    imageUrl: 'https://images.pexels.com/photos/38363965/pexels-photo-38363965.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Lý Sơn', 'Hoàng Sa', 'Trường Sa', 'Chủ quyền biển đảo', 'Quảng Ngãi'],
  },
  {
    id: 'khong-gian-van-hoa-cong-chieng-tay-nguyen',
    name: 'Không gian Văn hóa Cồng chiêng Tây Nguyên',
    alternateNames: ['Ngày hội Cồng chiêng', 'Lễ hội Cồng chiêng'],
    category: 'Lễ hội',
    ethnicGroup: 'Ba Na, Gia Rai, Ê Đê, Xơ Đăng, Cơ Ho, Mạ, M’Nông',
    region: 'Tây Nguyên',
    province: 'Gia Lai, Đắk Lắk, Lâm Đồng, Quảng Ngãi (5 tỉnh Tây Nguyên cũ gồm Kon Tum, Đắk Nông)',
    district: 'Vùng Tây Nguyên (sau hợp nhất 2025 thuộc Gia Lai, Đắk Lắk, Lâm Đồng, Quảng Ngãi)',
    locationName: 'Nhà rông, nhà dài và buôn làng vùng Tây Nguyên (Pleiku, Buôn Ma Thuột, Kon Tum cũ...)',
    coordinates: { lat: 13.9833, lng: 108.0 },
    timingType: 'solar',
    solarRule: {
      month: 11,
      day: 15,
      endMonth: 11,
      endDay: 18,
      recurringNote: 'Thường luân phiên tổ chức vào mùa khô Tây Nguyên (tháng 11 - 12 Dương lịch)',
    },
    historicalOrigin:
      'Gắn với lịch sử định cư và tín ngưỡng vạn vật hữu linh (Animism) của các dân tộc bản địa Tây Nguyên qua hàng nghìn năm.',
    culturalMeaning:
      'Cồng chiêng là tiếng nói tâm linh kết nối con người với thần linh, thần Rừng, thần Lúa; là linh hồn của buôn làng từ khi sinh ra, trưởng thành đến khi về với tổ tiên.',
    mainRituals: {
      le: [
        'Lễ cúng Yang (cúng thần linh đất trời bên cây nêu trang trí hoa văn)',
        'Lễ cúng sức khỏe cho voi và lễ thổi tai ban phước cho trẻ nhỏ',
        'Lễ tạ ơn mùa màng và mừng nhà rông mới',
      ],
      hoi: [
        'Vòng xoang cồng chiêng tập thể quanh đống lửa cùng ché rượu cần',
        'Hát kể Khan (sử thi Đăm San, Ot Ndrông) thâu đêm bên bếp lửa',
        'Trình diễn dệt thổ cẩm, tạc tượng gỗ dân gian nhà mồ',
      ],
    },
    legalBasis: {
      documentNumber: 'UNESCO Kiệt tác truyền khẩu & phi vật thể (2005), ghi danh 2008',
      issuingAuthority: 'UNESCO',
      issueDate: '25/11/2005',
      title: 'Không gian văn hóa Cồng chiêng Tây Nguyên được vinh danh là Di sản văn hóa phi vật thể đại diện của nhân loại',
      recognitionType: 'Di sản phi vật thể đại diện của nhân loại (UNESCO)',
      excerpt:
        'Cồng chiêng Tây Nguyên là kho tàng âm nhạc dân gian đặc sắc, trải rộng trên địa bàn các tỉnh vùng Tây Nguyên (5 tỉnh Tây Nguyên trước sắp xếp 2025: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng).',
    },
    directionsGuide:
      'Có thể bay thẳng từ Hà Nội/TP.HCM đến sân bay Pleiku (Gia Lai) hoặc Buôn Ma Thuột (Đắk Lắk), sau đó di chuyển vào các buôn làng truyền thống.',
    visitorAdvice: [
      'Uống rượu cần bằng cần trúc theo phong tục mến khách, không bước qua cần trúc khi đang uống.',
      'Xin phép già làng trước khi bước lên cầu thang nhà rông hoặc nhà dài.',
    ],
    imageUrl: 'https://images.pexels.com/photos/35212881/pexels-photo-35212881.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: true,
    nationalHeritage: true,
    tags: ['UNESCO', 'Cồng chiêng Tây Nguyên', 'Đăm San', 'Nhà Rông', 'Rượu Cần'],
  },
  {
    id: 'le-hoi-kate-dong-bao-cham',
    name: 'Lễ hội Katê của đồng bào Chăm',
    alternateNames: ['Tết Katê', 'Hội Katê tháp Chăm'],
    category: 'Lễ hội',
    ethnicGroup: 'Chăm (Chăm Bà-la-môn)',
    region: 'Trung',
    province: 'Khánh Hòa & Lâm Đồng (trước 2025: Ninh Thuận & Bình Thuận)',
    district: 'Khu vực Phan Rang - Tháp Chàm (Ninh Thuận cũ), Bắc Bình (Bình Thuận cũ)',
    locationName: 'Tháp Po Klong Garai, Tháp Po Rome và Tháp Po Sah Inư',
    coordinates: { lat: 11.6028, lng: 108.9536 },
    timingType: 'lunar',
    lunarRule: {
      month: 7,
      day: 1,
      endMonth: 7,
      endDay: 3,
      recurringNote: 'Ngày 1 tháng 7 Chăm lịch (thường rơi vào cuối tháng 9 hoặc tháng 10 Dương lịch; lịch quy đổi Âm lịch mang tính tham chiếu gần đúng)',
    },
    historicalOrigin:
      'Tưởng nhớ các vị thần linh, tổ tiên và các vị vua Champa có công trị thủy, bảo trợ mùa màng như Mẹ xứ sở Po Inu Nagar (Pô Inư Nưgar), Vua Po Klong Garai, Vua Po Rome.',
    culturalMeaning:
      'Lễ hội lớn nhất và linh thiêng nhất trong năm của người Chăm Bà-la-môn, hội tụ giá trị kiến trúc tháp cổ, trang phục thổ cẩm và nghệ thuật âm nhạc - múa Chăm.',
    mainRituals: {
      le: [
        'Lễ đón rước y phục vua thần do người Raglai trao trả lại cho người Chăm',
        'Nghi thức mở cửa tháp do chức sắc Cả sư (Po Adhia) chủ trì',
        'Lễ tắm tượng thần (Mộc dục) và mặc y phục mới cho tượng thần/vua',
      ],
      hoi: [
        'Vũ điệu quạt Chăm truyền thống của các thiếu nữ trong tà áo dài Chăm',
        'Âm vang kèn Saranai, trống Paranưng và trống Ginăng',
        'Thăm viếng chúc Tết dòng họ, thưởng thức bánh gừng, bánh tét Chăm',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định Bộ VHTTDL năm 2017 (công bố đón nhận ngày 19/10/2017) & QĐ số 776/QĐ-BVHTTDL (04/04/2022 - Bình Thuận cũ)',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '19/10/2017 (công bố Ninh Thuận cũ) / 04/04/2022',
      title: 'Đưa Lễ hội Katê của người Chăm vào Danh mục Di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia & Di tích đặc biệt',
      excerpt:
        'Lễ hội Katê là di sản văn hóa đặc sắc phản ánh mối quan hệ gắn bó giữa đồng bào Chăm và người Raglai vùng duyên hải Nam Trung Bộ (trước 2025 thuộc Ninh Thuận và Bình Thuận; sau hợp nhất 2025 thuộc Khánh Hòa và Lâm Đồng).',
    },
    directionsGuide:
      'Từ khu vực Phan Rang - Tháp Chàm (tỉnh Ninh Thuận cũ, nay thuộc tỉnh Khánh Hòa sau hợp nhất 2025) đi theo QL27 hướng Tây khoảng 7km là đến cụm tháp Po Klong Garai trên đồi Trầu.',
    visitorAdvice: [
      'Không leo trèo lên tường gạch tháp Chăm cổ.',
      'Cởi giày dép và giữ thái độ trang nghiêm khi bước vào tiền sảnh tháp.',
    ],
    imageUrl: 'https://images.pexels.com/photos/29534974/pexels-photo-29534974.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Lễ hội Katê', 'Người Chăm', 'Tháp Po Klong Garai', 'Khánh Hòa', 'Ninh Thuận cũ', 'Kèn Saranai'],
  },
  {
    id: 'le-hoi-via-ba-chua-xu-nui-sam',
    name: 'Lễ hội Vía Bà Chúa Xứ Núi Sam',
    alternateNames: ['Hội Miếu Bà Núi Sam', 'Vía Bà Châu Đốc'],
    category: 'Lễ hội',
    ethnicGroup: 'Kinh, Hoa, Chăm, Khmer',
    region: 'Nam',
    province: 'An Giang (hợp nhất An Giang, Kiên Giang - 2025)',
    district: 'Phường Vĩnh Tế / khu vực Châu Đốc (trước 2025: phường Núi Sam, TP. Châu Đốc)',
    locationName: 'Miếu Bà Chúa Xứ Núi Sam (Châu Đốc)',
    coordinates: { lat: 10.6667, lng: 105.0833 },
    timingType: 'lunar',
    lunarRule: {
      month: 4,
      day: 22,
      endMonth: 4,
      endDay: 27,
      recurringNote: 'Chính lễ từ ngày 22 đến 27 tháng 4 Âm lịch hằng năm (Lễ tắm Bà đêm 23 rạng sáng 24)',
    },
    historicalOrigin:
      'Gắn với huyền tích pho tượng Bà bằng sa thạch trên đỉnh núi Sam được thỉnh xuống chân núi vào đầu thế kỷ XIX và công lao Thoại Ngọc Hầu cùng phu nhân Châu Thị Tế khai khẩn vùng kênh Vĩnh Tế.',
    culturalMeaning:
      'Lễ hội tâm linh tiêu biểu của vùng Đồng bằng sông Cửu Long, biểu tượng của tín ngưỡng thờ Mẫu Nam Bộ và sự giao lưu, gắn kết văn hóa 4 dân tộc Kinh - Hoa - Chăm - Khmer.',
    mainRituals: {
      le: [
        'Lễ phục hiện rước tượng Bà từ đỉnh núi Sam xuống Miếu Bà',
        'Lễ Tắm Bà vào lúc 24h đêm ngày 23 rạng sáng 24 tháng 4 Âm lịch',
        'Lễ thỉnh sắc Thoại Ngọc Hầu và hai vị phu nhân từ Lăng về Miếu Bà',
        'Lễ Túc yết, Lễ Xây chầu, Lễ Chánh tế và Lễ Hồi sắc',
      ],
      hoi: [
        'Hát bội truyền thống tại võ ca Miếu Bà',
        'Múa lân sư rồng của các đoàn nghệ thuật cộng đồng',
        'Tham quan Lăng Thoại Ngọc Hầu, kênh Vĩnh Tế và vùng Bảy Núi',
      ],
    },
    legalBasis: {
      documentNumber: 'Ghi danh UNESCO ngày 04/12/2024 & Quyết định số 2640/QĐ-BVHTTDL',
      issuingAuthority: 'UNESCO & Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '04/12/2024 (UNESCO) / 19/12/2014 (QG)',
      title: 'Lễ hội Vía Bà Chúa Xứ Núi Sam chính thức được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại',
      recognitionType: 'Di sản phi vật thể đại diện của nhân loại (UNESCO)',
      excerpt:
        'Ngày 04/12/2024 tại Kỳ họp thứ 19 Ủy ban Liên Chính phủ Công ước 2003, UNESCO đã chính thức ghi danh Lễ hội Vía Bà Chúa Xứ Núi Sam (An Giang) là Di sản văn hóa phi vật thể thứ 16 của Việt Nam.',
    },
    directionsGuide:
      'Từ TP.HCM đi theo cao tốc Trung Lương - Mỹ Thuận - Cần Thơ, rồi theo QL91 về khu vực Châu Đốc, tỉnh An Giang khoảng 220km.',
    visitorAdvice: [
      'Cẩn trọng trước các hiện tượng chèo kéo nhang đèn, dịch vụ không niêm yết giá xung quanh cổng Miếu Bà.',
      'Giữ trật tự, tôn nghiêm và không đốt vàng mã bừa bãi.',
    ],
    imageUrl: 'https://images.pexels.com/photos/31636646/pexels-photo-31636646.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: true,
    nationalHeritage: true,
    tags: ['UNESCO 2024', 'Núi Sam', 'Bà Chúa Xứ', 'Châu Đốc', 'An Giang', 'Tín ngưỡng thờ Mẫu'],
  },
  {
    id: 'le-hoi-ok-om-bok-dua-ghe-ngo',
    name: 'Lễ hội Ok Om Bok và Đua ghe Ngo',
    alternateNames: ['Lễ Cúng Trăng', 'Hội Đua ghe Ngo Nam Bộ'],
    category: 'Lễ hội',
    ethnicGroup: 'Khmer Nam Bộ',
    region: 'Nam',
    province: 'TP. Cần Thơ & Tỉnh Vĩnh Long (trước 2025: Sóc Trăng & Trà Vinh)',
    district: 'Khu vực TP. Sóc Trăng cũ (nay thuộc Cần Thơ) & TP. Trà Vinh cũ (nay thuộc Vĩnh Long)',
    locationName: 'Sông Maspero (khu vực Sóc Trăng cũ - Cần Thơ) và Ao Bà Om (khu vực Trà Vinh cũ - Vĩnh Long)',
    coordinates: { lat: 9.6033, lng: 105.98 },
    timingType: 'lunar',
    lunarRule: {
      month: 10,
      day: 14,
      endMonth: 10,
      endDay: 15,
      recurringNote: 'Diễn ra vào ngày rằm (14 - 15) tháng 10 Âm lịch hằng năm',
    },
    historicalOrigin:
      'Gắn với tín ngưỡng thờ thần Mặt Trăng (Preah Chan) - vị thần bảo trợ thời tiết, mùa màng và nguồn nước của cư dân Khmer canh tác lúa nước Nam Bộ.',
    culturalMeaning:
      'Tạ ơn Thần Trăng ban cho vụ mùa tốt tươi, gắn với giải đua thuyền ghe Ngo (Um Tuk Ngô) kịch tính, thể hiện sức mạnh và tinh thần đoàn kết cộng đồng.',
    mainRituals: {
      le: [
        'Lễ Cúng Trăng đêm rằm: dâng cốm dẹp (Om Bok), khoai lang, chuối, dừa tươi',
        'Nghi thức đút cốm dẹp cho trẻ em và hỏi thăm ước nguyện tương lai',
        'Thả đèn gió (Lôi Protip) và hoa đăng trên mặt nước',
      ],
      hoi: [
        'Giải đua ghe Ngo trên sông Maspero với hàng chục đội ghe dài khoảng 30m, hàng chục tay chèo phối hợp nhịp nhàng',
        'Điệu múa Lâm Thôn, Rămvông truyền thống của thanh niên Khmer',
        'Trình diễn trang phục cổ truyền và dàn nhạc ngũ âm (Pinpeat)',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 2684/QĐ-BVHTTDL (25/08/2014) & Quyết định số 74/QĐ-BVHTTDL',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '25/08/2014',
      title: 'Đưa Lễ hội Ok Om Bok và Lễ hội Đua ghe Ngo của đồng bào Khmer vào Danh mục Di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
      excerpt:
        'Lễ hội Ok Om Bok và Đua ghe Ngo là biểu tượng hội tụ tinh hoa văn hóa, thể thao truyền thống đặc sắc của cộng đồng người Khmer vùng Đồng bằng sông Cửu Long (sau hợp nhất 2025: Sóc Trăng thuộc TP. Cần Thơ; Trà Vinh thuộc Vĩnh Long).',
    },
    directionsGuide:
      'Từ TP.HCM theo cao tốc hoặc QL1A qua cầu Cần Thơ về khu vực Sóc Trăng (nay thuộc TP. Cần Thơ) hoặc về khu vực Trà Vinh (nay thuộc tỉnh Vĩnh Long) khoảng 200 - 230km.',
    visitorAdvice: [
      'Nên đến bờ sông Maspero sớm trong ngày thi đấu chung kết để có vị trí theo dõi an toàn, thuận lợi.',
      'Thưởng thức đặc sản cốm dẹp trộn dừa nạo và đường thốt nốt.',
    ],
    imageUrl: 'https://images.pexels.com/photos/30594690/pexels-photo-30594690.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Ok Om Bok', 'Khmer Nam Bộ', 'Đua ghe Ngo', 'Cần Thơ', 'Vĩnh Long', 'Sóc Trăng cũ', 'Trà Vinh cũ'],
  },
  {
    id: 'le-hoi-chua-ba-thien-hau',
    name: 'Lễ hội Chùa Bà Thiên Hậu (Thủ Dầu Một)',
    alternateNames: ['Hội Chùa Bà Bình Dương cũ', 'Lễ Rước cộ Bà'],
    category: 'Lễ hội',
    ethnicGroup: 'Hoa & Kinh',
    region: 'Nam',
    province: 'TP. Hồ Chí Minh (gồm Bình Dương cũ - 2025)',
    district: 'Khu vực Thủ Dầu Một (trước 2025: TP. Thủ Dầu Một, tỉnh Bình Dương)',
    locationName: 'Miếu Bà Thiên Hậu (Chùa Bà), số 4 đường Nguyễn Du, khu vực Thủ Dầu Một',
    coordinates: { lat: 10.9804, lng: 106.6519 },
    timingType: 'lunar',
    lunarRule: {
      month: 1,
      day: 13,
      endMonth: 1,
      endDay: 15,
      recurringNote: 'Rằm tháng Giêng Âm lịch (Tết Nguyên Tiêu)',
    },
    historicalOrigin:
      'Ngôi miếu do cộng đồng người Việt gốc Hoa tại Thủ Dầu Một tạo lập từ giữa thế kỷ XIX để tôn thờ Thiên Hậu Thánh Mẫu (Lâm Mặc Nương) - vị phúc thần biển cả phù hộ cho bình an và giao thương thuận lợi.',
    culturalMeaning:
      'Lễ hội nổi tiếng với tinh thần tương thân tương ái và nét đẹp thiện nguyện phục vụ nước uống, khăn lạnh, suất ăn miễn phí cho khách hành hương.',
    mainRituals: {
      le: [
        'Lễ khai môn và cúng tạ Thiên Hậu Thánh Mẫu dịp Rằm tháng Giêng',
        'Lễ rước cộ Bà tuần du qua các tuyến phố trung tâm Thủ Dầu Một vào chiều ngày 15 tháng Giêng',
        'Thỉnh lộc bình an đầu năm',
      ],
      hoi: [
        'Đoàn rước lân sư rồng của các đoàn nghệ thuật người Hoa và cộng đồng địa phương',
        'Đội rước cờ hoa, múa truyền thống chúc phúc',
        'Các điểm phát nước uống, thức ăn chay miễn phí nghĩa tình của người dân địa phương',
      ],
    },
    legalBasis: {
      documentNumber: 'Nghị định số 110/2018/NĐ-CP & Xếp hạng Di tích cấp tỉnh',
      issuingAuthority: 'Chính phủ & Chính quyền địa phương',
      issueDate: '29/08/2018 (NĐ 110)',
      title: 'Di tích lịch sử - văn hóa cấp tỉnh (Thiên Hậu Cung Thủ Dầu Một) & Lễ hội truyền thống quản lý theo Nghị định 110/2018/NĐ-CP',
      recognitionType: 'Di tích lịch sử - văn hóa cấp tỉnh & Lễ hội truyền thống tiêu biểu',
      excerpt:
        'Thiên Hậu Cung tại Thủ Dầu Một (trước 2025 thuộc tỉnh Bình Dương, nay hợp nhất vào TP. Hồ Chí Minh) là di tích kiến trúc văn hóa cấp tỉnh, tổ chức lễ hội Rằm tháng Giêng theo quy định của Nghị định 110/2018/NĐ-CP.',
    },
    directionsGuide:
      'Cách khu vực trung tâm Sài Gòn (TP.HCM) khoảng 30km về phía Bắc theo Đại lộ Bình Dương (QL13) về phường Phú Cường / khu vực Thủ Dầu Một cũ.',
    visitorAdvice: [
      'Không cắm bó nhang quá lớn gây khói ngạt và nguy cơ cháy nổ trong chính điện.',
      'Giữ gìn vệ sinh chung, ứng xử văn minh tại các điểm tiếp đón thiện nguyện miễn phí.',
    ],
    imageUrl: 'https://images.pexels.com/photos/40199242/pexels-photo-40199242.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: false,
    tags: ['Chùa Bà', 'Thiên Hậu', 'TP. Hồ Chí Minh', 'Bình Dương cũ', 'Người Hoa', 'Thiện nguyện'],
  },
  {
    id: 'ngay-quoc-khanh-viet-nam',
    name: 'Ngày Quốc khánh Nước CHXHCN Việt Nam (2/9)',
    alternateNames: ['Ngày Tết Độc Lập', 'Ngày Tuyên ngôn Độc lập'],
    category: 'Sự kiện lịch sử',
    ethnicGroup: 'Khối đại đoàn kết 54 dân tộc Việt Nam',
    region: 'Bắc',
    province: 'Toàn quốc (34 tỉnh, thành phố sau sắp xếp 2025)',
    district: 'Quảng trường Ba Đình (TP. Hà Nội) & cả nước',
    locationName: 'Quảng trường Ba Đình, Lăng Chủ tịch Hồ Chí Minh và trên mọi miền Tổ quốc',
    coordinates: { lat: 21.0368, lng: 105.8344 },
    timingType: 'solar',
    solarRule: {
      month: 9,
      day: 2,
      endMonth: 9,
      endDay: 2,
      recurringNote: 'Ngày 2 tháng 9 Dương lịch hằng năm',
    },
    historicalOrigin:
      'Ngày 02/09/1945, tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa (nay là nước Cộng hòa Xã hội Chủ nghĩa Việt Nam).',
    culturalMeaning:
      'Mốc son chói lọi trong lịch sử dựng nước và giữ nước, mở ra kỷ nguyên độc lập, tự do của dân tộc Việt Nam.',
    mainRituals: {
      le: [
        'Lễ thượng cờ trang nghiêm và dâng hoa tưởng niệm tại Lăng Chủ tịch Hồ Chí Minh',
        'Lễ viếng Đài tưởng niệm các Anh hùng liệt sĩ Bắc Sơn',
        'Các hoạt động dâng hương tưởng niệm Chủ tịch Hồ Chí Minh',
      ],
      hoi: [
        'Đồng bào các dân tộc vùng cao mặc trang phục truyền thống xuống chợ đón "Tết Độc Lập"',
        'Các chương trình nghệ thuật, bắn pháo hoa kỷ niệm tại các đô thị lớn',
        'Các chương trình hòa nhạc quốc gia và triển lãm lịch sử',
      ],
    },
    legalBasis: {
      documentNumber: 'Hiến pháp nước CHXHCN Việt Nam (Điều 13) & Bộ luật Lao động số 45/2019/QH14',
      issuingAuthority: 'Quốc hội nước CHXHCN Việt Nam',
      issueDate: '28/11/2013 (Hiến pháp) / 20/11/2019 (BLLĐ)',
      title: 'Quy định Ngày Quốc khánh là Ngày Quốc lễ của Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
      recognitionType: 'Ngày Quốc lễ thiêng liêng',
      excerpt:
        'Quốc khánh nước Cộng hòa xã hội chủ nghĩa Việt Nam là ngày 2 tháng 9. Người lao động được nghỉ làm việc, hưởng nguyên lương theo quy định của pháp luật.',
    },
    directionsGuide:
      'Tại Thủ đô Hà Nội, các tuyến đường Hùng Vương, Độc Lập, Điện Biên Phủ, Hoàng Diệu dẫn trực tiếp về Quảng trường Ba Đình lịch sử.',
    visitorAdvice: [
      'Xếp hàng trật tự, trang phục chỉnh tề khi vào Lăng viếng Chủ tịch Hồ Chí Minh.',
      'Treo cờ Tổ quốc đúng quy cách chào mừng ngày Quốc khánh.',
    ],
    imageUrl: 'https://images.pexels.com/photos/39304466/pexels-photo-39304466.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Quốc khánh', '2 tháng 9', 'Tết Độc Lập', 'Chủ tịch Hồ Chí Minh', 'Tuyên ngôn Độc lập'],
  },
  {
    id: 'ngay-chien-thang-dien-bien-phu',
    name: 'Kỷ niệm Chiến thắng Lịch sử Điện Biên Phủ (7/5)',
    alternateNames: ['Chiến thắng Điện Biên Phủ', 'Lừng lẫy năm châu, chấn động địa cầu'],
    category: 'Sự kiện lịch sử',
    ethnicGroup: 'Kinh, Thái, H’Mông, Khơ Mú...',
    region: 'Bắc',
    province: 'Điện Biên (giữ nguyên cấp tỉnh - 2025)',
    district: 'Phường Điện Biên Phủ (trước 2025: TP. Điện Biên Phủ)',
    locationName: 'Đồi A1, Hầm Đờ Cát (De Castries), Sở chỉ huy Mường Phăng, Tượng đài Chiến thắng',
    coordinates: { lat: 21.3833, lng: 103.0167 },
    timingType: 'solar',
    solarRule: {
      month: 5,
      day: 7,
      endMonth: 5,
      endDay: 7,
      recurringNote: 'Ngày 7 tháng 5 Dương lịch hằng năm',
    },
    historicalOrigin:
      'Ngày 07/05/1954, lá cờ "Quyết chiến - Quyết thắng" của Quân đội Nhân dân Việt Nam tung bay trên nóc hầm tướng De Castries, kết thúc thắng lợi 56 ngày đêm chiến đấu anh dũng, đập tan tập đoàn cứ điểm Điện Biên Phủ.',
    culturalMeaning:
      'Mốc son vàng chói lọi trong lịch sử dân tộc và phong trào giải phóng dân tộc trên thế giới, dẫn tới ký kết Hiệp định Genève năm 1954.',
    mainRituals: {
      le: [
        'Lễ dâng hương tưởng niệm các anh hùng liệt sĩ tại Nghĩa trang Liệt sĩ A1, Him Lam, Độc Lập',
        'Lễ kỷ niệm trang trọng tại Sân vận động tỉnh Điện Biên',
        'Lễ tri ân các cựu chiến binh, thanh niên xung phong, dân công hỏa tuyến',
      ],
      hoi: [
        'Hội múa xòe hoa đại đoàn kết Tây Bắc quanh Tượng đài Chiến thắng',
        'Hoạt động tái hiện đẩy xe đạp thồ, tải đạn đường ra trận',
        'Các hoạt động văn hóa, lễ hội hoa ban vùng Tây Bắc',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 1272/QĐ-TTg ngày 12/08/2009',
      issuingAuthority: 'Thủ tướng Chính phủ',
      issueDate: '12/08/2009',
      title: 'Xếp hạng Chiến trường Điện Biên Phủ là Di tích quốc gia đặc biệt',
      recognitionType: 'Di tích quốc gia đặc biệt',
      excerpt:
        'Quần thể di tích Chiến trường Điện Biên Phủ gồm 45 điểm di tích lưu giữ chiến công hiển hách của quân và dân ta.',
    },
    directionsGuide:
      'Sân bay Điện Biên tiếp nhận các chuyến bay từ Hà Nội và TP.HCM. Tuyến đường bộ theo QL6 qua đèo Pha Đin khoảng 450km.',
    visitorAdvice: [
      'Ghé thăm Bảo tàng Chiến thắng Lịch sử Điện Biên Phủ để chiêm ngưỡng bức tranh Panorama tái hiện chiến dịch.',
      'Giữ sự trang nghiêm tại Nghĩa trang Liệt sĩ A1 và các điểm di tích lịch sử.',
    ],
    imageUrl: 'https://images.pexels.com/photos/30248743/pexels-photo-30248743.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Điện Biên Phủ', '7 tháng 5', 'Đồi A1', 'Tây Bắc', 'Đại tướng Võ Nguyên Giáp'],
  },
  {
    id: 'ngay-thong-nhat-dat-nuoc-30-4',
    name: 'Ngày Giải phóng miền Nam, Thống nhất Đất nước (30/4)',
    alternateNames: ['Ngày Chiến thắng 30/4', 'Ngày Thống nhất'],
    category: 'Sự kiện lịch sử',
    ethnicGroup: '54 dân tộc Việt Nam',
    region: 'Nam',
    province: 'TP. Hồ Chí Minh (hợp nhất TP.HCM, Bình Dương, Bà Rịa - Vũng Tàu) & Toàn quốc',
    district: 'Khu vực Quận 1 cũ (bỏ cấp huyện từ 2025)',
    locationName: 'Hội trường Thống Nhất (Dinh Độc Lập), TP. Hồ Chí Minh',
    coordinates: { lat: 10.777, lng: 106.6953 },
    timingType: 'solar',
    solarRule: {
      month: 4,
      day: 30,
      endMonth: 4,
      endDay: 30,
      recurringNote: 'Ngày 30 tháng 4 Dương lịch hằng năm',
    },
    historicalOrigin:
      '11 giờ 30 phút ngày 30/04/1975, lực lượng quân giải phóng tiến vào Dinh Độc Lập, kết thúc thắng lợi Chiến dịch Hồ Chí Minh lịch sử, giải phóng hoàn toàn miền Nam, thống nhất đất nước.',
    culturalMeaning:
      'Khép lại cuộc kháng chiến chống Mỹ cứu nước trường kỳ, mở ra thời kỳ cả nước hòa bình, độc lập, thống nhất và xây dựng đất nước.',
    mainRituals: {
      le: [
        'Lễ dâng hoa tại Tượng đài Chủ tịch Hồ Chí Minh trên phố đi bộ Nguyễn Huệ',
        'Lễ viếng Nghĩa trang Liệt sĩ TP.HCM và Đền Tưởng niệm Bến Dược - Củ Chi',
        'Lễ kỷ niệm Ngày Giải phóng miền Nam, Thống nhất đất nước',
      ],
      hoi: [
        'Cuộc đua xe đạp Cúp Truyền hình TP.HCM về đích trước Hội trường Thống Nhất trưa 30/4',
        'Các hoạt động bắn pháo hoa nghệ thuật chào mừng',
        'Chương trình nghệ thuật cộng đồng phục vụ người dân và du khách',
      ],
    },
    legalBasis: {
      documentNumber: 'Bộ luật Lao động số 45/2019/QH14 (Điều 112)',
      issuingAuthority: 'Quốc hội nước CHXHCN Việt Nam',
      issueDate: '20/11/2019',
      title: 'Quy định Ngày Chiến thắng 30/4 là Ngày nghỉ lễ chính thức của quốc gia',
      recognitionType: 'Ngày lễ lớn của dân tộc',
      excerpt:
        'Ngày 30 tháng 4 là biểu tượng của tinh thần quật cường, khát vọng hòa bình và sự thống nhất toàn vẹn lãnh thổ Việt Nam.',
    },
    directionsGuide:
      'Hội trường Thống Nhất (Dinh Độc Lập) nằm tại số 135 đường Nam Kỳ Khởi Nghĩa, phường Bến Thành, khu vực trung tâm TP. Hồ Chí Minh (Quận 1 cũ).',
    visitorAdvice: [
      'Tham quan khu trưng bày di tích, hầm tác chiến ngầm dưới lòng Dinh Độc Lập và hai xe tăng lịch sử mang số hiệu 390 và 843 (bảo vật quốc gia).',
    ],
    imageUrl: 'https://images.pexels.com/photos/20051245/pexels-photo-20051245.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['30 tháng 4', 'Dinh Độc Lập', 'Chiến dịch Hồ Chí Minh', 'Thống nhất đất nước'],
  },
  {
    id: 'le-hoi-dua-bo-bay-nui',
    name: 'Lễ hội Đua bò Bảy Núi (An Giang)',
    alternateNames: ['Hội Đua bò Chùa Rô', 'Lễ hội Sene Dolta'],
    category: 'Phong tục',
    ethnicGroup: 'Khmer Nam Bộ',
    region: 'Nam',
    province: 'An Giang (hợp nhất An Giang, Kiên Giang - 2025)',
    district: 'Khu vực Tri Tôn & Tịnh Biên (trước sắp xếp 2025)',
    locationName: 'Sân đua bò vùng Bảy Núi (khu vực Tri Tôn, Tịnh Biên - An Giang)',
    coordinates: { lat: 10.4167, lng: 105.0 },
    timingType: 'lunar',
    lunarRule: {
      month: 8,
      day: 29,
      endMonth: 9,
      endDay: 1,
      recurringNote: 'Diễn ra vào dịp lễ Sene Dolta (báo hiếu tổ tiên) cuối tháng 8 hoặc đầu tháng 9 Âm lịch',
    },
    historicalOrigin:
      'Khởi nguồn từ tập quán bà con Khmer giúp nhau cày cấy ruộng chùa. Sau khi cày xong, các chủ đôi bò so tài kéo bừa biểu diễn, dần trở thành hội đua bò truyền thống đặc sắc vùng Bảy Núi.',
    culturalMeaning:
      'Nét sinh hoạt thể thao dân gian hào sảng thể hiện lòng tôn kính tổ tiên, tinh thần thượng võ và tài nghệ điều khiển đôi bò trên ruộng bùn.',
    mainRituals: {
      le: [
        'Lễ cúng dâng cơm, phẩm vật lên chư tăng tại chùa Khmer trong dịp lễ Sene Dolta',
        'Nghi thức bái tạ tổ tiên cầu phúc cho dòng tộc bình an, no ấm',
      ],
      hoi: [
        'Vòng đua bò chia làm hai chặng: vòng "Hô" (đi chậm biểu diễn) và vòng "Thả" (bứt tốc về đích)',
        'Người cầm roi điều khiển đứng khéo léo trên chiếc bừa gỗ xới tung bọt bùn nước',
        'Âm thanh cổ vũ rộn ràng của bà con và du khách vùng Thất Sơn - Bảy Núi',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 246/QĐ-BVHTTDL ngày 19/01/2016',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '19/01/2016',
      title: 'Đưa Hội Đua bò Bảy Núi - An Giang vào Danh mục Di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
      excerpt:
        'Hội đua bò Bảy Núi mang giá trị văn hóa độc đáo, thể hiện tình đoàn kết và sức sáng tạo của đồng bào Khmer vùng bán sơn địa Tây Nam Bộ.',
    },
    directionsGuide:
      'Từ khu vực Long Xuyên hoặc Châu Đốc (An Giang) theo ĐT941 hoặc QL91 đi về khu vực Tri Tôn / Tịnh Biên khoảng 50km.',
    visitorAdvice: [
      'Mang theo mũ nón, trang phục gọn nhẹ vì các đôi bò chạy tạt bùn nước rất mạnh.',
      'Đứng phía sau hàng rào bảo vệ an toàn của Ban tổ chức.',
    ],
    imageUrl: 'https://images.pexels.com/photos/28706847/pexels-photo-28706847.jpeg?auto=compress&cs=tinysrgb&w=1200',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Đua bò Bảy Núi', 'Tri Tôn', 'An Giang', 'Khmer', 'Sene Dolta'],
  },
];
