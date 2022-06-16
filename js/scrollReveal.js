/**
 * Creates a scrolling reveal effect for all ".section" elements.
 */
const createScroll = (query, delay, offset) => {
    let sections = [...document.querySelectorAll(query)];

    const updateReveal = () => {
        sections = sections.filter(el => {
            // check if element is in viewport
            if (el.getBoundingClientRect().top + offset < window.innerHeight &&
                el.getBoundingClientRect().bottom - offset > 0) {
                [...el.querySelectorAll(".f")].forEach((el, i) => {
                    setTimeout(() => {
                        el.style.setProperty("transition", "all 1s ease-in-out");
                        el.classList.remove("f");

                        setTimeout(() => {
                            el.style.removeProperty("transition");
                        }, 1000);
                    }, i * delay);
                });

                return false;
            }

            return true;
        });
    };

    document.body.addEventListener("scroll", updateReveal);
    updateReveal(); // initial reveal
};

export default createScroll;
