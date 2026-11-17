# ravi-portfolio

A hand-coded personal portfolio for **Ravi Teja Putta** — 2026 B.Tech Computer Science
graduate, JNTU Anantapur. Static HTML, CSS and JavaScript. No frameworks, no build
step, no dependencies.

**Live site:** `https://ravitejaputta257.github.io/`

The username is already filled in everywhere in `index.html` — canonical URL, social
preview tags, structured data and the GitHub contact link. Nothing left to edit there.

---

## Publish it (10 minutes)

1. Create a GitHub account if you do not have one.
2. If you ever move this to another account: create a **new public repository** named
   exactly `<username>.github.io`. This is what makes the URL short —
   `https://<username>.github.io/`.
3. Upload the **contents** of this folder (not the folder itself) to the repository
   root: `index.html`, `404.html`, `assets/`, `README.md`, `LICENSE`, `.nojekyll`.
   Keep the folder structure of `assets/` exactly as it is.
   - Browser route: repository → **Add file → Upload files** → drag everything in.
   - Command line route, from inside this folder:
     ```bash
     git init
     git add .
     git commit -m "Portfolio: initial version"
     git branch -M main
     git remote add origin https://github.com/ravitejaputta257/ravitejaputta257.github.io.git
     git push -u origin main
     ```
4. Go to **Settings → Pages**. Under *Build and deployment*, set **Source** to
   *Deploy from a branch*, **Branch** to `main` and folder to `/ (root)`. Save.
5. Wait 1–2 minutes. Open `https://ravitejaputta257.github.io/`.
6. On LinkedIn, add that URL to your profile's *Contact info → Website*.
7. Add it to the resume header, next to the LinkedIn URL.

`.nojekyll` is included on purpose: it tells GitHub Pages to serve the files as they
are instead of running them through Jekyll.

### Preview locally before pushing

Double-click `index.html`. Everything works from `file://` except the copy-email
button, which browsers restrict outside `https`. For a true test, run:

```bash
python -m http.server 8000
```

then open `http://localhost:8000`.

---

## What is in here

```
ravi-portfolio/
├── index.html                  all the content — hero, work, skills, experience, contact
├── 404.html                    self-contained not-found page
├── assets/
│   ├── css/style.css           the entire stylesheet (tokens, themes, responsive, print)
│   ├── js/main.js              theme toggle, scroll spy, reveal-on-scroll, copy email
│   ├── img/
│   │   ├── favicon.svg         RT monogram for browser tabs
│   │   ├── apple-touch-icon.png
│   │   └── og.png              1200×630 preview card for LinkedIn / WhatsApp
│   └── resume/
│       └── Ravi_Teja_Putta_Resume.pdf   the file the two "Resume" links download
├── .nojekyll                   tells GitHub Pages to skip Jekyll
├── .gitignore
├── LICENSE                     MIT — the code is yours to reuse
└── README.md
```

The page works with JavaScript switched off. JS only adds the theme toggle, the
active-section highlight, scroll reveals and the copy button.

---

## When you update your resume

Replace `assets/resume/Ravi_Teja_Putta_Resume.pdf` with the new file, keeping the
**same filename**. The header button and the contact-section link both point at it,
so nothing else needs editing. Then commit:

```bash
git add assets/resume/Ravi_Teja_Putta_Resume.pdf
git commit -m "Update resume"
git push
```

## Adding project screenshots later

The two project covers are CSS-generated, deliberately — they are honest placeholders,
not fake screenshots. When you have a real screenshot of MemberHub or AgriPredict:

1. Save it at `assets/img/memberhub.png` (roughly 1200×900, under 300 KB, compress it
   at squoosh.app or tinypng.com).
2. In `index.html`, replace the contents of the cover `div` for that project:

   ```html
   <div class="project-cover cover-memberhub">
     <img src="assets/img/memberhub.png" alt="MemberHub member records screen" />
   </div>
   ```

3. Add this to `assets/css/style.css` so the image fills the frame:

   ```css
   .project-cover img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
   ```

Do the same for `cover-agri` / `assets/img/agripredict.png`.

## Changing a link

| What | Where in `index.html` |
|---|---|
| Email | the `mailto:` links and `data-email` on the copy button — three places |
| Phone | the `tel:` link and the JSON-LD `telephone` field |
| LinkedIn | the contact link and the JSON-LD `sameAs` |
| GitHub | the contact link, `sameAs`, and the canonical/OG URLs |

## The content is deliberately careful

Every claim on the page matches what can be defended in an interview:

- MemberHub is labelled **team project**, and the bullets say *"supported the team on"*
  where the work was shared. It does not claim you built authentication alone.
- AgriPredict is described as a **frontend role**. The page says plainly that the model
  is not your work, and publishes **no accuracy number** because you did not run the
  evaluation.
- Python is listed as a **beginner** skill, not as machine-learning experience. There is
  no "machine learning" claim anywhere on the site.
- Skills are grouped by real depth (*Comfortable* / *Working basics* / *Fundamentals* /
  *Learning now*), not listed as a flat wall.
- CGPA is 7.34 / 10 and the graduation date is April 2026, matching the resume.

If you add a claim you cannot back up, a single interview question will undo the whole
page. Keep the standard.

## License

MIT for the code. The text, resume and personal details are Ravi Teja Putta's.
