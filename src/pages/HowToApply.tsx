import { ArrowRight, ClipboardCheck, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { contactDetails } from "@/content/siteContent";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Fill the Google Form",
    text: "Submit your details through the application form. This helps the team know your school, interest, and how to reach you.",
  },
  {
    icon: MessageCircle,
    title: "Join the WhatsApp group",
    text: "After submitting the form, join the general group. Further instructions and next steps will be shared there.",
  },
];

const HowToApply = () => {
  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="container-narrow py-14 md:py-20">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            How to apply
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold uppercase leading-tight tracking-[0.08em] text-primary md:text-6xl">
            Become a Policy Hub Ambassador
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/75 md:text-lg">
            The process is simple: fill the application form, then join the general WhatsApp group
            so you can receive the next instructions.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={contactDetails.applicationFormUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary"
            >
              Open Google Form <ArrowRight size={16} />
            </a>
            <a
              href={contactDetails.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 border border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Join WhatsApp Group <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-narrow grid gap-5 py-12 md:grid-cols-2 md:py-16">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="border border-border bg-background p-7 md:p-8">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center bg-accent text-accent-foreground">
                  <Icon size={21} />
                </span>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Step {index + 1}
                </p>
              </div>
              <h2 className="mt-7 font-display text-2xl font-semibold text-primary md:text-3xl">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-foreground/75">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow py-12 md:py-16">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Once you join the group, follow the instructions shared by the team.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/75">
            The general group is where updates, screening information, onboarding details, and next
            steps will be communicated.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
};

export default HowToApply;
