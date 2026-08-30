/**
 * ==========================================================================
 * branding.js — Menerapkan konfigurasi branding ke tampilan
 * ==========================================================================
 * Modul VIEW (bukan logika aplikasi). Membaca `brandConfig` lalu mengisi
 * teks & ikon pada elemen yang menandai dirinya dengan atribut
 * `data-brand="..."`. Dimuat terpisah di index.html:
 *
 *   <script type="module" src="js/branding.js"></script>
 *
 * Kalau elemen target tidak ada, fungsi diam saja (tidak error) sehingga
 * markup default di HTML tetap tampil.
 * ==========================================================================
 */

import { brandConfig } from "./config.js";

/**
 * Set teks elemen ber-atribut `data-brand="<key>"`.
 * @param {string} key
 * @param {string} value
 */
function setBrandText(key, value) {
  document.querySelectorAll(`[data-brand="${key}"]`).forEach((el) => {
    el.textContent = value;
  });
}

export function applyBranding() {
  const c = brandConfig;

  document.title = `${c.appName} | ${c.appTagline}`;

  setBrandText("name", c.appName);
  setBrandText("tagline", c.appTagline);
  setBrandText("version", c.appVersion);
  setBrandText("status", c.statusLabel);
  setBrandText("mode", c.appMode);
  setBrandText("footer-left", `${c.appName} ${c.appVersion} · ${c.footerNote}`);
  setBrandText(
    "footer-right",
    `© ${c.copyrightYear} ${c.orgName}. All rights reserved.`,
  );

  // Tukar ikon merek pada <use href="#...">.
  document
    .querySelectorAll('[data-brand="icon"] use')
    .forEach((use) => use.setAttribute("href", `#${c.brandIcon}`));
}

applyBranding();
