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

# 1. Initialize API Keys
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
UNSPLASH_KEY = os.environ.get("UNSPLASH_ACCESS_KEY")

VALID_CATEGORIES = [
    "Artificial Intelligence", "Hardware", "Software", "Space", "Security", "Business", 
    "Cloud Computing", "Data Science", "Networking", "Mobile Development", 
    "Web Development", "Gaming", "Robotics", "Open Source", "Education", 
    "Healthcare Tech", "Finance/FinTech", "Legal/Compliance", "Movie", "Promo Code", "Creative/Design", "Other"
]

# 2. Feed & Directory Setup
RSS_FEEDS = [
    "https://techcrunch.com/feed/",
    "https://www.theverge.com/rss/index.xml",
    "https://www.wired.com/feed/rss",
    "https://arstechnica.com/feed/",
    "https://venturebeat.com/feed/"
]

output_dir = "content/posts"
os.makedirs(output_dir, exist_ok=True)

def post_exists(entry, news_title, output_dir):
    """
    Return True if any existing markdown file in output_dir references
    this entry's link/id, or if a highly similar title already exists.
    """
    entry_link = entry.get('link', '').strip()
    entry_id = entry.get('id', '').strip()

    for fname in os.listdir(output_dir):
        if not fname.endswith('.md'):
            continue
        path = os.path.join(output_dir, fname)
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # 1. Exact Link or ID Match
                if entry_link and entry_link in content:
                    return True
                if entry_id and entry_id in content:
                    return True
                    
                # 2. Fuzzy Title Match (Protects against slightly altered titles)
                title_match = re.search(r'^title:\s*"(.*?)"', content, re.MULTILINE)
                if title_match:
                    existing_title = title_match.group(1)
                    # Compare similarity (0.80 = 80% similar)
                    similarity = SequenceMatcher(None, news_title.lower(), existing_title.lower()).ratio()
                    if similarity >= 0.80:
                        print(f"  -> DUPLICATE BLOCKED: '{news_title}' is {int(similarity*100)}% similar to '{existing_title}'")
                        return True
        except Exception:
            # ignore unreadable files
            continue
    return False


# --- Custom Image Generator ---
def generate_fallback_image(title, slug):
    # Hugo looks for images in the 'static' folder
    img_dir = "static/images"
    os.makedirs(img_dir, exist_ok=True)
    filepath = os.path.join(img_dir, f"{slug}.jpg")

    # Create a sleek dark background (1200x630 is standard SEO size)
    W, H = 1200, 630
    img = Image.new('RGB', (W, H), color=(30, 30, 46))
    draw = ImageDraw.Draw(img)

    # Bulletproof Font Loading
    font = None
    font_path = "Roboto-Bold.ttf"
    try:
        if not os.path.exists(font_path):
            # Updated, highly reliable URL
            font_url = "https://raw.githubusercontent.com/google/fonts/main/ofl/roboto/Roboto-Bold.ttf"
            r = requests.get(font_url, timeout=10)
            if r.status_code == 200:
                with open(font_path, "wb") as f:
                    f.write(r.content)
            else:
                raise Exception(f"HTTP Status {r.status_code}")
        
        # Load the downloaded font
        font = ImageFont.truetype(font_path, 60)
    except Exception as e:
        print(f"Warning: Custom font failed to load ({e}). Using system default.")
        font = ImageFont.load_default()

    # Wrap the title text so it doesn't overflow
    wrapper = textwrap.TextWrapper(width=35)
    wrapped_text = wrapper.fill(text=title)

    # Safely calculate text dimensions for multi-line text
    try:
        # For newer Pillow versions
        bbox = draw.multiline_textbbox((0, 0), wrapped_text, font=font)
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
    except AttributeError:
        # Fallback for older Pillow versions
        w, h = draw.textsize(wrapped_text, font=font)

    # Draw the text in white perfectly centered
    draw.multiline_text(((W-w)/2, (H-h)/2), wrapped_text, font=font, fill=(255, 255, 255), align="center")

    # Save and return the relative path for Hugo
    img.save(filepath)
    return f"/images/{slug}.jpg"

# --- Unsplash Fetcher ---
def get_unsplash_image(title):
    if not UNSPLASH_KEY:
        return None
    
    # Use the first few words of the title to get a good search match
    search_query = " ".join(title.split()[:4])
    url = f"https://api.unsplash.com/search/photos?page=1&query={search_query}&client_id={UNSPLASH_KEY}"
    
    try:
        res = requests.get(url).json()
        if res.get('results'):
            # Return the URL of the first resulting image
            return res['results'][0]['urls']['regular']
    except Exception as e:
        print(f"Unsplash search failed: {e}")
        
    return None

# --- The Image Extractor Engine ---
def extract_image(entry, title, slug):
    # Method A: Safely check official RSS media tags
    if 'media_content' in entry:
        for media in entry.media_content:
            if 'url' in media:
                return media['url']
                
    # Method B: Check enclosures
    if 'links' in entry:
        for link in entry.links:
            if link.get('rel') == 'enclosure' and 'image' in link.get('type', ''):
                return link.get('href')
                
    # Method C: Hunt for raw HTML image tags hidden in the summary
    match = re.search(r'<img[^>]+src="([^">]+)"', entry.get('summary', '') + str(entry.get('content', '')))
    if match:
        return match.group(1)
        
    # Method D: Try Unsplash API
    print("No native image found. Checking Unsplash...")
    unsplash_url = get_unsplash_image(title)
    if unsplash_url:
        return unsplash_url
        
    # Method E: Generate the beautiful fallback title image
    print("Unsplash failed. Generating custom title image...")
    return generate_fallback_image(title, slug)

