---
name: Aurelian Impact
colors:
  surface: '#fff8f2'
  surface-dim: '#e3d9cb'
  surface-bright: '#fff8f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fdf2e4'
  surface-container: '#f7ecde'
  surface-container-high: '#f1e7d9'
  surface-container-highest: '#ebe1d3'
  on-surface: '#1f1b12'
  on-surface-variant: '#4c4640'
  inverse-surface: '#353026'
  inverse-on-surface: '#faefe1'
  outline: '#7d766f'
  outline-variant: '#cec5bd'
  surface-tint: '#615e5b'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1d1b19'
  on-primary-container: '#878380'
  inverse-primary: '#cbc5c2'
  secondary: '#994629'
  on-secondary: '#ffffff'
  secondary-container: '#fe9572'
  on-secondary-container: '#762c11'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271900'
  on-tertiary-container: '#9c804f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e8e1dd'
  primary-fixed-dim: '#cbc5c2'
  on-primary-fixed: '#1d1b19'
  on-primary-fixed-variant: '#494644'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59d'
  on-secondary-fixed: '#390c00'
  on-secondary-fixed-variant: '#7a2f14'
  tertiary-fixed: '#ffdea8'
  tertiary-fixed-dim: '#e3c28c'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#594318'
  background: '#fff8f2'
  on-background: '#1f1b12'
  surface-variant: '#ebe1d3'
typography:
  display-lg:
    fontFamily: DM Serif Display
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-md:
    fontFamily: DM Serif Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: DM Serif Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: DM Serif Display
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
  headline-sm:
    fontFamily: DM Serif Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is centered on a premium editorial aesthetic that mirrors high-end business journalism and strategic consulting. It targets decision-makers who value clarity, intelligence, and a human touch over typical "tech-first" interfaces.

The style is **Editorial Minimalism** mixed with **Tactile Modernism**. It prioritizes generous whitespace, sophisticated serif typography, and a "physical" feel through subtle layering. The emotional response should be one of calm authority—moving away from the frantic pace of traditional SaaS and toward a reflective, deep-work environment. The interface feels like a well-crafted physical dossier, utilizing high-contrast color blocks and subtle depth to guide the user's focus.

## Colors

The palette is rooted in earth-toned sophistication, moving away from digital blues and greys.

- **Espresso (#171513):** Used for primary text and high-contrast background sections to ground the design.
- **Warm Ivory (#F7F3EC):** The primary canvas color. It provides a softer, more readable experience than pure white.
- **Sand (#E8DED0):** Used for secondary surfaces, borders, and UI backgrounds that need subtle distinction from the ivory base.
- **Terracotta (#C96B4B):** The primary action color. Use this for call-to-actions, primary buttons, and critical indicators.
- **Muted Gold (#B89A67):** Used for decorative accents, secondary highlights, and achievement markers.
- **Muted Sage (#A7AD98):** Reserved for success states or tertiary data points where a natural, calming tone is required.

## Typography

This design system uses a high-contrast typographic pair to create an editorial feel.

- **Display & Headlines:** Use **DM Serif Display**. It should be set with tight letter-spacing for large sizes to maintain a sophisticated, "ink-on-paper" look.
- **Body & UI:** Use **Manrope**. Its geometric but warm structure ensures legibility in data-heavy assessment views.
- **Scale:** Maintain a strict hierarchy. Large displays should have significant "air" around them. Labels are always uppercase with increased tracking to differentiate them from body copy.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to preserve editorial integrity, transitioning to a fluid model on mobile.

- **Grid:** A 12-column system with wide 32px gutters. This creates a spacious, breathable feel.
- **Rhythm:** Use an 8px base unit. Section gaps should be aggressive (120px+) to allow the content to "own" the screen.
- **Composition:** Asymmetric layouts are encouraged—e.g., placing a headline in a 4-column span and the body copy in a 6-column span with a 2-column offset. 
- **Mobile:** Margins reduce to 20px, and typography scales down to prevent excessive wrapping.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layering** and **Soft Ambient Shadows**.

- **Surfaces:** Most UI sits on the Warm Ivory background. Secondary containers use the Sand color with no shadow to indicate a "recessed" or secondary area.
- **Tactile Cards:** Interactive tiles use a very soft, diffused shadow (15% opacity Espresso, 30px blur) to appear slightly lifted from the page. On hover, the shadow should deepen slightly to mimic a physical press.
- **Navigation:** Top navigation bars and floating menus utilize **Glassmorphism**. Use a background blur (20px) with 80% opacity Warm Ivory to maintain legibility while feeling light and modern.
- **Borders:** Use 1px borders in Espresso at 10% opacity for subtle definition between elements when shadows aren't appropriate.

## Shapes

The shape language is **Soft (0.25rem)**. This provides enough roundness to feel modern and human without the "bubbly" appearance of consumer apps. 

- **Cards/Containers:** Use 0.5rem (rounded-lg) for main assessment tiles.
- **Buttons:** Use 0.25rem (standard) for a structured, professional look.
- **Inputs:** Maintain sharp-yet-soft 0.25rem corners.
- **Large Sections:** Background color blocks (e.g., an Espresso footer or header) should remain sharp (0px) to anchor the page edges.

## Components

- **Buttons:** Primary buttons use the Terracotta background with Warm Ivory text. They should be large (min-height 56px) with ample horizontal padding. Secondary buttons use an Espresso outline (20% opacity) with Espresso text.
- **Assessment Tiles:** Large cards used for reality assessment questions. Background is pure White or Warm Ivory, featuring a subtle shadow and 1px Sand border. 
- **Inputs:** Field labels use `label-md` (uppercase Manrope). Input fields are underline-only or have a very light Sand background to minimize visual clutter.
- **Chips/Tags:** Used for categorization. These are small, uppercase, with Muted Gold or Sage backgrounds at 15% opacity and matching dark text.
- **Progress Indicators:** Use a thin, elegant line at the top of the viewport. The progress fill should be Terracotta.
- **Glass Navigation:** A sticky header with a subtle 1px border at the bottom. It uses a high-blur backdrop to let content scroll elegantly beneath it.