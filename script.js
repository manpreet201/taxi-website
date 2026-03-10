

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {

navLinks.classList.toggle("active");
hamburger.classList.toggle("active");

});



window.addEventListener("DOMContentLoaded", () => {

const heroContent = document.querySelector(".hero-content");

heroContent.classList.add("animate");

});


const backToTop = document.getElementById("back-to-top");

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


document.querySelectorAll("nav a").forEach(anchor => {

anchor.addEventListener("click", function(e) {

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior: "smooth"
});


if (navLinks.classList.contains("active")) {

navLinks.classList.remove("active");
hamburger.classList.remove("active");

}

});
});


const reviews = document.querySelectorAll(".review-card");

let current = 0;

const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");


function showReview(index){

reviews.forEach((review) => {
review.classList.remove("active");
});

reviews[index].classList.add("active");

}


// Previous button
prevBtn.addEventListener("click", () => {

current = (current - 1 + reviews.length) % reviews.length;

showReview(current);

});


// Next button
nextBtn.addEventListener("click", () => {

current = (current + 1) % reviews.length;

showReview(current);

});


// Auto slide every 5 seconds
setInterval(() => {

current = (current + 1) % reviews.length;

showReview(current);

}, 5000);

// Initialize EmailJS
(function() {
    emailjs.init("H5YQu5dohuHmQx6EE"); // replace with your EmailJS public key
})();

// Select the booking form
const bookingForm = document.getElementById('booking-form');

bookingForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Optional: add submission time
    const submissionTime = new Date().toLocaleString();
    let hiddenTime = document.createElement('input');
    hiddenTime.type = 'hidden';
    hiddenTime.name = 'submission_time';
    hiddenTime.value = submissionTime;
    bookingForm.appendChild(hiddenTime);

    // Send the form via EmailJS
    emailjs.sendForm('service_8xi9wcg', 'template_6tw567g', this)
        .then(function() {
            alert('Booking sent successfully!');
            bookingForm.reset();
        }, function(error) {
            alert('Failed to send booking. Please try again.');
            console.error(error);
        });
});