# --- The Image Downloader (Anti-Hotlink Protection) ---
def download_and_verify_image(url, slug, title):
    # If the URL is already our generated fallback, skip downloading
    if url.startswith("/images/"):
        return url
        
    img_dir = "static/images"
    os.makedirs(img_dir, exist_ok=True)
    filepath = os.path.join(img_dir, f"{slug}.jpg")
    
    try:
        # Spoof a standard web browser to bypass basic hotlink protection
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        r = requests.get(url, headers=headers, timeout=10)
        
        if r.status_code == 200:
            # Save the raw image
            with open(filepath, 'wb') as f:
                f.write(r.content)
            
            # Verify it is actually an image and not a blocked HTML error page
            try:
                with Image.open(filepath) as img:
                    img.verify()
                return f"/images/{slug}.jpg"
            except Exception:
                print("  -> Downloaded file was corrupt/protected. Generating fallback...")
    except Exception as e:
        print(f"  -> Could not download image: {e}")
        
    # If the download failed or was blocked by a firewall, generate the custom text image
    return generate_fallback_image(title, slug)

# 3. Main Loop
for current_feed in RSS_FEEDS:
    print(f"\nChecking {current_feed}...")
    feed = feedparser.parse(current_feed)

    # skip if feed parsing failed or no entries
    if not getattr(feed, "entries", None):
        print("No entries found for this feed.")
        continue

    for entry in feed.entries:
        # Determine published date (try published, then updated)
        published_struct = entry.get('published_parsed') or entry.get('updated_parsed')
        if not published_struct:
            # If no date available, skip (or optionally treat as today)
            print(f"Skipping (no publish date): {entry.get('title', 'NO TITLE')}")
            continue

        # Convert struct_time to UTC date
        published_dt = datetime.fromtimestamp(time.mktime(published_struct), tz=timezone.utc)
        if published_dt.date() != datetime.now(timezone.utc).date():
            print(f"Skipping (not today): {entry.get('title', 'NO TITLE')} (published {published_dt.date()})")
            continue

        # NEW: Extract the title FIRST so we can use it for fuzzy matching
        news_title = html.unescape(entry.get('title', 'NO TITLE'))

        # NEW: Pass the title into our updated post_exists function
        if post_exists(entry, news_title, output_dir):
            print(f"Skipping (Already exists on site): {news_title}")
            continue

        # Keep your existing slug logic below this point
        filename_slug = re.sub(r'[^\w\s-]', '', news_title).strip().lower()
        filename_slug = re.sub(r'[-\s]+', '-', filename_slug)
        filename = filename_slug + ".md"

        file_path = os.path.join(output_dir, filename)

        if os.path.exists(file_path):
            print(f"Skipping (Already published): {news_title}")
            continue

        print(f"Found NEW article: {news_title}")
        news_summary = html.unescape(entry.get('summary', ''))

        # Pass the title and slug to our image engine, then DOWNLOAD it safely
        raw_image_url = extract_image(entry, news_title, filename_slug)
        image_url = download_and_verify_image(html.unescape(raw_image_url), filename_slug, news_title)

        # ... (rest of your existing code for prompt, Groq call, saving file, etc.)

        prompt = f"""
Act as an expert tech journalist and SEO specialist. Read this short news summary: {news_summary}

Write a comprehensive, highly engaging 1500-word blog post about this topic. 
Include headings, bullet points, and an FAQ section. 
Output the final result in pure Markdown format. 

At the very top of the file, include YAML frontmatter formatted EXACTLY like this:
---
title: "{news_title}"
date: {datetime.now(timezone.utc).isoformat()}
draft: false
images: ["{image_url}"]
thumbnail: "{image_url}"
description: "A 155-character SEO meta description here."
categories: ["Insert EXACTLY ONE category here"]
tags: ["Insert 3 to 5 relevant tags here based on the text"]
---

IMPORTANT RULE FOR CATEGORIES: 
You must evaluate the article and pick EXACTLY ONE category that most closely matches the content from this exact list: Artificial Intelligence, Hardware, Software, Space, Security, Business, Cloud Computing, Data Science, Networking, Mobile Development, Web Development, Gaming, Robotics, Open Source, Education, Healthcare Tech, Finance/FinTech, Legal/Compliance, Movie, Promo Code, Creative/Design, Other. 
Do not invent new categories.

![Featured Image]({image_url})

(Write the rest of the markdown article here. Do not wrap the whole output in markdown code blocks, just output the raw text starting with the ---.)
"""

        print("Sending to Groq...")
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a professional tech blogger."},
                {"role": "user", "content": prompt}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=4000,
        )

        article_content = response.choices[0].message.content.strip()

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
                # Find the closest match in our list (e.g., "AI" -> "Artificial Intelligence")
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
