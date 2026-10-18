/**
 * LMS EduDigital SD: Backend (Code.gs)
 * Container-bound script. Buka Spreadsheet > Ekstensi > Apps Script, lalu tempel file ini.
 * Frontend (Index.html) memanggil apiCall(token, action, payload) lewat google.script.run.
 */

const APP_TITLE = 'LMS EduDigital SD';
const SESSION_DAYS = 30;
const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const FOTO_FOLDER_NAME = 'LMS_Foto_Tugas';
// TAMBAHAN: Folder untuk gambar soal
const GAMBAR_SOAL_FOLDER_NAME = 'LMS_Gambar_Soal';

// Skema sheet. Kolom harus sama persis dengan header di baris pertama setiap sheet.
const SCHEMA = {
  Users: ['id', 'username', 'password', 'nama', 'role', 'status', 'dibuat_pada'],
  Kelas: ['id', 'nama_kelas', 'kode_kelas', 'guru_id', 'tahun_ajaran'],
  Anggota_Kelas: ['id', 'kelas_id', 'siswa_id'],
  Materi: ['id', 'kelas_id', 'judul', 'deskripsi', 'tautan', 'dibuat_oleh', 'dibuat_pada', 'bab', 'urutan', 'jenis', 'file_id', 'nama_file', 'mime', 'ukuran'],
  Tugas: ['id', 'kelas_id', 'judul', 'deskripsi', 'batas_waktu', 'nilai_maksimal', 'dibuat_oleh', 'dibuat_pada'],
  Pengumpulan: ['id', 'tugas_id', 'siswa_id', 'jawaban', 'tautan', 'foto_ids', 'waktu_kumpul', 'nilai', 'feedback', 'status'],
  Kuis: ['id', 'kelas_id', 'judul', 'jenis_ujian', 'durasi_menit', 'waktu_mulai', 'waktu_selesai', 'acak_soal', 'acak_opsi', 'token_ujian', 'tampilkan_nilai', 'tampilkan_pembahasan', 'dibuat_oleh', 'dibuat_pada'],
  Soal: ['id', 'kuis_id', 'pertanyaan', 'gambar_id', 'opsi_a', 'opsi_b', 'opsi_c', 'opsi_d', 'opsi_e', 'jawaban_benar', 'bobot', 'pembahasan'],
  Jawaban_Kuis: ['id', 'kuis_id', 'siswa_id', 'skor', 'waktu_mulai', 'waktu_selesai', 'status', 'jawaban', 'draft_jawaban'],
  Pengumuman: ['id', 'kelas_id', 'judul', 'isi', 'dibuat_oleh', 'dibuat_pada'],
  Sesi: ['token', 'user_id', 'dibuat_pada', 'kedaluwarsa'],
  // ================= TAMBAHAN PENGEMBANGAN =================
  Bank_Soal: ['id', 'mapel', 'kelas', 'bab', 'jenis_soal', 'pertanyaan', 'gambar_id', 'opsi_a', 'opsi_b', 'opsi_c', 'opsi_d', 'opsi_e', 'jawaban_benar', 'bobot', 'pembahasan', 'tingkat_kesulitan', 'dibuat_oleh', 'dibuat_pada'],
  Paket_Ujian: ['id', 'kelas_id', 'judul', 'jenis_ujian', 'durasi_menit', 'waktu_mulai', 'waktu_selesai', 'soal_ids', 'dibuat_oleh', 'dibuat_pada'],
  Jawaban_Paket_Ujian: ['id', 'paket_id', 'siswa_id', 'skor', 'waktu_mulai', 'waktu_selesai', 'status', 'jawaban', 'draft_jawaban']
};

// Cache data per eksekusi agar sheet tidak dibaca berulang (menghemat kuota GAS).
let CACHE = {};

/* ===================== WEB APP ===================== */

function doGet(e) {
  if (e && e.parameter && e.parameter.action) {
    const token = e.parameter.token || '';
    const action = e.parameter.action;
    let payload = {};
    if (e.parameter.payload) {
      try { payload = JSON.parse(e.parameter.payload); } catch (err) {}
    }
    const res = apiCall(token, action, payload);
    return ContentService.createTextOutput(JSON.stringify(res))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle(APP_TITLE);
}

// Endpoint HTTP POST untuk frontend yang di-hosting di Vercel / GitHub
function doPost(e) {
  let body = {};
  try {
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      body = e.parameter;
      if (typeof body.payload === 'string') {
        try { body.payload = JSON.parse(body.payload); } catch (err) {}
      }
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'Format data request tidak valid: ' + err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const token = body.token || '';
  const action = body.action || '';
  const payload = body.payload || {};

  const res = apiCall(token, action, payload);
  return ContentService.createTextOutput(JSON.stringify(res))
    .setMimeType(ContentService.MimeType.JSON);
}

// Dipanggil dari Index.html lewat <?!= include('NamaFile'); ?> untuk menyisipkan Stylesheet.html dan Javascript.html.
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/* ===================== UTILITAS DASAR ===================== */

let DB_INSTANCE = null;
function db() {
  if (!DB_INSTANCE) DB_INSTANCE = SpreadsheetApp.getActiveSpreadsheet();
  return DB_INSTANCE;
}
function nowIso() { return new Date().toISOString(); }
function uid() { return Utilities.getUuid().replace(/-/g, '').slice(0, 12); }
function hashPw(p) {
  return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, 'edu2026|' + String(p)));
}
function randomPw() {
  const c = 'abcdefghjkmnpqrstuvwxyz23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += c.charAt(Math.floor(Math.random() * c.length));
  return s;
}
function norm(v) {
  if (v instanceof Date) return isNaN(v.getTime()) ? '' : v.toISOString();
  return (v === null || v === undefined) ? '' : v;
}

function table(name) {
  if (CACHE[name]) return CACHE[name];
  const sh = db().getSheetByName(name);
  if (!sh) throw new Error('Sheet "' + name + '" belum ada. Jalankan setupDatabase() terlebih dahulu.');

  // Cache efisien (Format 2D ringkas hemat memori, muat hingga 1.000 baris di CacheService 100KB limit)
  const cache = CacheService.getScriptCache();
  const cacheKey = 'LMS_TABLE_V3_' + name;
  let cached = null;
  try {
    const raw = cache.get(cacheKey);
    if (raw) cached = JSON.parse(raw);
  } catch (e) { cached = null; }

  if (cached && cached.headers && cached.rows2D) {
    const headers = cached.headers;
    const rows = cached.rows2D.map(r => {
      const o = { _row: r[0] };
      for (let j = 0; j < headers.length; j++) o[headers[j]] = r[j + 1];
      return o;
    });
    CACHE[name] = { sh: sh, headers: headers, rows: rows };
    return CACHE[name];
  }

  // 1 kali pemanggilan getDataRange (jauh lebih cepat daripada memanggil getLastRow, getLastColumn, dan getRange berulang kali)
  const range = sh.getDataRange();
  const values = range.getValues();
  if (!values || !values.length) throw new Error('Sheet "' + name + '" belum memiliki header.');
  
  const headers = values[0].map(String);
  const rows = [];
  const rows2D = [];
  for (let i = 1; i < values.length; i++) {
    const r = values[i];
    if (r.every(c => c === '' || c === null)) continue;
    const rowNum = i + 1;
    const o = { _row: rowNum };
    const rowArr = [rowNum];
    for (let j = 0; j < headers.length; j++) {
      const val = norm(r[j]);
      o[headers[j]] = val;
      rowArr.push(val);
    }
    rows.push(o);
    rows2D.push(rowArr);
  }

  CACHE[name] = { sh: sh, headers: headers, rows: rows };
  try {
    const payload = JSON.stringify({ headers: headers, rows2D: rows2D });
    if (payload.length < 98000) cache.put(cacheKey, payload, 1800); // 30 menit
  } catch (e) { /* Abaikan error cache */ }
  return CACHE[name];
}

function invalidateTableCache_(name) {
  delete CACHE[name];
  try { CacheService.getScriptCache().remove('LMS_TABLE_V3_' + name); } catch (e) {}
}

// Tambah atau perbarui baris tunggal berdasarkan kunci (default: id).
function upsert(name, obj, key) {
  const k = key || 'id';
  const t = table(name);
  const cur = t.rows.find(r => r[k] === obj[k]);
  if (cur) {
    Object.keys(obj).forEach(f => {
      if (f !== '_row' && t.headers.indexOf(f) >= 0) cur[f] = obj[f];
    });
    t.sh.getRange(cur._row, 1, 1, t.headers.length)
      .setValues([t.headers.map(h => (cur[h] === undefined || cur[h] === null) ? '' : cur[h])]);
    invalidateTableCache_(name);
    return cur;
  }
  t.sh.appendRow(t.headers.map(h => (obj[h] === undefined || obj[h] === null) ? '' : obj[h]));
  invalidateTableCache_(name);
  return obj;
}

