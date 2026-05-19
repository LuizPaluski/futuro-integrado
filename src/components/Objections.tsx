import { MessageCircle, Clock, TrendingUp, Award } from "lucide-react";
import { modalStore } from "@/lib/modal-store";
import { track } from "@/lib/tracking";

const BLOCOS = [
  {
    icon: Clock,
    titulo: "Não tenho tempo.",
    render: () => (
      <>
        100% EAD. Você estuda quando e onde quiser. Sem horário fixo, sem
        deslocamento, sem abrir mão do emprego.
      </>
    ),
  },
  {
    icon: TrendingUp,
    titulo: "Vale financeiramente?",
    render: () => (
      <>
        Profissionais com pós-graduação recebem, em média,{" "}
        <strong className="font-bold text-accent">150% a mais</strong> que
        graduados, segundo pesquisa do Instituto Semesp/PNAD Contínua.
      </>
    ),
  },
  {
    icon: Award,
    titulo: "O diploma vale?",
    render: () => (
      <>
        Nota máxima no MEC. 40 anos formando profissionais no Paraná. Mais de
        13.000 pessoas formadas pelo Integrado. Diploma com validade nacional.
      </>
    ),
  },
];

export function Objections() {
  const handleCta = () => {
    track("click_cta_objections");
  };

  return (
    <section className="bg-background md:min-h-[80vh] py-20 md:py-28 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy text-center max-w-3xl mx-auto">
          As dúvidas que você provavelmente está se fazendo agora.
        </h2>
        <div className="mt-6 mx-auto h-px w-24 bg-gold" aria-hidden="true" />

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {BLOCOS.map(({ icon: Icon, titulo, render }) => (
            <article
              key={titulo}
              className="rounded-2xl border border-beige bg-card p-6 md:p-8 flex flex-col shadow-sm transition-all duration-200 md:hover:-translate-y-1 md:hover:scale-[1.02] md:hover:shadow-xl"
            >
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                <Icon className="h-7 w-7 md:h-8 md:w-8" aria-hidden="true" />
              </div>
              <h3 className="font-serif mt-4 text-xl md:text-[1.65rem] font-bold text-navy leading-tight">
                {titulo}
              </h3>
              <p className="mt-3 text-muted-foreground text-base md:text-lg leading-relaxed">
                {render()}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 md:mt-16 flex justify-center">
          <a
            href={whatsappLink("Olá! Tenho algumas dúvidas sobre a pós.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCta}
            className="cta-button inline-flex items-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-semibold text-base md:text-lg px-6 md:px-8 py-4"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Tirar minhas dúvidas no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
