# Karla Vasquez | Personal Linktree

**Live site:** https://kdvasquez.github.io/linktree/

A single-page, Linktree-style profile that collects my LinkedIn, portfolio, résumé, and GitHub in one place. I wanted it to feel like a page from a curated digital journal rather than a generic template, so it uses an editorial serif for headlines, a soft rose palette, and plenty of whitespace.

I built it with plain HTML, CSS, and JavaScript. I'm newer to React, and I'd rather ship something polished that I can fully explain than a half-finished React app. Everything on the page is code I can walk through line by line.

## Design concept: Rosewater Editorial

- **Light theme:** warm ivory background, white cards, plum and wine text, rose accents.
- **Dark theme:** a separate deep-plum palette with lighter plum cards and warm ivory text. I designed it on its own instead of inverting the light colors.
- **Type:** DM Serif Display for the name and headings, DM Sans for everything else.
- **Contrast:** the brand rose (`#D96C91`) is too light for text on ivory, so it's only used for decoration (borders, glows, the sparkle). Text and icons use a darker rose (`#A83A62`), and I darkened the muted gray-mauve text slightly to pass WCAG AA.

## Features

- Profile section with a photo (or "KV" monogram fallback if the image fails to load), headline, bio, and a "currently learning" note
- Link cards and a "A little more about what I build" section, both built from config arrays in `script.js`, so adding a link is one line
- Dark/light theme toggle that remembers your choice (the main JS feature, described below)
- Time-of-day greeting ("Good morning, I'm...") based on the visitor's local time
- Optional copy-email button with success and error feedback
- Skip link and screen-reader announcements (see Accessibility)
- Responsive from 320px phones up to desktop, with no horizontal scrolling
- Subtle entrance animation that is turned off for visitors who prefer reduced motion

## My JavaScript feature: persistent dark/light mode

**What it does:** a button in the top corner switches the whole page between light and dark themes. The choice is saved, so it's still there after a refresh. On a first visit, the page follows the visitor's system setting.

**Why I picked it:** it's a feature people actually use, and it let me design a second theme on purpose. It also touches several things I wanted to show I understand: state, browser storage, accessibility, and avoiding a visual flash on load.

**How it works:**

1. All colors are CSS variables on `:root`. Dark mode overrides them with `:root[data-theme="dark"]`, so no component needs its own dark styles.
2. Clicking the button flips `data-theme` on the `<html>` element and saves the choice to `localStorage`.
3. A tiny inline script in the `<head>` reads the saved value (or the system preference) before the page paints.

**With more time I'd improve:** add a third "follow my system" option, since right now a visitor who picks a theme keeps it even if their system changes later.

**The tricky parts:**

- **Flash of the wrong theme.** If the theme is applied from `script.js` at the bottom of the page, light mode shows for a split second before dark kicks in. Running a small script in the `<head>` applies the theme before first paint.
- **`localStorage` can fail.** Private browsing or blocked storage can throw an error, so every read and write is wrapped in `try/catch`. The toggle still works; it just won't persist.
- **Accessibility details.** The button's `aria-label` changes between "Switch to dark mode" and "Switch to light mode", and a hidden live region announces "Dark mode on." so screen-reader users get feedback for a change they can't see.

### Two smaller JavaScript touches

The theme toggle is my main feature. These two are small additions that support it.

**Time-of-day greeting.** A short line above my name reads "Good morning, I'm", "Good afternoon, I'm", or "Good evening, I'm" based on the visitor's local time. It's one small function that reads `new Date().getHours()`, and it runs in the visitor's browser, so it uses their time zone, not mine.

**Copy-email button.** When an email is set in the config, a button copies it to the clipboard and shows a "Copied" confirmation, announced to screen readers too. Clipboard access can be blocked (for example on an insecure page or if permission is denied), so if copying fails the page shows my email address as text instead of failing silently. The button stays hidden until an email is configured, so it never appears broken.

## Keyboard and accessibility details

I wanted keyboard and screen-reader users to feel considered, not just supported.

