"use client";

import dynamic from "next/dynamic";
import Breadcrumb from "../components/Common/Breadcrumb";
import Loader from "../components/Loader";

const Contact = dynamic(() => import("../components/Contact"), {
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
      <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-mygreen),transparent)] opacity-10"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl ring-1 shadow-mygreen/80 ring-mygreen/50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
      <Contact />
      </section>
    </>
  );
};

export default ContactClient;