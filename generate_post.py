import os
import feedparser
import unicodedata
from groq import Groq
import re
import time
from datetime import datetime, timezone, timedelta
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
# Provide a dummy fallback so local utility flags (like --fix-links) don't crash on startup
groq_key = os.environ.get("GROQ_API_KEY") or "local_dummy_key"
client = Groq(api_key=groq_key)
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
    "https://www.engadget.com/rss.xml",
    "https://9to5mac.com/feed/",
    "https://feeds.macrumors.com/MacRumors-All",
    "https://www.technologyreview.com/feed/",
    "https://feeds.feedburner.com/nvidiablog",
    "https://openai.com/news/rss.xml"
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
                with open(filepath, 'wb') as f: 
                    f.write(r.content)
                try:
                    # Verify it's a real image
                    with Image.open(filepath) as img: 
                        img.verify()
                    return f"images/{slug}.jpg"
                except Exception:
                    # 🚨 CORRUPTED FILE: Delete it immediately so it doesn't crash Hugo
                    if os.path.exists(filepath):
                        os.remove(filepath)
        except Exception: 
            pass 
        
    # If RSS had no image or it failed, try Unsplash
    unsplash_url = get_unsplash_image(title)
    if unsplash_url:
        try:
            r = requests.get(unsplash_url, timeout=10)
            if r.status_code == 200:
                with open(filepath, 'wb') as f: 
                    f.write(r.content)
                try:
                    with Image.open(filepath) as img: 
                        img.verify()
                    return f"images/{slug}.jpg"
                except Exception:
                    # 🚨 CORRUPTED FILE: Delete it immediately so it doesn't crash Hugo
                    if os.path.exists(filepath):
                        os.remove(filepath)
        except Exception: 
            pass

    # If all else fails, generate the Space background (which is safely constructed via Pillow)
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

def truncate_to_sentence(text, max_chars):
    """Truncates text to fit max_chars, ending cleanly at a complete sentence boundary."""
    if len(text) <= max_chars:
        return text.strip()
    
    cut_text = text[:max_chars]
    # Find the last sentence-ending punctuation (. ! ?) inside the cut threshold
    match = list(re.finditer(r'[.!?](?=\s|$)', cut_text))
    
    if match and match[-1].end() >= 20: # Ensure we don't end up with an unnaturally short snippet
        return cut_text[:match[-1].end()].strip()
    
    # Failsafe: if no full sentence fits, cut gracefully at the last complete word
    space_cut = cut_text.rfind(' ')
    if space_cut > 0:
        return cut_text[:space_cut].strip() + "..."
    return cut_text.strip() + "..."

def convert_markdown_tables_to_lists(text):
    """Converts Markdown tables into readable bulleted lists for social media."""
    lines = text.split('\n')
    output = []
    in_table = False
    headers = []
    
    for line in lines:
        stripped = line.strip()
        # Detect standard markdown table rows (starts and ends with |)
        if stripped.startswith('|') and stripped.endswith('|'):
            # Check if this is the structural separator line (e.g., |---|---|)
            if re.match(r'^\|[\-\s:]+\|$', stripped.replace('|', '')):
                continue
                
            # Extract the cells
            cells = [cell.strip() for cell in stripped.strip('|').split('|')]
            
            if not in_table:
                # The first row of a table is always the header
                headers = cells
                in_table = True
                output.append("") # Ensure space before the new list starts
            else:
                # Data rows
                if cells:
                    item_title = cells[0]
                    # Make the first column the bold/main header of the list item
                    output.append(f"🔹 **{item_title}**")
                    
                    # Iterate through the remaining columns
                    for i in range(1, len(cells)):
                        if i < len(headers) and cells[i] and cells[i] != '-':
                            output.append(f"  • {headers[i]}: {cells[i]}")
                    output.append("") # Space between items
        else:
            in_table = False
            output.append(line)
            
    return '\n'.join(output).strip()

def extract_key_facts_with_ai(raw_text, title):
    """Uses AI to extract critical facts from raw scraped text before saving to queue."""
    if not raw_text or len(raw_text) < 300:
        return raw_text # Too short to bother summarizing
        
    # We can send a massive chunk to the AI to read (up to 12,000 chars)
    content_to_analyze = raw_text[:12000]
    
    prompt = f"""
    You are an expert tech research assistant. Analyze the following raw scraped text for an article titled "{title}".
    Extract all crucial facts with high structural accuracy so a journalist can draft an incredibly exhaustive, highly detailed article later.
    
    CRITICAL STRUCTURAL REQUIREMENT:
    If this article is a listicle, comparison, round-up, or breakdown of multiple items (e.g., "Top 10 Products", "20 New Features", "Best Apps"), YOU MUST EXHAUSTIVELY EXTRACT EVERY SINGLE ITEM listed in the text. Do not compress, skip, or group them into general summaries. If there are 20 features, extract all 20 features individually with their specific parameters and descriptions.
    
    YOU MUST EXTRACT (if present in the text):
    - The Core Story / Main Event
    - Important Names, Companies, Brands, or Key People
    - Complete List of Products/Features (Extract EVERY item sequentially with individual pricing, specifications, or core functionalities)
    - Pricing, Release Dates, or Financial Numbers
    - 1 or 2 Direct Quotes (Retain exact original phrasing)

    Format as a clean, structured bulleted list. Maintain chronological or sequential order matching the source text to ensure accuracy to the original. DO NOT write an article commentary. Just the comprehensive facts.
    
    RAW TEXT:
    {content_to_analyze}
    """
    
    model_settings = [
        {"provider": "groq", "model": "openai/gpt-oss-20b"},
        {"provider": "github", "model": "gpt-4o-mini"},
        {"provider": "gemini", "model": "gemini-2.5-flash"},
        {"provider": "mistral", "model": "mistral-large-latest"},
        {"provider": "openrouter", "model": "google/gemma-4-31b-it"},
        {"provider": "cohere", "model": "command-a-03-2025"}
    ]

    for setting in model_settings:
        provider = setting["provider"]
        model_name = setting["model"]

        try:
            # 1. GROQ
            if provider == "groq":
                api_key = os.environ.get("GROQ_API_KEY")
                if not api_key:
                    continue
                response = client.chat.completions.create(
                    messages=[{"role": "user", "content": prompt}],
                    model=model_name,
                    temperature=0.1,
                    max_tokens=2500
                )
                content = response.choices[0].message.content or ""
                if content.strip():
                    return content.strip()

            # 2. GITHUB MODELS API
            elif provider == "github":
                key = os.environ.get("GH_TOKEN")
                if not key:
                    continue
                res = requests.post(
                    "https://models.inference.ai.azure.com/chat/completions",
                    headers={
                        "Authorization": f"Bearer {key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": model_name,
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": 0.1,
                        "max_tokens": 2500
                    },
                    timeout=30
                )
                if res.status_code == 200:
                    content = res.json().get('choices', [{}])[0].get('message', {}).get('content')
                    if content and content.strip():
                        return content.strip()

            # 3. GEMINI
            elif provider == "gemini":
                key = os.environ.get("GEMINI_API_KEY")
                if not key:
                    continue
                res = requests.post(
                    f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={key}",
                    headers={"Content-Type": "application/json"},
                    json={
                        "contents": [{"parts": [{"text": prompt}]}],
                        "generationConfig": {
                            "maxOutputTokens": 2500,
                            "temperature": 0.1
                        }
                    },
                    timeout=30
                )
                if res.status_code == 200:
                    data = safe_json(res)
                    content = extract_text(data)
                    if content and content.strip():
                        return content.strip()

            # 4. MISTRAL
            elif provider == "mistral":
                key = os.environ.get("MISTRAL_API_KEY")
                if not key:
                    continue
                res = requests.post(
                    "https://api.mistral.ai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                    json={
                        "model": model_name,
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": 0.1,
                        "max_tokens": 2500
                    },
                    timeout=30
                )
                if res.status_code == 200:
                    content = res.json().get('choices', [{}])[0].get('message', {}).get('content')
                    if content and content.strip():
                        return content.strip()

            # 5. OPENROUTER
            elif provider == "openrouter":
                key = os.environ.get("OPENROUTER_API_KEY")
                if not key:
                    continue
                res = requests.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {key}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://ltdeveloperblogs.github.io/", 
                        "X-Title": "LT Developer Tech Blog"
                    },
                    json={
                        "model": model_name,
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": 0.1,
                        "max_tokens": 2500
                    },
                    timeout=30
                )
                if res.status_code == 200:
                    content = res.json().get('choices', [{}])[0].get('message', {}).get('content')
                    if content and content.strip():
                        return content.strip()

            # 6. COHERE
            elif provider == "cohere":
                key = os.environ.get("COHERE_API_KEY")
                if not key:
                    continue
                res = requests.post(
                    "https://api.cohere.com/v1/chat",
                    headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                    json={
                        "model": model_name,
                        "message": prompt,
                        "temperature": 0.1,
                        "max_tokens": 2500
                    },
                    timeout=30
                )
                if res.status_code == 200:
                    content = res.json().get('text')
                    if content and content.strip():
                        return content.strip()

        except Exception as e:
            print(f"      -> ⚠️ Fact extraction failed with {provider.upper()} ({model_name}): {e}")
            continue

    print("      -> 🚨 All AI providers failed for fact extraction. Falling back to raw text.")
    return raw_text[:3500]
    

