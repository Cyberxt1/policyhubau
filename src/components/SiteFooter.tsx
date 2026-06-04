import { Instagram, Linkedin, X } from "lucide-react";
import { contactDetails } from "@/content/siteContent";
import fpdiLogo from "../../fpdiblack.svg";

const siteMap = [
  { href: "/#about", label: "Our Mission" },
  { href: "/about", label: "About Us" },
  { href: "/hubs", label: "Universities" },
  { href: "/apply", label: "How To Apply" },
];

export const SiteFooter = () => {
  return (
    <footer className="bg-neutral-700 text-primary-foreground">
      <div className="container-narrow grid gap-10 py-12 md:grid-cols-2 md:py-16">
        <div>
          <img src={fpdiLogo} alt="FPDI" className="h-12 w-auto rounded-sm bg-background px-2 py-1 object-contain" />
          <p className="mt-6 text-sm font-semibold">Email us:</p>
          <a href={`mailto:${contactDetails.email}`} className="mt-2 block text-sm font-semibold hover:text-gold">
            {contactDetails.email}
          </a>
          <a href="/hubs" className="mt-8 block text-sm font-semibold hover:text-gold">
            Find Campuses
          </a>
          <div className="mt-8 flex gap-3">
            <a
              className="footer-social"
              href="https://www.linkedin.com/company/future-pathways-development-initiative"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a className="footer-social" href="https://www.instagram.com/fpdiafrica/" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a className="footer-social" href="https://x.com/FPDIAfrica" aria-label="X">
              <X size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl font-semibold">Explore</h3>
          <ul className="mt-7 space-y-6 text-sm font-semibold">
            {siteMap.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-gold">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-primary">
        <div className="container-narrow flex flex-col gap-4 py-5 text-sm font-semibold md:flex-row md:items-center md:justify-between">
          <div className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-primary-foreground">
            FPDI <span className="text-gold">Africa</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="/about" className="hover:text-gold">About</a>
            <a href="/apply" className="hover:text-gold">Apply</a>
            <a href={`mailto:${contactDetails.email}`} className="hover:text-gold">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
