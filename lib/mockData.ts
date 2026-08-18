export interface Official {
  name: string;
  role: string;
  image: string;
  phone?: string;
}

export interface EconomicPotential {
  id: string;
  title: string;
  category: "Pertanian" | "Kerajinan" | "Kuliner" | "Jasa";
  description: string;
  image: string;
  owner: string;
  contact: string;
}

export interface TouristSpot {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  category: "Ekowisata" | "Budaya" | "Sejarah";
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: "Pengumuman" | "Kegiatan" | "Ekonomi" | "Pembangunan";
  image: string;
}

export interface StatItem {
  label: string;
  value: number;
  percentage: number;
}

export interface BudgetCategory {
  name: string;
  planned: number;
  realized: number;
}

export interface BudgetReport {
  year: number;
  income: BudgetCategory[];
  expenditure: BudgetCategory[];
  financing: BudgetCategory[];
}

export const officials: Official[] = [
  {
    name: "Ir. H. Sudjatmiko, M.Si.",
    role: "Lurah / Kepala Desa",
    image: "/images/officials/kades.jpg",
  },
  {
    name: "Sri Mulyani, S.E.",
    role: "Carik / Sekretaris Desa",
    image: "/images/officials/sekdes.jpg",
  },
  {
    name: "Bambang Wijoyono",
    role: "Kaur Keuangan (Bendahara)",
    image: "/images/officials/kaur_keu.jpg",
  },
  {
    name: "Retno Wulandari, S.Pd.",
    role: "Kaur Tata Usaha & Umum",
    image: "/images/officials/kaur_umum.jpg",
  },
  {
    name: "Ahmad Dahlan",
    role: "Kasi Kesejahteraan (Pembangunan)",
    image: "/images/officials/kasi_kesra.jpg",
  },
  {
    name: "Tri Wibowo",
    role: "Kasi Pemerintahan",
    image: "/images/officials/kasi_pem.jpg",
  },
];

export const economicPotentials: EconomicPotential[] = [
  {
    id: "pot-1",
    title: "Beras Organik Gendeng",
    category: "Pertanian",
    description: "Beras organik premium hasil budidaya Kelompok Tani Manunggal Gendeng. Diproduksi tanpa bahan kimia sintetis menggunakan pupuk kandang hasil olah mandiri.",
    image: "/images/potensi/beras.jpg",
    owner: "Gapoktan Manunggal Gendeng",
    contact: "0812-3456-7890",
  },
  {
    id: "pot-2",
    title: "Kerajinan Serat Alam & Bamboo Craft",
    category: "Kerajinan",
    description: "Aneka kerajinan tangan dekoratif dari bambu, serat eceng gondok, dan mendong. Hasil kerajinan warga lokal ini telah diekspor ke berbagai negara di Asia dan Eropa.",
    image: "/images/potensi/kerajinan.jpg",
    owner: "Koperasi Kerajinan Gendeng Kreatif",
    contact: "0812-7654-3210",
  },
  {
    id: "pot-3",
    title: "Gula Jawa Kelapa Asli",
    category: "Kuliner",
    description: "Gula jawa cetak tradisional dari nira pohon kelapa asli. Dibuat secara alami tanpa pengawet atau pemanis buatan oleh kelompok penderes nira setempat.",
    image: "/images/potensi/gula_jawa.jpg",
    owner: "KUBE Gula Semut Gendeng",
    contact: "0813-9876-5432",
  },
  {
    id: "pot-4",
    title: "Ekowisata Pertanian Terpadu",
    category: "Jasa",
    description: "Layanan edukasi pertanian, peternakan, dan perikanan air tawar untuk anak sekolah dan wisatawan umum. Paket wisata edukasi ramah lingkungan.",
    image: "/images/potensi/ekowisata.jpg",
    owner: "BUMKampung Gendeng Makmur",
    contact: "0811-2233-4455",
  },
];

