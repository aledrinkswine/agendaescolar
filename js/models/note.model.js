/* ==========================================================================
   MODEL · note.model.js
   Consultas y mutaciones sobre DATA.notes.
   ========================================================================== */

const NoteModel = {
  all() { return DATA.notes; },

  find(id) { return DATA.notes.find(n => n.id === id); },

  save(id, title, content) {
    if (id) {
      const n = this.find(id);
      if (n) { n.title = title; n.content = content; }
    } else {
      DATA.notes.push({ id: genId(), title, content, created: todayStr() });
    }
  },

  remove(id) {
    DATA.notes = DATA.notes.filter(n => n.id !== id);
  }
};
