document.addEventListener("DOMContentLoaded", () => {


/* =========================
   HAMBURGER MENU
========================= */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

function openMenu() {
    if (!hamburger || !navLinks) return;

    navLinks.classList.add("active");
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    if (!hamburger || !navLinks) return;

    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
    if (!navLinks) return;

    if (navLinks.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
}

if (hamburger && navLinks) {

    hamburger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu();
    });

    document.querySelectorAll("#nav-links a").forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });

    document.addEventListener("click", (event) => {

        if (
            !hamburger.contains(event.target) &&
            !navLinks.contains(event.target)
        ) {
            closeMenu();
        }

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            closeMenu();
        }

    });

}


/* =========================
   HERO ANIMATION
========================= */

const heroContent = document.querySelector(".hero-content");

if (heroContent) {

    setTimeout(() => {
        heroContent.classList.add("animate");
    }, 150);

}


/* =========================
   SMOOTH NAVIGATION
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    });

});


/* =========================
   BACK TO TOP
========================= */

const backToTop = document.getElementById("back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}


/* =========================
   REVIEW CAROUSEL
========================= */

const reviews = document.querySelectorAll(".review-card");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let currentReview = 0;

function showReview(index) {

    if (reviews.length === 0) return;

    reviews.forEach(review => {
        review.classList.remove("active");
    });

    reviews[index].classList.add("active");

}

if (reviews.length > 0) {

    if (prevBtn) {

        prevBtn.addEventListener("click", () => {

            currentReview =
                (currentReview - 1 + reviews.length)
                % reviews.length;

            showReview(currentReview);

        });

    }


    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            currentReview =
                (currentReview + 1)
                % reviews.length;

            showReview(currentReview);

        });

    }


    setInterval(() => {

        currentReview =
            (currentReview + 1)
            % reviews.length;

        showReview(currentReview);

    }, 5000);

}


/* =========================
   EMAILJS BOOKING FORM
========================= */

const bookingForm =
    document.getElementById("booking-form");

if (
    bookingForm &&
    typeof emailjs !== "undefined"
) {

    emailjs.init("H5YQu5dohuHmQx6EE");

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const submitButton =
                bookingForm.querySelector(".book-btn");

            const originalText =
                submitButton
                ? submitButton.textContent
                : "Book Taxi";

            if (submitButton) {

                submitButton.disabled = true;
                submitButton.textContent = "Sending...";

            }


            let hiddenTime =
                bookingForm.querySelector(
                    '[name="submission_time"]'
                );

            if (!hiddenTime) {

                hiddenTime =
                    document.createElement("input");

                hiddenTime.type = "hidden";
                hiddenTime.name = "submission_time";

                bookingForm.appendChild(hiddenTime);

            }

            hiddenTime.value =
                new Date().toLocaleString();


            emailjs.sendForm(
                "service_8xi9wcg",
                "template_6tw567g",
                bookingForm
            )
            .then(() => {

                alert(
                    "Booking sent successfully!"
                );

                bookingForm.reset();

            })
            .catch(error => {

                console.error(
                    "EmailJS Error:",
                    error
                );

                alert(
                    "Failed to send booking. Please try again."
                );

            })
            .finally(() => {

                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.textContent =
                        originalText;

                }

            });

        }
    );

}


});
