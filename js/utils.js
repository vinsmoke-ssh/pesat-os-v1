/**
 * ==========================================================================
 * utils.js — Fungsi murni (pure functions)
 * ==========================================================================
 * Tidak menyentuh DOM, tidak menyimpan state. Menerima input, mengembalikan
 * output. Bagian paling mudah diuji dan dipakai ulang.
 * ==========================================================================
 */

/**
 * Ubah karakter berbahaya menjadi entity HTML. Dipakai pada SEMUA teks yang
 * berasal dari pengguna sebelum masuk ke `innerHTML`, supaya input seperti
 * `<img src=x onerror=...>` tampil sebagai teks biasa, bukan dieksekusi.
 *
 * Ini lapis pertahanan utama terhadap XSS (Cross-Site Scripting).
 *
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value = "") {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return String(value).replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Kumpulkan nilai seluruh kolom input menjadi objek `{ key: nilai }`.
 * Setiap nilai: dipangkas spasi, diubah huruf besar (gaya pesan operasional),
 * lalu di-escape sehingga aman dipakai di dalam `template.message()`.
 *
 * @param {NodeListOf<HTMLInputElement> | HTMLInputElement[]} inputs
 * @returns {Record<string, string>}
 */
export function collectFormData(inputs) {
  const data = {};
  inputs.forEach((input) => {
    const clean = input.value.trim().toUpperCase();
    data[input.name] = escapeHtml(clean);
  });
  return data;
}

/** Tag pemformatan teks yang boleh muncul di panel pratinjau. */
const ALLOWED_TAGS = new Set(["STRONG", "B", "EM", "I", "U", "BR"]);

/**
 * Bersihkan string HTML dengan pendekatan allowlist: hanya izinkan beberapa
 * tag pemformatan teks, buang SEMUA atribut (mis. `onerror`, `style`, `href`),
 * ubah elemen terlarang (`<script>`, `<img>`, `<iframe>`, ...) menjadi teksnya
 * saja, dan hapus komentar HTML.
 *
 * Dipakai sebagai lapis pertahanan terakhir sebelum menaruh hasil
 * `template.message()` ke `innerHTML` — melengkapi `escapeHtml()` yang sudah
 * membersihkan data dari pengguna.
 *
 * Memakai <template> sehingga konten di-parse TANPA dieksekusi/di-load
 * (script tidak jalan, gambar tidak request) selama proses pembersihan.
 *
 * @param {unknown} dirty
 * @returns {string} HTML yang sudah aman
 */
export function sanitizeHtml(dirty) {
  const holder = document.createElement("template");
  holder.innerHTML = String(dirty);

  const clean = (parent) => {
    [...parent.childNodes].forEach((node) => {
      if (node.nodeType === Node.COMMENT_NODE) {
        node.remove();
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;

      if (!ALLOWED_TAGS.has(node.tagName)) {
        node.replaceWith(document.createTextNode(node.textContent));
        return;
      }

      [...node.attributes].forEach((attr) => node.removeAttribute(attr.name));
      clean(node);
    });
  };

  clean(holder.content);
  return holder.innerHTML;
}