import random

def get_internal_links_catalog(limit=5):
    """Grabs a catalog of recent articles so the AI can choose the most relevant ones."""
    if not os.path.exists(output_dir): 
        return "No internal links available yet."
        
    files = [f for f in os.listdir(output_dir) if f.endswith('.md') and f != '_index.md']
    if not files: 
        return "No internal links available yet."
    
    # Sort files by newest first (using file modification time)
    files.sort(key=lambda x: os.path.getmtime(os.path.join(output_dir, x)), reverse=True)
    selected_files = files[:limit]
    
    catalog = []
    for fname in selected_files:
        slug = fname.replace('.md', '')
        filepath = os.path.join(output_dir, fname)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                # Read just enough to grab the title
                content = f.read(500)
                title_match = re.search(r'^title:\s*"(.*?)"', content, re.MULTILINE)
                if title_match:
                    title = title_match.group(1)
                    # FIX: Removed the trailing slash to prevent Hugo theme crashes
                    catalog.append(f"- [{title}](https://ltdeveloperblogs.github.io/posts/{slug})")
        except Exception:
            continue
            
    if not catalog:
        return "No internal links available yet."
        
    return "\n".join(catalog)
    

def git_commit_and_push(message, trigger_hugo=False):
    print(f"\n📦 Committing changes: {message}")
    try:
        subprocess.run(["git", "config", "--global", "user.name", "AI Automation Bot"], check=True)
        subprocess.run(["git", "config", "--global", "user.email", "actions@github.com"], check=True)

        subprocess.run(["git", "add", "content/posts/"], check=True)
        subprocess.run(["git", "add", "assets/images/"], check=True)
        subprocess.run(["git", "add", "queue.json"], check=True)

        subprocess.run(["git", "commit", "-m", message], check=False)
        subprocess.run(["git", "pull", "--rebase", "origin", "main"], check=True)
        subprocess.run(["git", "push"], check=True)
        
        print("✅ Git operations complete!")
    except Exception as e:
        print(f"⚠️ Git/Hugo operation failed: {e}")

def get_clean_content_from_markdown(file_path):
    """Reads the local markdown file, strips frontmatter, and returns clean text body."""
    if not os.path.exists(file_path):
        print(f"  ❌ File not found: {file_path}")
        return "", ""

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract title from frontmatter
    title_match = re.search(r'^title:\s*"(.*?)"', content, re.MULTILINE)
    title = title_match.group(1) if title_match else "No Title Found"

    # Split frontmatter away to get pure body content
    parts = content.split("---")
    if len(parts) >= 3:
        # Safely rejoin in case the article body contains '---'
        body = "---".join(parts[2:]).strip()
    else:
        body = content

    # Clean up comments tags
    body = body.replace("{{< comments >}}", "")
    
    # 🚨 FIX: Normalize spacing but PRESERVE newlines for proper paragraphs!
    body = re.sub(r'[ \t]+', ' ', body)        # Fix double spaces/tabs
    body = re.sub(r'\n{3,}', '\n\n', body)     # Keep paragraph breaks, remove massive empty gaps
    
    return title, body.strip()

