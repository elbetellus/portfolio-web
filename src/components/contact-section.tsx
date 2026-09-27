import type { ReactNode } from "react";
import { Mail, MapPin } from "lucide-react";
import { siWhatsapp, siLine } from "simple-icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

// LinkedIn isn't in simple-icons (removed at the brand's request), so this is
// the standard LinkedIn glyph, hand-kept as a path.
const linkedInPath =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

interface ContactMethod {
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
}

const contactMethods: ContactMethod[] = [
  {
    label: "WhatsApp",
    value: "+62 852 6874 1340",
    href: "https://wa.me/6285268741340",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill={`#${siWhatsapp.hex}`}>
        <path d={siWhatsapp.path} />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "yosua.elbetellus@binus.ac.id",
    href: "mailto:yosua.elbetellus@binus.ac.id",
    icon: <Mail className="size-5 text-[#2563EB]" />,
  },
  {
    label: "LinkedIn",
    value: "Yosua Elbetellus",
    href: "https://www.linkedin.com/in/yosua-elbetellus-5a9073326/",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="#0A66C2">
        <path d={linkedInPath} />
      </svg>
    ),
  },
  {
    label: "Line",
    value: "@elbetelus1",
    href: "https://line.me/ti/p/~elbetelus1",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill={`#${siLine.hex}`}>
        <path d={siLine.path} />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Alam Sutera, Tangerang",
    icon: <MapPin className="size-5 text-[#EA4335]" />,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-10">
        <Reveal className="md:flex md:flex-col md:justify-center">
          <SectionEyebrow index={6} />
          <span className="inline-block w-fit rounded-full bg-chart-3 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-background">
            Get in touch
          </span>

          <h2 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Got an internship or a{" "}
            <span className="bg-gradient-to-r from-chart-1 to-chart-4 bg-clip-text text-transparent">
              messy dataset
            </span>{" "}
            in mind?
          </h2>

          <p className="mt-6 max-w-md text-muted-foreground">
            I&apos;m looking for internships in Data Analysis, Business
            Intelligence, and Business Analysis, reach out through whichever
            of these you check most often.
          </p>
        </Reveal>

        <div className="flex flex-col gap-3">
          {contactMethods.map((method, index) => {
            const Wrapper = method.href ? "a" : "div";
            return (
              <Reveal key={method.label} delay={index * 0.08}>
                <Wrapper
                  {...(method.href
                    ? {
                        href: method.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                    {method.icon}
                  </span>
                  <span>
                    <span className="block font-mono text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {method.label}
                    </span>
                    <span
                      className={`font-medium text-foreground ${method.href ? "underline decoration-border underline-offset-2 hover:decoration-foreground" : ""}`}
                    >
                      {method.value}
                    </span>
                  </span>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
