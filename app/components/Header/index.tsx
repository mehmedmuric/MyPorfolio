"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  // Adjusted dimensions for header/nav
  const headerStyle = {
    minHeight: sticky ? "48px" : "58px",
    marginBottom: "0.75rem",
  };

  const navOuterStyle = {
    minHeight: "44px",
    maxWidth: "98vw",
    marginBottom: "0.55rem",
    paddingLeft: "2px",
    paddingRight: "2px",
  };

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 w-full transition-all duration-500 ${
          sticky
            ? "fixed z-[9999] pt-3 md:pt-4 lg:pt-5"
            : "absolute pt-3 md:pt-4"
        }`}
        style={headerStyle}
      >
        <div className="container mx-auto"
          style={{maxWidth: "98vw", paddingLeft: "7px", paddingRight: "7px"}}
        >
          {/* Floating Navigation Bar */}
          <div
            className={`relative mx-auto max-w-7xl rounded-lg md:rounded-xl transition-all duration-500 ${
              sticky
                ? "bg-black/60 backdrop-blur-2xl border border-green-500/30 shadow-[0_4px_16px_rgba(0,255,128,0.10)]"
                : "bg-black/40 backdrop-blur-xl border border-green-500/20 shadow-[0_2px_12px_rgba(0,255,128,0.06)]"
            }`}
            style={navOuterStyle}
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-sm" />
            {/* Inner glow */}
            <div className="absolute inset-[1px] rounded-xl bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5" />

            <div className="relative flex items-center justify-between px-2 py-2 sm:px-3 sm:py-2.5 md:px-5 md:py-3.5 lg:px-6 lg:py-4"
              style={{minHeight: "40px"}}
            >
              {/* Logo - Left Side */}
              <div className="flex-shrink-0">
                <Link
                  href="/"
                  className="group relative flex items-center"
                >
                  <div className="relative">
                    <Image
                      src="/images/logo/MMlogo.png"
                      alt="logo"
                      width={sticky ? 52 : 60}
                      height={sticky ? 20 : 24}
                      className="w-auto h-auto transition-all duration-300 group-hover:scale-110 sm:w-[58px] sm:h-[24px] md:w-[68px] md:h-[28px] lg:w-auto lg:h-auto"
                      priority={true}
                    />
                    {/* Logo glow on hover */}
                    <div className="absolute inset-0 bg-green-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </div>
                </Link>
              </div>

              {/* Tablet & Desktop Navigation - Center */}
              <nav className="hidden md:flex items-center space-x-0.5 md:space-x-1 lg:space-x-2">
                {menuData.map((menuItem, index) => (
                  <div key={index} className="relative group">
                    {menuItem.path ? (
                      <Link
                        href={menuItem.path}
                        className={`relative px-3 py-2 md:px-3.5 md:py-2.5 lg:px-4 lg:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                          usePathName === menuItem.path
                            ? "text-green-400 bg-green-500/10"
                            : "text-gray-300 hover:text-green-400 hover:bg-green-500/5"
                        }`}
                      >
                        <span className="relative z-10">{menuItem.title}</span>
                        {/* Active page indicator */}
                        {usePathName === menuItem.path && (
                          <div className="absolute inset-0 rounded-lg bg-green-500/20 border border-green-500/40" />
                        )}
                        {/* Hover glow */}
                        <div className="absolute inset-0 rounded-lg bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                      </Link>
                    ) : (
                      <div className="relative">
                        <button
                          onClick={() => handleSubmenu(index)}
                          className="relative px-3 py-2 md:px-3.5 md:py-2.5 lg:px-4 lg:py-2.5 rounded-lg text-xs md:text-sm font-medium text-gray-300 hover:text-green-400 hover:bg-green-500/5 transition-all duration-300 flex items-center gap-0.5 md:gap-1"
                        >
                          <span>{menuItem.title}</span>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 25 24"
                            className={`transition-transform duration-300 md:w-4 md:h-4 ${openIndex === index ? 'rotate-180' : ''}`}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        {openIndex === index && menuItem.submenu && (
                          <div className="absolute top-full left-0 mt-2 w-48 md:w-56 rounded-xl bg-black/90 backdrop-blur-xl border border-green-500/30 shadow-[0_8px_24px_rgba(0,255,128,0.16)] p-2 z-50">
                            {menuItem.submenu.map((submenuItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={submenuItem.path}
                                className="block px-4 py-2 md:px-5 md:py-2.5 rounded-lg text-xs md:text-sm text-gray-300 hover:text-green-400 hover:bg-green-500/10 transition-all duration-300"
                              >
                                {submenuItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile & Tablet Menu Button */}
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="md:hidden relative p-2 rounded-lg text-green-400 hover:bg-green-500/10 transition-all duration-300"
                style={{
                  minHeight: "36px",
                  minWidth: "36px",
                  height: "36px",
                  width: "36px",
                }}
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                      navbarOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                      navbarOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                      navbarOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Mobile Menu */}
            {navbarOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20 md:hidden"
                  onClick={() => setNavbarOpen(false)}
                />
                <div
                  className="md:hidden absolute top-full left-0 right-0 mt-2 rounded-lg md:rounded-xl bg-black/90 backdrop-blur-2xl border border-green-500/30 shadow-[0_4px_14px_rgba(0,255,128,0.14)] p-3 sm:p-4 z-30"
                  style={{
                    minWidth: "185px",
                  }}
                >
                  <nav className="space-y-2">
                    {menuData.map((menuItem, index) => (
                      <div key={index}>
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            onClick={() => setNavbarOpen(false)}
                            className={`block px-5 py-2.5 sm:py-3.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                              usePathName === menuItem.path
                                ? "text-green-400 bg-green-500/10 border border-green-500/30"
                                : "text-gray-300 hover:text-green-400 hover:bg-green-500/5"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <button
                              onClick={() => handleSubmenu(index)}
                              className="w-full flex items-center justify-between px-5 py-2.5 sm:py-3.5 rounded-lg text-sm sm:text-base font-medium text-gray-300 hover:text-green-400 hover:bg-green-500/5 transition-all duration-300"
                            >
                              <span>{menuItem.title}</span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 25 24"
                                className={`transition-transform duration-300 sm:w-5 sm:h-5 ${openIndex === index ? 'rotate-180' : ''}`}
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                            {openIndex === index && menuItem.submenu && (
                              <div className="mt-2 ml-4 space-y-2 border-l-2 border-green-500/30 pl-3 sm:pl-4">
                                {menuItem.submenu.map((submenuItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={submenuItem.path}
                                    onClick={() => setNavbarOpen(false)}
                                    className="block px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm text-gray-400 hover:text-green-400 hover:bg-green-500/5 transition-all duration-300"
                                  >
                                    {submenuItem.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
