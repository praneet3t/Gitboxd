# 🎬 START HERE - GitBoxd Setup

## What is GitBoxd?

GitBoxd transforms your Letterboxd movie diary into a beautiful GitHub-style profile page with:
- **Contributions heatmap** showing your watch history
- **Stats dashboard** with your film metrics
- **Activity feed** of your diary entries
- **Lists displayed as repositories**

**100% private** - All processing happens in your browser. Nothing is uploaded.

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Install Dependencies

**Windows:**
```cmd
setup.bat
```

**Or manually:**
```cmd
npm install
```

### Step 2: Start the App

```cmd
npm run dev
```

Open http://localhost:3000

### Step 3: Upload Your Letterboxd Export

1. Get your export from Letterboxd:
   - Settings → Import & Export → "Export Your Data"
   - Download the ZIP when ready (check email)

2. Drag the ZIP onto GitBoxd or click "Select File"

3. Wait 2-5 seconds for processing

4. Explore your GitHub-style profile!

---

## ✅ What You'll See

- **Heatmap** - Green squares showing films watched per day (hover for details)
- **Stats** - Total watches, unique films, average rating, rewatches, longest streak
- **Activity Feed** - Your diary entries as GitHub-style commits
- **Lists** - Your Letterboxd lists as repositories
- **Export Button** - Download your processed data as JSON

---

## 📚 Need More Help?

- **Full setup guide:** [GETTING_STARTED.md](GETTING_STARTED.md)
- **Quick reference:** [QUICKSTART.md](QUICKSTART.md)
- **All documentation:** [DOCS_INDEX.md](DOCS_INDEX.md)
- **Troubleshooting:** See GETTING_STARTED.md

---

## 🐛 Common Issues

**"npm: command not found"**
→ Install Node.js from https://nodejs.org/

**"Failed to parse ZIP"**
→ Make sure you uploaded a Letterboxd export ZIP (not a random ZIP file)

**Heatmap is empty**
→ Your export needs `diary.csv` or `watched.csv` with watch dates

---

## 🎉 That's It!

You're ready to explore your Letterboxd data in a whole new way.

**Questions?** Check the docs or open an issue on GitHub.

**Enjoy GitBoxd! 🍿**
