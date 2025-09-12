import Breadcrumb from "../components/Common/Breadcrumb";
import Contact from "../components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to me via the contact form or social media.",
  openGraph: {
    title: "Contact | Mehmed Muric",
    description: "Full-stack developer portfolio contact page.",
    url: "https://mehmedmuric.com/contact",
    images: ["/images/logo/MMlogo.png"],
  },
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Me"
        description=""
      />

      <Contact />
    </>
  );
};

export default ContactPage;
