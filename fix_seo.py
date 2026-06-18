import os
import re
from groq import Groq

print("--- RUNNING AI SEO HEALER ---")

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def generate_short_title(old_title):
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are an expert SEO copywriter."},
                {"role": "user", "content": f"Rewrite this blog post title to be highly engaging, click-optimized, and STRICTLY UNDER 50 CHARACTERS. Do NOT use ellipses (...). Output ONLY the new title text, without any quotes.\n\nOriginal title: {old_title}"}
            ],
            model="llama-3.1-8b-instant",
            temperature=0.5,
            max_tokens=30,
        )
        return response.choices[0].message.content.strip().replace('"', '')
    except Exception as e:
        print(f"  -> AI Failed to rewrite title: {e}")
        return old_title[:49].strip()

def generate_seo_description(content_summary):
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are an expert SEO copywriter."},
                {"role": "user", "content": f"Write a meta description for this article. It MUST be exactly between 140 and 150 characters long. Output ONLY the description text, without any quotes.\n\nContext: {content_summary}"}
            ],
            model="llama-3.1-8b-instant",
            temperature=0.5,
            max_tokens=60,
        )
        return response.choices[0].message.content.strip().replace('"', '')
    except Exception as e:
        print(f"  -> AI Failed to rewrite description: {e}")
        return content_summary[:147] + "..."

output_dir = "content/posts"

if os.path.exists(output_dir):
    for fname in os.listdir(output_dir):
        if not fname.endswith(".md"): 
            continue
            
        file_path = os.path.join(output_dir, fname)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        changed = False

        # Safely split frontmatter and body
        parts = content.split("---", 2)
        if len(parts) < 3:
            continue
            
        frontmatter = parts[1]
        body = parts[2]

        # --- 1. TITLE CHECK (< 50) ---
        title_match = re.search(r'^title:\s*"(.*?)"', frontmatter, re.MULTILINE)
        if title_match:
            old_title = title_match.group(1)
            if len(old_title) > 50 or "..." in old_title:
                print(f"⏳ Fixing Title: {fname} (Length: {len(old_title)})")
                new_title = generate_short_title(old_title)
                frontmatter = frontmatter.replace(f'title: "{old_title}"', f'title: "{new_title}"')
                changed = True
            else:
                print(f"✅ Title OK: {fname}")

        # --- 2. DESCRIPTION CHECK (140 - 150) ---
        desc_match = re.search(r'^description:\s*"(.*?)"', frontmatter, re.MULTILINE)
        if desc_match:
            old_desc = desc_match.group(1)
            # If description is out of bounds or missing
            if len(old_desc) < 140 or len(old_desc) > 150 or "155-character" in old_desc:
                print(f"⏳ Fixing Description: {fname} (Length: {len(old_desc)})")
                # Give the AI the first 500 chars of the body to write a good description
                new_desc = generate_seo_description(body[:500])
                frontmatter = frontmatter.replace(f'description: "{old_desc}"', f'description: "{new_desc}"')
                changed = True
            else:
                print(f"✅ Description OK: {fname}")

        # --- 3. H1 TAG CHECK ---
        new_body = re.sub(r'^#\s+', '## ', body, flags=re.MULTILINE)
        if new_body != body:
            print(f"📉 Downgraded H1 to H2: {fname}")
            body = new_body
            changed = True

        # --- SAVE ---
        if changed:
            # Reassemble the document
            final_content = f"---{frontmatter}---{body}"
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(final_content)
            print(f"💾 Saved changes to: {fname}\n")

print("--- SEO HEALER COMPLETE ---")