const fs = require('fs');

const ch3 = [
  {
    id: 201,
    chuong: 3,
    cauHoi: "Năm 1919, Nguyễn Ái Quốc đã nhân danh ai để gửi tới Hội nghị Vécxây bản Yêu sách của nhân dân An Nam?",
    dapAn: [
      "Những người Việt Nam yêu nước tại Pháp",
      "Những người Việt Nam yêu nước tại Anh",
      "Những người Việt Nam yêu nước tại Trung Quốc",
      "Những người Việt Nam yêu nước tại Việt Nam"
    ],
    dung: "A"
  },
  {
    id: 202,
    chuong: 3,
    cauHoi: "Ngày 19/12/1946, trong Lời kêu gọi toàn quốc kháng chiến, Hồ Chí Minh đã thể hiện sự quyết tâm sắt đá, bảo vệ nền độc lập dân tộc mà nhân dân Việt Nam mới giành được là gì?",
    dapAn: [
      "\"Không có gì quý hơn độc lập, tự do\"",
      "\"Không! Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ\"",
      "\"Người ta sinh ra tự do và bình đẳng về quyền lợi, và phải luôn được tự do và bình đẳng về quyền lợi\"",
      "\"Nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì\""
    ],
    dung: "B"
  },
  {
    id: 203,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, cách mạng giải phóng dân tộc ở Việt Nam muốn thắng lợi phải thi theo con đường nào?",
    dapAn: [
      "Cách mạng tư sản",
      "Cách mạng vô sản",
      "Cách mạng bạo lực",
      "Tất cả các đáp án"
    ],
    dung: "B"
  },
  {
    id: 204,
    chuong: 3,
    cauHoi: "Sau khi đọc bản Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa của Lênin, Hồ Chí Minh đã tìm thấy con đường cứu nước, giải phóng dân tộc. Người đọc bản Sơ thảo này vào năm nào và ở đâu?",
    dapAn: [
      "Năm 1911, ở Anh",
      "Năm 1919, ở Nga",
      "Năm 1920, ở Pháp",
      "Năm 1925, ở Trung Quốc"
    ],
    dung: "C"
  },
  {
    id: 205,
    chuong: 3,
    cauHoi: "Vai trò lãnh đạo của Đảng Cộng sản được Hồ Chí Minh khẳng định là đội tiên phong của giai cấp nào trong sự nghiệp cách mạng?",
    dapAn: [
      "Tư sản, nhân dân lao động",
      "Công nhân, nhân dân lao động",
      "Đội ngũ trí thức, nhân dân lao động",
      "Tất cả các đáp án"
    ],
    dung: "B"
  },
  {
    id: 206,
    chuong: 3,
    cauHoi: "Muốn xây dựng chủ nghĩa xã hội, trước hết cần có những con người xã hội chủ nghĩa\". Hồ Chí Minh đã giải thích vấn đề này như thế nào?",
    dapAn: [
      "Mỗi người cần bồi dưỡng cho mình có ý thức làm chủ, có tinh thần tập thể xã hội chủ nghĩa và tư tưởng \"mình vì mọi người, mọi người vì mình\"",
      "Có quan điểm \"tất cả phục vụ sản xuất\"; có ý thức cần kiệm xây dựng nước nhà; có tinh thần tiến nhanh, tiến mạnh, tiến vững chắc...",
      "Phải chống lại những tư tưởng, tác phong xấu là: Chủ nghĩa cá nhân; quan liêu, mệnh lệnh; tham ô, lãng phí; bảo thủ, rụt rè",
      "Tất cả các đáp án"
    ],
    dung: "D"
  },
  {
    id: 207,
    chuong: 3,
    cauHoi: "Trong thời kỳ đổi mới hiện nay, vận dụng tư tưởng Hồ Chí Minh về chủ nghĩa xã hội đã đạt được những thành tựu to lớn, tuy nhiên vẫn còn phải đổi diện với những thách thức, nguy cơ lớn nào?",
    dapAn: [
      "Tụt hậu xa hơn về kinh tế so với các nước trong khu vực và trên thế giới",
      "Âm mưu thực hiện \"diễn biến hòa bình\" của thế lực thù địch nhằm chống phá nước ta; sự tồn tại và những diễn biến phức tạp của tệ quan liêu, tham nhũng, lãng phí",
      "Tình trạng suy thoái về tư tưởng chính trị, đạo đức, lối sống, những biểu hiện \"tự diễn biến\", \"tự chuyển hóa\" trong một bộ phận cán bộ, đảng viên, công chức, viên chứ",
      "Tất cả các đáp án"
    ],
    dung: "D"
  },
  {
    id: 208,
    chuong: 3,
    cauHoi: "Chủ nghĩa xã hội là chế độ xã hội có bản chất khác hẳn với các xã hội đã tồn tại trong lịch sử, do đó Hồ Chí Minh khăng định trong xã hội xã hội chủ nghĩa có những đặc trưng cơ bản trên các lĩnh vực gì?",
    dapAn: [
      "Về chính trị; Về kinh tế",
      "Về văn hóa, đạo đức và các quan hệ xã hội",
      "Về chủ thể xây dựng chủ nghĩa xã hội",
      "Tất cả các đáp án"
    ],
    dung: "D"
  },
  {
    id: 209,
    chuong: 3,
    cauHoi: "Với tư cách làm chủ, nhân dân phải làm tròn nhiệm vụ để xây dựng thành công chủ nghĩa xã hội, theo Hồ Chí Minh trong đó mọi người có quyền gì?",
    dapAn: [
      "Làm việc, nghỉ ngơi, học tập",
      "Tự do thân thể, ngôn luận, báo chí, hội họp",
      "Tự do tín ngưỡng hoặc không theo tôn giáo nào; có quyền bầu cử, ứng cử",
      "Tất cả các đáp án"
    ],
    dung: "D"
  },
  {
    id: 210,
    chuong: 3,
    cauHoi: "Để đạt được những mục tiêu của chủ nghĩa xã hội, theo Hồ Chí Minh hệ thống động lực thúc đẩy tiến trình cách mạng xã hội chủ nghĩa ở Việt Nam là gì?",
    dapAn: [
      "Trong quá khứ, hiện tại và tương lai,",
      "Vật chất và tinh thần,",
      "Nội lực và ngoại lực, v.v... ở tất cả các lĩnh vực như kinh tế, chính trị, văn hóa, khoa học, giáo dục",
      "Tất cả các đáp án"
    ],
    dung: "D"
  },
  {
    id: 211,
    chuong: 3,
    cauHoi: "Đặc điểm của thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam được Hồ Chí Minh khẳng định là gì?",
    dapAn: [
      "Từ một nước công nghiệp tiên tiến đi lên CNXH, không trải qua giai đoạn tư bản chủ nghĩa",
      "Từ một nước nông nghiệp lạc hậu tiến thăng lên CNXH, không trải qua giai đoạn phát trên tư bản chủ nghĩa",
      "Từ một nước có nền kinh tế cao tiến thẳng lên CNXH, không trải qua giai đoạn tư bản chủ nghĩa",
      "Từ một nước có khoa học - kỹ thuật tiên tiến lên CNXH, không trải qua giai đoạn tư bản chủ nghĩa"
    ],
    dung: "B"
  },
  {
    id: 212,
    chuong: 3,
    cauHoi: "Nhiệm vụ lịch sử của thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam được Hồ Chí Minh xác định như thế nào?",
    dapAn: [
      "Cải tạo, xóa bỏ tàn tích của chế độ xã hội cũ, xây dựng các yếu tố mới phù hợp với quy luật tiến lên CNXH",
      "Thực hiện xây dựng nền văn hóa xã hội chủ nghĩa, phù hợp với nguyện vọng của nhân dân",
      "Xây dựng con người mới của chủ nghĩa xã hội, phù hợp với quy luật tiến lên CNXH",
      "Tất cả các đáp án"
    ],
    dung: "A"
  },
  {
    id: 213,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, nguyên tắc xây dựng chủ nghĩa xã hội trong thời kỳ quá độ là gì?",
    dapAn: [
      "Mọi tư tưởng, hành động phải được thực hiện trên nền tảng chủ nghĩa Mác- Lênin",
      "Phải giữ vững độc lập dân tộc; phải đoàn kết, học tập kinh nghiệm của các nước anh em",
      "Xây phải đi đôi với chống",
      "Tất cả các đáp án"
    ],
    dung: "D"
  },
  {
    id: 214,
    chuong: 3,
    cauHoi: "Năm 1960, Hồ Chí Minh khẳng định: \"Chỉ có chủ nghĩa xã hội, chủ nghĩa cộng sản mới giải phóng được (...) bị áp bức và những (...) trên thế giới khỏi ách (...)\"I!. Xác định cụm từ còn thiếu?",
    dapAn: [
      "Các giai cấp/ người lao động/ nô lệ",
      "Các dân tộc/ người lao động/ nô lệ",
      "Các xã hội/ người lao động/ nô lệ",
      "Các cá nhân/ người lao động/ nô lệ"
    ],
    dung: "B"
  },
  {
    id: 215,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, cần có những điều kiện cơ bản nào để bảo đảm độc lập dân tộc gắn liền với chủ nghĩa xã hội?",
    dapAn: [
      "Phải bảo đảm vai trò lãnh đạo tuyệt đối của đảng cộng sản trong suốt tiến trình cách mạng",
      "Phải củng cố và tăng cường khối đại đoàn kết dân tộc mà nền tảng là khối liên minh công - nông",
      "Phải đoàn kết, gắn bó chặt chẽ với cách mạng thế giới",
      "Tất cả các đáp án"
    ],
    dung: "D"
  },
  {
    id: 216,
    chuong: 3,
    cauHoi: "Mục tiêu về văn hóa trong xây dựng CNXH ở Việt Nam, Hồ Chí Minh cho rằng mối quan hệ giữa văn hóa với chính trị và kinh tế là mối quan hệ biện chứng. Do đó, chế độ chính trị và kinh tế của xã hội là:",
    dapAn: [
      "Nền tảng và quyết định tính chất của văn hóa; còn văn hóa góp phần thực hiện mục tiêu của chính trị và kinh tế",
      "Nền tảng và quyết định tính chất của văn hóa; còn văn hóa góp phần soi đường cho quốc dân đi",
      "Nền tảng và quyết định tính chất của văn hóa; còn văn hóa góp phần nâng cao trình độ văn hóa của nhân dân",
      "Nền tảng và quyết định tính chất của văn hóa; còn văn hóa phát triển là điều kiện cho nhân dân tiến bộ"
    ],
    dung: "A"
  },
  {
    id: 217,
    chuong: 3,
    cauHoi: "Chọn phương án trả lời đúng nhất với tư tưởng Hồ Chí Minh về động lực của chủ nghĩa xã hội ở Việt Nam?",
    dapAn: [
      "Sức mạnh đại đoàn kết toàn dân",
      "Sức mạnh của nhân dân lao động",
      "Sức mạnh của địa vị nhân dân và các tầng lớp trong xã hội",
      "Sức mạnh lao động sáng tạo của hàng triệu quần chúng nhân dân"
    ],
    dung: "A"
  },
  {
    id: 218,
    chuong: 3,
    cauHoi: "Trong bối cảnh nền kinh tế của nước ta còn nghèo nàn, lạc hậu Hồ Chí Minh đã xác định nhiệm vụ quan trọng nhất của thời kỳ quá độ là gì?",
    dapAn: [
      "Xây dựng cơ sở vật chất và phát huy thế mạnh của nền kinh tế gắn công công nông nghiệp hiện đại",
      "Huy động sức mạnh của nhân dân trong cải tạo nền kinh tế sau cuộc cách mạng giải phóng dân tộc",
      "Cải tạo nền kinh tế cũ, xây dựng nền kinh tế mới có công nghiệp và nông nghiệp hiện đại",
      "Phát huy hết tài năng, sức lực, của cải của nhân dân vào xây dựng nền kinh tế mới với khoa học kỹ thuật hiện đại"
    ],
    dung: "C"
  },
  {
    id: 219,
    chuong: 3,
    cauHoi: "Chọn phương án trả lời đúng với tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội có môi quan hệ như thế nào?",
    dapAn: [
      "Chủ nghĩa xã hội quyết định giải phóng dân tộc; giải phóng dân tộc là điều kiện đảm bảo thắng lợi chủ nghĩa xã hội",
      "Độc lập dân tộc là cơ sở, tiền đề để tiến lên CNXH; CNXH là điều kiện đảm bảo nên độc lập dân tộc vững chắc",
      "Độc lập dân tộc và chủ nghĩa xã hội là ngọn cờ dẫn dắt cách mạng giải phóng dân tộc thắng lợi",
      "Chủ nghĩa xã hội là cơ sở, tiền đề để giải phóng dân tộc; giải phóng dân tộc là điều kiện đảm bảo xây dựng chủ nghĩa xã hội"
    ],
    dung: "B"
  },
  {
    id: 220,
    chuong: 3,
    cauHoi: "Khi đề cao mục tiêu độc lập dân tộc, Hồ Chí Minh đã không coi đó là mục tiêu cuối cùng của cách mạng, mà là tiền đề cho:",
    dapAn: [
      "Cuộc cách mạng xã hội chủ nghĩa",
      "Cuộc cách mạng giải phóng dân tộc",
      "Cách mạng tư sản chủ nghĩa",
      "Cách mạng dân tộc dân chủ nhân dân"
    ],
    dung: "A"
  },
  {
    id: 221,
    chuong: 3,
    cauHoi: "Đầu năm 1930, trong Chánh cương vắn tắt của Đảng, Người đã xác định mục tiêu chính trị của Đảng và cách mạng Việt Nam là gì?",
    dapAn: [
      "Đánh đổ bọn phong kiến và để quốc chủ nghĩa; Làm cho nước Nam bình đẳng. hạnh phúc",
      "Đánh đồ để quốc chủ nghĩa Pháp và bọn phong kiến; Làm cho nước Nam hoàn toàn độc lập",
      "Đánh đổ cai cấp địa chủ và chủ nghĩa đế quốc Pháp; Làm cho nước Nam hòa bình thống nhất",
      "Đánh đổ đế quốc chủ nghĩa Pháp và bè lũ tay sai; Làm cho nước Nam hòa bình, phồn thịnh"
    ],
    dung: "B"
  },
  {
    id: 222,
    chuong: 3,
    cauHoi: "Trong bản Tuyên ngôn Độc lập (1945), Hồ Chí Minh thay mặt Chính phủ lâm thời tuyên bố trước quốc dân đồng bào và thế giới vấn đề gì?",
    dapAn: [
      "Nước Việt Nam thực sự đã trở thành một nước tự do và độc lập",
      "Nước Việt Nam thực sự đã trở thành một nước thái bình và thịnh trị",
      "Nước Việt Nam thực sự đã trở thành một nước độc lập và tự quyết",
      "Nước Việt Nam thực sự đã trở thành một nước tự do, ấm no, hạnh phúc"
    ],
    dung: "A"
  },
  {
    id: 223,
    chuong: 3,
    cauHoi: "Với ý chí quyết tâm thực hiện cuộc kháng chiến chống Pháp và chống Mỹ, trong thư gửi Liên hợp quốc (1946), Hồ Chí Minh đã khẳng định nội dung nào sau đây?",
    dapAn: [
      "Nhân dân chúng tôi cũng kiên quyết chiến đấu đến cùng để bảo vệ những quyền thiêng liêng nhất: hòa bình, thống nhất và độc lập cho dân tộc",
      "Nhân dân chúng tôi cũng kiên quyết chiến đấu đến cùng để bảo vệ những quyền thiêng liêng nhất: hạnh phúc cho dân tộc và độc lập cho quê hương",
      "Nhân dân chúng tôi cũng kiên quyết chiến đấu đến cùng để bảo vệ những quyền thiêng liêng nhất: toàn vẹn lãnh thổ cho Tổ quốc và độc lập cho đất nước",
      "Nhân dân chúng tôi cũng kiên quyết chiến đấu đến cùng để bảo vệ những quyền thiêng liêng nhất: độc lập cho dân tộc và hạnh phúc cho nhân dân"
    ],
    dung: "C"
  },
  {
    id: 224,
    chuong: 3,
    cauHoi: "Khi Mỹ tăng cường mở rộng chiến tranh, Hồ Chí Minh đã nêu lên một chân lý thời đại, một tuyên ngôn bất hủ của các dân tộc khao khát nền độc lập, tự do trên thế giới là gì?",
    dapAn: [
      "\"Nhân dân chúng tôi kiên quyết chiến đấu đến cùng để bảo vệ những quyền thiêng liêng nhất: Toàn vẹn lãnh thổ cho Tổ quốc và độc lập cho đất nước\"",
      "\"Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do và độc lập\"",
      "\"Không! Chúng ta thà hy sinh tất cả chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ\"",
      "\"Không có gì quý hơn độc lập, tự do\""
    ],
    dung: "D"
  },
  {
    id: 225,
    chuong: 3,
    cauHoi: "Khi viện dẫn bản Tuyên ngôn Nhân quyền và Dân quyền của Cách mạng Pháp (1791), \"người ta sinh ra tự do và bình đẳng về quyền lợi, và phải luôn được tự do và bình đẳng về quyền lợi\"16 Hồ Chí Minh đã kết luận thế nào?",
    dapAn: [
      "Đó là lẽ phải thuộc về quyền của mỗi người",
      "Đó là lẽ phải không ai chối cãi được",
      "Đó là lẽ phải thuộc về quyền độc lập, tự do của các dân tộc",
      "Đó là lẽ phải mà tất cả các dân tộc đều được hưởng"
    ],
    dung: "B"
  },
  {
    id: 226,
    chuong: 3,
    cauHoi: "Hồ Chí Minh khẳng định: \"Nước độc lập mà (..), thì độc lập cũng chẳng có nghĩa lý gìl?. Xác định cụm từ còn thiều?",
    dapAn: [
      "Dân không làm những điều mình muốn",
      "Dân không hưởng hạnh phúc tự do",
      "Dân không được quyền thực hiện tự do ngôn luộn",
      "Dân không hưởng quyền bình đẳng tự do"
    ],
    dung: "B"
  },
  {
    id: 227,
    chuong: 3,
    cauHoi: "Hồ Chí Minh nhấn mạnh: Độc lập mà người dân không có quyền tự quyết về ngoại giao, không có quân đội riêng, không có nền tài chính riêng..., thì độc lập đó chẳng có ý nghĩa gì, nhằm khẳng định độc lập phải như thế nào?",
    dapAn: [
      "Độc lập hoàn toàn, độc lập triệt để và tự quyết trên tất cả các lĩnh vực",
      "Độc lập thật sự, độc lập thống nhất và bình đẳng trên tất cả các lĩnh vực",
      "Độc lập chủ quyền, toàn vẹn lãnh thổ và liên hiệp trên tất cả các lĩnh vực",
      "Độc lập thật sự, độc lập hoàn toàn và triệt để trên tất cả các lĩnh vực"
    ],
    dung: "D"
  },
  {
    id: 228,
    chuong: 3,
    cauHoi: "Khi thực dân Pháp bày ra cái gọi là \"Nam kỳ tự trị\" hòng chia cắt đất nước ta một lần nữa, trong hoàn cảnh đó, Hồ Chí Minh đã khẳng định điều gì?",
    dapAn: [
      "Đồng bào Nam bộ là dân nước Việt Nam, sông có thể cạn, núi có thể mòn, song chân lý đó không bao giờ thay đổi",
      "Đồng bào Nam bộ là dân nước Việt Nam, sông có thể rộng, núi có thể cao, song chân lý đó không bao giờ thay đổi",
      "Đồng bào Nam bộ là dân nước Việt Nam, sông có thể bồi lấp, núi có thể sạt lở, song chân lý ấy không bao giờ thay đổi",
      "Đồng bào Nam bộ là dân nước Việt Nam, sông có thể sâu, núi có thể cao, song chân lý ấy là mãi mã"
    ],
    dung: "A"
  },
  {
    id: 229,
    chuong: 3,
    cauHoi: "Thành công của cuộc cách mạng tháng 10 Nga (1917) đã ảnh hưởng sâu sắc tới Hồ Chí Minh trong việc lựa chọn con đường cứu nước, giải phóng dân tộc. Người đã nhận định như thế nào về cuộc cách mạng này?",
    dapAn: [
      "Đây là cuộc cách mạng thành công đến nơi, nghĩa là dân chúng được hướng quyền tự quyết, bình đẳng, dân chủ thật sự...",
      "Đây là cuộc cách mạng thành công đến nơi, nghĩa là dân chúng được quyền trao đổi, giao lưu, học hỏi, bình đắng thật sự ...",
      "Đây là cuộc cách mạng thành công đến nơi, nghĩa là dân chúng được hưởng hạnh phúc, tự do, bình đắng thật sự...",
      "Đây là cuộc cách mạng thành công đến nơi, nghĩa là dân chúng được hưởng quyền sung sướng, tự do, hạnh phúc thật sự..."
    ],
    dung: "C"
  },
  {
    id: 230,
    chuong: 3,
    cauHoi: "Trong bài viết Con đường dẫn tôi đến chủ nghĩa Lênin (1960), Hồ Chí Minh đã nhận định như thế nào về Luận cương của Lênin?",
    dapAn: [
      "Đây là cái cần thiết, là con đường dẫn chúng ta đi tới thắng lợi",
      "Đây là cái cần thiết cho chúng ta, là con đường giải phóng chúng ta",
      "Đây là cái cần thiết, là mục tiêu giải phóng dân tộc ta",
      "Đây là cái cần thiết, là con đường thành công của cách mạng"
    ],
    dung: "B"
  },
  {
    id: 231,
    chuong: 3,
    cauHoi: "Trong Chánh cương vắn tắt của Đảng năm 1930, Hồ Chí Minh khẳng định phương hướng chiến lược của cách mạng Việt Nam là gì?",
    dapAn: [
      "Làm tư sản dân quyền cách mạng và những vấn đề của cách mạng để đi tới xã hội chủ nghĩa",
      "Làm cuộc cải cách ruộng đất cho dân cày nghèo và tập trung nguồn lực xây dựng chủ nghĩa xã hội",
      "Làm tư sản dân quyền cách mạng và giải phóng các giai tầng trong xã hội để đi tới xã hội cộng sản",
      "Làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản"
    ],
    dung: "D"
  },
  {
    id: 232,
    chuong: 3,
    cauHoi: "Trong bản Yêu sách của nhân dân An Nam, Hồ Chí Minh đã đề nghị cho người An Nam cũng được hưởng quyền lợi gì như người dân ở Châu Âu?",
    dapAn: [
      "Quyền tự quyết về chế độ dân chủ và các quyền tự do, ngôn luận của nhân dân",
      "Quyền độc lập về mặt pháp lý và các quyền tự do, hạnh phúc của nhân dân",
      "Quyền bình đăng về mặt pháp lý và các quyền tự do, dân chủ của người dân",
      "Quyền liên hiệp về mặt pháp lý và các quyền tự dơ hội họp của người dân"
    ],
    dung: "C"
  },
  {
    id: 233,
    chuong: 3,
    cauHoi: "Khi tiếp thu bản Tuyên ngôn Độc lập của Mỹ (1776), Tuyên ngôn Nhân quyền và Dân quyền của Pháp (1791), Hồ Chí Minh đã khẳng định giá trị thiêng liêng, bất biến về quyền dân tộc như thế nào?",
    dapAn: [
      "\"Trong lúc này quyền lợi dân tộc giải phóng cao cao hơn hết thảy\"",
      "\"Dù phải hy sinh tới đâu, dù phải đốt cháy cả dãy Trường sơn cũng phải kiên quyết giành cho được độc lập\"",
      "\"Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do và độc lập'\"",
      "\"Tất cả các dân tộc trên thế giới đều sinh ra bình đắng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do\""
    ],
    dung: "D"
  },
  {
    id: 234,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, cách mạng giải phóng dân tộc trong điều kiện của Việt Nam muốn giành được thắng lợi phải do tố chức nào lãnh đạo?",
    dapAn: [
      "Đảng Cộng sản lãnh đạo",
      "Đảng nhân dân cách mạng",
      "Đảng Công nhân xã hội dân chủ",
      "Đảng vô sản kiểu mới"
    ],
    dung: "A"
  },
  {
    id: 235,
    chuong: 3,
    cauHoi: "Khi kế thừa tư tưởng của các nhà lý luận Mác-Lênin về cách mạng là sự nghiệp của quần chúng nhân dân, Hồ Chí Minh đã khẳng định như thế nào?",
    dapAn: [
      "\"Chỉ có giải phóng giai cấp vô sản thì mới giải phóng được dân tộc\"",
      "\"Công cuộc giải phóng anh em chỉ có thể thực hiện được bằng sự nỗ lực tự của bản thân anh em'",
      "\"Sự giải phóng của giai cấp công nhân phải là sự nghiệp của bản thân giai cấp công nhân'\"",
      "\"Cách mệnh là việc chung cả dân chúng chứ không phải việc một hai người\""
    ],
    dung: "D"
  },
  {
    id: 236,
    chuong: 3,
    cauHoi: "Trong Lời kêu gọi toàn quốc kháng chiến (12-1946), Hồ Chí Minh viết: \"Bất kỳ đàn ông, đàn bà, (...). Hễ là người Việt Nam thì phải đứng lên đánh thực dân Pháp để cứu Tổ quốc\"26. Xác định cụm từ còn thiếu?",
    dapAn: [
      "Bất kỳ người già, người trẻ, không chia tôn giáo, đảng phái",
      "Bất kỳ người già, thanh niên, phân chia tôn giáo, bè phái",
      "Bất kỳ người già, trẻ nhỏ, không phân chia tôn giáo, đảng phái",
      "Bất kỳ người già, phụ nữ, không phân chia tôn giáo, đảng phái"
    ],
    dung: "A"
  },
  {
    id: 237,
    chuong: 3,
    cauHoi: "Khi khẳng định về mối quan hệ bình đẳng trong cuộc cách mạng ở thuộc địa và chính quốc, Hồ Chí Minh đã lấy hình tượng nào sau đây để miêu tả về chủ nghĩa tư bản?",
    dapAn: [
      "Con chim đại bàng",
      "Con sam",
      "Con bạch tuộc",
      "Con đỉa có hai vòi"
    ],
    dung: "D"
  },
  {
    id: 238,
    chuong: 3,
    cauHoi: "Tại Đại hội V của Quốc tế Cộng sản (1924), Hồ Chí Min đã phát biểu để \"thức tỉnh... về vấn đề thuộc địa\"27 và Người cho rằng:",
    dapAn: [
      "Nọc độc và sức sống của con rắn độc tư bản chủ nghĩa đang tập trung ở các nước thuộc địa",
      "Sức sống mãnh liệt của các nước tư bản chủ nghĩa đều tập trung ở các nước thuộc địa",
      "Chủ nghĩa tư bản là con đại bàng chuyên đi xâm chiếm, khai thác vơ vét các nước thuộc địa",
      "Nọc độc và sức sống của chủ nghĩa tư bản đang tập trung ở chính các nước chính quốc"
    ],
    dung: "A"
  },
  {
    id: 239,
    chuong: 3,
    cauHoi: "Việc xác định hình thức đấu tranh phải \"tuỳ tình hình cụ thể mà quyết định những hình thức đấu tranh cách mạng thích hợp, sử dụng (...) các hình thức đấu tranh vũ trang và đấu tranh chính trị để (....)28. Xác định cụm từ còn thiếu?",
    dapAn: [
      "Nhanh và triệt để/ giành thắng lợi cho cách mạng",
      "Linh hoạt và khéo/ giành thắng lợi cho cách mạng",
      "Đúng và khéo kết hợp/ giành thắng lợi cho cách mạng",
      "Hiệu quả và nhanh/ giành thắng lợi cho cách mạng"
    ],
    dung: "C"
  },
  {
    id: 240,
    chuong: 3,
    cauHoi: "Tiến lên chủ nghĩa xã hội là một tất yếu khách quan, tuy nhiên ngay từ năm 1953 Hồ Chí Minh đã khẳng định phải tùy thuộc vào hoàn cảnh mà các dân tộc phát triển theo con đường khác nhau là gì?",
    dapAn: [
      "Có nước đi thẳng lên chủ nghĩa xã hội; có nước phải phát triển qua con đường tư bản rồi mới tiến lên chủ nghĩa xã hội",
      "Có nước thì đi thẳng lên chủ nghĩa xã hội; có nước thì phải kinh qua chế độ dân chủ mới rồi mới tiến lên chủ nghĩa xã hội",
      "Có nước đi thẳng lên chủ nghĩa xã hội; có nước phải kinh qua con đường phong kiến rồi mới tiến lên chủ nghĩa xã hội",
      "Có nước đi thẳng lên chủ nghĩa xã hội; có nước phải kinh qua con đường chiếm hữu nô lệ rồi mới tiến lên chủ nghĩa xã hội"
    ],
    dung: "B"
  },
  {
    id: 241,
    chuong: 3,
    cauHoi: "Luận điểm nào sau đây thể hiện quan điểm của Hồ Chí Minh về thời Kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam?",
    dapAn: [
      "\"Chủ nghĩa xã hội là làm sao cho dân giàu nước mạnh\"29",
      "\"Chủ nghĩa xã hội là mọi người cùng ra sức lao động sản xuất để được ăn no mặc ấm và có nhà ở sạch sẽ\"",
      "Đảng phải \"lãnh đạo toàn dân thực hiện dân chủ mới, xây dựng điều kiện để tiến lên chủ nghĩa xã hội\"31",
      "\"Chủ nghĩa xã hội là mọi người dân được áo ấm cơm no, nhà ở tử tế, được học hành '32"
    ],
    dung: "C"
  },
  {
    id: 242,
    chuong: 3,
    cauHoi: "Dựa trên các nguyên tắc có tính chất phương pháp luận về xây dựng chủ nghĩa xã hội, Hồ Chí Minh đã chỉ đạo biện pháp cơ bản nào?",
    dapAn: [
      "Đem của dân, tài dân, sức dân làm lợi cho dân",
      "Đem sức mạnh văn hóa làm động lực cơ bản",
      "Đem sức mạnh kinh tế làm động lực cơ bản",
      "Tận dụng tối đa sức mạnh đoàn kết quốc tế để xây dựng chủ nghĩa xã hội"
    ],
    dung: "A"
  },
  {
    id: 243,
    chuong: 3,
    cauHoi: "Chọn phương án sai với quan điểm Hồ Chí Minh về phương thức tiến lên chủ nghĩa xã hội?",
    dapAn: [
      "Những nước nông nghiệp, công nghiệp lạc hậu, khoa học kỹ thuật kém phát triển",
      "Những nước có nền kinh tế nghèo nàn, lạc hậu tiến thẳng lên CNXH không qua giai đoạn phát triển tư bản chủ nghĩa",
      "Những nước đã qua giai đoạn phát triển tư bản chủ nghĩa sẽ \"đi thẳng\" lên CNXH;",
      "Những nước chưa qua giai đoạn phát triển tư bản chủ nghĩa có thể đi lên CNXH sau khi đã \"đánh đồ để quốc và phong kiến\" dưới sự lãnh đạo của Đảng và tư tưởng của Mác - Lênin dẫn đường"
    ],
    dung: "A"
  },
  {
    id: 244,
    chuong: 3,
    cauHoi: "Đặc trưng trên lĩnh vực chính trị được Hồ Chí Minh khẳng định là chế độ xã hội như thế nào?",
    dapAn: [
      "Do giai cấp nông dân làm chủ",
      "Do nhân dân làm chủ",
      "Do giai cấp công nhân làm chủ",
      "Do tầng lớp trí thức làm chủ"
    ],
    dung: "B"
  },
  {
    id: 245,
    chuong: 3,
    cauHoi: "Hồ Chí Minh khẳng định trong CNXH, mọi quyền lợi, quyền lực, quyền hạn thuộc về nhân dân và mọi hoạt động (...) cũng thuộc về nhân dân. Xác định cụm từ còn thiếu?",
    dapAn: [
      "Xây dựng, bảo vệ đất nước, bảo vệ chế độ xã hội",
      "Xây dựng, phát triển kinh tế, bảo vệ chủ quyền",
      "Xây dựng, phát triển văn hóa, bảo vệ độc lập",
      "Xây dựng, phát triển xã hội, bảo vệ nền tảng tư tưởng"
    ],
    dung: "A"
  },
  {
    id: 246,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, CNXH là chế độ xã hội có nền kinh tế phát triển cao dựa trên lực lượng sản xuất hiện đại và:",
    dapAn: [
      "Chế độ công hữu về tư liệu sản xuất chủ yếu",
      "Chế độ tư hữu về tư liệu sản xuất chủ yếu",
      "Chế độ công hữu và tư hữu về tư liệu sản xuất chủ yếu",
      "Chế độ công hữu về tư liệu sản xuất không chủ yếu"
    ],
    dung: "A"
  },
  {
    id: 247,
    chuong: 3,
    cauHoi: "Mục tiêu về chế độ chính trị trong xây dựng chủ nghĩa xã hội ở Việt Nam theo Hồ Chí Minh là gì?",
    dapAn: [
      "Phải xây dựng được chế độ dân chủ",
      "Phải xây dựng được Mặt trên dân chủ",
      "Phải xây dựng được nền văn hóa dân chủ",
      "Phải xây dựng được hệ thống chính trị dân chủ"
    ],
    dung: "A"
  },
  {
    id: 248,
    chuong: 3,
    cauHoi: "Khi khái quát về mục tiêu kinh tế của chủ nghĩa xã hội ở Việt Nam, Hồ Chí Minh xác định phải là:",
    dapAn: [
      "Có nền kinh tế phát triển cao dựa trên lực lượng sản xuất và quan hệ sản xuất tiến bộ, khoa học kỹ thuật hiện đại",
      "Có nền kinh tế phát triển cao với công nghiệp và nông nghiệp hiện đại, khoa học kỹ thuật tiên tiến",
      "Có nên kinh tế phát triển gắn với việc thực hiện đầy đủ quyền làm chủ của nhân dân",
      "Có nền kinh tế hiện đại với chế độ công hữu về tư liệu sản xuất tiên tiến"
    ],
    dung: "B"
  },
  {
    id: 249,
    chuong: 3,
    cauHoi: "Trong hoàn cảnh một nước thuộc địa, Hồ Chí Minh khẳng định mục tiêu hàng đầu của cuộc cách mạng giải phóng dân tộc là gì?",
    dapAn: [
      "Đấu tranh giải phóng giai cấp, giải phóng dân tộc, thành lập nhà nước dân tộc độc lập",
      "Đấu tranh chống chủ nghĩa thực dân, giành độc lập dân tộc, thành lập nhà nước dân tộc độc lập",
      "Đấu tranh chống lại các thế lực thù địch, giành quyền tự quyết cho dân tộc, thành lập nhà nước dân tộc độc lập",
      "Đấu tranh, lên án chế độ khai thác thuộc địa của chế độ thực dân, đòi quyền dân chủ cho nhân An Nam"
    ],
    dung: "B"
  },
  {
    id: 250,
    chuong: 3,
    cauHoi: "Hồ Chí Minh đặc biệt quan tâm đến vấn đề độc lập dân tộc ở các nước thuộc địa, vì độc lập, tự do có giá trị như thế nào?",
    dapAn: [
      "Là quyền thiêng liêng, bất khả xâm phạm của tất cả các dân tộc",
      "Là quyền tự quyết dân tộc, bất khả xâm phạm của tất cả các dân tộc",
      "Là quyền bình đẳng dân tộc, bất khả xâm phạm của tất cả các dân tộc",
      "Là quyền liên hiệp dân tộc, bất khả xâm phạm của tất cả các dân tộc"
    ],
    dung: "A"
  },
  {
    id: 251,
    chuong: 3,
    cauHoi: "Hồ Chí Minh đã thể hiện khát vọng lớn lao nào trong quá trình tìm con đường cứu nước, giải phóng dân tộc?",
    dapAn: [
      "Hạnh phúc cho đồng bào, cơm no áo ấm cho nhân dân",
      "Quyền tự quyết cho dân tộc",
      "Tự do cho đồng bào, độc lập cho Tổ quốc",
      "Quyền bình đẳng dân tộc, dân chủ cho nhân dân"
    ],
    dung: "C"
  },
  {
    id: 252,
    chuong: 3,
    cauHoi: "Hồ Chí Minh đã vận dụng sáng tạo con đường cách mạng vô sản ở châu Âu vào điều kiện cách mạng của Việt Nam như thế nào?",
    dapAn: [
      "Đó là người đặt nhiệm vụ giải phóng giai cấp lên trên hết, trước hết",
      "Đó là người đặt nhiệm vụ giành ruộng đất cho người cày lên trên hết",
      "Đó là người đặt nhiệm vụ đánh đổ phong kiến lên trên hết",
      "Đó là Người đặt nhiệm vụ giải phóng dân tộc lên trên hết, trước hết"
    ],
    dung: "D"
  },
  {
    id: 253,
    chuong: 3,
    cauHoi: "Trong các luận điểm sau, luận điểm nào là của Hồ Chí Minh phân tích về cách mạng giải phóng dân tộc?",
    dapAn: [
      "\"Sự đoàn kết giữa lực lượng các nước xã hội chủ nghĩa và sự đoàn kết nhất trí giữa các đảng cộng sản và công nhân tất cả các nước có ý nghĩa quan trọng bậc nhât'33",
      "\"Phàm làm việc gì cũng vậy, bất kỳ lớn bé, khó dễ, nếu không ra sức thì chắc không thành công.... việc giải phóng gông cùm nô lệ cho đồng bào, cho nhân loại\"34",
      "Phải \"cụ thế hóa chủ nghĩa Mác-Lênin cho thích hợp với điều kiện hoàn cảnh từng lúc và từng nơi\"35",
      "\"Muốn được dân yêu, muốn được lòng dân, trước hết phải yêu dân, phải đặt quyền lợi của dân trên hết thảy, phải có một tinh thần chí công vô tư 36"
    ],
    dung: "B"
  },
  {
    id: 254,
    chuong: 3,
    cauHoi: "Cách mạng giải phóng dân tộc cần chủ động, sáng tạo, có khả năng giành thắng lợi trước cách mạng vô sản ở chính quốc được Hồ Chí Minh khẳng định dựa trên cơ sở nào?",
    dapAn: [
      "Thuộc địa là nơi cung cấp nguồn nhựa sống duy nhất cho chủ nghĩa để quốc",
      "Người dân thuộc địa có sức sống mãnh liệt, có thể giành chiến thắng trước bất cứ kẻ thù xâm lược nào",
      "Thuộc địa là nơi duy trì sự tồn tại, phát triển của chủ nghĩa đế quốc; tinh thần đấu tranh quyết liệt của các dân tộc thuộc địa",
      "Quốc tế cộng sản đánh giá cao vai trò của các nước thuộc địa trong cuộc đấu tranh tự giải phóng"
    ],
    dung: "C"
  },
  {
    id: 255,
    chuong: 3,
    cauHoi: "Khi cách mạng tháng Tám (1945) thành công, để bảo vệ nền độc lập thực sự mới giành được, Hồ Chí Minh đã ký với đại diện Chính phủ Pháp Hiệp định sơ bộ ngày 6/3/1946 nhằm khẳng định nội dung gì?",
    dapAn: [
      "Chính phủ Pháp công nhận Việt Nam là một quốc gia độc lập, tự chủ, có Đảng riêng, pháp luật riêng",
      "Chính phủ Pháp công nhận Việt Nam là một quốc gia tự do, có Chính phủ, có quân đội, có tài chính...",
      "Chính phủ Pháp công nhận Việt Nam bình đăng với Pháp trong quan hệ ngoại giao, quan hệ kinh tế, chính trị",
      "Chính phủ Pháp công nhận Việt Nam là cường quốc, có vị trí, vai trò to lớn trong quan hệ quốc tế"
    ],
    dung: "B"
  },
  {
    id: 256,
    chuong: 3,
    cauHoi: "Giành được độc lập, tự do cho dân tộc Hồ Chí Minh tiếp tục khẳng định phương hướng phát triển của dân tộc trong bối cảnh thời đại mới là gì?",
    dapAn: [
      "Quá độ đi lên chủ nghĩa xã hội",
      "Tiến lên thực hiện công nghiệp hóa, hiện đại hóa đất nước",
      "Tiến lên chủ nghĩa cộng sản từ một nước tư bản phát triển cao",
      "Tến liên chủ nghĩa xã hội, chủ nghĩa cộng sản"
    ],
    dung: "D"
  },
  {
    id: 257,
    chuong: 3,
    cauHoi: "Trong bối cảnh hiện nay, chúng ta cần phải làm gì để bảo vệ chủ quyền dân tộc như Hồ Chí Minh mong đợi?",
    dapAn: [
      "Phát triển đất nước một cách hài hòa và bền vững",
      "Tận dụng tối đa sự ủng hộ, giúp đỡ từ bên ngoài",
      "Phát huy sức mạnh của đại đoàn kết dân tộc, của cả hệ thống chính trị, trong đó thế hệ trẻ là lực lượng nòng cốt",
      "Phát huy tối đa sức mạnh của đoàn kết quốc tế, nhất là đoàn kết với các nước có chung mục tiêu tiến lên chủ nghĩa xã hội"
    ],
    dung: "C"
  },
  {
    id: 258,
    chuong: 3,
    cauHoi: "Vấn đề dân tộc trong tư tưởng Hồ Chí Minh là sự kết hợp nhuần nhuyễn vấn đề gì?",
    dapAn: [
      "Đối nội với vấn đề đối ngoại",
      "Độc lập dân tộc với chủ nghĩa xã hội",
      "Lợi ích dân tộc với vẫn đề lợi ích quốc tế",
      "Vấn đề tăng trưởng kinh tế với vấn đề bảo vệ môi trường"
    ],
    dung: "B"
  },
  {
    id: 259,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, chú nghĩa xã hội, chủ nghĩa cộng sản là chế độ xã hội như thế nào?",
    dapAn: [
      "Không còn nghèo khổ, nạn đói, nạn dốt, xã hội do nhân dân làm chủ",
      "Không còn áp bức, bóc lột, xã hội do nhân dân lao động làm chủ",
      "Không còn chiến tranh, hòa bình, phát triển, xã hội do nhân dân làm chủ",
      "Không còn áp bức, bọc lột, có quan hệ hữu nghị với các nước trên thế giới"
    ],
    dung: "B"
  },
  {
    id: 260,
    chuong: 3,
    cauHoi: "Tiến lên chủ nghĩa xã hội, rồi đến chủ nghĩa cộng sản là mục đích của cách mạng Việt Nam, vì vậy, theo Hồ Chí Minh hai giai đoạn này giống nhau ở điểm gì?",
    dapAn: [
      "Sức sản xuất đã phát triển cao; nền tảng kinh tế thì tư liệu sản xuất đều là của chung; không có giai cấp áp bức bóc lột",
      "Sức sản xuất đều phát triển; nền tảng kinh tế phát triển cân đối và hiện đại",
      "Chủ nghĩa xã hội vẫn còn vết tích xã hội cũ; xã hội cộng sản thì hoàn toàn không còn sự áp bức bóc lột",
      "Xã hội chủ nghĩa là công bằng, bình đăng, mọi ngời được sống ẩm no, tự do, hạnh phúc"
    ],
    dung: "A"
  },
  {
    id: 261,
    chuong: 3,
    cauHoi: "Hồ Chí Minh nhận định, tiến lên chủ nghĩa xã hội là một quá trình tất yếu, tuân theo những quy luật khách quan, trước hết là:",
    dapAn: [
      "Những quy luật trong phát triển xã hội",
      "Những quy luật của đời sống xã hội",
      "Những quy luật trong phát triển kinh tế",
      "Những quy luật trong sản xuất vật chất"
    ],
    dung: "D"
  },
  {
    id: 262,
    chuong: 3,
    cauHoi: "Hồ Chí Minh cho rằng: Chỉ có CNXH mới \"chú ý xem xét những lợi ích cá nhân đúng đắn và bảo đảm cho nó được thỏa mãn\"37 và chỉ có trong xã hội chủ nghĩa thì mỗi người dân mới có điều kiện làm gì?",
    dapAn: [
      "Nâng cao chất lượng sống, phát huy các sở trường của riêng mình",
      "Cải thiện đời sống, phát huy tính cách riêng và sở trường riêng của mình",
      "Thực hiện đời sống mới, lốpi sống mới hạnh phúc, ấm no, tự do phát triển theo sở trường của riêng mình",
      "Hoàn thành tốt vai trò của mình trong môi trường xã hội, phát huy năng lực và trách nhiệm của bản thân"
    ],
    dung: "B"
  },
  {
    id: 263,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, CNXH đảm bảo tính công bằng và hợp lý, ai cũng được hưởng thành quả lao động của mình trên nguyên tắc nào?",
    dapAn: [
      "Làm theo năng lực, hưởng theo nhu cầu, không làm thì không hưởng",
      "Làm theo trách nhiệm, năng lực của mỗi bản thân, không ngừng sáng tạo trong công việc",
      "Làm nhiều thì hưởng nhiều, làm ít thì hưởng ít, không làm thì không hưởng",
      "Làm nhiều thì hưởng nhiều, làm ít cũng hưởng nhiều, không làm cũng hưởng"
    ],
    dung: "C"
  },
  {
    id: 264,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, cách mạng giải phóng dân tộc ở các nước cần được tiến hành như thế nào?",
    dapAn: [
      "Chủ động, sáng tạo, có khả năng giành thắng lợi trước cách mạng vô sản ở chính quôc",
      "Thụ động, ỷ lại, không có khả năng giành thắng lợi trước cách mạng vô sản ở chính quốc",
      "Trông chờ vào thắng lợi cách mạng vô sản ở các nước chính quốc sẽ trả lại độc lập cho các nước thuộc địa",
      "Thỏa hiệp, cải lương và mong chờ vào sự thắng lợi của cách mạng vô sản ở chính quốc sẽ giúp cách mạng vô sản ở thuộc địa giành thắng lợi"
    ],
    dung: "A"
  },
  {
    id: 265,
    chuong: 3,
    cauHoi: "Vì sao trong đấu tranh giải phóng dân tộc, Hồ Chí Minh lại chỉ bàn đến vấn đề dân tộc ở các nước thuộc địa?",
    dapAn: [
      "Vì ở các nước thuộc địa đều có quyền tự quyết dân tộc, quyền bình đẳng, tự do và hạnh phúc",
      "Vì ở các nước thuộc địa phong trào đấu tranh giải phóng dân tộc diễn ra mạnh mẽ và từng bước giành được thắng lợi",
      "Vì ở các nước thuộc địa đều bị mất quyền tự quyết dân tộc trên tất cả các lĩnh vực của đời sống",
      "Vì phong trào giải phóng dân tộc ở các nước thuộc địa chịu sự ảnh hưởng, chi phối của phong trào cách mạng vô sản ở chính quốc"
    ],
    dung: "C"
  },
  {
    id: 266,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, vấn đề độc lập dân tộc được hiểu như thế nào trong lịch sử dựng nước và giữ nước của dân tộc?",
    dapAn: [
      "Là quyền tất nhiên, bất biến tất cả các dân tộc",
      "Là quyền thiêng liêng, bất khả xâm phạm của tất cả các dân tộc",
      "Là quyền tiên quyết, bất khả chiến bại của tất cả các dân tộc",
      "Là quyền tự chủ, bất khả xâm lược của tất cả các dân tộc"
    ],
    dung: "B"
  },
  {
    id: 267,
    chuong: 3,
    cauHoi: "Tiếp nối truyền thống của dân tộc, điều mà Hồ Chí Minh mong muốn nhất trên đời đối với dân tộc ta khi ở dưới chế độ thực dân, phong kiến là gì?",
    dapAn: [
      "Mọi người dân được tự do, hạnh phúc",
      "Nhân dân thoát khỏi ách áp bức bóc lột của chủ nghĩa thực dân",
      "Đồng bào được tự do, Tổ quốc được độc lập",
      "Đồng bào ai cũng có cơm ăn áo mặc, được học hành"
    ],
    dung: "C"
  },
  {
    id: 268,
    chuong: 3,
    cauHoi: "Độc lập dân tộc là mục tiêu chiến đấu, là khát vọng của các dân tộc; tuy nhiên, theo Hồ Chí Minh, độc lập dân tộc trước hết phải gắn với điều gì?",
    dapAn: [
      "Hạnh phúc, bình đăng và bảo đảm quyền lợi cho nhân dân",
      "Tự do, hội họp, ngôn luận và đoàn kết dân tộc",
      "Tự do, cơm no, áo ấm và hạnh phúc của nhân dân",
      "Bình đẳng, cơm no, áo ấm và hòa bình cho nhân dân"
    ],
    dung: "C"
  },
  {
    id: 269,
    chuong: 3,
    cauHoi: "Để vận dụng học thuyết về cách mạng vô sản của chủ nghĩa Mác - Lênin vào điều kiện của Việt Nam, Hồ Chí Minh đã khẳng định con đường cách mạng vô sản Việt Nam phải là gì?",
    dapAn: [
      "Giải phóng giai cấp - giải phóng con người - giải phóng xã hội - giải phóng dân tộc",
      "Giải phóng dân tộc - giải phóng xã hội - giải phóng giai cấp - giải phóng con người",
      "Giải phóng xã hội - giải phóng dân tộc - giải phóng giai cấp - giải phóng các tầng lớp lao động giai cấp tư sản",
      "Giải phóng con người - giải phóng giai cấp - giải phóng dân tộc - giải phóng"
    ],
    dung: "B"
  },
  {
    id: 270,
    chuong: 3,
    cauHoi: "Khi có tổ chức Đảng Cộng sản, Hồ Chí Minh đã khẳng định vai trò to lớn của Đảng đối với cách mạng giải phóng dân tộc là gì?",
    dapAn: [
      "Sợi chỉ đỏ, dẫn dắt cách mạng đến thắng lợi cho dân tộc, liên hiệp với các dân tộc khác trên thế giới và vô sản giai cấp ở mọi nơi",
      "Nhân tố thành công của các cuộc cách mạng điển hình của dân tộc, khăng định đoàn kết với các dân tộc khác trên thế giới",
      "Tổ chức, tập hợp dân chúng, liên lạc với các dân tộc bị áp bức và vô sản giai cấp mọi nơi",
      "Lựa chọn con đường, tập hợp dân chúng, lãnh đạo các cuộc cách mạng thắng lợi và đoàn kết với các dân tộc khác"
    ],
    dung: "C"
  },
  {
    id: 271,
    chuong: 3,
    cauHoi: "Chọn câu trở lời đúng theo tư tưởng Hồ Chí Minh về cách mạng giải phóng dân tộc: Lực lượng giải phóng dân tộc bao gồm:",
    dapAn: [
      "Công nhân, nông dân",
      "Nông dân, trí thức và tiểu tư sản dân tộc",
      "Toàn dân tộc, lấy liên minh công - nông làm nền tảng",
      "Các lực lượng tiến bộ"
    ],
    dung: "C"
  },
  {
    id: 272,
    chuong: 3,
    cauHoi: "Khi xác định lực lượng cách mạng là toàn dân, Hồ Chí Minh lưu ý và nhắc không được quên lực lượng nào là gốc của cách mạng?",
    dapAn: [
      "Nông dân, doanh nhân",
      "Công nhân, nông dân",
      "Công nhân, doanh nhân",
      "Công nhân, địa chủ phong kiến"
    ],
    dung: "B"
  },
  {
    id: 273,
    chuong: 3,
    cauHoi: "Mối quan hệ của cuộc cách mạng giải phóng dân tộc ở các nước thuộc địa với các nước chính quốc được Hồ Chí Minh khẳng định là gì?",
    dapAn: [
      "Là mối quan hệ chính - phụ, nghĩa là cuộc cách mạng ở thuộc địa phải phụ thuộc vào cuộc cách mạng ở chính quốc",
      "Là mối quan hệ khắng khít, tác động qua lại lẫn nhau, không lệ thuộc, phụ thuộc vào nhau",
      "Là mối quan hệ không bình đẳng, không lệ thuộc vào nhau mà phải thực hiện lần lượt từng cuộc cách mạng một",
      "Tất cả các đáp án"
    ],
    dung: "B"
  },
  {
    id: 274,
    chuong: 3,
    cauHoi: "Là người nghiên cứu rất kỹ về chủ nghĩa đế quốc và hiểu sâu sắc về cách mạng ở các nước thuộc địa, Hồ Chí Minh đã đưa ra nhận định nào về vấn đề này?",
    dapAn: [
      "Cách mạng ở chính quốc giành thắng lợi trước cách mạng ở thuộc địa",
      "Cách mạng ở thuộc địa phải phụ thuộc vào cách mạng ở các nước chính quốc",
      "Cách mạng ở thuộc địa có thể giành thắng lợi trước cách mạng ở các nước chính quốc",
      "Cách mạng ở chính quốc và ở thuộc địa có mối quan hệ bất bình đẳng"
    ],
    dung: "C"
  },
  {
    id: 275,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, tại sao cuộc cách mạng giải phóng dân tộc ở các nước thuộc địa phải được tiến hành bằng con đường bạo lực cách mạng?",
    dapAn: [
      "Vì sử dụng bạo lực cách mạng để chống lại bạo lực phản cách mạng là giải pháp bắt buộc cuối cùng",
      "Vì sử dụng bạo lực cách mạng để chống lại bạo lực phản cách mạng là giải pháp tình thế",
      "Vì sử dụng bạo lực cách mạng để chống lại bạo lực phản cách mạng là giải pháp hiệu quả",
      "Vì sử dụng bạo lực cách mạng để chống lại bạo lực phản cách mạng là giải pháp mang tính tạm thời"
    ],
    dung: "A"
  },
  {
    id: 276,
    chuong: 3,
    cauHoi: "Bạo lực cách mạng trong cách mạng giải phóng dân tộc, theo Hồ Chí Minh có những hình thức nào?",
    dapAn: [
      "Đấu tranh ngoại giao và đấu tranh chính trị",
      "Đấu tranh chính trị và đấu tranh vũ trang",
      "Đấu tranh vũ trang và đấu tranh tư tưởng văn hóa",
      "Đấu tranh quân sự và đấu tranh kinh tế"
    ],
    dung: "B"
  },
  {
    id: 277,
    chuong: 3,
    cauHoi: "Khi so sánh các chế độ đã tồn tại trong lịch sử để thấy sự khác nhau về bản chất giữa chủ nghĩa xã hội với chế độ khác, Hồ Chí Minh đã khẳng định điều gì?",
    dapAn: [
      "Chế độ xã hội chủ nghĩa, cộng sản chủ nghĩa hướng đến một thế giới hòà bình, không có chiến tranh",
      "Chế độ xã hội chủ nghĩa, cộng sản chủ nghĩa có nền kinh tế phát triển cao hơn hàng triệu lần kinh tế tư bản chủ nghĩa",
      "Chế độ xã hội chủ nghĩa, cộng sản chủ nghĩa là chế độ do nhân dân lao động làm chủ",
      "Chế độ xã hội chủ nghĩa, cộng sản chủ nghĩa trình độ dân trí của người dân cao hơn rất nhiều các chế độ chính trị khác"
    ],
    dung: "C"
  },
  {
    id: 278,
    chuong: 3,
    cauHoi: "Xây dựng chủ nghĩa xã hội là sự nghiệp cách mạng toàn diện, Hồ Chí Minh xác định rõ trong mục tiêu về chế độ chính trị là gì?",
    dapAn: [
      "Dân làm chủ và dân là chủ",
      "Ôn định chính trị và phát huy quyền làm chủ của người dân",
      "Phát huy vai trò làm chủ của giai cấp công nhân, nông dân",
      "Đấu tranh giải phóng dận tộc, đem lại tự do cho người dân"
    ],
    dung: "A"
  },
  {
    id: 279,
    chuong: 3,
    cauHoi: "Nét độc đáo trong tư duy của Hồ Chí Minh là bên cạnh việc chỉ ra các nguồn động lực phát triển của chủ nghĩa xã hội, Người còn lưu ý, cảnh báo điều gì?",
    dapAn: [
      "Ngăn ngừa âm mưu diễn biến hòa bình, bạo loạn lật đố của các thế lực thù địch",
      "Ngăn ngừa các yếu tố kìm hãm, triệt tiêu nguồn lực vốn có của chủ nghĩa xã hội",
      "Ngăn ngừa suy thoái về đạo đức, lối sống, tự diễn biến, tự chuyển hóa trong cán bộ, đảng viên",
      "Ngăn ngừa tham nhũng, lãng phí, quan liêu; bè phái, mất đoàn kết, chạy chức, chạy quyền"
    ],
    dung: "B"
  },
  {
    id: 280,
    chuong: 3,
    cauHoi: "Do đặc điểm và tính chất quy định, quá độ lên chủ nghĩa xã hội là một quá trình khó khăn, phức tạp hơn cả việc đánh giặc38, Hồ Chí Minh đã xác định phương châm thực hiện bước đi như thế nào?",
    dapAn: [
      "Phát triển nhanh về kinh tế, văn hóa để nâng cao đời sống vật chất và tinh thần của nhân dân",
      "Tiến nhanh, tiến mạnh, từ thấp đến cao, phải luôn dựa vào điều kiện khách quan thế giới để đề ra mục tiêu xây dựng chủ nghĩa xã hội",
      "Dần dần, thận trọng từng bước một, từ thấp đến cao, không chủ quan nôn nóng và phải luôn căn cứ vào điều kiện khách quan quy định",
      "Tiến nhanh, tiến mạnh, tiến vững chắc lên chủ nghĩa xã hội"
    ],
    dung: "C"
  },
  {
    id: 281,
    chuong: 3,
    cauHoi: "Thực hiện khát vọng Hồ Chí Minh xây dựng nước Việt Nam hùng cường, sánh vai với cường quốc năm châu, Đại hội XIII (2021) của Đảng xác định khát vọng Việt Nam đến năm 2045 như thế nào?",
    dapAn: [
      "Là nước đang phát triên, có công nghiệp theo hướng hiện đại, vượt qua mức thu nhập trung bình thấp",
      "Là nước đang phát triển, có công nghiệp hiện đại, thu nhập trung bình cao",
      "Trở thành nước phát triển, có thu nhập cao",
      "Cơ bản trở thành nước công nghiệp theo hướng hiện đại, có thu nhập cao"
    ],
    dung: "C"
  },
  {
    id: 282,
    chuong: 3,
    cauHoi: "Trong quan niệm của Hồ Chí Minh, chủ nghĩa xã hội được tiếp cận ở các góc độ như thế nào?",
    dapAn: [
      "Ở nhiều góc độ khác nhau bằng cách chỉ ra nhân tố đặc trưng trên các lĩnh vực chính trị",
      "Ở nhiều góc độ khác nhau bằng cách chỉ ra đặc trưng trên các lĩnh vực kinh tế, chính trị, văn hóa, khoa học kỹ thuật...",
      "Ở nhiều góc độc khác nhau bằng cách chỉ ra đặc trưng trên lĩnh vực kinh tế",
      "Ở nhiều góc độc khác nhau bằng cách chỉ ra đặc trưng trên lĩnh vực văn hóa, xã hội"
    ],
    dung: "B"
  },
  {
    id: 283,
    chuong: 3,
    cauHoi: "Hồ Chí Minh khẳng định: \"Nói một cách tóm tắt, mộc mạc, chủ nghĩa xã hội trước hết nhằm (...), được ẩm no và sống một đời hạnh phúc\", là làm sao cho dân giàu, nước mạnh\". Xác định nội dung còn thiếu?",
    dapAn: [
      "Làm cho nhân dân lao động thoát nạn bần cùng, làm cho mọi người có công ăn việc làm",
      "Làm cho mọi người có cuộc sống hạnh phúc, vui tươi",
      "Làm cho nhân dân lao động không còn áp bức bóc lột, cuộc sống hạnh phúc",
      "Làm cho các giai tầng trong xã hội thoát khỏi nạn bần cồng, đời sống vui tươi, hạnh phúc"
    ],
    dung: "A"
  },
  {
    id: 284,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, trong chế độ xã hội chủ nghĩa nhân dân làm chủ, lợi ích cá nhân gắn liền với lợi ích của chế độ, do đó chủ thể xây dựng chủ nghĩa xã hội là:",
    dapAn: [
      "Công nhân, là lực lượng tiên quyết trong xây dựng và phát triển xã hội",
      "Nông dân, là lực lượng tiên phong, đi đầu trong cách mạng xã hội chủ nghĩa",
      "Các tầng lớp, là lực lượng tiên quyết đối với việc xây dựng và phát triển xã hội",
      "Nhân dân, là lực lượng quyết định tốc độ xây dựng và phát triển xã hội"
    ],
    dung: "D"
  },
  {
    id: 285,
    chuong: 3,
    cauHoi: "Trong các luận điểm sau, luận điểm nào Hồ Chí Minh nói về mục tiêu kinh tế gắn bó mật thiết với mục tiêu về chính trị?",
    dapAn: [
      "Nền kinh tế phát triển cao \"với công nghiệp và nông nghiệp hiện đại, khoa học kỹ thuật tiên tiến*40",
      "\"Một nền kinh tế thuần nhất, dựa trên chế độ sở hữu toàn dân và sở hữu tập thể\"41",
      "\"Chế độ kinh tế và xã hội của chúng ta nhằm thực hiện đầy đủ quyền dân chủ của nhân dân, trên cơ sở kinh tế xã hội chủ nghĩa ngày càng phát triển\"42",
      "Chỉ có chủ nghĩa xã hội mới là nguồn gốc của tự đo, bình đẳng, bác ái, xóa bò những bức tường dài ngăn cản con người yêu đoàn kết, yêu thương nhau43"
    ],
    dung: "C"
  },
  {
    id: 286,
    chuong: 3,
    cauHoi: "Hồ Chí Minh từng nói: \"Muốn tiến lên chủ nghĩa xã hội phải phát triển (...) và văn hóa. Vì sao không nói phát triển (...) và kinh tế. Tục ngữ ta có câu: có thực mới vực được đạo, vì thế kinh tế phải đi trước\"44. Xác định cụm từ còn thiếu?",
    dapAn: [
      "Chính trị/ quân sự",
      "Văn hóa/ khoa học",
      "Kinh tế/ văn hóa",
      "Ngoại giao/ văn hóa"
    ],
    dung: "C"
  },
  {
    id: 287,
    chuong: 3,
    cauHoi: "Luận điểm của Hồ Chí Minh: \"Để phục vụ sự nghiệp cách mạng xã hội chủ nghĩa thì văn hóa... phải triệt để tẩy trừ (...) và ảnh hưởng nô dịch của văn hóa để quốC. Đồng thời, phát triển (...) và hấp thụ những cái mới của văn hóa tiến bộ thế giới\"45. Xác định cụm từ còn thiếu?",
    dapAn: [
      "Mọi phong tục lạc hậu/ những truyền thống tốt đẹp của văn hóa dân tộc",
      "Mọi di tích thuộc địa/ những truyền thống tốt đẹp của văn hóa dân tộc",
      "Mọi tàn tích của chiến tranh/ những truyền thống tốt đẹp của văn hóa dân tộc",
      "Mọi định kiến của xã hội/ những truyền thống tốt đẹp của văn hóa dân tộc"
    ],
    dung: "B"
  },
  {
    id: 288,
    chuong: 3,
    cauHoi: "Mục tiêu về các mối quan hệ xã hội trong chế độ xã hội chủ nghĩa, theo Hồ Chí Minh phải đảm bảo điều gì?",
    dapAn: [
      "Dân chủ, bình đắng, lợi ích",
      "Dân chủ, công bằng, văn minh",
      "Văn minh, tiên tiến, hiện đại",
      "Dân chủ, bình đẳng, nhu cầu, nguyện vọng"
    ],
    dung: "B"
  },
  {
    id: 289,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, tất cả các động lực đều rất quan trọng và có mối quan hệ biện chứng với nhau nhưng giữ vai trò quyết định nhất là:",
    dapAn: [
      "Là ngoại lực của dân tộc, là nhân dân lao động",
      "Là vật chất và tinh thần, là giai cấp công nhân",
      "Là nội lực của dân tộc, là nhân dân",
      "Là mổi quan hệ đổi nội và đối ngoại của dân tộc, là lực lao động"
    ],
    dung: "C"
  },
  {
    id: 290,
    chuong: 3,
    cauHoi: "Để thúc thẩy quá trình xây dựng CNXH, theo Hồ Chí Minh những động lực hàng đầu phải đảm bảo là gì?",
    dapAn: [
      "Quyền lợi và nghĩa vụ của dân, đoàn kết toàn dân",
      "Lợi ích của dân, dân chủ của dân, sức mạnh đoàn kết toàn dân",
      "Nguồn thu nhập của dân, dân chủ của dân và đoàn kết các giai tầng trong xã",
      "Quyền lực và quyền lợi của dân, thực hành dân chủ của dân và đoàn kết nhân hội dân"
    ],
    dung: "B"
  },
  {
    id: 291,
    chuong: 3,
    cauHoi: "Hồ Chí Minh luôn quan tâm đến lợi ích của cộng đồng và lợi ích của những con người cụ thể trong xây dựng chủ nghĩa xã hội. Do đó, Người dạy; \"việc gì (...)cho dân phải hết sức làm, việc gì (...) cho dân phải hết sức tránh\", \"phải đặt (...) của dân lên trên hết 46. Xác định cụm từ còn thiếu?",
    dapAn: [
      "Có ích/ có hại/ quyền lợi",
      "Có lợi/ có hại/quyền lợi",
      "Có niềm vui/ có nỗi buồn/ quyền lợi",
      "Có hạnh phúc/ có niềm vui/ quyền lợi"
    ],
    dung: "B"
  },
  {
    id: 292,
    chuong: 3,
    cauHoi: "Dân chủ trong chủ nghĩa xã hội là dân chủ của nhân dân, là của quý báu nhất của nhân dân*. Vậy, theo Hồ Chí Minh có dân chủ thì mới đảm bảo điều gì?",
    dapAn: [
      "Lợi ích vì dân",
      "Lợi ích vì tập thể",
      "Lợi ích vì nông dân",
      "Lợi ích vì từng cá nhân"
    ],
    dung: "A"
  },
  {
    id: 293,
    chuong: 3,
    cauHoi: "Chọn phương án trả lời đúng nhất với tư tưởng Hồ Chí Minh: Muốn xây dựng chủ nghĩa xã hội, trước hết cần có:",
    dapAn: [
      "Con người có đạo đức",
      "Con người xã hội chủ nghĩa",
      "Con người có tài năng",
      "Con người có tính sáng tạo, dám nghĩ, dám làm"
    ],
    dung: "B"
  },
  {
    id: 294,
    chuong: 3,
    cauHoi: "Cùng với việc xác định và định hướng phát huy sức mạnh của những động lực xây dựng CNXH, Hồ Chí Minh luôn nhắc nhở phải ngăn chặn điều gì?",
    dapAn: [
      "Những tư tưởng, tác phong xấu là: Bài xích cá nhân; hủ hóa, tư túng, kiêu ngạo cộng san",
      "Những tư tưởng, tác phong xấu là: Chủ nghĩa vị kỷ, nuôi dưỡng tính hám lợi, hiếu danh, ích kỷ, hẹp hòi; hành vi vụ lợi",
      "Những tư tưởng, tác phong xấu là: Không quan tâm đến lợi ích chung của tập thể; dễ sa ngã vào chủ nghĩa cá nhân",
      "Những tư tưởng, tác phong xấu là: Chủ nghĩa cá nhân; quan liêu, mệnh lệnh; tham ô, lãng phí; bảo thủ.."
    ],
    dung: "D"
  },
  {
    id: 295,
    chuong: 3,
    cauHoi: "Theo Hồ Chí Minh, tính chất của thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam là gì?",
    dapAn: [
      "Là thời kỳ có nhiều biến động sâu sắc nhưng vượt qua một cách lâu dài, khó khăn, phúc tạp",
      "Là thời kỳ có nhiều thách thức nhất nhưng thay đổi triệt để những nếp sống, thói quen cũ",
      "Là thời kỳ cải biến sâu sắc nhất nhưng phức tạp, lâu dài, khó khăn, gian khổ",
      "Là thời kỳ xóa bỏ giai cấp bóc lột nhưng khó khăn, phức tạp phải vượt lên trước"
    ],
    dung: "C"
  },
  {
    id: 296,
    chuong: 3,
    cauHoi: "Kiên định mục tiêu và con đường cách mạng mà Hồ Chí Minh đã lựa chọn, Đảng Cộng cộng sản Việt Nam đã rút ra những bài học đầu tiên là gì?",
    dapAn: [
      "Nêu rõ phương châm dương cao ngọn cờ hòa bình trong công lý",
      "Nắm vững ngọn cờ độc lập dân tộc và chủ nghĩa xã hội",
      "Làm cho mọi người dân hạnh phúc",
      "Xây dựng một nước Việt Nam hòa bình, thống nhất, độc lập, giàu mạnh"
    ],
    dung: "B"
  },
  {
    id: 297,
    chuong: 3,
    cauHoi: "Để vận dụng tư tưởng Hồ Chí Minh vào phát huy sức mạnh dân chủ xã hội chủ nghĩa là phát huy sức mạnh bản chất ưu việt của chế độ xã hội xã hội chủ nghĩa trong bối cảnh hiện nay theo phương châm nào?",
    dapAn: [
      "Dân biết, dân bàn, dân làm, dân tham mưu",
      "Đoàn kết, dân chủ, kỷ cương, sáng tạo, phát triển",
      "Dân biết, dân bàn, dân làm, dân kiêm tra, dân giám sát, dân hưởng thụ",
      "Dân giám sát, dân thụ hưởng, dân phản biện"
    ],
    dung: "C"
  },
  {
    id: 298,
    chuong: 3,
    cauHoi: "Củng cố, kiện toàn, phát huy sức mạnh và hiệu quả hoạt động của toàn bộ hệ thống chính trị theo tư tưởng Hồ Chí Minh cần phải như thế nào?",
    dapAn: [
      "Nhất nguyên về chính trị, về tổ chức, về tư tưởng và thốngnhất dưới sự lãnh đạo của Nhà nước, thống nhất về mục tiêu kinh tế",
      "Nhất nguyên về chính trị, về tổ chức, về tự tưởng và thống nhất dưới sự lãnh đạo của Đảng Cộng sản Việt Nam, thống nhất về mục tiêu chính trị",
      "Nhất nguyên về chính trị, về tổ chức, về tư tưởng và thốngnhất dưới sự lãnh đạo của Mặt trận tổ quốc, thống nhất về mục tiêu xã hội",
      "Tất cả các đáp án"
    ],
    dung: "B"
  },
  {
    id: 299,
    chuong: 3,
    cauHoi: "Vận dụng tư tưởng Hồ Chí Minh về độc lập dân dân tộc và chủ nghĩa xã hội trong giai hiện nay cần phải thực hiện những vấn đề gì?",
    dapAn: [
      "Có hiệu quả những chính sách của Đảng, trong đó các chính sách về công tác xây dựng bộ máy chính quyền giữ vị trí quan trọng...",
      "Có hiệu quả những điều lệ của Đảng, trong đó các điều lệ về những điều đảng viên không được làm có vai trò quan trọng đối với đội ngũ cán bộ đảng viên",
      "Có hiệu quả những chỉ thị của Đảng, trong đó các chỉ thị về cây dựng đảng vai trò quan trọng ...•",
      "Có hiệu quả những nghị quyết của Đảng, trong đó các nghị quyết về xây dựng Đảng giữ vị trí cực kỳ quan trọng vì xây dựng Đảng là nhiệm vụ then chốt trong sự nghiệp đổi mới"
    ],
    dung: "D"
  }
];

fs.writeFileSync('src/data/chapter3.json', JSON.stringify(ch3, null, 2));
console.log('Chapter 3 written:', ch3.length, 'questions');
