/**
 * ==========================================================================
 * clipboard.js — Fitur "Salin Pesan"
 * ==========================================================================
 * Mencoba menyalin sebagai teks kaya (HTML, supaya cetak tebal ikut terbawa
 * ke WhatsApp/email), lalu jatuh ke teks biasa bila tidak didukung.
 * ==========================================================================
 */

import { dom } from "./dom.js";
import { showToast } from "./toast.js";

/**
 * Salin isi panel preview ke clipboard.
 */
export async function copyMessage() {
  if (!dom.templateSelect.value) {
    showToast("Silakan pilih template terlebih dahulu.");
    return;
  }

  const plainText = dom.resultMessage.innerText.trim();
  if (!plainText) {
    showToast("Pesan kosong, tidak ada data untuk disalin.");
    return;
  }

  if (!navigator.clipboard) {
    showToast("Browser tidak mendukung penyalinan otomatis.");
    return;
  }

  // 1) Coba format kaya: HTML + teks biasa sekaligus.
  if (typeof ClipboardItem !== "undefined" && navigator.clipboard.write) {
    try {
      const item = new ClipboardItem({
        "text/html": new Blob([dom.resultMessage.innerHTML], {
          type: "text/html",
        }),
        "text/plain": new Blob([plainText], { type: "text/plain" }),
      });
      await navigator.clipboard.write([item]);
      showToast("Pesan berhasil disalin.");
      return;
    } catch (error) {
      console.warn("[PESAT] Gagal menyalin format kaya, coba teks biasa.", error);
    }
  }

  // 2) Fallback: teks biasa saja.
  try {
    await navigator.clipboard.writeText(plainText);
    showToast("Pesan disalin (format teks biasa).");
  } catch (error) {
    console.error("[PESAT] Gagal menyalin ke clipboard.", error);
    showToast("Gagal menyalin. Silakan salin manual.");
  }
}
