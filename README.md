# Pixel to Practice

> **AI-powered radiology case review with adaptive learning**  
> Master diagnostic radiology with real-time performance analytics and intelligent case recommendations.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**Live Demo:** [pixel-to-practice.vercel.app](https://cognitive-mirror-fk2xiob7d-taisreading-gmailcoms-projects.vercel.app/)

---

## 🎯 The Problem

Medical students and residents lack **objective, quantifiable feedback** on diagnostic skill development. Traditional case review platforms are static libraries—you review cases but never know if you're actually improving. Progress tracking is subjective, making skill development feel abstract rather than measurable.

## 💡 The Solution

**Pixel to Practice** transforms radiology learning with **real-time performance analytics** and an **adaptive learning engine**. Complete cases, get instant feedback, and watch your diagnostic accuracy improve with every review—quantified, visual, and visceral.

### What Makes It Different
- **Real-Time Analytics:** Track accuracy, speed, and improvement trends automatically
- **Adaptive Learning Engine:** Smart case recommendations based on your performance
- **Immediate Feedback:** Clinical pearls, learning points, and differential diagnoses
- **Progress Tracking:** Longitudinal performance metrics that show measurable growth

*Note: "Cognitive Mirror" is the underlying engine/system. "Pixel to Practice" is the product name.*

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

Open [http://localhost:3000](http://localhost:3000) to start learning.

### Demo Mode (For Interviews/Presentations)
Click the **"👁️ Demo"** button in the header to load sample performance data instantly. Perfect for demonstrating the adaptive learning engine without completing multiple cases.

### System Requirements
- Node.js 18+
- Modern web browser (Chrome, Firefox, Safari, Edge)

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

## 🚧 Project Status

**Version:** v0.8 (Interview-Ready)  
**Status:** ✅ Functional MVP with polished UX

### ✅ Implemented Features
- ✨ **Compelling landing page** with value proposition showcase
- 📊 **Real-time performance dashboard** with skill progression tracking
- 🖼️ **Interactive canvas annotation system** for chest X-rays
- 🧠 **Adaptive learning engine** with smart case recommendations
- 📈 **Performance analytics** (accuracy, speed, improvement trends)
- ⏱️ **Live case timer** and progress indicators
- 🎯 **Immediate feedback** with clinical pearls and learning points
- 🎪 **Demo mode** for presentations and interviews
- 📱 **Responsive design** for all devices
- 💾 **Data persistence** with localStorage

### Current Case Library
- 5 curated tuberculosis screening cases
- Difficulty levels: Easy, Moderate, Hard
- Montgomery County CXR dataset (NIH/NLM)
- Educational content with differentials

### 🔮 Future Enhancements
1. **Expanded Case Library**: More pathologies and imaging modalities
2. **Spaced Repetition**: Algorithm-driven review timing
3. **User Accounts**: Multi-device sync and progress backup
4. **Comparative Analytics**: Anonymized peer performance comparisons
5. **Mobile App**: Native iOS/Android with offline support

## 🎓 For Interviewers & Educators

### Try the Demo
1. Visit the [live demo](https://cognitive-mirror-fk2xiob7d-taisreading-gmailcoms-projects.vercel.app/)
2. Click **"👁️ Demo"** to load sample performance data
3. Navigate to Dashboard to see analytics
4. Try a case to experience the feedback loop

### Interview Demo Guide
See [INTERVIEW_DEMO_GUIDE.md](INTERVIEW_DEMO_GUIDE.md) for a complete walkthrough script, talking points, and demo strategies for residency interviews.

## 🛠️ Technical Stack

**Frontend:**
- Next.js 14 (React 18) with App Router
- Tailwind CSS for styling
- Canvas API for image annotations

**Analytics Engine:**
- Custom performance tracking algorithms
- F1 score calculation with spatial tolerance
- Adaptive case recommendation system
- Real-time metrics computation

**Data:**
- Montgomery County TB Screening Dataset (NIH/NLM)
- localStorage for client-side persistence
- JSON-based case database

**Deployment:**
- Vercel (production)
- GitHub Actions (CI/CD)
- Automatic preview deployments

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## 👨‍⚕️ About the Developer

Built by **Theodore Addo**, medical student and developer passionate about merging clinical medicine with technology to create practical tools that solve real educational challenges.

**Other Projects:** [theoaddo.com](https://theoaddo.com)

## 📞 Contact & Feedback

- **GitHub Issues:** For bugs and feature requests
- **Discussions:** For questions and ideas
- **Email:** Available on portfolio site

---

## 🌟 Acknowledgments

- **Dataset:** Montgomery County X-ray Set (NIH/NLM)
- **Inspiration:** The challenge of quantifying diagnostic skill improvement
- **Built for:** Medical students, residents, and radiologists committed to deliberate practice

---

**Pixel to Practice** · From pixels on a screen to excellence in clinical practice ·  
*Making diagnostic skill improvement visceral, measurable, and continuous.*
