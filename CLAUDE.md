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
Custom theme uses HSL color variables (defined in `src/index.css`) for dark mode theme with cobalt blue accents. Background is pure black (#000000). Uses Inter font family loaded from system fonts.

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
- Available components: `button.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`
- Use `clsx` and `tailwind-merge` (via `src/lib/utils.ts`) for conditional classes
- Components use Radix UI for accessibility

### Styling Conventions
- CSS variables for theming (HSL format)
- Dark theme by default (#000000 pure black background)
- Cobalt blue primary color
- Inter font for all text
- PostCSS configured with Tailwind and Autoprefixer

## Comprehensive Styling Reference

### Color System

**Background Colors:**
- Primary Background: `#000000` (pure black, `0 0% 0%` in HSL)
- CSS Variable: `--background: 0 0% 0%`

**Cobalt Blue Primary Colors:**
- Standard Cobalt: `#0047AB` (`215 100% 34%` in HSL)
- Hover/Lighter Cobalt: `#0056D6` (lighter variant for hover states)
- CSS Variables:
  - `--primary: 215 100% 34%`
  - `--primary-foreground: 0 0% 100%` (white text on cobalt)

**Text Colors:**
- Primary Text: `#FFFFFF` (white, `0 0% 100%`)
- Muted Text: `hsl(0 0% 60%)` (gray for secondary content)

**Gradient:**
- Gradient Pattern: `linear-gradient(135deg, #0047AB 0%, #0056D6 100%)`
- Used for: Hero text, headings, special emphasis

### Custom Utility Classes

**`.gradient-text`**
- Applies cobalt blue gradient to text
- Implementation: `background: linear-gradient(135deg, #0047AB 0%, #0056D6 100%)`
- Background clip to text with transparent text color
- Used in: Hero headline, section titles

**`.section-padding`**
- Consistent vertical spacing for sections
- Implementation: `py-20 md:py-32` (5rem mobile, 8rem desktop)

**`.container-custom`**
- Responsive container with proper padding
- Max-width constraints for optimal reading width
- Automatic horizontal centering

### Typography

**Font Family:**
- Primary: `Inter, system-ui, -apple-system, sans-serif`
- Loaded from system fonts (no external font loading)
- Fallbacks ensure consistent rendering across platforms

**Font Sizes (Tailwind):**
- Hero: `text-4xl md:text-6xl lg:text-7xl`
- Section Headings: `text-3xl md:text-4xl`
- Body: `text-lg` (18px)
- Small/Muted: `text-sm` (14px)

### Scrollbar Customization

Custom scrollbar styling in `src/index.css`:
```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: #0047AB; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #0056D6; }
```

### Animation

**Available Animations (via tailwindcss-animate):**
- Fade in/out
- Slide in from edges
- Accordion expand/collapse
- See Tailwind config for full animation list

**Custom Keyframes:**
- Defined in `tailwind.config.ts`
- Used for smooth transitions on interactive elements

## TypeScript Configuration

### Compiler Options

**Path Mapping:**
- `@/*` → `./src/*` (configured in both `tsconfig.json` and `vite.config.ts`)
- Allows imports like: `import { Button } from '@/components/ui/button'`

**Strict Mode Enabled:**
- `strict: true` - Full TypeScript strictness
- `noUnusedLocals: true` - Catch unused variables
- `noUnusedParameters: true` - Catch unused function params
- `noFallthroughCasesInSwitch: true` - Prevent switch fallthrough bugs

**Module Resolution:**
- `moduleResolution: "bundler"` - Optimized for Vite bundler
- `resolveJsonModule: true` - Import JSON files as modules
- `esModuleInterop: true` - Better CommonJS interop

**JSX Configuration:**
- `jsx: "react-jsx"` - Modern React JSX transform (no need to import React)

### Adding New Path Aliases

1. Add to `tsconfig.json` in `compilerOptions.paths`
2. Add to `vite.config.ts` in `resolve.alias`
3. Both must match for proper IDE and runtime resolution

## Content Management

### Single-Page Architecture

**All content lives in:** `src/App.tsx`

This is a single-page application (SPA) with anchor-link navigation. No routing is configured, despite `react-router-dom` being installed.

### Updating Content

**Hero Section** (Lines ~164-180 in App.tsx):
```tsx
<h1>...Headline...</h1>
<p>...Subheadline...</p>
```

**Services Grid** (Lines ~232-280 in App.tsx):
Each service is a Card component with:
- Icon (from lucide-react)
- Title
- Description

**About Section** (Lines ~285-310 in App.tsx):
Company description and values

**Contact Form** (Lines ~315-end in App.tsx):
Form fields and submission logic

### Adding New Sections

1. Choose insertion point in App.tsx
2. Add section with proper padding: `<section className="section-padding">`
3. Use container: `<div className="container-custom">`
4. Follow existing section structure for consistency
5. Add anchor link to navigation if needed (update `navLinks` around line 30)

### When to Add Routing

Consider adding routing (react-router-dom is already installed) when:
- Adding blog/news section with individual post pages
- Creating separate case studies pages
- Building multi-page forms or wizards
- Adding user dashboard or authentication

## Testing & Local Development

### Testing Without Resend API Key

**Contact Form Limitation:**
The contact form requires `RESEND_API_KEY` which is only set in Cloudflare Pages production/preview environments.

**Local Development Options:**
1. **Accept 500 Errors**: Form will show error state (useful for testing error handling UI)
2. **Mock the Endpoint**: Temporarily modify `functions/api/contact.ts` to return success without sending email
3. **Use Resend Test Key**: Get a test API key from Resend for local development (optional)

**Example Mock for Local Testing:**
```typescript
// In functions/api/contact.ts, temporarily add at the top of the function:
if (!context.env.RESEND_API_KEY) {
  console.log('Mock email send:', { name, email, message });
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### Manual Testing Checklist

Before committing changes:

- [ ] **Navigation**: All anchor links scroll smoothly to sections
- [ ] **Mobile Menu**: Hamburger menu opens/closes properly
- [ ] **Form Validation**: Required fields show error states
- [ ] **Form Submission**: Loading state and success/error messages display
- [ ] **Responsive Design**: Test at breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop), 1920px (large)
- [ ] **Typography**: Gradient text renders correctly, no font loading issues
- [ ] **Hover States**: All interactive elements have proper hover effects
- [ ] **Accessibility**: Keyboard navigation works, focus states visible

### Linting

- ESLint configured via `eslint-config-next` (installed as dev dependency)
- No custom .eslintrc file - uses default Next.js ESLint rules
- TypeScript support enabled via ESLint command in package.json
- Run `npm run lint` to check for issues

**Why Next.js ESLint config for Vite project?**
- Provides excellent React + TypeScript linting rules
- Well-maintained and comprehensive ruleset
- Works perfectly with Vite (only build tool differs, not linting needs)

### Build Testing

```bash
# Always test production build before pushing
npm run build
npm run preview

# Check build output for:
# - No TypeScript errors
# - Reasonable bundle sizes (check dist/ folder)
# - No console warnings
```

## Dependency Notes

### Installed But Not Currently Used

**`react-router-dom`**: Installed but routing not configured. All content is in single App.tsx.
- Keep for future multi-page functionality
- Or remove if SPA architecture is permanent

### Key Dependencies Explained

**`class-variance-authority`**: Used by shadcn/ui components for variant-based styling
**`clsx` + `tailwind-merge`**: Combined in `cn()` helper for conditional Tailwind classes
**`tailwindcss-animate`**: Provides animation utilities used in interactive components
**`@radix-ui/*`**: Headless UI primitives (accessibility, keyboard nav) for shadcn/ui components
**`lucide-react`**: Icon library (tree-shakeable, only imports used icons)

## Claude Code Integration

### Available Custom Commands

Located in `.claude/commands/`:

- **`prime`**: Context priming with project state and recent changes
- **`generate-prp`**: Generate Project Requirement Plans for complex features
- **`execute-prp`**: Execute PRPs with validation gates
- **`prep-parallel-execution`**: Setup parallel git worktrees for concurrent development
- **`fix-github-issue`**: Automated GitHub issue resolution workflow

### Available Specialized Agents

Located in `.claude/agents/`:

- **`documentation-manager`**: Proactively updates documentation when code changes
- **`validation-gates`**: Runs tests and validates changes before completion

### Using Custom Commands

```bash
# In Claude Code, use slash commands:
/prime                          # Get up to speed on project
/generate-prp "feature name"    # Plan a feature
/execute-prp                    # Execute with validation
/fix-github-issue 123           # Fix issue #123
```

See `.claude/README.md` for complete documentation on all commands and agents.
