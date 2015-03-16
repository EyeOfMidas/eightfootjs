SlotRoller = function(x, y) {
	this.currentItemSelected = Math.floor(Math.random() * 8);
	this.rollTimer = 0;
	var slotwheel = EF.System.Assets.getImage("slotwheel.png");

	this.wheellist = [
		new EF.Sprite(slotwheel, 128, 128),
		new EF.Sprite(slotwheel, 128, 128),
		new EF.Sprite(slotwheel, 128, 128),
		new EF.Sprite(slotwheel, 128, 128)
	];
	this.startingPosition = {x: x, y: y};
	this.position = {x: x, y: y};
	for(var i = 0; i < this.wheellist.length; i++) {
		var symbolPos = {x: this.position.x, y: this.position.y + (i * 128)};
		this.wheellist[i].setPosition(EF.System.Viewport.worldPointToPixelPoint(symbolPos));
		this.wheellist[i].setFrame(i + (this.currentItemSelected - 2));
	}
};
SlotRoller.prototype.draw = function() {

	var pixelPosition = EF.System.Viewport.worldPointToPixelPoint(this.position);
	var startingPixelPosition = EF.System.Viewport.worldPointToPixelPoint(this.startingPosition);
	var spriteSize = EF.System.Viewport.worldSizeToPixelSize({width: 128, height: 128});
	EF.System.Draw.setFillColor("#669966");
	//EF.System.Draw.setStrokeColor("#FF0000");
	EF.System.Draw.rect(startingPixelPosition.x, startingPixelPosition.y + spriteSize.height, spriteSize.width, spriteSize.height * 3);
	if(this.position.y - 2 < this.startingPosition.y + 2) {
		EF.System.Draw.setFillColor("#FFFF00");
	} else {
		EF.System.Draw.setFillColor("#99FF99");
	}
	EF.System.Draw.rect(startingPixelPosition.x, startingPixelPosition.y + (spriteSize.height * 2), spriteSize.width, spriteSize.height);

	for(var i = 0; i < this.wheellist.length; i++) {
		this.wheellist[i].draw();
	}
};

SlotRoller.prototype.update = function(delta) {
	/*if(this.rollTimer > 6) {
		this.itemSelected++;
		this.rollTimer = 0;
	}
	this.rollTimer++;*/
	this.position.y += 16;

	if(this.position.y >= this.startingPosition.y + 128) {
		this.position.y = this.startingPosition.y;
		this.currentItemSelected--;
	}
		
	for(var i = 0; i < this.wheellist.length; i++) {
		var newSpriteSize = EF.System.Viewport.worldSizeToPixelSize(this.wheellist[i].pixelSize);

		this.wheellist[i].setSize(newSpriteSize);
		var symbolPos = {x: this.position.x, y: this.position.y + (i * 128)};
		this.wheellist[i].setPosition(EF.System.Viewport.worldPointToPixelPoint(symbolPos));
		this.wheellist[i].setFrame(i + (this.currentItemSelected - 2));
	}
};
