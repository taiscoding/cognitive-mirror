'use client'

import { useState, useEffect } from 'react'

export function usePerformanceTracking() {
  const [performance, setPerformance] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('cognitive-mirror-performance')
    if (saved) {
      setPerformance(JSON.parse(saved))
    }
  }, [])

  const updatePerformance = (newEntry) => {
    const updated = [...performance, newEntry]
    setPerformance(updated)
    localStorage.setItem('cognitive-mirror-performance', JSON.stringify(updated))
  }

  const getRecentPerformance = (count = 5) => {
    return performance.slice(-count)
  }

  const getImprovementMetrics = () => {
    if (performance.length < 2) return null

    const recent = performance.slice(-5)
    const older = performance.slice(-10, -5)

    if (older.length === 0) return null

    const recentAvgAccuracy = recent.reduce((sum, p) => sum + p.accuracy, 0) / recent.length
    const olderAvgAccuracy = older.reduce((sum, p) => sum + p.accuracy, 0) / older.length
    
    const recentAvgTime = recent.reduce((sum, p) => sum + p.completionTime, 0) / recent.length
    const olderAvgTime = older.reduce((sum, p) => sum + p.completionTime, 0) / older.length

    return {
      accuracyImprovement: ((recentAvgAccuracy - olderAvgAccuracy) / olderAvgAccuracy) * 100,
      speedImprovement: ((olderAvgTime - recentAvgTime) / olderAvgTime) * 100,
      totalCases: performance.length,
      recentAccuracy: recentAvgAccuracy,
      recentSpeed: recentAvgTime
    }
  }

  const getPatternAnalysis = () => {
    if (performance.length < 3) return null

    const errorPatterns = {}
    const speedTrends = []
    
    performance.forEach((entry, index) => {
      // Track speed trends
      speedTrends.push(entry.completionTime)
      
      // Analyze accuracy patterns
      if (entry.accuracy < 0.7) {
        const timeOfDay = new Date(entry.timestamp).getHours()
        const dayType = timeOfDay < 12 ? 'morning' : timeOfDay < 17 ? 'afternoon' : 'evening'
        errorPatterns[dayType] = (errorPatterns[dayType] || 0) + 1
      }
    })

    return {
      errorPatterns,
      speedTrend: speedTrends.slice(-10), // Last 10 cases
      averageAccuracy: performance.reduce((sum, p) => sum + p.accuracy, 0) / performance.length
    }
  }

  const getConfidenceCalibration = () => {
    // Mock confidence calibration metric
    if (performance.length < 5) return null
    
    const recent = performance.slice(-5)
    const highConfidenceCases = recent.filter(p => p.accuracy > 0.8).length
    const appropriateUncertainty = recent.filter(p => p.accuracy < 0.5 && p.completionTime > 60000).length
    
    return {
      calibrationScore: (highConfidenceCases + appropriateUncertainty) / recent.length,
      description: highConfidenceCases >= 3 ? 'Well calibrated' : 'Needs improvement'
    }
  }

  return {
    performance,
    updatePerformance,
    getRecentPerformance,
    getImprovementMetrics,
    getPatternAnalysis,
    getConfidenceCalibration
  }
}
