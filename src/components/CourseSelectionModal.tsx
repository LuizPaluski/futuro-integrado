import { useEffect, useRef, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { useModalStore, modalStore } from "@/lib/modal-store";
import { buildWhatsappUrl } from "@/lib/constants";
import { track } from "@/lib/tracking";

export function CourseSelectionModal() {
  const { open, initialCurso } = useModalStore();
  const [curso, setCurso] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setCurso(initialCurso ?? "");
      setError(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, initialCurso]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") modalStore.closeModal();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = curso.trim();
    if (!value) {
      setError("Informe o curso de interesse para continuar.");
      return;
    }
    // Evento de conversão - DISPARAR ANTES do redirect
    track("lead_whatsapp", { curso_interesse: value });
    track("submit_popup_curso", { curso_interesse: value });
    const url = buildWhatsappUrl(value);
    window.open(url, "_blank", "noopener,noreferrer");
    modalStore.closeModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => modalStore.closeModal()}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md rounded-2xl bg-popover text-popover-foreground p-6 md:p-8 shadow-2xl">
        <button
          onClick={() => modalStore.closeModal()}
          aria-label="Fechar"
          className="absolute top-3 right-3 h-9 w-9 rounded-full hover:bg-surface flex items-center justify-center text-muted-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h3
          id="course-modal-title"
          className="text-2xl md:text-3xl font-extrabold pr-8"
        >
          Qual pós-graduação você tem interesse?
        </h3>
        <p className="mt-2 text-muted-foreground">
          Digite o curso ou a área. Um consultor te responde em instantes.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="curso" className="sr-only">
              Curso de interesse
            </label>
            <input
              ref={inputRef}
              id="curso"
              type="text"
              value={curso}
              onChange={(e) => {
                setCurso(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Ex.: Psicopedagogia, Engenharia de Software, Gestão de Pessoas"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
            {error && (
              <p className="mt-2 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!curso.trim()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-whatsapp-foreground font-semibold text-base px-6 py-4"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Continuar pelo WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
