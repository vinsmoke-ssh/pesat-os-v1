/**
 * ==========================================================================
 * wizard.js — Navigasi & validasi langkah
 * ==========================================================================
 * Mengatur perpindahan tampilan antara Langkah 1 (pilih template) dan
 * Langkah 2 (isi data), termasuk pengecekan isian sebelum lanjut.
 * ==========================================================================
 */

import { dom } from "./dom.js";
import { showToast } from "./toast.js";

/**
 * Pindah tampilan wizard ke langkah tertentu.
 *
 * @param {1 | 2} step
 */
export function goToStep(step) {
  const onStep2 = step === 2;

  dom.stepContent1.classList.toggle("active", !onStep2);
  dom.stepContent2.classList.toggle("active", onStep2);
  dom.stepIndicator1.classList.toggle("active", !onStep2);
  dom.stepIndicator2.classList.toggle("active", onStep2);

  dom.prevBtn.disabled = !onStep2;
  dom.nextBtn.textContent = onStep2 ? "Selesai" : "Lanjut";
}

/**
 * Validasi langkah yang sedang aktif, lalu lanjut bila lolos.
 * - Langkah 1: template wajib dipilih.
 * - Langkah 2: semua kolom wajib terisi (kolom kosong ditandai merah).
 */
export function validateAndProceed() {
  // --- Langkah 1 -----------------------------------------------------------
  if (dom.stepContent1.classList.contains("active")) {
    if (!dom.templateSelect.value) {
      showToast("Silakan pilih template terlebih dahulu.");
      dom.templateSelect.focus();
      return;
    }
    goToStep(2);
    return;
  }

  // --- Langkah 2 -----------------------------------------------------------
  const inputs = [...dom.formContainer.querySelectorAll(".dynamic-input")];
  let allFilled = true;

  inputs.forEach((input) => {
    const isEmpty = !input.value.trim();
    input.classList.toggle("input-error", isEmpty);
    if (isEmpty) allFilled = false;
  });

  if (!allFilled) {
    showToast("Mohon lengkapi semua data input.");
    return;
  }

  showToast("Data selesai diisi. Silakan salin pesan.");
}
