import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { contactDetails, landingBuilderDefaults } from "@/content/siteContent";

const storageKey = "policy-hub-admin-data";

type BuilderData = typeof landingBuilderDefaults;

const mergeBuilderData = (value: Partial<BuilderData>): BuilderData => ({
  ...landingBuilderDefaults,
  ...value,
  chapters: value.chapters ?? landingBuilderDefaults.chapters,
});

const useHubData = () => {
  const [data, setData] = useState<BuilderData>(landingBuilderDefaults);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);

    if (!stored) {
      return;
    }

    try {
      setData(mergeBuilderData(JSON.parse(stored) as Partial<BuilderData>));
    } catch {
      setData(landingBuilderDefaults);
    }
  }, []);

  return data.chapters;
};

const HubsDirectory = () => {
  const hubs = useHubData();
  const featuredHubs = hubs.slice(0, 3);

  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="container-narrow py-14 md:py-20">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            Campus hubs
          </p>
          <div className="mt-4 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h1 className="max-w-3xl font-display text-4xl font-semibold uppercase leading-tight tracking-[0.08em] text-primary md:text-6xl">
                Find Your Policy Hub
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/75 md:text-lg">
                Start with a few featured campus chapters. If your school is not here, you can
                search the full directory or help launch the first hub on your campus.
              </p>
            </div>

            <a
              href="/hubs/all"
              className="inline-flex min-h-12 w-fit items-center gap-2 border border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Search size={17} /> Search All Hubs
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-narrow py-8 md:py-14">
          <div className="grid gap-5 md:grid-cols-3">
            {featuredHubs.map((hub) => (
              <article key={hub.school} className="border border-border bg-background p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Policy Hub</p>
                  <span className="border border-border px-3 py-1 text-xs font-semibold text-primary">
                    {hub.status}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold leading-tight text-primary">
                  {hub.school}
                </h2>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={15} /> {hub.location}
                </p>
                <p className="mt-5 text-sm leading-7 text-foreground/75">{hub.description}</p>
                <a
                  href={hub.href || `mailto:${contactDetails.email}?subject=Policy%20Hub%20Chapter`}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
                >
                  {hub.href ? "View hub" : "Enquire"} <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="/hubs/all"
              className="inline-flex min-h-11 items-center gap-2 border border-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              See All Hubs <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-accent text-accent-foreground">
        <div className="container-narrow grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-16">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
              Start a chapter
            </p>
            <h2 className="mt-3 max-w-4xl font-display text-3xl font-semibold uppercase leading-tight tracking-[0.08em] md:text-5xl">
              Your school is not listed yet? Be the pioneer.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 opacity-85">
              Bring Policy Hub to your campus, gather interested students, and lead the first
              conversations in your school.
            </p>
          </div>
          <a
            href={`mailto:${contactDetails.email}?subject=Start%20a%20Policy%20Hub%20Chapter`}
            className="inline-flex min-h-12 w-fit items-center gap-2 border border-accent-foreground px-6 text-sm font-semibold transition-colors hover:bg-accent-foreground hover:text-accent"
          >
            Start Your Campus Hub <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
};

export default HubsDirectory;
