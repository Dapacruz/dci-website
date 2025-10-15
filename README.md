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
│   ├── components/
│   │   └── ui/           # shadcn/ui components (button, input, textarea, label)
│   ├── lib/
│   │   └── utils.ts      # Utility functions (cn helper)
│   ├── App.tsx           # Main application component (single-page app)
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles & CSS variables
├── functions/
│   └── api/
│       └── contact.ts    # Cloudflare Pages Function for contact form
├── .claude/              # Claude Code integration
│   ├── commands/         # Custom slash commands for workflows
│   └── agents/           # Specialized agent configurations
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration (path aliases)
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── postcss.config.js     # PostCSS configuration
├── CLAUDE.md             # Claude Code instructions
├── CONTRIBUTING.md       # Git workflow and contribution guidelines
└── TROUBLESHOOTING.md    # Common issues and solutions
```

## Claude Code Integration

This project includes powerful AI-assisted development workflows via [Claude Code](https://claude.ai/code). The `.claude/` directory contains custom commands and specialized agents.

### Custom Commands

Use these slash commands in Claude Code:

- **`/prime`** - Prime Claude with project context and recent changes
- **`/generate-prp`** - Generate Project Requirement Plans for complex features
- **`/execute-prp`** - Execute PRPs with automated validation
- **`/prep-parallel-execution`** - Setup parallel git worktrees for concurrent development
- **`/fix-github-issue`** - Automated GitHub issue resolution workflow

### Specialized Agents

- **`@documentation-manager`** - Automatically keeps documentation in sync with code changes
- **`@validation-gates`** - Ensures quality through comprehensive testing and validation

### Example Workflow

```bash
# Start a new feature
/generate-prp "Add blog section to website"

# Execute with validation
/execute-prp

# Documentation automatically updated by @documentation-manager
# Tests automatically run by @validation-gates
```

See `.claude/README.md` for detailed documentation on all commands and agents.

## License

© 2025 DC Infrastructures, Inc. All rights reserved.
