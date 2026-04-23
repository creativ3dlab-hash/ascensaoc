import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "./Reveal";
import { useToast } from "@/hooks/use-toast";
import {
  MessageCircle,
  Send,
  Sparkles,
  ArrowUpRight,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999"; // E.164 sem +
const services = [
  "Identidade visual",
  "Branding completo",
  "Direção de arte",
  "Conteúdo audiovisual",
  "Site / Landing page",
  "Outro",
];

const budgets = ["Até 5k", "5k – 15k", "15k – 30k", "30k+"];

export const ContactForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState<string>("Identidade visual");
  const [budget, setBudget] = useState<string>("5k – 15k");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const waMessage = useMemo(() => {
    const lines = [
      "Olá, Ascensão Criativa ✨",
      "",
      `Nome: ${name || "—"}`,
      `Empresa: ${company || "—"}`,
      `E-mail: ${email || "—"}`,
      `Serviço: ${service}`,
      `Investimento: ${budget}`,
      "",
      `Briefing:`,
      message || "—",
    ];
    return encodeURIComponent(lines.join("\n"));
  }, [name, email, company, service, budget, message]);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "Preencha os campos essenciais",
        description: "Nome, e-mail e briefing são necessários para começarmos.",
      });
      return;
    }
    setSending(true);
    setTimeout(() => {
      window.open(waLink, "_blank", "noopener,noreferrer");
      toast({
        title: "Conversa iniciada no WhatsApp ✨",
        description: "Continuamos por lá em instantes.",
      });
      setSending(false);
    }, 400);
  };

  return (
    <section
      id="contato"
      className="relative py-32 md:py-44 border-t border-border overflow-hidden noise-overlay"
      style={{ background: "hsl(0 0% 3%)" }}
    >
      {/* ambient layers */}
      <div className="absolute inset-0 bg-radial-glow opacity-70 pointer-events-none" />
      <div className="absolute inset-0 grid-lines opacity-[0.07] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/[0.06] blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/[0.06] mb-8">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full size-2 bg-primary" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-primary">
                05 / Vamos conversar
              </span>
            </div>
          </Reveal>
          <Reveal delay={150} variant="mask">
            <h2 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] text-balance">
              Conte sua ideia. Respondemos em
              <span className="text-primary"> menos de 24h</span>.
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 text-foreground/60 leading-relaxed tracking-open max-w-xl mx-auto">
              Preencha o briefing e siga direto para o WhatsApp com tudo já preenchido —
              ou fale com a equipe agora mesmo.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-stretch max-w-6xl mx-auto">
          {/* Form */}
          <Reveal delay={200}>
            <form
              onSubmit={handleSubmit}
              className="relative rounded-3xl border border-border/80 bg-gradient-to-br from-card/60 via-card/30 to-background/40 backdrop-blur-xl p-8 md:p-12 hover:border-primary/40 transition-colors group/form overflow-hidden"
            >
              {/* corner ticks */}
              <span className="absolute top-4 left-4 w-4 h-4 border-l border-t border-primary/50" />
              <span className="absolute top-4 right-4 w-4 h-4 border-r border-t border-primary/50" />
              <span className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-primary/50" />
              <span className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-primary/50" />

              <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-primary/[0.08] blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-primary">
                      Briefing
                    </div>
                    <div className="font-display text-xl mt-1">Conte-nos sobre o projeto</div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                    <ShieldCheck className="size-3.5 text-primary/70" />
                    100% confidencial
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="bg-background/60 border-border/60 h-12 focus-visible:border-primary/60 focus-visible:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">
                      Empresa
                    </Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Marca / Projeto"
                      className="bg-background/60 border-border/60 h-12 focus-visible:border-primary/60 focus-visible:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@empresa.com"
                      className="bg-background/60 border-border/60 h-12 focus-visible:border-primary/60 focus-visible:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-3 sm:col-span-2">
                    <Label className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">
                      O que você precisa?
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => {
                        const active = service === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setService(s)}
                            className={`text-xs px-4 py-2 rounded-full border transition-all duration-300 tracking-open ${
                              active
                                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_24px_hsl(var(--primary)/0.4)]"
                                : "border-border/70 text-foreground/70 hover:text-foreground hover:border-foreground/40 hover:bg-foreground/5"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3 sm:col-span-2">
                    <Label className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">
                      Investimento estimado
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgets.map((b) => {
                        const active = budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBudget(b)}
                            className={`text-xs px-3 py-2.5 rounded-lg border transition-all duration-300 tabular-nums ${
                              active
                                ? "border-primary/60 bg-primary/10 text-primary"
                                : "border-border/60 text-foreground/65 hover:border-foreground/40"
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="message" className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">
                      Briefing rápido
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Conte sobre sua marca, objetivos e prazos…"
                      rows={5}
                      className="bg-background/60 border-border/60 resize-none focus-visible:border-primary/60 focus-visible:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between pt-6 border-t border-border/50">
                  <p className="text-xs text-foreground/50 tracking-open flex items-center gap-2">
                    <Sparkles className="size-3.5 text-primary" />
                    Resposta em até 24h úteis.
                  </p>
                  <Button type="submit" size="lg" disabled={sending} className="group min-w-[180px]">
                    {sending ? "Abrindo WhatsApp…" : "Enviar briefing"}
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </div>
              </div>
            </form>
          </Reveal>

          {/* Right rail */}
          <div className="flex flex-col gap-6">
            {/* WhatsApp CTA */}
            <Reveal delay={350}>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card/40 to-background p-8 md:p-10 overflow-hidden hover:border-primary/60 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-20px_hsl(var(--primary)/0.35)]"
              >
                <div className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/25 blur-3xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 grid-lines opacity-[0.08] pointer-events-none" />
                <span className="absolute top-4 left-4 w-3 h-3 border-l border-t border-primary/60" />
                <span className="absolute top-4 right-4 w-3 h-3 border-r border-t border-primary/60" />
                <span className="absolute bottom-4 left-4 w-3 h-3 border-l border-b border-primary/60" />
                <span className="absolute bottom-4 right-4 w-3 h-3 border-r border-b border-primary/60" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full size-2.5 bg-primary" />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.35em] text-primary">
                        Online agora
                      </span>
                    </div>
                    <ArrowUpRight className="size-5 text-foreground/60 group-hover:text-primary group-hover:rotate-12 transition-all duration-500" />
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="size-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/25 transition-all duration-500">
                      <MessageCircle className="size-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
                        Atendimento direto
                      </p>
                      <p className="font-display text-2xl">WhatsApp</p>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl leading-[1.1] mb-3">
                    Prefere falar agora?
                    <span className="block text-primary">Chame a equipe.</span>
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed tracking-open">
                    Tire dúvidas, peça referências ou agende uma call de diagnóstico.
                  </p>
                </div>

                <div className="relative z-10 mt-8">
                  <div className="flex items-center justify-between text-[11px] text-foreground/50 tracking-open mb-2">
                    <span>Tempo médio de resposta</span>
                    <span className="text-primary font-medium tabular-nums">~ 7 min</span>
                  </div>
                  <div className="h-px w-full bg-border/60 overflow-hidden">
                    <div className="h-full w-1/3 bg-primary group-hover:w-full transition-all duration-1000 ease-out" />
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Abrir conversa
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </a>
            </Reveal>

            {/* Info card */}
            <Reveal delay={450}>
              <div className="rounded-3xl border border-border/70 bg-card/30 backdrop-blur-sm p-7 md:p-8 space-y-5">
                <div className="text-[10px] uppercase tracking-[0.35em] text-primary mb-2">
                  Outros canais
                </div>

                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/45">
                      E-mail
                    </div>
                    <div className="text-sm text-foreground/85 truncate">
                      contato@ascensaocriativa.com
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Clock className="size-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/45">
                      Atendimento
                    </div>
                    <div className="text-sm text-foreground/85">
                      Seg – Sex · 9h às 19h
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/45">
                      Estúdio
                    </div>
                    <div className="text-sm text-foreground/85">
                      São Paulo · Remoto global
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-border/50 grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-display text-2xl font-semibold text-primary tabular-nums">
                      24h
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 mt-1">
                      Primeira resposta
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-semibold text-primary tabular-nums">
                      60+
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 mt-1">
                      Marcas atendidas
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
