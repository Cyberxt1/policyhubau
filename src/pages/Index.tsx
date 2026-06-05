import { useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { landingCopy } from "@/content/siteContent";
import heroImage from "../../container.png";
import meetImage from "../../container (1).png";
import meetImageTwo from "../../container (2).png";
import meetImageThree from "../../container (3).png";
import meetImageFour from "../../container (4).png";
import meetImageFive from "../../container (5).png";

const meetSlides = [meetImage, meetImageTwo, meetImageThree, meetImageFour, meetImageFive];

const Index = () => {
  const [activeMeetSlide, setActiveMeetSlide] = useState(0);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveMeetSlide((current) => (current + 1) % meetSlides.length);
    }, 8000);

    return () => window.clearInterval(slideTimer);
  }, []);

  return (
    <SiteLayout>
      <section className="simple-hero sticky top-16 z-0 isolate min-h-[330px] overflow-hidden bg-primary text-primary-foreground md:min-h-[410px]">
        <img
          src={heroImage}
          alt="Policy Hub ambassadors"
          className="absolute inset-0 h-full w-full object-cover"
          decoding="sync"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-primary/82 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/58 to-primary/40" />

        <div className="relative z-10 mx-auto flex min-h-[330px] w-full max-w-6xl items-end px-6 pb-14 pt-24 md:min-h-[410px] md:px-10 md:pb-20">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground/90">
              {landingCopy.eyebrow}
            </p>
            <h1 className="mt-3 max-w-5xl font-display text-4xl font-semibold uppercase leading-none tracking-[0.08em] text-primary-foreground md:text-6xl">
              Policy Hub Ambassadors
            </h1>
            <span className="mt-7 block h-px w-24 bg-gold" />
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 bg-background">
        <div className="container-narrow py-16 text-center md:py-20">
          <h2 className="text-left font-display text-3xl font-semibold uppercase tracking-[0.1em] text-primary md:text-center md:text-4xl">
            We Are The Policy Hub Ambassadors
          </h2>
          <p className="mx-auto mt-8 max-w-5xl text-justify text-base leading-8 text-foreground md:text-center md:text-lg">
            Policy Hub Ambassadors serve on campuses to spread interest, knowledge, and
            leadership in public policy. The network helps students host conversations,
            build community, and prepare for useful civic impact.
          </p>
        </div>
      </section>

      <section id="apply" className="relative z-10 grid min-h-[520px] bg-gold md:grid-cols-2">
        <div className="flex items-center justify-center px-6 py-16 md:justify-start md:px-14 lg:px-20">
          <div className="w-full text-center md:text-left">
            <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold uppercase leading-tight tracking-[0.1em] text-primary md:mx-0 md:text-4xl">
              Meet Your Policy Hub Ambassadors
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <a
                href="/about"
                className="inline-flex min-h-11 items-center border border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                About Us
              </a>
              <a
                href="/apply"
                className="inline-flex min-h-11 items-center border border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Become an Ambassador
              </a>
            </div>
          </div>
        </div>
        <div className="meet-slideshow min-h-[360px] md:min-h-full">
          {meetSlides.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={index === 0 ? "Policy Hub ambassadors meeting" : ""}
              className={`meet-slide ${index === activeMeetSlide ? "is-active" : ""}`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
      </section>

      <section className="relative z-10 bg-surface py-16 text-center md:py-20">
        <a
          href="https://www.instagram.com/fpdiafrica/"
          className="inline-flex flex-col items-center gap-4 text-primary transition-colors hover:text-accent"
          aria-label="Policy Hub Instagram"
        >
          <Instagram size={54} strokeWidth={1.8} />
          <span className="font-display text-sm font-semibold uppercase tracking-[0.08em]">
            Instagram
          </span>
        </a>
      </section>
    </SiteLayout>
  );
};

export default Index;
