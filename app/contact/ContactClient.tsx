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
          pageName="Contact Me"
          description="Let's get in touch — I respond to every message within a day."
        />
        
        <Contact />
      </div>
    </div>
  );
};

export default ContactClient;