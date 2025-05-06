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

    const navLinks = document.createElement("ul");
    navLinks.className = "nav-links hidden";

    const links = [
        ["Home", "./index.html"],
        ["Hobbies", "./hobbies.html"],
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

    // Dark mode toggle with local storage
    darkModeToggle.addEventListener("change", () => {
        if (darkModeToggle.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "on");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "off");
        }
    });

    // Read local storage for dark mode setting
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "on") {
        darkModeToggle.checked = true;
        document.body.classList.add("dark-mode");
    }

    // Toggle nav visibility on menu button click
    toggleButton.addEventListener("click", () => {
        console.log("Menu toggle clicked");
        navLinks.classList.toggle("hidden");
    });

    // Close nav if a body click occurs outside the navbar
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