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
      <div className="wow fadeInUp transition-all duration-500" data-wow-delay={`${index * 0.1}s`}>
        {/* HUD Icon Container */}
        <div className="relative mb-6 md:mb-8 group/icon">
          {/* Icon Glow Effect */}
          <div 
            className="absolute inset-0 blur-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle, #00FF41 0%, transparent 70%)'
            }}
          />
          
          {/* HUD Panel for Icon */}
          <div 
            className="relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 items-center justify-center bg-black/80 border-2 border-[#00FF41]/40 group-hover/icon:border-[#00FF41] transition-all duration-500 shadow-[0_0_20px_rgba(0,255,65,0.3)] group-hover/icon:shadow-[0_0_40px_rgba(0,255,65,0.6)]"
            style={{
              clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))',
              boxShadow: isHovered 
                ? '0 0 40px rgba(0,255,65,0.6), inset 0 0 20px rgba(0,255,65,0.1)' 
                : '0 0 20px rgba(0,255,65,0.3)'
            }}
          >
            {/* Icon with HUD styling */}
            <div 
              className={`transform transition-all duration-500 text-[#00FF41] ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}
              style={{
                filter: isHovered ? 'drop-shadow(0 0 10px #00FF41)' : 'drop-shadow(0 0 5px #00FF41)'
              }}
            >
              {icon}
            </div>

            {/* HUD Corner Indicators */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-[#00FF41]/60 group-hover/icon:bg-[#00FF41] transition-colors" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-[#00FF41]/60 group-hover/icon:bg-[#00FF41] transition-colors" />
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#00FF41]/60 group-hover/icon:bg-[#00FF41] transition-colors" />
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#00FF41]/60 group-hover/icon:bg-[#00FF41] transition-colors" />
          </div>

          {/* Pulsing Indicator */}
          {isHovered && (
            <div 
              className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FF41] animate-ping"
              style={{ boxShadow: '0 0 10px #00FF41' }}
            />
          )}
        </div>

        {/* HUD Title */}
        <h3 
          className="mb-4 xs:mb-5 md:mb-6 text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl font-mono font-bold text-[#00FF41] tracking-wider uppercase transition-all duration-300 relative"
          style={{
            textShadow: isHovered 
              ? '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41' 
              : '0 0 5px #00FF41, 0 0 10px #00FF41'
          }}
        >
          <span className="inline-block text-[#00FF41]/50 mr-2 text-xs xs:text-sm">[</span>
          <span className="relative inline-block">
            {title}
            {/* Animated Underline */}
            <span 
              className={`absolute -bottom-1 left-0 h-[2px] bg-[#00FF41] transition-all duration-500 ${isHovered ? 'w-full shadow-[0_0_10px_#00FF41]' : 'w-0'}`}
            />
          </span>
          <span className="inline-block text-[#00FF41]/50 ml-2 text-xs xs:text-sm">]</span>
        </h3>

        {/* HUD Paragraph */}
        <p 
          className="text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed text-[#00FF41]/85 font-mono transition-colors duration-300"
          style={{
            textShadow: '0 0 3px rgba(0,255,65,0.3)'
          }}
        >
          {paragraph}
        </p>

        {/* HUD Status Bar */}
        <div className="mt-6 md:mt-8 relative">
          <div className="relative h-[2px] w-full bg-[#00FF41]/20">
            <div 
              className={`absolute left-0 top-0 h-full bg-[#00FF41] transition-all duration-700 ${isHovered ? 'w-full shadow-[0_0_10px_#00FF41]' : 'w-1/3 opacity-60'}`}
            />
          </div>
          
          {/* Progress Indicator Dots */}
          <div className="flex gap-1 mt-2">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className={`w-1.5 h-1.5 bg-[#00FF41] transition-all duration-300 ${isHovered ? 'opacity-100 shadow-[0_0_5px_#00FF41]' : 'opacity-40'}`}
                style={{
                  animation: isHovered ? `pulse 1.5s ease-in-out ${dot * 0.2}s infinite` : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFeature;