var lastScrollY = 0;
var ticking = false;

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

/**
 * Our animation callback
 */
function update() {

	var scroll = $(window).scrollTop();

	$(".parallaxDown").each(function () {
		var paraDown = $(this);
		paraDown.css("transform", "translate(0," + Math.round((scroll) / paraDown.data("rate")) + "px").css("transform", "translate3d(0," + Math.round((scroll) / paraDown.data("rate")) + "px" + ",0)");
	});

	$(".parallaxUp").each(function () {
		var paraUp = $(this);
		paraUp.css("transform", "translate3d(0," + Math.round((scroll) / -paraUp.data("rate")) + "px" + ",0)");

		//console.log(paraUp.data("rate"));
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


