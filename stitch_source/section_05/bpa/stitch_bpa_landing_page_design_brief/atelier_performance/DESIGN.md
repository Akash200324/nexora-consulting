---
name: Atelier Performance
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3938'
  surface-container-lowest: '#0f0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2b2a29'
  surface-container-highest: '#363434'
  on-surface: '#e6e2e0'
  on-surface-variant: '#cec5bd'
  inverse-surface: '#e6e2e0'
  inverse-on-surface: '#313030'
  outline: '#978f88'
  outline-variant: '#4c4640'
  surface-tint: '#cbc5c2'
  primary: '#cbc5c2'
  on-primary: '#33302e'
  primary-container: '#171513'
  on-primary-container: '#837f7b'
  inverse-primary: '#615e5b'
  secondary: '#c9c6c0'
  on-secondary: '#31302c'
  secondary-container: '#484742'
  on-secondary-container: '#b8b5ae'
  tertiary: '#cfc5b8'
  on-tertiary: '#353026'
  tertiary-container: '#19150d'
  on-tertiary-container: '#867e73'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e8e1dd'
  primary-fixed-dim: '#cbc5c2'
  on-primary-fixed: '#1d1b19'
  on-primary-fixed-variant: '#494644'
  secondary-fixed: '#e6e2db'
  secondary-fixed-dim: '#c9c6c0'
  on-secondary-fixed: '#1c1c18'
  on-secondary-fixed-variant: '#484742'
  tertiary-fixed: '#ebe1d3'
  tertiary-fixed-dim: '#cfc5b8'
  on-tertiary-fixed: '#1f1b12'
  on-tertiary-fixed-variant: '#4c463c'
  background: '#141313'
  on-background: '#e6e2e0'
  surface-variant: '#363434'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 80px
    fontWeight: '600'
    lineHeight: 96px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 60px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  editorial-accent:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-mobile: 24px
  margin-desktop: 64px
  section-gap: 128px
---

## Brand & Style

The design system is rooted in high-end editorial aesthetics and premium management consulting. It targets high-level executives and decision-makers, evoking a sense of calm authority, meticulous craftsmanship, and timeless reliability.

The design style is a blend of **Minimalism** and **Modern Editorial**. It prioritizes vast negative space, deliberate typographic scales, and thin, structural dividers to create a cinematic atmosphere. Every interaction is designed to feel intentional and weighted, moving away from "app-like" density toward a "publication-like" experience.

## Colors

The palette is anchored in a "Deep Espresso" dark mode, providing a sophisticated, low-light environment that reduces cognitive load and enhances the cinematic feel. 

- **Primary Background:** Deep Espresso (#171513) serves as the canvas.
- **Primary Typography:** Warm Ivory (#F7F3EC) provides a soft, high-contrast readability that is less harsh than pure white.
- **Secondary Surfaces:** Sand (#E8DED0) is used for subtle container backgrounds or when a section needs a distinct lift from the primary dark base.
- **Action/CTA:** Terracotta (#C96B4B) is used sparingly for primary actions to draw the eye with warmth and energy.
- **Structural Accents:** Muted Gold (#B89A67) is reserved for hairline borders, dividers, and premium iconography, reinforcing the high-end consulting aesthetic.

## Typography

This design system utilizes a tri-font hierarchy to create editorial depth. 

- **Display Serif (Playfair Display):** Used for large-scale hero statements and section titles. It conveys prestige and tradition.
- **Primary Sans (Plus Jakarta Sans):** The workhorse for all functional elements. It provides modern clarity for body copy, navigation, and data points.
- **Accent Serif (Libre Caslon Text):** Used for pull quotes, short descriptive phrases, or "insight" callouts. *Note: Libre Caslon Text is substituted for Cormorant Garamond to maintain the available font palette while preserving the elegant editorial italic style.*

All headlines should favor tighter letter spacing, while labels and small caps should have generous tracking to feel balanced and expansive.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model with generous vertical breathing room. The 12-column grid is centered on a 1280px container, utilizing wide 32px gutters to prevent content crowding.

- **Vertical Rhythm:** Sections are separated by large "Section Gaps" (128px) to emphasize the cinematic pacing.
- **Mobile Adaption:** On mobile devices, the grid collapses to 4 columns. Hero text sizes are significantly reduced, and margins are tightened to 24px to maximize screen real estate.
- **Alignment:** Prefer asymmetrical compositions for editorial sections, utilizing empty columns to create a sense of exclusivity and "white space luxury."

## Elevation & Depth

This design system avoids heavy drop shadows and typical elevation z-indexes. Instead, it uses **Tonal Layers** and **Structural Outlines**.

- **Depth via Borders:** High-end surfaces are defined by 1px "Muted Gold" borders rather than shadows.
- **Surface Tiering:** Elements sit directly on the Deep Espresso background or on a "Sand" container with very low opacity (e.g., 5-10%) to create a subtle lift.
- **Glassmorphism:** Use very light backdrop blurs (8px to 16px) only on persistent navigation bars or modal overlays to maintain a sense of environmental depth without sacrificing the minimal aesthetic.

## Shapes

The shape language is strictly **Sharp (0px)**. All containers, buttons, and input fields must use 90-degree corners to align with the architectural and structural nature of executive business consulting. 

Occasional use of soft roundedness (0.25rem) is permitted only for avatars or small status indicators (chips), but all primary structural elements must remain rectangular.

## Components

### Buttons
Primary buttons use a solid Terracotta fill with Warm Ivory text. Secondary buttons use a Muted Gold 1px border with no fill. All buttons are rectangular (0px radius) and use `label-caps` typography.

### Cards
Cards are minimalist with no shadows. They feature a 1px border in Muted Gold. On hover, the border weight remains the same but the opacity increases, or the background shifts slightly to a very dark grey to indicate interactivity.

### Input Fields
Inputs are underlined only, or fully enclosed by a thin Muted Gold border. They use the Primary Sans for input text and `label-caps` for floating labels.

### Lists & Dividers
Lists should be separated by full-width 1px hairline dividers in Muted Gold. Bullet points are replaced by small geometric squares or thin horizontal dashes.

### Premium Accents
- **Progress Bars:** Thin, 2px lines using Terracotta for the fill and a low-opacity Muted Gold for the track.
- **Navigation:** Top-tier navigation uses high letter-spacing and minimal icons.