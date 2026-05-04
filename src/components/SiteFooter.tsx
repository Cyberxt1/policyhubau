import { Link } from "react-router-dom";
import { contactDetails, navLinks, siteName } from "@/content/siteContent";

export const SiteFooter = () => {
  return (
    <footer className="mt-16 border-t border-border bg-primary text-primary-foreground">
      <div className="container-narrow py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <img
              src="/favicon.png"
              alt="Adeleke University Policy Hub logo"
              className="h-10 w-10 rounded-sm object-contain"
            />
            <span className="font-display font-semibold tracking-tight leading-tight text-sm sm:text-base">
              {siteName}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70 leading-relaxed">
            A student-led platform where students learn how to understand problems, build
            practical policy ideas, and prepare for competitions like FPDI.
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-primary-foreground/50">
            Founded through the 2025 Winning Team
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
            Navigate
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-primary-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
            Contact
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li>
              <span className="block text-primary-foreground/50 text-xs uppercase tracking-wider">
                Email
              </span>
              <a
                href={`mailto:${contactDetails.leadEmail}`}
                className="hover:text-primary-foreground underline underline-offset-4"
              >
                {contactDetails.leadEmail}
              </a>
            </li>
            <li>
              <span className="block text-primary-foreground/50 text-xs uppercase tracking-wider">
                Support
              </span>
              <a
                href={`mailto:${contactDetails.supportEmail}`}
                className="hover:text-primary-foreground underline underline-offset-4"
              >
                {contactDetails.supportEmail}
              </a>
            </li>
            <li>
              <a
                href={contactDetails.whatsappUrl}
                className="hover:text-primary-foreground underline underline-offset-4"
              >
                Join the WhatsApp group
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <p>Founded through the 2025 Winning Team</p>
        </div>
      </div>
    </footer>
  );
};
