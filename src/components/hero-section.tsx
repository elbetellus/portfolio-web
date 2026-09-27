import { Cta69 } from "@/components/ui/cta69";

export function HeroSection() {
  return (
    <section id="hero" className="scroll-mt-24 pt-24">
      <Cta69
        heading="Hi, I'm Yosua Elbetellus."
        labels={{
          marqueePhrase: "Yosua Elbetellus",
          note: "Information Systems student at BINUS University, Business Intelligence concentration. I turn business processes into data models, dashboards, and decisions.",
        }}
        button={{ label: "View Projects", href: "#projects" }}
        secondaryButton={{
          label: "Download CV",
          href: "/cv/Yosua-Elbetellus-CV.pdf",
          download: true,
        }}
      />
    </section>
  );
}
