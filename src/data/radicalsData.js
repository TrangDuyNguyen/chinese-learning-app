export const basicStrokes = [
  { name: "Ngang (Héng)", char: "一", pinyin: "héng", desc: "Nét thẳng nằm ngang, viết từ trái sang phải.", example: "一 (yī - một), 三 (sān - ba)" },
  { name: "Sổ (Shù)", char: "丨", pinyin: "shù", desc: "Nét thẳng đứng, viết từ trên xuống dưới.", example: "十 (shí - mười), 中 (zhōng - giữa)" },
  { name: "Phẩy (Piě)", char: "丿", pinyin: "piě", desc: "Nét cong từ trên chếch xuống dưới sang trái.", example: "人 (rén - người), 八 (bā - tám)" },
  { name: "Mác (Nà)", char: "乀", pinyin: "nà", desc: "Nét thẳng từ trên chếch xuống dưới sang phải, đuôi nhọn.", example: "大 (dà - to lớn), 天 (tiān - trời)" },
  { name: "Chấm (Diǎn)", char: "丶", pinyin: "diǎn", desc: "Nét chấm nhỏ từ trên chếch xuống dưới sang phải.", example: "六 (liù - sáu), 主 (zhǔ - chủ)" },
  { name: "Hất (Tí)", char: "㇀", pinyin: "tí", desc: "Nét từ dưới chếch lên trên sang phải.", example: "地 (dì - đất), 冷 (lěng - lạnh)" },
  { name: "Gập (Zhé)", char: "𠃍", pinyin: "zhé", desc: "Nét gấp khúc ngang rồi gập xuống hoặc ngược lại.", example: "口 (kǒu - miệng), 日 (rì - mặt trời)" },
  { name: "Móc (Gōu)", char: "亅", pinyin: "gōu", desc: "Nét sổ hoặc nét cong có móc ngược lên ở đuôi.", example: "小 (xiǎo - nhỏ), 了 (le - rồi)" }
];

export const strokeOrderRules = [
  {
    rule: "1. Ngang trước sổ sau (先横后竖)",
    meaning: "Gặp nét ngang và nét sổ giao nhau, luôn viết nét ngang trước, nét sổ sau.",
    exampleChar: "十",
    pinyin: "shí",
    breakdown: "一 -> 十 (Ngang trước, sổ sau)",
    meaningVn: "Số mười"
  },
  {
    rule: "2. Phẩy trước mác sau (先撇后捺)",
    meaning: "Nét phẩy (nghiêng sang trái) viết trước, nét mác (nghiêng sang phải) viết sau.",
    exampleChar: "八",
    pinyin: "bā",
    breakdown: "丿 -> 八 (Phẩy trước, mác sau)",
    meaningVn: "Số tám"
  },
  {
    rule: "3. Trên trước dưới sau (从上到下)",
    meaning: "Các nét nằm ở phía trên viết trước, các nét bên dưới viết sau.",
    exampleChar: "三",
    pinyin: "sān",
    breakdown: "一 -> 二 -> 三 (Từng nét từ trên xuống dưới)",
    meaningVn: "Số ba"
  },
  {
    rule: "4. Trái trước phải sau (从左到右)",
    meaning: "Bộ phận hoặc nét nằm bên trái viết trước, bên phải viết sau.",
    exampleChar: "你",
    pinyin: "nǐ",
    breakdown: "Bộ Nhân đứng (亻) bên trái trước -> Bộ Nhĩ (尔) bên phải sau",
    meaningVn: "Bạn, anh, chị"
  },
  {
    rule: "5. Ngoài trước trong sau (从外到内)",
    meaning: "Khung bao bên ngoài viết trước, phần ruột bên trong viết sau.",
    exampleChar: "月",
    pinyin: "yuè",
    breakdown: "Khung ngoài trước -> Hai nét ngang bên trong sau",
    meaningVn: "Mặt trăng, tháng"
  },
  {
    rule: "6. Vào trước đóng sau (先进入后关门)",
    meaning: "Vẽ khung bao ba phía, viết các nét bên trong, cuối cùng mới đóng đáy lại.",
    exampleChar: "国",
    pinyin: "guó",
    breakdown: "Bộ Vi bao 3 góc (冂) -> Viết chữ Ngọc (玉) bên trong -> Nét ngang cuối đóng cửa (国)",
    meaningVn: "Đất nước, quốc gia"
  },
  {
    rule: "7. Giữa trước hai bên sau (先中间后两边)",
    meaning: "Với các chữ đối xứng hai bên, nét thẳng chính giữa viết trước, hai cánh viết sau.",
    exampleChar: "小",
    pinyin: "xiǎo",
    breakdown: "Nét sổ móc (亅) ở giữa trước -> Nét phẩy bên trái -> Nét chấm bên phải",
    meaningVn: "Nhỏ bé"
  }
];

