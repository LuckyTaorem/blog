import os
import feedparser
from groq import Groq
import re
import time
from datetime import datetime, timezone
import html
import requests
from PIL import Image, ImageDraw, ImageFont
import textwrap
from difflib import SequenceMatcher

print("WORKDIR:", os.getcwd())

# ==========================================
# 1. SETUP & CONFIGURATION
# ==========================================
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
UNSPLASH_KEY = os.environ.get("UNSPLASH_ACCESS_KEY")

VALID_CATEGORIES = [
    "Artificial Intelligence", "Hardware", "Software", "Space", "Security", "Business", 
    "Cloud Computing", "Data Science", "Networking", "Mobile Development", 
    "Web Development", "Gaming", "Robotics", "Open Source", "Education", 
    "Healthcare Tech", "Finance/FinTech", "Legal/Compliance", "Movie", "Promo Code", "Creative/Design", "Other"
]

RSS_FEEDS = [
    "https://techcrunch.com/feed/",
    "https://www.theverge.com/rss/index.xml",
    "https://www.wired.com/feed/rss",
    "https://arstechnica.com/feed/",
    "https://venturebeat.com/feed/"
]

output_dir = "content/posts"
REQUIRED_DIRS = ["assets/images", "assets/images", output_dir]
for directory in REQUIRED_DIRS:
    os.makedirs(directory, exist_ok=True)

# ==========================================
# 2. CORE FUNCTIONS
# ==========================================
def get_existing_post_path(entry, news_title, output_dir):
    if not os.path.exists(output_dir): return None
    entry_link = entry.get('link', '').strip()
    entry_id = entry.get('id', '').strip()

    for fname in os.listdir(output_dir):
        if not fname.endswith('.md'): continue
        path = os.path.join(output_dir, fname)
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                if entry_link and entry_link in content: return path
                if entry_id and entry_id in content: return path
                
                title_match = re.search(r'^title:\s*"(.*?)"', content, re.MULTILINE)
                if title_match:
                    existing_title = title_match.group(1)
                    if SequenceMatcher(None, news_title.lower(), existing_title.lower()).ratio() >= 0.85:
                        return path
        except Exception:
            continue
    return None

def generate_fallback_image(title, slug):
    print(f"  -> Generating SPACE fallback image for: {slug}")
    img_dir = "assets/images"
    os.makedirs(img_dir, exist_ok=True)
    filepath = os.path.join(img_dir, f"{slug}.jpg")
    
    W, H = 1200, 630
    
    # 1. Generate Space Background
    img = Image.new('RGB', (W, H), color=(12, 14, 25))
    draw = ImageDraw.Draw(img)
    import random
    for _ in range(250):
        x = random.randint(0, W)
        y = random.randint(0, H)
        size = random.choice([1, 1, 2, 2, 3])
        color = random.choice([(255, 255, 255), (200, 220, 255), (255, 250, 200)])
        if random.random() > 0.5: color = tuple(int(c * 0.6) for c in color)
        draw.ellipse((x, y, x+size, y+size), fill=color)

    # 2. Bulletproof Font Loader
    font_path = "Roboto-Bold.ttf"
    if os.path.exists(font_path) and os.path.getsize(font_path) < 10000:
        os.remove(font_path) # Destroy corrupt font files

    if not os.path.exists(font_path):
        url = "https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Bold.ttf"
        r = requests.get(url, timeout=10)
        if r.status_code == 200:
            with open(font_path, "wb") as f: f.write(r.content)

    try:
        font = ImageFont.truetype(font_path, 90) # Size 90!
    except Exception:
        try:
            font = ImageFont.truetype("arial.ttf", 90) # Windows Fallback
        except Exception:
            font = ImageFont.load_default()

    # 3. Text Wrapping and Drawing
    wrapper = textwrap.TextWrapper(width=26)
    wrapped_text = wrapper.fill(text=title)
    
    try:
        bbox = draw.multiline_textbbox((0, 0), wrapped_text, font=font)
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    except AttributeError:
        w, h = draw.textsize(wrapped_text, font=font)

    x, y = (W - w) / 2, (H - h) / 2
    
    # Heavy shadow
    draw.multiline_text((x + 6, y + 6), wrapped_text, font=font, fill=(0, 0, 0), align="center")
    # Bright text
    draw.multiline_text((x, y), wrapped_text, font=font, fill=(255, 255, 255), align="center")
    
    img.save(filepath)
    return f"images/{slug}.jpg"

