# DC Infrastructures, Inc. Website

Modern, responsive website for DC Infrastructures, Inc. Built with Vite, React, TypeScript, and Tailwind CSS.

## Features

- ⚡️ Lightning-fast Vite development server
- ⚛️ React 18 with TypeScript
- 🎨 Tailwind CSS with custom design system
- 📱 Fully responsive design
- 🌙 Dark mode (black background with cobalt blue accents)
- 📧 Contact form with Resend API integration
- 🚀 Optimized for Cloudflare Pages deployment

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

The contact form uses Cloudflare Pages Functions (serverless). The API key is set in Cloudflare Pages dashboard, not in local `.env` files.

## Cloudflare Pages Deployment

### Automatic Git Deployment

1. **Connect Repository**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project" → "Connect to Git"
   - Select this repository

2. **Build Settings**
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave as default)
   - **Environment variables** (Production):
     - `RESEND_API_KEY`: Your Resend API key from [resend.com](https://resend.com/api-keys)

3. **Deploy**
   - Every push to `main` triggers a production deployment
   - Pull requests create preview deployments automatically

## Tech Stack

- **Framework**: Vite + React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Email**: Resend API
- **Hosting**: Cloudflare Pages

## Project Structure

```
├── src/
│   ├── components/ui/    # Reusable UI components
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML entry point
└── vite.config.ts        # Vite configuration
```

## License

© 2025 DC Infrastructures, Inc. All rights reserved.
