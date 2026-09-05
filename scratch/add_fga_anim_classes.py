import re

path = r'c:\Users\AKASH\OneDrive\Desktop\Nexora Consulting\templates\assessment\section_05\fga.html'
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. wrapper
html = html.replace('<div class="fga-wrapper">', '<div class="fga-wrapper opacity-0">')

# 2. Add extra_js block if not exists
if '{% block extra_js %}' not in html:
    html = html.replace('{% endblock %}', '{% endblock %}\n\n{% block extra_js %}\n<script src="{% static \'assessment/js/fga-animations.js\' %}"></script>\n{% endblock %}', 1)

# 3. Hero image
html = html.replace("bg-center\" style=\"background-image: url('{% static 'assessment/section_05/images/fga_building.png' %}');\">", "bg-center fga-anim-hero-img\" style=\"background-image: url('{% static 'assessment/section_05/images/fga_building.png' %}');\">")

# 4. Hero text
html = html.replace('<h1 class="font-display-lg', '<h1 class="font-display-lg fga-anim-text')
html = html.replace('<p class="font-body-lg text-body-lg text-[#F7F3EC]/80 max-w-2xl mb-12', '<p class="font-body-lg text-body-lg text-[#F7F3EC]/80 max-w-2xl mb-12 fga-anim-text')
html = html.replace('<div class="flex items-center gap-4 mb-8">', '<div class="flex items-center gap-4 mb-8 fga-anim-text">')

# 5. Problem section
html = html.replace('<h2 class="font-headline-lg', '<h2 class="font-headline-lg fga-anim-text')
html = html.replace('<p class="font-body-lg text-body-lg text-[#F7F3EC]/80">\n                    You\'ve built something', '<p class="font-body-lg text-body-lg text-[#F7F3EC]/80 fga-anim-text">\n                    You\'ve built something')
html = html.replace('<div class="lg:col-span-6 lg:col-start-7 space-y-12">', '<div class="lg:col-span-6 lg:col-start-7 space-y-12 fga-anim-card-container">')
html = html.replace('<div class="flex gap-6 items-start">', '<div class="flex gap-6 items-start fga-anim-card">')

# 6. Shift section
html = html.replace('<div class="font-headline-lg text-headline-lg text-[#171513]">', '<div class="font-headline-lg text-headline-lg text-[#171513] fga-anim-text">')
html = html.replace('<div class="bg-[#E8DED0] p-12 lg:p-16 border border-[#B89A67]/30">', '<div class="bg-[#E8DED0] p-12 lg:p-16 border border-[#B89A67]/30 fga-anim-card-single">')
html = html.replace('<div class="bg-[#E8DED0] p-12 lg:p-16 relative overflow-hidden border border-[#B89A67]/30">', '<div class="bg-[#E8DED0] p-12 lg:p-16 relative overflow-hidden border border-[#B89A67]/30 fga-anim-card-single">')
html = html.replace('<h2 class="font-eyebrow text-eyebrow text-[#C96B4B] uppercase tracking-widest mb-4">', '<h2 class="font-eyebrow text-eyebrow text-[#C96B4B] uppercase tracking-widest mb-4 fga-anim-text">')

# 7. Value section (What changes)
html = html.replace('<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-10">', '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-10 fga-anim-card-container">')
html = html.replace('<div class="flex flex-col">', '<div class="flex flex-col fga-anim-card">')

# 8. Methodology
html = html.replace('<div class="space-y-4">', '<div class="space-y-4 fga-anim-card-container">')
html = html.replace('<div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-b border-[#B89A67]/30 pb-4">', '<div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-b border-[#B89A67]/30 pb-4 fga-anim-card">')

# 9. Outcomes
html = html.replace('<div class="grid grid-cols-1 md:grid-cols-3 gap-6">', '<div class="grid grid-cols-1 md:grid-cols-3 gap-6 fga-anim-card-container">')
html = html.replace('<div class="bg-[#171513]/60 backdrop-blur-md p-8 border border-[#B89A67]/30 flex flex-col justify-center">', '<div class="bg-[#171513]/60 backdrop-blur-md p-8 border border-[#B89A67]/30 flex flex-col justify-center fga-anim-card">')

# 10. FAQ
html = html.replace('<details class="group bg-[#E8DED0]', '<details class="group bg-[#E8DED0] fga-anim-card')

# 11. Final CTA
html = html.replace('<div class="w-full h-full bg-cover bg-center"', '<div class="w-full h-full bg-cover bg-center fga-anim-hero-img"')

with open(path, 'w', encoding='utf-8') as f:
    f.write(html)
