/* ==========================================================================
   VIEW · evaluations.view.js
   Página de Evaluaciones: grid de tarjetas + plantilla del modal de creación.
   ========================================================================== */

function renderEvaluaciones() {
  const evals = EvaluationModel.sorted();
  return `
    <h2 class="page-title">${ICONS.eval} Evaluaciones</h2>
    <div class="toolbar">
      <button class="btn-primary" onclick="openEvalModal()">${ICONS.plus} Nueva evaluación</button>
    </div>
    <div class="evals-grid">
      ${evals.length ? evals.map(e => {
        const du = daysUntil(e.date);
        const urgent = du >= 0 && du <= 3;
        return `<div class="eval-card">
          <div class="eval-card-top">
            <span class="color-dot" style="background:${SUBJECTS[e.subject]?.color||'#999'}"></span>
            <div class="eval-type">${e.type}</div>
            <button class="icon-btn danger" onclick="deleteEval('${e.id}')">${ICONS.trash}</button>
          </div>
          <h4>${e.title}</h4>
          <div class="eval-date">${ICONS.clock} ${formatDate(e.date)}${urgent?' — <strong style="color:#EF4444">¡En '+du+' día'+(du!==1?'s':'')+'!</strong>':''}</div>
          <div class="eval-topics"><strong>Temas:</strong> ${e.topics}</div>
          <div class="eval-card-footer">${subjectTag(e.subject)}</div>
        </div>`;
      }).join('') : '<div class="empty-state">' + ICONS.empty + '<h4>No hay evaluaciones</h4></div>'}
    </div>
  `;
}

function evalModalTemplate() {
  return `
    <h3>Nueva evaluación</h3>
    <div class="form-group"><label>Título</label><input id="m-title"></div>
    <div class="form-group"><label>Materia</label><select id="m-subject">
      ${Object.entries(SUBJECTS).map(([k,v]) => `<option value="${k}">${v.name}</option>`).join('')}
    </select></div>
    <div class="form-group"><label>Tipo</label><select id="m-type"><option>Examen</option><option>Quiz</option><option>Presentación</option><option>Proyecto</option></select></div>
    <div class="form-group"><label>Fecha</label><input type="date" id="m-date" value="${todayStr()}"></div>
    <div class="form-group"><label>Temas</label><textarea id="m-topics"></textarea></div>
    <div class="modal-actions">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="saveEval()">Guardar</button>
    </div>
  `;
}
