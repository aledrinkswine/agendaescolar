/* ==========================================================================
   MODEL · reminder.model.js
   Consultas y mutaciones sobre DATA.reminders.
   ========================================================================== */

const ReminderModel = {
  sorted() {
    return [...DATA.reminders].sort((a,b) => a.date.localeCompare(b.date));
  },

  unseen() {
    return DATA.reminders.filter(r => !r.seen);
  },

  markSeen(id) {
    const r = DATA.reminders.find(r => r.id === id);
    if (r) r.seen = true;
    return r;
  },

  add(data) {
    DATA.reminders.push({ id: genId(), ...data, icon: 'default', seen: false });
  },

  remove(id) {
    DATA.reminders = DATA.reminders.filter(r => r.id !== id);
  }
};
