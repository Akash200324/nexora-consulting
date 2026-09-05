/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../stitch_source/section_05/bpa/stitch_bpa_landing_page_design_brief/bpa_landing_page_desktop/code.html",
    "../templates/assessment/section_05/bpa.html"
  ],
  important: '.bpa-wrapper',
  theme: {
    extend: {
      "colors":{
        "primary-fixed":"#e8e1dd","secondary-fixed":"#e6e2db","secondary":"#c9c6c0","tertiary-fixed":"#ebe1d3","surface-container-high":"#2b2a29","surface-tint":"#cbc5c2","surface-variant":"#363434","error-container":"#93000a","on-primary-container":"#837f7b","on-surface":"#e6e2e0","outline":"#978f88","inverse-primary":"#615e5b","tertiary":"#cfc5b8","inverse-surface":"#e6e2e0","error":"#ffb4ab","on-primary":"#33302e","on-primary-fixed":"#1d1b19","on-secondary-fixed":"#1c1c18","surface-bright":"#3a3938","background":"#141313","on-surface-variant":"#cec5bd","surface-container-low":"#1c1b1b","surface-container":"#201f1f","outline-variant":"#4c4640","on-secondary":"#31302c","secondary-container":"#484742","on-primary-fixed-variant":"#494644","tertiary-container":"#19150d","on-tertiary-fixed-variant":"#4c463c","primary-container":"#171513","on-tertiary-fixed":"#1f1b12","on-secondary-container":"#b8b5ae","tertiary-fixed-dim":"#cfc5b8","on-error-container":"#ffdad6","surface-container-highest":"#363434","surface-container-lowest":"#0f0e0e","primary":"#cbc5c2","on-secondary-fixed-variant":"#484742","primary-fixed-dim":"#cbc5c2","surface-dim":"#141313","on-tertiary-container":"#867e73","on-background":"#e6e2e0","secondary-fixed-dim":"#c9c6c0","surface":"#141313","on-error":"#690005","on-tertiary":"#353026","inverse-on-surface":"#313030"
      },
      "borderRadius":{
        "DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"
      },
      "spacing":{
        "gutter":"32px","section-gap":"128px","margin-desktop":"64px","margin-mobile":"24px","container-max":"1280px","unit":"8px"
      },
      "fontFamily":{
        "display-hero":["Playfair Display"],"headline-lg-mobile":["Playfair Display"],"editorial-accent":["Libre Caslon Text"],"label-caps":["Plus Jakarta Sans"],"body-md":["Plus Jakarta Sans"],"body-lg":["Plus Jakarta Sans"],"display-hero-mobile":["Playfair Display"],"headline-lg":["Playfair Display"]
      },
      "fontSize":{
        "display-hero":["80px",{"lineHeight":"96px","letterSpacing":"-0.02em","fontWeight":"600"}],
        "headline-lg-mobile":["32px",{"lineHeight":"40px","fontWeight":"500"}],
        "editorial-accent":["24px",{"lineHeight":"32px","fontWeight":"400"}],
        "label-caps":["12px",{"lineHeight":"16px","letterSpacing":"0.1em","fontWeight":"600"}],
        "body-md":["16px",{"lineHeight":"24px","fontWeight":"400"}],
        "body-lg":["18px",{"lineHeight":"28px","fontWeight":"400"}],
        "display-hero-mobile":["48px",{"lineHeight":"56px","letterSpacing":"-0.01em","fontWeight":"600"}],
        "headline-lg":["48px",{"lineHeight":"60px","fontWeight":"500"}]
      }
    }
  }
}
