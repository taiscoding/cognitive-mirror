'use client'

import Link from 'next/link'
import { formatTime, formatPercentage, getPerformanceInsights, getSkillLevelDescription } from '../utils/analytics'

export default function ProgressDashboard({ 
  performance, 
  recentPerformance, 
  improvementMetrics, 
  onStartPractice 
}) {
  const totalCases = performance.length
  const avgAccuracy = totalCases > 0 
    ? performance.reduce((sum, p) => sum + p.accuracy, 0) / totalCases 
    : 0
  
  const avgTime = totalCases > 0 
    ? performance.reduce((sum, p) => sum + p.completionTime, 0) / totalCases 
    : 0

  const skillLevel = getSkillLevelDescription(avgAccuracy, totalCases)
  const insights = getPerformanceInsights(performance)

  const StatCard = ({ title, value, subtitle, trend, color = "primary" }) => (
    <div className="card animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-medical-gray">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
          {subtitle && (
            <p className="text-sm text-medical-gray mt-1">{subtitle}</p>
          )}
        </div>
        {trend && (
          <div className={`text-right ${trend > 0 ? 'text-medical-success' : 'text-medical-error'}`}>
            <span className="text-lg font-semibold">
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
            </span>
            <p className="text-xs">vs last 5</p>
          </div>
        )}
      </div>
    </div>
  )

  const ProgressBar = ({ label, value, max = 1, color = "primary" }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-medical-dark">{label}</span>
        <span className="text-medical-gray">{formatPercentage(value)}</span>
      </div>
      <div className="progress-bar">
        <div 
          className={`progress-fill bg-gradient-to-r from-${color}-500 to-${color}-600`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  )

  // Empty state for first-time users
  if (totalCases === 0) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-medical-dark mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-medical-gray">
            Start practicing to see your diagnostic skills improve in real-time
          </p>
        </div>

        {/* Empty State Hero */}
        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 text-center py-16">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-medical-dark mb-4">
              Begin Diagnostic Training
            </h2>
            <p className="text-lg text-medical-gray mb-8">
              Complete your first case to unlock real-time performance analytics and 
              quantified diagnostic accuracy metrics.
            </p>
            <Link href="/cases">
              <button className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200">
                Start First Case
              </button>
            </Link>
          </div>
        </div>

        {/* What You'll Get */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center hover-lift">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-medical-dark mb-2">Track Progress</h3>
            <p className="text-sm text-medical-gray">
              Monitor accuracy, speed, and improvement trends over time
            </p>
          </div>
          <div className="card text-center hover-lift">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-medical-dark mb-2">Receive Insights</h3>
            <p className="text-sm text-medical-gray">
              AI-powered feedback on diagnostic patterns and performance
            </p>
          </div>
          <div className="card text-center hover-lift">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="font-semibold text-medical-dark mb-2">Advance Skills</h3>
            <p className="text-sm text-medical-gray">
              Measurable skill level progression with quantified metrics
            </p>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="card">
          <h3 className="text-lg font-semibold text-medical-dark mb-4">
            How It Works
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium text-medical-dark">Choose a Case</h4>
                <p className="text-sm text-medical-gray">Select from curated radiology cases across difficulty levels</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <h4 className="font-medium text-medical-dark">Annotate Findings</h4>
                <p className="text-sm text-medical-gray">Click on the X-ray to mark abnormal findings you identify</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <h4 className="font-medium text-medical-dark">Get Instant Feedback</h4>
                <p className="text-sm text-medical-gray">See accuracy scores, correct findings, and clinical pearls immediately</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                4
              </div>
              <div>
                <h4 className="font-medium text-medical-dark">Track Your Growth</h4>
                <p className="text-sm text-medical-gray">Return here to see your improvement trends and performance insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-medical-dark mb-2">
          Your Performance Dashboard
        </h1>
        <p className="text-medical-gray">
          Track your diagnostic skill development with real-time analytics
        </p>
      </div>

      {/* Skill Level & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Skill Level"
          value={skillLevel.level}
          subtitle={skillLevel.description}
          color="medical-accent"
        />
        <StatCard
          title="Cases Completed"
          value={totalCases}
          subtitle={totalCases === 1 ? "case" : "cases"}
          trend={improvementMetrics?.totalCases > 5 ? 
            ((recentPerformance.length / (totalCases - recentPerformance.length)) - 1) * 100 : null}
        />
        <StatCard
          title="Average Accuracy"
          value={formatPercentage(avgAccuracy)}
          subtitle="All time"
          trend={improvementMetrics?.accuracyImprovement}
          color="medical-success"
        />
        <StatCard
          title="Average Time"
          value={formatTime(avgTime)}
          subtitle="Per case"
          trend={improvementMetrics?.speedImprovement}
          color="medical-warning"
        />
      </div>

      {/* Recent Performance */}
      {recentPerformance.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-medical-dark mb-4">
            Recent Performance
          </h3>
          <div className="space-y-4">
            <ProgressBar 
              label="Recent Accuracy" 
              value={improvementMetrics?.recentAccuracy || avgAccuracy}
              color="medical-success"
            />
            <ProgressBar 
              label="Diagnostic Speed" 
              value={Math.max(0, 1 - (improvementMetrics?.recentSpeed || avgTime) / 120000)}
              color="medical-accent"
            />
            {improvementMetrics && (
              <ProgressBar 
                label="Overall Improvement" 
                value={Math.max(0, (improvementMetrics.accuracyImprovement + improvementMetrics.speedImprovement) / 200 + 0.5)}
                color="primary"
              />
            )}
          </div>
        </div>
      )}

      {/* Performance Insights */}
      {insights.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-medical-dark mb-4">
            Performance Insights
          </h3>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-medical-dark">{insight}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Cases Grid */}
      {recentPerformance.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-medical-dark mb-4">
            Latest Cases ({recentPerformance.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPerformance.map((perf, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-medical-gray">
                    Case {perf.caseId.replace('case_', '')}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    perf.accuracy > 0.8 ? 'bg-green-100 text-green-700' :
                    perf.accuracy > 0.6 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {formatPercentage(perf.accuracy)}
                  </span>
                </div>
                <div className="text-xs text-medical-gray">
                  {formatTime(perf.completionTime)} • {perf.annotations} annotations
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center">
        <Link href="/cases">
          <button
            className="btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {totalCases === 0 ? 'Start Your First Case' : 'Continue Practice'}
          </button>
        </Link>
        <p className="text-sm text-medical-gray mt-2">
          {totalCases === 0 
            ? 'Begin your diagnostic skill development journey' 
            : 'Keep building your diagnostic expertise'
          }
        </p>
      </div>
    </div>
  )
}
