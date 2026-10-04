import { ViewTransition } from "react";
import { Hero } from "@/components/site/hero";
import { AboutSection } from "@/components/site/about-section";
import { WorkSection } from "@/components/site/work-section";
import { ExperienceSection } from "@/components/site/experience-section";
import { EducationSection } from "@/components/site/education-section";
import { SkillsSection } from "@/components/site/skills-section";
import { CredentialsSection } from "@/components/site/credentials-section";
import { ContactSection } from "@/components/site/contact-section";

const directional = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

export default function Home() {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      <div>
        <Hero />
        <AboutSection />
        <WorkSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <CredentialsSection />
        <ContactSection />
      </div>
    </ViewTransition>
  );
}
