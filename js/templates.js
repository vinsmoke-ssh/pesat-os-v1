/**
 * ==========================================================================
 * CETAK TEMPLATE PESAN
 * File ini berisi data template pesan dalam bentuk array of objects, yang memudahkan pengelolaan dan penambahan template baru tanpa harus mengubah banyak kode di bagian UI atau logika aplikasi. Setiap template memiliki struktur yang konsisten, termasuk ID, nama, field input, dan fungsi untuk menghasilkke dalam array, tanpa perlu mengubah logika rendering form atau validasi input di bagian lain aplikasi. Hal ini membuat aplikasi an pesan akhir berdasarkan data yang diinput.
 * Dengan pendekatan ini, kita dapat dengan mudah menambahkan template baru hanya dengan menambahkan objek baru lebih modular, mudah dipelihara, dan scalable untuk kebutuhan di masa depan.
 * mengelola data template untuk dropdown dan form input, serta format pesan hasil generate
 * ==========================================================================
 */
const templates = [
  // KONFIRMASI PENAMBAHAN MARKETING AGENT
  {
    id: "marketing-agent",
    name: "Konfirmasi Penambahan Marketing Agent",
    fields: [
      { key: "kantor", label: "Nama Kantor Layanan" },
      { key: "agent", label: "Nama Marketing Agent" },
      { key: "officer", label: "Nama Marketing Officer" },
      { key: "nik", label: "Nomor NIK" },
    ],
    message: (data) => `
Dear Kantor Layanan <strong>${data.kantor || "..."}</strong><br><br>Penambahan MARKETING AGENT a/n <strong>${data.agent || "..."}</strong> QQ <strong>${data.officer || "..."}</strong> dengan NIK <strong>${data.nik || "..."}</strong> sudah berhasil dibuat.<br><br>Silakan cek kembali melalui sistem SIPP. Terima kasih.
`,
  },

  // KONFIRMASI PENAMBAHAN MARKETING OFFICER
  {
    id: "marketing-officer",
    name: "Konfirmasi Penambahan Marketing Officer",
    fields: [
      { key: "kantor", label: "Nama Kantor Layanan" },
      { key: "officer", label: "Nama Marketing Officer" },
      { key: "nik", label: "Nomor NIK" },
    ],
    message: (data) => `
Dear Kantor Layanan <strong>${data.kantor || "..."}</strong><br><br>Penambahan MARKETING OFFICER a/n <strong>${data.officer || "..."}</strong> dengan NIK <strong>${data.nik || "..."}</strong> sudah berhasil dibuat.<br><br>Silakan cek kembali melalui sistem SIPP. Terima kasih.
`,
  },

  // KONFIRMASI CLEANSING DEBITUR
  {
    id: "cleansing-debitur",
    name: "Konfirmasi Cleansing Debitur",
    fields: [
      { key: "namaDebitur", label: "Nama Debitur" },
      { key: "noreg", label: "No. Registrasi" },
    ],
    message: (data) => `
Permintaan cleansing debitur a/n <strong>${data.namaDebitur || "..."}</strong> dengan No. Registrasi <strong>${data.noreg || "..."}</strong> sudah di proses.<br><br>Terima kasih.
`,
  },

  // KONFIRMASI PEMINDAHAN SUMBER DANA
  {
    id: "pemindahan-sumber-dana",
    name: "Konfirmasi Pemindahan Sumber Dana",
    fields: [
      { key: "sumberDanaSebelum", label: "Sumber Dana Sebelum" },
      { key: "sumberDanaTujuan", label: "Sumber Dana Tujuan" },
      { key: "namaDebitur", label: "Nama Debitur" },
      { key: "noreg", label: "No. Registrasi" },
    ],
    message: (data) => `
Permintaan pindah sumber dana dari <strong>${data.sumberDanaSebelum || "..."}</strong> ke <strong>${data.sumberDanaTujuan || "..."}</strong> a/n <strong>${data.namaDebitur || "..."}</strong> dengan No. Registrasi <strong>${data.noreg || "..."}</strong> sudah di proses.<br><br>Boleh dilanjutkan sesuai prosedur, termasuk pengajuan SLIK baru ke bank sumber dana tujuan.<br><br>Terima kasih.
`,
  },

  // KONFIRMASI PENAMBAHAN PERUSAHAAN
  {
    id: "penambahan-perusahaan",

    name: "Konfirmasi Penambahan Perusahaan",

    fields: [
      {
        key: "namaPerusahaan",
        label: "Nama Perusahaan",
      },
    ],

    message: (data) => `
Penambahan Perusahaan <strong>${data.namaPerusahaan || "..."}</strong> sudah berhasil dibuat.<br><br>Silakan cek kembali melalui sistem.<br><br>Terima kasih.
`,
  },
];
