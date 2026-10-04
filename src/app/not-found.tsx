import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { actionClass } from "@/components/site/action";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-3xl flex-col items-start justify-center px-4 pt-[var(--nav-height)] sm:px-6">
      <p className="mono-label text-signal-text">Error 404 · Sheet not found</p>
      <h1 className="font-display mt-5 text-[clamp(2.4rem,1.6rem+3vw,4rem)] leading-none font-bold">
        This page is not on the drawing.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground">
        The link may be old, or the page moved. The projects and everything else are on the home page.
      </p>
      <Link href="/" className={actionClass({ variant: "primary", className: "mt-9" })}>
        <ArrowLeft />
        Back to home
      </Link>
    </section>
  );
}
