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
    // Start pixelated (20px blocks), gradually become clear (2px) as you scroll DOWN
    // Effect reverses when scrolling back up
    const maxPixelSize = 20  // Reduced from 32 for more recognizable initial state
    const minPixelSize = 2   // Increased from 1 for better performance
    const pixelSize = Math.max(
      minPixelSize,
      maxPixelSize * (1 - scrollProgress)  // 0% scroll = 20px, 100% scroll = 2px
    )

    // Create pixelated image from artwork
    const drawPixelatedImage = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const cols = Math.ceil(window.innerWidth / pixelSize)
      const rows = Math.ceil(window.innerHeight / pixelSize)

      // Create a recognizable impressionist scene (water lilies on a pond)
      // Even when pixelated, the composition should be identifiable
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const xPos = x * pixelSize
          const yPos = y * pixelSize
          
          const xNorm = x / cols
          const yNorm = y / rows
          
          // Create distinct zones that are recognizable even when pixelated
          let r, g, b
          
          // Top third: Light sky reflection (light blues/cyans)
          if (yNorm < 0.25) {
            const skyVariation = Math.sin(xNorm * 6) * 0.15 + Math.cos(yNorm * 8) * 0.1
            r = Math.floor(50 + skyVariation * 40)
            g = Math.floor(80 + skyVariation * 50)
            b = Math.floor(120 + skyVariation * 60)
          }
          // Upper-middle: Distant lily pads (teal/green transition)
          else if (yNorm < 0.45) {
            const lilyDots = (Math.sin(xNorm * 25) * Math.cos(yNorm * 20) > 0.3) ? 1.3 : 1
            r = Math.floor(40 * lilyDots + Math.sin(xNorm * 10) * 20)
            g = Math.floor(95 * lilyDots + Math.cos(yNorm * 12) * 25)
            b = Math.floor(80 * lilyDots)
          }
          // Middle: Main lily pad cluster (vibrant greens with pink flowers)
          else if (yNorm < 0.65) {
            // Create circular lily pad shapes
            const centerDist = Math.sqrt(Math.pow((xNorm - 0.5) * 2, 2) + Math.pow((yNorm - 0.55) * 2, 2))
            const isFlower = (centerDist < 0.3 && Math.sin(xNorm * 40) * Math.cos(yNorm * 40) > 0.5)
            
            if (isFlower) {
              // Pink/white flowers
              r = Math.floor(180 + Math.sin(xNorm * 30) * 40)
              g = Math.floor(100 + Math.cos(yNorm * 30) * 50)
              b = Math.floor(140)
            } else {
              // Green lily pads
              r = Math.floor(35 + Math.sin(xNorm * 15) * 25)
              g = Math.floor(110 + Math.cos(yNorm * 18) * 30)
              b = Math.floor(65 + Math.sin((xNorm + yNorm) * 12) * 20)
            }
          }
          // Lower section: Deep water with reflections (dark blue/purple)
          else {
            const waterRipple = Math.sin(xNorm * 12 + yNorm * 8) * 0.2
            r = Math.floor(25 + waterRipple * 30)
            g = Math.floor(45 + waterRipple * 35)
            b = Math.floor(85 + waterRipple * 50 + Math.cos(xNorm * 15) * 25)
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
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.3 }}
    />
  )
}

