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


    /* ----------------------------------------
       MOUSE MOVEMENT
    ---------------------------------------- */

    document.addEventListener("mousemove", (event) => {

        mouseX =
            (event.clientX / window.innerWidth - 0.5);

        mouseY =
            (event.clientY / window.innerHeight - 0.5);

    });


    /* ----------------------------------------
       TOUCH MOVEMENT
    ---------------------------------------- */

    document.addEventListener("touchmove", (event) => {

        if (!event.touches.length) return;

        const touch = event.touches[0];

        touchX =
            (touch.clientX / window.innerWidth - 0.5);

        touchY =
            (touch.clientY / window.innerHeight - 0.5);

    }, { passive: true });


    /* ----------------------------------------
       ANIMATION LOOP
    ---------------------------------------- */

    function animateProduct(time) {

        /* Use mouse on desktop */
        let targetX = mouseX;
        let targetY = mouseY;

        /* Use touch on mobile */
        if (window.innerWidth <= 800) {

            targetX = touchX;
            targetY = touchY;

        }


        /* Smooth movement */

        currentX +=
            (targetX - currentX) * 0.08;

        currentY +=
            (targetY - currentY) * 0.08;


        /* Floating animation */

        const floating =
            Math.sin(time * 0.0015) * 12;


        /* Rotation */

        const rotateY =
            currentX * 18;

        const rotateX =
            currentY * -12;


        /* Apply transformation */

        shirt.style.transform = `
            translateY(${floating}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
        `;


        /* Dynamic glow */

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
/* =========================================
   HERO SHIRT AUTO FRONT/BACK ROTATION
========================================= */

const heroShirt = document.getElementById("hero-shirt");

if (heroShirt) {
    const heroFront = "assets/product-1-front.png";
    const heroBack = "assets/product-1-back.png";

    let showingFront = true;

    // Preload back image
    const backImage = new Image();
    backImage.src = heroBack;

    setInterval(() => {
        heroShirt.classList.add("hero-flipping");

        setTimeout(() => {
            showingFront = !showingFront;

            heroShirt.src = showingFront
                ? heroFront
                : heroBack;

            heroShirt.classList.remove("hero-flipping");
        }, 450);

    }, 4000);
}