export const commonRadicals = [
  { radical: "亻", nameHVD: "Nhân đứng", pinyin: "rén", strokes: 2, meaning: "Liên quan đến con người", examples: ["你 (bạn)", "他 (anh ấy)", "们 (chúng tôi)"] },
  { radical: "口", nameHVD: "Khẩu", pinyin: "kǒu", strokes: 3, meaning: "Liên quan đến miệng, lời nói, ăn uống", examples: ["吃 (ăn)", "喝 (uống)", "叫 (gọi)"] },
  { radical: "氵", nameHVD: "Tam chấm thủy", pinyin: "shuǐ", strokes: 3, meaning: "Liên quan đến nước, chất lỏng", examples: ["水 (nước)", "海 (biển)", "洗 (giặt/rửa)"] },
  { radical: "艹", nameHVD: "Thảo đầu", pinyin: "cǎo", strokes: 3, meaning: "Liên quan đến cây cỏ, thảo mộc", examples: ["茶 (trà)", "花 (hoa)", "草 (cỏ)"] },
  { radical: "女", nameHVD: "Nữ", pinyin: "nǚ", strokes: 3, meaning: "Liên quan đến phụ nữ, phái đẹp", examples: ["好 (tốt)", "妈 (mẹ)", "姐 (chị gái)"] },
  { radical: "扌", nameHVD: "Tài gảy (Thủ)", pinyin: "shǒu", strokes: 3, meaning: "Liên quan đến bàn tay, động tác tay", examples: ["打 (đánh)", "找 (tìm)", "提 (xách)"] },
  { radical: "心 (忄)", nameHVD: "Tâm (Tâm đứng)", pinyin: "xīn", strokes: 3, meaning: "Liên quan đến tâm tư, tình cảm, cảm xúc", examples: ["想 (nghĩ)", "忙 (bận)", "怕 (sợ)"] },
  { radical: "木", nameHVD: "Mộc", pinyin: "mù", strokes: 4, meaning: "Liên quan đến cây cối, đồ gỗ", examples: ["本 (sách)", "机 (máy)", "杯 (cốc)"] },
  { radical: "日", nameHVD: "Nhật", pinyin: "rì", strokes: 4, meaning: "Liên quan đến mặt trời, thời gian, ngày", examples: ["明 (sáng)", "时 (thời gian)", "早 (sớm)"] },
  { radical: "月", nameHVD: "Nguyệt (hoặc Nhục)", pinyin: "yuè", strokes: 4, meaning: "Mặt trăng hoặc các bộ phận cơ thể thịt", examples: ["月 (tháng)", "期 (kỳ)", "朋 (bạn bè)"] },
  { radical: "讠(言)", nameHVD: "Ngôn", pinyin: "yán", strokes: 2, meaning: "Liên quan đến ngôn ngữ, lời nói", examples: ["说 (nói)", "话 (lời)", "语 (ngôn ngữ)"] },
  { radical: "饣(食)", nameHVD: "Thực", pinyin: "shí", strokes: 3, meaning: "Liên quan đến thức ăn, việc ăn", examples: ["饭 (cơm)", "馆 (quán ăn)", "饱 (no)"] },
  { radical: "辶", nameHVD: "Quai xước", pinyin: "chuò", strokes: 3, meaning: "Liên quan đến đi lại, khoảng cách, bước chân", examples: ["这 (đây)", "远 (xa)", "进 (vào)"] },
  { radical: "火 (灬)", nameHVD: "Hỏa (Bốn chấm hỏa)", pinyin: "huǒ", strokes: 4, meaning: "Liên quan đến lửa, nhiệt độ, nấu nướng", examples: ["热 (nóng)", "点 (chấm/điểm)", "黑 (đen)"] },
  { radical: "目", nameHVD: "Mục", pinyin: "mù", strokes: 5, meaning: "Liên quan đến mắt, thị giác", examples: ["看 (nhìn)", "眼 (mắt)", "睛 (con ngươi)"] },
  { radical: "钅(金)", nameHVD: "Kim", pinyin: "jīn", strokes: 5, meaning: "Liên quan đến kim loại, tiền bạc", examples: ["钱 (tiền)", "银 (bạc)", "错 (sai)"] },
  { radical: "纟(糹)", nameHVD: "Mịch", pinyin: "mì", strokes: 3, meaning: "Liên quan đến tơ lụa, sợi chỉ, sự gắn kết", examples: ["红 (đỏ)", "给 (cho)", "细 (nhỏ/tỉ mỉ)"] },
  { radical: "土", nameHVD: "Thổ", pinyin: "tǔ", strokes: 3, meaning: "Liên quan đến đất đai, bùn đất", examples: ["地 (đất)", "在 (ở)", "场 (sân/bãi)"] },
  { radical: "宀", nameHVD: "Miên (Mái nhà)", pinyin: "mián", strokes: 3, meaning: "Liên quan đến nhà cửa, nơi cư ngụ", examples: ["家 (nhà)", "安 (yên)", "字 (chữ)"] },
  { radical: "门", nameHVD: "Môn", pinyin: "mén", strokes: 3, meaning: "Liên quan đến cửa ra vào, cổng", examples: ["问 (hỏi)", "闭 (đóng)", "间 (gian/phòng)"] },
  { radical: "足 (𧾷)", nameHVD: "Túc", pinyin: "zú", strokes: 7, meaning: "Liên quan đến bàn chân, động tác đi/chạy", examples: ["跑 (chạy)", "跳 (nhảy)", "路 (đường)"] },
  { radical: "车", nameHVD: "Xa", pinyin: "chē", strokes: 4, meaning: "Liên quan đến xe cộ, phương tiện", examples: ["辆 (chiếc xe)", "转 (chuyển)", "轮 (bánh xe)"] },
  { radical: "力", nameHVD: "Lực", pinyin: "lì", strokes: 2, meaning: "Liên quan đến sức mạnh, thể lực", examples: ["动 (động)", "功 (công)", "男 (đàn ông)"] },
  { radical: "大", nameHVD: "Đại", pinyin: "dà", strokes: 3, meaning: "To lớn, liên quan đến con người dang rộng tay", examples: ["太 (quá/lắm)", "天 (trời)", "夫 (chồng/phu)"] }
];
