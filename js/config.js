/**
 * KONFIGURASI APLIKASI LMS (Vercel & GitHub)
 * SDN Sumberejo 04
 */

window.CONFIG = {
  // https://script.google.com/macros/s/AKfycbzBdb8b8SZgxQm0bneREy1dtwLs7TWDxUJPFcHhrA2L7evxXvy8_j_JkQUfDcM3M64GrA/exec
  // Contoh: 'https://script.google.com/macros/s/AKfycbzBdb8b8SZgxQm0bneREy1dtwLs7TWDxUJPFcHhrA2L7evxXvy8_j_JkQUfDcM3M64GrA/exec'
  // Anda juga bisa mengganti URL ini langsung lewat menu Pengaturan di web!
  GAS_WEBAPP_URL: localStorage.getItem('lms_gas_url') || '',

  // Set false untuk koneksi nyata ke Google Sheets melalui Google Apps Script.
  // Set true jika ingin mencoba tampilan dengan data tiruan (dummy).
  IS_PREVIEW: localStorage.getItem('lms_preview_mode') === 'true' ? true : false,

  APP_NAME: 'LMS EduDigital SD',
  SCHOOL_NAME: 'SDN Sumberejo 04'
};
