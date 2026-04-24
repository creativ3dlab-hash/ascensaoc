import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#cases", label: "Cases" },
  { href: "#diferencial", label: "Diferencial" },
  { href: "#jornada", label: "Jornada" },
  { href: "#contato", label: "Contato" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center" aria-label="Ascensão Criativa">
          <Logo withWordmark />
        </div>
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors tracking-open"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button asChild variant="default" size="sm" className="hidden sm:inline-flex">
          <a href="#contato">Falar com a equipe</a>
        </Button>
      </div>
    </header>
  );
};
