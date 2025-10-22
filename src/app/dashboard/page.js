'use client'

import ProgressDashboard from '../../components/ProgressDashboard'
import { usePerformanceTracking } from '../../hooks/usePerformanceTracking'

export default function DashboardPage() {
  const {
    performance,
    getRecentPerformance,
    getImprovementMetrics
  } = usePerformanceTracking()

  return (
    <div className="animate-fade-in">
      <ProgressDashboard 
        performance={performance}
        recentPerformance={getRecentPerformance()}
        improvementMetrics={getImprovementMetrics()}
      />
    </div>
  )
}
