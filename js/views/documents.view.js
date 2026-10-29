/* ==========================================================================
   VIEW · documents.view.js
   Página de Documentos del Aula (solo lectura, sin CRUD).
   ========================================================================== */

function renderDocumentos() {
  return `
    <h2 class="page-title">${ICONS.docs} Documentos del Aula</h2>
    <div class="doc-grid">
      ${DATA.documents.map(d => `
        <div class="doc-card">
          <div class="doc-icon ${d.type}">${d.type==='pdf'?'📕':d.type==='doc'?'📘':d.type==='ppt'?'📙':'🖼️'}</div>
          <h4>${d.name}</h4>
          <p>${SUBJECTS[d.subject]?.name||d.subject} · ${d.size}</p>
        </div>
      `).join('')}
    </div>
  `;
}
