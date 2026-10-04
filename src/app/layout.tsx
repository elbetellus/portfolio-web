import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { BlueprintBackground } from "@/components/site/blueprint-background";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { profile } from "@/content/site";
import "./globals.css";

/* Display: Archivo at an expanded width, like the title block of a technical drawing. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

/* Body: IBM Plex Sans, engineering-documentation roots, very readable at small sizes. */
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* Labels and annotations: IBM Plex Mono. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Information Systems student at BINUS University (Business Intelligence, GPA 3.92). I turn business processes into data models, dashboards, and decisions. Open to Data, BI, and Business Analyst internships.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: `${profile.name} | Data, BI, and Systems`,
    template: `%s | ${profile.name}`,
  },
  description,
  openGraph: {
    type: "website",
    url: profile.site,
    siteName: profile.name,
    title: `${profile.name} | Data, BI, and Systems`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Data, BI, and Systems`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08111f" },
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <MotionConfig reducedMotion="user">
            <BlueprintBackground />
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
