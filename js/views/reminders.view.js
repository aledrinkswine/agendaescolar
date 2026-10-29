/* ==========================================================================
   VIEW · reminders.view.js
   Página de Recordatorios + plantilla del modal de creación.
   ========================================================================== */

function renderRecordatorios() {
  const reminders = ReminderModel.sorted();
  return `
    <h2 class="page-title">${ICONS.bell} Recordatorios</h2>
    <div class="toolbar">
      <button class="btn-primary" onclick="openReminderModal()">${ICONS.plus} Nuevo recordatorio</button>
    </div>
    <div class="card">
      ${reminders.length ? reminders.map(r => `
        <div class="reminder-item" style="opacity:${r.seen?'0.5':'1'}">
          <div class="reminder-icon ${r.icon||'default'}">${r.icon==='parents'?'👨‍👩‍👧':r.icon==='uniform'?'👕':r.icon==='form'?'📋':r.icon==='choir'?'🎵':'🔔'}</div>
          <div class="reminder-info" style="flex:1">
            <div class="title">${r.title}</div>
            <div class="detail">${formatDate(r.date)}${r.time?' — '+r.time:''}</div>
          </div>
          <div style="display:flex;gap:6px">
            ${!r.seen?`<button class="btn-secondary" onclick="markSeen('${r.id}')">✓ Marcar visto</button>`:'<span style="font-size:12px;color:var(--text-muted)">Visto</span>'}
            <button class="btn-danger" onclick="deleteReminder('${r.id}')">Eliminar</button>
          </div>
        </div>
      `).join('') : '<div class="empty-state">' + ICONS.empty + '<h4>No hay recordatorios</h4><p>Agrega un nuevo recordatorio</p></div>'}
    </div>
  `;
}

function reminderModalTemplate() {
  return `
    <h3>Nuevo recordatorio</h3>
    <div class="form-group"><label>Título</label><input id="m-title"></div>
    <div class="form-group"><label>Fecha</label><input type="date" id="m-date" value="${todayStr()}"></div>
    <div class="form-group"><label>Hora (opcional)</label><input id="m-time" placeholder="ej: 7:00 a.m."></div>
    <div class="modal-actions">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="saveReminder()">Guardar</button>
    </div>
  `;
}
