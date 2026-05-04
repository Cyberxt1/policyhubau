import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  HelpCircle,
  Lightbulb,
  Shuffle,
  Trophy,
  Users,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import heroImg from "@/assets/hero.jpg";
import { siteName } from "@/content/siteContent";

const stripPhrases = [
  "The Future is Young",
  "Opportunity loves preparation",
  "The Adeleke University Policy Hub",
  "Clear thinking changes outcomes",
  "Policy starts with understanding",
  "Good ideas need structure",
  "Think deeper",
  "Research before conclusion",
  "Strong teams prepare early",
  "Leadership needs clarity",
  "Real problems deserve real solutions",
  "Policy is practical",
  "Think clearly and build wisely",
  "Learning before competition",
  "Preparation creates confidence",
  "Students can shape systems",
  "Better ideas build better societies",
  "Questions lead to better answers",
  "Serious work wins",
  "Ideas must work in real life",
  "Policy thinking for real impact",
  "Clarity is a strength",
  "Solutions need evidence",
  "Governance begins with thought",
  "Young minds can solve hard problems",
  "The next team can start now",
  "Understanding comes before writing",
  "Do the work early",
  "Policy is more than opinion",
  "Learn the process",
  "Research gives direction",
  "Strong systems create strong results",
  "Practical ideas matter",
  "Read deeply",
  "Ask better questions",
  "Careful thinking wins trust",
  "Build ideas that can stand",
  "Discipline beats panic",
  "The Hub prepares thinkers",
  "Governance needs contributors",
  "Policy thinking starts here",
  "Preparation is part of victory",
  "Think beyond the surface",
  "Solutions need structure",
  "Every strong idea can be improved",
  "Good teams learn together",
  "Students can lead change",
  "Clarity before complexity",
  "Real learning builds confidence",
  "Public problems need thoughtful minds",
  "Policy is about people",
  "Great teams do not guess",
  "Compete with understanding",
  "Build ideas that fit Nigeria",
  "Research turns effort into insight",
  "Start small think big",
  "Teamwork needs direction",
  "Winning is built in stages",
  "Think critically",
  "Write simply",
  "Present clearly",
  "Solve honestly",
  "Evidence strengthens ideas",
  "Insight grows through discussion",
  "The future needs thoughtful leaders",
  "Learn policy from the ground up",
  "Preparation creates opportunities",
  "Work with purpose",
  "Good policy serves people",
  "Strong minds build strong institutions",
  "Think well act well",
  "Competitions reward clarity",
  "The Hub is a place to grow",
  "Build with discipline",
  "Policy work needs patience",
  "Serious preparation matters",
  "Real solutions need real effort",
  "The challenge starts before the stage",
  "Careful research changes everything",
  "Learn fast build better",
  "Problem solving is a skill",
  "Every voice can contribute",
  "Understanding leads to impact",
  "The Policy Hub builds capacity",
  "Think for society",
  "Prepare for FPDI 2026",
  "Ideas become stronger through review",
  "Better thinking better outcomes",
  "Read question analyze solve",
  "Start with the problem",
  "Policy learning can be simple",
  "Collaboration makes ideas stronger",
  "Preparation is not optional",
  "Thoughtful students shape the future",
  "Policy is built not guessed",
  "From questions to solutions",
  "Grow into a problem solver",
  "Compete with purpose",
  "Clarity attracts confidence",
  "The next winning team is preparing now",
  "Think like a builder",
  "Young people can lead national progress",
];

const whatWeDo = [
  {
    title: "Policy Competitions",
    text: "We prepare students for competitions like FPDI. You learn how to build strong ideas and present them well.",
  },
  {
    title: "Research and Thinking",
    text: "We break down real problems and understand them deeply. No guessing. No surface-level ideas.",
  },
  {
    title: "Mentorship",
    text: "We guide students on how to improve their ideas, writing, and presentations.",
  },
  {
    title: "Community",
    text: "We run weekly discussions where members share ideas and learn from each other.",
  },
];

const exploreCards = [
  {
    to: "/winning-system",
    label: "Winning Framework",
    desc: "Learn the exact process used to build a winning policy idea.",
    icon: Trophy,
  },
  {
    to: "/resources",
    label: "Resources",
    desc: "Access templates, guides, and examples.",
    icon: BookOpen,
  },
  {
    to: "/team-pairing",
    label: "Team Pairing",
    desc: "Create random teams and let students check their assigned partners.",
    icon: Shuffle,
  },
  // {
  //   to: "/mentorship",
  //   label: "Mentorship",
  //   desc: "Get help with your ideas and preparation.",
  //   icon: Calendar,
  // },
  {
    to: "/hub",
    label: "Policy Hub Guide",
    desc: "Understand how the Hub works and how to be part of it.",
    icon: Users,
  },
  {
    to: "/learn-system",
    label: "Learn System",
    desc: "Learn what policy is and how to think about it step by step.",
    icon: Lightbulb,
  },
  {
    to: "/faq",
    label: "FAQ",
    desc: "Get clear answers to common questions.",
    icon: HelpCircle,
  },
];

