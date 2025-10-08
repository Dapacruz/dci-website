# DC Infrastructures, Inc. - Website

A modern, professional single-page website for DC Infrastructures, Inc., built with Next.js, TypeScript, Tailwind CSS, and Shadcn/ui components.

## Features

- **Modern Design**: Clean, professional UI with black background and cobalt blue accents
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Navigation**: Single-page design with smooth scrolling between sections
- **Interactive Components**: Hover effects, animations, and interactive elements
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dci-website/
├── app/
│   ├── globals.css       # Global styles and Tailwind configuration
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main landing page
├── components/
│   └── ui/               # Shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       └── label.tsx
├── lib/
│   └── utils.ts          # Utility functions
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Sections

1. **Hero Section**: Company introduction with call-to-action
2. **Services Section**: Detailed overview of infrastructure services
3. **Why Choose Us**: Key differentiators and benefits
4. **Contact Section**: Contact form for inquiries

## Customization

### Colors

The color scheme uses:
- Primary background: Black (#000000)
- Accent color: Cobalt blue (#0047AB)
- Text: White and gray variants

To modify colors, update the CSS variables in `app/globals.css`.

### Content

All content can be modified in `app/page.tsx`.

## Build for Production

```bash
npm run build
npm start
```

## License

© 2024 DC Infrastructures, Inc. All rights reserved.
