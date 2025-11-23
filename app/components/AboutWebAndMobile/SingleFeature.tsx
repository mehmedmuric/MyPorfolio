'use client'

import { Feature } from "@/types/feature";
import { useState } from "react";

const SingleFeature = ({ feature, index }: { feature: Feature; index: number }) => {
  const { icon, title, paragraph } = feature;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="wow fadeInUp transition-all duration-500"
        data-wow-delay={`${index * 0.1}s`}
        data-animate="fade-in-up"
      >
        {/* Icon container with enhanced animations */}
        <div className="relative mb-6 group/icon">
          <div className="absolute inset-0 rounded-xl bg-green-500/20 blur-xl group-hover/icon:bg-green-500/40 transition-all duration-500" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 group-hover/icon:border-green-500/60 group-hover/icon:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(0,255,128,0.2)] group-hover/icon:shadow-[0_0_40px_rgba(0,255,128,0.4)]">
            <div className={`transform transition-transform duration-500 ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}`}>
              {icon}
            </div>
            {/* Number badge with pulse animation */}
            <div className={`absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-black text-xs font-bold shadow-lg transition-all duration-300 ${isHovered ? 'scale-110 shadow-[0_0_15px_rgba(0,255,128,0.6)]' : 'scale-100'}`}>
              <span className="relative z-10">{index + 1}</span>
              {isHovered && (
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
              )}
            </div>
          </div>
        </div>

        {/* Title with enhanced styling */}
        <h3 className="mb-4 text-xl sm:text-2xl lg:text-xl xl:text-2xl font-bold text-white tracking-wide group-hover:text-green-400 transition-colors duration-300">
          <span className="relative inline-block">
            {title}
            <span 
              className={`absolute -bottom-1 left-0 h-0.5 bg-green-400 transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}
            />
          </span>
        </h3>

        {/* Paragraph with better readability */}
        <p className="text-base leading-relaxed text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
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
