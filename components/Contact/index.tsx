"use client";

import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import Container from "../Container";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SocialButton } from "@/components/ui/social-button";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";
import { getMotionVariants, viewportOnce } from "@/lib/motion";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";
import { useTranslations } from "@/lib/i18n/dictionary-context";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const Contact = () => {
  const t = useTranslations().contact;
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const reducedMotion = useReducedMotion();
  const { container, item } = getMotionVariants(reducedMotion);
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const statusId = useId();

  const validate = (form: HTMLFormElement): FieldErrors => {
    const formData = new FormData(form);
    const name = String(formData.get("user_name") || "").trim();
    const email = String(formData.get("user_email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const next: FieldErrors = {};

    if (!name) next.name = t.validation.nameRequired;
    else if (name.length < 2) next.name = t.validation.nameMin;

    if (!email) next.email = t.validation.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = t.validation.emailInvalid;
    }

    if (!message) next.message = t.validation.messageRequired;
    else if (message.length < 20) {
      next.message = t.validation.messageMin;
    }

    return next;
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    if (!formRef.current) return;

    const fieldErrors = validate(formRef.current);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus("error");
      setStatusMessage(t.validation.fixFields);
      return;
    }

    setIsSending(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_jt0dhte";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_i0djgfp";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "e3HwtEEiXF4PsfjEl";

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setStatus("success");
      setStatusMessage(t.successMessage);
      setErrors({});
      formRef.current.reset();
      trackEvent(AnalyticsEvent.ContactCta, { source: "contact_form_submit" });
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage(t.errorSend);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section-y relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="ambient-orb right-0 top-1/2 hidden h-[480px] w-[480px] translate-x-1/3 -translate-y-1/2 bg-primary/[0.06] opacity-60 sm:block" />
        <div className="ambient-orb bottom-0 left-0 hidden h-[420px] w-[420px] -translate-x-1/3 translate-y-1/4 bg-emerald-500/[0.04] opacity-50 sm:block" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={container}
        >
          <motion.div variants={item}>
            <SectionTitle
              title={t.sectionTitle}
              paragraph={t.sectionParagraph}
              align="center"
            />
          </motion.div>

          <div className="relative mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
            <motion.div variants={item} className="space-y-8 lg:col-span-5">
              <div>
                <p className="eyebrow mb-3">{t.eyebrow}</p>
                <h3 className="text-display mb-4 text-2xl text-foreground sm:text-3xl">
                  {t.heading}
                </h3>
                <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  {t.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                <ContactItem
                  icon={Mail}
                  label={t.emailLabel}
                  value="mehmedmuric22@gmail.com"
                  href="mailto:mehmedmuric22@gmail.com"
                  onClick={() => trackEvent(AnalyticsEvent.EmailClick, { source: "contact" })}
                />
                <ContactItem icon={MapPin} label={t.locationLabel} value={t.locationValue} />
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
                    <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {t.availabilityLabel}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{t.availabilityValue}</p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
                    <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {t.responseLabel}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{t.responseValue}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[0.06] pt-7">
                <p className="eyebrow mb-4">{t.connectLabel}</p>
                <div className="flex gap-3">
                  <SocialButton
                    href="https://github.com/mehmedmuric"
                    icon={Github}
                    label={t.githubProfile}
                    onClick={() => trackEvent(AnalyticsEvent.GithubClick, { source: "contact" })}
                  />
                  <SocialButton
                    href="https://linkedin.com/in/mehmed-muric-185297232"
                    icon={Linkedin}
                    label={t.linkedinProfile}
                    onClick={() => trackEvent(AnalyticsEvent.LinkedinClick, { source: "contact" })}
                  />
                  <SocialButton
                    href="https://twitter.com/mehmedmuricc"
                    icon={Twitter}
                    label={t.twitterProfile}
                  />
                </div>
              </div>

              <div className="glass-card relative overflow-hidden rounded-2xl p-5">
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                    </div>
                    <h4 className="text-sm font-medium text-foreground">{t.availableForTitle}</h4>
                  </div>
                  <ul className="space-y-2 pl-6 text-sm text-muted-foreground">
                    {t.availableFor.map((item) => (
                      <li
                        key={item}
                        className="relative before:absolute before:-left-3.5 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-primary/70"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="border-t border-white/[0.06] pt-3 text-sm text-muted-foreground">
                    {t.availableFooter}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="relative lg:col-span-7">
              <Card variant="glass" className="overflow-hidden rounded-[1.35rem]">
                <CardContent className="p-5 sm:p-8 lg:p-9">
                  {status === "success" ? (
                    <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                        <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground">
                        {t.successTitle}
                      </h3>
                      <p className="mb-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        {statusMessage || t.successMessage}
                      </p>
                      <Button
                        type="button"
                        variant="glass"
                        className="rounded-full px-6"
                        onClick={() => {
                          setStatus("idle");
                          setStatusMessage("");
                        }}
                      >
                        {t.sendAnother}
                      </Button>
                    </div>
                  ) : (
                    <form
                      ref={formRef}
                      onSubmit={sendEmail}
                      className="space-y-5"
                      noValidate
                      aria-describedby={status !== "idle" ? statusId : undefined}
                    >
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {t.formHint}
                      </p>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor={nameId}
                            className="ml-0.5 text-[13px] font-medium text-foreground/85"
                          >
                            {t.nameLabel}
                          </label>
                          <Input
                            id={nameId}
                            name="user_name"
                            required
                            autoComplete="name"
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? `${nameId}-error` : undefined}
                            className={cn(
                              "h-12 min-h-[48px] rounded-xl border-white/[0.08] bg-white/[0.03] transition-colors focus-visible:border-primary/40 focus-visible:bg-white/[0.05] sm:h-[52px] sm:min-h-[52px]",
                              errors.name && "border-destructive/40 focus-visible:border-destructive/50"
                            )}
                            placeholder={t.namePlaceholder}
                            onChange={() => setErrors((prev) => ({ ...prev, name: undefined }))}
                          />
                          {errors.name && (
                            <p id={`${nameId}-error`} className="text-xs text-red-400">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor={emailId}
                            className="ml-0.5 text-[13px] font-medium text-foreground/85"
                          >
                            {t.emailLabelField}
                          </label>
                          <Input
                            id={emailId}
                            name="user_email"
                            type="email"
                            required
                            autoComplete="email"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? `${emailId}-error` : undefined}
                            className={cn(
                              "h-12 min-h-[48px] rounded-xl border-white/[0.08] bg-white/[0.03] transition-colors focus-visible:border-primary/40 focus-visible:bg-white/[0.05] sm:h-[52px] sm:min-h-[52px]",
                              errors.email && "border-destructive/40 focus-visible:border-destructive/50"
                            )}
                            placeholder={t.emailPlaceholder}
                            onChange={() => setErrors((prev) => ({ ...prev, email: undefined }))}
                          />
                          {errors.email && (
                            <p id={`${emailId}-error`} className="text-xs text-red-400">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor={messageId}
                          className="ml-0.5 text-[13px] font-medium text-foreground/85"
                        >
                          {t.messageLabel}
                        </label>
                        <Textarea
                          id={messageId}
                          name="message"
                          required
                          rows={5}
                          aria-invalid={Boolean(errors.message)}
                          aria-describedby={errors.message ? `${messageId}-error` : undefined}
                          className={cn(
                            "min-h-[140px] resize-y rounded-xl border-white/[0.08] bg-white/[0.03] transition-colors focus-visible:border-primary/40 focus-visible:bg-white/[0.05]",
                            errors.message && "border-destructive/40 focus-visible:border-destructive/50"
                          )}
                          placeholder={t.messagePlaceholder}
                          onChange={() => setErrors((prev) => ({ ...prev, message: undefined }))}
                        />
                        {errors.message && (
                          <p id={`${messageId}-error`} className="text-xs text-red-400">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSending}
                        variant="premium"
                        size="xl"
                        className="group mt-1 h-[52px] min-h-[52px] w-full rounded-full"
                      >
                        {isSending ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            {t.sending}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            {t.sendMessage}
                            <Send
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        )}
                      </Button>

                      <div
                        id={statusId}
                        role="status"
                        aria-live="polite"
                        className={cn(status === "idle" && "sr-only")}
                      >
                        {status === "error" && (
                          <div className="mt-1 flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-sm font-medium text-red-400">
                            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <p>{statusMessage}</p>
                          </div>
                        )}
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

const ContactItem = ({
  icon: Icon,
  label,
  value,
  href,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  onClick?: () => void;
}) => (
  <div className="group flex min-h-[56px] items-center gap-3.5 rounded-2xl border border-transparent p-2.5 transition-colors duration-300 hover:border-white/[0.06] hover:bg-white/[0.02] active:bg-white/[0.03] sm:gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-primary transition-all duration-300 group-hover:border-primary/25 group-hover:bg-primary/[0.08]">
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
    </div>
    <div className="min-w-0">
      <p className="mb-0.5 text-xs font-medium text-muted-foreground">{label}</p>
      {href ? (
        <a
          href={href}
          onClick={onClick}
          className="link-underline break-all text-[15px] font-semibold text-foreground transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {value}
        </a>
      ) : (
        <p className="text-[15px] font-semibold text-foreground">{value}</p>
      )}
    </div>
  </div>
);

export default Contact;
