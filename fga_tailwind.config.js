
/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '.fga-wrapper',
  content: [
    "./templates/assessment/section_05/fga.html"
  ],
  theme: {
    extend: {
      "colors":{
        "espresso": "#171513",
        "ivory": "#F7F3EC",
        "sand": "#E8DED0",
        "terracotta": "#C96B4B",
        "gold": "#B89A67"
      },
      "spacing":{
        "gutter":"32px",
        "margin-edge":"64px",
        "unit":"8px",
        "section-gap":"128px",
        "container-max":"1280px"
      },
      "fontFamily":{
        "headline-md":["Playfair Display", "Georgia", "serif"],
        "body-md":["Plus Jakarta Sans", "sans-serif"],
        "label-md":["Plus Jakarta Sans", "sans-serif"],
        "display-lg":["Playfair Display", "Georgia", "serif"],
        "eyebrow":["Cormorant Garamond", "Georgia", "serif"],
        "headline-lg":["Playfair Display", "Georgia", "serif"],
        "body-lg":["Plus Jakarta Sans", "sans-serif"]
      },
      "fontSize":{
        "headline-md":["32px",{"lineHeight":"1.3","fontWeight":"500"}],
        "body-md":["16px",{"lineHeight":"1.6","fontWeight":"400"}],
        "label-md":["14px",{"lineHeight":"1.4","letterSpacing":"0.05em","fontWeight":"500"}],
        "display-lg":["72px",{"lineHeight":"1.1","letterSpacing":"-0.02em","fontWeight":"700"}],
        "eyebrow":["12px",{"lineHeight":"1.0","letterSpacing":"0.2em","fontWeight":"700"}],
        "headline-lg":["48px",{"lineHeight":"1.2","fontWeight":"600"}],
        "body-lg":["18px",{"lineHeight":"1.6","fontWeight":"400"}]
      }
    }
  }
}
