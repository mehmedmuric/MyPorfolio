'use client';
import { memo, useEffect, useRef, useState, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const socials = [
  {
    href: "https://github.com/mehmedmuric",
    label: "GitHub",
    icon: (
      <svg className="w-5 h-5 text-[#00FF41] group-hover:text-[#00FF41] transition" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/mehmed-muric",
    label: "LinkedIn",
    icon: (
      <svg className="w-5 h-5 text-[#00FF41] group-hover:text-[#00FF41] transition" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452H17.2V14.89c0-1.326-.028-3.036-1.85-3.036-1.853 0-2.136 1.446-2.136 2.941v5.657H9.069V9.5h3.123v1.496h.044c.435-.825 1.498-1.694 3.08-1.694 3.292 0 3.896 2.166 3.896 4.984v6.166zM5.337 8.004c-1.005 0-1.82-.818-1.82-1.826 0-1.008.815-1.826 1.82-1.826 1.008 0 1.824.818 1.824 1.826 0 1.008-.816 1.826-1.824 1.826zm1.648 12.448H3.692V9.5h3.293v10.952z"/>
      </svg>
    ),
  },
  {
    href: "mailto:mehmedmuric22@gmail.com",
    label: "Mail",
    icon: (
      <svg className="w-5 h-5 text-[#00FF41] group-hover:text-[#00FF41] transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor"/>
        <path d="M3 7l9 6 9-6"/>
      </svg>
    )
  }
];

const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized mouse parallax with throttling
  useEffect(() => {
    if (isReducedMotion) return;
    
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 25,
          y: (e.clientY / window.innerHeight - 0.5) * 25,
        });
        rafId = null;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  // GSAP animations
  useEffect(() => {
    if (!footerRef.current || isReducedMotion || typeof window === 'undefined') return;

    let ctx: gsap.Context | null = null;
    let timer: NodeJS.Timeout | null = null;

    const initAnimations = () => {
      if (!footerRef.current) return;

      if (ctx) {
        ctx.revert();
      }

      ctx = gsap.context(() => {
        if (footerRef.current) {
          gsap.fromTo(
            footerRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }
      }, footerRef);
    };

    timer = setTimeout(() => {
      initAnimations();
    }, 150);

    return () => {
      if (timer) clearTimeout(timer);
      if (ctx) {
        ctx.revert();
        ctx = null;
      }
    };
  }, [isReducedMotion]);

  // Memoize particle arrays for performance
  const scanningLines = useMemo(() => [...Array(2)], []);
  const particles = useMemo(() => [...Array(isReducedMotion ? 3 : 6)], [isReducedMotion]);

  return (
    <footer 
      ref={footerRef}
      className="footer-section relative overflow-hidden pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-10 md:pb-12 isolate px-4 sm:px-6 md:px-8 lg:px-8 bg-[#000000] text-gray-300"
      aria-label="Footer"
    >
      {/* Dark futuristic background with subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,65,0.02)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_0%,_rgba(0,255,65,0.01)_50%,_transparent_100%)]" />
      
      {/* Animated HUD Grid Pattern - reduced on mobile */}
      <div
        className="absolute inset-0 opacity-[0.05] sm:opacity-[0.06] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px]"
        style={{ animation: isReducedMotion ? 'none' : 'hudGridMove 25s linear infinite' }}
        aria-hidden
      />
      
      {/* Animated scanning lines - lightweight, hidden on mobile */}
      {!isReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
          {scanningLines.map((_, i) => (
            <div
              key={`scan-${i}`}
              className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-20"
              style={{
                animation: `hudScanLine ${10 + i * 2}s linear infinite`,
                animationDelay: `${i * 3}s`,
                top: `${(i * 50) % 100}%`,
              }}
              aria-hidden
            />
          ))}
        </div>
      )}
      
      {/* Data stream particles - reduced on mobile */}
      {!isReducedMotion && (
        <div className="hidden sm:block">
          {particles.map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-[1px] h-[15px] bg-[#00FF41] opacity-15"
              style={{
                left: `${10 + (i * 15) % 80}%`,
                animation: `hudDataStream ${5 + (i % 2)}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: `0 0 ${2 + (i % 2)}px #00FF41`,
              }}
              aria-hidden
            />
          ))}
        </div>
      )}
      
      {/* Floating HUD corner brackets - smaller on mobile */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-6 h-6 sm:w-10 sm:h-10 border-t-2 border-l-2 border-[#00FF41] opacity-25 sm:opacity-30" 
        style={{ animation: isReducedMotion ? 'none' : 'hud-float 3s ease-in-out infinite' }}
        aria-hidden 
      />
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-6 h-6 sm:w-10 sm:h-10 border-t-2 border-r-2 border-[#00FF41] opacity-25 sm:opacity-30" 
        style={{ animation: isReducedMotion ? 'none' : 'hud-float 3s ease-in-out infinite', animationDelay: '1s' }}
        aria-hidden 
      />
      
      {/* HUD Status Lines - hidden on mobile */}
      <div className="absolute top-12 sm:top-16 left-4 sm:left-8 w-12 sm:w-24 h-[1px] bg-[#00FF41] opacity-15 sm:opacity-20 hidden sm:block" aria-hidden />
      <div className="absolute top-12 sm:top-16 left-4 sm:left-8 w-[1px] h-4 sm:h-6 bg-[#00FF41] opacity-15 sm:opacity-20 hidden sm:block" aria-hidden />
      <div className="absolute top-12 sm:top-16 right-4 sm:right-8 w-12 sm:w-24 h-[1px] bg-[#00FF41] opacity-15 sm:opacity-20 hidden sm:block" aria-hidden />
      <div className="absolute top-12 sm:top-16 right-4 sm:right-8 w-[1px] h-4 sm:h-6 bg-[#00FF41] opacity-15 sm:opacity-20 hidden sm:block" aria-hidden />
      
      {/* HUD Info Panel - hidden on mobile */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-8 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/60 border border-[#00FF41]/30 font-mono text-[#00FF41]/60 text-[8px] sm:text-[10px] tracking-wider backdrop-blur-sm hidden sm:block" aria-hidden>
        <span className="text-[#00FF41]">[FOOTER_ACTIVE]</span>
      </div>
      
      {/* Glowing orbs for depth with mouse parallax - reduced on mobile */}
      {!isReducedMotion && (
        <div
          className="absolute -inset-20 sm:-inset-40 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.08)_0%,_rgba(0,255,65,0.10)_50%,_transparent_70%)] blur-2xl sm:blur-3xl transition-transform duration-1000 will-change-transform"
          style={{
            transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.12}px)`,
          }}
          aria-hidden
        />
      )}

      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-1/3 xl:w-5/12">
            <div className="mb-8 sm:mb-12 max-w-[360px] lg:mb-16">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Link href="/" className="inline-block group/logo">
                  <Image
                    src="/images/logo/MMlogo.png"
                    alt="Mehmed Muric Portfolio Logo"
                    width={120}
                    height={30}
                    className="w-auto h-auto transition-all duration-300 group-hover/logo:drop-shadow-[0_0_15px_rgba(0,255,65,0.5)]"
                  />
                </Link>
                <div className="flex gap-2 ml-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="group relative flex items-center justify-center border-2 border-[#00FF41]/30 bg-black/60 hover:border-[#00FF41] hover:bg-black/80 transition-all duration-300 hover:scale-110 p-2"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                        boxShadow: '0 0 10px rgba(0, 255, 65, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isReducedMotion) {
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.1)';
                      }}
                    >
                      {/* Corner brackets */}
                      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
              <p className="mb-2 text-base sm:text-lg font-bold text-[#00FF41] font-mono">
                Mehmed Muric
              </p>
              <p className="mb-1 text-sm sm:text-base break-words hover:text-[#00FF41] transition font-mono">
                <a href="mailto:mehmedmuric22@gmail.com" className="underline underline-offset-4 decoration-dotted hover:decoration-[#00FF41]">
                  mehmedmuric22@gmail.com
                </a>
              </p>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base font-mono">
                <span className="text-[#00FF41] font-semibold">(+381)</span> 62 175-3220
              </p>
              <div className="flex mt-4 gap-2 text-xs sm:text-sm text-gray-400 font-mono">
                <span>Based in Novi Pazar, Serbia</span>
                <span className="hidden sm:inline mx-2 text-[#00FF41]/40">|</span>
                <span>Full-Stack Developer</span>
              </div>
            </div>
          </div>

          {[
            {
              title: "Useful Links",
              links: [
                { href: "/", text: "Home" },
                { href: "/projects", text: "Projects" },
                { href: "/about", text: "About" },
                { href: "/testimonials", text: "Testimonials" }
              ],
            },
            {
              title: "Legal",
              links: [
                { href: "/privacyPolicy", text: "Privacy Policy" },
                { href: "/TermsOfUse", text: "Terms of Use" }
              ],
            },
            {
              title: "Support",
              links: [
                { href: "/contact", text: "Contact" },
                { href: "mailto:mehmedmuric22@gmail.com", text: "Email Me" }
              ],
            },
          ].map((section) => (
            <div
              key={section.title}
              className="w-full px-3 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12"
            >
              <div className="mb-8 lg:mb-16">
                <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-[#00FF41] font-mono relative inline-block">
                  <span className="relative z-10">{section.title}</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#00FF41]/30" />
                </h2>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.text}>
                      {link.href.startsWith("mailto") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-block text-sm sm:text-base sm:text-lg text-gray-300 group transition-all duration-300 hover:text-[#00FF41] font-mono"
                        >
                          <span className="relative z-10">{link.text}</span>
                          <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#00FF41] group-hover:w-full transition-all duration-300" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="relative inline-block text-sm sm:text-base sm:text-lg text-gray-300 group transition-all duration-300 hover:text-[#00FF41] font-mono"
                        >
                          <span className="relative z-10">{link.text}</span>
                          <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#00FF41] group-hover:w-full transition-all duration-300" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Divider with HUD styling */}
        <div className="relative my-6 sm:my-8">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00FF41]/30 to-transparent" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-[#00FF41]/40" />
        </div>

        <div className="py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center text-xs sm:text-sm md:text-base text-gray-400 font-mono">
            © {new Date().getFullYear()} Mehmed Muric. All rights reserved.
          </p>
          <div className="flex gap-2 sm:gap-3 justify-center items-center font-mono">
            <a
              href="https://github.com/mehmedmuric"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm md:text-base text-gray-400 hover:text-[#00FF41] transition-colors duration-300 relative group"
            >
              <span className="relative z-10">GitHub</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#00FF41] group-hover:w-full transition-all duration-300" />
            </a>
            <span className="mx-1 sm:mx-2 text-[#00FF41]/30 text-xs sm:text-sm">|</span>
            <a
              href="https://www.linkedin.com/in/mehmed-muric"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm md:text-base text-gray-400 hover:text-[#00FF41] transition-colors duration-300 relative group"
            >
              <span className="relative z-10">LinkedIn</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#00FF41] group-hover:w-full transition-all duration-300" />
            </a>
            <span className="mx-1 sm:mx-2 text-[#00FF41]/30 text-xs sm:text-sm">|</span>
            <a
              href="mailto:mehmedmuric22@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm md:text-base text-gray-400 hover:text-[#00FF41] transition-colors duration-300 relative group"
            >
              <span className="relative z-10">Email</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#00FF41] group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
