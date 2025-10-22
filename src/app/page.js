'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [stats, setStats] = useState({ totalCases: 0, avgAccuracy: 0, hasData: false })

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

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full">
            <span className="text-sm font-medium text-blue-700">
              ✨ AI-Powered Adaptive Learning
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-medical-dark mb-6 leading-tight">
            From <span className="text-gradient">Pixel to Practice</span>
          </h1>
          
          <p className="text-xl text-medical-gray max-w-2xl mx-auto mb-8 leading-relaxed">
            Master radiology with real-time AI feedback. See your diagnostic skills improve 
            with every case—quantified, visual, and visceral.
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
                  <div className="text-medical-gray">Cases Completed</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-green-600">{stats.avgAccuracy.toFixed(0)}%</div>
                  <div className="text-medical-gray">Avg Accuracy</div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-medical-dark mb-3">
              Real-Time Analytics
            </h3>
            <p className="text-medical-gray">
              Watch your diagnostic accuracy and pattern recognition improve in real-time. 
              Every case makes you measurably better.
            </p>
          </div>

          <div className="card text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="text-xl font-bold text-medical-dark mb-3">
              Adaptive Learning
            </h3>
            <p className="text-medical-gray">
              AI-powered engine tracks your progress and identifies patterns. 
              Get personalized insights on your diagnostic reasoning.
            </p>
          </div>

          <div className="card text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-medical-dark mb-3">
              Immediate Feedback
            </h3>
            <p className="text-medical-gray">
              Instant feedback on every annotation with clinical pearls, 
              learning points, and differential diagnoses.
            </p>
          </div>
        </div>

        {/* The Problem/Solution */}
        <div className="card bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-blue-200 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-medical-dark mb-4">
              Traditional radiology training lacks objective feedback
            </h2>
            <p className="text-medical-gray text-lg mb-6">
              You review cases, but never know if you're actually improving. 
              Pixel to Practice quantifies your diagnostic skill development—making improvement 
              <span className="font-semibold text-blue-700"> visceral and immediate</span>.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <div className="font-semibold text-red-700 mb-2">❌ Traditional Learning</div>
                <div className="text-left text-medical-gray space-y-1">
                  <div>• Subjective feedback only</div>
                  <div>• No progress tracking</div>
                  <div>• Abstract improvement</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="font-semibold text-green-700 mb-2">✅ Pixel to Practice</div>
                <div className="text-left text-medical-gray space-y-1">
                  <div>• Real-time analytics</div>
                  <div>• Measurable progress</div>
                  <div>• Visceral improvement</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center pb-12">
          <p className="text-medical-gray mb-4">
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
  )
}
