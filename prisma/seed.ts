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
          { title: "Nơi Này Có Anh", artist: "Sơn Tùng M-TP" },
          { title: "Có Chắc Yêu Là Đây", artist: "Sơn Tùng M-TP" },
          { title: "Hãy Trao Cho Anh", artist: "Sơn Tùng M-TP" },
          { title: "Đừng Hỏi Em", artist: "Mỹ Tâm" },
          { title: "Nơi Tình Yêu Bắt Đầu", artist: "Bùi Anh Tuấn" },
          { title: "Em Của Ngày Hôm Qua", artist: "Sơn Tùng M-TP" },
          { title: "Yêu Là Tha Thu", artist: "Only C" },
          { title: "Anh Đang Ở Đâu Đấy Anh", artist: "Hương Giang" },
        ],
      },
    },
  });

  const remix = await prisma.category.create({
    data: {
      name: "Remix",
      songs: {
        create: [
          { title: "Bạc Phận (Remix)", artist: "K-ICM & Jack" },
          { title: "Sóng Gió (Remix)", artist: "K-ICM & Jack" },
          { title: "Hồng Nhan (Remix)", artist: "Jack" },
          { title: "Người Lạ Ơi (Remix)", artist: "Karik" },
          { title: "Buồn Của Anh (Remix)", artist: "K-ICM & Đạt G" },
          { title: "Tâm Sự Tuổi 30 (Remix)", artist: "Trịnh Thăng Bình" },
        ],
      },
    },
  });

  const nhacTruTinh = await prisma.category.create({
    data: {
      name: "Nhạc Trữ Tình",
      songs: {
        create: [
          { title: "Cha Già Rồi Đúng Không", artist: "Trung Quân" },
          { title: "Cô Gái M52", artist: "Huy ft Tùng Viu" },
          { title: "Chúng Ta Của Hiện Tại", artist: "Sơn Tùng M-TP" },
          { title: "Vùng Lá Me Bay", artist: "Như Quỳnh" },
          { title: "Mưa Nửa Đêm", artist: "Trường Vũ" },
          { title: "LK Tình Khúc Song Ca", artist: "Nhiều Ca Sĩ" },
        ],
      },
    },
  });

  const tienChien = await prisma.category.create({
    data: {
      name: "Tiền Chiến",
      songs: {
        create: [
          { title: "Nắng Chiều", artist: "Lê Trọng Nguyễn" },
          { title: "Diễm Xưa", artist: "Trịnh Công Sơn" },
          { title: "Bến Xuân", artist: "Văn Cao" },
          { title: "Thiên Thai", artist: "Văn Cao" },
          { title: "Giọt Mưa Thu", artist: "Đặng Thế Phong" },
          { title: "Suối Mơ", artist: "Văn Cao" },
        ],
      },
    },
  });

  const damCuoi = await prisma.category.create({
    data: {
      name: "Nhạc Đám Cưới",
      songs: {
        create: [
          { title: "Ngày Cưới", artist: "Đan Trường" },
          { title: "Cô Dâu", artist: "Minh Vương" },
          { title: "Đám Cưới Nhà Binh", artist: "Tuấn Hưng" },
          { title: "Tình Yêu Mang Theo", artist: "Mạnh Quỳnh" },
          { title: "Trăm Năm Không Phai", artist: "Quang Hà" },
          { title: "Cưới Nhau Đi (Yes I Do)", artist: "Bùi Anh Tuấn & Hiền Hồ" },
          { title: "Just Say Yes", artist: "Nhiều Ca Sĩ" },
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