def get_unsplash_image(title):
    if not UNSPLASH_KEY: return None
    search_query = " ".join(title.split()[:4])
    url = f"https://api.unsplash.com/search/photos?page=1&query={search_query}&client_id={UNSPLASH_KEY}"
    try:
        res = requests.get(url).json()
        if res.get('results'): return res['results'][0]['urls']['regular']
    except Exception: pass
    return None

def extract_image(entry, title, slug):
    if 'media_content' in entry:
        for media in entry.media_content:
            if 'url' in media: return media['url']
    if 'links' in entry:
        for link in entry.links:
            if link.get('rel') == 'enclosure' and 'image' in link.get('type', ''): return link.get('href')
    match = re.search(r'<img[^>]+src="([^">]+)"', entry.get('summary', '') + str(entry.get('content', '')))
    if match: return match.group(1)
    
    unsplash_url = get_unsplash_image(title)
    if unsplash_url: return unsplash_url
    return generate_fallback_image(title, slug)

def download_and_verify_image(url, slug, title, is_featured=True):
    if url.startswith("images/") or url.startswith("/images/"): return url
    img_dir = "assets/images"
    filepath = os.path.join(img_dir, f"{slug}.jpg")
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        r = requests.get(url, headers=headers, timeout=10)
        if r.status_code == 200:
            with open(filepath, 'wb') as f: f.write(r.content)
            try:
                with Image.open(filepath) as img: img.verify()
                return f"images/{slug}.jpg"
            except Exception: pass 
    except Exception: pass 
    return generate_fallback_image(title, slug) if is_featured else url

def heal_all_broken_images(output_dir):
    print("\n--- RUNNING IMAGE HEALER ---")
    img_dir = "assets/images"
    for fname in os.listdir(output_dir):
        if not fname.endswith(".md"): continue
        slug = fname.replace(".md", "")
        file_path = os.path.join(output_dir, fname)
        try:
            with open(file_path, "r", encoding="utf-8") as f: content = f.read()
            title_match = re.search(r'^title:\s*"(.*?)"', content, re.MULTILINE)
            if not title_match: continue
            
            expected_img_path = os.path.join(img_dir, f"{slug}.jpg")
            expected_img_url = f"images/{slug}.jpg"
            
            if not os.path.exists(expected_img_path):
                generate_fallback_image(title_match.group(1), slug)
            
            content = re.sub(r'thumbnail:\s*"([^"]+)"', f'thumbnail: "{expected_img_url}"', content)
            content = re.sub(r'images:\s*\[[^\]]*\]', f'images: ["{expected_img_url}"]', content)
            with open(file_path, "w", encoding="utf-8") as f: f.write(content)
        except Exception: pass
    print("--- IMAGE HEALER COMPLETE ---\n")

