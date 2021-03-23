// SWIPER

var swiper = new Swiper('.swiper-container', {
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});


// NAVIGATION

window.addEventListener("scroll", function () {
    var e = window.pageYOffset,
        s = (document.getElementById("nav"), document.getElementById("header"));
    console.log(e), e >= 100 ? s.classList.add("nav-js") : s.classList.remove("nav-js");
});


// BURGER MENU
var monBurger = document.getElementById("burger"),
    mesLinks = document.querySelector(".links"),
    maCroix = document.querySelector("#closed");
function ajoutClasse() {
    mesLinks.classList.add("active"), maCroix.classList.add("closed");
}
function retireClasse() {
    maCroix.classList.remove("closed"), mesLinks.classList.remove("active");
}
monBurger.addEventListener("click", ajoutClasse), maCroix.addEventListener("click", retireClasse);
