/* =====================================================================
   EDIT YOUR DETAILS HERE. This is the only file you need to change.
   Replace the text in quotes. Keep the quote marks and the commas.
   ===================================================================== */
const SITE = {
  studio: "[Studio name]",          // your studio name, shown on every page
  name:   "[your name]",            // your name, shown on the About page
  city:   "[your city]",            // shown in the sidebar
  email:  "[your email goes here]", // shown on the Contact page

  // Social links. Put the full web address in url. Delete any line you don't use.
  socials: [
    { name: "LinkedIn",     icon: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com/in/yourhandle" },
    { name: "Instagram",    icon: "fa-brands fa-instagram",   url: "https://www.instagram.com/yourhandle" },
    { name: "X (Twitter)",  icon: "fa-brands fa-x-twitter",   url: "https://x.com/yourhandle" },
    { name: "Behance",      icon: "fa-brands fa-behance",     url: "https://www.behance.net/yourhandle" },
    { name: "Dribbble",     icon: "fa-brands fa-dribbble",    url: "https://dribbble.com/yourhandle" },
    { name: "Vimeo",        icon: "fa-brands fa-vimeo-v",     url: "https://vimeo.com/yourhandle" },
    { name: "YouTube",      icon: "fa-brands fa-youtube",     url: "https://www.youtube.com/@yourhandle" }
  ]
};
/* ===================================================================== */

// 1. Fill in your details everywhere they appear
(function fillDetails() {
  const swaps = {
    "[Studio name]": SITE.studio,
    "[STUDIO NAME]": SITE.studio.toUpperCase(),
    "[your name]": SITE.name,
    "[your city]": SITE.city,
    "[your email goes here]": SITE.email
  };
  const replaceIn = text => Object.keys(swaps).reduce((t, k) => t.split(k).join(swaps[k]), text);

  document.title = replaceIn(document.title);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n => { n.nodeValue = replaceIn(n.nodeValue); });

  // Make the email link work
  document.querySelectorAll("a").forEach(a => {
    if (a.textContent.trim() === SITE.email) a.href = "mailto:" + SITE.email;
  });
})();

// 2. Build the social links from the list above (sidebar and footer)
(function buildSocials() {
  const items = SITE.socials.filter(s => s.url);
  const html = items.map(s =>
    `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}"><i class="${s.icon}"></i></a>`
  ).join("") + `<a href="contact.html" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>`;
  document.querySelectorAll(".social, .social-row").forEach(el => { el.innerHTML = html; });
})();

// 3. Header shrinks on scroll
const nav = document.querySelector(".topnav");
window.addEventListener("scroll", () => nav && nav.classList.toggle("scrolled", window.scrollY > 60));

// 4. Mobile menu
const drawer = document.querySelector(".drawer");
const menuBtn = document.querySelector(".nav-btn");
if (drawer && menuBtn) {
  menuBtn.addEventListener("click", () => drawer.classList.add("open"));
  drawer.querySelector(".x").addEventListener("click", () => drawer.classList.remove("open"));
  drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => drawer.classList.remove("open")));
}

// 5. Fade sections in as you scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
