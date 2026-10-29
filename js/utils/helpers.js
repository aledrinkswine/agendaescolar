/* ==========================================================================
   UTILS · helpers.js
   Funciones puras compartidas por modelos, vistas y controladores: fechas,
   generación de ids y el pequeño template de la etiqueta de materia.
   ========================================================================== */

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

function todayStr() { return new Date().toISOString().slice(0, 10); }

function formatDate(d) {
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
}

function shortDate(d) {
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
}

function daysUntil(d) {
  const now = new Date(todayStr() + 'T12:00:00');
  const target = new Date(d + 'T12:00:00');
  return Math.ceil((target - now) / 86400000);
}

function subjectTag(key) {
  const s = SUBJECTS[key];
  return s ? `<span class="subject-tag" style="background:${s.color}">${s.name}</span>` : '';
}
