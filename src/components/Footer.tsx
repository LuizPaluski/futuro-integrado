export function Footer() {
  return (
    <footer
      className="bg-navy text-white/70 px-5 md:px-10 py-10 md:py-12"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 96px)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
        <p className="text-white/80">
          Centro Universitário Integrado — Campo Mourão / PR
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <a
            href="#"
            className="hover:text-accent transition-colors inline-flex items-center min-h-11 py-2"
          >
            Política de Privacidade
          </a>
          <a
            href="https://www.grupointegrado.br"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors inline-flex items-center min-h-11 py-2"
          >
            Site institucional
          </a>
        </div>
      </div>
    </footer>
  );
}
