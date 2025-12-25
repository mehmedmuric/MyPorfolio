import PrivacyPolicyClient from "./PrivacyPolicyClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn about how we collect, use, and protect your personal information on this portfolio website.",
  alternates: {
    canonical: "https://mehmedmuric.com/privacyPolicy",
  },
  openGraph: {
    title: "Privacy Policy | Mehmed Muric",
    description: "Learn about how we collect, use, and protect your personal information on this portfolio website.",
    url: "https://mehmedmuric.com/privacyPolicy",
    images: ["/images/logo/MMlogo.png"],
  },
};

const PrivacyPolicy = () => {
  return <PrivacyPolicyClient />;
};

export default PrivacyPolicy;
