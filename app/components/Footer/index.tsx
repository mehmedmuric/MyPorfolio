"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 pt-16 md:pt-20 lg:pt-24 bg-slate-950/10 text-gray-300">
        <div className="container relative">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <Link href="/" className="mb-2 inline-block">
                  <Image
                    src="/images/logo/MMlogo.png"
                    alt="logo"
                    width={120}
                    height={30}
                    className="w-auto h-auto"
                  />
                </Link>
                <p className="mb-6 text-[18px] underline decoration-green-400 underline-offset-8 decoration-dashed">Mehmed Muric</p>
                <p className="mb-6 text-[18px] underline decoration-green-400 underline-offset-8 decoration-dashed">mehmedmuric22@gmail.com</p>
                <p className="mb-6 text-[18px] underline decoration-green-400 underline-offset-8 decoration-dashed">
                  <span className="text-mygreen">(+381)</span> 62 175-3220
                </p>
              </div>
            </div>

            {[
              {
                title: "Useful Links",
                links: [
                  { href: "/", text: "Home" },
                  { href: "/projects", text: "Projects" },
                  { href: "/about", text: "About" },
                ],
              },
              {
                title: "Terms",
                links: [{ href: "/privacyPolicy", text: "Privacy Policy" }],
              },
              {
                title: "Support & Help",
                links: [
                  { href: "/TermsOfUse", text: "Terms of Use" },
                  { href: "/contact", text: "Contact" },
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="w-full px-3 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12"
              >
                <div className="mb-8 lg:mb-16">
                  <h1 className="mb-6 text-2xl font-bold text-green-400 underline decoration-green-400 underline-offset-8 decoration-dashed">
                    {section.title}
                  </h1>
                  <ul>
                    {section.links.map((link) => (
                      <li key={link.text}>
                        <a
                          href={link.href}
                          className="relative inline-block mb-4 text-lg text-gray-300  group transition-colors duration-300 hover:text-green-400"
                        >
                          {link.text}
                          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                          <span className="absolute inset-0 bg-green-400 opacity-0  transition-opacity duration-300"></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-gray-700/50"></div>
          <div className="py-8">
            <p className="text-center text-base text-gray-400">
              © 2025 All rights reserved.{" "}
              <a
                href="https://github.com/mehmedmuric"
                rel="nofollow noopener"
                className="hover:text-green-400 underline decoration-green-400"
              >
                Mehmed Muric
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
