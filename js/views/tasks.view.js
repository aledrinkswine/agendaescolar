/* ==========================================================================
   VIEW · tasks.view.js
   Página de Tareas: lista filtrable + plantilla del modal de crear/editar.
   ========================================================================== */

function renderTareas() {
  const tasks = TaskModel.filtered(taskFilter);

  return `
    <h2 class="page-title">${ICONS.tasks} Tareas</h2>
    <div class="toolbar">
      <button class="filter-btn${taskFilter==='all'?' active':''}" onclick="taskFilter='all';renderPage()">Todas</button>
      <button class="filter-btn${taskFilter==='pending'?' active':''}" onclick="taskFilter='pending';renderPage()">Pendientes</button>
      <button class="filter-btn${taskFilter==='done'?' active':''}" onclick="taskFilter='done';renderPage()">Completadas</button>
      ${Object.entries(SUBJECTS).map(([k,v]) => `<button class="filter-btn${taskFilter===k?' active':''}" onclick="taskFilter='${k}';renderPage()">${v.name}</button>`).join('')}
      <button class="btn-primary" onclick="openTaskModal()" style="margin-left:auto">${ICONS.plus} Nueva tarea</button>
    </div>
    <div class="tasks-list">
      ${tasks.length ? tasks.map(t => {
        const du = daysUntil(t.due);
        const dueLabel = t.done ? 'Completada' : du < 0 ? '⚠️ Vencida' : du === 0 ? '📌 Hoy' : du === 1 ? 'Mañana' : `En ${du} días`;
        return `<div class="task-card">
          <div class="task-check${t.done?' done':''}" onclick="toggleTask('${t.id}')">${t.done?ICONS.check:''}</div>
          <div class="task-card-body">
            <h4 class="${t.done?'done-text':''}">${t.title}</h4>
            <p class="desc">${t.desc||''}</p>
            <div class="task-card-meta">
              ${subjectTag(t.subject)}
              <span class="due-badge">${ICONS.clock} ${dueLabel} · ${shortDate(t.due)}</span>
            </div>
          </div>
          <div class="task-card-actions">
            <button onclick="openTaskModal('${t.id}')">${ICONS.edit}</button>
            <button onclick="deleteTask('${t.id}')">${ICONS.trash}</button>
          </div>
        </div>`;
      }).join('') : '<div class="empty-state">' + ICONS.empty + '<h4>No hay tareas</h4><p>Agrega una nueva tarea con el botón de arriba</p></div>'}
    </div>
  `;
}

function taskModalTemplate(t) {
  return `
    <h3>${t ? 'Editar' : 'Nueva'} tarea</h3>
    <div class="form-group"><label>Título</label><input id="m-title" value="${t?.title||''}"></div>
    <div class="form-group"><label>Materia</label><select id="m-subject">
      ${Object.entries(SUBJECTS).map(([k,v]) => `<option value="${k}"${t?.subject===k?' selected':''}>${v.name}</option>`).join('')}
    </select></div>
    <div class="form-group"><label>Fecha límite</label><input type="date" id="m-due" value="${t?.due||todayStr()}"></div>
    <div class="form-group"><label>Descripción</label><textarea id="m-desc">${t?.desc||''}</textarea></div>
    <div class="modal-actions">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="saveTask('${t?.id||''}')">Guardar</button>
    </div>
  `;
}
