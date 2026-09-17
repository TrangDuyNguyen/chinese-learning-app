export const initialsData = [
  {
    group: "Âm hai môi & Âm môi răng",
    desc: "Khép hai môi lại hoặc dùng răng trên chạm môi dưới",
    items: [
      { pinyin: "b", ipa: "[p]", vnEquivalent: "Gần giống 'b' hoặc 'p' không bật hơi trong tiếng Việt", example: "爸爸 (bàba - bố)", tip: "Hai môi khép chặt, không bật hơi, luồng hơi thoát ra êm." },
      { pinyin: "p", ipa: "[pʰ]", vnEquivalent: "Giống 'p' bật hơi thật mạnh", example: "苹果 (píngguǒ - táo)", tip: "BẬT HƠI MẠNH: Để tờ giấy ăn trước miệng, phát âm giấy phải bay mạnh.", isAspirated: true },
      { pinyin: "m", ipa: "[m]", vnEquivalent: "Giống 'm' tiếng Việt", example: "妈妈 (māma - mẹ)", tip: "Hai môi khép, luồng hơi đi qua khoang mũi." },
      { pinyin: "f", ipa: "[f]", vnEquivalent: "Giống 'ph' tiếng Việt", example: "飞机 (fēijī - máy bay)", tip: "Răng trên chạm nhẹ môi dưới, hơi thoát qua khe răng." }
    ]
  },
  {
    group: "Âm đầu lưỡi giữa",
    desc: "Đầu lưỡi chạm vào lợi trên",
    items: [
      { pinyin: "d", ipa: "[t]", vnEquivalent: "Giống âm 't' trong tiếng Việt (không phải 'đ')", example: "弟弟 (dìdi - em trai)", tip: "Không bật hơi, tương tự chữ 't' trong 'tôi'." },
      { pinyin: "t", ipa: "[tʰ]", vnEquivalent: "Giống âm 'th' tiếng Việt có bật hơi", example: "天气 (tiānqì - thời tiết)", tip: "BẬT HƠI: Đầu lưỡi chạm lợi trên rồi hạ nhanh, tống hơi mạnh.", isAspirated: true },
      { pinyin: "n", ipa: "[n]", vnEquivalent: "Giống 'n' tiếng Việt", example: "你好 (nǐhǎo - xin chào)", tip: "Âm mũi, đầu lưỡi chạm lợi trên." },
      { pinyin: "l", ipa: "[l]", vnEquivalent: "Giống 'l' tiếng Việt", example: "老师 (lǎoshī - giáo viên)", tip: "Đầu lưỡi chạm lợi trên, luồng hơi thoát ra hai bên lưỡi." }
    ]
  },
  {
    group: "Âm cuống lưỡi",
    desc: "Phần gốc lưỡi nâng lên chạm ngạc mềm",
    items: [
      { pinyin: "g", ipa: "[k]", vnEquivalent: "Giống âm 'c / k' tiếng Việt (không phải 'g')", example: "哥哥 (gēge - anh trai)", tip: "Không bật hơi, phát âm dứt khoát như 'ca'." },
      { pinyin: "k", ipa: "[kʰ]", vnEquivalent: "Giống âm 'kh' tiếng Việt nhưng bật hơi dứt khoát", example: "咖啡 (kāfēi - cà phê)", tip: "BẬT HƠI: Cuống lưỡi bật mạnh tống hơi ra ngoài.", isAspirated: true },
      { pinyin: "h", ipa: "[x]", vnEquivalent: "Nằm giữa 'h' và 'kh' tiếng Việt", example: "喝茶 (hēchá - uống trà)", tip: "Hơi cọ xát nhẹ ở cuống họng, không bật mạnh như 'k'." }
    ]
  },
  {
    group: "Âm mặt lưỡi (Nhóm âm dễ sai)",
    desc: "Mặt lưỡi nâng lên chạm ngạc cứng (chỉ đi với vận mẫu bắt đầu bằng i và ü)",
    items: [
      { pinyin: "j", ipa: "[tɕ]", vnEquivalent: "Gần giống 'ch' nhẹ tiếng Việt", example: "家 (jiā - nhà)", tip: "Mặt lưỡi áp sát ngạc cứng, không bật hơi, khóe miệng kéo sang hai bên." },
      { pinyin: "q", ipa: "[tɕʰ]", vnEquivalent: "Giống 'ch' bật hơi thật mạnh", example: "钱 (qián - tiền)", tip: "BẬT HƠI CỰC MẠNH: Giữ nguyên khẩu hình của 'j' nhưng tống hơi dứt khoát.", isAspirated: true },
      { pinyin: "x", ipa: "[ɕ]", vnEquivalent: "Giống 'x' tiếng Việt nhưng đầu lưỡi hạ thấp", example: "谢谢 (xièxie - cảm ơn)", tip: "Mặt lưỡi nâng lên gần ngạc cứng, luồng hơi ma sát qua khe." }
    ]
  },
  {
    group: "Âm đầu lưỡi trước (z, c, s)",
    desc: "Đầu lưỡi thẳng chạm mặt sau răng trên/dưới",
    items: [
      { pinyin: "z", ipa: "[ts]", vnEquivalent: "Gần giống 'tr' hoặc 'ch' phát âm nhẹ ở kẽ răng", example: "早上 (zǎoshang - buổi sáng)", tip: "Đầu lưỡi thẳng, chạm sau răng trên, không bật hơi." },
      { pinyin: "c", ipa: "[tsʰ]", vnEquivalent: "Giống 'x' bật hơi cực mạnh ở đầu lưỡi", example: "菜 (cài - món ăn)", tip: "BẬT HƠI: Giữ khẩu hình 'z', tống luồng hơi cực mạnh qua kẽ răng.", isAspirated: true },
      { pinyin: "s", ipa: "[s]", vnEquivalent: "Giống 'x' tiếng Việt (nhẹ nhàng)", example: "三 (sān - số ba)", tip: "Đầu lưỡi tiếp cận sau răng trên, hơi thoát nhẹ nhàng." }
    ]
  },
  {
    group: "Âm uốn lưỡi (zh, ch, sh, r)",
    desc: "Đầu lưỡi cong lên chạm ngạc cứng trên (đặc sản Bắc Kinh)",
    items: [
      { pinyin: "zh", ipa: "[tʂ]", vnEquivalent: "Uốn cong lưỡi như phát âm 'tr' miền Nam nhưng không rung", example: "中国 (zhōngguó - Trung Quốc)", tip: "Uốn đầu lưỡi lên vòm họng, không bật hơi." },
      { pinyin: "ch", ipa: "[tʂʰ]", vnEquivalent: "Uốn cong lưỡi và BẬT HƠI thật mạnh", example: "吃饭 (chīfàn - ăn cơm)", tip: "BẬT HƠI: Uốn lưỡi lên, sau đó bật mạnh luồng hơi ra ngoài.", isAspirated: true },
      { pinyin: "sh", ipa: "[ʂ]", vnEquivalent: "Uốn cong lưỡi phát âm 's' nặng", example: "水 (shuǐ - nước)", tip: "Uốn cong đầu lưỡi lên vòm ngạc, luồng hơi ma sát thoát ra." },
      { pinyin: "r", ipa: "[ʐ]", vnEquivalent: "Giống 'r' tiếng Việt hoặc lai giữa 'r' và 'd'", example: "热 (rè - nóng)", tip: "Uốn cong đầu lưỡi, dây thanh đới rung lên khi phát âm." }
    ]
  }
];

