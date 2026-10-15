# 🚀 AI-Powered Autonomous Tech Blog Pipeline

An end-to-end, fully autonomous content engine that scrapes tech news, utilizes a multi-provider AI waterfall to generate exhaustive SEO-optimized long-form articles, deploys them to a Hugo static site via GitHub Actions, and broadcasts the content across 10+ social and blogging platforms.

---

## 🏗️ Architecture & Workflow

The project operates in four distinct phases, entirely automated via GitHub Actions (`cron` schedules) and Python scripts.

### 1. 🕵️ Scrape Mode (`--scrape`)
*   **RSS Aggregation:** Monitors feeds from TechCrunch, The Verge, Wired, ArsTechnica, etc.
*   **Intelligent Parsing:** Filters out non-news junk (job posts, coupons). If the RSS snippet is too short, it autonomously scrapes the live webpage to extract full paragraphs.
*   **Fact Extraction:** Sends the raw scraped text to an AI model with a strict prompt to extract comprehensive, chronological facts and quotes without hallucinations.
*   **Queueing:** Saves the factual summaries to `queue.json` for later batch processing.

### 2. 📝 Publish Mode (`--publish`)
*   **Batch Processing:** Pulls the top 5 pending articles from the queue.
*   **AI Waterfall Generation:** Uses a highly resilient multi-provider loop (Groq -> GitHub Models -> Mistral -> Gemini -> OpenRouter -> Cohere). If one API fails, rate-limits, or cuts off mid-sentence, it falls back to the next to complete the 800–1200 word article.
*   **SEO & Structure:** 
    *   Generates exact YAML frontmatter (Title, Description, Category).
    *   Pulls from a live catalog of existing site posts to inject **contextual internal links**.
    *   Ensures strict Markdown formatting (no empty headings, proper lists).
*   **Image Handling:** Attempts to pull the original article image, falls back to Unsplash via API, and if all fails, uses Python (`Pillow`) to generate a custom text-overlay graphic.
*   **Git Commit:** Commits the generated Markdown files to the repository.

### 3. ☢️ Pre-Deployment Link Fixer (`--fix-links`)
Before Hugo builds the site, a "nuclear" link fixer scans all Markdown files:
*   **Historical Timestamping:** Uses `git-restore-mtime-action` to retain exact historical dates.
*   **Validation:** Verifies every internal link against actual `.md` files. 
*   **Fuzzy Repair:** If the AI hallucinates a slightly incorrect slug, the script fuzzy-matches it to the closest real file.
*   **Cleanup:** If a link is entirely dead, it strips the Markdown brackets so the text remains readable but doesn't cause a Hugo 404 build crash.

### 4. 📣 Broadcast Mode (`--broadcast` / `--force-recent`)
Once the site is successfully built and deployed to GitHub Pages, the script automatically pings search engines and cross-posts to social media:
*   **SEO Pings:** Google Indexing API & Bing Webmaster API.
*   **Social Media:** Bluesky, Mastodon, Facebook Page, LinkedIn.
*   **External Blogs:** DEV.to, WordPress.com, Blogger, Tumblr, CoderLegion, Kleap.co (Direct PostgreSQL Database insertion).

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

*   **`batch.yaml`**: Runs twice daily. Triggers the Python script to pop 5 items from the queue, generate the articles, and commit them directly back to the `main` branch.
*   **`hugo.yaml`**: Triggers whenever a commit hits `main`.
    1. Restores Git mtimes.
    2. Runs the Python `--fix-links` script.
    3. Builds the static site using **Hugo v0.167.0** (pinned to prevent breaking theme changes).
    4. Deploys to GitHub Pages.
    5. Checks the commit message. If it was an automated batch, it waits 75 seconds for DNS propagation and fires the `--force-recent` broadcaster.

---

## 🔑 Environment Variables & API Keys required

This project requires extensive API access. All keys must be stored in **GitHub Repository Secrets**.

### AI Providers (The Waterfall)
*   `GROQ_API_KEY`
*   `GH_TOKEN` (GitHub Models API)
*   `GEMINI_API_KEY`
*   `MISTRAL_API_KEY`
*   `OPENROUTER_API_KEY`
*   `COHERE_API_KEY`

### Social Broadcasting & External Platforms
*   **Bluesky:** `BSKY_HANDLE`, `BSKY_PASSWORD`
*   **Facebook:** `FB_PAGE_TOKEN`, `FB_PAGE_ID`
*   **LinkedIn:** `LINKEDIN_TOKEN`, `LINKEDIN_URN`
*   **Mastodon:** `MASTODON_ACCESS_TOKEN`, `MASTODON_INSTANCE`
*   **Tumblr:** `TUMBLR_KEY`, `TUMBLR_SECRET`, `TUMBLR_OAUTH`, `TUMBLR_OAUTH_SECRET`, `TUMBLR_BLOG_NAME`
*   **DEV.to:** `DEVTO_API_KEY`
*   **Blogger:** `BLOGGER_BLOG_ID`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`
*   **WordPress.com:** `WP_COM_CLIENT_ID`, `WP_COM_CLIENT_SECRET`, `WP_COM_USERNAME`, `WP_COM_PASSWORD`, `WP_COM_SITE_DOMAIN`
*   **CoderLegion:** `CODERLEGION_API_KEY`
*   **Kleap.co:** `KLEAP_API_KEY`

### SEO, Assets, and Infrastructure
*   `GCP_INDEXING_JSON` (Google Search Console Service Account JSON)
*   `BING_API_KEY`
*   `UNSPLASH_ACCESS_KEY`
*   `DEPLOY_TOKEN` (GitHub PAT to allow automated commits to trigger the `hugo.yaml` workflow).

---

## 🛠️ Built With
*   **Python 3.10** (Core logic, scraping, API routing)
*   **Hugo (v0.167.0)** + Hinode Theme (Static Site Generation)
*   **GitHub Actions** (Orchestration & CI/CD)
*   **Pillow** (Fallback Image Generation)
*   **BeautifulSoup & regex** (HTML parsing and string sanitization)
