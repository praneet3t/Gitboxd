# Getting Started with GitBoxd

## 🚀 Quick Setup (Windows)

### Option 1: Automated Setup
```cmd
setup.bat
```
This will install dependencies and run tests automatically.

### Option 2: Manual Setup
```cmd
npm install
npm run dev
```

## 📋 Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Letterboxd export ZIP** (see below)

## 🎬 Get Your Letterboxd Export

1. Log in to [Letterboxd.com](https://letterboxd.com)
2. Click your profile → **Settings**
3. Go to **Import & Export** tab
4. Click **"Export Your Data"**
5. Check your email for download link (5-10 min)
6. Download the ZIP file

## 💻 Run GitBoxd

```cmd
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📤 Upload Your Data

1. **Drag and drop** your Letterboxd ZIP onto the upload area
   - OR click "Select File" to browse

2. **Wait 2-5 seconds** for processing
   - Typical export (1k-10k entries) processes quickly
   - Large exports (50k+) may take 10-15 seconds

3. **Explore your profile!**
   - Hover over heatmap squares to see films
   - Change years with the dropdown
   - Scroll through your activity feed
   - Browse your lists as repositories

## 🎨 Features to Try

### Heatmap
- **Hover** over any square to see films watched that day
- **Click year dropdown** to view different years
- **Color intensity** shows how many films you watched

### Stats Dashboard
- Total watches
- Unique films
- Average rating
- Rewatches
- Longest streak

### Activity Feed
- Chronological watch history
- Ratings and reviews
- Tags for each film
- "Load More" for pagination

### Lists
- Your Letterboxd lists as GitHub repos
- Film counts and descriptions
- Preview of list entries

### Export
- **Export JSON** button to download your processed data
- Save for backup or analysis

## 🔧 Commands

```cmd
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Testing
npm test             # Run unit tests
npm run test:watch   # Run tests in watch mode

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
gitboxd/
├── src/
│   ├── app/              # Next.js pages
│   │   ├── page.tsx      # Main app
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── Heatmap.tsx
│   │   ├── ProfileView.tsx
│   │   ├── UploadForm.tsx
│   │   ├── ActivityFeed.tsx
│   │   ├── ListsGrid.tsx
│   │   └── StatsCard.tsx
│   ├── lib/              # Core logic
│   │   ├── parser.ts     # ZIP/CSV parsing
│   │   └── heatmap.ts    # Heatmap generation
│   └── types/            # TypeScript types
├── examples/             # Sample data
├── __tests__/            # Tests
└── [docs]/               # Documentation
```

## 🐛 Troubleshooting

### "Failed to parse ZIP"
**Cause:** Invalid or corrupted ZIP file

**Solution:**
- Ensure you downloaded the complete ZIP from Letterboxd
- Try re-downloading your export
- Check that the ZIP contains CSV files

### Heatmap shows no data
**Cause:** Missing or malformed diary data

**Solution:**
- Verify your export contains `diary.csv` or `watched.csv`
- Check that dates are in YYYY-MM-DD format
- Try uploading a different export

### "npm: command not found"
**Cause:** Node.js not installed or not in PATH

**Solution:**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installation
- Verify with `node --version`

### Port 3000 already in use
**Cause:** Another app is using port 3000

**Solution:**
```cmd
# Use a different port
set PORT=3001 && npm run dev
```

### Slow performance
**Cause:** Large export file

**Solution:**
- Close other browser tabs
- Wait a bit longer (large files take 10-15 seconds)
- Check browser console for errors

## 🔒 Privacy & Security

- ✅ **All processing happens in your browser**
- ✅ **Nothing is uploaded to any server**
- ✅ **No tracking or analytics**
- ✅ **No cookies or local storage**
- ✅ **Data cleared when you close the tab**

See [PRIVACY.md](PRIVACY.md) for full privacy policy.

## 📚 Documentation

- **[README.md](README.md)** - Full project documentation
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute guide
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical details
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy your own
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribute code
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete overview

## 🚢 Deploy Your Own

### Vercel (Easiest)
```cmd
npm i -g vercel
vercel
```

### Netlify
```cmd
npm run build
# Upload .next folder to Netlify
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🧪 Testing

```cmd
# Run all tests
npm test

# Run specific test
npm test heatmap

# Watch mode
npm run test:watch
```

## 🎯 Sample Data

Test with sample data before using your real export:

```cmd
cd examples
# See examples/README.md for instructions
```

## 💡 Tips

1. **Export regularly** - Letterboxd exports are point-in-time snapshots
2. **Save your JSON** - Use the Export button to backup processed data
3. **Try different years** - Use the year selector to explore your history
4. **Check tooltips** - Hover over everything for more details
5. **Mobile works too** - Responsive design works on phones/tablets

## 🆘 Get Help

- **GitHub Issues** - Report bugs or request features
- **Discussions** - Ask questions
- **Documentation** - Check the docs folder

## ✨ What's Next?

After you have GitBoxd running:

1. **Explore your profile** - See your watch patterns
2. **Share screenshots** - Show off your heatmap
3. **Deploy your own** - Host on Vercel for free
4. **Contribute** - Help improve GitBoxd

## 🎉 Success!

If you see your profile with a heatmap, you're all set!

Enjoy exploring your Letterboxd data in a whole new way.

---

**Questions? Check [README.md](README.md) or open an issue on GitHub.**
