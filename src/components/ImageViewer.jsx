'use client'

import { useState, useRef, useEffect } from 'react'

export default function ImageViewer({ 
  case: caseData, 
  onAnnotationSubmit, 
  showCorrectAnnotations, 
  userAnnotations 
}) {
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [annotations, setAnnotations] = useState([])
  const [isAnnotating, setIsAnnotating] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [currentImageSrc, setCurrentImageSrc] = useState(caseData.image)
  const [hasFallback, setHasFallback] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [startTime] = useState(Date.now())

  // Timer for elapsed time
  useEffect(() => {
    if (!isAnnotating) return
    
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isAnnotating, startTime])

  // Reset state when case changes
  useEffect(() => {
    setAnnotations([])
    setIsAnnotating(true)
    setIsImageLoaded(false)
    setImageError(false)
    setCurrentImageSrc(caseData.image)
    setHasFallback(false)
    setElapsedTime(0)
  }, [caseData.id])

  // Format time for display
  const formatElapsedTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Handle image load
  const handleImageLoad = () => {
    setIsImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    // Try fallback URL if available and not already tried
    if (caseData.fallbackImage && !hasFallback && currentImageSrc !== caseData.fallbackImage) {
      setCurrentImageSrc(caseData.fallbackImage)
      setHasFallback(true)
      setImageError(false)
    } else {
      setImageError(true)
      setIsImageLoaded(false)
    }
  }

  // Handle canvas click for annotations
  const handleCanvasClick = (event) => {
    if (!isAnnotating || !isImageLoaded) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = (event.clientX - rect.left) * scaleX
    const y = (event.clientY - rect.top) * scaleY

    const newAnnotation = {
      x: Math.round(x),
      y: Math.round(y),
      id: Date.now(),
      timestamp: Date.now()
    }

    setAnnotations(prev => [...prev, newAnnotation])
  }

  // Remove annotation
  const removeAnnotation = (id) => {
    setAnnotations(prev => prev.filter(ann => ann.id !== id))
  }

  // Submit annotations
  const handleSubmit = () => {
    if (annotations.length === 0) {
      if (window.confirm('No findings marked. Submit as normal study?')) {
        onAnnotationSubmit(annotations)
        setIsAnnotating(false)
      }
    } else {
      onAnnotationSubmit(annotations)
      setIsAnnotating(false)
    }
  }

  // Reset annotations
  const handleReset = () => {
    setAnnotations([])
    setIsAnnotating(true)
  }

  // Draw annotations on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isImageLoaded) return

    const ctx = canvas.getContext('2d')
    const image = imageRef.current

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw image
    if (image && image.complete) {
      canvas.width = image.naturalWidth || 512
      canvas.height = image.naturalHeight || 512
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    }

    // Draw user annotations (red dots)
    annotations.forEach(ann => {
      ctx.beginPath()
      ctx.arc(ann.x, ann.y, 12, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.8)' // red-500 with opacity
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Draw correct annotations if feedback mode (green dots)
    if (showCorrectAnnotations && caseData.annotations) {
      caseData.annotations.forEach(ann => {
        ctx.beginPath()
        ctx.arc(ann.x, ann.y, ann.radius || 15, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(34, 197, 94, 0.3)' // green-500 with low opacity
        ctx.fill()
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)'
        ctx.lineWidth = 3
        ctx.stroke()
        
        // Add finding label
        ctx.fillStyle = 'rgba(34, 197, 94, 0.9)'
        ctx.font = '12px Inter, sans-serif'
        ctx.fillText(ann.finding, ann.x + 20, ann.y - 10)
      })
    }
  }, [annotations, showCorrectAnnotations, isImageLoaded, caseData.annotations])

  return (
    <div className="space-y-4">
      {/* Case Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-pacs-text">
                {caseData.title}
              </h3>
              <span className={`px-3 py-1 text-sm font-medium rounded ${
                caseData.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                caseData.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {caseData.difficulty}
              </span>
            </div>
            <p className="text-sm text-pacs-text-muted">
              {caseData.description}
            </p>
          </div>
          
          {/* Progress Indicators */}
          {isAnnotating && (
            <div className="flex items-center space-x-4 ml-4">
              <div className="text-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-600 font-medium">Time</div>
                <div className="text-lg font-bold text-blue-700 font-mono">
                  {formatElapsedTime(elapsedTime)}
                </div>
              </div>
              <div className="text-center px-4 py-2 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-xs text-purple-600 font-medium">Findings</div>
                <div className="text-lg font-bold text-purple-700">
                  {annotations.length}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        {isAnnotating && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Instructions:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Click on any abnormal findings you identify</li>
              <li>• Each click places a red marker</li>
              <li>• Click on existing markers to remove them</li>
              <li>• Submit when you've marked all findings (or none for normal)</li>
            </ul>
          </div>
        )}
      </div>

      {/* Image Viewer */}
      <div className="card">
        <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
          {imageError ? (
            // Placeholder for missing image
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center text-pacs-text-muted">
                <svg className="w-24 h-24 mx-auto mb-4 text-pacs-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="text-lg font-medium mb-2">Chest Radiograph</div>
                <div className="text-sm">{caseData.title}</div>
                <div className="text-xs mt-4 bg-gray-300 px-3 py-1 rounded inline-block">
                  Image Preview
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Hidden image for loading */}
              <img
                ref={imageRef}
                src={currentImageSrc}
                alt={caseData.title}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className="hidden"
              />
              
              {/* Canvas for annotations */}
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className={`w-full h-full object-contain ${
                  isAnnotating ? 'cursor-crosshair' : 'cursor-default'
                } transition-opacity ${
                  isImageLoaded ? 'opacity-100' : 'opacity-50'
                }`}
                style={{ maxHeight: '600px' }}
              />
            </>
          )}

          {/* Loading overlay */}
          {!isImageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="text-white text-center">
                <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                <div>Loading image...</div>
              </div>
            </div>
          )}
        </div>

        {/* Annotation Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-pacs-text-muted">
              Findings marked: {annotations.length}
            </span>
            {annotations.length > 0 && isAnnotating && (
              <button
                onClick={() => setAnnotations([])}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="flex space-x-3">
            {!showCorrectAnnotations ? (
              <button
                onClick={handleSubmit}
                disabled={!isImageLoaded}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Analysis
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="btn-secondary"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Annotation Legend */}
      {(annotations.length > 0 || showCorrectAnnotations) && (
        <div className="card">
          <h4 className="font-medium text-pacs-text mb-3">Legend:</h4>
          <div className="flex flex-wrap gap-4 text-sm">
            {annotations.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                <span>Your findings ({annotations.length})</span>
              </div>
            )}
            {showCorrectAnnotations && caseData.annotations.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 bg-opacity-30 border-2 border-green-500 rounded-full"></div>
                <span>Correct findings ({caseData.annotations.length})</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
