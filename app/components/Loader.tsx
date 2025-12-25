'use client'

import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-black/95 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* HUD Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="loader-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00FF41" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            <filter id="grid-glow-loader">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#loader-grid)" filter="url(#grid-glow-loader)" />
        </svg>
      </div>

      {/* Scanning Lines */}
      <motion.div
        className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent"
        style={{
          boxShadow: '0 0 15px #00FF41, 0 0 30px rgba(0,255,65,0.5)',
          filter: 'blur(0.5px)'
        }}
        animate={{
          y: ['0vh', '100vh'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <motion.div
        className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent"
        style={{
          boxShadow: '0 0 8px rgba(0,255,65,0.4)'
        }}
        animate={{
          y: ['-10vh', '110vh'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
          delay: 2
        }}
      />

      {/* Corner Brackets */}
      <motion.div
        className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#00FF41]"
        style={{
          boxShadow: '0 0 15px rgba(0,255,65,0.6), 0 0 30px rgba(0,255,65,0.3)'
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#00FF41]"
        style={{
          boxShadow: '0 0 15px rgba(0,255,65,0.6), 0 0 30px rgba(0,255,65,0.3)'
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#00FF41]"
        style={{
          boxShadow: '0 0 15px rgba(0,255,65,0.6), 0 0 30px rgba(0,255,65,0.3)'
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#00FF41]"
        style={{
          boxShadow: '0 0 15px rgba(0,255,65,0.6), 0 0 30px rgba(0,255,65,0.3)'
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5
        }}
      />

      {/* Main Loading Container */}
      <div className="relative w-32 h-32 flex items-center justify-center z-20">
        {/* Outer Rotating Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-[#00FF41] border-t-transparent"
          style={{
            boxShadow: '0 0 20px rgba(0,255,65,0.6), 0 0 40px rgba(0,255,65,0.4), inset 0 0 10px rgba(0,255,65,0.1)'
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Middle Rotating Ring - Reverse */}
        <motion.div
          className="absolute inset-6 rounded-full border-4 border-[#00FF41]/70 border-b-transparent"
          style={{
            boxShadow: '0 0 15px rgba(0,255,65,0.5), 0 0 30px rgba(0,255,65,0.3)'
          }}
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Inner Rotating Ring */}
        <motion.div
          className="absolute inset-12 rounded-full border-2 border-[#00FF41]/50 border-l-transparent"
          style={{
            boxShadow: '0 0 10px rgba(0,255,65,0.4)'
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Pulsing Center Dot */}
        <motion.div
          className="absolute inset-16 rounded-full bg-[#00FF41]"
          style={{
            boxShadow: '0 0 20px rgba(0,255,65,0.7), 0 0 40px rgba(0,255,65,0.5), 0 0 60px rgba(0,255,65,0.3)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Outer Glow Ring */}
        <motion.div
          className="absolute -inset-4 rounded-full border-2 border-[#00FF41]/20"
          style={{
            boxShadow: '0 0 30px rgba(0,255,65,0.3)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Loading Text */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.span
          className="text-[#00FF41] font-mono text-sm uppercase tracking-wider"
          style={{
            textShadow: '0 0 10px rgba(0,255,65,0.6), 0 0 20px rgba(0,255,65,0.3)'
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          LOADING...
        </motion.span>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-[#00FF41] rounded-full"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            boxShadow: '0 0 10px #00FF41, 0 0 20px rgba(0,255,65,0.5)'
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2
          }}
        />
      ))}

      {/* CRT Scanline Effect */}
      <div
        className="absolute inset-0 pointer-events-none z-30 opacity-10 mix-blend-screen"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #00FF41 2px,
            #00FF41 4px
          )`,
        }}
      />
    </motion.div>
  )
}
