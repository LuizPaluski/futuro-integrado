/**
 * Constantes globais do projeto.
 * ================================================================
 * CLIENTE: confirmar valores com o Grupo Integrado antes de publicar.
 * ================================================================
 */

// WhatsApp comercial (formato internacional, somente números).
export const NUMERO_COMERCIAL = "5544936180914";

// Google Tag Manager container ID (mesmo das LPs institucionais do Integrado).
export const GTM_ID = "GTM-PLWM6NS";

// Logo oficial do Centro Universitário Integrado.
export const LOGO_URL =
  "https://lp.grupointegrado.br/pos-graduacao/ead/direito-civil-e-processual-civil/logo_pos_integrado.png";

/**
 * Monta a URL do WhatsApp com a mensagem pré-preenchida.
 */
export function buildWhatsappUrl(curso: string): string {
  const texto = `Oi, tenho interesse no curso de ${curso}`;
  return `https://wa.me/${NUMERO_COMERCIAL}?text=${encodeURIComponent(texto)}`;
}
