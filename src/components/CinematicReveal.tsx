import { useEffect, useRef, useState } from "react";

/**
 * Cinematic full-screen video reveal using one of the uploaded videos.
 * It lazy-loads just before entering the viewport to keep the Hero fast.
 */
export const CinematicReveal = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
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
      { rootMargin: "35% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / Math.max(1, total)));
      setProgress(p);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
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

  const zoomPhase = progress < 0.5 ? progress / 0.5 : 1 - (progress - 0.5) / 0.5;
  const scale = 0.54 + zoomPhase * 0.46;
  const radius = 24 - zoomPhase * 22;
  const overlay = 0.62 - zoomPhase * 0.42;
  const labelOpacity = 1 - Math.min(1, zoomPhase * 1.35);
  const captionOpacity = Math.max(0, (zoomPhase - 0.4) / 0.6);

  return (
    <section
      ref={sectionRef}
      id="cinematic"
      className="relative"
      style={{ height: "300vh" }}
      aria-label="Vinheta cinematográfica"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(70% 50% at 50% 50%, hsl(27 90% 41% / 0.18), transparent 70%)",
            opacity: 0.35 + zoomPhase * 0.55,
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative h-full w-full overflow-hidden border border-primary/30 bg-background-secondary"
            style={{
              borderRadius: `${radius}px`,
              transform: `scale(${scale})`,
              willChange: "transform",
            }}
          >
            <div
              className="absolute inset-0 z-0 flex items-center justify-center"
              style={{ opacity: videoReady ? 0 : 1, transition: "opacity 400ms ease" }}
            >
              <div className="absolute inset-0 bg-radial-glow opacity-70" />
            </div>

            {shouldLoad && (
              <video
                ref={videoRef}
                src="/videos/cinematic-1.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover video-crisp"
                style={{ opacity: videoReady ? 1 : 0, transition: "opacity 500ms ease" }}
              />
            )}

            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `hsl(0 0% 0% / ${overlay})` }}
            />
            <div
              className="absolute inset-x-0 top-0 bg-background pointer-events-none"
              style={{ height: `${zoomPhase * 6}vh` }}
            />
            <div
              className="absolute inset-x-0 bottom-0 bg-background pointer-events-none"
              style={{ height: `${zoomPhase * 6}vh` }}
            />
            <span className="absolute top-4 left-4 w-4 h-4 border-l border-t border-primary" />
            <span className="absolute top-4 right-4 w-4 h-4 border-r border-t border-primary" />
            <span className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-primary" />
            <span className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-primary" />
          </div>
        </div>

        {/* Take label removed */}

        <div
          className="absolute bottom-10 left-0 right-0 px-8 md:px-16 flex items-end justify-between pointer-events-none"
          style={{ opacity: captionOpacity }}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inset-0 rounded-full bg-primary"
                style={{ animation: "pulse-ring 1.8s ease-out infinite" }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/70">
              Take / 2026
            </span>
          </div>
          <div className="font-display text-xl md:text-3xl font-semibold text-right max-w-md leading-tight">
            Marcas que <span className="text-primary">ascendem</span> não competem.
            Definem o terreno.
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-px bg-border z-30">
          <div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
};
