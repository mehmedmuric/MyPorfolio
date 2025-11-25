"use client";
import Image from "next/image";
import Link from "next/link";

const socials = [
  {
    href: "https://github.com/mehmedmuric",
    label: "GitHub",
    icon: (
      <svg className="w-5 h-5 text-green-300 group-hover:text-green-400 transition" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/mehmed-muric",
    label: "LinkedIn",
    icon: (
      <svg className="w-5 h-5 text-green-300 group-hover:text-green-400 transition" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452H17.2V14.89c0-1.326-.028-3.036-1.85-3.036-1.853 0-2.136 1.446-2.136 2.941v5.657H9.069V9.5h3.123v1.496h.044c.435-.825 1.498-1.694 3.08-1.694 3.292 0 3.896 2.166 3.896 4.984v6.166zM5.337 8.004c-1.005 0-1.82-.818-1.82-1.826 0-1.008.815-1.826 1.82-1.826 1.008 0 1.824.818 1.824 1.826 0 1.008-.816 1.826-1.824 1.826zm1.648 12.448H3.692V9.5h3.293v10.952z"/>
      </svg>
    ),
  },
  {
    href: "mailto:mehmedmuric22@gmail.com",
    label: "Mail",
    icon: (
      <svg className="w-5 h-5 text-green-300 group-hover:text-green-400 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor"/>
        <path d="M3 7l9 6 9-6"/>
      </svg>
    )
  }
];

const Footer = () => {
  return (
    <footer className="relative z-10 pt-16 md:pt-20 lg:pt-24 bg-slate-950/10 text-gray-300">
      <div className="container relative">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
            <div className="mb-12 max-w-[360px] lg:mb-16">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="inline-block">
                  <Image
                    src="/images/logo/MMlogo.png"
                    alt="logo"
                    width={120}
                    height={30}
                    className="w-auto h-auto"
                  />
                </Link>
                <div className="flex gap-2 ml-3">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="group flex items-center justify-center rounded-full border border-green-500/30 bg-[#172616] hover:text-green-400 hover:border-green-400/60 hover:scale-110 transition p-2 shadow">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
              <p className="mb-2 text-[18px] font-semibold text-green-400">
                Mehmed Muric
              </p>
              <p className="mb-1 text-[16px] break-words hover:text-green-400 transition">
                <a href="mailto:mehmedmuric22@gmail.com" className="underline underline-offset-4 decoration-dotted">
                  mehmedmuric22@gmail.com
                </a>
              </p>
              <p className="mb-6 text-[16px]">
                <span className="text-mygreen font-semibold">(+381)</span> 62 175-3220
              </p>
              <div className="flex mt-4 gap-2 text-sm text-gray-400">
                <span>Based in Novi Pazar, Serbia</span>
                <span className="hidden sm:inline mx-2">|</span>
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
                <h2 className="mb-6 text-2xl font-bold text-green-400 underline decoration-green-400 underline-offset-8 decoration-dashed">
                  {section.title}
                </h2>
                <ul>
                  {section.links.map((link) => (
                    <li key={link.text}>
                      {link.href.startsWith("mailto") ? (
                        <a
                          href={link.href}
                          className="relative inline-block mb-4 text-lg text-gray-300 group transition-colors duration-300 hover:text-green-400 underline underline-offset-2"
                        >
                          {link.text}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="relative inline-block mb-4 text-lg text-gray-300 group transition-colors duration-300 hover:text-green-400"
                        >
                          {link.text}
                          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-gray-700/50 my-4"></div>
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center text-base text-gray-400">
            © {new Date().getFullYear()} Mehmed Muric. All rights reserved.
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="https://github.com/mehmedmuric"
              rel="moreferrerr"
              className="hover:text-green-400 transition font-medium"
              target="_blank"
            >
              GitHub
            </a>
            <span className="mx-2 text-gray-600">|</span>
            <a
              href="https://www.linkedin.com/in/mehmed-muric"
              rel="noreferrerr"
              className="hover:text-green-400 transition font-medium"
              target="_blank"
            >
              LinkedIn
            </a>
            <span className="mx-2 text-gray-600">|</span>
            <a
              href="mailto:mehmedmuric22@gmail.com"
               target="_blank" rel="noreferrer"
              
              className="hover:text-green-400 transition font-medium"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
