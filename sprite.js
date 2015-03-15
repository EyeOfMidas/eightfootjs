(window.EF||(EF={}));
EF.Sprite = function(image, width, height) {
	this.image = image;
	this.pixelSize = {width: width, height: height};
	this.currentFrame = 0;
	this.position = {x: 0, y: 0};
	this.size = {width: width, height: height};
};

EF.Sprite.prototype.draw = function() {
	if (this.currentFrame < 0) {
		this.currentFrame = (this.image.height / this.pixelSize.width) - 1;
	} else if (this.currentFrame > (this.image.height / this.pixelSize.height) - 1) {
		this.currentFrame = 0;
	}
	EF.System.graphics.drawImage(this.image, 
		0, this.pixelSize.height * this.currentFrame, this.pixelSize.width, this.pixelSize.height,
		this.position.x, this.position.y, this.size.width, this.size.height
	);
};

EF.Sprite.prototype.setPosition = function(position) {
	this.position = position;
};

EF.Sprite.prototype.setSize = function(size) {
	this.size = size;
};

