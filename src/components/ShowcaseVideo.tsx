import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

/**
 * Immersive showcase: not a player UI. It lazy-loads only near viewport so it
 * does not compete with the Hero video.
 */
export const ShowcaseVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState(0);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5, inside: false });
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "25% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      setParallax(Math.max(-120, Math.min(120, -center * 0.1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => setVideoReady(true);
    const tryPlay = () => video.play().catch(() => {});

    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("canplay", handleReady);
    video.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();

    return () => {
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [shouldLoad]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPointer({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
      inside: true,
    });
  };

  const splitX = pointer.inside ? pointer.x * 100 : 50;

  return (
    <section
      ref={sectionRef}
      id="reel"
      className="relative py-32 border-t border-border overflow-hidden noise-overlay"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, hsl(27 90% 41% / 0.12), transparent 70%)",
        }}
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-end">
          <Reveal className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Reel 2026
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
              Direção que <span className="text-primary">se vê</span>,
              não que se explica.
            </h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <p className="text-foreground/65 leading-relaxed tracking-open italic">
              Há marcas que falam. E há marcas que tocam.
              <br />
              As que tocam ficam — porque carregam alma, intenção e a coragem
              de existir além do óbvio.
            </p>
          </Reveal>
        </div>

        <Reveal variant="scale">
          <div
            ref={stageRef}
            onMouseMove={onMove}
            onMouseLeave={() => setPointer((p) => ({ ...p, inside: false }))}
            className="relative aspect-[21/9] overflow-hidden border border-card-border bg-background select-none cursor-none"
            style={{ borderRadius: "var(--radius)" }}
          >
            <div
              className="absolute inset-0 z-0 flex items-center justify-center bg-background-secondary"
              style={{ opacity: videoReady ? 0 : 1, transition: "opacity 400ms ease" }}
            >
              <div className="absolute inset-0 bg-radial-glow opacity-60" />
              <div className="text-center px-6">
                <span className="text-[10px] uppercase tracking-[0.45em] text-primary">
                  Reel / Ascensão Criativa
                </span>
                <div className="mt-5 font-display text-2xl md:text-4xl font-semibold text-balance">
                  Bastidores de uma identidade em movimento.
                </div>
              </div>
            </div>

            {shouldLoad && (
              <>
                <video
                  ref={videoRef}
                  src="/videos/cinematic-2.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover will-change-transform video-crisp"
                  style={{
                    transform: `translate3d(0, ${parallax * 0.3}px, 0) scale(1.1)`,
                    filter: "grayscale(0.85) contrast(1.05) brightness(0.85)",
                    opacity: videoReady ? 1 : 0,
                    transition: "opacity 450ms ease",
                  }}
                />

                <video
                  src="/videos/cinematic-2.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover will-change-transform video-crisp"
                  style={{
                    transform: `translate3d(0, ${parallax * 0.3}px, 0) scale(1.1)`,
                    filter:
                      "saturate(1.25) contrast(1.15) brightness(1.05) hue-rotate(-6deg)",
                    clipPath: `polygon(0 0, ${splitX}% 0, ${Math.max(0, splitX - 6)}% 100%, 0 100%)`,
                    transition: pointer.inside
                      ? "clip-path 80ms linear, opacity 450ms ease"
                      : "clip-path 600ms cubic-bezier(0.22,1,0.36,1), opacity 450ms ease",
                    opacity: videoReady ? 1 : 0,
                  }}
                />
              </>
            )}

            <div
              aria-hidden
              className="absolute top-0 bottom-0 w-px bg-primary pointer-events-none"
              style={{
                left: `${splitX}%`,
                transform: "skewX(-3deg)",
                opacity: pointer.inside ? 1 : 0.35,
                boxShadow: "0 0 24px hsl(var(--primary) / 0.6)",
                transition: "opacity 200ms",
              }}
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.4em] text-foreground/70 pointer-events-none transition-opacity"
              style={{ left: "2rem", opacity: pointer.inside ? 1 : 0.5 }}
            >
              Bruto
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.4em] text-primary pointer-events-none transition-opacity"
              style={{ right: "2rem", opacity: pointer.inside ? 1 : 0.5 }}
            >
              Tratado
            </div>

            {pointer.inside && (
              <div
                className="absolute pointer-events-none z-30"
                style={{
                  left: `${pointer.x * 100}%`,
                  top: `${pointer.y * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative w-24 h-24">
                  <span className="absolute inset-0 rounded-full border border-primary/70" />
                  <span className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/50 -translate-x-1/2" />
                  <span className="absolute top-1/2 left-0 right-0 h-px bg-primary/50 -translate-y-1/2" />
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] text-primary whitespace-nowrap">
                    Arraste a luz
                  </span>
                </div>
              </div>
            )}

            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, hsl(0 0% 100% / 0.04) 0 1px, transparent 1px 3px)",
              }}
            />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, hsl(0 0% 0% / 0.55))",
              }}
            />

            <div className="absolute top-5 left-5 z-20 flex items-center gap-3 pointer-events-none">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inset-0 rounded-full bg-destructive"
                  style={{ animation: "pulse-ring 1.5s ease-out infinite" }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/85 bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-sm border border-border">
                Live Reel
              </span>
            </div>
            <div className="absolute top-5 right-5 z-20 text-[10px] uppercase tracking-[0.35em] text-foreground/75 bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-sm border border-border tabular-nums pointer-events-none">
              21:9 / 24fps
            </div>

            <span className="absolute top-3 left-3 w-4 h-4 border-l border-t border-primary pointer-events-none" />
            <span className="absolute top-3 right-3 w-4 h-4 border-r border-t border-primary pointer-events-none" />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-primary pointer-events-none" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-primary pointer-events-none" />

            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 flex items-end justify-between pointer-events-none">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
                  Estúdio / Ascensão Criativa
                </div>
                <div className="font-display text-xl md:text-2xl font-semibold">
                  Bastidores de uma identidade
                </div>
              </div>
              <div className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-foreground/65 tabular-nums">
                01 / 04
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] uppercase tracking-[0.35em] text-foreground/55">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-primary/60" />
              Cada quadro carrega uma intenção
            </div>
            <div className="tabular-nums">TC 00:00:24:11</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
