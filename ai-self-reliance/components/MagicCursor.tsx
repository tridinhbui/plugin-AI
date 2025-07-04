import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  timestamp: number
}

export default function MagicCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Add particle on movement
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      }
      
      setParticles(prev => [...prev, newParticle].slice(-15)) // Keep only last 15 particles
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.classList.contains('hover-effect') ||
        target.closest('.hover-effect') !== null
      )
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setParticles(prev => prev.filter(p => now - p.timestamp < 1000))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor */}
      <motion.div
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200
        }}
        className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg"
        style={{
          boxShadow: isHovering 
            ? '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(147, 51, 234, 0.4)'
            : '0 0 10px rgba(59, 130, 246, 0.3)'
        }}
      />

      {/* Outer ring */}
      <motion.div
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isClicking ? 1.5 : isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 150
        }}
        className="absolute w-8 h-8 rounded-full border-2 border-blue-400/50"
      />

      {/* Particle trail */}
      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: particle.x - 2, 
              y: particle.y - 2, 
              scale: 1, 
              opacity: 0.8 
            }}
            animate={{ 
              scale: 0, 
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `hsl(${200 + index * 10}, 70%, 60%)`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Click ripple effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ 
              x: position.x - 25, 
              y: position.y - 25, 
              scale: 0, 
              opacity: 0.6 
            }}
            animate={{ 
              scale: 2, 
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
            className="absolute w-12 h-12 rounded-full border-2 border-purple-400"
          />
        )}
      </AnimatePresence>
    </div>
  )
} 