export const touristSpots: TouristSpot[] = [
  {
    id: "wis-1",
    title: "Grojogan Sewu Gendeng",
    description: "Air terjun alami dengan debit air stabil sepanjang tahun, dikelilingi oleh hutan bambu yang rimbun dan asri. Terdapat kolam pemandian alami dan spot foto menarik.",
    location: "Dusun Gendeng Lor",
    image: "/images/wisata/air_terjun.jpg",
    category: "Ekowisata",
  },
  {
    id: "wis-2",
    title: "Terasering Sawah Curug",
    description: "Hamparan sawah berundak yang indah, menawarkan pemandangan hijau menenangkan dengan latar belakang pegunungan. Dilengkapi gazebo tradisional untuk bersantai.",
    location: "Dusun Curug Kulon",
    image: "/images/wisata/sawah.jpg",
    category: "Ekowisata",
  },
  {
    id: "wis-3",
    title: "Sendang Karang Kamulyan",
    description: "Mata air keramat bersejarah yang diyakini warga telah digunakan sejak zaman Kerajaan Mataram. Airnya jernih dan segar, sering dikunjungi untuk ritual budaya.",
    location: "Dusun Gendeng Wetan",
    image: "/images/wisata/sendang.jpg",
    category: "Sejarah",
  },
  {
    id: "wis-4",
    title: "Upacara Adat Merti Dusun",
    description: "Ritual tahunan bersih desa sebagai wujud syukur atas hasil panen melimpah. Menampilkan kirab gunungan hasil bumi dan pertunjukan wayang kulit semalam suntuk.",
    location: "Halaman Balai Kampung Gendeng",
    image: "/images/wisata/merti_dusun.jpg",
    category: "Budaya",
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: "news-1",
    title: "Pemerintah Kampung Gendeng Luncurkan Program Ketahanan Pangan 2026",
    excerpt: "Untuk memperkuat kemandirian ekonomi, Pemdes Gendeng mengalokasikan 20% dana desa untuk pertanian organik terpadu dan pembagian bibit unggul.",
    content: `Pemerintah Kampung Gendeng secara resmi meluncurkan Program Ketahanan Pangan Terpadu tahun anggaran 2026. Acara peluncuran ini dilaksanakan di Balai Pertemuan Kelompok Tani Manunggal Gendeng Lor dan dihadiri oleh jajaran perangkat desa, BPD, serta perwakilan kelompok tani dari seluruh dusun.\n\nKepala Kampung Gendeng, Ir. H. Sudjatmiko, M.Si., menyatakan bahwa program ini difokuskan pada optimalisasi lahan pekarangan, pembuatan pupuk organik mandiri, dan pembagian bibit unggul padi serta hortikultura gratis kepada warga.\n\n"Tujuan utama kami adalah memastikan setiap rumah tangga tani memiliki ketahanan pangan mandiri di tengah fluktuasi harga kebutuhan pokok nasional. Kita manfaatkan kearifan lokal pertanian organik kita yang telah terbukti berkualitas tinggi," ujar Sudjatmiko.\n\nMelalui alokasi Dana Desa tahun ini sebesar 20%, program ketahanan pangan juga akan mencakup perbaikan saluran irigasi tersier sepanjang 500 meter di Dusun Curug Kulon dan pembuatan kolam ikan bersama untuk kelompok pemuda desa guna menciptakan peluang ekonomi baru.`,
    date: "2026-08-01",
    author: "Sri Mulyani, S.E.",
    category: "Pembangunan",
    image: "/images/berita/ketahanan_pangan.jpg",
  },
  {
    id: "news-2",
    title: "Pelatihan Digital Marketing UMKM Gendeng Pacu Penjualan Kerajinan Tangan",
    excerpt: "Bekerja sama dengan dinas koperasi, BUMKampung Gendeng menyelenggarakan workshop pembuatan toko online dan manajemen pemasaran digital.",
    content: `Guna mendongkrak omzet pelaku Usaha Mikro Kecil dan Menengah (UMKM), terutama perajin serat alam dan bambu di Kampung Gendeng, BUMKampung Gendeng Makmur mengadakan pelatihan pemasaran digital terpadu.\n\nPelatihan ini berlangsung selama dua hari di Aula Balai Desa dengan menghadirkan narasumber ahli praktisi e-commerce nasional. Sebanyak 30 pelaku UMKM lokal diajarkan cara memfoto produk secara menarik, menulis deskripsi produk yang memikat, mengelola akun toko online di berbagai marketplace, serta memanfaatkan media sosial untuk promosi.\n\nCarik Kampung Gendeng, Sri Mulyani, S.E., menuturkan bahwa potensi kerajinan bambu Kampung Gendeng sangat besar, namun terkendala dalam jangkauan pasar yang masih lokal.\n\n"Dengan go-digital, kami berharap produk-produk unggulan dari Kampung Gendeng ini bisa menjangkau pembeli di kota-kota besar di seluruh Indonesia bahkan diekspor secara langsung melalui platform digital," imbuhnya.`,
    date: "2026-07-25",
    author: "Retno Wulandari, S.Pd.",
    category: "Ekonomi",
    image: "/images/berita/pelatihan_umkm.jpg",
  },
  {
    id: "news-3",
    title: "Pembangunan Rabat Beton Jalan Penghubung Dusun Gendeng Wetan Rampung",
    excerpt: "Akses jalan pertanian dan permukiman sepanjang 1,2 KM kini mulus setelah selesai dikerjakan secara gotong royong oleh warga desa.",
    content: `Akses transportasi pertanian dan mobilitas warga di Dusun Gendeng Wetan kini semakin lancar setelah proyek pembangunan jalan rabat beton rampung 100%.\n\nPembangunan infrastruktur jalan sepanjang 1.200 meter dengan lebar 3 meter ini menggunakan anggaran Dana Kampung Gendeng Tahap I tahun 2026. Pengerjaan dilakukan secara swakelola dengan melibatkan warga dusun setempat sebagai wujud padat karya tunai.\n\nKepala Seksi Kesejahteraan Kampung Gendeng, Ahmad Dahlan, menjelaskan bahwa sebelumnya kondisi jalan tanah tersebut sangat memprihatinkan, licin, dan berlumpur ketika musim hujan, menghambat distribusi hasil panen padi dan kelapa milik petani.\n\n"Alhamdulillah, dengan gotong royong yang luar biasa, jalan ini selesai tepat waktu dalam waktu 3 minggu. Kini petani bisa membawa hasil panen ke pasar secara lebih cepat dan hemat ongkos angkut," ungkap Ahmad Dahlan.`,
    date: "2026-07-10",
    author: "Ahmad Dahlan",
    category: "Pembangunan",
    image: "/images/berita/pembangunan_jalan.jpg",
  },
];

