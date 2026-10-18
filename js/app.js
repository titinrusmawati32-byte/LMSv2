/* ===================== KONFIGURASI APLIKASI ===================== */
const IS_PREVIEW = (window.CONFIG && typeof window.CONFIG.IS_PREVIEW === 'boolean') ? window.CONFIG.IS_PREVIEW : false;
const APP_NAME = (window.CONFIG && window.CONFIG.APP_NAME) || 'LMS EduDigital SD';
const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const MAX_MATERI_BYTES = 10 * 1024 * 1024;

const NAV = {
  siswa: [['', 'home', 'Beranda'], ['kelas', 'school', 'Kelas'], ['materi', 'menu_book', 'Materi'], ['tugas', 'assignment', 'Tugas'], ['kuis', 'quiz', 'Kuis'], ['nilai', 'grade', 'Nilai']],
  guru: [['', 'home', 'Beranda'], ['kelas', 'school', 'Kelas'], ['materi', 'menu_book', 'Materi'], ['tugas', 'assignment', 'Tugas'], ['kuis', 'quiz', 'Kuis'], ['nilai', 'grade', 'Nilai']],
  admin: [['', 'home', 'Beranda'], ['pengguna', 'group', 'Pengguna'], ['kelas', 'school', 'Kelas'], ['pengumuman', 'campaign', 'Pengumuman'], ['pengaturan', 'settings', 'Pengaturan']]
};
const TITLES = { '': 'Beranda', materi: 'Materi', kelas: 'Kelas', tugas: 'Tugas', kuis: 'Kuis', nilai: 'Nilai', pengguna: 'Pengguna', pengumuman: 'Pengumuman', pengaturan: 'Pengaturan' };
const BADGE = {
  'Belum Dikumpulkan': ['b-bad', 'error'],
  'Sudah Dikumpulkan': ['b-info', 'task_alt'],
  'Terlambat': ['b-warn', 'schedule'],
  'Sudah Dinilai': ['b-ok', 'verified'],
  'Dimulai': ['b-warn', 'timer'],
  'Selesai': ['b-ok', 'check_circle'],
  'Belum Dikerjakan': ['b-gray', 'hourglass_empty']
};

/* ===================== TEMA TAMPILAN BARU (hanya UI, tidak mengubah fungsi) ===================== */
const SCHOOL_NAME = 'SDN Sumberejo 04';
const STAT_LABEL = { 'Guru': 'Total Guru', 'Siswa': 'Total Siswa', 'Kelas': 'Rombongan Belajar', 'Pengumuman': 'Pengumuman Aktif' };
const STAT_ROUTE = {
  'Guru': '#/pengguna', 'Siswa': '#/pengguna', 'Kelas': '#/kelas', 'Pengumuman': '#/pengumuman',
  'Kelas Diampu': '#/kelas', 'Menunggu Penilaian': '#/tugas', 'Kuis Dibuat': '#/kuis', 'Tugas Aktif': '#/tugas',
  'Tugas Belum Dikumpulkan': '#/tugas', 'Kuis Belum Dikerjakan': '#/kuis', 'Rata-rata Nilai': '#/nilai'
};
const DASH_TITLE = { admin: 'Dashboard Admin', guru: 'Dashboard Guru', siswa: 'Dashboard Siswa' };

const SCHOOL_SVG = '<svg viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gedung sekolah">'
  + '<g fill="#fff" opacity=".85"><ellipse cx="60" cy="34" rx="30" ry="11"/><ellipse cx="84" cy="28" rx="20" ry="10"/><ellipse cx="352" cy="26" rx="28" ry="10"/><ellipse cx="374" cy="21" rx="18" ry="9"/></g>'
  + '<ellipse cx="210" cy="176" rx="210" ry="16" fill="#8FD07F"/>'
  + '<rect x="40" y="108" width="9" height="62" fill="#8B5E3C"/><circle cx="44" cy="92" r="30" fill="#4CAF50"/><circle cx="26" cy="110" r="20" fill="#43A047"/><circle cx="64" cy="110" r="20" fill="#66BB6A"/>'
  + '<rect x="372" y="112" width="9" height="58" fill="#8B5E3C"/><circle cx="376" cy="96" r="28" fill="#4CAF50"/><circle cx="358" cy="114" r="19" fill="#43A047"/><circle cx="396" cy="114" r="19" fill="#66BB6A"/>'
  + '<rect x="112" y="100" width="196" height="70" fill="#FFF4DC"/>'
  + '<rect x="112" y="162" width="196" height="8" fill="#E9D8B4"/>'
  + '<polygon points="100,102 210,62 320,102" fill="#D9453D"/><polygon points="100,102 210,62 320,102 320,108 100,108" fill="#C23A33" opacity=".35"/>'
  + '<rect x="152" y="104" width="116" height="18" rx="3" fill="#fff" stroke="#1E3A8A" stroke-width="1.5"/>'
  + '<text x="210" y="117" text-anchor="middle" font-size="10" font-weight="800" fill="#1E3A8A" font-family="Arial,sans-serif">SDN SUMBEREJO 04</text>'
  + '<g fill="#60A5FA" stroke="#1E3A8A" stroke-width="1.2"><rect x="124" y="128" width="20" height="24" rx="2"/><rect x="152" y="128" width="20" height="24" rx="2"/><rect x="248" y="128" width="20" height="24" rx="2"/><rect x="276" y="128" width="20" height="24" rx="2"/></g>'
  + '<rect x="190" y="130" width="40" height="40" rx="3" fill="#8B5E3C" stroke="#5B3A22" stroke-width="1.5"/><line x1="210" y1="130" x2="210" y2="170" stroke="#5B3A22" stroke-width="1.5"/>'
  + '<rect x="209" y="22" width="2.5" height="42" fill="#64748B"/><rect x="211.5" y="22" width="30" height="10" fill="#EF4444"/><rect x="211.5" y="32" width="30" height="10" fill="#fff" stroke="#E2E8F0" stroke-width=".6"/>'
  + '<g fill="#6BBF59"><ellipse cx="130" cy="172" rx="22" ry="8"/><ellipse cx="292" cy="172" rx="22" ry="8"/></g>'
  + '</svg>';

const MASCOT_SVG = '<svg viewBox="0 0 250 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Siswa bersemangat">'
  + '<path d="M0 195 Q60 160 125 180 T250 172 V215 H0Z" fill="#4CAF50"/><path d="M0 205 Q70 185 130 198 T250 192 V215 H0Z" fill="#43A047"/>'
  /* anak laki-laki */
  + '<g>'
  + '<rect x="40" y="108" width="16" height="44" rx="6" fill="#1D4ED8"/>'
  + '<rect x="66" y="152" width="9" height="30" rx="4" fill="#F2C29B"/><rect x="85" y="152" width="9" height="30" rx="4" fill="#F2C29B"/>'
  + '<rect x="62" y="178" width="17" height="8" rx="4" fill="#334155"/><rect x="81" y="178" width="17" height="8" rx="4" fill="#334155"/>'
  + '<rect x="62" y="134" width="36" height="26" rx="5" fill="#DC2626"/>'
  + '<rect x="58" y="100" width="44" height="42" rx="10" fill="#fff" stroke="#D5E0F0"/>'
  + '<polygon points="77,102 83,102 85,128 80,134 75,128" fill="#DC2626"/>'
  + '<path d="M60 108 L38 86" stroke="#fff" stroke-width="14" stroke-linecap="round"/><path d="M100 108 L122 86" stroke="#fff" stroke-width="14" stroke-linecap="round"/>'
  + '<circle cx="37" cy="83" r="8" fill="#F2C29B"/><circle cx="123" cy="83" r="8" fill="#F2C29B"/>'
  + '<circle cx="80" cy="72" r="26" fill="#F2C29B"/>'
  + '<path d="M54 70 Q54 42 80 42 Q106 42 106 70 Q96 56 80 56 Q64 56 54 70Z" fill="#2B2B3A"/>'
  + '<circle cx="70" cy="75" r="3" fill="#1E293B"/><circle cx="90" cy="75" r="3" fill="#1E293B"/>'
  + '<path d="M70 84 Q80 95 90 84Z" fill="#fff" stroke="#B45309" stroke-width="1.5" stroke-linejoin="round"/>'
  + '<circle cx="63" cy="83" r="4" fill="#F9A8A8" opacity=".7"/><circle cx="97" cy="83" r="4" fill="#F9A8A8" opacity=".7"/>'
  + '</g>'
  /* anak perempuan */
  + '<g transform="translate(92,0)">'
  + '<rect x="60" y="150" width="9" height="30" rx="4" fill="#F2C29B"/><rect x="79" y="150" width="9" height="30" rx="4" fill="#F2C29B"/>'
  + '<rect x="56" y="176" width="17" height="8" rx="4" fill="#334155"/><rect x="75" y="176" width="17" height="8" rx="4" fill="#334155"/>'
  + '<polygon points="54,128 106,128 114,158 46,158" fill="#DC2626"/>'
  + '<rect x="52" y="98" width="44" height="40" rx="10" fill="#fff" stroke="#D5E0F0"/>'
  + '<polygon points="70,100 78,100 74,114" fill="#DC2626"/>'
  + '<path d="M54 106 L34 84" stroke="#fff" stroke-width="14" stroke-linecap="round"/><path d="M94 106 L114 84" stroke="#fff" stroke-width="14" stroke-linecap="round"/>'
  + '<circle cx="32" cy="81" r="8" fill="#F2C29B"/><circle cx="116" cy="81" r="8" fill="#F2C29B"/>'
  + '<circle cx="38" cy="66" r="11" fill="#2B2B3A"/><circle cx="110" cy="66" r="11" fill="#2B2B3A"/>'
  + '<circle cx="74" cy="70" r="26" fill="#F2C29B"/>'
  + '<path d="M48 68 Q48 40 74 40 Q100 40 100 68 Q92 52 74 52 Q56 52 48 68Z" fill="#2B2B3A"/>'
  + '<circle cx="64" cy="73" r="3" fill="#1E293B"/><circle cx="84" cy="73" r="3" fill="#1E293B"/>'
  + '<path d="M64 82 Q74 93 84 82Z" fill="#fff" stroke="#B45309" stroke-width="1.5" stroke-linejoin="round"/>'
  + '<circle cx="57" cy="81" r="4" fill="#F9A8A8" opacity=".7"/><circle cx="91" cy="81" r="4" fill="#F9A8A8" opacity=".7"/>'
  + '</g>'
  + '</svg>';

function initials(name) {
  return String(name || '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function panel(icon, cls, title, sub, link, body, extra) {
  return '<section class="panel ' + (extra || '') + '"><div class="panel-h"><span class="panel-ico ' + cls + '">' + ic(icon) + '</span>'
    + '<div class="panel-hd"><div class="panel-t">' + title + '</div>' + (sub ? '<div class="panel-s">' + sub + '</div>' : '') + '</div>' + (link || '') + '</div>'
    + body + '</section>';
}
const panelLink = (txt, to) => '<button type="button" class="panel-link" data-act="go" data-to="' + to + '">' + txt + '</button>';

function statCards(stats, role) {
  return '<div class="stats4">' + stats.map((s, i) => {
    const label = role === 'admin' ? (STAT_LABEL[s.label] || s.label) : s.label;
    const to = STAT_ROUTE[s.label] || '#/';
    return '<div class="sc c' + (i % 4 + 1) + '" data-act="go" data-to="' + to + '" role="link" tabindex="0">'
      + '<div class="sc-ico">' + ic(s.icon) + '</div>'
      + '<div><div class="sc-num">' + esc(s.value) + '</div><div class="sc-lab">' + esc(label) + '</div></div>'
      + '<span class="sc-go">' + ic('chevron_right') + '</span></div>';
  }).join('') + '</div>';
}

function quickActions(role) {
  const T = {
    admin: [['person_add', 'q1', 'Tambah Pengguna', 'user-new'], ['school', 'q2', 'Kelola Kelas', '#/kelas'], ['campaign', 'q3', 'Buat Pengumuman', 'ann-new'], ['settings', 'q4', 'Pengaturan LMS', '#/pengaturan']],
    guru: [['edit_note', 'q1', 'Buat Tugas', 'pick-class-task'], ['quiz', 'q2', 'Buat Kuis', 'pick-class-quiz'], ['menu_book', 'q3', 'Tambah Materi', '#/materi'], ['campaign', 'q4', 'Buat Pengumuman', 'ann-new']],
    siswa: [['assignment', 'q1', 'Tugas Saya', '#/tugas'], ['quiz', 'q2', 'Kuis', '#/kuis'], ['menu_book', 'q3', 'Materi', '#/materi'], ['grade', 'q4', 'Nilai Saya', '#/nilai']]
  }[role] || [];
  const tiles = T.map(t => '<button type="button" class="qa ' + t[1] + '" '
    + (t[3].charAt(0) === '#' ? 'data-act="go" data-to="' + t[3] + '"' : 'data-act="' + t[3] + '"') + '>'
    + '<span class="qa-ico">' + ic(t[0]) + '</span><span>' + t[2] + '</span></button>').join('');
  return panel('notifications', 'p4', 'Akses Cepat', 'Menu yang sering digunakan', '', '<div class="qa-grid">' + tiles + '</div>');
}

function annPanel(list) {
  const items = (list || []).slice(0, 4).map(a => '<div class="an click" data-act="go" data-to="#/pengumuman" role="link" tabindex="0">'
    + '<span class="an-ico ' + (a.kelas_id ? 'a1' : 'a2') + '">' + ic('campaign') + '</span>'
    + '<div class="an-b"><div class="an-t">' + esc(a.judul) + '</div><div class="an-d">' + fmt(a.dibuat_pada) + '</div></div>'
    + '<span class="badge ' + (a.kelas_id ? 'b-info' : 'b-warn') + '">' + esc(a.kelas_nama) + '</span>' + ic('chevron_right', 'an-go') + '</div>').join('');
  return panel('notifications', 'p4', 'Pengumuman Terbaru', '', panelLink('Lihat Semua', '#/pengumuman'),
    items || '<div class="panel-empty">Belum ada pengumuman.</div>');
}

function barChart(items) {
  const W = 460, H = 220, L = 36, R = 10, T = 18, B = 34;
  const ph = H - T - B;
  const max = Math.max(1, ...items.map(i => i.v));
  const top = Math.max(4, Math.ceil(max / 4) * 4);
  let g = '';
  for (let i = 0; i <= 4; i++) {
    const y = T + ph - ph * i / 4;
    g += '<line x1="' + L + '" y1="' + y + '" x2="' + (W - R) + '" y2="' + y + '" stroke="#E2E8F0" stroke-width="1"' + (i ? ' stroke-dasharray="3 4"' : '') + '/>'
      + '<text x="' + (L - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="#64748B" font-family="Plus Jakarta Sans,Arial,sans-serif">' + Math.round(top * i / 4) + '</text>';
  }
  const slot = (W - L - R) / items.length;
  const bw = Math.min(54, slot * 0.55);
  const bars = items.map((it, i) => {
    const h = Math.max(it.v ? 4 : 0, ph * it.v / top);
    const x = L + slot * i + (slot - bw) / 2;
    const y = T + ph - h;
    return '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + h + '" rx="9" fill="' + it.c + '"/>'
      + '<text x="' + (x + bw / 2) + '" y="' + (y - 6) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#1E3A8A" font-family="Plus Jakarta Sans,Arial,sans-serif">' + it.v + '</text>'
      + '<text x="' + (x + bw / 2) + '" y="' + (H - 12) + '" text-anchor="middle" font-size="12" fill="#475569" font-weight="600" font-family="Plus Jakarta Sans,Arial,sans-serif">' + esc(it.l) + '</text>';
  }).join('');
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Grafik jumlah aktivitas pembelajaran">' + g + bars + '</svg>';
}

function donutChart(items, total) {
  const r = 68, c = 2 * Math.PI * r;
  let off = 0;
  const segs = total ? items.filter(i => i.v > 0).map(i => {
    const len = c * i.v / total;
    const s = '<circle cx="100" cy="100" r="' + r + '" fill="none" stroke="' + i.c + '" stroke-width="30" stroke-dasharray="' + len + ' ' + (c - len) + '" stroke-dashoffset="' + (-off) + '"/>';
    off += len;
    return s;
  }).join('') : '';
  return '<svg viewBox="0 0 200 200" role="img" aria-label="Komposisi pengguna"><g transform="rotate(-90 100 100)"><circle cx="100" cy="100" r="' + r + '" fill="none" stroke="#EEF2F8" stroke-width="30"/>' + segs + '</g>'
    + '<text x="100" y="96" text-anchor="middle" font-size="12" fill="#64748B" font-weight="600" font-family="Plus Jakarta Sans,Arial,sans-serif">Total</text>'
    + '<text x="100" y="122" text-anchor="middle" font-size="30" fill="#1E3A8A" font-weight="800" font-family="Plus Jakarta Sans,Arial,sans-serif">' + total + '</text></svg>';
}

// Optimasi dashboard admin: satu panggilan server menggantikan banyak panggilan berantai.
async function adminExtras() {
  return api('adminDashboardExtras');
}

function buildShell() {
  if (state.shell) return;
  state.shell = true;
  const sb = document.querySelector('.sidebar');
  if (sb) {
    sb.innerHTML = '<div class="sb-brand"><span class="sb-logo">' + ic('school') + '</span>'
      + '<span class="sb-bt"><b>EduDigital SD</b><strong>' + esc(SCHOOL_NAME.toUpperCase()) + '</strong><em>Learning Management System</em></span></div>'
      + '<nav class="sidenav" id="sidenav"></nav>'
      + '<div class="sb-div"></div>'
      + '<div class="sb-art">' + MASCOT_SVG + '</div>'
      + '<div class="sb-motto">Bersama Membangun<br>Generasi Berprestasi</div>'
      + '<div class="sb-credit"><span class="sb-cav">' + ic('groups') + '</span><div><small>Pencipta :</small><b>Timkreatifsdnsumberejo04</b></div></div>';
  }
  const tb = document.querySelector('.topbar');
  if (tb) {
    tb.innerHTML = '<div class="tb-left"><button type="button" class="btn ghost menu-btn" data-act="toggle-nav" aria-label="Buka atau tutup menu">' + ic('menu') + '</button><h1 id="ttl">Beranda</h1></div>'
      + '<div class="actions"><div class="school-pill"><span class="sp-logo">' + ic('school') + '</span><span>' + esc(SCHOOL_NAME) + '</span></div>'
      + '<div class="user-chip click" id="uchip" data-act="go" data-to="#/pengaturan" role="link" tabindex="0"></div>'
      + '<button type="button" class="btn ghost" data-act="go" data-to="#/pengaturan" aria-label="Pengaturan">' + ic('settings') + '</button></div>';
  }
}

function updateClock() {
  const d = $('#wdate'), t = $('#wtime');
  if (!d || !t) { clearInterval(state.clock); return; }
  const n = new Date();
  d.textContent = n.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' });
  t.textContent = n.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' }).replace('.', ':');
}
function startClock() {
  clearInterval(state.clock);
  updateClock();
  state.clock = setInterval(updateClock, 20000);
}

/* ===================== STATE & SESI ===================== */
const state = { token: null, user: null, pending: [], quiz: null, timer: null, submitting: false, filter: '', q: '', subRows: [], curTask: null };
// Penyimpanan sesi berlapis: localStorage lalu sessionStorage. Jika salah satu diblokir browser,
// yang lain tetap dipakai agar login tidak hilang saat halaman dimuat ulang.
const Store = (() => {
  const stores = [];
  [() => window.localStorage, () => window.sessionStorage].forEach(get => {
    try { const s = get(); s.setItem('__lms_t', '1'); s.removeItem('__lms_t'); stores.push(s); } catch (e) { /* tidak tersedia */ }
  });
  return {
    get(k) { for (const s of stores) { try { const v = s.getItem(k); if (v !== null) return v; } catch (e) { /* lanjut */ } } return null; },
    set(k, v) { stores.forEach(s => { try { s.setItem(k, v); } catch (e) { /* lanjut */ } }); },
    del(k) { stores.forEach(s => { try { s.removeItem(k); } catch (e) { /* lanjut */ } }); }
  };
})();
try {
  state.token = Store.get('lms_token') || null;
  state.user = JSON.parse(Store.get('lms_user') || 'null');
} catch (e) { state.token = null; state.user = null; }

function saveSession(token, user) {
  state.token = token || null;
  state.user = user || null;
  if (token) { Store.set('lms_token', token); Store.set('lms_user', JSON.stringify(user)); }
  else { Store.del('lms_token'); Store.del('lms_user'); }
}

/* ===================== HELPER UMUM ===================== */
const $ = s => document.querySelector(s);
const esc = s => String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ic = (n, cls) => '<span class="material-symbols-outlined' + (cls ? ' ' + cls : '') + '">' + n + '</span>';
const fmt = iso => iso ? new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }) : '-';
const toLocalInput = iso => iso ? new Date(new Date(iso).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : '';
const fd = f => Object.fromEntries(new FormData(f).entries());
const pad = n => String(n).padStart(2, '0');
const roleName = r => ({ admin: 'Admin TU', guru: 'Guru', siswa: 'Siswa' })[r] || r;
const empty = msg => '<div class="empty">' + ic('inbox') + '<div>' + esc(msg) + '</div></div>';
const pageHead = (title, right) => '<div class="page-head"><h2 class="pt">' + title + '</h2>' + (right || '') + '</div>';
const badge = s => { const b = BADGE[s] || ['b-info', 'info']; return '<span class="badge ' + b[0] + '">' + ic(b[1]) + ' ' + esc(s) + '</span>'; };
const statusSub = s => {
  if (!s) return 'Belum Dikumpulkan';
  if (s.nilai !== '' && s.nilai !== null && s.nilai !== undefined) return 'Sudah Dinilai';
  return s.status === 'Terlambat' ? 'Terlambat' : 'Sudah Dikumpulkan';
};
function go(to) { if (location.hash === to) render(); else location.hash = to; }

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), 2800);
}
function openModal(html) {
  const m = $('#modal');
  m.innerHTML = '<div class="sheet"><button type="button" class="x" data-act="close-modal" aria-label="Tutup">' + ic('close') + '</button>' + html + '</div>';
  m.classList.remove('hidden');
  loadPhotos(m);
}
function closeModal() { const m = $('#modal'); m.classList.add('hidden'); m.innerHTML = ''; }
function confirmBox(msg, fn) {
  openModal('<p class="t-md">' + esc(msg) + '</p><div class="row-g mt"><button type="button" class="btn sec" data-act="close-modal">Batal</button><button type="button" class="btn" id="cfm-yes">Ya, lanjutkan</button></div>');
  $('#cfm-yes').onclick = async () => {
    closeModal();
    try { await fn(); } catch (e) { toast(e.message); }
  };
}
function showOnce(title, text) {
  openModal('<h3 class="modal-t">' + esc(title) + '</h3><pre class="once">' + esc(text) + '</pre><p class="help">Catat dan berikan kepada pengguna. Informasi ini tidak akan ditampilkan lagi.</p><button type="button" class="btn block" data-act="close-modal">Mengerti</button>');
}
function setErr(f, msg) {
  const el = f.querySelector('.err');
  if (el) el.textContent = msg; else toast(msg);
}

