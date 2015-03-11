window.requestAnimationFrame = (function(callback) { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {window.setTimeout(callback, 1000 / 60);}})();

var canvas = document.getElementById("eightfootjs");

window.loop = function(context, lastTime) {
	var currentTime = new Date().getTime();
	var delta = (currentTime - lastTime);

	EF.update(delta);
	EF.draw(context);


requestAnimationFrame(function() {
	loop(context, currentTime);
});
};

document.addEventListener("DOMContentLoaded", function() {
	EF.init();
	resizeCanvas();
	var context = canvas.getContext("2d");
	loop(context, new Date().getTime());
});



window.resizeCanvas = function() {
	var newWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var newHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	canvas.width = newWidth;
	canvas.height = newHeight;
};

window.addEventListener("resize", resizeCanvas);