def share_to_social_media(file_path, slug, image_path):
    from datetime import datetime, timezone, timedelta
    
    # Fetch the pure, AI-generated text locally!
    title, article_body = get_clean_content_from_markdown(file_path)
    if not article_body:
        print(f"  ❌ Aborting broadcast for {slug}: No article body content found.")
        return

    # 🚨 FIX: Convert any Markdown tables into mobile-friendly lists FIRST
    article_body = convert_markdown_tables_to_lists(article_body)

    print(f"\n📣 Broadcasting to Social Media: {title}")
    
    post_url = f"https://ltdeveloperblogs.github.io/posts/{slug}/"

    post_categories = []
    post_tags = []
    
    # 🚨 IST Calculation
    ist_timezone = timezone(timedelta(hours=5, minutes=30))
    today = datetime.now(ist_timezone).strftime('%B %d, %Y')
    
    # 🚨 1. BASE MARKDOWN SUMMARY (Preserves everything for DEV.to)
    target_length = int(len(article_body) * 0.60)
    
    if len(article_body) > target_length:
        match = re.search(r'[.!?](?=\s|$)', article_body[target_length:])
        if match:
            cut_index = target_length + match.end()
            base_markdown_summary = article_body[:cut_index].strip()
        else:
            base_markdown_summary = article_body[:target_length].strip() + "..."
    else:
        base_markdown_summary = article_body

    # 🚨 2. PLAIN TEXT SUMMARY (For Facebook, LinkedIn, Mastodon, Bluesky)
    extended_summary = base_markdown_summary
    
    # FIX: Robustly convert Markdown headings into ALL CAPS for plain text readability
    extended_summary = re.sub(r'(?m)^#+\s+(.*)$', lambda m: m.group(1).upper(), extended_summary)
    # Remove Bold and Italics asterisks cleanly
    extended_summary = re.sub(r'\*\*(.*?)\*\*', r'\1', extended_summary)
    extended_summary = re.sub(r'\*(.*?)\*', r'\1', extended_summary)
    # Clean up links to just show the readable text
    extended_summary = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'\1', extended_summary)

    # 🚨 3. HTML SUMMARY (For Blogger, WordPress, Tumblr)
    html_summary = base_markdown_summary
    
    html_summary = re.sub(r'^######\s*(.*?)$', r'<h6>\1</h6>', html_summary, flags=re.MULTILINE)
    html_summary = re.sub(r'^#####\s*(.*?)$', r'<h5>\1</h5>', html_summary, flags=re.MULTILINE)
    html_summary = re.sub(r'^####\s*(.*?)$', r'<h4>\1</h4>', html_summary, flags=re.MULTILINE)
    html_summary = re.sub(r'^###\s*(.*?)$', r'<h3>\1</h3>', html_summary, flags=re.MULTILINE)
    html_summary = re.sub(r'^##\s*(.*?)$', r'<h2>\1</h2>', html_summary, flags=re.MULTILINE)
    html_summary = re.sub(r'^#\s*(.*?)$', r'<h1>\1</h1>', html_summary, flags=re.MULTILINE)
    html_summary = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html_summary)
    html_summary = re.sub(r'\*(.*?)\*', r'<em>\1</em>', html_summary)
    html_summary = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', html_summary)
    html_summary = re.sub(r'(?m)^[*-]\s+(.*)$', r'<li>\1</li>', html_summary)
    html_summary = re.sub(r'(<li>.*?</li>(?:\s*<li>.*?</li>)*)', r'<ul>\g<1></ul>', html_summary, flags=re.DOTALL)
    
    # FIX: Safely convert newlines without destroying the brackets on HTML tags
    html_summary = html_summary.replace('\n', '<br>')
    html_summary = re.sub(r'(</h[1-6]>|</ul>|<ul>|</li>)(?:<br>|\s)+', r'\1', html_summary)
    html_summary = re.sub(r'(?:<br>|\s)+(<h[1-6]>|<ul>|<li>)', r'\1', html_summary)

    # 🚨 Extract live image URL from frontmatter for APIs that require hosted images
    absolute_image_url = ""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            frontmatter = f.read()

            # Match categories: ["Category Name"]
            cat_match = re.search(r'^categories:\s*\[(.*?)\]', frontmatter, re.MULTILINE | re.IGNORECASE)
            if cat_match:
                raw_cats = cat_match.group(1).split(',')
                post_categories = [c.replace('"', '').replace("'", "").strip() for c in raw_cats if c.strip()]

            # Match tags: ["Tag1", "Tag2"]
            tags_match = re.search(r'^tags:\s*\[(.*?)\]', frontmatter, re.MULTILINE | re.IGNORECASE)
            if tags_match:
                raw_tags = tags_match.group(1).split(',')
                post_tags = [t.replace('"', '').replace("'", "").strip() for t in raw_tags if t.strip()]
                            
            img_match = re.search(r'^images:\s*\["(.*?)"\]', frontmatter, re.MULTILINE)
            if img_match:
                img_val = img_match.group(1)
                # If it's already an absolute URL (from RSS), use it. If local, append your domain.
                if img_val.startswith("http"):
                    absolute_image_url = img_val
                else:
                    absolute_image_url = f"https://ltdeveloperblogs.github.io/{img_val.lstrip('/')}"
    except Exception as e:
        print(f"  ⚠️ Could not extract frontmatter data: {e}")

    # -----------------------------------------
    # 1. BLUESKY (Requires strict dynamic truncation)
    # -----------------------------------------
    try:
        bsky_handle = os.environ.get("BSKY_HANDLE")
        bsky_password = os.environ.get("BSKY_PASSWORD")
        if bsky_handle and bsky_password:
            client = BskyClient()
            client.login(bsky_handle, bsky_password)
            
            footer = f"\n\nFull breakdown:\n{post_url}"
            header = f"{title} | {today}\n\n"
            
            max_allowed = 295 
            used_chars = len(header) + len(footer)
            available_chars = max_allowed - used_chars
            
            if available_chars > 20:
                # Use sentence truncation helper instead of hard string slicing
                bsky_summary = truncate_to_sentence(extended_summary, available_chars)
                bsky_text = f"{header}{bsky_summary}{footer}"
            else:
                if used_chars > max_allowed:
                    title_space = max_allowed - len(footer) - len(f" | {today}\n\n") - 3
                    short_title = title[:title_space] + "..."
                    bsky_text = f"{short_title} | {today}{footer}"
                else:
                    bsky_text = f"{header.strip()}{footer}"
            
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
            fb_msg = f"{title} | {today}\n\n{extended_summary}\n\nRead full breakdown below:\n{post_url}"
            
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
            
            # FIX: Swapped extended_summary for html_summary
            caption_html = f"<h2>{title} | {today}</h2><div>{html_summary}</div><p><a href='{post_url}'>Read full breakdown below: {post_url}</a></p>"

            tumblr_tags = list(set(post_categories + post_tags))
            
            if os.path.exists(image_path):
                client.create_photo(t_blog, state="published", data=image_path, caption=caption_html, link=post_url, tags=tumblr_tags)
            else:
                client.create_link(t_blog, state="published", title=f"{title} | {today}", url=post_url, description=caption_html, tags=tumblr_tags)
                
            print("  🆃 Success: Posted to Tumblr")
        else:
            print("  ⚠️ Skipped Tumblr: Credentials missing")
    except Exception as e:
        print(f"  ❌ Failed Tumblr: {e}")

    # -----------------------------------------
    # 4. LINKEDIN
    # -----------------------------------------
    try:
        li_token = os.environ.get("LINKEDIN_TOKEN")
        li_urn = os.environ.get("LINKEDIN_URN")

        if li_token and li_urn:
            li_headers = {
                "Authorization": f"Bearer {li_token}",
                "X-Restli-Protocol-Version": "2.0.0",
                "Content-Type": "application/json"
            }
            
            # 🚨 Calculate strict character limits for LinkedIn (Max 4000 chars)
            li_footer = f"\n\nRead the full breakdown: {post_url}"
            li_header = f"{title}\n\n"
            
            # Leave a buffer (3700 instead of 4000) to be safe
            li_available_chars = 3700 - len(li_header) - len(li_footer)
            
            # Cap the 60% summary to the LinkedIn limit, ending on a clean sentence
            linkedin_summary = truncate_to_sentence(extended_summary, li_available_chars)
            
            li_payload = {
                "author": li_urn,
                "lifecycleState": "PUBLISHED",
                "specificContent": {
                    "com.linkedin.ugc.ShareContent": {
                        "shareCommentary": {"text": f"{li_header}{linkedin_summary}{li_footer}"},
                        "shareMediaCategory": "ARTICLE",
                        "media": [{
                            "status": "READY",
                            "description": {"text": linkedin_summary[:200]}, # Capped description metadata
                            "originalUrl": post_url,
                            "title": {"text": title}
                        }]
                    }
                },
                "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
            }

            if os.path.exists(image_path):
                reg_url = "https://api.linkedin.com/v2/assets?action=registerUpload"
                reg_data = {
                    "registerUploadRequest": {
                        "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
                        "owner": li_urn,
                        "serviceRelationships": [{"relationshipType": "OWNER", "identifier": "urn:li:userGeneratedContent"}]
                    }
                }
                reg_res = requests.post(reg_url, headers=li_headers, json=reg_data).json()
                
                upload_url = reg_res["value"]["uploadMechanism"]["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]["uploadUrl"]
                asset_id = reg_res["value"]["asset"]
                
                with open(image_path, 'rb') as f:
                    img_bytes = f.read()
                
                upload_headers = {"Authorization": f"Bearer {li_token}"}
                requests.put(upload_url, headers=upload_headers, data=img_bytes)
                
                li_payload["specificContent"]["com.linkedin.ugc.ShareContent"]["shareMediaCategory"] = "IMAGE"
                li_payload["specificContent"]["com.linkedin.ugc.ShareContent"]["media"] = [{
                    "status": "READY",
                    "description": {"text": title},
                    "media": asset_id,
                    "title": {"text": title}
                }]
            
            li_url = "https://api.linkedin.com/v2/ugcPosts"
            res = requests.post(li_url, headers=li_headers, json=li_payload)
            
            if res.status_code == 201:
                print("  💼 Success: Posted to LinkedIn")
            else:
                print(f"  ❌ Failed LinkedIn: {res.status_code} - {res.text}")
        else:
            print("  ⚠️ Skipped LinkedIn: Credentials missing")
    except Exception as e:
        print(f"  ❌ Failed LinkedIn: {e}")

    # -----------------------------------------
    # 5. MASTODON
    # -----------------------------------------
    try:
        masto_token = os.environ.get("MASTODON_ACCESS_TOKEN")
        masto_instance = os.environ.get("MASTODON_INSTANCE", "https://mastodon.social")
        
        if masto_token:
            headers = {"Authorization": f"Bearer {masto_token}"}
            media_id = None
            
            if os.path.exists(image_path):
                with open(image_path, 'rb') as img:
                    file_tuple = (os.path.basename(image_path), img, 'image/jpeg')
                    m_res = requests.post(f"{masto_instance}/api/v2/media", headers=headers, files={'file': file_tuple})
                    if m_res.status_code == 200:
                        media_id = m_res.json().get('id')
                    else:
                        print(f"  ⚠️ Mastodon image upload failed: {m_res.text}")
            
            masto_footer = f"\n\nRead the full breakdown: {post_url}"
            masto_header = f"{title} | {today}\n\n"
            
            masto_max_allowed = 495 
            masto_used_chars = len(masto_header) + len(masto_footer)
            masto_available_chars = masto_max_allowed - masto_used_chars
            
            if masto_available_chars > 20:
                # FIX: Feed it the clean plain text, NOT the raw markdown
                masto_summary = truncate_to_sentence(extended_summary, masto_available_chars)
                status_text = f"{masto_header}{masto_summary}{masto_footer}"
            else:
                status_text = f"{masto_header.strip()}{masto_footer}"
                
            data = {"status": status_text}
            if media_id:
                data["media_ids[]"] = [media_id]
                
            res = requests.post(f"{masto_instance}/api/v1/statuses", headers=headers, data=data)
            if res.status_code == 200:
                print("  🐘 Success: Posted to Mastodon")
            else:
                print(f"  ❌ Failed Mastodon: {res.status_code} - {res.text}")
        else:
            print("  ⚠️ Skipped Mastodon: Credentials missing")
    except Exception as e:
        print(f"  ❌ Failed Mastodon: {e}")

    # -----------------------------------------
    # 6. DEV.TO
    # -----------------------------------------
    try:
        devto_api_key = os.environ.get("DEVTO_API_KEY")
        if devto_api_key:
            devto_headers = {
                "api-key": devto_api_key,
                "Content-Type": "application/json"
            }
            
            # --- Format Tags for DEV.to ---
            # Put category first, followed by tags
            combined_tags = post_categories + post_tags
            cleaned_dev_tags = [re.sub(r'[^a-z0-9]', '', t.lower()) for t in combined_tags if t]
            devto_tags = cleaned_dev_tags[:4]  # DEV.to allows a max of 4 tags
                        
            # Fallback if empty
            if not devto_tags:
                devto_tags = ["tech", "news"]

            # --- Construct Payload with Summary and Image ---
            devto_payload = {
                "article": {
                    "title": title,
                    "published": True, 
                    "body_markdown": f"{base_markdown_summary}\n\n*Read the full breakdown originally published at [{post_url}]({post_url})*",
                    "canonical_url": post_url,
                    "tags": devto_tags
                }
            }
            
            if absolute_image_url:
                devto_payload["article"]["main_image"] = absolute_image_url
            
            res = requests.post("https://dev.to/api/articles", headers=devto_headers, json=devto_payload)
            
            # Handle DEV.to 429 Rate Limit Cooldown
            if res.status_code == 429:
                print("  ⚠️ DEV.to rate limit hit. Waiting 32 seconds and retrying...")
                time.sleep(32)
                res = requests.post("https://dev.to/api/articles", headers=devto_headers, json=devto_payload)
            
            if res.status_code in [200, 201]:
                print(f"  👩‍💻 Success: Published to DEV.to")
            else:
                print(f"  ❌ Failed DEV.to: {res.status_code} - {res.text}")
        else:
            print("  ⚠️ Skipped DEV.to: Credentials missing")
    except Exception as e:
        print(f"  ❌ Failed DEV.to: {e}")

    # -----------------------------------------
    # 7. BLOGGER (OAuth2 Refresh Token)
    # -----------------------------------------
    try:
        blogger_blog_id = os.environ.get("BLOGGER_BLOG_ID")
        client_id = os.environ.get("GOOGLE_CLIENT_ID")
        client_secret = os.environ.get("GOOGLE_CLIENT_SECRET")
        refresh_token = os.environ.get("GOOGLE_REFRESH_TOKEN")
        
        if all([blogger_blog_id, client_id, client_secret, refresh_token]):
            token_url = "https://oauth2.googleapis.com/token"
            token_payload = {
                "client_id": client_id,
                "client_secret": client_secret,
                "refresh_token": refresh_token,
                "grant_type": "refresh_token"
            }
            
            token_res = requests.post(token_url, data=token_payload)
            
            if token_res.status_code == 200:
                access_token = token_res.json().get("access_token")
                blogger_url = f"https://www.googleapis.com/blogger/v3/blogs/{blogger_blog_id}/posts/"
                headers = {
                    "Authorization": f"Bearer {access_token}",
                    "Content-Type": "application/json"
                }
                
                # Dynamically inject the HTML Image Tag
                html_image = f'<img src="{absolute_image_url}" alt="{title}" style="max-width:100%; height:auto; border-radius:8px;"><br><br>' if absolute_image_url else ''
                blogger_labels = list(set(post_categories + post_tags))
                
                blogger_payload = {
                    "kind": "blogger#post",
                    "title": title,
                    "content": f"{html_image}{html_summary}<br><br><em>Read the full breakdown originally published at <a href='{post_url}'>{post_url}</a></em>",
                    "labels": blogger_labels
                }
                
                post_res = requests.post(blogger_url, headers=headers, json=blogger_payload)
                
                if post_res.status_code == 200:
                    print("  🅱️ Success: Published to Blogger")
                else:
                    print(f"  ❌ Failed Blogger: {post_res.status_code} - {post_res.text}")
            else:
                print(f"  ❌ Failed Blogger Token Refresh: {token_res.status_code} - {token_res.text}")
        else:
            print("  ⚠️ Skipped Blogger: Credentials missing")
    except Exception as e:
        print(f"  ❌ Failed Blogger: {e}")

    # -----------------------------------------
    # 8. WORDPRESS.COM
    # -----------------------------------------
    try:
        wp_client_id = os.environ.get("WP_COM_CLIENT_ID")
        wp_client_secret = os.environ.get("WP_COM_CLIENT_SECRET")
        wp_username = os.environ.get("WP_COM_USERNAME")
        wp_password = os.environ.get("WP_COM_PASSWORD")
        wp_site_domain = os.environ.get("WP_COM_SITE_DOMAIN", "ltdeveloperblogs.wordpress.com")

        if all([wp_client_id, wp_client_secret, wp_username, wp_password]):
            # Format categories & tags as comma-separated strings
            wp_categories = ", ".join(post_categories) if post_categories else "Uncategorized"
            wp_tags = ", ".join(post_tags) if post_tags else "tech, news"

            auth_url = "https://public-api.wordpress.com/oauth2/token"
            auth_payload = {
                "client_id": wp_client_id,
                "client_secret": wp_client_secret,
                "grant_type": "password",
                "username": wp_username,
                "password": wp_password
            }

            token_res = requests.post(auth_url, data=auth_payload)

            if token_res.status_code == 200:
                access_token = token_res.json().get("access_token")
                post_api_url = f"https://public-api.wordpress.com/rest/v1.1/sites/{wp_site_domain}/posts/new"
                headers = {
                    "Authorization": f"Bearer {access_token}"
                }
                
                post_data = {
                    "title": title,
                    "content": f"{html_summary}<br><br><em>Read the full breakdown originally published at <a href='{post_url}'>{post_url}</a></em>",
                    "status": "publish", 
                    "categories": wp_categories,
                    "tags": wp_tags
                }

                # 🚨 FIX: Bypass GitHub Pages Build Delay for Featured Images
                if absolute_image_url:
                    wp_featured_image = absolute_image_url
                    
                    # Convert the live URL to an instant Raw GitHub URL
                    if "ltdeveloperblogs.github.io" in wp_featured_image:
                        wp_featured_image = wp_featured_image.replace(
                            "https://ltdeveloperblogs.github.io/", 
                            "https://raw.githubusercontent.com/ltdeveloperblogs/ltdeveloperblogs.github.io/main/assets/"
                        )
                        
                    post_data["featured_image"] = wp_featured_image

                res = requests.post(post_api_url, headers=headers, data=post_data)

                if res.status_code == 200:
                    print(f"  📝 Success: Published to WordPress.com")
                else:
                    print(f"  ❌ Failed WordPress.com: {res.status_code} - {res.text}")
            else:
                print(f"  ❌ Failed WordPress.com Auth: {token_res.status_code} - {token_res.text}")
        else:
            print("  ⚠️ Skipped WordPress.com: Credentials missing")
    except Exception as e:
        print(f"  ❌ Failed WordPress.com: {e}")

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
                "call for papers", "call for blogs", "apply now", "register",
                "coupon", "coupon code", "promo code", "discount code", 
                "promo codes", "discount codes", "save big", "deal of the day","promo","discount","promos","coupons","codes","offers","offer","sale","sales","clearance","clearance sale","flash sale","limited time offer","limited time deal","limited time discount","black friday","deals","deal"
            ]
            if any(keyword in news_title.lower() for keyword in skip_keywords):
                print(f"Skipping non-news post: {news_title}")
                continue
            # ---------------------------------------------------------
            
            # 1. Skip if already in Queue
            if news_title in existing_queue_titles: continue
            
            # Generate the slug immediately
            # Normalize accents (e.g., ñ -> n, é -> e) before regex stripping
            normalized_title = unicodedata.normalize('NFKD', news_title).encode('ASCII', 'ignore').decode('utf-8')
            
            filename_slug = re.sub(r'[^\w\s-]', '', normalized_title).strip().lower()
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

            # Clean it up, then send it to the AI Research Assistant to extract the gold
            unescaped_text = html.unescape(extended_text)
            cleaned_text = clean_scraped_content(unescaped_text)
            
            print("  -> 🧠 Using AI to extract key facts, specs, and quotes...")
            final_summary = extract_key_facts_with_ai(cleaned_text, news_title)
            # -----------------------------------
            # -----------------------------------
            # -----------------------------------

            # Save clean text to queue
            queue.append({
                "title": news_title,
                "slug": filename_slug,
                "summary": final_summary,
                "raw_image_url": extract_rss_image(entry),
                "source_url": entry.get('link', '') # 🚀 NEW: Save the source URL
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
    live_url = f"https://ltdeveloperblogs.github.io/posts/{post_slug}/"
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


def ping_bing_indexing_api(post_slug):
    print(f"📡 Pinging Bing Indexing API for: {post_slug}")
    live_url = f"https://ltdeveloperblogs.github.io/posts/{post_slug}/"
    bing_api_key = os.environ.get("BING_API_KEY")
    
    if not bing_api_key:
        print("  ⚠️ Skipped: BING_API_KEY not found in environment.")
        return

    try:
        endpoint = f"https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey={bing_api_key}"
        payload = {
            "siteUrl": "https://ltdeveloperblogs.github.io/",
            "urlList": [live_url]
        }
        response = requests.post(endpoint, json=payload, timeout=10)
        
        if response.status_code == 200:
            print(f"  ✅ Success! Bing will index {live_url} shortly.")
        else:
            print(f"  ⚠️ Bing API Error {response.status_code}: {response.text}")
    except Exception as e:
        print(f"  🚨 Failed to notify Bing: {e}")

def complete_truncated_article(partial_text, article_summary):
    """Takes a truncated article draft and calls fallback APIs to complete it from the cutoff point."""
    print("  -> 🔄 Output was cut off. Attempting continuation with fallback AI...")
    
    continuation_prompt = f"""
The following technical article was cut off mid-sentence because it hit an API generation token limit.

ORIGINAL TOPIC SUMMARY:
{article_summary}

INCOMPLETE ARTICLE WRITTEN SO FAR:
{partial_text}

YOUR TASK:
1. Continue writing the article seamlessly starting EXACTLY from the word where it was cut off.
2. Do NOT repeat any of the text already written above.
3. Do NOT re-generate the YAML frontmatter or title block.
4. Maintain the exact same Markdown formatting, tone, and style.
5. Provide the remaining sections, conclusion, and FAQ if missing.
6. MANDATORY: When completely finished, write the exact phrase "[END OF ARTICLE]" on a new line.
"""

    # Lightweight/Fast fallback models ideal for completions
    continuation_models = [
        {"provider": "gemini", "model": "gemini-2.5-flash"},
        {"provider": "github", "model": "gpt-4o-mini"},
        {"provider": "mistral", "model": "mistral-large-latest"}
    ]

    for setting in continuation_models:
        provider = setting['provider']
        model_name = setting['model']
        
        try:
            # 1. GEMINI
            if provider == "gemini":
                key = os.environ.get("GEMINI_API_KEY")
                if not key: continue
                res = requests.post(
                    f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={key}",
                    headers={"Content-Type": "application/json"},
                    json={
                        "contents": [{"parts": [{"text": continuation_prompt}]}],
                        "generationConfig": {"maxOutputTokens": 2500, "temperature": 0.3}
                    },
                    timeout=60
                )
                if res.status_code == 200:
                    data = safe_json(res)
                    continuation = extract_text(data)
                    if continuation and len(continuation.strip()) > 50:
                        return partial_text + "\n\n" + continuation.strip()

            # 2. GITHUB MODELS API
            elif provider == "github":
                key = os.environ.get("GH_TOKEN")
                if not key: continue
                res = requests.post(
                    "https://models.inference.ai.azure.com/chat/completions",
                    headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                    json={
                        "model": model_name,
                        "messages": [{"role": "user", "content": continuation_prompt}],
                        "temperature": 0.3,
                        "max_tokens": 2500
                    },
                    timeout=60
                )
                if res.status_code == 200:
                    content = res.json().get('choices', [{}])[0].get('message', {}).get('content')
                    if content and len(content.strip()) > 50:
                        return partial_text + "\n\n" + content.strip()

            # 3. MISTRAL AI
            elif provider == "mistral":
                key = os.environ.get("MISTRAL_API_KEY")
                if not key: continue
                res = requests.post(
                    "https://api.mistral.ai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                    json={
                        "model": model_name,
                        "messages": [{"role": "user", "content": continuation_prompt}],
                        "temperature": 0.3,
                        "max_tokens": 2500
                    },
                    timeout=60
                )
                if res.status_code == 200:
                    content = res.json().get('choices', [{}])[0].get('message', {}).get('content')
                    if content and len(content.strip()) > 50:
                        return partial_text + "\n\n" + content.strip()

        except Exception as e:
            print(f"     -> Completion attempt with {provider.upper()} failed: {e}")
            continue

    return partial_text  # Return unchanged if all attempts fail

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

    # Take the first 5 articles, leave the rest in the queue
    BATCH_SIZE = 5
    batch = queue[:BATCH_SIZE]
    remaining_queue = queue[BATCH_SIZE:]

    published_articles = []

    print(f"Publishing {len(batch)} articles. {len(remaining_queue)} remaining in queue.")

    for article in batch:
        print(f"\nWriting: {article['title']}")
        file_path = os.path.join(output_dir, article['slug'] + ".md")

        # Download image or generate fallback
        image_url = download_and_verify_image(article['raw_image_url'], article['slug'], article['title'])

        ist_timezone = timezone(timedelta(hours=5, minutes=30))
        current_iso = datetime.now(ist_timezone).isoformat()
        
        # 🚀 NEW: Get a catalog of existing articles for the AI to choose from
        internal_links_catalog = get_internal_links_catalog(5)

        prompt = f"""
Act as an expert tech journalist and strict SEO specialist. Read this short news summary: {article['summary']}

Write a highly engaging, heavily detailed, and in-depth technical blog post about this topic. 
Your goal is to strictly write a comprehensive article between [WORD_COUNT] words. You MUST adhere to the following constraints to prevent AI loops and thin content:

CRITICAL LENGTH AND STRUCTURE REQUIREMENTS:
1. DYNAMIC LENGTH: Analyze the depth of the provided summary. Write a highly comprehensive article between 800 and 1,200 words. Do not attempt to drag the article out unnecessarily to reach an arbitrary token count. If the source material is fully exhausted, conclude the article cleanly.
2. EXPANSION: Do not just summarize. You must expand heavily on the "Why it matters", "Industry Impact", "Technical Breakdown", and "Future Outlook". 
3. STRUCTURE: Include at least 4 to 6 main sections (H2). Each section must contain well-thought-out paragraphs.
4. FACTS ONLY: Do not hallucinate future software versions, features, or events. If you don't know a detail, do not invent it.
5. NO REPETITION: Do not repeat paragraphs or concluding sentences to pad the word count. Provide genuine, deep analysis.
6. NO SPAM: Do not include promotional filler, coupons, or unrelated affiliate links.
7. CLEAN COMPLETION: Ensure the article has a definitive, standard conclusion. Do not cut off mid-sentence.

Include headings, bullet points, and an FAQ section. Output in pure Markdown format.

CRITICAL SEO RULE (INTERNAL LINKING):
Here is a catalog of existing articles currently on our blog:
{internal_links_catalog}

Your task is to SELECT 3 to 5 articles from the list above that are STRICTLY RELATED to the topic you are writing about right now. 
Naturally weave the links you chose into the body of your article where contextually appropriate. You MUST use the EXACT full absolute URL provided in the catalog (e.g., https://ltdeveloperblogs.github.io/posts/slug/). DO NOT truncate or shorten the URL to a relative path.

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
date: {current_iso}
draft: false
images: ["{image_url}"]
thumbnail: "{image_url}"
description: "[Insert 140-150 Char Description Here]"
categories: ["[EXACTLY ONE CATEGORY STRING]"]
tags: ["[Tag 1]", "[Tag 2]", "[Tag 3]"]
---

CRITICAL BODY RULES:
DO NOT use any H1 (`#`) tags in the body of the article. Only use H2 (`##`) for main sections and H3 (`###`) for subsections.

CRITICAL FORMATTING RULE: Return the final output as plain text formatted with Markdown. DO NOT wrap your entire response in a markdown code block (e.g., do not start the response with ```markdown). Start immediately with the YAML frontmatter.

CRITICAL COMPLETION RULE: 
When you have completely finished writing the conclusion of the article, you MUST write the exact phrase "[END OF ARTICLE]" on a new line. This is mandatory.
"""

        # --- ROBUST MULTI-PROVIDER WATERFALL CONFIGURATION ---
        # Ordered strategically by performance, output capacity, and free tier stability
        model_settings = [
            {"provider": "groq", "model": "openai/gpt-oss-120b", "word_count": "800 and 1200"},
            {"provider": "github", "model": "gpt-4o-mini", "word_count": "800 and 1200"},
            {"provider": "groq", "model": "openai/gpt-oss-20b", "word_count": "800 and 1200"},
            {"provider": "mistral", "model": "mistral-large-latest", "word_count": "800 and 1200"},
            {"provider": "gemini", "model": "gemini-2.5-flash", "word_count": "800 and 1200"},
            {"provider": "openrouter", "model": "google/gemma-4-31b-it", "word_count": "800 and 1200"},
            {"provider": "cohere", "model": "command-a-03-2025", "word_count": "800 and 1200"}
        ]

        article_content = None
        for setting in model_settings:
            provider = setting['provider']
            model_name = setting['model']
            diet_prompt = prompt.replace("[WORD_COUNT]", setting['word_count'])

            # Aggressive system prompt to force long-form content and prevent hallucination loops
            system_instruction = (
    "You are an elite, professional tech blogger known for writing extremely detailed, authoritative articles. "
    "If the source information is limited, write a highly focused article of up to 800 words. "
    "If the source information is rich and detailed, expand naturally up to 1,200 words. "
    "NEVER hallucinate features, dates, or events. NEVER repeat sentences or use garbage characters to pad the word count. "
    "When you reach the natural conclusion of your analysis, finish the article cleanly and stop generating."
)

            print(f"  -> Attempting generation with {provider.upper()} ({model_name})...")

            try:
                # 1. GROQ
                if provider == "groq":
                    response = client.chat.completions.create(
                        messages=[
                            {"role": "system", "content": system_instruction},
                            {"role": "user", "content": diet_prompt}
                        ],
                        model=model_name,
                        temperature=0.3,
                        frequency_penalty=0.0,
                        presence_penalty=0.0,
                        max_tokens=3500, 
                    )
                    raw_text = response.choices[0].message.content or ""
                    if raw_text.strip():
                        article_content = raw_text.strip()

                # 2. GITHUB MODELS API
                elif provider == "github":
                    key = os.environ.get("GH_TOKEN")
                    if not key:
                        continue
                    res = requests.post(
                        "https://models.inference.ai.azure.com/chat/completions",
                        headers={
                            "Authorization": f"Bearer {key}",
                            "Content-Type": "application/json"
                        },
                        json={
                            "model": model_name,
                            "messages": [
                                {"role": "system", "content": system_instruction},
                                {"role": "user", "content": diet_prompt}
                            ],
                            "temperature": 0.3,
                            "max_tokens": 3500
                        },
                        timeout=240
                    )
                    if res.status_code == 200:
                        raw_content = res.json().get('choices', [{}])[0].get('message', {}).get('content')
                        if raw_content:
                            article_content = raw_content.strip()
                    else:
                        print(f"     -> Provider error (GitHub): {res.text}")

                # 3. MISTRAL AI
                elif provider == "mistral":
                    key = os.environ.get("MISTRAL_API_KEY")
                    if not key: continue
                    res = requests.post(
                        "https://api.mistral.ai/v1/chat/completions",
                        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                        json={
                            "model": model_name,
                            "messages": [
                                {"role": "system", "content": system_instruction},
                                {"role": "user", "content": diet_prompt}
                            ],
                            "temperature": 0.3, 
                            "frequency_penalty": 0.0,
                            "presence_penalty": 0.0,
                            "max_tokens": 3500
                        },
                        timeout=240
                    )
                    if res.status_code == 200: article_content = res.json()['choices'][0]['message']['content'].strip()
                    else: print(f"     -> Provider error: {res.text}")

                # 4. OPENROUTER
                elif provider == "openrouter":
                    key = os.environ.get("OPENROUTER_API_KEY")
                    if not key: continue
                    res = requests.post(
                        "https://openrouter.ai/api/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {key}",
                            "Content-Type": "application/json",
                            "HTTP-Referer": "https://ltdeveloperblogs.github.io/", 
                            "X-Title": "LT Developer Tech Blog"
                        },
                        json={
                            "model": model_name,
                            "messages": [
                                {"role": "system", "content": system_instruction},
                                {"role": "user", "content": diet_prompt}
                            ],
                            "temperature": 0.3, 
                            "frequency_penalty": 0.0,
                            "presence_penalty": 0.0,
                            "max_tokens": 3500
                        },
                        timeout=240
                    )
                    if res.status_code == 200:
                        raw_content = res.json().get('choices', [{}])[0].get('message', {}).get('content')
                        if raw_content:
                            article_content = raw_content.strip()
                    else: print(f"     -> Provider error: {res.text}")

                # 5. COHERE
                elif provider == "cohere":
                    key = os.environ.get("COHERE_API_KEY")
                    if not key: continue
                    res = requests.post(
                        "https://api.cohere.com/v1/chat",
                        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                        json={
                            "model": model_name,
                            "message": diet_prompt,
                            "preamble": system_instruction,
                            "temperature": 0.3,
                            "frequency_penalty": 0.0,
                            "presence_penalty": 0.0,
                            "max_tokens": 3500
                        },
                        timeout=240
                    )
                    if res.status_code == 200: article_content = res.json().get('text', '').strip()
                    else: print(f"     -> Provider error: {res.text}")

                # 6. GEMINI
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
                                    "text": f"{system_instruction}\n\n{diet_prompt}"
                                }]
                            }],
                            "generationConfig": {
                                "maxOutputTokens": 3500,
                                "temperature": 0.3,
                                "frequencyPenalty": 0.0,
                                "presencePenalty": 0.0
                            }
                        },
                        timeout=240
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
                # 🚨 Use current_iso here instead of UTC
                article_content = f"---\ntitle: \"{safe_title}\"\ndate: {current_iso}\ndraft: false\nimages: [\"{image_url}\"]\n---\n\n" + article_content

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

        cat_match = re.search(r'categories:\s*\[(.*?)\]', article_content, re.IGNORECASE)
        if cat_match:
            raw_category_string = cat_match.group(1)
            first_category = raw_category_string.split(',')[0].replace('"', '').replace("'", "").strip()
            safe_category = first_category
            if safe_category not in VALID_CATEGORIES:
                from difflib import get_close_matches
                closest = get_close_matches(safe_category, VALID_CATEGORIES, n=1, cutoff=0.4)
                safe_category = closest[0] if closest else "Other"
            article_content = re.sub(
                r'categories:\s*\[.*?\]', 
                f'categories: ["{safe_category}"]', 
                article_content, 
                flags=re.IGNORECASE
            )
        article_content = re.sub(r'^```(?:markdown|md)?\s*\n', '', article_content, flags=re.IGNORECASE)
        article_content = re.sub(r'\n```\s*$', '', article_content)
        article_content = article_content.replace("---\n```\n", "---\n")
        

        # 🚨 THE BOUNCER (MOVED HERE: After title and category are safely formatted!) 🚨
        has_title = re.search(r'^title:\s*".+"', article_content, re.MULTILINE)
        has_category = re.search(r'^categories:\s*\[.+\]', article_content, re.MULTILINE)
        
        if not has_title or not has_category:
            print(f"  -> 🚨 CRITICAL: AI generated malformed frontmatter (Missing Title/Category). Rejecting.")
            if os.path.exists(file_path):
                os.remove(file_path)
            remaining_queue.append(article)
            continue # 👈 ABSOLUTELY CRITICAL: Stop execution and jump to the next article!
        
        # 🚨 UPDATE THIS BLOCK IN run_publisher()

        # 1. Check if the article was cut off mid-way
        if "[END OF ARTICLE]" not in article_content:
            # Attempt to complete the text using a secondary model
            article_content = complete_truncated_article(article_content, article['summary'])
        
        # 2. Final check: If it STILL lacks [END OF ARTICLE] after the completion attempt, reject it safely
        if "[END OF ARTICLE]" not in article_content:
            print(f"  -> 🚨 CRITICAL: Article cut off mid-way and completion failed. Rejecting.")
            if os.path.exists(file_path):
                os.remove(file_path)
            remaining_queue.append(article)
            continue
        
        # Strip the marker tag out before saving
        article_content = article_content.replace("[END OF ARTICLE]", "").strip()
            
        # 🚨 THE BOUNCER: Forcefully overwrite AI image hallucinations with our verified Python variable
        if re.search(r'^images:\s*\[.*\]', article_content, re.MULTILINE):
            article_content = re.sub(r'^images:\s*\[.*\]', f'images: ["{image_url}"]', article_content, flags=re.MULTILINE)
        
        if re.search(r'^thumbnail:\s*.*', article_content, re.MULTILINE):
            article_content = re.sub(r'^thumbnail:\s*.*', f'thumbnail: "{image_url}"', article_content, flags=re.MULTILINE)
        
        # 🚀 NEW: Catch bare internal URLs, strip trailing punctuation (e.g., '.', ','), and force them into markdown links
        def convert_bare_internal_urls(match):
            # If group 1 matched, the URL is already safely inside a markdown link. Leave it alone!
            if match.group(1):
                return match.group(1)
            
            # Otherwise, it's a bare URL (group 2). Wrap it.
            url = match.group(2)
            clean_url = url.rstrip('.,;:)')
            trailing_punct = url[len(clean_url):]
            return f"[{clean_url}]({clean_url}){trailing_punct}"

        # Matches correctly formatted markdown links in Group 1 OR bare URLs in Group 2
        article_content = re.sub(
            r'(\[[^\]]+\]\s*\(\s*https?://ltdeveloperblogs\.github\.io/posts/[^\s\)]+\s*\))|(https?://ltdeveloperblogs\.github\.io/posts/[^\s>"]+)',
            convert_bare_internal_urls,
            article_content
        )

        # 🚨 STRICT INTERNAL LINK VALIDATOR WITH FUZZY FIX
        def validate_internal_links(match):
            link_text = match.group(1)
            raw_url = match.group(2).strip()

            if not raw_url:
                print(f"  -> ⚠️ Stripping empty markdown link: {link_text}")
                return link_text
            
            # Clean out any markdown titles in the URL (e.g., [text](url "Title") -> url)
            clean_url = raw_url.split()[0].strip()

            # TRAP: Is this an internal link? 
            # Catches absolute domain links, relative root links, and 'posts/' links
            is_internal = False
            if 'ltdeveloperblogs.github.io' in clean_url or clean_url.startswith('/') or 'posts/' in clean_url:
                is_internal = True

            # External link? Pass it through untouched.
            if not is_internal:
                return match.group(0)

            # --- Process Internal Link ---
            # Strip query parameters (?), anchors (#), and leading/trailing slashes
            url_no_params = clean_url.split('?')[0].split('#')[0].strip('/')
            
            # Extract the absolute last segment of the path as the slug
            parts = [p for p in url_no_params.split('/') if p]
            
            if parts:
                original_slug = parts[-1].replace('.md', '').replace('.html', '').strip()
                slug = original_slug
                expected_md_file = os.path.join(output_dir, f"{slug}.md")
                
                # Helper function to ensure the file has valid frontmatter
                def check_valid_hugo_post(md_file_path):
                    if os.path.exists(md_file_path):
                        try:
                            with open(md_file_path, 'r', encoding='utf-8') as f:
                                head_content = f.read(500)
                                if "---" in head_content and "title:" in head_content:
                                    return True
                        except Exception:
                            pass
                    return False

                is_valid = check_valid_hugo_post(expected_md_file)
                
                # 🚀 NEW: Fuzzy Matching Fallback if the URL is broken
                if not is_valid:
                    print(f"  -> ⚠️ Link broken for slug: {slug}. Attempting fuzzy fix...")
                    from difflib import get_close_matches
                    
                    # Grab all available post slugs from the directory
                    all_files = [f for f in os.listdir(output_dir) if f.endswith('.md') and f != '_index.md']
                    valid_slugs = [f.replace('.md', '') for f in all_files]
                    
                    # Search for a 50% or greater match to the broken slug
                    closest_matches = get_close_matches(slug, valid_slugs, n=1, cutoff=0.5)
                    
                    if closest_matches:
                        matched_slug = closest_matches[0]
                        matched_md_file = os.path.join(output_dir, f"{matched_slug}.md")
                        
                        # Verify the newly matched file is actually valid
                        if check_valid_hugo_post(matched_md_file):
                            print(f"  -> 🔧 FIXED: Replaced broken '{slug}' with closest match '{matched_slug}'")
                            slug = matched_slug
                            is_valid = True

                if is_valid:
                    # Reconstruct as a perfect absolute link to prevent relative pathing issues
                    return f"[{link_text}](https://ltdeveloperblogs.github.io/posts/{slug})"
                else:
                    # The file does not exist, is corrupt, or couldn't be fuzzy-matched. Strip the link to save the build!
                    print(f"  -> ⚠️ Stripping unfixable dead internal link: {original_slug}")
                    return link_text
            else:
                # If we couldn't parse a slug but it flagged as internal, nuke it to be safe.
                print(f"  -> ⚠️ Stripping unparseable internal link: {clean_url}")
                return link_text

        # Find ALL markdown links [text](url) and run them through the aggressive validator
        article_content = re.sub(
            r'\[([^\]]+)\]\(([^)]+)\)',
            validate_internal_links,
            article_content
        )

        # 🚨 THE BOUNCER: Empty Heading Sanitizer
        # Destroys AI-generated headings that lack text (which crash Hugo's TOC)
        def clean_empty_headings(match):
            heading_text = match.group(1)
            
            clean_text = re.sub(r'<!--.*?-->', '', heading_text)
            clean_text = re.sub(r'<[^>]+>', '', clean_text)
            
            if not re.search(r'[a-zA-Z0-9]', clean_text):
                return "" 
            return match.group(0)

        # Swallows the newline so no blank artifacts are left behind
        article_content = re.sub(r'^#{1,6}\s*([^\r\n]*)\r?\n?', clean_empty_headings, article_content, flags=re.MULTILINE)

        # 🚀 NEW: Append the External Source Link safely
        source_url = article.get('source_url', '#')
        if source_url and source_url != '#':
            article_content += f"\n\n---\n**Source:** [*Original Article*]({source_url})\n"

        article_content += "\n\n{{< comments >}}\n"
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(article_content)
        print(f"  ✅ Saved: {file_path}")

        published_articles.append(article)

    # Save the updated queue (minus the 3 we just published)
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(remaining_queue, f, indent=4)
        
    # 🚨 NEW: Save successfully generated articles to the Broadcast Queue
    broadcast_file = "broadcast_queue.json"
    existing_broadcasts = []
    if os.path.exists(broadcast_file):
        with open(broadcast_file, "r", encoding="utf-8") as f:
            try: existing_broadcasts = json.load(f)
            except: pass
            
    existing_broadcasts.extend(published_articles)
    
    with open(broadcast_file, "w", encoding="utf-8") as f:
        json.dump(existing_broadcasts, f, indent=4)
        
    git_commit_and_push("Published article batch", trigger_hugo=True)