/* ===================== LAPISAN API & CLIENT-SIDE CACHE ===================== */
// Aksi tipe baca yang aman di-cache di memori dan storage browser
const READ_ACTIONS = new Set([
  'home', 'adminDashboardExtras', 'classList', 'classDetail', 'classDetailBundle',
  'materialList', 'materialGet', 'assignmentList', 'assignmentDetail', 'submissionList',
  'quizList', 'quizPageData', 'bankSoalList', 'annList', 'usersList', 'gradesMine', 'gradesClass', 'me'
]);

const CACHE_STORAGE_KEY = 'lms_api_cache_v2';
const CACHE_TTL = 300000; // 5 menit

const ApiCache = (() => {
  const mem = new Map();
  // Muat cache tersimpan dari sessionStorage saat pertama kali dibuka
  try {
    const saved = sessionStorage.getItem(CACHE_STORAGE_KEY);
    if (saved) {
      const obj = JSON.parse(saved);
      const now = Date.now();
      for (const k in obj) {
        if (now - obj[k].time < CACHE_TTL) mem.set(k, obj[k]);
      }
    }
  } catch (e) {}

  function persist() {
    try {
      const obj = {};
      const now = Date.now();
      mem.forEach((v, k) => {
        if (now - v.time < CACHE_TTL) obj[k] = v;
      });
      sessionStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(obj));
    } catch (e) {}
  }

  return {
    get(k) {
      const entry = mem.get(k);
      if (!entry) return null;
      if (Date.now() - entry.time > CACHE_TTL) {
        mem.delete(k);
        return null;
      }
      return entry.data;
    },
    getEntry(k) {
      return mem.get(k) || null;
    },
    set(k, data) {
      mem.set(k, { data: data, time: Date.now() });
      persist();
    },
    clear() {
      mem.clear();
      try { sessionStorage.removeItem(CACHE_STORAGE_KEY); } catch (e) {}
    }
  };
})();

function invalidateApiCache() {
  ApiCache.clear();
}

// In-Flight Request Deduplication: mencegah beberapa request jaringan identik terpanggil bersamaan
const InFlight = new Map();

function fetchApiServer(action, p) {
  let run;
  const isPreview = (window.CONFIG && typeof window.CONFIG.IS_PREVIEW === 'boolean') ? window.CONFIG.IS_PREVIEW : IS_PREVIEW;
  const gasUrl = (window.CONFIG && window.CONFIG.GAS_WEBAPP_URL) ? window.CONFIG.GAS_WEBAPP_URL.trim() : (localStorage.getItem('lms_gas_url') || '');

  if (isPreview) {
    run = Promise.resolve().then(() => PV.run(action, p, state.token));
  } else if (typeof google !== 'undefined' && google.script && google.script.run && typeof google.script.run.withSuccessHandler === 'function') {
    // Mode Google Apps Script internal (iframe / HTML service)
    run = new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler(r => (r && r.ok) ? resolve(r.data) : reject(new Error((r && r.error) || 'Terjadi kesalahan.')))
        .withFailureHandler(err => reject(new Error((err && err.message) || 'Gagal terhubung ke server.')))
        .apiCall(state.token, action, p);
    });
  } else if (gasUrl) {
    // Mode Hosting Eksternal (Vercel / GitHub Pages / Localhost)
    run = fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ token: state.token, action: action, payload: p }),
      redirect: 'follow'
    })
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status + ': ' + res.statusText);
      return res.json();
    })
    .then(r => {
      if (r && r.ok) return r.data;
      throw new Error((r && r.error) || 'Terjadi kesalahan pada respon server.');
    })
    .catch(err => {
      throw new Error('Gagal terhubung ke Google Apps Script: ' + (err.message || String(err)));
    });
  } else {
    run = Promise.reject(new Error(
      'URL Google Apps Script belum dikonfigurasi. Masukkan URL Web App Apps Script (/exec) pada file js/config.js atau klik "Pengaturan Koneksi".'
    ));
  }
  return run;
}

function api(action, p, skipCache = false) {
  p = p || {};
  const isRead = READ_ACTIONS.has(action);
  const cacheKey = isRead ? action + ':' + JSON.stringify(p) : null;

  if (isRead && !skipCache) {
    const cachedData = ApiCache.get(cacheKey);
    if (cachedData !== null) {
      // Data ditemukan di cache (kembalikan instan 0ms)
      const entry = ApiCache.getEntry(cacheKey);
      // Stale-While-Revalidate: Jika cache > 45 detik, perbarui diam-diam di background
      if (entry && (Date.now() - entry.time > 45000) && !InFlight.has(cacheKey)) {
        const bgReq = fetchApiServer(action, p).then(fresh => {
          ApiCache.set(cacheKey, fresh);
        }).catch(() => {}).finally(() => {
          InFlight.delete(cacheKey);
        });
        InFlight.set(cacheKey, bgReq);
      }
      return Promise.resolve(JSON.parse(JSON.stringify(cachedData)));
    }
  }

  // Deduplikasi: jika request identik sedang berjalan di jaringan, gunakan kembali promise tersebut
  if (cacheKey && InFlight.has(cacheKey)) {
    return InFlight.get(cacheKey).then(data => JSON.parse(JSON.stringify(data)));
  }

  const req = fetchApiServer(action, p).then(data => {
    if (isRead && cacheKey) {
      ApiCache.set(cacheKey, data);
    } else if (!isRead) {
      // Setiap mutasi/penyimpanan otomatis menghapus cache lokal agar data selalu mutakhir
      invalidateApiCache();
    }
    return data;
  }).catch(err => {
    if (/Sesi tidak valid/.test(err.message) && action !== 'login') saveSession(null, null);
    throw err;
  }).finally(() => {
    if (cacheKey) InFlight.delete(cacheKey);
  });

  if (cacheKey) InFlight.set(cacheKey, req);
  return req;
}

let prefetching = false;
function prefetchAppData() {
  if (!state.user || !state.token || prefetching) return;
  prefetching = true;
  const role = state.user.role;
  setTimeout(async () => {
    try {
      if (role === 'admin') {
        await Promise.allSettled([
          api('classList'),
          api('usersList', { q: '', role: '' }),
          api('annList')
        ]);
      } else if (role === 'guru') {
        await Promise.allSettled([
          api('classList'),
          api('assignmentList'),
          api('quizList'),
          api('annList')
        ]);
      } else if (role === 'siswa') {
        await Promise.allSettled([
          api('classList'),
          api('assignmentList'),
          api('quizList'),
          api('gradesMine'),
          api('annList')
        ]);
      }
    } catch (e) {
    } finally {
      prefetching = false;
    }
  }, 250);
}

