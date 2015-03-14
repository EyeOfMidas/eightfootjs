(window.EF||(EF={}));
/*
	Provides a way of translating a set world size
	to a fitted size scaled to the visible screen.
*/
EF.Viewport = function() {
	this.world = {width: 800, height: 600};
	this.screen = {x: 0, y: 0, width: 800, height: 600};
};

EF.Viewport.prototype.addImage = function(imagepath) {
	var tmpImage = new Image();
	tmpImage.src = imagepath;
	this.images[imagepath] = tmpImage;
};

EF.Viewport.prototype.setWorldSize = function(width, height) {
	this.world.width = width;
	this.world.height = height;
};

EF.Viewport.prototype.setCamera = function(x, y) {

};

EF.Viewport.prototype.update = function(screenWidth, screenHeight) {
	//apply scaling from world width and height to screen width and height
	//set screen boundaries (canvas size)
};

EF.Viewport.prototype.setScreenBounds = function(x, y, width, height) {
	this.screen.x = x;
	this.screen.y = y;
	this.screen.width = width;
	this.screen.height = height;
};

/*

EF.System.resizeCanvas = function() {
	var newWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var newHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
	EF.System.canvas.width = newWidth;
	EF.System.canvas.height = newHeight;
	EF.System.graphics = EF.System.canvas.getContext("2d");
};
*/
