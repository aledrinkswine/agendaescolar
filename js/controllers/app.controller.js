/* ==========================================================================
   CONTROLLER · app.controller.js
   El "router" de la app: decide qué View renderizar dentro de #content según
   la página activa (currentPage, definido en nav.controller.js), y mantiene
   sincronizado el saludo del header y el contador de notificaciones.
   ========================================================================== */

function renderPage() {
  const c = document.getElementById('content');
  updateGreeting();
  const unseenR = ReminderModel.unseen().length;
  document.getElementById('notif-count').textContent = unseenR;
  document.getElementById('notif-count').hidden = unseenR === 0;

  switch(currentPage) {
    case 'inicio': c.innerHTML = renderDashboard(); break;
    case 'mi-agenda': c.innerHTML = renderAgenda(); break;
    case 'tareas': c.innerHTML = renderTareas(); break;
    case 'evaluaciones': c.innerHTML = renderEvaluaciones(); break;
    case 'calendario': c.innerHTML = renderCalendario(); break;
    case 'recordatorios': c.innerHTML = renderRecordatorios(); break;
    case 'notas': c.innerHTML = renderNotas(); break;
    case 'documentos': c.innerHTML = renderDocumentos(); break;
    case 'mensajes': c.innerHTML = renderMensajes(); break;
    case 'perfil': c.innerHTML = renderPerfil(); break;
    case 'configuracion': c.innerHTML = renderConfig(); break;
    default: c.innerHTML = renderDashboard();
  }
}
