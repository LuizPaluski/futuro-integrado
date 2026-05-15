export function Footer() {
  return (
    <footer className="bg-[#111111] text-white/70 px-5 md:px-10 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-white font-bold text-lg md:text-xl">
          Centro Universitário Integrado
        </div>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-white/70 leading-relaxed">
          Centro Universitário Integrado. Campo Mourão, Paraná. Mais de 40 anos
          transformando vidas pela educação.
        </p>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center gap-3 text-xs md:text-sm text-white/50">
          <span>CNPJ 00.000.000/0001-00</span>
          <span className="hidden md:inline">·</span>
          <span>Rua Exemplo, 000 - Campo Mourão/PR</span>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:text-white transition-colors">
            Política de Privacidade
          </a>
          <span className="hidden md:inline">·</span>
          <a
            href="https://www.grupointegrado.br"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Site institucional
          </a>
        </div>
      </div>
    </footer>
  );
}
