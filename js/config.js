/**
 * KONFIGURASI APLIKASI LMS (Vercel, Cloudflare & GitHub)
 * SDN Sumberejo 04
 */

// Migrasi otomatis jika browser masih menyimpan URL lama langsung ke script.google.com
(function() {
  try {
    const saved = localStorage.getItem('lms_gas_url');
    if (saved && saved.includes('script.google.com')) {
      localStorage.removeItem('lms_gas_url');
    }
  } catch (e) {}
})();

window.CONFIG = {
  // URL Edge Accelerator Cloudflare Worker (terhubung ke Google Apps Script)
  GAS_WEBAPP_URL: localStorage.getItem('lms_gas_url') || 'https://lmsv2.titin-rusmawati32.workers.dev',

  // Set false untuk koneksi nyata ke Google Sheets melalui Google Apps Script.
  // Set true jika ingin mencoba tampilan dengan data tiruan (dummy).
  IS_PREVIEW: localStorage.getItem('lms_preview_mode') === 'true' ? true : false,

  APP_NAME: 'LMS EduDigital SD',
  SCHOOL_NAME: 'SDN Sumberejo 04'
};
