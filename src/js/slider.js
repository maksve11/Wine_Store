document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector(".prev-slide");
    const nextButton = document.querySelector(".next-slide");

    let currentSlideIndex = 0;

    function showSlide(index) {
        slides.forEach((slide) => {
            slide.style.display = "none";
        });

        slides[index].style.display = "block";
    }

    showSlide(currentSlideIndex);

    function nextSlide() {
        currentSlideIndex++;
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }
        showSlide(currentSlideIndex);
    }

    setInterval(nextSlide, 2000);
});