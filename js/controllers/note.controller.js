/* ==========================================================================
   CONTROLLER · note.controller.js
   Acciones disparadas desde la vista de Notas.
   ========================================================================== */

function openNoteModal(id) {
  const n = id ? NoteModel.find(id) : null;
  openModal(noteModalTemplate(n));
}
function saveNote(id) {
  const title = document.getElementById('m-title').value.trim();
  if (!title) return;
  const content = document.getElementById('m-content').value;
  NoteModel.save(id, title, content);
  saveData(); closeModal(); renderPage();
}
function deleteNote(id) {
  NoteModel.remove(id);
  saveData(); renderPage();
}