// Batch Insert: Menyimpan banyak baris sekaligus dalam 1 kali tembak (100x lebih cepat daripada looping appendRow)
function insertRows(name, objects) {
  if (!objects || !objects.length) return [];
  const t = table(name);
  const rows2D = objects.map(obj => {
    return t.headers.map(h => (obj[h] === undefined || obj[h] === null) ? '' : obj[h]);
  });
  const startRow = t.sh.getLastRow() + 1;
  t.sh.getRange(startRow, 1, rows2D.length, t.headers.length).setValues(rows2D);
  invalidateTableCache_(name);
  return objects;
}

function removeWhere(name, pred) {
  const t = table(name);
  t.rows.filter(pred)
    .sort((a, b) => b._row - a._row)
    .forEach(r => t.sh.deleteRow(r._row));
  invalidateTableCache_(name);
}

function photoFolder() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('FOTO_FOLDER_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) { /* folder dihapus, buat ulang */ }
  }
  const f = DriveApp.createFolder(FOTO_FOLDER_NAME);
  props.setProperty('FOTO_FOLDER_ID', f.getId());
  return f;
}

// TAMBAHAN: Fungsi utilitas folder khusus gambar soal
function gambarSoalFolder() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('GAMBAR_SOAL_FOLDER_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) { /* folder dihapus, buat ulang */ }
  }
  const f = DriveApp.createFolder(GAMBAR_SOAL_FOLDER_NAME);
  props.setProperty('GAMBAR_SOAL_FOLDER_ID', f.getId());
  return f;
}

/* ===================== SETUP DATABASE ===================== */

// Jalankan fungsi ini sekali dari Apps Script editor (Run > setupDatabase).
function setupDatabase() {
  CACHE = {};
  try { CacheService.getScriptCache().removeAll(Object.keys(SCHEMA).map(n => 'LMS_TABLE_V2_' + n)); } catch (e) {}
  const ss = db();
  Object.keys(SCHEMA).forEach(name => {
    const sh = ss.getSheetByName(name) || ss.insertSheet(name);
    if (sh.getLastRow() === 0) {
      sh.appendRow(SCHEMA[name]);
    } else {
      // Tambahkan kolom baru pada sheet yang sudah ada (aman dijalankan berulang).
      const cur = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
      SCHEMA[name].forEach(col => {
        if (cur.indexOf(col) < 0) {
          sh.getRange(1, sh.getLastColumn() + 1).setValue(col);
          cur.push(col);
        }
      });
    }
    sh.setFrozenRows(1);
  });
  const users = table('Users');
  const adminUser = users.rows.find(u => String(u.username).toLowerCase() === 'admin');
  if (!adminUser) {
    upsert('Users', {
      id: uid(), username: 'admin', password: 'admin2026',
      nama: 'Admin TU', role: 'admin', status: 'aktif', dibuat_pada: nowIso()
    });
  } else if (!adminUser.password) {
    // Migrasi akun admin lama: hash lama tidak bisa dibalik, tetapkan password awal yang diketahui.
    upsert('Users', { id: adminUser.id, password: 'admin2026' });
  }
  photoFolder();
  gambarSoalFolder(); // TAMBAHAN: inisiasi folder gambar soal
  CACHE = {};
  return 'Setup selesai. Akun admin: admin / admin2026. Segera ganti password setelah login pertama.';
}

/* ===================== SESI & AUTENTIKASI ===================== */

function publicUser(u) {
  return { id: u.id, username: u.username, nama: u.nama, role: u.role };
}

function login(username, password) {
  const u = table('Users').rows.find(x => String(x.username || '').trim() === String(username || '').trim());
  const enteredPassword = String(password || '');
  if (!u || u.status !== 'aktif') {
    throw new Error('Username atau password salah, atau akun tidak aktif.');
  }

  // Kompatibilitas akun lama: jika password asli kosong, cocokkan hash lama.
  // Setelah login lama berhasil, simpan password yang berhasil digunakan ke kolom password.
  const plainMatches = String(u.password || '') === enteredPassword;
  const legacyHashMatches = !u.password && !!u.password_hash && String(u.password_hash) === hashPw(enteredPassword);
  if (!plainMatches && !legacyHashMatches) {
    throw new Error('Username atau password salah. Periksa password pada sheet Users.');
  }
  if (legacyHashMatches) {
    upsert('Users', { id: u.id, password: enteredPassword });
    CACHE = {};
  }
  const now = new Date();
  const token = Utilities.getUuid();
  upsert('Sesi', {
    token: token, user_id: u.id, dibuat_pada: now.toISOString(),
    kedaluwarsa: new Date(now.getTime() + SESSION_DAYS * 86400000).toISOString()
  }, 'token');
  const pub = publicUser(u);
  try {
    CacheService.getScriptCache().put('LMS_AUTH_' + token, JSON.stringify(pub), 21600);
  } catch (e) {}
  return { token: token, user: pub };
}

function logout(token) {
  try { CacheService.getScriptCache().remove('LMS_AUTH_' + token); } catch (e) {}
  removeWhere('Sesi', s => s.token === token);
  return true;
}

function authUser(token) {
  if (!token) throw new Error('Sesi tidak valid. Silakan login kembali.');
  try {
    const cached = CacheService.getScriptCache().get('LMS_AUTH_' + token);
    if (cached) return JSON.parse(cached);
  } catch (e) {}

  const s = table('Sesi').rows.find(x => x.token === token);
  if (!s || new Date(s.kedaluwarsa) < new Date()) throw new Error('Sesi tidak valid. Silakan login kembali.');
  const u = table('Users').rows.find(x => x.id === s.user_id);
  if (!u || u.status !== 'aktif') throw new Error('Sesi tidak valid. Akun tidak aktif.');
  const pub = publicUser(u);
  try {
    CacheService.getScriptCache().put('LMS_AUTH_' + token, JSON.stringify(pub), 21600);
  } catch (e) {}
  return pub;
}

// Pintu masuk tunggal dari frontend. Selalu mengembalikan { ok, data } atau { ok:false, error }.
function apiCall(token, action, payload) {
  try {
    const p = payload || {};
    let data;
    if (action === 'login') {
      data = login(p.username, p.password);
    } else {
      const user = authUser(token);
      if (action === 'logout') {
        data = logout(token);
      } else {
        const h = HANDLERS[action];
        if (!h) throw new Error('Aksi tidak dikenal: ' + action);
        data = h(user, p, token);
      }
    }
    return { ok: true, data: data };
  } catch (err) {
    return { ok: false, error: err.message || String(err) };
  }
}

/* ===================== HAK AKSES ===================== */

function need(user, roles) {
  if (roles.indexOf(user.role) < 0) throw new Error('Anda tidak memiliki akses ke halaman ini.');
}
function getKelas(id) {
  const k = table('Kelas').rows.find(x => x.id === id);
  if (!k) throw new Error('Kelas tidak ditemukan.');
  return k;
}
function getTugas(id) {
  const t = table('Tugas').rows.find(x => x.id === id);
  if (!t) throw new Error('Tugas tidak ditemukan.');
  return t;
}
function getKuis(id) {
  const q = table('Kuis').rows.find(x => x.id === id);
  if (!q) throw new Error('Kuis tidak ditemukan.');
  return q;
}
function isMember(siswaId, kelasId) {
  return table('Anggota_Kelas').rows.some(a => a.siswa_id === siswaId && a.kelas_id === kelasId);
}
function canSeeKelas(user, kelasId) {
  if (user.role === 'admin') return true;
  if (user.role === 'guru') return getKelas(kelasId).guru_id === user.id;
  return isMember(user.id, kelasId);
}
function needKelas(user, kelasId) {
  if (!canSeeKelas(user, kelasId)) throw new Error('Anda tidak memiliki akses ke kelas ini.');
}
// Hanya guru pengampu kelas (atau admin) yang boleh mengubah data kelas tersebut.
function ownKelas(user, kelasId) {
  if (user.role === 'admin') return;
  need(user, ['guru']);
  if (getKelas(kelasId).guru_id !== user.id) throw new Error('Anda tidak memiliki akses ke kelas ini.');
}
function myClassIds(user) {
  if (user.role === 'admin') return table('Kelas').rows.map(k => k.id);
  if (user.role === 'guru') return table('Kelas').rows.filter(k => k.guru_id === user.id).map(k => k.id);
  return table('Anggota_Kelas').rows.filter(a => a.siswa_id === user.id).map(a => a.kelas_id);
}
function memberIds(kelasId) {
  return table('Anggota_Kelas').rows.filter(a => a.kelas_id === kelasId).map(a => a.siswa_id);
}
function kelasMap() {
  const m = {};
  table('Kelas').rows.forEach(k => { m[k.id] = k; });
  return m;
}
function usersMap() {
  const m = {};
  table('Users').rows.forEach(x => { m[x.id] = x; });
  return m;
}
function parseFotos(s) {
  return s ? String(s).split(',').filter(Boolean) : [];
}
function subOut(s) {
  return Object.assign({}, s, { foto_ids: parseFotos(s.foto_ids) });
}
function validateUser(username, role, nama) {
  if (!/^[a-z0-9._]{3,20}$/.test(username)) throw new Error('Username 3 sampai 20 karakter: huruf kecil, angka, titik, atau garis bawah.');
  if (['admin', 'guru', 'siswa'].indexOf(role) < 0) throw new Error('Peran tidak valid.');
  if (!String(nama || '').trim()) throw new Error('Nama wajib diisi.');
}
function newKodeKelas() {
  const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const rows = table('Kelas').rows;
  let k;
  do {
    k = '';
    for (let i = 0; i < 6; i++) k += c.charAt(Math.floor(Math.random() * c.length));
  } while (rows.some(r => r.kode_kelas === k));
  return k;
}

