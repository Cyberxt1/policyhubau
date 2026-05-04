import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, Lightbulb, MessagesSquare, Scale } from "lucide-react";

const basics = [
  {
    title: "What is policy?",
    text: "Policy is a plan or rule used to solve a public problem. It helps people, schools, communities, or governments decide what should be done.",
    icon: Scale,
  },
  {
    title: "Why does policy matter?",
    text: "Policy affects real life. It shapes education, health, transport, safety, jobs, and many other parts of society.",
    icon: Lightbulb,
  },
  {
    title: "How do we study policy?",
    text: "We start by understanding a real problem. Then we research it, listen to people, compare ideas, and build a solution that can work.",
    icon: BookOpen,
  },
  {
    title: "Who is this for?",
    text: "This is for students who are new to policy and want to learn in a simple and practical way.",
    icon: MessagesSquare,
  },
];

const steps = [
  {
    title: "Start with the problem",
    text: "Ask what is going wrong and who is affected.",
  },
  {
    title: "Understand the cause",
    text: "Look deeper. Do not stop at the surface of the problem.",
  },
  {
    title: "Study examples",
    text: "Learn from what other places or groups have already tried.",
  },
  {
    title: "Build a solution",
    text: "Create an idea that is clear, useful, and realistic.",
  },
  {
    title: "Test the idea",
    text: "Ask whether the idea can really work in the real world.",
  },
  {
    title: "Explain it well",
    text: "Write and present the idea in a simple and clear way.",
  },
];

const LearnSystem = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Learn System"
        title="Learn System"
        lead="This page teaches the basics of policy in simple language. It is made for students who are just starting."
      />

      <section className="border-b border-border">
        <div className="container-narrow py-20">
          <div className="max-w-3xl space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              If you have never studied policy before, start here.
            </p>
            <p>
              This section helps you understand what policy is, why it matters, and how students
              can learn to think clearly about public problems.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-gradient-band">
        <div className="container-narrow py-20">
          <p className="eyebrow">Policy Basics</p>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {basics.map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-sm border border-border bg-card p-8">
                <Icon className="text-accent" size={22} />
                <h2 className="mt-4 font-display text-2xl text-primary">{title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-narrow py-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="eyebrow">How Learning Works</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-primary leading-tight">
              Learn policy step by step.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-sm border border-border bg-card p-6">
                <p className="font-display text-sm text-accent">Step 0{index + 1}</p>
                <h3 className="mt-2 font-display text-xl text-primary">{step.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default LearnSystem;
