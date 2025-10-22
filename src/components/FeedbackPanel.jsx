'use client'

import { useEffect, useState } from 'react'
import { formatTime, formatPercentage } from '../utils/analytics'
import { generatePerformanceFeedback, calculateDifficultyScore } from '../utils/scoring'
import { getNextRecommendedCase, getRecommendationReason } from '../utils/caseRecommendations'
import Link from 'next/link'

export default function FeedbackPanel({ 
  case: caseData, 
  userAnnotations, 
  accuracy, 
  completionTime, 
  onNextCase, 
  onDashboard 
}) {
  const difficulty = calculateDifficultyScore(caseData)
  const feedback = generatePerformanceFeedback(accuracy, completionTime, difficulty)
  const [recommendedCase, setRecommendedCase] = useState(null)
  const [recommendationReason, setRecommendationReason] = useState('')

  useEffect(() => {
    // Get performance data and recommend next case
    const performance = JSON.parse(localStorage.getItem('performance') || '[]')
    const nextCase = getNextRecommendedCase(caseData.id, performance)
    const recentPerformance = performance.slice(-5)
    const recentAccuracy = recentPerformance.length > 0
      ? recentPerformance.reduce((sum, p) => sum + p.accuracy, 0) / recentPerformance.length
      : accuracy
    
    setRecommendedCase(nextCase)
    setRecommendationReason(getRecommendationReason(recentAccuracy))
  }, [caseData.id, accuracy])

  const getAccuracyColor = (acc) => {
    if (acc >= 80) return 'text-green-600 bg-green-50 border-green-200'
    if (acc >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getSpeedBadge = (timeInMs) => {
    const seconds = timeInMs / 1000
    if (seconds < 30) return { text: 'Very Fast', color: 'bg-blue-100 text-blue-700' }
    if (seconds < 60) return { text: 'Fast', color: 'bg-green-100 text-green-700' }
    if (seconds < 120) return { text: 'Moderate', color: 'bg-yellow-100 text-yellow-700' }
    return { text: 'Deliberate', color: 'bg-gray-100 text-gray-700' }
  }

  const speedBadge = getSpeedBadge(completionTime)

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-medical-dark mb-4">
          Performance Summary
        </h3>
        
        <div className="space-y-4">
          {/* Accuracy Score */}
          <div className={`p-4 rounded-lg border ${getAccuracyColor(feedback.accuracy)}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Diagnostic Accuracy</div>
                <div className="text-sm opacity-75">
                  {userAnnotations.length} findings marked vs {caseData.annotations.length} correct
                </div>
              </div>
              <div className="text-2xl font-bold">
                {feedback.accuracy}%
              </div>
            </div>
          </div>

          {/* Speed and Difficulty */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-medical-gray">Completion Time</div>
              <div className="text-lg font-semibold text-medical-dark">
                {formatTime(completionTime)}
              </div>
              <span className={`text-xs px-2 py-1 rounded ${speedBadge.color}`}>
                {speedBadge.text}
              </span>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-medical-gray">Case Difficulty</div>
              <div className="text-lg font-semibold text-medical-dark">
                {feedback.difficulty}%
              </div>
              <span className="text-xs text-medical-gray">
                {caseData.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Message */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">
          Performance Feedback
        </h4>
        <p className="text-blue-800 text-sm leading-relaxed">
          {feedback.message}
        </p>
      </div>

      {/* Detailed Analysis */}
      <div className="card">
        <h4 className="font-semibold text-medical-dark mb-3">
          Detailed Analysis
        </h4>
        
        <div className="space-y-4">
          {/* Correct Findings */}
          {caseData.annotations.length > 0 && (
            <div>
              <h5 className="font-medium text-medical-dark mb-2">
                Expected Findings ({caseData.annotations.length})
              </h5>
              <div className="space-y-2">
                {caseData.annotations.map((ann, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="font-medium text-green-900">{ann.finding}</div>
                      <div className="text-sm text-green-700">{ann.description}</div>
                      <span className={`inline-block mt-1 text-xs px-2 py-1 rounded ${
                        ann.difficulty === 'subtle' ? 'bg-red-100 text-red-700' :
                        ann.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {ann.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Your Performance */}
          <div>
            <h5 className="font-medium text-medical-dark mb-2">
              Your Annotations ({userAnnotations.length})
            </h5>
            {userAnnotations.length > 0 ? (
              <div className="space-y-2">
                {userAnnotations.map((ann, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="text-sm text-red-700">
                        Finding at coordinates ({ann.x}, {ann.y})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-center text-gray-600">
                No findings marked - interpreted as normal study
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Learning Points */}
      {caseData.learningPoints && caseData.learningPoints.length > 0 && (
        <div className="card">
          <h4 className="font-semibold text-medical-dark mb-3">
            Key Learning Points
          </h4>
          <ul className="space-y-2">
            {caseData.learningPoints.map((point, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-primary-500 mt-1">•</span>
                <span className="text-sm text-medical-dark">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Clinical Pearl */}
      {caseData.clinicalPearls && (
        <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <h4 className="font-semibold text-yellow-900 mb-2">
            Clinical Pearl
          </h4>
          <p className="text-yellow-800 text-sm leading-relaxed">
            {caseData.clinicalPearls}
          </p>
        </div>
      )}

      {/* Differential Diagnoses */}
      {caseData.differentialDiagnoses && caseData.differentialDiagnoses.length > 0 && (
        <div className="card">
          <h4 className="font-semibold text-medical-dark mb-3">
            Differential Diagnoses
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {caseData.differentialDiagnoses.map((diagnosis, index) => (
              <div key={index} className="px-3 py-2 bg-gray-100 rounded text-sm text-medical-dark">
                {diagnosis}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Next Case */}
      {recommendedCase && (
        <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-indigo-900 mb-1">
                Recommended Next Case
              </h4>
              <p className="text-sm text-indigo-700">{recommendationReason}</p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded ${
              recommendedCase.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              recommendedCase.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {recommendedCase.difficulty}
            </span>
          </div>
          <div className="bg-white rounded-lg p-3 border border-indigo-200">
            <h5 className="font-medium text-medical-dark mb-1">{recommendedCase.title}</h5>
            <p className="text-sm text-medical-gray mb-3">{recommendedCase.description}</p>
            <Link href={`/cases/${recommendedCase.id}`}>
              <button className="btn-primary w-full">
                Start This Case →
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onNextCase}
          className="btn-secondary flex-1"
        >
          Browse All Cases
        </button>
        <button
          onClick={onDashboard}
          className="btn-secondary"
        >
          Dashboard
        </button>
      </div>
    </div>
  )
}
