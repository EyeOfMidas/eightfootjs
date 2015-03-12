(window.EF||(EF={}));
EF.Sprite = function(imagepath, width, height) {
	this.image = new Image();
	this.image.src = imagepath;
	this.pixelWidth = width;
	this.pixelHeight = height;
	this.currentFrame = 0;
	this.position = {x: 0, y: 0};
	this.size = {width: width, height: height};
};

EF.Sprite.prototype.draw = function(graphics) {
	if (this.currentFrame < 0) {
		this.currentFrame = (this.image.height / this.pixelHeight) - 1;
	} else if (this.currentFrame > (this.image.height / this.pixelHeight) - 1) {
		this.currentFrame = 0;
	}
	graphics.drawImage(this.image, 
		0, this.pixelHeight * this.currentFrame, this.pixelWidth, this.pixelHeight,
		this.position.x, this.position.y, this.size.width, this.size.height
	);
};

EF.Sprite.prototype.setPosition = function(position) {
	this.position = position;
};

EF.Sprite.prototype.setSize = function(size) {
	this.size = size;
};

