/**
 * ==========================================================================
 * toast.js — Notifikasi toast
 * ==========================================================================
 * Pengganti `alert()` bawaan browser: pesan singkat yang muncul lalu hilang
 * sendiri.
 * ==========================================================================
 */

import { dom } from "./dom.js";

/** Timer penyembunyi yang sedang berjalan (kalau ada). */
let hideTimer = null;

/**
 * Tampilkan pesan toast selama ~2,5 detik.
 * Kalau dipanggil beruntun, timer lama dibatalkan supaya durasi tetap penuh.
 *
 * @param {string} message
 */
export function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("show");

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    dom.toast.classList.remove("show");
  }, 2500);
}
