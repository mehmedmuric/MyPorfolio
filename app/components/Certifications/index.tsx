import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import SectionTitle from "../Common/SectionTitle";

const Certifications = () => {
  return (
    <section className="particles-bg overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-16   bg-gradient-to-b from-gray-950 via-mygreen/5 to-mygreen/5">
      <div className="container mx-auto">
        <SectionTitle
          title="Certifications"
          paragraph="I continually upgrade my skills through courses and certifications. Each certificate represents my commitment to mastering modern technologies and delivering high-quality solutions."
          center
          mb="70px"
        />

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-base sm:text-lg">
          Here are some of the certifications and courses I have completed to strengthen my full-stack development skills, from backend programming to modern frontend frameworks.
        </p>

        {/* Responsive Flex za SingleBrand kartice */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-12 items-center justify-center ">
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
  const { href, image, name, issued, platform, description } = brand;

  return (
    <div className="group hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] shadow-2xl ring-0 ring-green-500 transition-all duration-500  hover:ring-2 bg-gray-950 border border-mygreen/20  opacity-90  relative flex flex-col items-center justify-center p-10 sm:p-12 rounded-3xl backdrop-blur-lg  hover:-translate-y-3 hover:scale-105 w-[95%] sm:w-[80%] md:w-[72%] lg:w-[70%] xl:w-[320px] max-w-[280px]">
      <div className="relative flex items-center justify-center h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-gradient-to-br from-mygreen/20 to-transparent group-hover:from-mygreen/40 group-hover:to-mygreen/10 transition-all duration-300 shadow-neon-glow">
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

      <p className="text-sm text-gray-400 text-center mt-1">
        {platform} • {issued}
      </p>
      <p className="text-center text-gray-400 mt-2 text-sm">{description}</p>

      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="mt-4 inline-block rounded-lg border border-mygreen/60 px-8 py-2.5 text-sm sm:text-base text-center font-medium text-mygreen/90 hover:bg-mygreen/20 hover:text-white transition-all duration-300"
      >
        Show Certificate
      </a>
    </div>
  );
};

