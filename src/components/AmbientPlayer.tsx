import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, Music2, ChevronDown } from "lucide-react";
import ambientTrack from "@/assets/ambient-track.mp3";
import { cn } from "@/lib/utils";

/**
 * Ambient player — pílula compacta no header + popover flutuante com detalhes.
 *
 * - Áudio bundled via Vite (import) → 100% funcional em qualquer deploy.
 * - Auto-play disparado pelo evento `ac:intro-finished` (NetflixIntro).
 * - Nunca expande dentro da navbar — toda info adicional vai pro popover.
 */

const VOLUME_KEY = "ac-ambient-volume";
const DEFAULT_VOLUME = 0.4;

const formatTime = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

export const AmbientPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState<number>(() => {
    if (typeof window === "undefined") return DEFAULT_VOLUME;
    const stored = window.localStorage.getItem(VOLUME_KEY);
    const parsed = stored ? Number(stored) : NaN;
    return isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : DEFAULT_VOLUME;
  });
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);
  const [needsAttention, setNeedsAttention] = useState(false);

  // ───── Audio element setup ─────
  useEffect(() => {
    const audio = new Audio(ambientTrack);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setReady(true);
    };
    const onTime = () => setTime(audio.currentTime);
    const onPlay = () => {
      setPlaying(true);
      setNeedsAttention(false);
    };
    const onPause = () => setPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ───── Volume sync ─────
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    try {
      window.localStorage.setItem(VOLUME_KEY, String(volume));
    } catch { /* ignore */ }
  }, [volume]);

  // ───── Auto-play after intro finishes ─────
  useEffect(() => {
    const tryAutoplay = async () => {
      const audio = audioRef.current;
      if (!audio) return;
      try {
        await audio.play();
      } catch {
        setNeedsAttention(true);
      }
    };
    const onIntroDone = () => window.setTimeout(tryAutoplay, 750);
    window.addEventListener("ac:intro-finished", onIntroDone);
    return () => window.removeEventListener("ac:intro-finished", onIntroDone);
  }, []);

  // ───── Close popover on outside click / Esc ─────
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try { await audio.play(); } catch { setNeedsAttention(true); }
    } else {
      audio.pause();
    }
  }, []);

  const toggleMute = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }, []);

  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setTime(audio.currentTime);
  };

  const progress = duration ? (time / duration) * 100 : 0;
  const effectiveVolume = muted ? 0 : volume;

  return (
    <div ref={wrapperRef} className="relative hidden sm:block">
      {/* ───── Compact pill (always this size — never pushes navbar) ───── */}
      <div
        className={cn(
          "flex items-center gap-1 h-9 pl-1 pr-2 rounded-full",
          "border border-border/70 bg-background/50 backdrop-blur-md transition-all",
          needsAttention && "border-primary/70 shadow-[0_0_20px_-6px_hsl(var(--primary)/0.6)]",
        )}
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pausar trilha ambiente" : "Tocar trilha ambiente"}
          aria-pressed={playing}
          className={cn(
            "group relative flex items-center justify-center h-7 w-7 rounded-full transition-all",
            "bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground",
            needsAttention && "ring-2 ring-primary/60 animate-pulse",
          )}
        >
          {playing ? <Equalizer /> : <Play className="h-3.5 w-3.5 translate-x-[1px]" fill="currentColor" />}
          {playing && (
            <Pause
              className="absolute h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="currentColor"
            />
          )}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Ativar som" : "Silenciar"}
          className="flex items-center justify-center h-7 w-7 rounded-full text-foreground/60 hover:text-foreground hover:bg-card transition-colors"
        >
          {effectiveVolume === 0 ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        </button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir detalhes do player"
          aria-expanded={open}
          className={cn(
            "flex items-center justify-center h-7 w-6 rounded-full text-foreground/50 hover:text-foreground hover:bg-card transition-all",
            open && "text-foreground bg-card",
          )}
        >
          <ChevronDown
            className={cn("h-3 w-3 transition-transform duration-300", open && "rotate-180")}
          />
        </button>
      </div>

      {/* ───── Floating popover with details ───── */}
      <div
        className={cn(
          "absolute right-0 top-[calc(100%+10px)] w-[300px] origin-top-right",
          "rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-elevated",
          "transition-all duration-300 z-50",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        )}
        style={{ boxShadow: "var(--shadow-elevated)" }}
        role="dialog"
        aria-label="Detalhes do player"
      >
        {/* arrow */}
        <div className="absolute -top-1.5 right-6 h-3 w-3 rotate-45 bg-background border-l border-t border-border" />

        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.24em] text-foreground/50">
                <Music2 className="h-2.5 w-2.5" />
                <span>{playing ? "Tocando agora" : "Trilha ambiente"}</span>
              </div>
              <div className="mt-1 text-sm text-foreground font-medium truncate">
                Redbone
              </div>
              <div className="text-xs text-foreground/55 truncate">
                Lo-fi cover · AKAIA Music
              </div>
            </div>

            {/* Big artwork-ish play button with equalizer ring */}
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pausar" : "Tocar"}
              className={cn(
                "relative shrink-0 flex items-center justify-center h-12 w-12 rounded-full",
                "bg-gradient-to-br from-primary to-primary-dark text-primary-foreground",
                "shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)]",
                "transition-transform hover:scale-105 active:scale-95",
              )}
            >
              {playing ? (
                <Pause className="h-5 w-5" fill="currentColor" />
              ) : (
                <Play className="h-5 w-5 translate-x-[1.5px]" fill="currentColor" />
              )}
              {playing && (
                <span className="absolute inset-0 rounded-full ring-1 ring-primary/40 animate-ping" />
              )}
            </button>
          </div>

          {/* Scrub bar */}
          <div className="space-y-1.5">
            <div
              role="slider"
              aria-label="Posição da faixa"
              aria-valuemin={0}
              aria-valuemax={Math.floor(duration)}
              aria-valuenow={Math.floor(time)}
              tabIndex={0}
              onClick={onSeek}
              className="relative h-3 cursor-pointer flex items-center group/scrub"
            >
              <div className="absolute inset-x-0 h-[2px] rounded-full bg-border" />
              <div
                className="absolute left-0 h-[2px] rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary opacity-0 group-hover/scrub:opacity-100 transition-opacity"
                style={{ left: `${progress}%`, boxShadow: "0 0 0 3px hsl(var(--background))" }}
              />
            </div>
            <div className="flex justify-between text-[0.65rem] tabular-nums text-foreground/45">
              <span>{formatTime(time)}</span>
              <span>{ready ? formatTime(duration) : "—:—"}</span>
            </div>
          </div>

          {/* Volume row */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Ativar som" : "Silenciar"}
              className="flex items-center justify-center h-8 w-8 rounded-full text-foreground/70 hover:text-foreground hover:bg-card transition-colors shrink-0"
            >
              {effectiveVolume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={effectiveVolume}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                if (audioRef.current) {
                  audioRef.current.muted = false;
                  setMuted(false);
                }
              }}
              aria-label="Volume"
              className="ac-volume flex-1 h-1 appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                  effectiveVolume * 100
                }%, hsl(var(--border)) ${effectiveVolume * 100}%, hsl(var(--border)) 100%)`,
              }}
            />
            <span className="text-[0.65rem] tabular-nums text-foreground/45 w-8 text-right">
              {Math.round(effectiveVolume * 100)}%
            </span>
          </div>

          {/* Footer hint */}
          <div className="pt-2 border-t border-border/60 text-[0.62rem] uppercase tracking-[0.2em] text-foreground/40 text-center">
            trilha em loop · experiência ambiente
          </div>
        </div>
      </div>
    </div>
  );
};

/** Animated 4-bar equalizer rendered as SVG. */
const Equalizer = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="block">
    {[2, 5, 8, 11].map((x, i) => (
      <rect
        key={x}
        x={x - 0.75}
        width="1.5"
        rx="0.5"
        fill="currentColor"
        style={{
          transformOrigin: "center bottom",
          animation: `ac-eq 900ms ease-in-out ${i * 120}ms infinite alternate`,
          y: "4px",
          height: "6px",
        } as React.CSSProperties}
      />
    ))}
  </svg>
);
