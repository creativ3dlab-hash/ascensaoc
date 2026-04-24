import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * StackedSection
 *
 * Transição "cortina laranja": antes da próxima seção entrar, uma
 * cortina laranja sólida sobe e cobre toda a tela, depois revela
 * a nova seção por baixo. Inspirado no efeito de transição de
 * victordutra.art, adaptado à identidade laranja queimado do projeto.
 *
 * O wrapper renderiza:
 *  - um "spacer" antes da seção que cria o curso de scroll da cortina
 *  - uma cortina sticky full-screen (laranja) que sobe e desce
 *  - a própria seção logo abaixo
 */
type Props = {
  children: ReactNode;
  /** Altura do "curso" da transição em vh. */
  travel?: number;
  id?: string;
  className?: string;
  /** Texto opcional exibido no centro da cortina (ex: "02 / cases"). */
  label?: string;
};

export const StackedSection = ({
  children,
  travel = 90,
  id,
  className = "",
  label,
}: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0 → cortina embaixo, 0.5 → cobre tudo, 1 → revelou
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Total de scroll dentro do spacer.
      const total = (travel / 100) * vh;
      // Quanto já rolamos dentro do spacer (top do wrapper subindo).
      const scrolled = -r.top;
      const raw = scrolled / Math.max(1, total);
      setP(Math.max(0, Math.min(1, raw)));
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
  }, [travel]);

  // Curva de movimento da cortina:
  // p=0   → cortina 100% abaixo (translateY 100%)
  // p=0.5 → cortina cobre tudo (translateY 0%)
  // p=1   → cortina sobe e some (translateY -100%)
  const translate = p < 0.5 ? 100 - p * 2 * 100 : -((p - 0.5) * 2 * 100);
  // Curvatura superior: arredondada quando entrando, plana ao cobrir,
  // arredondada de novo na saída (borda inferior).
  const topRadius = p < 0.5 ? 64 * (1 - p * 2) : 0;
  const bottomRadius = p > 0.5 ? 64 * ((p - 0.5) * 2) : 0;
  // Pico de "presença" no meio do movimento.
  const peak = 1 - Math.abs(p - 0.5) * 2; // 0 → 1 → 0
  const labelOpacity = Math.max(0, peak * 1.4 - 0.2);

  return (
    <div
      id={id}
      ref={wrapRef}
      className={`relative ${className}`}
      style={{ marginTop: `-${travel}vh` }}
    >
      {/* Spacer que cria o curso de scroll para a cortina */}
      <div style={{ height: `${travel}vh` }} aria-hidden />

      {/* Cortina sticky full-screen */}
      <div
        aria-hidden
        className="sticky top-0 left-0 w-full h-0 pointer-events-none z-40"
        style={{ marginBottom: 0 }}
      >
        <div
          className="absolute left-0 right-0 top-0 h-screen overflow-hidden"
          style={{
            transform: `translate3d(0, ${translate}%, 0)`,
            willChange: "transform",
            background: `linear-gradient(180deg,
              hsl(28 84% 48%) 0%,
              hsl(27 90% 41%) 55%,
              hsl(27 90% 33%) 100%)`,
            borderTopLeftRadius: `${topRadius}px`,
            borderTopRightRadius: `${topRadius}px`,
            borderBottomLeftRadius: `${bottomRadius}px`,
            borderBottomRightRadius: `${bottomRadius}px`,
            boxShadow: `
              0 -20px 60px -10px hsl(27 90% 41% / 0.55),
              0 20px 60px -10px hsl(27 90% 41% / 0.55)
            `,
          }}
        >
          {/* Brilho radial sutil */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, hsl(28 84% 58% / 0.55), transparent 70%)",
              mixBlendMode: "screen",
            }}
          />
          {/* Grão / textura sutil para não parecer flat */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              mixBlendMode: "overlay",
            }}
          />
          {/* Linhas de luz nas bordas */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(40 100% 75% / 0.9), transparent)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(20 90% 25% / 0.9), transparent)",
            }}
          />

          {/* Label central opcional */}
          {label && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: labelOpacity }}
            >
              <div className="text-center">
                <div className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary-foreground/80 mb-3">
                  próxima cena
                </div>
                <div className="font-display text-3xl md:text-6xl font-bold text-primary-foreground tracking-tight">
                  {label}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo real da seção */}
      <div className="relative z-0">{children}</div>
    </div>
  );
};
