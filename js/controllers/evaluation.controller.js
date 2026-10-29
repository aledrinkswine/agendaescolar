/* ==========================================================================
   CONTROLLER · evaluation.controller.js
   Acciones disparadas desde la vista de Evaluaciones.
   ========================================================================== */

function openEvalModal() {
  openModal(evalModalTemplate());
}
function saveEval() {
  const title = document.getElementById('m-title').value.trim();
  if (!title) return;
  EvaluationModel.add({
    title,
    subject: document.getElementById('m-subject').value,
    type: document.getElementById('m-type').value,
    date: document.getElementById('m-date').value,
    topics: document.getElementById('m-topics').value.trim()
  });
  saveData(); closeModal(); renderPage();
}
function deleteEval(id) {
  EvaluationModel.remove(id);
  saveData(); renderPage();
}
