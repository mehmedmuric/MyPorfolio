"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import menuData from "./menuData";
import { Button } from "../ui/button";
import Container from "../Container";
import { cn } from "@/lib/utils";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();

  const closeMenu = useCallback(() => setNavbarOpen(false), []);

  // Scroll handler for sticky header
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setSticky(window.scrollY >= 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when menu is open
  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navbarOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
          sticky
            ? "bg-background/70 backdrop-blur-xl border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "bg-transparent py-6"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="relative z-50 group flex items-center gap-2" onClick={closeMenu}>
            <div className="relative">
              <Image
                src="/images/logo/MMlogo.png"
                alt="Mehmed Muric"
                width={48}
                height={48}
                className="w-10 h-auto sm:w-12 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                priority
              />
              {/* Logo Glow */}
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/5 shadow-inner">
            {menuData.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path || "/"}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
                    isActive
                      ? "text-primary bg-white/5 shadow-[0_0_10px_rgba(0,255,128,0.1)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {item.title}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full ring-1 ring-primary/20 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" passHref>
              <Button variant="premium" size="sm" className="hidden lg:inline-flex">
                Let's Talk
              </Button>
              <Button variant="ghost" size="icon" className="lg:hidden text-primary">
                <MailIcon className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="md:hidden relative z-50 p-2 text-primary focus:outline-none transition-transform active:scale-95"
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {navbarOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </Container>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {navbarOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/90 md:hidden"
          >
            {/* Background elements optimized: removed heavy CSS blur filters for mobile */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-primary/5 to-transparent rounded-full opacity-80 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-secondary/5 to-transparent rounded-full opacity-80 pointer-events-none" />

            <nav className="flex flex-col items-center gap-6 relative z-10 w-full px-8 mt-12">
              {menuData.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.path || "/"}
                    onClick={closeMenu}
                    className={cn(
                      "text-3xl font-bold tracking-tight transition-all duration-300 hover:scale-110",
                      pathname === item.path
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                        : "text-muted-foreground hover:text-white"
                    )}
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + menuData.length * 0.1, duration: 0.3 }}
                className="w-16 h-1 bg-white/10 rounded-full my-4"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + menuData.length * 0.1, duration: 0.3 }}
                className="w-full max-w-[250px]"
              >
                <Link href="/contact" onClick={closeMenu}>
                  <Button size="lg" className="w-full text-lg">Let's Talk</Button>
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + menuData.length * 0.1, duration: 0.4 }}
                className="flex items-center gap-6 mt-8"
              >
                <Link href="https://github.com/mehmedmuric" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-6 h-6" />
                </Link>
                <Link href="https://linkedin.com/in/mehmed-muric" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-6 h-6" />
                </Link>
                <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-6 h-6" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Start of mail icon component for small CTA
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default Header;
