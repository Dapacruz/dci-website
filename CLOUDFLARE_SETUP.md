# Cloudflare Pages Deployment Setup

## Build Configuration

Go to your Cloudflare Pages project: **Settings → Builds & deployments → Configure build settings**

### Build Settings
- **Framework preset**: None (or Next.js, but override the commands below)
- **Build command**: `npm run cloudflare:build`
- **Build output directory**: `.open-next`
- **Root directory**: `/` (leave as default)

### Environment Variables

Go to: **Settings → Environment variables**

Add the following variables for **Production** and **Preview**:

| Variable Name | Value |
|--------------|-------|
| `NODE_VERSION` | `20` |
| `RESEND_API_KEY` | `[your-resend-api-key]` |

## Deployment

Once configured, deployments happen automatically:
- **Production**: Push to `main` branch
- **Preview**: Create a pull request

## Manual Deployment (Alternative)

If you prefer manual deployments using Wrangler CLI:

1. Login to Wrangler (one-time setup):
   ```bash
   npx wrangler login
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

## Troubleshooting

### Build fails with "worker not found"
- Verify `Build output directory` is set to `.open-next`
- Check that `NODE_VERSION` is set to `20`

### 404 errors after deployment
- Ensure the build completed successfully
- Check build logs for any errors during the OpenNext build process

### Contact form returns 405 or 500 errors
- Verify `RESEND_API_KEY` environment variable is set correctly in Cloudflare Pages
- Check that the API key has proper permissions in Resend dashboard

## Project Structure

```
.open-next/              # Build output directory
├── worker.js            # Main Cloudflare Worker
├── assets/              # Static assets
├── cloudflare/          # Cloudflare-specific files
└── ...

wrangler.toml            # Cloudflare configuration
open-next.config.ts      # OpenNext configuration
```

## Technical Details

- **Framework**: Next.js 15.5.4
- **Deployment Adapter**: @opennextjs/cloudflare 1.9.2
- **Runtime**: Cloudflare Workers (Node.js compatibility mode)
- **Email Service**: Resend API