export const finalsData = [
  {
    category: "Vận mẫu đơn (Nguyên âm cơ bản)",
    items: [
      { pinyin: "a", ipa: "[a]", vnEquivalent: "Giống 'a' tiếng Việt", example: "八 (bā - tám)" },
      { pinyin: "o", ipa: "[o]", vnEquivalent: "Giống 'ô' hoặc hơi ngả sang 'ua'", example: "我 (wǒ - tôi)" },
      { pinyin: "e", ipa: "[ɤ]", vnEquivalent: "Gần giống 'ưa' tiếng Việt (tròn miệng, hạ hàm)", example: "饿 (è - đói)" },
      { pinyin: "i", ipa: "[i]", vnEquivalent: "Giống 'i' (lưu ý: đi với z, c, s, zh, ch, sh, r đọc là 'ư')", example: "你 (nǐ - bạn), 是 (shì - là)" },
      { pinyin: "u", ipa: "[u]", vnEquivalent: "Giống 'u' tiếng Việt", example: "五 (wǔ - năm)" },
      { pinyin: "ü", ipa: "[y]", vnEquivalent: "Giống 'uy' tròn môi (giữ môi tròn từ đầu đến cuối)", example: "绿 (lǜ - xanh lá)" }
    ]
  },
  {
    category: "Vận mẫu kép thông dụng",
    items: [
      { pinyin: "ai", ipa: "[aɪ]", vnEquivalent: "Giống 'ai' tiếng Việt", example: "爱 (ài - yêu)" },
      { pinyin: "ei", ipa: "[eɪ]", vnEquivalent: "Giống 'ây' tiếng Việt", example: "杯 (bēi - cốc)" },
      { pinyin: "ao", ipa: "[aʊ]", vnEquivalent: "Giống 'ao' tiếng Việt", example: "包 (bāo - túi/bao)" },
      { pinyin: "ou", ipa: "[oʊ]", vnEquivalent: "Giống 'âu' tiếng Việt", example: "狗 (gǒu - con chó)" },
      { pinyin: "ia", ipa: "[ja]", vnEquivalent: "Giống 'ia' tiếng Việt", example: "家 (jiā - gia đình)" },
      { pinyin: "ie", ipa: "[jɛ]", vnEquivalent: "Giống 'iê' tiếng Việt", example: "鞋 (xié - giày)" },
      { pinyin: "ua", ipa: "[wa]", vnEquivalent: "Giống 'oa' tiếng Việt", example: "花 (huā - hoa)" },
      { pinyin: "uo", ipa: "[wo]", vnEquivalent: "Giống 'ua/uô' tiếng Việt", example: "桌 (zhuō - bàn)" },
      { pinyin: "üe", ipa: "[ɥɛ]", vnEquivalent: "Tròn môi đọc 'u-yê'", example: "月 (yuè - mặt trăng)" }
    ]
  },
  {
    category: "Vận mẫu mũi (Kết thúc bằng n hoặc ng)",
    items: [
      { pinyin: "an", ipa: "[an]", vnEquivalent: "Giống 'an' tiếng Việt", example: "看 (kàn - xem/nhìn)" },
      { pinyin: "en", ipa: "[ən]", vnEquivalent: "Giống 'ân' tiếng Việt", example: "人 (rén - người)" },
      { pinyin: "in", ipa: "[in]", vnEquivalent: "Giống 'in' tiếng Việt", example: "心 (xīn - trái tim)" },
      { pinyin: "ang", ipa: "[aŋ]", vnEquivalent: "Giống 'ang' tiếng Việt", example: "忙 (máng - bận)" },
      { pinyin: "eng", ipa: "[əŋ]", vnEquivalent: "Giống 'âng' tiếng Việt", example: "风 (fēng - gió)" },
      { pinyin: "ing", ipa: "[iŋ]", vnEquivalent: "Giống 'inh' tiếng Việt", example: "听 (tīng - nghe)" },
      { pinyin: "ong", ipa: "[ʊŋ]", vnEquivalent: "Giống 'ung' tiếng Việt", example: "红 (hóng - màu đỏ)" }
    ]
  }
];

