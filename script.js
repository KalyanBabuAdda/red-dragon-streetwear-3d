/* ========================================
   RED DRAGON STREETWEAR
   Interactive Hero Product
======================================== */

const shirt = document.querySelector(".hero-shirt");
const heroProduct = document.querySelector(".hero-product");

if (shirt && heroProduct) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    let touchX = 0;
    let touchY = 0;

    /* ========================================
       FRONT / BACK IMAGES
    ======================================== */

    const heroFront = "assets/product-1-front.png";
    const heroBack = "assets/product-1-back.png";

    let showingFront = true;
    let flipAngle = 0;
    let flipping = false;


    /* ========================================
       PRELOAD BACK IMAGE
    ======================================== */

    const backImage = new Image();
    backImage.src = heroBack;


    /* ========================================
       MOUSE MOVEMENT
    ======================================== */

    document.addEventListener("mousemove", (event) => {

        mouseX =
            (event.clientX / window.innerWidth - 0.5);

        mouseY =
            (event.clientY / window.innerHeight - 0.5);

    });


    /* ========================================
       TOUCH MOVEMENT
    ======================================== */

    document.addEventListener("touchmove", (event) => {

        if (!event.touches.length) return;

        const touch = event.touches[0];

        touchX =
            (touch.clientX / window.innerWidth - 0.5);

        touchY =
            (touch.clientY / window.innerHeight - 0.5);

    }, { passive: true });


    /* ========================================
       FRONT / BACK FLIP
    ======================================== */

    function flipShirt() {

        if (flipping) return;

        flipping = true;

        const startTime = performance.now();
        const duration = 1000;

        const startAngle = 0;
        const endAngle = 180;

        function flipAnimation(currentTime) {

            const elapsed = currentTime - startTime;

            let progress =
                Math.min(elapsed / duration, 1);

            /* Smooth easing */

            progress =
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;


            flipAngle =
                startAngle +
                (endAngle - startAngle) * progress;


            /*
             * Change image when shirt reaches
             * the side position.
             */

            if (progress >= 0.5 && showingFront) {

                showingFront = false;

                shirt.src = heroBack;

            }


            if (progress >= 0.5 && !showingFront && elapsed < 520) {

                /* Prevent repeated switching */

            }


            /* ========================================
               NORMAL HERO MOVEMENT
            ======================================== */

            let targetX = mouseX;
            let targetY = mouseY;

            if (window.innerWidth <= 800) {

                targetX = touchX;
                targetY = touchY;

            }


            currentX +=
                (targetX - currentX) * 0.08;

            currentY +=
                (targetY - currentY) * 0.08;


            const floating =
                Math.sin(performance.now() * 0.0015) * 12;


            const mouseRotateY =
                currentX * 18;

            const rotateX =
                currentY * -12;


            /*
             * Combine normal movement
             * with front/back flip.
             */

            shirt.style.transform = `
                translateY(${floating}px)
                rotateX(${rotateX}deg)
                rotateY(${mouseRotateY + flipAngle}deg)
                scale(1.02)
            `;


            if (progress < 1) {

                requestAnimationFrame(flipAnimation);

            } else {

                /*
                 * Reset rotation and prepare
                 * for the next cycle.
                 */

                flipAngle = 0;

                shirt.style.transform = `
                    translateY(${floating}px)
                    rotateX(${rotateX}deg)
                    rotateY(${mouseRotateY}deg)
                    scale(1.02)
                `;

                flipping = false;

            }

        }


        requestAnimationFrame(flipAnimation);
    }


    /* ========================================
       RETURN TO FRONT
       AND REPEAT
    ======================================== */

    setInterval(() => {

        if (flipping) return;

        /*
         * Start another flip.
         * If currently showing the back,
         * switch to front at the halfway point.
         */

        const startTime = performance.now();
        const duration = 1000;

        const startingImage = showingFront;

        flipping = true;

        function returnFlip(currentTime) {

            const elapsed =
                currentTime - startTime;

            let progress =
                Math.min(elapsed / duration, 1);

            progress =
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;


            flipAngle =
                startingImage
                    ? 180 * progress
                    : 180 - (180 * progress);


            /*
             * Change back to front
             * at the halfway point.
             */

            if (!startingImage &&
                progress >= 0.5 &&
                !showingFront) {

                showingFront = true;

                shirt.src = heroFront;

            }


            let targetX = mouseX;
            let targetY = mouseY;

            if (window.innerWidth <= 800) {

                targetX = touchX;
                targetY = touchY;

            }


            currentX +=
                (targetX - currentX) * 0.08;

            currentY +=
                (targetY - currentY) * 0.08;


            const floating =
                Math.sin(performance.now() * 0.0015) * 12;


            const mouseRotateY =
                currentX * 18;

            const rotateX =
                currentY * -12;


            shirt.style.transform = `
                translateY(${floating}px)
                rotateX(${rotateX}deg)
                rotateY(${mouseRotateY + flipAngle}deg)
                scale(1.02)
            `;


            if (progress < 1) {

                requestAnimationFrame(returnFlip);

            } else {

                flipAngle = 0;

                shirt.style.transform = `
                    translateY(${floating}px)
                    rotateX(${rotateX}deg)
                    rotateY(${mouseRotateY}deg)
                    scale(1.02)
                `;

                flipping = false;

            }

        }


        requestAnimationFrame(returnFlip);

    }, 5000);


    /* ========================================
       MAIN FLOATING ANIMATION
    ======================================== */

    function animateProduct(time) {

        /*
         * Don't interfere with the flip animation.
         */

        if (!flipping) {

            let targetX = mouseX;
            let targetY = mouseY;

            if (window.innerWidth <= 800) {

                targetX = touchX;
                targetY = touchY;

            }


            currentX +=
                (targetX - currentX) * 0.08;

            currentY +=
                (targetY - currentY) * 0.08;


            const floating =
                Math.sin(time * 0.0015) * 12;


            const rotateY =
                currentX * 18;

            const rotateX =
                currentY * -12;


            shirt.style.transform = `
                translateY(${floating}px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.02)
            `;

        }


        /* ========================================
           DYNAMIC GLOW
        ======================================== */

        const glowX =
            50 + currentX * 30;

        const glowY =
            50 + currentY * 30;


        heroProduct.style.setProperty(
            "--glow-x",
            `${glowX}%`
        );

        heroProduct.style.setProperty(
            "--glow-y",
            `${glowY}%`
        );


        requestAnimationFrame(animateProduct);

    }


    requestAnimationFrame(animateProduct);

}
