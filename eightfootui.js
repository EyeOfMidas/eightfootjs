(window.EF.UI||(EF.UI={}));
if(!EF.hasOwnProperty('Assets')) {
	console.error("The EightFoot UI library requires the EF.Assets library. Make sure to include assets.js on your page.");
}
if(!EF.hasOwnProperty('Sprite')) {
	console.error("The EightFoot UI library requires the EF.Sprite library. Make sure to include sprite.js on your page.");
}

EF.UI.Button = function(buttonimage, x, y, click) {
	this.position = {x: x, y: y};
	var buttonimage = EF.System.Assets.getImage("slotbutton.png");
	this.size = {width: buttonimage.width, height: buttonimage.height};
	this.buttonsprite = new EF.Sprite(buttonimage, buttonimage.width, buttonimage.height);
	this.buttonsprite.setPosition({x:x, y:y});
	this.onclick = click;
	var self = this;
	EF.System.canvas.addEventListener('mousedown', function(event) {self.hitdetect(event);}, false);
};

EF.UI.Button.prototype = {
	update: function(delta) {
		this.buttonsprite.setSize(this.size);
		this.buttonsprite.setPosition(this.position);
	},
	draw: function() {
		this.buttonsprite.draw();	
	},
	hitdetect: function(event) {
		if(event.layerX > this.position.x && event.layerX < this.position.x + this.size.width &&
			event.layerY > this.position.y && event.layerY < this.position.y + this.size.height) {
			this.onclick();	
		}
	},
	setPosition: function(position) {
		this.position = position;
	},
	setSize: function(size) {
		this.size = size;
	},
	getSpriteSize: function() {
		return this.buttonsprite.pixelSize;
	}
};