# ==========================================
# 4.5 BROADCAST MODE (Triggered by GitHub Actions)
# ==========================================
def run_broadcaster():
    print("\n--- 📣 STARTING SOCIAL MEDIA BROADCASTER ---")
    broadcast_file = "broadcast_queue.json"
    
    # 🚨 FIX: Fallback to scanning recent files if the queue is missing
    if not os.path.exists(broadcast_file):
        print("⚠️ No broadcast queue found. Falling back to dynamic batch detection...")
        run_emergency_broadcaster()
        return
        
    with open(broadcast_file, "r", encoding="utf-8") as f:
        try: queue = json.load(f)
        except: queue = []
        
    # 🚨 FIX: Fallback if the queue exists but is empty
    if not queue:
        print("⚠️ Broadcast queue is empty. Falling back to dynamic batch detection...")
        run_emergency_broadcaster()
        return
        
    for article in queue:
        ping_google_indexing_api(article['slug'])
        ping_bing_indexing_api(article['slug'])
        
        # Define paths for the image and the local markdown file
        local_img_path = os.path.join("assets", "images", f"{article['slug']}.jpg")
        local_file_path = os.path.join(output_dir, f"{article['slug']}.md")
        
        # Pass the local file path instead of the raw RSS summary
        share_to_social_media(local_file_path, article['slug'], local_img_path)
        
    # 🚨 DONT COMMIT TO GIT. Just delete the temp file locally on the runner!
    if os.path.exists(broadcast_file):
        os.remove(broadcast_file)
        
    print("✅ Broadcast complete and temporary queue cleared.")


