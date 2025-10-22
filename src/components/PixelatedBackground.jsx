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
    // Start very pixelated (32px blocks), end at 1px (clear) as you scroll DOWN
    const maxPixelSize = 32
    const minPixelSize = 1
    const pixelSize = Math.max(
      minPixelSize,
      maxPixelSize * (1 - scrollProgress)  // Inverted: starts at max, decreases to min
    )

    // Create pixelated image from artwork
    const drawPixelatedImage = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const cols = Math.ceil(window.innerWidth / pixelSize)
      const rows = Math.ceil(window.innerHeight / pixelSize)

      // Create an impressionist-style pattern (inspired by Monet's water lilies)
      // Using procedural generation to create an artwork-like appearance
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const xPos = x * pixelSize
          const yPos = y * pixelSize
          
          // Create organic flowing patterns like water lilies
          const xNorm = x / cols
          const yNorm = y / rows
          
          // Layered noise for organic feel
          const wave1 = Math.sin(xNorm * 8 + yNorm * 3) * 0.5
          const wave2 = Math.cos(xNorm * 4 - yNorm * 6) * 0.3
          const wave3 = Math.sin((xNorm + yNorm) * 10) * 0.2
          const combinedWave = (wave1 + wave2 + wave3) * 0.5 + 0.5
          
          // Create impressionist color palette (blues, greens, soft purples)
          // Top portion: sky/water (blues, cyans)
          // Middle: water lilies (greens, soft pinks)
          // Bottom: deeper water (darker blues, purples)
          
          let r, g, b
          if (yNorm < 0.3) {
            // Sky/upper water - soft blues and cyans
            r = Math.floor(20 + combinedWave * 60 + Math.sin(xNorm * 15) * 20)
            g = Math.floor(40 + combinedWave * 80 + Math.cos(yNorm * 10) * 30)
            b = Math.floor(60 + combinedWave * 100)
          } else if (yNorm < 0.7) {
            // Middle - lily pads (greens, aquas, soft pinks)
            const lilyPattern = Math.sin(xNorm * 20) * Math.cos(yNorm * 15)
            r = Math.floor(30 + combinedWave * 50 + lilyPattern * 40)
            g = Math.floor(50 + combinedWave * 90 + Math.sin(xNorm * 12) * 30)
            b = Math.floor(40 + combinedWave * 70)
          } else {
            // Bottom - deeper water (darker blues, purples)
            r = Math.floor(15 + combinedWave * 40)
            g = Math.floor(25 + combinedWave * 50)
            b = Math.floor(45 + combinedWave * 85 + Math.cos(xNorm * 8) * 20)
          }
          
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
          ctx.fillRect(xPos, yPos, pixelSize, pixelSize)
        }
      }
    }

    drawPixelatedImage()

    // Redraw on resize
    const handleResize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      drawPixelatedImage()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [scrollProgress])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.25 }}
    />
  )
}

