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
        <Services />
        <Cases />
        <Differential />
        <CinematicReveal />
        <Journey />
        <ShowcaseVideo />
        <Team />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
