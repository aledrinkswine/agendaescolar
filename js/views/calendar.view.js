/* ==========================================================================
   VIEW · calendar.view.js
   Página de Calendario: mes completo + panel lateral de eventos, y la
   plantilla del modal de creación de eventos.
   ========================================================================== */

function renderCalendario() {
  const today = new Date();
  const first = new Date(calYear, calMonth, 1);
  const startDay = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  let cells = DAYS_SHORT.map(d => `<div class="day-header">${d}</div>`).join('');
  for (let i = 0; i < startDay; i++) cells += `<div class="day-cell other-month"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
    const dayEvents = EventModel.onDate(dateStr);
    const sel = selectedDay === dateStr;
    cells += `<div class="day-cell${isToday?' today':''}${sel?' selected':''}" onclick="selectedDay='${dateStr}';renderPage()">
      <span class="day-num">${d}</span>
      ${dayEvents.slice(0,2).map(e => `<div class="cal-event-dot" style="background:${e.color}">${e.title}</div>`).join('')}
    </div>`;
  }

  const selEvents = selectedDay ? EventModel.onDate(selectedDay) : EventModel.upcoming(5);
  const selLabel = selectedDay ? formatDate(selectedDay) : 'Próximos eventos';

  return `
    <h2 class="page-title">${ICONS.calendar} Calendario</h2>
    <div class="toolbar">
      <button class="btn-primary" onclick="openEventModal()">${ICONS.plus} Nuevo evento</button>
    </div>
    <div class="full-cal">
      <div class="full-cal-main card">
        <div class="cal-nav" style="margin-bottom:16px">
          <button onclick="calMonth--;if(calMonth<0){calMonth=11;calYear--}renderPage()">${ICONS.chevL}</button>
          <span class="month-label" style="font-size:18px">${MONTHS[calMonth]} ${calYear}</span>
          <button onclick="calMonth++;if(calMonth>11){calMonth=0;calYear++}renderPage()">${ICONS.chevR}</button>
        </div>
        <div class="cal-grid">${cells}</div>
        <div class="legend">
          <div class="legend-item"><div class="legend-dot" style="background:#EF4444"></div>Evento</div>
          <div class="legend-item"><div class="legend-dot" style="background:#C2185B"></div>Examen</div>
          <div class="legend-item"><div class="legend-dot" style="background:#F59E0B"></div>Tarea</div>
          <div class="legend-item"><div class="legend-dot" style="background:#8B5CF6"></div>Especial</div>
        </div>
      </div>
      <div class="cal-sidebar">
        <h3>${selLabel}</h3>
        ${selEvents.length ? selEvents.map(e => `
          <div class="cal-event-item">
            <span class="color-dot" style="background:${e.color}"></span>
            <div class="cal-event-item-body">
              <h4>${e.title}</h4>
              <p>${formatDate(e.date)}</p>
            </div>
            <button class="icon-btn danger" onclick="deleteEvent('${e.id}')">${ICONS.trash}</button>
          </div>
        `).join('') : '<div class="empty-state"><p>No hay eventos para este día</p></div>'}
      </div>
    </div>
  `;
}

function eventModalTemplate() {
  return `
    <h3>Nuevo evento</h3>
    <div class="form-group"><label>Título</label><input id="m-title"></div>
    <div class="form-group"><label>Fecha</label><input type="date" id="m-date" value="${selectedDay||todayStr()}"></div>
    <div class="form-group"><label>Tipo</label><select id="m-type">
      <option value="evento">Evento</option><option value="examen">Examen</option><option value="tarea">Tarea</option><option value="especial">Especial</option>
    </select></div>
    <div class="modal-actions">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="saveEvent()">Guardar</button>
    </div>
  `;
}
