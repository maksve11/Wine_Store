document.addEventListener('DOMContentLoaded', function() {
    var detailsButtons = document.querySelectorAll('.details-button-1');
    var detailsButtons_1 = document.querySelectorAll('.details-button-2');
    var detailsButtons_2 = document.querySelectorAll('.go-to-cheese');
    var detailsButtons_3 = document.querySelectorAll('.go-to-wine');

    detailsButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            window.location.href = '/store';
        });
    });

    detailsButtons_1.forEach(function(button) {
        button.addEventListener('click', function() {
            window.location.href = '/store_cheese';
        });
    });

    detailsButtons_2.forEach(function(button) {
        button.addEventListener('click', function() {
            window.location.href = '/store_cheese';
        });
    });

    detailsButtons_3.forEach(function(button) {
        button.addEventListener('click', function() {
            window.location.href = '/store';
        });
    });
});