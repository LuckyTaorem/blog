import os

output_dir = "content/posts"
print("--- RUNNING BULK COMMENT SHORTCODE INJECTOR ---")

if os.path.exists(output_dir):
    for fname in os.listdir(output_dir):
        if not fname.endswith(".md"): 
            continue
        
        file_path = os.path.join(output_dir, fname)
        
        # Read the current file
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Check if the shortcode is already there to prevent duplicates
        if "{{< comments >}}" not in content:
            # Append it to the very bottom
            with open(file_path, "a", encoding="utf-8") as f:
                f.write("\n\n{{< comments >}}\n")
            print(f" ✅ Added comments to: {fname}")
        else:
            print(f" ⏭️ Skipped (already has comments): {fname}")

print("--- INJECTION COMPLETE ---")