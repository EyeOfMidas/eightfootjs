(window.EF||(EF={}));
/*
	Provides a way of translating a set world size
	to a fitted size scaled to the visible screen.
*/
EF.Viewport = function() {
	this.world = {width: 800, height: 600};
	this.screen = {x: 0, y: 0, width: 800, height: 600};
	this.scale = 1;
};

EF.Viewport.prototype = {
	setWorldSize: function(width, height) {
		this.world.width = width;
		this.world.height = height;
	},
	update: function() {
		//apply scaling from world width and height to screen width and height
		var targetRatio = this.screen.width / this.screen.height;
		var sourceRatio = this.world.width / this.world.height;
	
		if(targetRatio < sourceRatio)	{
			this.scale = this.screen.width / this.world.width;
		} else {
			this.scale = this.screen.height / this.world.height;
		}
	
		var viewportWidth = this.world.width * this.scale;
		var viewportHeight = this.world.height * this.scale;
	
		//set screen boundaries (canvas size)
		EF.System.canvas.width = viewportWidth;
		EF.System.canvas.height = viewportHeight;
	},
	setScreenBounds: function(x, y, width, height) {
		this.screen.x = x;
		this.screen.y = y;
		this.screen.width = width;
		this.screen.height = height;
	},
	worldToPixel: function(position) {
		var translatedPosition = {x:0, y:0};

		translatedPosition.x = position.x * this.scale;
		translatedPosition.y = position.y * this.scale;

		return translatedPosition;
	}
};


EF.System.Viewport = new EF.Viewport();
EF.System.resizeCanvas = function() {
	var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
	EF.System.Viewport.setScreenBounds(0, 0, screenWidth, screenHeight);
	EF.System.Viewport.update();
};

window.addEventListener("resize", EF.System.resizeCanvas);
