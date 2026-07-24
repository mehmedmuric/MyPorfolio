import { track } from "@vercel/analytics";

export const AnalyticsEvent = {
  ViewProjects: "view_projects",
  ContactCta: "contact_cta",
  CvDownload: "cv_download",
  EmailClick: "email_click",
  GithubClick: "github_click",
  LinkedinClick: "linkedin_click",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

/**
 * Lightweight custom-event helper for Vercel Analytics.
 * Safe to call from client components — no-ops if tracking is unavailable.
 */
export function trackEvent(
  name: AnalyticsEventName | string,
  properties?: Record<string, string | number | boolean | null>
) {
  try {
    track(name, properties);
  } catch {
    // Tracking must never break the UX
  }
}
