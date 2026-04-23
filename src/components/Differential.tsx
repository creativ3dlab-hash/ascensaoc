import { Reveal } from "./Reveal";

const points = [
  {
    n: "01",
    title: "Método antes de estética",
    body: "Trabalhamos a partir de pesquisa, posicionamento e arquitetura de marca. Design é consequência.",
  },
  {
    n: "02",
    title: "Time sênior, sem terceirização",
    body: "Quem apresenta é quem executa. Direção criativa presente em todas as etapas.",
  },
  {
    n: "03",
    title: "Sistemas, não peças soltas",
    body: "Entregamos linguagem visual escalável, pronta para crescer com sua operação.",
  },
];

const process = ["Diagnóstico", "Estratégia", "Sistema", "Lançamento"];

export const Differential = () => {
  return (
    <section id="diferencial" className="relative py-32 border-t border-border overflow-hidden">
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-32 self-start">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">03 / Diferencial</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight text-balance">
            Não somos uma agência.
            <br />
            Somos um <span className="text-primary">estúdio de posicionamento</span>.
          </h2>
          <p className="mt-8 text-foreground/60 leading-relaxed tracking-open max-w-md">
            Trabalhamos com poucos clientes por trimestre para garantir profundidade,
            consistência e resultado mensurável.
          </p>

          {/* process timeline */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">Processo</div>
            <div className="space-y-3">
              {process.map((p, i) => (
                <div key={p} className="flex items-center gap-4 group">
                  <span className="text-primary text-xs tabular-nums">0{i + 1}</span>
                  <span className="h-px flex-1 bg-border relative overflow-hidden">
                    <span className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-primary transition-all duration-700" />
                  </span>
                  <span className="text-sm text-foreground/70 tracking-open">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7 space-y-px">
          {points.map((p, i) => (
            <Reveal key={p.n} delay={i * 120}>
              <div className="grid grid-cols-12 gap-6 py-10 border-t border-border first:border-t-0 group hover:border-primary/40 transition-colors">
                <span className="col-span-2 text-primary font-display text-sm tabular-nums pt-1 group-hover:scale-125 transition-transform origin-left">
                  {p.n}
                </span>
                <div className="col-span-10">
                  <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 group-hover:translate-x-2 transition-transform duration-500">
                    {p.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed tracking-open max-w-md">
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
