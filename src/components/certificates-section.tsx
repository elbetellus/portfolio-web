import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { CertificateCard } from "@/components/certificate-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { certificates } from "@/lib/certificates";

export function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="scroll-mt-24 border-t border-border py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow index={5} />
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Certificates &amp; Awards
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Licenses, honors, and competition results from BINUS and before.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {certificates.map((cert) => (
              <CarouselItem
                key={cert.title + cert.date}
                className="basis-[82%] sm:basis-1/2 lg:basis-1/3"
              >
                <CertificateCard cert={cert} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