def update_post_images(file_path, slug, title):
    try:
        with open(file_path, "r", encoding="utf-8") as f: content = f.read()
        image_matches = re.findall(r'!\[[^\]]*\]\((.*?)\)', content)
        for idx, img_url in enumerate(image_matches, start=1):
            if img_url.startswith("/images/") or img_url.startswith("/assets/images/"): continue
            local_img = download_and_verify_image(html.unescape(img_url), f"{slug}-{idx}", title, is_featured=False)
            content = content.replace(img_url, local_img)

        thumb_match = re.search(r'thumbnail:\s*"([^"]+)"', content)
        if thumb_match and thumb_match.group(1).startswith("http"):
            local_thumb = download_and_verify_image(thumb_match.group(1), f"{slug}-thumb", title, is_featured=True)
            content = re.sub(r'thumbnail:\s*"([^"]+)"', f'thumbnail: "{local_thumb}"', content)
            content = re.sub(r'images:\s*\[[^\]]*\]', f'images: ["{local_thumb}"]', content)

        with open(file_path, "w", encoding="utf-8") as f: f.write(content)
    except Exception as e: print(f"Failed updating images: {e}")

def generate_article(prompt):
    model_settings = [
        {"model": "llama-3.3-70b-versatile", "word_count": "1200"},
        {"model": "llama-3.1-8b-instant", "word_count": "600"}
    ]
    for setting in model_settings:
        try:
            print(f"  -> Attempting Groq generation with {setting['model']}...")
            diet_prompt = prompt.replace("1500-word", f"{setting['word_count']}-word")
            response = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a professional tech blogger."},
                    {"role": "user", "content": diet_prompt}
                ],
                model=setting['model'],
                temperature=0.7,
                max_tokens=4000,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            if hasattr(e, 'status_code') and e.status_code == 429:
                print(f"  -> Rate limit reached for {setting['model']}. Switching model...")
                continue 
            else: raise e
    raise Exception("All Groq models exhausted or failed.")

# ==========================================
# 3. MAIN AUTOMATION LOOP
# ==========================================
heal_all_broken_images(output_dir)