const Index = () => {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="container-narrow grid lg:grid-cols-12 gap-12 py-20 md:py-28 items-center">
          <RevealOnScroll className="lg:col-span-7" variant="fade">
            <div>
              <p className="eyebrow mb-6">
                <span className="h-px w-8 bg-accent" />
                FPDI Policy Challenge 2025 - First Place (Abuja Finals)
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.02] text-primary tracking-tight">
                {siteName}
              </h1>
              <p className="mt-4 text-xl md:text-2xl text-accent font-display leading-tight">
                Building Policy Thinkers. Designing Real Solutions.
              </p>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                The official online platform for students who want to understand policy, solve real
                problems, and prepare for policy competitions.
              </p>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                We are a student-led hub focused on helping members think better, research properly,
                and build strong ideas that can work in real life.
              </p>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Built by the team that won the FPDI Policy Challenge 2025 in Abuja.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/hub"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-secondary transition-colors shadow-soft"
                >
                  Join the Policy Hub <ArrowRight size={16} />
                </Link>
                <Link
                  to="/winning-system"
                  className="inline-flex items-center gap-2 rounded-sm border border-primary/20 bg-background px-6 py-3.5 text-sm font-medium text-primary hover:border-primary/60 transition-colors"
                >
                  Explore Winning Framework <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="lg:col-span-5 relative" delay={120} variant="pop">
            <div className="relative rounded-sm overflow-hidden shadow-elevated border border-border">
              <img
                src={heroImg}
                alt="Students working with notes and policy research materials"
                width={1536}
                height={1280}
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-multiply" />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="border-b border-border bg-surface overflow-hidden">
        <div className="marquee-strip py-5">
          <div className="marquee-track">
            {[...stripPhrases, ...stripPhrases].map((phrase, index) => (
              <div key={`${phrase}-${index}`} className="marquee-item">
                <span>{phrase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <RevealOnScroll className="container-narrow py-24 grid md:grid-cols-12 gap-10" variant="fade">
          <div className="md:col-span-4">
            <p className="eyebrow">What is the Policy Hub?</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-primary leading-tight">
              A simple place to learn policy by doing real work.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>
              The Adeleke University Policy Hub is a student community where people learn how to
              think about problems and create real solutions.
            </p>
            <p>This is not just a normal student group.</p>
            <p>It is a place where members discuss real issues, research ideas, build solutions, and prepare for competitions.</p>
            <p>
              If you are interested in leadership, governance, or solving problems in society,
              this is where you start.
            </p>
          </div>
        </RevealOnScroll>
      </section>

      <section className="border-b border-border bg-gradient-band">
        <div className="container-narrow py-24">
          <RevealOnScroll className="max-w-2xl" variant="fade">
            <p className="eyebrow">What Happens Here</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-primary">
              Clear learning. Real practice. Useful feedback.
            </h2>
          </RevealOnScroll>
          <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {whatWeDo.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 110} variant="pop">
                <article className="rounded-sm border border-border bg-card p-8">
                  <h3 className="font-display text-xl text-primary">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{item.text}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-narrow py-24">
          <RevealOnScroll className="max-w-2xl" variant="fade">
            <p className="eyebrow">Explore the Platform</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-primary">
              Start anywhere. Move step by step.
            </h2>
          </RevealOnScroll>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden border border-border">
            {exploreCards.map(({ to, label, desc, icon: Icon }, index) => (
              <RevealOnScroll key={to} delay={index * 90} variant="bounce">
                <Link
                  to={to}
                  className="group relative bg-card p-8 hover:bg-surface transition-colors min-h-[200px] flex flex-col justify-between"
                >
                  <Icon className="text-accent" size={22} />
                  <div>
                    <h3 className="font-display text-xl text-primary group-hover:text-accent transition-colors">
                      {label}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                  <ArrowUpRight
                    className="absolute top-6 right-6 text-muted-foreground group-hover:text-accent transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={18}
                  />
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <RevealOnScroll className="container-narrow py-24 grid md:grid-cols-12 gap-10 items-start" variant="pop">
          <div className="md:col-span-8">
            <p className="eyebrow">FPDI Policy Challenge 2026 Live</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl text-primary leading-tight">
              Status: Preparing Phase
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              The Policy Hub is currently preparing teams for the upcoming FPDI Policy Challenge 2026.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              The Theme: Rebuilding trust in the Nigeria state: Instructional Reforms for legitimacy, effectiveness and inclusive governance.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              To get paired, click the team pairing tab, enter your phone number and get to know your paired teammates.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <Link
              to="/team-pairing"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-secondary transition-colors shadow-soft"
            >
              Open Team Pairing <ArrowRight size={16} />
            </Link>
          </div>
        </RevealOnScroll>
      </section>

      <section className="bg-primary text-primary-foreground">
        <RevealOnScroll className="container-narrow py-20 grid md:grid-cols-12 gap-10 items-center" variant="pop">
          <div className="md:col-span-8">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
              The next winning team starts here.
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight">
              Most competitions are won before the final presentation.
            </h2>
            <p className="mt-4 max-w-2xl text-primary-foreground/75 leading-relaxed">
              Learn the process early and prepare properly.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <Link
              to="/winning-system"
              className="inline-flex items-center gap-2 rounded-sm bg-primary-foreground px-6 py-3.5 text-sm font-medium text-primary hover:bg-surface transition-colors"
            >
              Explore the System <ArrowRight size={16} />
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </SiteLayout>
  );
};

export default Index;
