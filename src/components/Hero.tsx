import { MessageCircle, Trophy, Medal, CalendarCheck, Monitor } from "lucide-react";
import heroImg from "@/assets/hero-v1.jpg";
import logoIntegrado from "@/assets/grupointegrado.png";
import { modalStore } from "@/lib/modal-store";
import { track } from "@/lib/tracking";


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
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_top] md:object-center"
        fetchPriority="high"
        decoding="async"
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
      <div className="px-5 md:px-10 mt-6 md:mt-8 flex flex-col items-center gap-2 md:gap-3">
        {/* Nível 1 — Badge protagonista */}
        <div
          className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-accent bg-accent/10 px-[18px] py-[10px] text-white font-bold text-sm md:text-[15px] font-sans"
          style={{ boxShadow: "0 0 24px rgba(30, 136, 229, 0.15)" }}
        >
          <Trophy className="h-[18px] w-[18px] text-accent shrink-0" aria-hidden="true" />
          <span>Nº 1 do Paraná em Centro Universitário</span>
        </div>

        {/* Nível 2 — Microcredentials */}
        <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-white/75">
          <li className="flex items-center gap-1 text-xs md:text-[13px] font-medium">
            <Medal className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Nota máxima no MEC
          </li>
          <span className="mx-1 h-3 w-px bg-white/30" aria-hidden="true" />
          <li className="flex items-center gap-1 text-xs md:text-[13px] font-medium">
            <CalendarCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            40 anos
          </li>
          <span className="mx-1 h-3 w-px bg-white/30" aria-hidden="true" />
          <li className="flex items-center gap-1 text-xs md:text-[13px] font-medium">
            <Monitor className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            100% EAD
          </li>
        </ul>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex items-center px-5 md:px-10 py-12 md:py-20">
        <div className="max-w-3xl w-full">
          <h1
            className="font-serif text-white text-[2rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.1] md:leading-[1.05] text-balance"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.45)" }}
          >
            Sua próxima promoção começa com uma decisão.
          </h1>

          <div className="mt-6 md:mt-8 h-px w-24 bg-gold" aria-hidden="true" />

          <p
            className="mt-6 md:mt-8 text-white font-sans font-normal text-base sm:text-lg md:text-2xl leading-relaxed md:leading-snug max-w-2xl"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            Pós-graduação 100% EAD. Você escolhe o curso, entra em contato pelo
            WhatsApp e já começa.
          </p>

          <div className="mt-8 md:mt-10">
            <a
              data-hero-cta
              href={whatsappLink("Olá! Quero conhecer a pós do Integrado.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCta}
              className="cta-button cta-pulse flex md:inline-flex w-full md:w-auto max-w-[480px] items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold text-base md:text-lg px-6 md:px-8 min-h-[52px] py-4 shadow-lg shadow-black/30"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Quero conhecer a pós
            </a>
            <p className="mt-3 text-gold text-sm md:text-base">
              Vagas abertas para turmas deste mês.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
