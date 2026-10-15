// Numéro WhatsApp du fondateur, affiché sur le site pour rassurer les visiteurs
// (un vrai interlocuteur joignable). Uniquement en lien WhatsApp, jamais en
// lien tel: : le fondateur n'est pas joignable par appel direct depuis la France.
export const WHATSAPP_NUMBER_DISPLAY = "+33 6 98 94 45 32";
const WHATSAPP_NUMBER_E164 = "33698944532";
const WHATSAPP_PREFILL = "Bonjour, j'ai une question sur Auto-Prospect.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;
