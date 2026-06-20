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
from atproto import Client as BskyClient
import pytumblr

from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

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
    "https://venturebeat.com/feed/",

    "https://indialegallive.com/feed/",
    "https://www.livelaw.in/google_feeds.xml",
    "https://www.lawctopus.com/feed/"
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

def fetch_extended_article_text(url):
    """Visits the live article link to scrape full paragraphs for better AI context."""
    if not url: return None
    try:
        # We use a browser User-Agent so news sites don't block our bot
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        res = requests.get(url, headers=headers, timeout=10)
        
        if res.status_code == 200:
            # Extract all <p> tags using regex
            paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', res.text, re.IGNORECASE | re.DOTALL)
            # Strip internal HTML (like <a> links or <strong> tags) from the paragraphs
            clean_paragraphs = [re.sub(r'<[^>]+>', '', p).strip() for p in paragraphs]
            # Combine everything into one massive string
            full_text = " ".join(clean_paragraphs)
            return html.unescape(full_text)
    except Exception as e:
        print(f"      -> Could not fetch extended text: {e}")
    return None

def clean_scraped_content(raw_text):
    if not raw_text:
        return ""
        
    # 1. Nuke raw JavaScript and CSS blocks that leak through
    # This targets curly braces {} and common JS keywords that shouldn't be in news text
    js_patterns = [
        r'document\.querySelector.*?\}',
        r'function\(.*?\).*?\}',
        r'const.*?=.*?;',
        r'let.*?=.*?;',
        r'var.*?=.*?;',
        r'\.addEventListener.*?\}',
        r'\{.*?\}', # Blindly delete anything wrapped in curly braces (usually CSS or JS)
        r'@media.*?\)' # Delete CSS media queries
    ]
    
    cleaned = raw_text
    for pattern in js_patterns:
        cleaned = re.sub(pattern, "", cleaned, flags=re.DOTALL | re.IGNORECASE)

    # 2. Aggressive boundary cutting (Deletes everything BEFORE these known junk markers end)
    junk_regexes = [
        r'^.*?Crunchboard Contact Us',                 # TechCrunch
        r'^.*?FollowSee All [a-zA-Z\s]+',              # The Verge
        r'^.*?Getting the conversation ready\.\.\.',   # The Verge (Alternate)
        r'^.*?Save this story',                        # Wired
        r'^.*?Feature\s+Reviews.*?Tech\s+',            # ArsTechnica
        r'^.*?Home\s+»\s+Opportunities\s+&\s+Events.*?»', # Lawctopus navigation junk
        r'^.*?Surprise Me!.*?(?=[A-Z])'                # More Lawctopus menu junk
    ]
    
    for pattern in junk_regexes:
        cleaned = re.sub(pattern, "", cleaned, flags=re.DOTALL | re.IGNORECASE)
        
    # 3. Un-glue camel-case navigation words that leaked through
    cleaned = re.sub(r'([a-z])([A-Z])', r'\1 \2', cleaned)
    
    # 4. Nuke ALL massive spacing, tabs, and multiple newlines into a single space
    cleaned = re.sub(r'\s+', ' ', cleaned)
    
    return cleaned.strip()

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

