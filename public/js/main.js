const toggleBtn = document.querySelector(".toggle");
const navbar_collapse = document.querySelector(".navbar-collapse");
const nav__link = document.querySelectorAll(".nav-link");

toggleBtn.addEventListener("click", function (e) {
    navbar_collapse.classList.toggle("hide");
    toggleBtn.classList.toggle("change");
});

const currentLocation = location.href;

for (let i = 0; i < nav__link.length; i++) {
    if (nav__link[i].href === currentLocation) {
        nav__link[i].classList.add("active");
    } else {
        nav__link[i].classList.remove("active");
    }
}
