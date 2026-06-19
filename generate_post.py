import os
import feedparser
from groq import Groq
import re
import time
from datetime import datetime, timezone
import html
import requests
import json
import argparse
import subprocess
from PIL import Image, ImageDraw, ImageFont
import textwrap
from difflib import SequenceMatcher

print("WORKDIR:", os.getcwd())

# ==========================================
# 1. SETUP & CONFIGURATION
# ==========================================
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
UNSPLASH_KEY = os.environ.get("UNSPLASH_ACCESS_KEY")
QUEUE_FILE = "queue.json"

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
REQUIRED_DIRS = ["assets/images", output_dir]
for directory in REQUIRED_DIRS:
    os.makedirs(directory, exist_ok=True)

# ==========================================
# 2. CORE HELPER FUNCTIONS
# ==========================================
def get_existing_post_path(news_title):
    if not os.path.exists(output_dir): return None
    for fname in os.listdir(output_dir):
        if not fname.endswith('.md'): continue
        path = os.path.join(output_dir, fname)
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
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
    filepath = os.path.join(img_dir, f"{slug}.jpg")
    W, H = 1200, 630
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

    font_path = "Roboto-Bold.ttf"
    if os.path.exists(font_path) and os.path.getsize(font_path) < 10000: os.remove(font_path)
    if not os.path.exists(font_path):
        r = requests.get("https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Bold.ttf", timeout=10)
        if r.status_code == 200:
            with open(font_path, "wb") as f: f.write(r.content)
    try: font = ImageFont.truetype(font_path, 90)
    except Exception: font = ImageFont.load_default()

    wrapper = textwrap.TextWrapper(width=26)
    wrapped_text = wrapper.fill(text=title)
    
    try:
        bbox = draw.multiline_textbbox((0, 0), wrapped_text, font=font)
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    except AttributeError:
        w, h = draw.textsize(wrapped_text, font=font)

    x, y = (W - w) / 2, (H - h) / 2
    draw.multiline_text((x + 6, y + 6), wrapped_text, font=font, fill=(0, 0, 0), align="center")
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

def extract_rss_image(entry):
    if 'media_content' in entry:
        for media in entry.media_content:
            if 'url' in media: return media['url']
    if 'links' in entry:
        for link in entry.links:
            if link.get('rel') == 'enclosure' and 'image' in link.get('type', ''): return link.get('href')
    match = re.search(r'<img[^>]+src="([^">]+)"', entry.get('summary', '') + str(entry.get('content', '')))
    if match: return match.group(1)
    return None

def download_and_verify_image(url, slug, title):
    img_dir = "assets/images"
    filepath = os.path.join(img_dir, f"{slug}.jpg")
    
    # Try the provided URL first
    if url and not url.startswith("images/"):
        try:
            headers = {'User-Agent': 'Mozilla/5.0'}
            r = requests.get(url, headers=headers, timeout=10)
            if r.status_code == 200:
                with open(filepath, 'wb') as f: f.write(r.content)
                with Image.open(filepath) as img: img.verify()
                return f"images/{slug}.jpg"
        except Exception: pass 
        
    # If RSS had no image or it failed, try Unsplash
    unsplash_url = get_unsplash_image(title)
    if unsplash_url:
        try:
            r = requests.get(unsplash_url, timeout=10)
            if r.status_code == 200:
                with open(filepath, 'wb') as f: f.write(r.content)
                with Image.open(filepath) as img: img.verify()
                return f"images/{slug}.jpg"
        except Exception: pass

    # If all else fails, use the Space background
    return generate_fallback_image(title, slug)

