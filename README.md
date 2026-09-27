# Ananya Shekhar — Portfolio

A personal portfolio site built with plain HTML5, CSS3, and vanilla JavaScript, with Three.js for the 3D hero visual and GSAP for entrance animation. No build step, no framework.

## Running locally

Just open `index.html` in a browser, or serve the folder so relative paths behave the same as in production:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploying

This is a static site — any static host works.

- **GitHub Pages:** push this folder to a repo and enable Pages on the `main` branch (root).
- **Vercel / Netlify:** drag-and-drop the folder in their dashboard, or connect the repo. No build command is needed; the output directory is the project root.

## Before you publish — fill in the placeholders

A few personal details were intentionally left as placeholders rather than invented. Update these in `script.js` (top of the file, `LINKS` object) and in `index.html`'s `<title>`/meta tags if needed:

- `LINKS.linkedin` — your LinkedIn URL
- `LINKS.youtube` — your YouTube URL, if you want the footer link live
- `LINKS.email` — the email address the "Email me" button should open

Until these are filled in, those buttons are visibly present but inactive rather than pointing anywhere fake.

## Connecting the contact form to a backend

The form in `#contact` currently validates input client-side but does not send anything anywhere — there is no backend, so it doesn't pretend to. To make it actually deliver messages, pick one:

**Formspree**
1. Create a form at formspree.io and grab your endpoint (`https://formspree.io/f/xxxxxxx`).
2. In `index.html`, add `action="https://formspree.io/f/xxxxxxx"` and `method="POST"` to `#contact-form`.
3. In `script.js`, replace the `submit` handler's final block (after validation passes) with a `fetch` POST to that endpoint, or remove `e.preventDefault()` for a plain HTML submit.

**Web3Forms**
1. Get an access key from web3forms.com.
2. Add a hidden `<input type="hidden" name="access_key" value="YOUR_KEY">` to the form.
3. POST the form data to `https://api.web3forms.com/submit` the same way.

Either integration is a small, contained change — the validation logic stays as-is.

## How to create project visuals

Project images are optional. If `assets/projects/<slug>.webp` is missing, the site automatically falls back to a themed CSS visual (`onerror` handler in `script.js` → `.project-fallback`), so nothing ever breaks or shows a broken-image icon.

To add real visuals, generate an image with any image tool (ChatGPT image generation, Google ImageFX, Adobe Firefly, Midjourney, Whisk, etc.), save it at 16:10 or 16:9, and drop it into `assets/projects/` with the exact filename below.

Shared visual language for all five: dark premium background, soft lighting, high contrast, minimal typography, consistent depth and border radius — like a screenshot from a real software product, not a stock photo or generic AI-robot image. No fake metrics, user counts, logos, or testimonials in any image.

**1. `ai-bug-investigator.webp`**
> A dark, premium developer-tool UI screenshot: a code editor pane with Python code, an error message, and an AI analysis panel beside it showing a bug explanation and a suggested fix, plus a terminal strip at the bottom. Black/charcoal palette, subtle warm gold accent lighting, sharp minimal typography, 16:10, looks like a real IDE plugin, no logos or fake stats.

**2. `ai-life-coach.webp`**
> A calm, premium AI productivity dashboard: daily goals list, a progress bar, a small learning tracker, a compact calendar widget, and an AI assistant panel on the side. Soft glass surfaces on a near-black background, minimal warm-gold accent, elegant spacing, 16:10, no fake numbers or testimonials.

**3. `life-random-generator.webp`**
> A playful but premium AI app interface: a large "Generate" button, a card showing an AI-generated creative suggestion, and a subtle generation-in-progress visual element. Dark modern dashboard aesthetic, experimental but refined, 16:10.

**4. `youtube-family-time-guard.webp`**
> An original (not a copy of YouTube's actual UI) video-platform-style interface with a browser extension popup open, showing a usage/time-tracking widget and a gentle family-friendly reminder notification. Dark premium styling, 16:10.

**5. `lumi-studio.webp`**
> A small stylized 3D creative environment — soft directional lighting, a couple of simple interactive-looking objects, minimal UI chrome, feels like a tiny self-contained digital world. Dark background, warm accent highlights, 16:10.

Also worth generating, though not strictly required:
- `assets/profile/og-image.webp` — a clean 1200×630 social-share card with your name and title, matching the site's dark/gold palette.

## File structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── profile/
    ├── projects/
    └── icons/
```

## Notes on what's real vs. placeholder

Per the brief this was built from: no companies, clients, jobs, awards, certifications, user counts, or testimonials are invented anywhere on the site. Every project listed links to its real GitHub repository. Contribution graph data, skill percentages, and case-study "problem/solution/what I learned" copy are left as clean placeholders (`[Add project description]`) where the source brief didn't supply specifics — fill those in directly in the `PROJECTS` array in `script.js` and the modal template in `index.html`.
