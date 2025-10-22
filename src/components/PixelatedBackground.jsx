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

      // Create Monet's Water Lilies composition: weeping willows, reflections, lily pads
      // Match the reference image's vertical composition and color palette
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const xPos = x * pixelSize
          const yPos = y * pixelSize
          
          const xNorm = x / cols
          const yNorm = y / rows
          
          let r, g, b
          
          // Weeping willow branches hanging from top (like Monet's composition)
          const isWillow = (yNorm < 0.35 && (
            (xNorm < 0.25 && Math.sin(yNorm * 30 + xNorm * 8) > 0.4) ||
            (xNorm > 0.75 && Math.sin(yNorm * 30 - xNorm * 8) > 0.4)
          ))
          
          // Lily pad clusters (concentrated in lower-middle, like Monet)
          const lilyPadPattern = Math.sin(xNorm * 20) * Math.cos(yNorm * 15)
          const isLilyPad = (yNorm > 0.4 && yNorm < 0.75 && lilyPadPattern > 0.2)
          
          // Pink flowers scattered on lily pads
          const isPinkFlower = (isLilyPad && 
            Math.sin(xNorm * 50) * Math.cos(yNorm * 50) > 0.7 &&
            Math.random() > 0.7) // Add some randomness for natural placement
          
          if (isWillow) {
            // Dark green willow branches with blue-green reflections
            r = Math.floor(20 + Math.sin(yNorm * 20) * 30)
            g = Math.floor(90 + Math.cos(xNorm * 15) * 40)
            b = Math.floor(70 + Math.sin((xNorm + yNorm) * 10) * 30)
          }
          else if (isPinkFlower) {
            // Pink/magenta water lily flowers
            r = Math.floor(200 + Math.sin(xNorm * 40) * 30)
            g = Math.floor(110 + Math.cos(yNorm * 40) * 40)
            b = Math.floor(160 + Math.sin((xNorm - yNorm) * 30) * 30)
          }
          else if (isLilyPad) {
            // Rich green lily pads with yellow-green highlights
            r = Math.floor(40 + Math.sin(xNorm * 25) * 50)
            g = Math.floor(120 + Math.cos(yNorm * 20) * 60)
            b = Math.floor(55 + Math.sin((xNorm + yNorm) * 18) * 35)
          }
          else {
            // Water with sky reflections (blues, cyans, soft purples)
            // Upper water: lighter reflections
            if (yNorm < 0.4) {
              const reflection = Math.sin(xNorm * 8 + yNorm * 6) * 0.3
              r = Math.floor(80 + reflection * 50 + Math.sin(xNorm * 12) * 30)
              g = Math.floor(130 + reflection * 60 + Math.cos(yNorm * 10) * 40)
              b = Math.floor(150 + reflection * 70)
            }
            // Middle water: medium tones with green reflections
            else if (yNorm < 0.7) {
              const waterFlow = Math.sin(xNorm * 10 + yNorm * 8) * 0.25
              r = Math.floor(50 + waterFlow * 60 + Math.sin(xNorm * 15) * 25)
              g = Math.floor(105 + waterFlow * 65 + Math.cos(yNorm * 12) * 35)
              b = Math.floor(120 + waterFlow * 60)
            }
            // Lower water: deeper blues and purples
            else {
              const deepWater = Math.sin(xNorm * 12 - yNorm * 10) * 0.2
              r = Math.floor(40 + deepWater * 45)
              g = Math.floor(85 + deepWater * 55 + Math.sin(xNorm * 18) * 30)
              b = Math.floor(110 + deepWater * 65 + Math.cos(yNorm * 15) * 35)
            }
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

