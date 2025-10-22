/**
 * Smart Case Recommendation Engine
 * 
 * Suggests next cases based on user performance and learning progression
 */

import cases from '../data/cases.json'

/**
 * Get the next recommended case based on user performance
 */
export function getNextRecommendedCase(currentCaseId, performance) {
  // Calculate user's recent accuracy
  const recentPerformance = performance.slice(-5)
  const recentAccuracy = recentPerformance.length > 0
    ? recentPerformance.reduce((sum, p) => sum + p.accuracy, 0) / recentPerformance.length
    : 0

  // Get completed case IDs
  const completedCaseIds = new Set(performance.map(p => p.caseId))
  
  // Find uncompleted cases
  const uncompletedCases = cases.filter(c => !completedCaseIds.has(c.id))
  
  // If all cases completed, suggest repeating lowest accuracy cases
  if (uncompletedCases.length === 0) {
    const caseAccuracy = {}
    performance.forEach(p => {
      if (!caseAccuracy[p.caseId]) {
        caseAccuracy[p.caseId] = []
      }
      caseAccuracy[p.caseId].push(p.accuracy)
    })
    
    // Find case with lowest average accuracy
    let lowestCase = null
    let lowestAvg = 1
    
    Object.entries(caseAccuracy).forEach(([caseId, accuracies]) => {
      const avg = accuracies.reduce((sum, a) => sum + a, 0) / accuracies.length
      if (avg < lowestAvg) {
        lowestAvg = avg
        lowestCase = caseId
      }
    })
    
    return cases.find(c => c.id === lowestCase) || cases[0]
  }

  // Recommend based on performance
  if (recentAccuracy < 0.6) {
    // Struggling - suggest easy case
    const easyCases = uncompletedCases.filter(c => c.difficulty === 'easy')
    return easyCases.length > 0 ? easyCases[0] : uncompletedCases[0]
  } else if (recentAccuracy < 0.8) {
    // Moderate performance - suggest moderate case
    const moderateCases = uncompletedCases.filter(c => c.difficulty === 'moderate')
    return moderateCases.length > 0 ? moderateCases[0] : uncompletedCases[0]
  } else {
    // Strong performance - suggest hard case
    const hardCases = uncompletedCases.filter(c => c.difficulty === 'hard')
    return hardCases.length > 0 ? hardCases[0] : uncompletedCases[0]
  }
}

/**
 * Get recommendation explanation
 */
export function getRecommendationReason(accuracy) {
  if (accuracy < 0.6) {
    return "Building foundations with easier cases"
  } else if (accuracy < 0.8) {
    return "Progressing to moderate difficulty"
  } else {
    return "Ready for advanced cases!"
  }
}

/**
 * Get all uncompleted cases
 */
export function getUncompletedCases(performance) {
  const completedCaseIds = new Set(performance.map(p => p.caseId))
  return cases.filter(c => !completedCaseIds.has(c.id))
}

/**
 * Calculate completion percentage
 */
export function getCompletionPercentage(performance) {
  const uniqueCases = new Set(performance.map(p => p.caseId))
  return Math.round((uniqueCases.size / cases.length) * 100)
}

