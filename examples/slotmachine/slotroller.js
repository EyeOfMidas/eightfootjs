SlotRoller = function(x, y) {
	this.sprite = new EF.Sprite("slotwheel.png", 128, 128);
	this.position = {x: x, y: y};
	this.sprite.setPosition(EF.worldToPixel(this.position));
};
SlotRoller.prototype.draw = function(graphics) {
	graphics.beginPath();
	var pixelPosition = EF.worldToPixel(this.position);
	graphics.rect(pixelPosition.x, pixelPosition.y, 128, 128);
	graphics.lineWidth = "1";
	graphics.fillStyle = "#669966";
	graphics.fill();

	this.sprite.draw(graphics);
};

SlotRoller.prototype.update = function(delta) {
	this.sprite.currentFrame++;
	this.sprite.setPosition(EF.worldToPixel(this.position));
};
