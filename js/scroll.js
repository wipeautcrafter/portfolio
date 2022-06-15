const createScroll = () => {
    let fadeEl = [...document.querySelectorAll(".f")];
    let lastReveal = 0;

    const updateReveal = () => {
        fadeEl = fadeEl.filter(el => {
            // check if element is in viewport
            if (el.getBoundingClientRect().top < document.body.scrollTop + window.innerHeight) {
                let delay = Math.max(0, lastReveal + 400 - Date.now());

                // set delay to none if element is above viewport
                if(el.getBoundingClientRect().bottom < document.body.scrollTop) {
                    delay = 0;
                }

                lastReveal = Date.now() + delay;

                setTimeout(() => {
                    // fade in element
                    el.classList.add("show");
                    setTimeout(() => {
                        el.classList.remove("f");
                        el.classList.remove("show");
                    }, 1000);
                }, delay);

                return false;
            }

            return true;
        });
    };
    window.addEventListener("scroll", updateReveal);
    updateReveal();
};

export default createScroll;
