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

      // Create Van Gogh's Starry Night: swirling sky, stars, moon, cypress tree, village
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const xPos = x * pixelSize
          const yPos = y * pixelSize
          
          const xNorm = x / cols
          const yNorm = y / rows
          
          let r, g, b
          
          // Create swirling pattern for the sky (Van Gogh's signature brush strokes)
          const swirl1 = Math.sin(xNorm * 8 + yNorm * 6 + Math.cos(yNorm * 10) * 2) * 0.5
          const swirl2 = Math.cos(xNorm * 6 - yNorm * 8 + Math.sin(xNorm * 12) * 1.5) * 0.5
          const swirl = (swirl1 + swirl2) * 0.5 + 0.5
          
          // Crescent moon (upper right)
          const moonX = 0.75
          const moonY = 0.15
          const distToMoon = Math.sqrt(Math.pow((xNorm - moonX) * 2, 2) + Math.pow((yNorm - moonY) * 2, 2))
          const isMoon = distToMoon < 0.08
          const isMoonGlow = distToMoon < 0.15
          
          // Cypress tree (dark vertical shape on left) - check FIRST for proper layering
          const treeShape = Math.sin((yNorm - 0.3) * 20) * 0.05
          const isCypress = (xNorm < 0.15 + treeShape && yNorm > 0.2 && yNorm < 0.85)
          
          // Stars (scattered across upper portion, but NOT over the tree)
          const starPattern = Math.sin(xNorm * 50) * Math.cos(yNorm * 50)
          const isStar = (!isCypress && yNorm < 0.6 && starPattern > 0.85)
          
          // Rolling hills at bottom (organic landscape)
          const hillPattern = Math.sin(xNorm * 8) * 0.05 + Math.cos(xNorm * 12) * 0.03
          const hillLine = 0.85 + hillPattern
          const isHills = yNorm > hillLine
          
          if (isMoon) {
            // Bright yellow-white moon
            r = Math.floor(240 + swirl * 15)
            g = Math.floor(230 + swirl * 20)
            b = Math.floor(180 + swirl * 30)
          }
          else if (isMoonGlow) {
            // Yellow glow around moon
            const glowIntensity = 1 - (distToMoon - 0.08) / 0.07
            r = Math.floor(200 + glowIntensity * 40)
            g = Math.floor(180 + glowIntensity * 50)
            b = Math.floor(100 + glowIntensity * 80)
          }
          else if (isStar) {
            // Bright yellow-white stars with radiating glow
            r = Math.floor(220 + swirl * 35)
            g = Math.floor(210 + swirl * 40)
            b = Math.floor(160 + swirl * 60)
          }
          else if (isCypress) {
            // Very dark green-black cypress tree
            r = Math.floor(15 + swirl * 20)
            g = Math.floor(25 + swirl * 25)
            b = Math.floor(20 + swirl * 20)
          }
          else if (isHills) {
            // Dark rolling hills with subtle variations (like distant landscape)
            const hillDepth = (yNorm - hillLine) / (1 - hillLine) // 0 at hill line, 1 at bottom
            const hillVariation = Math.sin(xNorm * 15) * 0.15
            r = Math.floor(20 + hillVariation * 15 + hillDepth * 10)
            g = Math.floor(25 + hillVariation * 20 + hillDepth * 15)
            b = Math.floor(30 + hillVariation * 20 + hillDepth * 10)
          }
          else {
            // Swirling night sky with smooth vertical gradient
            // Blend from deep blues at top to medium blues at bottom
            const skyBlend = yNorm // 0 at top, 1 at bottom
            
            // Base colors with smooth gradient
            const baseR = 20 + (skyBlend * 35)  // 20 -> 55
            const baseG = 40 + (skyBlend * 50)  // 40 -> 90
            const baseB = 90 + (skyBlend * 30)  // 90 -> 120
            
            // Add swirling variations
            r = Math.floor(baseR + swirl * 50)
            g = Math.floor(baseG + swirl * 70)
            b = Math.floor(baseB + swirl * 80)
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
      style={{ zIndex: 0, opacity: 0.5 }}
    />
  )
}

