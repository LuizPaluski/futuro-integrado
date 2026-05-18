import { Medal, Trophy, CalendarCheck, Users, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import { track } from "@/lib/tracking";

const ITENS = [
  { Icon: Medal, destaque: "Nota máxima", legenda: "Avaliação MEC" },
  { Icon: Trophy, destaque: "Nº 1 do Paraná", legenda: "Centro Universitário" },
  { Icon: CalendarCheck, destaque: "40 anos", legenda: "formando profissionais" },
  { Icon: Users, destaque: "+13.000", legenda: "alunos formados pelo Integrado" },
];

export function Credentials() {
  const handleCta = () => {
    track("click_cta_credenciais");
  };

  return (
    <section className="py-20 md:py-28 px-5 md:px-10 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy text-center">
          Reconhecimento e credibilidade.
        </h2>
        <div className="mt-6 mx-auto h-px w-24 bg-gold" aria-hidden="true" />

        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {ITENS.map(({ Icon, destaque, legenda }) => (
            <article
              key={destaque}
              className="rounded-2xl border border-beige bg-card p-4 md:p-7 flex flex-col items-center text-center shadow-sm"
            >
              <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                <Icon className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
              </div>
              <div className="font-serif mt-4 text-lg md:text-2xl font-bold text-navy leading-tight break-words">
                {destaque}
              </div>
              <div className="mt-2 text-xs md:text-base text-muted-foreground leading-snug">
                {legenda}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 md:mt-16 flex justify-center px-5 md:px-0">
          <a
            href={whatsappLink("Olá! Quero falar com um consultor sobre a pós.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCta}
            className="cta-button flex md:inline-flex w-full md:w-auto max-w-[480px] items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-base md:text-lg px-6 md:px-8 min-h-[52px] py-4"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Falar com um consultor agora
          </a>
        </div>
      </div>
    </section>
  );
}
