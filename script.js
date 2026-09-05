/* ========================================
   RED DRAGON STREETWEAR
   3D HERO SHIRT
   AUTO ROTATION + MANUAL DRAG
======================================== */

const heroShirt = document.querySelector(".hero-shirt-3d");
const heroProduct = document.querySelector(".hero-product");

if (heroShirt && heroProduct) {

    /* ========================================
       ROTATION
    ======================================== */

    let rotation = 0;

    // Automatic rotation speed
    const autoRotationSpeed = 0.35;

    // Manual dragging
    let isDragging = false;
    let lastPointerX = 0;
    let manualVelocity = 0;

    // Resume automatic rotation after releasing
    let resumeTimer = null;


    /* ========================================
       MOUSE / TOUCH POSITION
    ======================================== */

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    /* ========================================
       POINTER DOWN
    ======================================== */

    heroShirt.addEventListener("pointerdown", function (event) {

        isDragging = true;

        lastPointerX = event.clientX;

        manualVelocity = 0;

        // Stop automatic rotation immediately
        clearTimeout(resumeTimer);

        // Capture pointer so dragging doesn't break
        heroShirt.setPointerCapture(event.pointerId);

        // Prevent text/image selection
        event.preventDefault();

    });


    /* ========================================
       POINTER MOVE
    ======================================== */

    heroShirt.addEventListener("pointermove", function (event) {

        if (!isDragging) return;

        const currentPointerX = event.clientX;

        const difference =
            currentPointerX - lastPointerX;

        /*
         * Drag sensitivity.
         *
         * Drag right  = shirt rotates right
         * Drag left   = shirt rotates left
         */

        const dragAmount =
            difference * 0.6;

        rotation += dragAmount;

        manualVelocity = dragAmount;

        lastPointerX = currentPointerX;

    });


    /* ========================================
       POINTER UP
    ======================================== */

    function stopDragging(event) {

        if (!isDragging) return;

        isDragging = false;

        try {

            heroShirt.releasePointerCapture(
                event.pointerId
            );

        } catch (error) {
            // Pointer may already be released
        }


        /*
         * Keep a little momentum after release.
         * This makes the rotation feel more natural.
         */

        if (Math.abs(manualVelocity) > 0.1) {

            rotation += manualVelocity * 3;

        }


        /*
         * Resume automatic rotation
         * after 2 seconds.
         */

        clearTimeout(resumeTimer);

        resumeTimer = setTimeout(function () {

            manualVelocity = 0;

        }, 2000);

    }


    heroShirt.addEventListener(
        "pointerup",
        stopDragging
    );

    heroShirt.addEventListener(
        "pointercancel",
        stopDragging
    );


    /* ========================================
       MOUSE MOVEMENT
       SMALL TILT EFFECT
    ======================================== */

    document.addEventListener("mousemove", function (event) {

        /*
         * Don't use mouse tilt while dragging.
         * This keeps manual rotation precise.
         */

        if (isDragging) return;

        mouseX =
            (event.clientX / window.innerWidth) - 0.5;

        mouseY =
            (event.clientY / window.innerHeight) - 0.5;

    });


    /* ========================================
       TOUCH POSITION
    ======================================== */

    document.addEventListener("touchmove", function (event) {

        if (!event.touches.length) return;

        const touch = event.touches[0];

        mouseX =
            (touch.clientX / window.innerWidth) - 0.5;

        mouseY =
            (touch.clientY / window.innerHeight) - 0.5;

    }, { passive: true });


    /* ========================================
       MAIN ANIMATION
    ======================================== */

    function animate(time) {

        /* ------------------------------------
           AUTOMATIC ROTATION
        ------------------------------------ */

        if (!isDragging) {

            rotation += autoRotationSpeed;

        }


        /* ------------------------------------
           KEEP ANGLE UNDER CONTROL
        ------------------------------------ */

        if (rotation > 360) {
            rotation -= 360;
        }

        if (rotation < -360) {
            rotation += 360;
        }


        /* ------------------------------------
           SMOOTH MOUSE TILT
        ------------------------------------ */

        currentX +=
            (mouseX - currentX) * 0.05;

        currentY +=
            (mouseY - currentY) * 0.05;


        /* ------------------------------------
           FLOATING EFFECT
        ------------------------------------ */

        const floating =
            Math.sin(time * 0.0015) * 10;


        /* ------------------------------------
           SMALL MOUSE TILT
        ------------------------------------ */

        const tiltX =
            currentY * -8;

        const tiltY =
            currentX * 10;


        /* ------------------------------------
           APPLY 3D TRANSFORM
        ------------------------------------ */

        heroShirt.style.transform = `
            translateY(${floating}px)
            rotateX(${tiltX}deg)
            rotateY(${rotation + tiltY}deg)
            scale(1.02)
        `;


        /* ------------------------------------
           DYNAMIC GLOW
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
