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
      <div className="wow fadeInUp transition-all duration-700" data-wow-delay={`${index * 0.1}s`}>
        {/* Modern Icon Container */}
        <div className="relative mb-8 md:mb-10 lg:mb-12 group/icon">
          {/* Enhanced Icon Glow Effect */}
          <div 
            className="absolute inset-0 blur-3xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-700 -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,65,0.6) 0%, rgba(0,255,136,0.3) 40%, transparent 70%)'
            }}
          />
          
          {/* Modern Icon Panel */}
          <div 
            className="relative flex h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 items-center justify-center bg-gradient-to-br from-black/90 via-[#001108]/80 to-black/90 border-2 border-[#00FF41]/30 group-hover/icon:border-[#00FF41]/80 transition-all duration-700 rounded-2xl shadow-[0_8px_32px_rgba(0,255,65,0.2)] group-hover/icon:shadow-[0_12px_48px_rgba(0,255,65,0.4),0_0_60px_rgba(0,255,136,0.3)] group-hover/icon:scale-110 backdrop-blur-sm"
            style={{
              boxShadow: isHovered 
                ? '0 12px 48px rgba(0,255,65,0.5), 0 0 80px rgba(0,255,136,0.3), inset 0 0 30px rgba(0,255,65,0.1)' 
                : '0 4px 24px rgba(0,255,65,0.2), inset 0 0 20px rgba(0,255,65,0.05)'
            }}
          >
            {/* Icon with Modern Styling */}
            <div 
              className={`transform transition-all duration-700 text-[#00FF41] ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}
              style={{
                filter: isHovered ? 'drop-shadow(0 0 15px #00FF41) drop-shadow(0 0 25px rgba(0,255,136,0.5))' : 'drop-shadow(0 0 8px rgba(0,255,65,0.6))'
              }}
            >
              {icon}
            </div>

            {/* Modern Corner Indicators */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 bg-[#00FF41]/50 group-hover/icon:bg-[#00FF41] rounded-full transition-all duration-500 group-hover/icon:shadow-[0_0_10px_#00FF41]" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#00FF41]/50 group-hover/icon:bg-[#00FF41] rounded-full transition-all duration-500 group-hover/icon:shadow-[0_0_10px_#00FF41]" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 bg-[#00FF88]/50 group-hover/icon:bg-[#00FF88] rounded-full transition-all duration-500 group-hover/icon:shadow-[0_0_10px_#00FF88]" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 bg-[#00FF88]/50 group-hover/icon:bg-[#00FF88] rounded-full transition-all duration-500 group-hover/icon:shadow-[0_0_10px_#00FF88]" />
          </div>

          {/* Enhanced Pulsing Indicator */}
          {isHovered && (
            <div className="absolute -top-2 -right-2">
              <div 
                className="w-4 h-4 bg-[#00FF41] rounded-full animate-ping"
                style={{ boxShadow: '0 0 15px #00FF41' }}
              />
              <div 
                className="absolute inset-0 w-4 h-4 bg-[#00FF41] rounded-full opacity-75"
                style={{ boxShadow: '0 0 20px #00FF41' }}
              />
            </div>
          )}
        </div>

        {/* Modern Title */}
        <h3 
          className="mb-5 xs:mb-6 md:mb-7 text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl font-mono font-bold text-[#00FF41] tracking-tight transition-all duration-500 relative text-center"
          style={{
            textShadow: isHovered 
              ? '0 0 15px rgba(0,255,65,0.8), 0 0 30px rgba(0,255,65,0.5), 0 0 45px rgba(0,255,136,0.3)' 
              : '0 0 8px rgba(0,255,65,0.6), 0 0 15px rgba(0,255,65,0.3)',
            letterSpacing: '-0.01em'
          }}
        >
          <span className="relative inline-block bg-gradient-to-r from-[#00FF41] via-[#00FF88] to-[#00FF41] bg-clip-text text-transparent">
            {title}
            {/* Enhanced Animated Underline */}
            <span 
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent transition-all duration-700 ${isHovered ? 'w-full shadow-[0_0_15px_#00FF41,0_0_25px_rgba(0,255,136,0.5)]' : 'w-0'}`}
            />
          </span>
        </h3>

        {/* Modern Paragraph */}
        <p 
          className="text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed text-[#00FF41]/90 font-mono transition-all duration-500 text-center px-2"
          style={{
            textShadow: '0 0 8px rgba(0,255,65,0.4), 0 0 15px rgba(0,255,65,0.2)',
            lineHeight: '1.75'
          }}
        >
          {paragraph}
        </p>

        {/* Enhanced Status Bar */}
        <div className="mt-8 md:mt-10 relative w-full">
          {/* Main Progress Bar */}
          <div className="relative h-[3px] w-full bg-[#00FF41]/15 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className={`absolute left-0 top-0 h-full bg-gradient-to-r from-[#00FF41] via-[#00FF88] to-[#00FF41] transition-all duration-1000 ease-out rounded-full ${isHovered ? 'w-full shadow-[0_0_15px_#00FF41,0_0_25px_rgba(0,255,136,0.5)]' : 'w-1/3 opacity-70'}`}
            />
            {/* Shimmer Effect */}
            {isHovered && (
              <div 
                className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
              />
            )}
          </div>
          
          {/* Modern Progress Indicator Dots */}
          <div className="flex gap-2 mt-4 justify-center">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full bg-gradient-to-br from-[#00FF41] to-[#00FF88] transition-all duration-500 ${isHovered ? 'opacity-100 shadow-[0_0_8px_#00FF41,0_0_15px_rgba(0,255,136,0.5)] scale-110' : 'opacity-50 scale-100'}`}
                style={{
                  animation: isHovered ? `pulse 1.5s ease-in-out ${dot * 0.25}s infinite` : 'none',
                  boxShadow: isHovered ? '0 0 10px rgba(0,255,65,0.8), 0 0 20px rgba(0,255,136,0.4)' : '0 0 5px rgba(0,255,65,0.3)'
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