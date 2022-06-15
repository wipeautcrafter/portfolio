import createScene from "./background.js";
import scrollReveal from "./scrollReveal.js";

window.addEventListener("DOMContentLoaded", () => {
    // skip to content button
    const skipEl = document.querySelector(".skip-btn");
    skipEl.addEventListener("click", () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    });

    createScene(1000 / 60); // 60 fps
    scrollReveal(".section", 400, 100); // reveal all sections
});

