import os
import feedparser
from groq import Groq
import re
from datetime import datetime, timezone

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

output_dir = "content/posts"
os.makedirs(output_dir, exist_ok=True)

# Image Extractor Function
def extract_image(entry):
    if 'media_content' in entry and len(entry.media_content) > 0:
        return entry.media_content[0]['url']
    if 'links' in entry:
        for link in entry.links:
            if link.get('rel') == 'enclosure' and 'image' in link.get('type', ''):
                return link.get('href')
    match = re.search(r'<img[^>]+src="([^">]+)"', entry.get('summary', '') + str(entry.get('content', '')))
    if match:
        return match.group(1)
    return "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"

# 3. Loop through EVERY site in the list
for current_feed in RSS_FEEDS:
    print(f"\nChecking {current_feed}...")
    feed = feedparser.parse(current_feed)
    
    # Check the top 5 recent articles in this feed to find a new one
    for entry in feed.entries[:5]:
        news_title = entry.title
        
        # Generate the filename
        filename = re.sub(r'[^\w\s-]', '', news_title).strip().lower()
        filename = re.sub(r'[-\s]+', '-', filename) + ".md"
        file_path = os.path.join(output_dir, filename)
        
        # --- FIX 1: PREVENT OVERWRITING ---
        if os.path.exists(file_path):
            print(f"Skipping (Already published): {news_title}")
            continue # Move down the list to the next article
            
        print(f"Found NEW article: {news_title}")
        news_summary = entry.summary
        image_url = extract_image(entry)
        
        # --- FIX 2 & 3: DYNAMIC TAGS AND EMBEDDED IMAGES ---
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
images: ["{image_url}"]
description: "A 155-character SEO meta description here."
categories: ["Insert 1 or 2 relevant categories here based on the text"]
tags: ["Insert 3 to 5 relevant tags here based on the text"]
---

![Featured Image]({image_url})

(Write the rest of the markdown article here. Do not wrap the whole output in markdown code blocks, just output the raw text starting with the ---.)
"""

        # 4. Generate Content with Groq
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

        article_content = response.choices[0].message.content

        # 5. Save the Output
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(article_content)

        print(f"Success! Blog post saved to: {file_path}")
        
        # --- FIX 4: ONLY ONE PER SITE ---
        # Break out of the 'entry' loop so we move on to the next website
        # This ensures we get exactly 1 new article per site, per run.
        break
