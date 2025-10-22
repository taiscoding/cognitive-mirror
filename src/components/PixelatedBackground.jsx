'use client'

import { useEffect, useRef, useState } from 'react'

export default function PixelatedBackground() {
  const canvasRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const progress = Math.min(scrollPosition / documentHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    
    // Set canvas size
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    ctx.scale(dpr, dpr)

    // Calculate pixel size based on scroll progress
    // Start very pixelated (20px blocks), end at 1px (clear)
    const maxPixelSize = 24
    const minPixelSize = 1
    const pixelSize = Math.max(
      minPixelSize,
      maxPixelSize - (maxPixelSize - minPixelSize) * scrollProgress
    )

    // Create medical imaging gradient pattern
    const drawPixelatedGradient = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const cols = Math.ceil(window.innerWidth / pixelSize)
      const rows = Math.ceil(window.innerHeight / pixelSize)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Create a radial gradient pattern (like radiology images)
          const centerX = window.innerWidth / 2
          const centerY = window.innerHeight / 2
          const xPos = x * pixelSize
          const yPos = y * pixelSize
          
          const distance = Math.sqrt(
            Math.pow(xPos - centerX, 2) + Math.pow(yPos - centerY, 2)
          )
          const maxDistance = Math.sqrt(
            Math.pow(centerX, 2) + Math.pow(centerY, 2)
          )
          
          // Create subtle pattern
          const normalizedDistance = distance / maxDistance
          const wave = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.1
          const brightness = 0.05 + (0.95 - normalizedDistance * 0.5) * scrollProgress + wave
          
          // Color based on position and scroll (clinical blue tones)
          const r = Math.floor(10 + brightness * 40)
          const g = Math.floor(14 + brightness * 50)
          const b = Math.floor(20 + brightness * 80)
          
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
          ctx.fillRect(xPos, yPos, pixelSize, pixelSize)
        }
      }
    }

    drawPixelatedGradient()

    // Redraw on resize
    const handleResize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      drawPixelatedGradient()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [scrollProgress])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.3 }}
    />
  )
}