for current_feed in RSS_FEEDS:
    print(f"\nChecking {current_feed}...")
    feed = feedparser.parse(current_feed)

    if not getattr(feed, "entries", None):
        print("No entries found for this feed.")
        continue

    for entry in feed.entries:
        published_struct = entry.get('published_parsed') or entry.get('updated_parsed')
        if not published_struct: continue

        published_dt = datetime.fromtimestamp(time.mktime(published_struct), tz=timezone.utc)
        if published_dt.date() != datetime.now(timezone.utc).date(): continue

        news_title = html.unescape(entry.get('title', 'NO TITLE'))
        filename_slug = re.sub(r'[^\w\s-]', '', news_title).strip().lower()
        filename_slug = re.sub(r'[-\s]+', '-', filename_slug)
        filename = filename_slug + ".md"
        file_path = os.path.join(output_dir, filename)

        # 1. Check if Post Exists
        existing_path = get_existing_post_path(entry, news_title, output_dir)
        if existing_path:
            print(f"Post already exists: {news_title}. Verifying images...")
            update_post_images(existing_path, filename_slug, news_title)
            continue
            
        print(f"Found NEW article: {news_title}")
        news_summary = html.unescape(entry.get('summary', ''))

        # 2. Extract & Download Image
        raw_image_url = extract_image(entry, news_title, filename_slug)
        image_url = download_and_verify_image(html.unescape(raw_image_url), filename_slug, news_title, is_featured=True)

        # 3. Generate the Prompt
        prompt = f"""
Act as an expert tech journalist and SEO specialist. Read this short news summary: {news_summary}

Write a comprehensive, highly engaging 1500-word blog post about this topic. 
Include headings, bullet points, and an FAQ section. 
Output the final result in pure Markdown format. 

CRITICAL SEO RULES:
1. Title Limit: The title in the frontmatter MUST be catchy, click-optimized, and strictly under 50 characters.
2. Description Limit: The description in the frontmatter MUST be highly engaging and strictly between 140 and 150 characters.
3. Heading Tags: DO NOT use any H1 (`#`) tags in the body of the article. Only use H2 (`##`) for main sections and H3 (`###`) for subsections. 

At the very top of the file, include YAML frontmatter formatted EXACTLY like this:
---
title: "[Insert <50 Char Title Here]"
date: {datetime.now(timezone.utc).isoformat()}
draft: false
images: ["{image_url}"]
thumbnail: "{image_url}"
description: "[Insert 140-150 Char Description Here]"
categories: ["Insert EXACTLY ONE category here"]
tags: ["Insert 3 to 5 relevant tags here based on the text"]
---

IMPORTANT RULE FOR CATEGORIES: 
You must evaluate the article and pick EXACTLY ONE category that most closely matches the content from this exact list: {', '.join(VALID_CATEGORIES)}.
Do not invent new categories.

![Featured Image]({image_url})

(Write the rest of the markdown article here starting with an introductory paragraph. Remember, no H1 tags!)
"""

        print("Sending to Groq...")
        
        # Determine model and constraints based on tier/diet
        model_settings = [
            {"model": "llama-3.3-70b-versatile", "word_count": "1200"},
            {"model": "llama-3.1-8b-instant", "word_count": "600"}
        ]

        article_content = None

        for setting in model_settings:
            try:
                print(f"Attempting to generate with {setting['model']}...")

                # Apply Token Diet: Inject the word count limit dynamically
                diet_prompt = prompt.replace("1500-word", f"{setting['word_count']}-word")

                response = client.chat.completions.create(
                    messages=[
                        {"role": "system", "content": "You are a professional tech blogger."},
                        {"role": "user", "content": diet_prompt}
                    ],
                    model=setting['model'],
                    temperature=0.7,
                    max_tokens=4000,
                )
                article_content = response.choices[0].message.content.strip()
                break # Break out of the fallback loop if successful!

            except Exception as e:
                # Check if it's a Rate Limit error (429)
                if hasattr(e, 'status_code') and e.status_code == 429:
                    print(f"Rate limit reached for {setting['model']}. Switching model...")
                    continue # Try the next model in the list
                else:
                    print(f"API Error: {e}")
                    break
        
        # If both models failed or errored out, skip to the next article
        if not article_content:
            print("Skipping article due to generation failure.")
            continue

        # Strip markdown block tags safely (using chr(96) to prevent chat UI bugs)
        start_pattern = r"^" + chr(96)*3 + r"(?:markdown)?\s*\n"
        end_pattern = r"\n" + chr(96)*3 + r"\s*$"

        article_content = re.sub(start_pattern, "", article_content, flags=re.IGNORECASE)
        article_content = re.sub(end_pattern, "", article_content)

        # FOOLPROOF FRONTMATTER FIX
        if not article_content.startswith("---"):
            first_dash_idx = article_content.find("---")
            if first_dash_idx != -1:
                article_content = article_content[first_dash_idx:]
            else:
                fallback_yaml = f"---\ntitle: \"{news_title}\"\ndate: {datetime.now(timezone.utc).isoformat()}\ndraft: false\nimages: [\"{image_url}\"]\n---\n\n"
                article_content = fallback_yaml + article_content

        cat_match = re.search(r'categories:\s*\["([^"]+)"\]', article_content)
        if cat_match:
            ai_category = cat_match.group(1)
            # If the AI invented a category not in our master list
            if ai_category not in VALID_CATEGORIES:
                from difflib import get_close_matches
                closest = get_close_matches(ai_category, VALID_CATEGORIES, n=1, cutoff=0.4)
                safe_category = closest[0] if closest else "Other"
                
                print(f"  -> Fixed AI Hallucination: Changed '{ai_category}' to '{safe_category}'")
                
                # Overwrite the AI's mistake in the raw markdown string
                article_content = article_content.replace(f'categories: ["{ai_category}"]', f'categories: ["{safe_category}"]')

        # --- SAVE THE FILE ---
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(article_content)

        print(f"Success! Blog post saved to: {file_path}")

print("\nFINAL IMAGE LIST")

for root, dirs, files in os.walk("assets/images"):
    for file in files:
        print(os.path.join(root, file))