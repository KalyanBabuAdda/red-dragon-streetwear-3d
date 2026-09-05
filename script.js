/* ========================================
   RED DRAGON STREETWEAR
   3D HERO SHIRT
   Floating + Mouse Movement + Auto Flip
======================================== */

const heroShirt = document.querySelector(".hero-shirt-3d");
const heroProduct = document.querySelector(".hero-product");

if (heroShirt && heroProduct) {

    /* ========================================
       MOVEMENT
    ======================================== */

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    /* ========================================
       AUTO ROTATION
    ======================================== */

    let autoRotation = 0;

    let flipStart = 0;
    let flipping = false;

    const flipDuration = 1200;
    const flipEvery = 5000;


    /* ========================================
       MOUSE
    ======================================== */

    document.addEventListener("mousemove", (event) => {

        mouseX =
            (event.clientX / window.innerWidth - 0.5);

        mouseY =
            (event.clientY / window.innerHeight - 0.5);

    });


    /* ========================================
       TOUCH
    ======================================== */

    document.addEventListener("touchmove", (event) => {

        if (!event.touches.length) return;

        const touch = event.touches[0];

        mouseX =
            (touch.clientX / window.innerWidth - 0.5);

        mouseY =
            (touch.clientY / window.innerHeight - 0.5);

    }, { passive: true });


    /* ========================================
       EASING
    ======================================== */

    function easeInOut(t) {

        return t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2;

    }


    /* ========================================
       START FLIP
    ======================================== */

    function startFlip() {

        if (flipping) return;

        flipping = true;

        flipStart = performance.now();

    }


    /* ========================================
       AUTO FLIP
    ======================================== */

    setInterval(() => {

        startFlip();

    }, flipEvery);


    /* ========================================
       ANIMATION
    ======================================== */

    function animate(time) {

        /* ------------------------------------
           SMOOTH MOUSE MOVEMENT
        ------------------------------------ */

        currentX +=
            (mouseX - currentX) * 0.08;

        currentY +=
            (mouseY - currentY) * 0.08;


        /* ------------------------------------
           FLOATING
        ------------------------------------ */

        const floating =
            Math.sin(time * 0.0015) * 12;


        /* ------------------------------------
           MOUSE ROTATION
        ------------------------------------ */

        const mouseRotateY =
            currentX * 20;

        const mouseRotateX =
            currentY * -12;


        /* ------------------------------------
           AUTO FLIP
        ------------------------------------ */

        if (flipping) {

            const elapsed =
                time - flipStart;

            let progress =
                Math.min(elapsed / flipDuration, 1);

            progress =
                easeInOut(progress);

            autoRotation =
                180 * progress;

            if (elapsed >= flipDuration) {

                autoRotation = 180;

                flipping = false;

                /*
                 * After reaching the back,
                 * wait for the next interval,
                 * then rotate another 180 degrees.
                 */

                setTimeout(() => {

                    flipStart = performance.now();
                    flipping = true;

                }, 3000);

            }

        }


        /* ------------------------------------
           RETURN FLIP
        ------------------------------------ */

        if (!flipping && autoRotation >= 180) {

            /*
             * When the next flip starts,
             * rotate from 180 to 360.
             */

            if (performance.now() - flipStart > 3000) {

                let elapsed =
                    performance.now() - flipStart;

                let progress =
                    Math.min(elapsed / flipDuration, 1);

                progress =
                    easeInOut(progress);

                autoRotation =
                    180 + (180 * progress);

                if (progress >= 1) {

                    autoRotation = 360;

                    flipping = false;

                }

            }

        }


        /* ------------------------------------
           NORMALIZE ROTATION
        ------------------------------------ */

        if (autoRotation >= 360) {

            autoRotation = 0;

        }


        /* ------------------------------------
           APPLY TRANSFORM
        ------------------------------------ */

        heroShirt.style.transform = `
            translateY(${floating}px)
            rotateX(${mouseRotateX}deg)
            rotateY(${mouseRotateY + autoRotation}deg)
            scale(1.02)
        `;


        /* ------------------------------------
           DYNAMIC GLOW
        ------------------------------------ */

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


        requestAnimationFrame(animate);

    }


    requestAnimationFrame(animate);

}
