/* ==========================================================================
   VIEW · messages.view.js
   Página de Mensajes: lista de conversaciones + chat activo.
   ========================================================================== */

function renderMensajes() {
  const conv = MessageModel.find(activeConv) || DATA.messages[0];
  return `
    <h2 class="page-title">${ICONS.msgs} Mensajes</h2>
    <div class="msg-layout">
      <div class="msg-list">
        ${DATA.messages.map(m => `
          <div class="msg-item${m.id===activeConv?' active':''}" onclick="activeConv='${m.id}';renderPage()">
            <div class="msg-avatar" style="background:${m.avatar}">${m.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
            <div class="msg-preview">
              <div class="name">${m.name}</div>
              <div class="last">${m.messages[m.messages.length-1]?.text||''}</div>
              <div class="time">${m.role}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="chat-area">
        <div class="chat-header">
          <div class="msg-avatar" style="background:${conv.avatar};width:36px;height:36px;font-size:13px">${conv.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
          <div><h4>${conv.name}</h4><span style="font-size:12px;color:var(--text-secondary)">${conv.role}</span></div>
        </div>
        <div class="chat-messages">
          ${conv.messages.map(m => `
            <div class="chat-msg ${m.sent?'sent':'received'}">
              ${m.text}
              <div class="msg-time">${m.time}</div>
            </div>
          `).join('')}
        </div>
        <div class="chat-input">
          <input id="chat-input" placeholder="Escribe un mensaje..." onkeydown="if(event.key==='Enter')sendMsg()">
          <button class="btn-primary" onclick="sendMsg()">${ICONS.send}</button>
        </div>
      </div>
    </div>
  `;
}
