import { CourseSearch } from "./CourseSearch";
import {
  Scale,
  GraduationCap,
  Cog,
  Briefcase,
  HeartPulse,
  Cpu,
  Layers,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { modalStore } from "@/lib/modal-store";
import { track } from "@/lib/tracking";

type Area = { nome: string; Icon: LucideIcon };

const AREAS: Area[] = [
  { nome: "Direito", Icon: Scale },
  { nome: "Educação", Icon: GraduationCap },
  { nome: "Engenharia", Icon: Cog },
  { nome: "Gestão e RH", Icon: Briefcase },
  { nome: "Saúde", Icon: HeartPulse },
  { nome: "Tecnologia", Icon: Cpu },
  { nome: "Outras áreas", Icon: Layers },
];

const SELOS = [
  "Nota máxima no MEC",
  "40 anos",
  "Campo Mourão / PR",
  "+13.000 formados pelo Integrado",
];

function AreaCard({ area }: { area: Area }) {
  const onClick = () => {
    track("click_area_card", { area: area.nome });
    track("open_popup_curso", { source: "area_card", area: area.nome });
    modalStore.openModal(area.nome);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="group h-full w-full text-left rounded-2xl border border-beige bg-card p-6 hover:border-accent focus-visible:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 md:hover:-translate-y-0.5 transition-colors flex flex-col min-h-[160px]"
    >
      <div className="h-11 w-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
        <area.Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="font-serif mt-4 text-base md:text-xl font-bold text-navy leading-tight">
        {area.nome}
      </div>
      <span className="mt-auto pt-4 w-full inline-flex items-center justify-center rounded-lg border border-navy/40 px-3 min-h-11 text-xs md:text-sm font-semibold text-navy group-hover:bg-navy group-hover:text-primary-foreground transition-colors">
        Quero esta área
      </span>
    </button>
  );
}

export function Areas() {
  const handleFaixaCta = () => {
    track("click_cta_faixa_institucional");
    track("open_popup_curso", { source: "faixa_institucional" });
    modalStore.openModal();
  };

  return (
    <section className="md:min-h-[80vh] py-20 md:py-28 px-5 md:px-10 bg-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy text-center">
          Escolha sua área de atuação.
        </h2>
        <div className="mt-6 mx-auto h-px w-24 bg-gold" aria-hidden="true" />
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-center">
          Selecione a área que combina com o seu próximo passo. Um consultor te
          ajuda a escolher o curso ideal pelo WhatsApp.
        </p>

        <CourseSearch />

        <div className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {AREAS.map((a) => (
            <AreaCard key={a.nome} area={a} />
          ))}
        </div>

        {/* Faixa institucional - navy com borda dourada superior */}
        <div className="mt-14 md:mt-20 rounded-3xl bg-navy text-white p-6 md:p-12 border-t-2 border-gold">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 md:items-center text-center md:text-left">
            <div>
              <h3 className="font-serif text-2xl md:text-4xl font-bold leading-tight">
                Do interesse à matrícula, tudo pelo WhatsApp.
              </h3>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-white/85 max-w-xl mx-auto md:mx-0">
                Sem portal, sem fila, sem papelada. Você fala com um consultor,
                escolhe a turma e já começa.
              </p>
            </div>
            <button
              data-final-cta
              type="button"
              onClick={handleFaixaCta}
              className="cta-button cta-pulse flex md:inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-base md:text-lg px-6 md:px-8 min-h-[52px] py-4 shadow-lg shadow-black/30 whitespace-nowrap"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Começar agora pelo WhatsApp
            </button>
          </div>
        </div>

        {/* Prova social institucional */}
        <div className="mt-12 md:mt-14 -mx-5 md:-mx-10 bg-background py-8 md:py-10 px-5 md:px-10">
          <ul className="flex flex-wrap justify-center items-center gap-x-2 gap-y-3 md:gap-x-4 text-center">
            {SELOS.map((s, i) => (
              <li key={s} className="flex items-center gap-2 md:gap-4">
                <span className="text-base md:text-lg font-semibold text-navy">
                  {s}
                </span>
                {i < SELOS.length - 1 && (
                  <span className="text-gold text-xl" aria-hidden="true">·</span>
                )}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
