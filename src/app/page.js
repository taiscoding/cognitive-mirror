'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import PixelatedBackground from '../components/PixelatedBackground'

export default function Home() {
  const [stats, setStats] = useState({ totalCases: 0, avgAccuracy: 0, hasData: false })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    // Check if user has existing data
    const performance = JSON.parse(localStorage.getItem('performance') || '[]')
    if (performance.length > 0) {
      const avgAccuracy = performance.reduce((sum, p) => sum + p.accuracy, 0) / performance.length
      setStats({
        totalCases: performance.length,
        avgAccuracy: avgAccuracy * 100,
        hasData: true
      })
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <PixelatedBackground />
      <div className="relative min-h-[calc(100vh-200px)] flex items-center" style={{ zIndex: 1 }}>
        <div className="w-full max-w-7xl mx-auto px-8">
          {/* Hero Section */}
          <div 
            ref={heroRef}
            className="text-center mb-16 animate-fade-in"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY / 500),
              transition: 'transform 0.1s ease-out'
            }}
          >
          <div className="inline-block mb-6 px-4 py-2 bg-pacs-elevated/90 border border-pacs-accent/30 rounded-full backdrop-blur-md">
            <span className="text-sm font-medium text-pacs-accent">
              AI-Powered Adaptive Learning
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight text-pacs-text mb-12 leading-tight tracking-tighter">
            From <span className="text-gradient bg-clip-text font-light">Pixel</span>
            <br />
            <span className="text-pacs-text-muted font-thin"> to </span>
            <span className="text-gradient bg-clip-text font-light">Practice</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-pacs-text-muted max-w-2xl mx-auto mb-16 leading-loose font-light tracking-wide"
            style={{
              opacity: Math.max(0, 1 - scrollY / 400),
              transition: 'opacity 0.1s ease-out'
            }}
          >
            Master radiology with real-time AI feedback.
            <br />
            <span className="text-pacs-text font-normal">See your diagnostic skills improve</span> with every case.
          </p>

          {stats.hasData ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/dashboard">
                <button className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Continue Learning →
                </button>
              </Link>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-2xl text-primary-600">{stats.totalCases}</div>
                  <div className="text-pacs-text-muted">Cases Completed</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-green-600">{stats.avgAccuracy.toFixed(0)}%</div>
                  <div className="text-pacs-text-muted">Avg Accuracy</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/cases">
                <button className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Start Your First Case →
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="btn-secondary text-lg px-8 py-4">
                  View Dashboard
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Key Features */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 mt-32 max-w-5xl mx-auto"
          style={{
            transform: `translateY(${Math.max(0, 50 - scrollY * 0.1)}px)`,
            opacity: Math.min(1, scrollY / 300),
            transition: 'all 0.3s ease-out'
          }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-light text-pacs-text mb-3 tracking-tight">
              Real-Time Analytics
            </h3>
            <p className="text-pacs-text-muted text-sm leading-relaxed font-light">
              Track diagnostic accuracy and pattern recognition with quantified metrics. 
              Every case provides measurable improvement data.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-light text-pacs-text mb-3 tracking-tight">
              Adaptive Learning
            </h3>
            <p className="text-pacs-text-muted text-sm leading-relaxed font-light">
              AI-powered engine analyzes performance patterns and personalizes 
              case recommendations to optimize skill development.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-light text-pacs-text mb-3 tracking-tight">
              Immediate Feedback
            </h3>
            <p className="text-pacs-text-muted text-sm leading-relaxed font-light">
              Instant accuracy scoring with clinical pearls, 
              key learning points, and differential diagnoses for each case.
            </p>
          </div>
        </div>

        {/* The Problem/Solution */}
        <div className="max-w-4xl mx-auto text-center mb-32 mt-16">
          <h2 className="text-4xl md:text-5xl font-extralight text-pacs-text mb-8 tracking-tighter leading-tight">
            Traditional radiology training lacks objective feedback
          </h2>
          <p className="text-pacs-text-muted text-base md:text-lg mb-12 font-light leading-loose max-w-2xl mx-auto">
            You review cases, but never know if you're actually improving. 
            <br /><br />
            Pixel to Practice quantifies your diagnostic skill development—making improvement 
            <span className="text-pacs-text font-normal"> visceral and immediate</span>.
          </p>
        </div>

        {/* CTA Footer */}
        <div className="text-center pb-16">
          <p className="text-pacs-text-muted text-sm mb-6 font-light">
            Join medical students building diagnostic expertise through deliberate practice
          </p>
          <Link href="/cases">
            <button className="btn-primary text-lg px-8 py-4">
              {stats.hasData ? 'Practice More Cases' : 'Start Learning Now'}
            </button>
          </Link>
        </div>
        </div>
      </div>
    </>
  )
}
