#!/usr/bin/env node

/**
 * Create placeholder images for immediate testing
 * Generates SVG placeholders that mimic chest X-ray structure
 */

const fs = require('fs');
const path = require('path');

function createChestXrayPlaceholder(filename, type, width = 400, height = 400) {
  const isNormal = type === 'normal';
  const bgColor = '#1a1a1a';
  const lungColor = '#333333';
  const abnormalColor = '#ff6b6b';
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="100%" height="100%" fill="${bgColor}"/>
  
  <!-- Chest outline -->
  <ellipse cx="200" cy="300" rx="150" ry="80" fill="none" stroke="#666" stroke-width="2"/>
  
  <!-- Left lung -->
  <ellipse cx="150" cy="200" rx="60" ry="100" fill="${lungColor}" stroke="#555" stroke-width="1"/>
  
  <!-- Right lung -->
  <ellipse cx="250" cy="200" rx="60" ry="100" fill="${lungColor}" stroke="#555" stroke-width="1"/>
  
  <!-- Heart shadow -->
  <ellipse cx="180" cy="280" rx="40" ry="60" fill="#2a2a2a" stroke="#555" stroke-width="1"/>
  
  <!-- Ribs -->
  <path d="M 100 150 Q 200 120 300 150" stroke="#444" stroke-width="1" fill="none"/>
  <path d="M 110 180 Q 200 150 290 180" stroke="#444" stroke-width="1" fill="none"/>
  <path d="M 120 210 Q 200 180 280 210" stroke="#444" stroke-width="1" fill="none"/>
  <path d="M 130 240 Q 200 210 270 240" stroke="#444" stroke-width="1" fill="none"/>
  
  ${!isNormal ? `
  <!-- TB lesions for abnormal cases -->
  <circle cx="180" cy="160" r="15" fill="${abnormalColor}" opacity="0.7"/>
  <circle cx="200" cy="180" r="8" fill="${abnormalColor}" opacity="0.5"/>
  <circle cx="160" cy="190" r="6" fill="${abnormalColor}" opacity="0.6"/>
  ` : ''}
  
  <!-- Placeholder text -->
  <text x="200" y="380" text-anchor="middle" fill="#666" font-family="Arial" font-size="12">
    ${filename} - ${type.toUpperCase()} PLACEHOLDER
  </text>
  <text x="200" y="395" text-anchor="middle" fill="#888" font-family="Arial" font-size="10">
    Replace with Montgomery County dataset
  </text>
</svg>`;

  return svg;
}

function createPlaceholders() {
  const imagesDir = path.join(__dirname, '../public/images');
  
  // Ensure directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const placeholders = [
    { file: 'MCUCXR_0017_1.png', type: 'tuberculosis' },
    { file: 'MCUCXR_0010_0.png', type: 'normal' },
    { file: 'MCUCXR_0025_1.png', type: 'tuberculosis' },
    { file: 'MCUCXR_0015_0.png', type: 'normal' },
    { file: 'MCUCXR_0032_1.png', type: 'tuberculosis' }
  ];

  placeholders.forEach(({ file, type }) => {
    const svgContent = createChestXrayPlaceholder(file, type);
    const svgPath = path.join(imagesDir, file.replace('.png', '.svg'));
    fs.writeFileSync(svgPath, svgContent);
    console.log(`✅ Created placeholder: ${file.replace('.png', '.svg')}`);
  });

  console.log('\n🎯 PLACEHOLDERS CREATED - Ready for immediate testing!');
  console.log('📍 Navigate to: http://localhost:3000');
  console.log('🔄 Replace with real images when Montgomery dataset downloads complete');
}

if (require.main === module) {
  createPlaceholders();
}

module.exports = { createPlaceholders };
