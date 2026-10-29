/* ==========================================================================
   CONTROLLER · header.controller.js
   Mantiene el saludo y la píldora de usuario del header sincronizados con
   DATA.settings.
   ========================================================================== */

function updateGreeting() {
  document.getElementById('greeting').textContent = `¡Hola, ${DATA.settings.name}! 👋`;
  const fullName = `${DATA.settings.name} ${DATA.settings.lastName}`.trim();
  document.getElementById('user-pill-name').textContent = fullName;
  document.getElementById('user-pill-avatar').textContent = (DATA.settings.name[0]||'')+(DATA.settings.lastName[0]||'');
}
