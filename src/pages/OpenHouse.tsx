import { PageHeader } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";

const OpenHouse = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="FPDI Initiative"
        title="Open House"
        lead="FPDI is proud to announce Open House, bringing policy conversations directly to Nigerian campuses."
      />

      <section>
        <div className="container-narrow py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <img
                src="/open-house.svg"
                alt="Open House announcement"
                className="w-full border border-primary/15 bg-primary object-cover shadow-sm"
              />
            </div>

            <div className="space-y-12 md:col-span-7">
              <article>
                <p className="font-display text-sm text-accent">02.</p>
                <h2 className="mt-2 font-display text-2xl text-primary md:text-3xl">
                  What happens?
                </h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-foreground/85">
                  <p>
                    It is an experience where Policy Hub members get to meet FPDI's
                    founder, core team members, and stakeholders in a relaxed setting.
                  </p>
                  <p>
                    Members can ask questions and explore conversations around policy,
                    governance, and public affairs.
                  </p>
                </div>
                <div className="rule mt-10" />
              </article>

              <article>
                <p className="font-display text-sm text-accent">03.</p>
                <h2 className="mt-2 font-display text-2xl text-primary md:text-3xl">
                  What's the goal?
                </h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-foreground/85">
                  <p>
                    These visits are designed to move Nigerian undergraduates from
                    simple awareness to genuine curiosity and real interest in
                    governance and public problem-solving.
                  </p>
                  <p>
                    These interactions would demystify policy making and policy writing
                    for Nigerian undergraduates.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default OpenHouse;
