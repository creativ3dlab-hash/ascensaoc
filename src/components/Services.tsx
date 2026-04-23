import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

type Service = {
  num: string;
  title: string;
  tag: string;
  short: string;
  desc: string;
  deliverables: string[];
  metric: { k: string; l: string };
};

const services: Service[] = [
  {
    num: "01",
    title: "Brand Strategy",
    tag: "Fundação",
    short: "A arquitetura invisível que sustenta marcas inevitáveis.",
    desc: "Posicionamento, território competitivo e narrativa construídos com método — antes de qualquer pixel.",
    deliverables: ["Diagnóstico estratégico", "Posicionamento & território", "Naming & arquitetura verbal"],
    metric: { k: "08", l: "Semanas" },
  },
  {
    num: "02",
    title: "Identidade Visual",
    tag: "Sistema",
    short: "Sistemas geométricos que envelhecem como vinho.",
    desc: "Identidades atemporais construídas como sistemas vivos — escaláveis, consistentes, inconfundíveis.",
    deliverables: ["Logotipo & marca", "Sistema visual completo", "Manual de aplicação"],
    metric: { k: "120+", l: "Aplicações" },
  },
  {
    num: "03",
    title: "Design Digital",
    tag: "Presença",
    short: "Sites que parecem editoriais e vendem como funis.",
    desc: "Produtos digitais com presença cinematográfica, narrativa autoral e performance comercial mensurável.",
    deliverables: ["Website premium", "UI/UX & design system", "Landing pages de alta conversão"],
    metric: { k: "100", l: "PageSpeed" },
  },
  {
    num: "04",
    title: "Direção Criativa",
    tag: "Continuidade",
    short: "Curadoria contínua para marcas que recusam estagnar.",
    desc: "Mentoria executiva, campanhas integradas e editorial recorrente — para permanecer relevante no tempo.",
    deliverables: ["Mentoria executiva", "Campanhas integradas", "Editorial recorrente"],
    metric: { k: "12m+", l: "Parceria" },
  },
];

