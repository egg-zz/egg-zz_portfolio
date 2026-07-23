"use client";

import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { AboutSection } from "../features/about/components/AboutSection";
import { EggLabSection } from "../features/egg-lab/components/EggLabSection";
import { EggTraySection } from "../features/egg-tray/components/EggTraySection";
import { HeroSection } from "../features/hero/components/HeroSection";
import { ProjectsSection } from "../features/projects/components/ProjectsSection";

export default function Home() {
  const [activeNav, setActiveNav] = useState("home");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    Object.values(sectionsRef.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const setSectionRef = (id: string) => (element: HTMLElement | null) => {
    sectionsRef.current[id] = element;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeNav={activeNav} onNavigate={scrollTo} />

      <main>
        <HeroSection
          sectionRef={setSectionRef("home")}
          onScrollToTray={() => scrollTo("tray")}
          onScrollToProjects={() => scrollTo("projects")}
        />
        <EggTraySection sectionRef={setSectionRef("tray")} />
        <ProjectsSection sectionRef={setSectionRef("projects")} />
        <EggLabSection sectionRef={setSectionRef("lab")} />
        <AboutSection sectionRef={setSectionRef("about")} />
      </main>

      <Footer />
    </div>
  );
}
