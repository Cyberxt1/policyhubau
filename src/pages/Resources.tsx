import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { Download, FileText } from "lucide-react";

const items = [
  {
    title: "Team One Pitch",
    tag: "Pitch",
    desc: "Download the pitch document used for preparation and presentation support.",
    href: "/pdf/Team One Pitch.pdf",
  },
  {
    title: "Team One Presentation",
    tag: "Presentation",
    desc: "Download the full presentation slides for Team One.",
    href: "/pdf/Team One Presentation.pdf",
  },
  {
    title: "Team One Proposal",
    tag: "Proposal",
    desc: "Download the full proposal document for Team One.",
    href: "/pdf/Team One Proposal.pdf",
  },
  {
    title: "Policy Challenge Rule Book 2025",
    tag: "Guide",
    desc: "Download the official rule book for the policy challenge.",
    href: "/pdf/The_Policy_Challenge_Rule_Book_2025%20(1).pdf",
  },
];

const Resources = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Resources"
        title="Resources"
        lead="This page contains tools to help you. You will find templates, guides, and examples."
      />

      <section className="border-b border-border">
        <div className="container-narrow py-20 max-w-3xl">
          {/* <p className="text-lg text-muted-foreground leading-relaxed">
            Use these materials when you are learning, writing, or preparing for a competition.
            They are here to make the work easier to understand.
          </p> */}
        </div>
      </section>

      <section>
        <div className="container-narrow py-20 grid gap-px md:grid-cols-2 bg-border border border-border rounded-sm overflow-hidden">
          {items.map((item) => (
            <article key={item.title} className="bg-card p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-accent">{item.tag}</span>
                <FileText size={18} className="text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl text-primary leading-tight">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
              <a
                href={item.href}
                download
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                <Download size={14} /> Download PDF
              </a>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Resources;
