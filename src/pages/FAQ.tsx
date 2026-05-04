import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const items = [
  {
    q: "What is FPDI?",
    a: "FPDI is a policy competition where teams study a real problem, build a solution, and present it to judges.",
  },
  {
    q: "How are teams judged?",
    a: "Teams are judged by how well they understand the problem, how strong their research is, how practical their solution is, and how clearly they present it.",
  },
  {
    q: "Why do teams fail?",
    a: "Many teams fail because their ideas are unclear, their research is weak, or their solution does not look practical.",
  },
  {
    q: "When should I start preparing?",
    a: "Start as early as possible. Good preparation takes time, and strong teams usually begin before the final stage is close.",
  },
];

const FAQ = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="FAQ"
        title="FAQ"
        lead="Clear answers to common questions about FPDI, judging, and preparation."
      />

      <section>
        <div className="container-narrow py-20 max-w-4xl">
          <Accordion type="multiple" className="border-t border-border">
            {items.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-b border-border">
                <AccordionTrigger className="text-left font-display text-lg text-primary hover:text-accent py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 leading-relaxed text-base pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteLayout>
  );
};

export default FAQ;
