# PESAT

PESAT adalah alat untuk membuat pesan operasional dari template dan menyalinnya ke WhatsApp, email, atau aplikasi lain.

Dibuat dengan HTML, CSS, dan JavaScript murni. Tidak menggunakan framework, build process, atau dependency aplikasi.

Repo: https://github.com/vinsmoke-ssh/pesat-os-v1
Lisensi: [MIT](LICENSE)

---

## Fitur

- Wizard 2 langkah: pilih template → isi data.
- Form dinamis sesuai template yang dipilih.
- Preview pesan secara real-time.
- Menyalin pesan dengan format HTML, termasuk teks **tebal**.
- Otomatis menggunakan teks biasa jika aplikasi tujuan tidak mendukung HTML.
- Template dipisahkan dari logika aplikasi melalui `js/templates.js`.

---

## Teknologi

| Bagian | Teknologi |
|---|---|
| Struktur | HTML5 |
| Tampilan | CSS3, Flexbox, Grid |
| Logika | JavaScript ES Modules (ES6+) |
| Font | Inter dari Google Fonts |
| Build | Tidak ada |

Aplikasi membutuhkan browser modern karena menggunakan Clipboard API.

---

## Struktur Project

```text
pesat-os-v1/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── templates_example.js
│   ├── templates.js
│   ├── config.js
│   ├── branding.js
│   ├── app.js
│   ├── dom.js
│   ├── utils.js
│   ├── toast.js
│   ├── render.js
│   ├── wizard.js
│   └── clipboard.js
├── .editorconfig
├── .gitignore
├── package.json
├── LICENSE
├── CONTRIBUTING.md
└── README.md
```

### Fungsi File JavaScript

| File                   | Fungsi                                                        |
| ---------------------- | ------------------------------------------------------------- |
| `app.js`               | Entry point dan pemasangan event listener                     |
| `dom.js`               | Menyimpan referensi elemen DOM                                |
| `templates.js`         | Template pesan yang digunakan aplikasi                        |
| `templates_example.js` | Contoh template untuk referensi                               |
| `config.js`            | Konfigurasi branding aplikasi                                 |
| `branding.js`          | Menerapkan konfigurasi branding ke UI                         |
| `utils.js`             | Fungsi bantuan seperti `escapeHtml()` dan `collectFormData()` |
| `toast.js`             | Menampilkan notifikasi                                        |
| `render.js`            | Merender dropdown, form, dan preview                          |
| `wizard.js`            | Navigasi dan validasi langkah                                 |
| `clipboard.js`         | Menangani fitur salin pesan                                   |

Alur utama aplikasi:

```text
app.js
 ├── render.js
 ├── wizard.js
 └── clipboard.js
       ↓
    dom.js
    utils.js
    toast.js
    templates.js
```

Setiap modul menggunakan `import` dan `export`. Tidak menggunakan variabel global untuk komunikasi antar-modul.

### Branding

Untuk mengganti branding aplikasi, edit:

```text
js/config.js
```

File tersebut berisi konfigurasi seperti nama aplikasi, tagline, versi, organisasi, tahun, dan ikon.

`branding.js` kemudian menerapkan konfigurasi tersebut ke elemen HTML yang menggunakan atribut `data-brand`.

### Keamanan

Input pengguna diproses menggunakan beberapa lapisan:

1. Nilai input di-escape melalui `escapeHtml()`.
2. Hasil template disaring oleh `sanitizeHtml()`.
3. Elemen form dibuat menggunakan `document.createElement()`.

Tujuannya untuk mengurangi risiko HTML atau JavaScript berbahaya masuk ke halaman melalui input pengguna.

### Mengapa Ada Dua File Template?

Terdapat dua file template:

* `js/templates_example.js`

  * Berisi template contoh.
  * Dilacak Git.
  * Digunakan sebagai acuan saat membuat `templates.js`.

* `js/templates.js`

  * Berisi template internal yang digunakan aplikasi.
  * Di-ignore oleh Git agar template internal tidak ikut ter-commit.

Struktur kedua file harus sama. Yang berbeda hanya isi datanya.

---

## Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone https://github.com/vinsmoke-ssh/pesat-os-v1.git
cd pesat-os-v1
```

### 2. Buat `templates.js`

File `js/templates.js` tidak tersedia di repository. Buat dari file contoh:

**Windows:**

```bash
copy js\templates_example.js js\templates.js
```

**macOS / Linux:**

```bash
cp js/templates_example.js js/templates.js
```

### 3. Jalankan Server Lokal

Karena aplikasi menggunakan ES Modules, jangan membuka `index.html` langsung dengan `file://`.

Gunakan salah satu cara berikut:

**VS Code + Live Server**

Klik kanan `index.html` → `Open with Live Server`.

**Laragon**

Letakkan project di folder `www`, lalu akses melalui domain lokal Laragon.

**Python**

Jalankan dari folder project:

```bash
python -m http.server
```

Kemudian buka:

```text
http://localhost:8000
```

---

## Pengembangan (Dev Tools)

Opsional — hanya untuk kontributor yang ingin menjaga konsistensi kode.
Aplikasi tetap berjalan tanpa langkah ini.

```bash
npm install          # memasang Prettier + server statis (devDependencies)
npm run serve        # menjalankan server statis lokal
npm run format       # merapikan seluruh berkas dengan Prettier
npm run format:check # memeriksa format tanpa mengubah berkas
```

Konfigurasi Prettier ada di `package.json`. Berkas `.editorconfig` menjaga
indentasi, charset, dan akhir baris tetap seragam di berbagai editor.

---

## Menambah atau Mengubah Template

Template berada di dalam array `templates` pada:

```text
js/templates.js
```

Contoh:

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
Teks pesan dengan <strong>${data.fieldName || "..."}</strong>.<br><br>
Gunakan <br> untuk membuat baris baru.
`,
}
```

### Aturan

1. `id` harus unik antar template; `key` harus unik di dalam satu template.
2. Setiap `key` yang digunakan di `message` harus terdaftar di `fields`.
3. Gunakan nilai cadangan seperti `|| "..."` agar preview tidak menampilkan `undefined`.
4. `id` dan `key` memakai bahasa Inggris; `name`, `label`, dan isi `message` memakai bahasa Indonesia.
5. Struktur `templates.js` harus mengikuti struktur `templates_example.js`.

Panduan lengkap mengenai pembuatan template terdapat di [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Kontribusi

Untuk menambahkan template, memperbaiki bug, atau mengusulkan fitur, baca [CONTRIBUTING.md](CONTRIBUTING.md) terlebih dahulu.

Laporan bug dan usulan fitur dapat dibuat melalui [GitHub Issues](https://github.com/vinsmoke-ssh/pesat-os-v1/issues).

---

## Lisensi

PESAT dirilis di bawah lisensi [MIT](LICENSE).

© 2026 vinsmoke-ssh
