/**
 * ==========================================================================
 * PESAT — DATA TEMPLATE PESAN OPERASIONAL  (FILE CONTOH / ACUAN PUBLIK)
 * ==========================================================================
 *
 * File ini adalah ACUAN publik yang dilacak Git dan menjadi titik awal
 * bagi kontributor. Jangan menaruh data internal di sini.
 *
 * Untuk memakainya:
 *   1. Salin file ini menjadi `js/templates.js`
 *        (Windows) copy js\templates_example.js js\templates.js
 *        (Unix)    cp js/templates_example.js js/templates.js
 *   2. Sesuaikan isi array pada `js/templates.js` (file itu di-ignore Git).
 *
 * Struktur kedua file WAJIB identik; yang boleh berbeda hanya ISI datanya.
 *
 * --------------------------------------------------------------------------
 * File ini HANYA berisi DATA. Tidak ada logika UI di sini.
 * Modul UI (js/ui.js) membaca array `templates` untuk tiga keperluan:
 *
 *   1. Mengisi dropdown pemilihan template  -> memakai `id` & `name`
 *   2. Membuat kolom input secara dinamis   -> memakai `fields`
 *   3. Merakit teks pesan akhir             -> memanggil `message(data)`
 *
 * --------------------------------------------------------------------------
 * STRUKTUR SATU OBJEK TEMPLATE
 * --------------------------------------------------------------------------
 * {
 *   id:       string   // unik, kebab-case. Dipakai sebagai nilai <option>.
 *   category: string   // salah satu key dari `templateCategories` di bawah.
 *   name:     string   // teks yang tampil di dropdown.
 *   fields:   Array<{ key: string, label: string }>
 *                      // `key`   -> nama data (dipakai di dalam `message`)
 *                      // `label` -> tulisan di atas kolom input
 *   message:  (data) => string
 *                      // menerima objek { [key]: nilaiInput } lalu
 *                      // mengembalikan potongan HTML.
 *                      // Gunakan <strong> untuk cetak tebal, <br> untuk
 *                      // baris baru.
 * }
 *
 * --------------------------------------------------------------------------
 * CARA MENAMBAH TEMPLATE BARU
 * --------------------------------------------------------------------------
 * 1. Salin salah satu objek di bawah, tempel pada kategori yang sesuai.
 * 2. Ganti `id` dengan nama unik.
 * 3. Sesuaikan `fields`. Pastikan setiap `key` yang dipakai di `message`
 *    juga terdaftar pada `fields`.
 * 4. Selalu beri nilai cadangan `|| "..."` pada setiap variabel di `message`
 *    supaya preview tidak menampilkan tulisan "undefined".
 * ==========================================================================
 */

/**
 * Daftar kategori operasional kantor.
 * Dipakai sebagai label pengelompokan. Belum dirender oleh UI saat ini,
 * disiapkan untuk pengembangan berikutnya (mis. grouping pada dropdown).
 */
const templateCategories = {
  announcement: "Pengumuman / Informasi Internal",
  confirmation: "Konfirmasi & Follow-up",
  meeting: "Undangan & Pengingat Rapat",
  task: "Notifikasi Status Pekerjaan",
};

