
import AboutSection from "../components/AboutWebAndMobile";
import Breadcrumb from "../components/Common/Breadcrumb";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our Privacy Policy to learn how we collect, use, and protect your personal data when you use this website and its services.",
  openGraph: {
    title: "Privacy Policy | Mehmed Muric",
    description: "Read our Privacy Policy to learn how we collect, use, and protect your personal data when you use this website and its services.",
    url: "https://mehmedmuric/privacyPolicy",
    images: ["/images/logo/MMlogo.png"],
  },
};

const PrivacyPolicy = () => {
  return (
    <>
      <Breadcrumb
        pageName="Privacy Policy"
        description="---------"
      />
      <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6 underline underline-offset-[12px] decoration-mygreen">Privacy Policy</h1>

      <p className="text-body-color mb-8">
        Your privacy is important. This page explains what information may be collected while using
        my portfolio website and how it is used.
      </p>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Information Collection</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <span className="font-medium text-body-color">Personal Data</span> – Collected only if you voluntarily
            provide it via the contact form (name, email, message).
          </li>
          <li>
            <span className="font-medium text-body-color">Automatic Data</span> – Like most websites, this portfolio
            may use basic analytics tools (e.g., Google Analytics) that collect anonymous information
            such as IP address, browser type, and time of visit.
          </li>
        </ul>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Use of Information</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>To respond to messages sent through the contact form.</li>
          <li>To understand how visitors use the site and improve its content and functionality.</li>
        </ul>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Data Sharing</h2>
        <p className="text-gray-700">
          Your personal data is <span className="font-medium">not shared</span> with third parties and
          is not used for marketing purposes.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Cookies</h2>
        <p className="text-gray-700">
          This website may use cookies for basic functionality and analytics. You can disable cookies
          in your browser settings at any time.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Security</h2>
        <p className="text-gray-700">
          Reasonable measures are taken to protect your data, but please note that no internet
          transmission is 100% secure.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Your Rights</h2>
        <p className="text-gray-700">
          You may request the deletion of any personal information you submitted via the contact
          form at any time.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Contact</h2>
        <p className="text-gray-700">
          For any privacy-related questions, feel free to contact me via the email address provided
          on this website.
        </p>
      </section>
    </div>
    </>
  );
};

export default PrivacyPolicy;
