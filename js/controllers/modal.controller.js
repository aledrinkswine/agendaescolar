/* ==========================================================================
   CONTROLLER · modal.controller.js
   Abrir/cerrar el modal genérico usado por todos los formularios de la app.
   ========================================================================== */

function openModal(html) {
  document.getElementById('modal').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('show');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('show');
}
