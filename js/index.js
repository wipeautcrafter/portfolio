import createScene from "./background.js";
import scrollReveal from "./scrollReveal.js";

window.addEventListener("DOMContentLoaded", () => {
    // skip to content button
    const skipEl = document.querySelector(".skip-btn");
    skipEl.addEventListener("click", () => {
        document.body.classList.remove("scroll-snap");
        document.getElementById("about").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        document.body.classList.add("scroll-snap");
    });

    // create scene
    createScene(1000 / 60); // 60 fps
    scrollReveal(".section", 400, 100); // reveal all sections
});
