import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import logo from "@/assets/logo-optimized.png";

export const Hero = () => {
  const [scroll, setScroll] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [videoReady, setVideoReady] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const mouseFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (scrollFrameRef.current != null) return;
      scrollFrameRef.current = requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        setScroll(window.scrollY);
      });
    };

    const onMouse = (e: MouseEvent) => {
      if (!ref.current || mouseFrameRef.current != null) return;
      const r = ref.current.getBoundingClientRect();
      const next = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      };
      mouseFrameRef.current = requestAnimationFrame(() => {
        mouseFrameRef.current = null;
        setMouse(next);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      if (scrollFrameRef.current != null) cancelAnimationFrame(scrollFrameRef.current);
      if (mouseFrameRef.current != null) cancelAnimationFrame(mouseFrameRef.current);
    };
  }, []);

  useEffect(() => {
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
  }, []);

  const reveal = Math.min(1, scroll / 420);
  const videoScale = 0.9 + reveal * 0.1;
  const videoOpacity = videoReady ? 0.46 + reveal * 0.42 : 0;
  const veil = 0.82 - reveal * 0.22;

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 noise-overlay"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-background/60" />

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: videoReady ? 0 : 1, transition: "opacity 500ms ease" }}
        >
          <div className="absolute inset-0 bg-radial-glow opacity-80" />
          <div className="absolute inset-0 grid-lines opacity-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-primary/20 bg-background-secondary/40 backdrop-blur-md">
            <img src={logo} alt="" className="h-20 w-20 object-contain opacity-80" />
            <span className="absolute inset-0 rounded-full border border-primary/30 animate-pulse" />
          </div>
        </div>

        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `scale(${videoScale}) translate3d(0, ${scroll * 0.12}px, 0)`,
            opacity: videoOpacity,
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 70% at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0) 100%)",
            maskImage:
              "radial-gradient(ellipse 75% 70% at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0) 100%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          <video
            ref={videoRef}
            src="/videos/cinematic-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover video-crisp"
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, hsl(0 0% 5.5% / ${veil + 0.04}) 0%, hsl(0 0% 5.5% / ${Math.max(0, veil - 0.05)}) 50%, hsl(0 0% 5.5% / ${Math.min(1, veil + 0.12)}) 100%)`,
          }}
        />
        <span className="absolute top-[9vh] left-6 w-5 h-5 border-l border-t border-primary/70" />
        <span className="absolute top-[9vh] right-6 w-5 h-5 border-r border-t border-primary/70" />
        <span className="absolute bottom-[9vh] left-6 w-5 h-5 border-l border-b border-primary/70" />
        <span className="absolute bottom-[9vh] right-6 w-5 h-5 border-r border-b border-primary/70" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, hsl(27 90% 41% / 0.22), transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div
        className="absolute inset-0 grid-lines opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ transform: `translate3d(0, ${scroll * 0.08}px, 0)` }}
      />

      <div className="absolute top-[10vh] left-8 z-20 flex items-center gap-3 pointer-events-none">
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inset-0 rounded-full bg-primary"
            style={{ animation: "pulse-ring 1.6s ease-out infinite" }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/70">
          REC / Reel 01
        </span>
      </div>
      <div className="absolute top-[10vh] right-8 z-20 text-[10px] uppercase tracking-[0.4em] text-foreground/60 pointer-events-none">
        24fps / 2.39:1
      </div>

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 mb-8 animate-fade-up">
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Estúdio de Branding / Est. 2018
            </span>
          </div>

          <h1
            className="font-display font-semibold text-5xl md:text-7xl lg:text-[5.75rem] leading-[1.02] text-balance animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Posicionamos sua marca para
            <br />
            <span className="text-shimmer">vender mais</span>.
          </h1>

          <p
            className="mt-10 max-w-xl text-base md:text-lg text-foreground/75 leading-relaxed tracking-open animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            Identidade, narrativa e presença digital construídas com método.
            Sem ruído, sem genérico. Direção criativa de alto nível.
          </p>

          <div
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Button size="lg">Iniciar projeto</Button>
            <Button size="lg" variant="outline">Ver cases</Button>
          </div>

          <div
            className="mt-16 grid grid-cols-3 gap-6 max-w-md animate-fade-up"
            style={{ animationDelay: "0.65s" }}
          >
            {[
              { n: "60+", l: "Marcas" },
              { n: "12", l: "Prêmios" },
              { n: "8 anos", l: "Mercado" },
            ].map((s) => (
              <div key={s.l} className="border-l border-primary/40 pl-3">
                <div className="font-display text-2xl font-semibold">{s.n}</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/60 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="lg:col-span-4 relative animate-fade-up hidden lg:block"
          style={{ animationDelay: "0.4s", transform: `translate3d(0, ${scroll * -0.05}px, 0)` }}
        >
          <div className="relative ml-auto max-w-xs bg-background/40 backdrop-blur-xl border border-primary/30 rounded-md p-6 corner-ticks">
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
              Vinheta / Reel 2026
            </div>
            <div className="font-display text-2xl font-semibold leading-tight">
              Marcas que <span className="text-primary">ascendem</span> não competem.
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-card-border">
              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                Ascensão Criativa
              </span>
              <img src={logo} alt="" className="h-8 w-8 object-contain" />
            </div>
          </div>
          <div
            className="absolute -bottom-6 -left-2 bg-card border border-card-border px-5 py-3 rounded-md flex items-center gap-3"
            style={{ transform: `translate3d(0, ${scroll * -0.04}px, 0)` }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-primary" style={{ animation: "pulse-ring 1.8s ease-out infinite" }} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs text-foreground/70 tracking-[0.3em] uppercase">Design for Humans</span>
          </div>
        </div>
      </div>

    </section>
  );
};
