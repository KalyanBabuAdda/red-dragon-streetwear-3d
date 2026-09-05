/* ========================================
   RED DRAGON STREETWEAR
   JavaScript
======================================== */


const shirt = document.querySelector(".hero-shirt");


/* ----------------------------------------
   Mouse movement effect
---------------------------------------- */

document.addEventListener("mousemove", (event) => {

    if (!shirt) return;

    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);


    const rotateY = x * 15;

    const rotateX = y * -10;


    shirt.style.transform = `
        translateY(-10px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
    `;

});


/* ----------------------------------------
   Reset product position
---------------------------------------- */

document.addEventListener("mouseleave", () => {

    if (!shirt) return;

    shirt.style.transform = "";

});
