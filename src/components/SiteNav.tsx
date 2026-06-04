import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import fpdiLogo from "../../fpdiblack.svg";

export const SiteNav = () => {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-stretch border-t-4 border-primary bg-background shadow-sm">
      <div className="flex shrink-0 text-primary-foreground">
        <a
          href="/#about"
          className="flex w-16 flex-col items-center justify-center gap-1 bg-primary text-[11px] font-semibold transition-colors hover:bg-secondary"
        >
          <Menu size={19} />
          <span>Menu</span>
        </a>
        <a
          href="/hubs"
          className="hidden w-16 flex-col items-center justify-center gap-1 bg-secondary text-[11px] font-semibold transition-colors hover:bg-primary md:flex"
        >
          <Search size={18} />
          <span>Search</span>
        </a>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between px-3 md:px-7">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Policy Hub home">
          <img
            src={fpdiLogo}
            alt="FPDI"
            className="h-11 max-w-[34vw] shrink-0 object-contain md:h-12 md:max-w-none"
          />
        </Link>

        <nav className="flex shrink-0 items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.08em] text-primary md:gap-5 md:text-sm">
          <a href="/about" className="transition-colors hover:text-accent">
            About Us
          </a>
          <span className="h-4 w-px bg-primary/45" aria-hidden="true" />
          <a href="/apply" className="transition-colors hover:text-accent">
            How To Apply
          </a>
        </nav>
      </div>
    </header>
  );
};
