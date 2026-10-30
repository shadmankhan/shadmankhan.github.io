# Shadman’s world

A personal portfolio shaped like an explorable house. It is built with Next.js App Router, TypeScript, Motion for React, React Three Fiber, Three.js, D3, and Tailwind CSS.

## Run locally

Use Node.js 22 or later.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To validate the production export:

```bash
npm run typecheck
npm run lint
npm run build
```

The static site is written to `out/`.

## Deploy

GitHub Actions builds and deploys `out/` to GitHub Pages whenever `main` changes. In the repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The home page is exported to `out/index.html`; room routes are exported as directories so direct visits and refreshes work. The public GitHub contribution garden is a build-time snapshot and refreshes on each deployment. No environment variables or API keys are required.

## Content

Public, editable portfolio data lives in [`content/public-profile.ts`](./content/public-profile.ts). Room names, links, colors, and icons live in [`content/rooms.ts`](./content/rooms.ts). Keep private source profile files out of the repository and deployed bundle. The portfolio excludes personal phone details and confidential employment information by design.

Changing snapshot fields such as currently played games, current reading, music releases, and selected repositories are grouped in the public profile module for straightforward edits. Employment summaries are intentionally high-level. AI tooling experience and areas of learning are labeled separately.

## The world and its rooms

- `/` — two-story, open-front house. Every room is a link; the waving guide greets visitors. A semantic illustrated house with the same room links is used at small widths and remains available if WebGL cannot render.
- `/studio` — work snapshots, repository shelf, AI experience framing, a three-switch desk puzzle, and an explicitly decorative contribution garden.
- `/arcade` — current and next games, official game-world art, copyable handles, and a keyboard- and touch-friendly memory game.
- `/music` — an original listening-room scene. Official Spotify and privacy-enhanced YouTube embeds load only after a visitor selects a player. Audio never autoplays.
- `/library` — current book and DOI links for two research publications.
- `/journeys` — D3 Natural Earth map with selectable points plus a conventional text list.
- `/garage` — a fictional manual-gear toy and an original CSS/SVG sedan illustration.
- `/garden` — selectable interests and an email contact action.
- `/about` — concise introduction, direct links, and an email request for a résumé (no résumé file was supplied).

The header keeps the four most-used destinations visible and puts every room in a searchable menu (`Ctrl/Cmd + K`). Day/evening appearance persists between visits. Motion respects the operating system’s reduced-motion setting. The house pauses its animation off-screen and the site stays navigable without WebGL.

## Visual assets and sources

The passport photo is not included in the project. The homepage puppet is an invented code-built character, not a portrait. Room photography is credited in [`ASSET-MANIFEST.md`](./ASSET-MANIFEST.md). Game imagery comes from official game and platform pages and is shown as a personal interest gallery. Google Fonts are self-hosted at build time by `next/font`; no font provider request is made by site visitors.

| Asset or package | Use | License / attribution |
| --- | --- | --- |
| DM Sans, Fraunces, IBM Plex Mono | Site typography | SIL Open Font License 1.1; see [`FONT-CREDITS.txt`](./public/licenses/FONT-CREDITS.txt) and [`OFL-1.1.txt`](./public/licenses/OFL-1.1.txt). |
| Phosphor Icons React | Interface icons with duotone room accents | MIT; see [`MIT-phosphor-icons.txt`](./public/licenses/MIT-phosphor-icons.txt). |
| `world-atlas` / Natural Earth | D3 travel map geography | Package redistribution ISC; see [`ISC-world-atlas.txt`](./public/licenses/ISC-world-atlas.txt). Data is Natural Earth 1:110m country boundaries, version 4.1.0. |
| D3 | Geographic projection and map paths | ISC/MIT package licenses; see [`MIT-d3.txt`](./public/licenses/MIT-d3.txt) and [`ISC-topojson-client.txt`](./public/licenses/ISC-topojson-client.txt). |
| Room hero artwork | Studio, music room and arcade scene | Created specifically for this project with ImageGen; 16:9 WebP derivatives are stored under `public/assets/rooms/`. |
| Game-world art | Final Fantasy XVI, Grand Theft Auto VI, The Witcher 3, and 007 First Light | Official imagery from Square Enix, Rockstar Games, CD PROJEKT RED, and PlayStation. Sources and page links are in [`ASSET-MANIFEST.md`](./ASSET-MANIFEST.md). |
| House, puppet, car and fallback art | Original code-native illustrations | Built for this project from Three.js geometry, SVG and CSS. |

The same license text files are served from `/licenses/` in the deployed app. Other dependencies retain their upstream licenses.

## Notes

- The 3D house is dynamically imported, uses a bounded device pixel ratio, and has a linked illustration fallback on small screens or rendering failure.
- External music players are user-initiated; closing or changing a release unmounts the iframe.
- GitHub activity is linked to the real profile; no activity counts or streaks are fabricated.
- The gaming YouTube handle is shown without a direct channel URL because one was not verified.
- The included `app/icon.svg` is original vector artwork.
- Interface icons use the tree-shakeable `@phosphor-icons/react` package; imports use its SSR-safe icon modules.
- Large room and game visuals are optimized WebP files; room art is lazy-loaded outside the first arcade scene.
