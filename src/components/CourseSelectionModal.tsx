import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { X, MessageCircle, Search } from "lucide-react";
import { useModalStore, modalStore } from "@/lib/modal-store";
import { buildWhatsappUrl } from "@/lib/constants";
import { track } from "@/lib/tracking";
import { CURSOS, normalize } from "@/constants/courses";

const MAX_RESULTS = 8;

function highlight(text: string, query: string) {
  if (!query) return text;
  const nText = normalize(text);
  const nQuery = normalize(query);
  const idx = nText.indexOf(nQuery);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-bold text-navy">
        {text.slice(idx, idx + query.length)}
      </strong>
      {text.slice(idx + query.length)}
    </>
  );
}

export function CourseSelectionModal() {
  const { open, initialCurso } = useModalStore();
  const [curso, setCurso] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedExact, setSelectedExact] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setCurso(initialCurso ?? "");
      setError(null);
      setShowList(false);
      setSelectedExact(Boolean(initialCurso));
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, initialCurso]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
      if ((e as globalThis.KeyboardEvent).key === "Escape") modalStore.closeModal();
    };
    window.addEventListener("keydown", onKey as EventListener);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey as EventListener);
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const q = normalize(curso.trim());
    if (!q) return [];
    return CURSOS.filter((c) => normalize(c.nome).includes(q)).slice(0, MAX_RESULTS);
  }, [curso]);

  useEffect(() => {
    setActiveIndex(0);
  }, [curso]);

  if (!open) return null;

  const submit = (valueOverride?: string) => {
    const value = (valueOverride ?? curso).trim();
    if (!value) {
      setError("Informe o curso de interesse para continuar.");
      return;
    }
    const url = buildWhatsappUrl(value);

    track("lead_whatsapp", { curso: value });
    track("submit_popup_curso", { curso_interesse: value });


    modalStore.closeModal();
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  const selectFromList = (nome: string) => {
    setCurso(nome);
    setSelectedExact(true);
    setShowList(false);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showList || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (results[activeIndex]) {
        e.preventDefault();
        selectFromList(results[activeIndex].nome);
      }
    } else if (e.key === "Escape") {
      setShowList(false);
    }
  };

  const listVisible = showList && results.length > 0 && !selectedExact;

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
      <div className="relative w-full max-w-md rounded-2xl bg-popover text-popover-foreground p-6 md:p-8 shadow-2xl border-t-[3px] border-gold-strong">
        <button
          onClick={() => modalStore.closeModal()}
          aria-label="Fechar"
          className="absolute top-3 right-3 h-9 w-9 rounded-full hover:bg-surface flex items-center justify-center text-muted-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h3
          id="course-modal-title"
          className="font-serif text-2xl md:text-3xl font-bold text-navy pr-8"
        >
          Qual pós-graduação você tem interesse?
        </h3>
        <p className="mt-2 text-muted-foreground">
          Digite o curso ou a área. Um consultor te responde em instantes.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <label htmlFor="curso" className="sr-only">
              Curso de interesse
            </label>
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              id="curso"
              type="text"
              value={curso}
              onChange={(e) => {
                setCurso(e.target.value);
                setSelectedExact(false);
                setShowList(true);
                if (error) setError(null);
              }}
              onFocus={() => {
                if (!selectedExact) setShowList(true);
              }}
              onBlur={() => setTimeout(() => setShowList(false), 150)}
              onKeyDown={onKeyDown}
              placeholder="Ex.: Psicopedagogia, Engenharia de Software..."
              className="w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              autoComplete="off"
              aria-autocomplete="list"
              aria-expanded={listVisible}
              required
            />
            {listVisible && (
              <ul
                role="listbox"
                className="absolute z-10 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-beige bg-card shadow-lg py-1"
              >
                {results.map((c, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li
                      key={c.nome}
                      role="option"
                      aria-selected={isActive}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        selectFromList(c.nome);
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`min-h-11 px-4 py-2.5 cursor-pointer flex items-center justify-between gap-3 ${
                        isActive ? "bg-accent/10" : ""
                      }`}
                    >
                      <span className="text-sm text-navy">
                        {highlight(c.nome, curso)}
                      </span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {c.area}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
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
