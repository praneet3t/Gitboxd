# Deployment Guide

## Quick Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/gitboxd)

### Manual Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

## Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `.next` folder to Netlify

3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

## Deploy to Static Hosting

For pure static hosting (GitHub Pages, S3, etc.):

1. Update `next.config.js`:
```js
module.exports = {
  output: 'export',
  images: { unoptimized: true },
}
```

2. Build:
```bash
npm run build
```

3. Deploy the `out/` directory

## Environment Variables

No environment variables required for client-only mode.

If adding backend features:
- `DATABASE_URL` - PostgreSQL connection string
- `TMDB_API_KEY` - TMDB API key for poster fetching
- `S3_BUCKET` - AWS S3 bucket for storage

## Performance Optimization

- Enable Vercel Edge Functions for faster response times
- Use CDN for static assets
- Enable compression (gzip/brotli)
- Implement service worker for offline support

## Monitoring

Recommended tools:
- Vercel Analytics (built-in)
- Sentry for error tracking
- LogRocket for session replay

## Custom Domain

1. Add domain in Vercel dashboard
2. Configure DNS records:
   - A record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

## SSL/HTTPS

Vercel provides automatic SSL certificates. No configuration needed.

## Scaling

Client-only mode scales infinitely (static files on CDN).

For backend mode:
- Use serverless functions (Vercel/AWS Lambda)
- Implement Redis caching
- Use read replicas for database
- Rate limit API endpoints
