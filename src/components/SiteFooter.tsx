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
    <footer className="bg-primary text-primary-foreground">
      <div className="container-narrow grid gap-6 py-8 md:grid-cols-2 md:gap-10 md:py-12">
        <div>
          <img src={fpdiLogo} alt="FPDI" className="h-11 w-auto rounded-[16px] bg-background px-3 py-2 object-contain md:h-14" />
          <p className="mt-4 text-xs font-semibold md:mt-6 md:text-sm">Email us:</p>
          <a href={`mailto:${contactDetails.email}`} className="mt-2 block text-xs font-semibold hover:text-gold md:text-sm">
            {contactDetails.email}
          </a>
          <a href="/hubs" className="mt-5 block text-xs font-semibold hover:text-gold md:mt-8 md:text-sm">
            Find Campuses
          </a>
          <div className="mt-5 flex gap-3 md:mt-8">
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

        <div className="rounded-[22px] bg-white/[0.07] p-5 md:rounded-[24px] md:p-6">
          <h3 className="font-display text-xl font-semibold md:text-2xl">Explore</h3>
          <ul className="mt-4 grid gap-1 text-xs font-semibold md:mt-7 md:gap-3 md:text-sm">
            {siteMap.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="block rounded-full px-1 py-1.5 hover:text-gold md:py-2">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-primary">
        <div className="container-narrow flex flex-col gap-3 py-4 text-xs font-semibold md:flex-row md:items-center md:justify-between md:text-sm">
          <div className="font-display text-lg font-semibold text-primary-foreground md:text-xl">
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
