"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-[0.05] 
          bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
               linear-gradient(#00ff99_1px,transparent_1px)] 
          bg-[size:30px_30px] animate-[gridMove_15s_linear_infinite]"
      />
      
      {/* Pulsing glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.1),_transparent_70%)] blur-3xl animate-pulse-slow" />
      
      <div className="relative w-16 h-16">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
        
        {/* Middle spinning ring */}
        <div className="absolute inset-2 rounded-full border-4 border-green-400 border-b-transparent animate-spin [animation-duration:2s] [animation-direction:reverse]"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-4 rounded-full bg-green-500 animate-pulse shadow-[0_0_20px_rgba(0,255,128,0.6)]"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl animate-pulse"></div>
      </div>
      
      {/* Loading text */}
      <div className="absolute bottom-1/4 text-green-400 text-sm font-semibold tracking-wider animate-pulse">
        Loading...
      </div>
    </div>
  );
}
