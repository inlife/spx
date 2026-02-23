# Brutalist Design Refactor

## Summary

Radical redesign of Shortlink from generic blue-purple SaaS aesthetic to high-contrast typographic brutalism. Black background, white text, emerald-600 accent on interactive elements only. Satoshi + JetBrains Mono typography. No cards, no gradients, no shadows, no emojis.

## Design Decisions

- **Approach:** Typographic Brutalism (chosen over Swiss Grid Minimalism and Terminal Aesthetic)
- **Theme:** High contrast B&W with emerald (#059669) as sole accent
- **Typography:** Satoshi (display/body) + JetBrains Mono (code/URLs/input)
- **Layout:** Single-column, top-to-bottom, max-w-2xl

## Global Foundation

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Background | zinc-950 (#09090b) | Page background |
| Primary text | white / zinc-50 | Headlines, labels |
| Secondary text | zinc-500 | Descriptions, muted text |
| Tertiary text | zinc-400 | Body copy |
| Muted text | zinc-600 | Footer links |
| Accent | emerald-600 (#059669) | CTA button, active toggles, hover states |
| Accent hover | emerald-500 | Button hover |
| Border | zinc-800 | Structural dividers |
| Surface | zinc-900 | Input field background |
| Input border | zinc-700 | Input field border |

### Typography
- **Satoshi** (sans-serif): All UI text, headlines, labels
- **JetBrains Mono** (monospace): URL input, code snippets, before/after example, footer links
- Headlines: `text-4xl md:text-5xl tracking-tighter leading-none font-bold`
- Body: `text-base text-zinc-400 leading-relaxed max-w-[55ch]`
- Code/mono: `font-mono text-sm`

### Layout
- Single column: `max-w-2xl mx-auto`
- No cards, no shadows, no gradients, no blobs
- Section dividers: `border-t border-zinc-800` or `py-16` negative space
- Mobile: `px-5`
- Full height: `min-h-[100dvh]`

## What Gets Deleted
- All gradient orbs/blob animations and related CSS keyframes
- All blue-purple gradient text (`bg-gradient-to-r from-blue-600 to-purple-600`)
- All emojis in markup
- All card containers with `shadow-sm`, `bg-white`, `border-gray-200`
- The 3-column use case grid
- Inter font import from layout.js and globals.css
- The "Free / No Signup / Instant" pill badge
- The trust section blue callout
- The expandable "How does this work?" details element

## Page Designs

### Header (shared)
- Left: Monochrome white logo SVG (remove gradient fill) + "Shortlink" in Satoshi bold white
- Right: "About" / "Contact" in `text-zinc-500 hover:text-emerald-500`
- Bottom border: `border-b border-zinc-800`
- Padding: `py-5 px-5`, content in `max-w-2xl mx-auto`

### Footer (shared)
- Top border: `border-t border-zinc-800 py-6`
- Single line of monospace links: About / Contact / Source / by inlife
- Style: `text-zinc-600 hover:text-emerald-500 text-xs font-mono`
- No emojis, no hearts

### Homepage (`/`)
1. **Subtitle**: `"Paste a custom scheme URL. Get a universal link."` in `text-zinc-500 text-sm font-mono`
2. **Input**: Oversized, `bg-zinc-900 border border-zinc-700 text-white font-mono text-lg px-5 py-4 rounded-none`, focus: `border-emerald-500`
3. **Toggle rows**: Below input, separated by `border-t border-zinc-800`
   - "Auto-open" toggle: label left `text-sm text-zinc-300`, square toggle right (off: `bg-zinc-700`, on: `bg-emerald-600`)
   - "Shorten link" toggle: same, conditionally shown
4. **CTA button**: Full-width, `bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 text-sm tracking-wide uppercase`
5. **Copy confirmation**: Button text changes to "Copied" (no emoji)
6. **Before/after example**: Below tool, `py-12` or `border-t` separated
   - Two monospace lines showing broken vs. working URL
   - Arrow in `text-emerald-500`

### About Page (`/about`)
- Large heading: `"About"` left-aligned, `text-4xl tracking-tighter font-bold text-white`
- Sections as raw text separated by `border-t border-zinc-800`, each `py-8`:
  1. What (2-3 sentences)
  2. Why (2-3 sentences)
  3. How (numbered monospace list, 3 steps)
  4. Stack (single monospace line: `Next.js 15 / React 19 / Tailwind CSS / Vercel`)
  5. Source (emerald GitHub link)

### Contact Page (`/contact`)
- Same structure as About
- Raw text with contact info/links

### Redirect Pages (`/[type]/[url]` and `/s/[data]`)
- Centered on dark background
- Auto-redirect: `"Redirecting..."` in `text-zinc-400 font-mono` + URL in monospace
- Manual mode: Same + emerald `"Open Link"` button
- Error: `"Invalid link"` + homepage link
- No decorative elements

## Taste Skill Compliance

Per `skills/taste.md`, this design:
- Replaces Inter with Satoshi + JetBrains Mono (Rule 1, Section 7)
- Eliminates purple/blue AI aesthetic (Rule 2, The Lila Ban)
- Uses left-aligned single-column instead of centered hero (Rule 3)
- Removes cards in favor of border-t/negative space (Rule 4)
- Avoids `h-screen` in favor of `min-h-[100dvh]` (Section 2)
- Eliminates all emojis (Anti-Emoji Policy)
- No 3-column card layouts (Section 7)
- No gradient text, no neon glows, no pure black (uses zinc-950)
- No generic names or filler copy
