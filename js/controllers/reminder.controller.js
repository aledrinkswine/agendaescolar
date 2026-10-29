/* ==========================================================================
   CONTROLLER · reminder.controller.js
   Acciones disparadas desde la vista de Recordatorios.
   ========================================================================== */

function markSeen(id) {
  if (ReminderModel.markSeen(id)) { saveData(); renderPage(); }
}
function deleteReminder(id) {
  ReminderModel.remove(id);
  saveData(); renderPage();
}
function openReminderModal() {
  openModal(reminderModalTemplate());
}
function saveReminder() {
  const title = document.getElementById('m-title').value.trim();
  if (!title) return;
  ReminderModel.add({
    title,
    date: document.getElementById('m-date').value,
    time: document.getElementById('m-time').value.trim()
  });
  saveData(); closeModal(); renderPage();
}
