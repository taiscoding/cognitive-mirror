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
        <div className="w-full max-w-6xl mx-auto px-4">
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
          <div className="inline-block mb-6 px-4 py-2 bg-pacs-elevated border border-pacs-accent/30 rounded-full backdrop-blur-sm">
            <span className="text-sm font-medium text-pacs-accent">
              AI-Powered Adaptive Learning
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-pacs-text mb-6 leading-tight tracking-tight">
            From <span className="text-gradient bg-clip-text">Pixel</span>
            <br className="md:hidden" />
            <span className="text-pacs-text-muted"> to </span>
            <span className="text-gradient bg-clip-text">Practice</span>
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-pacs-text-muted max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            style={{
              opacity: Math.max(0, 1 - scrollY / 400),
              transition: 'opacity 0.1s ease-out'
            }}
          >
            Master radiology with real-time AI feedback.<br className="hidden md:block" />
            <span className="text-pacs-text">See your diagnostic skills improve</span> with every case.
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          style={{
            transform: `translateY(${Math.max(0, 50 - scrollY * 0.1)}px)`,
            opacity: Math.min(1, scrollY / 300),
            transition: 'all 0.3s ease-out'
          }}
        >
          <div className="card text-center hover:shadow-lg transition-all duration-300 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-pacs-text mb-3">
              Real-Time Analytics
            </h3>
            <p className="text-pacs-text-muted">
              Track diagnostic accuracy and pattern recognition with quantified metrics. 
              Every case provides measurable improvement data.
            </p>
          </div>

          <div className="card text-center hover:shadow-lg transition-all duration-300 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-pacs-text mb-3">
              Adaptive Learning
            </h3>
            <p className="text-pacs-text-muted">
              AI-powered engine analyzes performance patterns and personalizes 
              case recommendations to optimize skill development.
            </p>
          </div>

          <div className="card text-center hover:shadow-lg transition-all duration-300 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-pacs-text mb-3">
              Immediate Feedback
            </h3>
            <p className="text-pacs-text-muted">
              Instant accuracy scoring with clinical pearls, 
              key learning points, and differential diagnoses for each case.
            </p>
          </div>
        </div>

        {/* The Problem/Solution */}
        <div className="card bg-pacs-surface border-pacs-border mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-pacs-text mb-4">
              Traditional radiology training lacks objective feedback
            </h2>
            <p className="text-pacs-text-muted text-lg mb-6">
              You review cases, but never know if you're actually improving. 
              Pixel to Practice quantifies your diagnostic skill development—making improvement 
              <span className="font-semibold text-pacs-accent"> visceral and immediate</span>.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-pacs-elevated rounded-lg p-4 border border-red-900/30">
                <div className="font-semibold text-red-400 mb-2">Traditional Learning</div>
                <div className="text-left text-pacs-text-muted space-y-1">
                  <div>• Subjective feedback only</div>
                  <div>• No progress tracking</div>
                  <div>• Abstract improvement</div>
                </div>
              </div>
              <div className="bg-pacs-elevated rounded-lg p-4 border border-green-900/30">
                <div className="font-semibold text-green-400 mb-2">Pixel to Practice</div>
                <div className="text-left text-pacs-text-muted space-y-1">
                  <div>• Real-time analytics</div>
                  <div>• Measurable progress</div>
                  <div>• Quantified improvement</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center pb-12">
          <p className="text-pacs-text-muted mb-4">
            Join medical students building diagnostic expertise through deliberate practice
          </p>
          <Link href="/cases">
            <button className="btn-primary text-lg px-8 py-4">
              {stats.hasData ? 'Practice More Cases' : 'Start Learning Now'} →
            </button>
          </Link>
          </div>
        </div>
      </div>
    </>
  )
}
