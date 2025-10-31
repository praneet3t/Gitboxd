# 🎬 GitBoxd

**Your Letterboxd profile, GitHub-style.**

Transform your Letterboxd export into a beautiful GitHub-style profile with contributions heatmap, insights, and quirky stats.

![Status](https://img.shields.io/badge/Status-Production-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **📊 Contributions Heatmap** - GitHub-style calendar showing your watch history
- **📈 Insights Dashboard** - Deep dive into your viewing patterns
  - Most rewatched films
  - Highest rated films
  - Decade distribution
  - Rating distribution
  - Fun facts (busiest day, favorite era, total watch time)
  - Top tags/genres
- **🎯 Quick Stats** - Total films, diary entries, average rating, longest streak
- **📝 Recent Activity** - Last 4 watches with relative timestamps
- **📚 Pinned Lists** - Your Letterboxd lists as repositories
- **💾 Export** - Download processed data as JSON
- **🔒 Privacy First** - All processing happens in your browser

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 📦 How to Use

1. **Get your Letterboxd export:**
   - Letterboxd.com → Settings → Import & Export → "Export Your Data"
   - Download the ZIP when ready

2. **Upload to GitBoxd:**
   - Drag ZIP onto upload area
   - Wait 2-5 seconds

3. **Explore:**
   - View heatmap and stats
   - Click "Insights" for deep analytics
   - Export JSON for backup

## 🎨 Tech Stack

- Next.js 14 + TypeScript
- Tailwind CSS (GitHub theme)
- JSZip + PapaParse
- react-calendar-heatmap

## 🚢 Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel:
```bash
vercel
```

## 📄 License

MIT

---

**Made with ❤️ for film lovers**
