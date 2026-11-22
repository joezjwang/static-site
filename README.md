# ZJ Wang Photography (`www.zjwang.ca`)

Static photography portfolio and travel blog built with [Hugo Extended](https://gohugo.io/) and deployed automatically to GitHub Pages.

- **Zero databases & zero external runtime dependencies** (fonts are self-hosted in `static/fonts/`, no third-party CDNs or analytics — works reliably worldwide including in China).
- **Legacy browser friendly** (static HTML, ES5 vanilla JS, and `<picture>` WebP images with automatic JPEG fallbacks).
- **Automatic responsive images** (Hugo generates optimized WebP + JPEG sizes on build).

---

## Local Preview

Install Hugo Extended (version `0.170.1` or newer):

```powershell
winget install --id Hugo.Hugo.Extended -e
```

Start the local preview server:

```bash
hugo server
```

Open `http://localhost:1313/` in your browser.

---

## How to Add a New Photo Collection

1. Create a new folder under `content/collections/`, e.g. `content/collections/kyoto-autumn/`.
2. Drop your `.jpg` photos into that folder.
   - Tip: Name them `01-photo.jpg`, `02-photo.jpg`, etc., to control their display order.
3. Add an `index.md` file inside that folder:

   ```yaml
   ---
   title: "Kyoto Autumn"
   date: 2026-11-01
   display_date: "11. 2026"
   weight: 5          # Lower numbers appear first on the homepage & Galleries page
   featured: true     # true = show link in the desktop sidebar under Galleries
   cover: "01-photo.jpg"
   description: "Short story or notes about this collection."
   ---
   ```

   *(All images in the folder are rendered automatically in filename order. You can optionally add a `photos:` list with `file` and `title` if you want custom alt titles.)*

4. Commit and push to `main`:

   ```bash
   git add .
   git commit -m "Add Kyoto Autumn collection"
   git push
   ```

GitHub Actions will automatically build and publish the updated site within ~1 minute.

---

## How to Add a New Blog Post

1. Create a new folder under `content/blog/`, e.g. `content/blog/my-new-story/`.
2. Drop any photos used in the post into that same folder.
3. Add an `index.md` file:

   ```markdown
   ---
   title: "My New Story"
   date: 2026-11-21
   cover: "hero.jpg"
   description: "One-sentence summary for search engines and link previews."
   ---

   Write your article in standard Markdown.

   {{< figure src="photo-1.jpg" alt="Short description" caption="Optional photo caption" >}}

   Footnotes work automatically.[^1]

   [^1]: Footnote text here.
   ```

4. Commit and push to `main`.

---

## Publishing to GitHub Pages & Connecting `www.zjwang.ca`

1. Push this repository to GitHub (`https://github.com/joezjwang/static-site`).
2. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Wait for the **Deploy Hugo site to GitHub Pages** workflow to finish, then preview at:
   `https://joezjwang.github.io/static-site/`
4. When ready to switch over `www.zjwang.ca`:
   - In GitHub **Settings → Pages → Custom domain**, enter `www.zjwang.ca` and click **Save**.
   - At your domain registrar's DNS settings:
     - Set a `CNAME` record for `www` pointing to `joezjwang.github.io`.
     - *(Optional, so bare `zjwang.ca` redirects to `www.zjwang.ca`)* Add four `A` records for `@`:
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
   - Once DNS propagates, check **Enforce HTTPS** in GitHub Pages settings.
   - Update `baseURL` in `hugo.toml` to `"https://www.zjwang.ca/"` (the GitHub Actions workflow already passes the live Pages URL automatically).
