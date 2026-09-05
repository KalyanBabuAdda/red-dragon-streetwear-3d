/* ========================================
   RED DRAGON STREETWEAR
   Interactive 3D Hero Product
   Front / Back Auto Rotation
======================================== */

const shirt = document.querySelector(".hero-shirt-3d");
const heroProduct = document.querySelector(".hero-product");

if (shirt && heroProduct) {

    /* ========================================
       MOVEMENT VARIABLES
    ======================================== */

    let mouseX = 0;
    let mouseY = 0;

    let touchX = 0;
    let touchY = 0;

    let currentX = 0;
    let currentY = 0;

    /* ========================================
       AUTO ROTATION
    ======================================== */

    let autoRotation = 0;

    let isAutoFlipping = false;
    let flipStartRotation = 0;
    let flipTargetRotation = 180;
    let flipStartTime = 0;

    const flipDuration = 1200;
    const flipInterval = 5000;

    /* ========================================
       PRELOAD IMAGES
    ======================================== */

    const frontImage = new Image();
    frontImage.src = "assets/product-1-front.png";

    const backImage = new Image();
    backImage.src = "assets/product-1-back.png";


    /* ========================================
       MOUSE MOVEMENT
    ======================================== */

    document.addEventListener("mousemove", (event) => {

        mouseX =
            (event.clientX / window.innerWidth) - 0.5;

        mouseY =
            (event.clientY / window.innerHeight) - 0.5;

    });


    /* ========================================
       TOUCH MOVEMENT
    ======================================== */

    document.addEventListener("touchmove", (event) => {

        if (!event.touches.length) return;

        const touch = event.touches[0];

        touchX =
            (touch.clientX / window.innerWidth) - 0.5;

        touchY =
            (touch.clientY / window.innerHeight) - 0.5;

    }, { passive: true });


    /* ========================================
       EASING FUNCTION
    ======================================== */

    function easeInOutCubic(t) {

        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;

    }


    /* ========================================
       START AUTO FLIP
    ======================================== */

    function startAutoFlip() {

        if (isAutoFlipping) return;

        isAutoFlipping = true;

        flipStartRotation = autoRotation;

        flipTargetRotation =
            autoRotation + 180;

        flipStartTime = performance.now();

    }


    /* ========================================
       UPDATE AUTO FLIP
    ======================================== */

    function updateAutoFlip(time) {

        if (!isAutoFlipping) return;

        const elapsed =
            time - flipStartTime;

        let progress =
            Math.min(elapsed / flipDuration, 1);

        progress =
            easeInOutCubic(progress);

        autoRotation =
            flipStartRotation +
            (flipTargetRotation - flipStartRotation) *
            progress;

        if (elapsed >= flipDuration) {

            autoRotation =
                flipTargetRotation;

            isAutoFlipping = false;

        }

    }


    /* ========================================
       MAIN HERO ANIMATION
    ======================================== */

    function animateProduct(time) {

        /* ----------------------------------------
           GET MOUSE / TOUCH TARGET
        ---------------------------------------- */

        let targetX = mouseX;
        let targetY = mouseY;

        if (window.innerWidth <= 800) {

            targetX = touchX;
            targetY = touchY;

        }


        /* ----------------------------------------
           SMOOTH MOVEMENT
        ---------------------------------------- */

        currentX +=
            (targetX - currentX) * 0.08;

        currentY +=
            (targetY - currentY) * 0.08;


        /* ----------------------------------------
           FLOATING EFFECT
        ---------------------------------------- */

        const floating =
            Math.sin(time * 0.0015) * 12;


        /* ----------------------------------------
           MOUSE / TOUCH ROTATION
        ---------------------------------------- */

        const mouseRotateY =
            currentX * 18;

        const rotateX =
            currentY * -12;


        /* ----------------------------------------
           UPDATE AUTO ROTATION
        ---------------------------------------- */

        updateAutoFlip(time);


        /* ----------------------------------------
           COMBINE ALL TRANSFORMS
        ---------------------------------------- */

        shirt.style.transform = `
            translateY(${floating}px)
            rotateX(${rotateX}deg)
            rotateY(${mouseRotateY + autoRotation}deg)
            scale(1.02)
        `;


        /* ----------------------------------------
           DYNAMIC GLOW
        ---------------------------------------- */

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


        /* ----------------------------------------
           CONTINUE ANIMATION
        ---------------------------------------- */

        requestAnimationFrame(animateProduct);

    }


    /* ========================================
       START ANIMATION
    ======================================== */

    requestAnimationFrame(animateProduct);


    /* ========================================
       AUTO FLIP EVERY 5 SECONDS
    ======================================== */

    setInterval(() => {

        startAutoFlip();

    }, flipInterval);


    /* ========================================
       OPTIONAL CLICK TO FLIP
    ======================================== */

    shirt.addEventListener("click", () => {

        if (!isAutoFlipping) {

            startAutoFlip();

        }

    });


    /* ========================================
       REDUCED MOTION SUPPORT
    ======================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        shirt.style.transform =
            "translateY(0) rotateX(0deg) rotateY(0deg) scale(1.02)";

    }

}
