/**
 * ==========================================================================
 * config.js — Konfigurasi Branding
 * ==========================================================================
 * SATU-SATUNYA file yang perlu diubah untuk mengganti identitas aplikasi
 * (nama, tagline, versi, organisasi, ikon). Tidak ada logika di sini —
 * hanya nilai.
 *
 * `brandIcon` diisi salah satu id <symbol> yang tersedia di sprite SVG
 * pada index.html, contoh: "icon-send", "icon-mail", "icon-message".
 * ==========================================================================
 */

export const brandConfig = {
  /** Nama pendek aplikasi (dipakai di logo & <title>). */
  appName: "PESAT",

  /** Kepanjangan / tagline di bawah nama. */
  appTagline: "Mengoptimalkan Efisiensi Komunikasi Bisnis",

  /** Label versi pada chip kanan atas. */
  appVersion: "v1.0.0",

  /** Label mode / lingkup pemakaian. */
  appMode: "Internal Use Only",

  /** Teks status sistem. */
  statusLabel: "Aktif",

  /** Nama organisasi / pemilik (dipakai di footer). */
  orgName: "Vinsmoke App",

  /** Keterangan singkat di footer kiri. */
  footerNote: "Internal Operational Tool",

  /** Tahun hak cipta di footer. */
  copyrightYear: "2026",

  /** Id <symbol> SVG untuk ikon merek (lihat sprite di index.html). */
  brandIcon: "icon-send",
};
