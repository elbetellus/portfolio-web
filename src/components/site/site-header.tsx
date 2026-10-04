"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowDownToLine, Menu } from "lucide-react";
import { navLinks, profile, type SectionId } from "@/content/site";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { actionClass } from "./action";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id as SectionId);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    const onTop = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [enabled]);
  return enabled ? active : null;
}

function SectionLink({
  id,
  isHome,
  className,
  children,
  onNavigate,
}: {
  id: string;
  isHome: boolean;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  if (isHome) {
    return (
      <a href={`#${id}`} className={className} onClick={onNavigate}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${id}`} transitionTypes={["nav-back"]} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[var(--nav-height)] border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || !isHome
          ? "border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          transitionTypes={isHome ? undefined : ["nav-back"]}
          className="group flex items-center gap-3 rounded-md"
          aria-label={`${profile.name}, home`}
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0 });
            }
          }}
        >
          <span className="relative grid size-9 place-items-center border border-border-strong bg-card-solid font-display text-[0.8rem] font-bold tracking-tight transition-colors group-hover:border-signal">
            {profile.initials}
            <span aria-hidden className="absolute -top-1 -right-1 size-1.5 bg-signal" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[0.95rem] font-semibold">{profile.name}</span>
            <span className="mono-label text-[0.625rem] text-muted-foreground">Data · BI · Systems</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id} className="relative">
                  <SectionLink
                    id={link.id}
                    isHome={isHome}
                    className={cn(
                      "relative flex h-10 items-center gap-1.5 rounded-md px-2.5 text-[0.875rem] transition-colors xl:px-3",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span aria-hidden className="font-mono text-[0.625rem] text-signal-text/80">
                      {link.index}
                    </span>
                    {link.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-x-2.5 -bottom-[13px] h-0.5 bg-signal"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    ) : null}
                  </SectionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-2">
          <ThemeToggle />
          <a
            href={profile.cv}
            download
            className={actionClass({ variant: "primary", size: "sm", className: "hidden sm:inline-flex" })}
          >
            <ArrowDownToLine />
            CV
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={actionClass({ variant: "ghost", size: "icon", className: "lg:hidden" })}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] border-border bg-background/95 backdrop-blur-xl sm:max-w-sm">
              <div className="flex h-full flex-col px-6 pt-16 pb-8">
                <SheetTitle className="mono-label text-muted-foreground">Index</SheetTitle>
                <SheetDescription className="sr-only">Jump to a section of the portfolio</SheetDescription>
                <ul className="mt-6 flex flex-col">
                  {navLinks.map((link) => (
                    <li key={link.id} className="border-b border-border">
                      <SectionLink
                        id={link.id}
                        isHome={isHome}
                        onNavigate={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-3.5 font-display text-2xl font-semibold"
                      >
                        <span className="font-mono text-xs font-normal text-signal-text">{link.index}</span>
                        {link.label}
                      </SectionLink>
                    </li>
                  ))}
                </ul>
                <a href={profile.cv} download className={actionClass({ variant: "primary", className: "mt-auto w-full" })}>
                  <ArrowDownToLine />
                  Download CV
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-data"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
