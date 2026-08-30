/**
 * ==========================================================================
 * PESAT — Data Template Pesan  (FILE CONTOH / ACUAN PUBLIK)
 * ==========================================================================
 * Berkas ini hanya berisi data: array `templates` yang dibaca `js/render.js`
 * untuk mengisi dropdown, membangun kolom input, lalu merakit teks pesan lewat
 * `message(data)`. Tidak ada logika UI di sini. Berkas ini adalah acuan publik
 * yang dilacak Git — salin menjadi `js/templates.js` (di-ignore Git) sebelum
 * dipakai, dan jaga strukturnya tetap identik.
 *
 * Bentuk satu template:
 *   { id, category, name, fields: [{ key, label }], message: (data) => string }
 *
 * Konvensi penamaan: `id` (kebab-case) dan `key` (camelCase) memakai bahasa
 * Inggris dan setiap `key` wajib unik dalam satu template; `name`, `label`,
 * serta teks di `message` memakai bahasa Indonesia karena tampil ke pengguna.
 * Selalu beri fallback `|| "..."` pada setiap `${data.x}` di `message`.
 * ==========================================================================
 */

/**
 * Label kategori operasional. Dipakai untuk mengelompokkan template; belum
 * dirender oleh UI dan disiapkan untuk pengembangan berikutnya (mis. grup
 * pada dropdown).
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
      { key: "subject", label: "Perihal / Subjek" },
      { key: "body", label: "Isi Pengumuman" },
      { key: "effectiveDate", label: "Tanggal Berlaku" },
      { key: "contactPerson", label: "Narahubung (Nama & Unit)" },
    ],
    message: (data) => `
Kepada Yth. Seluruh Karyawan,<br><br>
Dengan hormat, bersama ini kami sampaikan pengumuman mengenai <strong>${data.subject || "..."}</strong>.<br><br>
${data.body || "..."}<br><br>
Ketentuan ini berlaku efektif mulai <strong>${data.effectiveDate || "..."}</strong>. Untuk informasi lebih lanjut, Bapak/Ibu dapat menghubungi <strong>${data.contactPerson || "..."}</strong>.<br><br>
Demikian disampaikan. Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  {
    id: "announcement-holiday",
    category: "announcement",
    name: "Pengumuman Hari Libur / Cuti Bersama",
    fields: [
      { key: "holidayName", label: "Nama Hari Libur / Peringatan" },
      { key: "holidayDate", label: "Tanggal Libur" },
      { key: "returnDate", label: "Tanggal Masuk Kembali" },
    ],
    message: (data) => `
Kepada Yth. Seluruh Karyawan,<br><br>
Sehubungan dengan <strong>${data.holidayName || "..."}</strong>, dengan ini diberitahukan bahwa kegiatan operasional kantor diliburkan pada <strong>${data.holidayDate || "..."}</strong>.<br><br>
Aktivitas kerja akan kembali berjalan normal pada <strong>${data.returnDate || "..."}</strong>. Kami mohon seluruh unit kerja memastikan pekerjaan yang mendesak telah diselesaikan sebelum masa libur.<br><br>
Demikian pemberitahuan ini disampaikan untuk menjadi perhatian. Terima kasih.
`,
  },

  {
    id: "announcement-policy",
    category: "announcement",
    name: "Pemberitahuan Kebijakan / Prosedur Baru",
    fields: [
      { key: "policyName", label: "Nama Kebijakan / Prosedur" },
      { key: "summary", label: "Ringkasan Perubahan" },
      { key: "effectiveDate", label: "Tanggal Efektif" },
      { key: "contactPerson", label: "Narahubung (Nama & Unit)" },
    ],
    message: (data) => `
Kepada Yth. Seluruh Karyawan,<br><br>
Dengan hormat, manajemen memberitahukan pemberlakuan <strong>${data.policyName || "..."}</strong> di lingkungan perusahaan.<br><br>
Ringkasan perubahan: ${data.summary || "..."}<br><br>
Kebijakan ini mulai berlaku efektif pada <strong>${data.effectiveDate || "..."}</strong>. Seluruh karyawan diharapkan memahami dan mematuhi ketentuan tersebut. Pertanyaan lebih lanjut dapat disampaikan kepada <strong>${data.contactPerson || "..."}</strong>.<br><br>
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
      { key: "senderName", label: "Nama Pengirim / Pemohon" },
      { key: "documentType", label: "Jenis Dokumen / Permintaan" },
      { key: "referenceNumber", label: "Nomor Referensi" },
      { key: "receivedDate", label: "Tanggal Diterima" },
    ],
    message: (data) => `
Yth. <strong>${data.senderName || "..."}</strong>,<br><br>
Dengan hormat, kami konfirmasikan bahwa <strong>${data.documentType || "..."}</strong> dengan Nomor Referensi <strong>${data.referenceNumber || "..."}</strong> telah kami terima pada <strong>${data.receivedDate || "..."}</strong>.<br><br>
Permintaan Bapak/Ibu akan segera kami proses sesuai prosedur yang berlaku. Informasi perkembangan selanjutnya akan kami sampaikan melalui kanal ini.<br><br>
Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  {
    id: "confirmation-done",
    category: "confirmation",
    name: "Konfirmasi Penyelesaian Permintaan",
    fields: [
      { key: "requesterName", label: "Nama Pemohon" },
      { key: "requestType", label: "Jenis Permintaan" },
      { key: "referenceNumber", label: "Nomor Referensi" },
    ],
    message: (data) => `
Yth. <strong>${data.requesterName || "..."}</strong>,<br><br>
Dengan hormat, kami sampaikan bahwa <strong>${data.requestType || "..."}</strong> dengan Nomor Referensi <strong>${data.referenceNumber || "..."}</strong> telah selesai diproses.<br><br>
Kami mohon Bapak/Ibu berkenan memeriksa kembali hasilnya melalui sistem. Apabila masih terdapat kendala atau ketidaksesuaian, silakan menghubungi kami untuk penanganan lebih lanjut.<br><br>
Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  {
    id: "followup-pending",
    category: "confirmation",
    name: "Follow-up / Pengingat Tindak Lanjut",
    fields: [
      { key: "recipientName", label: "Nama Penerima" },
      { key: "subject", label: "Perihal" },
      { key: "referenceNumber", label: "Nomor Referensi" },
      { key: "dueDate", label: "Batas Waktu Tindak Lanjut" },
    ],
    message: (data) => `
Yth. <strong>${data.recipientName || "..."}</strong>,<br><br>
Dengan hormat, menindaklanjuti perihal <strong>${data.subject || "..."}</strong> dengan Nomor Referensi <strong>${data.referenceNumber || "..."}</strong>, hingga saat ini kami belum menerima tanggapan atau kelengkapan yang dibutuhkan.<br><br>
Kami mohon Bapak/Ibu berkenan menindaklanjuti hal tersebut selambat-lambatnya pada <strong>${data.dueDate || "..."}</strong> agar proses dapat segera kami lanjutkan.<br><br>
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
      { key: "meetingName", label: "Nama / Agenda Rapat" },
      { key: "meetingDate", label: "Hari & Tanggal" },
      { key: "meetingTime", label: "Waktu" },
      { key: "location", label: "Tempat / Tautan" },
      { key: "agenda", label: "Pokok Bahasan" },
    ],
    message: (data) => `
Yth. Bapak/Ibu,<br><br>
Dengan hormat, kami mengundang Bapak/Ibu untuk hadir dalam <strong>${data.meetingName || "..."}</strong> yang akan diselenggarakan pada:<br><br>
Hari/Tanggal : <strong>${data.meetingDate || "..."}</strong><br>
Waktu&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <strong>${data.meetingTime || "..."}</strong><br>
Tempat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <strong>${data.location || "..."}</strong><br>
Pokok Bahasan : <strong>${data.agenda || "..."}</strong><br><br>
Mengingat pentingnya agenda tersebut, kami mohon Bapak/Ibu dapat hadir tepat waktu. Atas perhatian dan kehadirannya, kami ucapkan terima kasih.
`,
  },

  {
    id: "meeting-reminder",
    category: "meeting",
    name: "Pengingat Rapat",
    fields: [
      { key: "meetingName", label: "Nama / Agenda Rapat" },
      { key: "meetingDate", label: "Hari & Tanggal" },
      { key: "meetingTime", label: "Waktu" },
      { key: "location", label: "Tempat / Tautan" },
    ],
    message: (data) => `
Yth. Bapak/Ibu,<br><br>
Dengan hormat, kami mengingatkan kembali mengenai <strong>${data.meetingName || "..."}</strong> yang akan berlangsung pada <strong>${data.meetingDate || "..."}</strong> pukul <strong>${data.meetingTime || "..."}</strong> bertempat di <strong>${data.location || "..."}</strong>.<br><br>
Kami mohon Bapak/Ibu hadir tepat waktu serta menyiapkan bahan dan data yang diperlukan terkait agenda tersebut.<br><br>
Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  {
    id: "meeting-reschedule",
    category: "meeting",
    name: "Pemberitahuan Perubahan Jadwal Rapat",
    fields: [
      { key: "meetingName", label: "Nama / Agenda Rapat" },
      { key: "previousSchedule", label: "Jadwal Semula" },
      { key: "newSchedule", label: "Jadwal Pengganti" },
      { key: "location", label: "Tempat / Tautan" },
    ],
    message: (data) => `
Yth. Bapak/Ibu,<br><br>
Dengan hormat, sehubungan dengan penyesuaian agenda, kami memberitahukan bahwa <strong>${data.meetingName || "..."}</strong> yang semula dijadwalkan pada <strong>${data.previousSchedule || "..."}</strong> DIUBAH menjadi <strong>${data.newSchedule || "..."}</strong>, bertempat di <strong>${data.location || "..."}</strong>.<br><br>
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
      { key: "assigneeName", label: "Nama Penerima Tugas" },
      { key: "taskName", label: "Nama Pekerjaan / Tugas" },
      { key: "description", label: "Deskripsi Singkat" },
      { key: "dueDate", label: "Tenggat Waktu" },
    ],
    message: (data) => `
Yth. <strong>${data.assigneeName || "..."}</strong>,<br><br>
Dengan hormat, Bapak/Ibu ditugaskan untuk menangani pekerjaan <strong>${data.taskName || "..."}</strong>.<br><br>
Uraian tugas: ${data.description || "..."}<br><br>
Pekerjaan tersebut kami mohon dapat diselesaikan dan dilaporkan selambat-lambatnya pada <strong>${data.dueDate || "..."}</strong>. Apabila terdapat kendala dalam pelaksanaannya, mohon segera dikomunikasikan kepada kami.<br><br>
Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },

  {
    id: "task-progress",
    category: "task",
    name: "Pembaruan Progres Pekerjaan",
    fields: [
      { key: "taskName", label: "Nama Pekerjaan / Tugas" },
      { key: "referenceNumber", label: "Nomor Referensi" },
      { key: "status", label: "Status Saat Ini" },
      { key: "progressPercent", label: "Persentase Penyelesaian" },
      { key: "notes", label: "Catatan / Kendala" },
    ],
    message: (data) => `
Yth. Bapak/Ibu,<br><br>
Dengan hormat, berikut kami sampaikan pembaruan atas pekerjaan <strong>${data.taskName || "..."}</strong> dengan Nomor Referensi <strong>${data.referenceNumber || "..."}</strong>.<br><br>
Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <strong>${data.status || "..."}</strong><br>
Progres&nbsp;&nbsp;&nbsp;&nbsp; : <strong>${data.progressPercent || "..."}%</strong><br>
Catatan&nbsp;&nbsp;&nbsp;&nbsp; : ${data.notes || "..."}<br><br>
Kami akan terus menyampaikan perkembangan berikutnya hingga pekerjaan selesai. Atas perhatiannya, kami ucapkan terima kasih.
`,
  },

  {
    id: "task-completed",
    category: "task",
    name: "Notifikasi Penyelesaian Pekerjaan",
    fields: [
      { key: "taskName", label: "Nama Pekerjaan / Tugas" },
      { key: "referenceNumber", label: "Nomor Referensi" },
      { key: "completedDate", label: "Tanggal Selesai" },
      { key: "resultNotes", label: "Catatan Hasil" },
    ],
    message: (data) => `
Yth. Bapak/Ibu,<br><br>
Dengan hormat, kami laporkan bahwa pekerjaan <strong>${data.taskName || "..."}</strong> dengan Nomor Referensi <strong>${data.referenceNumber || "..."}</strong> telah SELESAI dikerjakan pada <strong>${data.completedDate || "..."}</strong>.<br><br>
Catatan hasil: ${data.resultNotes || "..."}<br><br>
Kami mohon Bapak/Ibu berkenan melakukan pemeriksaan dan verifikasi atas hasil pekerjaan tersebut. Atas perhatian dan kerja samanya, kami ucapkan terima kasih.
`,
  },
];

/**
 * Diekspor sebagai module agar bisa di-import oleh js/render.js.
 * Struktur data di atas tidak berubah — baris ini hanya "pintu keluar".
 */
export { templates, templateCategories };
