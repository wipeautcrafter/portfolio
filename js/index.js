import createScene from "./background.js";

window.addEventListener("DOMContentLoaded", () => {

    // scroll reveal
    let fadeEl = [...document.querySelectorAll(".f")];
    let lastReveal = 0;

    const updateReveal = () => {
        fadeEl = fadeEl.filter(el => {
            if (el.getBoundingClientRect().top < document.body.scrollTop + window.innerHeight) {
                const delay = Math.max(0, lastReveal + 300 - Date.now());
                lastReveal = Date.now() + delay;

                setTimeout(() => {
                    el.classList.add("show");
                }, delay);

                return false;
            }

            return true;
        });
    };
    window.addEventListener("scroll", updateReveal);
    updateReveal();

    // skip to content button
    const skipEl = document.querySelector(".skip-btn");
    skipEl.addEventListener("click", () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    });
});

createScene();
