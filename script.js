/* ========================================
   RED DRAGON STREETWEAR
   3D HERO + PRODUCT SHOWCASE
   AUTO ROTATION + MANUAL DRAG
======================================== */


/* ========================================
   HERO 3D SHOWCASE
======================================== */

const heroShirt = document.querySelector(".hero-shirt-3d");
const heroProduct = document.querySelector(".hero-product");

if (heroShirt && heroProduct) {

    /* ========================================
       ROTATION
    ======================================== */

    // Start HERO on BACK view
    let rotation = 180;

    const autoRotationSpeed = 0.35;

    let isDragging = false;
    let lastPointerX = 0;
    let manualVelocity = 0;

    // Automatic rotation resumes 2 seconds after release
    let resumeAt = 0;


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

        // Pause automatic rotation
        resumeAt = Infinity;

        heroShirt.setPointerCapture(event.pointerId);

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

        const dragAmount =
            difference * 0.6;

        rotation += dragAmount;

        manualVelocity = dragAmount;

        lastPointerX = currentPointerX;

    });


    /* ========================================
       POINTER UP
    ======================================== */

    function stopHeroDragging(event) {

        if (!isDragging) return;

        isDragging = false;

        try {

            heroShirt.releasePointerCapture(
                event.pointerId
            );

        } catch (error) {}


        // Momentum
        if (Math.abs(manualVelocity) > 0.1) {

            rotation += manualVelocity * 3;

        }


        // Resume automatic rotation after 2 seconds
        resumeAt =
            performance.now() + 2000;

        manualVelocity = 0;

    }


    heroShirt.addEventListener(
        "pointerup",
        stopHeroDragging
    );

    heroShirt.addEventListener(
        "pointercancel",
        stopHeroDragging
    );


    /* ========================================
       MOUSE TILT
    ======================================== */

    document.addEventListener("mousemove", function (event) {

        if (isDragging) return;

        mouseX =
            (event.clientX / window.innerWidth) - 0.5;

        mouseY =
            (event.clientY / window.innerHeight) - 0.5;

    });


    /* ========================================
       TOUCH TILT
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
       HERO ANIMATION
    ======================================== */

    function animateHero(time) {

        if (
            !isDragging &&
            time >= resumeAt
        ) {

            rotation += autoRotationSpeed;

        }


        if (rotation > 360) {
            rotation -= 360;
        }

        if (rotation < -360) {
            rotation += 360;
        }


        currentX +=
            (mouseX - currentX) * 0.05;

        currentY +=
            (mouseY - currentY) * 0.05;


        const floating =
            Math.sin(time * 0.0015) * 10;


        const tiltX =
            currentY * -8;

        const tiltY =
            currentX * 10;


        heroShirt.style.transform = `
            translateY(${floating}px)
            rotateX(${tiltX}deg)
            rotateY(${rotation + tiltY}deg)
            scale(1.02)
        `;


        heroProduct.style.setProperty(
            "--glow-x",
            `${50 + currentX * 30}%`
        );

        heroProduct.style.setProperty(
            "--glow-y",
            `${50 + currentY * 30}%`
        );


        requestAnimationFrame(animateHero);

    }


    requestAnimationFrame(animateHero);

}


/* ========================================
   INDIVIDUAL PRODUCT SHOWCASE
======================================== */


/*
   Product information
*/

const products = [

    {
        number: "01",
        name: "PAWAN KALYAN",
        subtitle: "POWER STAR EDITION",
        front: "assets/product-1-front.png",
        back: "assets/product-1-back.png"
    },

    {
        number: "02",
        name: "POWER STAR",
        subtitle: "EYE OF THE STAR",
        front: "assets/product-2-front.png",
        back: "assets/product-2-back.png"
    },

    {
        number: "03",
        name: "KALYAN BABU",
        subtitle: "SINCE 1971",
        front: "assets/product-3-front.png",
        back: "assets/product-3-back.png"
    }

];


/* ========================================
   CREATE PRODUCT MODAL
======================================== */

const productModal = document.createElement("div");

productModal.className =
    "product-showcase-modal";

productModal.innerHTML = `

    <div class="showcase-overlay"></div>

    <div class="showcase-window">

        <button
            class="showcase-close"
            aria-label="Close product"
        >
            ×
        </button>


        <div class="showcase-content">


            <!-- Product 3D Area -->

            <div class="showcase-product">

                <div class="showcase-glow"></div>

                <div
                    class="showcase-shirt"
                    id="showcase-shirt"
                >

                    <div class="showcase-face showcase-front">

                        <img
                            id="showcase-front-image"
                            src=""
                            alt="Product Front"
                        >

                    </div>


                    <div class="showcase-face showcase-back">

                        <img
                            id="showcase-back-image"
                            src=""
                            alt="Product Back"
                        >

                    </div>

                </div>

            </div>


            <!-- Product Information -->

            <div class="showcase-info">

                <span
                    class="showcase-number"
                    id="showcase-number"
                >
                    01
                </span>

                <h2 id="showcase-name">
                    PAWAN KALYAN
                </h2>

                <p id="showcase-subtitle">
                    POWER STAR EDITION
                </p>

                <div class="showcase-divider"></div>

                <p class="showcase-instruction">
                    DRAG TO ROTATE
                </p>

                <button
                    class="showcase-close-button"
                    type="button"
                >
                    CLOSE
                </button>

            </div>

        </div>

    </div>

`;


/* Add modal to page */

document.body.appendChild(productModal);


/* ========================================
   MODAL ELEMENTS
======================================== */

const showcaseShirt =
    document.querySelector("#showcase-shirt");

