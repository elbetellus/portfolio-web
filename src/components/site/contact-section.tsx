"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MapPin, MessageCircle, MessagesSquare, UserRound } from "lucide-react";
import { contact, profile } from "@/content/site";
import { DUR, EASE_OUT } from "@/lib/motion";
import { actionClass } from "./action";
import { CornerMarks } from "./corner-marks";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeading } from "./section-heading";

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1800);
    } catch {
      setCopied(null);
    }
  };
  return { copied, copy };
}

export function ContactSection() {
  const { copied, copy } = useCopy();

  const channels = [
    { key: "whatsapp", label: "WhatsApp", value: profile.phoneDisplay, href: profile.whatsapp, icon: MessageCircle, external: true },
    { key: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, copyText: profile.email },
    { key: "linkedin", label: "LinkedIn", value: profile.name, href: profile.linkedin, icon: UserRound, external: true },
    { key: "line", label: "LINE", value: profile.line, icon: MessagesSquare, copyText: profile.line },
    { key: "location", label: "Location", value: profile.location, icon: MapPin },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          title={<span id="contact-title">{contact.heading}</span>}
          intro={contact.body}
          annotation="Sheet 07 / 07"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="panel relative p-6 sm:p-8">
              <CornerMarks tone="signal" className="inset-2" />
              <p className="mono-label text-[0.6875rem] text-muted-foreground">Fastest reply</p>
              <a
                href={`mailto:${profile.email}`}
                className="font-display link-underline mt-4 block text-[clamp(1.35rem,1rem+1.6vw,2rem)] leading-tight font-semibold break-all"
              >
                {profile.email}
              </a>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className={actionClass({ variant: "primary" })}>
                  <Mail />
                  Send an email
                </a>
                <a href={profile.cv} download className={actionClass({ variant: "outline" })}>
                  Download CV
                </a>
              </div>
              <p className="mt-8 flex items-start gap-2.5 border-t border-dashed border-border-strong pt-5 text-[0.95rem] text-muted-foreground">
                <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-pass animate-pulse-dot" />
                {contact.availability}
              </p>
            </div>
          </Reveal>

          <RevealGroup as="ul" className="divide-y divide-border border-y border-border lg:col-span-7">
            {channels.map((c) => {
              const Icon = c.icon;
              const isCopied = copied === c.key;
              return (
                <RevealItem as="li" key={c.key} className="group relative flex items-center gap-4 py-5 sm:gap-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border-strong text-data transition-colors duration-300 group-hover:border-data">
                    <Icon aria-hidden className="size-[18px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="mono-label text-[0.6875rem] text-muted-foreground">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.external ? "_blank" : undefined}
                        rel={c.external ? "noreferrer" : undefined}
                        className="mt-1 block truncate text-lg font-medium text-foreground after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 truncate text-lg font-medium text-foreground">{c.value}</p>
                    )}
                  </div>
                  {c.copyText ? (
                    <button
                      type="button"
                      onClick={() => copy(c.key, c.copyText!)}
                      className={actionClass({ variant: "ghost", size: "sm", className: "relative z-10" })}
                      aria-label={`Copy ${c.label}`}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={isCopied ? "done" : "copy"}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: DUR.micro, ease: EASE_OUT }}
                          className="flex items-center gap-1.5"
                        >
                          {isCopied ? <Check className="text-pass" /> : <Copy />}
                          <span className="hidden sm:inline">{isCopied ? "Copied" : "Copy"}</span>
                        </motion.span>
                      </AnimatePresence>
                    </button>
                  ) : null}
                  {c.href ? (
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 shrink-0 text-muted-foreground transition-[translate,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-text"
                    />
                  ) : null}
                  <span className="sr-only" aria-live="polite">
                    {isCopied ? `${c.label} copied` : ""}
                  </span>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
