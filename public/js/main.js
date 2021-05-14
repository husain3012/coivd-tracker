// jshint esversion:8
const counters = document.querySelectorAll('.counter');
const speed = 80; // The lower the slower

counters.forEach(counter => {
	const updateCount = () => {
		const target = +counter.getAttribute('data-target');
		const count = +counter.innerText;

		// Lower inc to slow and higher to slow
		const inc = Math.ceil(target / speed);

		// console.log(inc);
		// console.log(count);

		// Check if target is reached
		if (count < target) {
			// Add inc to count and output in counter
			counter.innerText = count + inc;
			// Call function every ms
			// setTimeout(updateCount, 10);
            requestAnimationFrame(updateCount);
		} else {
			counter.innerText = target;
            $(".new").css("visibility", "visible");
            $(".new").addClass(" animate__animated animate__zoomIn");
		}
	};

	updateCount();
});


