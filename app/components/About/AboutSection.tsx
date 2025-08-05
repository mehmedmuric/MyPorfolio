'use client'

import Image from "next/image";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

const AboutSection = () => {
  useScrollAnimations();
  return (
    <section className="py-16 md:py-24 lg:py-28 opacity-0" data-animate="text-focus-in">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/aboutsection.svg"
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              <Image
                src="/images/about/aboutsection.svg"
                alt="about image"
                fill
                className="drop-shadow-three hidden dark:block dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-4">
                <h3 className=" mb-4 text-xl underline underline-offset-8 decoration-mygreen font-bold text-gray-400 sm:text-2xl lg:text-xl xl:text-2xl">
                  Korisnička podrška za sve klijente
                </h3>
                <p className="text-base font-light leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Svakom projektu pristupam sa dugoročnom vizijom, što uključuje i potpunu tehničku podršku nakon isporuke. 
                  Bilo da je u pitanju web ili mobilna aplikacija, klijenti mogu da računaju na pomoć pri rešavanju problema, 
                  redovnim ažuriranjima i unapređenjima funkcionalnosti.
                </p>
              </div>
              <div className="mb-9">
                <h3 className=" mb-4 text-xl underline underline-offset-8 decoration-mygreen font-bold text-gray-400 sm:text-2xl lg:text-xl xl:text-2xl">
                  Kreiram moderne i brze aplikacije
                </h3>
                <p className="text-base font-light leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Fokusiram se na izradu aplikacija koje nisu samo vizuelno atraktivne, već i optimizovane za brzinu i performanse. 
                  Svaka linija koda je pažljivo pisana da obezbedi što bolje korisničko iskustvo, bez kompromisa u kvalitetu.
                </p>
              </div>
              <div className="mb-1">
                <h3 className=" mb-4 text-xl underline underline-offset-8 decoration-mygreen font-bold text-gray-400 sm:text-2xl lg:text-xl xl:text-2xl">
                  Fleksibilna rešenja po meri klijenta
                </h3>
                <p className="text-base font-light leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Svaki klijent ima specifične potrebe, i zato svaki projekat razvijam prilagođeno — od dizajna do funkcionalnosti. 
                  Moj cilj je da svako rešenje u potpunosti odgovara biznis ciljevima klijenta, uz mogućnost lakih budućih proširenja.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
