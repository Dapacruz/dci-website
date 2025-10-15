# Contributing to DC Infrastructures Website

Thank you for contributing to the DC Infrastructures website! This guide will help you understand our development workflow and contribution process.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Git Workflow](#git-workflow)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Claude Code Integration](#claude-code-integration)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd dci-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

## Development Workflow

### 1. Before Starting Work

1. **Pull latest changes:**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Check project status:**
   ```bash
   git status
   npm run lint
   ```

3. **Use Claude Code priming (optional):**
   ```bash
   /prime  # In Claude Code to get up to speed
   ```

### 2. During Development

1. **Make incremental commits** - Don't bundle unrelated changes
2. **Test frequently** - Run `npm run dev` and test in browser
3. **Lint your code** - Run `npm run lint` to catch issues early
4. **Follow existing patterns** - Match the styling and structure of existing code

### 3. Before Committing

Run through the manual testing checklist (see CLAUDE.md):

- [ ] Navigation works (all anchor links)
- [ ] Mobile menu opens/closes
- [ ] Form validation works
- [ ] Responsive design at all breakpoints
- [ ] No console errors
- [ ] Linting passes: `npm run lint`
- [ ] Production build succeeds: `npm run build`

## Git Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features
  - Example: `feature/add-blog-section`
- `fix/` - Bug fixes
  - Example: `fix/mobile-menu-not-closing`
- `refactor/` - Code refactoring
  - Example: `refactor/extract-hero-component`
- `docs/` - Documentation updates
  - Example: `docs/update-setup-instructions`
- `style/` - Visual/styling changes
  - Example: `style/update-button-colors`

### Creating a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Push the branch to remote
git push -u origin feature/your-feature-name
```

### Committing Changes

**Commit Message Format:**

```
<type>: <short description>

<optional detailed description>

<optional footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates

**Examples:**

```bash
git commit -m "feat: add testimonials section to homepage"

git commit -m "fix: mobile menu not closing on link click

The mobile menu remained open after clicking navigation links.
Added onClick handler to close menu when any link is clicked."

git commit -m "docs: update TypeScript configuration documentation"
```

### Keeping Your Branch Updated

```bash
# Update your branch with latest main
git checkout main
git pull origin main
git checkout your-branch-name
git merge main

# Or use rebase for cleaner history (advanced)
git checkout your-branch-name
git rebase main
```

## Code Standards

### TypeScript

- **Use strict typing** - Avoid `any` types
- **Define interfaces** for props and complex objects
- **Use type inference** where TypeScript can infer types automatically

```typescript
// Good
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Avoid
const handleSubmit = (data: any) => { ... }
```

### React Components

- **Functional components only** - Use React hooks
- **Keep components small** - Single responsibility principle
- **Use meaningful names** - Component names should describe their purpose

```tsx
// Good - Clear, focused component
function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <Card>
      <CardHeader>{icon}</CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
}
```

### Tailwind CSS

- **Use existing utility classes** - Check `src/index.css` for custom utilities
- **Follow responsive patterns** - Mobile-first approach
- **Use CSS variables** - For colors, use HSL variables from theme

```tsx
// Good - Uses existing patterns
<section className="section-padding">
  <div className="container-custom">
    <h2 className="gradient-text text-3xl md:text-4xl">Title</h2>
  </div>
</section>

// Avoid - Hardcoded colors
<div style={{ background: '#0047AB' }}>...</div>
```

### File Organization

- **UI components** → `src/components/ui/`
- **Utilities** → `src/lib/`
- **Main app** → `src/App.tsx`
- **Serverless functions** → `functions/api/`

### Import Order

1. React and external libraries
2. Internal components and utilities
3. Types and interfaces
4. Styles (if any)

```tsx
import { useState } from 'react';
import { Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { ContactFormData } from '@/types';
```

## Pull Request Process

### 1. Prepare Your PR

Before creating a pull request:

```bash
# Ensure branch is up to date
git checkout main
git pull origin main
git checkout your-branch
git merge main

# Run checks
npm run lint
npm run build
npm run preview  # Test production build

# Ensure all changes are committed
git status
```

### 2. Create Pull Request

1. **Push your branch:**
   ```bash
   git push origin your-branch-name
   ```

2. **Open PR on GitHub:**
   - Go to the repository on GitHub
   - Click "Compare & pull request"
   - Fill out the PR template (see below)

### 3. PR Title Format

Use the same format as commit messages:

```
feat: add testimonials section
fix: resolve mobile menu issue
docs: update contribution guidelines
```

### 4. PR Description Template

```markdown
## Summary
Brief description of what this PR does.

## Changes
- List of specific changes
- Another change
- Yet another change

## Testing
- [ ] Tested on desktop (Chrome, Firefox, Safari)
- [ ] Tested on mobile (iOS/Android)
- [ ] Linting passes
- [ ] Production build successful
- [ ] Manual testing checklist completed

## Screenshots (if applicable)
[Add screenshots for visual changes]

## Related Issues
Closes #123
Relates to #456
```

### 5. Review Process

- **Automatic Deployment**: Cloudflare Pages will create a preview deployment for your PR
- **Review**: At least one approval required before merging
- **CI Checks**: All checks must pass (linting, build)
- **Address Feedback**: Make requested changes and push updates

### 6. After Merge

```bash
# Switch back to main and pull latest
git checkout main
git pull origin main

# Delete local branch
git branch -d your-branch-name

# Delete remote branch (optional, usually done automatically)
git push origin --delete your-branch-name
```

## Claude Code Integration

### Using Custom Commands for Contributions

Claude Code provides powerful workflows for contributors:

#### For Bug Fixes

```bash
/fix-github-issue 123
```

This command will:
1. Fetch issue details from GitHub
2. Analyze the codebase
3. Generate and apply a fix
4. Create tests
5. Open a pull request

#### For Features

```bash
/generate-prp "Add blog section"
/execute-prp
```

This workflow:
1. Creates a detailed Project Requirement Plan
2. Breaks down the feature into tasks
3. Implements with validation gates
4. Updates documentation automatically
5. Runs tests

#### For Parallel Development

```bash
/prep-parallel-execution
```

Sets up git worktrees for working on multiple features simultaneously.

### Specialized Agents

Call these agents proactively:

- **`@documentation-manager`** - After making changes, ask this agent to update docs
- **`@validation-gates`** - Before submitting PR, ask this agent to validate everything

```bash
# Example workflow with agents
# 1. Make your changes
# 2. Update documentation
@documentation-manager Review and update documentation for my changes

# 3. Validate everything
@validation-gates Validate all changes and run comprehensive tests
```

## Questions or Issues?

- **Documentation**: Check `README.md` and `CLAUDE.md` first
- **Troubleshooting**: See `TROUBLESHOOTING.md`
- **Claude Code**: See `.claude/README.md`
- **Questions**: Open a GitHub discussion or issue

## Thank You!

Your contributions help improve the DC Infrastructures website. We appreciate your time and effort!
