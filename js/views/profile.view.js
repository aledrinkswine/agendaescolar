/* ==========================================================================
   VIEW · profile.view.js
   Página de Perfil: resumen del estudiante, estadísticas, datos personales
   editables y lista de materias.
   ========================================================================== */

function renderPerfil() {
  const s = SettingsModel.get();
  const doneCount = TaskModel.done().length;
  const pendingCount = TaskModel.pending().length;
  const evalCount = EvaluationModel.upcoming().length;
  return `
    <h2 class="page-title">${ICONS.user} Perfil</h2>
    <div class="profile-header">
      <div class="profile-avatar-lg">${(s.name[0]||'')}${(s.lastName[0]||'')}</div>
      <div class="profile-header-info">
        <h2>${s.name} ${s.lastName}</h2>
        <p>Estudiante · ${s.course}</p>
      </div>
    </div>
    <div class="stat-row">
      <div class="stat-tile">
        <div class="stat-label">${ICONS.check} Tareas completadas</div>
        <div class="stat-value">${doneCount}</div>
        <div class="stat-sub">${pendingCount} pendientes</div>
      </div>
      <div class="stat-tile">
        <div class="stat-label">${ICONS.eval} Evaluaciones</div>
        <div class="stat-value">${evalCount}</div>
        <div class="stat-sub">Por venir</div>
      </div>
      <div class="stat-tile">
        <div class="stat-label">${ICONS.notes} Notas</div>
        <div class="stat-value">${DATA.notes.length}</div>
        <div class="stat-sub">Guardadas</div>
      </div>
      <div class="stat-tile">
        <div class="stat-label">${ICONS.docs} Documentos</div>
        <div class="stat-value">${DATA.documents.length}</div>
        <div class="stat-sub">Disponibles</div>
      </div>
    </div>
    <div class="config-section">
      <h3>Información personal</h3>
      <div class="config-row">
        <div><label>Nombre</label><div class="desc">Tu nombre de pila</div></div>
        <input value="${s.name}" style="width:220px" onchange="updateProfileField('name', this.value)">
      </div>
      <div class="config-row">
        <div><label>Apellido</label><div class="desc">Tu apellido</div></div>
        <input value="${s.lastName}" style="width:220px" onchange="updateProfileField('lastName', this.value)">
      </div>
      <div class="config-row">
        <div><label>Curso</label><div class="desc">Tu grado y grupo</div></div>
        <input value="${s.course}" style="width:220px" onchange="updateProfileField('course', this.value)">
      </div>
      <div class="config-row">
        <div><label>Correo</label><div class="desc">Correo escolar de contacto</div></div>
        <input type="email" value="${s.email}" style="width:220px" onchange="updateProfileField('email', this.value)">
      </div>
    </div>
    <div class="config-section">
      <h3>Mis materias</h3>
      <div class="subject-list">
        ${Object.values(SUBJECTS).map(v => `<div class="subject-list-item"><span class="color-dot" style="background:${v.color}"></span>${v.name}</div>`).join('')}
      </div>
    </div>
  `;
}