/* ===================== FOTO TUGAS (DRIVE) ===================== */

function savePhoto(ph, tugasId, siswaId) {
  if (!ph || !/^image\/(jpeg|png)$/.test(ph.mime || '')) throw new Error('Hanya foto JPG atau PNG.');
  const bytes = Utilities.base64Decode(String(ph.data || ''));
  if (bytes.length > MAX_PHOTO_BYTES) throw new Error('Ukuran foto melebihi 2 MB setelah dikompresi.');
  const ext = ph.mime === 'image/png' ? '.png' : '.jpg';
  const name = tugasId + '_' + siswaId + '_' + Date.now() + ext;
  const file = photoFolder().createFile(Utilities.newBlob(bytes, ph.mime, name));
  return file.getId();
}

/* ===================== MATERI (YOUTUBE, DRIVE, BERKAS) ===================== */

const MATERI_FOLDER_NAME = 'LMS_Materi';
const MAX_MATERI_BYTES = 10 * 1024 * 1024;
const MATERI_MIME = [
  'application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'video/mp4',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

function materiFolder() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('MATERI_FOLDER_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) { /* folder dihapus, buat ulang */ }
  }
  const f = DriveApp.createFolder(MATERI_FOLDER_NAME);
  props.setProperty('MATERI_FOLDER_ID', f.getId());
  return f;
}

function youtubeId(url) {
  const m = String(url || '').match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : '';
}

function driveId(url) {
  const m = String(url || '').match(/(?:drive|docs)\.google\.com\/(?:file\/d\/|document\/d\/|presentation\/d\/|spreadsheets\/d\/|open\?id=)([A-Za-z0-9_-]{10,})/);
  return m ? m[1] : '';
}

function babOf(m) {
  return String(m.bab || '').trim() || 'Umum';
}

function materiOut(m) {
  return Object.assign({}, m, {
    bab: babOf(m),
    urutan: Number(m.urutan) || 0,
    jenis: m.jenis || 'tautan'
  });
}

function materiSort(a, b) {
  if (a.bab !== b.bab) return a.bab.localeCompare(b.bab, 'id', { numeric: true });
  if (a.urutan !== b.urutan) return a.urutan - b.urutan;
  return String(a.dibuat_pada).localeCompare(String(b.dibuat_pada));
}

function nextUrutan(kelasId, bab) {
  const vals = table('Materi').rows
    .filter(m => m.kelas_id === kelasId && babOf(m) === bab)
    .map(m => Number(m.urutan) || 0);
  return vals.length ? Math.max.apply(null, vals) + 1 : 1;
}

function saveMateriFile(f, kelasId) {
  const mime = String(f.mime || '');
  if (MATERI_MIME.indexOf(mime) < 0) {
    throw new Error('Format berkas tidak didukung. Gunakan PDF, gambar, video MP4, atau dokumen Office.');
  }
  const bytes = Utilities.base64Decode(String(f.data || ''));
  if (bytes.length > MAX_MATERI_BYTES) throw new Error('Ukuran berkas melebihi 10 MB.');
  const name = kelasId + '_' + Date.now() + '_' + String(f.name || 'berkas').replace(/[\\\/]/g, '_');
  const file = materiFolder().createFile(Utilities.newBlob(bytes, mime, name));
  return { id: file.getId(), size: bytes.length };
}

function trashDriveFile(id) {
  try { DriveApp.getFileById(id).setTrashed(true); } catch (e) { /* file sudah tidak ada */ }
}

/* ===================== HANDLER AKSI ===================== */

