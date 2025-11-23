'use client'

import { Feature } from "@/types/feature";
import { useState } from "react";

const SingleFeature = ({ feature, index }: { feature: Feature; index: number }) => {
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

        {/* Decorative element with glow */}
        <div className="mt-6 relative">
          <div className={`h-1 bg-gradient-to-r from-green-500 via-green-400 to-transparent rounded-full transition-all duration-500 ${isHovered ? 'w-24 opacity-100 shadow-[0_0_8px_rgba(0,255,128,0.5)]' : 'w-12 opacity-60'}`} />
          {isHovered && (
            <div className="absolute top-0 left-0 h-1 w-24 bg-gradient-to-r from-green-500 to-transparent rounded-full blur-sm opacity-50" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleFeature;