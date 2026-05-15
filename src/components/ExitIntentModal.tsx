import { useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { useModalStore, modalStore } from "@/lib/modal-store";
import { track } from "@/lib/tracking";

const SESSION_KEY = "exit_intent_shown";

export function ExitIntentModal() {
  const { exitOpen } = useModalStore();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        sessionStorage.setItem(SESSION_KEY, "1");
        track("trigger_exit_intent");
        modalStore.openExit();
      }
    };
    document.addEventListener("mouseout", handler);
    return () => document.removeEventListener("mouseout", handler);
  }, []);

  if (!exitOpen) return null;

  const handleCta = () => {
    track("click_exit_intent_cta");
    modalStore.closeExit();
    track("open_popup_curso", { source: "exit_intent" });
    modalStore.openModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => modalStore.closeExit()}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md rounded-2xl bg-popover text-popover-foreground p-6 md:p-8 shadow-2xl">
        <button
          onClick={() => modalStore.closeExit()}
          aria-label="Fechar"
          className="absolute top-3 right-3 h-9 w-9 rounded-full hover:bg-surface flex items-center justify-center text-muted-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 id="exit-modal-title" className="text-2xl md:text-3xl font-extrabold pr-8">
          Antes de sair.
        </h3>
        <p className="mt-2 text-muted-foreground">
          Garanta uma condição especial de matrícula para hoje.
        </p>
        {/* CLIENTE: confirmar com Grupo Integrado se será desconto, isenção
            de taxa ou parcelamento. */}
        <p className="mt-4 text-base text-foreground">
          Condição especial disponível apenas para matrículas realizadas hoje.
          (Conteúdo final a confirmar com o Grupo Integrado.)
        </p>

        <button
          onClick={handleCta}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover transition-colors text-whatsapp-foreground font-semibold text-base px-6 py-4"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Quero a condição especial
        </button>
      </div>
    </div>
  );
}
