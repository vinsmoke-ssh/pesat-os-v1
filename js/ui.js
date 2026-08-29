/**
 * ==========================================================================
 * SIPESAT - LOGIC & UI HANDLER
 * File ini berisi semua fungsi yang berkaitan dengan interaksi pengguna, seperti render dropdown, render form input dinamis, update preview pesan secara real-time, validasi input, navigasi wizard, dan fitur copy ke clipboard. Dengan memisahkan logika UI di file ini, kita menjaga struktur aplikasi tetap modular dan mudah dipelihara. Setiap fungsi memiliki tanggung jawab yang jelas, sehingga memudahkan pengembangan dan penambahan fitur baru di masa depan tanpa harus mengubah banyak kode di bagian lain aplikasi.
 * ==========================================================================
 */
const templateSelect = document.getElementById("templateSelect");
const formContainer = document.getElementById("formContainer");
const resultMessage = document.getElementById("resultMessage");
const copyBtn = document.getElementById("copyBtn");

// Wizard UI Selector
const stepContent1 = document.getElementById("stepContent1");
const stepContent2 = document.getElementById("stepContent2");
const stepIndicator1 = document.getElementById("stepIndicator1");
const stepIndicator2 = document.getElementById("stepIndicator2");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentActiveTemplate = null;

/**
 * Memunculkan Toast Notification Custom (Menggantikan Alert Browser)
 */
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  toast.textContent = message;

  toast.classList.add("show");

  // Sembunyikan otomatis setelah 2.5 detik
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/**
 * Render template di dropdown berdasarkan data dari js/templates.js
 */
function renderTemplateDropdown() {
  templates.forEach((template) => {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = template.name;
    templateSelect.appendChild(option);
  });
}

/**
 * Render form input berdasarkan template yang dipilih
 */
function renderForm(templateId) {
  const template = templates.find((item) => item.id === templateId);

  if (!template) {
    currentActiveTemplate = null;
    formContainer.innerHTML = "";
    resultMessage.innerHTML = "";
    goToStep(1);
    return;
  }

  currentActiveTemplate = template;
  let html = "";

  template.fields.forEach((field) => {
    html += `
      <div class="field-group">
        <label for="input-${field.key}">${field.label}</label>
        <input
          type="text"
          id="input-${field.key}"
          name="${field.key}"
          class="dynamic-input"
          placeholder="Masukkan ${field.label.toLowerCase()}..."
        >
      </div>
    `;
  });

  formContainer.innerHTML = html;
  bindInputEvent(template);
  updateLivePreview(template);
}

/**
 * Ambil data dari kolom input lalu perbarui teks preview
 */
function updateLivePreview(template) {
  const inputs = document.querySelectorAll(".dynamic-input");
  const data = {};

  inputs.forEach((field) => {
    data[field.name] = field.value.trim().toUpperCase();
  });

  resultMessage.innerHTML = template.message(data);
}

/**
 * Hubungkan event ketik ke elemen input baru
 */
function bindInputEvent(template) {
  const inputs = document.querySelectorAll(".dynamic-input");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      updateLivePreview(template);
    });
  });
}

/**
 * Fungsi Pengendali Navigasi Langkah Wizard (Step 1 atau 2)
 */
function goToStep(stepNumber) {
  if (stepNumber === 1) {
    stepContent1.classList.add("active");
    stepContent2.classList.remove("active");
    stepIndicator1.classList.add("active");
    stepIndicator2.classList.remove("active");
    prevBtn.disabled = true;
    nextBtn.textContent = "Lanjut";
  } else if (stepNumber === 2) {
    stepContent1.classList.remove("active");
    stepContent2.classList.add("active");
    stepIndicator1.classList.remove("active");
    stepIndicator2.classList.add("active");
    prevBtn.disabled = false;
    nextBtn.textContent = "Selesai";
  }
}

/**
 * Validasi Alur Pengisian Form sebelum berpindah step
 */
function validateAndProceed() {
  if (stepContent1.classList.contains("active")) {
    if (!templateSelect.value) {
      showToast("⚠️ Silakan pilih template terlebih dahulu!");
      templateSelect.focus();
      return;
    }
    goToStep(2);
  } else if (stepContent2.classList.contains("active")) {
    const inputs = document.querySelectorAll(".dynamic-input");
    let allFilled = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = "#ef4444";
      } else {
        input.style.borderColor = "#cbd5e1";
      }
    });

    if (!allFilled) {
      showToast("⚠️ Mohon lengkapi semua data input.");
      return;
    }

    showToast("🎉 Data selesai diisi! Silakan salin pesan.");
  }
}

/**
 * Fitur Menyalin Teks Kaya (Rich Text Bold HTML) ke Clipboard Whatsapp/Email
 */
copyBtn.addEventListener("click", async () => {
  const plainText = resultMessage.innerText.trim();

  if (!templateSelect.value) {
    showToast("⚠️ Silakan pilih template terlebih dahulu.");
    return;
  }

  if (!plainText) {
    showToast("⚠️ Pesan kosong, tidak ada data untuk disalin.");
    return;
  }

  try {
    const html = resultMessage.innerHTML;
    const clipboardItem = new ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([plainText], { type: "text/plain" }),
    });

    await navigator.clipboard.write([clipboardItem]);
    showToast("📋 Pesan berhasil disalin!");
  } catch (error) {
    await navigator.clipboard.writeText(plainText);
    showToast("📋 Pesan disalin (Format Teks Biasa).");
  }
});
