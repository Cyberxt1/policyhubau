import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, Lightbulb, Megaphone, Route } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { contactDetails } from "@/content/siteContent";
import heroImage from "../../container.png";
import meetImage from "../../container (1).png";
import meetImageTwo from "../../container (2).png";
import meetImageThree from "../../container (3).png";
import meetImageFour from "../../container (4).png";
import meetImageFive from "../../container (5).png";

const meetSlides = [meetImage, meetImageTwo, meetImageThree, meetImageFour, meetImageFive];

const featureItems = [
  {
    title: "Campus Advocacy",
    icon: Megaphone,
    description: "Cultivate deep student engagement in governance.",
  },
  {
    title: "Civic Incubation",
    icon: Lightbulb,
    description: "Host debates, policy hackathons, and high-level panels.",
  },
  {
    title: "Leadership Pipelines",
    icon: Route,
    description: "Connect high-achieving students with elite public sector career paths.",
  },
];

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
      <section className="simple-hero relative z-0 isolate min-h-[calc(100svh-4rem)] overflow-hidden rounded-b-[2rem] bg-primary text-primary-foreground md:min-h-[680px] md:rounded-b-[3rem]">
        <img
          src={heroImage}
          alt="Students in an engaging policy session"
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover blur-[1.5px]"
          decoding="sync"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/18 to-primary/92" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary via-primary/78 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl items-end px-5 pb-12 pt-24 md:min-h-[680px] md:px-10 md:pb-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Student Policy Network
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-[3.1rem] font-semibold leading-[0.96] text-primary-foreground md:text-7xl">
              Shape the Future. Lead the Change.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/86 md:text-xl md:leading-8">
              Join Africa's premier network of student leaders driving public policy,
              governance innovation, and civic action across campuses.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 bg-background py-12 md:py-20">
        <div className="container-narrow">
          <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-stretch">
            <article className="md:rounded-[24px] md:bg-white md:p-9 md:shadow-elevated">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                The Mission
              </p>
              <h2 className="mt-4 font-display text-[2.65rem] font-semibold leading-[1.02] text-primary md:text-5xl">
                Through the Policy Hub
              </h2>
              <p className="mt-5 block text-base leading-8 text-muted-foreground md:text-lg">
                We empower exceptional student leaders with the tools, networks, and
                training needed to bridge the gap between academic theory and real-world
                policy solutions.
              </p>
            </article>

            <article className="md:rounded-[24px] md:bg-white md:p-8 md:shadow-elevated">
              <div className="space-y-3">
                {featureItems.map(({ title, icon: Icon, description }) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-[20px] bg-white p-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)] md:bg-background/80"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-gold">
                      <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-xl font-semibold leading-tight text-primary">
                        {title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                        {description}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="apply" className="relative z-10 bg-background pb-14 md:px-4 md:pb-20">
        <div className="mx-auto w-full max-w-none overflow-hidden rounded-none bg-primary px-6 py-9 text-primary-foreground shadow-soft md:grid md:max-w-6xl md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:rounded-[24px] md:px-10 md:py-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Applications
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl">
              Build the network your campus deserves.
            </h2>
            <p className="mt-4 text-base leading-7 text-primary-foreground/78">
              Join a high-trust circle of students creating serious civic conversations,
              practical policy work, and visible campus leadership.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={contactDetails.applicationFormUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-bold text-primary transition-transform hover:-translate-y-0.5"
              >
                Apply as an Ambassador
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a
                href="/policy-hub"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary-foreground/34 px-6 text-sm font-semibold text-primary-foreground transition-colors hover:border-gold hover:text-gold"
              >
                Explore Our Impact
              </a>
            </div>
          </div>
          <div className="meet-slideshow mt-8 min-h-[280px] rounded-[24px] md:mt-0 md:min-h-full">
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
        </div>
      </section>

      <section className="relative z-10 bg-background px-4 pb-16 md:pb-24">
        <div className="container-narrow rounded-[24px] bg-white p-6 shadow-elevated md:flex md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Policy Challenge
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-primary md:text-4xl">
              Have you Heard of the Policy Challenge.
            </h2>
          </div>
          <a
            href="https://policychallenge.com"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground md:mt-0"
          >
            Visit Policy Challenge
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
