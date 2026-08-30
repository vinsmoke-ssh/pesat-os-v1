
# Panduan Kontribusi - PESAT

Dokumen ini menjelaskan cara menyiapkan project, menambah template, melakukan perubahan kode, dan membuat Pull Request.

Kontribusi yang diharapkan:
- Template pesan baru yang berguna untuk umum.
- Perbaikan bug.
- Perbaikan dokumentasi.

---

## 1. Prasyarat

Yang dibutuhkan:

- Browser modern seperti Chrome, Edge, atau Firefox.
- Editor kode, disarankan VS Code.
- Git.

Tidak membutuhkan Node.js, npm, atau build tool karena PESAT merupakan project statis.

---

## 2. Menyiapkan Project

Clone repository dari fork kamu:

```bash
git clone https://github.com/<username-kamu>/pesat-os-v1.git
cd pesat-os-v1
````

Buat `templates.js` dari file contoh:

**Windows:**

```bash
copy js\templates_example.js js\templates.js
```

**macOS / Linux:**

```bash
cp js/templates_example.js js/templates.js
```

Kemudian jalankan aplikasi melalui server lokal, misalnya:

* Live Server di VS Code.
* Laragon.
* Python HTTP Server:

```bash
python -m http.server
```

Aplikasi tidak dapat dijalankan dengan membuka `index.html` langsung melalui `file://` karena menggunakan ES Modules.

---

## 3. File yang Dapat Diubah

| File                      | Status | Keterangan                                      |
| ------------------------- | ------ | ----------------------------------------------- |
| `js/templates_example.js` | Boleh  | Menambah atau mengubah template untuk publik.   |
| `js/templates.js`         | Lokal  | File kerja lokal dan di-ignore Git.             |
| `js/*.js`                 | Boleh  | Perbaikan bug atau fitur pada modul JavaScript. |
| `css/style.css`           | Boleh  | Perubahan tampilan.                             |
| `index.html`              | Boleh  | Perubahan struktur HTML atau tampilan.          |

### Penting

Template yang akan dibagikan ke publik harus ditambahkan ke:

```text
js/templates_example.js
```

Jangan memasukkan data internal atau rahasia ke file yang di-commit, seperti:

* Nama orang sebenarnya.
* NIK.
* Nomor rekening.
* Nomor telepon.
* Data pelanggan.
* Data internal lainnya.

`js/templates.js` hanya digunakan untuk data lokal dan tidak boleh diandalkan sebagai tempat penyimpanan rahasia yang aman.

---

## 4. Menambah Template

Template berada di dalam array `templates` pada:

```text
js/templates_example.js
```

### Struktur Template

```js
{
  id: "unique-id",
  category: "confirmation",
  name: "Nama Template",
  fields: [
    {
      key: "fieldName",
      label: "Nama Field"
    }
  ],
  message: (data) => `
Isi pesan dengan <strong>${data.fieldName || "..."}</strong>.<br><br>
Gunakan <br> untuk membuat baris baru.
`,
}
```

`id` dan `key` memakai bahasa Inggris; `name`, `label`, dan isi `message`
memakai bahasa Indonesia karena tampil ke pengguna.

### Kategori

Kategori tersedia di `templateCategories`:

| Key            | Penggunaan                            |
| -------------- | ------------------------------------- |
| `announcement` | Pengumuman atau informasi satu arah.  |
| `confirmation` | Konfirmasi atau follow-up proses.     |
| `meeting`      | Undangan atau pengingat rapat.        |
| `task`         | Informasi status pekerjaan atau task. |

Jika membutuhkan kategori baru, tambahkan terlebih dahulu ke `templateCategories` dan jelaskan alasannya di Pull Request.

### Aturan Template

1. `id` harus unik antar template.
2. `key` harus unik di dalam satu template (dipakai sebagai id elemen `input-<key>` dan atribut `name`).
3. Setiap `data.xxx` yang digunakan di `message` harus memiliki `key: "xxx"` di `fields`.
4. Gunakan fallback seperti `${data.xxx || "..."}` agar preview tidak menampilkan `undefined`.
5. Gunakan bahasa yang sopan dan profesional.
6. Gunakan hanya `<strong>` dan `<br>` dalam isi `message`.
7. Jangan memasukkan data pribadi atau data internal.

### Pengujian

Setelah mengubah `templates_example.js`, salin kembali ke file lokal:

**Windows:**

```bash
copy js\templates_example.js js\templates.js
```

**macOS / Linux:**

```bash
cp js/templates_example.js js/templates.js
```

Kemudian lakukan hard refresh dengan `Ctrl + Shift + R`.

Pastikan:

* Template muncul di dropdown.
* Semua field input muncul.
* Preview berubah ketika input diisi.
* Tombol **Salin Pesan** menghasilkan pesan yang benar.
* Hasil salinan tetap sesuai ketika ditempel ke WhatsApp atau email.

---

## 5. Aturan Penulisan Kode

Ikuti aturan berikut:

* Gunakan indentasi 2 spasi (lihat `.editorconfig`).
* Jalankan `npm run format` sebelum commit (Prettier; konfigurasi ada di `package.json`).
* Nama variabel, fungsi, `id`, dan `key` memakai bahasa Inggris `camelCase`
  (mis. `debtorName`, `referenceNumber`). Bahasa Indonesia hanya untuk teks
  yang tampil ke pengguna (`name`, `label`, isi `message`, string UI).
* Gunakan urutan properti template:
  `id`, `category`, `name`, `fields`, `message`.
* Ikuti pola komentar kategori yang sudah ada.
* Pisahkan paragraf `message` pada bagian `<br><br>` agar mudah dibaca.
* Satu modul harus memiliki satu tanggung jawab utama.
* Gunakan `import` / `export` untuk komunikasi antar-modul.
* Jangan membuat variabel global.

### Keamanan

Jika menangani input pengguna:

* Gunakan `escapeHtml()` sebelum data dimasukkan ke `innerHTML`.
* Untuk membuat elemen HTML, utamakan `document.createElement()` dan `textContent`.
* Jangan memasukkan input pengguna langsung ke HTML tanpa proses sanitasi.

---

## 6. Pull Request

Buat branch dari `main`:

```bash
git checkout -b feat/template-undangan-training
```

Lakukan perubahan, lalu commit:

```bash
git add js/templates_example.js
git commit -m "feat(template): tambah template undangan training"
```

Push branch:

```bash
git push origin feat/template-undangan-training
```

Kemudian buat Pull Request dari branch tersebut ke:

```text
vinsmoke-ssh/pesat-os-v1:main
```

### Format Commit

Gunakan format berikut jika memungkinkan:

```text
feat(template): tambah template undangan training
fix(ui): perbaiki validasi step 2
docs(readme): perjelas cara setup
```

### Isi Pull Request

Sertakan:

* Ringkasan perubahan.
* Screenshot jika menambah atau mengubah template.
* Alasan dan penjelasan jika menambahkan kategori baru.

---

## 7. Melaporkan Bug atau Mengusulkan Fitur

Buat Issue di repository:

[https://github.com/vinsmoke-ssh/pesat-os-v1/issues](https://github.com/vinsmoke-ssh/pesat-os-v1/issues)

Sertakan:

* Langkah untuk memunculkan masalah.
* Hasil yang diharapkan.
* Hasil yang terjadi.
* Browser dan versinya.
