#!/bin/bash

# Create separate repository for medical images
echo "Setting up medical images repository..."

# Create a new directory for just the images
mkdir -p /tmp/cognitive-mirror-images
cd /tmp/cognitive-mirror-images

# Initialize git repository
git init
echo "# Cognitive Mirror - Medical Images

Real chest X-ray images from Montgomery County TB dataset.
Used with Cognitive Mirror medical education application.

## Files:
- MCUCXR_0113_1.png - Pulmonary TB (Upper Lobe)
- MCUCXR_0020_0.png - Normal Chest X-ray
- MCUCXR_0104_1.png - Bilateral TB
- MCUCXR_0015_0.png - Normal Variant
- MCUCXR_0140_1.png - Advanced TB with Cavitation

## Usage:
These images are referenced by the main Cognitive Mirror application.
" > README.md

# Copy medical images
cp /Users/theodoreaddo/Desktop/cognitive-mirror/public/images/MCUCXR_0113_1.png .
cp /Users/theodoreaddo/Desktop/cognitive-mirror/public/images/MCUCXR_0020_0.png .
cp /Users/theodoreaddo/Desktop/cognitive-mirror/public/images/MCUCXR_0104_1.png .
cp /Users/theodoreaddo/Desktop/cognitive-mirror/public/images/MCUCXR_0015_0.png .
cp /Users/theodoreaddo/Desktop/cognitive-mirror/public/images/MCUCXR_0140_1.png .

# Add and commit
git add .
git commit -m "Initial commit - Medical images for Cognitive Mirror

- 5 real chest X-rays from Montgomery County TB dataset
- Mix of TB cases and normal variants
- High resolution for diagnostic quality"

echo "Created medical images repository at: /tmp/cognitive-mirror-images"
echo "Next steps:"
echo "1. Create GitHub repository: cognitive-mirror-images"
echo "2. Push images: cd /tmp/cognitive-mirror-images && git remote add origin https://github.com/taiscoding/cognitive-mirror-images.git && git push -u origin main"
echo "3. Images will be accessible via raw.githubusercontent.com URLs"
