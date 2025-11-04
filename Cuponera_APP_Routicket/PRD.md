# Planning Guide

A vibrant, mobile-first deals and coupons showcase that connects users with exciting local promotions through an immersive, card-based browsing experience.

**Experience Qualities**:
1. **Discoverable** - Users should feel excited browsing through deals with clear visual hierarchy and immediate understanding of value propositions
2. **Effortless** - Navigation and interaction require zero cognitive load; every action feels natural and immediate
3. **Delightful** - Subtle animations and thoughtful micro-interactions create moments of joy without hindering functionality

**Complexity Level**: Light Application (multiple features with basic state)
  - Single-purpose deal browsing with filtering, search, and detailed views. Includes state management for favorites and view preferences without requiring user accounts.

## Essential Features

### Deal Card Display
- **Functionality**: Displays promotional offers with image, title, expiration date, and quick actions
- **Purpose**: Provides immediate visual understanding of deal value and allows rapid browsing
- **Trigger**: Automatic on page load
- **Progression**: Load data → Parse dates → Sort by expiration → Render masonry grid → Enable interactions
- **Success criteria**: All deals visible, images load smoothly, expired deals clearly marked, touch targets minimum 44px

### Search and Filter System
- **Functionality**: Real-time text search across deal titles and category/status filters
- **Purpose**: Helps users quickly find relevant deals without scrolling through entire list
- **Trigger**: User types in search input or selects filter chip
- **Progression**: User input → Debounce 300ms → Filter array → Re-render grid with animation → Show result count
- **Success criteria**: Instant visual feedback, smooth transitions, clear "no results" state

### Deal Detail View
- **Functionality**: Full-screen modal showing complete deal information with action buttons
- **Trigger**: User taps/clicks on deal card
- **Progression**: Card tap → Expand animation → Show full details → Display CTA buttons → Enable share/favorite actions
- **Success criteria**: Smooth modal transition, all information accessible, easy to close, external links work correctly

### Favorites System
- **Functionality**: Users can mark deals as favorites and toggle favorite-only view
- **Purpose**: Allows users to save deals they're interested in for quick access later
- **Trigger**: User taps heart icon on card or in detail view
- **Progression**: Heart tap → Toggle state → Update KV storage → Visual confirmation → Update filter
- **Success criteria**: Instant visual feedback, persists across sessions, favorite count visible

### Expiration Status Indicators
- **Functionality**: Visual badges showing deal status (Active, Expiring Soon, Expired)
- **Purpose**: Communicates urgency and validity of deals at a glance
- **Trigger**: Automatic based on date comparison
- **Progression**: Parse fecha field → Compare to current date → Apply color-coded badge → Sort by urgency
- **Success criteria**: Clear visual distinction, accurate date parsing, expired deals at bottom

## Edge Case Handling
- **Missing Images**: Fallback gradient placeholder with deal initial letter, no broken image icons
- **Empty Search Results**: Friendly illustration with clear message and "Clear filters" action button
- **Long Deal Titles**: Truncate with ellipsis at 2 lines on cards, full text visible in detail view
- **Invalid Dates**: Display "No expiration" badge for malformed or missing dates
- **Network Errors**: Graceful degradation with cached data and retry mechanism with toast notification
- **No Favorites**: Empty state illustration encouraging users to heart deals they like

## Design Direction
The design should feel energetic and modern like a premium deals marketplace—playful enough to be engaging but serious enough to communicate real value. A rich, content-forward interface serves the visual nature of promotional imagery better than stark minimalism.

## Color Selection
Triadic color scheme that feels vibrant and energetic while maintaining excellent readability and accessibility for a deals/promotions platform.

