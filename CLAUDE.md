# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern, responsive website for DC Infrastructures, Inc. Built with Vite, React 18, TypeScript, and Tailwind CSS. Deployed on Cloudflare Pages with serverless contact form functionality.

## Common Commands

### Development
```bash
npm run dev          # Start Vite development server
npm run build        # Build production bundle
npm run preview      # Preview production build locally
npm run lint         # Run ESLint with TypeScript support
```

### Testing Contact Form
The contact form endpoint is a Cloudflare Pages Function at `/api/contact`. It requires the `RESEND_API_KEY` environment variable to be set in Cloudflare Pages dashboard (not in local .env files).

## Architecture

### Application Structure
- **Single-page application**: All content is in `src/App.tsx` (no routing currently configured despite react-router-dom being installed)
- **Component library**: Uses shadcn/ui components built on Radix UI primitives
- **Styling approach**: Tailwind CSS with HSL-based color system defined via CSS variables in `src/index.css`

### Contact Form Flow
1. Frontend form in `App.tsx` sends POST to `/api/contact`
2. Cloudflare Pages Function at `functions/api/contact.ts` handles the request
3. Function validates input and sends email via Resend API
4. Response indicates success/failure to frontend

### Path Aliases
Vite is configured with `@/` alias pointing to `./src/` directory (see `vite.config.ts`).

### Tailwind Configuration
Custom theme uses HSL color variables (defined in `src/index.css`) for dark mode theme with cobalt blue accents. Background is set to #191919. Uses Inter font family.

## Deployment

**Platform**: Cloudflare Pages (automatic Git deployment)
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Environment variables**: `RESEND_API_KEY` must be set in Cloudflare Pages dashboard

Every push to `main` triggers production deployment. Pull requests create preview deployments.

## Key Implementation Details

### Cloudflare Pages Functions
- Located in `functions/` directory (not `src/`)
- TypeScript files use Cloudflare's `PagesFunction` type
- File-based routing: `functions/api/contact.ts` → `/api/contact` endpoint
- Environment variables accessed via `context.env.VARIABLE_NAME`

### Component Patterns
- UI components in `src/components/ui/` follow shadcn/ui conventions
- Use `clsx` and `tailwind-merge` (via `src/lib/utils.ts`) for conditional classes
- Components use Radix UI for accessibility

### Styling Conventions
- CSS variables for theming (HSL format)
- Dark theme by default (#191919 background)
- Cobalt blue primary color
- Inter font for all text