const HANDLERS = {

  me: u => u,

  changePassword: (u, p) => {
    const row = table('Users').rows.find(x => x.id === u.id);
    if (String(row.password) !== String(p.old || '')) throw new Error('Password lama tidak sesuai.');
    if (!p.new || String(p.new).length < 6) throw new Error('Password baru minimal 6 karakter.');
    upsert('Users', { id: u.id, password: String(p.new) });
    return true;
  },

  home: u => {
    const pengumuman = HANDLERS.annList(u).slice(0, 5);
    if (u.role === 'admin') {
      const us = table('Users').rows;
      return {
        stats: [
          { label: 'Guru', value: us.filter(x => x.role === 'guru').length, icon: 'school' },
          { label: 'Siswa', value: us.filter(x => x.role === 'siswa').length, icon: 'group' },
          { label: 'Kelas', value: table('Kelas').rows.length, icon: 'class' },
          { label: 'Pengumuman', value: table('Pengumuman').rows.length, icon: 'campaign' }
        ],
        tugas: [],
        pengumuman: pengumuman
      };
    }
    if (u.role === 'guru') {
      const ids = myClassIds(u);
      const tugasIds = table('Tugas').rows.filter(t => ids.indexOf(t.kelas_id) >= 0).map(t => t.id);
      const menunggu = table('Pengumpulan').rows
        .filter(s => tugasIds.indexOf(s.tugas_id) >= 0 && (s.nilai === '' || s.nilai === null)).length;
      return {
        stats: [
          { label: 'Kelas Diampu', value: ids.length, icon: 'class' },
          { label: 'Menunggu Penilaian', value: menunggu, icon: 'rule' },
          { label: 'Kuis Dibuat', value: table('Kuis').rows.filter(q => ids.indexOf(q.kelas_id) >= 0).length, icon: 'quiz' },
          { label: 'Tugas Aktif', value: tugasIds.length, icon: 'assignment' }
        ],
        tugas: HANDLERS.assignmentList(u).slice(0, 3),
        pengumuman: pengumuman
      };
    }
    const tugas = HANDLERS.assignmentList(u);
    const kuis = HANDLERS.quizList(u);
    const g = HANDLERS.gradesMine(u);
    return {
      stats: [
        { label: 'Tugas Belum Dikumpulkan', value: tugas.filter(t => !t.sub).length, icon: 'assignment_late' },
        { label: 'Kuis Belum Dikerjakan', value: kuis.filter(q => !q.attempt).length, icon: 'quiz' },
        { label: 'Rata-rata Nilai', value: g.rataTotal === null ? '-' : g.rataTotal, icon: 'grade' },
        { label: 'Pengumuman', value: pengumuman.length, icon: 'campaign' }
      ],
      tugas: tugas.filter(t => !t.sub).slice(0, 3),
      pengumuman: pengumuman
    };
  },

  /* ---------- Ringkasan dashboard admin (optimasi: satu panggilan API) ---------- */

  adminDashboardExtras: u => {
    need(u, ['admin']);
    const users = table('Users').rows.map(x => ({
      id: x.id, username: x.username, nama: x.nama, role: x.role, status: x.status
    }));
    return {
      users: users,
      tugas: table('Tugas').rows.length,
      kuis: table('Kuis').rows.length,
      materi: table('Materi').rows.length,
      kelas: table('Kelas').rows.length
    };
  },

  /* ---------- Pengguna (admin) ---------- */

  usersList: (u, p) => {
    need(u, ['admin']);
    const q = String(p.q || '').toLowerCase();
    return table('Users').rows
      .filter(x => !p.role || x.role === p.role)
      .filter(x => !q || String(x.nama).toLowerCase().indexOf(q) >= 0 || String(x.username).toLowerCase().indexOf(q) >= 0)
      .sort((a, b) => String(a.nama).localeCompare(String(b.nama)))
      .map(x => ({ id: x.id, username: x.username, nama: x.nama, role: x.role, status: x.status }));
  },

  userCreate: (u, p) => {
    need(u, ['admin']);
    const username = String(p.username || '').trim().toLowerCase();
    validateUser(username, p.role, p.nama);
    if (table('Users').rows.some(x => x.username === username)) throw new Error('Username sudah digunakan.');
    const pw = randomPw();
    upsert('Users', {
      id: uid(), username: username, password: pw, nama: String(p.nama).trim(),
      role: p.role, status: 'aktif', dibuat_pada: nowIso()
    });
    return { username: username, password: pw };
  },

  userUpdate: (u, p) => {
    need(u, ['admin']);
    const x = table('Users').rows.find(v => v.id === p.id);
    if (!x) throw new Error('Pengguna tidak ditemukan.');
    const username = String(p.username || '').trim().toLowerCase();
    validateUser(username, p.role, p.nama);
    if (table('Users').rows.some(v => v.username === username && v.id !== p.id)) throw new Error('Username sudah digunakan.');
    upsert('Users', { id: p.id, nama: String(p.nama).trim(), username: username, role: p.role });
    return true;
  },

  userToggle: (u, p) => {
    need(u, ['admin']);
    if (p.id === u.id) throw new Error('Tidak dapat menonaktifkan akun sendiri.');
    const x = table('Users').rows.find(v => v.id === p.id);
    if (!x) throw new Error('Pengguna tidak ditemukan.');
    upsert('Users', { id: p.id, status: x.status === 'aktif' ? 'nonaktif' : 'aktif' });
    return true;
  },

  userResetPassword: (u, p) => {
    need(u, ['admin']);
    const x = table('Users').rows.find(v => v.id === p.id);
    if (!x) throw new Error('Pengguna tidak ditemukan.');
    const pw = randomPw();
    upsert('Users', { id: p.id, password: pw });
    return { password: pw };
  },

  /* ---------- Kelas ---------- */

  classList: u => {
    const ids = myClassIds(u);
    const us = usersMap();
    const anggota = table('Anggota_Kelas').rows;
    return table('Kelas').rows
      .filter(k => ids.indexOf(k.id) >= 0)
      .map(k => ({
        id: k.id,
        nama_kelas: k.nama_kelas,
        kode_kelas: k.kode_kelas,
        tahun_ajaran: k.tahun_ajaran,
        guru_id: k.guru_id,
        guru_nama: (us[k.guru_id] || {}).nama || '-',
        jumlah_siswa: anggota.filter(a => a.kelas_id === k.id).length
      }));
  },

  classDetail: (u, p) => {
    needKelas(u, p.id);
    const k = getKelas(p.id);
    const us = usersMap();
    const anggota = memberIds(k.id)
      .map(sid => ({ id: sid, nama: (us[sid] || {}).nama || '-', username: (us[sid] || {}).username || '' }))
      .sort((a, b) => String(a.nama).localeCompare(String(b.nama)));
    return { kelas: k, guru_nama: (us[k.guru_id] || {}).nama || '-', anggota: anggota };
  },

  // Agregat: Muat seluruh data kelas sekaligus dalam 1 round-trip (menghemat 3x RPC calls)
  classDetailBundle: (u, p) => {
    return {
      detail: HANDLERS.classDetail(u, p),
      materials: HANDLERS.materialList(u, { classId: p.id }),
      assignments: HANDLERS.assignmentList(u, { classId: p.id }),
      quizzes: HANDLERS.quizList(u, { classId: p.id })
    };
  },

  classCreate: (u, p) => {
    need(u, ['admin']);
    if (!String(p.nama_kelas || '').trim() || !String(p.tahun_ajaran || '').trim()) throw new Error('Nama kelas dan tahun ajaran wajib diisi.');
    const guru = table('Users').rows.find(x => x.id === p.guru_id && x.role === 'guru');
    if (!guru) throw new Error('Pilih guru pengampu yang valid.');
    const obj = {
      id: uid(), nama_kelas: String(p.nama_kelas).trim(), kode_kelas: newKodeKelas(),
      guru_id: p.guru_id, tahun_ajaran: String(p.tahun_ajaran).trim()
    };
    upsert('Kelas', obj);
    return obj;
  },

  classUpdate: (u, p) => {
    need(u, ['admin']);
    getKelas(p.id);
    upsert('Kelas', { id: p.id, nama_kelas: String(p.nama_kelas).trim(), tahun_ajaran: String(p.tahun_ajaran).trim(), guru_id: p.guru_id });
    return true;
  },

  classAddStudent: (u, p) => {
    need(u, ['admin']);
    const siswa = table('Users').rows.find(x => x.id === p.siswa_id);
    if (!siswa || siswa.role !== 'siswa') throw new Error('Hanya akun siswa yang dapat ditambahkan.');
    const kelas = getKelas(p.kelas_id);
    if (isMember(p.siswa_id, p.kelas_id)) throw new Error('Siswa sudah ada di kelas ini.');
    const kelasMapObj = kelasMap();
    const sudahTahunIni = table('Anggota_Kelas').rows.some(a =>
      a.siswa_id === p.siswa_id && kelasMapObj[a.kelas_id] && kelasMapObj[a.kelas_id].tahun_ajaran === kelas.tahun_ajaran);
    if (sudahTahunIni) throw new Error('Siswa sudah terdaftar di kelas lain pada tahun ajaran ini.');
    upsert('Anggota_Kelas', { id: uid(), kelas_id: p.kelas_id, siswa_id: p.siswa_id });
    return true;
  },

  classRemoveStudent: (u, p) => {
    need(u, ['admin']);
    removeWhere('Anggota_Kelas', a => a.kelas_id === p.kelas_id && a.siswa_id === p.siswa_id);
    return true;
  },

  /* ---------- Materi ---------- */

  materialList: (u, p) => {
    needKelas(u, p.classId);
    return table('Materi').rows
      .filter(m => m.kelas_id === p.classId)
      .map(materiOut)
      .sort(materiSort);
  },

  materialGet: (u, p) => {
    const m = table('Materi').rows.find(x => x.id === p.id);
    if (!m) throw new Error('Materi tidak ditemukan.');
    needKelas(u, m.kelas_id);
    const list = table('Materi').rows
      .filter(x => x.kelas_id === m.kelas_id)
      .map(materiOut)
      .sort(materiSort);
    const i = list.findIndex(x => x.id === m.id);
    const brief = x => x ? { id: x.id, judul: x.judul } : null;
    return {
      materi: materiOut(m),
      kelas_nama: getKelas(m.kelas_id).nama_kelas,
      prev: i > 0 ? brief(list[i - 1]) : null,
      next: i < list.length - 1 ? brief(list[i + 1]) : null
    };
  },

  materialFile: (u, p) => {
    const m = table('Materi').rows.find(x => x.id === p.id);
    if (!m) throw new Error('Materi tidak ditemukan.');
    needKelas(u, m.kelas_id);
    if (m.jenis !== 'upload' || !m.file_id) throw new Error('Materi ini bukan berkas unggahan.');
    const blob = DriveApp.getFileById(m.file_id).getBlob();
    return { mime: blob.getContentType(), data: Utilities.base64Encode(blob.getBytes()), nama: m.nama_file };
  },

  materialSave: (u, p) => {
    need(u, ['guru']);
    ownKelas(u, p.kelas_id);
    const judul = String(p.judul || '').trim();
    if (!judul) throw new Error('Judul materi wajib diisi.');
    const jenis = String(p.jenis || '');
    if (['youtube', 'drive', 'upload'].indexOf(jenis) < 0) throw new Error('Pilih sumber materi.');
    let ex = null;
    if (p.id) {
      ex = table('Materi').rows.find(x => x.id === p.id);
      if (!ex) throw new Error('Materi tidak ditemukan.');
      ownKelas(u, ex.kelas_id);
      if (ex.kelas_id !== p.kelas_id) throw new Error('Materi tidak termasuk kelas ini.');
    }
    const bab = babOf({ bab: p.bab });
    const obj = {
      id: p.id || uid(),
      kelas_id: p.kelas_id,
      judul: judul,
      deskripsi: String(p.deskripsi || ''),
      tautan: '',
      bab: bab,
      urutan: (ex && babOf(ex) === bab) ? (Number(ex.urutan) || 0) : nextUrutan(p.kelas_id, bab),
      jenis: jenis,
      file_id: '', nama_file: '', mime: '', ukuran: '',
      dibuat_oleh: ex ? ex.dibuat_oleh : u.id,
      dibuat_pada: ex ? ex.dibuat_pada : nowIso()
    };
    if (jenis === 'youtube') {
      if (!youtubeId(p.tautan)) throw new Error('Tautan YouTube tidak valid.');
      obj.tautan = String(p.tautan).trim();
    } else if (jenis === 'drive') {
      if (!driveId(p.tautan)) throw new Error('Tautan Google Drive tidak valid. Gunakan tautan file atau dokumen.');
      obj.tautan = String(p.tautan).trim();
    } else if (p.file && p.file.data) {
      const saved = saveMateriFile(p.file, p.kelas_id);
      obj.file_id = saved.id;
      obj.nama_file = String(p.file.name || 'berkas');
      obj.mime = String(p.file.mime || '');
      obj.ukuran = saved.size;
    } else if (ex && ex.jenis === 'upload' && ex.file_id) {
      obj.file_id = ex.file_id;
      obj.nama_file = ex.nama_file;
      obj.mime = ex.mime;
      obj.ukuran = ex.ukuran;
    } else {
      throw new Error('Pilih file dari perangkat.');
    }
    if (ex && ex.jenis === 'upload' && ex.file_id && ex.file_id !== obj.file_id) trashDriveFile(ex.file_id);
    upsert('Materi', obj);
    return materiOut(obj);
  },

  materialMove: (u, p) => {
    need(u, ['guru']);
    const m = table('Materi').rows.find(x => x.id === p.id);
    if (!m) throw new Error('Materi tidak ditemukan.');
    ownKelas(u, m.kelas_id);
    const same = table('Materi').rows
      .filter(x => x.kelas_id === m.kelas_id && babOf(x) === babOf(m))
      .map(materiOut)
      .sort(materiSort);
    const i = same.findIndex(x => x.id === m.id);
    const j = p.dir === 'up' ? i - 1 : i + 1;
    if (i < 0 || j < 0 || j >= same.length) return true;
    same.forEach((x, k) => { x.nomor = k + 1; });
    const a = same[i], b = same[j];
    upsert('Materi', { id: a.id, urutan: b.nomor });
    upsert('Materi', { id: b.id, urutan: a.nomor });
    return true;
  },

  materialDelete: (u, p) => {
    need(u, ['guru']);
    const m = table('Materi').rows.find(x => x.id === p.id);
    if (!m) throw new Error('Materi tidak ditemukan.');
    ownKelas(u, m.kelas_id);
    if (m.jenis === 'upload' && m.file_id) trashDriveFile(m.file_id);
    removeWhere('Materi', x => x.id === p.id);
    return true;
  },

  /* ---------- Tugas ---------- */

  assignmentList: (u, p) => {
    p = p || {};
    if (p.classId) needKelas(u, p.classId);
    const ids = p.classId ? [p.classId] : myClassIds(u);
    const km = kelasMap();
    const subs = table('Pengumpulan').rows;
    const anggota = table('Anggota_Kelas').rows;
    return table('Tugas').rows
      .filter(t => ids.indexOf(t.kelas_id) >= 0)
      .map(t => {
        const base = {
          id: t.id, kelas_id: t.kelas_id, kelas_nama: (km[t.kelas_id] || {}).nama_kelas || '-',
          judul: t.judul, deskripsi: t.deskripsi, batas_waktu: t.batas_waktu, nilai_maksimal: t.nilai_maksimal
        };
        if (u.role === 'siswa') {
          const s = subs.find(x => x.tugas_id === t.id && x.siswa_id === u.id);
          base.sub = s ? subOut(s) : null;
        } else {
          base.total = anggota.filter(a => a.kelas_id === t.kelas_id).length;
          base.terkumpul = subs.filter(x => x.tugas_id === t.id).length;
        }
        return base;
      })
      .sort((a, b) => String(a.batas_waktu).localeCompare(String(b.batas_waktu)));
  },

  assignmentDetail: (u, p) => {
    const t = getTugas(p.id);
    needKelas(u, t.kelas_id);
    let sub = null;
    if (u.role === 'siswa') {
      const s = table('Pengumpulan').rows.find(x => x.tugas_id === t.id && x.siswa_id === u.id);
      sub = s ? subOut(s) : null;
    }
    return { tugas: t, kelas_nama: getKelas(t.kelas_id).nama_kelas, sub: sub };
  },

  assignmentSave: (u, p) => {
    need(u, ['guru']);
    ownKelas(u, p.kelas_id);
    if (!String(p.judul || '').trim() || !p.batas_waktu) throw new Error('Judul dan batas waktu wajib diisi.');
    const bw = new Date(p.batas_waktu);
    if (isNaN(bw.getTime())) throw new Error('Format batas waktu tidak valid.');
    const max = Number(p.nilai_maksimal) || 100;
    if (max < 1 || max > 100) throw new Error('Nilai maksimal antara 1 dan 100.');
    let ex = null;
    if (p.id) {
      ex = getTugas(p.id);
      ownKelas(u, ex.kelas_id);
    } else if (bw <= new Date()) {
      throw new Error('Batas waktu harus di masa depan.');
    }
    const obj = {
      id: p.id || uid(), kelas_id: p.kelas_id, judul: String(p.judul).trim(),
      deskripsi: String(p.deskripsi || ''), batas_waktu: bw.toISOString(), nilai_maksimal: max,
      dibuat_oleh: u.id, dibuat_pada: ex ? ex.dibuat_pada : nowIso()
    };
    upsert('Tugas', obj);
    return obj;
  },

  submissionSave: (u, p) => {
    need(u, ['siswa']);
    const t = getTugas(p.assignmentId);
    needKelas(u, t.kelas_id);
    const now = new Date();
    const deadline = new Date(t.batas_waktu);
    const s = table('Pengumpulan').rows.find(x => x.tugas_id === t.id && x.siswa_id === u.id) || null;
    if (s && now > deadline) throw new Error('Pengumpulan tidak dapat diubah setelah batas waktu.');

    const fotoLama = s ? parseFotos(s.foto_ids) : [];
    const fotoBaru = Array.isArray(p.photos) ? p.photos : [];
    if (fotoLama.length + fotoBaru.length > MAX_PHOTOS) throw new Error('Maksimal ' + MAX_PHOTOS + ' foto per pengumpulan.');

    const jawaban = String(p.jawaban || '').trim();
    const tautan = String(p.tautan || '').trim();
    if (!jawaban && !tautan && fotoLama.length + fotoBaru.length === 0) {
      throw new Error('Isi jawaban, tautan, atau unggah foto terlebih dahulu.');
    }
    if (tautan && !/^https?:\/\//i.test(tautan)) throw new Error('Tautan harus diawali https://');

    // Validasi selesai sebelum menyimpan foto, agar tidak ada file yatim di Drive.
    const fotoIdBaru = fotoBaru.map(ph => savePhoto(ph, t.id, u.id));
    const obj = {
      id: s ? s.id : uid(),
      tugas_id: t.id,
      siswa_id: u.id,
      jawaban: jawaban,
      tautan: tautan,
      foto_ids: fotoLama.concat(fotoIdBaru).join(','),
      waktu_kumpul: nowIso(),
      nilai: s ? s.nilai : '',
      feedback: s ? s.feedback : '',
      status: now > deadline ? 'Terlambat' : 'Tepat Waktu'
    };
    upsert('Pengumpulan', obj);
    return subOut(obj);
  },

  photoDelete: (u, p) => {
    need(u, ['siswa']);
    const s = table('Pengumpulan').rows.find(x => x.id === p.submissionId);
    if (!s || s.siswa_id !== u.id) throw new Error('Pengumpulan tidak ditemukan.');
    const t = getTugas(s.tugas_id);
    if (new Date() > new Date(t.batas_waktu)) throw new Error('Foto tidak dapat dihapus setelah batas waktu.');
    const ids = parseFotos(s.foto_ids);
    if (ids.indexOf(p.fileId) < 0) throw new Error('Foto tidak ditemukan pada pengumpulan ini.');
    try { DriveApp.getFileById(p.fileId).setTrashed(true); } catch (e) { /* file sudah tidak ada */ }
    const cur = upsert('Pengumpulan', { id: s.id, foto_ids: ids.filter(x => x !== p.fileId).join(',') });
    return subOut(cur);
  },

  photoGet: (u, p) => {
    const s = table('Pengumpulan').rows.find(x => x.id === p.submissionId);
    if (!s || parseFotos(s.foto_ids).indexOf(p.fileId) < 0) throw new Error('Foto tidak ditemukan.');
    const t = getTugas(s.tugas_id);
    if (u.role === 'siswa' && s.siswa_id !== u.id) throw new Error('Anda tidak memiliki akses ke foto ini.');
    if (u.role === 'guru') ownKelas(u, t.kelas_id);
    if (u.role !== 'siswa' && u.role !== 'guru' && u.role !== 'admin') throw new Error('Anda tidak memiliki akses ke foto ini.');
    const blob = DriveApp.getFileById(p.fileId).getBlob();
    return { mime: blob.getContentType(), data: Utilities.base64Encode(blob.getBytes()) };
  },

  submissionList: (u, p) => {
    need(u, ['guru', 'admin']);
    const t = getTugas(p.assignmentId);
    ownKelas(u, t.kelas_id);
    const us = usersMap();
    const subs = table('Pengumpulan').rows.filter(s => s.tugas_id === t.id);
    return memberIds(t.kelas_id)
      .map(sid => {
        const s = subs.find(x => x.siswa_id === sid);
        return { siswa_id: sid, nama: (us[sid] || {}).nama || '-', submission: s ? subOut(s) : null };
      })
      .sort((a, b) => String(a.nama).localeCompare(String(b.nama)));
  },

  submissionGrade: (u, p) => {
    need(u, ['guru']);
    const s = table('Pengumpulan').rows.find(x => x.id === p.submissionId);
    if (!s) throw new Error('Pengumpulan tidak ditemukan.');
    const t = getTugas(s.tugas_id);
    ownKelas(u, t.kelas_id);
    if (p.nilai === '' || p.nilai === null || p.nilai === undefined) throw new Error('Isi nilai terlebih dahulu.');
    const n = Number(p.nilai);
    if (isNaN(n) || n < 0 || n > Number(t.nilai_maksimal)) throw new Error('Nilai harus antara 0 dan ' + t.nilai_maksimal + '.');
    upsert('Pengumpulan', { id: s.id, nilai: n, feedback: String(p.feedback || '') });
    return true;
  },

  /* ---------- Kuis (Fungsi Lama Tetap Ada) ---------- */

  quizList: (u, p) => {
    p = p || {};
    if (p.classId) needKelas(u, p.classId);
    const ids = p.classId ? [p.classId] : myClassIds(u);
    const km = kelasMap();
    const soal = table('Soal').rows;
    const jk = table('Jawaban_Kuis').rows;
    const anggota = table('Anggota_Kelas').rows;
    return table('Kuis').rows
      .filter(q => ids.indexOf(q.kelas_id) >= 0)
      .map(q => {
        const base = {
          id: q.id, kelas_id: q.kelas_id, kelas_nama: (km[q.kelas_id] || {}).nama_kelas || '-',
          judul: q.judul, jenis_ujian: q.jenis_ujian || 'Kuis Harian', durasi_menit: q.durasi_menit,
          jumlah_soal: soal.filter(s => s.kuis_id === q.id).length
        };
        if (u.role === 'siswa') {
          const j = jk.find(x => x.kuis_id === q.id && x.siswa_id === u.id);
          base.attempt = j ? { id: j.id, status: j.status, skor: j.skor, waktu_mulai: j.waktu_mulai, waktu_selesai: j.waktu_selesai } : null;
        } else {
          base.total = anggota.filter(a => a.kelas_id === q.kelas_id).length;
          base.selesai = jk.filter(j => j.kuis_id === q.id && j.status === 'Selesai').length;
        }
        return base;
      })
      .sort((a, b) => String(a.judul).localeCompare(String(b.judul)));
  },

  // Agregat: Muat daftar kuis dan bank soal dalam 1 round-trip
  quizPageData: (u, p) => {
    return {
      quizzes: HANDLERS.quizList(u, p),
      bank: (u.role === 'guru' || u.role === 'admin') ? HANDLERS.bankSoalList(u, p) : []
    };
  },

  quizSave: (u, p) => {
    need(u, ['guru']);
    ownKelas(u, p.kelas_id);
    if (!String(p.judul || '').trim()) throw new Error('Judul kuis wajib diisi.');
    const dur = Number(p.durasi_menit);
    if (!(dur >= 1 && dur <= 180)) throw new Error('Durasi kuis 1 sampai 180 menit.');
    const qs = Array.isArray(p.questions) ? p.questions : [];
    const bankIds = Array.isArray(p.bank_soal_ids) ? p.bank_soal_ids.map(String) : [];
    const valid = qs.filter(x => x.pertanyaan && x.opsi_a && x.opsi_b && x.opsi_c && x.opsi_d && ['A', 'B', 'C', 'D'].indexOf(String(x.jawaban_benar || '').toUpperCase()) >= 0);
    const bankRows = bankIds.length ? table('Bank_Soal').rows.filter(x => bankIds.indexOf(String(x.id)) >= 0 && (u.role === 'admin' || x.dibuat_oleh === u.id)) : [];
    if (bankIds.length && bankRows.length !== new Set(bankIds).size) throw new Error('Sebagian soal bank tidak ditemukan atau bukan milik Anda. Muat ulang daftar soal.');
    const finalQuestions = valid.concat(bankRows.map(x => ({ pertanyaan: x.pertanyaan, gambar_id: x.gambar_id || '', opsi_a: x.opsi_a, opsi_b: x.opsi_b, opsi_c: x.opsi_c, opsi_d: x.opsi_d, jawaban_benar: String(x.jawaban_benar || '').trim().toUpperCase() })));
    if (!finalQuestions.length) throw new Error('Centang minimal satu soal dari bank soal atau tambahkan soal manual.');
    if (valid.length !== qs.length) throw new Error('Semua soal manual harus lengkap dengan jawaban benar.');
    if (bankRows.some(x => !x.pertanyaan || !x.opsi_a || !x.opsi_b || !x.opsi_c || !x.opsi_d || !['A','B','C','D'].includes(String(x.jawaban_benar || '').trim().toUpperCase()))) throw new Error('Ada soal bank yang belum lengkap (pertanyaan, opsi A-D, atau kunci A-D). Periksa bank soal yang dipilih.');

    let ex = null;
    if (p.id) {
      ex = getKuis(p.id);
      ownKelas(u, ex.kelas_id);
      const sudahDikerjakan = table('Jawaban_Kuis').rows.some(j => j.kuis_id === ex.id);
      if (sudahDikerjakan) throw new Error('Kuis sudah dikerjakan siswa dan tidak dapat diubah.');
    }
    const obj = {
      id: p.id || uid(), kelas_id: p.kelas_id, judul: String(p.judul).trim(), jenis_ujian: String(p.jenis_ujian || 'Kuis Harian').trim(), durasi_menit: dur,
      dibuat_oleh: u.id, dibuat_pada: ex ? ex.dibuat_pada : nowIso()
    };
    upsert('Kuis', obj);
    if (p.id) removeWhere('Soal', s => s.kuis_id === obj.id);
    const soalRows = finalQuestions.map(x => ({
      id: uid(), kuis_id: obj.id, pertanyaan: String(x.pertanyaan).trim(), gambar_id: String(x.gambar_id || '').trim(),
      opsi_a: String(x.opsi_a).trim(), opsi_b: String(x.opsi_b).trim(),
      opsi_c: String(x.opsi_c).trim(), opsi_d: String(x.opsi_d).trim(), jawaban_benar: String(x.jawaban_benar).trim().toUpperCase()
    }));
    if (soalRows.length) insertRows('Soal', soalRows);
    return obj;
  },

  quizStart: (u, p) => {
    need(u, ['siswa']);
    const q = getKuis(p.id);
    needKelas(u, q.kelas_id);
    let j = table('Jawaban_Kuis').rows.find(x => x.kuis_id === q.id && x.siswa_id === u.id) || null;
    if (j && j.status === 'Selesai') throw new Error('Anda sudah mengerjakan kuis ini.');
    if (!j) {
      j = { id: uid(), kuis_id: q.id, siswa_id: u.id, skor: '', waktu_mulai: nowIso(), waktu_selesai: '', status: 'Dimulai', jawaban: '' };
      upsert('Jawaban_Kuis', j);
    }
    const soal = table('Soal').rows
      .filter(s => s.kuis_id === q.id)
      .map(s => ({ id: s.id, pertanyaan: s.pertanyaan, gambar_id: s.gambar_id || '', gambar_url: s.gambar_id ? 'https://drive.google.com/uc?export=view&id=' + encodeURIComponent(String(s.gambar_id)) : '', opsi_a: s.opsi_a, opsi_b: s.opsi_b, opsi_c: s.opsi_c, opsi_d: s.opsi_d }));
    return { judul: q.judul, jenis_ujian: q.jenis_ujian || 'Kuis Harian', durasi_menit: q.durasi_menit, waktu_mulai: j.waktu_mulai, soal: soal };
  },

  quizSubmit: (u, p) => {
    need(u, ['siswa']);
    const q = getKuis(p.id);
    needKelas(u, q.kelas_id);
    const j = table('Jawaban_Kuis').rows.find(x => x.kuis_id === q.id && x.siswa_id === u.id);
    if (!j || j.status !== 'Dimulai') throw new Error('Kuis belum dimulai atau sudah selesai dikerjakan.');
    const soal = table('Soal').rows.filter(s => s.kuis_id === q.id);
    const ans = p.answers || {};
    const benar = soal.filter(s => ans[s.id] === s.jawaban_benar).length;
    const skor = soal.length ? Math.round(benar / soal.length * 100) : 0;
    upsert('Jawaban_Kuis', { id: j.id, skor: skor, waktu_selesai: nowIso(), status: 'Selesai', jawaban: JSON.stringify(ans) });
    return { skor: skor, benar: benar, total: soal.length };
  },

  quizResults: (u, p) => {
    need(u, ['guru', 'admin']);
    const q = getKuis(p.id);
    ownKelas(u, q.kelas_id);
    const us = usersMap();
    const jk = table('Jawaban_Kuis').rows.filter(j => j.kuis_id === q.id);
    const rows = memberIds(q.kelas_id).map(sid => {
      const j = jk.find(x => x.siswa_id === sid);
      return {
        siswa_id: sid,
        nama: (us[sid] || {}).nama || '-',
        status: j ? j.status : 'Belum Dikerjakan',
        skor: j && j.status === 'Selesai' ? j.skor : '',
        waktu_selesai: j ? j.waktu_selesai : ''
      };
    }).sort((a, b) => String(a.nama).localeCompare(String(b.nama)));
    return { judul: q.judul, rows: rows };
  },

  /* ---------- Nilai ---------- */

  gradesMine: u => {
    need(u, ['siswa']);
    const km = kelasMap();
    const tugas = table('Tugas').rows;
    const subs = table('Pengumpulan').rows.filter(s => s.siswa_id === u.id);
    const kuis = table('Kuis').rows;
    const jk = table('Jawaban_Kuis').rows.filter(j => j.siswa_id === u.id && j.status === 'Selesai');
    const kelas = myClassIds(u).map(kid => {
      const items = [];
      tugas.filter(t => t.kelas_id === kid).forEach(t => {
        const s = subs.find(x => x.tugas_id === t.id);
        if (s && s.nilai !== '' && s.nilai !== null) {
          items.push({ jenis: 'Tugas', judul: t.judul, nilai: Math.round(Number(s.nilai) / Number(t.nilai_maksimal) * 100) });
        }
      });
      kuis.filter(q => q.kelas_id === kid).forEach(q => {
        const j = jk.find(x => x.kuis_id === q.id);
        if (j) items.push({ jenis: 'Kuis', judul: q.judul, nilai: Number(j.skor) });
      });
      const rata = items.length ? Math.round(items.reduce((a, b) => a + b.nilai, 0) / items.length) : null;
      return { id: kid, nama_kelas: (km[kid] || {}).nama_kelas || '-', rata: rata, items: items };
    });
    const semua = kelas.reduce((a, k) => a.concat(k.items.map(i => i.nilai)), []);
    return {
      rumus: 'Setiap tugas dan kuis yang sudah dinilai dihitung dalam skala 0 sampai 100. Rata-rata adalah jumlah nilai dibagi jumlah tugas dan kuis tersebut.',
      kelas: kelas,
      rataTotal: semua.length ? Math.round(semua.reduce((a, b) => a + b, 0) / semua.length) : null
    };
  },

  gradesClass: (u, p) => {
    need(u, ['guru', 'admin']);
    needKelas(u, p.classId);
    ownKelas(u, p.classId);
    const us = usersMap();
    const tugas = table('Tugas').rows.filter(t => t.kelas_id === p.classId);
    const kuis = table('Kuis').rows.filter(q => q.kelas_id === p.classId);
    const subs = table('Pengumpulan').rows;
    const jk = table('Jawaban_Kuis').rows;
    const rows = memberIds(p.classId).map(sid => {
      const items = [];
      let dinilai = 0;
      tugas.forEach(t => {
        const s = subs.find(x => x.tugas_id === t.id && x.siswa_id === sid);
        if (s && s.nilai !== '' && s.nilai !== null) {
          dinilai++;
          items.push(Math.round(Number(s.nilai) / Number(t.nilai_maksimal) * 100));
        }
      });
      let selesai = 0;
      kuis.forEach(q => {
        const j = jk.find(x => x.kuis_id === q.id && x.siswa_id === sid && x.status === 'Selesai');
        if (j) { selesai++; items.push(Number(j.skor)); }
      });
      return {
        siswa_id: sid,
        nama: (us[sid] || {}).nama || '-',
        tugas_dinilai: dinilai,
        kuis_selesai: selesai,
        rata: items.length ? Math.round(items.reduce((a, b) => a + b, 0) / items.length) : null
      };
    }).sort((a, b) => String(a.nama).localeCompare(String(b.nama)));
    return { rows: rows };
  },

  /* ---------- Pengumuman ---------- */

  annList: u => {
    const ids = myClassIds(u);
    const km = kelasMap();
    const us = usersMap();
    return table('Pengumuman').rows
      .filter(a => u.role === 'admin' || a.kelas_id === '' || ids.indexOf(a.kelas_id) >= 0)
      .map(a => ({
        id: a.id,
        kelas_id: a.kelas_id,
        kelas_nama: a.kelas_id ? ((km[a.kelas_id] || {}).nama_kelas || '-') : 'Semua Kelas',
        judul: a.judul,
        isi: a.isi,
        dibuat_oleh_nama: (us[a.dibuat_oleh] || {}).nama || '-',
        dibuat_pada: a.dibuat_pada
      }))
      .sort((a, b) => String(b.dibuat_pada).localeCompare(String(a.dibuat_pada)));
  },

  annSave: (u, p) => {
    need(u, ['admin', 'guru']);
    if (!String(p.judul || '').trim() || !String(p.isi || '').trim()) throw new Error('Judul dan isi wajib diisi.');
    if (u.role === 'guru') {
      if (!p.kelas_id) throw new Error('Pilih kelas untuk pengumuman.');
      ownKelas(u, p.kelas_id);
    }
    const obj = {
      id: uid(), kelas_id: p.kelas_id || '', judul: String(p.judul).trim(), isi: String(p.isi).trim(),
      dibuat_oleh: u.id, dibuat_pada: nowIso()
    };
    upsert('Pengumuman', obj);
    return obj;
  },

  // ===================== TAMBAHAN HANDLER PENGEMBANGAN =====================

  // Daftar bank soal hasil impor agar data yang tersimpan dapat dilihat di aplikasi.
  bankSoalList: (u, p) => {
    need(u, ['guru', 'admin']);
    const rows = table('Bank_Soal').rows;
    const users = usersMap();
    return rows
      .filter(q => u.role === 'admin' || q.dibuat_oleh === u.id)
      .map(q => ({
        id: q.id, mapel: q.mapel || 'Umum', pertanyaan: q.pertanyaan || '',
        gambar_id: q.gambar_id || '', opsi_a: q.opsi_a || '', opsi_b: q.opsi_b || '',
        opsi_c: q.opsi_c || '', opsi_d: q.opsi_d || '', opsi_e: q.opsi_e || '',
        pembahasan: q.pembahasan || '', jawaban_benar: q.jawaban_benar || '',
        dibuat_pada: q.dibuat_pada || '', pembuat: (users[q.dibuat_oleh] || {}).nama || ''
      }))
      .sort((a, b) => String(b.dibuat_pada).localeCompare(String(a.dibuat_pada)));
  },

  // 1. Upload Excel: normalisasi header, validasi kelas, dan laporan hasil impor.
  uploadExcelBatch: (u, p) => {
    const type = String(p.type || '').trim().toLowerCase();
    const data = Array.isArray(p.data) ? p.data : [];
    if (!data.length) throw new Error('File Excel tidak berisi baris data.');
    if (data.length > 1000) throw new Error('Maksimal 1.000 baris per impor.');

    // Header Excel dibaca tanpa membedakan huruf besar/kecil dan spasi.
    const valueOf = (row, names) => {
      const keys = Object.keys(row || {});
      for (const name of names) {
        const found = keys.find(k => String(k).trim().toLowerCase() === String(name).trim().toLowerCase());
        if (found !== undefined && row[found] !== null && row[found] !== undefined) {
          const v = String(row[found]).trim();
          if (v !== '') return v;
        }
      }
      return '';
    };

    if (type === 'guru') {
      need(u, ['admin']);
      let added = 0, skipped = 0;
      const newRows = [];
      const existingUsernames = new Set(table('Users').rows.map(x => String(x.username || '').trim().toLowerCase()));
      data.forEach(row => {
        const username = valueOf(row, ['username', 'user name', 'nama pengguna']).toLowerCase();
        const nama = valueOf(row, ['nama', 'nama lengkap', 'name']);
        const password = valueOf(row, ['password', 'kata sandi']) || 'guru123';
        if (!username || !nama) { skipped++; return; }
        if (existingUsernames.has(username)) { skipped++; return; }
        existingUsernames.add(username);
        newRows.push({ id: uid(), username, password: password, nama, role: 'guru', status: 'aktif', dibuat_pada: nowIso() });
        added++;
      });
      if (newRows.length) insertRows('Users', newRows);
      return { added, skipped, message: 'Impor guru selesai: ' + added + ' akun ditambahkan, ' + skipped + ' baris dilewati.' };
    }

    if (type === 'siswa') {
      need(u, ['guru', 'admin']);
      if (!p.kelas_id) throw new Error('Kelas tujuan tidak ditemukan. Buka menu anggota siswa dari halaman detail kelas lalu impor kembali.');
      const kelas = getKelas(p.kelas_id);
      if (u.role !== 'admin' && kelas.guru_id !== u.id) throw new Error('Anda hanya dapat mengimpor siswa ke kelas yang Anda ampu.');
      let added = 0, linked = 0, skipped = 0;
      const newUsers = [];
      const newMembers = [];
      const userRows = table('Users').rows;
      const userMap = new Map();
      userRows.forEach(x => userMap.set(String(x.username || '').trim().toLowerCase(), x));
      const memberSet = new Set(table('Anggota_Kelas').rows.filter(a => a.kelas_id === p.kelas_id).map(a => a.siswa_id));

      data.forEach(row => {
        const username = valueOf(row, ['username', 'user name', 'nama pengguna']).toLowerCase();
        const nama = valueOf(row, ['nama', 'nama lengkap', 'name']);
        const password = valueOf(row, ['password', 'kata sandi']) || 'siswa123';
        if (!username || !nama) { skipped++; return; }
        let siswa = userMap.get(username);
        if (siswa && siswa.role !== 'siswa') { skipped++; return; }
        if (!siswa) {
          const id = uid();
          const newSiswa = { id, username, password: password, nama, role: 'siswa', status: 'aktif', dibuat_pada: nowIso() };
          newUsers.push(newSiswa);
          userMap.set(username, newSiswa);
          siswa = newSiswa;
          added++;
        }
        if (!memberSet.has(siswa.id)) {
          newMembers.push({ id: uid(), kelas_id: p.kelas_id, siswa_id: siswa.id });
          memberSet.add(siswa.id);
          linked++;
        } else {
          skipped++;
        }
      });
      if (newUsers.length) insertRows('Users', newUsers);
      if (newMembers.length) insertRows('Anggota_Kelas', newMembers);
      return { added, linked, skipped, message: 'Impor siswa selesai: ' + added + ' akun baru dibuat, ' + linked + ' siswa ditambahkan ke kelas ' + kelas.nama_kelas + ', ' + skipped + ' baris dilewati.' };
    }

    if (type === 'soal') {
      need(u, ['guru', 'admin']);
      let added = 0, skipped = 0;
      const newSoal = [];
      data.forEach(row => {
        const pertanyaan = valueOf(row, ['Soal', 'Pertanyaan', 'pertanyaan', 'Question', 'Pertanyaan Soal']);
        if (!pertanyaan) { skipped++; return; }
        const kunciRaw = valueOf(row, ['Kunci', 'Kunci Jawaban', 'jawaban_benar', 'Jawaban Benar', 'Kunci_Jawaban']);
        const kunci = kunciRaw.toUpperCase() || 'A';
        if (!['A', 'B', 'C', 'D', 'E'].includes(kunci)) { skipped++; return; }
        newSoal.push({
          id: uid(), mapel: valueOf(row, ['Mapel', 'Mata Pelajaran', 'mapel']) || 'Umum',
          pertanyaan, gambar_id: valueOf(row, ['Gambar_ID', 'gambar_id', 'Gambar ID']),
          opsi_a: valueOf(row, ['A', 'Opsi_A', 'Pilihan A']), opsi_b: valueOf(row, ['B', 'Opsi_B', 'Pilihan B']),
          opsi_c: valueOf(row, ['C', 'Opsi_C', 'Pilihan C']), opsi_d: valueOf(row, ['D', 'Opsi_D', 'Pilihan D']),
          opsi_e: valueOf(row, ['E', 'Opsi_E', 'Pilihan E']),
          pembahasan: valueOf(row, ['Pembahasan', 'pembahasan']), jawaban_benar: kunci,
          dibuat_oleh: u.id, dibuat_pada: nowIso()
        });
        added++;
      });
      if (newSoal.length) insertRows('Bank_Soal', newSoal);
      return { added, skipped, message: 'Impor bank soal selesai: ' + added + ' soal ditambahkan, ' + skipped + ' baris dilewati.' };
    }
    throw new Error('Tipe upload tidak valid.');
  },

  // Simpan pratinjau bank soal secara eksplisit dengan batch insert
  bankSoalSavePreview: (u, p) => {
    need(u, ['guru', 'admin']);
    const questions = Array.isArray(p.questions) ? p.questions : [];
    if (!questions.length) throw new Error('Tidak ada soal untuk disimpan.');
    if (questions.length > 1000) throw new Error('Maksimal 1.000 soal per penyimpanan.');
    let added = 0, updated = 0, skipped = 0;
    const toInsert = [];
    questions.forEach(q => {
      const pertanyaan = String(q.pertanyaan || '').trim();
      const a = String(q.opsi_a || '').trim(), b = String(q.opsi_b || '').trim();
      const c = String(q.opsi_c || '').trim(), d = String(q.opsi_d || '').trim();
      const kunci = String(q.jawaban_benar || '').trim().toUpperCase();
      if (!pertanyaan || !a || !b || !c || !d || !['A','B','C','D','E'].includes(kunci)) { skipped++; return; }
      let id = String(q.id || '').trim();
      if (id) {
        const old = table('Bank_Soal').rows.find(x => String(x.id) === id);
        if (!old || (u.role !== 'admin' && old.dibuat_oleh !== u.id)) id = '';
      }
      if (!id) id = uid();
      const exists = table('Bank_Soal').rows.some(x => String(x.id) === id);
      const rowData = {
        id, mapel: String(q.mapel || 'Umum').trim() || 'Umum', pertanyaan,
        gambar_id: String(q.gambar_id || '').trim(),
        opsi_a: a, opsi_b: b, opsi_c: c, opsi_d: d, opsi_e: String(q.opsi_e || '').trim(),
        pembahasan: String(q.pembahasan || '').trim(), jawaban_benar: kunci,
        dibuat_oleh: exists ? (table('Bank_Soal').rows.find(x => String(x.id) === id) || {}).dibuat_oleh || u.id : u.id,
        dibuat_pada: exists ? (table('Bank_Soal').rows.find(x => String(x.id) === id) || {}).dibuat_pada || nowIso() : nowIso()
      };
      if (exists) {
        upsert('Bank_Soal', rowData);
        updated++;
      } else {
        toInsert.push(rowData);
        added++;
      }
    });
    if (toInsert.length) insertRows('Bank_Soal', toInsert);
    return { added, updated, skipped, message: 'Bank soal disimpan: ' + added + ' baru, ' + updated + ' diperbarui, ' + skipped + ' dilewati.' };
  },

  // 2. Upload Gambar Khusus untuk Bank Soal
  uploadGambarSoal: (u, p) => {
    need(u, ['guru', 'admin']);
    if (!p.file || !/^image\/(jpeg|png)$/.test(p.file.mime || '')) throw new Error('Hanya foto JPG atau PNG untuk soal.');
    const bytes = Utilities.base64Decode(String(p.file.data || ''));
    if (bytes.length > MAX_PHOTO_BYTES) throw new Error('Ukuran foto melebihi 2 MB setelah dikompresi.');
    
    const ext = p.file.mime === 'image/png' ? '.png' : '.jpg';
    const name = 'Soal_' + u.id + '_' + Date.now() + ext;
    const file = gambarSoalFolder().createFile(Utilities.newBlob(bytes, p.file.mime, name));
    // Gambar soal harus dapat dibaca dari perangkat siswa saat mengerjakan kuis.
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return { fileId: file.getId(), imageUrl: 'https://drive.google.com/uc?export=view&id=' + encodeURIComponent(file.getId()) };
  },

  // Simpan / update 1 soal Bank Soal secara individual dari modal editor
  bankSoalSave: (u, p) => {
    need(u, ['guru', 'admin']);
    const id = p.id || uid();
    const exists = table('Bank_Soal').rows.some(x => String(x.id) === String(id));
    const obj = {
      id: id,
      mapel: String(p.mapel || 'Umum').trim() || 'Umum',
      kelas: String(p.kelas || '').trim(),
      bab: String(p.bab || '').trim(),
      jenis_soal: String(p.jenis_soal || 'pg').trim(),
      pertanyaan: String(p.pertanyaan || '').trim(),
      gambar_id: String(p.gambar_id || '').trim(),
      opsi_a: String(p.opsi_a || '').trim(),
      opsi_b: String(p.opsi_b || '').trim(),
      opsi_c: String(p.opsi_c || '').trim(),
      opsi_d: String(p.opsi_d || '').trim(),
      opsi_e: String(p.opsi_e || '').trim(),
      jawaban_benar: String(p.jawaban_benar || 'A').trim().toUpperCase(),
      bobot: Number(p.bobot) || 1,
      pembahasan: String(p.pembahasan || '').trim(),
      tingkat_kesulitan: String(p.tingkat_kesulitan || 'Sedang').trim(),
      dibuat_oleh: exists ? (table('Bank_Soal').rows.find(x => String(x.id) === String(id)) || {}).dibuat_oleh || u.id : u.id,
      dibuat_pada: exists ? (table('Bank_Soal').rows.find(x => String(x.id) === String(id)) || {}).dibuat_pada || nowIso() : nowIso()
    };
    if (!obj.pertanyaan) throw new Error('Pertanyaan soal wajib diisi.');
    upsert('Bank_Soal', obj);
    return obj;
  },

  // Hapus 1 soal dari Bank Soal
  bankSoalDelete: (u, p) => {
    need(u, ['guru', 'admin']);
    if (!p.id) throw new Error('ID soal tidak valid.');
    removeWhere('Bank_Soal', x => String(x.id) === String(p.id) && (u.role === 'admin' || x.dibuat_oleh === u.id));
    return true;
  },

  // Simpan draf berkala jawaban siswa saat ujian berlangsung (Autosave)
  quizSaveDraft: (u, p) => {
    need(u, ['siswa']);
    const j = table('Jawaban_Kuis').rows.find(x => x.kuis_id === p.id && x.siswa_id === u.id);
    if (j && j.status === 'Dimulai') {
      upsert('Jawaban_Kuis', { id: j.id, draft_jawaban: JSON.stringify(p.answers || {}) });
    }
    return true;
  }
};