/* ===================== DATA PREVIEW (MODE DEMO) ===================== */
const PV = (() => {
  const D = {
    users: [
      { id: 'u1', username: 'admin', password: 'edudigital', nama: 'Admin TU', role: 'admin', status: 'aktif' },
      { id: 'u2', username: 'guru', password: 'edudigital', nama: 'Ibu Rahmawati, S.Pd.', role: 'guru', status: 'aktif' },
      { id: 'u3', username: 'peserta', password: 'edudigital', nama: 'Budi Pratama', role: 'siswa', status: 'aktif' },
      { id: 'u4', username: 'siti', password: 'edudigital', nama: 'Siti Aminah', role: 'siswa', status: 'aktif' },
      { id: 'u5', username: 'andi', password: 'edudigital', nama: 'Andi Saputra', role: 'siswa', status: 'aktif' }
    ],
    kelas: [{ id: 'k1', nama_kelas: 'Kelas 4A', kode_kelas: '4A-X7K2', guru_id: 'u2', tahun_ajaran: '2026/2027' }],
    anggota: [
      { id: 'a1', kelas_id: 'k1', siswa_id: 'u3' },
      { id: 'a2', kelas_id: 'k1', siswa_id: 'u4' },
      { id: 'a3', kelas_id: 'k1', siswa_id: 'u5' }
    ],
    materi: [
      { id: 'm1', kelas_id: 'k1', judul: 'Pengenalan Pecahan Senilai', deskripsi: 'Memahami pecahan yang nilainya sama dengan contoh visual.', bab: 'Bab 3 Pecahan', urutan: 1, jenis: 'youtube', tautan: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', file_id: '', nama_file: '', mime: '', ukuran: '', dibuat_oleh: 'u2', dibuat_pada: '2026-10-12T02:00:00.000Z' },
      { id: 'm2', kelas_id: 'k1', judul: 'Lembar Latihan Pecahan', deskripsi: 'Kerjakan latihan pada lembar ini sebelum kuis.', bab: 'Bab 3 Pecahan', urutan: 2, jenis: 'drive', tautan: 'https://drive.google.com/file/d/1aB2c3d4e5f6g7h8/view', file_id: '', nama_file: '', mime: '', ukuran: '', dibuat_oleh: 'u2', dibuat_pada: '2026-10-13T02:00:00.000Z' },
      { id: 'm3', kelas_id: 'k1', judul: 'Cara Menanam Hidroponik', deskripsi: 'Langkah sederhana menanam sayuran tanpa tanah.', bab: 'Bab 5 IPA', urutan: 1, jenis: 'youtube', tautan: 'https://youtu.be/aqz-KE-bpKQ', file_id: '', nama_file: '', mime: '', ukuran: '', dibuat_oleh: 'u2', dibuat_pada: '2026-10-09T02:00:00.000Z' }
    ],
    tugas: [
      { id: 't1', kelas_id: 'k1', judul: 'Latihan Pecahan Senilai', deskripsi: 'Kerjakan soal nomor 1 sampai 10 di buku tulis, lalu foto hasilnya.', batas_waktu: '2026-10-20T16:00:00.000Z', nilai_maksimal: 100, dibuat_oleh: 'u2', dibuat_pada: '2026-10-12T02:00:00.000Z' },
      { id: 't2', kelas_id: 'k1', judul: 'Laporan Tanaman Hidroponik', deskripsi: 'Tulis hasil pengamatan tanaman selama dua minggu.', batas_waktu: '2026-10-14T10:00:00.000Z', nilai_maksimal: 100, dibuat_oleh: 'u2', dibuat_pada: '2026-10-05T02:00:00.000Z' },
      { id: 't3', kelas_id: 'k1', judul: 'Cerita Pendek Tentang Keluarga', deskripsi: 'Tulis cerita minimal lima kalimat.', batas_waktu: '2026-10-23T10:00:00.000Z', nilai_maksimal: 100, dibuat_oleh: 'u2', dibuat_pada: '2026-10-13T02:00:00.000Z' }
    ],
    pengumpulan: [
      { id: 'p1', tugas_id: 't2', siswa_id: 'u3', jawaban: 'Kangkung tumbuh lebih cepat dari sawi.', tautan: '', foto_ids: '', waktu_kumpul: '2026-10-13T05:00:00.000Z', nilai: '', feedback: '', status: 'Tepat Waktu' }
    ],
    kuis: [{ id: 'q1', kelas_id: 'k1', judul: 'Kuis Pecahan Bab 3', durasi_menit: 10, dibuat_oleh: 'u2', dibuat_pada: '2026-10-11T02:00:00.000Z' }],
    soal: [
      { id: 's1', kuis_id: 'q1', pertanyaan: 'Pecahan yang senilai dengan 1/2 adalah...', opsi_a: '2/4', opsi_b: '1/3', opsi_c: '2/3', opsi_d: '3/4', jawaban_benar: 'A' },
      { id: 's2', kuis_id: 'q1', pertanyaan: 'Manakah yang lebih besar, 3/4 atau 2/3?', opsi_a: '2/3', opsi_b: '3/4', opsi_c: 'Sama besar', opsi_d: 'Tidak tahu', jawaban_benar: 'B' },
      { id: 's3', kuis_id: 'q1', pertanyaan: 'Hasil dari 1/4 + 1/4 adalah...', opsi_a: '1/8', opsi_b: '2/8', opsi_c: '1/2', opsi_d: '2/4', jawaban_benar: 'C' }
    ],
    jawaban: [],
    pengumuman: [
      { id: 'g1', kelas_id: '', judul: 'Libur Nasional', isi: 'Sekolah libur pada hari Senin. Kegiatan belajar dilanjutkan hari Selasa.', dibuat_oleh: 'u1', dibuat_pada: '2026-10-10T02:00:00.000Z' },
      { id: 'g2', kelas_id: 'k1', judul: 'Jadwal Pengumpulan Proyek', isi: 'Harap kumpulkan foto hasil tugas sebelum Selasa pukul 16.00.', dibuat_oleh: 'u2', dibuat_pada: '2026-10-12T04:00:00.000Z' }
    ],
    bank: [
      { id: 'bs1', mapel: 'Matematika', kelas: 'Kelas 4', bab: 'Pecahan', jenis_soal: 'pg', pertanyaan: 'Pecahan yang senilai dengan 1/2 adalah...', gambar_id: '', opsi_a: '2/4', opsi_b: '1/3', opsi_c: '2/3', opsi_d: '3/4', opsi_e: '', jawaban_benar: 'A', bobot: 1, pembahasan: '1/2 dikalikan 2/2 = 2/4', tingkat_kesulitan: 'Mudah', dibuat_oleh: 'u2', dibuat_pada: '2026-10-11T02:00:00.000Z' },
      { id: 'bs2', mapel: 'IPAS', kelas: 'Kelas 4', bab: 'Fotosintesis', jenis_soal: 'pg', pertanyaan: 'Gas yang diserap tumbuhan saat fotosintesis adalah...', gambar_id: '', opsi_a: 'Oksigen', opsi_b: 'Karbon dioksida', opsi_c: 'Nitrogen', opsi_d: 'Hidrogen', opsi_e: '', jawaban_benar: 'B', bobot: 1, pembahasan: 'Tumbuhan menyerap CO2 dan menghasilkan O2', tingkat_kesulitan: 'Sedang', dibuat_oleh: 'u2', dibuat_pada: '2026-10-12T02:00:00.000Z' }
    ],
    foto: {},
    sesi: {}
  };
  let seq = 100;
  const nid = p => p + (++seq);
  const iso = () => new Date().toISOString();
  const find = (arr, id) => arr.find(x => x.id === id);
  const who = id => find(D.users, id) || {};
  const pub = x => ({ id: x.id, username: x.username, nama: x.nama, role: x.role });
  const kelasOf = id => find(D.kelas, id);
  const myKelas = u => u.role === 'admin' ? D.kelas.map(k => k.id)
    : u.role === 'guru' ? D.kelas.filter(k => k.guru_id === u.id).map(k => k.id)
    : D.anggota.filter(a => a.siswa_id === u.id).map(a => a.kelas_id);
  const can = (u, kid) => myKelas(u).includes(kid);
  const need = (u, roles) => { if (!roles.includes(u.role)) throw new Error('Anda tidak memiliki akses ke halaman ini.'); };
  const ownKelas = (u, kid) => { if (u.role === 'admin') return; need(u, ['guru']); if (kelasOf(kid).guru_id !== u.id) throw new Error('Anda tidak memiliki akses ke kelas ini.'); };
  const needKelas = (u, kid) => { if (!can(u, kid)) throw new Error('Anda tidak memiliki akses ke kelas ini.'); };
  const memberIds = kid => D.anggota.filter(a => a.kelas_id === kid).map(a => a.siswa_id);
  const subOf = (tid, sid) => D.pengumpulan.find(s => s.tugas_id === tid && s.siswa_id === sid) || null;
  const fotoIds = s => (s && s.foto_ids) ? String(s.foto_ids).split(',').filter(Boolean) : [];
  const subOut = s => s ? Object.assign({}, s, { foto_ids: fotoIds(s) }) : null;
  const kelasNama = id => (kelasOf(id) || {}).nama_kelas || '-';
  const tugasOut = (u, t) => {
    const base = { id: t.id, kelas_id: t.kelas_id, kelas_nama: kelasNama(t.kelas_id), judul: t.judul, deskripsi: t.deskripsi, batas_waktu: t.batas_waktu, nilai_maksimal: t.nilai_maksimal };
    if (u.role === 'siswa') base.sub = subOut(subOf(t.id, u.id));
    else { base.total = memberIds(t.kelas_id).length; base.terkumpul = D.pengumpulan.filter(s => s.tugas_id === t.id).length; }
    return base;
  };
  const kuisOut = (u, q) => {
    const base = { id: q.id, kelas_id: q.kelas_id, kelas_nama: kelasNama(q.kelas_id), judul: q.judul, durasi_menit: q.durasi_menit, jumlah_soal: D.soal.filter(s => s.kuis_id === q.id).length };
    if (u.role === 'siswa') base.attempt = D.jawaban.find(j => j.kuis_id === q.id && j.siswa_id === u.id) || null;
    else { base.total = memberIds(q.kelas_id).length; base.selesai = D.jawaban.filter(j => j.kuis_id === q.id && j.status === 'Selesai').length; }
    return base;
  };

  const H = {
    me: u => u,

    // TAMBAHAN MOCK API EXCEL & GAMBAR
    uploadExcelBatch(u, p) {
      return { message: 'Preview: Berhasil simulasi import ' + (p.data ? p.data.length : 0) + ' baris data ' + p.type + '.' };
    },
    uploadGambarSoal(u, p) {
      return { fileId: '1A2b3C4d5E6f7G8h9I0j_PREVIEW_ID' };
    },

    changePassword(u, p) {
      const x = who(u.id);
      if (x.password !== p.old) throw new Error('Password lama tidak sesuai.');
      if (!p.new || String(p.new).length < 6) throw new Error('Password baru minimal 6 karakter.');
      x.password = p.new;
      return true;
    },

    home(u) {
      const pengumuman = H.annList(u).slice(0, 5);
      if (u.role === 'admin') return {
        stats: [
          { label: 'Guru', value: D.users.filter(x => x.role === 'guru').length, icon: 'school' },
          { label: 'Siswa', value: D.users.filter(x => x.role === 'siswa').length, icon: 'group' },
          { label: 'Kelas', value: D.kelas.length, icon: 'class' },
          { label: 'Pengumuman', value: D.pengumuman.length, icon: 'campaign' }
        ], tugas: [], pengumuman
      };
      if (u.role === 'guru') {
        const ids = myKelas(u);
        const tid = D.tugas.filter(t => ids.includes(t.kelas_id)).map(t => t.id);
        const pending = D.pengumpulan.filter(p => tid.includes(p.tugas_id) && (p.nilai === '' || p.nilai == null)).length;
        return {
          stats: [
            { label: 'Kelas Diampu', value: ids.length, icon: 'class' },
            { label: 'Menunggu Penilaian', value: pending, icon: 'rule' },
            { label: 'Kuis Dibuat', value: D.kuis.filter(q => ids.includes(q.kelas_id)).length, icon: 'quiz' },
            { label: 'Tugas Aktif', value: tid.length, icon: 'assignment' }
          ], tugas: H.assignmentList(u).slice(0, 3), pengumuman
        };
      }
      const tugas = H.assignmentList(u);
      const kuis = H.quizList(u);
      const g = H.gradesMine(u);
      return {
        stats: [
          { label: 'Tugas Belum Dikumpulkan', value: tugas.filter(t => !t.sub).length, icon: 'assignment_late' },
          { label: 'Kuis Belum Dikerjakan', value: kuis.filter(q => !q.attempt).length, icon: 'quiz' },
          { label: 'Rata-rata Nilai', value: g.rataTotal == null ? '-' : g.rataTotal, icon: 'grade' },
          { label: 'Pengumuman', value: pengumuman.length, icon: 'campaign' }
        ], tugas: tugas.filter(t => !t.sub).slice(0, 3), pengumuman
      };
    },

    usersList(u, p) {
      need(u, ['admin']);
      const q = String(p.q || '').toLowerCase();
      return D.users
        .filter(x => !p.role || x.role === p.role)
        .filter(x => !q || x.nama.toLowerCase().includes(q) || x.username.toLowerCase().includes(q))
        .sort((a, b) => a.nama.localeCompare(b.nama))
        .map(x => ({ id: x.id, username: x.username, nama: x.nama, role: x.role, status: x.status }));
    },
    userCreate(u, p) {
      need(u, ['admin']);
      const username = String(p.username || '').trim().toLowerCase();
      if (!/^[a-z0-9._]{3,20}$/.test(username)) throw new Error('Username 3–20 karakter: huruf kecil, angka, titik, atau garis bawah.');
      if (D.users.some(x => x.username === username)) throw new Error('Username sudah digunakan.');
      const pw = 'sementara' + Math.floor(100 + Math.random() * 900);
      D.users.push({ id: nid('u'), username, password: pw, nama: String(p.nama || '').trim(), role: p.role, status: 'aktif' });
      return { username, password: pw };
    },
    userUpdate(u, p) {
      need(u, ['admin']);
      const x = find(D.users, p.id); if (!x) throw new Error('Pengguna tidak ditemukan.');
      const username = String(p.username || '').trim().toLowerCase();
      if (!/^[a-z0-9._]{3,20}$/.test(username)) throw new Error('Format username tidak valid.');
      if (D.users.some(y => y.username === username && y.id !== p.id)) throw new Error('Username sudah digunakan.');
      Object.assign(x, { nama: String(p.nama || '').trim(), username, role: p.role });
      return true;
    },
    userToggle(u, p) {
      need(u, ['admin']);
      if (p.id === u.id) throw new Error('Tidak dapat menonaktifkan akun sendiri.');
      const x = find(D.users, p.id); if (!x) throw new Error('Pengguna tidak ditemukan.');
      x.status = x.status === 'aktif' ? 'nonaktif' : 'aktif';
      return true;
    },
    userResetPassword(u, p) {
      need(u, ['admin']);
      const x = find(D.users, p.id); if (!x) throw new Error('Pengguna tidak ditemukan.');
      x.password = 'reset' + Math.floor(1000 + Math.random() * 9000);
      return { password: x.password };
    },

    classList(u) {
      const ids = myKelas(u);
      return D.kelas.filter(k => ids.includes(k.id)).map(k => ({
        id: k.id, nama_kelas: k.nama_kelas, kode_kelas: k.kode_kelas, tahun_ajaran: k.tahun_ajaran,
        guru_id: k.guru_id, guru_nama: who(k.guru_id).nama || '-', jumlah_siswa: memberIds(k.id).length
      }));
    },
    classDetail(u, p) {
      needKelas(u, p.id);
      const k = kelasOf(p.id); if (!k) throw new Error('Kelas tidak ditemukan.');
      const anggota = memberIds(k.id).map(sid => ({ id: sid, nama: who(sid).nama, username: who(sid).username })).sort((a, b) => a.nama.localeCompare(b.nama));
      return { kelas: Object.assign({}, k), guru_nama: who(k.guru_id).nama || '-', anggota };
    },
    classDetailBundle(u, p) {
      return {
        detail: PV.run('classDetail', p, state.token),
        materials: PV.run('materialList', { classId: p.id }, state.token),
        assignments: PV.run('assignmentList', { classId: p.id }, state.token),
        quizzes: PV.run('quizList', { classId: p.id }, state.token)
      };
    },
    classCreate(u, p) {
      need(u, ['admin']);
      if (!p.nama_kelas || !p.tahun_ajaran) throw new Error('Nama kelas dan tahun ajaran wajib diisi.');
      if (!D.users.some(x => x.id === p.guru_id && x.role === 'guru')) throw new Error('Pilih guru pengampu.');
      const k = { id: nid('k'), nama_kelas: p.nama_kelas, kode_kelas: 'KLS' + Math.floor(1000 + Math.random() * 9000), guru_id: p.guru_id, tahun_ajaran: p.tahun_ajaran };
      D.kelas.push(k);
      return k;
    },
    classUpdate(u, p) {
      need(u, ['admin']);
      const k = kelasOf(p.id); if (!k) throw new Error('Kelas tidak ditemukan.');
      Object.assign(k, { nama_kelas: p.nama_kelas, tahun_ajaran: p.tahun_ajaran, guru_id: p.guru_id });
      return true;
    },
    classAddStudent(u, p) {
      need(u, ['admin']);
      const s = who(p.siswa_id);
      if (s.role !== 'siswa') throw new Error('Hanya akun siswa yang dapat ditambahkan.');
      if (D.anggota.some(a => a.kelas_id === p.kelas_id && a.siswa_id === p.siswa_id)) throw new Error('Siswa sudah ada di kelas ini.');
      const tahun = kelasOf(p.kelas_id).tahun_ajaran;
      if (D.anggota.some(a => a.siswa_id === p.siswa_id && (kelasOf(a.kelas_id) || {}).tahun_ajaran === tahun)) throw new Error('Siswa sudah terdaftar di kelas lain pada tahun ajaran ini.');
      D.anggota.push({ id: nid('a'), kelas_id: p.kelas_id, siswa_id: p.siswa_id });
      return true;
    },
    classRemoveStudent(u, p) {
      need(u, ['admin']);
      D.anggota = D.anggota.filter(a => !(a.kelas_id === p.kelas_id && a.siswa_id === p.siswa_id));
      return true;
    },

    materialList(u, p) {
      needKelas(u, p.classId);
      return D.materi.filter(m => m.kelas_id === p.classId).map(matOut).sort(matSort);
    },
    materialGet(u, p) {
      const m = find(D.materi, p.id); if (!m) throw new Error('Materi tidak ditemukan.');
      needKelas(u, m.kelas_id);
      const list = D.materi.filter(x => x.kelas_id === m.kelas_id).map(matOut).sort(matSort);
      const i = list.findIndex(x => x.id === m.id);
      const brief = x => x ? { id: x.id, judul: x.judul } : null;
      return { materi: matOut(m), kelas_nama: kelasNama(m.kelas_id), prev: i > 0 ? brief(list[i - 1]) : null, next: i < list.length - 1 ? brief(list[i + 1]) : null };
    },
    materialFile(u, p) {
      const m = find(D.materi, p.id); if (!m) throw new Error('Materi tidak ditemukan.');
      needKelas(u, m.kelas_id);
      const f = D.foto[m.file_id];
      if (m.jenis !== 'upload' || !f) throw new Error('Materi ini bukan berkas unggahan.');
      return { mime: f.mime, data: f.data, nama: m.nama_file };
    },
    materialSave(u, p) {
      need(u, ['guru']); ownKelas(u, p.kelas_id);
      const judul = String(p.judul || '').trim(); if (!judul) throw new Error('Judul materi wajib diisi.');
      const jenis = String(p.jenis || ''); if (['youtube', 'drive', 'upload'].indexOf(jenis) < 0) throw new Error('Pilih sumber materi.');
      let ex = null;
      if (p.id) { ex = find(D.materi, p.id); if (!ex) throw new Error('Materi tidak ditemukan.'); ownKelas(u, ex.kelas_id); }
      const bab = babOf({ bab: p.bab });
      const obj = { id: p.id || nid('m'), kelas_id: p.kelas_id, judul, deskripsi: String(p.deskripsi || ''), tautan: '', bab,
        urutan: (ex && babOf(ex) === bab) ? (Number(ex.urutan) || 0) : nextUrutanIn(D.materi, p.kelas_id, bab),
        jenis, file_id: '', nama_file: '', mime: '', ukuran: '',
        dibuat_oleh: ex ? ex.dibuat_oleh : u.id, dibuat_pada: ex ? ex.dibuat_pada : iso() };
      if (jenis === 'youtube') {
        if (!/youtu/.test(p.tautan || '')) throw new Error('Tautan YouTube tidak valid.');
        obj.tautan = String(p.tautan).trim();
      } else if (jenis === 'drive') {
        if (!/google\.com/.test(p.tautan || '')) throw new Error('Tautan Google Drive tidak valid.');
        obj.tautan = String(p.tautan).trim();
      } else if (p.file && p.file.data) {
        if (MAT_MIME.indexOf(p.file.mime) < 0) throw new Error('Format berkas tidak didukung. Gunakan PDF, gambar, video MP4, atau dokumen Office.');
        if (p.file.size > 10 * 1024 * 1024) throw new Error('Ukuran berkas melebihi 10 MB.');
        obj.file_id = nid('f');
        D.foto[obj.file_id] = { mime: p.file.mime, data: p.file.data };
        obj.nama_file = String(p.file.name || 'berkas'); obj.mime = p.file.mime; obj.ukuran = p.file.size;
      } else if (ex && ex.jenis === 'upload' && ex.file_id) {
        obj.file_id = ex.file_id; obj.nama_file = ex.nama_file; obj.mime = ex.mime; obj.ukuran = ex.ukuran;
      } else {
        throw new Error('Pilih berkas dari perangkat.');
      }
      if (ex && ex.jenis === 'upload' && ex.file_id && ex.file_id !== obj.file_id) delete D.foto[ex.file_id];
      if (ex) Object.assign(ex, obj); else D.materi.push(obj);
      return matOut(obj);
    },
    materialMove(u, p) {
      need(u, ['guru']);
      const m = find(D.materi, p.id); if (!m) throw new Error('Materi tidak ditemukan.');
      ownKelas(u, m.kelas_id);
      const same = D.materi.filter(x => x.kelas_id === m.kelas_id && babOf(x) === babOf(m)).map(matOut).sort(matSort);
      const i = same.findIndex(x => x.id === m.id);
      const j = p.dir === 'up' ? i - 1 : i + 1;
      if (i < 0 || j < 0 || j >= same.length) return true;
      same.forEach((x, k) => { x.nomor = k + 1; });
      const a = same[i], b = same[j];
      find(D.materi, a.id).urutan = b.nomor;
      find(D.materi, b.id).urutan = a.nomor;
      return true;
    },
    materialDelete(u, p) {
      need(u, ['guru']);
      const m = find(D.materi, p.id); if (!m) throw new Error('Materi tidak ditemukan.');
      ownKelas(u, m.kelas_id);
      if (m.file_id) delete D.foto[m.file_id];
      D.materi = D.materi.filter(x => x.id !== p.id);
      return true;
    },

    assignmentList(u, p) {
      p = p || {};
      if (p.classId) needKelas(u, p.classId);
      const ids = p.classId ? [p.classId] : myKelas(u);
      return D.tugas.filter(t => ids.includes(t.kelas_id))
        .map(t => tugasOut(u, t))
        .sort((a, b) => String(a.batas_waktu).localeCompare(String(b.batas_waktu)));
    },
    assignmentDetail(u, p) {
      const t = find(D.tugas, p.id); if (!t) throw new Error('Tugas tidak ditemukan.');
      needKelas(u, t.kelas_id);
      return { tugas: Object.assign({}, t), kelas_nama: kelasNama(t.kelas_id), sub: u.role === 'siswa' ? subOut(subOf(t.id, u.id)) : null };
    },
    assignmentSave(u, p) {
      need(u, ['guru']); ownKelas(u, p.kelas_id);
      if (!String(p.judul || '').trim() || !p.batas_waktu) throw new Error('Judul dan batas waktu wajib diisi.');
      const bw = new Date(p.batas_waktu);
      const max = Number(p.nilai_maksimal) || 100;
      if (max < 1 || max > 100) throw new Error('Nilai maksimal antara 1 dan 100.');
      let ex = null;
      if (p.id) { ex = find(D.tugas, p.id); if (!ex) throw new Error('Tugas tidak ditemukan.'); ownKelas(u, ex.kelas_id); }
      else if (bw <= new Date()) throw new Error('Batas waktu harus di masa depan.');
      const obj = { id: p.id || nid('t'), kelas_id: p.kelas_id, judul: String(p.judul).trim(), deskripsi: String(p.deskripsi || ''), batas_waktu: bw.toISOString(), nilai_maksimal: max, dibuat_oleh: u.id, dibuat_pada: ex ? ex.dibuat_pada : iso() };
      if (ex) Object.assign(ex, obj); else D.tugas.push(obj);
      return obj;
    },
    submissionSave(u, p) {
      need(u, ['siswa']);
      const t = find(D.tugas, p.assignmentId); if (!t) throw new Error('Tugas tidak ditemukan.');
      needKelas(u, t.kelas_id);
      const now = new Date(), deadline = new Date(t.batas_waktu);
      const s = subOf(t.id, u.id);
      if (s && now > deadline) throw new Error('Pengumpulan tidak dapat diubah setelah batas waktu.');
      const lama = fotoIds(s);
      const baru = Array.isArray(p.photos) ? p.photos : [];
      if (lama.length + baru.length > MAX_PHOTOS) throw new Error('Maksimal ' + MAX_PHOTOS + ' foto per pengumpulan.');
      const jawaban = String(p.jawaban || '').trim(), tautan = String(p.tautan || '').trim();
      if (!jawaban && !tautan && lama.length + baru.length === 0) throw new Error('Isi jawaban, tautan, atau unggah foto terlebih dahulu.');
      if (tautan && !/^https?:\/\//i.test(tautan)) throw new Error('Tautan harus diawali https://');
      const ids = lama.concat(baru.map(ph => {
        if (!/^image\/(jpeg|png)$/.test(ph.mime || '')) throw new Error('Hanya foto JPG atau PNG.');
        const fid = nid('f');
        D.foto[fid] = { mime: ph.mime, data: ph.data };
        return fid;
      }));
      const obj = { id: s ? s.id : nid('p'), tugas_id: t.id, siswa_id: u.id, jawaban, tautan, foto_ids: ids.join(','), waktu_kumpul: iso(), nilai: s ? s.nilai : '', feedback: s ? s.feedback : '', status: now > deadline ? 'Terlambat' : 'Tepat Waktu' };
      if (s) Object.assign(s, obj); else D.pengumpulan.push(obj);
      return subOut(obj);
    },
    photoDelete(u, p) {
      need(u, ['siswa']);
      const s = find(D.pengumpulan, p.submissionId);
      if (!s || s.siswa_id !== u.id) throw new Error('Pengumpulan tidak ditemukan.');
      if (new Date() > new Date(find(D.tugas, s.tugas_id).batas_waktu)) throw new Error('Foto tidak dapat dihapus setelah batas waktu.');
      s.foto_ids = fotoIds(s).filter(x => x !== p.fileId).join(',');
      delete D.foto[p.fileId];
      return subOut(s);
    },
    photoGet(u, p) {
      const s = find(D.pengumpulan, p.submissionId);
      if (!s || !fotoIds(s).includes(p.fileId)) throw new Error('Foto tidak ditemukan.');
      if (u.role === 'siswa' && s.siswa_id !== u.id) throw new Error('Anda tidak memiliki akses ke foto ini.');
      if (u.role === 'guru') ownKelas(u, find(D.tugas, s.tugas_id).kelas_id);
      const f = D.foto[p.fileId];
      if (!f) throw new Error('Foto tidak ditemukan.');
      return { mime: f.mime, data: f.data };
    },
    submissionList(u, p) {
      need(u, ['guru', 'admin']);
      const t = find(D.tugas, p.assignmentId); if (!t) throw new Error('Tugas tidak ditemukan.');
      ownKelas(u, t.kelas_id);
      return memberIds(t.kelas_id)
        .map(sid => ({ siswa_id: sid, nama: who(sid).nama, submission: subOut(subOf(t.id, sid)) }))
        .sort((a, b) => a.nama.localeCompare(b.nama));
    },
    submissionGrade(u, p) {
      need(u, ['guru']);
      const s = find(D.pengumpulan, p.submissionId); if (!s) throw new Error('Pengumpulan tidak ditemukan.');
      const t = find(D.tugas, s.tugas_id);
      ownKelas(u, t.kelas_id);
      if (p.nilai === '' || p.nilai == null) throw new Error('Isi nilai terlebih dahulu.');
      const n = Number(p.nilai);
      if (isNaN(n) || n < 0 || n > Number(t.nilai_maksimal)) throw new Error('Nilai harus antara 0 dan ' + t.nilai_maksimal + '.');
      s.nilai = n;
      s.feedback = String(p.feedback || '');
      return true;
    },

    quizList(u, p) {
      p = p || {};
      if (p.classId) needKelas(u, p.classId);
      const ids = p.classId ? [p.classId] : myKelas(u);
      return D.kuis.filter(q => ids.includes(q.kelas_id)).map(q => kuisOut(u, q))
        .sort((a, b) => a.judul.localeCompare(b.judul));
    },
    quizPageData(u, p) {
      return {
        quizzes: H.quizList(u, p),
        bank: (u.role === 'guru' || u.role === 'admin') ? (D.bank || []) : []
      };
    },
    bankSoalList(u, p) {
      need(u, ['guru', 'admin']);
      return (D.bank || []).filter(q => u.role === 'admin' || q.dibuat_oleh === u.id);
    },
    bankSoalSave(u, p) {
      need(u, ['guru', 'admin']);
      if (!D.bank) D.bank = [];
      const id = p.id || nid('bs');
      const idx = D.bank.findIndex(x => x.id === id);
      const item = {
        id,
        mapel: p.mapel || 'Umum',
        kelas: p.kelas || '',
        bab: p.bab || '',
        jenis_soal: p.jenis_soal || 'pg',
        pertanyaan: p.pertanyaan || '',
        gambar_id: p.gambar_id || '',
        opsi_a: p.opsi_a || '',
        opsi_b: p.opsi_b || '',
        opsi_c: p.opsi_c || '',
        opsi_d: p.opsi_d || '',
        opsi_e: p.opsi_e || '',
        jawaban_benar: (p.jawaban_benar || 'A').toUpperCase(),
        bobot: Number(p.bobot) || 1,
        pembahasan: p.pembahasan || '',
        tingkat_kesulitan: p.tingkat_kesulitan || 'Sedang',
        dibuat_oleh: u.id,
        dibuat_pada: iso()
      };
      if (idx >= 0) D.bank[idx] = item;
      else D.bank.unshift(item);
      return item;
    },
    bankSoalDelete(u, p) {
      need(u, ['guru', 'admin']);
      if (!D.bank) D.bank = [];
      D.bank = D.bank.filter(x => x.id !== p.id);
      return true;
    },
    quizSaveDraft(u, p) {
      need(u, ['siswa']);
      let j = D.jawaban.find(x => x.kuis_id === p.id && x.siswa_id === u.id);
      if (j) j.draft_jawaban = JSON.stringify(p.answers || {});
      return true;
    },
    quizSave(u, p) {
      need(u, ['guru']); ownKelas(u, p.kelas_id);
      if (!String(p.judul || '').trim()) throw new Error('Judul kuis wajib diisi.');
      const dur = Number(p.durasi_menit);
      if (!(dur >= 1 && dur <= 180)) throw new Error('Durasi kuis 1–180 menit.');
      const qs = Array.isArray(p.questions) ? p.questions : [];
      const valid = qs.filter(x => x.pertanyaan && x.opsi_a && x.opsi_b && x.opsi_c && x.opsi_d && ['A', 'B', 'C', 'D'].includes(x.jawaban_benar));
      if (valid.length === 0) throw new Error('Tambahkan minimal satu soal lengkap.');
      if (valid.length !== qs.length) throw new Error('Semua soal harus lengkap dengan jawaban benar.');
      const kuis = { id: nid('q'), kelas_id: p.kelas_id, judul: String(p.judul).trim(), durasi_menit: dur, dibuat_oleh: u.id, dibuat_pada: iso() };
      D.kuis.push(kuis);
      valid.forEach(x => D.soal.push({ id: nid('s'), kuis_id: kuis.id, pertanyaan: x.pertanyaan, opsi_a: x.opsi_a, opsi_b: x.opsi_b, opsi_c: x.opsi_c, opsi_d: x.opsi_d, jawaban_benar: x.jawaban_benar }));
      return kuis;
    },
    quizStart(u, p) {
      need(u, ['siswa']);
      const q = find(D.kuis, p.id); if (!q) throw new Error('Kuis tidak ditemukan.');
      needKelas(u, q.kelas_id);
      let j = D.jawaban.find(x => x.kuis_id === q.id && x.siswa_id === u.id);
      if (j && j.status === 'Selesai') throw new Error('Anda sudah mengerjakan kuis ini.');
      if (!j) { j = { id: nid('j'), kuis_id: q.id, siswa_id: u.id, skor: '', waktu_mulai: iso(), waktu_selesai: '', status: 'Dimulai', jawaban: '' }; D.jawaban.push(j); }
      const soal = D.soal.filter(s => s.kuis_id === q.id).map(s => ({ id: s.id, pertanyaan: s.pertanyaan, opsi_a: s.opsi_a, opsi_b: s.opsi_b, opsi_c: s.opsi_c, opsi_d: s.opsi_d }));
      return { judul: q.judul, durasi_menit: q.durasi_menit, waktu_mulai: j.waktu_mulai, soal };
    },
    quizSubmit(u, p) {
      need(u, ['siswa']);
      const q = find(D.kuis, p.id); if (!q) throw new Error('Kuis tidak ditemukan.');
      const j = D.jawaban.find(x => x.kuis_id === q.id && x.siswa_id === u.id);
      if (!j || j.status !== 'Dimulai') throw new Error('Kuis belum dimulai atau sudah selesai dikerjakan.');
      const soal = D.soal.filter(s => s.kuis_id === q.id);
      const ans = p.answers || {};
      const benar = soal.filter(s => ans[s.id] === s.jawaban_benar).length;
      const skor = soal.length ? Math.round(benar / soal.length * 100) : 0;
      Object.assign(j, { skor, waktu_selesai: iso(), status: 'Selesai', jawaban: JSON.stringify(ans) });
      return { skor, benar, total: soal.length };
    },
    quizResults(u, p) {
      need(u, ['guru', 'admin']);
      const q = find(D.kuis, p.id); if (!q) throw new Error('Kuis tidak ditemukan.');
      ownKelas(u, q.kelas_id);
      const rows = memberIds(q.kelas_id).map(sid => {
        const j = D.jawaban.find(x => x.kuis_id === q.id && x.siswa_id === sid);
        return { siswa_id: sid, nama: who(sid).nama, status: j ? j.status : 'Belum Dikerjakan', skor: j && j.status === 'Selesai' ? j.skor : '', waktu_selesai: j ? j.waktu_selesai : '' };
      }).sort((a, b) => a.nama.localeCompare(b.nama));
      return { judul: q.judul, rows };
    },

    gradesMine(u) {
      need(u, ['siswa']);
      const kelas = myKelas(u).map(kid => {
        const items = [];
        D.tugas.filter(t => t.kelas_id === kid).forEach(t => {
          const s = subOf(t.id, u.id);
          if (s && s.nilai !== '' && s.nilai != null) items.push({ jenis: 'Tugas', judul: t.judul, nilai: Math.round(Number(s.nilai) / Number(t.nilai_maksimal) * 100) });
        });
        D.kuis.filter(q => q.kelas_id === kid).forEach(q => {
          const j = D.jawaban.find(x => x.kuis_id === q.id && x.siswa_id === u.id && x.status === 'Selesai');
          if (j) items.push({ jenis: 'Kuis', judul: q.judul, nilai: Number(j.skor) });
        });
        const rata = items.length ? Math.round(items.reduce((a, b) => a + b.nilai, 0) / items.length) : null;
        return { id: kid, nama_kelas: kelasNama(kid), rata, items };
      });
      const semua = kelas.reduce((a, k) => a.concat(k.items.map(i => i.nilai)), []);
      return {
        rumus: 'Setiap tugas dan kuis yang sudah dinilai dihitung dalam skala 0–100. Rata-rata adalah jumlah nilai dibagi jumlah tugas dan kuis tersebut.',
        kelas,
        rataTotal: semua.length ? Math.round(semua.reduce((a, b) => a + b, 0) / semua.length) : null
      };
    },
    gradesClass(u, p) {
      need(u, ['guru', 'admin']);
      needKelas(u, p.classId); ownKelas(u, p.classId);
      const tugas = D.tugas.filter(t => t.kelas_id === p.classId);
      const kuis = D.kuis.filter(q => q.kelas_id === p.classId);
      const rows = memberIds(p.classId).map(sid => {
        const items = [];
        let dinilai = 0;
        tugas.forEach(t => {
          const s = subOf(t.id, sid);
          if (s && s.nilai !== '' && s.nilai != null) { dinilai++; items.push(Math.round(Number(s.nilai) / Number(t.nilai_maksimal) * 100)); }
        });
        let selesai = 0;
        kuis.forEach(q => {
          const j = D.jawaban.find(x => x.kuis_id === q.id && x.siswa_id === sid && x.status === 'Selesai');
          if (j) { selesai++; items.push(Number(j.skor)); }
        });
        return { siswa_id: sid, nama: who(sid).nama, tugas_dinilai: dinilai, kuis_selesai: selesai, rata: items.length ? Math.round(items.reduce((a, b) => a + b, 0) / items.length) : null };
      }).sort((a, b) => a.nama.localeCompare(b.nama));
      return { rows };
    },

    annList(u) {
      const ids = myKelas(u);
      return D.pengumuman
        .filter(a => u.role === 'admin' || a.kelas_id === '' || ids.includes(a.kelas_id))
        .map(a => ({ id: a.id, kelas_id: a.kelas_id, kelas_nama: a.kelas_id ? kelasNama(a.kelas_id) : 'Semua Kelas', judul: a.judul, isi: a.isi, dibuat_oleh_nama: who(a.dibuat_oleh).nama || '-', dibuat_pada: a.dibuat_pada }))
        .sort((a, b) => String(b.dibuat_pada).localeCompare(String(a.dibuat_pada)));
    },
    annSave(u, p) {
      need(u, ['admin', 'guru']);
      if (!String(p.judul || '').trim() || !String(p.isi || '').trim()) throw new Error('Judul dan isi wajib diisi.');
      if (u.role === 'guru') { if (!p.kelas_id) throw new Error('Pilih kelas untuk pengumuman.'); ownKelas(u, p.kelas_id); }
      const a = { id: nid('g'), kelas_id: p.kelas_id || '', judul: String(p.judul).trim(), isi: String(p.isi).trim(), dibuat_oleh: u.id, dibuat_pada: iso() };
      D.pengumuman.push(a);
      return a;
    }
  };

  // Mode demo: sesi hanya ada di memori halaman. Saat halaman dimuat ulang, pulihkan sesi dari token
  // yang tersimpan di browser selama akun yang sama masih ada dan aktif.
  function restoreSesi(token) {
    if (!token || String(token).indexOf('pv') !== 0) return null;
    try {
      const su = JSON.parse(Store.get('lms_user') || 'null');
      const x = su && find(D.users, su.id);
      if (x && x.status === 'aktif') { D.sesi[token] = x.id; return x.id; }
    } catch (e) { /* abaikan */ }
    return null;
  }

  function call(action, p, token) {
    if (action === 'login') {
      const x = D.users.find(v => v.username === String(p.username || '').trim() && v.password === p.password && v.status === 'aktif');
      if (!x) throw new Error('Username atau password salah.');
      const t = 'pv' + nid('');
      D.sesi[t] = x.id;
      return { token: t, user: pub(x) };
    }
    const uid = D.sesi[token] || restoreSesi(token);
    if (!uid) throw new Error('Sesi tidak valid. Silakan login kembali.');
    if (action === 'logout') { delete D.sesi[token]; return true; }
    const u = pub(who(uid));
    if (!H[action]) throw new Error('Aksi tidak dikenal: ' + action);
    return H[action](u, p);
  }

  return {
    run: (action, p, token) => new Promise((resolve, reject) => {
      setTimeout(() => { try { resolve(call(action, p || {}, token)); } catch (e) { reject(e); } }, 150);
    })
  };
})();
/* ===================== KOMPONEN KARTU ===================== */
function tugasStatus(t) {
  return state.user.role === 'siswa' ? statusSub(t.sub) : (t.terkumpul + ' dari ' + t.total + ' terkumpul');
}
function tugasCard(t) {
  const late = new Date(t.batas_waktu) < new Date();
  const right = state.user.role === 'siswa'
    ? badge(statusSub(t.sub))
    : '<span class="badge b-gray">' + esc(tugasStatus(t)) + '</span>';
  return '<div class="card click" data-act="go" data-to="#/tugas/' + t.id + '" role="link" tabindex="0">'
    + '<div class="row"><span class="badge b-info">' + esc(t.kelas_nama || '') + '</span>' + right + '</div>'
    + '<div class="t-md mt8">' + esc(t.judul) + '</div>'
    + '<div class="muted">' + ic('event') + ' Tenggat: ' + fmt(t.batas_waktu) + (late ? ' · <b>sudah lewat</b>' : '') + '</div></div>';
}
function quizCard(q) {
  const u = state.user;
  const st = u.role === 'siswa'
    ? (q.attempt ? (q.attempt.status === 'Selesai' ? 'Selesai' : 'Dimulai') : 'Belum Dikerjakan')
    : (q.selesai + ' dari ' + q.total + ' selesai');
  const skor = (u.role === 'siswa' && q.attempt && q.attempt.status === 'Selesai') ? ' · Skor: <b>' + esc(q.attempt.skor) + '</b>' : '';
  return '<div class="card click" data-act="go" data-to="#/kuis/' + q.id + '" role="link" tabindex="0">'
    + '<div class="row"><span class="badge b-info">' + esc(q.kelas_nama) + '</span>'
    + (u.role === 'siswa' ? badge(st) : '<span class="badge b-gray">' + esc(st) + '</span>') + '</div>'
    + '<div class="t-md mt8">' + esc(q.judul) + '</div>'
    + '<div class="muted">' + ic('timer') + ' ' + q.durasi_menit + ' menit · ' + q.jumlah_soal + ' soal' + skor + '</div></div>';
}
function annCard(a) {
  return '<div class="card"><div class="row"><span class="badge ' + (a.kelas_id ? 'b-info' : 'b-warn') + '">' + esc(a.kelas_nama) + '</span>'
    + '<span class="muted">' + fmt(a.dibuat_pada) + '</span></div>'
    + '<div class="t-md mt8">' + esc(a.judul) + '</div><p class="mt">' + esc(a.isi) + '</p>'
    + '<div class="muted">Oleh ' + esc(a.dibuat_oleh_nama) + '</div></div>';
}

/* ===================== GAMBAR (FOTO TUGAS) ===================== */
// Foto disimpan di Drive sekolah. Browser meminta data gambar lewat photoGet agar akses tetap dikendalikan backend.
function loadPhotos(root) {
  root.querySelectorAll('img[data-fid]').forEach(async img => {
    try {
      const r = await api('photoGet', { fileId: img.dataset.fid, submissionId: img.dataset.sid });
      img.src = 'data:' + r.mime + ';base64,' + r.data;
    } catch (e) {
      img.alt = 'Foto tidak dapat dimuat';
    }
  });
}

/* ===================== HALAMAN: BERANDA ===================== */
async function pageHome() {
  const u = state.user;
  const admin = u.role === 'admin';
  // Muat ringkasan beranda dan data grafik secara bersamaan agar tidak menunggu berantai.
  const [d, ex] = admin
    ? await Promise.all([api('home'), adminExtras()])
    : [await api('home'), null];
  if (admin && ex && Array.isArray(ex.users)) {
    ApiCache.set('usersList:{"q":"","role":""}', ex.users);
  }
  const kalimat = u.role === 'siswa' ? 'Semangat belajar! Cek tugas, kuis, dan materi kamu hari ini di ' + SCHOOL_NAME + '.'
    : u.role === 'guru' ? 'Pantau tugas, kuis, dan nilai kelas Anda di ' + SCHOOL_NAME + ' dengan mudah.'
    : 'Kelola pengguna, kelas, dan seluruh aktivitas pembelajaran di ' + SCHOOL_NAME + ' dengan mudah.';
  const banner = '<section class="welcome"><div class="w-main"><span class="w-sun">' + ic('wb_sunny') + '</span><div>'
    + '<div class="w-hi">Selamat Datang,</div><div class="w-name">' + esc(u.nama) + '</div>'
    + '<p class="w-txt">' + kalimat + '</p>'
    + '<div class="w-date">' + ic('calendar_month') + '<span id="wdate"></span><i></i><span id="wtime"></span></div></div></div>'
    + '<div class="w-art">' + SCHOOL_SVG + '</div>'
    + '<div class="w-quote">&ldquo;Pendidikan adalah kunci masa depan&rdquo;' + ic('favorite') + '</div></section>';
  const stats = statCards(d.stats, u.role);

  if (admin) {
    const us = ex.users;
    const cnt = r => us.filter(x => x.role === r).length;
    const items = [{ l: 'Siswa', v: cnt('siswa'), c: '#3B82F6' }, { l: 'Guru', v: cnt('guru'), c: '#22C55E' }, { l: 'Admin TU', v: cnt('admin'), c: '#8B5CF6' }];
    const total = items.reduce((a, i) => a + i.v, 0);
    const legend = '<div class="legend">' + items.map(i => '<div class="lg"><i style="background:' + i.c + '"></i>' + i.l + '<b>' + i.v + '</b><span class="pc">' + (total ? Math.round(i.v / total * 100) : 0) + '%</span></div>').join('') + '</div>';
    const act = [{ l: 'Kelas', v: ex.kelas, c: '#3B82F6' }, { l: 'Materi', v: ex.materi, c: '#22C55E' }, { l: 'Tugas', v: ex.tugas, c: '#8B5CF6' }, { l: 'Kuis', v: ex.kuis, c: '#F59E0B' }];
    const chart = '<div class="chart-wrap">' + barChart(act) + '</div><div class="chart-note">Jumlah konten pembelajaran yang tersedia di seluruh kelas.</div>';
    const rows = us.slice(0, 5).map(x => '<tr><td><div class="uname"><span class="uav r-' + esc(x.role) + '">' + esc(initials(x.nama)) + '</span>' + esc(x.nama) + '</div></td>'
      + '<td>' + roleName(x.role) + '</td><td>' + (x.status === 'aktif' ? '<span class="badge b-ok">Aktif</span>' : '<span class="badge b-bad">Nonaktif</span>') + '</td></tr>').join('');
    const tabel = rows ? '<div class="tbl-wrap"><table class="ut"><thead><tr><th>Nama</th><th>Peran</th><th>Status</th></tr></thead><tbody>' + rows + '</tbody></table></div>' : '<div class="panel-empty">Belum ada pengguna.</div>';
    return banner + stats
      + '<div class="dg dg-3">'
      + panel('monitoring', 'p1', 'Aktivitas Pembelajaran', 'Ringkasan konten di seluruh kelas', '', chart)
      + panel('pie_chart', 'p2', 'Komposisi Pengguna', 'Berdasarkan peran dalam sistem', '', '<div class="donut-wrap">' + donutChart(items, total) + '</div>' + legend)
      + quickActions('admin')
      + '</div>'
      + '<div class="dg dg-2">'
      + panel('person', 'p3', 'Daftar Pengguna', '', panelLink('Lihat Semua', '#/pengguna'), tabel)
      + annPanel(d.pengumuman)
      + '</div>';
  }

  const judulTugas = u.role === 'siswa' ? 'Tugas Mendekati Tenggat' : 'Tugas Terbaru';
  const tugasBody = d.tugas.length ? '<div class="list">' + d.tugas.map(tugasCard).join('') + '</div>' : '<div class="panel-empty">Belum ada tugas.</div>';
  return banner + stats
    + '<div class="dg dg-2">'
    + panel('assignment', 'p1', judulTugas, '', panelLink('Lihat Semua', '#/tugas'), tugasBody)
    + quickActions(u.role)
    + '</div>'
    + '<div class="dg">' + annPanel(d.pengumuman) + '</div>';
}

/* ===================== HALAMAN: KELAS ===================== */
async function pageKelas() {
  const admin = state.user.role === 'admin';
  const list = await api('classList');
  return pageHead('Kelas', admin ? '<button type="button" class="btn" data-act="class-new">' + ic('add') + ' Tambah Kelas</button>' : '')
    + '<div class="list">' + (list.length ? list.map(k => '<div class="card click" data-act="go" data-to="#/kelas/' + k.id + '" role="link" tabindex="0">'
      + '<div class="row"><strong class="t-lg">' + esc(k.nama_kelas) + '</strong><span class="badge b-info">' + esc(k.tahun_ajaran) + '</span></div>'
      + '<div class="muted">' + ic('person') + ' ' + esc(k.guru_nama) + ' · ' + k.jumlah_siswa + ' siswa</div>'
      + (admin ? '<div class="muted">Kode kelas: <b>' + esc(k.kode_kelas) + '</b></div>' : '') + '</div>').join('') : empty('Belum ada kelas.')) + '</div>';
}
async function pageKelasDetail(id) {
  const u = state.user;
  let d, mats, tugas, kuis;
  try {
    const bundle = await api('classDetailBundle', { id: id });
    d = bundle.detail;
    mats = bundle.materials;
    tugas = bundle.assignments;
    kuis = bundle.quizzes;
  } catch (e) {
    [d, mats, tugas, kuis] = await Promise.all([
      api('classDetail', { id: id }), api('materialList', { classId: id }),
      api('assignmentList', { classId: id }), api('quizList', { classId: id })
    ]);
  }
  const k = d.kelas;
  const guru = u.role === 'guru' && k.guru_id === u.id;
  const admin = u.role === 'admin';
  const matHtml = materiGroups(mats, guru);
  const btnUploadSiswa = guru ? '<button type="button" class="btn sec sm" data-act="download-template" data-type="siswa" style="margin-right:8px;">' + ic('download') + ' Template Excel</button><button type="button" class="btn sec sm" data-act="upload-excel" data-type="siswa" data-kelas="' + id + '" style="margin-right:8px;">' + ic('upload_file') + ' Upload Excel Siswa</button>' : '';
  const anggotaHtml = d.anggota.length ? d.anggota.map(a => '<div class="row line"><span>' + esc(a.nama) + ' <span class="muted">(' + esc(a.username) + ')</span></span>'
      + (admin ? '<button type="button" class="btn ghost sm" data-act="class-remove" data-kelas="' + id + '" data-siswa="' + a.id + '" aria-label="Keluarkan siswa">' + ic('person_remove') + '</button>' : '') + '</div>').join('') : empty('Belum ada siswa.');
  
  return '<div class="hero"><div class="opacity">Kode kelas: ' + esc(k.kode_kelas) + '</div>'
    + '<div class="hero-t">' + esc(k.nama_kelas) + '</div><div>' + ic('person') + ' ' + esc(d.guru_nama) + ' · ' + esc(k.tahun_ajaran) + '</div>'
    + (admin ? '<div class="mt"><button type="button" class="btn sec" style="color:#fff;border-color:#fff" data-act="class-edit" data-id="' + id + '">' + ic('edit') + ' Ubah Kelas</button></div>' : '') + '</div>'
    + '<div class="h2row"><h3 class="h2">Materi</h3>' + (guru ? '<button type="button" class="btn sm" data-act="mat-new" data-kelas="' + id + '">' + ic('add') + ' Tambah</button>' : '') + '</div>'
    + matHtml
    + '<div class="h2row"><h3 class="h2">Tugas</h3></div><div class="list">' + (tugas.length ? tugas.map(tugasCard).join('') : empty('Belum ada tugas.')) + '</div>'
    + '<div class="h2row"><h3 class="h2">Kuis</h3></div><div class="list">' + (kuis.length ? kuis.map(quizCard).join('') : empty('Belum ada kuis.')) + '</div>'
    + '<div class="h2row"><h3 class="h2">Anggota (' + d.anggota.length + ' siswa)</h3><div>' + btnUploadSiswa + (admin ? '<button type="button" class="btn sm" data-act="class-add" data-id="' + id + '">' + ic('person_add') + ' Tambah</button>' : '') + '</div></div>'
    + '<div class="card">' + anggotaHtml + '</div>';
}

/* ===================== HALAMAN: TUGAS ===================== */
async function pageTugas() {
  const u = state.user;
  const list = await api('assignmentList');
  const btn = u.role === 'guru' ? '<button type="button" class="btn" data-act="pick-class-task">' + ic('add') + ' Buat Tugas</button>' : '';
  return pageHead('Tugas', btn) + '<div class="list">' + (list.length ? list.map(tugasCard).join('') : empty('Belum ada tugas.')) + '</div>';
}
async function pageTugasDetail(id) {
  const u = state.user;
  state.pending = [];
  const d = await api('assignmentDetail', { id: id });
  const t = d.tugas;
  state.curTask = t;
  const late = new Date() > new Date(t.batas_waktu);
  const head = '<div class="card"><div class="row"><span class="badge b-info">' + esc(d.kelas_nama) + '</span>'
    + (u.role === 'siswa' ? badge(statusSub(d.sub)) : '') + '</div>'
    + '<div class="t-lg mt8">' + esc(t.judul) + '</div>'
    + '<div class="muted">' + ic('event') + ' Tenggat: ' + fmt(t.batas_waktu) + (late ? ' <b>(sudah lewat)</b>' : '') + '</div>'
    + '<div class="muted">' + ic('star') + ' Nilai maksimal: ' + t.nilai_maksimal + '</div>'
    + '<p class="mt">' + esc(t.deskripsi) + '</p>'
    + (u.role === 'guru' ? '<button type="button" class="btn sec sm" data-act="task-edit" data-id="' + t.id + '">' + ic('edit') + ' Ubah Tugas</button>' : '')
    + '</div>';

  if (u.role === 'siswa') {
    const s = d.sub;
    const fotos = s ? s.foto_ids : [];
    const locked = !!s && late;
    const nilaiBox = (s && s.nilai !== '' && s.nilai != null)
      ? '<div class="card ok-card"><div class="muted">Nilai kamu</div><div class="big">' + esc(s.nilai) + ' <span class="muted">/ ' + t.nilai_maksimal + '</span></div>'
        + (s.feedback ? '<div class="mt"><b>Catatan guru:</b> ' + esc(s.feedback) + '</div>' : '') + '</div>'
      : '';
    const thumbs = fotos.map(fid => '<div class="thumb"><img data-fid="' + fid + '" data-sid="' + s.id + '" alt="Foto tugas">'
      + (!late ? '<button type="button" class="thumb-x" data-act="photo-del" data-sub="' + s.id + '" data-file="' + fid + '" aria-label="Hapus foto">' + ic('close') + '</button>' : '') + '</div>').join('');
    const bisaFoto = !locked && fotos.length < MAX_PHOTOS;
    return head + nilaiBox
      + '<h3 class="h2">Kumpulkan Jawaban</h3>'
      + (locked ? '<div class="warn-card card">' + ic('lock') + ' Pengumpulan sudah dikunci setelah batas waktu.</div>' : '')
      + (!s && late ? '<div class="warn-card card">' + ic('schedule') + ' Kamu tetap bisa mengumpulkan, tetapi akan ditandai terlambat.</div>' : '')
      + '<form class="card" data-form="task-submit" data-tugas="' + t.id + '">'
      + '<label>Jawaban tulisan</label><textarea name="jawaban" ' + (locked ? 'disabled' : '') + '>' + esc(s ? s.jawaban : '') + '</textarea>'
      + '<label>Tautan (opsional)</label><input name="tautan" type="url" placeholder="https://" ' + (locked ? 'disabled' : '') + ' value="' + esc(s ? s.tautan : '') + '">'
      + '<label>Foto hasil pengerjaan (maks. ' + MAX_PHOTOS + ', JPG atau PNG)</label>'
      + (thumbs ? '<div class="photo-grid">' + thumbs + '</div>' : '')
      + '<div class="photo-grid" id="pv"></div>'
      + (bisaFoto ? '<label class="upload-btn">' + ic('photo_camera') + ' Pilih Foto<input type="file" accept="image/jpeg,image/png" multiple hidden data-act="photo-pick" data-existing="' + fotos.length + '"></label>' : '')
      + '<div class="err"></div>'
      + '<button type="submit" class="btn block mt" ' + (locked ? 'disabled' : '') + '>' + ic('send') + ' ' + (s ? 'Perbarui Pengumpulan' : 'Kumpulkan') + '</button>'
      + '</form>';
  }

  const rows = await api('submissionList', { assignmentId: id });
  state.subRows = rows;
  const terkumpul = rows.filter(r => r.submission).length;
  const nilaiAktif = u.role === 'guru';
  return head
    + '<h3 class="h2">Pengumpulan (' + terkumpul + ' dari ' + rows.length + ')</h3>'
    + (rows.length ? rows.map((r, i) => '<div class="card row"><div><div class="t-md">' + esc(r.nama) + '</div>' + badge(statusSub(r.submission)) + '</div>'
      + (nilaiAktif && r.submission ? '<button type="button" class="btn sm" data-act="grade-open" data-i="' + i + '">' + ic('rate_review') + ' Nilai</button>' : '') + '</div>').join('') : empty('Belum ada siswa di kelas ini.'));
}

/* ===================== HALAMAN: KUIS ===================== */
async function pageKuis() {
  const u = state.user;
  const tab = state.kuisTab || 'daftar';
  let list = [], bank = [];
  try {
    const res = await api('quizPageData');
    list = res.quizzes || [];
    bank = res.bank || [];
  } catch (e) {
    list = await api('quizList');
    if (u.role === 'guru' || u.role === 'admin') {
      bank = await api('bankSoalList');
    }
  }

  // Top buttons
  const isTeacher = u.role === 'guru' || u.role === 'admin';
  const btn = isTeacher ? '<div class="row-g">'
    + '<button type="button" class="btn sec sm" data-act="download-template" data-type="soal">' + ic('download') + ' Template Excel</button>'
    + '<button type="button" class="btn sec sm" data-act="upload-excel" data-type="soal">' + ic('upload_file') + ' Impor Excel</button>'
    + '<button type="button" class="btn sec sm" data-act="bank-soal-new">' + ic('note_add') + ' Tambah Soal</button>'
    + '<button type="button" class="btn sm" data-act="pick-class-quiz">' + ic('add') + ' Buat Paket Ujian</button>'
    + '</div>' : '';

  // Tab Bar for Teachers / Admins
  let subnav = '';
  if (isTeacher) {
    subnav = '<div class="subnav-wrap">'
      + '<button type="button" class="subnav-btn ' + (tab === 'daftar' ? 'active' : '') + '" data-act="kuis-tab" data-tab="daftar">' + ic('quiz') + ' Paket Ujian <span class="badge-pill">' + list.length + '</span></button>'
      + '<button type="button" class="subnav-btn ' + (tab === 'bank' ? 'active' : '') + '" data-act="kuis-tab" data-tab="bank">' + ic('inventory_2') + ' Bank Soal <span class="badge-pill">' + bank.length + '</span></button>'
      + '</div>';
  }

  // Content for Tab 1: Paket Ujian / Kuis
  const kuisContent = '<div class="list">' + (list.length ? list.map(quizCard).join('') : empty('Belum ada kuis atau paket ujian aktif.')) + '</div>';

  // Content for Tab 2: Bank Soal
  let bankContent = '';
  if (isTeacher) {
    const filterMapel = state.bankFilterMapel || '';
    const qSearch = (state.bankSearch || '').toLowerCase();
    const mapels = [...new Set(bank.map(x => x.mapel).filter(Boolean))];

    const filteredBank = bank.filter(q => {
      const matchMapel = !filterMapel || q.mapel === filterMapel;
      const matchQ = !qSearch || String(q.pertanyaan || '').toLowerCase().includes(qSearch) || String(q.bab || '').toLowerCase().includes(qSearch);
      return matchMapel && matchQ;
    });

    const filterChips = ['<button type="button" class="chip ' + (!filterMapel ? 'on' : '') + '" data-act="bank-filter-mapel" data-mapel="">Semua Mapel</button>']
      .concat(mapels.map(m => '<button type="button" class="chip ' + (filterMapel === m ? 'on' : '') + '" data-act="bank-filter-mapel" data-mapel="' + esc(m) + '">' + esc(m) + '</button>'))
      .join('');

    const searchAndFilter = '<div class="card" style="margin-bottom:16px;">'
      + '<div class="row"><input type="search" placeholder="Cari pertanyaan, materi, atau bab..." value="' + esc(state.bankSearch || '') + '" data-act="bank-search-input" style="max-width:400px;margin:0;">'
      + '<div class="row-g">'
      + (bank.length ? '<button type="button" class="btn sec sm" data-act="bank-preview">' + ic('preview') + ' Pratinjau Massal (' + bank.length + ')</button>' : '')
      + '<button type="button" class="btn sm" data-act="bank-soal-new">' + ic('add') + ' Buat Soal Baru</button>'
      + '</div></div>'
      + (mapels.length ? '<div class="chips mt" style="margin-top:12px;">' + filterChips + '</div>' : '')
      + '</div>';

    const bankCards = filteredBank.length ? filteredBank.map((q, i) => {
      const imgHtml = q.gambar_id
        ? '<div class="quiz-img-box" style="margin:8px 0;"><img src="https://lh3.googleusercontent.com/d/' + encodeURIComponent(q.gambar_id) + '" onerror="this.src=\'https://drive.google.com/uc?export=view&id=' + encodeURIComponent(q.gambar_id) + '\'" alt="Gambar Soal" loading="lazy"></div>'
        : '';
      return '<article class="bank-item card">'
        + '<div class="bank-header"><div class="row-g">'
        + '<span class="badge b-info">' + esc(q.mapel || 'Umum') + '</span>'
        + (q.kelas ? '<span class="badge b-gray">' + esc(q.kelas) + '</span>' : '')
        + (q.bab ? '<span class="badge b-gray">' + esc(q.bab) + '</span>' : '')
        + (q.tingkat_kesulitan ? '<span class="badge ' + (q.tingkat_kesulitan === 'Sulit' ? 'b-bad' : (q.tingkat_kesulitan === 'Mudah' ? 'b-ok' : 'b-warn')) + '">' + esc(q.tingkat_kesulitan) + '</span>' : '')
        + '</div>'
        + '<div class="row-g">'
        + '<button type="button" class="btn ghost sm" data-act="bank-soal-edit" data-id="' + q.id + '" title="Edit Soal">' + ic('edit') + '</button>'
        + '<button type="button" class="btn ghost sm" data-act="bank-soal-del" data-id="' + q.id + '" title="Hapus Soal" style="color:var(--bad-main);">' + ic('delete') + '</button>'
        + '</div></div>'
        + '<div class="t-md mt8">' + (i + 1) + '. ' + esc(q.pertanyaan) + '</div>'
        + imgHtml
        + '<div class="bank-opt-grid mt8">'
        + ['a', 'b', 'c', 'd', 'e'].filter(k => q['opsi_' + k]).map(k => {
          const isKey = String(q.jawaban_benar || '').trim().toUpperCase() === k.toUpperCase();
          return '<div class="bank-opt-item ' + (isKey ? 'correct-opt' : '') + '">'
            + '<span class="bank-opt-letter">' + k.toUpperCase() + '</span>'
            + '<span>' + esc(q['opsi_' + k]) + '</span>'
            + (isKey ? '<span class="badge b-ok" style="margin-left:auto;padding:2px 6px;font-size:0.75rem;">Kunci</span>' : '')
            + '</div>';
        }).join('')
        + '</div>'
        + (q.pembahasan ? '<details class="mt8"><summary class="muted" style="cursor:pointer;font-weight:600;">Lihat Pembahasan</summary><p class="muted" style="margin:4px 0 0 12px;">' + esc(q.pembahasan) + '</p></details>' : '')
        + '</article>';
    }).join('') : empty('Tidak ada soal yang cocok dengan filter.');

    bankContent = searchAndFilter + '<div class="list">' + bankCards + '</div>';
  }

  const activeContent = (!isTeacher || tab === 'daftar') ? kuisContent : bankContent;
  return pageHead('Kuis & Bank Soal', btn) + subnav + activeContent;
}

async function pageKuisDetail(id) {
  const u = state.user;
  if (u.role !== 'siswa') {
    const r = await api('quizResults', { id: id });
    return pageHead(esc(r.judul)) + '<div class="card tbl-wrap"><table class="tbl"><thead><tr><th>Nama</th><th>Status</th><th>Skor</th></tr></thead><tbody>'
      + r.rows.map(x => '<tr><td>' + esc(x.nama) + '</td><td>' + badge(x.status) + '</td><td>' + (x.skor === '' ? '-' : esc(x.skor)) + '</td></tr>').join('')
      + '</tbody></table></div>';
  }
  const list = await api('quizList');
  const q = list.find(x => x.id === id);
  if (!q) throw new Error('Kuis tidak ditemukan.');
  const a = q.attempt;
  const selesai = a && a.status === 'Selesai';
  return '<div class="card"><div class="row"><span class="badge b-info">' + esc(q.kelas_nama) + '</span>' + badge(a ? a.status : 'Belum Dikerjakan') + '</div>'
    + '<div class="t-lg mt8">' + esc(q.judul) + '</div>'
    + '<div class="muted">' + ic('timer') + ' ' + q.durasi_menit + ' menit · ' + q.jumlah_soal + ' soal</div>'
    + (selesai ? '<div class="card ok-card mt"><div class="muted">Skor kamu</div><div class="big">' + esc(a.skor) + '</div></div>'
      : '<p class="mt">Kuis ini hanya bisa dikerjakan satu kali. Pastikan kamu sudah siap sebelum mulai.</p>'
        + '<a class="btn block" href="#/kuis/' + id + '/kerjakan">' + ic('play_arrow') + ' ' + (a ? 'Lanjutkan Kuis' : 'Mulai Kuis') + '</a>')
    + '</div>';
}

async function pageKerjakan(id) {
  if (!state.quiz || state.quiz.id !== id) {
    const r = await api('quizStart', { id: id });
    state.quiz = {
      id: id,
      judul: r.judul,
      soal: r.soal,
      idx: 0,
      answers: {},
      end: new Date(r.waktu_mulai).getTime() + r.durasi_menit * 60000
    };
  }
  return '<div id="qwrap">' + quizHtml() + '</div>';
}

function quizHtml() {
  const q = state.quiz;
  const s = q.soal[q.idx];
  const n = q.soal.length;
  const dijawab = Object.keys(q.answers).length;
  const last = q.idx === n - 1;

  // Question Image Display with resilient fallback
  const imgHtml = s.gambar_id
    ? '<div class="quiz-img-box"><img src="https://lh3.googleusercontent.com/d/' + encodeURIComponent(s.gambar_id) + '" onerror="this.src=\'https://drive.google.com/uc?export=view&id=' + encodeURIComponent(s.gambar_id) + '\'" alt="Gambar Soal ' + (q.idx + 1) + '" loading="lazy"></div>'
    : (s.gambar_url ? '<div class="quiz-img-box"><img src="' + esc(s.gambar_url) + '" alt="Gambar Soal ' + (q.idx + 1) + '" loading="lazy"></div>' : '');

  // Grid Navigation Numbers
  const navGrid = '<div class="quiz-nav-grid">'
    + q.soal.map((item, i) => {
      const isAnswered = q.answers[item.id] !== undefined;
      const isCurrent = q.idx === i;
      const cls = ['quiz-nav-num', isAnswered ? 'answered' : '', isCurrent ? 'current' : ''].filter(Boolean).join(' ');
      return '<button type="button" class="' + cls + '" data-act="quiz-go" data-idx="' + i + '">' + (i + 1) + '</button>';
    }).join('')
    + '</div>';

  return '<div class="quiz-top"><div class="row"><b>' + esc(q.judul) + '</b><span class="timer-pill" id="timer">--:--</span></div>'
    + '<div class="progress"><div style="width:' + Math.round(dijawab / n * 100) + '%"></div></div>'
    + '<div class="row mt8"><span class="muted">Soal ' + (q.idx + 1) + ' dari ' + n + ' · sudah dijawab ' + dijawab + '</span>'
    + '<button type="button" class="btn ghost sm" data-act="toggle-qnav">' + ic('grid_view') + ' Nomor Soal</button></div>'
    + '<div id="quiz-nav-drawer" style="margin-top:8px;">' + navGrid + '</div>'
    + '</div>'
    + '<div class="card qcard mt">'
    + '<div class="t-md">' + (q.idx + 1) + '. ' + esc(s.pertanyaan) + '</div>'
    + imgHtml
    + ['A', 'B', 'C', 'D', 'E'].filter(k => s['opsi_' + k.toLowerCase()]).map(k =>
      '<button type="button" class="quiz-opt ' + (q.answers[s.id] === k ? 'on' : '') + '" data-act="quiz-pick" data-q="' + s.id + '" data-v="' + k + '">'
      + '<span class="letter">' + k + '</span><span>' + esc(s['opsi_' + k.toLowerCase()]) + '</span></button>'
    ).join('')
    + '</div>'
    + '<div class="row mt">'
    + (q.idx > 0 ? '<button type="button" class="btn sec" data-act="quiz-go" data-idx="' + (q.idx - 1) + '">' + ic('arrow_back') + ' Sebelumnya</button>' : '<span></span>')
    + (last ? '<button type="button" class="btn" data-act="quiz-finish">' + ic('check') + ' Kumpulkan</button>'
      : '<button type="button" class="btn" data-act="quiz-go" data-idx="' + (q.idx + 1) + '">Berikutnya ' + ic('arrow_forward') + '</button>')
    + '</div>'
    + (last ? '' : '<div class="center mt"><button type="button" class="btn ghost" data-act="quiz-finish">Kumpulkan sekarang</button></div>');
}
function renderQuizBody() {
  const w = $('#qwrap');
  if (w) w.innerHTML = quizHtml();
}
function startQuizTimer() {
  const tick = () => {
    const el = $('#timer');
    if (!el || !state.quiz) { clearInterval(state.timer); return; }
    const left = state.quiz.end - Date.now();
    if (left <= 0) {
      clearInterval(state.timer);
      el.textContent = '00:00';
      finishQuiz(true);
      return;
    }
    el.textContent = pad(Math.floor(left / 60000)) + ':' + pad(Math.floor(left % 60000 / 1000));
    el.classList.toggle('warn', left < 5 * 60000);
  };
  tick();
  state.timer = setInterval(tick, 1000);
}
async function finishQuiz(auto) {
  if (!state.quiz || state.submitting) return;
  const kirim = async () => {
    state.submitting = true;
    try {
      const id = state.quiz.id;
      const r = await api('quizSubmit', { id: id, answers: state.quiz.answers });
      clearInterval(state.timer);
      state.quiz = null;
      toast('Kuis selesai. Skor kamu: ' + r.skor);
      go('#/kuis/' + id);
    } catch (e) {
      toast(e.message);
    } finally {
      state.submitting = false;
    }
  };
  if (auto) return kirim();
  const belum = state.quiz.soal.length - Object.keys(state.quiz.answers).length;
  confirmBox(belum > 0 ? 'Masih ada ' + belum + ' soal belum dijawab. Kumpulkan sekarang?' : 'Kumpulkan jawaban sekarang?', kirim);
}

/* ===================== HALAMAN: NILAI ===================== */
async function pageNilai() {
  const u = state.user;
  if (u.role === 'siswa') {
    const g = await api('gradesMine');
    return pageHead('Nilai')
      + '<div class="hero"><div class="opacity">Rata-rata nilai kamu</div><div class="hero-t">' + (g.rataTotal == null ? '-' : g.rataTotal) + '</div></div>'
      + '<div class="card muted">' + ic('info') + ' ' + esc(g.rumus) + '</div>'
      + g.kelas.map(k => '<h3 class="h2">' + esc(k.nama_kelas) + (k.rata !== null ? ' <span class="badge b-ok">Rata-rata ' + k.rata + '</span>' : '') + '</h3>'
        + (k.items.length ? '<div class="card">' + k.items.map(i => '<div class="row line"><span><span class="badge b-gray">' + i.jenis + '</span> ' + esc(i.judul) + '</span><b>' + i.nilai + '</b></div>').join('') + '</div>'
          : '<div class="card muted">Belum ada nilai.</div>')).join('');
  }
  const kelas = await api('classList');
  return pageHead('Nilai') + '<div class="list">' + (kelas.length ? kelas.map(k => '<div class="card click" data-act="go" data-to="#/nilai/' + k.id + '" role="link" tabindex="0"><div class="t-md">' + esc(k.nama_kelas) + '</div><div class="muted">' + k.jumlah_siswa + ' siswa</div></div>').join('') : empty('Belum ada kelas.')) + '</div>';
}
async function pageNilaiKelas(id) {
  const d = await api('gradesClass', { classId: id });
  return pageHead('Nilai Kelas') + '<div class="card tbl-wrap"><table class="tbl"><thead><tr><th>Nama</th><th>Tugas dinilai</th><th>Kuis selesai</th><th>Rata-rata</th></tr></thead><tbody>'
    + d.rows.map(r => '<tr><td>' + esc(r.nama) + '</td><td>' + r.tugas_dinilai + '</td><td>' + r.kuis_selesai + '</td><td><b>' + (r.rata == null ? '-' : r.rata) + '</b></td></tr>').join('')
    + '</tbody></table></div>';
}

/* ===================== HALAMAN: PENGGUNA (ADMIN) ===================== */
async function pagePengguna() {
  const u = state.user;
  const role = state.filter || '';
  const rawList = await api('usersList', { q: '', role: '' });
  const q = String(state.q || '').trim().toLowerCase();
  const list = (rawList || [])
    .filter(x => !role || x.role === role)
    .filter(x => !q || String(x.nama || '').toLowerCase().includes(q) || String(x.username || '').toLowerCase().includes(q))
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || '')));
  const chips = [['', 'Semua'], ['guru', 'Guru'], ['siswa', 'Siswa'], ['admin', 'Admin TU']]
    .map(c => '<button type="button" class="chip ' + (role === c[0] ? 'on' : '') + '" data-act="filter" data-role="' + c[0] + '">' + c[1] + '</button>').join('');
  
  const btnUpload = u.role === 'admin' ? '<button type="button" class="btn sec" data-act="upload-excel" data-type="guru" style="margin-right:8px;">' + ic('upload_file') + ' Upload Excel</button>' : '';
  
  return pageHead('Pengguna', '<div class="row-g">' + btnUpload + '<button type="button" class="btn" data-act="user-new">' + ic('person_add') + ' Tambah</button></div>')
    + '<form class="card" data-form="user-search"><input name="q" placeholder="Cari nama atau username" value="' + esc(state.q || '') + '">'
    + '<div class="chips mt">' + chips + '</div>'
    + '<button type="submit" class="btn sec block mt">' + ic('search') + ' Cari</button></form>'
    + '<div class="list">' + (list.length ? list.map(x => '<div class="card"><div class="row"><div><div class="t-md">' + esc(x.nama) + '</div>'
      + '<div class="muted">@' + esc(x.username) + ' · ' + roleName(x.role) + '</div></div>'
      + (x.status === 'aktif' ? '<span class="badge b-ok">Aktif</span>' : '<span class="badge b-bad">Nonaktif</span>') + '</div>'
      + '<div class="row-g mt"><button type="button" class="btn sec sm" data-act="user-edit" data-id="' + x.id + '">' + ic('edit') + ' Ubah</button>'
      + '<button type="button" class="btn sec sm" data-act="user-toggle" data-id="' + x.id + '">' + (x.status === 'aktif' ? 'Nonaktifkan' : 'Aktifkan') + '</button>'
      + '<button type="button" class="btn sec sm" data-act="user-reset" data-id="' + x.id + '">' + ic('key') + ' Reset Password</button></div></div>').join('') : empty('Tidak ada pengguna ditemukan.')) + '</div>';
}

