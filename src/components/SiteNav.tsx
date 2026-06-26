import { Compass, HelpCircle, Menu, Search, UserPlus, Users, X } from "lucide-react";
import { useEffect, useState } from "react";

const menuLinks = [
  { href: "/", label: "Home", icon: Compass },
  { href: "/about", label: "About Us", icon: Users },
  { href: "/apply", label: "How To Apply", icon: UserPlus },
  { href: "/hubs", label: "Universities", icon: Search },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
];

export const SiteNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-stretch bg-background/95 shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur">
      <div className="flex shrink-0 pl-1 text-primary-foreground md:pl-2">
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="site-sidebar"
          onClick={() => setIsMenuOpen(true)}
          className="m-2 flex w-12 flex-col items-center justify-center gap-1 rounded-full bg-primary text-[11px] font-semibold transition-colors hover:bg-secondary"
        >
          <Menu size={19} />
          <span>Menu</span>
        </button>
        <a
          href="/hubs"
          className="m-2 hidden w-12 flex-col items-center justify-center gap-1 rounded-full bg-secondary text-[11px] font-semibold transition-colors hover:bg-primary md:flex"
        >
          <Search size={18} />
          <span>Search</span>
        </a>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between px-3 md:px-7">
        <div aria-hidden="true" />

        <nav className="flex shrink-0 items-center gap-3 text-xs font-semibold text-primary md:gap-5 md:text-sm">
          <a href="/about" className="transition-colors hover:text-accent">
            About Us
          </a>
          <span className="h-4 w-px bg-primary/45" aria-hidden="true" />
          <a href="/apply" className="transition-colors hover:text-accent">
            How To Apply
          </a>
        </nav>
      </div>

      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={isMenuOpen ? 0 : -1}
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-50 bg-primary/35 backdrop-blur-[2px] transition-opacity duration-300 ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="site-sidebar"
        aria-hidden={!isMenuOpen}
        className={`fixed left-3 top-3 z-50 flex h-[calc(100svh-1.5rem)] w-[min(calc(100vw-1.5rem),22rem)] flex-col rounded-[24px] bg-background shadow-2xl transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "pointer-events-none -translate-x-[calc(100%+1.5rem)]"
        }`}
      >
        <div className="px-6 pb-5 pt-7">
          <div className="flex items-start justify-between gap-4">
            <p className="font-display text-2xl font-bold text-primary">
              Policy Hub
            </p>
            <button
              type="button"
              aria-label="Close sidebar"
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-secondary"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <p className="mt-2 text-sm font-medium text-muted-foreground">Explore the ambassador network.</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Sidebar navigation">
          {menuLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
              className="flex min-h-12 items-center gap-3 rounded-[18px] px-3 text-sm font-semibold text-primary transition-colors hover:bg-surface hover:text-accent"
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </aside>
    </header>
  );
};
