import os
import feedparser
from groq import Groq
import re
from datetime import datetime, timezone
import random

# 1. Initialize Groq Client
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# 2. List of Top Tech RSS Feeds
RSS_FEEDS = [
    "https://techcrunch.com/feed/",
    "https://www.theverge.com/rss/index.xml",
    "https://www.wired.com/feed/rss",
    "https://arstechnica.com/feed/",
    "https://venturebeat.com/feed/"
]

# Pick a random feed today to keep the content diverse
chosen_feed = random.choice(RSS_FEEDS)
print(f"Fetching news from {chosen_feed}...")
feed = feedparser.parse(chosen_feed)

# Grab the latest article from the chosen feed
latest_entry = feed.entries[0]
news_title = latest_entry.title
news_summary = latest_entry.summary

# --- NEW: Extract Image URL from the RSS Feed ---
def extract_image(entry):
    # Method A: Check official media tags
    if 'media_content' in entry and len(entry.media_content) > 0:
        return entry.media_content[0]['url']
    
    # Method B: Check enclosures (common in podcast/news feeds)
    if 'links' in entry:
        for link in entry.links:
            if link.get('rel') == 'enclosure' and 'image' in link.get('type', ''):
                return link.get('href')
                
    # Method C: Hunt for raw HTML image tags hidden in the summary
    match = re.search(r'<img[^>]+src="([^">]+)"', entry.get('summary', '') + str(entry.get('content', '')))
    if match:
        return match.group(1)
        
    # Method D: Fallback high-quality tech image if the feed has no image
    return "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"

# Run the extractor
image_url = extract_image(latest_entry)

print(f"Found article: {news_title}")
print(f"Extracted Image: {image_url}")

# 3. Build the Prompt for Llama 3
# Notice we inject the {image_url} directly into the YAML frontmatter
prompt = f"""
Act as an expert tech journalist and SEO specialist. Read this short news summary: {news_summary}

Write a comprehensive, highly engaging 1500-word blog post about this topic. 
Include headings, bullet points, and an FAQ section. 
Output the final result in pure Markdown format. 

At the very top of the file, include YAML frontmatter formatted EXACTLY like this:
---
title: "Your Catchy SEO Title Here"
date: {datetime.now(timezone.utc).isoformat()}
draft: false
thumbnail: "{image_url}"
description: "A 155-character SEO meta description here."
categories: ["Tech News"]
tags: ["AI", "Technology", "Innovation"]
---

Do not wrap the overall output in markdown code blocks, just output the raw text starting with the ---.
"""

# 4. Generate Content with Groq
print("Sending to Groq (llama-3.3-70b-versatile)...")
response = client.chat.completions.create(
    messages=[
        {"role": "system", "content": "You are a professional tech blogger."},
        {"role": "user", "content": prompt}
    ],
    model="llama-3.3-70b-versatile",
    temperature=0.7,
    max_tokens=4000,
)

article_content = response.choices[0].message.content

# 5. Save the Output as a Markdown File in the Correct Folder
filename = re.sub(r'[^\w\s-]', '', news_title).strip().lower()
filename = re.sub(r'[-\s]+', '-', filename) + ".md"

output_dir = "content/posts"
os.makedirs(output_dir, exist_ok=True)

file_path = os.path.join(output_dir, filename)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(article_content)

print(f"Success! Blog post saved to: {file_path}")
