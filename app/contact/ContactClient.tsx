"use client";

import dynamic from "next/dynamic";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Loader from "@/components/Loader";

const Contact = dynamic(() => import("@/components/Contact"), {
  ssr: false, // ili true ako treba SEO
  loading: () => <Loader />,
});







const ContactClient = () => {

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

export default ContactClient;