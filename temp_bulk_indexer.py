import os
import time
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

# Look for the local JSON file you just dragged in
KEY_FILE = "gcp-key.json"

def run_bulk_indexer():
    print("🚀 Starting Bulk Google Indexer...\n" + "="*40)
    
    if not os.path.exists(KEY_FILE):
        print(f"❌ ERROR: Could not find '{KEY_FILE}'. Please make sure it is in this folder.")
        return

    # Authenticate using the local file
    credentials = service_account.Credentials.from_service_account_file(
        KEY_FILE, scopes=['https://www.googleapis.com/auth/indexing']
    )
    authed_session = AuthorizedSession(credentials)

    output_dir = "content/posts"
    success_count = 0

    for fname in os.listdir(output_dir):
        if not fname.endswith('.md') or fname == "_index.md":
            continue

        # Convert filename into the URL slug
        slug = fname.replace('.md', '')
        live_url = f"https://luckytaorem.github.io/blog/posts/{slug}/"

        print(f"📡 Requesting index for: {live_url}")
        
        try:
            response = authed_session.post(
                'https://indexing.googleapis.com/v3/urlNotifications:publish',
                json={"url": live_url, "type": "URL_UPDATED"}
            )
            
            if response.status_code == 200:
                print("  ✅ Success")
                success_count += 1
            elif response.status_code == 429:
                print("  🛑 ERROR: You hit Google's daily quota limit! Stopping.")
                break
            else:
                print(f"  ⚠️ API Error {response.status_code}: {response.text}")
                
        except Exception as e:
            print(f"  🚨 Connection Failed: {e}")

        # Sleep for 1 second between requests so Google doesn't block us for spamming
        time.sleep(1)

    print("\n" + "="*40)
    print(f"🎉 Complete! Successfully submitted {success_count} posts to Google.")

if __name__ == "__main__":
    run_bulk_indexer()