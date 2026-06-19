import os
import re

def structural_frontmatter_fixer():
    output_dir = "content/posts"
    
    if not os.path.exists(output_dir):
        print(f"❌ Directory '{output_dir}' not found.")
        return

    fixed_count = 0
    print("🧹 Starting ultimate frontmatter structural repair...\n")

    for fname in os.listdir(output_dir):
        if not fname.endswith('.md') or fname == "_index.md":
            continue

        filepath = os.path.join(output_dir, fname)
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content = content

            # 1. FIX Smashed Date and Draft Line (e.g., +00:00draft: false)
            if "draft:" in new_content and not re.search(r'^draft:', new_content, re.MULTILINE):
                # Separate date timestamp and draft field onto separate lines
                new_content = re.sub(
                    r'(date:\s*\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?\+00:00)\s*draft:\s*(true|false)',
                    r'\1\ndraft: \2',
                    new_content,
                    flags=re.IGNORECASE
                )

            # 2. FIX Mutilated Images Arrays (e.g., [\'images/..."] or ["images/...\'])
            new_content = re.sub(
                r'images:\s*\[[\'"]+([^\'"\]]+)[\'"]+\]',
                r'images: ["\1"]',
                new_content,
                flags=re.MULTILINE
            )
            
            # 3. Double-check absolute isolation of the fields
            def sanitize_field(line_prefix, current_content):
                pattern = rf'^{line_prefix}:\s*(.*)$'
                match = re.search(pattern, current_content, re.MULTILINE)
                if not match:
                    return current_content
                raw_val = match.group(1).strip()
                clean_val = raw_val
                while clean_val.startswith(('"', "'", '\\')) or clean_val.endswith(('"', "'", '\\')):
                    clean_val = re.sub(r'^["\'\\]+|["\'\\]+$', '', clean_val)
                clean_val = clean_val.replace("\\'", "'").replace('\\"', "'").replace('"', "'")
                return re.sub(pattern, f'{line_prefix}: "{clean_val}"', current_content, flags=re.MULTILINE)

            new_content = sanitize_field("title", new_content)
            new_content = sanitize_field("description", new_content)

            # Save only if corrections were applied
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ Repaired structure in: {fname}")
                fixed_count += 1

        except Exception as e:
            print(f"⚠️ Error processing {fname}: {e}")

    print(f"\n🎉 Successfully repaired structural flaws in {fixed_count} files!")

if __name__ == "__main__":
    structural_frontmatter_fixer()