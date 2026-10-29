/* ==========================================================================
   CONTROLLER · message.controller.js
   Acción de enviar un mensaje en la conversación activa.
   ========================================================================== */

function sendMsg() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  if (MessageModel.send(activeConv, text)) {
    saveData(); renderPage();
    setTimeout(() => {
      const msgs = document.querySelector('.chat-messages');
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
    }, 50);
  }
}
