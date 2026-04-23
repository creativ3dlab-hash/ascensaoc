import { useState } from "react";
import { Reveal } from "./Reveal";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";
import case4 from "@/assets/case-4.jpg";
import { ArrowUpRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type CaseItem = {
  num: string;
  client: string;
  category: string;
  year: string;
  scope: string;
  img: string;
  tagline: string;
  challenge: string;
  approach: string;
  results: { k: string; l: string }[];
  deliverables: string[];
};

const cases: CaseItem[] = [
  {
    num: "01",
    client: "Helio Studio",
    category: "Branding · Web",
    year: "2024",
    scope: "Estúdio de fotografia editorial",
    img: case1,
    tagline: "Luz como linguagem. Silêncio como direção.",
    challenge:
      "Posicionar um estúdio jovem entre nomes consolidados sem perder a alma autoral que já o diferenciava no portfólio.",
    approach:
      "Construímos uma identidade reduzida ao essencial: tipografia editorial, paleta de pigmentos minerais e uma malha modular que respira. O site virou uma revista — não um catálogo.",
    results: [
      { k: "+312%", l: "Tráfego direto" },
      { k: "4.9★", l: "Reputação" },
      { k: "08", l: "Semanas" },
    ],
    deliverables: ["Posicionamento", "Identidade visual", "Website editorial", "Direção fotográfica"],
  },
  {
    num: "02",
    client: "Norte Capital",
    category: "Identidade · Estratégia",
    year: "2024",
    scope: "Boutique de investimentos",
    img: case2,
    tagline: "Confiança não se diz. Se compõe.",
    challenge:
      "Traduzir rigor financeiro em uma marca que parecesse premium sem cair no clichê institucional cinza-azulado do setor.",
    approach:
      "Sistema visual ancorado em geometria clássica e tipografia serifada moderna. Construímos hierarquia editorial em todos os materiais — do pitch deck ao app interno.",
    results: [
      { k: "2.4×", l: "Ticket médio" },
      { k: "98%", l: "Retenção" },
      { k: "12", l: "Semanas" },
    ],
    deliverables: ["Diagnóstico estratégico", "Brand book", "Sistema de aplicações", "Pitch & sales deck"],
  },
  {
    num: "03",
    client: "Atlas Arquitetura",
    category: "Sistema Visual",
    year: "2023",
    scope: "Escritório de arquitetura residencial",
    img: case3,
    tagline: "A planta antes do desenho. O conceito antes do nome.",
    challenge:
      "Unificar dez anos de projetos dispersos em uma identidade que conversasse com clientes de alto padrão sem se render à frieza do mercado.",
    approach:
      "Criamos uma malha geométrica que ecoa as plantas baixas dos próprios projetos. A marca virou ferramenta — cada material é gerado a partir do mesmo grid raiz.",
    results: [
      { k: "+180%", l: "Leads qualificados" },
      { k: "06", l: "Prêmios" },
      { k: "10", l: "Semanas" },
    ],
    deliverables: ["Sistema visual modular", "Manual de marca", "Editorial impresso", "Apresentações"],
  },
  {
    num: "04",
    client: "Forma Magazine",
    category: "Editorial · Digital",
    year: "2023",
    scope: "Publicação independente de design",
    img: case4,
    tagline: "Conteúdo merece arquitetura. Não decoração.",
    challenge:
      "Lançar uma revista de design independente que sobrevivesse fora do impresso, com presença digital tão refinada quanto a edição física.",
    approach:
      "Direção editorial integrada: o mesmo sistema tipográfico atravessa a revista, o site e o app de leitura. Cada edição ganha um tema visual, mas o esqueleto permanece.",
    results: [
      { k: "24k+", l: "Assinantes" },
      { k: "08", l: "Edições" },
      { k: "16", l: "Semanas" },
    ],
    deliverables: ["Identidade editorial", "Plataforma digital", "App de leitura", "Curadoria visual"],
  },
];

export const Cases = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const open = openIdx !== null ? cases[openIdx] : null;

  return (
    <section id="cases" className="relative py-32 border-t border-border overflow-hidden [content-visibility:auto] [contain-intrinsic-size:1100px]">
      {/* premium minimalist marquee */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
        <div className="flex whitespace-nowrap animate-marquee py-4">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 pr-12">
              {[
                { w: "Branding", n: "01" },
                { w: "Estratégia", n: "02" },
                { w: "Editorial", n: "03" },
                { w: "Direção de Arte", n: "04" },
                { w: "Web Design", n: "05" },
                { w: "Posicionamento", n: "06" },
                { w: "Sistema Visual", n: "07" },
              ].map((it, i) => (
                <span key={`${k}-${i}`} className="inline-flex items-center gap-3">
                  <span className="font-display text-[9px] tabular-nums text-primary/60 tracking-[0.4em]">{it.n}</span>
                  <span className="text-[11px] uppercase tracking-[0.4em] text-foreground/55 font-light">
                    {it.w}
                  </span>
                  <span className="inline-block h-px w-6 bg-foreground/15" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ambient */}
      <div
        className="pointer-events-none absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(27 90% 41% / 0.18), transparent 60%)" }}
      />

      <div className="container pt-20 relative">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <Reveal className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs uppercase tracking-[0.35em] text-primary">02 — Cases selecionados</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05] text-balance">
              Marcas construídas <br className="hidden md:block" />
              com <span className="text-primary italic">precisão</span>.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-sm text-foreground/60 max-w-sm tracking-open">
              Selecionamos projetos onde podemos atuar do posicionamento à execução,
              do conceito até o último pixel.
            </p>
          </Reveal>
        </div>

        {/* IMMERSIVE INDEX — editorial list with hover preview */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: list */}
          <div className="lg:col-span-7 relative">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-foreground/40 pb-4 border-b border-border/60 mb-2">
              <span>Cliente</span>
              <span className="hidden md:inline">Disciplina</span>
              <span>Ano</span>
            </div>

            <ul>
              {cases.map((c, i) => {
                const isHover = hoverIdx === i;
                return (
                  <li key={c.num} className="border-b border-border/60 last:border-b-0">
                    <button
                      onClick={() => setOpenIdx(i)}
                      onMouseEnter={() => setHoverIdx(i)}
                      onMouseLeave={() => setHoverIdx(null)}
                      onFocus={() => setHoverIdx(i)}
                      onBlur={() => setHoverIdx(null)}
                      className="group relative w-full text-left py-7 md:py-9 overflow-hidden"
                    >
                      {/* sweep highlight */}
                      <span
                        aria-hidden
                        className={`absolute inset-y-0 left-0 origin-left transition-transform duration-700 ${
                          isHover ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={{
                          width: "100%",
                          background:
                            "linear-gradient(90deg, hsl(27 90% 41% / 0.10) 0%, hsl(27 90% 41% / 0.02) 50%, transparent 100%)",
                        }}
                      />

                      <div className="relative grid grid-cols-12 items-center gap-4">
                        {/* num */}
                        <span
                          className={`col-span-1 font-display text-[11px] tabular-nums tracking-[0.3em] transition-colors duration-500 ${
                            isHover ? "text-primary" : "text-foreground/35"
                          }`}
                        >
                          {c.num}
                        </span>

                        {/* client */}
                        <div className="col-span-7 md:col-span-6 flex items-center gap-5 min-w-0">
                          <span
                            className={`h-px transition-all duration-700 shrink-0 ${
                              isHover ? "w-10 bg-primary" : "w-4 bg-foreground/25"
                            }`}
                          />
                          <span
                            className="font-display font-semibold leading-none tracking-tight transition-all duration-500 truncate"
                            style={{
                              fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)",
                              color: isHover ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.65)",
                              transform: isHover ? "translateX(8px)" : "translateX(0)",
                            }}
                          >
                            {c.client}
                          </span>
                        </div>

                        {/* category */}
                        <span
                          className={`hidden md:block col-span-3 text-[11px] uppercase tracking-[0.3em] transition-colors duration-500 ${
                            isHover ? "text-foreground/85" : "text-foreground/45"
                          }`}
                        >
                          {c.category}
                        </span>

                        {/* year + arrow */}
                        <div className="col-span-4 md:col-span-2 flex items-center justify-end gap-4">
                          <span
                            className={`font-display text-xs tabular-nums tracking-[0.2em] transition-colors duration-500 ${
                              isHover ? "text-primary" : "text-foreground/45"
                            }`}
                          >
                            {c.year}
                          </span>
                          <ArrowUpRight
                            className={`w-5 h-5 transition-all duration-500 ${
                              isHover
                                ? "text-primary translate-x-0 -translate-y-0 opacity-100"
                                : "text-foreground/30 -translate-x-2 translate-y-2 opacity-40 group-hover:opacity-80"
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT: floating preview */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-card-border bg-card">
                {/* corner ticks */}
                <span className="absolute top-3 left-3 w-3 h-3 border-l border-t border-primary/70 z-30" />
                <span className="absolute top-3 right-3 w-3 h-3 border-r border-t border-primary/70 z-30" />
                <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-primary/70 z-30" />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-primary/70 z-30" />

                {/* layered images crossfade */}
                {cases.map((c, i) => {
                  const visible = (hoverIdx ?? 0) === i;
                  return (
                    <div
                      key={c.num}
                      className="absolute inset-0 transition-opacity duration-700"
                      style={{ opacity: visible ? 1 : 0 }}
                    >
                      <img
                        src={c.img}
                        alt={c.client}
                        className="w-full h-full object-cover"
                        style={{ transform: visible ? "scale(1.04)" : "scale(1)", transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    </div>
                  );
                })}

                {/* meta overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                  <div
                    key={`meta-${hoverIdx ?? 0}`}
                    style={{ animation: "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
                  >
                    <div className="text-[10px] uppercase tracking-[0.35em] text-primary mb-2">
                      {cases[hoverIdx ?? 0].category}
                    </div>
                    <div className="font-display text-2xl font-semibold leading-tight mb-2">
                      {cases[hoverIdx ?? 0].client}
                    </div>
                    <p className="text-xs text-foreground/65 italic tracking-open">
                      “{cases[hoverIdx ?? 0].tagline}”
                    </p>
                  </div>
                </div>

                {/* index */}
                <div className="absolute top-4 right-4 z-20 font-display text-[10px] tabular-nums tracking-[0.3em] text-foreground/60 bg-background/40 backdrop-blur-md border border-border/60 rounded-sm px-2.5 py-1">
                  {String((hoverIdx ?? 0) + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
                </div>
              </div>

              <p className="mt-5 text-[10px] uppercase tracking-[0.4em] text-foreground/40 text-center">
                Clique para abrir o estudo de caso
              </p>
            </div>
          </div>
        </div>

        <Reveal delay={200} className="mt-20 flex justify-center">
          <a href="#contato" className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-foreground/70 hover:text-primary transition-colors">
            <span className="h-px w-12 bg-current" />
            Conversar sobre seu projeto
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>
        </Reveal>
      </div>

      {/* PREMIUM CASE MODAL */}
      <Dialog open={openIdx !== null} onOpenChange={(v) => !v && setOpenIdx(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden border-card-border bg-background gap-0">
          {open && (
            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[88vh] overflow-y-auto">
              {/* close */}
              <button
                onClick={() => setOpenIdx(null)}
                aria-label="Fechar"
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* IMAGE column */}
              <div className="md:col-span-5 relative min-h-[280px] md:min-h-full">
                <img src={open.img} alt={open.client} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/40" />

                {/* corner ticks */}
                <span className="absolute top-4 left-4 w-3 h-3 border-l border-t border-primary/70" />
                <span className="absolute bottom-4 left-4 w-3 h-3 border-l border-b border-primary/70" />

                {/* big num */}
                <div className="absolute top-6 left-6 font-display text-[10px] tabular-nums tracking-[0.4em] text-primary">
                  Case · {open.num} / {String(cases.length).padStart(2, "0")}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-primary mb-2">
                    {open.category} · {open.year}
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-semibold leading-tight mb-2">
                    {open.client}
                  </div>
                  <div className="text-xs text-foreground/60 tracking-open">
                    {open.scope}
                  </div>
                </div>
              </div>

              {/* CONTENT column */}
              <div className="md:col-span-7 p-8 md:p-10 lg:p-12 relative">
                {/* corner ticks */}
                <span className="absolute top-4 right-4 w-3 h-3 border-r border-t border-primary/70" />
                <span className="absolute bottom-4 right-4 w-3 h-3 border-r border-b border-primary/70" />

                {/* tagline */}
                <p className="font-display italic text-xl md:text-2xl text-primary/90 leading-snug mb-8 max-w-lg">
                  “{open.tagline}”
                </p>

                {/* challenge */}
                <div className="mb-7">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/45 mb-3">
                    Desafio
                  </div>
                  <p className="text-sm md:text-[15px] text-foreground/80 leading-relaxed tracking-open">
                    {open.challenge}
                  </p>
                </div>

                {/* approach */}
                <div className="mb-9">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/45 mb-3">
                    Abordagem
                  </div>
                  <p className="text-sm md:text-[15px] text-foreground/80 leading-relaxed tracking-open">
                    {open.approach}
                  </p>
                </div>

                {/* results */}
                <div className="mb-9">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/45 mb-4">
                    Resultados
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {open.results.map((r) => (
                      <div
                        key={r.l}
                        className="rounded-md border border-card-border bg-card/60 p-4 text-center"
                      >
                        <div className="font-display text-xl md:text-2xl font-bold tabular-nums text-foreground leading-none">
                          {r.k}
                        </div>
                        <div className="text-[9px] uppercase tracking-[0.3em] text-foreground/50 mt-2">
                          {r.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* deliverables */}
                <div className="mb-8">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/45 mb-3">
                    Entregas
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {open.deliverables.map((d) => (
                      <span
                        key={d}
                        className="text-[11px] uppercase tracking-[0.25em] text-foreground/75 border border-border/70 rounded-full px-3 py-1.5"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contato"
                  onClick={() => setOpenIdx(null)}
                  className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-foreground hover:text-primary transition-colors"
                >
                  <span className="h-px w-8 bg-foreground/30 group-hover:w-14 group-hover:bg-primary transition-all duration-500" />
                  Quero algo assim para minha marca
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
