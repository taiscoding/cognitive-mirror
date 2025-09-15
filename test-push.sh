#!/bin/bash
echo "Starting git push..."
cd /Users/theodoreaddo/Desktop/cognitive-mirror
git push origin main 2>&1
echo "Push completed with exit code: $?"
