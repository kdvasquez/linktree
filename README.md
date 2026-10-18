# Karla Vasquez | Personal Linktree

**Live site:** [ADD YOUR GITHUB PAGES URL HERE]

A single-page, Linktree-style profile that collects my LinkedIn, portfolio, résumé, and GitHub in one place. I wanted it to feel like a page from a curated digital journal rather than a generic template, so it uses an editorial serif for headlines, a soft rose palette, and plenty of whitespace.

I built it with plain HTML, CSS, and JavaScript. I'm newer to React, and I'd rather ship something polished that I can fully explain than a half-finished React app. Everything on the page is code I can walk through line by line.

## Design concept: Rosewater Editorial

- **Light theme:** warm ivory background, white cards, plum and wine text, rose accents.
- **Dark theme:** a separate deep-plum palette with lighter plum cards and warm ivory text. I designed it on its own instead of inverting the light colors.
- **Type:** DM Serif Display for the name and headings, DM Sans for everything else.
- **Contrast:** the brand rose (`#D96C91`) is too light for text on ivory, so it's only used for decoration (borders, glows, the sparkle). Text and icons use a darker rose (`#A83A62`), and I darkened the muted gray-mauve text slightly to pass WCAG AA.

## Features

- Profile section with a photo (or monogram fallback), headline, bio, and a "currently learning" note
- Link cards built from a single config array, so adding a link is one line
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
- **Not color-only:** link cards that are missing a URL say so in text, not just with a dashed border.

## Running it locally

No build step or dependencies. Keep `index.html`, `style.css`, and `script.js` in the same folder, then open `index.html` in a browser. Fonts load from Google Fonts, so you need an internet connection to see them.

## Deploying to GitHub Pages

This is a static site, so no build is needed.

1. Push the files to the root of a public GitHub repository.
2. In the repo, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. Wait a minute or two, then visit `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

Everything uses relative paths, so it works under a repository subpath.

## Configuring your own content

Everything lives in the config block at the top of `script.js`:

- Set `linkedin` and `github` URLs (these also show small icon links in the header).
- Set the Portfolio and Résumé `url` fields in `MAIN_LINKS`.
- Set `email` to show the copy-email button.
- Set `imagePath` to a photo in the same folder (otherwise a monogram shows).
- Delete any `PROJECTS` entries you can't back up.

Cards with no URL render as a non-clickable "URL not set yet" placeholder, so nothing ever links to a fake page.

After deploying, I'd also add `og:url` and an `og:image` (a 1200x630 preview image) to the `<head>` so link previews on LinkedIn and Slack look polished. Both need the final live URL, so I left them out for now instead of using a placeholder.

## How I checked it

<!-- Fill in only what you personally ran, so the README is honest. -->

- Layouts at 320, 390, 768, and 1280px: [CONFIRM]
- Theme persistence across refresh, and first-visit system preference: [CONFIRM]
- Keyboard-only walkthrough (Tab order, skip link, focus styles): [CONFIRM]
- Lighthouse (Performance / Accessibility / Best Practices / SEO): [ADD SCORES]

## Known limitations and what I'd do next

- Link and project data is hard-coded in `script.js`. With more time I'd move it to a separate `links.json` file.
- The theme is only two states. A third "follow my system" option would be a nicer fit for people who change themes through the day.
- Fonts come from Google Fonts, so they add a network request. Self-hosting them would be faster and more private.
- The page re-renders its link cards with JavaScript, so a visitor with JS disabled sees an empty list. For a page this small I accepted that tradeoff, but pre-rendering the HTML would be more robust.
- I'd add a proper `og:image` and set up automated accessibility checks.
