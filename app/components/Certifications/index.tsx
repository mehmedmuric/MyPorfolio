import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import SectionTitle from "../Common/SectionTitle";




const Certifications = () => {
  return (
    <section className="pt-24 pb-28 bg-gradient-to-b from-gray-950 via-mygreen/5 to-mygreen/5 bg-gray-900">
      
      <div className="container">
        <SectionTitle
          title="Certifications"
          paragraph="Courses and certifications I've completed to strengthen my full-stack skills."
          center
          mb="70px"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-40 justify-items-center  place-items-center cursor-pointer">
          {brandsData.map((brand) => (
            <SingleBrand key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="group relative flex flex-col items-center justify-center p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/30 shadow-2xl transition-transform duration-300 hover:-translate-y-3 hover:scale-105 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[85%] xl:w-[350px] max-w-[260px]">
      <div className="relative flex items-center justify-center h-32 w-32 sm:h-36 sm:w-36 rounded-full bg-gradient-to-br from-mygreen/20 to-transparent group-hover:from-mygreen/30 transition-all duration-300">
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className="object-contain group-hover:opacity-100 transition-all duration-300"
          priority
        />
      </div>

      <p className="mt-5 text-base sm:text-lg font-semibold text-center text-white/70 group-hover:text-mygreen transition-colors duration-300">
        {name}
      </p>

      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="mt-4 inline-block rounded-lg border border-mygreen/60 px-8 py-2.5 text-sm sm:text-base text-center font-medium text-mygreen/90 hover:bg-mygreen/20 hover:text-mygreen transition-all duration-300"
      >
        Show Certificate
      </a>
    </div>
  );
};
