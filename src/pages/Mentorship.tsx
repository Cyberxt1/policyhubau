import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { Calendar, ClipboardList, MessagesSquare, Video } from "lucide-react";

const sessions = [
  { title: "Idea Review", desc: "Get help checking if your idea is clear, useful, and worth developing.", icon: MessagesSquare },
  { title: "Proposal Help", desc: "Get support with structure, writing, and how to explain your solution.", icon: ClipboardList },
  { title: "Presentation Practice", desc: "Practice speaking about your idea before the real presentation.", icon: Video },
];

const Mentorship = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Mentorship"
        title="Mentorship"
        lead="You can book a session to get help. Booking is done through Google Calendar."
      >
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-secondary transition-colors"
        >
          <Calendar size={16} /> Open Google Calendar
        </a>
      </PageHeader>

      <section className="border-b border-border">
        <div className="container-narrow py-20">
          <p className="eyebrow">Session Types</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {sessions.map(({ title, desc, icon: Icon }) => (
              <div key={title} className="rounded-sm border border-border bg-card p-8 hover:shadow-soft transition-shadow">
                <Icon className="text-accent" size={22} />
                <h3 className="mt-4 font-display text-xl text-primary">{title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-band">
        <div className="container-narrow py-20 max-w-3xl">
          <p className="eyebrow">How it works</p>
          <div className="mt-6 space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>Choose a time on Google Calendar.</p>
            <p>Book the kind of help you need.</p>
            <p>Join the session and get clear feedback you can use.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Mentorship;
