
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/assessment/assessment_section_05.html",
    "./templates/components/navbar.html"
  ],
  theme: {
    extend: {
      "colors":{
        "surface-container-high":"#f1e7d9","error-container":"#ffdad6","on-surface":"#1f1b12","on-background":"#1f1b12",
        "on-primary-fixed-variant":"#494644","on-surface-variant":"#4c4640","inverse-primary":"#cbc5c2","outline":"#7d766f",
        "on-primary":"#ffffff","surface-variant":"#ebe1d3","secondary-fixed":"#ffdbd0","on-tertiary":"#ffffff",
        "inverse-on-surface":"#faefe1","surface-bright":"#fff8f2","primary-fixed":"#e8e1dd","tertiary":"#000000",
        "on-error-container":"#93000a","on-primary-fixed":"#1d1b19","on-tertiary-fixed":"#271900","on-primary-container":"#878380",
        "on-secondary-fixed":"#390c00","primary":"#000000","background":"#fff8f2","surface-dim":"#e3d9cb",
        "surface-container-low":"#fdf2e4","on-tertiary-fixed-variant":"#594318","surface":"#fff8f2","surface-container":"#f7ecde",
        "surface-container-lowest":"#ffffff","inverse-surface":"#353026","on-secondary-fixed-variant":"#7a2f14","on-error":"#ffffff",
        "surface-tint":"#615e5b","tertiary-fixed":"#ffdea8","primary-container":"#1d1b19","on-secondary":"#ffffff",
        "surface-container-highest":"#ebe1d3","secondary-container":"#fe9572","outline-variant":"#cec5bd","primary-fixed-dim":"#cbc5c2",
        "secondary-fixed-dim":"#ffb59d","secondary":"#994629","tertiary-fixed-dim":"#e3c28c","error":"#ba1a1a","on-secondary-container":"#762c11",
        "on-tertiary-container":"#9c804f","tertiary-container":"#271900"
      },
      "borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},
      "spacing":{"margin-desktop":"64px","margin-mobile":"20px","gutter":"32px","container-max":"1280px","unit":"8px","section-gap":"120px"},
      "fontFamily":{
        "label-sm":["Manrope"],"body-lg":["Manrope"],"body-md":["Manrope"],"headline-sm":["DM Serif Display"],
        "headline-lg":["DM Serif Display"],"label-md":["Manrope"],"headline-lg-mobile":["DM Serif Display"],
        "display-lg":["DM Serif Display"],"display-md":["DM Serif Display"]
      },
      "fontSize":{
        "label-sm":["12px",{"lineHeight":"16px","letterSpacing":"0.08em","fontWeight":"700"}],
        "body-lg":["20px",{"lineHeight":"32px","fontWeight":"400"}],
        "body-md":["16px",{"lineHeight":"26px","fontWeight":"400"}],
        "headline-sm":["24px",{"lineHeight":"32px","fontWeight":"400"}],
        "headline-lg":["32px",{"lineHeight":"40px","fontWeight":"400"}],
        "label-md":["14px",{"lineHeight":"20px","letterSpacing":"0.05em","fontWeight":"600"}],
        "headline-lg-mobile":["28px",{"lineHeight":"36px","fontWeight":"400"}],
        "display-lg":["72px",{"lineHeight":"80px","letterSpacing":"-0.02em","fontWeight":"400"}],
        "display-md":["48px",{"lineHeight":"56px","letterSpacing":"-0.01em","fontWeight":"400"}]
      }
    }
  }
}
