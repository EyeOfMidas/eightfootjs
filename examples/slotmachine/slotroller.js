SlotRoller = function(x, y) {
	this.sprite = new EF.Sprite(EF.System.Assets.getImage("slotwheel.png"), 128, 128);
	this.position = {x: x, y: y};
	this.sprite.setPosition(EF.System.Viewport.worldToPixel(this.position));
};
SlotRoller.prototype.draw = function() {
	EF.System.graphics.beginPath();
	var pixelPosition = EF.System.Viewport.worldToPixel(this.position);
	var spriteSize = EF.System.Viewport.worldToPixel({x: 128, y: 128});
	EF.System.graphics.rect(pixelPosition.x, pixelPosition.y, spriteSize.x, spriteSize.y);
	EF.System.graphics.lineWidth = "1";
	EF.System.graphics.fillStyle = "#669966";
	EF.System.graphics.fill();

	this.sprite.draw();
};

SlotRoller.prototype.update = function(delta) {
	this.sprite.currentFrame++;
	var newSpriteSize = EF.System.Viewport.worldToPixel({x: this.sprite.pixelSize.width, y: this.sprite.pixelSize.height});

	this.sprite.setSize({width:newSpriteSize.x, height: newSpriteSize.y});
	this.sprite.setPosition(EF.System.Viewport.worldToPixel(this.position));
};
