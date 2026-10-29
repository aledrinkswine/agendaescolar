/* ==========================================================================
   VIEW · settings.view.js
   Página de Configuración: apariencia (modo oscuro) y gestión de datos.
   ========================================================================== */

function renderConfig() {
  return `
    <h2 class="page-title">${ICONS.config} Configuración</h2>
    <div class="config-section">
      <h3>Apariencia</h3>
      <div class="config-row">
        <div><label>Modo oscuro</label><div class="desc">Cambiar entre tema claro y oscuro</div></div>
        <div class="toggle${DATA.settings.darkMode?' on':''}" onclick="toggleDarkMode()"></div>
      </div>
    </div>
    <div class="config-section">
      <h3>Datos</h3>
      <div class="config-row">
        <div><label>Restablecer datos</label><div class="desc">Volver a los datos de ejemplo iniciales</div></div>
        <button class="btn-danger" onclick="if(confirm('¿Seguro? Se perderán todos los cambios.')){resetAllData()}">Restablecer</button>
      </div>
    </div>
  `;
}
