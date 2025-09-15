#!/usr/bin/env node

/**
 * Switch between placeholder SVGs and real PNG images
 * Usage: node scripts/switch-images.js [svg|png]
 */

const fs = require('fs');
const path = require('path');

function switchImages(format = 'png') {
  const casesPath = path.join(__dirname, '../src/data/cases.json');
  const casesData = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
  
  const extension = format === 'svg' ? '.svg' : '.png';
  
  casesData.forEach(caseItem => {
    if (caseItem.image) {
      // Replace the extension in the image path
      caseItem.image = caseItem.image.replace(/\.(svg|png)$/, extension);
    }
  });
  
  fs.writeFileSync(casesPath, JSON.stringify(casesData, null, 2));
  
  console.log(`✅ Switched all images to ${extension.toUpperCase()} format`);
  
  if (format === 'png') {
    console.log('\n🔍 Verifying real images exist...');
    
    const imagesDir = path.join(__dirname, '../public/images');
    const requiredImages = [
      'MCUCXR_0017_1.png',
      'MCUCXR_0010_0.png', 
      'MCUCXR_0025_1.png',
      'MCUCXR_0015_0.png',
      'MCUCXR_0032_1.png'
    ];
    
    let allFound = true;
    requiredImages.forEach(imageName => {
      const imagePath = path.join(imagesDir, imageName);
      if (fs.existsSync(imagePath)) {
        const stats = fs.statSync(imagePath);
        console.log(`✅ ${imageName} (${Math.round(stats.size / 1024)}KB)`);
      } else {
        console.log(`❌ Missing: ${imageName}`);
        allFound = false;
      }
    });
    
    if (!allFound) {
      console.log('\n⚠️  Some real images missing. Download Montgomery dataset:');
      console.log('curl -L -o montgomery-dataset.zip "https://openi.nlm.nih.gov/imgs/collections/NLM-MontgomeryCXRSet.zip"');
      console.log('unzip montgomery-dataset.zip && cp -r */CXR_png/* public/images/');
    }
  }
}

const format = process.argv[2] || 'png';
if (!['svg', 'png'].includes(format)) {
  console.log('Usage: node scripts/switch-images.js [svg|png]');
  process.exit(1);
}

switchImages(format);
