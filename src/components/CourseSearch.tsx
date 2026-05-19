import { useId, useMemo, useRef, useState, useEffect, type KeyboardEvent } from "react";
import { Search, X, MessageCircle } from "lucide-react";
import { CURSOS, normalize, type Curso } from "@/constants/courses";
import { modalStore } from "@/lib/modal-store";
import { track } from "@/lib/tracking";

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

export function CourseSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const optionIdPrefix = useId();

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return CURSOS.filter((c) => normalize(c.nome).includes(q)).slice(0, MAX_RESULTS);
  }, [query]);

  const showFallback = open && query.trim().length > 0 && results.length === 0;
  const showList = open && query.trim().length > 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const selectCourse = (curso: Curso) => {
    track("course_search_select", { curso: curso.nome, area: curso.area });
    const texto = `Olá! Tenho interesse na pós em ${curso.nome}.`;
    const url = `https://wa.me/${NUMERO_COMERCIAL}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const openConsultor = () => {
    track("course_search_no_match", { query });
    window.open(buildWhatsappUrl("pós-graduação"), "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const totalItems = results.length + (showFallback ? 1 : 0);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!showList) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(totalItems - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (showFallback) {
        openConsultor();
      } else if (results[activeIndex]) {
        selectCourse(results[activeIndex]);
      }
    }
  };

  const clear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="mt-8 md:mt-10 rounded-2xl border border-beige bg-card p-5 md:p-6">
      <div className="grid md:grid-cols-[auto_1fr] gap-3 md:gap-5 md:items-center">
        <label
          htmlFor={`${optionIdPrefix}-input`}
          className="font-serif text-base md:text-lg font-semibold text-navy whitespace-nowrap"
        >
          Já sabe o que quer cursar?
        </label>
        <div
          role="combobox"
          aria-expanded={showList}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          className="relative"
        >
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <input
              id={`${optionIdPrefix}-input`}
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              onKeyDown={onKeyDown}
              placeholder="Digite o nome do curso. Ex: Engenharia de Software, MBA em Gestão..."
              className="w-full h-12 pl-11 pr-11 rounded-xl border border-beige bg-background text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-shadow"
              aria-autocomplete="list"
              aria-activedescendant={
                showList && totalItems > 0 ? `${optionIdPrefix}-opt-${activeIndex}` : undefined
              }
            />
            {query && (
              <button
                type="button"
                onClick={clear}
                aria-label="Limpar busca"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-accent/10 hover:text-navy"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {showList && (
            <ul
              id={listboxId}
              role="listbox"
              className="absolute z-30 mt-2 w-full max-h-[22rem] overflow-y-auto rounded-xl border border-beige bg-card shadow-lg py-1"
            >
              {results.map((c, i) => {
                const isActive = i === activeIndex;
                return (
                  <li
                    key={c.nome}
                    id={`${optionIdPrefix}-opt-${i}`}
                    role="option"
                    aria-selected={isActive}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectCourse(c);
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`min-h-11 px-4 py-2.5 cursor-pointer flex items-center justify-between gap-4 ${
                      isActive ? "bg-accent/10" : ""
                    }`}
                  >
                    <span className="text-sm md:text-base text-navy">
                      {highlight(c.nome, query)}
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                      {c.area}
                    </span>
                  </li>
                );
              })}
              {showFallback && (
                <li
                  id={`${optionIdPrefix}-opt-0`}
                  role="option"
                  aria-selected
                  onMouseDown={(e) => {
                    e.preventDefault();
                    openConsultor();
                  }}
                  className="min-h-11 px-4 py-3 cursor-pointer flex items-center gap-2 bg-accent/10 text-navy"
                >
                  <MessageCircle className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="text-sm md:text-base font-semibold">
                    Não encontrou o curso? Fale com um consultor
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
