# GitBoxd - Quick Start Guide

Get GitBoxd running in 5 minutes.

## Prerequisites

- Node.js 18 or higher ([Download](https://nodejs.org/))
- A Letterboxd export ZIP file

## Installation

```bash
# Clone or download the repository
cd gitboxd

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Get Your Letterboxd Export

1. Log in to [Letterboxd](https://letterboxd.com)
2. Go to **Settings** → **Import & Export**
3. Click **"Export Your Data"**
4. Wait for email with download link (usually 5-10 minutes)
5. Download the ZIP file

## Upload & View

1. Drag your ZIP file onto the GitBoxd upload area
2. Wait 2-5 seconds for processing
3. Explore your GitHub-style profile!

## Features to Try

- **Hover over heatmap squares** to see films watched that day
- **Change years** using the dropdown above the heatmap
- **Scroll through activity feed** to see your watch history
- **Browse your lists** displayed as repositories
- **Export JSON** to save your processed data

## Troubleshooting

### "Failed to parse ZIP"
- Ensure you uploaded a valid Letterboxd export ZIP
- Check that the ZIP contains `diary.csv` or `watched.csv`

### Heatmap shows no data
- Verify your export contains watch dates
- Check that dates are in YYYY-MM-DD format

### Missing films or stats
- Some Letterboxd exports may have different column names
- The parser handles most variations automatically

### Performance issues
- Large exports (10k+ entries) may take 5-10 seconds
- Close other browser tabs to free memory

## Next Steps

- Read [README.md](README.md) for full documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) to deploy your own instance
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## Privacy

All processing happens in your browser. Nothing is uploaded to any server.

## Support

- Open an issue on GitHub
- Check existing issues for solutions
- Read the FAQ in README.md

---

**Enjoy your GitBoxd profile! 🎬**
