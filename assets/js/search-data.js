/* ======================================================
   SEARCH-DATA.JS
   Index konten yang bisa dicari lewat search bar.
   File ini dipakai bersama oleh script.js di semua halaman.
   ====================================================== */

const SITE_SEARCH_INDEX = [
    // ----- Halaman utama -----
    {
        title: "Home",
        desc: "Halaman utama — perkenalan Ramzy Darmawan",
        url: "index.html#home",
        category: "Halaman",
        keywords: ["home", "beranda", "utama", "ramzy", "darmawan"]
    },
    {
        title: "Tentang Saya",
        desc: "Mahasiswa Teknik Listrik Industri, Universitas Diponegoro",
        url: "index.html#about",
        category: "Halaman",
        keywords: ["about", "tentang", "profil", "mahasiswa", "undip", "diponegoro", "teknik listrik industri", "semester 2"]
    },
    {
        title: "Keahlian",
        desc: "Electrical Design, 3D CAD, IoT Integration",
        url: "index.html#skills",
        category: "Halaman",
        keywords: ["skills", "keahlian", "kemampuan", "electrical design", "3d cad", "iot", "internet of things"]
    },
    {
        title: "Kontak",
        desc: "WhatsApp, Instagram, LinkedIn, Email",
        url: "index.html#contact",
        category: "Halaman",
        keywords: ["contact", "kontak", "whatsapp", "instagram", "linkedin", "email", "hubungi"]
    },
    {
        title: "Portfolio",
        desc: "Kumpulan proyek dan riset",
        url: "portofolio.html",
        category: "Halaman",
        keywords: ["portfolio", "portofolio", "proyek", "karya", "riset"]
    },

    // ----- Proyek -----
    {
        title: "3D Design — Desain Robot Humanoid",
        desc: "Perancangan dan assembly part robot humanoid berbasis CAD 3D",
        url: "proyek-3d-design.html",
        category: "Proyek",
        keywords: ["3d design", "cad", "robot", "humanoid", "solidworks", "assembly", "desain"]
    },
    {
        title: "Electrical Circuits — Praktikum Rangkaian Listrik",
        desc: "Praktikum pengukuran dan analisis rangkaian elektronika dasar",
        url: "proyek-electrical.html",
        category: "Proyek",
        keywords: ["electrical", "listrik", "rangkaian", "circuit", "praktikum", "elektronika", "trainer"]
    },
    {
        title: "Graphic Design — Poster Hidup Sehat Tanpa Asap",
        desc: "Desain poster kampanye kesehatan untuk Hari Tanpa Tembakau Sedunia",
        url: "proyek-graphic-design.html",
        category: "Proyek",
        keywords: ["graphic design", "poster", "desain grafis", "kemenkes", "germas", "tembakau", "kesehatan"]
    },

    // ----- CV -----
    {
        title: "Curriculum Vitae",
        desc: "Lihat atau unduh CV lengkap Ramzy Darmawan",
        url: "portofolio.html#cv",
        category: "CV",
        keywords: ["cv", "curriculum vitae", "resume", "riwayat hidup"]
    },

    // ----- Sertifikat -----
    {
        title: "Sertifikat Juara 2 Desain Poster FLS2N",
        desc: "Festival Lomba Seni Siswa Nasional 2024 — Juara 2 Desain Poster",
        url: "portofolio.html#sertifikat",
        category: "Sertifikat",
        keywords: ["fls2n", "festival", "lomba seni", "siswa nasional", "juara", "desain poster", "sertifikat"]
    },
    {
        title: "Sertifikat Peserta Terbaik 1 — Research School HMTLI",
        desc: "Peserta Terbaik 1 dalam Research School I HMTLI 2025",
        url: "portofolio.html#sertifikat",
        category: "Sertifikat",
        keywords: ["terbaik 1", "research school", "hmtli", "himpunan mahasiswa", "teknik listrik industri"]
    },
    {
        title: "Sertifikat Seminar Kimia Lingkungan ITB",
        desc: "Pelatihan Penerapan Kimia Lingkungan untuk Siswa SMA — ITB",
        url: "portofolio.html#sertifikat",
        category: "Sertifikat",
        keywords: ["itb", "seminar", "kimia lingkungan", "pelatihan", "royal society of chemistry"]
    },
    {
        title: "Sertifikat LKMM-PD Teknik Listrik Industri 2025",
        desc: "Peserta LKMM-PD HMTLI dengan tema Satyadhrita Neta Lokasangrahaya",
        url: "portofolio.html#sertifikat",
        category: "Sertifikat",
        keywords: ["lkmm", "lkmm-pd", "hmtli", "satyadhrita", "kaderisasi", "diponegoro"]
    },
    {
        title: "Sertifikat Seminar Entrepreneur Talk HMTLI",
        desc: "Peserta seminar entrepreneur talk yang diselenggarakan HMTLI",
        url: "portofolio.html#sertifikat",
        category: "Sertifikat",
        keywords: ["entrepreneur", "talk", "seminar", "hmtli", "wirausaha"]
    },
    {
        title: "Sertifikat Expo Campuss SMANLI 2026",
        desc: "Anggota Divisi Korlap dalam acara Expo Campuss Smanli 2026",
        url: "portofolio.html#sertifikat",
        category: "Sertifikat",
        keywords: ["ecs", "expo campuss", "smanli", "korlap", "panitia"]
    }
];
