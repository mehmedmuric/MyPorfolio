'use client'

import { useEffect, useState, useRef } from "react";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

const Features = () => {
  useScrollAnimations();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section
      id="features"
      className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8
        bg-[#010101] bg-[radial-gradient(ellipse_at_top,_#0a3b27_0%,_#010101_80%)]"
    >
      {/* Animated cyber grid background */}
      <div 
        className="absolute inset-0 opacity-[0.08] 
          bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
               linear-gradient(#00ff99_1px,transparent_1px)] 
          bg-[size:50px_50px] animate-[gridMove_20s_linear_infinite]"
      />

      {/* Secondary grid layer for depth */}
      <div 
        className="absolute inset-0 opacity-[0.04] 
          bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
               linear-gradient(#00ff99_1px,transparent_1px)] 
          bg-[size:25px_25px]"
        style={{
          animation: 'gridMove-reverse 15s linear infinite'
        }}
      />

      {/* Pulsing green glow layers with parallax */}
      <div 
        className="absolute -inset-40 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.15),_transparent_60%)] blur-3xl animate-pulse-slow transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
        }}
      />
      <div 
        className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.08),_transparent_70%)] blur-[100px] transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
        }}
      />

      {/* Additional accent glow */}
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      />

      {/* Floating particles with more variety */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full opacity-20 animate-float"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${4 + i * 0.4}s`,
            width: `${2 + (i % 2)}px`,
            height: `${2 + (i % 2)}px`,
          }}
        />
      ))}

      {/* Animated scan lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"
          style={{
            animation: 'scanLine 8s linear infinite'
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <SectionTitle
          title="About Web and Mobile Applications"
          paragraph="I specialize in building high-performance web and mobile applications tailored to your business needs — from sleek user interfaces to scalable backend solutions."
          center
          mb="80px"
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, index) => (
            <SingleFeatureWrapper key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Enhanced Stats Bar */}
        <div ref={statsRef} className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: 'Projects Completed', value: 20, suffix: '+' },
            { label: 'Technologies Used', value: 15, suffix: '+' },
            { label: 'Years Experience', value: 3, suffix: '+' },
            { label: 'Client Satisfaction', value: 100, suffix: '%' }
          ].map((stat, idx) => (
            <StatCard 
              key={idx}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              index={idx}
              isVisible={statsVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

/* Enhanced Wrapper for SingleFeature with cyber-neon style */
const SingleFeatureWrapper = ({ feature, index }: { feature: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col h-full p-8 sm:p-10 rounded-2xl
        backdrop-blur-md bg-gradient-to-br from-black/80 via-black/70 to-black/80
        border border-green-500/30
        shadow-[0_0_30px_rgba(0,255,128,0.1)]
        hover:shadow-[0_0_50px_rgba(0,255,128,0.3)]
        hover:border-green-500/60
        transition-all duration-500 
        hover:-translate-y-2 hover:scale-[1.02]
        before:absolute before:inset-0 before:rounded-2xl
        before:bg-gradient-to-br before:from-green-500/0 before:via-green-500/5 before:to-green-500/0
        before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500
        overflow-hidden"
      data-animate="fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-green-500/20 rounded-tl-2xl group-hover:border-green-500/60 transition-colors duration-500">
        <div className={`absolute top-0 left-0 w-full h-full bg-green-500/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-green-500/20 rounded-br-2xl group-hover:border-green-500/60 transition-colors duration-500">
        <div className={`absolute bottom-0 right-0 w-full h-full bg-green-500/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Animated border glow */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 blur-sm transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-green-500/0 group-hover:bg-green-500/5 blur-xl transition-all duration-500 -z-10" />

      {/* Subtle inner glow */}
      <div className={`absolute inset-[1px] rounded-2xl bg-gradient-to-br from-green-500/0 via-green-500/5 to-green-500/0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Content */}
      <div className="relative z-10">
        <SingleFeature feature={feature} index={index} />
      </div>
    </div>
  );
};

/* Enhanced Stat Card with animated counter */
const StatCard = ({ 
  label, 
  value, 
  suffix, 
  index, 
  isVisible 
}: { 
  label: string; 
  value: number; 
  suffix: string; 
  index: number; 
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = value / steps;
  const stepDuration = duration / steps;

  useEffect(() => {
    if (!isVisible) return;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newValue = Math.min(Math.ceil(increment * currentStep), value);
      setCount(newValue);

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value, increment, stepDuration, steps]);

  return (
    <div 
      className="group relative p-6 rounded-2xl bg-black/40 border border-green-500/20 backdrop-blur-sm 
        hover:border-green-500/50 hover:bg-black/60 transition-all duration-300 hover:scale-105
        overflow-hidden"
      data-animate="scale-in-center"
      style={{ animationDelay: `${(featuresData.length + index) * 0.1}s` }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-green-500/20 rounded-tr-2xl group-hover:border-green-500/50 transition-colors duration-300" />

      <div className="relative z-10">
        <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
          {count}{suffix}
        </div>
        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
          {label}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-green-500/0 group-hover:bg-green-500/10 blur-xl transition-all duration-300 -z-10" />
    </div>
  );
};
