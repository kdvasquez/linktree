// ===== Config: edit this block only. Empty strings mean "not set yet". =====
const PROFILE = {
  name: "Karla Vasquez",
  headline: "Software Engineer | AI, Cloud & User-Centered Technology",
  bio: "Building thoughtful technology at the intersection of software, AI, and education. Always learning, creating, and exploring what’s possible.",
  learning: "Currently learning: AI, cloud & user-centered tech",
  imagePath: "profile.jpg",   // e.g. "profile.jpg"
  email: "kdvasque@gmail.com",       // shows a copy-email button when set
  linkedin: "https://www.linkedin.com/in/kdvasquez/",
  github: "https://github.com/kdvasquez",
};

const MAIN_LINKS = [
  { icon: "linkedin", title: "LinkedIn", desc: "Let’s connect professionally.", url: PROFILE.linkedin },
  { icon: "portfolio", title: "Portfolio", desc: "Explore my projects and things I’ve built.", url: "https://kdvasquez.github.io/" },
  { icon: "resume", title: "Résumé", desc: "My experience, skills, and technical background.", url: "" },
  { icon: "github", title: "GitHub", desc: "Explore my code and projects.", url: PROFILE.github },
];

const PROJECTS = [
  { icon: "spark", title: "AI & personalized learning", desc: "Research at the intersection of AI and education.", url: "https://kdvasquez.github.io/portfolio-images/abstract.png" },
  { icon: "spark", title: "WanderPost", desc: "An iOS postcard application.", url: "https://kdvasquez.github.io/projects/wanderpost/" },
  { icon: "spark", title: "PlatiaPay", desc: "Professional frontend engineering experience.", url: "https://kdvasquez.github.io/projects/merchant/" },
  { icon: "spark", title: "Technical writing", desc: "Blog posts about AI, cloud, and engineering.", url: "https://kdvasquez.github.io/blog/" },
];

// ===== Icons (inline SVG, one consistent 24px grid) =====
const FILLED = {
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  spark: "M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z",
};
const STROKED = {
  portfolio: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14h4"/>',
  resume: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
};

const SVG_NS = "http://www.w3.org/2000/svg";
function icon(name, className = "icon") {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("class", className);
  svg.setAttribute("aria-hidden", "true");
  if (FILLED[name]) {
    svg.setAttribute("fill", "currentColor");
    svg.innerHTML = `<path d="${FILLED[name]}"/>`;
  } else {
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.8");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.innerHTML = STROKED[name];
  }
  return svg;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// ===== Link card: a real link when a URL exists, otherwise an honest placeholder =====
function linkCard({ icon: iconName, title, desc, url }) {
  const card = el(url ? "a" : "div", "link-card");
  if (url) {
    card.href = url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
  } else {
    card.classList.add("is-unset");
  }
  const badge = el("span", "link-icon");
  badge.append(icon(iconName));
  const text = el("span", "link-text");
  text.append(el("span", "link-title", title), el("span", "link-desc", desc));
  if (!url) text.append(el("span", "link-note", "URL not set yet"));
  card.append(badge, text);
  return card;
}

function renderList(container, items, startIndex) {
  items.forEach((item, i) => {
    const li = el("li", "reveal");
    li.style.setProperty("--i", startIndex + i);
    li.append(linkCard(item));
    container.append(li);
  });
}

// ===== Profile =====
function greetingForHour(hour) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function renderProfile() {
  const name = document.getElementById("name");
  name.textContent = PROFILE.name;
  document.getElementById("headline").textContent = PROFILE.headline;
  document.getElementById("bio").textContent = PROFILE.bio;
  document.getElementById("learning").textContent = PROFILE.learning;
  document.getElementById("greeting").textContent = `${greetingForHour(new Date().getHours())}, I’m`;
  document.getElementById("year").textContent = new Date().getFullYear();

  const avatar = document.getElementById("avatar");
  const monogram = PROFILE.name.split(" ").map((w) => w[0]).join("");
  avatar.textContent = monogram;
  if (PROFILE.imagePath) {
    const img = new Image();
    img.alt = `Portrait of ${PROFILE.name}`;
    img.width = img.height = 120; // reserves space so nothing shifts on load
    img.onload = () => avatar.replaceChildren(img);
    img.src = PROFILE.imagePath; // on error the monogram simply stays
  }

  const socials = document.getElementById("socials");
  [["linkedin", PROFILE.linkedin, "LinkedIn"], ["github", PROFILE.github, "GitHub"]].forEach(([name, url, label]) => {
    if (!url) return;
    const a = el("a", "icon-button");
    a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", `${label} (opens in a new tab)`);
    a.append(icon(name));
    socials.append(a);
  });

  document.getElementById("sparkle").append(icon("spark", "sparkle-accent"));
}

// ===== Copy email (secondary interaction) =====
function setupCopyEmail() {
  if (!PROFILE.email) return;
  const button = document.getElementById("copy-email");
  const status = document.getElementById("copy-status");
  const label = document.getElementById("copy-label");
  button.hidden = false;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      status.textContent = "Email copied to clipboard.";
      label.textContent = "Copied";
      setTimeout(() => (label.textContent = "Copy email"), 2000);
    } catch {
      // Clipboard can be blocked (insecure context, permissions): show the address instead.
      status.textContent = `Couldn’t copy automatically. My email is ${PROFILE.email}`;
    }
  });
}

// ===== Theme toggle =====
// The inline <head> script already set data-theme before first paint (no flash).
const root = document.documentElement;
const themeButton = document.getElementById("theme-toggle");

function applyTheme(theme) {
  root.dataset.theme = theme;
  const toDark = theme === "light";
  themeButton.setAttribute("aria-label", toDark ? "Switch to dark mode" : "Switch to light mode");
  themeButton.replaceChildren(icon(toDark ? "moon" : "sun"));
}

themeButton.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  // Screen readers can't see the swap, so announce it.
  document.getElementById("theme-status").textContent = `${next === "dark" ? "Dark" : "Light"} mode on.`;
  try { localStorage.setItem("theme", next); } catch { /* preference just won't persist */ }
});

// ===== Boot =====
renderProfile();
renderList(document.getElementById("main-links"), MAIN_LINKS, 3);
renderList(document.getElementById("project-links"), PROJECTS, 8);
setupCopyEmail();
applyTheme(root.dataset.theme || "light");
