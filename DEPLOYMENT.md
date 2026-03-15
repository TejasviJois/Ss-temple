# Deploy to Vercel

This project is configured for deployment on [Vercel](https://vercel.com).

## Quick deploy

1. Push your code to GitHub (or connect GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → Import your repo.
3. Vercel will detect **Vite** and use:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables (see below).
5. Click **Deploy**.

## Environment variables

In your Vercel project: **Settings → Environment Variables**, add:

| Name | Value | Notes |
|------|--------|--------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key` | Supabase anon/public key (safe for client) |

Use the same values for **Production**, **Preview**, and **Development** if you use one Supabase project for all.

## SPA routing

`vercel.json` is set up so all routes (e.g. `/about/temple`, `/login`) serve the app and React Router handles them. Static assets (JS, CSS, images) are served from `dist` as usual.

## Local preview of production build

```bash
npm run build
npm run preview
```

Then open the URL shown (e.g. `http://localhost:4173`).