/* ===================== HALAMAN: PENGUMUMAN ===================== */
async function pagePengumuman() {
  const u = state.user;
  const list = await api('annList');
  const btn = u.role !== 'siswa' ? '<button type="button" class="btn" data-act="ann-new">' + ic('add') + ' Buat</button>' : '';
  return pageHead('Pengumuman', btn) + '<div class="list">' + (list.length ? list.map(annCard).join('') : empty('Belum ada pengumuman.')) + '</div>';
}

/* ===================== HALAMAN: PENGATURAN ===================== */
function pagePengaturan() {
  const u = state.user;
  const gasUrlCurrent = (window.CONFIG && window.CONFIG.GAS_WEBAPP_URL) || localStorage.getItem('lms_gas_url') || '';
  const urlCard = (u.role === 'admin')
    ? '<div class="card"><h3 class="h2 t0">Koneksi Google Apps Script</h3>'
      + '<p class="help">Masukkan URL Web App hasil Deploy Google Apps Script (/exec) untuk menghubungkan frontend Vercel ini ke database Google Sheets.</p>'
      + '<form data-form="gas-url-save">'
      + '<label>URL Web App (/exec)</label>'
      + '<input name="gas_url" placeholder="https://script.google.com/macros/s/.../exec" value="' + esc(gasUrlCurrent) + '">'
      + '<div class="row-g mt"><button type="submit" class="btn">' + ic('save') + ' Simpan URL</button>'
      + '<button type="button" class="btn sec" data-act="test-connection">' + ic('sync') + ' Uji Koneksi</button></div>'
      + '</form></div>'
    : '';

  return pageHead('Pengaturan')
    + '<div class="card"><div class="row"><div><div class="t-md">' + esc(u.nama) + '</div><div class="muted">@' + esc(u.username) + ' · ' + roleName(u.role) + '</div></div>' + ic('account_circle', 'fs40') + '</div></div>'
    + urlCard
    + '<div class="card"><h3 class="h2 t0">Ubah Password</h3><form data-form="pw-save">'
    + '<label>Password lama</label><input name="old" type="password" autocomplete="current-password" required>'
    + '<label>Password baru (minimal 6 karakter)</label><input name="new" type="password" minlength="6" autocomplete="new-password" required>'
    + '<label>Ulangi password baru</label><input name="confirm" type="password" minlength="6" autocomplete="new-password" required>'
    + '<div class="err"></div><button type="submit" class="btn block mt">Simpan Password</button></form></div>'
    + '<button type="button" class="btn danger block" data-act="logout">' + ic('logout') + ' Keluar</button>'
    + '<p class="muted center mt">' + APP_NAME + ' · versi 1.0</p>';
}
/* ===================== ROUTING & RENDER ===================== */
function pageFor(a, b, c) {
  const u = state.user;
  if (!a) return pageHome();
  if (a === 'materi') return b === 'view' ? pageMateriView(c) : pageMateriList(b);
  if (a === 'kelas') return b ? pageKelasDetail(b) : pageKelas();
  if (a === 'tugas') return b ? pageTugasDetail(b) : pageTugas();
  if (a === 'kuis') return !b ? pageKuis() : (c === 'kerjakan' ? pageKerjakan(b) : pageKuisDetail(b));
  if (a === 'nilai') return b ? pageNilaiKelas(b) : pageNilai();
  if (a === 'pengguna' && u.role === 'admin') return pagePengguna();
  if (a === 'pengumuman') return pagePengumuman();
  if (a === 'pengaturan') return pagePengaturan();
  return pageHome();
}
function renderNav(a) {
  const items = NAV[state.user.role] || NAV.siswa;
  const html = items.map(it => '<a href="#/' + it[0] + '" data-key="' + it[0] + '">' + ic(it[1]) + '<span>' + it[2] + '</span></a>').join('');
  $('#sidenav').innerHTML = html;
  $('#bnav').innerHTML = html;
  document.querySelectorAll('[data-key]').forEach(el => el.classList.toggle('on', el.dataset.key === (a || '')));
}
function showAuth() {
  const gasUrlCurrent = (window.CONFIG && window.CONFIG.GAS_WEBAPP_URL) || localStorage.getItem('lms_gas_url') || '';
  const isGasInternal = typeof google !== 'undefined' && google.script && google.script.run;
  const needUrlNotice = !gasUrlCurrent && !IS_PREVIEW && !isGasInternal;

  $('#app').classList.add('hidden');
  $('#bnav').classList.add('hidden');
  $('#auth').classList.remove('hidden');
  $('#auth').innerHTML = '<div class="auth-wrap">'
    + '<div class="auth-art">' + SCHOOL_SVG + '</div>'
    + '<div class="logo-big">' + ic('school', 'fs40') + '</div>'
    + '<div class="auth-badge">Tahun Ajaran 2026/2027</div>'
    + '<h1 class="auth-t">' + APP_NAME + '</h1>'
    + '<p class="muted center">Selamat datang! Masuk dengan username dan password dari guru atau Admin TU.</p>'
    + (needUrlNotice ? '<div class="card warn-card" style="margin-bottom:14px;">' + ic('info') + '<div><b>Backend belum terhubung.</b><br><button type="button" class="btn sm sec mt8" data-act="prompt-gas-url">Atur URL Google Apps Script</button></div></div>' : '')
    + '<form class="card" data-form="login"><label>Username</label><input name="username" autocomplete="username" autocapitalize="none" required>'
    + '<label>Password</label><input name="password" type="password" autocomplete="current-password" required>'
    + '<div class="err"></div><button type="submit" class="btn block mt">' + ic('login') + ' Masuk</button>'
    + '<p class="help center mt">Lupa password? <a href="https://wa.me/?text=' + encodeURIComponent('Halo Admin TU Sekolah, saya butuh bantuan reset password LMS EduDigital.') + '" target="_blank" rel="noopener">Hubungi Admin TU via WhatsApp</a></p></form>'
    + (IS_PREVIEW ? '<div class="card demo"><b>Mode Demo</b><p class="help">Ketuk untuk mengisi akun uji. Password: edudigital</p><div class="row-g">'
      + '<button type="button" class="btn sec sm" data-act="demo" data-u="admin">Admin TU</button>'
      + '<button type="button" class="btn sec sm" data-act="demo" data-u="guru">Guru</button>'
      + '<button type="button" class="btn sec sm" data-act="demo" data-u="peserta">Siswa</button></div></div>' : '')
    + '</div>';
}
function showApp() {
  buildShell();
  $('#auth').classList.add('hidden');
  $('#app').classList.remove('hidden');
  $('#bnav').classList.remove('hidden');
}
let renderSeq = 0;
async function render() {
  clearInterval(state.timer);
  clearInterval(state.clock);
  if (state.blobUrl) { URL.revokeObjectURL(state.blobUrl); state.blobUrl = null; }
  if (!state.user) return showAuth();
  showApp();
  const parts = location.hash.replace(/^#\/?/, '').split('/');
  const a = parts[0] || '', b = parts[1], c = parts[2];
  renderNav(a);
  $('#ttl').textContent = a ? (TITLES[a] || 'LMS') : (DASH_TITLE[state.user.role] || 'Beranda');
  const nm = String(state.user.nama || '');
  $('#uchip').innerHTML = '<span class="av">' + esc(initials(nm)) + '</span><span class="who"><b>' + esc(nm) + '</b><small>' + esc(roleName(state.user.role)) + '</small></span>';
  const seq = ++renderSeq;
  const viewEl = $('#view');
  const topLoader = $('#top-loader');
  const hasExistingContent = viewEl && viewEl.children.length > 0;

  if (topLoader) topLoader.classList.add('active');
  if (hasExistingContent) {
    viewEl.classList.add('view-loading');
  } else if (viewEl) {
    viewEl.innerHTML = '<div class="empty">' + ic('sync', 'spin') + '<div>Memuat…</div></div>';
  }

  try {
    const html = await pageFor(a, b, c);
    if (seq !== renderSeq) return;
    if (viewEl) {
      viewEl.innerHTML = html;
      viewEl.classList.remove('view-loading');
    }
    if (topLoader) topLoader.classList.remove('active');
    loadPhotos(viewEl);
    if (!a) {
      startClock();
      prefetchAppData();
    }
    if (a === 'materi' && b === 'view') loadMateriFile();
    if (a === 'kuis' && c === 'kerjakan' && state.quiz) startQuizTimer();
  } catch (e) {
    if (seq !== renderSeq) return;
    if (!state.user) return render();
    if (viewEl) {
      viewEl.classList.remove('view-loading');
      viewEl.innerHTML = '<div class="card err-card">' + ic('error') + ' ' + esc(e.message) + '</div>';
    }
    if (topLoader) topLoader.classList.remove('active');
  }
}
function logoutLocal() { saveSession(null, null); state.quiz = null; clearInterval(state.timer); location.hash = ''; render(); }

/* ===================== TAMBAHAN MODAL MENGUNGGAH ===================== */
function uploadExcelForm(type, classId) {
  const titles = { guru: 'Upload Data Guru', siswa: 'Upload Data Siswa', soal: 'Upload Bank Soal' };
  const notes = {
    guru: 'Pastikan file Excel memiliki header kolom: username, nama, password (opsional)',
    siswa: 'Pastikan file Excel memiliki header kolom: username, nama, password (opsional)',
    soal: 'Pastikan file Excel memiliki header: Mapel, Soal, A, B, C, D, E, Kunci, Pembahasan'
  };
  openModal('<h3 class="modal-t">' + titles[type] + '</h3>'
    + '<div class="template-guide"><div><strong>Belum punya format Excel?</strong><p class="help">Unduh template resmi, isi contoh baris sesuai data Anda, lalu unggah kembali.</p></div>'
    + '<button type="button" class="btn sec sm" data-act="download-template" data-type="' + type + '">' + ic('download') + ' Download Template</button></div>'
    + '<form data-form="excel-upload">'
    + '<input type="hidden" name="type" value="' + type + '"><input type="hidden" name="kelas_id" value="' + (classId||'') + '">'
    + '<label>File Excel (.xlsx, .xls)</label><input type="file" name="file" accept=".xlsx, .xls" required style="padding-top:10px">'
    + '<p class="help">' + notes[type] + '</p>'
    + '<div class="err"></div><button type="submit" class="btn block mt">Simpan Data</button></form>');
}
function showSoalImportPreview() {
  const qs = state.importQuestions || [];
  const rows = qs.map((q, i) => {
    const imagePreview = q._imagePreview
      ? '<img class="question-image-preview" src="' + esc(q._imagePreview) + '" alt="Pratinjau gambar soal">'
      : (q.gambar_id ? '<div class="help mt">Gambar sudah terhubung. ID tersimpan.</div>' : '<div class="help mt">Belum ada gambar dipilih.</div>');
    return '<article class="question-preview-card" data-preview-row="' + i + '">'
      + '<div class="question-preview-actions"><div><b>Soal ' + (i+1) + '</b><div class="help">Edit isi soal sebelum disimpan</div></div>'
      + '<button type="button" class="btn ghost sm" data-act="remove-preview-question" data-i="' + i + '">Hapus soal</button></div>'
      + '<label>Mata pelajaran</label><input data-field="mapel" value="' + esc(q.mapel || '') + '" required>'
      + '<label>Pertanyaan</label><textarea data-field="pertanyaan" required>' + esc(q.pertanyaan || '') + '</textarea>'
      + '<div class="question-options-grid">' + ['a','b','c','d','e'].map(k => '<div><label>Opsi ' + k.toUpperCase() + (k==='e'?' (opsional)':'') + '</label><input data-field="opsi_' + k + '" value="' + esc(q['opsi_'+k] || '') + '" ' + (k==='e'?'':'required') + '></div>').join('') + '</div>'
      + '<label>Kunci jawaban</label><select data-field="jawaban_benar">' + ['A','B','C','D','E'].map(k => '<option value="' + k + '" ' + (String(q.jawaban_benar || 'A').toUpperCase()===k?'selected':'') + '>' + k + '</option>').join('') + '</select>'
      + '<label>Pembahasan</label><textarea data-field="pembahasan">' + esc(q.pembahasan || '') + '</textarea>'
      + '<div class="question-image-upload"><b>Gambar soal (opsional)</b><p class="help">Pilih gambar langsung dari perangkat Anda (JPG/PNG, maksimal 2 MB).</p>'
      + '<input type="file" accept="image/jpeg,image/png" data-question-image="' + i + '"><input type="hidden" data-field="gambar_id" value="' + esc(q.gambar_id || '') + '">'
      + '<div data-image-status>' + imagePreview + '</div></div></article>';
  }).join('');
  openModal('<h3 class="modal-t">Pratinjau dan Edit Soal</h3><p class="help">Periksa dan edit soal yang diimpor. Pilih gambar dari perangkat langsung pada setiap soal. Perubahan disimpan saat tombol simpan ditekan.</p>'
    + '<div class="question-preview-actions"><b>' + qs.length + ' soal dalam pratinjau</b><span class="help">Tampilan lebar · bisa diedit</span></div>'
    + '<div id="import-preview-list" class="question-preview-grid">' + rows + '</div>'
    + '<div class="row mt"><button type="button" class="btn sec" data-act="cancel-soal-preview">Batal</button><button type="button" class="btn" data-act="confirm-soal-import">Simpan ' + qs.length + ' Soal ke Bank Soal</button></div>');
}
function collectSoalPreview() {
  return [...document.querySelectorAll('#import-preview-list [data-preview-row]')].map(card => {
    const q = {}; card.querySelectorAll('[data-field]').forEach(el => q[el.dataset.field] = el.value.trim()); return q;
  }).filter(q => q.pertanyaan);
}
function uploadGambarSoalForm() {
  openModal('<h3 class="modal-t">Upload Gambar Soal</h3><form data-form="gambar-soal-upload">'
    + '<label>Pilih Gambar (JPG/PNG)</label><input type="file" name="file" accept="image/jpeg,image/png" required style="padding-top:10px">'
    + '<p class="help">Gambar akan disimpan ke Google Drive khusus. ID gambar akan ditampilkan untuk disalin ke file Excel Bank Soal Anda.</p>'
    + '<div class="err"></div><button type="submit" class="btn block mt">Upload ke Drive</button></form>');
}

/* ===================== AKSI (data-act) ===================== */
const actions = {
  go: el => go(el.dataset.to),
  logout: async () => {
    try { await api('logout'); } catch (e) { /* sesi mungkin sudah tidak ada di server */ }
    logoutLocal();
  },
  demo: el => {
    const f = document.querySelector('form[data-form="login"]');
    f.username.value = el.dataset.u === 'peserta' ? 'peserta' : el.dataset.u;
    f.password.value = 'edudigital';
  },
  'close-modal': () => closeModal(),
  'retry-online': () => { if (navigator.onLine) { hideOffline(); render(); } else toast('Masih offline. Periksa koneksi internet.'); },
  filter: el => { state.filter = el.dataset.role; render(); },

  // TAMBAHAN AKSI:
  'upload-excel': el => uploadExcelForm(el.dataset.type, el.dataset.kelas),
  'bank-preview': async () => { const bank = await api('bankSoalList'); state.importQuestions = bank.map(q => ({...q})); showSoalImportPreview(); },
  'remove-preview-question': el => { const card = document.querySelector('[data-preview-row="' + el.dataset.i + '"]'); if (card) card.remove(); },
  'cancel-soal-preview': () => { state.importQuestions = []; closeModal(); },
  'confirm-soal-import': async () => {
    const questions = collectSoalPreview();
    if (!questions.length) { toast('Tidak ada soal untuk disimpan.'); return; }
    const btn = document.querySelector('[data-act="confirm-soal-import"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Menyimpan...'; }
    try {
      const res = await api('bankSoalSavePreview', { questions: questions.map(q => ({id:q.id || '', mapel:q.mapel, pertanyaan:q.pertanyaan, opsi_a:q.opsi_a, opsi_b:q.opsi_b, opsi_c:q.opsi_c, opsi_d:q.opsi_d, opsi_e:q.opsi_e, jawaban_benar:q.jawaban_benar, pembahasan:q.pembahasan, gambar_id:q.gambar_id || ''})) });
      state.importQuestions = []; closeModal(); toast(res.message || 'Soal berhasil disimpan.'); await render();
    } catch (e) { toast(e.message || 'Gagal menyimpan soal.'); if (btn) { btn.disabled = false; btn.textContent = 'Coba Simpan Lagi'; } }
  },
  'upload-gambar-soal': () => uploadGambarSoalForm(),
  'download-template': el => {
    if (typeof XLSX === 'undefined') { toast('Library Excel belum termuat. Muat ulang halaman lalu coba lagi.'); return; }
    const type = el.dataset.type;
    let headers = [], sample = [], filename = '';
    if (type === 'siswa' || type === 'guru') {
      headers = ['username', 'nama', 'password'];
      sample = [type === 'siswa' ? 'siswa01' : 'guru01', type === 'siswa' ? 'Budi Pratama' : 'Ibu Siti', type === 'siswa' ? 'siswa123' : 'guru123'];
      filename = 'Template_Data_' + (type === 'siswa' ? 'Siswa' : 'Guru') + '.xlsx';
    } else if (type === 'soal') {
      headers = ['Nomor', 'Mapel', 'Kelas', 'Bab', 'Jenis_Soal', 'Pertanyaan', 'A', 'B', 'C', 'D', 'E', 'Kunci', 'Bobot', 'Pembahasan', 'Tingkat_Kesulitan', 'Gambar_ID'];
      sample = ['1', 'Matematika', 'Kelas 4', 'Pecahan', 'Pilihan Ganda', 'Pecahan yang senilai dengan 1/2 adalah...', '2/4', '1/3', '2/3', '3/4', '', 'A', '1', '1/2 dikalikan 2/2 = 2/4', 'Mudah', ''];
      filename = 'Template_Bank_Soal_EDUCERIA.xlsx';
    } else { toast('Jenis template tidak dikenali.'); return; }
    try {
      const ws = XLSX.utils.aoa_to_sheet([headers, sample]);
      ws['!cols'] = headers.map(h => ({ wch: Math.max(14, h.length + 4) }));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Template Soal');
      XLSX.writeFile(wb, filename);
      toast('Template Excel berhasil diunduh. Gambar soal dapat diunggah melalui tombol Gambar atau Editor Soal.');
    } catch (err) { toast('Gagal mengunduh template Excel. Coba muat ulang halaman.'); }
  },

  'pick-class-task': () => pickClass('task-new', 'Pilih kelas untuk tugas baru'),
  'pick-class-quiz': () => pickClass('quiz-new', 'Pilih kelas untuk kuis baru'),
  'task-new': el => tugasForm(el.dataset.kelas, null),
  'task-edit': el => tugasForm(null, el.dataset.id),
  'quiz-new': el => kuisForm(el.dataset.kelas),
  'add-q': () => addQBlock(),
  'del-q': el => { el.closest('.qblock').remove(); },
  'ann-new': () => annForm(),

  'class-new': () => classForm(null),
  'class-edit': el => classForm(el.dataset.id),
  'class-add': el => classAddForm(el.dataset.id),
  'class-remove': async el => {
    await api('classRemoveStudent', { kelas_id: el.dataset.kelas, siswa_id: el.dataset.siswa });
    toast('Siswa dikeluarkan dari kelas');
    render();
  },

  'mat-new': el => materiForm(el.dataset.kelas, null),
  'mat-edit': el => materiForm(el.dataset.kelas, el.dataset.id),
  'mat-del': el => confirmBox('Hapus materi ini?', async () => {
    await api('materialDelete', { id: el.dataset.id });
    toast('Materi dihapus');
    if (location.hash.indexOf('#/materi/view/') === 0 && el.dataset.kelas) go('#/materi/' + el.dataset.kelas);
    else render();
  }),

  'user-new': () => userForm(null),
  'user-edit': el => userForm(el.dataset.id),
  'user-toggle': async el => {
    await api('userToggle', { id: el.dataset.id });
    toast('Status akun diperbarui');
    render();
  },
  'user-reset': el => confirmBox('Buat password sementara baru untuk pengguna ini?', async () => {
    const r = await api('userResetPassword', { id: el.dataset.id });
    showOnce('Password sementara', r.password);
    render();
  }),

  'photo-pick': () => {},
  'photo-rm-pending': el => { state.pending.splice(Number(el.dataset.i), 1); renderPending(); },
  'photo-del': el => confirmBox('Hapus foto ini? Foto tidak dapat dikembalikan.', async () => {
    await api('photoDelete', { submissionId: el.dataset.sub, fileId: el.dataset.file });
    toast('Foto dihapus');
    render();
  }),
  'grade-open': el => gradeForm(Number(el.dataset.i)),

  // KUIS & BANK SOAL NAVIGATION & ACTIONS
  'kuis-tab': el => {
    state.kuisTab = el.dataset.tab;
    render();
  },
  'bank-filter-mapel': el => {
    state.bankFilterMapel = el.dataset.mapel;
    render();
  },
  'bank-search-input': () => {},
  'toggle-qnav': () => {
    const d = $('#quiz-nav-drawer');
    if (d) d.classList.toggle('hidden');
  },
  'bank-soal-new': () => bankSoalForm(null),
  'bank-soal-edit': el => bankSoalForm(el.dataset.id),
  'bank-soal-del': el => confirmBox('Hapus soal ini dari Bank Soal?', async () => {
    await api('bankSoalDelete', { id: el.dataset.id });
    toast('Soal dihapus dari Bank Soal');
    render();
  }),

  'quiz-pick': async el => {
    state.quiz.answers[el.dataset.q] = el.dataset.v;
    renderQuizBody();
    // Silent autosave draft ke server
    try {
      await api('quizSaveDraft', { id: state.quiz.id, answers: state.quiz.answers });
    } catch (e) {
      // background autosave - silent
    }
  },
  'quiz-go': el => { state.quiz.idx = Number(el.dataset.idx); renderQuizBody(); },
  'quiz-finish': () => finishQuiz(false),

  'install-go': async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try { await deferredPrompt.userChoice; } catch (e) { /* pengguna menutup dialog */ }
    deferredPrompt = null;
    hideInstall();
  },
  'install-close': () => dismissInstall(),

  'prompt-gas-url': () => {
    const cur = (window.CONFIG && window.CONFIG.GAS_WEBAPP_URL) || localStorage.getItem('lms_gas_url') || '';
    const url = prompt('Masukkan URL Web App Google Apps Script (/exec):', cur);
    if (url !== null) {
      const trimmed = url.trim();
      if (trimmed) {
        localStorage.setItem('lms_gas_url', trimmed);
        if (window.CONFIG) window.CONFIG.GAS_WEBAPP_URL = trimmed;
      } else {
        localStorage.removeItem('lms_gas_url');
        if (window.CONFIG) window.CONFIG.GAS_WEBAPP_URL = '';
      }
      location.reload();
    }
  },
  'test-connection': async () => {
    try {
      toast('Menguji koneksi...');
      await api('me', {}, true);
      toast('Koneksi berhasil! Terhubung ke Google Apps Script.');
    } catch (e) {
      toast('Gagal: ' + e.message);
    }
  }
};

