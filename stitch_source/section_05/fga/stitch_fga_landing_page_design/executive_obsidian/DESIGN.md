---
name: Executive Obsidian
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#ccc6bb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#959086'
  outline-variant: '#4a473e'
  surface-tint: '#cec6b0'
  primary: '#ffffff'
  on-primary: '#353021'
  primary-container: '#ebe2cb'
  on-primary-container: '#6a6452'
  inverse-primary: '#645e4c'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#4a4949'
  on-secondary-container: '#bab8b7'
  tertiary: '#ffffff'
  on-tertiary: '#223240'
  tertiary-container: '#d4e4f7'
  on-tertiary-container: '#566676'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ebe2cb'
  primary-fixed-dim: '#cec6b0'
  on-primary-fixed: '#1f1b0e'
  on-primary-fixed-variant: '#4c4736'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#d4e4f7'
  tertiary-fixed-dim: '#b8c8da'
  on-tertiary-fixed: '#0d1d2a'
  on-tertiary-fixed-variant: '#394857'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  eyebrow:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.2em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-edge: 64px
  section-gap: 128px
---

## Brand & Style
The design system is engineered for high-stakes business consulting, evoking an atmosphere of exclusivity, strategic depth, and quiet authority. The aesthetic leans into **Editorial Minimalism** with a **Cinematic** edge, favoring high-contrast compositions and dramatic use of negative space over decorative elements.

The visual narrative centers on "The Inner Circle"—a space where clarity meets ambition. Every interface element must feel intentional and architectural. We avoid "bubbly" UI patterns in favor of sharp, professional lines and subtle, expensive-feeling transitions that mirror the precision of elite business coaching.

## Colors
The palette is rooted in a deep, layered dark mode. **Rich Obsidian (#121212)** serves as the primary canvas, providing a sense of grounded stability. **Champagne (#F3EAD3)** is used for high-contrast typography and primary actions, lending a premium, editorial feel.

**Slate Blue (#8A9AAB)** acts as a sophisticated accent for secondary data points and interactive hints. We use a range of tonal greys to create subtle hierarchy without breaking the monolithic feel of the dark background. Vibrant or "neon" colors are strictly prohibited; status colors (success/error) should be desaturated and used sparingly.

## Typography
The typography strategy relies on the tension between a high-contrast serif and a modern, technical sans-serif. **Bodoni Moda** is the voice of the brand—used for headlines to provide a literary, prestigious quality. **Hanken Grotesk** provides the functional balance, used for body text and labels.

Crucial to this system is the **Eyebrow** style: always uppercase with wide tracking, used to categorize content and provide structural cues. For mobile, `display-lg` should scale down to `36px` to maintain legibility while preserving the high-contrast weight.

## Layout & Spacing
This design system utilizes a **Structured 12-Column Grid** with generous gutters. Layouts should embrace **Asymmetry**; for example, a headline might span the first 8 columns while the supporting body text occupies the last 4, creating an editorial "white space" block in the middle.

- **Desktop:** 64px outer margins and 128px vertical gaps between major content sections to allow the design to breathe.
- **Tablet:** Reduce vertical gaps to 80px and outer margins to 32px.
- **Mobile:** Transition to a 4-column grid with 16px gutters; large serifs should be left-aligned to maintain the "columnar" look of a premium broadsheet.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Ghost Outlines** rather than traditional shadows. 

1. **Surface 0:** The deepest obsidian background.
2. **Surface 1:** A slightly lighter charcoal (#1A1A1A) for cards and containers.
3. **Ghost Outlines:** Containers use 1px solid borders in low-opacity Slate Blue (10-15% opacity) to define boundaries without adding visual weight.

Avoid blurs and glows. The goal is "Sharp Precision." When an element is raised (hover state), it should utilize a stroke weight increase or a subtle shift in background tone rather than a drop shadow.

## Shapes
The shape language is strictly **Architectural and Sharp**. We use a `0px` border radius across all primary components (buttons, cards, inputs). This reinforces the "unyielding" and "professional" nature of the FGA brand. 

In rare instances where a circular element is required (e.g., a founder's headshot), it should be framed within a square container or a thin circular stroke to maintain the rigid geometric theme.

## Components
- **Primary Buttons:** Sharp-edged, solid Champagne background with Obsidian text. Hover state: Inverse colors (Obsidian background, Champagne stroke).
- **Diagnostic Cards:** Surface 1 background with a 1px ghost border. Use the Eyebrow typography for the category and Bodoni Moda for the score/result.
- **Editorial Timelines:** A vertical 1px line in Slate Blue. Milestones are marked by small solid Champagne squares (not circles).
- **Accordion FAQs:** Minimalist text-only triggers. On expansion, the content reveals itself through a subtle vertical slide-and-fade, using Hanken Grotesk for the answer.
- **Input Fields:** Bottom-border only (1px Slate Blue). Labels utilize the wide-tracked Eyebrow style. Focus state: the bottom border shifts to Champagne.
- **Imagery:** All photography must be desaturated or high-contrast B&W. Use "letterbox" aspect ratios (21:9) for hero sections to enhance the cinematic feel.