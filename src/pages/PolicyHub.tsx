import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";

const sections = [
  {
    title: "What is the Policy Hub?",
    body: [
      "Policy Hub is an initiative of FPDI designed to help students learn, discuss, and build around public policy.",
      "The Policy Hub is a student-led platform where members learn how to think about real problems and create solutions.",
      "It is not just for talking.",
      "It is for learning, building, and improving.",
    ],
  },
  {
    title: "Mission and Structure",
    body: [
      "Our goal is to help students become strong thinkers who can understand problems clearly, build practical solutions, and compete at a high level.",
      "The Hub Lead leads direction and strategy.",
      "The Assistant Hub Lead manages coordination and activities.",
    ],
  },
  {
    title: "Weekly WhatsApp Discussions",
    body: [
      "Most of our activities happen on WhatsApp.",
      "Every week, we discuss a real topic.",
      "Members share ideas, ask questions, post research, and debate different views.",
      "This helps everyone learn faster.",
    ],
  },
  {
    title: "How We Work Without Physical Meetings",
    body: [
      "We understand that students are busy.",
      "So most work is done online through WhatsApp, Google Docs, and voice notes.",
      "We only meet physically when necessary.",
    ],
  },
  {
    title: "Leadership Roles",
    body: [
      "The Hub Lead sets the direction of the group and makes sure the work stays focused.",
      "The Assistant Hub Lead helps organize discussions, follow up on tasks, and support members.",
      "Other student leaders may help with research, writing, design, or presentation practice when needed.",
    ],
  },
  {
    title: "FPDI Relationship",
    body: [
      "The Hub prepares students for competitions like FPDI.",
      "We help members understand how judging works, what strong ideas look like, and how to prepare properly.",
    ],
  },
];

const PolicyHub = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Policy Hub Guide"
        title="Policy Hub"
        lead="Policy Hub is an initiative of FPDI that helps students build knowledge, leadership, and community around public policy."
      />

      <section>
        <div className="container-narrow py-20 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow">How the Hub works</p>
            <ol className="mt-4 space-y-2 text-sm sticky top-24">
              {sections.map((section, index) => (
                <li key={section.title} className="flex gap-3">
                  <span className="text-accent font-display">0{index + 1}</span>
                  <a href={`#s${index}`} className="text-muted-foreground hover:text-primary">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="md:col-span-8 space-y-12">
            {sections.map((section, index) => (
              <article key={section.title} id={`s${index}`} className="scroll-mt-24">
                <p className="font-display text-sm text-accent">0{index + 1}</p>
                <h2 className="mt-2 font-display text-2xl md:text-3xl text-primary">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-lg text-foreground/85 leading-relaxed">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="rule mt-10" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default PolicyHub;
