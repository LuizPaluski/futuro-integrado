import { MessageCircle, Trophy } from "lucide-react";
import heroImg from "@/assets/hero-v1.jpg";
import logoIntegrado from "@/assets/grupointegrado.png";
import { whatsappLink } from "@/lib/constants";
import { track } from "@/lib/tracking";

type Selo = { texto: string; destaque?: boolean };
const SELOS: Selo[] = [
  { texto: "Nº 1 do Paraná em Centro Universitário", destaque: true },
  { texto: "Nota máxima no MEC" },
  { texto: "40 anos" },
  { texto: "100% EAD" },
];

export function Hero() {
  const handleCta = () => {
    track("click_cta_hero");
    track("open_popup_curso", { source: "hero" });
    modalStore.openModal();
  };

  return (
    <section className="relative isolate min-h-[640px] md:min-h-screen flex flex-col bg-navy overflow-hidden">
      {/* Background */}
      <img
        src={heroImg}
        alt="Profissional em ambiente corporativo apresentando para sua equipe"
        
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      {/* Overlay forte para garantir contraste WCAG AAA no headline */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      <div className="absolute inset-0 -z-10 hero-vignette" aria-hidden="true" />

      {/* Logo institucional */}
      <header className="px-5 md:px-10 pt-6 md:pt-8">
        <img
          src={logoIntegrado}
          alt="Centro Universitário Integrado - Pós-Graduação"
          className="h-8 md:h-10 w-auto brightness-0 invert"
          loading="eager"
        />
      </header>

      {/* Selos */}
      <div className="px-5 md:px-10 mt-6 md:mt-8">
        <ul className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-3">
          {SELOS.map((s) => (
            <li
              key={s.texto}
              className={[
                "rounded-full backdrop-blur-sm px-3 py-2 text-xs md:text-sm text-white text-center min-h-[44px] flex items-center justify-center leading-snug",
                s.destaque
                  ? "col-span-2 md:col-span-1 border border-accent bg-accent/25 font-semibold gap-1.5"
                  : "border border-gold/60 bg-navy/40",
              ].join(" ")}
            >
              {s.destaque && (
                <Trophy className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
              )}
              <span>{s.texto}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex items-center px-5 md:px-10 py-12 md:py-20">
        <div className="max-w-3xl">
          <h1
            className="font-serif text-white text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05]"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.45)" }}
          >
            Sua próxima promoção começa com uma decisão.
          </h1>

          <div className="mt-6 md:mt-8 h-px w-24 bg-gold" aria-hidden="true" />

          <p
            className="mt-6 md:mt-8 text-white font-sans font-normal text-lg md:text-2xl leading-snug max-w-2xl"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            Pós-graduação 100% EAD. Você escolhe o curso, entra em contato pelo
            WhatsApp e já começa.
          </p>

          <div className="mt-8 md:mt-10">
            <button
              data-hero-cta
              onClick={handleCta}
              className="cta-button cta-pulse inline-flex items-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-semibold text-base md:text-lg px-6 md:px-8 py-4 shadow-lg shadow-black/30"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Quero conhecer a pós
            </button>
            <p className="mt-3 text-gold text-sm md:text-base">
              Vagas abertas para turmas deste mês.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
