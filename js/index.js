import createScene from "./background.js";
import scrollReveal from "./scroll.js";

window.addEventListener("DOMContentLoaded", () => {
    // skip to content button
    const skipEl = document.querySelector(".skip-btn");
    skipEl.addEventListener("click", () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    });

    scrollReveal();
});

createScene();
