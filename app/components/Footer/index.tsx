"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer
        className="wow fadeInUp bg-gray-dark relative z-10 pt-16 md:pt-20 lg:pt-24"
        data-wow-delay=".1s"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <Link href="/" className="mb-2 inline-block">
                  
                 <Image
                    src="/images/logo/MMlogo.png"
                    alt="logo"
                    width={120}
                    height={30}
                    className=""               
                  />
                </Link>
                <p className="text-body-color-dark mb-2 text-base leading-relaxed text-[18px]">
                  Mehmed Muric
                </p>
                <p className="text-body-color-dark mb-2 text-base leading-relaxed text-[18px]">
                  mehmedmuric22@gmail.com
                </p>
                <p className="text-body-color-dark mb-2 text-base leading-relaxed text-[18px]">
                  mehmedmuric33@gmail.com
                </p>
                <p className="text-body-color-dark mb-6 text-base leading-relaxed text-[18px]">
                  +381 62 1753220
                </p>
                <div className="flex items-center ">
                  <a
                    href="https://www.facebook.com/profile.php?id=100023228495593"
                    aria-label="social-link"
                    className="text-body-color-dark mr-6 duration-300 hover:text-mygreen"
                  >
                    <svg
                      width="12"
                      height="25"
                      viewBox="0 0 9 18"
                      className="fill-current "
                    >
                      <path d="M8.13643 7H6.78036H6.29605V6.43548V4.68548V4.12097H6.78036H7.79741C8.06378 4.12097 8.28172 3.89516 8.28172 3.55645V0.564516C8.28172 0.254032 8.088 0 7.79741 0H6.02968C4.11665 0 2.78479 1.58064 2.78479 3.92339V6.37903V6.94355H2.30048H0.65382C0.314802 6.94355 0 7.25403 0 7.70564V9.7379C0 10.1331 0.266371 10.5 0.65382 10.5H2.25205H2.73636V11.0645V16.7379C2.73636 17.1331 3.00273 17.5 3.39018 17.5H5.66644C5.81174 17.5 5.93281 17.4153 6.02968 17.3024C6.12654 17.1895 6.19919 16.9919 6.19919 16.8226V11.0927V10.5282H6.70771H7.79741C8.11222 10.5282 8.35437 10.3024 8.4028 9.96371V9.93548V9.90726L8.74182 7.95968C8.76604 7.7621 8.74182 7.53629 8.59653 7.31048C8.54809 7.16935 8.33016 7.02823 8.13643 7Z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/mehmedmuricc/"
                    aria-label="social-link"
                    className="text-body-color-dark mr-6 duration-300 hover:text-mygreen"
                  >
                    <svg
                      width="25"
                      height="22"
                      viewBox="1 0 22 24"
                      className="fill-current"
                    >
                      <path  d="M11.9962 0.0078125C8.73824 0.0078125 8.32971 0.021622 7.05019 0.080003C5.77333 0.138241 4.90129 0.341051 4.13824 0.637622C3.34938 0.944146 2.68038 1.35434 2.01343 2.02124C1.34652 2.68819 0.936333 3.35719 0.629809 4.14605C0.333238 4.9091 0.130429 5.78115 0.0721905 7.058C0.0138095 8.33753 0 8.74605 0 12.0041C0 15.262 0.0138095 15.6705 0.0721905 16.9501C0.130429 18.2269 0.333238 19.099 0.629809 19.862C0.936333 20.6509 1.34652 21.3199 2.01343 21.9868C2.68038 22.6537 3.34938 23.0639 4.13824 23.3705C4.90129 23.667 5.77333 23.8698 7.05019 23.9281C8.32971 23.9864 8.73824 24.0002 11.9962 24.0002C15.2542 24.0002 15.6627 23.9864 16.9422 23.9281C18.2191 23.8698 19.0911 23.667 19.8542 23.3705C20.643 23.0639 21.312 22.6537 21.979 21.9868C22.6459 21.3199 23.0561 20.6509 23.3627 19.862C23.6592 19.099 23.862 18.2269 23.9202 16.9501C23.9786 15.6705 23.9924 15.262 23.9924 12.0041C23.9924 8.74605 23.9786 8.33753 23.9202 7.058C23.862 5.78115 23.6592 4.9091 23.3627 4.14605C23.0561 3.35719 22.6459 2.68819 21.979 2.02124C21.312 1.35434 20.643 0.944146 19.8542 0.637622C19.0911 0.341051 18.2191 0.138241 16.9422 0.080003C15.6627 0.021622 15.2542 0.0078125 11.9962 0.0078125ZM11.9962 2.16929C15.1993 2.16929 15.5788 2.18153 16.8437 2.23924C18.0133 2.29257 18.6485 2.488 19.0712 2.65229C19.6312 2.86991 20.0308 3.12986 20.4506 3.54967C20.8704 3.96943 21.1303 4.36905 21.348 4.929C21.5122 5.35172 21.7077 5.98691 21.761 7.15653C21.8187 8.42148 21.831 8.80091 21.831 12.0041C21.831 15.2071 21.8187 15.5866 21.761 16.8515C21.7077 18.0211 21.5122 18.6563 21.348 19.0791C21.1303 19.639 20.8704 20.0386 20.4506 20.4584C20.0308 20.8782 19.6312 21.1381 19.0712 21.3558C18.6485 21.5201 18.0133 21.7155 16.8437 21.7688C15.579 21.8265 15.1996 21.8388 11.9962 21.8388C8.79286 21.8388 8.41352 21.8265 7.14871 21.7688C5.97909 21.7155 5.3439 21.5201 4.92119 21.3558C4.36124 21.1381 3.96162 20.8782 3.54186 20.4584C3.1221 20.0386 2.8621 19.639 2.64448 19.0791C2.48019 18.6563 2.28476 18.0211 2.23143 16.8515C2.17371 15.5866 2.16148 15.2071 2.16148 12.0041C2.16148 8.80091 2.17371 8.42148 2.23143 7.15653C2.28476 5.98691 2.48019 5.35172 2.64448 4.929C2.8621 4.36905 3.12205 3.96943 3.54186 3.54967C3.96162 3.12986 4.36124 2.86991 4.92119 2.65229C5.3439 2.488 5.97909 2.29257 7.14871 2.23924C8.41367 2.18153 8.7931 2.16929 11.9962 2.16929ZM11.9962 16.0028C9.78776 16.0028 7.99748 14.2125 7.99748 12.0041C7.99748 9.79558 9.78776 8.00529 11.9962 8.00529C14.2047 8.00529 15.995 9.79558 15.995 12.0041C15.995 14.2125 14.2047 16.0028 11.9962 16.0028ZM11.9962 5.84381C8.594 5.84381 5.836 8.60181 5.836 12.0041C5.836 15.4062 8.594 18.1642 11.9962 18.1642C15.3984 18.1642 18.1564 15.4062 18.1564 12.0041C18.1564 8.60181 15.3984 5.84381 11.9962 5.84381ZM18.3998 7.03996C19.1949 7.03996 19.8394 6.39548 19.8394 5.60043C19.8394 4.80538 19.1949 4.16086 18.3998 4.16086C17.6048 4.16086 16.9603 4.80538 16.9603 5.60043C16.9603 6.39548 17.6048 7.03996 18.3998 7.03996Z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/mehmedmuric"
                    aria-label="social-link"
                    className="text-body-color-dark mr-6 duration-300 hover:text-mygreen"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="1 5 22 15"
                      className="fill-current"
                    >
                      <path d="M10.0172337,20.0036431 C10.022429,20.1264837 10.0091724,20.2463579 9.98330461,20.3676906 C9.93784953,20.5808973 9.85006902,20.806507 9.72581375,21.0149561 C9.37258963,21.6075205 8.77254382,22.0029294 8,22.0029294 C6.18009841,22.0029294 5.46583567,21.110101 4.57152331,18.8743201 C3.96583567,17.360101 3.68009841,17.0029294 3,17.0029294 L3,15.0029294 C4.81990159,15.0029294 5.53416433,15.8957579 6.42847669,18.1315388 C7.03416433,19.6457579 7.31990159,20.0029294 8,20.0029294 C8,19.7127644 7.99602627,19.4557363 7.98766336,19.10766 C7.96806324,18.2918745 7.96580921,18.1253294 8.00139994,17.9072328 C8.01562221,17.4311461 8.13853505,17.0933379 8.38499657,16.758055 C6.15319163,16.2722225 4.64792011,15.2688507 3.78397367,13.6414131 L3.46033692,12.8803116 C3.14504523,11.9742045 3,10.9475314 3,9.76182789 C3,8.3962705 3.41634612,7.17529446 4.19401809,6.15466942 C3.95142672,5.18452501 3.98465035,3.99922139 4.52030872,2.66060213 L4.69533986,2.22319636 L5.14406803,2.07965982 C5.20414701,2.06044211 5.27718427,2.04308516 5.36298939,2.02961795 C6.2367624,1.89247825 7.48010477,2.21967938 9.10554673,3.26084348 C10.0637668,3.03871956 11.0728464,2.92657377 12.0887705,2.92657377 C12.9966325,2.92657377 13.8994565,3.01809831 14.761632,3.19853941 C16.3430593,2.20820612 17.552239,1.89759865 18.4025017,2.02979376 C18.4873192,2.04298081 18.5596096,2.06000541 18.6191923,2.07890005 L19.0707147,2.22208531 L19.2459583,2.66215824 C19.7145535,3.83889806 19.7949778,4.92336373 19.6244695,5.87228979 C20.5184674,6.94500389 21,8.26378067 21,9.76182789 C21,11.0247658 20.9095208,11.9744236 20.64943,12.8982988 L20.374903,13.6516598 C19.6562828,15.2773712 18.071463,16.2919934 15.627532,16.7752488 C15.881555,17.1269685 16,17.4840164 16,18.0029294 L16,19.0029294 C16,19.4875328 16,19.5024553 15.9988971,20.0029332 C16.0011677,20.0388683 16.0041674,20.0564681 16.0074409,20.0674343 C16.0069051,20.0676207 16.0044248,20.7127858 16,22.0029294 C15.1482062,22.0029294 14.5148687,21.5875264 14.2033753,20.9322561 C14.0418761,20.5925196 13.9936266,20.2681196 14,19.9887282 L14,18.0029294 C14,17.9190828 13.9970903,17.9142333 13.7928932,17.7100362 C13.2470903,17.1642333 13,16.7524162 13,16.0029294 L13,15.098327 L13.9000749,15.0079345 C16.5793439,14.7388614 18.0365375,13.994809 18.5196779,12.9078386 L18.7454621,12.2906007 C18.925117,11.6452201 19,10.8592573 19,9.76182789 C19,8.5957377 18.5929046,7.6324677 17.8229924,6.86285829 L17.399809,6.43984136 L17.5725269,5.86695742 C17.7259675,5.35801396 17.7624331,4.7557886 17.6001079,4.06889646 C17.5731265,4.07573155 17.5450908,4.08318009 17.5159887,4.09128216 C16.9805442,4.24035094 16.3120315,4.56021479 15.5064471,5.09869159 L15.139019,5.34429154 L14.7100567,5.23792413 C13.880388,5.0321958 12.9888516,4.92657377 12.0887705,4.92657377 C11.0878626,4.92657377 10.0984637,5.05392119 9.18445917,5.30309711 L8.73840507,5.42470039 L8.3568182,5.1636581 C7.52362575,4.59367395 6.83145179,4.25470831 6.27642408,4.09636524 C6.23678449,4.08505652 6.19904057,4.07494077 6.16316427,4.06592263 C5.9695217,4.8609066 6.04611126,5.51405583 6.24223012,6.00416015 L6.47738305,6.59181128 L6.04688499,7.05581793 C5.36089731,7.79520071 5,8.69496705 5,9.76182789 C5,10.7385874 5.11434439,11.5479509 5.32388252,12.1576254 L5.58556699,12.7770588 C6.23973869,14.0045823 7.62920432,14.743076 10.1065792,15.0086252 L11,15.1043908 L11,16.0029294 C11,16.7524162 10.7529097,17.1642333 10.2071068,17.7100362 C10.0029097,17.9142333 10,17.9190828 10,18.0029294 L9.98276345,18.1877969 C9.97135799,18.2484289 9.97135799,18.404984 9.98708636,19.0596217 C9.99432024,19.3607065 9.99844271,19.5990116 9.99963477,19.8480351 C10.0115828,19.8995855 10.013389,19.9328439 10.0172337,20.0036431 Z"/>

                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mehmed-muric-185297232/"
                    aria-label="social-link"
                    className="text-body-color-dark duration-300 hover:text-mygreen"
                  >
                    <svg
                      width="25"
                      height="20"
                      viewBox="0 0 17 16"
                      className="fill-current"
                    >
                      <path d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-8 lg:mb-16">
                <h2 className="mb-6 text-xl font-bold text-white">
                  Useful Links
                </h2>
                <ul>
                  <li>
                    <a
                      href="/"
                      className="underline underline-offset-4 decoration-mygreen text-body-color-dark mb-4 inline-block text-base duration-300 hover:text-mygreen"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/projects"
                      className="underline underline-offset-4 decoration-mygreen text-body-color-dark mb-4 inline-block text-base duration-300 hover:text-mygreen"
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="underline underline-offset-4 decoration-mygreen text-body-color-dark mb-4 inline-block text-base duration-300 hover:text-mygreen"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-6 text-xl font-bold text-white">
                  Terms
                </h2>
                <ul>
                  <li>
                    <a
                      href="/privacyPolicy"
                      className="underline underline-offset-4 decoration-mygreen text-body-color-dark mb-4 inline-block text-base duration-300 hover:text-mygreen"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="underline underline-offset-4 decoration-mygreen text-body-color-dark mb-4 inline-block text-base duration-300 hover:text-mygreen"
                    >
                      Refund Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-6 text-xl font-bold text-white">
                  Support & Help
                </h2>
                <ul>
                  <li>
                    <a
                      href="/TermsOfUse"
                      className="underline underline-offset-4 decoration-mygreen text-body-color-dark mb-4 inline-block text-base duration-300 hover:text-mygreen"
                    >
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="underline underline-offset-4 decoration-mygreen text-body-color-dark mb-4 inline-block text-base duration-300 hover:text-mygreen"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent to-transparent via-[#959CB183]"></div>
          <div className="py-8">
            <p className="text-center text-base text-body-color dark:text-white">
              © 2025 All rights reserved.{" "}
              <a href="https://github.com/mehmedmuric" rel="nofollow noopener" className="hover:text-mygreen duration-300">
                Mehmed Muric
              </a>
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-14 z-[-1]">
          <svg
            width="55"
            height="99"
            viewBox="0 0 55 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
            <mask
              id="mask0_94:899"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="99"
              height="99"
            >
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="#4A6CF7"
              />
            </mask>
            <g mask="url(#mask0_94:899)">
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                className="fill-mygreen"
              />
              <g opacity="0.6" filter="url(#filter0_f_94:899)">
                <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_94:899"
                x="12.4852"
                y="-15.1763"
                width="82.7646"
                height="82.7646"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10.5"
                  result="effect1_foregroundBlur_94:899"
                />
              </filter>
              <radialGradient
                id="paint0_radial_94:899"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
              >
                <stop stopOpacity="0.47" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-24 left-0 z-[-1]">
          <svg
            width="79"
            height="94"
            viewBox="0 0 79 94"
            className="fill-mygreen opacity-50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              fill="url(#paint0_linear_94:889)"
            />
            <rect
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              stroke="url(#paint1_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
              fill="url(#paint2_linear_94:889)"
            />
            <path
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
              stroke="url(#paint3_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
              fill="url(#paint4_linear_94:889)"
            />
            <path
              d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
              stroke="url(#paint5_linear_94:889)"
              strokeWidth="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_94:889"
                x1="-41"
                y1="21.8445"
                x2="36.9671"
                y2="59.8878"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_94:889"
                x1="25.6675"
                y1="95.9631"
                x2="-42.9608"
                y2="20.668"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_94:889"
                x1="20.325"
                y1="-3.98039"
                x2="90.6248"
                y2="25.1062"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_94:889"
                x1="18.3642"
                y1="-1.59742"
                x2="113.9"
                y2="80.6826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_94:889"
                x1="61.1098"
                y1="62.3249"
                x2="-8.82468"
                y2="58.2156"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_94:889"
                x1="65.4236"
                y1="65.0701"
                x2="24.0178"
                y2="41.6598"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
