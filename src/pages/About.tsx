import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";

const sections = [
  {
    title: "What This Is",
    paragraphs: [
      "The Adeleke University Policy Hub is a student-led platform focused on developing clear thinkers, problem solvers, and future contributors to public policy and governance.",
      "It exists to help students move beyond opinions and begin to understand how real-world decisions are made, how systems work, and how problems can be solved in practical ways.",
      "This is not just about competitions.",
      "It is about building the ability to think, analyze, and act in ways that can shape society.",
    ],
  },
  {
    title: "Why It Exists",
    paragraphs: [
      "Many important problems in society are not caused by a lack of ideas, but by a lack of structured thinking, execution, and understanding.",
      "The Policy Hub exists to close that gap.",
      "We focus on helping students understand problems deeply, ask the right questions, design solutions that can actually work, and communicate ideas clearly.",
      "Because good policy is not just written. It is built from understanding.",
    ],
  },
  {
    title: "The Vision",
    paragraphs: [
      "The long-term vision is simple.",
      "To raise a generation of students who can contribute meaningfully to governance, policy development, and national progress.",
      "Inspired by the work and direction of Future Pathways Development Initiative, the Hub aligns with a broader goal: stronger institutions, better decision-making, more thoughtful leadership, and practical solutions to real challenges.",
      "This is about the future of the country, not just the success of a few students.",
    ],
  },
  {
    title: "How It Started",
    paragraphs: [
      "The Hub was strengthened through participation in the FPDI Policy Challenge 2025, where the Harmony in Diversity (HDI) project placed first in the Abuja finals.",
      "That experience revealed something important.",
      "Winning ideas are not random.",
      "They are built through structure, research, and clear thinking.",
      "The Policy Hub was shaped to make that process repeatable for others.",
    ],
  },
  {
    title: "What It Is Becoming",
    paragraphs: [
      "The goal is not to remain a small group.",
      "The goal is to build a system where students can learn policy thinking early, ideas can be developed properly, collaboration is structured, and strong solutions can consistently emerge.",
      "Over time, the Hub aims to grow into a recognized space for policy development, civic thinking, and student-driven problem solving.",
    ],
  },
  {
    title: "What This Means for You",
    paragraphs: [
      "If you are part of the Hub, this is what it offers.",
      "A place to learn how to think clearly.",
      "A system to improve your ideas.",
      "Exposure to real-world policy thinking.",
      "Preparation for competitions and beyond.",
      "You are not just joining a group.",
      "You are entering a system designed to develop you.",
    ],
  },
];

const About = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title="About the Policy Hub"
        lead="This page explains what the Adeleke University Policy Hub is, why it exists, and what it is building."
      />

      <section>
        <div className="container-narrow py-20 space-y-16">
          {sections.map((section, index) => (
            <article key={section.title} className="grid md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-4">
                <p className="font-display text-sm text-accent uppercase tracking-[0.18em]">
                  Section 0{index + 1}
                </p>
              </div>
              <div className="md:col-span-8">
                <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-lg text-foreground/80 leading-relaxed">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-8">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
              The work is bigger than one competition
            </p>
            <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight">
              The goal is to grow students who can think clearly, lead thoughtfully, and solve real problems.
            </h3>
          </div>
          <div className="md:col-span-4 md:text-right text-sm text-primary-foreground/60">
            <p>Policy thinking, civic understanding, and practical problem solving all in one system.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default About;
