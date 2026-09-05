/* ========================================
   RED DRAGON STREETWEAR
   CONTINUOUS 3D HERO SHIRT
======================================== */

const heroShirt = document.querySelector(".hero-shirt-3d");
const heroProduct = document.querySelector(".hero-product");

if (heroShirt && heroProduct) {

    let rotation = 0;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    /* ========================================
       MOUSE MOVEMENT
    ======================================== */

    document.addEventListener("mousemove", function (event) {

        mouseX =
            (event.clientX / window.innerWidth - 0.5);

        mouseY =
            (event.clientY / window.innerHeight - 0.5);

    });


    /* ========================================
       TOUCH MOVEMENT
    ======================================== */

    document.addEventListener("touchmove", function (event) {

        if (!event.touches.length) return;

        const touch = event.touches[0];

        mouseX =
            (touch.clientX / window.innerWidth - 0.5);

        mouseY =
            (touch.clientY / window.innerHeight - 0.5);

    }, { passive: true });


    /* ========================================
       ANIMATION
    ======================================== */

    function animate(time) {

        /* ------------------------------------
           SMOOTH MOUSE MOVEMENT
        ------------------------------------ */

        currentX +=
            (mouseX - currentX) * 0.05;

        currentY +=
            (mouseY - currentY) * 0.05;


        /* ------------------------------------
           CONTINUOUS ROTATION
        ------------------------------------ */

        rotation += 0.6;

        if (rotation >= 360) {
            rotation = 0;
        }


        /* ------------------------------------
           FLOATING
        ------------------------------------ */

        const floating =
            Math.sin(time * 0.0015) * 10;


        /* ------------------------------------
           MOUSE TILT
        ------------------------------------ */

        const tiltX =
            currentY * -8;

        const tiltY =
            currentX * 10;


        /* ------------------------------------
           APPLY TRANSFORM
        ------------------------------------ */

        heroShirt.style.transform =
            `translateY(${floating}px)
             rotateX(${tiltX}deg)
             rotateY(${rotation + tiltY}deg)
             scale(1.02)`;


        /* ------------------------------------
           GLOW
        ------------------------------------ */

        heroProduct.style.setProperty(
            "--glow-x",
            `${50 + currentX * 30}%`
        );

        heroProduct.style.setProperty(
            "--glow-y",
            `${50 + currentY * 30}%`
        );


        requestAnimationFrame(animate);

    }


    /* ========================================
       START
    ======================================== */

    requestAnimationFrame(animate);

}
