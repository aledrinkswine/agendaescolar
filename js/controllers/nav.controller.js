/* ==========================================================================
   CONTROLLER · nav.controller.js
   Estado de navegación (página activa, mes/año del calendario, día
   seleccionado, conversación activa, día de horario) y las acciones del
   sidebar: construir el menú, navegar entre páginas, y el colapsar/expandir
   de escritorio (persistido) junto con el overlay deslizante de móvil.
   ========================================================================== */

let currentPage = 'inicio';
let calYear, calMonth;
(function initCal() { const d = new Date(); calYear = d.getFullYear(); calMonth = d.getMonth(); })();
let selectedDay = null;
let activeConv = 'conv1';
let scheduleDay = 'Lunes';

function buildNav() {
  const nav = document.getElementById('nav');
  nav.innerHTML = NAV_GROUPS.map(g => `
    <div class="nav-group">
      <div class="nav-group-label">${g.label}</div>
      ${g.items.map(n => `<div class="nav-item${currentPage===n.id?' active':''}" onclick="navigate('${n.id}')">${ICONS[n.icon]}<span>${n.label}</span></div>`).join('')}
    </div>
  `).join('');
}

function navigate(page) {
  currentPage = page;
  buildNav();
  renderPage();
  closeSidebar();
  window.scrollTo(0, 0);
}

// Sidebar móvil (overlay deslizante)
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}

// Sidebar de escritorio (colapsar/expandir, se recuerda entre sesiones)
const SIDEBAR_KEY = 'acoandes_sidebar';
function toggleSidebarCollapse() {
  const collapsed = document.body.classList.toggle('sidebar-collapsed');
  try { localStorage.setItem(SIDEBAR_KEY, collapsed ? 'collapsed' : 'expanded'); } catch(e) {}
}
