import os
import re
import requests
import random
from PIL import Image, ImageDraw, ImageFont
import textwrap

print("--- INITIATING SPACE UPGRADE ---")

def get_huge_font():
    font_path = "Roboto-Bold.ttf"
    
    # If the file exists but is tiny, it's a corrupt HTML error page. Delete it.
    if os.path.exists(font_path) and os.path.getsize(font_path) < 10000:
        os.remove(font_path)

    if not os.path.exists(font_path):
        print("Downloading clean font file...")
        # A highly stable direct link to Google's raw font file
        url = "https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Bold.ttf"
        r = requests.get(url, timeout=10)
        if r.status_code == 200:
            with open(font_path, "wb") as f:
                f.write(r.content)

    try:
        # Try our downloaded font at massive size 90
        return ImageFont.truetype(font_path, 90)
    except Exception:
        try:
            # If all else fails, use standard Windows Arial
            return ImageFont.truetype("arial.ttf", 90)
        except Exception:
            return ImageFont.load_default()

def draw_space_background(W, H):
    # Deep space blue/black
    img = Image.new('RGB', (W, H), color=(12, 14, 25))
    draw = ImageDraw.Draw(img)
    
    # Generate 250 random stars
    for _ in range(250):
        x = random.randint(0, W)
        y = random.randint(0, H)
        size = random.choice([1, 1, 2, 2, 3]) # Varying star sizes
        
        # Varying star colors (white, faint blue, faint yellow)
        color = random.choice([(255, 255, 255), (200, 220, 255), (255, 250, 200)])
        
        # Make some stars slightly dimmer
        if random.random() > 0.5:
            color = tuple(int(c * 0.6) for c in color)
            
        draw.ellipse((x, y, x+size, y+size), fill=color)
        
    return img, draw

def regenerate_space_banner(title, slug):
    filepath = f"assets/images/{slug}.jpg"
    W, H = 1200, 630
    
    img, draw = draw_space_background(W, H)
    font = get_huge_font()

    wrapper = textwrap.TextWrapper(width=26)
    wrapped_text = wrapper.fill(text=title)
    
    try:
        bbox = draw.multiline_textbbox((0, 0), wrapped_text, font=font)
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    except AttributeError:
        w, h = draw.textsize(wrapped_text, font=font)

    x, y = (W - w) / 2, (H - h) / 2
    
    # Draw a heavy drop shadow so text pops against the stars
    draw.multiline_text((x + 6, y + 6), wrapped_text, font=font, fill=(0, 0, 0), align="center")
    # Draw main white text
    draw.multiline_text((x, y), wrapped_text, font=font, fill=(255, 255, 255), align="center")
    
    img.save(filepath)
    print(f"🌌 Space banner generated for: {slug}")

output_dir = "content/posts"
if os.path.exists(output_dir):
    for fname in os.listdir(output_dir):
        if not fname.endswith(".md"): continue
        slug = fname.replace(".md", "")
        
        # Read the title from the markdown
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
                    # If it has the old boring background color (30, 30, 46), upgrade it!
                    if abs(r - 30) < 10 and abs(g - 30) < 10 and abs(b - 46) < 10:
                        regenerate_space_banner(title, slug)
            except Exception:
                pass

print("--- SPACE UPGRADE COMPLETE ---")