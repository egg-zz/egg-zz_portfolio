
const NAV_LINKS = [
  { id: "tray", label: "Egg Tray" },
  { id: "projects", label: "Projects" },
  { id: "lab", label: "Egg Lab" },
  { id: "about", label: "About" },
];

interface HeaderProps {
  activeNav: string;
  onNavigate: (id: string) => void;
}

export function Header({ activeNav, onNavigate }: HeaderProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2.5">
          <svg viewBox="0 0 24 30" className="w-5 h-6" aria-hidden="true">
            <ellipse cx="12" cy="16" rx="10" ry="13" fill="var(--accent)" />
          </svg>
          <span className="font-semibold text-sm tracking-tight">egg-zz</span>
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeNav === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <a
          href="mailto:surin@example.com"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          연락하기
        </a>
      </div>
    </nav>
  );
}
