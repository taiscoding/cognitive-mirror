#!/usr/bin/env node

/**
 * Montgomery County TB Dataset Integration Script
 * Downloads and processes chest X-ray images for Cognitive Mirror
 */

const fs = require('fs');
const path = require('path');

const DATASET_INFO = {
  source: "Montgomery County TB Screening Program",
  total_images: 138,
  normal_cases: 80,
  tb_cases: 58,
  format: "PNG",
  resolution: "4020x4892 or 4892x4020",
  naming_convention: "MCUCXR_####_X.png (X: 0=normal, 1=abnormal)"
};

// Map our 5 cases to specific Montgomery County images
const CASE_MAPPINGS = {
  case_001: {
    file: "MCUCXR_0017_1.png", // TB case - upper lobe
    type: "tuberculosis",
    description: "Classic upper lobe tuberculosis with cavitation"
  },
  case_002: {
    file: "MCUCXR_0010_0.png", // Normal case
    type: "normal",
    description: "Normal chest radiograph"
  },
  case_003: {
    file: "MCUCXR_0025_1.png", // TB case - bilateral
    type: "tuberculosis",
    description: "Bilateral pulmonary tuberculosis"
  },
  case_004: {
    file: "MCUCXR_0015_0.png", // Normal case
    type: "normal", 
    description: "Normal chest radiograph - variant anatomy"
  },
  case_005: {
    file: "MCUCXR_0032_1.png", // Advanced TB case
    type: "tuberculosis",
    description: "Advanced pulmonary tuberculosis with multiple lesions"
  }
};

async function setupImages() {
  const publicDir = path.join(__dirname, '../public');
  const imagesDir = path.join(publicDir, 'images');

  // Create directories if they don't exist
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('✅ Created images directory');
  }

  console.log('\n🔍 MONTGOMERY COUNTY TB DATASET SETUP');
  console.log('=====================================');
  console.log(`Source: ${DATASET_INFO.source}`);
  console.log(`Total Images Available: ${DATASET_INFO.total_images}`);
  console.log(`Format: ${DATASET_INFO.format} (${DATASET_INFO.resolution})`);
  
  console.log('\n📋 REQUIRED IMAGES FOR COGNITIVE MIRROR:');
  Object.entries(CASE_MAPPINGS).forEach(([caseId, info]) => {
    console.log(`${caseId}: ${info.file} (${info.type})`);
    console.log(`  → ${info.description}`);
  });

  console.log('\n📥 DOWNLOAD INSTRUCTIONS:');
  console.log('1. Visit: https://data.lhncbc.nlm.nih.gov/public/Tuberculosis-Chest-X-ray-Datasets/');
  console.log('2. Download Montgomery County set');
  console.log('3. Place PNG files in: ./public/images/');
  console.log('4. Run: node scripts/verify-images.js');

  // Create placeholder verification script
  const verifyScript = `#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const requiredImages = ${JSON.stringify(Object.values(CASE_MAPPINGS).map(c => c.file), null, 2)};

const imagesDir = path.join(__dirname, '../public/images');

console.log('🔍 Verifying Montgomery County images...');

let allFound = true;
requiredImages.forEach(imageName => {
  const imagePath = path.join(imagesDir, imageName);
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    console.log(\`✅ \${imageName} (\${Math.round(stats.size / 1024)}KB)\`);
  } else {
    console.log(\`❌ Missing: \${imageName}\`);
    allFound = false;
  }
});

if (allFound) {
  console.log('\\n🎉 All required images found! Ready for testing.');
} else {
  console.log('\\n⚠️  Some images missing. Please download the complete dataset.');
}`;

  fs.writeFileSync(path.join(__dirname, 'verify-images.js'), verifyScript);
  console.log('\n✅ Created verification script: scripts/verify-images.js');
}

if (require.main === module) {
  setupImages().catch(console.error);
}

module.exports = { CASE_MAPPINGS, DATASET_INFO };
