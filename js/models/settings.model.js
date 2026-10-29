/* ==========================================================================
   MODEL · settings.model.js
   Consultas y mutaciones sobre DATA.settings (perfil del estudiante,
   apariencia) y el restablecimiento de datos de ejemplo.
   ========================================================================== */

const SettingsModel = {
  get() { return DATA.settings; },

  update(field, value) {
    DATA.settings[field] = value;
  },

  toggleDarkMode() {
    DATA.settings.darkMode = !DATA.settings.darkMode;
    return DATA.settings.darkMode;
  },

  resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    loadData();
  }
};
