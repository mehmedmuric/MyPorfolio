'use client'

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="relative w-24 h-24 animate-rotate-slow">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin-slow shadow-[0_0_20px_rgba(0,255,128,0.6)]"></div>
        
        {/* Inner rotating ring */}
        <div className="absolute inset-4 rounded-full border-4 border-green-400 border-b-transparent animate-spin-reverse shadow-[0_0_15px_rgba(0,255,128,0.5)]"></div>
        
        {/* Pulsing center */}
        <div className="absolute inset-8 rounded-full bg-green-500 animate-pulse shadow-[0_0_20px_rgba(0,255,128,0.7)]"></div>
      </div>
    </div>
  )
}
