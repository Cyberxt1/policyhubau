import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/content/siteContent";

export const SiteNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-[88rem] items-center justify-between gap-3 px-5 md:px-8 xl:px-10">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/favicon.png"
            alt="Adeleke University Policy Hub logo"
            className="h-10 w-10 rounded-sm object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-5 flex-1 text-[13px]">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/mentorship"
          className="hidden lg:inline-flex items-center shrink-0 rounded-sm bg-primary px-3.5 py-1.5 text-[13px] font-medium text-primary-foreground hover:bg-secondary transition-colors"
        >
          Book Session
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-sm text-primary shrink-0"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-narrow flex flex-col py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2.5 text-sm border-b border-border/50 ${
                    isActive ? "text-primary font-medium" : "text-muted-foreground"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/mentorship"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex justify-center rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Book Session
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
