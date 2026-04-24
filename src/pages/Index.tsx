import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CinematicReveal } from "@/components/CinematicReveal";
import { Services } from "@/components/Services";
import { Cases } from "@/components/Cases";
import { ShowcaseVideo } from "@/components/ShowcaseVideo";
import { Differential } from "@/components/Differential";
import { Journey } from "@/components/Journey";
import { Testimonials } from "@/components/Testimonials";
import { ContactForm } from "@/components/ContactForm";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";
import { NetflixIntro, shouldPlayIntro } from "@/components/NetflixIntro";
import { ScrollBackdrop } from "@/components/ScrollBackdrop";
import { StackedSection } from "@/components/StackedSection";
import { Checkmate } from "@/components/Checkmate";

const Index = () => {
  const [introDone, setIntroDone] = useState(true);

  useEffect(() => {
    if (shouldPlayIntro()) setIntroDone(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ScrollBackdrop />
      {!introDone && <NetflixIntro onFinish={() => setIntroDone(true)} />}
      <Navbar />
      <main>
        <Hero />
        <StackedSection label="01 / serviços"><Services /></StackedSection>
        <StackedSection label="02 / cases"><Cases /></StackedSection>
        <StackedSection label="03 / diferencial"><Differential /></StackedSection>
        <StackedSection label="✦ / xeque-mate"><Checkmate /></StackedSection>
        {/* CinematicReveal usa sticky interno — não pode ficar dentro do StackedSection */}
        <CinematicReveal />
        <StackedSection label="04 / jornada"><Journey /></StackedSection>
        <StackedSection label="05 / showcase"><ShowcaseVideo /></StackedSection>
        <StackedSection label="06 / equipe"><Team /></StackedSection>
        <StackedSection label="07 / depoimentos"><Testimonials /></StackedSection>
        <StackedSection label="08 / contato"><ContactForm /></StackedSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
