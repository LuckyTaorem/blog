import os
import re
import requests
from PIL import Image, ImageDraw, ImageFont
import textwrap

print("--- STARTING FALLBACK IMAGE HEALER ---")

def get_font():
    font_path = "Roboto-Bold.ttf"
    if not os.path.exists(font_path):
        # The correct, updated Apache folder URL
        url = "https://raw.githubusercontent.com/google/fonts/main/apache/roboto/Roboto-Bold.ttf"
        r = requests.get(url, timeout=10)
        with open(font_path, "wb") as f:
            f.write(r.content)
    # Increased font size to 85 for massive, readable text
    return ImageFont.truetype(font_path, 85)

def regenerate(title, slug):
    filepath = f"assets/images/{slug}.jpg"
    W, H = 1200, 630
    img = Image.new('RGB', (W, H), color=(30, 30, 46))
    draw = ImageDraw.Draw(img)
    
    try:
        font = get_font()
    except Exception:
        font = ImageFont.load_default()

    # Wrapped tighter because the font is much bigger
    wrapper = textwrap.TextWrapper(width=28)
    wrapped_text = wrapper.fill(text=title)
    
    try:
        bbox = draw.multiline_textbbox((0, 0), wrapped_text, font=font)
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    except AttributeError:
        w, h = draw.textsize(wrapped_text, font=font)

    x, y = (W - w) / 2, (H - h) / 2
    draw.multiline_text((x + 5, y + 5), wrapped_text, font=font, fill=(0, 0, 0), align="center")
    draw.multiline_text((x, y), wrapped_text, font=font, fill=(255, 255, 255), align="center")
    img.save(filepath)
    print(f"✅ Healed tiny text for: {slug}")

output_dir = "content/posts"
if os.path.exists(output_dir):
    for fname in os.listdir(output_dir):
        if not fname.endswith(".md"): continue
        slug = fname.replace(".md", "")
        
        with open(os.path.join(output_dir, fname), "r", encoding="utf-8") as f:
            content = f.read()
            title_match = re.search(r'^title:\s*"(.*?)"', content, re.MULTILINE)
            if not title_match: continue
            title = title_match.group(1)

        img_path = f"assets/images/{slug}.jpg"
        if os.path.exists(img_path):
            try:
                with Image.open(img_path) as img:
                    img = img.convert('RGB')
                    r, g, b = img.getpixel((10, 10))
                    # If the pixel matches our background color (allowing for slight JPEG compression variance)
                    if abs(r - 30) < 10 and abs(g - 30) < 10 and abs(b - 46) < 10:
                        regenerate(title, slug)
            except Exception as e:
                print(f"Error checking {slug}: {e}")

print("--- HEALER COMPLETE ---")