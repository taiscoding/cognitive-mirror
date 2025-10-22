'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import cases from '../../data/cases.json'

export default function CasesPage() {
  const [filteredCases, setFilteredCases] = useState(cases)
  const [filterDifficulty, setFilterDifficulty] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    let filtered = cases

    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(c => c.difficulty === filterDifficulty)
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(c => c.category === filterCategory)
    }

    setFilteredCases(filtered)
  }, [filterDifficulty, filterCategory])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200'
      case 'moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'hard': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-pacs-elevated text-pacs-text border-pacs-border'
    }
  }

  const getDiagnosisIcon = (diagnosis) => {
    if (diagnosis === 'tuberculosis') {
      return (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    } else if (diagnosis === 'normal') {
      return (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
    return (
      <svg className="w-8 h-8 text-pacs-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  }

  const categories = [...new Set(cases.map(c => c.category))]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-pacs-text">
            Case Library
          </h2>
          <p className="text-pacs-text-muted mt-1">
            Choose a case to practice your diagnostic skills
          </p>
        </div>
        <Link href="/dashboard" className="btn-secondary">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-pacs-text mb-2">
              Difficulty Level
            </label>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-pacs-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-pacs-text mb-2">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-pacs-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map(caseItem => (
          <Link
            key={caseItem.id}
            href={`/cases/${caseItem.id}`}
            className="card hover:shadow-lg cursor-pointer transition-all duration-200 transform hover:scale-105 group"
          >
            {/* Case Image Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-4 flex items-center justify-center border border-pacs-border group-hover:border-primary-300 transition-colors">
              <div className="text-center text-pacs-text-muted">
                <div className="mb-2">{getDiagnosisIcon(caseItem.diagnosis)}</div>
                <div className="text-sm font-medium">Chest Radiograph</div>
              </div>
            </div>

            {/* Case Details */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-pacs-text group-hover:text-primary-600 transition-colors">
                  {caseItem.title}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getDifficultyColor(caseItem.difficulty)}`}>
                  {caseItem.difficulty}
                </span>
              </div>

              <p className="text-sm text-pacs-text-muted line-clamp-2">
                {caseItem.description}
              </p>

              <div className="flex items-center justify-between text-xs text-pacs-text-muted">
                <span className="bg-pacs-elevated px-2 py-1 rounded">
                  {caseItem.category}
                </span>
                <span>
                  {caseItem.annotations.length} finding{caseItem.annotations.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-center">
                <span className="text-sm font-medium text-primary-600">
                  Begin Analysis
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="w-16 h-16 text-pacs-text-muted mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-pacs-text mb-2">
            No Cases Found
          </h3>
          <p className="text-pacs-text-muted">
            Adjust your filters to view available cases
          </p>
        </div>
      )}

      {/* Stats Footer */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
        <div className="text-center">
          <h4 className="font-semibold text-pacs-text mb-2">
            Case Library Statistics
          </h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold text-primary-600">{cases.length}</div>
              <div className="text-pacs-text-muted">Total Cases</div>
            </div>
            <div>
              <div className="font-semibold text-primary-600">
                {cases.filter(c => c.diagnosis === 'tuberculosis').length}
              </div>
              <div className="text-pacs-text-muted">TB Cases</div>
            </div>
            <div>
              <div className="font-semibold text-primary-600">
                {cases.filter(c => c.diagnosis === 'normal').length}
              </div>
              <div className="text-pacs-text-muted">Normal Cases</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
