# nahom.no

My personal website built with modern web technologies.

## Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **React bits** - 3D graphics and animations and other components
- **SHADCNUI** - Other components
- **Sanity CMS** - Content management

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Construction Mode

Toggle website availability with an environment variable:

```bash
# .env.local
NEXT_PUBLIC_UNDER_CONSTRUCTION=true
```

When enabled, all routes redirect to a construction page. When disabled or not set, the website works normally.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
```

---
