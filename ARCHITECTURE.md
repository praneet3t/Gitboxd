# GitBoxd Architecture

Technical overview of GitBoxd's design and implementation.

## System Overview

```
┌─────────────┐
│   Browser   │
│             │
│  ┌───────┐  │
│  │ React │  │
│  │  App  │  │
│  └───┬───┘  │
│      │      │
│  ┌───▼───┐  │
│  │Parser │  │
│  │JSZip  │  │
│  │Papa   │  │
│  └───┬───┘  │
│      │      │
│  ┌───▼───┐  │
│  │ State │  │
│  │(JSON) │  │
│  └───┬───┘  │
│      │      │
│  ┌───▼───┐  │
│  │  UI   │  │
│  │Render │  │
│  └───────┘  │
└─────────────┘
```

## Core Components

### 1. Parser (`src/lib/parser.ts`)

**Responsibility:** Extract and normalize Letterboxd CSV data

**Flow:**
1. Accept ZIP file via File API
2. Extract CSVs using JSZip
3. Parse CSVs with PapaParse
4. Normalize column names (case-insensitive, space-tolerant)
5. Map to canonical JSON schema
6. Calculate derived stats

**Key Functions:**
- `parseLetterboxdZip(file)` - Main entry point
- `normalizeHeader(header)` - Column name normalization
- `extractDate(row)` - Flexible date extraction
- `extractFilmId(row)` - Generate stable film IDs

**Edge Cases Handled:**
- Missing CSVs (fallback to alternatives)
- Variant column names
- Malformed dates
- Duplicate entries
- Empty/null values

### 2. Heatmap Generator (`src/lib/heatmap.ts`)

**Responsibility:** Transform diary entries into calendar heatmap data

**Algorithm:**
```
For each diary entry:
  1. Extract date (YYYY-MM-DD)
  2. Add film ID to date's Set (automatic deduplication)
  3. Store entry metadata for tooltip

For each unique date:
  4. Count = size of film ID Set
  5. Aggregate film details for tooltip
  6. Return { date, count, films[] }
```

**Deduplication Strategy:**
- Use `Map<date, Set<filmId>>` for O(1) deduplication
- Multiple diary entries for same film on same date = count 1
- Preserves all entries for tooltip display

**Color Scaling:**
- 5-level GitHub-style gradient
- Per-year normalization (default)
- Optional global normalization

### 3. UI Components

#### ProfileView (`src/components/ProfileView.tsx`)
- Main container
- State management (year selection)
- Export functionality

#### Heatmap (`src/components/Heatmap.tsx`)
- Wraps `react-calendar-heatmap`
- Custom tooltip with film details
- GitHub color styling

#### ActivityFeed (`src/components/ActivityFeed.tsx`)
- Chronological diary display
- Pagination (20 entries per page)
- Commit-style cards

#### ListsGrid (`src/components/ListsGrid.tsx`)
- Repository-style list display
- Film count badges
- Preview of list entries

#### StatsCard (`src/components/StatsCard.tsx`)
- Aggregate statistics
- Derived metrics (streak calculation)

## Data Flow

```
User Upload
    ↓
ZIP File (File API)
    ↓
JSZip.loadAsync()
    ↓
Extract CSVs (async text)
    ↓
PapaParse (header: true)
    ↓
Normalize Headers
    ↓
Map to Schema
    ↓
Calculate Stats
    ↓
LetterboxdData (JSON)
    ↓
React State (useState)
    ↓
Component Props
    ↓
Render UI
```

## State Management

**Strategy:** Local component state (no Redux/Zustand needed)

```typescript
// App-level state
const [data, setData] = useState<LetterboxdData | null>(null);

// Component-level state
const [selectedYear, setSelectedYear] = useState(2024);
const [limit, setLimit] = useState(20);
```

**Why no global state?**
- Single data load per session
- No complex state updates
- Props drilling is minimal
- Keeps bundle size small

## Performance Optimizations

### Parsing
- Stream parsing with PapaParse (handles large files)
- Async/await for non-blocking UI
- Early returns for missing data

### Rendering
- `useMemo` for expensive computations (heatmap data)
- Pagination for activity feed (20 items at a time)
- Lazy loading for lists (render on scroll)

### Memory
- No data persistence (cleared on page refresh)
- Garbage collection friendly (no circular refs)

## Type Safety

