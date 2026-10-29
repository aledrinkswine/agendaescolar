/* ==========================================================================
   CONTROLLER · calendar.controller.js
   Acciones disparadas desde la vista de Calendario (la navegación de mes y
   la selección de día viven inline en las vistas por ser simples asignaciones
   de estado — aquí sólo el CRUD de eventos).
   ========================================================================== */

function openEventModal() {
  openModal(eventModalTemplate());
}
function saveEvent() {
  const title = document.getElementById('m-title').value.trim();
  if (!title) return;
  EventModel.add(title, document.getElementById('m-date').value, document.getElementById('m-type').value);
  saveData(); closeModal(); renderPage();
}
function deleteEvent(id) {
  EventModel.remove(id);
  saveData(); renderPage();
}
