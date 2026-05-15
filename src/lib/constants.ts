/**
 * Constantes globais do projeto.
 * ================================================================
 * CLIENTE: substituir os valores abaixo antes de publicar.
 * ================================================================
 */

// WhatsApp comercial (formato internacional, somente números). Ex.: 5544999999999
export const NUMERO_COMERCIAL = "5544999999999";

// Google Tag Manager container ID. Ex.: GTM-XXXXXXX
export const GTM_ID = "GTM-XXXXXXX";

/**
 * Monta a URL do WhatsApp com a mensagem pré-preenchida.
 */
export function buildWhatsappUrl(curso: string): string {
  const texto = `Oi, tenho interesse no curso de ${curso}`;
  return `https://wa.me/${NUMERO_COMERCIAL}?text=${encodeURIComponent(texto)}`;
}