# ==========================================
# 4.6 EMERGENCY OVERRIDE (Force Broadcast Recent Batch)
# ==========================================
def run_emergency_broadcaster():
    print(f"\n--- 🚨 STARTING EMERGENCY BROADCASTER (Dynamic Batch Detection) ---")
    
    if not os.path.exists(output_dir):
        print("No content directory found.")
        return

    articles = []
    
    # 1. Scan all markdown files in the folder
    for filename in os.listdir(output_dir):
        if not filename.endswith(".md") or filename == "_index.md":
            continue
            
        filepath = os.path.join(output_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # 2. Extract the exact publication date and title
        date_match = re.search(r'^date:\s*(.+)$', content, re.MULTILINE)
        title_match = re.search(r'^title:\s*"(.*?)"', content, re.MULTILINE)

        if date_match and title_match:
            date_str = date_match.group(1).strip().strip('"').strip("'")
            title = title_match.group(1)
            slug = filename.replace(".md", "")

            try:
                # Parse the ISO timestamp into a real Python datetime object for sorting
                post_date = datetime.fromisoformat(date_str)
                articles.append({
                    "title": title,
                    "slug": slug,
                    "date": post_date,
                    "filepath": filepath
                })
            except Exception as e:
                pass # Skip files with malformed dates

    # 3. Sort articles from Newest to Oldest
    articles.sort(key=lambda x: x['date'], reverse=True)
    
    if not articles:
        print("No valid articles found to broadcast.")
        return

    # 🚨 THE FIX: Absolute Time Check! 🚨
    ist_timezone = timezone(timedelta(hours=5, minutes=30))
    now_ist = datetime.now(ist_timezone)
    most_recent_date = articles[0]['date']
    
    # Calculate exactly how old the newest article is
    age_of_newest = now_ist - most_recent_date
    
    # If the newest article is older than 2 hours, DO NOT broadcast.
    if age_of_newest > timedelta(hours=10):
        print(f"⚠️ Aborting Broadcast: The newest article is {age_of_newest.total_seconds() / 3600:.1f} hours old.")
        print("To prevent spamming social media with older posts, we only broadcast articles published within the last 10 hours.")
        return

    # 🚨 Dynamic Batch Detection (Groups everything published alongside the newest post)
    batch_articles = []
    
    for article in articles:
        # Calculate the time difference between the absolute newest post and this post
        time_diff = most_recent_date - article['date']
        
        # If the article was published within a 30-minute window, it belongs to this batch
        if time_diff <= timedelta(minutes=30):
            batch_articles.append(article)
        else:
            # Since the list is sorted, as soon as we hit a post older than 30 mins, we stop
            break

    print(f"🔍 Detected {len(batch_articles)} articles published in the most recent fresh batch.")

    # 4. Push them out to social media
    for article in batch_articles:
        print(f"\nProcessing social broadcast for: {article['title']}")
        try:
            ping_google_indexing_api(article['slug'])
            ping_bing_indexing_api(article['slug'])
        
            # Define paths for the image and the local markdown file
            local_img_path = os.path.join("assets", "images", f"{article['slug']}.jpg")
            local_file_path = os.path.join(output_dir, f"{article['slug']}.md")
        
            # Pass the local file path instead of the raw RSS summary
            share_to_social_media(local_file_path, article['slug'], local_img_path)
            
        except Exception as e:
            print(f"🚨 Failed to broadcast '{article['title']}': {e}")

    print("\n✅ Emergency broadcast complete.")

def run_link_fixer():
    print("\n--- ☢️ STARTING NUCLEAR LINK FIXER (STRICT MODE) ---")
    if not os.path.exists(output_dir):
        print("No content directory found.")
        return

    from difflib import get_close_matches

    # 1. STRICT VALIDATION: Only accept slugs if the file exists AND has valid frontmatter.
    valid_slugs = []
    all_files = [f for f in os.listdir(output_dir) if f.endswith('.md') and f != '_index.md']
    
    for filename in all_files:
        filepath = os.path.join(output_dir, filename)
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                head = f.read(1000)
                if "---" in head and "title:" in head:
                    valid_slugs.append(filename.replace('.md', ''))
        except Exception:
            continue

    files_modified = 0

    for filename in all_files:
        filepath = os.path.join(output_dir, filename)
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
        except Exception:
            continue

        original_content = content

        # ==========================================
        # PASS 1: Catch standard Markdown Links [text](url)
        # ==========================================
        def markdown_link_healer(match):
            link_text = match.group(1)
            raw_url = match.group(2).strip()

            # Ignore anchors and external links (unless they point to your own domain)
            if raw_url.startswith("#") or raw_url.startswith("mailto:"):
                return match.group(0)
            if raw_url.startswith("http") and 'ltdeveloperblogs.github.io' not in raw_url:
                return match.group(0) 

            # Clean the URL
            clean_url = raw_url.split('?')[0].split('#')[0].strip('/')
            clean_url = clean_url.replace('.md', '').replace('.html', '')
            
            # Extract slug
            parts = [p for p in clean_url.split('/') if p]
            slug = parts[-1] if parts else ""

            if not slug:
                return link_text

            if slug in valid_slugs:
                # Force absolute format to fix Hugo relative issues
                return f"[{link_text}](https://ltdeveloperblogs.github.io/posts/{slug})"
            
            # Broken! Try fuzzy match.
            closest = get_close_matches(slug, valid_slugs, n=1, cutoff=0.4)
            if closest:
                print(f"  -> 🔧 FIXED MD link in {filename}: '{slug}' -> '{closest[0]}'")
                return f"[{link_text}](https://ltdeveloperblogs.github.io/posts/{closest[0]})"
            else:
                # 🚨 Nuke the link, but clean up the remaining text!
                print(f"  -> ☢️ NUKED dead MD link in {filename}: '{slug}'")
                
                # Smart Cleanup: If the AI lazily used the slug as the display text, 
                # remove the dashes and extensions so it looks like regular English words.
                if '-' in link_text and (slug in link_text or link_text.lower() == raw_url.lower()):
                    clean_text = link_text.replace('-', ' ').replace('.md', '').replace('.html', '').title()
                    return clean_text
                    
                return link_text 

        content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', markdown_link_healer, content)

        # ==========================================
        # PASS 2: Catch Bare Paths or HTML Links (/posts/slug or posts/slug)
        # ==========================================
        def path_healer(match):
            full_match = match.group(0)
            slug = match.group(2).strip('.,;:\'\"()[]')
            
            if slug in valid_slugs:
                return full_match
                
            closest = get_close_matches(slug, valid_slugs, n=1, cutoff=0.4)
            if closest:
                print(f"  -> 🔧 FIXED path in {filename}: '{slug}' -> '{closest[0]}'")
                return full_match.replace(slug, closest[0])
            else:
                # Replace the dead path entirely with a safe anchor
                print(f"  -> ☢️ NUKED dead path in {filename}: '{slug}'")
                return "#link-removed"

        path_pattern = r'(https?://ltdeveloperblogs\.github\.io/posts/|/posts/|posts/)([-a-zA-Z0-9_]+)'
        content = re.sub(path_pattern, path_healer, content, flags=re.IGNORECASE)

        # ==========================================
        # PASS 3: Catch and Destroy Empty Headings
        # ==========================================
        def empty_heading_healer(match):
            heading_text = match.group(1)
            
            # Strip out markdown links, images, HTML tags, and comments
            clean_text = re.sub(r'<!--.*?-->', '', heading_text)
            clean_text = re.sub(r'<[^>]+>', '', clean_text)
            clean_text = re.sub(r'!\[.*?\]\(.*?\)', '', clean_text)
            clean_text = re.sub(r'\[.*?\]\(.*?\)', '', clean_text)
            
            if not re.search(r'[a-zA-Z0-9]', clean_text):
                print(f"  -> 🧹 SWEPT empty/invalid heading in {filename}")
                return "" # Completely annihilates the line
            return match.group(0)

        # The \r?\n? at the end ensures we swallow the invisible line breaks
        content = re.sub(r'^#{1,6}\s*([^\r\n]*)\r?\n?', empty_heading_healer, content, flags=re.MULTILINE)

        if content != original_content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            files_modified += 1

    print(f"✅ Link fixer complete. Fixed {files_modified} files to prevent Hugo crashes.")
    
# ==========================================
# 5. EXECUTION ROUTER
# ==========================================
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--scrape", action="store_true", help="Scrape new articles and add to queue")
    parser.add_argument("--publish", action="store_true", help="Publish next batch from the queue")
    parser.add_argument("--broadcast", action="store_true", help="Share published articles to social media")
    parser.add_argument("--force-recent", action="store_true", help="Force broadcast the most recent batch of articles, bypassing the queue")
    parser.add_argument("--fix-links", action="store_true", help="Scan and fix broken links before Hugo build") # <-- ADD THIS
    args = parser.parse_args()

    if args.scrape:
        run_scraper()
    elif args.publish:
        run_publisher()
    elif args.broadcast:
        run_broadcaster()
    elif args.force_recent:
        # 🚨 Calling the updated function with dynamic detection
        run_emergency_broadcaster()
    elif args.fix_links: # <-- ADD THIS
        run_link_fixer()
    else:
        print("Please provide a flag: --scrape, --publish, --broadcast, or --force-recent")