def share_to_social_media(title, slug, summary, image_path):
    from datetime import datetime, timezone
    print(f"\n📣 Broadcasting to Social Media: {title}")
    
    post_url = f"https://luckytaorem.github.io/blog/posts/{slug}/"
    today = datetime.now(timezone.utc).strftime('%B %d, %Y')
    
    # Clean the summary to filter out raw navigation bar HTML scrapes
    clean_summary = summary.replace("The Verge", "").strip()
    clean_summary = clean_summary[:100] + "..." if len(clean_summary) > 100 else clean_summary

    # -----------------------------------------
    # 1. BLUESKY
    # -----------------------------------------
    try:
        bsky_handle = os.environ.get("BSKY_HANDLE")
        bsky_password = os.environ.get("BSKY_PASSWORD")
        if bsky_handle and bsky_password:
            client = BskyClient()
            client.login(bsky_handle, bsky_password)
            
            # 1. Clean up the base summary text
            clean_summary = summary.replace("The Verge", "").strip()
            
            # 2. Define templates and unchanging parts
            header = f"{title} | {today}\n\n"
            footer = f"\n\nRead full breakdown below:\n{post_url}"
            
            # 3. Calculate exactly how many characters are left for the summary
            # Bluesky max limit is 300. Leave a safety buffer of 5 characters.
            max_allowed_total = 295 
            used_chars = len(header) + len(footer)
            available_chars_for_summary = max_allowed_total - used_chars
            
            # 4. Truncate the summary safely based on real remaining space
            if len(clean_summary) > available_chars_for_summary:
                # Subtract 3 to fit the "..." ellipsis nicely
                clean_summary = clean_summary[:available_chars_for_summary - 3] + "..."
            
            # 5. Build final post text guaranteed to be under 300 characters
            bsky_text = f"{header}{clean_summary}{footer}"
            
            if os.path.exists(image_path):
                with open(image_path, 'rb') as f:
                    img_data = f.read()
                client.send_image(text=bsky_text, image=img_data, image_alt=title)
            else:
                client.send_post(text=bsky_text)
                
            print("  🦋 Success: Posted to Bluesky")
        else:
            print("  ⚠️ Skipped Bluesky: Credentials missing")
    except Exception as e:
        print(f"  ❌ Failed Bluesky: {e}")

    # -----------------------------------------
    # 2. FACEBOOK PAGE
    # -----------------------------------------
    try:
        fb_token = os.environ.get("FB_PAGE_TOKEN")
        fb_page_id = os.environ.get("FB_PAGE_ID")
        if fb_token and fb_page_id:
            fb_url = f"https://graph.facebook.com/v19.0/{fb_page_id}/photos"
            fb_msg = f"{title} | {today}\n\n{clean_summary}\n\nRead full breakdown below:\n{post_url}"
            
            # Post as a Photo post instead of a text feed post for better engagement
            if os.path.exists(image_path):
                with open(image_path, 'rb') as f:
                    files = {'file': f}
                    data = {'caption': fb_msg, 'access_token': fb_token}
                    res = requests.post(fb_url, files=files, data=data)
            else:
                feed_url = f"https://graph.facebook.com/v19.0/{fb_page_id}/feed"
                res = requests.post(feed_url, data={'message': fb_msg, 'access_token': fb_token})
                
            if res.status_code == 200:
                print("  📘 Success: Posted to Facebook")
            else:
                print(f"  ❌ Failed Facebook: {res.text}")
        else:
            print("  ⚠️ Skipped Facebook: Credentials missing")
    except Exception as e:
        print(f"  ❌ Failed Facebook: {e}")

    # -----------------------------------------
    # 3. TUMBLR
    # -----------------------------------------
    try:
        t_key = os.environ.get("TUMBLR_KEY")
        t_secret = os.environ.get("TUMBLR_SECRET")
        t_oauth = os.environ.get("TUMBLR_OAUTH")
        t_oauth_secret = os.environ.get("TUMBLR_OAUTH_SECRET")
        t_blog = os.environ.get("TUMBLR_BLOG_NAME")
        
        if all([t_key, t_secret, t_oauth, t_oauth_secret, t_blog]):
            client = pytumblr.TumblrRestClient(t_key, t_secret, t_oauth, t_oauth_secret)
            
            caption_html = f"<h2>{title} | {today}</h2><p>{clean_summary}</p><p><a href='{post_url}'>Read full breakdown below: {post_url}</a></p>"
            
            if os.path.exists(image_path):
                client.create_photo(t_blog, state="published", data=image_path, caption=caption_html, link=post_url)
            else:
                client.create_link(t_blog, state="published", title=f"{title} | {today}", url=post_url, description=caption_html)
                
            print("  🆃 Success: Posted to Tumblr")
        else:
            print("  ⚠️ Skipped Tumblr: Credentials missing")
    except Exception as e:
        print(f"  ❌ Failed Tumblr: {e}")
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
            
            # 🚨 NEW: Block Job Posts, Internships, and Academic Calls 🚨
            skip_keywords = [
                "job post", "hiring", "vacancy", "internship", 
                "call for papers", "call for blogs", "apply now","Register"
            ]
            if any(keyword in news_title.lower() for keyword in skip_keywords):
                print(f"Skipping non-news post: {news_title}")
                continue
            # ---------------------------------------------------------
            
            # 1. Skip if already in Queue
            if news_title in existing_queue_titles: continue
            
            # Generate the slug immediately
            filename_slug = re.sub(r'[^\w\s-]', '', news_title).strip().lower()
            filename_slug = re.sub(r'[-\s]+', '-', filename_slug)

            # 2. Skip if already Published by checking if the file exists directly
            expected_file_path = os.path.join(output_dir, f"{filename_slug}.md")
            if os.path.exists(expected_file_path):
                # print(f"Duplicate found on disk: {news_title}. Skipping.")
                continue

            print(f"Found NEW article: {news_title}")
            
            # --- EXTENDED CONTEXT EXTRACTION ---
            raw_rss_content = entry.get('summary', '')
            if 'content' in entry:
                raw_rss_content = " ".join([c.value for c in entry.content])
            
            # 1. SMART FETCH: If the RSS feed gives us a massive, clean article (like LiveLaw Google Feed), use it!
            if len(raw_rss_content) > 800:
                print("  -> Full article found in RSS XML. Bypassing web scraper!")
                # Nuke any rogue scripts just in case
                safe_html = re.sub(r'<script[^>]*>.*?</script>', ' ', raw_rss_content, flags=re.IGNORECASE | re.DOTALL)
                safe_html = re.sub(r'<style[^>]*>.*?</style>', ' ', safe_html, flags=re.IGNORECASE | re.DOTALL)
                extended_text = re.sub(r'<[^>]+>', ' ', safe_html)
                
            # 2. Otherwise, the RSS is just a short snippet, so we MUST scrape the live webpage
            else:
                print("  -> Short RSS snippet detected. Scraping live webpage...")
                article_link = entry.get('link', '')
                extended_text = fetch_extended_article_text(article_link)
                
                # Failsafe if the live scrape fails
                if not extended_text or len(extended_text) < 200:
                    extended_text = re.sub(r'<[^>]+>', ' ', raw_rss_content)

            # Clean it up and cap it at 3500 characters so it doesn't overload the AI prompt limit
            unescaped_text = html.unescape(extended_text)
            cleaned_text = clean_scraped_content(unescaped_text)
            final_summary = cleaned_text[:3500]
            # -----------------------------------
            # -----------------------------------

            # Save clean text to queue
            queue.append({
                "title": news_title,
                "slug": filename_slug,
                "summary": final_summary,
                "raw_image_url": extract_rss_image(entry)
            })

    print(f"\nTotal articles now waiting in queue: {len(queue)}")
    
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(queue, f, indent=4)
        
    git_commit_and_push("Updated article queue")


