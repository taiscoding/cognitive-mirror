export const formatTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }
  return `${remainingSeconds}s`
}

export const formatPercentage = (decimal, precision = 0) => {
  return `${(decimal * 100).toFixed(precision)}%`
}

export const calculateTrend = (values) => {
  if (values.length < 2) return 0
  
  const recent = values.slice(-3).reduce((sum, val) => sum + val, 0) / Math.min(3, values.length)
  const older = values.slice(-6, -3)
  
  if (older.length === 0) return 0
  
  const olderAvg = older.reduce((sum, val) => sum + val, 0) / older.length
  
  return ((recent - olderAvg) / olderAvg) * 100
}

export const getPerformanceInsights = (performanceData) => {
  if (performanceData.length < 3) {
    return ["Complete more cases to unlock performance insights"]
  }
  
  const insights = []
  const recent = performanceData.slice(-5)
  const accuracies = recent.map(p => p.accuracy)
  const times = recent.map(p => p.completionTime)
  
  // Accuracy trend
  const accuracyTrend = calculateTrend(accuracies)
  if (accuracyTrend > 10) {
    insights.push("📈 Diagnostic accuracy improving significantly")
  } else if (accuracyTrend < -10) {
    insights.push("⚠️ Consider reviewing missed findings pattern")
  }
  
  // Speed trend
  const speedTrend = calculateTrend(times.map(t => -t)) // Negative because faster = better
  if (speedTrend > 15) {
    insights.push("⚡ Pattern recognition speed increasing")
  }
  
  // Consistency
  const accuracyStd = calculateStandardDeviation(accuracies)
  if (accuracyStd < 0.15) {
    insights.push("🎯 Consistent diagnostic performance")
  }
  
  // Performance level
  const avgAccuracy = accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length
  if (avgAccuracy > 0.85) {
    insights.push("🏆 Excellent diagnostic skills demonstrated")
  }
  
  return insights.length > 0 ? insights : ["Keep practicing to develop stronger patterns"]
}

export const calculateStandardDeviation = (values) => {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2))
  const avgSquaredDiff = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / values.length
  return Math.sqrt(avgSquaredDiff)
}

export const getSkillLevelDescription = (averageAccuracy, caseCount) => {
  if (caseCount < 5) return { level: "Learning", description: "Building foundational skills" }
  
  if (averageAccuracy >= 0.9) {
    return { level: "Expert", description: "Exceptional diagnostic accuracy" }
  } else if (averageAccuracy >= 0.8) {
    return { level: "Advanced", description: "Strong diagnostic skills" }
  } else if (averageAccuracy >= 0.7) {
    return { level: "Intermediate", description: "Developing competency" }
  } else if (averageAccuracy >= 0.6) {
    return { level: "Novice", description: "Early skill development" }
  } else {
    return { level: "Beginner", description: "Focus on systematic approach" }
  }
}