document.addEventListener('click', async e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const fn = actions[el.dataset.act];
  if (!fn) return;
  if (el.tagName === 'BUTTON' && el.type !== 'submit') e.preventDefault();
  try { await fn(el); } catch (err) { toast(err.message); }
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-act].click')) {
    e.preventDefault();
    e.target.click();
  }
});
document.addEventListener('change', async e => {
  if (e.target.matches('[data-act="photo-pick"]')) {
    try { await pickPhotos(e.target); } catch (err) { toast(err.message); }
  }
  if (e.target.matches('input[data-question-image]')) {
    const input = e.target, file = input.files && input.files[0];
    if (!file) return;
    if (!/^image\/(jpeg|png)$/.test(file.type)) { toast('Pilih gambar JPG atau PNG.'); input.value = ''; return; }
    if (file.size > 2 * 1024 * 1024) { toast('Ukuran gambar maksimal 2 MB.'); input.value = ''; return; }
    const card = input.closest('[data-preview-row]'), status = card && card.querySelector('[data-image-status]');
    if (!card || !status) return;
    const localUrl = URL.createObjectURL(file);
    status.innerHTML = '<img class="question-image-preview" src="' + localUrl + '" alt="Pratinjau gambar soal"><p class="help">Mengunggah gambar...</p>';
    input.disabled = true;
    try {
      const compressed = await compressImage(file);
      const result = await api('uploadGambarSoal', { file: { mime: compressed.mime, data: compressed.data } });
      const hidden = card.querySelector('[data-field="gambar_id"]'); if (hidden) hidden.value = result.fileId || '';
      const questionIndex = Number(input.dataset.questionImage);
      if (Array.isArray(state.importQuestions) && state.importQuestions[questionIndex]) {
        state.importQuestions[questionIndex].gambar_id = result.fileId || '';
        state.importQuestions[questionIndex].gambar_url = result.imageUrl || '';
      }
      status.innerHTML = '<img class="question-image-preview" src="' + localUrl + '" alt="Pratinjau gambar soal"><p class="help">Gambar berhasil diunggah dan ID-nya siap disimpan bersama soal.</p>';
      toast('Gambar soal berhasil diunggah.');
    } catch (err) {
      status.innerHTML = '<p class="err">' + esc(err.message || 'Gagal mengunggah gambar.') + '</p>'; toast(err.message || 'Gagal mengunggah gambar.');
    } finally { input.disabled = false; }
  }
  if (e.target.matches('[data-act="pick-single-soal-img"]')) {
    const input = e.target, file = input.files && input.files[0];
    if (!file) return;
    if (!/^image\/(jpeg|png)$/.test(file.type)) { toast('Pilih gambar JPG atau PNG.'); input.value = ''; return; }
    if (file.size > 2 * 1024 * 1024) { toast('Ukuran gambar maksimal 2 MB.'); input.value = ''; return; }
    const pv = $('#form-soal-img-pv');
    const hiddenId = $('#form-soal-gambar-id');
    if (!pv || !hiddenId) return;
    const localUrl = URL.createObjectURL(file);
    pv.innerHTML = '<div class="quiz-img-box mt8"><img src="' + localUrl + '" alt="Pratinjau"><p class="help">Mengunggah ke server...</p></div>';
    input.disabled = true;
    try {
      const compressed = await compressImage(file);
      const result = await api('uploadGambarSoal', { file: { mime: compressed.mime, data: compressed.data } });
      hiddenId.value = result.fileId || '';
      pv.innerHTML = '<div class="quiz-img-box mt8"><img src="' + localUrl + '" alt="Gambar Soal">'
        + '<button type="button" class="btn ghost sm" data-act="del-soal-img" style="color:var(--bad-main);">' + ic('delete') + ' Hapus Gambar</button></div>'
        + '<p class="help">Gambar berhasil disimpan secara permanen.</p>';
      toast('Gambar soal berhasil diunggah.');
    } catch (err) {
      pv.innerHTML = '<p class="err">' + esc(err.message || 'Gagal mengunggah gambar.') + '</p>';
      toast(err.message || 'Gagal mengunggah gambar.');
    } finally {
      input.disabled = false;
    }
  }
});
document.addEventListener('input', e => {
  if (e.target.matches('[data-act="bank-search-input"]')) {
    state.bankSearch = e.target.value;
    render();
  }
});
$('#modal').addEventListener('click', e => {
  if (e.target.closest('[data-act="del-soal-img"]')) {
    const hidden = $('#form-soal-gambar-id');
    if (hidden) hidden.value = '';
    const pv = $('#form-soal-img-pv');
    if (pv) pv.innerHTML = '<div class="help mt8">Gambar dihapus.</div>';
    toast('Gambar dihapus dari form.');
    return;
  }
  if (e.target.id === 'modal') closeModal();
});

