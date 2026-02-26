"use client";
import { memo } from 'react';
import Link from "next/link";
import NextImage from "next/image";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

import Container from "../Container";
import { Button } from "../ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background relative overflow-hidden border-t border-white/5 pt-20 pb-10">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-block group relative">
              <NextImage
                src="/images/logo/MMlogo.png"
                alt="Mehmed Muric"
                width={48}
                height={48}
                className="w-10 h-auto sm:w-12 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 relative z-10"
                priority
              />
              {/* Logo Glow */}
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Crafting premium digital experiences with cutting-edge technology and pixel-perfect precision.
            </p>
            <div className="flex gap-3">
              <SocialLink href="https://github.com/mehmedmuric" icon={Github} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/mehmed-muric-185297232" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="mailto:mehmedmuric22@gmail.com" icon={Mail} label="Email" />
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-white uppercase tracking-wider mb-6">Navigation</h3>
            <ul className="space-y-4">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/projects" label="Projects" />
              <FooterLink href="/about" label="About" />
              <FooterLink href="/contact" label="Contact" />
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-white uppercase tracking-wider mb-6">Legals</h3>
            <ul className="space-y-4">
              <FooterLink href="/privacyPolicy" label="Privacy Policy" />
              <FooterLink href="/TermsOfUse" label="Terms of Use" />
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-white uppercase tracking-wider mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="mailto:mehmedmuric22@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors group">
                  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail size={14} />
                  </span>
                  mehmedmuric22@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <span className="relative w-8 h-8 flex items-center justify-center">
                  <span className="absolute inset-0 bg-green-500/10 rounded-full animate-pulse group-hover:bg-green-500/20 transition-colors" />
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                </span>
                <span className="text-green-500/90 group-hover:text-green-400 transition-colors">Available for new projects</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/60">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <p>
              © <span suppressHydrationWarning>{currentYear}</span> Mehmed Muric. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="hover:text-white/80 transition-colors">Designed & Built with Next.js</span>
              <span className="hidden md:block w-1 h-1 bg-white/10 rounded-full" />
              <span className="hover:text-white/80 transition-colors">Novi Pazar, Serbia</span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-primary transition-colors"
            aria-label="Back to top"
          >
            <span className="uppercase tracking-wider font-mono text-[10px]">Back to Top</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300 border border-white/5 group-hover:border-primary/20">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </Container>
    </footer>
  );
};

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 active:scale-95 group"
  >
    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
  </a>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group w-full"
    >
      <span className="w-1.5 h-px bg-primary/50 block scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
    </Link>
  </li>
);

export default Footer;
