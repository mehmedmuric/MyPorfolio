'use client';

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BotpressChat() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    // Osnovni CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/cssChat/botpress-custom.css";
    document.head.appendChild(link);

    // Responsive override + sakrij dok se ne učita
    const style = document.createElement("style");
    style.id = "bp-home-fix";
    style.innerHTML = `
      .bpw-layout {
        display: none !important;
        transition: opacity 0.3s ease-in-out;
        z-index: 99999 !important;
      }

      ${isHome ? `
      div.home .bpw-layout {
        position: fixed !important;
        bottom: 10px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: min(95%, 480px) !important;
        max-height: 80% !important;
        border-radius: 0 !important;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
      }` : `
      .bpw-layout {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        width: 300px !important;
      }`}

      /* Responsive mobilne veličine */
      @media (max-width: 425px) {
        div.home .bpw-layout {
          width: 95% !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          max-height: 75% !important;
        }
      }

      /* Kada je chat spreman */
      div.home .bpw-layout.ready {
        display: block !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);

    // Pokaži chat kada Botpress učita widget
    const onBotpressReady = () => {
      const chat = document.querySelector(".bpw-layout") as HTMLElement;
      if (chat) {
        chat.style.display = "block";
        chat.style.opacity = "1";
      }
    };
    window.addEventListener("bp::webchat-ready", onBotpressReady);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
      window.removeEventListener("bp::webchat-ready", onBotpressReady);
    };
  }, [pathname, isHome]);

  return (
    <>
      <Script
        key={`botpress-core-${pathname}`}
        src="https://cdn.botpress.cloud/webchat/v3.3/inject.js"
        strategy="afterInteractive"
        
      />
      <Script
        key={`botpress-config-${pathname}`}
        src="https://files.bpcontent.cloud/2025/09/17/00/20250917004657-NG87AUC3.js"
        strategy="afterInteractive"
        
      />
    </>
  );
}
