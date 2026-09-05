import urllib.request
import os
import subprocess

exe_path = "tailwindcss.exe"



input_css = """
@tailwind components;
@tailwind utilities;
"""
with open("fga_input.css", "w") as f:
    f.write(input_css)

print("Compiling tailwind for FGA...")
os.makedirs("static/assessment/css", exist_ok=True)
subprocess.run([exe_path, "-c", "fga_tailwind.config.js", "-i", "fga_input.css", "-o", "static/assessment/css/fga.css", "--minify"], check=True)
print("Done.")
