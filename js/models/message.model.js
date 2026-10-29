/* ==========================================================================
   MODEL · message.model.js
   Consultas y mutaciones sobre DATA.messages (conversaciones).
   ========================================================================== */

const MessageModel = {
  all() { return DATA.messages; },

  find(id) { return DATA.messages.find(m => m.id === id); },

  send(convId, text) {
    const conv = this.find(convId);
    if (!conv) return null;
    const now = new Date();
    conv.messages.push({ text, time: now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }), sent: true });
    return conv;
  }
};
