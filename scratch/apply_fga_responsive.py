import re

path = r'c:\Users\AKASH\OneDrive\Desktop\Nexora Consulting\templates\assessment\section_05\fga.html'
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

# Margins and Paddings globally
html = html.replace('px-margin-edge', 'px-5 md:px-margin-edge')
html = html.replace('py-section-gap', 'py-16 md:py-section-gap')
html = html.replace('py-24', 'py-16 md:py-24')

# Typography scaling
html = html.replace('font-display-lg fga-anim-text text-display-lg text-[#F7F3EC]', 'font-display-lg fga-anim-text text-5xl md:text-display-lg text-[#F7F3EC]')
html = html.replace('font-headline-lg fga-anim-text text-headline-lg', 'font-headline-lg fga-anim-text text-3xl md:text-headline-lg')
html = html.replace('font-headline-lg text-headline-lg', 'font-headline-lg text-3xl md:text-headline-lg')
html = html.replace('font-display-md', 'text-4xl md:text-display-md')

# Grid gaps
html = html.replace('gap-gutter', 'gap-10 md:gap-gutter')

# Specific section tweaks
# Hero
html = html.replace('pt-[120px]', 'pt-[100px] md:pt-[120px]')
html = html.replace('max-w-4xl', 'max-w-[90%] md:max-w-4xl')

# Shift cards padding
html = html.replace('p-12 lg:p-16', 'p-6 md:p-12 lg:p-16')

# Methodology Timeline line
html = html.replace('border-l border-[#B89A67]/30 absolute left-[27px]', 'border-l border-[#B89A67]/30 absolute left-[23px] md:left-[27px]')
html = html.replace('w-14 h-14', 'w-12 h-12 md:w-14 md:h-14')

# Outcomes cards padding
html = html.replace('p-8 border border-[#B89A67]/30', 'p-6 md:p-8 border border-[#B89A67]/30')

# FAQ padding
html = html.replace('p-6 flex', 'p-4 md:p-6 flex')
html = html.replace('px-6 pb-6', 'px-4 pb-4 md:px-6 md:pb-6')

# Final check for double replacements
html = html.replace('px-5 md:px-5 md:px-margin-edge', 'px-5 md:px-margin-edge')
html = html.replace('py-16 md:py-16 md:py-section-gap', 'py-16 md:py-section-gap')
html = html.replace('text-3xl md:text-3xl md:text-headline-lg', 'text-3xl md:text-headline-lg')
html = html.replace('text-4xl md:text-4xl md:text-display-md', 'text-4xl md:text-display-md')
html = html.replace('text-5xl md:text-5xl md:text-display-lg', 'text-5xl md:text-display-lg')

with open(path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated fga.html with responsive classes.")
