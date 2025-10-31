# GitBoxd Quick Reference Card

## 🚀 Essential Commands

```cmd
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests
npm run lint         # Run linter
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main app component |
| `src/lib/parser.ts` | ZIP/CSV parsing logic |
| `src/lib/heatmap.ts` | Heatmap data generation |
| `src/components/Heatmap.tsx` | Calendar visualization |
| `src/types/index.ts` | TypeScript types |

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies & scripts |
| `tsconfig.json` | TypeScript config |
| `tailwind.config.js` | Styling config |
| `next.config.js` | Next.js config |
| `vercel.json` | Deployment config |

## 📚 Documentation Quick Links

| Doc | When to Use |
|-----|-------------|
| [START_HERE.md](START_HERE.md) | First time setup |
| [GETTING_STARTED.md](GETTING_STARTED.md) | Detailed setup + troubleshooting |
| [QUICKSTART.md](QUICKSTART.md) | Fast setup for devs |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Understanding the code |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deploying to production |
| [CHECKLIST.md](CHECKLIST.md) | Verify installation |

## 🎯 Common Tasks

### First Time Setup
```cmd
setup.bat           # Windows automated setup
# OR
npm install         # Manual install
npm run dev         # Start server
```

### Verify Installation
```cmd
verify.bat          # Check everything works
```

### Deploy to Vercel
```cmd
npm i -g vercel     # Install Vercel CLI
vercel              # Deploy
```

### Run Tests
```cmd
npm test            # Run all tests
npm run test:watch  # Watch mode
```

## 🐛 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| "npm: command not found" | Install Node.js from nodejs.org |
| "Failed to parse ZIP" | Upload valid Letterboxd export |
| Port 3000 in use | `set PORT=3001 && npm run dev` |
| Dependencies error | Delete node_modules, run `npm install` |
| Build error | Check Node.js version (need 18+) |

## 📊 Letterboxd Export Steps

1. Letterboxd.com → Settings
2. Import & Export tab
3. "Export Your Data" button
4. Check email for download link
5. Download ZIP file
6. Upload to GitBoxd

## 🎨 GitHub Color Palette

```javascript
'gh-bg': '#0d1117'              // Background
'gh-border': '#30363d'          // Borders
'gh-text': '#c9d1d9'            // Text
'gh-text-secondary': '#8b949e'  // Secondary text
'gh-green-1': '#0e4429'         // Heatmap level 1
'gh-green-2': '#006d32'         // Heatmap level 2
'gh-green-3': '#26a641'         // Heatmap level 3
'gh-green-4': '#39d353'         // Heatmap level 4
```

## 🔍 Project Structure

```
gitboxd/
├── src/
│   ├── app/           # Pages
│   ├── components/    # UI components
│   ├── lib/           # Business logic
│   └── types/         # TypeScript types
├── __tests__/         # Tests
├── examples/          # Sample data
└── [docs]/            # Documentation
```

## 📦 Dependencies

**Core:**
- next: 14.0.4
- react: 18.2.0
- jszip: 3.10.1
- papaparse: 5.4.1
- react-calendar-heatmap: 1.9.0

**Dev:**
- typescript: 5.x
- tailwindcss: 3.3.0
- jest: 29.7.0

## 🌐 URLs

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Local development |
| https://vercel.com | Deployment platform |
| https://letterboxd.com | Export your data |
| https://nodejs.org | Download Node.js |

## 💡 Pro Tips

1. **Use setup.bat** for automated Windows setup
2. **Run verify.bat** to check installation
3. **Check CHECKLIST.md** to verify everything works
4. **Use sample data** in examples/ for testing
5. **Read START_HERE.md** for quickest start

## 🔒 Privacy

- ✅ All processing in browser
- ✅ No server uploads
- ✅ No tracking
- ✅ No cookies
- ✅ Data cleared on close

## 📞 Get Help

1. Check GETTING_STARTED.md troubleshooting
2. Run verify.bat for diagnostics
3. Review DOCS_INDEX.md for all docs
4. Open GitHub issue with details

## ⚡ Speed Reference

| Task | Time |
|------|------|
| Install dependencies | 1-2 min |
| Start dev server | 5-10 sec |
| Parse typical export | 2-5 sec |
| Parse large export | 10-15 sec |
| Build for production | 30-60 sec |

---

**Keep this card handy for quick reference! 📋**
