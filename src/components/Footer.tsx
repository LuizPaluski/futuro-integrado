export function Footer() {
  return (
    <footer className="bg-navy text-white/70 px-5 md:px-10 py-10 md:py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs md:text-sm">
        <p className="text-white/80">
          Centro Universitário Integrado — Campo Mourão / PR
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <a href="#" className="hover:text-accent transition-colors">
            Política de Privacidade
          </a>
          <a
            href="https://www.grupointegrado.br"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Site institucional
          </a>
        </div>
      </div>
    </footer>
  );
}