const showcaseFrontImage =
    document.querySelector("#showcase-front-image");

const showcaseBackImage =
    document.querySelector("#showcase-back-image");

const showcaseNumber =
    document.querySelector("#showcase-number");

const showcaseName =
    document.querySelector("#showcase-name");

const showcaseSubtitle =
    document.querySelector("#showcase-subtitle");

const showcaseClose =
    document.querySelector(".showcase-close");

const showcaseCloseButton =
    document.querySelector(".showcase-close-button");

const showcaseOverlay =
    document.querySelector(".showcase-overlay");


/* ========================================
   PRODUCT SHOWCASE VARIABLES
======================================== */

let showcaseRotation = 180;

let showcaseDragging = false;

let showcaseLastX = 0;

let showcaseVelocity = 0;

let showcaseResumeAt = 0;

let activeProduct = 0;


/* ========================================
   OPEN PRODUCT
======================================== */

function openProduct(index) {

    const product = products[index];

    if (!product) return;

    activeProduct = index;


    /* ------------------------------------
       Product information
    ------------------------------------ */

    showcaseNumber.textContent =
        product.number;

    showcaseName.textContent =
        product.name;

    showcaseSubtitle.textContent =
        product.subtitle;


    /* ------------------------------------
       Product images
    ------------------------------------ */

    showcaseFrontImage.src =
        product.front;

    showcaseBackImage.src =
        product.back;


    showcaseFrontImage.alt =
        product.name + " Front";

    showcaseBackImage.alt =
        product.name + " Back";


    /* ------------------------------------
       Start on BACK
    ------------------------------------ */

    showcaseRotation = 180;

    showcaseVelocity = 0;

    showcaseResumeAt =
        performance.now() + 700;


    /* ------------------------------------
       Show modal
    ------------------------------------ */

    productModal.classList.add(
        "active"
    );

    document.body.classList.add(
        "showcase-open"
    );


    /* ------------------------------------
       Reset transform immediately
    ------------------------------------ */

    showcaseShirt.style.transform =
        "rotateY(180deg)";


    /* Prevent page behind modal from moving */

    document.body.style.overflow =
        "hidden";

}


/* ========================================
   CLOSE PRODUCT
======================================== */

function closeProduct() {

    productModal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "showcase-open"
    );

    document.body.style.overflow =
        "";

    showcaseDragging = false;

}


/* ========================================
   VIEW PRODUCT BUTTONS
======================================== */

const productButtons =
    document.querySelectorAll(
        ".product-info button"
    );


productButtons.forEach(
    function (button, index) {

        button.addEventListener(
            "click",
            function () {

                openProduct(index);

            }
        );

    }
);


/* ========================================
   CLOSE BUTTONS
======================================== */

showcaseClose.addEventListener(
    "click",
    closeProduct
);

showcaseCloseButton.addEventListener(
    "click",
    closeProduct
);

showcaseOverlay.addEventListener(
    "click",
    closeProduct
);


/* ========================================
   ESC KEY
======================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            productModal.classList.contains("active")
        ) {

            closeProduct();

        }

    }
);


/* ========================================
   PRODUCT SHOWCASE POINTER DOWN
======================================== */

showcaseShirt.addEventListener(
    "pointerdown",
    function (event) {

        showcaseDragging = true;

        showcaseLastX =
            event.clientX;

        showcaseVelocity = 0;

        showcaseResumeAt =
            Infinity;

        showcaseShirt.setPointerCapture(
            event.pointerId
        );

        event.preventDefault();

    }
);


/* ========================================
   PRODUCT SHOWCASE POINTER MOVE
======================================== */

showcaseShirt.addEventListener(
    "pointermove",
    function (event) {

        if (!showcaseDragging) return;

        const currentX =
            event.clientX;

        const difference =
            currentX - showcaseLastX;

        const dragAmount =
            difference * 0.65;

        showcaseRotation +=
            dragAmount;

        showcaseVelocity =
            dragAmount;

        showcaseLastX =
            currentX;

    }
);


/* ========================================
   PRODUCT SHOWCASE POINTER UP
======================================== */

function stopShowcaseDragging(event) {

    if (!showcaseDragging) return;

    showcaseDragging = false;

    try {

        showcaseShirt.releasePointerCapture(
            event.pointerId
        );

    } catch (error) {}


    /* Momentum */

    if (
        Math.abs(showcaseVelocity) > 0.1
    ) {

        showcaseRotation +=
            showcaseVelocity * 3;

    }


    /* Resume after 2 seconds */

    showcaseResumeAt =
        performance.now() + 2000;

    showcaseVelocity = 0;

}


showcaseShirt.addEventListener(
    "pointerup",
    stopShowcaseDragging
);

showcaseShirt.addEventListener(
    "pointercancel",
    stopShowcaseDragging
);


/* ========================================
   PRODUCT SHOWCASE ANIMATION
======================================== */

function animateShowcase(time) {

    if (
        productModal.classList.contains("active")
    ) {

        /* Automatic rotation */

        if (
            !showcaseDragging &&
            time >= showcaseResumeAt
        ) {

            showcaseRotation +=
                0.30;

        }


        /* Keep rotation under control */

        if (showcaseRotation > 360) {

            showcaseRotation -= 360;

        }

        if (showcaseRotation < -360) {

            showcaseRotation += 360;

        }


        /* Apply rotation */

        showcaseShirt.style.transform = `

            rotateY(${showcaseRotation}deg)

        `;

    }


    requestAnimationFrame(
        animateShowcase
    );

}


requestAnimationFrame(
    animateShowcase
);
