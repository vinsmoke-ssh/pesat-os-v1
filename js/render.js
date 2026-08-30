/**
 * ==========================================================================
 * render.js — Menggambar data ke tampilan
 * ==========================================================================
 * Tanggung jawab: mengisi dropdown, membangun kolom input dinamis, dan
 * memperbarui preview pesan secara real-time.
 * ==========================================================================
 */

import { dom } from "./dom.js";
import { templates } from "./templates.js";
import { collectFormData, sanitizeHtml } from "./utils.js";
import { goToStep } from "./wizard.js";

/**
 * Template yang sedang dipilih. State lokal modul — TIDAK global,
 * jadi tidak bisa diubah sembarangan dari file lain.
 * @type {object | null}
 */
let activeTemplate = null;

/** @returns {object | null} template aktif saat ini (read-only dari luar). */
export function getActiveTemplate() {
  return activeTemplate;
}

/**
 * Isi elemen <select> dengan seluruh template dari data.
 */
export function renderTemplateDropdown() {
  const fragment = document.createDocumentFragment();

  templates.forEach((template) => {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = template.name;
    fragment.appendChild(option);
  });

  dom.templateSelect.appendChild(fragment);
}

/**
 * Bangun kolom input sesuai template terpilih.
 *
 * @param {string} templateId
 */
export function renderForm(templateId) {
  activeTemplate = templates.find((item) => item.id === templateId) || null;

  // Bersihkan tampilan lama.
  dom.formContainer.replaceChildren();
  dom.resultMessage.replaceChildren();

  // Template kosong / tidak ditemukan -> kembali ke langkah 1.
  if (!activeTemplate) {
    goToStep(1);
    return;
  }

  warnOnDuplicateKeys(activeTemplate.fields, activeTemplate.id);

  const fragment = document.createDocumentFragment();
  activeTemplate.fields.forEach((field) => {
    fragment.appendChild(createField(field));
  });
  dom.formContainer.appendChild(fragment);

  updateLivePreview();
}

/**
 * Peringatkan bila ada `key` ganda di dalam satu template.
 *
 * `key` dipakai sebagai atribut `name` sekaligus dasar id elemen
 * (`input-<key>`). Bila ada dua field dengan `key` sama, id DOM jadi bentrok
 * dan nilainya saling menimpa saat dikumpulkan `collectFormData()`. Fungsi ini
 * tidak menghentikan render — hanya memberi tahu penulis template lewat console.
 *
 * @param {{ key: string }[]} fields
 * @param {string} templateId
 */
function warnOnDuplicateKeys(fields, templateId) {
  const seen = new Set();
  const duplicates = new Set();

  fields.forEach(({ key }) => {
    if (seen.has(key)) duplicates.add(key);
    else seen.add(key);
  });

  if (duplicates.size > 0) {
    console.warn(
      `[PESAT] Template "${templateId}" memiliki key ganda: ` +
        `${[...duplicates].join(", ")}. Setiap key wajib unik dalam satu template.`,
    );
  }
}

/**
 * Buat satu blok <div.field-group> berisi <label> + <input>.
 *
 * Dibangun lewat DOM API (bukan string HTML) supaya `label`/`key` dari data
 * tidak bisa menyuntikkan markup. Id elemen memakai pola `input-<key>`, jadi
 * `key` HARUS unik dalam satu template — lihat `warnOnDuplicateKeys()`.
 *
 * @param {{ key: string, label: string }} field
 * @returns {HTMLDivElement}
 */
function createField(field) {
  const group = document.createElement("div");
  group.className = "field-group";

  const label = document.createElement("label");
  label.htmlFor = `input-${field.key}`;
  label.textContent = field.label;

  const input = document.createElement("input");
  input.type = "text";
  input.id = `input-${field.key}`;
  input.name = field.key;
  input.className = "dynamic-input";
  input.placeholder = `Masukkan ${field.label.toLowerCase()}...`;
  input.addEventListener("input", updateLivePreview);

  group.append(label, input);
  return group;
}

/**
 * Baca semua input, rakit pesan lewat `template.message()`, tampilkan di preview.
 *
 * Keamanan berlapis:
 *   1. `collectFormData()` sudah meng-escape seluruh nilai dari pengguna.
 *   2. `sanitizeHtml()` menyaring hasil akhir template — hanya tag pemformatan
 *      teks yang lolos, atribut & elemen berbahaya dibuang.
 */
export function updateLivePreview() {
  if (!activeTemplate) return;

  const inputs = dom.formContainer.querySelectorAll(".dynamic-input");
  const data = collectFormData(inputs);

  dom.resultMessage.innerHTML = sanitizeHtml(activeTemplate.message(data));
}
