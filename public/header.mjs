import { toHtmlElement } from './indexToHTML.mjs'

/**
 * Creates the full navbar as a DOM element.
 */
function createNavbar() {
    const navbar = toHtmlElement(`
        <nav class="navbar">
            <div class="nav-upper">
                <div class="nav-name">Joshua Lee</div>
                <div class="nav-controls">
                    <label class="dark-mode-toggle">
                        <input type="checkbox" autocomplete="off" />
                        Dark mode
                    </label>
                    <button class="menu-toggle" aria-label="Toggle navigation">☰</button>
                </div>
            </div>
        </nav>
    `).firstElementChild;

    console.log("screen width is", window.innerWidth);

    const navLinks = document.createElement("ul");
    navLinks.className = "nav-links hidden";

    const links = [
        ["Home", "/index.html"],
        ["Hobbies", "/hobbies.html"],
    ];

    for (const [text, href] of links) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = href;
        a.textContent = text;
        li.appendChild(a);
        navLinks.appendChild(li);
    }

    navLinks.className = "nav-links hidden";
    navbar.appendChild(navLinks);

    const toggleButton = navbar.querySelector(".menu-toggle");
    const darkModeToggle = navbar.querySelector(".dark-mode-toggle input");

    // Dark mode toggle
    darkModeToggle.addEventListener("change", () => {
        console.log("Dark mode toggle clicked");
        document.body.classList.toggle("dark-mode");
        console.log("Dark mode class added:", document.body.classList.contains("dark-mode"));
    });

    // 1. Toggle nav visibility on menu button click
    toggleButton.addEventListener("click", () => {
        console.log("Menu toggle clicked");
        navLinks.classList.toggle("hidden");
    });

    // 2. Close nav if a body click occurs outside the navbar
    document.body.addEventListener("click", (event) => {
        const clickedInsideNavbar = navbar.contains(event.target);
        if (!clickedInsideNavbar) {
            console.log("Menu toggle clicked");
            navLinks.classList.add("hidden");
        }
    });

    return navbar;
}

const placeholder = document.getElementById('nav-bar-placeholder');
placeholder.replaceWith(createNavbar());