export const demographics: {
  gender: StatItem[];
  education: StatItem[];
  occupation: StatItem[];
  ageGroup: StatItem[];
  totalPopulation: number;
  totalFamilies: number;
} = {
  totalPopulation: 3450,
  totalFamilies: 980,
  gender: [
    { label: "Laki-laki", value: 1710, percentage: 49.6 },
    { label: "Perempuan", value: 1740, percentage: 50.4 },
  ],
  education: [
    { label: "SD / Sederajat", value: 620, percentage: 18.0 },
    { label: "SMP / Sederajat", value: 850, percentage: 24.6 },
    { label: "SMA / SMK / Sederajat", value: 1350, percentage: 39.1 },
    { label: "Diploma / Sarjana (D3/S1/S2)", value: 480, percentage: 13.9 },
    { label: "Tidak/Belum Sekolah", value: 150, percentage: 4.4 },
  ],
  occupation: [
    { label: "Petani / Pekebun", value: 1150, percentage: 33.3 },
    { label: "Perajin / Pekerja Seni", value: 450, percentage: 13.0 },
    { label: "Karyawan Swasta", value: 680, percentage: 19.7 },
    { label: "Wiraswasta / Pedagang", value: 520, percentage: 15.1 },
    { label: "Pegawai Negeri (PNS/TNI/Polri)", value: 120, percentage: 3.5 },
    { label: "Belum/Tidak Bekerja", value: 530, percentage: 15.4 },
  ],
  ageGroup: [
    { label: "Anak-anak (0 - 14 tahun)", value: 580, percentage: 16.8 },
    { label: "Usia Produktif (15 - 64 tahun)", value: 2420, percentage: 70.1 },
    { label: "Lansia (65 tahun ke atas)", value: 450, percentage: 13.1 },
  ],
};

export const apbdesBudget: BudgetReport = {
  year: 2026,
  income: [
    { name: "Dana Desa (DD)", planned: 1100000000, realized: 1100000000 },
    { name: "Alokasi Dana Desa (ADD)", planned: 650000000, realized: 650000000 },
    { name: "Bantuan Keuangan Kabupaten", planned: 250000000, realized: 200000000 },
    { name: "Pendapatan Asli Desa (PADes)", planned: 85000000, realized: 92000000 },
    { name: "Bagi Hasil Pajak & Retribusi Daerah", planned: 45000000, realized: 45000000 },
  ],
  expenditure: [
    { name: "Penyelenggaraan Pemerintahan Desa", planned: 680000000, realized: 672000000 },
    { name: "Pelaksanaan Pembangunan Desa", planned: 920000000, realized: 890000000 },
    { name: "Pembinaan Kemasyarakatan Desa", planned: 180000000, realized: 175000000 },
    { name: "Pemberdayaan Masyarakat Desa", planned: 280000000, realized: 275000000 },
    { name: "Penanggulangan Bencana & Darurat", planned: 70000000, realized: 50000000 },
  ],
  financing: [
    { name: "Penerimaan Pembiayaan (SILPA)", planned: 55000000, realized: 55000000 },
    { name: "Pengeluaran Pembiayaan (BUMDes)", planned: 50000000, realized: 50000000 },
  ],
};
