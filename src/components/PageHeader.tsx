import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}

export const PageHeader = ({ eyebrow, title, lead, children }: PageHeaderProps) => {
  return (
    <section className="border-b border-border bg-gradient-band">
      <div className="container-narrow py-16 md:py-20 animate-fade-up">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] text-primary max-w-4xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">{lead}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
};
