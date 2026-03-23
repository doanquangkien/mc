import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.song.deleteMany();
  await prisma.category.deleteMany();
  await prisma.queue.deleteMany();

  // Create categories with songs
  const bolero = await prisma.category.create({
    data: {
      name: "Bolero",
      songs: {
        create: [
          { title: "Đám Cưới Trên Đường Quê", artist: "Hoàng Thi Thơ" },
          { title: "Túp Lều Lý Tưởng", artist: "Hoàng Thi Thơ" },
          { title: "Duyên Quê", artist: "Hoàng Thi Thơ" },
          { title: "Thuyền Hoa", artist: "Phạm Thế Mỹ" },
          { title: "Hỏi Vợ Ngoại Thành", artist: "Giao Tiên" },
          { title: "Bằng Lòng Đi Em", artist: "Giao Tiên & Cô Phượng" },
          { title: "Rước Dâu Miệt Vườn", artist: "Giao Tiên" },
          { title: "Vó Ngựa Trên Đồi Cỏ Non", artist: "Giao Tiên" },
          { title: "Tình Nghèo Có Nhau", artist: "Đài Phương Trang" },
          { title: "Tình Thắm Duyên Quê", artist: "Trúc Phương" },
          { title: "Mùa Xuân Cưới Em", artist: "Mặc Thế Nhân" },
          { title: "Thương Nhau Lý Tơ Hồng", artist: "Trương Quang Tuấn" },
          { title: "Tơ Hồng", artist: "Tiến Luân" },
          { title: "Rước Tình Về Với Quê Hương", artist: "Hoàng Thi Thơ" },
          { title: "Trăng Rụng Xuống Cầu", artist: "Hoàng Thi Thơ" },
          { title: "Đính Ước", artist: "Giao Tiên" },
          { title: "Thề Non Hẹn Biển", artist: "Đài Phương Trang" },
          { title: "Ngày Hạnh Phúc", artist: "Lam Phương" },
          { title: "Ra Giêng Anh Cưới Em", artist: "Lư Nhất Vũ & Lê Giang" },
          { title: "Thiên Duyên Tiền Định", artist: "Trang Dũng Phương & Hoài Linh" },
        ],
      },
    },
  });

  const nhacTre = await prisma.category.create({
    data: {
      name: "Nhạc Trẻ",
      songs: {
        create: [
          { title: "Hơn Cả Yêu", artist: "Khắc Hưng" },
          { title: "Ngày Đầu Tiên", artist: "Khắc Hưng" },
          { title: "Cưới Nhau Đi (Yes I Do)", artist: "Châu Đăng Khoa" },
          { title: "Nắm Lấy Tay Anh", artist: "Tú Dưa" },
          { title: "Ta Là Của Nhau", artist: "Đỗ Hiếu" },
          { title: "Một Nhà", artist: "Da LAB" },
          { title: "Ngày Chung Đôi", artist: "Huy Tuấn" },
          { title: "Cô Dâu", artist: "Nguyễn Hồng Thuận" },
          { title: "Ánh Nắng Của Anh", artist: "Khắc Hưng" },
          { title: "Làm Vợ Anh Nhé", artist: "Phạm Bảo Nam" },
          { title: "Yêu Là Cưới", artist: "Phát Hồ" },
          { title: "Mãi Mãi Bên Nhau", artist: "Đỗ Hiếu" },
          { title: "Cầu Hôn", artist: "Hứa Kim Tuyền" },
          { title: "Đám Cưới Nha", artist: "VSTeam" },
          { title: "Vợ Tuyệt Vời Nhất", artist: "Vương Anh Tú" },
          { title: "Nơi Này Có Anh", artist: "Sơn Tùng M-TP" },
          { title: "Bức Thư Tình Đầu Tiên", artist: "Đỗ Bảo" },
          { title: "Mình Yêu Nhau Đi", artist: "Tiên Cookie" },
          { title: "Sau Tất Cả", artist: "Khắc Hưng" },
          { title: "Dành Cho Em", artist: "Hoàng Tôn" },
        ],
      },
    },
  });

  const remix = await prisma.category.create({
    data: {
      name: "Remix",
      songs: {
        create: [
          { title: "Cưới Thôi (Remix)", artist: "Masew, Masiu, B Ray, TAP" },
          { title: "Yêu Là Cưới (Remix)", artist: "Phát Hồ" },
          { title: "Rồi Tới Luôn (Remix)", artist: "Nal" },
          { title: "Đám Cưới Nha (Remix)", artist: "Hồng Thanh, DJ Mie" },
          { title: "Vui Lắm Nha (Remix)", artist: "Hương Ly, Jombie" },
          { title: "Túp Lều Lý Tưởng (Remix)", artist: "Hoàng Thi Thơ" },
          { title: "Đám Cưới Trên Đường Quê (Remix)", artist: "Hoàng Thi Thơ" },
          { title: "Thuyền Hoa (Remix)", artist: "Phạm Thế Mỹ" },
          { title: "Rước Dâu Miệt Vườn (Remix)", artist: "Giao Tiên" },
          { title: "Thương Nhau Lý Tơ Hồng (Remix)", artist: "Trương Quang Tuấn" },
          { title: "Bằng Lòng Đi Em (Remix)", artist: "Giao Tiên" },
          { title: "Cưới Nhau Đi (Yes I Do) (Remix)", artist: "Châu Đăng Khoa" },
          { title: "Làm Vợ Anh Nhé (Remix)", artist: "Phạm Bảo Nam" },
          { title: "Nắm Lấy Tay Anh (Remix)", artist: "Tú Dưa" },
          { title: "Ngày Đầu Tiên (Remix)", artist: "Khắc Hưng" },
          { title: "Hơn Cả Yêu (Remix)", artist: "Khắc Hưng" },
          { title: "Tình Thắm Duyên Quê (Remix)", artist: "Trúc Phương" },
          { title: "Vó Ngựa Trên Đồi Cỏ Non (Remix)", artist: "Giao Tiên" },
          { title: "Rước Tình Về Với Quê Hương (Remix)", artist: "Hoàng Thi Thơ" },
          { title: "Cô Dâu (Remix)", artist: "Nguyễn Hồng Thuận" },
        ],
      },
    },
  });

  const nhacTruTinh = await prisma.category.create({
    data: {
      name: "Nhạc Trữ Tình",
      songs: {
        create: [
          { title: "Lâu Đài Tình Ái", artist: "Trần Thiện Thanh" },
          { title: "Biển Tình", artist: "Lam Phương" },
          { title: "Duyên Kiếp", artist: "Lam Phương" },
          { title: "Yêu Em Dài Lâu", artist: "Đức Huy" },
          { title: "Chân Tình", artist: "Trần Lê Quỳnh" },
          { title: "Mùa Thu Cho Em", artist: "Ngô Thụy Miên" },
          { title: "Bài Ca Tết Cho Em", artist: "Quốc Dũng" },
          { title: "Lời Yêu Thương", artist: "Đức Huy" },
          { title: "Và Con Tim Đã Vui Trở Lại", artist: "Đức Huy" },
          { title: "Trái Tim Không Ngủ Yên", artist: "Thanh Tùng" },
          { title: "Vị Ngọt Đôi Môi", artist: "Tùng Châu & Lê Hựu Hà" },
          { title: "Gặp Nhau Làm Ngơ", artist: "Trần Thiện Thanh" },
          { title: "Niệm Khúc Cuối", artist: "Ngô Thụy Miên" },
          { title: "Tình Có Như Không", artist: "Trần Thiện Thanh" },
          { title: "Chuyện Hẹn Hò", artist: "Trần Thiện Thanh" },
          { title: "Mùa Xuân Đó Có Em", artist: "Anh Việt Thu" },
          { title: "Tình Đẹp Mùa Chôm Chôm", artist: "Giao Tiên" },
          { title: "Điệp Khúc Tình Yêu", artist: "Trần Tiến" },
          { title: "Lời Tỏ Tình Dễ Thương", artist: "Ngọc Sơn" },
          { title: "Tình Ca Mùa Xuân", artist: "Tôn Thất Lập" },
        ],
      },
    },
  });

  const tienChien = await prisma.category.create({
    data: {
      name: "Tiền Chiến",
      songs: {
        create: [
          { title: "Tiến Quân Ca", artist: "Văn Cao" },
          { title: "Hát Mãi Khúc Quân Hành", artist: "Diệp Minh Tuyền" },
          { title: "Năm Anh Em Trên Một Chiếc Xe Tăng", artist: "Doãn Nho" },
          { title: "Trường Sơn Đông, Trường Sơn Tây", artist: "Hoàng Hiệp" },
          { title: "Chào Em Cô Gái Lam Hồng", artist: "Ánh Dương" },
          { title: "Chiếc Gậy Trường Sơn", artist: "Phạm Tuyên" },
          { title: "Cô Gái Mở Đường", artist: "Xuân Giao" },
          { title: "Hành Khúc Ngày Và Đêm", artist: "Phan Huỳnh Điểu" },
          { title: "Tiểu Đoàn 307", artist: "Nguyễn Hữu Trí" },
          { title: "Giải Phóng Điện Biên", artist: "Đỗ Nhuận" },
          { title: "Tiến Về Sài Gòn", artist: "Lưu Hữu Phước" },
          { title: "Bác Đang Cùng Chúng Cháu Hành Quân", artist: "Huy Thục" },
          { title: "Đường Chúng Ta Đi", artist: "Huy Du" },
          { title: "Lá Xanh", artist: "Hoàng Việt" },
          { title: "Bài Ca Không Quên", artist: "Phạm Minh Tuấn" },
          { title: "Màu Hoa Đỏ", artist: "Thuận Yến" },
          { title: "Dáng Đứng Bến Tre", artist: "Nguyễn Văn Tý" },
          { title: "Cuộc Đời Vẫn Đẹp Sao", artist: "Phan Huỳnh Điểu" },
          { title: "Lên Ngàn", artist: "Hoàng Việt" },
          { title: "Tàu Anh Qua Núi", artist: "Phan Lạc Hoa" },
        ],
      },
    },
  });

  const damCuoi = await prisma.category.create({
    data: {
      name: "Nhạc Đám Cưới",
      songs: {
        create: [
          { title: "Beautiful In White", artist: "Shane Filan" },
          { title: "Perfect", artist: "Ed Sheeran" },
          { title: "Marry You", artist: "Bruno Mars" },
          { title: "A Thousand Years", artist: "Christina Perri" },
          { title: "Sugar", artist: "Maroon 5" },
          { title: "Qua Đêm Nay", artist: "Mạnh Quân" },
          { title: "Cơn Mưa Tình Yêu", artist: "Mạnh Quân" },
          { title: "Nơi Tình Yêu Bắt Đầu", artist: "Tiến Minh" },
          { title: "Bản Tình Ca Đầu Tiên", artist: "Duy Khoa" },
          { title: "Lời Tỏ Tình Mùa Xuân", artist: "Thanh Tùng" },
          { title: "Từ Đó", artist: "Phan Mạnh Quỳnh" },
          { title: "Tình Yêu Màu Nắng", artist: "Phạm Thanh Hà" },
          { title: "Ngày Ta Sánh Đôi", artist: "Dũng Hà" },
          { title: "Gió Đánh Đò Đưa", artist: "Dân ca Bắc Bộ" },
          { title: "Trai Tài Gái Sắc", artist: "Mã Thu Giang" },
          { title: "Tình Ca", artist: "Phạm Duy" },
          { title: "Cho Em Một Ngày", artist: "Dương Thụ" },
          { title: "Cùng Anh", artist: "Ngọc Dolil" },
          { title: "Yêu Em", artist: "Khắc Việt" },
          { title: "Em Ơi Mùa Xuân Đến Rồi Đó", artist: "Trần Chung" },
        ],
      },
    },
  });

  console.log("✅ Seed completed!");
  console.log(`  📂 Categories created: ${[bolero, nhacTre, remix, nhacTruTinh, tienChien, damCuoi].length}`);
  console.log("  🎵 Songs seeded per category");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
