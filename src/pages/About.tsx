import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import heroImage from "../../container (2).png";

const pillars = [
  {
    title: "Learn",
    text: "Students build a clearer understanding of governance, public problems, and policy ideas.",
  },
  {
    title: "Lead",
    text: "Ambassadors host conversations, support campus activities, and help others engage civic issues.",
  },
  {
    title: "Build",
    text: "The network turns interest into practical research, teamwork, advocacy, and useful impact.",
  },
];

const About = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title="A student network for policy thinking and civic leadership."
        lead="Policy Hub Ambassadors help students understand public issues, build useful ideas, and lead thoughtful conversations on campus."
      />

      <section className="bg-background">
        <div className="container-narrow grid gap-10 py-14 md:grid-cols-[0.95fr_1.05fr] md:py-20">
          <div>
            <h2 className="font-display text-3xl font-semibold uppercase leading-tight tracking-[0.08em] text-primary md:text-4xl">
              Why It Exists
            </h2>
            <p className="mt-6 text-base leading-8 text-foreground/80 md:text-lg">
              Many students care about society but do not always have a clear path into policy,
              governance, or public problem-solving. Policy Hub gives that interest structure.
            </p>
            <p className="mt-4 text-base leading-8 text-foreground/80 md:text-lg">
              It is simple: learn deeply, think clearly, work with others, and build ideas that can
              serve real communities.
            </p>
          </div>

          <div className="min-h-[320px] overflow-hidden bg-primary md:min-h-[420px]">
            <img src={heroImage} alt="Policy Hub students" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-narrow grid gap-px py-14 md:grid-cols-3 md:py-20">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="bg-background p-7 md:p-8">
              <h3 className="font-display text-2xl font-semibold text-primary">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-7 text-foreground/75">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-16">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            The goal is to raise students who can think clearly and lead responsibly.
          </h2>
          <a
            href="/#apply"
            className="inline-flex min-h-11 w-fit items-center gap-2 border border-primary-foreground/70 px-5 text-sm font-semibold transition-colors hover:bg-primary-foreground hover:text-primary"
          >
            How To Apply <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
};

export default About;
