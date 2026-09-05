import re

path = r'c:\Users\AKASH\OneDrive\Desktop\Nexora Consulting\templates\assessment\section_05\assessment_section_05.html'
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Global Spacing
html = html.replace('px-margin-desktop', 'px-5 md:px-margin-desktop')
html = html.replace('py-section-gap', 'py-16 md:py-section-gap')

# 2. Typography
html = html.replace('text-[64px]', 'text-4xl md:text-[64px]')
html = html.replace('text-[48px]', 'text-3xl md:text-[48px]')
html = html.replace('text-[32px]', 'text-2xl md:text-[32px]')
html = html.replace('text-[20px]', 'text-lg md:text-[20px]')

# 3. Hero Adjustments
html = html.replace('w-full h-[600px]', 'w-full min-h-[500px] md:h-[600px]')

# 4. Matrix Cards
html = html.replace('bg-surface-container-lowest p-8 flex flex-col h-full relative group s5-card', 'bg-surface-container-lowest p-6 md:p-8 flex flex-col h-full relative group s5-card')

# 5. Key Insights (Constraints)
html = html.replace('-right-20 -bottom-20 text-[200px]', '-right-10 md:-right-20 -bottom-10 md:-bottom-20 text-[120px] md:text-[200px]')
html = html.replace('bg-surface-container-high rounded-xl p-12', 'bg-surface-container-high rounded-xl p-6 md:p-12')
html = html.replace('bg-surface-container rounded-xl p-8', 'bg-surface-container rounded-xl p-6 md:p-8')

# 6. Recommendation Card
html = html.replace('w-full md:w-1/2 p-12 md:p-16', 'w-full md:w-1/2 p-6 md:p-16')
html = html.replace('relative min-h-[400px]', 'relative min-h-[300px] md:min-h-[400px]')

# 7. Rationale Grid
html = html.replace('grid grid-cols-1 lg:grid-cols-2 gap-24', 'grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24')

# Handle duplicate additions just in case
html = html.replace('px-5 md:px-5 md:px-margin-desktop', 'px-5 md:px-margin-desktop')
html = html.replace('py-16 md:py-16 md:py-section-gap', 'py-16 md:py-section-gap')
html = html.replace('text-4xl md:text-4xl md:text-[64px]', 'text-4xl md:text-[64px]')
html = html.replace('text-3xl md:text-3xl md:text-[48px]', 'text-3xl md:text-[48px]')
html = html.replace('text-2xl md:text-2xl md:text-[32px]', 'text-2xl md:text-[32px]')
html = html.replace('text-lg md:text-lg md:text-[20px]', 'text-lg md:text-[20px]')

with open(path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated assessment_section_05.html for mobile responsiveness.")
