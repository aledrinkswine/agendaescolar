/* ==========================================================================
   MODEL · store.model.js
   Fuente única de datos de la app: persistencia en localStorage, esquema por
   defecto (datos de ejemplo) y migraciones ligeras para versiones previas
   guardadas en el navegador. Todo el resto de modelos lee/escribe sobre la
   variable global DATA definida aquí.
   ========================================================================== */

const STORAGE_KEY = 'acoandes_agenda_v1';

function getDefaultData() {
  return {
    tasks: [
      { id: genId(), title: 'Leer capítulos 3 y 4', subject: 'lengua', due: '2026-09-10', desc: 'Lengua Castellana - Leer y hacer resumen de cada capítulo', done: false },
      { id: genId(), title: 'Ejercicios de trigonometría', subject: 'matematicas', due: '2026-09-12', desc: 'Página 45-48 del libro de texto', done: false },
      { id: genId(), title: 'Mapa conceptual sobre la célula', subject: 'ciencias', due: '2026-09-13', desc: 'Incluir organelos, funciones y tipos de células', done: false },
      { id: genId(), title: 'Ensayo sobre la Revolución Francesa', subject: 'historia', due: '2026-09-15', desc: 'Mínimo 500 palabras, incluir causas y consecuencias', done: false },
      { id: genId(), title: 'Presentación oral en inglés', subject: 'ingles', due: '2026-09-17', desc: 'Tema libre, 5 minutos de presentación', done: false },
      { id: genId(), title: 'Dibujo a carboncillo', subject: 'arte', due: '2026-09-19', desc: 'Bodegón con al menos 3 objetos', done: false }
    ],
    evaluations: [
      { id: genId(), title: 'Examen de Matemáticas', subject: 'matematicas', date: '2026-09-11', type: 'Examen', topics: 'Álgebra y trigonometría básica' },
      { id: genId(), title: 'Quiz de Ciencias', subject: 'ciencias', date: '2026-09-14', type: 'Quiz', topics: 'La célula y sus partes' },
      { id: genId(), title: 'Examen de Historia', subject: 'historia', date: '2026-09-18', type: 'Examen', topics: 'Revolución Francesa — causas, desarrollo y consecuencias' },
      { id: genId(), title: 'Presentación de Inglés', subject: 'ingles', date: '2026-09-20', type: 'Presentación', topics: 'Speaking assessment — pronunciación, fluidez y contenido' }
    ],
    reminders: [
      { id: genId(), title: 'Reunión de padres', date: '2026-09-10', time: '7:00 a.m.', icon: 'parents', seen: false },
      { id: genId(), title: 'Traer uniforme de educación física', date: '2026-09-11', time: '', icon: 'uniform', seen: false },
      { id: genId(), title: 'Entrega de formulario de excursión', date: '2026-09-12', time: '', icon: 'form', seen: false },
      { id: genId(), title: 'Práctica de coro', date: '2026-09-13', time: '3:00 p.m.', icon: 'choir', seen: false }
    ],
    notes: [
      { id: genId(), title: 'Fórmulas de trigonometría', content: 'sen(θ) = opuesto/hipotenusa\ncos(θ) = adyacente/hipotenusa\ntan(θ) = opuesto/adyacente\n\nIdentidades:\nsen²(θ) + cos²(θ) = 1\ntan(θ) = sen(θ)/cos(θ)', created: '2026-09-04' },
      { id: genId(), title: 'Ideas para ensayo de Historia', content: '1. Causas económicas de la Revolución\n2. El papel de la Ilustración\n3. La toma de la Bastilla\n4. El Reinado del Terror\n5. Consecuencias para Europa', created: '2026-09-05' },
      { id: genId(), title: 'Vocabulario de inglés — Unit 5', content: 'accomplish — lograr\nendeavor — esfuerzo\npersuade — persuadir\nresilience — resiliencia\nthroughout — a lo largo de\nwhereas — mientras que', created: '2026-09-03' }
    ],
    events: [
      { id: genId(), title: 'Reunión de padres', date: '2026-09-10', type: 'evento', color: '#EF4444' },
      { id: genId(), title: 'Examen de Matemáticas', date: '2026-09-11', type: 'examen', color: '#C2185B' },
      { id: genId(), title: 'Entrega — Trigonometría', date: '2026-09-12', type: 'tarea', color: '#F59E0B' },
      { id: genId(), title: 'Quiz de Ciencias', date: '2026-09-14', type: 'examen', color: '#2E7D32' },
      { id: genId(), title: 'Feria de Ciencias', date: '2026-09-15', type: 'evento', color: '#10B981' },
      { id: genId(), title: 'Examen de Historia', date: '2026-09-18', type: 'examen', color: '#1565C0' },
      { id: genId(), title: 'Día del Estudiante', date: '2026-09-20', type: 'evento', color: '#8B5CF6' }
    ],
    documents: [
      { id: genId(), name: 'Guía de laboratorio', subject: 'ciencias', type: 'pdf', size: '2.4 MB' },
      { id: genId(), name: 'Ejercicios de álgebra', subject: 'matematicas', type: 'pdf', size: '1.1 MB' },
      { id: genId(), name: 'La Revolución Francesa', subject: 'historia', type: 'doc', size: '856 KB' },
      { id: genId(), name: 'Lista de vocabulario', subject: 'ingles', type: 'pdf', size: '340 KB' },
      { id: genId(), name: 'Rúbrica de presentación', subject: 'ingles', type: 'pdf', size: '220 KB' },
      { id: genId(), name: 'Técnicas de dibujo', subject: 'arte', type: 'ppt', size: '5.8 MB' }
    ],
    messages: [
      { id: 'conv1', name: 'Profa. García', role: 'Matemáticas', avatar: '#C2185B', messages: [
        { text: 'Buenos días, recuerden que el examen del jueves cubre hasta el capítulo 5.', time: '8:30 AM', sent: false },
        { text: 'Estudien los ejercicios de la página 45 a 48, son similares al examen.', time: '8:31 AM', sent: false },
        { text: '¡Gracias profesora! ¿El examen incluye identidades trigonométricas?', time: '9:15 AM', sent: true },
        { text: 'Sí, incluye las identidades básicas. Revisa la sección 5.3.', time: '9:20 AM', sent: false }
      ]},
      { id: 'conv2', name: 'Grupo 8°B', role: '32 miembros', avatar: '#1565C0', messages: [
        { text: '¿Alguien tiene los apuntes de historia de ayer?', time: '3:00 PM', sent: false },
        { text: 'Yo los tengo, te los paso por el grupo', time: '3:05 PM', sent: true },
        { text: '¡Gracias! 🙌', time: '3:06 PM', sent: false }
      ]},
      { id: 'conv3', name: 'Prof. Martínez', role: 'Ciencias', avatar: '#2E7D32', messages: [
        { text: 'Angelly, buen trabajo en el último laboratorio. Sigue así 👏', time: '11:00 AM', sent: false },
        { text: '¡Muchas gracias profesor!', time: '11:30 AM', sent: true }
      ]}
    ],
    schedule: {
      Lunes: [
        { time: '7:00', subject: 'matematicas', room: 'Aula 201', teacher: 'Profa. García' },
        { time: '8:00', subject: 'ciencias', room: 'Lab. 1', teacher: 'Prof. Martínez' },
        { time: '9:00', break: true, label: 'Descanso' },
        { time: '9:30', subject: 'lengua', room: 'Aula 201', teacher: 'Profa. López' },
        { time: '10:30', subject: 'historia', room: 'Aula 203', teacher: 'Prof. Ramírez' },
        { time: '11:30', break: true, label: 'Almuerzo' },
        { time: '12:30', subject: 'ingles', room: 'Aula 205', teacher: 'Profa. Johnson' }
      ],
      Martes: [
        { time: '7:00', subject: 'lengua', room: 'Aula 201', teacher: 'Profa. López' },
        { time: '8:00', subject: 'matematicas', room: 'Aula 201', teacher: 'Profa. García' },
        { time: '9:00', break: true, label: 'Descanso' },
        { time: '9:30', subject: 'ed_fisica', room: 'Cancha', teacher: 'Prof. Torres' },
        { time: '10:30', subject: 'arte', room: 'Taller de Arte', teacher: 'Profa. Vega' },
        { time: '11:30', break: true, label: 'Almuerzo' },
        { time: '12:30', subject: 'ciencias', room: 'Aula 202', teacher: 'Prof. Martínez' }
      ],
      Miércoles: [
        { time: '7:00', subject: 'historia', room: 'Aula 203', teacher: 'Prof. Ramírez' },
        { time: '8:00', subject: 'ingles', room: 'Aula 205', teacher: 'Profa. Johnson' },
        { time: '9:00', break: true, label: 'Descanso' },
        { time: '9:30', subject: 'matematicas', room: 'Aula 201', teacher: 'Profa. García' },
        { time: '10:30', subject: 'lengua', room: 'Aula 201', teacher: 'Profa. López' },
        { time: '11:30', break: true, label: 'Almuerzo' },
        { time: '12:30', subject: 'arte', room: 'Taller de Arte', teacher: 'Profa. Vega' }
      ],
      Jueves: [
        { time: '7:00', subject: 'ciencias', room: 'Lab. 1', teacher: 'Prof. Martínez' },
        { time: '8:00', subject: 'matematicas', room: 'Aula 201', teacher: 'Profa. García' },
        { time: '9:00', break: true, label: 'Descanso' },
        { time: '9:30', subject: 'historia', room: 'Aula 203', teacher: 'Prof. Ramírez' },
        { time: '10:30', subject: 'ingles', room: 'Aula 205', teacher: 'Profa. Johnson' },
        { time: '11:30', break: true, label: 'Almuerzo' },
        { time: '12:30', subject: 'ed_fisica', room: 'Cancha', teacher: 'Prof. Torres' }
      ],
      Viernes: [
        { time: '7:00', subject: 'lengua', room: 'Aula 201', teacher: 'Profa. López' },
        { time: '8:00', subject: 'ciencias', room: 'Aula 202', teacher: 'Prof. Martínez' },
        { time: '9:00', break: true, label: 'Descanso' },
        { time: '9:30', subject: 'ingles', room: 'Aula 205', teacher: 'Profa. Johnson' },
        { time: '10:30', subject: 'matematicas', room: 'Aula 201', teacher: 'Profa. García' },
        { time: '11:30', break: true, label: 'Almuerzo' },
        { time: '12:30', subject: 'historia', room: 'Aula 203', teacher: 'Prof. Ramírez' }
      ]
    },
    settings: { name: 'Angelly', lastName: 'Porras', course: '8°B', email: 'angelly.porras@acoandes.edu.co', darkMode: false }
  };
}

let DATA;
function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    DATA = stored ? JSON.parse(stored) : getDefaultData();
    if (!DATA.events) DATA.events = getDefaultData().events;
    if (!DATA.documents) DATA.documents = getDefaultData().documents;
    if (!DATA.messages) DATA.messages = getDefaultData().messages;
    if (!DATA.schedule) DATA.schedule = getDefaultData().schedule;
    if (!DATA.evaluations) DATA.evaluations = getDefaultData().evaluations;
    if (!DATA.settings.course) DATA.settings.course = getDefaultData().settings.course;
    if (!DATA.settings.email) DATA.settings.email = getDefaultData().settings.email;
  } catch(e) { DATA = getDefaultData(); }
}
function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA)); } catch(e) {}
}
loadData();
