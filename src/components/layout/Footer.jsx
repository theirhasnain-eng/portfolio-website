import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { siteConfig } from "../../data/siteConfig";
import EmailLink from "../ui/EmailLink";

const socialIcons = [
  { href: siteConfig.social.github, icon: FiGithub, label: "GitHub" },
  { href: siteConfig.social.linkedin, icon: FiLinkedin, label: "LinkedIn" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="container-main section-padding !py-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-bold text-[var(--text-primary)]">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            © {year} All rights reserved. Built with React & Tailwind.
          </p>
        </div>

        <div className="flex gap-3">
          {socialIcons.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glass flex h-11 w-11 items-center justify-center rounded-xl text-[var(--text-secondary)] transition-all hover:border-[var(--border-glow)] hover:text-brand-400"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
          <EmailLink
            aria-label="Email"
            className="glass flex h-11 w-11 items-center justify-center rounded-xl text-[var(--text-secondary)] transition-all hover:border-[var(--border-glow)] hover:text-brand-400"
          >
            <FiMail className="h-5 w-5" />
          </EmailLink>
        </div>
      </div>
    </footer>
  );
}
