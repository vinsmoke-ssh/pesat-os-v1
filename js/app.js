/**
 * ==========================================================================
 * SIPESAT - APP INITIALIZER (MAIN ENTRY POINT)
 * ==========================================================================
 */

// Inisialisasi dropdown di awal buka aplikasi
renderTemplateDropdown();

// Deteksi perubahan template
templateSelect.addEventListener("change", (event) => {
  renderForm(event.target.value);
});

// Deteksi klik Lanjut / Selesai
nextBtn.addEventListener("click", () => {
  validateAndProceed();
});

// Deteksi klik Kembali
prevBtn.addEventListener("click", () => {
  goToStep(1);
});
