import os
import re

output_dir = "content/posts"

print("Fixing image paths in all Markdown files...")

for fname in os.listdir(output_dir):
    if not fname.endswith(".md"):
        continue
    
    file_path = os.path.join(output_dir, fname)
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Change absolute root paths to include your /blog/ subfolder
    content = content.replace('thumbnail: "/images/', 'thumbnail: "/blog/images/')
    content = content.replace('images: ["/images/', 'images: ["/blog/images/')
    content = content.replace('](/images/', '](/blog/images/') # Fixes in-article images

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Done! All posts now point to /blog/images/")
