'use client'

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-medical-dark mb-2">
          Diagnostic Performance Dashboard
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
        <button
          onClick={onStartPractice}
          className="btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          {totalCases === 0 ? 'Start Your First Case' : 'Continue Practice'}
        </button>
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
