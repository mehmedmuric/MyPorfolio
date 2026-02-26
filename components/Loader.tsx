'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootSequence = [
  "INITIALIZING KERNEL...",
  "LOADING SYSTEM MODULES...",
  "ESTABLISHING SECURE CONNECTION...",
  "BYPASSING ENCRYPTION...",
  "INITIALIZING UI COMPONENTS...",
  "DECODING ASSETS...",
  "SYSTEM READY."
]

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [bootText, setBootText] = useState<string[]>([])

  // Faux progress counter
  useEffect(() => {
    let currentProgress = 0
    const interval = setInterval(() => {
      // Add random jumps to make it feel like real loading
      const jump = Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 2 : 1
      currentProgress += jump

      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
      }
      setProgress(currentProgress)
    }, 45)

    return () => clearInterval(interval)
  }, [])

  // Terminal text lines
  useEffect(() => {
    let currentLine = 0
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setBootText(prev => {
          const next = [...prev, bootSequence[currentLine]]
          if (next.length > 5) next.shift() // Keep only last 5 lines
          return next
        })
        currentLine++
      } else {
        clearInterval(interval)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {progress <= 100 && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-[#030712] z-[100] overflow-hidden font-mono"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background vignette & gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.03)_0%,transparent_100%)] z-10" />

          {/* HUD Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.05]">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="loader-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00FF41" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#loader-grid)" />
            </svg>
          </div>

          {/* Scanning Line Background */}
          <motion.div
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/80 to-transparent z-20"
            style={{ boxShadow: '0 0 15px #00FF41, 0 0 30px rgba(0,255,65,0.4)' }}
            animate={{ y: ['-10vh', '110vh'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Glitch Overlay */}
          <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.02] mix-blend-screen bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#00FF41_2px,#00FF41_4px)]" />

          {/* Frame/Corner Brackets */}
          <div className="absolute inset-4 sm:inset-8 z-20 pointer-events-none opacity-40">
            {/* Top Left */}
            <motion.div
              className="absolute top-0 left-0 w-8 sm:w-16 h-8 sm:h-16 border-t-2 border-l-2 border-[#00FF41]"
              style={{ boxShadow: 'inset 2px 2px 10px rgba(0,255,65,0.1)' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            {/* Top Right */}
            <motion.div
              className="absolute top-0 right-0 w-8 sm:w-16 h-8 sm:h-16 border-t-2 border-r-2 border-[#00FF41]"
              style={{ boxShadow: 'inset -2px 2px 10px rgba(0,255,65,0.1)' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            />
            {/* Bottom Left */}
            <motion.div
              className="absolute bottom-0 left-0 w-8 sm:w-16 h-8 sm:h-16 border-b-2 border-l-2 border-[#00FF41]"
              style={{ boxShadow: 'inset 2px -2px 10px rgba(0,255,65,0.1)' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
            />
            {/* Bottom Right */}
            <motion.div
              className="absolute bottom-0 right-0 w-8 sm:w-16 h-8 sm:h-16 border-b-2 border-r-2 border-[#00FF41]"
              style={{ boxShadow: 'inset -2px -2px 10px rgba(0,255,65,0.1)' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1.5 }}
            />
          </div>

          {/* Main Content Center */}
          <div className="relative z-40 flex flex-col items-center justify-center -mt-10">

            {/* Spinning Rings & Percentage Container */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-8">

              {/* Outer Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[#00FF41]/10"
                style={{ boxShadow: '0 0 40px rgba(0,255,65,0.1)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Outer Rotating Ring */}
              <motion.div
                className="absolute inset-4 rounded-full border border-t-[#00FF41] border-r-[#00FF41] border-l-[#00FF41]/20 border-b-[#00FF41]/20"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,65,0.6))' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Middle Dashed Ring */}
              <motion.div
                className="absolute inset-8 rounded-full border-[1.5px] border-dashed border-[#00FF41]/60"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner Rotating Ring */}
              <motion.div
                className="absolute inset-12 rounded-full border-[3px] border-[#00FF41]/10 border-t-[#00FF41] border-b-[#00FF41]"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner Pulsing Dot/Glow */}
              <motion.div
                className="absolute inset-[6.5rem] sm:inset-[7.5rem] rounded-full bg-[#00FF41]/20 blur-md pointer-events-none"
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Percentage Text Center */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <div className="flex items-start">
                  <motion.span
                    className="text-[#00FF41] text-4xl sm:text-5xl font-bold tracking-tighter tabular-nums"
                    style={{ textShadow: '0 0 20px rgba(0,255,65,0.8), 0 0 10px rgba(0,255,65,0.4)' }}
                  >
                    {progress}
                  </motion.span>
                  <span className="text-[#00FF41]/60 text-sm sm:text-base mt-1 font-bold">%</span>
                </div>
                <div className="text-[#00FF41]/50 text-[10px] sm:text-xs tracking-widest mt-1">
                  LOADING
                </div>
              </div>
            </div>

            {/* Global Progress Bar */}
            <div className="w-64 sm:w-80 h-[2px] bg-[#00FF41]/10 rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#00FF41]"
                style={{ width: `${progress}%`, boxShadow: '0 0 10px #00FF41, 0 0 5px #00FF41' }}
              />
            </div>

            {/* Status Boot Text */}
            <div className="flex flex-col items-center text-[#00FF41] text-[10px] sm:text-xs tracking-[0.2em] relative">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {progress < 100 ? 'SYSTEM_BOOT_SEQUENCE_INITIATED' : 'ACCESS_GRANTED'}
              </motion.div>
            </div>
          </div>

          {/* Terminal Output (Bottom Left) */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-40 text-[#00FF41]/70 text-[10px] sm:text-xs font-mono max-w-[200px] sm:max-w-xs text-left leading-relaxed">
            {bootText.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-1 uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis"
              >
                <span className="text-[#00FF41] opacity-50 mr-2">{'>'}</span>
                {text}
              </motion.div>
            ))}
            {progress < 100 && (
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 sm:w-2.5 h-3 sm:h-4 bg-[#00FF41] mt-1 shadow-[0_0_8px_#00FF41]"
              />
            )}
          </div>

          {/* Decorative Data Blocks (Right Side) */}
          <div className="absolute top-1/4 right-6 sm:right-10 z-40 flex-col gap-3 hidden md:flex items-end opacity-50">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-2 items-center justify-end">
                <div className="text-[10px] text-[#00FF41] font-mono whitespace-nowrap text-right">
                  0x{Math.floor(Math.random() * 10000).toString(16).padStart(4, '0').toUpperCase()}
                </div>
                <motion.div
                  className="h-[2px] bg-[#00FF41]"
                  animate={{ width: [10, Math.random() * 30 + 10, 10] }}
                  transition={{ duration: 1.5 + Math.random(), repeat: Infinity }}
                />
              </div>
            ))}
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-[2px] h-[2px] bg-[#00FF41]/60 rounded-full"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  boxShadow: '0 0 8px #00FF41, 0 0 4px #00FF41'
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, (Math.random() - 0.5) * 20, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
