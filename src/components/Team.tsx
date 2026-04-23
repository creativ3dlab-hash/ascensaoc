import { useState, useEffect } from "react";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { Reveal } from "./Reveal";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

type Member = {
  index: string;
  name: string;
  fullName: string;
  role: string;
  department: string;
  bio: string;
  longBio: string;
  initials: string;
  origin: string;
  years: string;
  linkedin?: string;
  behance?: string;
  hue: string;
};

const members: Member[] = [
  {
    index: "01",
    name: "Direção Criativa",
    fullName: "Rafael Monteiro",
    role: "Gestor & Diretor",
    department: "Liderança",
    bio: "Define a visão estratégica de cada marca e orquestra a equipe para entregar ascensão real.",
    longBio:
      "Rafael lidera a Aeon há mais de uma década, conduzindo marcas em momentos de virada. Sua abordagem une diagnóstico estratégico, narrativa de marca e direção criativa — sempre com foco em ascensão mensurável. Já dirigiu projetos para marcas em mais de 12 setores, do luxo ao SaaS.",
    initials: "RM",
    origin: "São Paulo, BR",
    years: "12+ anos",
    linkedin: "https://linkedin.com",
    behance: "https://behance.net",
    hue: "from-[hsl(27_90%_41%/0.55)] via-[hsl(27_60%_25%/0.3)] to-[hsl(0_0%_6%/0.95)]",
  },
  {
    index: "02",
    name: "Estrategista Comercial",
    fullName: "Camila Vasconcelos",
    role: "Head of Growth",
    department: "Negócios",
    bio: "Conecta marcas a oportunidades reais. Diagnóstico, proposta e relação de longo prazo.",
    longBio:
      "Camila constrói pontes entre marcas e mercado. Com background em consultoria e branding, transforma a primeira conversa em parceria duradoura. Especialista em diagnóstico comercial e estruturação de propostas que respeitam o tempo e o capital de cada cliente.",
    initials: "CV",
    origin: "Rio de Janeiro, BR",
    years: "8 anos",
    linkedin: "https://linkedin.com",
    hue: "from-[hsl(15_70%_38%/0.5)] via-[hsl(15_40%_22%/0.3)] to-[hsl(0_0%_6%/0.95)]",
  },
  {
    index: "03",
    name: "Editor de Vídeo",
    fullName: "Lucas Andrade",
    role: "Motion & Film",
    department: "Audiovisual",
    bio: "Constrói narrativas em movimento. Cor, ritmo e corte que convertem atenção em desejo.",
    longBio:
      "Lucas é responsável pelo movimento por trás de cada peça. Editor com formação em cinema, cuida do ritmo, da color grade e do design sonoro. Cada corte tem intenção; cada transição, propósito. Já assinou peças para campanhas regionais e nacionais.",
    initials: "LA",
    origin: "Curitiba, BR",
    years: "9 anos",
    linkedin: "https://linkedin.com",
    behance: "https://behance.net",
    hue: "from-[hsl(35_85%_45%/0.5)] via-[hsl(30_50%_24%/0.3)] to-[hsl(0_0%_6%/0.95)]",
  },
  {
    index: "04",
    name: "Designer",
    fullName: "Helena Prado",
    role: "Brand Designer",
    department: "Identidade",
    bio: "Sistemas visuais com método. Tipografia, cor e composição alinhadas ao posicionamento.",
    longBio:
      "Helena traduz posicionamento em sistema visual. Tipografia, paleta, grids e componentes — tudo desenhado para escalar e durar. Apaixonada por detalhes invisíveis que sustentam grandes marcas, trabalha do conceito ao guideline final.",
    initials: "HP",
    origin: "Belo Horizonte, BR",
    years: "7 anos",
    linkedin: "https://linkedin.com",
    behance: "https://behance.net",
    hue: "from-[hsl(20_80%_42%/0.52)] via-[hsl(20_50%_24%/0.3)] to-[hsl(0_0%_6%/0.95)]",
  },
  {
    index: "05",
    name: "Gestor de Tráfego",
    fullName: "Bruno Tavares",
    role: "Paid Media Lead",
    department: "Performance",
    bio: "Mídia paga com leitura criativa. Cada real investido tem propósito e narrativa.",
    longBio:
      "Bruno enxerga mídia paga como extensão da estratégia criativa. Estrutura campanhas em Meta, Google e TikTok com foco em qualidade de tráfego e LTV — não em vaidade de cliques. Atua na fronteira entre dados, criativo e jornada de compra.",
    initials: "BT",
    origin: "Porto Alegre, BR",
    years: "6 anos",
    linkedin: "https://linkedin.com",
    hue: "from-[hsl(25_75%_40%/0.5)] via-[hsl(25_45%_24%/0.3)] to-[hsl(0_0%_6%/0.95)]",
  },
];

