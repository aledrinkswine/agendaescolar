/* ==========================================================================
   MODEL · evaluation.model.js
   Consultas y mutaciones sobre DATA.evaluations.
   ========================================================================== */

const EvaluationModel = {
  all() { return DATA.evaluations; },

  sorted() {
    return [...DATA.evaluations].sort((a,b) => a.date.localeCompare(b.date));
  },

  upcoming() {
    return DATA.evaluations.filter(e => e.date >= todayStr());
  },

  next() {
    return this.sorted().find(e => e.date >= todayStr());
  },

  add(data) {
    DATA.evaluations.push({ id: genId(), ...data });
  },

  remove(id) {
    DATA.evaluations = DATA.evaluations.filter(e => e.id !== id);
  }
};
