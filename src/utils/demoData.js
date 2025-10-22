/**
 * Demo Data Utilities for Interview Demonstrations
 * 
 * Provides sample performance data to showcase the adaptive learning engine
 * without requiring users to complete multiple cases during a demo.
 */

export const DEMO_PERFORMANCE_DATA = [
  {
    caseId: 'case_001',
    accuracy: 0.65,
    completionTime: 95000,
    annotations: 1,
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000 // 7 days ago
  },
  {
    caseId: 'case_002',
    accuracy: 0.90,
    completionTime: 45000,
    annotations: 0,
    timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000
  },
  {
    caseId: 'case_003',
    accuracy: 0.55,
    completionTime: 125000,
    annotations: 1,
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000
  },
  {
    caseId: 'case_001',
    accuracy: 0.75,
    completionTime: 78000,
    annotations: 2,
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000
  },
  {
    caseId: 'case_004',
    accuracy: 1.0,
    completionTime: 32000,
    annotations: 0,
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000
  },
  {
    caseId: 'case_005',
    accuracy: 0.70,
    completionTime: 98000,
    annotations: 3,
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000
  },
  {
    caseId: 'case_003',
    accuracy: 0.82,
    completionTime: 85000,
    annotations: 3,
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000
  },
  {
    caseId: 'case_001',
    accuracy: 0.88,
    completionTime: 62000,
    annotations: 2,
    timestamp: Date.now() - 12 * 60 * 60 * 1000 // 12 hours ago
  },
  {
    caseId: 'case_005',
    accuracy: 0.91,
    completionTime: 71000,
    annotations: 4,
    timestamp: Date.now() - 6 * 60 * 60 * 1000 // 6 hours ago
  },
  {
    caseId: 'case_002',
    accuracy: 1.0,
    completionTime: 38000,
    annotations: 0,
    timestamp: Date.now() - 2 * 60 * 60 * 1000 // 2 hours ago
  }
]

/**
 * Activate demo mode with sample performance data
 */
export function activateDemoMode() {
  localStorage.setItem('performance', JSON.stringify(DEMO_PERFORMANCE_DATA))
  localStorage.setItem('isDemoMode', 'true')
}

/**
 * Deactivate demo mode and clear all data
 */
export function deactivateDemoMode() {
  localStorage.removeItem('performance')
  localStorage.setItem('isDemoMode', 'false')
}

/**
 * Check if demo mode is currently active
 */
export function isDemoMode() {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('isDemoMode') === 'true'
}

/**
 * Toggle between demo mode and regular mode
 */
export function toggleDemoMode() {
  if (isDemoMode()) {
    deactivateDemoMode()
    return false
  } else {
    activateDemoMode()
    return true
  }
}

/**
 * Get demo mode status and data
 */
export function getDemoStatus() {
  return {
    isActive: isDemoMode(),
    casesCompleted: DEMO_PERFORMANCE_DATA.length,
    avgAccuracy: DEMO_PERFORMANCE_DATA.reduce((sum, p) => sum + p.accuracy, 0) / DEMO_PERFORMANCE_DATA.length,
    showsImprovement: true
  }
}

