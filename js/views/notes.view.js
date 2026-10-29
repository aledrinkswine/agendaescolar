/* ==========================================================================
   VIEW · notes.view.js
   Página de Notas + plantilla del modal de crear/editar.
   ========================================================================== */

function renderNotas() {
  return `
    <h2 class="page-title">${ICONS.notes} Notas</h2>
    <div class="toolbar">
      <button class="btn-primary" onclick="openNoteModal()">${ICONS.plus} Nueva nota</button>
    </div>
    <div class="notes-grid">
      ${DATA.notes.length ? DATA.notes.map(n => `
        <div class="note-card" onclick="openNoteModal('${n.id}')">
          <h4>${n.title}</h4>
          <div class="note-preview">${n.content.replace(/\n/g,'<br>')}</div>
          <div class="note-date">Creada: ${shortDate(n.created)}</div>
          <div class="note-card-actions">
            <button class="btn-danger" onclick="event.stopPropagation();deleteNote('${n.id}')">Eliminar</button>
          </div>
        </div>
      `).join('') : '<div class="empty-state">' + ICONS.empty + '<h4>No hay notas</h4><p>Crea una nueva nota para empezar</p></div>'}
    </div>
  `;
}

function noteModalTemplate(n) {
  return `
    <h3>${n ? 'Editar' : 'Nueva'} nota</h3>
    <div class="form-group"><label>Título</label><input id="m-title" value="${n?.title||''}"></div>
    <div class="form-group"><label>Contenido</label><textarea id="m-content" style="min-height:180px">${n?.content||''}</textarea></div>
    <div class="modal-actions">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="saveNote('${n?.id||''}')">Guardar</button>
    </div>
  `;
}
