document.addEventListener('DOMContentLoaded', function () {
	var basket = document.getElementById('basket-items');

	var addToCartButtons = document.querySelectorAll('.item-1 button');

	addToCartButtons.forEach(function(button) {
	    button.addEventListener('click', function() {
	        var productInfo = this.parentElement;

	        var cartItem = document.createElement('li');

	        var productImage = document.createElement('img');
	        productImage.src = productInfo.querySelector('img').src;

	        var productName = document.createElement('span');
	        productName.textContent = productInfo.querySelector('h2').textContent;

	        cartItem.appendChild(productImage);
	        cartItem.appendChild(productName);

	        basket.appendChild(cartItem);
	    });
	});
});