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
          className={`relative transition-all duration-300 ${
            sticky
              ? "bg-[#050805] border-y-2 border-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.35)]"
              : "bg-[#050805] border-y-2 border-[#00ff41]/70"
          }`}
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
          }}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, #00ff41 1px, #00ff41 2px)",
            }}
          />

          {/* Header content */}
          <div className="relative flex items-center justify-between px-4 py-1.5">
            {/* Logo */}
            <Link href="/" className="relative">
              <Image
                src="/images/logo/MMlogo.png"
                alt="Mehmed Muric Portfolio Logo"
                width={60}
                height={24}
                priority
                style={{ width: "auto", height: "auto" }}
                className="drop-shadow-[0_0_6px_rgba(0,255,65,0.6)]"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-6">
              {menuData.map((item, i) => (
                <Link
                  key={i}
                  href={item.path || "/"}
                  className={`font-mono text-sm tracking-wider transition ${
                    pathname === item.path
                      ? "text-[#00ff41]"
                      : "text-[#88ff88] hover:text-[#00ff41]"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              onClick={navbarToggleHandler}
              aria-label="Toggle menu"
              className="md:hidden w-10 h-10 border-2 border-[#00ff41] flex flex-col justify-center items-center gap-1"
            >
              <span
                className={`w-5 h-[2px] bg-[#00ff41] transition ${
                  navbarOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-[#00ff41] transition ${
                  navbarOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-[#00ff41] transition ${
                  navbarOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      {mounted && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
              navbarOpen
                ? "opacity-100 z-[90]"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setNavbarOpen(false)}
          />

          {/* Fullscreen panel */}
          <div
            className={`fixed inset-0 md:hidden bg-[#050805] z-[100] transition-transform duration-300 ease-out ${
              navbarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* HUD corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#00ff41]/60" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#00ff41]/60" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#00ff41]/60" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#00ff41]/60" />

            {/* Close button */}
            <button
              onClick={() => setNavbarOpen(false)}
              aria-label="Close menu"
              className="absolute top-6 right-6 w-10 h-10 border-2 border-[#00ff41] flex items-center justify-center hover:bg-[rgba(0,255,65,0.1)] transition"
            >
              <span className="text-[#00ff41] text-xl font-mono leading-none">×</span>
            </button>

            {/* MENU CENTERED */}
            <div className="w-full h-full grid place-items-center px-6">
              <nav className="w-full max-w-sm flex flex-col gap-3">
                {menuData.map((item, i) => (
                  <Link
                    key={i}
                    href={item.path || "/"}
                    onClick={() => setNavbarOpen(false)}
                    className={`w-full px-5 py-4 font-mono text-lg border-l-4 transition ${
                      pathname === item.path
                        ? "text-[#00ff41] bg-[rgba(0,255,65,0.2)] border-[#00ff41]"
                        : "text-[#e5ffe5] bg-black/70 border-[#00ff41]/40 hover:text-[#00ff41] hover:border-[#00ff41]"
                    }`}
                    style={{
                      textShadow: "0 0 10px rgba(0,255,65,0.6)",
                    }}
                  >
                    ▶ {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default memo(Header);
