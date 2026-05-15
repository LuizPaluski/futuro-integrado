import { MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-professional.jpg";
import { modalStore } from "@/lib/modal-store";
import { track } from "@/lib/tracking";

const SELOS = [
  "Nota máxima no MEC",
  "+13.000 formados",
  "40 anos",
  "100% EAD",
];

export function Hero() {
  const handleCta = () => {
    track("click_cta_hero");
    track("open_popup_curso", { source: "hero" });
    modalStore.openModal();
  };

  return (
    <section className="relative isolate min-h-[640px] md:min-h-screen flex flex-col">
      {/* Background */}
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-black/35" />

      {/* Top bar */}
      <header className="px-5 md:px-10 pt-6 md:pt-8">
        <div className="flex items-center">
          <div className="text-primary-foreground font-bold tracking-tight text-lg md:text-xl">
            Centro Universitário <span className="opacity-80">Integrado</span>
          </div>
        </div>
      </header>

      {/* Selos */}
      <div className="px-5 md:px-10 mt-6 md:mt-8">
        <ul className="flex flex-wrap gap-2 md:gap-3">
          {SELOS.map((s) => (
            <li
              key={s}
              className="rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1 text-xs md:text-sm text-white"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex items-center px-5 md:px-10 py-12 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]">
            Sua próxima promoção começa com uma decisão.
          </h1>
          <p className="mt-5 md:mt-7 text-white/90 text-lg md:text-2xl leading-snug max-w-2xl">
            Pós-graduação 100% EAD. Você escolhe o curso, entra em contato pelo
            WhatsApp e já começa.
          </p>

          <div className="mt-8 md:mt-10">
            <button
              onClick={handleCta}
              className="inline-flex items-center gap-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover transition-colors text-whatsapp-foreground font-semibold text-base md:text-lg px-6 md:px-8 py-4 shadow-lg shadow-black/20"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Quero minha pós agora
            </button>
            <p className="mt-3 text-white/85 text-sm md:text-base">
              Vagas abertas para turmas deste mês.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
