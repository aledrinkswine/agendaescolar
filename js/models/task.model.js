/* ==========================================================================
   MODEL · task.model.js
   Consultas y mutaciones sobre DATA.tasks. La vista de Tareas y el
   Dashboard/Perfil comparten estas mismas funciones — un solo lugar define
   qué es una tarea "pendiente" o "completada".
   ========================================================================== */

const TaskModel = {
  all() { return DATA.tasks; },

  pending() { return DATA.tasks.filter(t => !t.done); },

  done() { return DATA.tasks.filter(t => t.done); },

  filtered(filter) {
    let tasks = [...DATA.tasks];
    if (filter === 'pending') tasks = tasks.filter(t => !t.done);
    else if (filter === 'done') tasks = tasks.filter(t => t.done);
    else if (SUBJECTS[filter]) tasks = tasks.filter(t => t.subject === filter);
    tasks.sort((a,b) => a.due.localeCompare(b.due));
    return tasks;
  },

  toggle(id) {
    const t = DATA.tasks.find(t => t.id === id);
    if (t) t.done = !t.done;
    return t;
  },

  remove(id) {
    DATA.tasks = DATA.tasks.filter(t => t.id !== id);
  },

  save(id, data) {
    if (id) {
      const t = DATA.tasks.find(t => t.id === id);
      if (t) Object.assign(t, data);
    } else {
      DATA.tasks.push({ id: genId(), ...data, done: false });
    }
  }
};