export const Services = () => {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="servicos" className="relative py-32 border-t border-border overflow-hidden [content-visibility:auto] [contain-intrinsic-size:900px]">
      {/* ambient */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[700px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, hsl(27 90% 41% / 0.18), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(27 90% 41% / 0.14), transparent 65%)" }}
      />

      <div className="container relative">
        {/* header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs uppercase tracking-[0.35em] text-primary">01 — Disciplinas</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05] text-balance">
              Quatro disciplinas. <br className="hidden md:block" />
              <span className="italic text-primary">Uma</span> direção.
            </h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5 lg:pt-10">
            <p className="text-foreground/65 leading-relaxed tracking-open">
              Cada projeto começa em pesquisa profunda e termina em sistema vivo.
              Sem fórmulas, sem terceirização — apenas direção sênior do início ao fim.
            </p>
          </Reveal>
        </div>

        {/* IMMERSIVE STAGE */}
        <div className="relative rounded-2xl border border-card-border bg-card/30 backdrop-blur-md overflow-hidden">
          {/* corner ticks */}
          <span className="absolute top-4 left-4 w-4 h-4 border-l border-t border-primary/70 z-20" />
          <span className="absolute top-4 right-4 w-4 h-4 border-r border-t border-primary/70 z-20" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-primary/70 z-20" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-primary/70 z-20" />

          {/* GIANT decorative number behind */}
          <div
            key={`bg-${current.num}`}
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
            style={{ animation: "fade-in 0.9s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <span
              className="font-display font-bold leading-none tracking-tighter"
              style={{
                fontSize: "clamp(20rem, 42vw, 44rem)",
                background:
                  "linear-gradient(180deg, hsl(27 90% 41% / 0.18) 0%, hsl(27 90% 41% / 0.04) 60%, transparent 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {current.num}
            </span>
          </div>

          {/* gentle radial */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(80% 60% at 80% 0%, hsl(27 90% 41% / 0.12), transparent 60%), radial-gradient(60% 50% at 0% 100%, hsl(27 90% 41% / 0.08), transparent 65%)",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
            {/* LEFT — vertical tabs */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-card-border/70 p-8 md:p-10 flex flex-col">
              <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 mb-8">
                Selecione
              </div>
              <nav className="flex flex-col gap-1 flex-1">
                {services.map((s, i) => {
                  const isActive = active === i;
                  return (
                    <button
                      key={s.num}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className={`group relative text-left py-5 px-4 -mx-4 rounded-md transition-colors duration-500 ${
                        isActive ? "bg-primary/[0.04]" : "hover:bg-foreground/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <span
                          className={`font-display text-[11px] tabular-nums tracking-[0.3em] transition-colors duration-500 ${
                            isActive ? "text-primary" : "text-foreground/35"
                          }`}
                        >
                          {s.num}
                        </span>
                        <span
                          className={`h-px transition-all duration-700 ${
                            isActive ? "w-10 bg-primary" : "w-4 bg-foreground/20 group-hover:w-6 group-hover:bg-foreground/40"
                          }`}
                        />
                        <span
                          className={`font-display text-base md:text-lg font-medium transition-colors duration-500 ${
                            isActive ? "text-foreground" : "text-foreground/55 group-hover:text-foreground/85"
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>
                      <div
                        className={`pl-[88px] text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ${
                          isActive ? "text-primary/70 mt-1.5 opacity-100" : "text-foreground/0 opacity-0 max-h-0"
                        }`}
                      >
                        {s.tag}
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* counter */}
              <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {services.map((s, i) => (
                    <span
                      key={s.num}
                      className={`h-px transition-all duration-500 ${
                        active === i ? "w-8 bg-primary" : "w-4 bg-foreground/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 tabular-nums">
                  {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* RIGHT — content stage */}
            <div className="lg:col-span-8 relative p-8 md:p-12 lg:p-16 flex flex-col">
              <div
                key={`content-${current.num}`}
                className="flex flex-col h-full"
                style={{ animation: "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both" }}
              >
                {/* tag row */}
                <div className="flex items-center justify-between gap-4 mb-10">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-primary" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
                      {current.tag}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl md:text-3xl font-bold tabular-nums text-foreground leading-none">
                      {current.metric.k}
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.3em] text-foreground/45 mt-1.5">
                      {current.metric.l}
                    </div>
                  </div>
                </div>

                {/* title — fluid sizing so longest titles fit */}
                <h3
                  className="font-display font-semibold leading-[1.02] tracking-tight mb-6"
                  style={{ fontSize: "clamp(2rem, 4.6vw, 3.75rem)" }}
                >
                  {current.title}
                </h3>

                {/* tagline */}
                <p className="font-display italic text-lg md:text-xl text-primary/85 leading-snug mb-6 max-w-2xl">
                  “{current.short}”
                </p>

                {/* desc */}
                <p className="text-foreground/70 leading-relaxed tracking-open mb-12 max-w-2xl">
                  {current.desc}
                </p>

                {/* deliverables */}
                <div className="mt-auto pt-8 border-t border-border/60">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/45 mb-6">
                    O que entregamos
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                    {current.deliverables.map((d, di) => (
                      <li
                        key={d}
                        className="flex items-start gap-3 text-sm text-foreground/85"
                        style={{ animation: `fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${0.15 + di * 0.08}s both` }}
                      >
                        <span className="font-display text-[10px] tabular-nums text-primary/70 pt-0.5">
                          {String(di + 1).padStart(2, "0")}
                        </span>
                        <span className="tracking-open leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* footer note — premium */}
        <Reveal delay={200} className="mt-12">
          <div className="relative rounded-xl border border-card-border bg-card/40 backdrop-blur-sm overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(80% 100% at 0% 50%, hsl(27 90% 41% / 0.10), transparent 60%)",
              }}
            />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-6 md:px-10 py-7">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inset-0 rounded-full bg-primary"
                    style={{ animation: "pulse-ring 1.8s ease-out infinite" }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs uppercase tracking-[0.35em] text-foreground/85">
                  Design for Humans
                </span>
                <span className="hidden md:block h-4 w-px bg-border" />
                <span className="hidden md:block text-xs uppercase tracking-[0.3em] text-foreground/45">
                  Direção sênior · Estúdio independente
                </span>
              </div>
              <a
                href="#contato"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-foreground hover:text-primary transition-colors"
              >
                <span className="h-px w-8 bg-foreground/30 group-hover:w-14 group-hover:bg-primary transition-all duration-500" />
                Solicitar proposta
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
