"use client";

import { useCallback, memo, useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menuData from "./menuData";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeHover, setActiveHover] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const pathname = usePathname();

  const navbarToggleHandler = useCallback(() => {
    setNavbarOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navbarOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY >= 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-[50] pt-1"
    >
      <div className="container mx-auto max-w-7xl px-3">
        <div
          className={`relative transition-all duration-500 ease-out ${
            sticky
              ? "bg-[#050805]/95 backdrop-blur-md border-y-2 border-[#00ff41]"
              : "bg-[#050805]/80 backdrop-blur-sm border-y-2 border-[#00ff41]/70"
          }`}
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
            ...(sticky && {
              boxShadow: "0 0 30px rgba(0,255,65,0.4), inset 0 1px 0 rgba(0,255,65,0.1)",
            }),
          } as React.CSSProperties}
        >
          {/* Animated gradient overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,255,65,0.5) 50%, transparent 100%)",
              animation: "shimmer 3s ease-in-out infinite",
            } as React.CSSProperties}
          />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, #00ff41 1px, #00ff41 2px)",
            }}
          />

          {/* Glow pulse effect */}
          {sticky && (
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                boxShadow: "inset 0 0 60px rgba(0,255,65,0.15)",
                animation: "pulseGlow 3s ease-in-out infinite",
              } as React.CSSProperties}
            />
          )}

          {/* Header content */}
          <div className="relative flex items-center justify-between px-4 py-2 md:py-2.5">
            {/* Logo with enhanced hover effect */}
            <Link
              href="/"
              className="relative group transition-transform duration-300 hover:scale-105"
              onMouseEnter={() => setActiveHover(-1)}
              onMouseLeave={() => setActiveHover(null)}
            >
              <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 bg-[#00ff41] transition-opacity duration-300 -z-10" />
              <Image
                src="/images/logo/MMlogo.png"
                alt="Mehmed Muric Portfolio Logo"
                width={60}
                height={24}
                priority
                style={{ width: "auto", height: "auto" }}
                className="drop-shadow-[0_0_8px_rgba(0,255,65,0.7)] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(0,255,65,0.9)]"
              />
            </Link>

            {/* Desktop nav with enhanced animations */}
            <nav className="hidden md:flex gap-1">
              {menuData.map((item, i) => {
                const isActive = pathname === item.path;
                const isHovered = activeHover === i;
                return (
                  <Link
                    key={i}
                    href={item.path || "/"}
                    onMouseEnter={() => setActiveHover(i)}
                    onMouseLeave={() => setActiveHover(null)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative font-mono text-sm tracking-wider px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:ring-offset-2 focus:ring-offset-[#050805] rounded ${
                      isActive
                        ? "text-[#00ff41]"
                        : "text-[#88ff88] hover:text-[#00ff41]"
                    }`}
                  >
                    {/* Active indicator line */}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00ff41]"
                        style={{
                          boxShadow: "0 0 8px rgba(0,255,65,0.8)",
                          animation: "slideIn 0.3s ease-out",
                        } as React.CSSProperties}
                      />
                    )}

                    {/* Hover background effect */}
                    <span
                      className={`absolute inset-0 bg-[rgba(0,255,65,0.08)] transition-opacity duration-300 ${
                        isHovered && !isActive
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      style={{
                        clipPath:
                          "polygon(0 0, calc(100% - 2px) 0, 100% 2px, 100% 100%, 2px 100%, 0 calc(100% - 2px))",
                      }}
                    />

                    {/* Text with glow on hover/active */}
                    <span
                      className={`relative z-10 ${
                        isActive || isHovered
                          ? "text-shadow-[0_0_8px_rgba(0,255,65,0.6)]"
                          : ""
                      }`}
                    >
                      {item.title}
                    </span>

                    {/* Corner accents on hover */}
                    {isHovered && (
                      <>
                        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff41]/60" />
                        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ff41]/60" />
                        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ff41]/60" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff41]/60" />
                      </>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile toggle with enhanced animation */}
            <button
              onClick={navbarToggleHandler}
              aria-label="Toggle menu"
              className="md:hidden w-10 h-10 border-2 border-[#00ff41] flex flex-col justify-center items-center gap-1.5 relative group hover:bg-[rgba(0,255,65,0.1)] transition-all duration-300"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 blur-sm bg-[#00ff41] transition-opacity duration-300 -z-10" />
              <span
                className={`w-5 h-[2px] bg-[#00ff41] transition-all duration-300 origin-center ${
                  navbarOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-[#00ff41] transition-all duration-300 ${
                  navbarOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-[#00ff41] transition-all duration-300 origin-center ${
                  navbarOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      {mounted && (
        <>
          {/* Overlay with enhanced blur */}
          <div
            className={`fixed inset-0 bg-black/80 backdrop-blur-md transition-all duration-500 md:hidden ${
              navbarOpen
                ? "opacity-100 z-[90]"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setNavbarOpen(false)}
          />

          {/* Fullscreen panel with improved animations */}
          <div
            className={`fixed inset-0 md:hidden bg-[#050805] z-[100] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
              navbarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Animated grid background */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                animation: "headerGridMove 20s linear infinite",
              } as React.CSSProperties}
            />

            {/* HUD corners with pulse animation */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#00ff41]/60 animate-hud-pulse" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#00ff41]/60 animate-hud-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#00ff41]/60 animate-hud-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#00ff41]/60 animate-hud-pulse" style={{ animationDelay: "1.5s" }} />

            {/* Close button with enhanced hover */}
            <button
              onClick={() => setNavbarOpen(false)}
              aria-label="Close menu"
              className="absolute top-6 right-6 w-10 h-10 border-2 border-[#00ff41] flex items-center justify-center hover:bg-[rgba(0,255,65,0.15)] transition-all duration-300 group"
            >
              <span className="text-[#00ff41] text-xl font-mono leading-none transition-transform duration-300 group-hover:rotate-90">
                ×
              </span>
            </button>

            {/* MENU CENTERED with staggered animations */}
            <div className="w-full h-full grid place-items-center px-6">
              <nav className="w-full max-w-sm flex flex-col gap-2">
                {menuData.map((item, i) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={i}
                      href={item.path || "/"}
                      onClick={() => setNavbarOpen(false)}
                      className={`relative w-full px-5 py-4 font-mono text-lg border-l-4 transition-all duration-300 overflow-hidden group ${
                        isActive
                          ? "text-[#00ff41] bg-[rgba(0,255,65,0.15)] border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                          : "text-[#e5ffe5] bg-black/50 border-[#00ff41]/40 hover:text-[#00ff41] hover:border-[#00ff41] hover:bg-[rgba(0,255,65,0.1)]"
                      }`}
                      style={{
                        textShadow: "0 0 10px rgba(0,255,65,0.6)",
                        animationDelay: `${i * 0.1}s`,
                        animation: navbarOpen
                          ? "slideInLeft 0.5s ease-out forwards"
                          : "none",
                        opacity: navbarOpen ? 1 : 0,
                      } as React.CSSProperties}
                    >
                      {/* Hover scanline effect */}
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,255,65,0.1)] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                      />

                      {/* Active glow */}
                      {isActive && (
                        <div
                          className="absolute inset-0 bg-[rgba(0,255,65,0.05)]"
                          style={{
                            boxShadow: "inset 0 0 20px rgba(0,255,65,0.2)",
                          }}
                        />
                      )}

                      <span className="relative z-10 flex items-center gap-2">
                        <span className="text-[#00ff41]">▶</span>
                        {item.title}
                      </span>

                      {/* Corner details */}
                      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00ff41]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00ff41]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default memo(Header);
