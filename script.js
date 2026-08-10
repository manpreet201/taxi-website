document.addEventListener("DOMContentLoaded", () => {


/* =========================
   HAMBURGER MENU
========================== */

const hamburger =
    document.getElementById("hamburger");

const navLinks =
    document.getElementById("nav-links");


function openMenu(){

    if(!hamburger || !navLinks) return;

    navLinks.classList.add("active");

    hamburger.classList.add("active");

    hamburger.setAttribute(
        "aria-expanded",
        "true"
    );

    hamburger.setAttribute(
        "aria-label",
        "Close navigation menu"
    );
}


function closeMenu(){

    if(!hamburger || !navLinks) return;

    navLinks.classList.remove("active");

    hamburger.classList.remove("active");

    hamburger.setAttribute(
        "aria-expanded",
        "false"
    );

    hamburger.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}


function toggleMenu(){

    if(!navLinks) return;

    if(
        navLinks.classList.contains("active")
    ){
        closeMenu();
    }
    else{
        openMenu();
    }
}


if(hamburger && navLinks){

    /* Toggle menu */

    hamburger.addEventListener(
        "click",
        function(event){

            event.preventDefault();

            event.stopPropagation();

            toggleMenu();

        }
    );


    /* Close after clicking navigation link */

    document
        .querySelectorAll("#nav-links a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMenu();

                }
            );

        });


    /* Close when clicking outside */

    document.addEventListener(
        "click",
        function(event){

            if(
                !hamburger.contains(event.target) &&
                !navLinks.contains(event.target)
            ){

                closeMenu();

            }

        }
    );


    /* Close with Escape key */

    document.addEventListener(
        "keydown",
        function(event){

            if(event.key === "Escape"){

                closeMenu();

            }

        }
    );


    /* Reset menu when switching to desktop */

    window.addEventListener(
        "resize",
        function(){

            if(window.innerWidth > 768){

                closeMenu();

            }

        }
    );

}


/* =========================
   HERO ANIMATION
========================== */

const heroContent =
    document.querySelector(".hero-content");


if(heroContent){

    setTimeout(
        () => {

            heroContent.classList.add(
                "animate"
            );

        },
        150
    );

}


/* =========================
   SMOOTH NAVIGATION
========================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function(event){

                const targetId =
                    this.getAttribute("href");

                const target =
                    document.querySelector(
                        targetId
                    );

                if(!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            }
        );

    });


/* =========================
   BACK TO TOP
========================== */

const backToTop =
    document.getElementById(
        "back-to-top"
    );


if(backToTop){

    window.addEventListener(
        "scroll",
        function(){

            if(window.scrollY > 400){

                backToTop.style.display =
                    "block";

            }
            else{

                backToTop.style.display =
                    "none";

            }

        }
    );


    backToTop.addEventListener(
        "click",
        function(){

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        }
    );

}


/* =========================
   REVIEW CAROUSEL
========================== */

const reviews =
    document.querySelectorAll(
        ".review-card"
    );

const prevBtn =
    document.querySelector(
        ".carousel-btn.prev"
    );

const nextBtn =
    document.querySelector(
        ".carousel-btn.next"
    );

let currentReview = 0;


function showReview(index){

    if(reviews.length === 0) return;

    reviews.forEach(
        review => {

            review.classList.remove(
                "active"
            );

        }
    );


    reviews[index].classList.add(
        "active"
    );

}


if(reviews.length > 0){

    if(prevBtn){

        prevBtn.addEventListener(
            "click",
            function(){

                currentReview =
                    (
                        currentReview -
                        1 +
                        reviews.length
                    ) %
                    reviews.length;

                showReview(
                    currentReview
                );

            }
        );

    }


    if(nextBtn){

        nextBtn.addEventListener(
            "click",
            function(){

                currentReview =
                    (
                        currentReview +
                        1
                    ) %
                    reviews.length;

                showReview(
                    currentReview
                );

            }
        );

    }


    setInterval(
        function(){

            currentReview =
                (
                    currentReview +
                    1
                ) %
                reviews.length;

            showReview(
                currentReview
            );

        },
        5000
    );

}


/* =========================
   EMAILJS
========================== */

const bookingForm =
    document.getElementById(
        "booking-form"
    );


if(
    bookingForm &&
    typeof emailjs !== "undefined"
){

    emailjs.init(
        "H5YQu5dohuHmQx6EE"
    );


    bookingForm.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const submitButton =
                bookingForm.querySelector(
                    ".book-btn"
                );


            const originalText =
                submitButton
                    ? submitButton.textContent
                    : "Book Taxi";


            if(submitButton){

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";

            }


            let hiddenTime =
                bookingForm.querySelector(
                    '[name="submission_time"]'
                );


            if(!hiddenTime){

                hiddenTime =
                    document.createElement(
                        "input"
                    );

                hiddenTime.type =
                    "hidden";

                hiddenTime.name =
                    "submission_time";

                bookingForm.appendChild(
                    hiddenTime
                );

            }


            hiddenTime.value =
                new Date().toLocaleString();


            emailjs
                .sendForm(
                    "service_8xi9wcg",
                    "template_6tw567g",
                    bookingForm
                )

                .then(
                    function(){

                        alert(
                            "Booking sent successfully!"
                        );

                        bookingForm.reset();

                    }
                )

                .catch(
                    function(error){

                        console.error(
                            "EmailJS Error:",
                            error
                        );

                        alert(
                            "Failed to send booking. Please try again."
                        );

                    }
                )

                .finally(
                    function(){

                        if(submitButton){

                            submitButton.disabled =
                                false;

                            submitButton.textContent =
                                originalText;

                        }

                    }
                );

        }
    );

}


});
