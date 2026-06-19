import os
import re

def comprehensive_frontmatter_cleaner():
    output_dir = "content/posts"
    
    if not os.path.exists(output_dir):
        print(f"❌ Directory '{output_dir}' not found.")
        return

    fixed_count = 0
    print("🧹 Starting deep frontmatter sterilization...\n")

    for fname in os.listdir(output_dir):
        # Skip core structural files
        if not fname.endswith('.md') or fname == "_index.md":
            continue

        filepath = os.path.join(output_dir, fname)
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content = content
            
            # Helper to completely sanitize string fields in frontmatter
            def sanitize_field(line_prefix, current_content):
                pattern = rf'^{line_prefix}:\s*(.*)$'
                match = re.search(pattern, current_content, re.MULTILINE)
                if not match:
                    return current_content
                
                raw_val = match.group(1).strip()
                
                # Remove any existing outer quotes, backslashes, and escaped quotes
                clean_val = raw_val
                # Remove leading/trailing stray quotes or backslashes repeatedly
                while clean_val.startswith(('"', "'", '\\')) or clean_val.endswith(('"', "'", '\\')):
                    clean_val = re.sub(r'^["\'\\]+|["\'\\]+$', '', clean_val)
                
                # Replace any internal remaining backslash-escapes
                clean_val = clean_val.replace("\\'", "'").replace('\\"', "'").replace('"', "'")
                
                # Reconstruct line cleanly wrapped in valid double quotes
                return re.sub(pattern, f'{line_prefix}: "{clean_val}"', current_content, flags=re.MULTILINE)

            # Sanitize the problematic fields
            new_content = sanitize_field("title", new_content)
            new_content = sanitize_field("description", new_content)

            # Ensure closing frontmatter delimiter exists cleanly
            if new_content.startswith("---") and new_content.find("---", 3) == -1:
                parts = new_content.split('\n\n', 1)
                if len(parts) == 2:
                    new_content = parts[0] + "\n---\n\n" + parts[1]

            # Save if something changed
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ Cleaned formatting anomalies in: {fname}")
                fixed_count += 1

        except Exception as e:
            print(f"⚠️ Error processing {fname}: {e}")

    print(f"\n🎉 Cleaned up {fixed_count} files successfully!")

if __name__ == "__main__":
    comprehensive_frontmatter_cleaner()