export const Team = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<Member | null>(null);

  // Lock body scroll when modal open + ESC to close
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section
      id="equipe"
      className="relative py-32 md:py-40 overflow-hidden noise-overlay"
    >
      {/* Background atmospherics */}
      <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute inset-0 grid-lines opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-primary" />
                <span className="text-xs uppercase tracking-[0.4em] text-primary">
                  Crew / 2026 — 05 Talents
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-semibold text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-balance">
                A equipe por trás de
                <br />
                cada <span className="text-shimmer">ascensão</span>.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed tracking-open">
                Uma estrutura enxuta, sênior e multidisciplinar. Cada função foi
                desenhada para somar, não para ocupar espaço.
              </p>
              <div className="mt-8 flex items-center gap-6 text-[10px] uppercase tracking-[0.35em] text-foreground/50">
                <span>Senior Crew</span>
                <span className="h-px w-8 bg-foreground/20" />
                <span>Multidisciplinar</span>
                <span className="h-px w-8 bg-foreground/20" />
                <span>Click to open</span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Roster index strip */}
        <Reveal delay={0.15}>
          <div className="hidden md:flex items-center justify-between gap-6 mb-10 pb-5 border-b border-card-border/60 text-[10px] uppercase tracking-[0.4em] text-foreground/50">
            <span>Index</span>
            <div className="flex items-center gap-6">
              {members.map((m, i) => (
                <button
                  key={m.index}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActive(m)}
                  className={`flex items-center gap-2 transition-colors ${
                    hovered === i ? "text-primary" : "hover:text-foreground/80"
                  }`}
                >
                  <span>{m.index}</span>
                  <span className="text-foreground/30">{m.initials}</span>
                </button>
              ))}
            </div>
            <span className="text-primary/80">[ 05 / 05 ]</span>
          </div>
        </Reveal>

        {/* Cards grid — equal-sized cells */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
          {members.map((m, i) => {
            const isHovered = hovered === i;

            return (
              <Reveal key={m.index} delay={0.05 + i * 0.06}>
                <button
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActive(m)}
                  aria-label={`Abrir bio de ${m.fullName}`}
                  className="group relative w-full text-left aspect-[3/4] overflow-hidden rounded-md border border-card-border bg-background-secondary/40 backdrop-blur-sm transition-all duration-700 hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-[0_40px_100px_-25px_hsl(27_90%_41%/0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  {/* Background stage */}
                  <div className="absolute inset-0 overflow-hidden bg-background">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${m.hue} transition-transform duration-[1500ms] ease-out ${
                        isHovered ? "scale-[1.08]" : "scale-100"
                      }`}
                    />

                    {/* Grain */}
                    <div className="absolute inset-0 noise-overlay opacity-40 pointer-events-none" />

                    {/* Vertical scanlines */}
                    <div
                      className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(90deg, transparent 0 4px, hsl(0 0% 0% / 0.3) 4px 5px)",
                      }}
                    />

                    {/* Animated horizontal scan-line on hover */}
                    <div
                      className={`absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/80 to-transparent pointer-events-none ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        top: isHovered ? "100%" : "0%",
                        transition: isHovered
                          ? "top 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s"
                          : "opacity 0.3s",
                      }}
                    />

                    {/* Monogram — centered */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                      <span
                        className={`font-display font-semibold leading-none tracking-tighter transition-all duration-700 text-[8rem] md:text-[10rem] ${
                          isHovered ? "text-primary/90" : "text-foreground/[0.08]"
                        }`}
                        style={{
                          textShadow: isHovered
                            ? "0 0 80px hsl(27 90% 41% / 0.6), 0 0 30px hsl(27 90% 41% / 0.4)"
                            : "none",
                          WebkitTextStroke: isHovered
                            ? "0"
                            : "1px hsl(27 90% 41% / 0.15)",
                        }}
                      >
                        {m.initials}
                      </span>
                    </div>

                    {/* Bottom heavy gradient veil */}
                    <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none" />
                    {/* Top subtle veil */}
                    <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-background/60 to-transparent pointer-events-none" />

                    {/* Corner ticks */}
                    <span className="absolute top-3 left-3 w-4 h-4 border-l border-t border-primary/0 group-hover:border-primary transition-colors duration-500" />
                    <span className="absolute top-3 right-3 w-4 h-4 border-r border-t border-primary/0 group-hover:border-primary transition-colors duration-500" />
                    <span className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-primary/0 group-hover:border-primary transition-colors duration-500" />
                    <span className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-primary/0 group-hover:border-primary transition-colors duration-500" />
                  </div>

                  {/* Top meta strip */}
                  <div className="absolute top-0 inset-x-0 p-5 flex items-start justify-between z-10">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`font-display font-semibold leading-none transition-colors duration-500 text-2xl md:text-3xl ${
                          isHovered ? "text-primary" : "text-foreground/85"
                        }`}
                      >
                        {m.index}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/50">
                        / 05
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[9px] uppercase tracking-[0.4em] text-primary/90">
                        {m.department}
                      </span>
                      <span
                        className={`h-px bg-primary transition-all duration-500 ${
                          isHovered ? "w-12" : "w-6"
                        }`}
                      />
                    </div>
                  </div>

                  {/* INFO BLOCK — bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-5">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-primary/90 mb-2">
                      {m.role}
                    </div>
                    <h3 className="font-display font-semibold leading-[1.05] text-balance text-xl md:text-2xl mb-1">
                      {m.name}
                    </h3>
                    <div className="text-sm text-foreground/70 mb-4">
                      {m.fullName}
                    </div>

                    <div className="pt-3 border-t border-card-border/60 flex items-center justify-between gap-3">
                      <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/50">
                        Open bio
                      </span>
                      <ArrowUpRight
                        className={`shrink-0 w-4 h-4 transition-all duration-500 ${
                          isHovered
                            ? "text-primary translate-x-1 -translate-y-1"
                            : "text-foreground/50"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Animated bottom accent line */}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-700 z-30 ${
                      isHovered ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Footer note */}
        <Reveal delay={0.3}>
          <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-card-border/60">
            <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/50">
              Crew completa — 05 disciplinas, uma única direção.
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-primary/80">
              [ Talents available on request ]
            </span>
          </div>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* MODAL — premium bio popup */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`Bio de ${active.fullName}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/85 backdrop-blur-md"
            onClick={() => setActive(null)}
          />

          {/* Modal card */}
          <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-md border border-card-border bg-background-secondary/95 shadow-[0_60px_140px_-20px_hsl(27_90%_41%/0.4)] animate-scale-in">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Close */}
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Fechar"
              className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-card-border bg-background/80 text-foreground/70 hover:text-primary hover:border-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Visual side */}
              <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto md:min-h-[560px] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${active.hue}`} />
                <div className="absolute inset-0 noise-overlay opacity-40" />
                <div
                  className="absolute inset-0 opacity-25 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent 0 4px, hsl(0 0% 0% / 0.3) 4px 5px)",
                  }}
                />
                {/* Massive monogram */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-display font-semibold leading-none tracking-tighter text-[14rem] md:text-[18rem] text-primary/90"
                    style={{
                      textShadow:
                        "0 0 100px hsl(27 90% 41% / 0.7), 0 0 40px hsl(27 90% 41% / 0.5)",
                    }}
                  >
                    {active.initials}
                  </span>
                </div>
                {/* Vertical caption */}
                <div className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.4em] text-foreground/60">
                  Crew File / {active.index}
                </div>
                <div className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.4em] text-primary/90">
                  {active.department}
                </div>
                {/* Corner ticks */}
                <span className="absolute top-3 left-3 w-4 h-4 border-l border-t border-primary" />
                <span className="absolute top-3 right-3 w-4 h-4 border-r border-t border-primary" />
                <span className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-primary" />
                <span className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-primary" />
              </div>

              {/* Content side */}
              <div className="md:col-span-7 p-7 md:p-10 lg:p-12 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-primary" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
                    {active.role}
                  </span>
                </div>

                <div className="text-[11px] uppercase tracking-[0.35em] text-foreground/50 mb-3">
                  {active.name}
                </div>
                <h3 className="font-display font-semibold text-3xl md:text-5xl leading-[1.02] mb-6 text-balance">
                  {active.fullName}
                </h3>

                <p className="text-foreground/70 leading-relaxed text-base md:text-lg mb-8">
                  {active.longBio}
                </p>

                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-card-border/60">
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.4em] text-foreground/50 mb-1.5">
                      Origem
                    </div>
                    <div className="text-sm text-foreground/90">{active.origin}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.4em] text-foreground/50 mb-1.5">
                      Experiência
                    </div>
                    <div className="text-sm text-foreground/90">{active.years}</div>
                  </div>
                </div>

                {/* Social */}
                <div className="mt-auto pt-6 border-t border-card-border/60 flex items-center gap-4 flex-wrap">
                  {active.linkedin && (
                    <a
                      href={active.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-card-border text-[10px] uppercase tracking-[0.3em] text-foreground/80 hover:text-primary hover:border-primary transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                  )}
                  {active.behance && (
                    <a
                      href={active.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-card-border text-[10px] uppercase tracking-[0.3em] text-foreground/80 hover:text-primary hover:border-primary transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Behance
                    </a>
                  )}
                  <span className="ml-auto text-[9px] uppercase tracking-[0.4em] text-foreground/40">
                    ID/{active.index}.{active.initials}
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          </div>
        </div>
      )}
    </section>
  );
};
