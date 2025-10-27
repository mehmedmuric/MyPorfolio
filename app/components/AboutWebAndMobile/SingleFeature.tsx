import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full">
      <div className="wow fadeInUp " data-wow-delay=".15s">
        <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary ">
          {icon}
        </div>
        <h3 className="mb-4 text-xl sm:text-2xl lg:text-xl xl:text-2xl font-semibold text-white tracking-wide uppercase border-l-2 border-white/60 pl-2">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
