import { useEffect, useRef, useState } from "react";

/**
 * Hero — Fullscreen Cinematic (ref: cornrevolution.resn.global)
 * - Vídeo ocupando 100% da tela como background
 * - Tipografia massiva em UMA linha cortando o centro
 * - Vinheta escura para legibilidade
 * - HUD minimalista: relógio + status no topo, subtítulo embaixo
 * - Mantém: relógio ao vivo + shimmer no texto + vídeo cinematic-2.mp4
 */
export const Hero = () => {
  const [time, setTime] = useState("");
  const [scroll, setScroll] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafScroll = useRef<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    const onScroll = () => {
      if (rafScroll.current != null) return;
      rafScroll.current = requestAnimationFrame(() => {
        rafScroll.current = null;
        setScroll(window.scrollY);
      });
    };
    updateTime();
    onScroll();
    const t = window.setInterval(updateTime, 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(t);
      window.removeEventListener("scroll", onScroll);
      if (rafScroll.current != null) cancelAnimationFrame(rafScroll.current);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const ready = () => setVideoReady(true);
    const tryPlay = () => v.play().catch(() => {});
    v.addEventListener("loadeddata", ready);
    v.addEventListener("canplay", ready);
    v.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();
    return () => {
      v.removeEventListener("loadeddata", ready);
      v.removeEventListener("canplay", ready);
      v.removeEventListener("canplay", tryPlay);
    };
  }, []);

  // Parallax sutil no vídeo conforme scroll
  const videoY = scroll * 0.3;
  const textY = scroll * 0.15;
  const fadeOut = Math.max(0, 1 - scroll / 600);

  return (
    <section
      id="top"
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-background"
    >
      {/* ===== FULLSCREEN VIDEO BG ===== */}
      <div className="absolute inset-0 z-0">
        {/* fallback enquanto carrega */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary-dark/30 to-background"
          style={{ opacity: videoReady ? 0 : 1, transition: "opacity 800ms ease" }}
        />
        <video
          ref={videoRef}
          src="/videos/cinematic-2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover video-crisp scale-110"
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 1000ms ease",
            transform: `translate3d(0, ${videoY}px, 0) scale(1.1)`,
          }}
        />

        {/* Color grade laranja cinematográfico */}
        <div
          className="absolute inset-0 mix-blend-color pointer-events-none"
          style={{
            background:
              "linear-gradient(160deg, hsl(27 90% 41% / 0.55), hsl(20 90% 22% / 0.45) 70%)",
          }}
        />

        {/* Vinheta — escurece bordas para legibilidade do texto */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 20%, hsl(0 0% 0% / 0.55) 75%, hsl(0 0% 0% / 0.85) 100%)",
          }}
        />

        {/* Gradient inferior para suavizar transição */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />

        {/* Grão / noise sutil */}
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-60" />
      </div>

      {/* ===== TOP HUD ===== */}
      <header className="absolute top-0 inset-x-0 z-30 pt-56 px-8 md:px-16">
        <div className="flex items-center justify-end text-[10px] uppercase tracking-[0.4em] text-foreground/70">
          <div className="hidden md:flex items-center gap-10 font-mono">
            <span className="text-primary tabular-nums text-xs">{time || "00:00:00"}</span>
            <span className="text-foreground/60">Brasil</span>
          </div>
        </div>
      </header>

      {/* ===== CENTERED MASSIVE HEADLINE ===== */}
      <div
        className="relative z-20 h-full w-full flex flex-col items-center justify-center px-4 text-center"
        style={{ transform: `translate3d(0, ${-textY}px, 0)`, opacity: fadeOut }}
      >
        <div
          className="font-display font-bold uppercase leading-[0.85] tracking-tight text-balance"
          style={{
            animation: "fade-up 1.1s cubic-bezier(0.22,1,0.36,1) both",
            textShadow: "0 4px 40px hsl(0 0% 0% / 0.5)",
          }}
        >
          <div className="text-[clamp(2.5rem,8.5vw,8.5rem)] block whitespace-nowrap">
            <span className="text-foreground">ASCENSÃO.</span>{" "}
            <span className="text-shimmer">CRIATIVA.</span>
          </div>
        </div>

        <div
          className="mt-12 md:mt-16 max-w-xl px-6"
          style={{ animation: "fade-up 1s 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <p className="text-sm md:text-base text-foreground/85 leading-relaxed tracking-wide">
            Do conceito ao mercado. Branding, direção criativa e identidade
            que <span className="text-primary font-medium">redefinem</span> categorias.
          </p>
        </div>
      </div>

      {/* ===== BOTTOM BAR — minimal info ===== */}
      <div
        className="absolute bottom-0 inset-x-0 z-20 px-8 md:px-16 pb-10 md:pb-12"
        style={{ opacity: fadeOut }}
      >
        <div className="flex items-end justify-between gap-8">
          {/* Scroll cue */}
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-foreground/60">
            <div className="relative h-10 w-px bg-foreground/20 overflow-hidden">
              <span
                className="absolute inset-x-0 top-0 h-1/2 bg-primary"
                style={{ animation: "scroll-cue 2s ease-in-out infinite" }}
              />
            </div>
            <span className="hidden md:inline">Role para descobrir</span>
          </div>

          {/* Slate / claquete info */}
          <div className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/55">
            <span>SCN 001</span>
            <span className="text-foreground/30">/</span>
            <span>Take 01</span>
            <span className="text-foreground/30">/</span>
            <span className="text-primary">24fps</span>
          </div>

          {/* CTA */}
          <a
            href="#contato"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-foreground/90 hover:text-primary transition-colors border-b border-foreground/40 hover:border-primary pb-2"
          >
            Iniciar projeto
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* Cinematic corner ticks */}
      <span className="absolute top-[11vh] left-8 w-4 h-4 border-l border-t border-primary/70 z-20" />
      <span className="absolute top-[11vh] right-8 w-4 h-4 border-r border-t border-primary/70 z-20" />
      <span className="absolute bottom-[3vh] left-8 w-4 h-4 border-l border-b border-primary/40 z-20" />
      <span className="absolute bottom-[3vh] right-8 w-4 h-4 border-r border-b border-primary/40 z-20" />
    </section>
  );
};
