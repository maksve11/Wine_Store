document.addEventListener('DOMContentLoaded', function() {
    var dashboard = document.querySelector('.dashboard');
    var brandFilter = document.getElementById('brandFilter');
    var countryFilter = document.getElementById('countryFilter');
    var typeFilter = document.getElementById('typeFilter');
    var priceRange = document.getElementById('priceRange');
    var volumeRange = document.getElementById('volumeRange');
    var ratingFilter = document.getElementById('ratingFilter');
    var yearRange = document.getElementById('yearRange'); 

    
    function toggleFilter(filter) {
        var list = filter.querySelector('ul');
        if (list.style.display === 'none' || list.style.display === '') {
            list.style.display = 'block';
        } else {
            list.style.display = 'none';
        }
    }


    brandFilter.addEventListener('click', function () {
        toggleFilter(brandFilter);
    });

    countryFilter.addEventListener('click', function () {
        toggleFilter(countryFilter);
    });

    typeFilter.addEventListener('click', function () {
        toggleFilter(typeFilter);
    });

    yearRange.addEventListener('input', function () {
        var yearValue = document.getElementById('yearValue');
        yearValue.textContent = yearRange.value + ' - 2023'; 
    });

    yearRange.addEventListener('change', function () {
        var selectedYear = yearRange.value;
    });

    priceRange.addEventListener('input', function () {
        var priceValue = document.getElementById('priceValue');
        priceValue.textContent = '$' + priceRange.value;
    });

    volumeRange.addEventListener('input', function () {
        var volumeValue = document.getElementById('volumeValue');
        volumeValue.textContent = volumeRange.value + 'L';
    });

    function createStars() {
        var ratingStars = document.getElementById('ratingStars');
        for (var i = 1; i <= 5; i++) {
            var star = document.createElement('div');
            star.classList.add('star');
            star.dataset.rating = i;
            ratingStars.appendChild(star);
        }
    }

    createStars();

    function highlightStars(rating) {
        var stars = document.querySelectorAll('.star');
        stars.forEach(function (star) {
            var starRating = parseInt(star.dataset.rating);
            if (starRating <= rating) {
                star.classList.add('highlighted');
            } else {
                star.classList.remove('highlighted');
            }
        });
    }

    highlightStars(0); 

    ratingFilter.addEventListener('mouseover', function (event) {
        if (event.target.classList.contains('star')) {
            var rating = parseInt(event.target.dataset.rating);
            highlightStars(rating);
        }
    });

    ratingFilter.addEventListener('mouseout', function () {
        highlightStars(0);
    });
});