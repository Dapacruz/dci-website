# Troubleshooting Guide

Common issues and solutions for the DC Infrastructures website.

## Table of Contents

- [Development Server Issues](#development-server-issues)
- [Build Issues](#build-issues)
- [Contact Form Issues](#contact-form-issues)
- [TypeScript Issues](#typescript-issues)
- [Styling Issues](#styling-issues)
- [Deployment Issues](#deployment-issues)
- [Git Issues](#git-issues)

## Development Server Issues

### Port Already in Use

**Problem:** `Error: Port 5173 is already in use`

**Solution:**

```bash
# Find and kill the process using port 5173
# On macOS/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- --port 3000
```

### Dependencies Not Found

**Problem:** `Cannot find module 'react'` or similar errors

**Solution:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# If still failing, clear npm cache
npm cache clean --force
npm install
```

### Hot Module Replacement Not Working

**Problem:** Changes not reflecting in browser

**Solution:**

1. **Hard refresh:** `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
2. **Check file watchers:**
   ```bash
   # macOS - increase file watcher limit
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```
3. **Restart dev server:** `Ctrl+C` then `npm run dev`

## Build Issues

### TypeScript Compilation Errors

**Problem:** `error TS2307: Cannot find module '@/components/ui/button'`

**Solution:**

```bash
# Verify path aliases are configured in both files
# Check tsconfig.json and vite.config.ts

# Restart TypeScript server in your editor
# VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Build Fails with Memory Error

**Problem:** `JavaScript heap out of memory`

**Solution:**

```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096 npm run build

# Or add to package.json scripts:
"build": "NODE_OPTIONS=--max-old-space-size=4096 vite build"
```

### CSS Not Loading in Production

**Problem:** Styles missing after `npm run build`

**Solution:**

```bash
# Ensure PostCSS is configured correctly
# Check postcss.config.js exists with:
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

# Clear dist folder and rebuild
rm -rf dist
npm run build
```

### Import Path Errors

**Problem:** `Failed to resolve import "@/lib/utils"`

**Solution:**

Check `vite.config.ts` has correct alias configuration:

```typescript
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

## Contact Form Issues

### 500 Error on Form Submission

**Problem:** Contact form returns 500 Internal Server Error

**Likely Cause:** `RESEND_API_KEY` not set in Cloudflare Pages

**Solutions:**

1. **For production/preview deployments:**
   - Go to Cloudflare Pages dashboard
   - Select your project → Settings → Environment Variables
   - Add `RESEND_API_KEY` with your Resend API key
   - Redeploy the site

2. **For local development:**
   ```typescript
   // Add mock in functions/api/contact.ts for testing:
   export const onRequestPost: PagesFunction = async (context) => {
     // Add this at the start for local testing:
     if (!context.env.RESEND_API_KEY) {
       console.log('Mock mode - would send:', await context.request.json());
       return new Response(JSON.stringify({ success: true }), {
         headers: { 'Content-Type': 'application/json' }
       });
     }
     // ... rest of function
   };
   ```

### Form Validation Not Working

**Problem:** Form submits even when fields are empty

**Solution:**

1. Check required attributes on inputs:
   ```tsx
   <Input required />
   <Textarea required />
   ```

2. Verify form submission handler:
   ```tsx
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     // validation logic
   };
   ```

### CORS Errors

**Problem:** `Access-Control-Allow-Origin` error

**Solution:**

Cloudflare Pages Functions handle CORS automatically. If you see this error:

```typescript
// Add CORS headers to functions/api/contact.ts
return new Response(JSON.stringify({ success: true }), {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
});
```

## TypeScript Issues

### "Cannot find name" Errors

**Problem:** `Cannot find name 'React'` or similar

**Solution:**

```bash
# Ensure dependencies are installed
npm install

# Check tsconfig.json has correct JSX setting:
{
  "compilerOptions": {
    "jsx": "react-jsx"  // Modern transform, no React import needed
  }
}
```

### Path Alias Not Resolving

**Problem:** `Cannot find module '@/components/ui/button'`

**Solution:**

1. **Verify both configs match:**

   `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

   `vite.config.ts`:
   ```typescript
   export default defineConfig({
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
   })
   ```

2. **Restart TypeScript server** in your editor

3. **Restart dev server**

### Strict Mode Errors

**Problem:** Too many strict TypeScript errors

**Solution:**

```typescript
// Fix properly rather than disabling strict mode
// Common fixes:

// 1. Null checks
const value = data?.field ?? 'default';

// 2. Type assertions (use sparingly)
const element = document.getElementById('id') as HTMLElement;

// 3. Proper typing
interface Props {
  value: string | null;  // Explicit about nullable values
}
```

## Styling Issues

### Tailwind Classes Not Working

**Problem:** Classes in code but styles not applying

**Solution:**

1. **Check Tailwind config content paths:**
   ```typescript
   // tailwind.config.ts
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     // ...
   }
   ```

2. **Restart dev server** after config changes

3. **Verify import in src/index.css:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### Gradient Text Not Showing

**Problem:** `.gradient-text` class not applying gradient

**Solution:**

Check `src/index.css` has the class defined:

```css
.gradient-text {
  background: linear-gradient(135deg, #0047AB 0%, #0056D6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Custom CSS Variables Not Working

**Problem:** Colors defined in CSS variables not applying

**Solution:**

Verify variables are defined in `src/index.css`:

```css
:root {
  --background: 0 0% 0%;
  --primary: 215 100% 34%;
  /* ... other variables */
}
```

Use in Tailwind as: `bg-background` or `text-primary`

### Responsive Design Broken

**Problem:** Mobile layout looks wrong

**Solution:**

1. **Check viewport meta tag** in `index.html`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```

2. **Test specific breakpoints:**
   ```tsx
   // Use Tailwind breakpoints consistently
   <div className="text-base md:text-lg lg:text-xl">
   ```

3. **Check browser dev tools** responsive mode

## Deployment Issues

### Cloudflare Pages Build Failing

**Problem:** Build succeeds locally but fails on Cloudflare

**Solution:**

1. **Check Node.js version:**
   - Cloudflare Pages uses Node.js 18 by default
   - Add `.nvmrc` file if you need specific version:
     ```
     18
     ```

2. **Verify build settings:**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Root directory: `/`

3. **Check build logs** in Cloudflare dashboard for specific errors

### Environment Variables Not Working

**Problem:** `RESEND_API_KEY` undefined in deployed function

**Solution:**

1. Go to Cloudflare Pages → Your Project → Settings → Environment Variables
2. Add variable for correct environment (Production/Preview)
3. **Redeploy** - Variable changes require redeployment
4. Verify in function: `console.log('Key exists:', !!context.env.RESEND_API_KEY)`

### Preview Deployment Not Updating

**Problem:** PR preview shows old version

**Solution:**

1. **Force new commit:**
   ```bash
   git commit --allow-empty -m "Trigger rebuild"
   git push
   ```

2. **Check Cloudflare Pages dashboard** for deployment status

3. **Clear browser cache** and hard refresh

### Functions Not Working After Deploy

**Problem:** `/api/contact` returns 404 on deployed site

**Solution:**

1. **Verify file location:** Must be `functions/api/contact.ts` (not in `src/`)

2. **Check function export:**
   ```typescript
   export const onRequestPost: PagesFunction = async (context) => {
     // function code
   };
   ```

3. **Verify TypeScript types:**
   ```bash
   npm install -D @cloudflare/workers-types
   ```

## Git Issues

### Merge Conflicts

**Problem:** Conflicts when merging main into your branch

**Solution:**

```bash
# 1. Fetch latest changes
git fetch origin main

# 2. Merge and identify conflicts
git merge origin/main

# 3. Open conflicted files and resolve
# Look for <<<<<<< HEAD markers

# 4. After resolving, stage and commit
git add .
git commit -m "Resolve merge conflicts"
```

### Accidentally Committed to Main

**Problem:** Made commits directly on main branch

**Solution:**

```bash
# 1. Create a new branch from current main
git branch feature/your-fix

# 2. Reset main to remote
git checkout main
git reset --hard origin/main

# 3. Switch to new branch with your changes
git checkout feature/your-fix
```

### Push Rejected

**Problem:** `Updates were rejected because the remote contains work that you do not have`

**Solution:**

```bash
# Pull with rebase to maintain clean history
git pull --rebase origin your-branch-name

# Or merge if you prefer
git pull origin your-branch-name

# Resolve any conflicts, then:
git push origin your-branch-name
```

## Still Having Issues?

### Debug Steps

1. **Clear everything and start fresh:**
   ```bash
   # Stop dev server
   # Delete build artifacts
   rm -rf node_modules dist .vite

   # Reinstall
   npm install

   # Rebuild
   npm run build
   ```

2. **Check versions:**
   ```bash
   node --version  # Should be 18+
   npm --version   # Should be 9+
   ```

3. **Enable verbose logging:**
   ```bash
   npm run dev -- --debug
   npm run build -- --debug
   ```

### Getting Help

- **Check documentation:** `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`
- **Search issues:** Check GitHub issues for similar problems
- **Create an issue:** Include:
  - Exact error message
  - Steps to reproduce
  - Your environment (OS, Node version, npm version)
  - What you've already tried
- **Use Claude Code:**
  ```bash
  /fix-github-issue <issue-number>
  ```

### Useful Commands for Debugging

```bash
# Check what files changed
git status

# Check package versions
npm list

# Verify dev dependencies installed
npm ls vite typescript tailwindcss

# Check for outdated packages
npm outdated

# View build output in detail
npm run build 2>&1 | tee build.log
```

## Prevention Tips

1. **Run checks before committing:**
   ```bash
   npm run lint && npm run build
   ```

2. **Test in production mode locally:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Keep dependencies updated** (carefully):
   ```bash
   npm update
   npm audit fix
   ```

4. **Use Claude Code agents:**
   ```bash
   @validation-gates  # Before submitting PR
   @documentation-manager  # After making changes
   ```
