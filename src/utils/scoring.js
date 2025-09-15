export const calculateDistance = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + 
    Math.pow(point1.y - point2.y, 2)
  )
}

export const calculateAccuracy = (userAnnotations, correctAnnotations, tolerance = 50) => {
  if (correctAnnotations.length === 0) {
    return userAnnotations.length === 0 ? 1 : 0
  }

  let correctMatches = 0
  let falsePositives = 0

  // Check how many user annotations match correct ones
  userAnnotations.forEach(userAnn => {
    const hasMatch = correctAnnotations.some(correctAnn => {
      return calculateDistance(userAnn, correctAnn) < tolerance
    })
    if (hasMatch) {
      correctMatches++
    } else {
      falsePositives++
    }
  })

  // Calculate precision and recall
  const precision = userAnnotations.length > 0 ? correctMatches / userAnnotations.length : 0
  const recall = correctMatches / correctAnnotations.length
  
  // F1 score as overall accuracy
  if (precision + recall === 0) return 0
  return (2 * precision * recall) / (precision + recall)
}

export const calculateDifficultyScore = (caseData) => {
  const factors = {
    annotationCount: Math.min(caseData.annotations.length / 3, 1), // More annotations = harder
    findingSubtlety: caseData.annotations.reduce((sum, ann) => {
      return sum + (ann.difficulty === 'subtle' ? 0.8 : ann.difficulty === 'moderate' ? 0.5 : 0.2)
    }, 0) / caseData.annotations.length,
    diagnosticComplexity: caseData.differentialDiagnoses ? caseData.differentialDiagnoses.length / 5 : 0.3
  }
  
  return (factors.annotationCount + factors.findingSubtlety + factors.diagnosticComplexity) / 3
}

export const generatePerformanceFeedback = (accuracy, completionTime, difficulty) => {
  const timeInSeconds = completionTime / 1000
  const speedCategory = timeInSeconds < 30 ? 'fast' : timeInSeconds < 60 ? 'moderate' : 'slow'
  const accuracyCategory = accuracy > 0.8 ? 'excellent' : accuracy > 0.6 ? 'good' : 'needs improvement'
  
  const feedbackMessages = {
    excellent: {
      fast: "Outstanding performance! Excellent accuracy with impressive speed.",
      moderate: "Great work! High accuracy with solid diagnostic timing.",
      slow: "Excellent accuracy! Consider working on diagnostic speed for efficiency."
    },
    good: {
      fast: "Good diagnostic skills with quick recognition. Focus on accuracy refinement.",
      moderate: "Solid performance overall. Well-balanced speed and accuracy.",
      slow: "Good accuracy achieved. Work on pattern recognition speed."
    },
    'needs improvement': {
      fast: "Quick analysis, but accuracy needs attention. Slow down and be more systematic.",
      moderate: "Focus on improving diagnostic accuracy through systematic image review.",
      slow: "Take time to develop systematic approach to image interpretation."
    }
  }
  
  return {
    message: feedbackMessages[accuracyCategory][speedCategory],
    accuracy: Math.round(accuracy * 100),
    speed: Math.round(timeInSeconds),
    difficulty: Math.round(difficulty * 100)
  }
}
