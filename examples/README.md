# Sample Letterboxd Export

This directory contains sample CSV files that match the structure of a Letterboxd export.

## Files

- `sample-diary.csv` - Watch diary with 10 entries
- `sample-profile.csv` - User profile information

## Creating a Test ZIP

To create a test ZIP file for uploading to GitBoxd:

### Windows
```cmd
cd examples
tar -a -c -f sample-export.zip sample-diary.csv sample-profile.csv
```

### macOS/Linux
```bash
cd examples
zip sample-export.zip sample-diary.csv sample-profile.csv
```

## Expected Output

When you upload this sample export to GitBoxd, you should see:

- **Profile:** cinephile2024 / Film Enthusiast
- **Stats:**
  - Total Watches: 10
  - Unique Films: 10
  - Average Rating: 4.65
  - Rewatches: 2
- **Heatmap:** Activity across Jan-Jul 2024
- **Activity Feed:** 10 diary entries with ratings and tags

## Testing Edge Cases

To test edge cases, modify the CSVs:

1. **Duplicate films on same date:** Add multiple entries with same film and date
2. **Missing ratings:** Remove rating values
3. **Different date formats:** Try various date formats
4. **Missing columns:** Remove optional columns

## Real Export Structure

A real Letterboxd export contains:
```
letterboxd-username-2024-01-01/
├── profile.csv
├── diary.csv
├── ratings.csv
├── reviews.csv
├── watched.csv
├── watchlist.csv
├── lists/
│   ├── lists.csv
│   └── list-entries.csv
└── ...
```

GitBoxd handles partial exports gracefully, requiring only `diary.csv` or `watched.csv` at minimum.
