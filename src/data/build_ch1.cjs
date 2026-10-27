const fs = require('fs');

const ch1 = [
  {
    id: 1,
    chuong: 1,
    cauHoi: "Tại Đại hội II của Đảng (2.1951), xác định yếu tố tiên quyết nào làm cho Đảng mạnh và làm cho cách mạng mau đi đến thắng lợi hoàn toàn?",
    dapAn: [
      "Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh",
      "Học tập và làm theo tư tưởng, đạo đức Hồ Chí Minh",
      "Học tập đường lối chính trị, tác phong và đạo đức cách mạng của Hồ Chủ tịch",
      "Học tập đường lối chính trị, đạo đức, phong cách Hồ Chí Minh"
    ],
    dung: "C"
  },
  {
    id: 2,
    chuong: 1,
    cauHoi: "Khi nghiên cứu môn học Tư tưởng Hồ Chí Minh cần phải dựa trên một số nguyên tắc phương pháp luận nào?",
    dapAn: [
      "Thống nhất tính đảng và tính khoa học",
      "Thống nhất lý luận và thực tiễn; quan điểm lịch sử - cụ thể",
      "Quan điểm toàn diện và hệ thống; kế thừa và phát triển",
      "Tất cả các đáp án"
    ],
    dung: "D"
  },
  {
    id: 3,
    chuong: 1,
    cauHoi: "Trong Điếu văn của Ban Chấp hành Trung ương Đảng nhấn mạnh: \"Dân tộc ta, nhân dân ta, non sông đất nước ta đã sinh ra Hồ Chủ tịch, (...) và chính Người đã làm rạng rỡ dân tộc ta, nhân dân ta, non sông đất nước ta\"'. Xác định cụm từ còn thiếu?",
    dapAn: [
      "Người lãnh đạo sự nghiệp giải phóng dân tộc",
      "Người con ưu tú của dân tộc",
      "Người sáng lập Đảng Cộng sản Việt Nam",
      "Người anh hùng dân tộc vĩ đại"
    ],
    dung: "D"
  },
  {
    id: 4,
    chuong: 1,
    cauHoi: "Đại hội VII của Đáng (1991) đã khẳng định lấy chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh làm gì?",
    dapAn: [
      "Nền tảng chính trị, kim chỉ nam cho hành động",
      "Nền lý luận, kim chỉ nam cho hành động",
      "Nền tảng tư tưởng, kim chỉ nam cho hành động",
      "Nền tảng tinh thần, kim chỉ nam cho hành động"
    ],
    dung: "C"
  },
  {
    id: 5,
    chuong: 1,
    cauHoi: "Tư tưởng Hồ Chí Minh đã dẫn dắt chúng ta đi trên mỗi chặng đường xây dựng và phát triển đát nước, là ngọn cờ thắng lợi của cách mạng Việt Nam, là sức mạnh tập hợp và đoàn kết toàn dân tộc trong sự nghiệp cách mạng của chúng ta hôm nay và mai sau. Đảng ta đã khẳng định nội dung này trong kỳ Đại hội nào sau đây?",
    dapAn: [
      "Đại hộc Đại biểu toàn quốc lần thứ VIII (1996)",
      "Đại hộc Đại biểu toàn quốc lần thứ IX (2001)",
      "Đại hộc Đại biểu toàn quốc lần thứ X (2006)",
      "Đại hộc Đại biểu toàn quốc lần thứ XI (2011)"
    ],
    dung: "C"
  },
  {
    id: 6,
    chuong: 1,
    cauHoi: "Sinh viên có thể vận dụng vào xây dựng, rèn luyện phương pháp và phong cách công tác như thế nào sau khi nghiên cứu môn học Tư tưởng Hồ Chí Minh?",
    dapAn: [
      "Xây dựng phương pháp học tập, tu dưỡng, rèn luyện phù hợp với điều kiện cụ thể của từng người, từng địa bàn",
      "Xây dựng phong cách tư duy, diễn đạt, làm việc, v.v...",
      "Xây dựng phong cách ứng xử, sinh hoạt, v.v... phù hợp với từng lúc, từng nơi theo phương châm mà Hồ Chí Minh đã nêu: Dĩ Bất biết ứng vạn biến",
      "Tất cả các đáp án"
    ],
    dung: "D"
  },
  {
    id: 7,
    chuong: 1,
    cauHoi: "Đối tượng nghiên cứu của môn học Tư tưởng Hồ Chí Minh là toàn bộ quan điểm Hồ Chí Minh được thể hiện ở đâu?",
    dapAn: [
      "Trong sự nghiệp của Hồ Chí Minh",
      "Trong cuộc đời của Hồ Chí Minh",
      "Trong di sản của Hồ Chí Minh",
      "Trong quá quá trình lãnh đạo cách mạng Việt Nam của Hồ Chí Minh"
    ],
    dung: "C"
  },
  {
    id: 8,
    chuong: 1,
    cauHoi: "Hệ thống quan điểm toàn diện và sâu sắc của Hồ Chí Minh về những vấn đề cơ bản của cách mạng Việt Nam được phản ánh ở đâu?",
    dapAn: [
      "Trong những bài nói, bài viết; hoạt động cách mạng của Người trong quá trình về nước trực tiếp lãnh đạo cách mạng",
      "Trong những bài nói, bài viết; hoạt động cách mạng của Người trong quá trình tìm đường cứu nước",
      "Trong những bài nói, bài viết; hoạt động cách mạng và đời sống hàng ngày của Người",
      "Trong những bài nói, bài viết; hoạt động cách mạng của Người trong cách mạng giải phóng dân tộc"
    ],
    dung: "C"
  },
  {
    id: 9,
    chuong: 1,
    cauHoi: "Đối tượng nghiên cứu tư tưởng Hồ Chí Minh được vận động như thế nào trong thực tiễn?",
    dapAn: [
      "Là quá trình \"hiện thực hóa\" hệ thống quan điểm của Hồ Chí Minh trong quá trình phát triển của dân tộc Việt Nam",
      "Là toàn bộ những luận điểm của Hồ Chí Minh và quá trình hệ thống hóa luận điểm trong đấu tranh cách mạng Việt Nam",
      "Là toàn bộ những quan niệm của Hồ Chí Minh và quá trình hệ thống hóa quan niệm trong giải phóng dân tộc Việt Nam",
      "Là toàn bộ những luận cứ của Hồ Chí Minh và quá trình hệ thống hóa luận cứ trong xây dựng chủ nghĩa xã hội Việt Nam"
    ],
    dung: "A"
  },
  {
    id: 10,
    chuong: 1,
    cauHoi: "Ban Chấp hành Trung ương Đảng Cộng sản Việt Nam đã tôn vinh Hồ Chí Minh danh hiệu gì?",
    dapAn: [
      "Nhà văn hóa kiệt xuất Việt Nam",
      "Anh hùng dân tộc vĩ đại",
      "Anh hùng giải phóng dân tộc, Nhà văn hóa kiệt xuất Việt Nam",
      "Danh nhân văn hóa thế giới"
    ],
    dung: "B"
  },
  {
    id: 11,
    chuong: 1,
    cauHoi: "Khóa họp Đại hội đồng UNESCO lần thứ 24 ở Pari đã đưa ra Nghị quyết số bao nhiêu về kỷ niệm 100 năm Ngày sinh của Chủ tịch Hồ Chí Minh?",
    dapAn: [
      "Số 23C/18.6.5",
      "Số 24C/18.6.5",
      "Số 25C/18.6.5",
      "Số 26C/18.6.5"
    ],
    dung: "B"
  },
  {
    id: 12,
    chuong: 1,
    cauHoi: "Hồ Chí Minh luôn coi trọng lý luận và thực tiễn có sự thống nhất với nhau, do đó, Người đã so sánh có kinh nghiệm mà không có lý luận thì sẽ như thế nào?",
    dapAn: [
      "Như một mắt sáng, một mắt mờ",
      "Như một chân cao, một chân thấp",
      "Như người không có trí khôn",
      "Như tàu không có bàn chỉ nam"
    ],
    dung: "A"
  },
  {
    id: 13,
    chuong: 1,
    cauHoi: "Hồ Chí Minh chỉ rõ con người sẽ mắc phải căn bệnh \"lý luận suông\" nếu không áp dụng vào thực tê. ,... phai ra sức thực hành mới thành người biêt lý luận. Vì vậy, Người đã ví lý luận và thực hành với cái gì?",
    dapAn: [
      "Lý luận như cái bàn chỉ nam, thực hành như mục đích hướng đến",
      "Lý luận như cái kim chỉ nam, thực hành như mục tiêu hướng đến",
      "Lý luận như cái tên (hoặc viên đạn), thực hành như cái đích để bắn",
      "Lý luận như cái riêng (hoặc cái cá biệt), thực hành như cái chung"
    ],
    dung: "C"
  },
  {
    id: 14,
    chuong: 1,
    cauHoi: "Một yêu cầu về mặt lý luận khi nghiên cứu tư tưởng Hồ Chí Minh trên bình diện tổng thể hay từng bộ phận phải luôn luôn quán triệt điều gì?",
    dapAn: [
      "Mối liên hệ qua lại giữa các yếu tố, các bộ phận khác nhau trong sự khác biệt của hệ thống tư tưởng Hồ Chí Minh",
      "Mối liên hệ qua lại giữa các yếu tố, các bộ phận khác nhau trong sự gắn kết tất yếu của hệ thống tư tưởng Hồ Chí Minh xung quanh hạt nhân cốt lõi là tư tưởng độc lập dân tộc và chủ nghĩa xã hội",
      "Mối liên hệ qua lại giữa các yếu tố, các bộ phận khác nhau trong phân tầng giữa các yếu tố cấu thành hệ thống tư ưởng Hồ Chí Minh",
      "Tất cả các đáp án"
    ],
    dung: "B"
  },
  {
    id: 15,
    chuong: 1,
    cauHoi: "Đại hội XII (2016) của Đảng nhấn mạnh phải kiên định chủ nghĩa Mác - Lênin, tư tưởng Hồ Chí Minh và yêu cầu cần phải:",
    dapAn: [
      "Vận dụng sáng tạo và phát triển phù hợp với thực tiễn cách mạng Việt Nam",
      "Vận dụng và phát triển phù hợp với thực tiễn cách mạng thế giới",
      "Vận dụng sáng tạo và bố sung phù hợp với thực tiễn cách mạng Việt Nam",
      "Vận dụng và bổ sung phù hợp với thực tiễn cách mạng thế giới"
    ],
    dung: "A"
  },
  {
    id: 16,
    chuong: 1,
    cauHoi: "Nghiên cứu tư tưởng Hồ Chí Minh, trước hết phải dựa vào các tác phẩm của Người để lại. Những tác phẩm nào sau đây là của Hồ Chí Minh?",
    dapAn: [
      "Điện Biên Phủ-điểm hẹn lịch sử (1944)",
      "Người đi tìm hình của Nước (1960)",
      "Nâng cao đạo đức cách mạng, quyét sạch chủ nghĩa cá nhân (1969)",
      "Đất nước (1948)"
    ],
    dung: "C"
  },
  {
    id: 17,
    chuong: 1,
    cauHoi: "Vì sao phải đảm bảo tính đảng và tính khoa học trong nghiên cứu môn học Tư tưởng Hồ Chí Minh?",
    dapAn: [
      "Vì phải đứng trên lập trường giai cấp nông dân, quan điểm của chủ nghĩa Mác- Lênin, đường lối, quan điểm của Đảng đề nhận thức phân tích, đồng thời đảm bảo tính khách quan khoa học cho các luận đề nêu ra",
      "Vì phải đứng trên lập trường giai cấp công nhân, quan điểm chủ nghĩa Mác - Lênin, quán triệt cương lĩnh, đường lối, quan điểm của Đảng để nhận thức và phân tích..., đồng thời đảm bảo tính khách quan, khoa học của các luận đề nêu ra",
      "Vì phải đứng trên lập trường giai cấp tư sản, quan điểm của chủ nghĩa Mác- Lênin, đường lối, quan điểm của Đảng để nhận thức phân tích, đồng thời đảm bảo tính khách quan khoa học cho các luận đề nêu ra",
      "Tất cả các đáp án"
    ],
    dung: "B"
  },
  {
    id: 18,
    chuong: 1,
    cauHoi: "Ý nghĩa của việc học tập môn Tư tưởng Hồ Chí Minh góp phần nâng cao năng lực tư duy lý luận của sinh viên thể hiện ở nội dung nào sau đây?",
    dapAn: [
      "Củng cố lập trường, quan điểm cách mạng; kiên định mục tiêu độc lập dân tộc và chủ nghĩa xã hội",
      "Để thực hành đạo đức cách mạng, chống chủ nghĩa cá nhân",
      "Sống có ích cho xã hội, yêu và làm những điều thiện, ghét và tránh cái ác, cái",
      "Nâng cao lòng tự hào về đất nước Việt Nam, về chế độ chính trị xã hội chủ xấu nghĩa"
    ],
    dung: "A"
  },
  {
    id: 19,
    chuong: 1,
    cauHoi: "Qua nghiên cứu môn học Tư tưởng Hồ Chí Minh, sinh viên có điều kiện tốt để thực hành điều gì?",
    dapAn: [
      "Kiên đinh mục tiêu độc lập dân tộc và chủ nghĩa xã hội",
      "Bảo vệ sự trong sáng của chủ nghĩa Mác - Lênin, tư tưởng Hồ Chí Minh",
      "Đạo đức cách mạng, nâng cao lòng tự hào dân tộc, nguyện \"sống, chiến đấu, lao động, học tập theo gương Bác Hồ vĩ đại\"",
      "Vận dựng tư tưởng Hồ Chí Minh vào giải quyết những vấn đề của thực tiễn đặt ra"
    ],
    dung: "C"
  },
  {
    id: 20,
    chuong: 1,
    cauHoi: "Đảng Cộng sản Việt Nam xác định tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện, sâu sắc về vấn đề gì?",
    dapAn: [
      "Cơ bản của cách mạng Việt Nam",
      "Kinh tế của cách mạnh Việt Nam",
      "Văn hóa của cách mạnh Việt Nam",
      "Chính trị của cách mạnh Việt Nam"
    ],
    dung: "A"
  },
  {
    id: 21,
    chuong: 1,
    cauHoi: "Trên cơ sở thống nhất nguyên tắc tính đảng và tính khoa học, giúp người nghiên cứu hiểu như thế nào về tư tưởng Hồ Chí Minh?",
    dapAn: [
      "Hiểu cách thức nghiên cứu tư tưởng Hồ Chí Minh",
      "Hiểu quá trình hình thành tư tưởng Hồ Chí Minh",
      "Hiểu rõ và hiểu sâu sắc tư tưởng Hồ Chí Minh",
      "Hiêu tính định hướng chính trị tư tưởng Hồ Chí Minh"
    ],
    dung: "C"
  },
  {
    id: 22,
    chuong: 1,
    cauHoi: "Nắm vững quan diểm lịch sử - cụ thể trong nghiên cứu tư tưởng Hồ Chí Minh, giúp người nghiên cứu nhận thức được điều gì?",
    dapAn: [
      "Bản chất tư tưởng Hồ Chí Minh mang đậm dấu ấn của quá trình phát triển lịch sử, quá trình phát triển sáng tạo, đổi mới",
      "Bản chất tư tưởng Hồ Chí Minh mang đậm dấu ấn của mối quan hệ biện chứng của các lĩnh vực đời sống xã hội .",
      "Bản chất tư tưởng Hồ Chí Minh mang đậm dấu ấn của giá trị truyền thống dân tộc trong tiến trình phát triển của lịch sử",
      "Bản chất tư tưởng Hồ Chí Minh mang đậm dấu ấn của ảnh hưởng văn hóa Đông - Tây"
    ],
    dung: "A"
  },
  {
    id: 23,
    chuong: 1,
    cauHoi: "Quan điểm kế thừa và phát triển khi nghiên cứu, học tập tư tướng Hồ Chí Minh đòi hỏi không chỉ biết kế thừa, vận dụng mà còn phải biết:",
    dapAn: [
      "Quán triệt tư tưởng của Người trong các giai đoạn phát triển của cách mạng Việt Nam",
      "Nhận thức đúng giá trị tư tưởng của Người phù hợp với xu hướng phát triển của thế giới trong giai đoạn hiện nay",
      "Nhận thức rõ bản chất tư tưởng của Người mang đậm dấu ấn trong quá trình phát triển lịch sử",
      "Phát triển sáng tạo tư tưởng của Người trong điều kiện lịch sử mới, trong bối cảnh cụ thể của đất nước và quốc tế"
    ],
    dung: "D"
  },
  {
    id: 24,
    chuong: 1,
    cauHoi: "Có nhiều nội dung phản ánh tư tưởng Hồ Chí Minh không ở trong văn bản mà là trong chỉ đạo thực tiễn. Thực tiễn được nhắc đến là thực tiễn nào sau đây?",
    dapAn: [
      "Thực tiễn của chính bản thân Hồ Chí Minh và thực tiễn hoạt động của các đồng chí, học trò của Người",
      "Thực tiễn của chính bản thân Hồ Chí Minh và thực tiễn của phong trào cách mạng vô sản",
      "Thực tiễn của chính bản thân Hồ Chí Minh và thực tiễn cách mạng giải phóng dân tộc trên thế giới",
      "Thực tiễn của chính bản thân Hồ Chí Minh và thực tiễn phong trào đấu tranh vì hòa bình, dân chủ, tiến bộ trên thế giới"
    ],
    dung: "A"
  },
  {
    id: 25,
    chuong: 1,
    cauHoi: "Trong nghiên cứu tư tưởng Hồ Chí Minh, phương pháp chuyên ngành, liên ngành cần được sử dụng như thế nào?",
    dapAn: [
      "Để nghiên cứu riêng tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội ở Việt Nam",
      "Để nghiên cứu riêng tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam và nhà nước của nhân dân, do nhân dân, vì nhân dân",
      "Để nghiên cứu toàn bộ hệ thống tư tưởng Hồ Chí Minh cũng như mỗi tác phâm lý luận riêng biệt của Người",
      "Để nghiên cứu riêng tư tưởng Hồ Chí Minh về đại đoàn kết dân tộc và đoàn kết quốc tế"
    ],
    dung: "C"
  },
  {
    id: 26,
    chuong: 1,
    cauHoi: "Thông qua nghiên cứu môn học Tư tưởng Hồ Chí Minh, sinh viên thường xuyên tu dưỡng, rèn luyện bản thân mình theo tư tưởng, đạo đức, phong cách Hồ Chí Minh, hoàn thành nhiệm vụ của mình gắn liền với:",
    dapAn: [
      "Trau dồi tình cảm cách mạng, đóng góp thiết thực và hiệu quả cho sự nghiệp cách mạng của đất nước",
      "Củng cố lập trường cách mạng, tích cực, chủ động đấu tranh phê phán những luận điểm sai trái",
      "Học tập nâng cao trình độ chuyên môn, nghiệp vụ",
      "Bồi đắp năng lực tư duy lý luận, chỉ dẫn hành động để sinh viên trở thành công dân có ít cho xã hội"
    ],
    dung: "A"
  }
];

fs.writeFileSync('src/data/chapter1.json', JSON.stringify(ch1, null, 2));
console.log('Chapter 1 written:', ch1.length, 'questions');
