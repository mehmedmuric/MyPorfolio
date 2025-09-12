
import AboutSection from "../components/AboutWebAndMobile";
import Breadcrumb from "../components/Common/Breadcrumb";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the Terms of Use outlining the rules, responsibilities, and conditions for using this website, services, and content.",
  openGraph: {
    title: "Terms of Use | Mehmed Muric",
    description: "Read the Terms of Use outlining the rules, responsibilities, and conditions for using this website, services, and content.",
    url: "https://mehmedmuric/TermsOfUse",
    images: ["/images/logo/MMlogo.png"],
  },
};

const TermsOfUse = () => {
  return (
    <>
      <Breadcrumb
        pageName="Terms of Use"
        description="---------"
      />

      <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6 underline underline-offset-8 decoration-mygreen">Terms of Use</h1>

      <p className="text-gray-700 mb-8">
        By accessing and using this portfolio website, you agree to comply with and be bound by the
        following terms and conditions. If you do not agree with these terms, please refrain from
        using the site.
      </p>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Use of Content</h2>
        <p className="text-gray-700">
          All content on this website, including text, code snippets, images, and projects, is
          provided for informational and portfolio purposes only. You may not copy, redistribute, or
          use the content without prior permission.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Accuracy of Information</h2>
        <p className="text-gray-700">
          While I strive to keep the information up to date and accurate, I make no guarantees of
          completeness, reliability, or suitability of any content for specific purposes.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">External Links</h2>
        <p className="text-gray-700">
          This website may contain links to third-party websites. I am not responsible for the
          content, accuracy, or practices of external sites and encourage you to review their own
          terms and policies.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Limitation of Liability</h2>
        <p className="text-gray-700">
          I shall not be held liable for any direct, indirect, or consequential damages arising from
          the use of this website, including reliance on its content or technical issues.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Changes to Terms</h2>
        <p className="text-gray-700">
          These terms may be updated from time to time. By continuing to use the site after changes
          are made, you accept the revised terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Contact</h2>
        <p className="text-gray-700">
          If you have any questions regarding these Terms of Use, please contact me through the email
          address provided on this website.
        </p>
      </section>
    </div>
   </>
  );
};

export default TermsOfUse;      