const templates = [
  /* ======================================================================
   * KATEGORI 1 — PENGUMUMAN / INFORMASI INTERNAL
   * ----------------------------------------------------------------------
   * Pesan satu arah untuk menyampaikan informasi resmi kepada seluruh
   * karyawan atau unit kerja: pengumuman umum, hari libur, serta
   * pemberitahuan kebijakan/prosedur baru.
   * ==================================================================== */

  {
    id: "announcement-general",
    category: "announcement",
    name: "Pengumuman Umum Internal",
    fields: [
      { key: "perihal", label: "Perihal / Subjek" },
      { key: "isi", label: "Isi Pengumuman" },
      { key: "tanggalBerlaku", label: "Tanggal Berlaku" },
      { key: "narahubung", label: "Narahubung (Nama & Unit)" },
    ],
    message: (data) => `
Kepada Yth. Seluruh Karyawan,<br><br>
Dengan hormat, bersama ini kami sampaikan pengumuman mengenai <strong>${data.perihal || "..."}</strong>.<br><br>
${data.isi || "..."}<br><br>
Ketentuan ini berlaku efektif mulai <strong>${data.tanggalBerlaku || "..."}</strong>. Untuk informasi lebih lanjut, Bapak/Ibu dapat menghubungi <strong>${data.narahubung || "..."}</strong>.<br><br>
Demikian disampaikan. Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  {
    id: "announcement-holiday",
    category: "announcement",
    name: "Pengumuman Hari Libur / Cuti Bersama",
    fields: [
      { key: "namaHari", label: "Nama Hari Libur / Peringatan" },
      { key: "tanggalLibur", label: "Tanggal Libur" },
      { key: "tanggalMasuk", label: "Tanggal Masuk Kembali" },
    ],
    message: (data) => `
Kepada Yth. Seluruh Karyawan,<br><br>
Sehubungan dengan <strong>${data.namaHari || "..."}</strong>, dengan ini diberitahukan bahwa kegiatan operasional kantor diliburkan pada <strong>${data.tanggalLibur || "..."}</strong>.<br><br>
Aktivitas kerja akan kembali berjalan normal pada <strong>${data.tanggalMasuk || "..."}</strong>. Kami mohon seluruh unit kerja memastikan pekerjaan yang mendesak telah diselesaikan sebelum masa libur.<br><br>
Demikian pemberitahuan ini disampaikan untuk menjadi perhatian. Terima kasih.
`,
  },

  {
    id: "announcement-policy",
    category: "announcement",
    name: "Pemberitahuan Kebijakan / Prosedur Baru",
    fields: [
      { key: "namaKebijakan", label: "Nama Kebijakan / Prosedur" },
      { key: "ringkasan", label: "Ringkasan Perubahan" },
      { key: "tanggalEfektif", label: "Tanggal Efektif" },
      { key: "narahubung", label: "Narahubung (Nama & Unit)" },
    ],
    message: (data) => `
Kepada Yth. Seluruh Karyawan,<br><br>
Dengan hormat, manajemen memberitahukan pemberlakuan <strong>${data.namaKebijakan || "..."}</strong> di lingkungan perusahaan.<br><br>
Ringkasan perubahan: ${data.ringkasan || "..."}<br><br>
Kebijakan ini mulai berlaku efektif pada <strong>${data.tanggalEfektif || "..."}</strong>. Seluruh karyawan diharapkan memahami dan mematuhi ketentuan tersebut. Pertanyaan lebih lanjut dapat disampaikan kepada <strong>${data.narahubung || "..."}</strong>.<br><br>
Demikian disampaikan. Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  /* ======================================================================
   * KATEGORI 2 — KONFIRMASI & FOLLOW-UP
   * ----------------------------------------------------------------------
   * Pesan dua arah untuk menutup atau melanjutkan sebuah proses:
   * konfirmasi penerimaan, konfirmasi penyelesaian, serta pengingat
   * tindak lanjut atas permintaan yang masih tertunda.
   * ==================================================================== */

  {
    id: "confirmation-received",
    category: "confirmation",
    name: "Konfirmasi Penerimaan Dokumen / Permintaan",
    fields: [
      { key: "namaPengirim", label: "Nama Pengirim / Pemohon" },
      { key: "jenisDokumen", label: "Jenis Dokumen / Permintaan" },
      { key: "nomorReferensi", label: "Nomor Referensi" },
      { key: "tanggalTerima", label: "Tanggal Diterima" },
    ],
    message: (data) => `
Yth. <strong>${data.namaPengirim || "..."}</strong>,<br><br>
Dengan hormat, kami konfirmasikan bahwa <strong>${data.jenisDokumen || "..."}</strong> dengan Nomor Referensi <strong>${data.nomorReferensi || "..."}</strong> telah kami terima pada <strong>${data.tanggalTerima || "..."}</strong>.<br><br>
Permintaan Bapak/Ibu akan segera kami proses sesuai prosedur yang berlaku. Informasi perkembangan selanjutnya akan kami sampaikan melalui kanal ini.<br><br>
Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  {
    id: "confirmation-done",
    category: "confirmation",
    name: "Konfirmasi Penyelesaian Permintaan",
    fields: [
      { key: "namaPemohon", label: "Nama Pemohon" },
      { key: "jenisPermintaan", label: "Jenis Permintaan" },
      { key: "nomorReferensi", label: "Nomor Referensi" },
    ],
    message: (data) => `
Yth. <strong>${data.namaPemohon || "..."}</strong>,<br><br>
Dengan hormat, kami sampaikan bahwa <strong>${data.jenisPermintaan || "..."}</strong> dengan Nomor Referensi <strong>${data.nomorReferensi || "..."}</strong> telah selesai diproses.<br><br>
Kami mohon Bapak/Ibu berkenan memeriksa kembali hasilnya melalui sistem. Apabila masih terdapat kendala atau ketidaksesuaian, silakan menghubungi kami untuk penanganan lebih lanjut.<br><br>
Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  {
    id: "followup-pending",
    category: "confirmation",
    name: "Follow-up / Pengingat Tindak Lanjut",
    fields: [
      { key: "namaPenerima", label: "Nama Penerima" },
      { key: "perihal", label: "Perihal" },
      { key: "nomorReferensi", label: "Nomor Referensi" },
      { key: "batasWaktu", label: "Batas Waktu Tindak Lanjut" },
    ],
    message: (data) => `
Yth. <strong>${data.namaPenerima || "..."}</strong>,<br><br>
Dengan hormat, menindaklanjuti perihal <strong>${data.perihal || "..."}</strong> dengan Nomor Referensi <strong>${data.nomorReferensi || "..."}</strong>, hingga saat ini kami belum menerima tanggapan atau kelengkapan yang dibutuhkan.<br><br>
Kami mohon Bapak/Ibu berkenan menindaklanjuti hal tersebut selambat-lambatnya pada <strong>${data.batasWaktu || "..."}</strong> agar proses dapat segera kami lanjutkan.<br><br>
Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  /* ======================================================================
   * KATEGORI 3 — UNDANGAN & PENGINGAT RAPAT
   * ----------------------------------------------------------------------
   * Pesan seputar koordinasi pertemuan: undangan rapat, pengingat
   * menjelang rapat, serta pemberitahuan perubahan jadwal rapat.
   * ==================================================================== */

  {
    id: "meeting-invitation",
    category: "meeting",
    name: "Undangan Rapat",
    fields: [
      { key: "namaRapat", label: "Nama / Agenda Rapat" },
      { key: "hariTanggal", label: "Hari & Tanggal" },
      { key: "waktu", label: "Waktu" },
      { key: "tempat", label: "Tempat / Tautan" },
      { key: "pokokBahasan", label: "Pokok Bahasan" },
    ],
    message: (data) => `
Yth. Bapak/Ibu,<br><br>
Dengan hormat, kami mengundang Bapak/Ibu untuk hadir dalam <strong>${data.namaRapat || "..."}</strong> yang akan diselenggarakan pada:<br><br>
Hari/Tanggal : <strong>${data.hariTanggal || "..."}</strong><br>
Waktu&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <strong>${data.waktu || "..."}</strong><br>
Tempat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <strong>${data.tempat || "..."}</strong><br>
Pokok Bahasan : <strong>${data.pokokBahasan || "..."}</strong><br><br>
Mengingat pentingnya agenda tersebut, kami mohon Bapak/Ibu dapat hadir tepat waktu. Atas perhatian dan kehadirannya, kami ucapkan terima kasih.
`,
  },

  {
    id: "meeting-reminder",
    category: "meeting",
    name: "Pengingat Rapat",
    fields: [
      { key: "namaRapat", label: "Nama / Agenda Rapat" },
      { key: "hariTanggal", label: "Hari & Tanggal" },
      { key: "waktu", label: "Waktu" },
      { key: "tempat", label: "Tempat / Tautan" },
    ],
    message: (data) => `
Yth. Bapak/Ibu,<br><br>
Dengan hormat, kami mengingatkan kembali mengenai <strong>${data.namaRapat || "..."}</strong> yang akan berlangsung pada <strong>${data.hariTanggal || "..."}</strong> pukul <strong>${data.waktu || "..."}</strong> bertempat di <strong>${data.tempat || "..."}</strong>.<br><br>
Kami mohon Bapak/Ibu hadir tepat waktu serta menyiapkan bahan dan data yang diperlukan terkait agenda tersebut.<br><br>
Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  {
    id: "meeting-reschedule",
    category: "meeting",
    name: "Pemberitahuan Perubahan Jadwal Rapat",
    fields: [
      { key: "namaRapat", label: "Nama / Agenda Rapat" },
      { key: "jadwalLama", label: "Jadwal Semula" },
      { key: "jadwalBaru", label: "Jadwal Pengganti" },
      { key: "tempat", label: "Tempat / Tautan" },
    ],
    message: (data) => `
Yth. Bapak/Ibu,<br><br>
Dengan hormat, sehubungan dengan penyesuaian agenda, kami memberitahukan bahwa <strong>${data.namaRapat || "..."}</strong> yang semula dijadwalkan pada <strong>${data.jadwalLama || "..."}</strong> DIUBAH menjadi <strong>${data.jadwalBaru || "..."}</strong>, bertempat di <strong>${data.tempat || "..."}</strong>.<br><br>
Kami mohon maaf atas ketidaknyamanan yang ditimbulkan dan berharap Bapak/Ibu tetap dapat hadir sesuai jadwal yang baru.<br><br>
Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  /* ======================================================================
   * KATEGORI 4 — NOTIFIKASI STATUS PEKERJAAN / TASK UPDATE
   * ----------------------------------------------------------------------
   * Pesan seputar siklus pekerjaan: penugasan pekerjaan baru,
   * pembaruan progres yang sedang berjalan, serta notifikasi bahwa
   * pekerjaan telah selesai dan siap diverifikasi.
   * ==================================================================== */

  {
    id: "task-assigned",
    category: "task",
    name: "Penugasan Pekerjaan Baru",
    fields: [
      { key: "namaPenerima", label: "Nama Penerima Tugas" },
      { key: "namaTugas", label: "Nama Pekerjaan / Tugas" },
      { key: "deskripsi", label: "Deskripsi Singkat" },
      { key: "tenggat", label: "Tenggat Waktu" },
    ],
    message: (data) => `
Yth. <strong>${data.namaPenerima || "..."}</strong>,<br><br>
Dengan hormat, Bapak/Ibu ditugaskan untuk menangani pekerjaan <strong>${data.namaTugas || "..."}</strong>.<br><br>
Uraian tugas: ${data.deskripsi || "..."}<br><br>
Pekerjaan tersebut kami mohon dapat diselesaikan dan dilaporkan selambat-lambatnya pada <strong>${data.tenggat || "..."}</strong>. Apabila terdapat kendala dalam pelaksanaannya, mohon segera dikomunikasikan kepada kami.<br><br>
Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  {
    id: "task-progress",
    category: "task",
    name: "Pembaruan Progres Pekerjaan",
    fields: [
      { key: "namaTugas", label: "Nama Pekerjaan / Tugas" },
      { key: "nomorReferensi", label: "Nomor Referensi" },
      { key: "status", label: "Status Saat Ini" },
      { key: "persentase", label: "Persentase Penyelesaian" },
      { key: "catatan", label: "Catatan / Kendala" },
    ],
    message: (data) => `
Yth. Bapak/Ibu,<br><br>
Dengan hormat, berikut kami sampaikan pembaruan atas pekerjaan <strong>${data.namaTugas || "..."}</strong> dengan Nomor Referensi <strong>${data.nomorReferensi || "..."}</strong>.<br><br>
Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <strong>${data.status || "..."}</strong><br>
Progres&nbsp;&nbsp;&nbsp;&nbsp; : <strong>${data.persentase || "..."}%</strong><br>
Catatan&nbsp;&nbsp;&nbsp;&nbsp; : ${data.catatan || "..."}<br><br>
Kami akan terus menyampaikan perkembangan berikutnya hingga pekerjaan selesai. Atas perhatiannya, kami ucapkan terima kasih.
`,
  },

  {
    id: "task-completed",
    category: "task",
    name: "Notifikasi Penyelesaian Pekerjaan",
    fields: [
      { key: "namaTugas", label: "Nama Pekerjaan / Tugas" },
      { key: "nomorReferensi", label: "Nomor Referensi" },
      { key: "tanggalSelesai", label: "Tanggal Selesai" },
      { key: "catatanHasil", label: "Catatan Hasil" },
    ],
    message: (data) => `
Yth. Bapak/Ibu,<br><br>
Dengan hormat, kami laporkan bahwa pekerjaan <strong>${data.namaTugas || "..."}</strong> dengan Nomor Referensi <strong>${data.nomorReferensi || "..."}</strong> telah SELESAI dikerjakan pada <strong>${data.tanggalSelesai || "..."}</strong>.<br><br>
Catatan hasil: ${data.catatanHasil || "..."}<br><br>
Kami mohon Bapak/Ibu berkenan melakukan pemeriksaan dan verifikasi atas hasil pekerjaan tersebut. Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },
];
