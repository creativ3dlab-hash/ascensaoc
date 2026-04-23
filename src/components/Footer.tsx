import logo from "@/assets/logo-optimized.png";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Top metadata strip */}
      <div className="container py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Ascensão Criativa" className="h-8 w-8 object-contain" />
          <span className="font-display font-semibold tracking-wide-2 text-sm">
            ASCENSÃO CRIATIVA
          </span>
        </div>
        <p className="text-xs text-foreground/40 tracking-open text-center">
          © {new Date().getFullYear()} Ascensão Criativa. Todos os direitos reservados.
        </p>
        <div className="flex gap-6 text-xs text-foreground/50">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Behance
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Giant gradient wordmark */}
      <div
        aria-hidden="true"
        className="relative select-none pointer-events-none overflow-hidden px-4 pt-8"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <h2
          className="font-display font-semibold text-center tracking-tighter whitespace-nowrap"
          style={{
            fontSize: "clamp(3rem, 18vw, 18rem)",
            lineHeight: 1.05,
            paddingTop: "0.18em",
            background:
              "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 35%, hsl(var(--foreground) / 0.15) 70%, transparent 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ASCENSÃO
        </h2>
        <h2
          className="font-display font-semibold text-center tracking-tighter whitespace-nowrap"
          style={{
            fontSize: "clamp(3rem, 18vw, 18rem)",
            lineHeight: 1.05,
            marginTop: "-0.1em",
            background:
              "linear-gradient(180deg, hsl(var(--primary) / 0.7) 0%, hsl(var(--primary) / 0.3) 40%, transparent 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          CRIATIVA
        </h2>
      </div>
    </footer>
  );
};
