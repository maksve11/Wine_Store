document.addEventListener('DOMContentLoaded', function () {
    var basket = document.getElementById('basket-items');
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    var emptyBasket = document.querySelector('.empty-basket');
    var addToCartButtons = document.querySelectorAll('.item-1 button, .item-2 button');

    updateCartView();

    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var productInfo = this.parentElement;
            var productName = productInfo.querySelector('h2').textContent;

            if (cartItems[productName]) {
                cartItems[productName].count++;
                updateCartItem(productName);
            } else {
                cartItems[productName] = { count: 1 };
                addCartItem(productName, productInfo);
            }

            saveCartToLocalStorage();

            if (emptyBasket) {
                restoreEmptyBasket();
            }
        });
    });

    basket.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            var cartItem = e.target.parentElement;
            var productName = cartItem.querySelector('span').textContent;

            if (cartItems[productName]) {
                cartItems[productName].count--;

                if (cartItems[productName].count <= 0) {
                    delete cartItems[productName];
                    cartItem.remove();
                } else {
                    updateCartItem(productName);
                }

                saveCartToLocalStorage();

                if (isEmpty(cartItems)) {
                    restoreEmptyBasket();
                }
            }
        }
    });

    function addCartItem(productName, productInfo) {
	    var cartItem = document.createElement('li');

	    var productImage = document.createElement('img');
	    var imageSrc = productInfo.querySelector('img').src;
	    productImage.src = imageSrc;

	    var itemInfoContainer = document.createElement('div');

	    var productNameElement = document.createElement('span');
	    productNameElement.textContent = productName;

	    var productCountElement = document.createElement('span');
	    productCountElement.className = 'item-count';
	    productCountElement.textContent = 'x1';

	    var removeButton = document.createElement('button');
	    removeButton.className = 'remove-item';

	    var productData = {
	        name: productName,
	        imageSrc: imageSrc,
	        count: 1
	    };

	    cartItems[productName] = productData;

	    cartItem.appendChild(productImage);
	    cartItem.appendChild(productNameElement);
	    cartItem.appendChild(productCountElement);
	    cartItem.appendChild(removeButton);

	    basket.appendChild(cartItem);
	}

    function updateCartItem(productName) {
        var cartItemsElements = basket.querySelectorAll('li');
        cartItemsElements.forEach(function(cartItemElement) {
            var nameElement = cartItemElement.querySelector('span');
            if (nameElement.textContent === productName) {
                var countElement = cartItemElement.querySelector('.item-count');
                countElement.textContent = 'x' + cartItems[productName].count;
            }
        });
    }

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

	function restoreEmptyBasket() {
	    var basket = document.getElementById('basket-items');
	    var existingEmptyBasket = basket.querySelector('.empty-basket');

	    if (isEmpty(cartItems) && !existingEmptyBasket) {
	        var newEmptyBasket = document.createElement('div');
	        newEmptyBasket.className = 'empty-basket';
	        newEmptyBasket.innerHTML = '<p>Здесь пока ничего нет</p>';
	        basket.appendChild(newEmptyBasket);
	    }
	    else if (existingEmptyBasket) {
	    	existingEmptyBasket.remove();
	    }
	}

	function saveCartToLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function updateCartView() {
	    basket.innerHTML = '';

	    var totalItemCount = 0;

	    for (var productName in cartItems) {
	        if (cartItems.hasOwnProperty(productName)) {
	            var productData = cartItems[productName];

	            var cartItem = document.createElement('li');

	            var productImage = document.createElement('img');
	            productImage.src = productData.imageSrc;

	            var productNameElement = document.createElement('span');
	            productNameElement.textContent = productName;

	            var productCountElement = document.createElement('span');
	            productCountElement.className = 'item-count';
	            productCountElement.textContent = 'x' + productData.count;

	            var removeButton = document.createElement('button');
	            removeButton.className = 'remove-item';

	            removeButton.addEventListener('click', function (productName) {
	                return function () {
	                    handleRemoveButtonClick(productName);
	                };
	            }(productName));

	            cartItem.appendChild(productImage);
	            cartItem.appendChild(productNameElement);
	            cartItem.appendChild(productCountElement);
	            cartItem.appendChild(removeButton);

	            basket.appendChild(cartItem);

	            totalItemCount += productData.count;
	        }
	    }

	    if (totalItemCount === 0) {
	        restoreEmptyBasket();
	    }
	}
});