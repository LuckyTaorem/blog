import os
import re

def ultimate_frontmatter_fixer():
    output_dir = "content/posts"
    if not os.path.exists(output_dir):
        print(f"❌ Directory '{output_dir}' not found.")
        return

    fixed_count = 0
    print("🧹 Sterilizing quotes, image paths, and formatting...\n")

    for fname in os.listdir(output_dir):
        if not fname.endswith('.md') or fname == "_index.md":
            continue

        filepath = os.path.join(output_dir, fname)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content = content

            # 1. Clean the stacked quotes in Title and Description
            def sanitize_quotes(line_prefix, current_content):
                pattern = rf'^{line_prefix}:\s*(.*)$'
                match = re.search(pattern, current_content, re.MULTILINE)
                if not match:
                    return current_content
                
                raw_val = match.group(1).strip()
                # Strip all outer quotes and spaces until it is just raw text
                clean_val = re.sub(r'^["\'\s]+|["\'\s]+$', '', raw_val)
                # Swap internal double quotes to single quotes to prevent YAML crashes
                clean_val = clean_val.replace('"', "'")
                
                return re.sub(pattern, f'{line_prefix}: "{clean_val}"', current_content, flags=re.MULTILINE)

            new_content = sanitize_quotes("title", new_content)
            new_content = sanitize_quotes("description", new_content)

            # 2. Clean the images array line (strips all \, ', " from the path)
            images_match = re.search(r'^images:\s*\[(.*)\]', new_content, re.MULTILINE)
            if images_match:
                raw_path = images_match.group(1)
                clean_path = re.sub(r'[\'\"\\\[\]]', '', raw_path).strip()
                new_content = re.sub(r'^images:\s*\[.*\]', f'images: ["{clean_path}"]', new_content, flags=re.MULTILINE)

            # 3. Clean the thumbnail line (strips all \, ', " from the path)
            thumbnail_match = re.search(r'^thumbnail:\s*(.*)', new_content, re.MULTILINE)
            if thumbnail_match:
                raw_path = thumbnail_match.group(1)
                clean_path = re.sub(r'[\'\"\\\[\]]', '', raw_path).strip()
                new_content = re.sub(r'^thumbnail:\s*.*', f'thumbnail: "{clean_path}"', new_content, flags=re.MULTILINE)

            # 4. Structural fix for smashed lines (+00:00draft: false)
            if "draft:" in new_content and not re.search(r'^draft:', new_content, re.MULTILINE):
                new_content = re.sub(
                    r'(date:\s*\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?\+00:00)\s*draft:\s*(true|false)',
                    r'\1\ndraft: \2',
                    new_content,
                    flags=re.IGNORECASE
                )

            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ Cleaned formatting in: {fname}")
                fixed_count += 1

        except Exception as e:
            print(f"⚠️ Error processing {fname}: {e}")

    print(f"\n🎉 Successfully repaired {fixed_count} files!")

if __name__ == "__main__":
    ultimate_frontmatter_fixer()