# Cognitive Mirror - Medical Diagnostic Training Platform

> Real-time performance analytics that make diagnostic skill improvement visceral and measurable.

## 🎯 The Problem

Medical residents have **zero objective feedback** on diagnostic skill development beyond subjective attending evaluation. Traditional case review lacks measurable progress tracking, making improvement feel abstract rather than tangible.

## 💡 The Solution

Cognitive Mirror provides medical students and residents with **real-time performance analytics** through interactive radiology case review. Users see their diagnostic accuracy, speed, and pattern recognition improve in real-time, making skill development feel immediate and visceral.

## ✨ Core Features

### 📊 **Real-Time Performance Dashboard**
- Diagnostic accuracy trends over time
- Pattern recognition speed improvement
- Skill level progression tracking
- Immediate feedback on annotations

### 🖼️ **Interactive Medical Cases** 
- Canvas-based annotation system
- 5 curated tuberculosis screening cases
- Progressive difficulty levels
- Immediate right/wrong feedback with explanations

### 📈 **Learning Analytics**
- Performance metrics calculation
- Improvement trend visualization
- Error pattern identification
- Competency assessment

## 🚀 Getting Started

### Quick Start
```bash
git clone https://github.com/taiscoding/cognitive-mirror.git
cd cognitive-mirror
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start using the platform.

### System Requirements
- Node.js 18+
- Modern web browser
- 8GB RAM (for medical image processing)

## 🏗️ Technical Architecture

### Stack
- **Frontend**: React + Next.js 14
- **Styling**: Tailwind CSS
- **Analytics**: Custom performance tracking
- **Images**: Montgomery County TB Dataset
- **Storage**: localStorage (client-side persistence)

### Project Structure
```
/src
├── /app                 # Next.js app router
├── /components         # React components
│   ├── ProgressDashboard.jsx
│   ├── CaseSelector.jsx
│   ├── ImageViewer.jsx
│   └── FeedbackPanel.jsx
├── /data              # Medical case definitions
├── /hooks             # Performance tracking
└── /utils             # Analytics algorithms
```

## 📊 Dataset

### Montgomery County TB Screening Dataset
- **138 chest X-rays** (80 normal, 58 tuberculosis cases)
- **Source**: NIH/NLM public medical imaging dataset
- **Format**: PNG, 4020×4892 pixels
- **Annotations**: Pre-labeled with diagnostic findings

### Case Structure
```json
{
  "id": "case_001",
  "title": "Pulmonary Tuberculosis - Upper Lobe",
  "diagnosis": "tuberculosis",
  "difficulty": "moderate",
  "annotations": [
    {
      "x": 245, "y": 180, "radius": 30,
      "finding": "Upper lobe consolidation with cavitation"
    }
  ],
  "learningPoints": ["Upper lobe predilection is classic for TB"],
  "clinicalPearls": "Always consider TB in upper lobe cavitary lesions"
}
```

## 🎮 User Experience

1. **Dashboard** → View performance metrics and improvement trends
2. **Case Selection** → Choose from categorized medical cases  
3. **Image Analysis** → Click to annotate findings on chest X-rays
4. **Immediate Feedback** → Get instant results with educational content
5. **Progress Update** → Watch real-time metrics update
6. **Repeat** → Build pattern recognition through deliberate practice

## 📈 Performance Analytics

### Metrics Tracked
- **Diagnostic Accuracy**: F1 score with spatial tolerance
- **Recognition Speed**: Time to identify key findings
- **Improvement Rate**: Trend analysis over sessions
- **Confidence Calibration**: Appropriate uncertainty levels

### Key Innovation
**Visceral Improvement Feedback**: Unlike traditional medical education platforms, users immediately see quantified improvement, making skill development feel tangible rather than abstract.

## 🎯 Success Criteria

**Primary Goal**: After 5 cases, users think *"I can see myself getting better at this"* rather than *"that was a neat quiz."*

### Measurable Outcomes
- Users complete 10+ cases in first session
- Demonstrable accuracy improvement over time
- Faster pattern recognition without accuracy loss
- High user engagement and return rates

## 🔧 Development

### Adding Medical Images
```bash
# Download Montgomery County dataset
curl -L -o montgomery-dataset.zip "https://openi.nlm.nih.gov/imgs/collections/NLM-MontgomeryCXRSet.zip"
unzip montgomery-dataset.zip
cp -r */CXR_png/* public/images/

# Switch from placeholders to real images
node scripts/switch-images.js png
```

### Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Code linting
```

## 🎨 Design Philosophy

### Medical Professional Standards
- Clean, distraction-free interface
- Professional color palette (blues/teals)
- High contrast for medical image viewing
- Responsive design for all devices

### Learning-Focused UX
- Immediate feedback loops
- Progress visualization
- Educational content integration
- Professional credibility

## 🚧 Current Status

### ✅ Completed (MVP Ready)
- Full Next.js application with all components
- Interactive canvas annotation system
- Real-time performance analytics
- 5 tuberculosis screening cases with educational content
- Professional medical UI/UX
- Data persistence and progress tracking

### 🔄 In Progress
- Real medical image integration (placeholders active)
- User validation with medical students
- Performance optimization

### 📋 Next Steps
1. **User Testing**: Validate with medical students/residents
2. **Dataset Integration**: Complete Montgomery County TB dataset
3. **Learning Efficacy**: Measure actual skill improvement
4. **Scale**: Expand to additional medical imaging modalities

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Contact

For questions, issues, or collaboration opportunities, please open an issue on GitHub.

---

**Built for medical education. Designed for measurable improvement. Optimized for learning.**

*Cognitive Mirror transforms subjective diagnostic training into objective skill development.*
