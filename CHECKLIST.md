# GitBoxd Setup Checklist

Use this checklist to ensure everything is working correctly.

## ✅ Pre-Installation

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Downloaded/cloned GitBoxd repository
- [ ] Opened terminal in GitBoxd directory

## ✅ Installation

- [ ] Ran `npm install` (or `setup.bat`)
- [ ] No error messages during installation
- [ ] `node_modules/` folder created
- [ ] Dependencies installed successfully

## ✅ Verification

- [ ] Ran `verify.bat` (Windows) - all checks passed
- [ ] Source files present in `src/` folder
- [ ] Configuration files present (package.json, tsconfig.json)

## ✅ Running the App

- [ ] Ran `npm run dev`
- [ ] Server started on port 3000
- [ ] No compilation errors
- [ ] Opened http://localhost:3000 in browser
- [ ] Upload screen visible with privacy notice

## ✅ Letterboxd Export

- [ ] Logged into Letterboxd.com
- [ ] Went to Settings → Import & Export
- [ ] Clicked "Export Your Data"
- [ ] Received email with download link
- [ ] Downloaded ZIP file
- [ ] ZIP file contains CSV files

## ✅ Upload & Processing

- [ ] Dragged ZIP onto upload area (or clicked "Select File")
- [ ] Processing started (loading indicator visible)
- [ ] Processing completed (2-5 seconds typical)
- [ ] Profile page loaded successfully

## ✅ Profile Features

- [ ] **Profile Header** visible with username/bio
- [ ] **Heatmap** displays with green squares
- [ ] **Hover tooltips** show film details
- [ ] **Year selector** works (if multiple years)
- [ ] **Stats dashboard** shows 5 metrics
- [ ] **Activity feed** displays diary entries
- [ ] **Lists** shown as repositories (if you have lists)
- [ ] **Export JSON** button works

## ✅ Functionality Tests

- [ ] Hover over heatmap square → tooltip appears
- [ ] Click year dropdown → can change years
- [ ] Scroll activity feed → pagination works
- [ ] Click "Export JSON" → file downloads
- [ ] Click "Upload New" → returns to upload screen
- [ ] Upload different export → processes correctly

## ✅ Browser Compatibility

Test in at least one browser:
- [ ] Chrome/Edge (recommended)
- [ ] Firefox
- [ ] Safari

## ✅ Mobile Responsiveness

- [ ] Open on mobile device or resize browser
- [ ] Layout adjusts for small screens
- [ ] All features accessible
- [ ] Touch interactions work

## ✅ Privacy Verification

- [ ] Privacy notice visible on upload screen
- [ ] No network requests during processing (check DevTools)
- [ ] Data cleared when closing tab
- [ ] No cookies or localStorage used

## ✅ Testing (Optional)

- [ ] Ran `npm test`
- [ ] All tests passed
- [ ] No test failures

## ✅ Documentation

- [ ] Read START_HERE.md
- [ ] Reviewed GETTING_STARTED.md
- [ ] Know where to find help (DOCS_INDEX.md)

## 🐛 Troubleshooting

If any checkbox fails, see:
- **Installation issues:** GETTING_STARTED.md
- **Upload errors:** Check ZIP file is valid Letterboxd export
- **Display issues:** Try different browser
- **Performance issues:** Close other tabs, wait longer

## 📊 Expected Results

After successful setup, you should see:

**Profile Header:**
- Your Letterboxd username
- Display name and bio
- Join date

**Stats Dashboard:**
- Total Watches: [your count]
- Unique Films: [your count]
- Average Rating: [your average]
- Rewatches: [your count]
- Longest Streak: [your streak]

**Heatmap:**
- Green squares for days with watches
- Darker = more films watched
- Hover shows film titles and ratings

**Activity Feed:**
- Chronological diary entries
- Film titles, dates, ratings
- Reviews and tags (if present)

**Lists (if applicable):**
- Your Letterboxd lists
- Film counts
- Descriptions

## ✅ Success Criteria

You've successfully set up GitBoxd if:
- ✅ App runs without errors
- ✅ Upload processes your export
- ✅ Heatmap displays your watch history
- ✅ All features work as expected
- ✅ Export JSON downloads successfully

## 🎉 Next Steps

Once everything works:
1. Explore your watch patterns in the heatmap
2. Review your stats and streaks
3. Export your data for backup
4. Consider deploying to Vercel (see DEPLOYMENT.md)
5. Share screenshots (not your data!) with friends

## 📞 Still Having Issues?

1. Check GETTING_STARTED.md troubleshooting section
2. Run `verify.bat` to diagnose problems
3. Review error messages in browser console (F12)
4. Open an issue on GitHub with details

---

**Happy watching! 🎬**
