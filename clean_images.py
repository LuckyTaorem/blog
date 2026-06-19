import os
import re

output_dir = "content/posts"
print("--- RUNNING FEATURED IMAGE CLEANER ---")

if os.path.exists(output_dir):
    for fname in os.listdir(output_dir):
        if not fname.endswith(".md"): 
            continue
        
        file_path = os.path.join(output_dir, fname)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Regex specifically targeting the ![Featured Image](...) line
        # The re.MULTILINE flag ensures it finds it even if it's in the middle of the document
        new_content = re.sub(r'^!\[Featured Image\].*\n?', '', content, flags=re.MULTILINE)

        # If changes were made, save the file
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f" ✅ Removed featured image from: {fname}")

print("--- CLEANUP COMPLETE ---")