import { Question } from '../types';

export const QUESTIONS_DATABASE: Question[] = [
  // --- REFLEKSI (REFLECTION) ---
  {
    id: 'ref_1',
    type: 'Refleksi',
    landmark: 'Gapura Pecinan Semarang',
    narasi: 'Memasuki kawasan Semarang Chinatown di Jalan Kelenteng, Anda disambut oleh Gapura Sumbangsih yang berdiri megah. Desain gapura ini berciri khas Tionghoa klasik dengan pilar merah dan atap melengkung hijau-emas. Dina memperhatikan ukiran naga di sebelah kiri gapura tampak persis sama dengan naga di bagian kanan. Jika kita tarik sebuah garis vertikal imajiner tepat di tengah-tengah gapura, garis tersebut bertindak bagai cermin yang merefleksikan setiap detail ukiran pilar kiri ke pilar kanan.',
    visualPlaceholder: 'gapura_symmetry',
    stimulus: 'Amatilah struktur simetris Gapura Pecinan tersebut. Setiap titik di sebelah kiri garis tengah memiliki bayangan vertikal di sebelah kanan dengan jarak mendatar yang persis sama dari garis simetri. Ini adalah konsep dasar Refleksi (Pencerminan terhadap garis vertikal)!',
    mathQuestion: 'Ujung ekor ukiran naga di pilar kiri terpetakan pada koordinat K(-4, 5). Jika pilar tengah gapura digambarkan sebagai sumbu Y (x = 0) yang bertindak sebagai cermin, tentukan koordinat ujung ekor naga kanan setelah direfleksikan terhadap sumbu Y!',
    options: [
      "K'(4, 5)",
      "K'(-4, -5)",
      "K'(4, -5)",
      "K'(5, -4)"
    ],
    answer: 0,
    explanation: 'Pencerminan terhadap sumbu Y memetakan titik (x, y) menjadi (-x, y). Oleh karena itu, titik K(-4, 5) dicerminkan terhadap sumbu Y akan menghasilkan bayangan di K\'(4, 5).'
  },
  {
    id: 'ref_2',
    type: 'Refleksi',
    landmark: 'Klenteng Tay Kak Sie (Refleksi Kolam)',
    narasi: 'Di halaman depan Kelenteng Tay Kak Sie yang kaya akan sejarah, terdapat sebuah kolam air jernih pembawa keberuntungan (Feng Shui). Pada sore hari yang tenang, bayangan ornamen kayu terukir indah yang terpasang di langit-langit beranda kelenteng terpantul dengan presisi sempurna pada permukaan air kolam. Permukaan air kolam yang datar bertindak bagai cermin horizontal raksasa bagi seluruh bangunan di atasnya.',
    visualPlaceholder: 'water_reflection',
    stimulus: 'Melalui cermin horizontal air kolam, posisi vertikal ornamen dibalik bawah-ke-atas sedangkan koordinat horizontalnya tetap sejajar. Fenomena visual alami ini mencerminkan konsep Refleksi terhadap garis horizontal (Sumbu X)!',
    mathQuestion: 'Sebuah koordinat hiasan lampu gantung kelenteng dipetakan pada titik H(3, 6). Jika bayangannya di permukaan kolam dianggap sebagai hasil refleksi terhadap sumbu X (y = 0), tentukan koordinat bayangan hiasan lampu tersebut!',
    options: [
      "H'(3, -6)",
      "H'(-3, 6)",
      "H'(-3, -6)",
      "H'(6, 3)"
    ],
    answer: 0,
    explanation: 'Pencerminan terhadap sumbu X memetakan titik (x, y) menjadi (x, -y). Dengan demikian, lampu gantung H(3, 6) menghasilkan bayangan di H\'(3, -6).'
  },
  {
    id: 'ref_3',
    type: 'Refleksi',
    landmark: 'Dinding Cermin Klenteng Gang Lombok',
    narasi: 'Dina mengunjungi salah satu klenteng kecil kuno di sepanjang aliran Kali Semarang kawasan pecinan. Di dalam aula peribadatan, terdapat sebuah dinding marmer dekoratif yang sangat mengkilap. Ketika berdiri di depannya, Dina melihat prasasti aksara Tionghoa kuno di dinding sebelah kiri merefleksikan bayangannya secara sempurna miring 45 derajat melewati sudut ubin lantai diagonal bercorak labirin.',
    visualPlaceholder: 'diagonal_mirror',
    stimulus: 'Garis ubin diagonal di lantai bertindak sebagai cermin miring y = x. Refleksi ini menukar posisi koordinat mendatar dan tegak dari suatu objek, sehingga bertukar arah!',
    mathQuestion: 'Jika tulisan aksara Tionghoa diposisikan pada koordinat kata S(-2, 7) dan garis diagonal lantai bertindak sebagai cermin y = x, berapakah koordinat bayangan tulisan tersebut hasil refleksi terhadap garis y = x?',
    options: [
      "S'(7, -2)",
      "S'(-7, 2)",
      "S'(2, -7)",
      "S'(-2, -7)"
    ],
    answer: 0,
    explanation: 'Refleksi terhadap garis y = x memetakan koordinat (x, y) menjadi (y, x) dengan cara menukar posisi absis dan ordinat. Maka, S(-2, 7) menjadi S\'(7, -2).'
  },

  // --- TRANSLASI (TRANSLATION) ---
  {
    id: 'trans_1',
    type: 'Translasi',
    landmark: 'Deretan Lampion Gantung Gang Baru',
    narasi: 'Menyusuri pasar tradisional Gang Baru di pagi hari, suasana terasa sangat semarak dengan ratusan lampion kertas merah yang digantung membentang di atas jalan raya. Setiap lampion digantung berturut-turut pada kawat besi lurus dengan jarak antar lampion yang sama. Pola penempatan lampion ini dibuat dengan cara menggeser lampion pertama sejauh jarak tertentu mendatar untuk menempatkan lampion kedua, ketiga, dan seterusnya.',
    visualPlaceholder: 'lantern_row',
    stimulus: 'Mengingat lampion-lampion digantung berjejer lurus tanpa berputar ataupun merubah ukuran bentuknya, lampion tersebut menggambarkan konsep Translasi (Pergeseran posisi sejauh vektor arah translasinya)!',
    mathQuestion: 'Lampion pertama digantung pada titik koordinat L(1, 2). Jika lampion kedua dipasang dengan menggeser (translasi) lampion pertama sejauh T[4, 5], berapakah koordinat posisi lampion kedua tersebut?',
    options: [
      "L'(5, 7)",
      "L'(3, 3)",
      "L'(-3, -3)",
      "L'(5, 3)"
    ],
    answer: 0,
    explanation: 'Translasi oleh T[a, b] memetakan koordinat (x, y) menjadi (x + a, y + b). Untuk L(1, 2) dengan T[4, 5] menghasilkan L\'(1 + 4, 2 + 5) = L\'(5, 7).'
  },
  {
    id: 'trans_2',
    type: 'Translasi',
    landmark: 'Gerobak Kuliner Lumpia Gang Lombok',
    narasi: 'Seorang penjual kuliner legendaris Lumpia Semarang di Gang Lombok sedang bersiap di pagi hari. Ia mendorong gerobak kayu dagangannya dari areal gudang penyimpanan ditarik sejajar menyusuri tepi jalan Gang Lombok menuju pos/stan jualan utamanya yang berada tepat di samping kelenteng tertua pecinan.',
    visualPlaceholder: 'pushcart_move',
    stimulus: 'Gerakan mendorong gerobak lumpia sepanjang jalur datar lurus di jalan pecinan mengubah seluruh posisi koordinat roda dan gerobak sejauh jarak horizontal tertentu, yang merupakan bentuk nyata dari operasi matematika Translasi!',
    mathQuestion: 'Gerobak lumpia berada pada koordinat titik G(5, -1) di peta digital pecinan. Penjual menggeser koordinat gerobak sejauh T[-6, 3] untuk sampai di stan jualan. Berapakah koordinat baru stan jualan gerobak lumpia tersebut?',
    options: [
      "G'(-1, 2)",
      "G'(11, -4)",
      "G'(-1, -4)",
      "G'(11, 2)"
    ],
    answer: 0,
    explanation: 'Melakukan penambahan langsung pada setiap komponen koordinat: G\'(5 + (-6), -1 + 3) = G\'(-1, 2).'
  },
  {
    id: 'trans_3',
    type: 'Translasi',
    landmark: 'Perahu Hias Festival Kali Semarang',
    narasi: 'Dalam memperingati festival budaya pec cun di pecinan Semarang, sebuah perahu naga hias tradisional berlayar di aliran Kali Semarang. Perahu bergerak merayap searah arus air menyusuri sungai berornamen lampion hias, berpindah posisi lurus secara diagonal melintasi kolong jembatan bata merah.',
    visualPlaceholder: 'dragon_boat_glide',
    stimulus: 'Perahu naga bergeser dari hulu sungai ke arah hilir tanpa mengalami perubahan orientasi sudut maupun ukuran fisik perahu, menunjukkan prinsip Translasi spasial.',
    mathQuestion: 'Posisi haluan depan perahu naga mula-mula tercatat pada koordinat P(-2, -3). Selama 10 detik, perahu bergerak hanyut lurus sejauh vektor pergeseran T[8, 4]. Tentukan titik koordinat akhir haluan perahu tersebut!',
    options: [
      "P'(6, 1)",
      "P'(-10, -7)",
      "P'(10, 7)",
      "P'(-6, -1)"
    ],
    answer: 0,
    explanation: 'Posisi akhir diperoleh dengan menjumlahkan koordinat awal dan translasi: P\'(-2 + 8, -3 + 4) = P\'(6, 1).'
  },

  // --- ROTASI (ROTATION) ---
  {
    id: 'rot_1',
    type: 'Rotasi',
    landmark: 'Ornamen Roda Ba Gua Kelenteng kuno',
    narasi: 'Di bagian luar gerbang utama kelenteng pecinan, terdapat ukiran panel kayu melingkar Ba Gua yang melambangkan 8 penjuru mata angin keseimbangan alam. Surya mengamati panel lingkaran tersebut dapat diputar secara bebas mengelilingi poros jarum besi emas yang terletak tepat di titik pusat lingkaran.',
    visualPlaceholder: 'bagua_wheel_spin',
    stimulus: 'Ketika panel kayu Ba Gua diputar mengelilingi pusat porosnya, setiap simbol trigram pada papan kayu akan berputar membentuk lintasan melingkar dengan sudut seragam. Ini adalah visualisasi dari Rotasi geometri!',
    mathQuestion: 'Simbol api (Li) mula-mula terletak pada koordinat posisi R(4, 3) di piringan Ba Gua. Jika piringan tersebut berputar (rotasi) sejauh 90 derajat berlawanan arah jarum jam dengan pusat putaran tepat di O(0, 0), berapakah koordinat baru simbol api tersebut?',
    options: [
      "R'(-3, 4)",
      "R'(3, -4)",
      "R'(-4, -3)",
      "R'(3, 4)"
    ],
    answer: 0,
    explanation: 'Rotasi R(x, y) sebesar 90 derajat berlawanan arah jarum jam dengan pusat (0,0) akan merubah koordinat menjadi R\'(-y, x). Jadi, R(4, 3) dipetakan ke R\'(-3, 4).'
  },
  {
    id: 'rot_2',
    type: 'Rotasi',
    landmark: 'Kipas Tradisional Tari Liang Liong',
    narasi: 'Natasya mengamati sekelompok penari remaja yang berlatih Tari Kipas Peony di halaman kelenteng Tay Kak Sie. Salah satu penari melakukan gerakan koreografi dramatis dengan memutar kipas merah di tangannya sejauh setengah lingkaran penuh (180 derajat) untuk menutup tariannya.',
    visualPlaceholder: 'peony_fan_turn',
    stimulus: 'Gerakan memutar kipas sejauh setengah putaran lingkaran penuh mengakibatkan posisi ujung-ujung kipas berpindah ke arah yang berkebalikan secara simetris terhadap engsel pusat kipas (pusat rotasi).',
    mathQuestion: 'Ujung bilah bambu terluar kipas tari digambarkan pada koordinat K(-5, 2) dengan engsel kipas bertindak sebagai pusat koordinat O(0, 0). Jika kipas tersebut diputar sejauh 180 derajat (baik searah maupun berlawanan arah jarum jam), tentukan koordinat ujung bilah kipas sekarang!',
    options: [
      "K'(5, -2)",
      "K'(-5, -2)",
      "K'(2, -5)",
      "K'(5, 2)"
    ],
    answer: 0,
    explanation: 'Rotasi sebesar 180 derajat dengan pusat O(0, 0) akan mengubah koordinat (x, y) menjadi (-x, -y). Oleh karena itu, K(-5, 2) berubah menjadi K\'(5, -2).'
  },
  {
    id: 'rot_3',
    type: 'Rotasi',
    landmark: 'Meja Bundar Perjamuan Toko Kuno',
    narasi: 'Di sebuah restoran teh herbal kuno di kawasan Semarang Chinatown, terdapat sebuah meja bulat besar berkelompok dari kayu jati. Di atas meja tersebut diletakkan piring putar kaca bundar (Lazy Susan) yang digunakan untuk menyajikan makanan secara merata kepada seluruh tamu lurus 90 derajat searah jarum jam.',
    visualPlaceholder: 'lazy_susan_rotate',
    stimulus: 'Piring kaca di atas meja bundar menyajikan makanan dengan memutar piring mengelilingi pusat meja. Rotasi sejauh 90 derajat searah jarum jam memindahkan koordinat makanan di sekeliling meja makan.',
    mathQuestion: 'Sebuah teko teh kuno diletakkan di atas piring putar pada koordinat T(-2, 5). Piring tersebut diputar sejauh 90 derajat searah jarum jam (ekuivalen dengan rotasi -90 derajat) dengan pusat O(0, 0). Tentukan koordinat baru teko teh tersebut!',
    options: [
      "T'(5, 2)",
      "T'(-5, -2)",
      "T'(2, -5)",
      "T'(-2, -5)"
    ],
    answer: 0,
    explanation: 'Rotasi sejauh 90 derajat searah jarum jam (atau -90 derajat) terhadap titik pusat O(0, 0) memetakan koordinat (x, y) menjadi (y, -x). Maka, T(-2, 5) menjadi T\'(5, -(-2)) = T\'(5, 2).'
  },

  // --- DILATASI (DILATION) ---
  {
    id: 'dil_1',
    type: 'Dilatasi',
    landmark: 'Atap Klenteng Sam Poo Kong',
    narasi: 'Dina bersama kelompok belajarnya mengamati bentuk atap bangunan sejarah agung Sam Poo Kong. Atap kelenteng ini memiliki struktur bertumpuk tiga tingkat bergaya tradisional Tiongkok yang sangat indah. Sisi atap terbawah memiliki ukuran yang paling lebar dan besar, sementara sisi atap tingkat kedua dan ketiga di atasnya berukuran lebih kecil namun memiliki bentuk trapesium melengkung yang serupa.',
    visualPlaceholder: 'pagoda_roof_scale',
    stimulus: 'Meskipun ukuran atap tingkat atas lebih kecil dibanding atap terbawah, proporsi dan sudut kelengkungan bentuknya tetap sama persis (sebangun). Ini adalah model visual alami dari konsep Dilatasi (Perkalian ukuran dengan faktor skala)!',
    mathQuestion: 'Sudut luar kiri bawah atap tingkat pertama terletak pada koordinat A(-6, 8) dengan titik puncak kubah atas O(0, 0) bertindak sebagai pusat dilatasi. Untuk mendesain model atap tingkat kedua, arsitek menerapkan dilatasi dengan faktor skala k = 1/2. Berapakah koordinat sudut tingkat kedua tersebut?',
    options: [
      "A'(-3, 4)",
      "A'(-12, 16)",
      "A'(3, -4)",
      "A'(-3, 8)"
    ],
    answer: 0,
    explanation: 'Dilatasi terhadap pusat O(0, 0) dengan faktor skala k memetakan titik (x, y) menjadi (kx, ky). Dengan k = 1/2, maka A\' = ((-6)*1/2, 8*1/2) = A\'(-3, 4).'
  },
  {
    id: 'dil_2',
    type: 'Dilatasi',
    landmark: 'Bayangan Wayang Potehi Pecinan',
    narasi: 'Pada perayaan malam imlek di pecinan, diadakan pertunjukan Wayang Potehi (wayang boneka kain khas Pecinan). Dalang mengendalikan boneka di depan lampu sorot. Ketika boneka digerakkan mendekati lampu sorot layar kain, bayangan wayang potehi di layar tampak membesar secara proporsional.',
    visualPlaceholder: 'potehi_shadow',
    stimulus: 'Besar kecilnya bayangan wayang potehi di layar ditentukan oleh jarak boneka terhadap lampu sorot (pusat proyeksi/dilatasi). Perubahan ukuran bayangan yang sebangun ini adalah contoh Dilatasi secara fisik.',
    mathQuestion: 'Ujung kepala karakter wayang potehi pada peta proyeksi digital diposkan di titik W(2, -3) dengan lampu sorot berada pada koordinat asal O(0,0). Jika dilakukan dilatasi dengan faktor skala k = 3 untuk memodelkan bayangannya di layar, tentukan koordinat bayangan kepala wayang tersebut!',
    options: [
      "W'(6, -9)",
      "W'(5, 0)",
      "W'(-6, 9)",
      "W'(2/3, -1)"
    ],
    answer: 0,
    explanation: 'Dengan pusat dilatasi O(0, 0) dan faktor skala k = 3, maka koordinat bayangan diperoleh dengan mengalikan masing-masing koordinat dengan 3: W\'(2*3, -3*3) = W\'(6, -9).'
  },
  {
    id: 'dil_3',
    type: 'Dilatasi',
    landmark: 'Miniatur Souvenir Gerbang Pecinan',
    narasi: 'Di toko cenderamata Gang Baru, pengrajin lokal membuat replika kayu (miniatur) dari Gapura Pecinan Semarang yang megah. Miniatur tersebut memiliki bentuk detail yang persis sama dengan gapura aslinya di jalan masuk kawasan, namun dikompilasi ke dalam ukuran yang pas di genggaman tangan.',
    visualPlaceholder: 'miniature_craft',
    stimulus: 'Mengecilkan monumen raksasa menjadi souvenir mini tanpa merubah sudut bangunan ataupun bentuk dasarnya merupakan manifestasi dari Dilatasi pengecilan skala geometri.',
    mathQuestion: 'Jika koordinat puncak gapura asli dimodelkan pada titik P(-12, -18) dengan pusat bumi O(0, 0) sebagai titik acuan, dan replika dibuat dengan skala pengecilan (dilatasi) k = -1/3 (faktor skala negatif yang membalik objek), berapakah posisi puncak gapura replika tersebut?',
    options: [
      "P'(4, 6)",
      "P'(-4, -6)",
      "P'(36, 54)",
      "P'(-4, 6)"
    ],
    answer: 0,
    explanation: 'Dilatasi P(-12, -18) dengan k = -1/3 terhadap pusat O(0,0) menghasilkan P\'((-12)*(-1/3), (-18)*(-1/3)) = P\'(4, 6).'
  }
];
