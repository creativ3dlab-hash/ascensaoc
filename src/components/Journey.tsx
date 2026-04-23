import { useState } from "react";
import { Reveal } from "./Reveal";
import { Lightbulb, Compass, Layers, Rocket, HeartHandshake } from "lucide-react";

const stages = [
  {
    icon: Lightbulb,
    label: "Ideação",
    title: "Da primeira ideia ao território",
    body: "Mergulhamos no universo do seu cliente para mapear desejos, dores e oportunidades reais.",
    duration: "Semana 01",
  },
  {
    icon: Compass,
    label: "Estratégia",
    title: "Posicionamento que orienta",
    body: "Definimos território de marca, narrativa e prova de valor antes de tocar em qualquer pixel.",
    duration: "Semana 02 – 03",
  },
  {
    icon: Layers,
    label: "Sistema",
    title: "Identidade que escala",
    body: "Construímos um sistema visual e verbal pronto para crescer com a sua operação.",
    duration: "Semana 04 – 06",
  },
  {
    icon: Rocket,
    label: "Lançamento",
    title: "Entrada com presença",
    body: "Coordenamos rollout em todos os pontos de contato — do digital ao físico — sem ruído.",
    duration: "Semana 07 – 08",
  },
  {
    icon: HeartHandshake,
    label: "Pós-venda",
    title: "Acompanhamento contínuo",
    body: "Permanecemos por perto: ajustes, evolução de marca e suporte para cada nova fase do negócio.",
    duration: "Sempre",
  },
];

export const Journey = () => {
  const [active, setActive] = useState(0);
  const Icon = stages[active].icon;

  return (
    <section
      id="jornada"
      className="relative py-32 md:py-40 border-t border-border overflow-hidden"
    >
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 grid-lines opacity-[0.04] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="container relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-end">
          <Reveal className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              04 / Jornada do Consumidor
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
              Caminhamos lado a lado.
              <br />
              Da <span className="text-primary">ideia</span> ao{" "}
              <span className="text-primary">pós-venda</span>.
            </h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <p className="text-foreground/65 leading-relaxed tracking-open">
              Não entregamos e desaparecemos. Acompanhamos cada etapa da
              experiência do seu cliente, garantindo coerência, evolução e
              suporte real depois do lançamento.
            </p>
          </Reveal>
        </div>

        {/* Interactive stage selector */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
            {stages.map((s, i) => {
              const StageIcon = s.icon;
              const isActive = active === i;
              return (
                <button
                  key={s.label}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative overflow-hidden rounded-xl border p-5 text-left transition-all duration-500 ${
                    isActive
                      ? "border-primary/60 bg-primary/[0.06] shadow-[0_0_40px_-12px_hsl(var(--primary)/0.45)]"
                      : "border-border/60 bg-card/30 hover:border-foreground/30"
                  }`}
                >
                  {/* top progress ribbon */}
                  <span
                    className={`absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                        isActive
                          ? "border-primary/70 bg-primary/15 scale-110"
                          : "border-border/70 bg-background-secondary group-hover:border-foreground/40"
                      }`}
                    >
                      <StageIcon
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-foreground/70"
                        }`}
                        strokeWidth={1.4}
                      />
                      {isActive && (
                        <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping" />
                      )}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.25em] tabular-nums text-foreground/50">
                      0{i + 1}
                    </span>
                  </div>
                  <div
                    className={`text-[10px] uppercase tracking-[0.3em] mb-1 transition-colors ${
                      isActive ? "text-primary" : "text-foreground/55"
                    }`}
                  >
                    {s.label}
                  </div>
                  <div className="text-[11px] text-foreground/40 tracking-open">
                    {s.duration}
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active stage detail */}
        <Reveal>
          <div
            key={active}
            className="relative rounded-2xl border border-border/70 bg-gradient-to-br from-card/60 via-card/30 to-background overflow-hidden animate-fade-in"
          >
            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 p-8 md:p-14 items-center">
              <div className="md:col-span-4 flex md:flex-col items-center md:items-start gap-6">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-primary/40 bg-background/60 backdrop-blur-sm">
                  <Icon className="w-10 h-10 text-primary" strokeWidth={1.3} />
                  <span className="absolute inset-0 rounded-full border border-primary/20 animate-ping" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-2">
                    Etapa 0{active + 1}
                  </div>
                  <div className="font-display text-xl font-semibold">
                    {stages[active].label}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-foreground/45 mt-1">
                    {stages[active].duration}
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 md:pl-8 md:border-l md:border-border/60">
                <h3 className="font-display text-2xl md:text-4xl font-semibold leading-tight text-balance">
                  {stages[active].title}
                </h3>
                <p className="mt-5 text-foreground/65 leading-relaxed tracking-open max-w-2xl">
                  {stages[active].body}
                </p>

                {/* progress dots */}
                <div className="mt-10 flex items-center gap-2">
                  {stages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Ir para etapa ${i + 1}`}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === active
                          ? "w-10 bg-primary"
                          : "w-4 bg-border hover:bg-foreground/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Closing card */}
        <Reveal delay={120}>
          <div className="mt-20 border border-card-border rounded-2xl p-8 md:p-12 bg-background-secondary/40 grid grid-cols-1 md:grid-cols-12 gap-8 items-center backdrop-blur-sm">
            <div className="md:col-span-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
                Suporte vitalício
              </span>
              <h3 className="mt-3 font-display text-2xl md:text-3xl font-semibold leading-tight text-balance">
                Toda marca que cresce precisa de quem caminhe junto.
              </h3>
              <p className="mt-4 text-foreground/65 leading-relaxed tracking-open max-w-xl">
                Após o lançamento, mantemos uma frente de cuidado contínuo:
                evolução do sistema visual, novos pontos de contato e
                acompanhamento direto com sua equipe.
              </p>
            </div>
            <div className="md:col-span-4 grid grid-cols-2 gap-6">
              <div>
                <div className="font-display text-3xl font-semibold text-primary tabular-nums">
                  100%
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/55 mt-2">
                  Retenção
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-semibold text-primary tabular-nums">
                  24h
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/55 mt-2">
                  Resposta média
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
