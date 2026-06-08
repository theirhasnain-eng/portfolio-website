import { siteConfig } from "../../data/siteConfig";

/** Opens Gmail compose in the browser — works even without a desktop mail app */
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}`;

export default function EmailLink({
  children,
  className = "",
  showIcon = false,
  icon: Icon,
  ...props
}) {
  return (
    <a
      href={gmailComposeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {showIcon && Icon && <Icon className="h-5 w-5 shrink-0" />}
      {children ?? siteConfig.email}
    </a>
  );
}
