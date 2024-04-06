document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("basket-modal");
    var closeButton = document.getElementById("close-basket-modal");
    var basketLink = document.querySelector(".shopping-basket-link");
    
    var isDragging = false;
    var offsetX, offsetY;

    basketLink.addEventListener("click", function(event) {
        event.preventDefault(); 
        modal.style.display = "block"; 
    });

    closeButton.addEventListener("click", function() {
        modal.style.display = "none"; 
    });
  
    modal.addEventListener("mousedown", function(e) {
        isDragging = true;
        offsetX = e.clientX - modal.getBoundingClientRect().left;
        offsetY = e.clientY - modal.getBoundingClientRect().top;
        modal.style.transition = "none"; 
    });

    document.addEventListener("mousemove", function(e) {
        if (isDragging) {
            var x = e.clientX - offsetX;
            var y = e.clientY - offsetY;
            modal.style.left = x + "px";
            modal.style.top = y + "px";
        }
    });

    document.addEventListener("mouseup", function() {
        if (isDragging) {
            isDragging = false;
            modal.style.transition = ""; 
        }
    });
});