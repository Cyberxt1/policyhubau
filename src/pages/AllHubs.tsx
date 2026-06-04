import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Input } from "@/components/ui/input";
import { contactDetails, landingBuilderDefaults } from "@/content/siteContent";

const storageKey = "policy-hub-admin-data";

type BuilderData = typeof landingBuilderDefaults;

const mergeBuilderData = (value: Partial<BuilderData>): BuilderData => ({
  ...landingBuilderDefaults,
  ...value,
  chapters: value.chapters ?? landingBuilderDefaults.chapters,
});

const AllHubs = () => {
  const [data, setData] = useState<BuilderData>(landingBuilderDefaults);
  const [query, setQuery] = useState("");

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

  const filteredHubs = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return data.chapters;
    }

    return data.chapters.filter((hub) =>
      [hub.school, hub.location, hub.status, hub.lead, hub.description]
        .join(" ")
        .toLowerCase()
        .includes(value),
    );
  }, [data.chapters, query]);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-background">
        <div className="container-narrow py-12 md:py-16">
          <a href="/hubs" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">
            <ArrowLeft size={16} /> Back to featured hubs
          </a>
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Full directory
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold uppercase leading-tight tracking-[0.08em] text-primary md:text-5xl">
                Search All Campus Hubs
              </h1>
            </div>

            <div className="border border-border bg-surface p-4">
              <label className="mb-3 block font-display text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Search
              </label>
              <div className="flex min-h-12 items-center gap-3 border border-border bg-background px-4">
                <Search size={18} className="shrink-0 text-accent" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="University, location, status..."
                  className="h-auto border-0 bg-transparent p-0 text-primary placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-narrow py-10 md:py-14">
          <p className="mb-5 text-sm text-muted-foreground">
            Showing <span className="font-semibold text-primary">{filteredHubs.length}</span> hub(s)
          </p>

          {filteredHubs.length > 0 ? (
            <div className="grid gap-4">
              {filteredHubs.map((hub) => (
                <article key={hub.school} className="grid gap-5 border border-border bg-background p-5 md:grid-cols-[1fr_1.2fr_auto] md:items-center">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-primary">{hub.school}</h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={15} /> {hub.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm leading-7 text-foreground/75">{hub.description}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {hub.status} / Lead: {hub.lead} / {hub.members}
                    </p>
                  </div>
                  <a
                    href={hub.href || `mailto:${contactDetails.email}?subject=Policy%20Hub%20Chapter`}
                    className="inline-flex min-h-10 w-fit items-center gap-2 border border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {hub.href ? "View" : "Enquire"} <ArrowRight size={15} />
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border bg-background px-6 py-12 text-center">
              <p className="font-display text-2xl font-semibold text-primary">No hub found.</p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                Try another search, or start the first Policy Hub chapter in your school.
              </p>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default AllHubs;