/* ===================== FORMULIR (data-form) ===================== */
const forms = {
  // TAMBAHAN FORM UNTUK EXCEL
  'excel-upload': async f => {
    const d = fd(f);
    const fileInput = f.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    if(!file) throw new Error('Pilih file terlebih dahulu.');

    const btn = f.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Memproses...'; }
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
      if (!workbook.SheetNames.length) throw new Error('Workbook tidak memiliki sheet.');
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { defval: '', raw: false });
      if (!jsonData.length) throw new Error('File Excel kosong atau format salah. Isi data mulai dari baris kedua.');
      if (d.type === 'soal') {
        const pick = (row, names) => {
          const keys = Object.keys(row || {});
          for (const wanted of names) {
            const norm = v => String(v).trim().toLowerCase().replace(/[\s_-]+/g, '');
            const found = keys.find(k => norm(k) === norm(wanted));
            if (found && row[found] !== undefined) return String(row[found] ?? '');
          }
          return '';
        };
        state.importQuestions = jsonData.map(row => ({
          mapel: pick(row, ['Mapel','Mata Pelajaran']) || 'Umum',
          pertanyaan: pick(row, ['Soal','Pertanyaan','Question']),
          opsi_a: pick(row, ['A','Opsi_A','Pilihan A']), opsi_b: pick(row, ['B','Opsi_B','Pilihan B']),
          opsi_c: pick(row, ['C','Opsi_C','Pilihan C']), opsi_d: pick(row, ['D','Opsi_D','Pilihan D']),
          opsi_e: pick(row, ['E','Opsi_E','Pilihan E']),
          jawaban_benar: pick(row, ['Kunci','Kunci Jawaban','jawaban_benar']).toUpperCase() || 'A',
          pembahasan: pick(row, ['Pembahasan']), gambar_id: pick(row, ['Gambar_ID','Gambar ID'])
        })).filter(q => q.pertanyaan.trim());
        if (!state.importQuestions.length) throw new Error('Tidak ditemukan kolom Soal/Pertanyaan. Gunakan template Excel resmi.');
        closeModal(); showSoalImportPreview(); return;
      }
      const res = await api('uploadExcelBatch', { type: d.type, kelas_id: d.kelas_id, data: jsonData });
      closeModal();
      toast(res.message || 'Data berhasil diimpor.');
      await render();
    } catch (err) {
      setErr(f, err.message || 'Gagal mengimpor Excel.');
    } finally {
      if (btn && document.body.contains(btn)) { btn.disabled = false; btn.textContent = 'Simpan Data'; }
    }
  },

  'gambar-soal-upload': async f => {
    const fileInput = f.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    if(!file) throw new Error('Pilih file terlebih dahulu.');
    const btn = f.querySelector('button[type="submit"]');
    if (btn) btn.textContent = 'Mengompresi & Mengupload...';
    
    const compressed = await compressImage(file);
    const r = await api('uploadGambarSoal', { file: { mime: compressed.mime, data: compressed.data }});
    closeModal();
    showOnce('ID Gambar Berhasil Diupload', r.fileId + '\n\nSilakan salin ID ini dan tempelkan ke kolom gambar_id di dalam file Excel Bank Soal Anda.');
  },

  login: async f => {
    const d = fd(f);
    const r = await api('login', { username: d.username.trim(), password: d.password });
    saveSession(r.token, r.user);
    go('#/');
    prefetchAppData();
  },
  'pw-save': async f => {
    const d = fd(f);
    if (d.new !== d.confirm) throw new Error('Konfirmasi password tidak sama.');
    await api('changePassword', { old: d.old, new: d.new });
    f.reset();
    toast('Password berhasil diubah');
  },
  'user-search': async f => { state.q = fd(f).q || ''; render(); },
  'user-save': async f => {
    const d = fd(f);
    if (d.id) {
      await api('userUpdate', { id: d.id, nama: d.nama, username: d.username, role: d.role });
      closeModal();
      toast('Data pengguna disimpan');
      render();
    } else {
      const r = await api('userCreate', { nama: d.nama, username: d.username, role: d.role });
      closeModal();
      showOnce('Akun dibuat', 'Username: ' + r.username + '\nPassword sementara: ' + r.password);
      render();
    }
  },
  'class-save': async f => {
    const d = fd(f);
    const p = { nama_kelas: d.nama_kelas, tahun_ajaran: d.tahun_ajaran, guru_id: d.guru_id };
    if (d.id) await api('classUpdate', Object.assign({ id: d.id }, p));
    else await api('classCreate', p);
    closeModal();
    toast('Kelas disimpan');
    render();
  },
  'class-add-student': async f => {
    const d = fd(f);
    await api('classAddStudent', { kelas_id: d.kelas_id, siswa_id: d.siswa_id });
    closeModal();
    toast('Siswa ditambahkan');
    render();
  },

  'task-save': async f => {
    const d = fd(f);
    if (!d.batas_waktu) throw new Error('Isi batas waktu tugas.');
    await api('assignmentSave', {
      id: d.id || '', kelas_id: d.kelas_id, judul: d.judul, deskripsi: d.deskripsi || '',
      batas_waktu: new Date(d.batas_waktu).toISOString(), nilai_maksimal: Number(d.nilai_maksimal)
    });
    closeModal();
    toast('Tugas disimpan');
    render();
  },
  'quiz-save': async f => {
    const d = fd(f);
    const questions = [...f.querySelectorAll('.qblock')].map(b => ({
      pertanyaan: b.querySelector('[data-k="pertanyaan"]').value.trim(),
      opsi_a: b.querySelector('[data-k="opsi_a"]').value.trim(),
      opsi_b: b.querySelector('[data-k="opsi_b"]').value.trim(),
      opsi_c: b.querySelector('[data-k="opsi_c"]').value.trim(),
      opsi_d: b.querySelector('[data-k="opsi_d"]').value.trim(),
      jawaban_benar: b.querySelector('[data-k="benar"]').value
    }));
    const bank_soal_ids = [...f.querySelectorAll('input[name="bank_soal_ids"]:checked')].map(el => el.value);
    await api('quizSave', { id: '', kelas_id: d.kelas_id, judul: d.judul, jenis_ujian: d.jenis_ujian, durasi_menit: Number(d.durasi_menit), bank_soal_ids: bank_soal_ids, questions: questions });
    closeModal();
    toast('Kuis disimpan');
    render();
  },
  'bank-soal-save': async f => {
    const d = fd(f);
    await api('bankSoalSave', {
      id: d.id || '',
      mapel: d.mapel || 'Umum',
      kelas: d.kelas || '',
      bab: d.bab || '',
      jenis_soal: d.jenis_soal || 'pg',
      pertanyaan: d.pertanyaan,
      gambar_id: d.gambar_id || '',
      opsi_a: d.opsi_a,
      opsi_b: d.opsi_b,
      opsi_c: d.opsi_c,
      opsi_d: d.opsi_d,
      opsi_e: d.opsi_e || '',
      jawaban_benar: (d.jawaban_benar || 'A').toUpperCase(),
      bobot: Number(d.bobot) || 1,
      pembahasan: d.pembahasan || '',
      tingkat_kesulitan: d.tingkat_kesulitan || 'Sedang'
    });
    closeModal();
    toast('Soal berhasil disimpan ke Bank Soal');
    render();
  },
  'ann-save': async f => {
    const d = fd(f);
    await api('annSave', { judul: d.judul, isi: d.isi, kelas_id: d.kelas_id || '' });
    closeModal();
    toast('Pengumuman dikirim');
    render();
  },
  'task-submit': async f => {
    const d = fd(f);
    await api('submissionSave', { assignmentId: f.dataset.tugas, jawaban: d.jawaban || '', tautan: d.tautan || '', photos: state.pending });
    state.pending = [];
    toast('Tugas berhasil dikumpulkan');
    render();
  },
  'grade-save': async f => {
    const d = fd(f);
    await api('submissionGrade', { submissionId: d.sub, nilai: d.nilai, feedback: d.feedback || '' });
    closeModal();
    toast('Nilai disimpan');
    render();
  },
  'gas-url-save': async f => {
    const url = (f.gas_url.value || '').trim();
    if (url) {
      localStorage.setItem('lms_gas_url', url);
      if (window.CONFIG) window.CONFIG.GAS_WEBAPP_URL = url;
      toast('URL Google Apps Script berhasil disimpan!');
    } else {
      localStorage.removeItem('lms_gas_url');
      if (window.CONFIG) window.CONFIG.GAS_WEBAPP_URL = '';
      toast('URL dikosongkan.');
    }
    render();
  }
};

