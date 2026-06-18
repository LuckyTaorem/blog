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
print(os.getcwd())
print("WORKDIR:", os.getcwd())
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

# Create required directories if missing
REQUIRED_DIRS = [
    "assets/images",
    "static/images",
    "content/posts"
]

for directory in REQUIRED_DIRS:
    os.makedirs(directory, exist_ok=True)

output_dir = "content/posts"

def get_existing_post_path(entry, news_title, output_dir):
    """
    Returns the file path of an existing post if it matches the link, id, or has a highly similar title.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir, exist_ok=True)
        return None
        
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
                    return path
                if entry_id and entry_id in content:
                    return path
                    
                # 2. Fuzzy Title Match
                title_match = re.search(r'^title:\s*"(.*?)"', content, re.MULTILINE)
                if title_match:
                    existing_title = title_match.group(1)
                    similarity = SequenceMatcher(None, news_title.lower(), existing_title.lower()).ratio()
                    if similarity >= 0.85:
                        print(f"  -> DUPLICATE FOUND: '{news_title}' matches '{existing_title}'")
                        return path
        except Exception:
            continue
    return None


# --- Custom Image Generator ---
def generate_fallback_image(title, slug):
    print(f"GENERATING FALLBACK IMAGE: {slug}")
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
            print("Font download status:", r.status_code)
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
    x = (W - w) / 2
    y = (H - h) / 2

    # Shadow
    draw.multiline_text(
        (x + 4, y + 4),
        wrapped_text,
        font=font,
        fill=(0, 0, 0),
        align="center"
    )

    # Main text
    draw.multiline_text(
        (x, y),
        wrapped_text,
        font=font,
        fill=(255, 255, 255),
        align="center"
    )
    print("Saving fallback image to:", filepath)
    # Save and return the relative path for Hugo
    img.save(filepath)
    print("Fallback image exists:", os.path.exists(filepath))
    return f"/images/{slug}.jpg"

# --- THE IMAGE HEALER ---
def heal_all_broken_images(output_dir):
    print("\n--- RUNNING IMAGE HEALER ---")
    img_dir = "static/images"
    os.makedirs(img_dir, exist_ok=True)
    
    for fname in os.listdir(output_dir):
        if not fname.endswith(".md"): 
            continue
            
        slug = fname.replace(".md", "")
        file_path = os.path.join(output_dir, fname)
        
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
                
            # Extract the actual title of the post
            title_match = re.search(r'^title:\s*"(.*?)"', content, re.MULTILINE)
            if not title_match: 
                continue
            title = title_match.group(1)
            
            # The exact paths where the image SHOULD be
            expected_img_path = os.path.join(img_dir, f"{slug}.jpg")
            expected_img_url = f"/images/{slug}.jpg"
            
            # 1. If the image doesn't exist on disk, create the fallback banner!
            if not os.path.exists(expected_img_path):
                print(f"Missing image for: {slug}. Generating banner...")
                generate_fallback_image(title, slug)
            
            # 2. Force the markdown file to point to this exact image
            content = re.sub(r'thumbnail:\s*"([^"]+)"', f'thumbnail: "{expected_img_url}"', content)
            content = re.sub(r'images:\s*\[[^\]]*\]', f'images: ["{expected_img_url}"]', content)
            
            # Save the healed markdown file
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
                
        except Exception as e:
            print(f"Failed to heal {fname}: {e}")
            
    print("--- IMAGE HEALER COMPLETE ---\n")

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

def update_today_post_images(output_dir):
    if not os.path.exists(output_dir): return
    today = datetime.now(timezone.utc).date()

    for fname in os.listdir(output_dir):
        if not fname.endswith(".md"): continue
        file_path = os.path.join(output_dir, fname)
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            date_match = re.search(r"date:\s*([^\n]+)", content)
            if not date_match: continue

            post_date = datetime.fromisoformat(date_match.group(1).strip().replace("Z", "+00:00")).date()
            if post_date != today: continue

            slug = os.path.splitext(fname)[0]
            
            # FIX: Get real title for the fallback image
            title_match = re.search(r'^title:\s*"(.*?)"', content, re.MULTILINE)
            post_title = title_match.group(1) if title_match else slug

            thumb_match = re.search(r'thumbnail:\s*"([^"]+)"', content)
            if thumb_match:
                thumb_url = thumb_match.group(1)
                if thumb_url.startswith("http"):
                    local_thumb = download_and_verify_image(
                        thumb_url, f"{slug}-thumb", post_title, is_featured=True
                    )
                    content = re.sub(r'thumbnail:\s*"([^"]+)"', f'thumbnail: "{local_thumb}"', content)
                    content = re.sub(r'images:\s*\[[^\]]*\]', f'images: ["{local_thumb}"]', content)

            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
        except Exception:
            pass

# --- The Image Downloader (Anti-Hotlink Protection) ---
def download_and_verify_image(url, slug, title, is_featured=True):
    if url.startswith("/images/") or url.startswith("/assets/images/"):
        return url
        
    img_dir = "static/images"
    os.makedirs(img_dir, exist_ok=True)
    filepath = os.path.join(img_dir, f"{slug}.jpg")
    
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        r = requests.get(url, headers=headers, timeout=10)
        
        if r.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(r.content)
            try:
                with Image.open(filepath) as img:
                    img.verify()
                return f"/images/{slug}.jpg"
            except Exception:
                pass # Corrupt file, move to fallback
    except Exception as e:
        pass # Download failed, move to fallback
        
    # THE FIX: Only generate banners for the main thumbnail
    if is_featured:
        return generate_fallback_image(title, slug)
    else:
        return url # Return the original remote URL for body images

update_today_post_images(output_dir)
print("STATIC IMAGES:")
print(os.listdir("static/images"))

print("ASSET IMAGES:")
print(os.listdir("assets/images"))

def update_post_images(file_path, slug, title):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        image_matches = re.findall(r'!\[[^\]]*\]\((.*?)\)', content)
        for idx, img_url in enumerate(image_matches, start=1):
            if img_url.startswith("/images/") or img_url.startswith("/assets/images/"):
                continue
            
            # is_featured=False prevents generating a giant title banner inside the article
            local_img = download_and_verify_image(
                html.unescape(img_url), f"{slug}-{idx}", title, is_featured=False 
            )
            content = content.replace(img_url, local_img)

        thumb_match = re.search(r'thumbnail:\s*"([^"]+)"', content)
        if thumb_match:
            thumb_url = thumb_match.group(1)
            if thumb_url.startswith("http"):
                local_thumb = download_and_verify_image(
                    thumb_url, f"{slug}-thumb", title, is_featured=True
                )
                content = re.sub(r'thumbnail:\s*"([^"]+)"', f'thumbnail: "{local_thumb}"', content)
                content = re.sub(r'images:\s*\[[^\]]*\]', f'images: ["{local_thumb}"]', content)

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated image paths in {file_path}")

    except Exception as e:
        print(f"Failed updating images: {e}")


heal_all_broken_images(output_dir)
# 3. Main Loop
for current_feed in RSS_FEEDS:
    print(f"\nChecking {current_feed}...")
    feed = feedparser.parse(current_feed)

    # skip if feed parsing failed or no entries
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

        # Check if the post already exists (either exact file, or fuzzy match)
        existing_path = get_existing_post_path(entry, news_title, output_dir)
        
        if existing_path:
            print(f"Post already exists at {existing_path}. Updating images only.")
            update_post_images(existing_path, filename_slug, news_title)
            continue
            
        print(f"Found NEW article: {news_title}")
        news_summary = html.unescape(entry.get('summary', ''))

        # Pass the title and slug to our image engine, then DOWNLOAD it safely
        raw_image_url = extract_image(entry, news_title, filename_slug)
        print("RAW IMAGE URL:", raw_image_url)
        image_url = download_and_verify_image(html.unescape(raw_image_url), filename_slug, news_title, is_featured=True)

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
        def generate_article(prompt, news_summary):
    # Determine model and constraints based on tier/diet
    # If using 70B, we can request more length. If 8B, we keep it concise.
            model_settings = [
            {"model": "llama-3.3-70b-versatile", "word_count": "1200"},
            {"model": "llama-3.1-8b-instant", "word_count": "600"}
    ]

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
                    return response.choices[0].message.content.strip()

                except Exception as e:
            # Check if it's a Rate Limit error (429)
                    if hasattr(e, 'status_code') and e.status_code == 429:
                        print(f"Rate limit reached for {setting['model']}. Switching model...")
                        continue # Try the next model in the list
                    else:
                        # If it's a different error (e.g., connection), re-raise it
                        raise e
    
            raise Exception("All models exhausted.")

# --- Replace your Main Loop call with this ---
        # --- If post already exists, only fetch/store images and rewrite image paths ---
        if os.path.exists(file_path):
           print(f"Post exists. Updating images only: {news_title}")

           with open(file_path, "r", encoding="utf-8") as f:
               existing_content = f.read()

           # Find all markdown images: ![alt](url)
           image_matches = re.findall(r'!\[[^\]]*\]\((.*?)\)', existing_content)

           for idx, img_url in enumerate(image_matches, start=1):
               # Skip already-local images
               if img_url.startswith("/images/") or img_url.startswith("/assets/images/"):
                   continue
               
               try:
                   local_img = download_and_verify_image(
                       html.unescape(img_url),
                       f"{filename_slug}-{idx}",
                       news_title
                   )

                   # Replace remote URL with local path
                   existing_content = existing_content.replace(img_url, local_img)

               except Exception as e:
                   print(f"Failed image download: {img_url} -> {e}")

           with open(file_path, "w", encoding="utf-8") as f:
               f.write(existing_content)

        continue

        article_content = generate_article(prompt, news_summary)

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

print("\nFINAL IMAGE LIST")

for root, dirs, files in os.walk("static/images"):
    for file in files:
        print(os.path.join(root, file))
