import { Compass, HelpCircle, Menu, Search, UserPlus, Users } from "lucide-react";
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
    <header className="sticky top-0 z-40 flex h-16 w-full items-stretch border-t-4 border-primary bg-background shadow-sm">
      <div className="flex shrink-0 text-primary-foreground">
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="site-sidebar"
          onClick={() => setIsMenuOpen(true)}
          className="flex w-16 flex-col items-center justify-center gap-1 bg-primary text-[11px] font-semibold transition-colors hover:bg-secondary"
        >
          <Menu size={19} />
          <span>Menu</span>
        </button>
        <a
          href="/hubs"
          className="hidden w-16 flex-col items-center justify-center gap-1 bg-secondary text-[11px] font-semibold transition-colors hover:bg-primary md:flex"
        >
          <Search size={18} />
          <span>Search</span>
        </a>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between px-3 md:px-7">
        <div aria-hidden="true" />

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
        className={`fixed left-0 top-0 z-50 flex h-svh w-[min(82vw,22rem)] flex-col bg-background shadow-2xl transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "pointer-events-none -translate-x-full"
        }`}
      >
        <div className="border-t-4 border-primary px-6 pb-5 pt-7">
          <p className="font-display text-lg font-bold uppercase tracking-[0.08em] text-primary">
            Policy Hub
          </p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">Explore the ambassador network.</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Sidebar navigation">
          {menuLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
              className="flex min-h-12 items-center gap-3 rounded-md px-3 font-display text-sm font-semibold uppercase tracking-[0.06em] text-primary transition-colors hover:bg-surface hover:text-accent"
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