document.addEventListener('submit', async e => {
  const f = e.target;
  if (!f.matches || !f.matches('form[data-form]')) return;
  e.preventDefault();
  const el = f.querySelector('.err');
  if (el) el.textContent = '';
  // Hanya disable tombol yang bukan upload excel (karena ditangani terpisah via readAsArrayBuffer)
  if (f.dataset.form !== 'excel-upload' && f.dataset.form !== 'gambar-soal-upload') {
     const btn = f.querySelector('button[type="submit"]');
     if (btn) btn.disabled = true;
  }
  try { await forms[f.dataset.form](f); }
  catch (err) { setErr(f, err.message); }
  finally { 
    if (f.dataset.form !== 'excel-upload' && f.dataset.form !== 'gambar-soal-upload') {
       const btn = f.querySelector('button[type="submit"]');
       if (btn) btn.disabled = false;
    }
  }
});

/* ===================== FORM MODAL ===================== */
async function pickClass(act, title) {
  const list = await api('classList');
  if (!list.length) throw new Error('Anda belum memiliki kelas.');
  openModal('<h3 class="modal-t">' + esc(title) + '</h3>' + list.map(k => '<button type="button" class="btn sec block mt" data-act="' + act + '" data-kelas="' + k.id + '">' + esc(k.nama_kelas) + '</button>').join(''));
}
async function classForm(id) {
  const guruList = await api('usersList', { role: 'guru' });
  let k = { nama_kelas: '', tahun_ajaran: '2026/2027', guru_id: '' };
  if (id) { const d = await api('classDetail', { id: id }); k = d.kelas; }
  openModal('<h3 class="modal-t">' + (id ? 'Ubah' : 'Tambah') + ' Kelas</h3><form data-form="class-save">'
    + '<input type="hidden" name="id" value="' + esc(id || '') + '">'
    + '<label>Nama kelas</label><input name="nama_kelas" required value="' + esc(k.nama_kelas) + '" placeholder="Contoh: Kelas 4A">'
    + '<label>Tahun ajaran</label><input name="tahun_ajaran" required value="' + esc(k.tahun_ajaran) + '">'
    + '<label>Guru pengampu</label><select name="guru_id" required>' + guruList.map(g => '<option value="' + g.id + '" ' + (g.id === k.guru_id ? 'selected' : '') + '>' + esc(g.nama) + '</option>').join('') + '</select>'
    + '<div class="err"></div><button type="submit" class="btn block mt">Simpan</button></form>');
}
async function classAddForm(kelasId) {
  const [d, siswa] = await Promise.all([api('classDetail', { id: kelasId }), api('usersList', { role: 'siswa' })]);
  const sudah = new Set(d.anggota.map(a => a.id));
  const pilih = siswa.filter(s => s.status === 'aktif' && !sudah.has(s.id));
  if (!pilih.length) { toast('Tidak ada siswa aktif yang bisa ditambahkan.'); return; }
  openModal('<h3 class="modal-t">Tambah Siswa</h3><form data-form="class-add-student"><input type="hidden" name="kelas_id" value="' + esc(kelasId) + '">'
    + '<label>Siswa</label><select name="siswa_id">' + pilih.map(s => '<option value="' + s.id + '">' + esc(s.nama) + ' (' + esc(s.username) + ')</option>').join('') + '</select>'
    + '<div class="err"></div><button type="submit" class="btn block mt">Tambahkan</button></form>');
}
async function tugasForm(kelasId, id) {
  let t = { judul: '', deskripsi: '', batas_waktu: '', nilai_maksimal: 100, kelas_id: kelasId };
  if (id) { const d = await api('assignmentDetail', { id: id }); t = d.tugas; kelasId = t.kelas_id; }
  openModal('<h3 class="modal-t">' + (id ? 'Ubah' : 'Buat') + ' Tugas</h3><form data-form="task-save">'
    + '<input type="hidden" name="id" value="' + esc(id || '') + '"><input type="hidden" name="kelas_id" value="' + esc(kelasId) + '">'
    + '<label>Judul tugas</label><input name="judul" required value="' + esc(t.judul) + '">'
    + '<label>Petunjuk</label><textarea name="deskripsi">' + esc(t.deskripsi) + '</textarea>'
    + '<label>Batas waktu</label><input name="batas_waktu" type="datetime-local" required value="' + toLocalInput(t.batas_waktu) + '">'
    + '<label>Nilai maksimal</label><input name="nilai_maksimal" type="number" min="1" max="100" required value="' + esc(t.nilai_maksimal) + '">'
    + '<div class="err"></div><button type="submit" class="btn block mt">Simpan Tugas</button></form>');
}
async function kuisForm(kelasId) {
  const bank = await api('bankSoalList');
  const examTypes = ['Kuis Harian', 'Asesmen Formatif', 'Sumatif Lingkup Materi', 'Sumatif Tengah Semester (STS)', 'Sumatif Akhir Semester (SAS)', 'Ujian Sekolah', 'Remedial', 'Pengayaan'];
  const bankHtml = bank.length ? '<div class="bank-pick-list">' + bank.map((q, i) => '<label class="bank-pick-item">'
    + '<input type="checkbox" name="bank_soal_ids" value="' + esc(q.id) + '">'
    + '<span><b>' + (i + 1) + '. ' + esc(q.mapel || 'Umum') + '</b><span class="bank-pick-question">' + esc(q.pertanyaan || '(Pertanyaan kosong)') + '</span><small class="muted">Kunci: ' + esc(q.jawaban_benar || '-') + '</small></span></label>').join('') + '</div>'
    : '<div class="empty">Bank soal masih kosong. Impor soal Excel terlebih dahulu, atau tambahkan soal manual di bawah.</div>';
  openModal('<h3 class="modal-t">Buat Paket Ujian</h3><form data-form="quiz-save">'
    + '<input type="hidden" name="kelas_id" value="' + esc(kelasId) + '">'
    + '<label>Jenis paket ujian</label><select name="jenis_ujian" required>' + examTypes.map(t => '<option value="' + esc(t) + '">' + esc(t) + '</option>').join('') + '</select>'
    + '<label>Nama paket ujian</label><input name="judul" required placeholder="Contoh: STS Matematika Kelas 4">'
    + '<label>Durasi (menit)</label><input name="durasi_menit" type="number" min="1" max="180" value="30" required>'
    + '<div class="mt"><div class="row-g"><b>Pilih soal dari Bank Soal</b><span class="muted">' + bank.length + ' soal tersedia</span></div><div class="muted mt8">Centang soal yang ingin dimasukkan ke paket ujian.</div>' + bankHtml + '</div>'
    + '<details class="mt"><summary>Tambah soal manual (opsional)</summary><div id="qlist"></div><button type="button" class="btn sec block mt" data-act="add-q">' + ic('add') + ' Tambah Soal Manual</button></details>'
    + '<div class="err"></div><button type="submit" class="btn block mt">Simpan Paket Ujian</button></form>');
async function bankSoalForm(id) {
  let q = {
    id: '', mapel: 'Matematika', kelas: 'Kelas 4', bab: '', jenis_soal: 'pg',
    pertanyaan: '', gambar_id: '', opsi_a: '', opsi_b: '', opsi_c: '', opsi_d: '', opsi_e: '',
    jawaban_benar: 'A', bobot: 1, pembahasan: '', tingkat_kesulitan: 'Sedang'
  };
  if (id) {
    const bank = await api('bankSoalList');
    const found = bank.find(x => x.id === id);
    if (found) q = Object.assign({}, q, found);
  }

  const imagePreview = q.gambar_id
    ? '<div class="quiz-img-box mt8"><img src="https://lh3.googleusercontent.com/d/' + encodeURIComponent(q.gambar_id) + '" onerror="this.src=\'https://drive.google.com/uc?export=view&id=' + encodeURIComponent(q.gambar_id) + '\'" alt="Gambar Soal"><button type="button" class="btn ghost sm" data-act="del-soal-img" style="color:var(--bad-main);">' + ic('delete') + ' Hapus Gambar</button></div>'
    : '<div class="help mt8">Belum ada gambar terpilih.</div>';

  openModal('<h3 class="modal-t">' + (id ? 'Edit' : 'Tambah') + ' Soal Bank Soal</h3><form data-form="bank-soal-save">'
    + '<input type="hidden" name="id" value="' + esc(q.id || '') + '">'
    + '<div class="dg dg-2">'
    + '<div><label>Mata Pelajaran</label><input name="mapel" required value="' + esc(q.mapel) + '" placeholder="Contoh: Matematika"></div>'
    + '<div><label>Kelas</label><input name="kelas" value="' + esc(q.kelas) + '" placeholder="Contoh: Kelas 4"></div>'
    + '</div>'
    + '<div class="dg dg-2">'
    + '<div><label>Bab / Materi</label><input name="bab" value="' + esc(q.bab) + '" placeholder="Contoh: Pecahan Senilai"></div>'
    + '<div><label>Tingkat Kesulitan</label><select name="tingkat_kesulitan">'
    + ['Mudah', 'Sedang', 'Sulit'].map(k => '<option value="' + k + '" ' + (q.tingkat_kesulitan === k ? 'selected' : '') + '>' + k + '</option>').join('') + '</select></div>'
    + '</div>'
    + '<label>Pertanyaan Soal</label><textarea name="pertanyaan" required placeholder="Tuliskan teks pertanyaan soal di sini...">' + esc(q.pertanyaan) + '</textarea>'
    + '<div class="card mt" style="background:var(--primary-soft);border:1px dashed #BFDBFE;">'
    + '<b>Gambar Soal (opsional)</b><p class="help">Unggah file foto / gambar langsung dari HP atau komputer (JPG/PNG, maks 2 MB).</p>'
    + '<label class="upload-btn">' + ic('photo_camera') + ' Pilih Gambar Soal<input type="file" accept="image/jpeg,image/png" hidden data-act="pick-single-soal-img"></label>'
    + '<input type="hidden" name="gambar_id" id="form-soal-gambar-id" value="' + esc(q.gambar_id || '') + '">'
    + '<div id="form-soal-img-pv">' + imagePreview + '</div>'
    + '</div>'
    + '<div class="dg dg-2">'
    + '<div><label>Pilihan A</label><input name="opsi_a" required value="' + esc(q.opsi_a) + '"></div>'
    + '<div><label>Pilihan B</label><input name="opsi_b" required value="' + esc(q.opsi_b) + '"></div>'
    + '<div><label>Pilihan C</label><input name="opsi_c" required value="' + esc(q.opsi_c) + '"></div>'
    + '<div><label>Pilihan D</label><input name="opsi_d" required value="' + esc(q.opsi_d) + '"></div>'
    + '</div>'
    + '<label>Pilihan E (opsional untuk SMA/sederajat)</label><input name="opsi_e" value="' + esc(q.opsi_e) + '">'
    + '<div class="dg dg-2">'
    + '<div><label>Kunci Jawaban</label><select name="jawaban_benar">'
    + ['A', 'B', 'C', 'D', 'E'].map(k => '<option value="' + k + '" ' + (String(q.jawaban_benar || 'A').toUpperCase() === k ? 'selected' : '') + '>' + k + '</option>').join('') + '</select></div>'
    + '<div><label>Bobot Nilai</label><input name="bobot" type="number" min="1" max="100" value="' + (q.bobot || 1) + '"></div>'
    + '</div>'
    + '<label>Pembahasan / Penjelasan Jawaban (opsional)</label><textarea name="pembahasan" placeholder="Penjelasan cara penyelesaian atau sumber materi...">' + esc(q.pembahasan) + '</textarea>'
    + '<div class="err"></div><button type="submit" class="btn block mt">' + (id ? 'Perbarui Soal' : 'Simpan Soal') + '</button></form>');
}
function addQBlock() {
  const box = $('#qlist');
  if (!box) return;
  const n = box.querySelectorAll('.qblock').length + 1;
  box.insertAdjacentHTML('beforeend', '<div class="qblock card"><div class="row"><strong>Soal ' + n + '</strong>'
    + '<button type="button" class="btn ghost sm" data-act="del-q" aria-label="Hapus soal">' + ic('delete') + '</button></div>'
    + '<label>Pertanyaan</label><textarea data-k="pertanyaan" required></textarea>'
    + '<label>Opsi A</label><input data-k="opsi_a" required>'
    + '<label>Opsi B</label><input data-k="opsi_b" required>'
    + '<label>Opsi C</label><input data-k="opsi_c" required>'
    + '<label>Opsi D</label><input data-k="opsi_d" required>'
    + '<label>Jawaban benar</label><select data-k="benar"><option>A</option><option>B</option><option>C</option><option>D</option></select></div>');
}
async function annForm() {
  const u = state.user;
  const kelas = await api('classList');
  const opsi = (u.role === 'admin' ? '<option value="">Semua kelas (seluruh sekolah)</option>' : '')
    + kelas.map(k => '<option value="' + k.id + '">' + esc(k.nama_kelas) + '</option>').join('');
  openModal('<h3 class="modal-t">Buat Pengumuman</h3><form data-form="ann-save">'
    + '<label>Untuk</label><select name="kelas_id">' + opsi + '</select>'
    + '<label>Judul</label><input name="judul" required>'
    + '<label>Isi</label><textarea name="isi" required></textarea>'
    + '<div class="err"></div><button type="submit" class="btn block mt">Kirim Pengumuman</button></form>');
}
async function userForm(id) {
  let x = { nama: '', username: '', role: 'siswa' };
  if (id) { const all = await api('usersList', {}); x = all.find(v => v.id === id) || x; }
  openModal('<h3 class="modal-t">' + (id ? 'Ubah' : 'Tambah') + ' Pengguna</h3><form data-form="user-save">'
    + '<input type="hidden" name="id" value="' + esc(id || '') + '">'
    + '<label>Nama lengkap</label><input name="nama" required value="' + esc(x.nama) + '">'
    + '<label>Username</label><input name="username" required autocapitalize="none" value="' + esc(x.username) + '" pattern="[a-z0-9._]{3,20}" title="3 sampai 20 huruf kecil, angka, titik, atau garis bawah">'
    + '<label>Peran</label><select name="role">' + ['siswa', 'guru', 'admin'].map(r => '<option value="' + r + '" ' + (x.role === r ? 'selected' : '') + '>' + roleName(r) + '</option>').join('') + '</select>'
    + (id ? '' : '<p class="help">Password sementara dibuat otomatis dan hanya ditampilkan sekali.</p>')
    + '<div class="err"></div><button type="submit" class="btn block mt">Simpan</button></form>');
}
async function gradeForm(i) {
  const r = state.subRows[i];
  const s = r.submission;
  const t = state.curTask;
  openModal('<h3 class="modal-t">Nilai: ' + esc(r.nama) + '</h3>'
    + '<div class="muted">Dikumpulkan: ' + fmt(s.waktu_kumpul) + (s.status === 'Terlambat' ? ' <b>(terlambat)</b>' : '') + '</div>'
    + (s.jawaban ? '<div class="card mt"><b>Jawaban:</b><p>' + esc(s.jawaban) + '</p></div>' : '')
    + (s.tautan ? '<a class="btn sec sm" href="' + esc(s.tautan) + '" target="_blank" rel="noopener">' + ic('open_in_new') + ' Buka Tautan</a>' : '')
    + '<div class="photo-grid mt">' + (s.foto_ids.length ? s.foto_ids.map(fid => '<div class="thumb"><img data-fid="' + fid + '" data-sid="' + s.id + '" alt="Foto tugas"></div>').join('') : '<span class="muted">Tidak ada foto.</span>') + '</div>'
    + '<form data-form="grade-save" class="mt"><input type="hidden" name="sub" value="' + esc(s.id) + '">'
    + '<label>Nilai (0 sampai ' + t.nilai_maksimal + ')</label><input name="nilai" type="number" min="0" max="' + t.nilai_maksimal + '" required value="' + esc(s.nilai) + '">'
    + '<label>Catatan untuk siswa</label><textarea name="feedback">' + esc(s.feedback || '') + '</textarea>'
    + '<div class="err"></div><button type="submit" class="btn block mt">Simpan Nilai</button></form>');
}

/* ===================== FOTO: PILIH & KOMPRESI ===================== */
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error('Foto tidak dapat dibaca.'));
    fr.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Format foto tidak didukung.'));
      img.onload = () => {
        // Skala 1200px optimal untuk tulisan lembar kerja SD (tajam dan file sangat ringan ~150-250KB)
        const skala = Math.min(1, 1200 / Math.max(img.width, img.height));
        const cv = document.createElement('canvas');
        cv.width = Math.round(img.width * skala);
        cv.height = Math.round(img.height * skala);
        const ctx = cv.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.drawImage(img, 0, 0, cv.width, cv.height);
        for (const q of [0.75, 0.65, 0.5]) {
          const url = cv.toDataURL('image/jpeg', q);
          if (url.length * 0.75 <= MAX_PHOTO_BYTES) {
            return resolve({ name: file.name, mime: 'image/jpeg', data: url.split(',')[1] });
          }
        }
        reject(new Error('Foto terlalu besar. Coba foto dengan ukuran lebih kecil.'));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}
