import {
  Scale,
  GraduationCap,
  Cog,
  Briefcase,
  HeartPulse,
  Cpu,
  Layers,
  MessageCircle,
  ArrowRight,
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
  const open = () => {
    track("click_area_card", { area: area.nome });
    track("open_popup_curso", { source: "area_card", area: area.nome });
    modalStore.openModal(area.nome);
  };
  return (
    <button
      onClick={open}
      className="group text-left rounded-2xl border border-border bg-card p-5 md:p-6 transition-all hover:border-primary/40 hover:-translate-y-0.5"
    >
      <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <area.Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="mt-5 text-lg md:text-xl font-bold text-foreground">
        {area.nome}
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Quero esta área
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

export function Areas() {
  const handleFaixaCta = () => {
    track("open_popup_curso", { source: "faixa_institucional" });
    modalStore.openModal();
  };

  return (
    <section className="md:min-h-[80vh] py-20 md:py-28 px-5 md:px-10 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground">
          Escolha sua área de atuação.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Selecione a área que combina com o seu próximo passo. Um consultor te
          ajuda a escolher o curso ideal pelo WhatsApp.
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {AREAS.map((a) => (
            <AreaCard key={a.nome} area={a} />
          ))}
        </div>

        {/* Faixa institucional */}
        <div className="mt-14 md:mt-20 rounded-3xl bg-institutional text-institutional-foreground p-8 md:p-12">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 md:items-center">
            <div>
              <h3 className="text-2xl md:text-4xl font-extrabold leading-tight">
                Do interesse à matrícula, tudo pelo WhatsApp.
              </h3>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-white/85 max-w-xl">
                Sem portal, sem fila, sem papelada. Você fala com um consultor,
                escolhe a turma e já começa.
              </p>
            </div>
            <button
              onClick={handleFaixaCta}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover transition-colors text-whatsapp-foreground font-semibold px-6 py-4 whitespace-nowrap"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Começar agora pelo WhatsApp
            </button>
          </div>
        </div>

        {/* Prova social */}
        <ul className="mt-12 md:mt-14 flex flex-wrap justify-center gap-3 md:gap-4">
          {SELOS.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm md:text-base font-medium text-foreground"
            >
              {s}
            </li>
          ))}
        </ul>

        {/* Depoimento - PLACEHOLDER
            CLIENTE: estrutura pronta para receber foto, nome, profissão,
            cidade/PR e citação curta. Substituir quando o Grupo Integrado
            entregar os depoimentos reais. */}
        <div className="mt-12 md:mt-16 max-w-2xl mx-auto rounded-2xl border border-dashed border-border bg-surface p-8 md:p-10 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-border" aria-hidden="true" />
          <p className="mt-5 text-base md:text-lg text-muted-foreground italic">
            "Espaço reservado para depoimentos reais de alunos. Estrutura de
            coleta em construção pelo Grupo Integrado."
          </p>
        </div>
      </div>
    </section>
  );
}
