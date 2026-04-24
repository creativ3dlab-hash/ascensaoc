import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import checkmateImg from "@/assets/checkmate-piece.jpg";

/**
 * Editorial brutalist statement section.
 * Realistic chess "checkmate" still life intersected by massive layered
 * typography (solid + outlined), inspired by Lumos but rebuilt in our
 * dark / burnt-orange studio language.
 */
export const Checkmate = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const passed = vh - r.top;
      setProgress(Math.max(0, Math.min(1, passed / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const float = (progress - 0.5) * 60; // subtle parallax

  return (
    <section
      ref={sectionRef}
      id="checkmate"
      className="relative overflow-hidden border-t border-border bg-background noise-overlay py-28 md:py-40"
    >
      {/* paper-like horizontal rules */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, hsl(var(--foreground)) 0 1px, transparent 1px 140px)",
        }}
      />
      {/* radial warm glow behind subject */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 55% at 50% 55%, hsl(27 90% 41% / 0.22), transparent 70%)",
        }}
      />

      <div className="container relative">
        {/* meta caption */}
        <Reveal>
          <div className="flex items-center justify-between mb-10 md:mb-14">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.45em] text-primary">
                Manifesto / Posicionamento
              </span>
            </div>
            <span className="hidden md:inline text-[10px] uppercase tracking-[0.4em] text-foreground/40 tabular-nums">
              Movimento 001
            </span>
          </div>
        </Reveal>

        {/* STAGE — image + layered type */}
        <div className="relative">
          {/* layered display type — sits BEHIND and IN FRONT of the photo via z-index split */}
          <div
            aria-hidden
            className="relative font-display font-bold uppercase leading-[0.82] tracking-[-0.02em] text-balance text-center"
          >
            {/* line 1 — outline (BEHIND the image) */}
            <div className="relative z-0 text-[clamp(3rem,12vw,12rem)]">
              <span className="checkmate-outline" data-text="Tire da">Tire&nbsp;da</span>
            </div>

            {/* image stage — overlaps the type */}
            <div
              className="relative z-10 -my-[6vw] md:-my-[5vw] flex items-center justify-center"
              style={{
                transform: `translateY(${float * 0.25}px)`,
                transition: "transform 80ms linear",
              }}
            >
              <div className="relative w-full max-w-[820px] aspect-[16/10] overflow-hidden">
                {/* mask gradient so image bleeds into background */}
                <div
                  className="absolute inset-0"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 95%)",
                    maskImage:
                      "radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 95%)",
                  }}
                >
                  <img
                    src={checkmateImg}
                    alt="Peça de xadrez laranja em pé sobre tabuleiro de mármore, com peças adversárias derretidas em tinta laranja ao redor — metáfora de xeque-mate na concorrência."
                    width={1920}
                    height={1080}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{
                      filter: "contrast(1.08) saturate(1.05) brightness(0.96)",
                    }}
                  />
                </div>

                {/* warm color wash to lock palette */}
                <div
                  className="absolute inset-0 mix-blend-color pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 55%, hsl(27 90% 41% / 0.18), transparent 80%)",
                  }}
                />
                {/* subtle scanlines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, hsl(0 0% 100% / 0.05) 0 1px, transparent 1px 3px)",
                  }}
                />
              </div>
            </div>

            {/* line 2 — SOLID (in front, overlaps top of image — like reference) */}
            <div className="relative z-20 -mt-[8vw] md:-mt-[7vw] text-foreground text-[clamp(3rem,12vw,12rem)] mix-blend-difference">
              Concorrência
            </div>

            {/* line 3 — clean outlined type with hover fill sweep */}
            <div className="relative z-20 mt-2 text-[clamp(2.4rem,9vw,9rem)]">
              <span className="checkmate-outline" data-text="o lugar que ">o lugar que </span>
              <span className="text-primary italic">é&nbsp;seu</span>
            </div>
          </div>

          {/* sr-only proper heading for SEO/AT */}
          <h2 className="sr-only">
            Tire da concorrência o lugar que é seu.
          </h2>
        </div>

        {/* footer row */}
        <div className="relative z-30 mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <Reveal delay={120} className="md:col-span-7">
            <p className="text-foreground/70 leading-relaxed tracking-open max-w-xl text-base md:text-lg">
              Marcas memoráveis não competem por atenção. Elas reorganizam o tabuleiro.
              Construímos posicionamentos que tiram do adversário a única coisa que ele não pode recuperar:{" "}
              <span className="text-foreground">o lugar na cabeça do cliente</span>.
            </p>
          </Reveal>

          <Reveal delay={220} className="md:col-span-5 md:justify-self-end">
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">
                  Próximo lance
                </div>
                <div className="font-display text-2xl md:text-3xl font-semibold">
                  Xeque-mate
                </div>
              </div>
              <a
                href="#contato"
                className="group relative inline-flex items-center justify-center w-20 h-20 rounded-full border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Iniciar movimento"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-center leading-tight">
                  Jogar
                  <br />
                  a peça
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* corner ticks */}
        <span className="absolute top-6 left-6 w-4 h-4 border-l border-t border-primary/60 pointer-events-none" />
        <span className="absolute top-6 right-6 w-4 h-4 border-r border-t border-primary/60 pointer-events-none" />
        <span className="absolute bottom-6 left-6 w-4 h-4 border-l border-b border-primary/60 pointer-events-none" />
        <span className="absolute bottom-6 right-6 w-4 h-4 border-r border-b border-primary/60 pointer-events-none" />
      </div>
    </section>
  );
};
