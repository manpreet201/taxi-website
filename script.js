document.addEventListener("DOMContentLoaded", () => {

```
/* =========================
   HAMBURGER MENU
========================= */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }

            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
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
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================
   REVIEW CAROUSEL
========================= */

const reviews = document.querySelectorAll(".review-card");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let current = 0;

function showReview(index) {

    reviews.forEach(review => {
        review.classList.remove("active");
    });

    if (reviews[index]) {
        reviews[index].classList.add("active");
    }

}


if (reviews.length > 0) {

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {

            current =
                (current - 1 + reviews.length) % reviews.length;

            showReview(current);

        });
    }


    if (nextBtn) {
        nextBtn.addEventListener("click", () => {

            current =
                (current + 1) % reviews.length;

            showReview(current);

        });
    }


    setInterval(() => {

        current =
            (current + 1) % reviews.length;

        showReview(current);

    }, 5000);

}


/* =========================
   EMAILJS
========================= */

if (typeof emailjs !== "undefined") {

    emailjs.init("H5YQu5dohuHmQx6EE");

    const bookingForm =
        document.getElementById("booking-form");

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                const submitButton =
                    bookingForm.querySelector(".book-btn");

                const originalButtonText =
                    submitButton ?
                    submitButton.textContent :
                    "Book Taxi";

                if (submitButton) {
                    submitButton.textContent = "Sending...";
                    submitButton.disabled = true;
                }


                let hiddenTime =
                    bookingForm.querySelector(
                        'input[name="submission_time"]'
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

                    alert(
                        "Failed to send booking. Please try again."
                    );

                    console.error(
                        "EmailJS Error:",
                        error
                    );

                })
                .finally(() => {

                    if (submitButton) {
                        submitButton.textContent =
                            originalButtonText;

                        submitButton.disabled = false;
                    }

                });

            }
        );

    }

}
```

});
