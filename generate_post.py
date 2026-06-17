import os
import feedparser
from groq import Groq
import re
from datetime import datetime, timezone

# 1. Initialize Groq Client
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# 2. Fetch Latest News (Using TechCrunch as an example)
RSS_URL = "https://techcrunch.com/feed/"
print(f"Fetching news from {RSS_URL}...")
feed = feedparser.parse(RSS_URL)

latest_entry = feed.entries[0]
news_title = latest_entry.title
news_summary = latest_entry.summary

print(f"Found article: {news_title}")

# 3. Build the Prompt for Llama 3
# Notice we are explicitly telling it to include 'draft: false'
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

# Pointing exactly to your new Hugo posts folder
output_dir = "content/posts"
os.makedirs(output_dir, exist_ok=True)

file_path = os.path.join(output_dir, filename)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(article_content)

print(f"Success! Blog post saved to: {file_path}")