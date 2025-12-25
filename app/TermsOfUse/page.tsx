import TermsOfUseClient from "./TermsOfUseClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the Terms of Use outlining the rules, responsibilities, and conditions for using this website, services, and content.",
  alternates: {
    canonical: "https://mehmedmuric.com/TermsOfUse",
  },
  openGraph: {
    title: "Terms of Use | Mehmed Muric",
    description: "Read the Terms of Use outlining the rules, responsibilities, and conditions for using this website, services, and content.",
    url: "https://mehmedmuric.com/TermsOfUse",
    images: ["/images/logo/MMlogo.png"],
  },
};

const TermsOfUse = () => {
  return <TermsOfUseClient />;
};

export default TermsOfUse;      