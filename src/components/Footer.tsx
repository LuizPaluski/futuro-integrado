import { LOGO_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80 px-5 md:px-10 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <img
          src={LOGO_URL}
          alt="Centro Universitário Integrado"
          className="h-10 md:h-12 w-auto"
          loading="lazy"
        />
        <p className="mt-5 max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
          Centro Universitário Integrado. Campo Mourão, Paraná. Mais de 40 anos
          transformando vidas pela educação.
        </p>
        <div className="mt-8 pt-6 border-t border-gold/30 flex flex-col md:flex-row md:items-center gap-3 text-xs md:text-sm text-white/60">
          <span>CNPJ 00.000.000/0001-00</span>
          <span className="hidden md:inline text-gold">·</span>
          <span>Rua Exemplo, 000 - Campo Mourão/PR</span>
          <span className="hidden md:inline text-gold">·</span>
          <a href="#" className="hover:text-gold transition-colors">
            Política de Privacidade
          </a>
          <span className="hidden md:inline text-gold">·</span>
          <a
            href="https://www.grupointegrado.br"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            Site institucional
          </a>
        </div>
      </div>
    </footer>
  );
}
