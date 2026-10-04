import { profile } from "@/content/site";

/** Footer drawn as the title block of an engineering drawing. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const cells = [
    { k: "Project", v: `Portfolio of ${profile.name}`, wide: true },
    { k: "Drawn by", v: profile.name },
    { k: "Revision", v: "2026.10" },
    { k: "Sheet", v: "07 / 07" },
    { k: "Scale", v: "1 : 1" },
    { k: "Location", v: profile.locationShort },
  ];

  return (
    <footer className="relative pt-8 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 border-t border-l border-border-strong text-sm sm:grid-cols-3 lg:grid-cols-6">
          {cells.map((c) => (
            <div
              key={c.k}
              className={`border-r border-b border-border-strong px-4 py-3 ${c.wide ? "col-span-2 sm:col-span-3 lg:col-span-1" : ""}`}
            >
              <p className="mono-label text-[0.625rem] text-muted-foreground">{c.k}</p>
              <p className="mt-1 font-medium text-foreground">{c.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-2 text-[0.8125rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. Built with Next.js, set in Archivo and IBM Plex.
          </p>
          <a href="#top" className="mono-label link-underline self-start text-[0.6875rem] sm:self-auto">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
