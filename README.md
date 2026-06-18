# Helen Zeray — Portfolio

Vite + React portfolio site.

## Development

```bash
npm install
npm run process-assets
npm run dev
```

## Assets

Source images live in `D:\zeray's files`. After adding or updating images, regenerate thumbnails and data:

```bash
npm run process-assets
```

## Deploy on Vercel

Import this repository in [Vercel](https://vercel.com). Default settings work:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

Routes: `/` (home), `/works`, `/about`, `/cv`, `/press`, `/contact`. Client-side routing is handled via `vercel.json` rewrites.