export const tonesData = [
  {
    toneNumber: 1,
    name: "Thanh 1 (Âm Bình)",
    mark: "ā",
    symbol: "—",
    pitch: "5 - 5 (Cao & Phẳng)",
    color: "bg-blue-500 text-white",
    desc: "Bắt đầu ở cao độ 5 và giữ nguyên độ cao đến hết âm tiết. Giọng ngân dài, vang, đều đặn.",
    vnNote: "Không giống dấu ngang tiếng Việt (tiếng Việt ở cao độ 3-3). Thanh 1 tiếng Trung cao và vang hơn hẳn!",
    examples: ["mā (妈 - Mẹ)", "bā (八 - Tám)", "fēijī (飞机 - Máy bay)"]
  },
  {
    toneNumber: 2,
    name: "Thanh 2 (Dương Bình)",
    mark: "á",
    symbol: "／",
    pitch: "3 - 5 (Đi lên)",
    color: "bg-emerald-500 text-white",
    desc: "Bắt đầu ở cao độ 3 trung bình rồi vuốt mạnh lên cao độ 5.",
    vnNote: "Gần giống dấu SẮC trong tiếng Việt, nhưng thanh thoát và vuốt mượt mà hơn.",
    examples: ["má (麻 - Cây gai)", "rén (人 - Người)", "xuéxí (学习 - Học tập)"]
  },
  {
    toneNumber: 3,
    name: "Thanh 3 (Thượng Thanh)",
    mark: "ǎ",
    symbol: "∨",
    pitch: "2 - 1 - 4 (Xuống sâu rồi lượn lên)",
    color: "bg-amber-500 text-white",
    desc: "Bắt đầu từ độ cao 2, hạ sâu xuống 1 rồi lượn vút lên 4. Khi nói nhanh trong câu thường chỉ đọc nửa đầu thanh 3 (2-1).",
    vnNote: "Giống sự kết hợp giữa dấu HỎI và dấu NẶNG của tiếng Việt.",
    examples: ["mǎ (马 - Con ngựa)", "nǐ (你 - Bạn)", "hǎo (好 - Tốt)"]
  },
  {
    toneNumber: 4,
    name: "Thanh 4 (Khứ Thanh)",
    mark: "à",
    symbol: "＼",
    pitch: "5 - 1 (Rơi mạnh, dứt khoát)",
    color: "bg-rose-500 text-white",
    desc: "Bắt đầu từ đỉnh cao độ 5, hạ cực nhanh và mạnh xuống đáy cao độ 1. Âm thanh ngắn, dứt khoát, uy lực.",
    vnNote: "Cực kỳ chú ý: KHÔNG PHẢI dấu HUYỀN tiếng Việt! Dấu huyền tiếng Việt trầm và nhẹ (2-1), còn thanh 4 tiếng Trung rơi từ đỉnh 5 xuống 1 với lực rất mạnh.",
    examples: ["mà (骂 - Mắng mỏ)", "bàba (爸爸 - Bố)", "búshì (不是 - Không phải)"]
  },
  {
    toneNumber: 0,
    name: "Khinh Thanh (Thanh nhẹ)",
    mark: "a",
    symbol: "•",
    pitch: "Ngắn, nhẹ, phụ thuộc âm trước",
    color: "bg-slate-500 text-white",
    desc: "Không đánh dấu thanh điệu. Phát âm cực ngắn, nhẹ như rơi một chiếc lá.",
    vnNote: "Thường gặp ở từ láy hoặc các trợ từ ngữ khí: 吗 (ma), 呢 (ne), 吧 (ba), 的 (de).",
    examples: ["māma (妈妈)", "xièxie (谢谢)", "hǎo ma (好吗)"]
  }
];

