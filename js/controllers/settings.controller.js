/* ==========================================================================
   CONTROLLER · settings.controller.js
   Acciones de Configuración y Perfil: modo oscuro, edición de datos
   personales y restablecer todos los datos de ejemplo.
   ========================================================================== */

function toggleDarkMode() {
  const isDark = SettingsModel.toggleDarkMode();
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  saveData(); renderPage();
}

function updateProfileField(field, value) {
  SettingsModel.update(field, value);
  saveData();
  if (field === 'name' || field === 'lastName') updateGreeting();
  if (field === 'course') renderPage();
}

function resetAllData() {
  SettingsModel.resetAll();
  renderPage();
}
