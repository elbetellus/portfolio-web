import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButton {
  label: string;
  href: string;
  download?: boolean;
  variant?: "default" | "outline";
}

interface Cta69Labels {
  /** Repeated phrase scrolling across the backdrop */
  marqueePhrase?: string;
  /** Short supporting line beneath the heading */
  note?: string;
  /** Fine print sitting under the buttons */
  footnote?: string;
}

interface Cta69Props {
  badge?: string;
  heading?: string;
  button?: ActionButton;
  secondaryButton?: ActionButton;
  labels?: Cta69Labels;
  className?: string;
}

/**
 * How many times the phrase is written into one half of the marquee.
 *
 * The loop is two identical halves slid by exactly half their width, so it only
 * reads as endless while a single half is wider than the screen. A short phrase
 * written once is not: it reaches the right edge and then drags a hole across
 * the section until the animation restarts. Repeating it is what closes that
 * hole, and eight is enough for a one-word phrase at this size.
 */
const REPEATS = 8;

export function Cta69({
  badge,
  heading,
  button,
  secondaryButton,
  labels = {},
  className,
}: Cta69Props) {
  const marqueePhrase = labels.marqueePhrase;
  // The separator lives inside the phrase rather than in padding between spans:
  // padding is only applied between elements, so it left one wide gap per copy
  // instead of the same small gap between every repeat.
  const marqueeLine = marqueePhrase ? `${marqueePhrase} · `.repeat(REPEATS) : "";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden py-24 md:py-32",
        className,
      )}
    >
      <style>{`
        @keyframes cta69-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta69-marquee-track { animation: none !important; }
        }
      `}</style>

      {marqueePhrase && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none"
        >
          <div className="cta69-marquee-track flex w-max shrink-0 animate-[cta69-marquee_40s_linear_infinite] whitespace-nowrap text-foreground/[0.05]">
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="font-heading text-[16vw] font-bold leading-none tracking-tighter md:text-[9vw]"
              >
                {marqueeLine}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center md:px-6">
        {badge && (
          <Badge
            variant="secondary"
            className="rounded-full border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary" />
            {badge}
          </Badge>
        )}

        {heading && (
          <h1 className="mt-8 text-balance font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl">
            {heading}
          </h1>
        )}

        {labels.note && (
          <p className="mt-6 max-w-xl text-balance text-lg text-muted-foreground md:text-xl">
            {labels.note}
          </p>
        )}

        {(button || secondaryButton) && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {button && (
              <Button
                size="lg"
                className="h-12 rounded-full px-8 text-base font-semibold"
                nativeButton={false}
                render={<a href={button.href} download={button.download} />}
              >
                {button.label}
              </Button>
            )}
            {secondaryButton && (
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full px-8 text-base font-semibold"
                nativeButton={false}
                render={
                  <a
                    href={secondaryButton.href}
                    download={secondaryButton.download}
                  />
                }
              >
                {secondaryButton.label}
              </Button>
            )}
          </div>
        )}

        {labels.footnote && (
          <p className="mt-8 font-mono text-sm text-muted-foreground">
            {labels.footnote}
          </p>
        )}
      </div>
    </section>
  );
}

export default Cta69;
