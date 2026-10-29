/* ==========================================================================
   MODEL · event.model.js
   Consultas y mutaciones sobre DATA.events (eventos del calendario).
   ========================================================================== */

const EVENT_COLORS = { evento: '#EF4444', examen: '#C2185B', tarea: '#F59E0B', especial: '#8B5CF6' };

const EventModel = {
  onDate(dateStr) {
    return DATA.events.filter(e => e.date === dateStr);
  },

  upcoming(limit) {
    return DATA.events.filter(e => e.date >= todayStr()).sort((a,b) => a.date.localeCompare(b.date)).slice(0, limit);
  },

  add(title, date, type) {
    DATA.events.push({ id: genId(), title, date, type, color: EVENT_COLORS[type] });
  },

  remove(id) {
    DATA.events = DATA.events.filter(e => e.id !== id);
  }
};
