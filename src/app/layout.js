'use client'

import './globals.css'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { isDemoMode } from '../utils/demoData'

export default function RootLayout({ children }) {
  const [showDemoBanner, setShowDemoBanner] = useState(false)

  useEffect(() => {
    setShowDemoBanner(isDemoMode())
  }, [])

  return (
    <html lang="en">
      <head>
        <title>Pixel to Practice - AI-Powered Radiology Learning</title>
        <meta name="description" content="Master radiology with adaptive AI feedback. Real-time performance analytics for medical students and residents." />
      </head>
      <body className="font-medical">
        <div className="min-h-screen bg-pacs-bg">
          <Header />
          
          {/* Demo Mode Banner */}
          {showDemoBanner && (
            <div className="bg-gradient-to-r from-pacs-accent to-cyan-600 text-white py-2 border-b border-pacs-border">
              <div className="medical-container">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <span className="font-semibold">Demo Mode Active</span>
                  <span className="opacity-60">•</span>
                  <span className="opacity-90">Sample performance data loaded for demonstration</span>
                </div>
              </div>
            </div>
          )}
          
          <main className="medical-container py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
