/**
 * ==========================================================================
 * app.js — Entry point (titik masuk aplikasi)
 * ==========================================================================
 * Tidak berisi logika. Tugasnya hanya menghubungkan aksi pengguna
 * (pilih, klik) ke fungsi yang sudah disiapkan tiap modul.
 *
 * Dimuat di index.html sebagai module:
 *   <script type="module" src="js/app.js"></script>
 * ==========================================================================
 */

import { dom } from "./dom.js";
import { renderTemplateDropdown, renderForm } from "./render.js";
import { goToStep, validateAndProceed } from "./wizard.js";
import { copyMessage } from "./clipboard.js";

function init() {
  // Isi dropdown saat aplikasi pertama dibuka.
  renderTemplateDropdown();

  // Pilih template -> bangun ulang form.
  dom.templateSelect.addEventListener("change", (event) => {
    renderForm(event.target.value);
  });

  // Navigasi wizard.
  dom.nextBtn.addEventListener("click", validateAndProceed);
  dom.prevBtn.addEventListener("click", () => goToStep(1));

  // Salin pesan.
  dom.copyBtn.addEventListener("click", copyMessage);
}

init();
