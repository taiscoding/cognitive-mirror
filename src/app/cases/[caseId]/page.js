'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageViewer from '../../../components/ImageViewer'
import FeedbackPanel from '../../../components/FeedbackPanel'
import { usePerformanceTracking } from '../../../hooks/usePerformanceTracking'
import cases from '../../../data/cases.json'

export default function CasePage({ params }) {
  const router = useRouter()
  const { caseId } = params
  const [caseData, setCaseData] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [userAnnotations, setUserAnnotations] = useState([])
  const [caseStartTime, setCaseStartTime] = useState(null)
  
  const {
    updatePerformance
  } = usePerformanceTracking()

  // Load case data
  useEffect(() => {
    const foundCase = cases.find(c => c.id === caseId)
    if (foundCase) {
      setCaseData(foundCase)
      setCaseStartTime(Date.now())
    }
  }, [caseId])

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

  const handleAnnotationSubmit = (annotations) => {
    setUserAnnotations(annotations)
    setShowFeedback(true)
    
    // Calculate performance metrics
    const completionTime = Date.now() - caseStartTime
    const accuracy = calculateAccuracy(annotations, caseData.annotations)
    
    // Update performance tracking
    updatePerformance({
      caseId: caseData.id,
      accuracy,
      completionTime,
      annotations: annotations.length,
      timestamp: Date.now()
    })
  }

  if (!caseData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-pacs-text-muted">Loading case...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/cases" className="btn-secondary">
          ← Back to Cases
        </Link>
        <Link href="/dashboard" className="btn-secondary">
          Dashboard
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ImageViewer
            case={caseData}
            onAnnotationSubmit={handleAnnotationSubmit}
            showCorrectAnnotations={showFeedback}
            userAnnotations={userAnnotations}
          />
        </div>
        <div className="lg:col-span-1">
          {showFeedback && (
            <FeedbackPanel
              case={caseData}
              userAnnotations={userAnnotations}
              accuracy={calculateAccuracy(userAnnotations, caseData.annotations)}
              completionTime={Date.now() - caseStartTime}
              onNextCase={() => router.push('/cases')}
              onDashboard={() => router.push('/dashboard')}
            />
          )}
        </div>
      </div>
    </div>
  )
}
