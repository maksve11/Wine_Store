document.addEventListener('DOMContentLoaded', function() {
	function onEntry(entry) {
	  	entry.forEach(change => {
	    if (change.isIntersecting) {
	     	change.target.classList.add('element-show');
	    }
	  	});
	}

	let options = {
	  	threshold: [0.5] };
	let observer = new IntersectionObserver(onEntry, options);
	let elements = document.querySelectorAll('.featured-items-container, .quote, .slider-container-about-us, .contact-info, .subscribe-container');

	for (let elm of elements) {
	  	observer.observe(elm);
	}
});