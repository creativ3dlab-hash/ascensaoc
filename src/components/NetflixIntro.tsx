import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo-optimized.png";

interface IntroProps {
  onFinish: () => void;
}

const STORAGE_KEY = "ac-intro-played";

/**
 * Netflix-style intro: fullscreen video with the studio's cinematic-1 reel.
 * Plays once per session (cached in sessionStorage). Skippable by click or key.
 */
export const NetflixIntro = ({ onFinish }: IntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const finish = () => {
    if (exiting) return;
    setExiting(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    window.setTimeout(() => onFinish(), 700);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => {
      if (!video.duration) return;
      setProgress(video.currentTime / video.duration);
    };
    const onEnded = () => finish();

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnded);
    video.play().catch(() => {});

    // Hard cap at 6s in case the file doesn't fire `ended`
    const cap = window.setTimeout(finish, 6000);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);

    // Lock scroll while playing
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnded);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(cap);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
      style={{
        opacity: exiting ? 0 : 1,
        transition: "opacity 700ms cubic-bezier(0.65, 0, 0.35, 1)",
      }}
      onClick={finish}
      role="presentation"
    >
      <video
        ref={videoRef}
        src="/videos/cinematic-1.mp4"
        autoPlay
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover video-crisp"
      />

      {/* warm grade + vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, hsl(27 90% 41% / 0.18), transparent 70%), radial-gradient(ellipse at center, transparent 50%, hsl(0 0% 0% / 0.7))",
        }}
      />

      {/* film grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, hsl(0 0% 100% / 0.05) 0 1px, transparent 1px 3px)",
        }}
      />

      {/* cinematic letterbox */}
      <div
        className="absolute inset-x-0 top-0 bg-background pointer-events-none"
        style={{
          height: "12vh",
          transform: exiting ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 700ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 bg-background pointer-events-none"
        style={{
          height: "12vh",
          transform: exiting ? "translateY(100%)" : "translateY(0)",
          transition: "transform 700ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />

      {/* Centered logo + wordmark */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <div
          className="relative flex h-28 w-28 md:h-32 md:w-32 items-center justify-center rounded-full border border-primary/40 backdrop-blur-sm bg-background/30"
          style={{
            opacity: progress > 0.05 ? 1 : 0,
            transform: `scale(${0.85 + Math.min(progress, 0.4) * 0.5})`,
            transition: "opacity 800ms ease, transform 1200ms ease",
          }}
        >
          <span className="absolute inset-0 rounded-full border border-primary/20 animate-ping" />
          <img src={logo} alt="Ascensão Criativa" className="h-16 w-16 md:h-20 md:w-20 object-contain" />
        </div>
        <div
          className="mt-7 font-display text-2xl md:text-4xl font-semibold tracking-wide-2"
          style={{
            opacity: Math.max(0, Math.min(1, (progress - 0.18) * 3)),
            transform: `translateY(${(1 - Math.min(1, progress * 2)) * 12}px)`,
            transition: "opacity 600ms ease, transform 600ms ease",
          }}
        >
          ASCENSÃO CRIATIVA
        </div>
        <div
          className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.5em] text-primary"
          style={{
            opacity: Math.max(0, Math.min(1, (progress - 0.32) * 3)),
            transition: "opacity 600ms ease",
          }}
        >
          Estúdio de Branding
        </div>
      </div>

      {/* Skip */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
        className="absolute top-6 right-6 z-20 text-[10px] uppercase tracking-[0.4em] text-foreground/70 hover:text-primary border border-border hover:border-primary/60 px-4 py-2 rounded-sm bg-background/40 backdrop-blur-sm transition-colors"
      >
        Pular intro
      </button>

      {/* progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border z-20">
        <div
          className="h-full bg-primary"
          style={{ width: `${progress * 100}%`, transition: "width 120ms linear" }}
        />
      </div>
    </div>
  );
};

export const shouldPlayIntro = () => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) !== "1";
};
