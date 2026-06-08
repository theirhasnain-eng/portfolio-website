import { motion } from "framer-motion";
import { useState } from "react";
import { siteConfig } from "../../data/siteConfig";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const sizeClasses = {
  md: "max-w-[280px]",
  lg: "max-w-sm w-full",
  hero: "w-full max-w-[340px] lg:max-w-[380px]",
};

export default function ProfileImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  showRing = true,
  size = "lg",
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageAlt = alt ?? `${siteConfig.name} — ${siteConfig.title}`;
  const initials = getInitials(siteConfig.name);
  const showImage = Boolean(src) && !error;

  return (
    <motion.div
      className={`relative ${sizeClasses[size] ?? sizeClasses.lg} ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {showRing && (
        <>
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-500 via-accent-500 to-blue-500 opacity-60 blur-xl animate-pulse-slow" />
          <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-brand-500 to-accent-500 p-[2px]">
            <div className="h-full w-full rounded-[1.65rem] bg-[var(--bg-primary)]" />
          </div>
        </>
      )}

      <div className="glass relative overflow-hidden rounded-[1.65rem] p-1.5 shadow-2xl">
        <div
          className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600/30 to-accent-600/20 ${imageClassName}`}
        >
          {showImage ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl font-bold text-gradient">
                    {initials}
                  </span>
                </div>
              )}
              <img
                src={src}
                alt={imageAlt}
                className={`h-full w-full object-cover object-top transition-opacity duration-500 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-6xl font-bold text-gradient">
                {initials}
              </span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/40 via-transparent to-transparent" />
        </div>
      </div>

      {src && error && (
        <p className="mt-2 text-center text-xs text-amber-400">
          Image not found: <code className="text-brand-400">{src}</code>
        </p>
      )}
    </motion.div>
  );
}