def safe_json(response):
    try:
        return response.json()
    except Exception:
        return None


def extract_text(data):
    if data is None:
        return None

    if isinstance(data, str):
        data = data.strip()
        return data if data else None

    if isinstance(data, dict):
        for key in (
            "content", "text", "message",
            "output", "outputs", "result",
            "response", "reasoning"
        ):
            if key in data:
                result = extract_text(data[key])
                if result:
                    return result

        for value in data.values():
            result = extract_text(value)
            if result:
                return result

    elif isinstance(data, list):
        for item in data:
            result = extract_text(item)
            if result:
                return result

    return None

def ping_google_indexing_api(post_slug):
    print(f"📡 Pinging Google Indexing API for: {post_slug}")
    live_url = f"https://luckytaorem.github.io/blog/posts/{post_slug}/"
    gcp_json_string = os.environ.get("GCP_INDEXING_JSON")
    
    if not gcp_json_string:
        print("⚠️ Skipped: GCP_INDEXING_JSON not found in environment.")
        return

    try:
        credentials_dict = json.loads(gcp_json_string)
        credentials = service_account.Credentials.from_service_account_info(
            credentials_dict, scopes=['https://www.googleapis.com/auth/indexing']
        )
        authed_session = AuthorizedSession(credentials)
        response = authed_session.post(
            'https://indexing.googleapis.com/v3/urlNotifications:publish',
            json={"url": live_url, "type": "URL_UPDATED"}
        )
        if response.status_code == 200:
            print(f"  ✅ Success! Google will index {live_url} shortly.")
        else:
            print(f"  ⚠️ Google API Error {response.status_code}: {response.text}")
    except Exception as e:
        print(f"  🚨 Failed to notify Google: {e}")

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

    published_articles = []

    print(f"Publishing {len(batch)} articles. {len(remaining_queue)} remaining in queue.")

    for article in batch:
        print(f"\nWriting: {article['title']}")
        file_path = os.path.join(output_dir, article['slug'] + ".md")

        # Download image or generate fallback
        image_url = download_and_verify_image(article['raw_image_url'], article['slug'], article['title'])

        prompt = f"""
Act as an expert tech journalist and strict SEO specialist. Read this short news summary: {article['summary']}

Write a highly engaging, in-depth technical blog post about this topic. 
You MUST write a minimum of [WORD_COUNT] words. Do not summarize; provide extensive details, analysis, and context.
Include headings, bullet points, and an FAQ section. Output in pure Markdown format.

CRITICAL FRONTMATTER RULES (FAILURE IS NOT AN OPTION):
1. Title Limit: STRICTLY 45 to 55 characters. No more, no less. (Count letters and spaces carefully).
2. Description Limit: STRICTLY 140 to 150 characters.
3. Category Array: You MUST select EXACTLY ONE (1) category from the allowed list. 
   - WRONG: categories: ["Software", "Hardware"]
   - RIGHT: categories: ["Software"]

ALLOWED CATEGORIES LIST:
{', '.join(VALID_CATEGORIES)}

YOUR OUTPUT MUST START EXACTLY WITH THIS YAML BLOCK. DO NOT DEVIATE:
---
title: "[Insert 45-55 Char Title Here]"
date: {datetime.now(timezone.utc).isoformat()}
draft: false
images: ["{image_url}"]
thumbnail: "{image_url}"
description: "[Insert 140-150 Char Description Here]"
categories: ["[EXACTLY ONE CATEGORY STRING]"]
tags: ["[Tag 1]", "[Tag 2]", "[Tag 3]"]
---

CRITICAL BODY RULES:
DO NOT use any H1 (`#`) tags in the body of the article. Only use H2 (`##`) for main sections and H3 (`###`) for subsections.
"""

        # --- ROBUST MULTI-PROVIDER WATERFALL CONFIGURATION ---
        # Ordered strategically by performance, output capacity, and free tier stability
        model_settings = [
            {"provider": "groq", "model": "llama-3.3-70b-versatile", "word_count": "1800"},
            {"provider": "groq", "model": "llama-3.1-8b-instant", "word_count": "1500"},
            {"provider": "mistral", "model": "mistral-large-latest", "word_count": "1500"},
            {"provider": "gemini", "model": "gemini-2.5-flash", "word_count": "1500"},
            {"provider": "openrouter", "model": "openrouter/free", "word_count": "1500"},
            {"provider": "cohere", "model": "command-r-plus", "word_count": "1500"}
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
                        timeout=120
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

                # GEMINI
                elif provider == "gemini":
                    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
                    if not GEMINI_API_KEY:
                        continue
                    
                    res = requests.post(
                        f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GEMINI_API_KEY}",
                        headers={
                            "Content-Type": "application/json"
                        },
                        json={
                            "contents": [{
                                "parts": [{
                                    "text": (
                                        "You are a professional tech blogger. "
                                        "You write exceptionally long, detailed, and comprehensive technical articles.\n\n"
                                        + diet_prompt
                                    )
                                }]
                            }],
                            "generationConfig": {
                                "maxOutputTokens": 8192,
                                "temperature": 0.7
                            }
                        },
                        timeout=120
                    )

                    if res.status_code == 200:
                        data = safe_json(res)
                        article_content = extract_text(data)

                        if article_content:
                            article_content = article_content.strip()
                    else:
                        print(f"     -> Provider error: {res.text}")

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

        # ==========================================
        # ABORT AND APPEND BACK TO QUEUE LOGIC 
        # (Keep your existing abort logic here)
        # ==========================================

        # Clean Markdown Blocks
        start_pattern = r"^" + chr(96)*3 + r"(?:markdown)?\s*\n"
        end_pattern = r"\n" + chr(96)*3 + r"\s*$"
        article_content = re.sub(start_pattern, "", article_content, flags=re.IGNORECASE)
        article_content = re.sub(end_pattern, "", article_content)

        # 1. Fix Missing Top Frontmatter
        if not article_content.startswith("---"):
            first_dash_idx = article_content.find("---")
            if first_dash_idx != -1: 
                article_content = article_content[first_dash_idx:]
            else: 
                safe_title = article['title'].replace('"', "'")
                article_content = f"---\ntitle: \"{safe_title}\"\ndate: {datetime.now(timezone.utc).isoformat()}\ndraft: false\nimages: [\"{image_url}\"]\n---\n\n" + article_content

        # 2. BULLETPROOF Frontmatter Closer
        if article_content.startswith("---"):
            # Check if there is a valid closing --- on its own line
            if not re.search(r'^---\s*$', article_content[3:], re.MULTILINE):
                
                # The AI forgot to close it! Find the 'tags: [...]' line to safely inject it right below
                tags_match = re.search(r'^tags:\s*\[.*?\]', article_content, re.MULTILINE | re.IGNORECASE)
                
                if tags_match:
                    insert_point = tags_match.end()
                    # Inject the closing dashes exactly where they belong
                    article_content = article_content[:insert_point] + "\n---\n\n" + article_content[insert_point:].lstrip('- \n')
                else:
                    # Absolute last resort fallback
                    parts = article_content.split('\n\n', 1)
                    if len(parts) == 2:
                        article_content = parts[0] + "\n---\n\n" + parts[1]

        # 3 & 4. Robustly Sanitize Title and Description Quotes & Escapes
        def sanitize_frontmatter_line(line_prefix, current_content):
            pattern = rf'^{line_prefix}:\s*(.*)$'
            match = re.search(pattern, current_content, re.MULTILINE)
            if not match:
                return current_content
            
            raw_val = match.group(1).strip()
            # Strip outer quotes, spaces, and stray backslashes
            clean_val = re.sub(r'^["\'\s\\]+|["\'\s\\]+$', '', raw_val)
            # Remove literal "\'" and '\"' and swap internal double quotes to single
            clean_val = clean_val.replace("\\'", "'").replace('\\"', "'").replace('"', "'")
            
            return re.sub(pattern, f'{line_prefix}: "{clean_val}"', current_content, flags=re.MULTILINE)

        article_content = sanitize_frontmatter_line("title", article_content)
        article_content = sanitize_frontmatter_line("description", article_content)

        # 🚨 RUTHLESS CATEGORY ENFORCER 🚨
        # Matches any array format the AI tries to output: ["Cat1"] or ["Cat1", "Cat2"]
        cat_match = re.search(r'categories:\s*\[(.*?)\]', article_content, re.IGNORECASE)
        if cat_match:
            raw_category_string = cat_match.group(1)
            
            # Split by comma, take ONLY the first item, and strip out any quotes or spaces
            first_category = raw_category_string.split(',')[0].replace('"', '').replace("'", "").strip()
            
            safe_category = first_category
            
            # Verify the single category against the master list
            if safe_category not in VALID_CATEGORIES:
                from difflib import get_close_matches
                closest = get_close_matches(safe_category, VALID_CATEGORIES, n=1, cutoff=0.4)
                safe_category = closest[0] if closest else "Other"
            
            # Forcefully overwrite the entire line to guarantee a single-item array
            article_content = re.sub(
                r'categories:\s*\[.*?\]', 
                f'categories: ["{safe_category}"]', 
                article_content, 
                flags=re.IGNORECASE
            )
            
        img_line_match = re.search(r'^images:\s*\[(.*)\]', article_content, re.MULTILINE)
        if img_line_match:
            clean_img_path = re.sub(r'[\'\"\\\[\]]', '', img_line_match.group(1)).strip()
            article_content = re.sub(r'^images:\s*\[.*\]', f'images: ["{clean_img_path}"]', article_content, flags=re.MULTILINE)

        thumb_line_match = re.search(r'^thumbnail:\s*(.*)', article_content, re.MULTILINE)
        if thumb_line_match:
            clean_thumb_path = re.sub(r'[\'\"\\\[\]]', '', thumb_line_match.group(1)).strip()
            article_content = re.sub(r'^thumbnail:\s*.*', f'thumbnail: "{clean_thumb_path}"', article_content, flags=re.MULTILINE)

        article_content += "\n\n{{< comments >}}\n"
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(article_content)
        print(f"  ✅ Saved: {file_path}")

        published_articles.append(article)

    # Save the updated queue (minus the 3 we just published)
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(remaining_queue, f, indent=4)
        
    git_commit_and_push("Published article batch and updated queue", trigger_hugo=True)

    if published_articles:
        test_slug = published_articles[0]['slug']
        test_url = f"https://luckytaorem.github.io/blog/posts/{test_slug}/"
        print(f"\n⏳ Waiting for GitHub Pages deployment to finish...")
        
        site_live = False
        for i in range(40): # Check every 15 seconds for up to 5 minutes
            time.sleep(15)
            try:
                # Add a timestamp query to completely bypass browser/server caching
                check_url = f"{test_url}?nocache={int(time.time())}"
                r = requests.get(check_url, headers={'User-Agent': 'Mozilla/5.0'})
                if r.status_code == 200:
                    site_live = True
                    print("✅ Deployment complete! The URLs are now live.")
                    break
            except Exception:
                pass
            print(f"  ... checking server ({i+1}/20)")
            
        if not site_live:
            print("⚠️ Warning: Site did not go live within 5 minutes, but proceeding with broadcast.")

        # 🚨 3. Now that the site is live, ping Google and share to Social Media!
        for article in published_articles:
            ping_google_indexing_api(article['slug'])
            local_img_path = os.path.join("assets", "images", f"{article['slug']}.jpg")
            share_to_social_media(article['title'], article['slug'], article['summary'], local_img_path)

# ==========================================
# 5. EXECUTION ROUTER
# ==========================================
if __name__ == "__main__":
    # Removed the sanitize function so it stops touching old files!

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
