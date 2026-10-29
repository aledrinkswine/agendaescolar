/* ==========================================================================
   VIEW · agenda.view.js
   Página "Mi Agenda": horario de clases por día de la semana.
   ========================================================================== */

function renderAgenda() {
  const days = Object.keys(DATA.schedule);
  const blocks = DATA.schedule[scheduleDay] || [];
  return `
    <h2 class="page-title">${ICONS.agenda} Mi Agenda — Horario de Clases</h2>
    <div class="schedule-day">
      ${days.map(d => `<button class="day-btn${scheduleDay===d?' active':''}" onclick="scheduleDay='${d}';renderPage()">${d}</button>`).join('')}
    </div>
    <div class="card" style="margin-top:8px">
      ${blocks.map(b => b.break
        ? `<div class="schedule-block"><div class="schedule-time">${b.time}</div><div class="schedule-class break"><h4>${b.label}</h4></div></div>`
        : `<div class="schedule-block"><div class="schedule-time">${b.time}</div><div class="schedule-class"><span class="color-dot" style="background:${SUBJECTS[b.subject]?.color||'#999'}"></span><div><h4>${SUBJECTS[b.subject]?.name||b.subject}</h4><p>${b.teacher} · ${b.room}</p></div></div></div>`
      ).join('')}
    </div>
  `;
}
