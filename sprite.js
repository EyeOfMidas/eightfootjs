(window.EF||(EF={}));
EF.Sprite = function(imagepath, width, height) {
	this.image = new Image();
	this.image.src = imagepath;
	this.width = width;
	this.height = height;
	this.currentFrame = 0;
};

EF.Sprite.prototype.draw = function(graphics, x, y) {
	if (this.currentFrame < 0) {
		this.currentFrame = this.image.height / this.height;
	} else if (this.currentFrame > this.image.height / this.height) {
		this.currentFrame = 0;
	}
	graphics.drawImage(this.image, 0, this.height * this.currentFrame, this.width, this.height, x, y, this.width, this.height);
};

