'use client'

import { useState, useEffect } from 'react'
import ProgressDashboard from '../components/ProgressDashboard'
import CaseSelector from '../components/CaseSelector'
import ImageViewer from '../components/ImageViewer'
import FeedbackPanel from '../components/FeedbackPanel'
import { usePerformanceTracking } from '../hooks/usePerformanceTracking'

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard') // dashboard, cases, analysis
  const [selectedCase, setSelectedCase] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [userAnnotations, setUserAnnotations] = useState([])
  const [caseStartTime, setCaseStartTime] = useState(null)
  
  const {
    performance,
    updatePerformance,
    getRecentPerformance,
    getImprovementMetrics
  } = usePerformanceTracking()

  const handleCaseSelect = (caseData) => {
    setSelectedCase(caseData)
    setCurrentView('analysis')
    setUserAnnotations([])
    setShowFeedback(false)
    setCaseStartTime(Date.now())
  }

  const handleAnnotationSubmit = (annotations) => {
    setUserAnnotations(annotations)
    setShowFeedback(true)
    
    // Calculate performance metrics
    const completionTime = Date.now() - caseStartTime
    const accuracy = calculateAccuracy(annotations, selectedCase.annotations)
    
    // Update performance tracking
    updatePerformance({
      caseId: selectedCase.id,
      accuracy,
      completionTime,
      annotations: annotations.length,
      timestamp: Date.now()
    })
  }

  const calculateAccuracy = (userAnnotations, correctAnnotations) => {
    if (correctAnnotations.length === 0) return userAnnotations.length === 0 ? 1 : 0
    
    let matches = 0
    userAnnotations.forEach(userAnn => {
      const hasMatch = correctAnnotations.some(correctAnn => {
        const distance = Math.sqrt(
          Math.pow(userAnn.x - correctAnn.x, 2) + 
          Math.pow(userAnn.y - correctAnn.y, 2)
        )
        return distance < 50 // 50px tolerance
      })
      if (hasMatch) matches++
    })
    
    return matches / Math.max(userAnnotations.length, correctAnnotations.length)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <ProgressDashboard 
            performance={performance}
            recentPerformance={getRecentPerformance()}
            improvementMetrics={getImprovementMetrics()}
            onStartPractice={() => setCurrentView('cases')}
          />
        )
      case 'cases':
        return (
          <CaseSelector 
            onCaseSelect={handleCaseSelect}
            onBack={() => setCurrentView('dashboard')}
          />
        )
      case 'analysis':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2">
              <ImageViewer
                case={selectedCase}
                onAnnotationSubmit={handleAnnotationSubmit}
                showCorrectAnnotations={showFeedback}
                userAnnotations={userAnnotations}
              />
            </div>
            <div className="lg:col-span-1">
              {showFeedback && (
                <FeedbackPanel
                  case={selectedCase}
                  userAnnotations={userAnnotations}
                  accuracy={calculateAccuracy(userAnnotations, selectedCase.annotations)}
                  completionTime={Date.now() - caseStartTime}
                  onNextCase={() => setCurrentView('cases')}
                  onDashboard={() => setCurrentView('dashboard')}
                />
              )}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="medical-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gradient">
                Cognitive Mirror
              </h1>
              <span className="text-medical-gray text-sm">
                Diagnostic Skill Development Platform
              </span>
            </div>
            
            <nav className="flex space-x-1">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'dashboard' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-medical-gray hover:text-medical-dark hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('cases')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'cases' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-medical-gray hover:text-medical-dark hover:bg-gray-100'
                }`}
              >
                Cases
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="medical-container py-6">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
