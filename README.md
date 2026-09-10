# Newman Site Port

Port the attached file `newman-site.html` into this project EXACTLY as it is. It is a finished, approved, self-contained marketing website for the book "The Newman Metabolic System Diet" by Allen Newman. Your job is a faithful 1:1 port to React — NOT a redesign, NOT a reinterpretation, and NOT an improvement.

WHAT TO DO

1. Extract the three base64 `data:image/jpeg` URIs that are inlined in the HTML and save them as real files:
   - the book cover (appears 3 times, tallest image, ~860x1295) -> `public/cover.jpg`
   - the Vitruvian Man on parchment (~600x728) -> `public/vitruvian.jpg`
   - the algae-under-microscope circle (~300x293) -> `public/algae.jpg`
   Replace every data URI in the markup with `/cover.jpg`, `/vitruvian.jpg`, `/algae.jpg`. This is important: the file is 1.1 MB only because of these inlined images.

2. Move the entire contents of the `<style>` block into `src/index.css`, VERBATIM. Keep the Tailwind directives at the top of that file. Do not convert any of it to Tailwind utility classes. Do not rename any class. Do not "tidy" the CSS.

3. Convert the markup to a single React component in `src/App.tsx`. Mechanical conversion only: `class`->`className`, `for`->`htmlFor`, inline `style="..."` -> style objects, SVG attributes to camelCase (`stroke-width`->`strokeWidth`, `stroke-linecap`->`strokeLinecap`), self-close void elements, HTML comments -> JSX comments. Keep every `id`, every `data-*` attribute and every class name exactly as they are — the JavaScript selects elements by those ids and attributes. On the format radio inputs use `defaultChecked`, not `checked`. For the SVG elements that carry `style="--len:553"` etc, pass the CSS custom property through a `style={{...} as React.CSSProperties}` cast.

4. Move the entire `<script>` block into `src/lib/newman-motion.ts` as an exported function `initNewmanSite(): () => void`. Call it from `App.tsx` in a `useEffect(() => initNewmanSite(), [])`. It MUST return a teardown function that cancels the animation frame and removes every event listener, because React StrictMode mounts effects twice and you will otherwise get duplicate animation loops. Keep the `CONFIG` object at the top of that file, unchanged, as the single place to set prices and the checkout URL.

5. In `index.html`, add to `<head>`: the two Google Fonts preconnect links and the stylesheet link for `Playfair Display` and `Source Sans 3` (exact same href as in the attached file), the title "The Newman Metabolic System Diet — Allen Newman", a meta description, Open Graph tags, and a `Book` JSON-LD block with author "Allen Newman", publisher "Parker Publishers", ISBN 978-1-963654-001-2.

CRITICAL — WHAT NOT TO DO

- Do NOT rewrite, shorten, paraphrase or "improve" a single word of the copy. Every line is legally reviewed. This is a health-adjacent book and the copy deliberately avoids: any claim that anything cures/treats/prevents/reverses a disease; any "drug-free" or stop-your-medication framing; any GLP-1 or Ozempic comparison; any before/after weight-loss imagery; any targeting of a named illness. Reproduce the text exactly, including the footer disclaimer.
- Do NOT refactor, simplify or rewrite the JavaScript in `newman-motion.ts`. It is hand-written canvas and scroll mathematics: a 46-band water simulation on the hero canvas, a 1,500-particle phyllotaxis "grand ballet" field, scroll-scrubbed counters, a self-drawing Vitruvian circle/square, and a horizontally scroll-jacked section. If you "clean it up" you will break all of it. Port it as-is.
- Do NOT add shadcn/ui components, a component library, a router, or any animation library (no Framer Motion, no GSAP). The page uses zero dependencies beyond React.
- Do NOT change the colour palette or the fonts. The palette is sampled from the printed book jacket.
- Do NOT split it into multiple pages. It is intentionally one long scroll.

WHEN DONE

Confirm that the page renders, that all three images load from `/public`, that scrolling animates the hero water, the calorie counter, the particle field and the horizontal marathon section, and that `prefers-reduced-motion` still produces a static but fully readable page.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://newman-metabolic-system.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5a807def-272e-4c04-9c37-d76c2fc08bf0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
