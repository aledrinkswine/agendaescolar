/* ==========================================================================
   CONTROLLER · task.controller.js
   Acciones disparadas desde la vista de Tareas: filtro activo, marcar
   completada, eliminar y crear/editar vía el modal.
   ========================================================================== */

let taskFilter = 'all';

function toggleTask(id) {
  if (TaskModel.toggle(id)) { saveData(); renderPage(); }
}
function deleteTask(id) {
  TaskModel.remove(id);
  saveData(); renderPage();
}
function openTaskModal(id) {
  const t = id ? DATA.tasks.find(t => t.id === id) : null;
  openModal(taskModalTemplate(t));
}
function saveTask(id) {
  const title = document.getElementById('m-title').value.trim();
  if (!title) return;
  const data = { title, subject: document.getElementById('m-subject').value, due: document.getElementById('m-due').value, desc: document.getElementById('m-desc').value.trim() };
  TaskModel.save(id, data);
  saveData(); closeModal(); renderPage();
}
