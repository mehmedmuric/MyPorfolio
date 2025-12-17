
import Breadcrumb from "../components/Common/Breadcrumb";

import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";

export const metadata: Metadata = {
  title: "Terms of Use | Legal Information",
  description: "Read the Terms of Use outlining the rules, responsibilities, and conditions for using this website, services, and content. Understand the terms and conditions for accessing and using this portfolio website.",
  alternates: {
    canonical: `${baseUrl}/TermsOfUse`,
  },
  openGraph: {
    title: "Terms of Use | Mehmed Muric Portfolio",
    description: "Read the Terms of Use outlining the rules, responsibilities, and conditions for using this website, services, and content.",
    url: `${baseUrl}/TermsOfUse`,
    siteName: "Mehmed Muric Portfolio",
    images: [
      {
        url: `${baseUrl}/images/logo/MMlogo.png`,
        width: 1200,
        height: 630,
        alt: "Terms of Use",
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

const TermsOfUse = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] bg-gradient-to-b from-[#0f1419] via-[#000000] to-[#051912] overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Animated Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scanLine" />
      </div>

      {/* Enhanced Parallax Background with Cyberpunk Glow */}
      <div className="absolute left-[5%] top-[14%] w-96 h-96 bg-[radial-gradient(circle,rgba(0,255,140,0.3)_0%,rgba(0,255,200,0.15)_40%,transparent_75%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform animate-pulse" aria-hidden />
      <div className="absolute right-[10%] bottom-[5%] w-[380px] h-[240px] bg-[radial-gradient(circle,rgba(0,200,255,0.2)_0%,rgba(100,200,255,0.1)_40%,transparent_80%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform" aria-hidden />
      
      {/* Cyberpunk Neon Accents */}
      <div className="absolute top-20 left-10 w-2 h-32 bg-gradient-to-b from-green-400 to-transparent opacity-60 blur-sm animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-2 bg-gradient-to-r from-cyan-400 to-transparent opacity-60 blur-sm animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-20">
        <Breadcrumb
          pageName="Terms of Use"
          description="By accessing and using this portfolio website, you agree to comply with and be bound by the following terms and conditions."
        />

        <div className="particles-bg overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8 bg-gradient-to-b bg-gray-900/30 from-gray-950/80 via-mygreen/5 to-mygreen/5 max-w-4xl mx-auto rounded-3xl border border-green-500/10 shadow-[0_0_40px_rgba(0,255,128,0.1)] backdrop-blur-sm">
      <h1 className="text-3xl font-bold tracking-tight mb-6 underline underline-offset-8 decoration-mygreen">Terms of Use</h1>

      <p className="text-body-color mb-8">
        By accessing and using this portfolio website, you agree to comply with and be bound by the
        following terms and conditions. If you do not agree with these terms, please refrain from
        using the site.
      </p>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Use of Content</h2>
        <p className="text-body-color">
          All content on this website, including text, code snippets, images, and projects, is
          provided for informational and portfolio purposes only. You may not copy, redistribute, or
          use the content without prior permission.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Accuracy of Information</h2>
        <p className="text-body-color">
          While I strive to keep the information up to date and accurate, I make no guarantees of
          completeness, reliability, or suitability of any content for specific purposes.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">External Links</h2>
        <p className="text-body-color">
          This website may contain links to third-party websites. I am not responsible for the
          content, accuracy, or practices of external sites and encourage you to review their own
          terms and policies.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Limitation of Liability</h2>
        <p className="text-body-color">
          I shall not be held liable for any direct, indirect, or consequential damages arising from
          the use of this website, including reliance on its content or technical issues.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Changes to Terms</h2>
        <p className="text-body-color">
          These terms may be updated from time to time. By continuing to use the site after changes
          are made, you accept the revised terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Contact</h2>
        <p className="text-body-color">
          If you have any questions regarding these Terms of Use, please contact me through the email
          address provided on this website.
        </p>
      </section>
    </div>
      </div>
    </div>
  );
};

export default TermsOfUse;      