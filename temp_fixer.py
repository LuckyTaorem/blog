import os
import re

def clean_frontmatter():
    output_dir = "content/posts"
    
    if not os.path.exists(output_dir):
        print(f"❌ Directory '{output_dir}' not found. Are you in the right folder?")
        return

    fixed_count = 0
    print("🧹 Starting global frontmatter cleanup...\n")

    for fname in os.listdir(output_dir):
        # Skip the main Hugo index file and non-markdown files
        if not fname.endswith('.md') or fname == "_index.md":
            continue

        filepath = os.path.join(output_dir, fname)
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content = content
            
            # 1. Clean the Title
            def title_cleaner(match):
                raw_val = match.group(1)
                # Strip all leading/trailing quotes and spaces repeatedly until clean
                clean_val = re.sub(r'^["\'\s]+|["\'\s]+$', '', raw_val)
                # Swap any internal double quotes to single quotes so YAML doesn't break
                clean_val = clean_val.replace('"', "'")
                return f'title: "{clean_val}"'
                
            new_content = re.sub(r'^title:\s*(.*)$', title_cleaner, new_content, flags=re.MULTILINE)

            # 2. Clean the Description
            def desc_cleaner(match):
                raw_val = match.group(1)
                clean_val = re.sub(r'^["\'\s]+|["\'\s]+$', '', raw_val)
                clean_val = clean_val.replace('"', "'")
                return f'description: "{clean_val}"'
                
            new_content = re.sub(r'^description:\s*(.*)$', desc_cleaner, new_content, flags=re.MULTILINE)

            # 3. Ensure closing --- exists (just in case old files are still missing it)
            if new_content.startswith("---") and new_content.find("---", 3) == -1:
                parts = new_content.split('\n\n', 1)
                if len(parts) == 2:
                    new_content = parts[0] + "\n---\n\n" + parts[1]

            # If changes were made, save the file
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ Fixed quotes in: {fname}")
                fixed_count += 1

        except Exception as e:
            print(f"⚠️ Could not process {fname}: {e}")

    print(f"\n🎉 Done! Successfully cleaned {fixed_count} files.")

if __name__ == "__main__":
    clean_frontmatter()