- **Skip link:** the first Tab stop is a "Skip to links" link that jumps past the profile.
- **Focus styles:** a thick rose outline is visible in both themes.
- **Semantics:** landmarks (`main`, `nav`, `header`, `footer`), one `h1`, a logical heading order, and descriptive labels on icon-only buttons.
- **Links and touch targets:** external links use `rel="noopener noreferrer"` and icon buttons are 44x44px.
- **Motion:** animations only use opacity and transform, and are disabled under `prefers-reduced-motion`.
- **Profile photo:** the photo has descriptive alt text, and the monogram fallback is labeled for screen readers too.
- **Not color-only:** a link card with no URL says "URL not set yet" in text, not just with a dashed border.

## How the page is responsive

I used a fluid, single-column layout instead of width breakpoints (`@media` rules). Because the content is one narrow column, the layout adapts on its own, and there's no separate "desktop" and "mobile" version to keep in sync.

- **Viewport meta tag.** `width=device-width, initial-scale=1` in `index.html` tells phones to use their real screen width. Without it, a phone would draw the page zoomed out like a tiny desktop site.
- **A narrow, centered column.** `.page` has `max-width: 36rem` (about 576px) and `margin: 0 auto`. On a phone it fills the screen minus side padding. On a laptop it stops growing and centers, so the cards never stretch across a wide monitor.
- **Cards fill the column.** `.link-list` is a CSS grid with one column and a gap, so every card takes the full available width. Nothing has a fixed pixel width.
- **Type that scales with the screen.** The name uses `clamp(2.5rem, 11vw, 3.5rem)`, which means "scale with the screen width, but never go below 40px or above 56px." That keeps it from overflowing at 320px and from looking oversized on desktop.
- **Text wraps instead of overflowing.** `min-width: 0` on `.link-text` lets long descriptions wrap inside a flex card, and the "currently learning" pill has `max-width: 100%`.
- **Relative units.** Spacing and font sizes use `rem`, so everything scales with a visitor's own font-size settings.
- **Touch-friendly sizes.** Buttons are 44px and link cards are at least 72px tall, so they're easy to tap.
- **Phone notches.** `env(safe-area-inset-*)` padding keeps content clear of the notch and home bar on newer phones.

I checked for horizontal scrolling at 320, 390, 768, and 1280px. If I added more content later (a photo gallery, say), I'd add real breakpoints at that point.

## Running it locally

No build step or dependencies. Keep `index.html`, `style.css`, `script.js`, `profile.jpg`, and `kdvasquez_resume.pdf` in the same folder, then open `index.html` in a browser. Fonts load from Google Fonts, so you need an internet connection to see them.

## Deploying to GitHub Pages

This is a static site, so no build is needed.

My portfolio already uses the root GitHub Pages address (`kdvasquez.github.io`), so this project lives in its own repository and deploys as a project site under `/linktree/`.

1. Push the files to the root of the public `linktree` repository.
2. In the repo, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. Wait a minute or two, then visit https://kdvasquez.github.io/linktree/.

Everything uses relative paths, so it works under the `/linktree/` subpath. Each push to `main` redeploys the site.

## Configuring your own content

Everything lives in the config block at the top of `script.js`:

- Set `linkedin` and `github` URLs (these also show small icon links in the header).
- Set the Portfolio and Résumé `url` fields in `MAIN_LINKS`.
- Set `email` to show the copy-email button.
- Set `imagePath` to a photo in the same folder (otherwise a monogram shows).
- Put your résumé PDF in the same folder and point the Résumé `url` at its filename.
- Edit or delete entries in `PROJECTS`; each one has its own `url`.

Cards with no URL render as a non-clickable "URL not set yet" placeholder, so nothing ever links to a fake page.

The `<head>` includes basic Open Graph tags (title, description, type) for link previews. I haven't added `og:image` or `og:url` yet. Both need a finished preview image and the final live URL, and I'd rather leave them out than point at a placeholder.


## Known limitations and what I'd do next

- Link and project data is hard-coded in `script.js`. With more time I'd move it to a separate `links.json` file.
- The theme is only two states. A third "follow my system" option would be a nicer fit for people who change themes through the day.
- Fonts come from Google Fonts, so they add a network request. Self-hosting them would be faster and more private.
- The page re-renders its link cards with JavaScript, so a visitor with JS disabled sees an empty list. For a page this small I accepted that tradeoff, but pre-rendering the HTML would be more robust.
- Learn React :)
