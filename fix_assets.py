import os
import shutil

print("--- FIXING HUGO ASSETS ---")

# 1. Move images from static/images to assets/images
static_img = "static/images"
asset_img = "assets/images"
os.makedirs(asset_img, exist_ok=True)

if os.path.exists(static_img):
    for file in os.listdir(static_img):
        src = os.path.join(static_img, file)
        dst = os.path.join(asset_img, file)
        if os.path.isfile(src):
            shutil.move(src, dst)
    print("✅ Moved all images to the correct assets/images/ folder!")

# 2. Revert the Markdown files back to the clean paths
output_dir = "content/posts"
if os.path.exists(output_dir):
    for fname in os.listdir(output_dir):
        if not fname.endswith(".md"): continue
        file_path = os.path.join(output_dir, fname)
        
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Strip out the /blog prefix we accidentally added earlier
        content = content.replace('"/blog/images/', '"/images/')
        content = content.replace('](/blog/images/', '](/images/')
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
    print("✅ Fixed all Markdown paths!")
    
print("--- DONE! ---")