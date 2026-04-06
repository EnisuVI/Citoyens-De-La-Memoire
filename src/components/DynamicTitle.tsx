"use client";
import { useEffect } from "react";

const SECTION_TITLES: { [key: string]: string } = {
  association: "L'Association",
  evenements: "Nos Actions",
  memoires: "MéMoire(S)", // Ajout de la section Mémoires ici
  galerie: "Galerie Photos",
  contact: "Contact",
};

export default function DynamicTitle() {
  useEffect(() => {
    const baseTitle = "Les Citoyens de la Mémoire";

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const sectionTitle = SECTION_TITLES[sectionId];
          
          if (sectionTitle) {
            document.title = `${sectionTitle} — ${baseTitle}`;
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3
    });

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      if (window.scrollY < 200) {
        document.title = baseTitle;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}