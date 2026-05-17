
import re

with open('c:/Users/USER/Desktop/projects/portfolio/src/components/Portfolio.jsx', 'r', encoding='utf-8') as f:
    content = f.read()
    open_divs = len(re.findall(r'<div', content))
    close_divs = len(re.findall(r'</div>', content))
    open_slide = len(re.findall(r'<SlideIn', content))
    close_slide = len(re.findall(r'</SlideIn>', content))
    open_motion = len(re.findall(r'<motion\.', content))
    close_motion = len(re.findall(r'</motion\.', content))
    
    print(f"div: {open_divs} / {close_divs}")
    print(f"SlideIn: {open_slide} / {close_slide}")
    print(f"motion: {open_motion} / {close_motion}")
