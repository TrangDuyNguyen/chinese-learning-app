export const roadmapStages = [
  {
    id: "stage-0",
    stageNumber: 0,
    title: "Chặng 0: Khởi Động & Nền Tảng Ngữ Âm",
    subtitle: "Pinyin, Thanh điệu & Nền tảng Chữ Hán",
    duration: "1 - 2 tuần (Mỗi ngày 45 - 60 phút)",
    target: "Phát âm chuẩn xác 100% Pinyin, nắm vững quy tắc bút thuận & 50 bộ thủ cốt lõi",
    color: "from-amber-500 to-orange-600",
    badge: "Bắt buộc từ số 0",
    summary: "Đây là giai đoạn 'sống còn'. Nếu phát âm sai ngay từ đầu, sau này sửa lại vô cùng khó khăn. Người Việt có lợi thế lớn nhờ thanh điệu tương tự, nhưng cần chú ý các âm uốn lưỡi, bật hơi và thanh 1 - thanh 4.",
    modules: [
      {
        title: "1. Bảng Ngữ Âm Pinyin (Bính âm La-tinh)",
        items: [
          "21 Thanh mẫu (Phụ âm): Chia theo nhóm vị trí phát âm (Âm hai môi b/p/m/f, âm đầu lưỡi d/t/n/l, âm cuống lưỡi g/k/h, âm mặt lưỡi j/q/x, âm uốn lưỡi zh/ch/sh/r, âm răng z/c/s).",
          "36 Vận mẫu (Nguyên âm): 6 vận mẫu đơn (a, o, e, i, u, ü) và các vận mẫu kép, vận mẫu mũi (an, en, in, un, ün, ang, eng, ing, ong).",
          "4 Thanh điệu chuẩn: Thanh 1 (Cao phẳng 55 - ā), Thanh 2 (Đi lên 35 - á), Thanh 3 (Lượn sóng 214 - ǎ), Thanh 4 (Rơi mạnh dứt khoát 51 - à) + Khinh thanh (thanh nhẹ - a)."
        ]
      },
      {
        title: "2. Các Quy Tắc Biến Điệu Cực Kỳ Quan Trọng",
        items: [
          "Biến điệu 2 thanh 3 đi liền: Thanh 3 thứ nhất đọc thành thanh 2 (Ví dụ: 你 (nǐ) + 好 (hǎo) -> đọc là Ní hǎo).",
          "Biến điệu của chữ '一' (yī): Đứng trước thanh 4 đọc thành thanh 2 (yí dìng); đứng trước thanh 1, 2, 3 đọc thành thanh 4 (yì tiān, yì nián).",
          "Biến điệu của chữ '不' (bù): Đứng trước thanh 4 đọc thành thanh 2 (bú shì, bú qù)."
        ]
      },
      {
        title: "3. Nhập Môn Chữ Hán & Bút Thuận",
        items: [
          "Hiểu bản chất chữ tượng hình, chữ hội ý và chữ hình thanh (80% chữ Hán là chữ hình thanh: một nửa biểu âm, một nửa biểu nghĩa).",
          "8 Nét cơ bản: Ngang (一), Sổ (丨), Phẩy (丿), Mác (乀), Hất (㇀), Chấm (丶), Gập (𠃍), Móc (亅).",
          "7 Quy tắc bút thuận kinh điển: Ngang trước sổ sau, Phẩy trước mác sau, Trên trước dưới sau, Ngoài trước trong sau, Vào trước đóng sau, Giữa trước hai bên sau.",
          "50 Bộ thủ cốt lõi: Bộ Nhân (亻), Khẩu (口), Thủy (氵), Hỏa (灬/火), Mộc (木), Nữ (女), Thủ (扌)... giúp đoán nghĩa từ."
        ]
      }
    ],
    pitfalls: [
      "Nhầm lẫn giữa âm bật hơi và không bật hơi (ví dụ: b vs p, d vs t, z vs c, zh vs ch).",
      "Đọc thanh 1 giống dấu ngang tiếng Việt (Thanh 1 tiếng Trung phải ngân cao và đều ở cao độ 5-5).",
      "Đọc thanh 4 thành dấu huyền tiếng Việt (Thanh 4 phải dứt khoát, phát lực từ cao độ 5 rơi gấp xuống 1, không kéo dài).",
      "Chỉ học Pinyin mà bỏ qua Chữ Hán (sau này sẽ thành 'mù chữ Hán', không đọc được biển hiệu, sách báo)."
    ],
    milestones: [
      "Nghe và phân biệt được 100% các cặp âm Pinyin dễ nhầm",
      "Phát âm chuẩn 4 thanh điệu và đọc đúng các từ biến điệu",
      "Viết đúng thứ tự nét cho 30 chữ Hán đầu tiên",
      "Nhận diện 50 bộ thủ thông dụng nhất"
    ]
  },
  {
    id: "stage-1",
    stageNumber: 1,
    title: "Chặng 1: Sơ Cấp (HSK 1 - HSK 2)",
    subtitle: "Giao tiếp sinh hoạt hàng ngày & Cấu trúc câu cơ bản",
    duration: "2 - 3 tháng (Mỗi ngày 1 - 1.5 tiếng)",
    target: "Làm chủ 300 - 500 từ vựng cốt lõi, tự tin giao tiếp các chủ đề đời sống thông thường",
    color: "from-emerald-500 to-teal-700",
    badge: "Nền tảng sinh hoạt",
    summary: "Bắt đầu ghép từ thành câu hoàn chỉnh, hình thành tư duy ngôn ngữ tiếng Trung. Giai đoạn này tập trung vào các tình huống thực tế: chào hỏi, mua sắm, hỏi đường, ăn uống, đi lại và giới thiệu bản thân.",
    modules: [
      {
        title: "1. Khối Vốn Từ & Chủ Đề Giao Tiếp",
        items: [
          "Số đếm, ngày tháng năm, các thứ trong tuần, xem đồng hồ giờ phút.",
          "Mua sắm: Hỏi giá (多少钱), đắt rẻ (太贵了), mặc cả, phương thức thanh toán (WeChat Pay, Alipay, tiền mặt).",
          "Ăn uống: Gọi món, đồ uống, hương vị (cay, ngọt, mặn, nhạt), khen ngon.",
          "Giao thông & Hỏi đường: Đi đâu (去哪里), rẽ trái, rẽ phải, đi thẳng, đi bằng phương tiện gì (坐地铁, 打车).",
          "Giới thiệu bản thân: Tên, tuổi, quốc tịch, nghề nghiệp, thành viên gia đình, sở thích."
        ]
      },
      {
        title: "2. Cấu Trúc Ngữ Pháp Trọng Điểm",
        items: [
          "Trật tự từ vàng trong câu tiếng Trung: Chủ ngữ + [Thời gian] + [Địa điểm] + Động từ + Tân ngữ (Khác tiếng Việt: Thời gian và địa điểm thường đứng TRƯỚC hành động).",
          "Câu chữ 是 (phán đoán) và Câu chữ 有 (sở hữu, tồn hiện). Phủ định 不是 / 没有.",
          "Trợ từ kết cấu 的 (Định ngữ + 的 + Trung tâm ngữ: biểu thị sở hữu hoặc tính chất miêu tả).",
          "Các đại từ nghi vấn: 谁 (ai), 什么 (cái gì), 哪 (nào), 哪儿/哪里 (ở đâu), 几 (mấy - dưới 10), 多少 (bao nhiêu - trên 10), 怎么 (thế nào - phương thức), 怎么样 (như thế nào - tính chất).",
          "Trợ từ ngữ khí và nghi vấn: 吗 (hỏi có... không), 呢 (thế còn...?), 吧 (đề nghị, phỏng đoán), 了 (biểu thị thay đổi trạng thái hoặc hoàn thành hành động).",
          "Lượng từ cơ bản: 个 (cái), 本 (quyển), 支 (cây/chiếc), 张 (tờ/tấm), 杯 (cốc/ly), 碗 (bát), 瓶 (chai)."
        ]
      },
      {
        title: "3. Phương Pháp Học & Luyện Phản Xạ",
        items: [
          "Học theo cụm từ (Chunck) và câu hoàn chỉnh, tránh học từ đơn lẻ rời rạc.",
          "Khai thác triệt để âm Hán - Việt: Đối chiếu từ Trung sang âm Hán Việt để thuộc nghĩa ngay lập tức (Ví dụ: 国家 = Quốc gia, 准备 = Chuẩn bị, 老师 = Lão sư).",
          "Luyện nghe Shadowing: Nghe đoạn hội thoại ngắn trong giáo trình HSK 1-2 và nhại lại đúng ngữ điệu của người bản xứ."
        ]
      }
    ],
    pitfalls: [
      "Dịch từng chữ từ tiếng Việt sang tiếng Trung (Word-by-word) dẫn đến sai trật tự từ (ví dụ nói sai: 我去学校 lúc 8h -> Đúng: 我8点去学校).",
      "Quên dùng lượng từ giữa số từ và danh từ (nói sai: 一个书 -> Đúng: 一本书).",
      "Lạm dụng chữ '的' ở mọi nơi (trong quan hệ thân mật hoặc từ đơn tiết không cần: 我爸爸 thay vì 我的爸爸)."
    ],
    milestones: [
      "Nắm vững 500 từ vựng HSK 1 + HSK 2",
      "Nghe hiểu các đoạn hội thoại giao tiếp thường nhật tốc độ chậm",
      "Tự giới thiệu bản thân 3-5 phút lưu loát bằng tiếng Trung",
      "Đạt điểm đỗ kỳ thi mô phỏng HSK 2 (trên 120/200 điểm)"
    ]
  },
  {
    id: "stage-2",
    stageNumber: 2,
    title: "Chặng 2: Trung Cấp Cơ Bản (HSK 3 - HSK 4)",
    subtitle: "Giao tiếp công việc, đời sống phong phú & Ngữ pháp nâng cao",
    duration: "3 - 5 tháng (Mỗi ngày 1.5 - 2 tiếng)",
    target: "Tích lũy 1200 - 1500 từ vựng, tự tin làm việc tại công ty Trung Quốc hoặc đi du lịch tự túc",
    color: "from-blue-600 to-indigo-700",
    badge: "Ngưỡng cửa tự lập",
    summary: "Đây là giai đoạn bước ngoặt chuyển đổi từ 'bập bẹ' sang 'giao tiếp thực thụ'. Bạn sẽ nắm được các mẫu câu đặc trưng nhất của ngữ pháp tiếng Trung như câu chữ 把, câu chữ 被, và hệ thống bổ ngữ kết quả, xu hướng, khả năng.",
    modules: [
      {
        title: "1. Vốn Từ & Kỹ Năng Thực Chiến",
        items: [
          "Văn phòng & Công việc: Phỏng vấn xin việc, đàm phán lịch họp, viết email xin nghỉ phép, báo cáo tiến độ dự án.",
          "Đời sống & Xã hội: Thuê nhà, mở tài khoản ngân hàng, khám bệnh tại bệnh viện, giải quyết sự cố phát sinh.",
          "Bày tỏ quan điểm cá nhân: Đồng ý, phản bác, đưa ra lời khuyên, nêu cảm nghĩ về một bộ phim hay vấn đề thời sự."
        ]
      },
      {
        title: "2. Hệ Thống Ngữ Pháp Cốt Lõi (Trọng Điểm Kỳ Thi)",
        items: [
          "Câu chữ 把: Biểu thị sự xử lý của chủ ngữ lên tân ngữ, khiến tân ngữ thay đổi vị trí hoặc trạng thái (Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác).",
          "Câu chữ 被: Câu bị động (Chủ ngữ + 被 + Tác nhân + Động từ + Thành phần khác).",
          "Hệ thống Bổ ngữ toàn diện: Bổ ngữ kết quả (做完, 听懂), Bổ ngữ xu hướng đơn & kép (跑过来, 走进去), Bổ ngữ khả năng (听得懂 / 听不懂, 做得完 / 做不完), Bổ ngữ trạng thái (说得很好).",
          "Câu so sánh: So sánh hơn (A 比 B + Adj), So sánh không bằng (A 没有 B + Adj), So sánh tương đồng (A 跟 B 一样).",
          "Hệ thống liên từ phức biểu thị quan hệ logic: Mặc dù... nhưng (虽然...但是...), Không những... mà còn (不但...而且...), Bởi vì... cho nên (因为...所以...), Chỉ cần... là (只要...就...)."
        ]
      },
      {
        title: "3. Chiến Lược Luyện Thi & Nâng Cao",
        items: [
          "Luyện nghe podcast tiếng Trung có phụ đề (như ChineseClass101, Coffee Break Chinese).",
          "Tập đọc bài khóa không còn phụ âm Pinyin, chỉ nhìn mặt chữ Hán.",
          "Tập viết đoạn văn ngắn từ 80 - 150 chữ về các chủ đề thường gặp."
        ]
      }
    ],
    pitfalls: [
      "Nhầm lẫn cách dùng giữa Bổ ngữ trạng thái (跑得快) và Bổ ngữ khả năng (跑得过).",
      "Dùng sai câu chữ 把 (ví dụ: dùng 把 với các động từ tâm lý như 喜欢, 知道, 想 là sai).",
      "Vẫn còn thói quen phụ thuộc vào Pinyin khi đọc văn bản."
    ],
    milestones: [
      "Tích lũy 1200+ từ vựng thông dụng",
      "Đọc hiểu đoạn văn 300 chữ không cần tra Pinyin",
      "Tự viết được email công việc và đoạn văn bày tỏ quan điểm",
      "Đạt chứng chỉ HSK 3 - HSK 4 và chứng chỉ khẩu ngữ HSKK Trung cấp"
    ]
  },
  {
    id: "stage-3",
    stageNumber: 3,
    title: "Chặng 3: Nâng Cao & Tự Nhiên (HSK 5 - HSK 6+)",
    subtitle: "Thành ngữ, Văn hóa, Báo chí & Đàm phán chuyên nghiệp",
    duration: "6 - 12 tháng+ (Học liên tục duy trì)",
    target: "2500 - 5000+ từ vựng, tự tin xem phim không phụ đề, đọc hiểu tiểu thuyết, làm việc chuyên sâu",
    color: "from-rose-600 to-purple-800",
    badge: "Thành thạo chuyên sâu",
    summary: "Chinh phục cảnh giới cao nhất của người học tiếng Trung. Điểm mấu chốt là mở rộng vốn từ trừu tượng, văn viết (Thư diện ngữ 书面语), thành ngữ 4 chữ (Thành ngữ 成语) và sự am hiểu sâu sắc về văn hóa Trung Hoa.",
    modules: [
      {
        title: "1. Vốn Từ Chuyên Sâu & Thành Ngữ",
        items: [
          "Học 100 - 200 Thành ngữ (成语) thông dụng nhất và điển tích phía sau (Ví dụ: 一心一意, 望子成龙, 塞翁失马, 画蛇添足).",
          "Phân biệt rõ ràng giữa Khẩu ngữ (口语) và Văn bản viết (书面语) - (Ví dụ: 口语 dùng 看, 书面语 dùng 观看/阅读).",
          "Từ vựng chuyên ngành: Kinh tế, xuất nhập khẩu, logistics, IT, tài chính ngân hàng."
        ]
      },
      {
        title: "2. Kỹ Năng Đỉnh Cao",
        items: [
          "Đọc báo chí chính thống (Nhân dân nhật báo, Tân Hoa Xã, Toutiao) với tốc độ đọc lướt nắm ý.",
          "Xem phim ảnh, show thực tế, nghe nhạc không cần phụ đề tiếng Việt.",
          "Thuyết trình, đàm phán thương mại, xử lý tranh chấp hợp đồng kinh tế bằng tiếng Trung."
        ]
      }
    ],
    pitfalls: [
      "Lạm dụng thành ngữ một cách gượng gạo khi nói chuyện thông thường.",
      "Bỏ cuộc vì khối lượng từ vựng trừu tượng quá lớn nếu không có thói quen đọc sách báo hàng ngày."
    ],
    milestones: [
      "Đạt HSK 5 (2500 từ) hoặc HSK 6 (5000 từ)",
      "Đạt HSKK Cao cấp",
      "Tự do trao đổi, tranh luận chuyên sâu với người bản xứ"
    ]
  }
];
