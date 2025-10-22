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
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="medical-container py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gradient">
              Pixel to Practice
            </h1>
            <span className="text-medical-gray text-sm">
              AI-Powered Radiology Case Review
            </span>
          </Link>
          
          <nav className="flex items-center space-x-1">
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-medical-gray hover:text-medical-dark hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/cases"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/cases')
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-medical-gray hover:text-medical-dark hover:bg-gray-100'
              }`}
            >
              Cases
            </Link>
            
            {/* Demo Mode Toggle */}
            <button
              onClick={handleDemoToggle}
              className={`ml-4 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                demoActive
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-600 shadow-lg'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
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
