/**
 **		Based on code & theory from Paul Lewis's article:
 **		http://www.html5rocks.com/en/tutorials/speed/animations/
 **
 */


var lastScrollY = 0;
ticking = false;

function onScroll() {
	lastScrollY = window.scrollY;
	requestTick();
}

function requestTick() {
	if (!ticking) {
		requestAnimFrame(update);
		ticking = true;
	}
}


/*


-webkit-transform: translate(0px, 0px);
-ms-transform: translate(0px, 0px);
transform: translate(0px, 0px);
-webkit-transform: translate3d(0px, 0px, 0px);
transform: translate3d(0px, 0px, 0px);

*/

/**
 * Our animation callback
 */
function update() {

	var scroll = $(window).scrollTop();

	$(".parallax").each(function () {
		var para = $(this);
		var paraRate = para.data("rate");
		var paraDir = para.data("direction");

		if (paraDir === "down") {
			var paraAmount = Math.round((scroll) / paraRate);
			para
				.css("-webkit-transform", "translate(0," + paraAmount + "px")
				.css("-ms-transform", "translate(0," + paraAmount + "px")
				.css("transform", "translate(0," + paraAmount + "px")
				.css("-webkit-transform", "translate3d(0," + paraAmount + "px" + ",0)")
				.css("transform", "translate3d(0," + paraAmount + "px" + ",0)");
		}

		if (paraDir === "up") {
			var paraAmount = Math.round((scroll) / -paraRate);
			para
				.css("-webkit-transform", "translate(0," + paraAmount + "px")
				.css("-ms-transform", "translate(0," + paraAmount + "px")
				.css("transform", "translate(0," + paraAmount + "px")
				.css("-webkit-transform", "translate3d(0," + paraAmount + "px" + ",0)")
				.css("transform", "translate3d(0," + paraAmount + "px" + ",0)");
		}

		if (paraDir === "right") {
			var paraAmount = Math.round((scroll) / -paraRate);
			para
				.css("-webkit-transform", "translate(" + paraAmount + "px" + ",0)")
				.css("-ms-transform", "translate(" + paraAmount + "px" + ",0)")
				.css("transform", "translate(" + paraAmount + "px" + ",0)")
				.css("-webkit-transform", "translate3d(" + paraAmount + "px" + ",0,0)")
				.css("transform", "translate3d(" + paraAmount + "px" + ",0,0)");
		}

		if (paraDir === "left") {
			var paraAmount = Math.round((scroll) / paraRate);
			para
				.css("-webkit-transform", "translate(" + paraAmount + "px" + ",0)")
				.css("-ms-transform", "translate(" + paraAmount + "px" + ",0)")
				.css("transform", "translate(" + paraAmount + "px" + ",0)")
				.css("-webkit-transform", "translate3d(" + paraAmount + "px" + ",0,0)")
				.css("transform", "translate3d(" + paraAmount + "px" + ",0,0)");
		}


	});

	// allow further rAFs to be called
	ticking = false;
}

// only listen for scroll events
window.addEventListener('scroll', onScroll, false);

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();
