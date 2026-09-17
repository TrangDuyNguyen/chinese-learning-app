export const grammarLessons = [
  {
    id: "grammar-01",
    level: "HSK 1 - 2",
    title: "Trật Tự Từ Vàng Trong Câu Tiếng Trung",
    badge: "Quy tắc cốt lõi",
    formula: "Chủ ngữ + [Thời gian] + [Địa điểm] + Động từ + Tân ngữ",
    desc: "Khác với tiếng Việt (chúng ta thường nói: Tôi đi đá bóng ở sân vận động lúc 5 giờ chiều), trong tiếng Trung THỜI GIAN và ĐỊA ĐIỂM luôn được ưu tiên đặt TRƯỚC HÀNH ĐỘNG.",
    comparison: {
      vietnamese: "Tôi ăn cơm ở nhà lúc 7 giờ tối.",
      wrongChinese: "我吃饭在家里七点。 (SAI NGHIÊM TRỌNG)",
      correctChinese: "我晚上七点在家里吃饭。 (ĐÚNG CHUẨN)"
    },
    examples: [
      { zh: "我明天去北京。", pinyin: "Wǒ míngtiān qù Běijīng.", vi: "Tôi ngày mai đi Bắc Kinh." },
      { zh: "他在图书馆看书。", pinyin: "Tā zài túshūguǎn kàn shū.", vi: "Anh ấy đọc sách ở thư viện." },
      { zh: "我们星期六下午在咖啡馆见面。", pinyin: "Wǒmen xīngqīliù xiàwǔ zài kāfēiguǎn jiànmiàn.", vi: "Chúng tôi gặp nhau ở quán cà phê vào chiều thứ Bảy." }
    ]
  },
  {
    id: "grammar-02",
    level: "HSK 1 - 2",
    title: "Trợ Từ Kết Cấu '的' (Biểu Thị Sở Hữu & Định Ngữ)",
    badge: "Nền tảng",
    formula: "Định ngữ (Người sở hữu / Tính từ miêu tả) + 的 + Trung tâm ngữ (Danh từ chính)",
    desc: "Trong tiếng Trung, cái gì phụ trợ (ai sở hữu, màu gì, tính chất gì) luôn đứng trước, danh từ chính đứng sau.",
    comparison: {
      vietnamese: "Sách của tôi / Cô gái xinh đẹp",
      wrongChinese: "书我 / 姑娘漂亮 (ngược thứ tự)",
      correctChinese: "我的书 (wǒ de shū) / 漂亮的姑娘 (piàoliang de gūniang)"
    },
    examples: [
      { zh: "这是我的汉语老师。", pinyin: "Zhè shì wǒ de Hànyǔ lǎoshī.", vi: "Đây là giáo viên tiếng Trung của tôi." },
      { zh: "新买的手机非常好用。", pinyin: "Xīn mǎi de shǒujī hěn hǎoyòng.", vi: "Chiếc điện thoại mới mua rất dễ dùng." }
    ]
  },
  {
    id: "grammar-03",
    level: "HSK 2 - 3",
    title: "Hệ Thống Bổ Ngữ Kết Quả & Bổ Ngữ Xu Hướng",
    badge: "Trọng điểm",
    formula: "Động từ + Bổ ngữ (完 / 见 / 到 / 懂 / 错 / 来 / 去...)",
    desc: "Bổ ngữ gắn liền ngay sau động từ để biểu thị kết quả của hành động đã xong, thấy, hiểu, hoặc hướng chuyển động lại gần/ra xa người nói.",
    comparison: {
      vietnamese: "Tôi nghe hiểu rồi / Anh ấy làm xong bài tập rồi",
      wrongChinese: "我懂听了 (Sai vị trí)",
      correctChinese: "我听懂了 (wǒ tīngdǒng le) / 他做完作业了 (tā zuòwán zuòyè le)"
    },
    examples: [
      { zh: "你看得见黑板上的字吗？", pinyin: "Nǐ kàn de jiàn hēibǎn shàng de zì ma?", vi: "Bạn có nhìn thấy chữ trên bảng không?" },
      { zh: "请大家走进来。", pinyin: "Qǐng dàjiā zǒu jìnlái.", vi: "Xin mời mọi người bước vào đây." }
    ]
  },
  {
    id: "grammar-04",
    level: "HSK 3 - 4",
    title: "Câu Chữ '把' (Câu Xử Lý)",
    badge: "Kinh điển",
    formula: "Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác (Kết quả, vị trí...)",
    desc: "Dùng khi người nói muốn nhấn mạnh vào việc chủ ngữ tác động, xử lý một vật thể cụ thể khiến nó thay đổi vị trí, trạng thái hoặc kết quả.",
    comparison: {
      vietnamese: "Tôi uống hết cốc nước rồi / Tôi dọn sạch phòng rồi",
      wrongChinese: "我喝完把水 (Sai)",
      correctChinese: "我把水喝完了。(wǒ bǎ shuǐ hē wán le)"
    },
    examples: [
      { zh: "请把门关上。", pinyin: "Qǐng bǎ mén guān shàng.", vi: "Làm ơn đóng cửa lại." },
      { zh: "你把作业交给我吧。", pinyin: "Nǐ bǎ zuòyè jiāo gěi wǒ ba.", vi: "Em nộp bài tập cho thầy nhé." }
    ]
  },
  {
    id: "grammar-05",
    level: "HSK 3 - 4",
    title: "Câu Chữ '被' (Câu Bị Động)",
    badge: "Kinh điển",
    formula: "Chủ ngữ (Người/vật bị tác động) + 被 + Tác nhân gây ra + Động từ + Thành phần khác",
    desc: "Biểu thị người hoặc vật bị một tác nhân khác tác động lên, thường mang ý nghĩa không may mắn hoặc kết quả khách quan.",
    comparison: {
      vietnamese: "Cái bánh kem bị em trai ăn mất rồi.",
      wrongChinese: "弟弟吃了蛋糕被 (Sai)",
      correctChinese: "蛋糕被弟弟吃掉了。(Dàngāo bèi dìdi chī diào le)"
    },
    examples: [
      { zh: "我的自行车被偷了。", pinyin: "Wǒ de zìxíngchē bèi tōu le.", vi: "Chiếc xe đạp của tôi bị trộm mất rồi." },
      { zh: "他被大家选为班长。", pinyin: "Tā bèi dàjiā xuǎn wéi bānzhǎng.", vi: "Cậu ấy được mọi người bầu làm lớp trưởng." }
    ]
  },
  {
    id: "grammar-06",
    level: "HSK 2 - 3",
    title: "Câu So Sánh Chữ '比'",
    badge: "Thường dùng",
    formula: "A + 比 + B + Tính từ (hoặc Động từ + 得...)",
    desc: "Dùng để so sánh sự hơn kém về một tính chất hoặc trạng thái giữa hai đối tượng.",
    comparison: {
      vietnamese: "Hôm nay lạnh hơn hôm qua.",
      wrongChinese: "今天冷过昨天 (Ảnh hưởng tiếng địa phương)",
      correctChinese: "今天比昨天冷。(Jīntiān bǐ zuótiān lěng)"
    },
    examples: [
      { zh: "哥哥比弟弟高五厘米。", pinyin: "Gēge bǐ dìdi gāo wǔ límǐ.", vi: "Anh trai cao hơn em trai 5 centimet." },
      { zh: "她汉语说得比我流利。", pinyin: "Tā Hànyǔ shuō de bǐ wǒ liúlì.", vi: "Cô ấy nói tiếng Trung lưu loát hơn tôi." }
    ]
  }
];
