import { motion } from "framer-motion";
import { useState } from "react";
import { FiAlertCircle, FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";
import { siteConfig } from "../../data/siteConfig";
import { submitContact } from "../../services/api";
import Button from "../ui/Button";
import EmailLink from "../ui/EmailLink";
import SectionHeading from "../ui/SectionHeading";

const initialForm = { name: "", email: "", subject: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  else if (form.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";

  if (!form.message.trim()) errors.message = "Message is required";
  else if (form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";

  return errors;
}

const socialLinks = [
  { href: siteConfig.social.github, icon: FiGithub, label: "GitHub" },
  { href: siteConfig.social.linkedin, icon: FiLinkedin, label: "LinkedIn" },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("sending");
    setServerError("");

    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || "Portfolio inquiry",
        message: form.message.trim(),
      });
      setStatus("success");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      if (err.errors) setErrors((prev) => ({ ...prev, ...err.errors }));
      setServerError(err.message || "Something went wrong. Please try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-brand-500 focus:bg-brand-500/5 focus:ring-2 focus:ring-brand-500/20 ${
      errors[field] ? "border-red-500/50" : "border-[var(--border-subtle)]"
    }`;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-brand-500/15 blur-3xl" />

      <div className="container-main relative">
        <SectionHeading
          label="Contact"
          title="Let's build something great"
          subtitle="Share your project idea or opportunity — every message is saved securely and I'll respond within 24 hours."
        />

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass card-shine h-full rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Get in touch
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Whether you need a landing page, React app, or long-term
                collaboration — I&apos;d love to hear from you.
              </p>

              <EmailLink
                showIcon
                icon={FiMail}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-500/10 px-4 py-3 text-brand-400 transition-colors hover:bg-brand-500/20"
              >
                <span className="font-medium break-all">{siteConfig.email}</span>
              </EmailLink>

              <div className="mt-8 flex gap-3">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass glass-hover flex h-12 w-12 items-center justify-center rounded-xl text-[var(--text-secondary)] hover:text-brand-400"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
                <EmailLink
                  aria-label="Email"
                  className="glass glass-hover flex h-12 w-12 items-center justify-center rounded-xl text-[var(--text-secondary)] hover:text-brand-400"
                >
                  <FiMail className="h-5 w-5" />
                </EmailLink>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="glass card-shine rounded-2xl p-8 lg:col-span-3"
            noValidate
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass("subject")}
                  placeholder="Project inquiry / Job opportunity"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass("message")} resize-none`}
                  placeholder="Tell me about your project, timeline, and budget..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>
            </div>

            {serverError && status === "error" && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" disabled={status === "sending"}>
                <FiSend className="h-4 w-4" />
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                    ? "Message Sent!"
                    : "Send Message"}
              </Button>

              {status === "success" && (
                <p className="text-sm text-emerald-400">
                  Thank you! Your message has been saved. I&apos;ll reply soon.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
