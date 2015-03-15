SlotRoller = function(x, y) {
	this.itemSelected = Math.floor(Math.random() * 8);
	this.rollTimer = 0;
	var slotwheel = EF.System.Assets.getImage("slotwheel.png");

	this.wheellist = [
		new EF.Sprite(slotwheel, 128, 128),
		new EF.Sprite(slotwheel, 128, 128),
		new EF.Sprite(slotwheel, 128, 128),
		new EF.Sprite(slotwheel, 128, 128)
	];
	this.position = {x: x, y: y};
	for(var i = 0; i < this.wheellist.length; i++) {
		var symbolPos = {x: this.position.x, y: this.position.y + (i * 128)};
		this.wheellist[i].setPosition(EF.System.Viewport.worldToPixel(symbolPos));
		this.wheellist[i].setFrame(i + (this.itemSelected - 2));
	}
};
SlotRoller.prototype.draw = function() {

	var pixelPosition = EF.System.Viewport.worldToPixel(this.position);
	var spriteSize = EF.System.Viewport.worldToPixel({x: 128, y: 128});
	EF.System.Draw.setFillColor("#669966");
	//EF.System.Draw.setStrokeColor("#FF0000");
	EF.System.Draw.rect(pixelPosition.x, pixelPosition.y + spriteSize.y, spriteSize.x, spriteSize.y * 3);

	for(var i = 0; i < this.wheellist.length; i++) {
		this.wheellist[i].draw();
	}
};

SlotRoller.prototype.update = function(delta) {
	if(this.rollTimer > 6) {
		this.itemSelected++;
		this.rollTimer = 0;
	}
	this.rollTimer++;
		
	for(var i = 0; i < this.wheellist.length; i++) {
		var newSpriteSize = EF.System.Viewport.worldToPixel({x: this.wheellist[i].pixelSize.width, y: this.wheellist[i].pixelSize.height});

		this.wheellist[i].setSize({width:newSpriteSize.x, height: newSpriteSize.y});
		var symbolPos = {x: this.position.x, y: this.position.y + (i * 128)};
		this.wheellist[i].setPosition(EF.System.Viewport.worldToPixel(symbolPos));
		this.wheellist[i].setFrame(i + (this.itemSelected - 2));
	}
};