- **Primary Color**: Deep Coral (#FF6B6B / oklch(0.68 0.18 15)) - Energetic and attention-grabbing, perfect for CTAs and important actions, communicates excitement and urgency
- **Secondary Colors**: 
  - Teal (#4ECDC4 / oklch(0.75 0.10 185)) - Calming balance to coral, used for success states and secondary buttons
  - Amber (#FFD93D / oklch(0.88 0.15 85)) - Warning color for "expiring soon" badges and highlights
- **Accent Color**: Vibrant Purple (#A855F7 / oklch(0.64 0.24 300)) - Used for favorites/hearts and special highlights, creates visual interest
- **Foreground/Background Pairings**:
  - Background (Warm White #FAFAF9 / oklch(0.98 0.005 60)): Dark Charcoal (#1A1A1A / oklch(0.20 0 0)) - Ratio 14.2:1 ✓
  - Card (Pure White #FFFFFF / oklch(1 0 0)): Dark Charcoal (#1A1A1A / oklch(0.20 0 0)) - Ratio 17.8:1 ✓
  - Primary (Deep Coral #FF6B6B / oklch(0.68 0.18 15)): White (#FFFFFF) - Ratio 4.7:1 ✓
  - Secondary (Teal #4ECDC4 / oklch(0.75 0.10 185)): Dark Charcoal (#1A1A1A) - Ratio 8.9:1 ✓
  - Accent (Vibrant Purple #A855F7 / oklch(0.64 0.24 300)): White (#FFFFFF) - Ratio 5.2:1 ✓
  - Muted (Light Gray #F5F5F4 / oklch(0.96 0.002 60)): Medium Gray (#525252 / oklch(0.40 0 0)) - Ratio 7.8:1 ✓

## Font Selection
Typography should feel modern and approachable with excellent readability at small sizes for mobile-first design, combining geometric sans-serif for headings with a humanist sans-serif for body text to balance personality with clarity.

- **Primary Font**: Inter - Clean, modern, excellent screen readability
- **Accent Font**: Poppins - Geometric, friendly, perfect for headings

- **Typographic Hierarchy**:
  - H1 (Page Title): Poppins Bold/32px/tight letter-spacing (-0.02em)
  - H2 (Section Headers): Poppins SemiBold/24px/tight letter-spacing (-0.01em)
  - H3 (Card Titles): Poppins Medium/18px/normal letter-spacing
  - Body (Descriptions): Inter Regular/16px/relaxed line-height (1.6)
  - Small (Metadata): Inter Medium/14px/normal line-height (1.5)
  - Caption (Badges): Inter SemiBold/12px/wide letter-spacing (0.05em)

## Animations
Animations should feel snappy and purposeful—enhancing the sense of premium quality without slowing down browsing speed, with particular focus on state changes that communicate system response.

- **Purposeful Meaning**: Cards scale up slightly on hover (1.02x) with a subtle lift shadow to communicate interactivity; badges pulse gently on "expiring soon" items to draw attention without being annoying
- **Hierarchy of Movement**: Hero section elements fade in sequentially on load; deal cards stagger their entrance for rhythm; filters slide in from top; modals scale from the tapped card position for spatial continuity

## Component Selection
- **Components**: 
  - Card (shadcn) - Deal display with custom hover states and glass-morphic styling
  - Dialog (shadcn) - Full-screen deal detail modal with custom animations
  - Input (shadcn) - Search bar with icon and clear button
  - Badge (shadcn) - Status indicators (active, expiring, expired) with custom colors
  - Button (shadcn) - Primary CTAs and secondary actions with proper sizing
  - Tabs (shadcn) - Filter toggles for All/Active/Favorites views
  - Scroll-area (shadcn) - Smooth scrolling for modal content
  - Separator (shadcn) - Visual division between content sections
  
- **Customizations**: 
  - Masonry-style card grid using CSS Grid with auto-fit
  - Custom floating search bar with blur backdrop
  - Animated favorite heart with bounce effect using framer-motion
  - Image lazy loading with skeleton placeholder
  - Custom gradient overlays on card images for text readability
  
- **States**: 
  - Buttons: Default shadow, hover lift + color shift, active press, focus ring (accent color), disabled opacity 40%
  - Cards: Default rested, hover lifted with increased shadow, active pressed, loading skeleton
  - Inputs: Default border-input, focus border-accent with ring, error border-destructive, filled state with clear button
  - Badges: Static for neutral states, pulse animation for urgent states
  
- **Icon Selection**: 
  - MagnifyingGlass (search input)
  - Heart/HeartFilled (favorites toggle)
  - MapPin (location links)
  - Clock (expiration time)
  - Tag (deal code)
  - ShareNetwork (share action)
  - X (close modal, clear search)
  - ArrowRight (CTA buttons)
  - Funnel (filter toggle)
  
- **Spacing**: 
  - Container padding: p-4 (mobile), p-6 (tablet), p-8 (desktop)
  - Card gaps: gap-4 (mobile), gap-6 (desktop)
  - Section spacing: space-y-6 (mobile), space-y-8 (desktop)
  - Button padding: px-6 py-3 (large CTAs), px-4 py-2 (secondary)
  - Modal padding: p-6 (mobile), p-8 (desktop)
  
- **Mobile**: 
  - Single column card grid on <640px
  - Two columns on 640px-1024px  
  - Three columns on >1024px
  - Fixed bottom sheet-style CTA bar on mobile detail view
  - Collapsible search/filter bar that slides up on scroll
  - Touch-optimized 48px minimum interactive elements
  - Swipe-to-close gesture on detail modal
