# 🎫 RouTicket Deals

A vibrant, mobile-first deals and coupons showcase that connects users with exciting local promotions through an immersive, card-based browsing experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple.svg)](https://vitejs.dev/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

RouTicket Deals is a modern web application designed to showcase local deals and promotional offers in an engaging, user-friendly interface. Built with React and powered by GitHub Spark, the application provides users with an intuitive way to discover, search, filter, and save their favorite local deals.

### Key Characteristics

- **Discoverable**: Exciting browsing experience with clear visual hierarchy and immediate value understanding
- **Effortless**: Zero cognitive load navigation with natural, immediate interactions
- **Delightful**: Subtle animations and thoughtful micro-interactions that create moments of joy

## ✨ Features

### 🎴 Deal Card Display
- Visual promotional offers with images, titles, and expiration dates
- Responsive masonry grid layout for optimal content display
- Quick action buttons for instant engagement
- Smooth image loading with fallback placeholders

### 🔍 Search and Filter System
- Real-time text search across deal titles (300ms debounce)
- Category and status filters with visual chips
- "No results" state with clear call-to-action
- Result count display with active filter indicators

### 📱 Deal Detail View
- Full-screen modal with complete deal information
- Smooth expand animation from card position
- Action buttons for external links and sharing
- Easy-to-close interface with gesture support

### ❤️ Favorites System
- Mark deals as favorites with persistent storage
- Toggle favorite-only view for quick access
- Real-time synchronization using GitHub Spark KV storage
- Visual feedback with animated heart icon

### ⏰ Expiration Status Indicators
- Color-coded badges (Active, Expiring Soon, Expired)
- Automatic date comparison and status calculation
- Urgency-based sorting (expiring deals prioritized)
- Pulse animation for time-sensitive deals

### 🌍 Internationalization (i18n)
- Multi-language support with English and Spanish
- Language switcher in header for easy switching
- Persistent language preference using localStorage
- Automatic browser language detection
- Localized date formatting based on selected language
- Proper pluralization rules for each language
- All UI text translated including status badges, buttons, and messages

### 📲 Mobile-First Design
- Single column on mobile (<640px)
- Two columns on tablets (640px-1024px)
- Three columns on desktop (>1024px)
- Touch-optimized 48px minimum interactive elements
- Collapsible search/filter bar on scroll

## 🛠 Tech Stack

### Core Technologies
- **React 19.0** - UI framework with modern concurrent features
- **TypeScript 5.7** - Type-safe development
- **Vite 6.3** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework

### UI Components & Styling
- **shadcn/ui** - Accessible, customizable component library built on Radix UI
- **Shopify Polaris Web Components** - Shopify's official design system as web components
- **Framer Motion 12.6** - Declarative animations and gestures
- **Phosphor Icons 2.1** - Flexible icon family
- **Lucide React** - Additional icon set

### State Management & Data
- **GitHub Spark** - Real-time data persistence and KV storage
- **TanStack Query 5.83** - Powerful data fetching and caching
- **date-fns 3.6** - Modern date utility library

### Internationalization
- **i18next** - Internationalization framework
- **react-i18next** - React integration for i18next
- **i18next-browser-languagedetector** - Automatic language detection

### Development Tools
- **ESLint 9** - Code linting and quality
- **PostCSS** - CSS transformations
- **TypeScript ESLint** - TypeScript-specific linting

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm** 9.x or later (comes with Node.js)
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/most-want-tech/routicket-base-project.git
   cd routicket-base-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Quick Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run optimize # Optimize dependencies
```

## 💻 Development

### Project Structure

```
routicket-base-project/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── DealCard.tsx    # Individual deal card
│   │   ├── DealDetailModal.tsx  # Deal details modal
│   │   ├── SearchBar.tsx   # Search input component
│   │   └── EmptyState.tsx  # Empty state illustrations
│   ├── hooks/              # Custom React hooks
│   │   └── use-mobile.ts   # Mobile detection hook
│   ├── lib/                # Utility functions
│   │   ├── deals.ts        # Deal processing logic
│   │   ├── types.ts        # TypeScript type definitions
│   │   └── utils.ts        # General utilities
│   ├── styles/             # Global styles
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global CSS
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
├── components.json         # shadcn/ui configuration
├── PRD.md                  # Product Requirements Document
└── README.md               # This file
```

### Key Files

- **App.tsx**: Main application logic, state management, and layout
- **lib/deals.ts**: Core business logic for deal filtering, sorting, and status calculation
- **lib/types.ts**: TypeScript interfaces and type definitions
- **components/ui/**: Reusable UI components from shadcn/ui library

### Architecture Overview

The application follows a component-based architecture with clear separation of concerns:

1. **Presentation Layer** (`components/`): Reusable UI components
2. **Business Logic Layer** (`lib/`): Pure functions for data processing
3. **State Management**: React hooks + GitHub Spark KV storage
4. **Data Flow**: Props down, events up pattern

### Design System

The application uses a triadic color scheme with excellent accessibility:

- **Primary**: Deep Coral (#FF6B6B) - CTAs and important actions
- **Secondary**: Teal (#4ECDC4) - Success states and secondary buttons
- **Accent**: Vibrant Purple (#A855F7) - Favorites and special highlights
- **Warning**: Amber (#FFD93D) - Expiring soon badges

All color pairings meet WCAG AA standards with contrast ratios of 4.5:1 or higher.

### Typography

- **Headings**: Poppins (Geometric, friendly)
- **Body**: Inter (Clean, modern, excellent readability)
- Mobile-first font sizes with responsive scaling

### Adding New Features

1. **Create component** in `src/components/`
2. **Add types** to `src/lib/types.ts` if needed
3. **Implement logic** in `src/lib/` for business logic
4. **Update App.tsx** to integrate the feature
5. **Add styles** using Tailwind utility classes
6. **Test** in development mode before building

### Code Style

- Use TypeScript for all new files
- Follow React best practices (hooks, functional components)
- Use Tailwind classes for styling (avoid inline styles)
- Keep components small and focused (Single Responsibility Principle)
- Extract reusable logic into custom hooks
- Document complex logic with comments

## 🎨 Customization

### Modifying Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: 'oklch(0.68 0.18 15)',  // Deep Coral
      secondary: 'oklch(0.75 0.10 185)', // Teal
      accent: 'oklch(0.64 0.24 300)',   // Vibrant Purple
    }
  }
}
```

### Adding Components

#### shadcn/ui Components

Use shadcn/ui CLI to add new components:

```bash
npx shadcn@latest add [component-name]
```

#### Shopify Polaris Web Components

Polaris web components are available globally throughout the application via CDN. You can use them directly in your JSX:

```tsx
<s-section heading="My Section">
  <s-text-field name="example" placeholder="Enter text..." />
  <s-paragraph>This is a Polaris paragraph component.</s-paragraph>
</s-section>
```

For TypeScript support, declare the custom elements in your component:

```tsx
declare global {
  namespace JSX {
    interface IntrinsicElements {
      's-section': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { heading?: string }, HTMLElement>
      's-text-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 
        name?: string
        placeholder?: string
      }, HTMLElement>
    }
  }
}
```

See `src/components/PolarisDemo.tsx` for a complete example of Polaris web components integration.

**Reference**: [Shopify Polaris Web Components Documentation](https://shopify.dev/docs/api/app-home/using-polaris-components)

### Modifying Deals Data

Update the `DEALS_DATA` array in `src/App.tsx` or connect to an external API by replacing the static data with API calls.

## 🌍 Internationalization & Localization

The application includes a robust, scalable internationalization (i18n) strategy using **i18next** and **react-i18next**.

### Supported Languages

- **English (en)** - Default language
- **Spanish (es)** - Full translation support

### Key Features

- **Automatic Language Detection**: Detects browser language preference on first visit
- **Persistent Preference**: Stores selected language in localStorage (`routicket-language`)
- **Language Switcher**: Globe icon in header for easy language switching
- **Localized Content**: All UI text, dates, pluralization rules, and formatting
- **Fallback Support**: Falls back to English if translation key is missing

### Architecture

The localization system uses a modular, maintainable structure:

```
src/
├── lib/
│   └── i18n.ts                    # i18n configuration
├── locales/
│   ├── en/
│   │   └── translation.json       # English translations
│   └── es/
│       └── translation.json       # Spanish translations
└── components/
    └── LanguageSwitcher.tsx       # Language selection UI
```

### Adding a New Language

1. **Create translation file**:
   ```bash
   mkdir src/locales/[language-code]
   touch src/locales/[language-code]/translation.json
   ```

2. **Add translations**: Copy structure from `src/locales/en/translation.json` and translate all keys

3. **Update i18n configuration** (`src/lib/i18n.ts`):
   ```typescript
   import newLangTranslation from '@/locales/[language-code]/translation.json'
   
   const resources = {
     en: { translation: enTranslation },
     es: { translation: esTranslation },
     [languageCode]: { translation: newLangTranslation } // Add this
   }
   
   export const SUPPORTED_LANGUAGES = ['en', 'es', '[language-code]'] as const
   
   export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
     en: 'English',
     es: 'Español',
     [languageCode]: 'Native Name' // Add this
   }
   ```

4. **Test**: Run dev server and verify all translations appear correctly

### Using Translations in Components

```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t, i18n } = useTranslation()
  
  // Simple translation
  return <h1>{t('app.title')}</h1>
  
  // With interpolation
  return <p>{t('header.dealsFound', { count: 5 })}</p>
  
  // Change language programmatically
  i18n.changeLanguage('es')
  
  // Get current language
  console.log(i18n.language) // 'en' or 'es'
}
```

### Translation File Structure

Translation files use nested JSON structure for organization:

```json
{
  "app": {
    "title": "RouTicket Deals",
    "subtitle": "Discover exclusive local offers"
  },
  "header": {
    "favorites": "Favorites",
    "dealsFound": "{{count}} deal found",
    "dealsFound_other": "{{count}} deals found"
  }
}
```

### Pluralization

i18next automatically handles pluralization. Use `_other` suffix for plural forms:

```json
{
  "deal.expiration.daysLeft": "{{count}} day left",
  "deal.expiration.daysLeft_other": "{{count}} days left"
}
```

### Date Localization

Dates are automatically formatted based on the selected language:

```typescript
// In components
const { i18n } = useTranslation()
const formattedDate = date.toLocaleDateString(i18n.language, options)

// Example output:
// English: "Nov 30, 2025"
// Spanish: "30 nov 2025"
```

### Best Practices

1. **Keep translation keys organized**: Group related translations under common prefixes
2. **Use descriptive keys**: `deal.status.active` instead of `status1`
3. **Avoid hardcoded text**: All user-facing text should use translation keys
4. **Test all languages**: Verify translations in all supported languages
5. **Handle missing keys**: Always provide fallback values or use the English translation
6. **Context matters**: Provide context in comments for ambiguous translations

### Configuration Options

The i18n configuration in `src/lib/i18n.ts` can be customized:

```typescript
i18n.init({
  resources,                  // Translation files
  fallbackLng: 'en',         // Fallback language
  supportedLngs: ['en', 'es'], // Supported languages
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
    lookupLocalStorage: 'routicket-language'
  },
  interpolation: {
    escapeValue: false       // React already escapes
  }
})
```

## 📦 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deployment Platforms

The application can be deployed to various platforms:

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to GitHub Pages

#### Custom Server
1. Build the project: `npm run build`
2. Serve the `dist/` folder with any static file server (nginx, Apache, etc.)

### Environment Variables

If you need to add environment variables:

1. Create `.env` file in the root
2. Add variables with `VITE_` prefix: `VITE_API_URL=https://api.example.com`
3. Access in code: `import.meta.env.VITE_API_URL`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

## 🙏 Acknowledgments

- Built with [GitHub Spark](https://githubnext.com/projects/spark)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Design system from [Shopify Polaris](https://polaris.shopify.com/)
- Icons from [Phosphor Icons](https://phosphoricons.com/)
- Design inspiration from modern deal marketplace platforms

## 📞 Support

For questions or issues:

- Open an [issue](https://github.com/most-want-tech/routicket-base-project/issues)
- Check the [PRD.md](PRD.md) for detailed product requirements
- Review existing issues and discussions

---

**Built with ❤️ using React, TypeScript, and GitHub Spark**
