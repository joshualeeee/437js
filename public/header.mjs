import { toHtmlElement } from './indexToHTML.mjs'

/**
 * Creates the full navbar as a DOM element.
 */
function createNavbar() {
    const navbar = toHtmlElement(`<nav class="navbar"></nav>`).firstElementChild;
    const nameDiv = toHtmlElement(`<div class="nav-name">Joshua Lee</div>`).firstElementChild;

    const navLinks = document.createElement("ul");
    navLinks.className = "nav-links";

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

    navbar.append(nameDiv, navLinks);
    return navbar;
}

const placeholder = document.getElementById('nav-bar-placeholder');
placeholder.replaceWith(createNavbar());