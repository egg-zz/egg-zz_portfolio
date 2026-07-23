import { Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 30" className="w-4 h-5" aria-hidden="true">
            <ellipse cx="12" cy="16" rx="10" ry="13" fill="var(--accent)" />
          </svg>
          <span className="text-sm font-semibold">egg-zz · 권수린</span>
        </div>
        <p className="text-xs text-muted-foreground">Ideas, Built and Hatched — July 2026</p>
        <div className="flex gap-3">
          <a
            href="https://github.com/egg-zz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="mailto:surin@example.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
