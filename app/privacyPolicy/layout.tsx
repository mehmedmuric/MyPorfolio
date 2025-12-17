import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Data Protection",
  description: "Read our Privacy Policy to understand how we collect, use, and protect your personal information. Learn about data collection, cookies, security measures, and your privacy rights.",
  alternates: {
    canonical: `${baseUrl}/privacyPolicy`,
  },
  openGraph: {
    title: "Privacy Policy | Mehmed Muric Portfolio",
    description: "Read our Privacy Policy to understand how we collect, use, and protect your personal information.",
    url: `${baseUrl}/privacyPolicy`,
    siteName: "Mehmed Muric Portfolio",
    images: [
      {
        url: `${baseUrl}/images/logo/MMlogo.png`,
        width: 1200,
        height: 630,
        alt: "Privacy Policy",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

