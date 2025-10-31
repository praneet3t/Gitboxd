# 🎬 GitBoxd

> **👉 New to GitBoxd? Start with [START_HERE.md](START_HERE.md) for a 3-step setup guide!**

**Your Letterboxd profile, GitHub-style.**

Transform your Letterboxd export into a beautiful GitHub-style profile page with contributions heatmap, activity feed, and repository-style lists.

![GitBoxd Preview](https://img.shields.io/badge/Status-MVP_Complete-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🔒 Privacy First

**All data processing happens locally in your browser.** Nothing is uploaded to any server. Your Letterboxd data stays on your device.

## ✨ Features

- **📊 Contributions Heatmap** - Visualize your watching habits with a GitHub-style calendar
  - Hover tooltips with film details, ratings, and review snippets
  - Year selector to explore your history
  - Deduplication: multiple entries for same film on same date count as 1
  
- **📈 Stats Dashboard** - Total watches, unique films, average rating, rewatches, and longest streak
  - Real-time calculation from your diary
  - Streak algorithm tracks consecutive watching days
  
- **📝 Activity Feed** - Chronological diary entries with ratings and reviews
  - GitHub commit-style cards
  - Pagination (20 entries per page)
  - Tags and rewatch indicators
  
- **📚 Lists as Repositories** - Your Letterboxd lists displayed as GitHub repos
  - Film counts and descriptions
  - Preview of list entries
  
- **💾 Export** - Download your processed data as JSON
  - Backup your processed data
  - Use for analysis or other tools
  
- **🎨 GitHub Dark Theme** - Authentic GitHub UI styling
  - Responsive design (mobile-friendly)
  - Accessible color contrast

---

## 📚 Documentation

**New to GitBoxd?** Start here:
- 👉 **[GETTING_STARTED.md](GETTING_STARTED.md)** - Complete setup guide with troubleshooting
- ⚡ **[QUICKSTART.md](QUICKSTART.md)** - 5-minute quick start
- 📋 **[DOCS_INDEX.md](DOCS_INDEX.md)** - All documentation

**Other docs:**
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete overview and deliverables
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical deep dive
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy your own instance
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribute code
- [PRIVACY.md](PRIVACY.md) - Privacy policy

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📦 How to Use

1. **Export your Letterboxd data:**
   - Go to Letterboxd Settings → Import & Export
   - Click "Export Your Data"
   - Download the ZIP file when ready

2. **Upload to GitBoxd:**
   - Drag and drop your ZIP file or click to browse
   - Wait for processing (typically 2-5 seconds)

3. **Explore your profile:**
   - View your contributions heatmap
   - Browse your stats and activity
   - Export your data as JSON

## 🧪 Testing

```bash
npm test
```

Tests cover:
- CSV parsing and column mapping
- Heatmap data generation and deduplication
- Stats calculation

## 🏗️ Architecture

### Tech Stack

- **Framework:** Next.js 14 (React 18)
- **Styling:** Tailwind CSS with GitHub color palette
- **Parsing:** JSZip + PapaParse
- **Heatmap:** react-calendar-heatmap
- **Language:** TypeScript

### Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── Heatmap.tsx
│   ├── ProfileView.tsx
│   ├── UploadForm.tsx
│   ├── ActivityFeed.tsx
│   ├── ListsGrid.tsx
│   └── StatsCard.tsx
├── lib/              # Core logic
│   ├── parser.ts     # ZIP/CSV parsing
│   └── heatmap.ts    # Heatmap data generation
└── types/            # TypeScript definitions
```

### Data Flow

1. User uploads Letterboxd ZIP
2. `parser.ts` extracts and normalizes CSVs into JSON
3. Components consume normalized data
4. Heatmap aggregates diary entries by date (deduplicating films)
5. User can export processed JSON

## 📊 Heatmap Logic

The contributions heatmap uses `diary.csv` as the primary source:

- **Aggregation:** Count unique films per calendar date
- **Deduplication:** Multiple diary entries for the same film on the same date count as 1
- **Tooltip:** Shows all films watched that day with ratings and review snippets
- **Color Scale:** 5-level GitHub-style gradient (none → max)
- **Fallback:** Uses `watched.csv` if `diary.csv` is missing

## 🔧 Configuration

### Supported CSV Files

- `profile.csv` - User metadata
- `diary.csv` - Watch diary (primary heatmap source)
- `ratings.csv` - Film ratings
- `watched.csv` - Watch history (fallback)
- `lists/lists.csv` - Lists metadata
- `lists/list-entries.csv` - List contents

### Column Mapping

The parser handles common Letterboxd column name variations:
- Date: `date`, `Date`, `watched_date`, `Watched Date`
- Film ID: `film_id`, `Film ID`, `letterboxd_uri`
- Title: `title`, `Title`, `name`, `Name`

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Static Export

```bash
# Build static site
npm run build

# Deploy the `out/` directory to any static host
```

## 🛣️ Roadmap

- [ ] Backend option for shareable profiles (opt-in)
- [ ] TMDB integration for poster images
- [ ] Profile comparison tool
- [ ] Rating distribution charts
- [ ] Custom color themes
- [ ] Direct Letterboxd username import

## 📄 License

MIT

## 🙏 Acknowledgments

- Letterboxd for the amazing platform
- GitHub for the UI inspiration
- The open-source community

---

**Made with ❤️ for film lovers**
