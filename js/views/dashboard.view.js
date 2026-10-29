/* ==========================================================================
   VIEW · dashboard.view.js
   Página de Inicio: hero, fila de estadísticas, próximas actividades, mini
   calendario, tareas pendientes, recordatorios y mensaje del día.
   ========================================================================== */

function renderDashboard() {
  const upcoming = [...TaskModel.pending(), ...EvaluationModel.all()]
    .sort((a,b) => (a.due||a.date).localeCompare(b.due||b.date))
    .slice(0, 4);
  const pendingTasks = TaskModel.pending().slice(0, 4);
  const activeReminders = ReminderModel.unseen().slice(0, 3);
  const quote = QUOTES[Math.floor(new Date().getDate() % QUOTES.length)];
  const doneCount = TaskModel.done().length;
  const nextEval = EvaluationModel.next();

  return `
    <div class="hero">
      <h1>Agenda Escolar 2026</h1>
      <div class="subtitle">Colegio Acoandes</div>
      <div class="quote">"La organización hoy,<br>es el éxito mañana."</div>
      <div class="hero-deco"><svg viewBox="0 0 160 160" fill="white" opacity="0.15"><rect x="30" y="10" width="100" height="140" rx="8"/><rect x="40" y="25" width="80" height="6" rx="3"/><rect x="40" y="40" width="60" height="4" rx="2"/><rect x="40" y="50" width="70" height="4" rx="2"/><rect x="40" y="60" width="50" height="4" rx="2"/><rect x="40" y="75" width="80" height="6" rx="3"/><rect x="40" y="90" width="65" height="4" rx="2"/><rect x="40" y="100" width="75" height="4" rx="2"/><rect x="40" y="110" width="55" height="4" rx="2"/><circle cx="135" cy="15" r="10"/><path d="M130 15 L135 10 L140 15 L135 12 Z"/></svg></div>
    </div>
    <div class="stat-row">
      <div class="stat-tile">
        <div class="stat-label">${ICONS.tasks} Tareas pendientes</div>
        <div class="stat-value">${TaskModel.pending().length}</div>
        <div class="stat-sub">${doneCount} completadas en total</div>
      </div>
      <div class="stat-tile">
        <div class="stat-label">${ICONS.eval} Próxima evaluación</div>
        <div class="stat-value">${nextEval ? daysUntil(nextEval.date) : '—'}${nextEval?' días':''}</div>
        <div class="stat-sub">${nextEval ? nextEval.title : 'Sin evaluaciones próximas'}</div>
      </div>
      <div class="stat-tile">
        <div class="stat-label">${ICONS.bell} Recordatorios</div>
        <div class="stat-value">${ReminderModel.unseen().length}</div>
        <div class="stat-sub">Sin revisar</div>
      </div>
      <div class="stat-tile">
        <div class="stat-label">${ICONS.docs} Documentos</div>
        <div class="stat-value">${DATA.documents.length}</div>
        <div class="stat-sub">Disponibles en el aula</div>
      </div>
    </div>
    <div class="dash-grid">
      <div class="card">
        <div class="card-header">
          <h3>${ICONS.calendar} Próximas actividades</h3>
          <span class="card-link" onclick="navigate('tareas')">Ver todo</span>
        </div>
        ${upcoming.length ? upcoming.map(a => {
          const d = new Date((a.due||a.date)+'T12:00:00');
          return `<div class="activity-item">
            <div class="activity-date">
              <span class="day">${d.getDate()}</span>
              <span class="month">${MONTHS[d.getMonth()].slice(0,3)}</span>
            </div>
            <div class="activity-info">
              <div class="title">${a.title}</div>
              <div class="detail">${formatDate(a.due||a.date)}</div>
            </div>
            ${subjectTag(a.subject)}
          </div>`;
        }).join('') : '<div class="empty-state"><p>No hay actividades próximas</p></div>'}
      </div>
      <div class="card">
        <div class="card-header">
          <h3>${ICONS.calendar} Calendario</h3>
          <span class="card-link" onclick="navigate('calendario')">Ver calendario completo</span>
        </div>
        ${renderMiniCal()}
      </div>
    </div>
    <div class="dash-bottom">
      <div class="card">
        <div class="card-header">
          <h3>${ICONS.tasks} Tareas pendientes</h3>
          <span class="card-link" onclick="navigate('tareas')">Ver todas</span>
        </div>
        ${pendingTasks.length ? pendingTasks.map(t => `
          <div class="task-item">
            <div class="task-check${t.done?' done':''}" onclick="toggleTask('${t.id}')">
              ${t.done ? ICONS.check : ''}
            </div>
            <div class="task-info">
              <div class="title${t.done?' done-text':''}">${t.title}</div>
              <div class="due">Fecha límite: ${shortDate(t.due)}</div>
            </div>
            ${subjectTag(t.subject)}
          </div>
        `).join('') : '<div class="empty-state"><p>¡Todo al día! 🎉</p></div>'}
      </div>
      <div class="card">
        <div class="card-header">
          <h3>${ICONS.bell} Recordatorios</h3>
          <span class="card-link" onclick="navigate('recordatorios')">Ver todos</span>
        </div>
        ${activeReminders.length ? activeReminders.map(r => `
          <div class="reminder-item">
            <div class="reminder-icon ${r.icon||'default'}">${r.icon==='parents'?'👨‍👩‍👧':r.icon==='uniform'?'👕':r.icon==='form'?'📋':r.icon==='choir'?'🎵':'🔔'}</div>
            <div class="reminder-info">
              <div class="title">${r.title}</div>
              <div class="detail">${shortDate(r.date)}${r.time?' — '+r.time:''}</div>
            </div>
          </div>
        `).join('') : '<div class="empty-state"><p>Sin recordatorios pendientes</p></div>'}
      </div>
      <div class="motd">
        <div>
          <div class="label">Mensaje del día</div>
          <div class="quote-mark">"</div>
          <div class="quote-text">${quote}</div>
        </div>
        <div class="heart">♡</div>
      </div>
    </div>
  `;
}

// ── Mini Calendar (widget del dashboard) ──────────────────────────────
function renderMiniCal() {
  const today = new Date();
  const first = new Date(calYear, calMonth, 1);
  const startDay = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const daysInPrev = new Date(calYear, calMonth, 0).getDate();

  let cells = DAYS_SHORT.map(d => `<div class="day-header">${d}</div>`).join('');
  for (let i = 0; i < startDay; i++) {
    cells += `<div class="day-cell other-month">${daysInPrev - startDay + 1 + i}</div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
    const hasEvent = EventModel.onDate(dateStr).length > 0;
    cells += `<div class="day-cell${isToday?' today':''}${hasEvent?' has-event':''}">${d}</div>`;
  }
  const remaining = 42 - startDay - daysInMonth;
  for (let i = 1; i <= remaining && i <= 7; i++) {
    cells += `<div class="day-cell other-month">${i}</div>`;
  }

  return `
    <div class="mini-cal">
      <div class="cal-nav">
        <button onclick="calMonth--;if(calMonth<0){calMonth=11;calYear--}renderPage()">${ICONS.chevL}</button>
        <span class="month-label">${MONTHS[calMonth]} ${calYear}</span>
        <button onclick="calMonth++;if(calMonth>11){calMonth=0;calYear++}renderPage()">${ICONS.chevR}</button>
      </div>
      <div class="cal-grid">${cells}</div>
    </div>
  `;
}