async function pickPhotos(input) {
  const sisa = MAX_PHOTOS - Number(input.dataset.existing || 0) - state.pending.length;
  if (sisa <= 0) { toast('Maksimal ' + MAX_PHOTOS + ' foto per pengumpulan.'); input.value = ''; return; }
  const files = [...input.files];
  if (files.length > sisa) toast('Hanya ' + sisa + ' foto lagi yang bisa ditambahkan.');
  for (const file of files.slice(0, sisa)) {
    if (!/^image\/(jpeg|png)$/.test(file.type)) { toast('Hanya foto JPG atau PNG.'); continue; }
    state.pending.push(await compressImage(file));
  }
  input.value = '';
  renderPending();
}
function renderPending() {
  const box = $('#pv');
  if (!box) return;
  box.innerHTML = state.pending.map((p, i) => '<div class="thumb"><img src="data:' + p.mime + ';base64,' + p.data + '" alt="Foto baru ' + (i + 1) + '">'
    + '<button type="button" class="thumb-x" data-act="photo-rm-pending" data-i="' + i + '" aria-label="Hapus foto">' + ic('close') + '</button></div>').join('');
}
/* ===================== PWA: MANIFEST, SERVICE WORKER, INSTALASI ===================== */
const APP_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#1E3A8A"/>'
  + '<path d="M96 170c60-24 120-24 160 6 40-30 100-30 160-6v210c-60-24-120-24-160 6-40-30-100-30-160-6z" fill="#FFFFFF"/>'
  + '<path d="M256 176v210" stroke="#1E3A8A" stroke-width="14"/>'
  + '<path d="M360 104l64 28-64 28-64-28z" fill="#F59E0B"/></svg>';

function setManifest() {
  try {
    const icon = 'data:image/svg+xml,' + encodeURIComponent(APP_ICON_SVG);
    const manifest = {
      name: APP_NAME,
      short_name: 'EduDigital',
      start_url: location.href,
      display: 'standalone',
      background_color: '#F8FAFC',
      theme_color: '#1E3A8A',
      icons: [
        { src: icon, sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
        { src: icon, sizes: '512x512', type: 'image/svg+xml', purpose: 'any' }
      ]
    };
    const mLink = $('#manifest-link');
    if (mLink) mLink.setAttribute('href', 'data:application/manifest+json;charset=utf-8,' + encodeURIComponent(JSON.stringify(manifest)));
    const apple = document.createElement('link');
    apple.rel = 'apple-touch-icon';
    apple.href = icon;
    document.head.appendChild(apple);
  } catch (e) {
    console.warn('Manifest warning:', e);
  }
}

const OFFLINE_HTML = '<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title></head>'
  + '<body style="font-family:sans-serif;background:#F8FAFC;color:#0F172A;text-align:center;padding:48px 16px">'
  + '<h2>Anda sedang offline</h2><p>Periksa koneksi internet, lalu muat ulang halaman.</p></body></html>';

function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  const src = [
    "const CACHE = 'lms-sd-v1';",
    "const OFFLINE = " + JSON.stringify(OFFLINE_HTML) + ";",
    "self.addEventListener('install', e => { self.skipWaiting(); });",
    "self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });",
    "self.addEventListener('fetch', e => {",
    "  const req = e.request;",
    "  if (req.method !== 'GET') return;",
    "  e.respondWith(",
    "    fetch(req).then(res => {",
    "      if (res.ok && req.url.indexOf(self.location.origin) === 0) {",
    "        caches.open(CACHE).then(c => c.put(req, res.clone()));",
    "      }",
    "      return res;",
    "    }).catch(() => caches.match(req).then(hit => hit || (req.mode === 'navigate'",
    "      ? new Response(OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })",
    "      : Response.error())))",
    "  );",
    "});"
  ].join('\n');
  try {
    const url = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
    navigator.serviceWorker.register(url).catch(err => console.warn('Service Worker belum aktif di lingkungan ini:', err));
  } catch (e) {
    console.warn('Service Worker tidak dapat dibuat:', e);
  }
}

let deferredPrompt = null;
const DISMISS_KEY = 'installDismissedAt';
function recentlyDismissed() {
  try {
    const t = Number(localStorage.getItem(DISMISS_KEY) || 0);
    return t > 0 && (Date.now() - t) < 7 * 86400000;
  } catch (e) { return false; }
}
function isStandalone() {
  return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
}
function isIOSSafari() {
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
}
function showInstall(text, bisaPasang) {
  const el = $('#install');
  el.innerHTML = '<div class="install-ic">' + ic('install_mobile') + '</div><div class="install-tx">' + esc(text) + '</div>'
    + (bisaPasang ? '<button type="button" class="btn sm" data-act="install-go">Pasang</button>' : '')
    + '<button type="button" class="btn ghost sm" data-act="install-close" aria-label="Tutup">' + ic('close') + '</button>';
  el.classList.remove('hidden');
}
function hideInstall() { $('#install').classList.add('hidden'); }
function dismissInstall() {
  try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch (e) { /* abaikan */ }
  hideInstall();
}
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  if (!recentlyDismissed() && !isStandalone()) showInstall('Pasang EduDigital ke layar utama agar lebih cepat dibuka.', true);
});
function showOffline() { $('#offline').classList.remove('hidden'); }
function hideOffline() { $('#offline').classList.add('hidden'); }

/* ===================== INISIALISASI ===================== */
window.addEventListener('hashchange', () => render());
window.addEventListener('offline', showOffline);
window.addEventListener('online', () => { hideOffline(); render(); });
try { setManifest(); } catch (e) { console.warn('setManifest error:', e); }
try { registerSW(); } catch (e) { console.warn('registerSW error:', e); }
try {
  if (isIOSSafari() && !isStandalone() && !recentlyDismissed()) {
    showInstall('Di iPhone, ketuk ikon Bagikan lalu pilih "Tambahkan ke Layar Utama".', false);
  }
} catch (e) { console.warn('install prompt error:', e); }
if (!navigator.onLine) showOffline();
render();

/* ===================== MATERI: FITUR BARU ===================== */
const JENIS_INFO = {
  youtube: { label: 'YouTube', icon: 'smart_display', cls: 'j-yt' },
  drive: { label: 'Google Drive', icon: 'cloud', cls: 'j-drive' },
  upload: { label: 'Berkas', icon: 'upload_file', cls: 'j-file' }
};
const MAT_MIME = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'video/mp4',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
const EXT_MIME = {
  pdf: 'application/pdf', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', mp4: 'video/mp4',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};
function jenisInfo(m) { return JENIS_INFO[m.jenis] || { label: 'Tautan', icon: 'link', cls: 'j-link' }; }
function youtubeId(url) {
  const m = String(url || '').match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : '';
}
function driveId(url) {
  const m = String(url || '').match(/(?:drive|docs)\.google\.com\/(?:file\/d\/|document\/d\/|presentation\/d\/|spreadsheets\/d\/|open\?id=)([A-Za-z0-9_-]{10,})/);
  return m ? m[1] : '';
}
function embedUrl(m) {
  if (m.jenis === 'youtube') return 'https://www.youtube-nocookie.com/embed/' + youtubeId(m.tautan);
  const doc = String(m.tautan || '').match(/docs\.google\.com\/(document|presentation|spreadsheets)\/d\/([A-Za-z0-9_-]+)/);
  if (doc) return 'https://docs.google.com/' + doc[1] + '/d/' + doc[2] + '/preview';
  return 'https://drive.google.com/file/d/' + driveId(m.tautan) + '/preview';
}
function b64ToUrl(b64, mime) {
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return URL.createObjectURL(new Blob([u8], { type: mime }));
}
function readB64(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error('Berkas tidak dapat dibaca.'));
    fr.onload = () => resolve(String(fr.result).split(',')[1]);
    fr.readAsDataURL(file);
  });
}
function mimeOf(file) {
  if (file.type) return file.type;
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  return EXT_MIME[ext] || '';
}

/* Helper untuk PV (data demo). Sama dengan aturan di Code.gs. */
function babOf(m) { return String(m.bab || '').trim() || 'Umum'; }
function matOut(m) { return Object.assign({}, m, { bab: babOf(m), urutan: Number(m.urutan) || 0, jenis: m.jenis || 'tautan' }); }
function matSort(a, b) {
  if (a.bab !== b.bab) return a.bab.localeCompare(b.bab, 'id', { numeric: true });
  if (a.urutan !== b.urutan) return a.urutan - b.urutan;
  return String(a.dibuat_pada).localeCompare(String(b.dibuat_pada));
}
function nextUrutanIn(list, kelasId, bab) {
  const vals = list.filter(m => m.kelas_id === kelasId && babOf(m) === bab).map(m => Number(m.urutan) || 0);
  return vals.length ? Math.max.apply(null, vals) + 1 : 1;
}

/* ----- Kartu, daftar per bab ----- */
function materiCard(m, guru, i, total) {
  const j = jenisInfo(m);
  const kontrol = guru
    ? '<div class="row-g">'
      + '<button type="button" class="btn ghost sm" data-act="mat-up" data-id="' + m.id + '" data-kelas="' + m.kelas_id + '"' + (i === 0 ? ' disabled' : '') + ' aria-label="Naikkan urutan">' + ic('arrow_upward') + '</button>'
      + '<button type="button" class="btn ghost sm" data-act="mat-down" data-id="' + m.id + '" data-kelas="' + m.kelas_id + '"' + (i === total - 1 ? ' disabled' : '') + ' aria-label="Turunkan urutan">' + ic('arrow_downward') + '</button>'
      + '<button type="button" class="btn ghost sm" data-act="mat-edit" data-kelas="' + m.kelas_id + '" data-id="' + m.id + '" aria-label="Ubah materi">' + ic('edit') + '</button>'
      + '<button type="button" class="btn ghost sm" data-act="mat-del" data-id="' + m.id + '" data-kelas="' + m.kelas_id + '" aria-label="Hapus materi">' + ic('delete') + '</button>'
      + '</div>'
    : '';
  return '<div class="mcard click" data-act="go" data-to="#/materi/view/' + m.id + '" role="link" tabindex="0">'
    + '<div class="mthumb ' + j.cls + '">' + ic(j.icon) + '</div>'
    + '<div class="mbody"><div class="row"><span class="jbadge ' + j.cls + '">' + j.label + '</span></div>'
    + '<div class="t-md mt8">' + esc(m.judul) + '</div>'
    + (m.deskripsi ? '<div class="muted mdesc">' + esc(m.deskripsi) + '</div>' : '')
    + (guru ? '<div class="mkontrol">' + kontrol + '</div>' : '')
    + '</div></div>';
}
function materiGroups(list, guru) {
  if (!list.length) return empty('Belum ada materi.');
  const groups = [];
  list.forEach(m => {
    let g = groups.find(x => x.bab === m.bab);
    if (!g) { g = { bab: m.bab, items: [] }; groups.push(g); }
    g.items.push(m);
  });
  return groups.map(g => '<section class="bab"><div class="bab-h"><span class="bab-n">' + esc(g.bab) + '</span><span class="bab-c">' + g.items.length + ' materi</span></div>'
    + g.items.map((m, i) => materiCard(m, guru, i, g.items.length)).join('') + '</section>').join('');
}

/* ----- Halaman daftar materi ----- */
async function pageMateriList(kelasId) {
  const u = state.user;
  const guru = u.role === 'guru';
  const kelas = await api('classList');
  if (!kelas.length) return pageHead('Materi') + empty('Belum ada kelas.');
  const aktif = kelas.find(k => k.id === kelasId) || kelas[0];
  const list = await api('materialList', { classId: aktif.id });
  const jumlahBab = new Set(list.map(m => m.bab)).size;
  const jumlahBerkas = list.filter(m => m.jenis === 'upload').length;
  return pageHead('Materi', guru ? '<button type="button" class="btn" data-act="mat-new" data-kelas="' + aktif.id + '">' + ic('add') + ' Tambah Materi</button>' : '')
    + '<div class="chips kelas-chips">' + kelas.map(k => '<button type="button" class="chip ' + (k.id === aktif.id ? 'on' : '') + '" data-act="go" data-to="#/materi/' + k.id + '">' + esc(k.nama_kelas) + '</button>').join('') + '</div>'
    + '<div class="mstat"><div><b>' + list.length + '</b><span>materi</span></div><div><b>' + jumlahBab + '</b><span>bab</span></div><div><b>' + jumlahBerkas + '</b><span>berkas</span></div></div>'
    + materiGroups(list, guru);
}

/* ----- Halaman preview materi ----- */
async function pageMateriView(id) {
  const u = state.user;
  const guru = u.role === 'guru';
  const d = await api('materialGet', { id: id });
  const m = d.materi;
  const j = jenisInfo(m);
  let player;
  if (m.jenis === 'upload') {
    player = '<div class="player shimmer" id="fileBox" data-id="' + m.id + '"><div class="pmsg">' + ic('hourglass_top') + ' Memuat berkas…</div></div>';
  } else if (m.jenis === 'youtube' || m.jenis === 'drive') {
    player = '<div class="player"><iframe src="' + esc(embedUrl(m)) + '" title="' + esc(m.judul) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
  } else {
    player = '<div class="ext-card">' + ic('link') + '<div><div class="t-md">Tautan eksternal</div><div class="muted">' + esc(m.tautan) + '</div></div></div>';
  }
  const aksi = m.jenis === 'upload'
    ? '<button type="button" class="btn" data-act="mat-download" data-id="' + m.id + '">' + ic('download') + ' Unduh</button>'
    : '<a class="btn sec" href="' + esc(m.tautan) + '" target="_blank" rel="noopener">' + ic('open_in_new') + ' Buka di tab baru</a>';
  const navBawah = '<div class="pnav">'
    + (d.prev ? '<button type="button" class="btn sec" data-act="go" data-to="#/materi/view/' + d.prev.id + '">' + ic('chevron_left') + ' Sebelumnya</button>' : '<span></span>')
    + (d.next ? '<button type="button" class="btn" data-act="go" data-to="#/materi/view/' + d.next.id + '">Berikutnya ' + ic('chevron_right') + '</button>' : '<span></span>')
    + '</div>';
  return '<div class="crumb"><a href="#/materi/' + m.kelas_id + '">' + ic('arrow_back') + ' Materi ' + esc(d.kelas_nama) + '</a></div>'
    + '<div class="mhero ' + j.cls + '"><div class="mhero-top"><span class="jbadge ' + j.cls + '">' + ic(j.icon) + ' ' + j.label + '</span><span class="mhero-bab">' + esc(m.bab) + '</span></div>'
    + '<h2 class="mh-t">' + esc(m.judul) + '</h2>'
    + (m.deskripsi ? '<p class="mh-d">' + esc(m.deskripsi) + '</p>' : '')
    + '<div class="mmeta">' + ic('calendar_today') + ' ' + fmt(m.dibuat_pada) + (m.nama_file ? ' · ' + ic('description') + ' ' + esc(m.nama_file) : '') + '</div></div>'
    + player
    + '<div class="pactions">' + aksi
    + (guru ? '<button type="button" class="btn ghost" data-act="mat-edit" data-kelas="' + m.kelas_id + '" data-id="' + m.id + '">' + ic('edit') + ' Ubah</button>'
      + '<button type="button" class="btn ghost" data-act="mat-del" data-id="' + m.id + '" data-kelas="' + m.kelas_id + '">' + ic('delete') + ' Hapus</button>' : '')
    + '</div>'
    + navBawah;
}

/* Memuat berkas unggahan dan menampilkannya sesuai jenis (PDF, gambar, video, atau unduh). */
async function loadMateriFile() {
  const box = $('#fileBox');
  if (!box) return;
  try {
    const r = await api('materialFile', { id: box.dataset.id });
    const url = b64ToUrl(r.data, r.mime);
    state.blobUrl = url;
    box.classList.remove('shimmer');
    if (/^image\//.test(r.mime)) {
      box.innerHTML = '<img class="pimg" src="' + url + '" alt="' + esc(r.nama) + '">';
    } else if (/^video\//.test(r.mime)) {
      box.innerHTML = '<video class="pvid" controls playsinline src="' + url + '"></video>';
    } else if (r.mime === 'application/pdf') {
      box.classList.add('pdf');
      box.innerHTML = '<iframe src="' + url + '" title="' + esc(r.nama) + '"></iframe>';
    } else {
      box.classList.add('ext');
      box.innerHTML = '<div class="ext-card">' + ic('description') + '<div><div class="t-md">' + esc(r.nama) + '</div><div class="muted">Format ini tidak bisa ditampilkan di browser. Silakan unduh untuk membukanya.</div></div></div>';
    }
  } catch (e) {
    box.classList.remove('shimmer');
    box.innerHTML = '<div class="ext-card err-card">' + ic('error') + ' ' + esc(e.message) + '</div>';
  }
}

/* ----- Formulir materi (guru) ----- */
async function materiForm(kelasId, id) {
  const list = await api('materialList', { classId: kelasId });
  let m = { judul: '', deskripsi: '', bab: '', jenis: 'youtube', tautan: '', nama_file: '' };
  if (id) m = list.find(x => x.id === id) || m;
  const babs = [...new Set(list.map(x => x.bab).filter(b => b && b !== 'Umum'))];
  openModal('<h3 class="modal-t">' + (id ? 'Ubah' : 'Tambah') + ' Materi</h3>'
    + '<form data-form="mat-save"><input type="hidden" name="id" value="' + esc(id || '') + '"><input type="hidden" name="kelas_id" value="' + esc(kelasId) + '">'
    + '<label>Judul materi</label><input name="judul" required value="' + esc(m.judul) + '">'
    + '<label>Bab / topik</label><input name="bab" list="bablist" placeholder="Contoh: Bab 1 Pecahan" value="' + esc(m.bab === 'Umum' ? '' : m.bab) + '">'
    + '<datalist id="bablist">' + babs.map(b => '<option value="' + esc(b) + '">').join('') + '</datalist>'
    + '<label>Sumber materi</label><select name="jenis" data-act="src-change">'
    + ['youtube', 'drive', 'upload'].map(k => '<option value="' + k + '"' + (m.jenis === k ? ' selected' : '') + '>' + JENIS_INFO[k].label + (k === 'upload' ? ' dari perangkat' : '') + '</option>').join('')
    + '</select>'
    + '<div id="sec-link"><label id="tlabel">Tautan YouTube</label>'
    + '<input id="tinput" name="tautan" type="url" placeholder="https://www.youtube.com/watch?v=..." value="' + esc(m.jenis !== 'upload' ? m.tautan : '') + '">'
    + '<p class="help" id="thelp"></p></div>'
    + '<div id="sec-upload" class="hidden"><label>Berkas (maks. 10 MB)</label>'
    + '<label class="upload-btn">' + ic('upload_file') + ' <span id="fname">' + (m.nama_file ? 'Ganti berkas' : 'Pilih berkas') + '</span>'
    + '<input type="file" name="file" hidden accept=".pdf,.jpg,.jpeg,.png,.webp,.mp4,.docx,.pptx,.xlsx" data-act="file-pick"></label>'
    + (m.nama_file ? '<p class="help">Berkas saat ini: ' + esc(m.nama_file) + '. Biarkan kosong jika tidak diganti.</p>' : '')
    + '</div>'
    + '<label>Deskripsi (opsional)</label><textarea name="deskripsi">' + esc(m.deskripsi) + '</textarea>'
    + '<div class="err"></div><button type="submit" class="btn block mt">Simpan Materi</button></form>');
  srcChange(m.jenis === 'upload' ? 'upload' : m.jenis);
}
function srcChange(v) {
  const link = $('#sec-link');
  const up = $('#sec-upload');
  if (!link || !up) return;
  const isUp = v === 'upload';
  link.classList.toggle('hidden', isUp);
  up.classList.toggle('hidden', !isUp);
  if (!isUp) {
    $('#tlabel').textContent = v === 'drive' ? 'Tautan Google Drive atau Google Docs' : 'Tautan YouTube';
    $('#tinput').placeholder = v === 'drive' ? 'https://drive.google.com/file/d/...' : 'https://www.youtube.com/watch?v=...';
    $('#thelp').textContent = v === 'drive'
      ? 'Pastikan berkas dibagikan ke "Siapa saja yang memiliki link" agar siswa bisa membukanya.'
      : 'Video dapat diputar langsung di aplikasi.';
  }
}

/* ----- Aksi, formulir, dan event tambahan ----- */
async function moveMateri(el, dir) {
  await api('materialMove', { id: el.dataset.id, dir: dir });
  render();
}
Object.assign(actions, {
  'mat-up': el => moveMateri(el, 'up'),
  'mat-down': el => moveMateri(el, 'down'),
  'mat-download': async el => {
    const r = await api('materialFile', { id: el.dataset.id });
    const a = document.createElement('a');
    a.href = b64ToUrl(r.data, r.mime);
    a.download = r.nama || 'materi';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
});
Object.assign(forms, {
  'mat-save': async f => {
    const d = fd(f);
    const jenis = d.jenis;
    const payload = {
      id: d.id || '', kelas_id: d.kelas_id, judul: d.judul, bab: d.bab || '', deskripsi: d.deskripsi || '',
      jenis: jenis, tautan: jenis === 'upload' ? '' : (d.tautan || '').trim()
    };
    if (jenis === 'upload') {
      const inp = f.querySelector('input[type="file"]');
      const file = inp && inp.files[0];
      if (file) {
        if (file.size > MAX_MATERI_BYTES) throw new Error('Ukuran berkas melebihi 10 MB.');
        const mime = mimeOf(file);
        if (!mime) throw new Error('Format berkas tidak dikenali.');
        payload.file = { name: file.name, mime: mime, size: file.size, data: await readB64(file) };
      } else if (!d.id) {
        throw new Error('Pilih berkas dari perangkat.');
      }
    }
    await api('materialSave', payload);
    closeModal();
    toast('Materi disimpan');
    render();
  }
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.matches('[data-act="src-change"]')) return srcChange(t.value);
  if (t.matches('[data-act="file-pick"]')) {
    const s = $('#fname');
    const f = t.files[0];
    if (s) s.textContent = f ? f.name : 'Pilih berkas';
  }
});

/* ===================== TEMA: BUKA/TUTUP MENU SAMPING ===================== */
Object.assign(actions, {
  'toggle-nav': () => {
    const app = $('#app');
    if (window.matchMedia('(min-width:768px)').matches) app.classList.toggle('collapsed');
    else app.classList.toggle('nav-open');
  }
});
document.addEventListener('click', e => {
  const app = $('#app');
  if (!app || !app.classList.contains('nav-open')) return;
  if (e.target === app || e.target.closest('.sidenav a')) app.classList.remove('nav-open');
});
