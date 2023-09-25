document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.navbar-toggles');
    const menu = document.querySelector('.menu-navbar-collapse');
    const closeButton = document.querySelector('.close-button');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active'); 
        closeButton.style.display = 'block'; 
        menuToggle.style.display = 'none'; 
    });

    closeButton.addEventListener('click', function() {
        menu.classList.remove('active'); 
        closeButton.style.display = 'none'; 
        menuToggle.style.display = 'block';
    });
});