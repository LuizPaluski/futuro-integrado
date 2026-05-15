/**
 * Tracking helpers - dataLayer (GTM).
 * Eventos sinalizados:
 *   click_cta_hero
 *   click_cta_objections
 *   click_area_card (param: area)
 *   open_popup_curso
 *   submit_popup_curso  -> dispara como 'lead_whatsapp'
 *   trigger_exit_intent
 *   click_exit_intent_cta
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
