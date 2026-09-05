/* ========================================
   RED DRAGON STREETWEAR
   CONTINUOUS 3D HERO SHIRT
======================================== */

const heroShirt = document.querySelector(".hero-shirt-3d");
const heroProduct = document.querySelector(".hero-product");

if (heroShirt && heroProduct) {

    /* ========================================
       MOUSE MOVEMENT
    ======================================== */

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    /* ========================================
       CONTINUOUS ROTATION
    ======================================== */

    let autoRotation = 0;

    /*
     * Rotation speed.
     * Higher number = faster rotation.
     */
    const rotationSpeed = 0.03;


    /* ========================================
       MOUSE
    ======================================== */

    document.addEventListener("mousemove", (event) => {

        mouseX =
            (event.clientX / window.innerWidth) - 0.5;

        mouseY =
            (event.clientY / window.innerHeight) - 0.5;

    });


    /* ========================================
       TOUCH
    ======================================== */

    document.addEventListener("touchmove", (event) => {

        if (!event.touches.length) return;

        const touch = event.touches[0];

        mouseX =
            (touch.clientX / window.innerWidth) - 0.5;

        mouseY =
            (touch.clientY / window.innerHeight) - 0.5;

    }, { passive: true });


    /* ========================================
       PRELOAD SHIRT IMAGES
    ======================================== */

    const frontImage = new Image();
    frontImage.src = "assets/product-1-front.png";

    const backImage = new Image();
    backImage.src = "assets/product-1-back.png";


    /* ========================================
       MAIN ANIMATION
    ======================================== */

    function animateProduct(time) {

        /* ------------------------------------
           SMOOTH MOUSE MOVEMENT
        ------------------------------------ */

        currentX +=
            (mouseX - currentX) * 0.08;

        currentY +=
            (mouseY - currentY) * 0.08;


        /* ------------------------------------
           FLOATING EFFECT
        ------------------------------------ */

        const floating =
            Math.sin(time * 0.0015) * 12;


        /* ------------------------------------
           MOUSE ROTATION
        ------------------------------------ */

        const mouseRotateY =
            currentX * 18;

        const mouseRotateX =
            currentY * -12;


        /* ------------------------------------
           CONTINUOUS 360° ROTATION
        ------------------------------------ */

        autoRotation += rotationSpeed;


        /*
         * Keep the angle between 0 and 360.
         */

        if (autoRotation >= 360) {

            autoRotation -= 360;

        }


        /* ------------------------------------
           APPLY ALL TRANSFORMS
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


        /* ------------------------------------
           LOOP
        ------------------------------------ */

        requestAnimationFrame(animateProduct);

    }


    /* ========================================
       START
    ======================================== */

    requestAnimationFrame(animateProduct);

}
