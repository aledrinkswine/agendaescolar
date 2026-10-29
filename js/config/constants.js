/* ==========================================================================
   CONFIG · constants.js
   Datos estáticos de la aplicación: catálogo de materias, nombres de meses/
   días, frases del "mensaje del día" y la estructura de navegación del
   sidebar. No dependen de ningún otro módulo — se cargan primero.
   ========================================================================== */

const SUBJECTS = {
  ciencias: { name: 'Ciencias', color: '#2E7D32' },
  matematicas: { name: 'Matemáticas', color: '#C2185B' },
  ingles: { name: 'Inglés', color: '#E65100' },
  lengua: { name: 'Lengua', color: '#7B1FA2' },
  historia: { name: 'Historia', color: '#1565C0' },
  arte: { name: 'Arte', color: '#00838F' },
  ed_fisica: { name: 'Ed. Física', color: '#D84315' }
};

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAYS_SHORT = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
const QUOTES = [
  'Cada pequeño esfuerzo te acerca a grandes logros. ¡Tú puedes!',
  'El conocimiento es el único tesoro que crece cuanto más lo compartes.',
  'No se trata de ser perfecto, sino de dar lo mejor de ti cada día.',
  'Un paso a la vez, un día a la vez. Así se construyen los grandes sueños.',
  'La educación es el arma más poderosa para cambiar el mundo. — Nelson Mandela'
];

// ── Navegación del sidebar ──────────────────────────────
const NAV_GROUPS = [
  { label: 'Principal', items: [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'mi-agenda', label: 'Mi agenda', icon: 'agenda' },
    { id: 'calendario', label: 'Calendario', icon: 'calendar' }
  ]},
  { label: 'Académico', items: [
    { id: 'tareas', label: 'Tareas', icon: 'tasks' },
    { id: 'evaluaciones', label: 'Evaluaciones', icon: 'eval' },
    { id: 'notas', label: 'Notas', icon: 'notes' },
    { id: 'documentos', label: 'Documentos', icon: 'docs' }
  ]},
  { label: 'Comunicación', items: [
    { id: 'recordatorios', label: 'Recordatorios', icon: 'bell' },
    { id: 'mensajes', label: 'Mensajes', icon: 'msgs' }
  ]},
  { label: 'Sistema', items: [
    { id: 'perfil', label: 'Perfil', icon: 'user' },
    { id: 'configuracion', label: 'Configuración', icon: 'config' }
  ]}
];
const NAV_ITEMS = NAV_GROUPS.flatMap(g => g.items);
