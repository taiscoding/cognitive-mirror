# 🎯 Demo Day Quick Checklist

**For: Residency Interviews & Presentations**  
**Time: 2 minutes setup, 10-15 minutes demo**

---

## ⚡ 5 Minutes Before Interview

### 1. Technical Setup
```bash
# Terminal
cd /Users/theodoreaddo/Documents/cognitive-mirror
npm run dev

# Wait for: "Ready in X ms"
# Opens automatically at: http://localhost:3000
```

### 2. Load Demo Data
- [ ] Click **"👁️ Demo"** button in header
- [ ] Button turns purple: **"✨ Demo Mode"**
- [ ] Banner appears: "Demo Mode Active"

### 3. Open Browser Tabs (Optional)
- [ ] Tab 1: Landing (http://localhost:3000)
- [ ] Tab 2: Dashboard (http://localhost:3000/dashboard)
- [ ] Tab 3: Cases (http://localhost:3000/cases)

---

## 🎬 The 10-Minute Demo Flow

### 1. Landing Page (1 min)
**What to say:**
> "This is Pixel to Practice—I built it to solve a problem I experienced personally: the lack of objective feedback in radiology training."

**Point out:**
- Problem statement
- Three key features (cards)
- Traditional vs. P2P comparison

### 2. Dashboard (3 min)
**Navigate:** Click "Dashboard" or "Continue Learning"

**What to show:**
- 10 cases completed
- 80% average accuracy
- Skill level: Intermediate
- Improvement trends (green arrows)

**What to say:**
> "The core innovation is real-time analytics. You can see your diagnostic accuracy improving over time—making skill development visceral and measurable."

**Technical callout:**
> "Custom performance tracking with F1 score calculations and spatial tolerance matching."

### 3. Case Review (4 min)
**Navigate:** Click "Continue Practice" → Select any case

**Demonstrate:**
1. **Timer starts:** Point out live counter
2. **Click 2-3 times:** Add annotations
3. **Submit:** Click "Submit Analysis"
4. **Show results:**
   - Accuracy score
   - Correct findings
   - Clinical pearls
   - **Smart recommendation card** ← KEY FEATURE

**What to say:**
> "After each case, you get immediate feedback with clinical pearls. The adaptive engine then recommends your next case based on your performance—keeping you in the optimal learning zone."

### 4. Q&A (2 min)
Common questions (have answers ready):
- **"How is this different?"** → Real-time analytics + adaptive learning
- **"What's the tech stack?"** → Next.js, React, custom algorithms
- **"What's next?"** → More modalities, spaced repetition, user accounts

---

## 💬 One-Liners to Memorize

### The Hook (15 seconds)
> "Radiology learning lacks objective feedback. You review cases but never know if you're improving. I built Pixel to Practice to quantify diagnostic skill development—making improvement visceral and data-driven."

### The Innovation (20 seconds)
> "The key innovation is the adaptive learning engine. After each case, it analyzes your performance and recommends the next case—easy if you're struggling, hard if you're excelling. Combined with real-time analytics, it creates a personalized learning experience that's measurable and motivating."

### The Technical (15 seconds)
> "Built with Next.js and React, custom performance algorithms including F1 scoring with spatial tolerance, adaptive case recommendation system, and real-time metrics. Full-stack application deployed on Vercel."

---

## 🚨 Troubleshooting

### If app doesn't start:
```bash
# Kill existing process
pkill -f "next dev"

# Restart
npm run dev
```

### If demo mode doesn't load:
- Refresh page (Cmd+R / Ctrl+R)
- Click demo button again
- Check browser console (no errors expected)

### If internet fails:
- App works offline (localhost)
- Have screenshots ready as backup
- Can walk through the concept verbally

---

## ✅ Success Indicators

**You nailed it if:**
- Interviewer says "Can I try it?"
- They ask follow-up technical questions
- Discussion extends beyond your demo time
- They mention "initiative" or "innovation"
- You're asked about other projects

---

## 🔄 Reset Between Demos

**Quick reset (30 seconds):**
1. Click **"✨ Demo Mode"** to deactivate
2. Refresh browser
3. Click **"👁️ Demo"** again to reload

**OR:** Use incognito/private window for fresh state

---

## 📱 Backup Materials

**Have ready on phone/tablet:**
- Screenshots of dashboard
- Screenshots of case review
- GitHub repo link
- Live demo URL

**On paper (just in case):**
- Key talking points
- Technical architecture diagram
- This checklist

---

## 🎯 Remember

1. **Show, don't tell:** Let them see the interface
2. **Be concise:** 10 min max, leave time for questions
3. **Know your why:** This solves a real problem you experienced
4. **Confidence:** You built something impressive—own it
5. **Be ready to pivot:** If they want to deep-dive on one aspect, go there

---

## 🌟 The Closer

**End with:**
> "This project represents how I approach challenges: identify a real clinical need, build a technical solution, and iterate based on feedback. It's the same mindset I'll bring to residency—always looking for ways to improve patient care through innovation."

**Offer:**
> "I'd be happy to send you the link to try it yourself. I'm always looking for feedback from practicing radiologists."

---

**You've got this! 🚀**

*Remember: They're not just evaluating the app—they're evaluating YOU as a future colleague who can problem-solve, build solutions, and communicate effectively.*

**Show them why you'll be an asset to their program.**

---

## 📞 Emergency Contact

**If technical issues during demo:**
- Pivot to discussing the problem-solving process
- Show GitHub README instead
- Walk through screenshots
- "Happy to do a technical deep-dive later"

**The demo failing is not the end—how you handle it matters more.**

---

**Last Updated:** October 22, 2025  
**For Interview:** October 29, 2025  
**Status:** READY 🎯

