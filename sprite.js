(window.EF||(EF={}));
EF.Sprite = function(image, width, height) {
	this.image = image;
	this.pixelSize = {width: width, height: height};
	this.currentFrame = 0;
	this.position = {x: 0, y: 0};
	this.size = {width: width, height: height};
};

EF.Sprite.prototype = {
	draw: function() {
		while(this.currentFrame < 0) {
			this.currentFrame += this.getFrameCount();
		}
		this.currentFrame = this.currentFrame % this.getFrameCount();
		EF.System.graphics.drawImage(this.image, 
			0, this.pixelSize.height * this.currentFrame, this.pixelSize.width, this.pixelSize.height,
			this.position.x, this.position.y, this.size.width, this.size.height
		);
	},

	setPosition: function(position) {
		this.position = position;
	},
	setSize: function(size) {
		this.size = size;
	},
	setFrame: function(frame) {
		this.currentFrame = frame;
	},
	getFrameCount: function() {
		return ((this.image.height / this.pixelSize.width)) || 1;
	}
};