def git_commit_and_push(message, trigger_hugo=False):
    print(f"\n📦 Committing changes: {message}")
    try:
        subprocess.run(["git", "config", "--global", "user.name", "AI Automation Bot"], check=True)
        subprocess.run(["git", "config", "--global", "user.email", "actions@github.com"], check=True)
        
        # --- STRICT FILE TARGETING ---
        subprocess.run(["git", "add", "content/posts/"], check=True)
        subprocess.run(["git", "add", "assets/images/"], check=True)
        subprocess.run(["git", "add", "queue.json"], check=True)
        
        # Optional: You can keep static/images/ if you still have files going there, 
        # but we fixed the paths earlier so assets/images/ is the main one now!
        # subprocess.run(["git", "add", "static/images/"], check=True) 
        # -----------------------------

        subprocess.run(["git", "commit", "-m", message], check=False) # allow fail if no changes
        subprocess.run(["git", "pull", "--rebase", "origin", "main"], check=True)
        subprocess.run(["git", "push"], check=True)
        
        if trigger_hugo:
            print("🌐 Triggering Hugo rebuild...")
            subprocess.run(["gh", "workflow", "run", "hugo.yaml", "--ref", "main"], check=True)
        print("✅ Git operations complete!")
    except Exception as e:
        print(f"⚠️ Git/Hugo operation failed: {e}")

# ==========================================
# 3. SCRAPE MODE (Runs at 8 AM / 8 PM)
# ==========================================
def run_scraper():
    print("\n--- 🕵️ STARTING RSS SCRAPER ---")
    
    queue = []
    if os.path.exists(QUEUE_FILE):
        with open(QUEUE_FILE, "r") as f:
            try: queue = json.load(f)
            except: queue = []
            
    existing_queue_titles = [item['title'] for item in queue]

    for current_feed in RSS_FEEDS:
        print(f"\nChecking {current_feed}...")
        feed = feedparser.parse(current_feed)

        if not getattr(feed, "entries", None): continue

        for entry in feed.entries:
            published_struct = entry.get('published_parsed') or entry.get('updated_parsed')
            if not published_struct: continue

            published_dt = datetime.fromtimestamp(time.mktime(published_struct), tz=timezone.utc)
            if published_dt.date() != datetime.now(timezone.utc).date(): continue

            news_title = html.unescape(entry.get('title', 'NO TITLE'))
            
            # 1. Skip if already in Queue
            if news_title in existing_queue_titles: continue
            
            # 2. Skip if already Published (NO IMAGE UPDATES, JUST SKIP)
            if get_existing_post_path(news_title):
                print(f"Duplicate found: {news_title}. Skipping entirely.")
                continue

            print(f"Found NEW article: {news_title}")
            filename_slug = re.sub(r'[^\w\s-]', '', news_title).strip().lower()
            filename_slug = re.sub(r'[-\s]+', '-', filename_slug)
            
            # Save clean text to queue to avoid JSON serialization errors
            queue.append({
                "title": news_title,
                "slug": filename_slug,
                "summary": html.unescape(entry.get('summary', '')),
                "raw_image_url": extract_rss_image(entry)
            })

    print(f"\nTotal articles now waiting in queue: {len(queue)}")
    
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(queue, f, indent=4)
        
    git_commit_and_push("Updated article queue")

