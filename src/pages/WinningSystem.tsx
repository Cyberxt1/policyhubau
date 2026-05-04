import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Understanding the Problem",
    points: [
      "Start by asking what the real problem is.",
      "Do not stop at the first obvious issue.",
      "Make sure the problem is clear, specific, and worth solving.",
    ],
  },
  {
    title: "Looking at What Other Countries Have Done",
    points: [
      "Study examples from other places.",
      "Look at what worked and what failed.",
      "This helps you avoid weak ideas.",
    ],
  },
  {
    title: "Adapting Ideas to Nigeria",
    points: [
      "Do not copy another country word for word.",
      "Think about what fits Nigeria.",
      "Consider culture, money, systems, and daily reality.",
    ],
  },
  {
    title: "Talking to People",
    points: [
      "Speak to people who understand the problem.",
      "This can include students, workers, experts, or community members.",
      "Interviews help you test whether your idea makes sense.",
    ],
  },
  {
    title: "Designing a Solution",
    points: [
      "Build a solution that directly answers the problem.",
      "Keep it practical.",
      "Make sure people can understand what the idea does.",
    ],
  },
  {
    title: "Making Sure It Can Actually Work",
    points: [
      "Ask who will run the idea.",
      "Ask how much it may cost.",
      "Ask what could stop it from working.",
    ],
  },
  {
    title: "Writing the Proposal",
    points: [
      "Write clearly and in the right order.",
      "Show the problem, the evidence, the solution, and the plan.",
      "Avoid long and confusing explanations.",
    ],
  },
  {
    title: "Preparing for Presentation",
    points: [
      "Practice how you will explain the idea.",
      "Be ready to answer questions.",
      "A strong idea still needs a clear presentation.",
    ],
  },
];

const WinningSystem = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Winning Framework"
        title="Winning Framework"
        lead="This is the step-by-step process used to build a strong policy idea. It is simple, clear, and practical."
      />

      <section>
        <div className="container-narrow py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <p className="eyebrow mb-4">Steps</p>
              <ul className="space-y-2 text-sm sticky top-24">
                {steps.map((step, index) => (
                  <li key={step.title}>
                    <a href={`#m${index + 1}`} className="text-muted-foreground hover:text-primary flex gap-3">
                      <span className="text-accent font-display">0{index + 1}</span>
                      <span>{step.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="md:col-span-9 space-y-16">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  id={`m${index + 1}`}
                  className="border-l-2 border-accent/30 pl-8 scroll-mt-24"
                >
                  <p className="font-display text-sm text-accent">Step 0{index + 1}</p>
                  <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary leading-tight">
                    {step.title}
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {step.points.map((point) => (
                      <li key={point} className="flex gap-4 text-foreground/85">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-24 rounded-sm bg-primary text-primary-foreground p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div>
              <h3 className="font-display text-2xl md:text-3xl">
                Want help applying this framework to your idea?
              </h3>
              <p className="mt-2 text-primary-foreground/70 max-w-xl">
                Book a mentorship session and get clear feedback on your work.
              </p>
            </div>
            <Link
              to="/mentorship"
              className="inline-flex items-center gap-2 rounded-sm bg-primary-foreground text-primary px-6 py-3.5 text-sm font-medium hover:bg-surface transition-colors"
            >
              Book Session <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default WinningSystem;