export const toneChangeRules = [
  {
    title: "1. Quy tắc biến điệu hai Thanh 3 (∨ + ∨ -> ／ + ∨)",
    desc: "Khi hai âm tiết cùng mang thanh 3 đứng liền kề nhau, thanh 3 thứ nhất BẮT BUỘC biến thành thanh 2.",
    formula: "Thanh 3 + Thanh 3 => Thanh 2 + Thanh 3",
    examples: [
      { original: "nǐ (你) + hǎo (好)", pronounced: "ní hǎo (你好)", meaning: "Xin chào" },
      { original: "kě (可) + yǐ (以)", pronounced: "ké yǐ (可以)", meaning: "Có thể" },
      { original: "shǒu (手) + biǎo (表)", pronounced: "shóu biǎo (手表)", meaning: "Đồng hồ đeo tay" }
    ]
  },
  {
    title: "2. Quy tắc biến điệu của chữ '一' (yī - Số 1)",
    desc: "Bản thân '一' đọc là thanh 1 (yī). Nhưng khi ghép từ sẽ biến điệu tùy theo âm tiết đứng sau nó.",
    formula: "一 + Thanh 4 => YÍ (Thanh 2) | 一 + Thanh 1/2/3 => YÌ (Thanh 4)",
    examples: [
      { original: "yī + dìng (一定)", pronounced: "yí dìng", meaning: "Nhất định (Đứng trước thanh 4)" },
      { original: "yī + kuài (一块)", pronounced: "yí kuài", meaning: "Cùng nhau (Đứng trước thanh 4)" },
      { original: "yī + tiān (一天)", pronounced: "yì tiān", meaning: "Một ngày (Đứng trước thanh 1)" },
      { original: "yī + nián (一年)", pronounced: "yì nián", meaning: "Một năm (Đứng trước thanh 2)" }
    ]
  },
  {
    title: "3. Quy tắc biến điệu của chữ '不' (bù - Không)",
    desc: "Bản thân '不' mang thanh 4 (bù). Nhưng khi đứng TRƯỚC một thanh 4 khác, nó biến thành thanh 2 (bú).",
    formula: "不 (bù) + Thanh 4 => BÚ (Thanh 2) + Thanh 4",
    examples: [
      { original: "bù + shì (不是)", pronounced: "bú shì", meaning: "Không phải" },
      { original: "bù + duì (不对)", pronounced: "bú duì", meaning: "Không đúng" },
      { original: "bù + qù (不去)", pronounced: "bú qù", meaning: "Không đi" },
      { original: "bù + hǎo (不好)", pronounced: "bù hǎo", meaning: "Không tốt (Đứng trước thanh 3 giữ nguyên thanh 4)" }
    ]
  }
];