# ==========================================
# 4. PUBLISH MODE (Runs every hour)
# ==========================================
def run_publisher():
    print("\n--- 🚀 STARTING BATCH PUBLISHER ---")
    
    if not os.path.exists(QUEUE_FILE):
        print("Queue file not found. Nothing to publish.")
        return

    with open(QUEUE_FILE, "r") as f:
        queue = json.load(f)

    if not queue:
        print("Queue is empty. Waiting for next scraper run.")
        return

    # Take the first 3 articles, leave the rest in the queue
    BATCH_SIZE = 3
    batch = queue[:BATCH_SIZE]
    remaining_queue = queue[BATCH_SIZE:]

    print(f"Publishing {len(batch)} articles. {len(remaining_queue)} remaining in queue.")

    for article in batch:
        print(f"\nWriting: {article['title']}")
        file_path = os.path.join(output_dir, article['slug'] + ".md")

        # Download image or generate fallback
        image_url = download_and_verify_image(article['raw_image_url'], article['slug'], article['title'])

        prompt = f"""
Act as an expert tech journalist and SEO specialist. Read this short news summary: {article['summary']}

Write a highly engaging, in-depth technical blog post about this topic. 
You MUST write a minimum of [WORD_COUNT] words. Do not summarize; provide extensive details, analysis, and context.
Include headings, bullet points, and an FAQ section. Output in pure Markdown format.

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
You must evaluate the article and pick EXACTLY ONE category from this exact list: {', '.join(VALID_CATEGORIES)}.
"""

        # --- ROBUST MULTI-PROVIDER WATERFALL CONFIGURATION ---
        # Ordered strategically by performance, output capacity, and free tier stability
        model_settings = [
            {"provider": "groq", "model": "llama-3.3-70b-versatile", "word_count": "1800"},
            {"provider": "groq", "model": "llama-3.1-8b-instant", "word_count": "1500"},
            {"provider": "cerebras", "model": "llama-3.3-70b", "word_count": "1500"},
            {"provider": "mistral", "model": "mistral-large-latest", "word_count": "1500"},
            {"provider": "openrouter", "model": "meta-llama/llama-3.3-70b-instruct:free", "word_count": "1500"},
            {"provider": "cohere", "model": "command-r-plus", "word_count": "1500"},
            {"provider": "deepseek", "model": "deepseek-chat", "word_count": "1500"}
        ]

        article_content = None

        for setting in model_settings:
            provider = setting['provider']
            model_name = setting['model']
            diet_prompt = prompt.replace("[WORD_COUNT]", setting['word_count'])
            
            print(f"  -> Attempting generation with {provider.upper()} ({model_name})...")

            try:
                # 1. GROQ
                if provider == "groq":
                    response = client.chat.completions.create(
                        messages=[
                            {"role": "system", "content": "You are a professional tech blogger. You write exceptionally long, detailed, and comprehensive technical articles."},
                            {"role": "user", "content": diet_prompt}
                        ],
                        model=model_name,
                        temperature=0.7,
                        max_tokens=6000, 
                    )
                    article_content = response.choices[0].message.content.strip()

                # 3. CEREBRAS
                elif provider == "cerebras":
                    key = os.environ.get("CEREBRAS_API_KEY")
                    if not key: continue
                    res = requests.post(
                        "https://api.cerebras.ai/v1/chat/completions",
                        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                        json={
                            "model": model_name,
                            "messages": [
                                {"role": "system", "content": "You are a professional tech blogger."},
                                {"role": "user", "content": diet_prompt}
                            ],
                            "temperature": 0.7, "max_tokens": 6000
                        },
                        timeout=60
                    )
                    if res.status_code == 200: article_content = res.json()['choices'][0]['message']['content'].strip()
                    else: print(f"     -> Provider error: {res.text}")

                # 4. MISTRAL AI
                elif provider == "mistral":
                    key = os.environ.get("MISTRAL_API_KEY")
                    if not key: continue
                    res = requests.post(
                        "https://api.mistral.ai/v1/chat/completions",
                        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                        json={
                            "model": model_name,
                            "messages": [
                                {"role": "system", "content": "You are a professional tech blogger."},
                                {"role": "user", "content": diet_prompt}
                            ],
                            "temperature": 0.7, "max_tokens": 4000
                        },
                        timeout=60
                    )
                    if res.status_code == 200: article_content = res.json()['choices'][0]['message']['content'].strip()
                    else: print(f"     -> Provider error: {res.text}")

                # 5. OPENROUTER (Uses Free Models)
                elif provider == "openrouter":
                    key = os.environ.get("OPENROUTER_API_KEY")
                    if not key: continue
                    res = requests.post(
                        "https://openrouter.ai/api/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {key}",
                            "Content-Type": "application/json",
                            "HTTP-Referer": "https://luckytaorem.github.io/blog/", 
                            "X-Title": "LT Developer Tech Blog"
                        },
                        json={
                            "model": model_name,
                            "messages": [
                                {"role": "system", "content": "You are a professional tech blogger."},
                                {"role": "user", "content": diet_prompt}
                            ],
                            "temperature": 0.7, "max_tokens": 4000
                        },
                        timeout=60
                    )
                    if res.status_code == 200: article_content = res.json()['choices'][0]['message']['content'].strip()
                    else: print(f"     -> Provider error: {res.text}")

                # 6. COHERE
                elif provider == "cohere":
                    key = os.environ.get("COHERE_API_KEY")
                    if not key: continue
                    res = requests.post(
                        "https://api.cohere.com/v1/chat",
                        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                        json={
                            "model": model_name,
                            "message": diet_prompt,
                            "preamble": "You are a professional tech blogger. You write exceptionally long, detailed, and comprehensive technical articles.",
                            "max_tokens": 4000
                        },
                        timeout=60
                    )
                    if res.status_code == 200: article_content = res.json().get('text', '').strip()
                    else: print(f"     -> Provider error: {res.text}")

                # 7. DEEPSEEK
                elif provider == "deepseek":
                    key = os.environ.get("DEEPSEEK_API_KEY")
                    if not key: continue
                    res = requests.post(
                        "https://api.deepseek.com/v1/chat/completions",
                        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                        json={
                            "model": model_name,
                            "messages": [
                                {"role": "system", "content": "You are a professional tech blogger."},
                                {"role": "user", "content": diet_prompt}
                            ],
                            "temperature": 0.7, "max_tokens": 4000
                        },
                        timeout=60
                    )
                    if res.status_code == 200: article_content = res.json()['choices'][0]['message']['content'].strip()
                    else: print(f"     -> Provider error: {res.text}")

                # Verification: If we successfully captured text, end the fallback cascade
                if article_content and len(article_content.split()) > 200:
                    break
                else:
                    article_content = None

            except Exception as e:
                print(f"     -> Internal Loop Error with {provider.upper()}: {e}")
                article_content = None
                continue

        # --- ABORT AND APPEND BACK TO QUEUE LOGIC ---
        if not article_content:
            print(f"  -> 🚨 CRITICAL: All API providers failed for: '{article['title']}'.")
            # Push the article to the back of the queue so it re-runs during the next automated invocation
            remaining_queue.append(article)
            continue

        # Clean Markdown Blocks
        start_pattern = r"^" + chr(96)*3 + r"(?:markdown)?\s*\n"
        end_pattern = r"\n" + chr(96)*3 + r"\s*$"
        article_content = re.sub(start_pattern, "", article_content, flags=re.IGNORECASE)
        article_content = re.sub(end_pattern, "", article_content)

        # Fix Frontmatter
        if not article_content.startswith("---"):
            first_dash_idx = article_content.find("---")
            if first_dash_idx != -1: article_content = article_content[first_dash_idx:]
            else: article_content = f"---\ntitle: \"{article['title']}\"\ndate: {datetime.now(timezone.utc).isoformat()}\ndraft: false\nimages: [\"{image_url}\"]\n---\n\n" + article_content

        # Fix Categories
        cat_match = re.search(r'categories:\s*\["([^"]+)"\]', article_content)
        if cat_match:
            ai_category = cat_match.group(1)
            if ai_category not in VALID_CATEGORIES:
                from difflib import get_close_matches
                closest = get_close_matches(ai_category, VALID_CATEGORIES, n=1, cutoff=0.4)
                safe_category = closest[0] if closest else "Other"
                article_content = article_content.replace(f'categories: ["{ai_category}"]', f'categories: ["{safe_category}"]')

        article_content += "\n\n{{< comments >}}\n"
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(article_content)
        print(f"  ✅ Saved: {file_path}")

    # Save the updated queue (minus the 3 we just published)
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(remaining_queue, f, indent=4)
        
    git_commit_and_push("Published article batch and updated queue", trigger_hugo=True)

# ==========================================
# 5. EXECUTION ROUTER
# ==========================================
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--scrape", action="store_true", help="Scrape new articles and add to queue")
    parser.add_argument("--publish", action="store_true", help="Publish next batch from the queue")
    args = parser.parse_args()

    if args.scrape:
        run_scraper()
    elif args.publish:
        run_publisher()
    else:
        print("Please provide a flag: --scrape or --publish")
