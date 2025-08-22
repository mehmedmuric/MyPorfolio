'use client'
import Image from "next/image";
import Link from "next/link";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";





const Hero = () => {
  useScrollAnimations();
  return (
    <>
      <section
        id="home"
        className="bg-gray-dark relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-between">
            <div className="w-full px-4 md:w-[40%]">
              <div className="leftSide opacity-0 mt-14" data-animate="blink-1">
                <div
                  className="wow fadeInUp mx-auto max-w-[800px] text-center"
                  data-wow-delay=".2s"
                >
                  <h1  className="typingText mb-5 text-9xl font-bold leading-tight text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                    Mehmed Muric
                  </h1>
                  <p className="dark:text-body-color-dark mb-12 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">
                    Ja sam Mehmed Muric, developer sa iskustvom u razvoju modernih web i mobilnih aplikacija. Kao full-stack developer, ovladavam širokim spektrom tehnologija, uključujući HTML, CSS, TailwindCSS, Material UI, React, React Native, JavaScript, TypeScript, Next.js, Node.js, Appwrite, MongoDB i MySQL.
                  </p>
                  <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <Link
                      href="https://nextjstemplates.com/templates/saas-starter-startup"
                      className="rounded-lg bg-mygreen px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-transparent border border-mygreen hover:text-mygreen"
                    >
                      🔥View my CV
                    </Link>
                    <Link
                      href="https://github.com/mehmedmuric"
                      className="inline-block rounded-lg bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-transparent border border-mygreen"
                    >
                      GitHub Profile 
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full opacity-0 px-4 md:w-[55%] flex flex-col items-center justify-center text-center ml-auto" data-animate="blink-1">
              <div className="profileImage relative w-80 h-80 rounded-full overflow-hidden border-4 border-mygreen mb-6">
                <Image 
                src="/images/logo/mehmed.jpg" 
                alt="mehmed" 
                className="w-full h-full object-cover rounded-full" 
                fill  
              />
              </div>
              <h2 className="text-2xl font-semibold text-gray-400 mb-4 italic">Software Engineer</h2>
              <p className="text-lg text-gray-500 mb-4 underline underline-offset-8 decoration-mygreen">Full-stack developer | Front-end & Back-end | Mobile & Web Applications</p>
              <p className="text-base text-gray-400">Developer sa iskustvom u izradi modernih aplikacija koristeći najnovije tehnologije. Posvećen sam učenju i pružanju najboljih rešenja za moje klijente.</p>
              <div className="socialLinks flex justify-center mt-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-mygreen mx-2">
                  <i className="fab fa-github"></i> GitHub
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-mygreen mx-2">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="rgba(45, 255, 0, 0.16)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="rgba(45, 255, 0, 0.16)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="rgba(45, 255, 0, 0.16)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="rgba(45, 255, 0, 0.16))"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="rgba(45, 255, 0, 0.16)"
            />
            <defs>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="rgba(45, 255, 0, 0.16)"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="rgba(45, 255, 0, 0.16)"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <circle cx="220" cy="63" r="43" fill="rgba(45, 255, 0, 0.16)" />
            <defs>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="rgba(45, 255, 0, 0.16)"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
