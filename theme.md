# Voterax Theme System

## Typography

### Font Families
- **Display/Headings**: `Josefin Sans` (font-display)
- **UI Element/Sans**: `Thasadith` (font-sans)
- **Body Text**: `Lato` (font-body)

### Import
```css
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&family=Thasadith:wght@400;700&family=Lato:wght@300;400;700&display=swap');
```

## Color Palette

### Base
- **Background**: `hsl(0 0% 0%)` #000000
- **Foreground**: `hsl(0 0% 100%)` #FFFFFF

### Brand Colors
- **Primary**: `#6D28D9` (Violet)
  - Usage: Main actions, highlights, rings, glow effects
- **Secondary**: `#D97706` (Amber)
  - Usage: Accents, call-to-actions, highlights

### Surfaces
- **Card**: `hsl(0 0% 5%)`
- **Popover**: `hsl(0 0% 5%)`
- **Muted**: `hsl(240 4% 16%)`
- **Border**: `hsl(240 4% 16%)`
- **Input**: `hsl(240 4% 16%)`

### Functional
- **Destructive**: `hsl(0 62.8% 30.6%)`

### Utility Classes
- **Glass Panel**: `bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl`
- **Glass Card**: `bg-black/40 backdrop-blur-md border border-white/5 transition-all duration-300 hover:border-primary/50 hover:bg-black/60`
- **Text Glow**: `text-shadow: 0 0 20px rgba(109, 40, 217, 0.5)`

## Tailwind Configuration (Reference)

```js
// tailwind.config.js
theme: {
    container: {
        center: true,
        padding: "2rem",
    },
    extend: {
        colors: {
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
                DEFAULT: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))",
            },
            // ... see index.css for full mappings
        },
        fontFamily: {
            display: ["Josefin Sans", "sans-serif"],
            sans: ["Thasadith", "sans-serif"],
            body: ["Lato", "sans-serif"],
        }
    }
}
```
