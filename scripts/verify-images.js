#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const requiredImages = [
  "MCUCXR_0017_1.png",
  "MCUCXR_0010_0.png",
  "MCUCXR_0025_1.png",
  "MCUCXR_0015_0.png",
  "MCUCXR_0032_1.png"
];

const imagesDir = path.join(__dirname, '../public/images');

console.log('🔍 Verifying Montgomery County images...');

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

if (allFound) {
  console.log('\n🎉 All required images found! Ready for testing.');
} else {
  console.log('\n⚠️  Some images missing. Please download the complete dataset.');
}