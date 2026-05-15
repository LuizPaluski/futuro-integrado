import { MessageCircle, Clock, TrendingUp, ShieldCheck } from "lucide-react";
import { modalStore } from "@/lib/modal-store";
import { track } from "@/lib/tracking";

/**
 * Bloco 2 - Objeção financeira.
 * CLIENTE: três variações disponíveis. Padrão: Opção A.
 *
 * Opção A (agressiva, ATIVA):
 *   "Cargos de liderança e especialista quase sempre exigem pós-graduação.
 *    Sem ela, você compete por menos vagas e por salários menores."
 *
 * Opção B (institucional):
 *   "Pós-graduação é critério de seleção em mais de 70% das vagas de
 *    gestão e especialista no Brasil."
 *
 * Opção C (neutra):
 *   "O retorno financeiro de uma pós aparece em forma de novas oportunidades,
 *    promoções e estabilidade de carreira."
 */
const FINANCEIRO_TEXTO =
  "Cargos de liderança e especialista quase sempre exigem pós-graduação. Sem ela, você compete por menos vagas e por salários menores.";

const BLOCOS = [
  {
    icon: Clock,
    titulo: "Não tenho tempo.",
    texto:
      "100% EAD. Você estuda quando e onde quiser. Sem horário fixo, sem deslocamento, sem abrir mão do emprego.",
  },
  {
    icon: TrendingUp,
    titulo: "Vale financeiramente?",
    texto: FINANCEIRO_TEXTO,
  },
  {
    icon: ShieldCheck,
    titulo: "O diploma vale?",
    texto:
      "Nota máxima no MEC. 40 anos formando profissionais no Paraná. Mais de 13.000 pessoas formadas pelo Integrado. Diploma com validade nacional.",
  },
];

export function Objections() {
  const handleCta = () => {
    track("click_cta_objections");
    track("open_popup_curso", { source: "objections" });
    modalStore.openModal();
  };

  return (
    <section className="bg-surface md:min-h-[80vh] py-20 md:py-28 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground max-w-3xl">
          As dúvidas que você provavelmente está fazendo agora.
        </h2>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {BLOCOS.map(({ icon: Icon, titulo, texto }) => (
            <article
              key={titulo}
              className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl md:text-2xl font-bold text-foreground">
                {titulo}
              </h3>
              <p className="mt-3 text-muted-foreground text-base leading-relaxed">
                {texto}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 md:mt-16 flex justify-center">
          <button
            onClick={handleCta}
            className="inline-flex items-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover transition-colors text-whatsapp-foreground font-semibold text-base md:text-lg px-6 md:px-8 py-4"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Falar com um consultor pelo WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
