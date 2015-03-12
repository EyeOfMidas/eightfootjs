(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz', 'o', 'ms'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = Date.now();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

EF.System = {};
EF.System.fps = 0;

EF.System.canvas = document.getElementById("eightfootjs");
EF.System.graphics = EF.System.canvas.getContext("2d");

EF.System.loop = function(lastTime) {
	var currentTime = Date.now();
	var delta = (currentTime - lastTime);
	requestAnimationFrame(function() {
		EF.System.loop(currentTime);
	}, EF.System.canvas);

	this.mainobj.update(delta);
	this.mainobj.draw(EF.System.graphics);
	this.fps = Math.floor(1000 / delta);
};

EF.System.attach = function(canvasid, mainobj) {
	this.mainobj = mainobj;
	document.addEventListener("DOMContentLoaded", function() {
		mainobj.init();
		EF.System.resizeCanvas();
		EF.System.canvas = document.getElementById(canvasid);
		EF.System.graphics = EF.System.canvas.getContext("2d");
		requestAnimationFrame(function() {
			EF.System.loop(Date.now());
		}, EF.System.canvas);
	});
};

EF.System.resizeCanvas = function() {
	var newWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var newHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
	EF.System.canvas.width = newWidth;
	EF.System.canvas.height = newHeight;
	EF.System.graphics = EF.System.canvas.getContext("2d");
};

window.addEventListener("resize", EF.System.resizeCanvas);

