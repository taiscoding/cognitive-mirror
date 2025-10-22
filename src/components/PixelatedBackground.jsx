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
          
          // Stars (scattered across upper portion)
          const starPattern = Math.sin(xNorm * 50) * Math.cos(yNorm * 50)
          const isStar = (yNorm < 0.6 && starPattern > 0.85)
          
          // Cypress tree (dark vertical shape on left)
          const treeShape = Math.sin((yNorm - 0.3) * 20) * 0.05
          const isCypress = (xNorm < 0.15 + treeShape && yNorm > 0.2 && yNorm < 0.75)
          
          // Village at bottom (small buildings)
          const isVillage = (yNorm > 0.75 && Math.sin(xNorm * 30) > 0.3)
          
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
          else if (isVillage) {
            // Dark village buildings with warm lights
            const hasLight = Math.sin(xNorm * 60) > 0.7
            if (hasLight) {
              r = Math.floor(200 + swirl * 30)
              g = Math.floor(150 + swirl * 40)
              b = Math.floor(50 + swirl * 30)
            } else {
              r = Math.floor(30 + swirl * 20)
              g = Math.floor(35 + swirl * 25)
              b = Math.floor(50 + swirl * 30)
            }
          }
          else {
            // Swirling night sky (blues with hints of green and purple)
            if (yNorm < 0.3) {
              // Upper sky: deeper blues with swirls
              r = Math.floor(20 + swirl * 60)
              g = Math.floor(40 + swirl * 80)
              b = Math.floor(90 + swirl * 100)
            }
            else if (yNorm < 0.6) {
              // Middle sky: rich blues with cyan swirls
              r = Math.floor(30 + swirl * 50)
              g = Math.floor(60 + swirl * 90)
              b = Math.floor(110 + swirl * 90)
            }
            else if (yNorm < 0.75) {
              // Lower sky/horizon: lighter blues transitioning
              r = Math.floor(40 + swirl * 70)
              g = Math.floor(70 + swirl * 80)
              b = Math.floor(100 + swirl * 70)
            }
            else {
              // Horizon above village: darkest blues
              r = Math.floor(25 + swirl * 40)
              g = Math.floor(35 + swirl * 50)
              b = Math.floor(60 + swirl * 60)
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
      style={{ zIndex: 0, opacity: 0.5 }}
    />
  )
}

