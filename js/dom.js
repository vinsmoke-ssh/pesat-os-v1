/**
 * ==========================================================================
 * dom.js — Referensi elemen DOM
 * ==========================================================================
 * Semua `getElementById` dikumpulkan di sini. Kalau id pada index.html
 * berubah, cukup satu file ini yang perlu disesuaikan — bukan tersebar
 * di banyak tempat.
 * ==========================================================================
 */

/**
 * Ambil elemen berdasarkan id. Melempar error yang jelas bila elemen
 * tidak ada (biasanya karena id di HTML salah ketik atau ikut terhapus).
 *
 * @param {string} id
 * @returns {HTMLElement}
 */
export function requireElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`[PESAT] Elemen #${id} tidak ditemukan di halaman.`);
  }
  return element;
}

/** Kumpulan elemen yang dipakai di seluruh aplikasi. */
export const dom = {
  // Area utama
  templateSelect: requireElement("templateSelect"),
  formContainer: requireElement("formContainer"),
  resultMessage: requireElement("resultMessage"),
  copyBtn: requireElement("copyBtn"),
  toast: requireElement("toastNotification"),

  // Navigasi wizard
  stepContent1: requireElement("stepContent1"),
  stepContent2: requireElement("stepContent2"),
  stepIndicator1: requireElement("stepIndicator1"),
  stepIndicator2: requireElement("stepIndicator2"),
  nextBtn: requireElement("nextBtn"),
  prevBtn: requireElement("prevBtn"),
};
