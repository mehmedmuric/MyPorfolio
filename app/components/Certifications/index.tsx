import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import SectionTitle from "../Common/SectionTitle";

const Certifications = () => {
  return (
    <section className="pt-16">
      <div className="container">
        <SectionTitle title="Certifications" paragraph="" center mb="50px" />

        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp bg-gray-dark flex flex-wrap justify-center gap-10 rounded-sm px-6 py-10 sm:px-10 md:px-[60px] md:py-[50px] xl:p-[60px] 2xl:px-[80px] 2xl:py-[70px]"
              data-wow-delay=".1s"
            >
              {brandsData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="flex w-full flex-col items-center justify-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative flex h-32 w-32 items-center justify-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-70 dark:hover:opacity-100"
      >
        <Image
          src={image}
          alt={name}
          width={128}
          height={128}
          className="object-contain"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </a>
      <p className="mt-3 text-sm text-mygreen/80 font-bold text-center">{name}</p>
    </div>
  );
};