**TypeScript Interfaces:**
- `LetterboxdData` - Top-level data structure
- `Profile`, `Film`, `DiaryEntry`, `List` - Domain models
- `Stats` - Derived metrics
- `HeatmapDay` - Visualization data

**Benefits:**
- Compile-time error detection
- IntelliSense in IDE
- Self-documenting code
- Refactoring safety

## Testing Strategy

### Unit Tests
- Parser column mapping
- Heatmap deduplication
- Stats calculation
- Date extraction

### Integration Tests
- Full ZIP parsing
- Heatmap generation from diary
- Export functionality

### Manual Testing
- Real Letterboxd exports
- Edge cases (missing data, large files)
- Browser compatibility

## Security Considerations

### Client-Side Only
- No server = no attack surface
- No authentication needed
- No data breaches possible

### Input Validation
- File type checking (.zip only)
- ZIP bomb protection (size limits)
- CSV injection prevention (no eval)

### Privacy
- No network requests
- No localStorage/cookies
- No analytics/tracking

## Browser Compatibility

**Minimum Requirements:**
- ES6+ support
- File API
- Async/await
- CSS Grid/Flexbox

**Tested Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Bundle Size

**Target:** < 500KB gzipped

**Breakdown:**
- React + Next.js: ~200KB
- JSZip: ~100KB
- PapaParse: ~50KB
- react-calendar-heatmap: ~30KB
- App code: ~50KB

**Optimization:**
- Tree shaking (Next.js automatic)
- Code splitting (dynamic imports)
- No heavy dependencies

## Future Architecture

### Backend Option (Phase 2)

```
┌─────────┐      ┌──────────┐      ┌──────────┐
│ Browser │─────▶│ Next.js  │─────▶│ Postgres │
│         │      │ API      │      │          │
│         │◀─────│ Routes   │◀─────│          │
└─────────┘      └──────────┘      └──────────┘
                      │
                      ▼
                 ┌─────────┐
                 │   S3    │
                 │ Storage │
                 └─────────┘
```

**New Components:**
- `/api/upload` - Process and store
- `/api/profile/:slug` - Retrieve data
- `/u/:slug` - SSR profile page
- Database models (Prisma)
- S3 integration (AWS SDK)

**Challenges:**
- Privacy consent flow
- Data retention policy
- Rate limiting
- Cost management

## Deployment Architecture

### Static (Current)

```
┌─────────┐      ┌─────────┐
│ Browser │─────▶│ Vercel  │
│         │      │   CDN   │
└─────────┘      └─────────┘
```

**Benefits:**
- Infinite scale
- Zero cost
- No maintenance
- Global CDN

### Serverless (Future)

```
┌─────────┐      ┌─────────┐      ┌─────────┐
│ Browser │─────▶│ Vercel  │─────▶│ Lambda  │
│         │      │ Edge    │      │Functions│
└─────────┘      └─────────┘      └─────────┘
                                        │
                                        ▼
                                   ┌─────────┐
                                   │   RDS   │
                                   └─────────┘
```

## Code Organization

```
src/
├── app/              # Next.js pages
│   ├── page.tsx      # Home/upload
│   ├── layout.tsx    # Root layout
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── Heatmap.tsx
│   ├── ProfileView.tsx
│   ├── UploadForm.tsx
│   ├── ActivityFeed.tsx
│   ├── ListsGrid.tsx
│   └── StatsCard.tsx
├── lib/              # Business logic
│   ├── parser.ts     # CSV parsing
│   └── heatmap.ts    # Data transformation
└── types/            # TypeScript types
    └── index.ts
```

**Principles:**
- Separation of concerns
- Single responsibility
- Minimal coupling
- Maximum cohesion

## Development Workflow

```
Feature Branch
    ↓
Local Development (npm run dev)
    ↓
Unit Tests (npm test)
    ↓
Lint (npm run lint)
    ↓
Build (npm run build)
    ↓
Pull Request
    ↓
CI (GitHub Actions)
    ↓
Preview Deploy (Vercel)
    ↓
Code Review
    ↓
Merge to Main
    ↓
Production Deploy (Vercel)
```

## Monitoring & Observability

**Current (Static):**
- Vercel Analytics (page views)
- Browser console errors

**Future (Backend):**
- Sentry (error tracking)
- Datadog (APM)
- CloudWatch (logs)
- Custom metrics (uploads, exports)

---

**Architecture designed for simplicity, privacy, and scalability.**
