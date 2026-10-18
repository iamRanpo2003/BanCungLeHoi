import type { FestivalEvent } from '../types/festival.ts';

export const FESTIVALS_DATA: FestivalEvent[] = [
  {
    id: 'gio-to-hung-vuong',
    name: 'Giỗ Tổ Hùng Vương - Lễ hội Đền Hùng',
    alternateNames: ['Ngày Giỗ Quốc Tổ', 'Hội Đền Hùng'],
    category: 'Lễ hội',
    ethnicGroup: 'Kinh (và khối đại đoàn kết 54 dân tộc)',
    region: 'Bắc',
    province: 'Phú Thọ',
    district: 'TP. Việt Trì',
    locationName: 'Khu Di tích lịch sử Đền Hùng, Núi Nghĩa Lĩnh, xã Hy Cương',
    coordinates: { lat: 21.3653, lng: 105.3267 },
    timingType: 'lunar',
    lunarRule: {
      month: 3,
      day: 10,
      endMonth: 3,
      endDay: 10,
      recurringNote: 'Chính lễ vào ngày 10 tháng 3 Âm lịch hàng năm (hoạt động từ mùng 1 đến mùng 10)',
    },
    historicalOrigin:
      'Gắn liền với truyền thuyết thời kỳ Hồng Bàng, dựng nước Văn Lang của 18 đời Vua Hùng. Lễ hội là đỉnh cao của truyền thống uống nước nhớ nguồn, tôn vinh công lao mở cõi và dựng nước của các Vua Hùng.',
    culturalMeaning:
      'Biểu tượng thiêng liêng cố kết cộng đồng dân tộc Việt Nam. Là minh chứng sống động cho tín ngưỡng thờ cúng tổ tiên chung của cả một quốc gia - hiện tượng văn hóa độc nhất vô nhị trên thế giới.',
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
      documentNumber: 'Quyết định số 1272/QĐ-TTg & Hồ sơ UNESCO số 00735',
      issuingAuthority: 'Thủ tướng Chính phủ & UNESCO',
      issueDate: '06/12/2012',
      title: 'Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại',
      recognitionType: 'Di sản phi vật thể đại diện của nhân loại (UNESCO)',
      excerpt:
        'Khu Di tích Đền Hùng được xếp hạng Di tích quốc gia đặc biệt theo Quyết định 1272/QĐ-TTg. Tín ngưỡng thờ cúng Hùng Vương thể hiện lòng biết ơn sâu sắc đối với tổ tiên.',
    },
    directionsGuide:
      'Từ Hà Nội di chuyển theo cao tốc Nội Bài - Lào Cai (CT05), rẽ nút giao Phù Ninh/Việt Trì theo QL2 khoảng 85km. Có thể đi tàu hỏa tuyến Hà Nội - Việt Trì rồi bắt xe buýt tuyến 19 thẳng đến cổng Đền Hùng.',
    visitorAdvice: [
      'Trang phục lịch sự, kín đáo khi vào dâng hương tại các đền Hạ, Trung, Thượng, Giếng.',
      'Tuân thủ luồng di chuyển một chiều lên núi Nghĩa Lĩnh trong ngày chính hội 10/3 tránh ùn tắc.',
      'Giữ gìn vệ sinh môi trường, không cắm hương tùy tiện vào thân cây hoặc vách đá.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599837565318-67429bde7162?auto=format&fit=crop&w=1200&q=80',
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
    province: 'Hà Nội',
    district: 'Huyện Mỹ Đức',
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
      'Gắn với tín ngưỡng Phật giáo Đại thừa và truyền thuyết Bồ Tát Quán Thế Âm hóa thân thành công chúa Diệu Thiện tu hành đắc đạo tại Động Hương Tích vào thế kỷ thứ VII.',
    culturalMeaning:
      'Lễ hội kéo dài nhất cả nước, kết hợp hài hòa giữa tín ngưỡng Phật giáo, Nho giáo, Đạo giáo và văn hóa thờ Mẫu dân gian, giữa cảnh quan thiên nhiên sông nước non ngàn hùng vĩ.',
    mainRituals: {
      le: [
        'Lễ khai sơn mùng 6 tháng Giêng tại đền Ngũ Nhạc',
        'Nghi thức dâng hương, lễ Phật, niệm chú cầu quốc thái dân an tại Chùa Thiên Trù và Động Hương Tích',
        'Lễ rước nước thiêng đầu năm',
      ],
      hoi: [
        'Hành hương ngồi đò vãn cảnh dòng suối Yến thơ mộng',
        'Leo núi vãn cảnh các danh lam Tuyết Sơn, Long Vân, Thanh Sơn',
        'Hát chèo, hát ca trù tại các thuyền đò và sân đền',
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
      'Cách trung tâm Hà Nội 60km về phía Tây Nam theo hướng QL21B qua Ba La, Vân Đình đến thị trấn Đại Nghĩa rồi vào bến Đục (suối Yến). Xe buýt chất lượng cao tuyến 103A và 103B chạy liên tục mỗi ngày.',
    visitorAdvice: [
      'Mặc áo phao an toàn trong suốt hành trình ngồi thuyền đò suối Yến.',
      'Chuẩn bị giày đế mềm chống trơn trượt khi leo bậc đá Hương Tích.',
      'Bỏ rác đúng nơi quy định, kiên quyết từ chối chèo kéo dịch vụ không niêm yết giá.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
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
    province: 'Hà Nội',
    district: 'Gia Lâm & Sóc Sơn',
    locationName: 'Đền Phù Đổng (xã Phù Đổng, Gia Lâm) và Đền Sóc (xã Phù Linh, Sóc Sơn)',
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
      'Di sản đại diện của nhân loại phản ánh tinh thần thượng võ, ý chí độc lập quật cường của dân tộc và nghệ thuật diễn xướng dân gian mang tính sử thi hoành tráng.',
    mainRituals: {
      le: [
        'Lễ khai quang tắm rửa tượng Thánh (lễ Mộc dục)',
        'Lễ rước nước sông Đuống tôi gươm lệnh',
        'Lễ tế hội đồng và rước cỗ chín bậc',
        'Lễ rước kiệu hoa tre và tướng giặc quy hàng',
      ],
      hoi: [
        'Diễn xướng trận đánh giặc Ân với đạo quân áo đỏ, áo đen, cờ lệnh và múa Hổ',
        'Hát ải quang tại bãi Đống Đàm và bãi Soi Bia',
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
        'Hội Gióng là biểu tượng sinh động của lòng yêu nước nồng nàn, được cộng đồng lưu truyền qua hàng ngàn năm lịch sử.',
    },
    directionsGuide:
      'Đền Phù Đổng cách trung tâm Hà Nội 18km qua cầu Đuống, đường Đê Vàng. Đền Sóc cách trung tâm 35km theo hướng cầu Thăng Long/Nhật Tân lên núi Sóc huyện Sóc Sơn.',
    visitorAdvice: [
      'Tôn trọng thứ tự rước kiệu, tuyệt đối không chen lấn xô đẩy tranh cướp giò hoa tre.',
      'Không đứng chắn trước khu vực diễn xướng của đội quân cờ lệnh.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
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
    province: 'Nam Định',
    district: 'TP. Nam Định',
    locationName: 'Khu di tích lịch sử Đền Trần, phường Lộc Vượng',
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
      'Biểu dương hào khí Đông A oanh liệt thời Trần, giáo dục lòng yêu nước, ý chí độc lập tự chủ và rèn luyện đạo đức người làm quan vì nước vì dân.',
    mainRituals: {
      le: [
        'Lễ rước kiệu Ngọc Lộ từ Đền Phổ Minh sang Đền Thiên Trường',
        'Lễ rước Nước và tế cá đầu năm',
        'Nghi thức thiêng Khai ấn vào giờ Tý đêm 14 tháng Giêng',
        'Lễ dâng hương tưởng niệm 14 vị Hoàng đế triều Trần',
      ],
      hoi: [
        'Múa lân, rồng, sư tử rộn ràng tại sân đền Trùng Hoa',
        'Hội chọi gà dân gian, đấu vật hào khí Đông A',
        'Biểu diễn nghệ thuật hát chèo cổ và chầu văn Nam Định',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 2499/QĐ-BVHTTDL ngày 27/09/2012',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '27/09/2012',
      title: 'Đưa Lễ hội Đền Trần (Nam Định) vào Danh mục di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia & Di tích đặc biệt',
      excerpt:
        'Lễ hội thể hiện truyền thống đạo lý "Uống nước nhớ nguồn" và tinh thần đoàn kết hào khí Đông A đại thắng giặc ngoại xâm.',
    },
    directionsGuide:
      'Đi cao tốc Cầu Giẽ - Ninh Bình (CT01), rẽ trạm thu phí Liêm Tuyền đi TP. Nam Định theo QL21 khoảng 85km. Đền Trần nằm ngay trên đường Trần Thừa.',
    visitorAdvice: [
      'Nhà đền phát ấn kéo dài suốt tháng Giêng, du khách không cần phải chen lấn trong đêm 14.',
      'Cảnh giác phòng ngừa trộm cắp, móc túi nơi đông người.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?auto=format&fit=crop&w=1200&q=80',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Đền Trần', 'Hào khí Đông A', 'Khai ấn', 'Nam Định', 'Di sản Quốc gia'],
  },
  {
    id: 'hoi-lim-bac-ninh',
    name: 'Hội Lim - Vùng đất Dân ca Quan họ',
    alternateNames: ['Hội Lim Tiên Du', 'Lễ hội hát Quan họ'],
    category: 'Lễ hội',
    ethnicGroup: 'Kinh',
    region: 'Bắc',
    province: 'Bắc Ninh',
    district: 'Huyện Tiên Du',
    locationName: 'Đồi Lim, thị trấn Lim và các làng quan họ cổ ven sông Tiêu Tương',
    coordinates: { lat: 21.1685, lng: 105.9984 },
    timingType: 'lunar',
    lunarRule: {
      month: 1,
      day: 12,
      endMonth: 1,
      endDay: 14,
      recurringNote: 'Chính hội vào ngày 13 tháng Giêng Âm lịch hàng năm',
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
      documentNumber: 'Hồ sơ UNESCO số 00183 & Quyết định BVHTTDL',
      issuingAuthority: 'UNESCO & Bộ VHTTDL',
      issueDate: '30/09/2009',
      title: 'Dân ca Quan họ Bắc Ninh được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại',
      recognitionType: 'Di sản phi vật thể đại diện của nhân loại (UNESCO)',
      excerpt:
        'Hội Lim là không gian văn hóa cộng đồng cốt lõi nuôi dưỡng và trao truyền các làn điệu Quan họ mượt mà đượm tình quê hương.',
    },
    directionsGuide:
      'Cách trung tâm Hà Nội khoảng 25km theo Quốc lộ 1A cũ hoặc cao tốc Hà Nội - Bắc Giang. Ga xe lửa Lim nằm ngay chân đồi, rất thuận tiện đi lại.',
    visitorAdvice: [
      'Thưởng thức trọn vẹn văn hóa quan họ qua tục têm trầu cánh phượng và chén rượu ấm đón khách.',
      'Tuyệt đối không ngả nón xin tiền, giữ gìn nét đẹp thanh lịch của liền anh liền chị quan họ.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
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
    province: 'Cao Bằng, Bắc Kạn, Tuyên Quang, Lào Cai',
    district: 'Các huyện vùng Việt Bắc & Tây Bắc',
    locationName: 'Cánh đồng bằng phẳng các bản làng Tày, Nùng (như Định Hóa, Ba Bể, Sa Pa)',
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
      'Bắt nguồn từ tín ngưỡng nông nghiệp lúa nước sơ khai của cư dân ngữ hệ Tày - Thái, tạ ơn Thành hoàng, Thần Nông và cầu mùa màng bội thu.',
    culturalMeaning:
      'Bức tranh sinh hoạt văn hóa dân gian rực rỡ nhất vùng Việt Bắc, gắn liền với tình yêu lao động, sự gắn kết cộng đồng bản làng qua nhiều thế hệ.',
    mainRituals: {
      le: [
        'Lễ cúng Thần Nông, Thần Núi, Thần Suối dâng xôi ngũ sắc, gà thiến, thịt lợn quay',
        'Nghi thức đường cày tịch điền đầu xuân của già làng uy tín',
        'Lễ phát lộc hạt giống tốt cho các gia đình trong bản',
      ],
      hoi: [
        'Hội thi tung còn qua vòng tròn giấy đỏ trên cây nêu tre cao',
        'Hát Then, đàn Tính dặt dìu mời gọi nàng dâu, chàng rể',
        'Kéo co bằng dây song rừng, đẩy gậy, đi cà kheo, chọi chim họa mi',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 268/QĐ-BVHTTDL',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '20/01/2013',
      title: 'Đưa Lễ hội Lồng Tồng của người Tày vào Danh mục Di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
      excerpt:
        'Lễ hội bảo tồn hệ thống nghi lễ nông nghiệp cổ truyền và nghệ thuật hát Then, đàn Tính độc đáo của các dân tộc thiểu số miền núi phía Bắc.',
    },
    directionsGuide:
      'Có thể tham dự tại Khu di tích Quốc gia đặc biệt ATK Định Hóa (Thái Nguyên) hoặc Hồ Ba Bể (Bắc Kạn) theo tuyến QL3 từ Hà Nội khoảng 150 - 220km.',
    visitorAdvice: [
      'Ăn mặc gọn gàng, chuẩn bị áo ấm vì tiết trời xuân vùng cao còn se lạnh.',
      'Cùng tham gia ném còn cầu may cùng bà con nhưng lưu ý vị trí người đứng phía dưới vòng còn.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Lồng Tồng', 'Người Tày', 'Người Nùng', 'Hát Then', 'Xuống đồng'],
  },
  {
    id: 'le-hoi-gau-tao-hmong',
    name: 'Lễ hội Gầu Tào của người H’Mông',
    alternateNames: ['Hội cầu phúc cầu mệnh', 'Grâu Taox'],
    category: 'Phong tục',
    ethnicGroup: "H'Mông",
    region: 'Bắc',
    province: 'Hà Giang, Lào Cai, Lai Châu',
    district: 'Đồng Văn, Mèo Vạc, Bắc Hà, Mường Khương',
    locationName: 'Bãi đất dốc thoải trên đồi cao của bản người Mông',
    coordinates: { lat: 23.279, lng: 105.362 },
    timingType: 'lunar',
    lunarRule: {
      month: 1,
      day: 1,
      endMonth: 1,
      endDay: 15,
      recurringNote: 'Thường mở hội vào ngày đầu xuân từ mùng 1 đến mùng 15 tháng Giêng',
    },
    historicalOrigin:
      'Gắn với phong tục cầu phúc (cầu con cái) hoặc cầu mệnh (cầu sức khỏe, xua đuổi rủi ro) của các dòng họ người Mông trên rẻo cao đá tai mèo.',
    culturalMeaning:
      'Thể hiện ước vọng sinh sôi nảy nở, tinh thần kiên cường chinh phục thiên nhiên khắc nghiệt và bảo lưu trọn vẹn âm vang khèn Mông huyền thoại.',
    mainRituals: {
      le: [
        'Lễ dựng cây nêu thiêng (được chọn kỹ từ cây bương thẳng, còn ngọn lá)',
        'Thầy cúng dâng lễ ngô men lá, gà trống đỏ tế thần linh trời đất',
        'Nghi thức hạ cây nêu tạ ơn vào ngày kết thúc hội',
      ],
      hoi: [
        'Hội múa khèn Mông với những động tác lộn vòng, nhảy ngồi điêu luyện',
        'Thi đấu bắn nỏ, ném pao giao duyên của các chàng trai cô gái Mông',
        'Đua ngựa vùng cao, chọi bò tót H’Mông',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 5079/QĐ-BVHTTDL',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '27/12/2012',
      title: 'Công nhận Lễ hội Gầu Tào của đồng bào Mông là Di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
      excerpt:
        'Lễ hội khẳng định bản sắc tộc người H’Mông và tính liên kết dòng họ bền chặt giữa các bản làng vùng Công viên địa chất toàn cầu Cao nguyên đá Đồng Văn.',
    },
    directionsGuide:
      'Từ TP. Hà Giang theo QL4C (Con đường Hạnh Phúc) qua Cổng trời Quản Bạ, Yên Minh đến huyện Đồng Văn hoặc Mèo Vạc.',
    visitorAdvice: [
      'Không tự ý chạm tay vào gốc cây nêu khi lễ cúng chưa hoàn tất.',
      'Tôn trọng phong tục bản địa, xin phép trước khi chụp ảnh người dân trong trang phục truyền thống.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ["Người H'Mông", 'Gầu Tào', 'Cao nguyên đá Đồng Văn', 'Múa khèn'],
  },
  {
    id: 'le-hoi-lam-kinh',
    name: 'Lễ hội Lam Kinh - Hào khí Hậu Lê',
    alternateNames: ['Hội Đền Lê Thái Tổ', 'Lễ tưởng niệm Khởi nghĩa Lam Sơn'],
    category: 'Sự kiện lịch sử',
    ethnicGroup: 'Kinh (và người Mường Thanh Hóa)',
    region: 'Trung',
    province: 'Thanh Hóa',
    district: 'Huyện Thọ Xuân & Ngọc Lặc',
    locationName: 'Khu Di tích lịch sử quốc gia đặc biệt Lam Kinh, thị trấn Lam Sơn',
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
      'Kỷ niệm ngày mất của Anh hùng dân tộc Lê Lợi (Vua Lê Thái Tổ) và tôn vinh chiến thắng vĩ đại 10 năm gian khổ của cuộc Khởi nghĩa Lam Sơn quét sạch quân Minh xâm lược năm 1428.',
    culturalMeaning:
      'Khơi dậy niềm tự hào về ý chí tự lực tự cường dân tộc, bản trường ca "Bình Ngô Đại Cáo" và mối quan hệ gắn bó máu thịt giữa người Kinh và người Mường nơi căn cứ địa Lam Sơn.',
    mainRituals: {
      le: [
        'Lễ tế rước thần vị vua Lê Thái Tổ từ Đền Tép về Chính điện Lam Kinh',
        'Lễ đọc chúc văn tưởng niệm công lao trời biển của Thái Tổ Cao Hoàng Đế',
        'Lễ dâng hương tại lăng mộ các vua và thái hậu triều Hậu Lê',
      ],
      hoi: [
        'Chương trình nghệ thuật sân khấu thực cảnh tái hiện Hội thề Lũng Nhai',
        'Trình diễn múa đèn chạy chữ, hát trò Xuân Phả di sản quốc gia',
        'Hội cờ tướng, bắn nỏ cổ truyền và các làn điệu hò sông Mã',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 1419/QĐ-TTg ngày 02/10/2012',
      issuingAuthority: 'Thủ tướng Chính phủ',
      issueDate: '02/10/2012',
      title: 'Xếp hạng Di tích quốc gia đặc biệt Di tích lịch sử và kiến trúc nghệ thuật Lam Kinh',
      recognitionType: 'Di tích quốc gia đặc biệt & Di sản văn hóa phi vật thể',
      excerpt:
        'Khu di tích Lam Kinh là quê hương khởi nghiệp vương triều Hậu Lê rực rỡ, lưu giữ cây đa - thị cổ thụ và bia Vĩnh Lăng bảo vật quốc gia.',
    },
    directionsGuide:
      'Từ TP. Thanh Hóa theo QL47 hướng Tây khoảng 50km đến thị trấn Lam Sơn. Rất gần sân bay Thọ Xuân (chỉ 15km).',
    visitorAdvice: [
      'Ghé thăm Bia Vĩnh Lăng (bảo vật quốc gia do danh nhân Nguyễn Trãi soạn văn bia).',
      'Giữ gìn trật tự và tôn nghiêm quanh khu vực các lăng mộ hoàng gia triều Lê.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
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
    province: 'Quảng Ngãi',
    district: 'Huyện đảo Lý Sơn',
    locationName: 'Đình làng An Vĩnh và Đài tưởng niệm Đội Hoàng Sa kiêm quản Bắc Hải',
    coordinates: { lat: 15.3833, lng: 109.1167 },
    timingType: 'lunar',
    lunarRule: {
      month: 3,
      day: 15,
      endMonth: 3,
      endDay: 16,
      recurringNote: 'Thường diễn ra vào trung tuần tháng 2 hoặc rằm tháng 3 Âm lịch hàng năm',
    },
    historicalOrigin:
      'Ra đời từ thế kỷ XVII dưới thời chúa Nguyễn và triều Nguyễn. Triều đình hàng năm cử Đội Hoàng Sa gồm những tráng đinh Lý Sơn cưỡi thuyền buồm ra Hoàng Sa, Trường Sa cắm mốc chủ quyền, đo đạc hải trình và thu lượm hải vật.',
    culturalMeaning:
      'Bằng chứng lịch sử - pháp lý sống động và hùng hồn nhất khẳng định chủ quyền bất khả xâm phạm của Việt Nam trên hai quần đảo Hoàng Sa và Trường Sa. Tri ân những người con anh dũng hy sinh vì biển đảo.',
    mainRituals: {
      le: [
        'Lễ rước linh vị và bài vị các bậc tiền hiền hải đội Hoàng Sa về Đình An Vĩnh',
        'Nghi thức tế sống "thế lính": làm các thuyền nan tượng trưng và hình nhân thế mạng bằng bột gạo, đòn tre, chiếu cói và thẻ tre khắc tên binh phu',
        'Thả thuyền câu hình nhân ra biển Đông tiến về phía quần đảo Hoàng Sa',
      ],
      hoi: [
        'Hội đua thuyền truyền thống Tứ linh (Long, Lân, Quy, Phụng)',
        'Trình diễn nghệ thuật diễn xướng dân gian bài chòi miền Trung',
        'Triển lãm tư liệu Hán Nôm và bản đồ cổ về chủ quyền biển đảo',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 776/QĐ-BVHTTDL ngày 18/02/2013',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '18/02/2013',
      title: 'Đưa Lễ Khao lề thế lính Hoàng Sa vào Danh mục di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
      excerpt:
        'Nghi lễ là chứng cứ lịch sử vô giá về sự thực thi chủ quyền của các nhà nước phong kiến Việt Nam đối với quần đảo Hoàng Sa.',
    },
    directionsGuide:
      'Từ TP. Quảng Ngãi đi xe buýt xuống Cảng Sa Kỳ (khoảng 20km), sau đó đi tàu cao tốc ra đảo Lý Sơn mất khoảng 35 - 45 phút.',
    visitorAdvice: [
      'Nên đặt vé tàu cao tốc và phòng khách sạn trước khi đến Lý Sơn vào mùa lễ hội.',
      'Bảo vệ rạn san hô và cảnh quan núi lửa độc đáo Thới Lôn, Chùa Hang, Cổng Tò Vò.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
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
    province: 'Gia Lai, Đắk Lắk, Kon Tum, Lâm Đồng, Đắk Nông',
    district: '5 tỉnh Tây Nguyên',
    locationName: 'Nhà rông, buôn làng Tây Nguyên (Pleiku, Buôn Ma Thuột, Kon Tum...)',
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
      'Gắn với lịch sử định cư và tín ngưỡng vạn vật hữu linh (Animism) của các dân tộc bản địa Tây Nguyên qua hàng nghìn năm, từ thời kỳ đồ đồng Đông Sơn.',
    culturalMeaning:
      'Cồng chiêng là tiếng nói tâm linh kết nối con người với thần linh, thần Rừng, thần Lúa; là linh hồn của buôn làng từ khi sinh ra, trưởng thành đến khi về với tổ tiên.',
    mainRituals: {
      le: [
        'Lễ cúng Yang (cúng thần linh đất trời bên cây nêu hoa rực rỡ)',
        'Lễ cúng sức khỏe cho voi và lễ thổi tai ban phước cho trẻ nhỏ',
        'Lễ tạ ơn mùa màng và mừng nhà rông mới',
      ],
      hoi: [
        'Vòng xoang cồng chiêng tập thể quanh đống lửa bập bùng cùng ché rượu cần say men',
        'Kể Khan (sử thi Đăm San, Ot Ndrông) thâu đêm bên bếp lửa',
        'Hội thi dệt thổ cẩm, tạc tượng gỗ dân gian nhà mồ',
      ],
    },
    legalBasis: {
      documentNumber: 'UNESCO Kiệt tác di sản thế giới (Masterpiece 2005) & Ghi danh 2008',
      issuingAuthority: 'UNESCO',
      issueDate: '25/11/2005',
      title: 'Không gian văn hóa Cồng chiêng Tây Nguyên được vinh danh là Kiệt tác truyền khẩu và Di sản văn hóa phi vật thể của nhân loại',
      recognitionType: 'Di sản phi vật thể đại diện của nhân loại (UNESCO)',
      excerpt:
        'Cồng chiêng Tây Nguyên là kho tàng âm nhạc bác học dân gian vô song, trải rộng trên địa bàn 5 tỉnh vùng Tây Nguyên đất đỏ.',
    },
    directionsGuide:
      'Có thể bay thẳng từ Hà Nội/TP.HCM đến sân bay Pleiku (Gia Lai) hoặc Buôn Ma Thuột (Đắk Lắk), sau đó bắt xe vào các buôn làng truyền thống.',
    visitorAdvice: [
      'Uống rượu cần bằng cần trúc theo phong tục mến khách, không bước qua cần trúc khi đang uống.',
      'Xin phép già làng trước khi bước lên cầu thang nhà rông hoặc nhà dài.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    unescoRecognized: true,
    nationalHeritage: true,
    tags: ['UNESCO', 'Cồng chiêng Tây Nguyên', 'Đăm San', 'Nhà Rông', 'Rượu Cần'],
  },
  {
    id: 'le-hoi-kate-dong-bao-cham',
    name: 'Lễ hội Katê của đồng bào Chăm',
    alternateNames: ['Tết Katê', 'Hội Katê tháp Chăm'],
    category: 'Lễ hội',
    ethnicGroup: 'Chăm (Chăm Balamon)',
    region: 'Trung',
    province: 'Ninh Thuận & Bình Thuận',
    district: 'Phan Rang - Tháp Chàm, Ninh Phước, Bắc Bình',
    locationName: 'Tháp Po Klong Garai, Tháp Po Rome và Tháp Po Sah Inư',
    coordinates: { lat: 11.6028, lng: 108.9536 },
    timingType: 'lunar',
    lunarRule: {
      month: 7,
      day: 1,
      endMonth: 7,
      endDay: 3,
      recurringNote: 'Ngày 1 tháng 7 Chăm lịch (thường rơi vào khoảng tháng 9 hoặc tháng 10 Dương lịch)',
    },
    historicalOrigin:
      'Tưởng nhớ các vị thần linh, tổ tiên và các vị vua Champa anh minh có công với dân với nước như Vua Po Klong Garai, Vua Po Rome, Vua Po Nưgar.',
    culturalMeaning:
      'Lễ hội lớn nhất và linh thiêng nhất trong năm của người Chăm Balamon, hội tụ các giá trị nghệ thuật kiến trúc tháp cổ, trang phục thổ cẩm và vũ điệu Chăm quyến rũ.',
    mainRituals: {
      le: [
        'Lễ đón rước y phục vua thần do người Raglai (dân tộc anh em) trao trả lại cho người Chăm',
        'Nghi thức mở cửa tháp do thầy Cả sư (Po Adhia) chủ trì',
        'Lễ tắm tượng thần (Mộc dục) và mặc y phục mới cho ngẫu tượng thần Siva - vua thần',
      ],
      hoi: [
        'Vũ điệu quạt Chăm của các thiếu nữ kiều diễm trong tà áo dài Chăm truyền thống',
        'Âm vang kèn Saranai, trống Paranưng và trống Ginăng giục giã',
        'Thăm viếng chúc tết dòng họ, thưởng thức bánh gừng, bánh tét Chăm',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 2473/QĐ-BVHTTDL ngày 18/08/2017',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '18/08/2017',
      title: 'Đưa Lễ hội Katê của người Chăm tỉnh Ninh Thuận vào Danh mục di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia & Di tích đặc biệt',
      excerpt:
        'Lễ hội Katê là di sản văn hóa đặc sắc phản ánh mối quan hệ keo sơn giữa đồng bào Chăm và người Raglai miền duyên hải Nam Trung Bộ.',
    },
    directionsGuide:
      'Từ TP. Phan Rang - Tháp Chàm đi theo QL27 về hướng Đà Lạt khoảng 7km là đến cụm tháp Po Klong Garai kỳ vĩ trên đỉnh đồi Trầu.',
    visitorAdvice: [
      'Không leo trèo lên gạch tháp Chăm cổ.',
      'Cởi giày dép và giữ tâm thái thanh tịnh khi bước vào tiền sảnh tháp làm lễ cầu an.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Lễ hội Katê', 'Người Chăm', 'Tháp Po Klong Garai', 'Ninh Thuận', 'Kèn Saranai'],
  },
  {
    id: 'le-hoi-via-ba-chua-xu-nui-sam',
    name: 'Lễ hội Vía Bà Chúa Xứ Núi Sam',
    alternateNames: ['Hội Miếu Bà Núi Sam', 'Vía Bà Châu Đốc'],
    category: 'Lễ hội',
    ethnicGroup: 'Kinh, Hoa, Chăm, Khmer',
    region: 'Nam',
    province: 'An Giang',
    district: 'TP. Châu Đốc',
    locationName: 'Miếu Bà Chúa Xứ Núi Sam, phường Núi Sam',
    coordinates: { lat: 10.6667, lng: 105.0833 },
    timingType: 'lunar',
    lunarRule: {
      month: 4,
      day: 22,
      endMonth: 4,
      endDay: 27,
      recurringNote: 'Chính lễ từ ngày 22 đến 27 tháng 4 Âm lịch hàng năm (Lễ tắm Bà đêm 23 rạng sáng 24)',
    },
    historicalOrigin:
      'Gắn với huyền tích pho tượng Bà bằng sa thạch từ đỉnh núi Sam được 9 cô gái đồng trinh thỉnh xuống chân núi vào đầu thế kỷ XIX và công lao Thoại Ngọc Hầu cùng phu nhân Châu Thị Tế khai khẩn vùng kênh Vĩnh Tế.',
    culturalMeaning:
      'Lễ hội tâm linh lớn nhất vùng đồng bằng sông Cửu Long, biểu tượng của tín ngưỡng thờ Mẫu Tây Nam Bộ và tình đoàn kết giao lưu văn hóa 4 dân tộc Kinh - Hoa - Chăm - Khmer.',
    mainRituals: {
      le: [
        'Lễ Tắm Bà thiêng liêng vào lúc 24h đêm ngày 23 rạng sáng 24 tháng 4 Âm lịch',
        'Lễ thỉnh sắc Thoại Ngọc Hầu và hai vị phu nhân từ Lăng về Miếu Bà',
        'Lễ Túc yết và Lễ Xây chầu theo nghi thức cung đình Nam Bộ',
        'Lễ Chánh tế và Lễ Hồi sắc',
      ],
      hoi: [
        'Hát bội truyền thống thâu đêm suốt sáng tại võ ca Miếu Bà',
        'Múa lân sư rồng của các đoàn nghệ thuật người Hoa Chợ Lớn và Châu Đốc',
        'Tham quan kênh Vĩnh Tế, rừng tràm Trà Sư mùa nước nổi',
      ],
    },
    legalBasis: {
      documentNumber: 'Hồ sơ đề trình UNESCO 2024 & Quyết định số 2640/QĐ-BVHTTDL',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '19/12/2014',
      title: 'Lễ hội Vía Bà Chúa Xứ Núi Sam là Di sản văn hóa phi vật thể quốc gia (Hồ sơ đệ trình UNESCO)',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia (Đang đệ trình UNESCO)',
      excerpt:
        'Lễ hội khẳng định sức sống mãnh liệt của tín ngưỡng thờ Mẫu bảo bọc đời sống tinh thần cư dân biên viễn Tây Nam Bộ.',
    },
    directionsGuide:
      'Từ TP.HCM đi xe ô tô theo cao tốc Trung Lương - Mỹ Thuận đến Cần Thơ, rồi theo QL91 về Châu Đốc khoảng 220km (mất khoảng 4-5 giờ).',
    visitorAdvice: [
      'Cẩn trọng trước các hiện tượng chèo kéo nhang đèn, thả chim cá phóng sinh trá hình xung quanh cổng Miếu Bà.',
      'Nước tắm Bà và áo choàng Bà được chia lộc mang ý nghĩa bình an, may mắn.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Núi Sam', 'Bà Chúa Xứ', 'Châu Đốc', 'An Giang', 'Tín ngưỡng thờ Mẫu'],
  },
  {
    id: 'le-hoi-ok-om-bok-dua-ghe-ngo',
    name: 'Lễ hội Ok Om Bok và Đua ghe Ngo',
    alternateNames: ['Lễ Cúng Trăng', 'Hội Đua ghe Ngo Sóc Trăng - Trà Vinh'],
    category: 'Lễ hội',
    ethnicGroup: 'Khmer Nam Bộ',
    region: 'Nam',
    province: 'Sóc Trăng & Trà Vinh',
    district: 'TP. Sóc Trăng, TP. Trà Vinh',
    locationName: 'Sông Maspero (Sóc Trăng) và Ao Bà Om (Trà Vinh)',
    coordinates: { lat: 9.6033, lng: 105.98 },
    timingType: 'lunar',
    lunarRule: {
      month: 10,
      day: 14,
      endMonth: 10,
      endDay: 15,
      recurringNote: 'Diễn ra vào ngày rằm (14 - 15) tháng 10 Âm lịch (tháng Két-đấc theo Phật lịch Khmer)',
    },
    historicalOrigin:
      'Gắn với tín ngưỡng thờ thần Mặt Trăng (Preah Chan) - vị thần bảo trợ thời tiết, mùa màng và nguồn nước của cư dân Khmer canh tác lúa nước Nam Bộ.',
    culturalMeaning:
      'Tạ ơn Thần Trăng ban cho một vụ mùa tốt tươi, gắn với giải đua thuyền rồng ghe Ngo (Um Tuk Ngô) kịch tính, thể hiện sức mạnh phi thường và tinh thần đồng đội quật khởi.',
    mainRituals: {
      le: [
        'Lễ Cúng Trăng đêm rằm: dâng cốm dẹp (Om Bok), khoai lang, chuối, dừa tươi',
        'Nghi thức đút cốm dẹp cho trẻ em và hỏi thăm ước nguyện tương lai',
        'Thả đèn gió (Lôi Protip) và đèn nước rực rỡ bồng bềnh trên mặt nước',
      ],
      hoi: [
        'Giải đua ghe Ngo trên sông Maspero với hàng chục đội ghe rồng dài 30m, mỗi ghe 50-60 tay chèo dũng mãnh',
        'Điệu múa Lâm Thôn, Rămvông ngọt ngào uyển chuyển của các chàng trai cô gái Khmer',
        'Trình diễn trang phục cổ truyền và dàn nhạc ngũ âm (Pinpeat)',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 2684/QĐ-BVHTTDL ngày 25/08/2014',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '25/08/2014',
      title: 'Đưa Lễ hội Ok Om Bok của người Khmer tỉnh Sóc Trăng vào Danh mục di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
      excerpt:
        'Lễ hội Ok Om Bok và Đua ghe Ngo là biểu tượng hội tụ tinh hoa văn hóa, thể thao truyền thống đặc sắc của cộng đồng người Khmer miền Tây Nam Bộ.',
    },
    directionsGuide:
      'Cách TP.HCM khoảng 230km về phía Tây Nam theo QL1A hoặc đường Nam Sông Hậu. Hai bên bờ sông Maspero giữa trung tâm TP. Sóc Trăng có khán đài xem đua ghe rất rộng rãi.',
    visitorAdvice: [
      'Nên đến bờ sông Maspero trước 8h sáng ngày thi đấu chung kết để có vị trí theo dõi thuận lợi.',
      'Thưởng thức đặc sản cốm dẹp trộn dừa nạo và đường thốt nốt thơm ngon.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Ok Om Bok', 'Khmer Nam Bộ', 'Đua ghe Ngo', 'Sóc Trăng', 'Trà Vinh'],
  },
  {
    id: 'le-hoi-chua-ba-thien-hau',
    name: 'Lễ hội Chùa Bà Thiên Hậu',
    alternateNames: ['Hội Chùa Bà Bình Dương', 'Lễ Rước kiệu Bà'],
    category: 'Lễ hội',
    ethnicGroup: 'Hoa & Kinh',
    region: 'Nam',
    province: 'Bình Dương & TP. Hồ Chí Minh',
    district: 'TP. Thủ Dầu Một & Quận 5',
    locationName: 'Miếu Bà Thiên Hậu (Chùa Bà), đường Nguyễn Du, TP. Thủ Dầu Một',
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
      'Tôn thờ Thiên Hậu Thánh Mẫu (Lâm Mặc Nương) - vị phúc thần biển cả phù hộ cho các đoàn thuyền buôn vượt sóng gió an toàn đến vùng đất Gia Định, Bình Dương định cư từ thế kỷ XVII.',
    culturalMeaning:
      'Lễ hội nổi tiếng với tinh thần tương thân tương ái, văn hóa thiện nguyện "miễn phí toàn diện" (nước uống, khăn lạnh, vá xe, suất ăn chay từ thiện cho hàng trăm ngàn lượt khách).',
    mainRituals: {
      le: [
        'Lễ khai môn và cúng tạ Thiên Hậu Thánh Mẫu đêm 14 tháng Giêng',
        'Lễ rước kiệu Bà tuần du qua các phố phường trung tâm Thủ Dầu Một vào chiều ngày rằm 15',
        'Thỉnh lộc khăn đỏ may mắn của Bà',
      ],
      hoi: [
        'Đoàn rước lân sư rồng rực rỡ với hàng chục bang hội người Hoa biểu diễn tuyệt kỹ',
        'Đội thiếu nữ gánh hoa, múa hạc chúc phúc',
        'Các điểm phát thức ăn nước uống miễn phí nghĩa tình của người dân Bình Dương',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 2962/QĐ-BVHTTDL',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '27/08/2019',
      title: 'Đưa Lễ hội Chùa Bà Thiên Hậu (Bình Dương) vào Danh mục di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
      excerpt:
        'Lễ hội phản ánh bản sắc văn hóa và tính nhân văn hào sảng của cộng đồng cư dân Nam Bộ.',
    },
    directionsGuide:
      'Cách trung tâm TP.HCM khoảng 30km về phía Bắc theo Đại lộ Bình Dương (QL13).',
    visitorAdvice: [
      'Không cắm bó nhang quá lớn gây khói ngạt và nguy cơ hỏa hoạn trong chính điện.',
      'Lan tỏa nét đẹp văn minh, tiếp nhận lòng hào phóng của người dân địa phương với thái độ trân trọng.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Chùa Bà', 'Thiên Hậu', 'Bình Dương', 'Người Hoa', 'Thiện nguyện'],
  },
  {
    id: 'ngay-quoc-khanh-viet-nam',
    name: 'Ngày Quốc khánh Nước CHXHCN Việt Nam (2/9)',
    alternateNames: ['Ngày Tết Độc Lập', 'Ngày Tuyên ngôn Độc lập'],
    category: 'Sự kiện lịch sử',
    ethnicGroup: 'Khối đại đoàn kết 54 dân tộc Việt Nam',
    region: 'Bắc',
    province: 'Toàn quốc',
    district: 'Quảng trường Ba Đình (Hà Nội)',
    locationName: 'Quảng trường Ba Đình, Lăng Chủ tịch Hồ Chí Minh và trên mọi miền Tổ quốc',
    coordinates: { lat: 21.0368, lng: 105.8344 },
    timingType: 'solar',
    solarRule: {
      month: 9,
      day: 2,
      endMonth: 9,
      endDay: 2,
      recurringNote: 'Ngày 2 tháng 9 Dương lịch hàng năm',
    },
    historicalOrigin:
      'Ngày 02/09/1945, tại Quảng trường Ba Đình rực rỡ cờ hoa, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập bất hủ, khai sinh ra nước Việt Nam Dân chủ Cộng hòa (nay là Cộng hòa Xã hội Chủ nghĩa Việt Nam).',
    culturalMeaning:
      'Mốc son chói lọi trong lịch sử hàng ngàn năm dựng nước và giữ nước, mở ra kỷ nguyên mới - kỷ nguyên độc lập tự do và chủ nghĩa xã hội của dân tộc Việt Nam.',
    mainRituals: {
      le: [
        'Lễ thượng cờ trang nghiêm và dâng hoa tưởng niệm tại Lăng Chủ tịch Hồ Chí Minh',
        'Lễ viếng Đài tưởng niệm các Anh hùng liệt sĩ Bắc Sơn',
        'Các phái đoàn lãnh đạo dâng hương tưởng niệm Bác Hồ tại Nhà 67',
      ],
      hoi: [
        'Đồng bào các dân tộc vùng cao nô nức mặc trang phục đẹp nhất xuống chợ đón "Tết Độc Lập"',
        'Bắn pháo hoa tầm cao nghệ thuật tại các thành phố lớn Hà Nội, TP.HCM, Đà Nẵng',
        'Các chương trình hòa nhạc quốc gia "Điều còn mãi" và triển lãm ảnh lịch sử hào hùng',
      ],
    },
    legalBasis: {
      documentNumber: 'Hiến pháp nước CHXHCN Việt Nam (Điều 13) & Bộ luật Lao động số 45/2019/QH14',
      issuingAuthority: 'Quốc hội nước CHXHCN Việt Nam',
      issueDate: '28/11/2013',
      title: 'Quy định Ngày Quốc khánh là Ngày Quốc lễ của Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
      recognitionType: 'Ngày Quốc lễ thiêng liêng',
      excerpt:
        'Quốc khánh nước Cộng hòa xã hội chủ nghĩa Việt Nam là ngày 2 tháng 9. Người lao động được nghỉ làm việc, hưởng nguyên lương theo quy định của pháp luật.',
    },
    directionsGuide:
      'Tại Thủ đô Hà Nội, các tuyến đường Hùng Vương, Độc Lập, Điện Biên Phủ, Hoàng Diệu dẫn trực tiếp về Quảng trường Ba Đình lịch sử.',
    visitorAdvice: [
      'Xếp hàng trật tự, trang phục chỉnh tề khi vào Lăng viếng Bác Hồ.',
      'Cùng treo cờ Tổ quốc trước hiên nhà chào mừng ngày Tết Độc Lập thiêng liêng.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Quốc khánh', '2 tháng 9', 'Tết Độc Lập', 'Bác Hồ', 'Tuyên ngôn Độc lập'],
  },
  {
    id: 'ngay-chien-thang-dien-bien-phu',
    name: 'Kỷ niệm Chiến thắng Lịch sử Điện Biên Phủ (7/5)',
    alternateNames: ['Chiến thắng Điện Biên Phủ', 'Lừng lẫy năm châu, chấn động địa cầu'],
    category: 'Sự kiện lịch sử',
    ethnicGroup: 'Kinh, Thái, Mông, Khơ Mú...',
    region: 'Bắc',
    province: 'Điện Biên',
    district: 'TP. Điện Biên Phủ',
    locationName: 'Đồi A1, Hầm Đờ Cát (De Castries), Sở chỉ huy Mường Phăng, Tượng đài Chiến thắng',
    coordinates: { lat: 21.3833, lng: 103.0167 },
    timingType: 'solar',
    solarRule: {
      month: 5,
      day: 7,
      endMonth: 5,
      endDay: 7,
      recurringNote: 'Ngày 7 tháng 5 Dương lịch hàng năm',
    },
    historicalOrigin:
      'Ngày 07/05/1954, lá cờ "Quyết chiến - Quyết thắng" của Quân đội Nhân dân Việt Nam tung bay trên nóc hầm tướng De Castries, kết thúc thắng lợi 56 ngày đêm "khoét núi, ngủ hầm, mưa dầm, cơm vắt", đập tan tập đoàn cứ điểm Điện Biên Phủ của thực dân Pháp.',
    culturalMeaning:
      'Mốc son vàng chói lọi trong lịch sử dân tộc và phong trào giải phóng dân tộc trên toàn thế giới, buộc thực dân Pháp phải ký Hiệp định Genève chấm dứt chiến tranh tại Đông Dương.',
    mainRituals: {
      le: [
        'Lễ dâng hương tưởng niệm các anh hùng liệt sĩ tại Nghĩa trang Liệt sĩ A1, Him Lam, Độc Lập',
        'Lễ mít tinh, diễu binh, diễu hành cấp quốc gia tại Sân vận động tỉnh Điện Biên',
        'Lễ tri ân các cựu chiến binh, thanh niên xung phong, dân công hỏa tuyến',
      ],
      hoi: [
        'Hội múa xòe hoa đại đoàn kết Tây Bắc quanh Tượng đài Chiến thắng',
        'Hội thi đẩy xe đạp thồ, tải đạn tái hiện đường ra trận gian lao mà anh dũng',
        'Lễ hội hoa ban rực rỡ sắc màu vùng cao biên cương',
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
      'Sân bay Điện Biên Phủ đã được nâng cấp tiếp nhận máy bay Airbus A321 với các chuyến bay hàng ngày từ Hà Nội và TP.HCM. Tuyến đường bộ theo QL6 qua đèo Pha Đin hùng vĩ khoảng 450km.',
    visitorAdvice: [
      'Ghé thăm Bảo tàng Chiến thắng Lịch sử Điện Biên Phủ để chiêm ngưỡng bức tranh Panorama tròn tái hiện trận đánh lớn nhất Đông Nam Á.',
      'Giữ sự tôn kính tại các phần mộ liệt sĩ vô danh Nghĩa trang A1.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
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
    province: 'TP. Hồ Chí Minh & Toàn quốc',
    district: 'Quận 1',
    locationName: 'Dinh Độc Lập (Dinh Thống Nhất), TP. Hồ Chí Minh',
    coordinates: { lat: 10.777, lng: 106.6953 },
    timingType: 'solar',
    solarRule: {
      month: 4,
      day: 30,
      endMonth: 4,
      endDay: 30,
      recurringNote: 'Ngày 30 tháng 4 Dương lịch hàng năm',
    },
    historicalOrigin:
      '11 giờ 30 phút ngày 30/04/1975, xe tăng của quân giải phóng húc đổ cánh cổng Dinh Độc Lập, lá cờ Mặt trận Dân tộc Giải phóng miền Nam Việt Nam tung bay trên nóc dinh, kết thúc thắng lợi Chiến dịch Hồ Chí Minh lịch sử, non sông thu về một mối.',
    culturalMeaning:
      'Khép lại cuộc kháng chiến chống Mỹ cứu nước trường kỳ 21 năm, mở ra thời kỳ cả nước hòa bình, độc lập, thống nhất và đi lên chủ nghĩa xã hội.',
    mainRituals: {
      le: [
        'Lễ dâng hoa tại Tượng đài Bác Hồ trên phố đi bộ Nguyễn Huệ',
        'Lễ viếng Nghĩa trang Liệt sĩ TP.HCM và dâng hương Đền Tưởng niệm Bến Dược - Củ Chi',
        'Lễ mít tinh kỷ niệm ngày giải phóng miền Nam thống nhất đất nước',
      ],
      hoi: [
        'Cuộc đua xe đạp Cúp Truyền hình TP.HCM về đích trước Dinh Thống Nhất trưa 30/4',
        'Bắn pháo hoa rực rỡ tại hầm sông Sài Gòn và tòa nhà Landmark 81',
        'Chương trình nghệ thuật sân khấu ngoài trời phục vụ người dân và du khách',
      ],
    },
    legalBasis: {
      documentNumber: 'Bộ luật Lao động số 45/2019/QH14 & Quyết định Thủ tướng Chính phủ',
      issuingAuthority: 'Quốc hội nước CHXHCN Việt Nam',
      issueDate: '20/11/2019',
      title: 'Quy định Ngày Chiến thắng 30/4 là Ngày nghỉ lễ chính thức của quốc gia',
      recognitionType: 'Ngày lễ lớn của dân tộc',
      excerpt:
        'Ngày 30 tháng 4 là biểu tượng của tinh thần quật cường, khát vọng hòa bình và sự thống nhất toàn vẹn lãnh thổ Việt Nam.',
    },
    directionsGuide:
      'Dinh Độc Lập nằm tại số 135 đường Nam Kỳ Khởi Nghĩa, phường Bến Thành, Quận 1, ngay trung tâm TP.HCM.',
    visitorAdvice: [
      'Tham quan phòng khánh tiết, hầm tác chiến ngầm dưới lòng Dinh Độc Lập và hai xe tăng lịch sử mang số hiệu 390 và 843 (bảo vật quốc gia).',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
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
    province: 'An Giang',
    district: 'Huyện Tri Tôn & TX. Tịnh Biên',
    locationName: 'Sân đua bò huyện Tri Tôn, chùa Tà Miệt, chùa Rô',
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
      'Khởi nguồn từ tập quán bà con Khmer giúp nhau cày cấy ruộng chùa (ruộng Phlu-sre). Sau khi cày xong, các chủ đôi bò rủ nhau so tài kéo bừa biểu diễn, dần trở thành lễ hội thể thao truyền thống độc nhất vô nhị.',
    culturalMeaning:
      'Nét sinh hoạt thể thao dân gian hào sảng thể hiện lòng tôn kính tổ tiên, tinh thần thượng võ và tài nghệ điều khiển đôi bò phi nước đại ngoạn mục trên bùn lầy.',
    mainRituals: {
      le: [
        'Lễ cúng dâng cơm, phẩm vật lên chư tăng tại chùa Khmer trong dịp lễ Sene Dolta',
        'Nghi thức bái tạ tổ tiên cầu phúc cho dòng tộc bình an, no ấm',
      ],
      hoi: [
        'Vòng đua bò chia làm hai chặng: chặng "Hô" (đi chậm biểu diễn) và chặng "Thả" (bứt tốc phi nước đại)',
        'Người cầm roi điều khiển (tài xế) đứng khéo léo trên chiếc bừa gỗ xới tung bọt bùn nước',
        'Âm vang kèn thổi làm bằng vỏ ốc biển và tiếng hò reo vang dội khắp chân núi Phụng Hoàng Sơn',
      ],
    },
    legalBasis: {
      documentNumber: 'Quyết định số 2073/QĐ-BVHTTDL ngày 16/06/2016',
      issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
      issueDate: '16/06/2016',
      title: 'Đưa Hội Đua bò Bảy Núi (An Giang) vào Danh mục di sản văn hóa phi vật thể quốc gia',
      recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
      excerpt:
        'Hội đua bò Bảy Núi mang giá trị văn hóa độc đáo, thể hiện tình đoàn kết và sức sáng tạo của đồng bào Khmer vùng bán sơn địa Tây Nam Bộ.',
    },
    directionsGuide:
      'Từ TP. Long Xuyên hoặc Châu Đốc theo ĐT941 hoặc QL91 rẽ vào thị trấn Tri Tôn khoảng 50km.',
    visitorAdvice: [
      'Mang theo mũ nón, ủng hoặc giày chống bùn đất vì các đôi bò chạy tạt bùn nước rất mạnh.',
      'Đứng phía sau hàng rào bảo vệ an toàn của Ban tổ chức.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    unescoRecognized: false,
    nationalHeritage: true,
    tags: ['Đua bò Bảy Núi', 'Tri Tôn', 'An Giang', 'Khmer', 'Sene Dolta'],
  },
];
