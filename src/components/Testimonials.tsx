import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import p1 from "@/assets/person-1.jpg";
import p2 from "@/assets/person-2.jpg";
import p3 from "@/assets/person-3.jpg";

const items = [
  {
    quote:
      "Eles não entregaram um logo. Entregaram uma tese sobre quem somos no mercado, e isso reposicionou nossa receita em seis meses.",
    name: "Marina Voss",
    role: "CEO · Helio Studio",
    company: "Helio",
    photo: p1,
    metric: "+312%",
    metricLabel: "Receita após rebrand",
    year: "2024",
  },
  {
    quote:
      "Trabalhei com agências em três países. Nenhuma me obrigou a pensar tanto, e nenhuma chegou tão perto da identidade real da marca.",
    name: "Ricardo Tavares",
    role: "Founder · Norte Capital",
    company: "Norte",
    photo: p2,
    metric: "8 sem.",
    metricLabel: "Do brief ao lançamento",
    year: "2024",
  },
  {
    quote:
      "Método clínico, execução obsessiva. Saímos com um sistema visual que escala, não com peças bonitas que envelhecem.",
    name: "Clara Bianchi",
    role: "Diretora · Atlas Arquitetura",
    company: "Atlas",
    photo: p3,
    metric: "100%",
    metricLabel: "Aprovação na 1ª rodada",
    year: "2023",
  },
];

export const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const dragX = useRef<number | null>(null);
  const AUTOPLAY = 7000;

  // autoplay + progress bar
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / AUTOPLAY);
      setProgress(p);
      if (p >= 1) setActive((a) => (a + 1) % items.length);
    }, 30);
    return () => clearInterval(tick);
  }, [active]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % items.length);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (dir: 1 | -1) =>
    setActive((a) => (a + dir + items.length) % items.length);

  const onDown = (e: React.PointerEvent) => (dragX.current = e.clientX);
  const onUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
    dragX.current = null;
  };

  const current = items[active];

  return (
    <section
      id="depoimentos"
      className="relative py-32 border-t border-border overflow-hidden noise-overlay"
      style={{ background: "hsl(0 0% 4%)" }}
    >
      {/* atmospheric glow that follows active */}
      <div
        key={active}
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(700px circle at 30% 40%, hsl(27 90% 41% / 0.12), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

      {/* enormous background quote mark */}
      <div className="absolute -top-10 -left-10 text-[28rem] leading-none font-display font-bold text-primary/[0.04] select-none pointer-events-none">
        “
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              03.5 / Depoimentos
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              O que dizem <br />
              os <span className="text-primary">fundadores</span>.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-sm text-foreground/60 max-w-sm tracking-open">
              Conversas reais com líderes de marcas que confiaram no método.
            </p>
          </Reveal>
        </div>

        <div
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch select-none"
          onPointerDown={onDown}
          onPointerUp={onUp}
        >
          {/* Portrait stage */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] media-frame corner-ticks">
              {items.map((it, i) => (
                <img
                  key={it.name}
                  src={it.photo}
                  alt={it.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-all"
                  style={{
                    opacity: i === active ? 1 : 0,
                    clipPath:
                      i === active ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                    transform: i === active ? "scale(1)" : "scale(1.05)",
                    transitionDuration: "1100ms",
                    transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
                  }}
                />
              ))}
              {/* floating tag */}
              <div className="absolute top-5 left-5 z-10 text-[10px] uppercase tracking-[0.3em] bg-background/70 backdrop-blur-md border border-border px-3 py-1.5 rounded-sm">
                {current.year} · Cliente
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div
                  key={current.name}
                  className="font-display text-2xl font-semibold animate-fade-up"
                >
                  {current.name}
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-primary mt-2">
                  {current.role}
                </div>
              </div>
            </div>

            {/* metric card */}
            <div
              key={`m-${active}`}
              className="absolute -bottom-8 -right-4 lg:-right-12 bg-background border border-card-border rounded-lg px-6 py-5 shadow-[var(--shadow-elevated)] animate-fade-up"
            >
              <div className="font-display text-3xl font-semibold text-primary tabular-nums">
                {current.metric}
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/55 mt-1 max-w-[140px]">
                {current.metricLabel}
              </div>
            </div>
          </div>

          {/* Quote stage */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[420px] py-4">
            <Quote className="w-10 h-10 text-primary mb-8" strokeWidth={1.2} />

            <blockquote
              key={`q-${active}`}
              className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-tight text-balance animate-fade-up"
            >
              <span className="text-primary">“</span>
              {current.quote}
              <span className="text-primary">”</span>
            </blockquote>

            {/* controls */}
            <div className="mt-12 flex items-center justify-between gap-6 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <button
                  aria-label="Anterior"
                  onClick={() => go(-1)}
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:border-primary hover:text-primary hover:-translate-x-1 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  aria-label="Próximo"
                  onClick={() => go(1)}
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:border-primary hover:text-primary hover:translate-x-1 transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* indicators */}
              <div className="flex-1 flex items-center gap-3">
                {items.map((it, i) => (
                  <button
                    key={it.name}
                    onClick={() => setActive(i)}
                    className="group flex-1 flex flex-col gap-2 text-left"
                  >
                    <span className="relative h-px w-full bg-border overflow-hidden">
                      <span
                        className="absolute inset-y-0 left-0 bg-primary transition-all"
                        style={{
                          width:
                            i < active
                              ? "100%"
                              : i === active
                              ? `${progress * 100}%`
                              : "0%",
                          transitionDuration: i === active ? "30ms" : "500ms",
                        }}
                      />
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-[0.25em] transition-colors ${
                        i === active ? "text-primary" : "text-foreground/40 group-hover:text-foreground/70"
                      }`}
                    >
                      0{i + 1} · {it.company}
                    </span>
                  </button>
                ))}
              </div>

              <div className="hidden md:block text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                ← → navegar
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
