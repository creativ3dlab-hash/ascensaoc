import { useEffect, useRef, useState } from "react";

/**
 * Fixed full-viewport backdrop that morphs through black/orange
 * gradient stops as the user scrolls. Sits behind all sections.
 */
const STOPS = [
  // hero — pure deep black
  { a: "hsl(0 0% 4%)", b: "hsl(0 0% 6%)", glow: "hsl(27 90% 41% / 0.08)", gx: 80, gy: 10 },
  // cinematic — barely-there ember
  { a: "hsl(20 18% 5%)", b: "hsl(0 0% 5%)", glow: "hsl(27 80% 40% / 0.10)", gx: 20, gy: 30 },
  // services — orange whisper from the right
  { a: "hsl(0 0% 5%)", b: "hsl(22 22% 6%)", glow: "hsl(27 85% 42% / 0.12)", gx: 90, gy: 50 },
  // cases — back to ink
  { a: "hsl(0 0% 4%)", b: "hsl(0 0% 6%)", glow: "hsl(27 80% 40% / 0.08)", gx: 50, gy: 20 },
  // showcase — warm undertone (low luminance, text stays white-readable)
  { a: "hsl(22 28% 6%)", b: "hsl(20 22% 5%)", glow: "hsl(28 85% 45% / 0.16)", gx: 70, gy: 70 },
  // differential — deep contrast
  { a: "hsl(0 0% 5%)", b: "hsl(0 0% 7%)", glow: "hsl(27 80% 40% / 0.08)", gx: 30, gy: 60 },
  // journey — golden hour, but kept dark
  { a: "hsl(22 25% 5.5%)", b: "hsl(24 28% 6%)", glow: "hsl(28 85% 45% / 0.14)", gx: 50, gy: 40 },
  // testimonials — ink with halo
  { a: "hsl(0 0% 4%)", b: "hsl(20 18% 5%)", glow: "hsl(27 80% 42% / 0.10)", gx: 80, gy: 60 },
  // contact — final ember (still dark base, larger glow)
  { a: "hsl(22 30% 6%)", b: "hsl(20 22% 5%)", glow: "hsl(28 85% 48% / 0.18)", gx: 50, gy: 80 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const parseHsl = (str: string): [number, number, number, number] => {
  // hsl(H S% L%) or hsl(H S% L% / A)
  const m = str.match(/hsl\(([^)]+)\)/);
  if (!m) return [0, 0, 0, 1];
  const parts = m[1].replace("/", " ").split(/\s+/).filter(Boolean);
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]);
  const l = parseFloat(parts[2]);
  const a = parts[3] ? parseFloat(parts[3]) : 1;
  return [h, s, l, a];
};

const blendHsl = (c1: string, c2: string, t: number) => {
  const [h1, s1, l1, a1] = parseHsl(c1);
  const [h2, s2, l2, a2] = parseHsl(c2);
  return `hsl(${lerp(h1, h2, t).toFixed(1)} ${lerp(s1, s2, t).toFixed(1)}% ${lerp(l1, l2, t).toFixed(1)}% / ${lerp(a1, a2, t).toFixed(3)})`;
};

export const ScrollBackdrop = () => {
  const [p, setP] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
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

  const segments = STOPS.length - 1;
  const pos = p * segments;
  const i = Math.min(segments - 1, Math.floor(pos));
  const t = pos - i;
  const s1 = STOPS[i];
  const s2 = STOPS[i + 1];

  const a = blendHsl(s1.a, s2.a, t);
  const b = blendHsl(s1.b, s2.b, t);
  const glow = blendHsl(s1.glow, s2.glow, t);
  const gx = lerp(s1.gx, s2.gx, t);
  const gy = lerp(s1.gy, s2.gy, t);

  // Tone is kept "ink" everywhere — backdrop stays dark enough that
  // foreground white remains readable; switching tone caused fade-out.
  useEffect(() => {
    document.documentElement.setAttribute("data-tone", "ink");
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: `
          radial-gradient(60% 50% at ${gx}% ${gy}%, ${glow}, transparent 70%),
          linear-gradient(180deg, ${a} 0%, ${b} 100%)
        `,
      }}
    />
  );
};
