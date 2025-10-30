import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;

  return (
    <div className="w-full">
      <div className="opacity-0 translate-y-6 animate-fade-in">
        {/* Ikonica sa cyberpunk puls neon animacijom */}
        <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-md
                        bg-primary bg-opacity-10 text-primary
                        shadow-[0_0_15px_rgba(0,255,128,0.3)]
                        animate-neon-pulse
                        transition-all duration-300">
          {icon}
        </div>

        {/* Naslov */}
        <h3 className="mb-4 text-xl sm:text-2xl lg:text-xl xl:text-2xl font-semibold text-white tracking-wide uppercase border-l-2 border-white/60 pl-2
                       opacity-0 translate-y-6 animate-fade-in delay-100">
          {title}
        </h3>

        {/* Paragraf */}
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color
                      opacity-0 translate-y-6 animate-fade-in delay-200">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;