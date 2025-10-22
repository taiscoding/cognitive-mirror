'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toggleDemoMode, isDemoMode } from '../utils/demoData'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [demoActive, setDemoActive] = useState(false)
  
  useEffect(() => {
    setDemoActive(isDemoMode())
  }, [])
  
  const isActive = (path) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/'
    }
    return pathname.startsWith(path)
  }

  const handleDemoToggle = () => {
    const newState = toggleDemoMode()
    setDemoActive(newState)
    // Refresh the page to show updated data
    router.refresh()
    window.location.reload()
  }

  return (
    <header className="bg-pacs-surface/90 backdrop-blur-md shadow-lg border-b border-pacs-border">
      <div className="medical-container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity">
              Pixel to Practice
            </h1>
            <span className="text-pacs-text-muted text-sm">
              AI-Powered Radiology Case Review
            </span>
          </Link>
          
          <nav className="flex items-center space-x-1">
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'bg-pacs-accent text-white' 
                  : 'text-pacs-text-muted hover:text-pacs-text hover:bg-pacs-elevated'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/cases"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/cases')
                  ? 'bg-pacs-accent text-white' 
                  : 'text-pacs-text-muted hover:text-pacs-text hover:bg-pacs-elevated'
              }`}
            >
              Cases
            </Link>
            
            {/* Demo Mode Toggle */}
            <button
              onClick={handleDemoToggle}
              className={`ml-4 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                demoActive
                  ? 'bg-gradient-to-r from-pacs-accent to-cyan-600 text-white border-pacs-accent shadow-lg'
                  : 'bg-pacs-elevated text-pacs-text-muted border-pacs-border hover:border-pacs-accent hover:text-pacs-text'
              }`}
              title={demoActive ? 'Demo Mode Active - Click to clear' : 'Click to load demo data for interviews'}
            >
              {demoActive ? 'Demo Mode' : 'Demo'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
