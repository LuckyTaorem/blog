import os

output_dir = "content/posts"
print("Fixing leading slashes in Markdown files...")

if os.path.exists(output_dir):
    for fname in os.listdir(output_dir):
        if not fname.endswith(".md"): 
            continue
        
        file_path = os.path.join(output_dir, fname)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Strip the leading slash from the paths
        content = content.replace('thumbnail: "/images/', 'thumbnail: "images/')
        content = content.replace('images: ["/images/', 'images: ["images/')
        content = content.replace('](/images/', '](images/')
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
            
    print("✅ All leading slashes removed!")