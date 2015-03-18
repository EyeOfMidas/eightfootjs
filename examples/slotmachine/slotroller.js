SlotRoller = function(x, y) {
	this.startingPosition = {x: x, y: y};
	this.position = {x: x, y: y};
	this.init();
};
SlotRoller.prototype = {
	init: function() {
		this.currentItemSelected = Math.floor(Math.random() * 8);
		this.targetItem = this.currentItemSelected;
		this.isExcited = false;
		this.isSpinning = false;
		this.exciteDelay = 0;
		var slotwheel = EF.System.Assets.getImage("slotwheel.png");

		this.wheellist = [
			new EF.Sprite(slotwheel, 128, 128),
			new EF.Sprite(slotwheel, 128, 128),
			new EF.Sprite(slotwheel, 128, 128),
			new EF.Sprite(slotwheel, 128, 128)
		];
		
		for(var i = 0; i < this.wheellist.length; i++) {
			var symbolPos = {x: this.position.x, y: this.position.y + (i * 128)};
			this.wheellist[i].setPosition(EF.System.Viewport.worldPointToPixelPoint(symbolPos));
			this.wheellist[i].setFrame(i + (this.currentItemSelected - 2));
		}
		this.isSpinningForever = false;
	},
	draw: function() {

		var pixelPosition = EF.System.Viewport.worldPointToPixelPoint(this.position);
		var startingPixelPosition = EF.System.Viewport.worldPointToPixelPoint(this.startingPosition);
		var spriteSize = EF.System.Viewport.worldSizeToPixelSize({width: 128, height: 128});
		if(this.isExcited) {
			this.exciteDelay++;
			if(this.exciteDelay > 10) {
				if(this.exciteColor == "#996699") {
					this.exciteColor = "#BB88BB";
					this.exciteDelay = 0;
				} else {
					this.exciteColor = "#996699";
					this.exciteDelay = 0;
				}
			}
			EF.System.Draw.setFillColor(this.exciteColor);
		} else {
			EF.System.Draw.setFillColor("#669966");
		}
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
	},
	update: function(delta) {
		if(this.isSpinningForever) {
			this.position.y += 32;
			this.isSpinning = true;
		}
		if (!this.isSpinningForever && (this.targetItem != this.currentItemSelected || this.position.y != this.startingPosition.y)) {
			this.position.y += 17;
		}
		if(this.isSpinning && this.isRestingPosition()) {
			EF.System.Assets.getSound("roller_clunk.mp3").play();
			this.isSpinning = false;
			//TODO: add in overshoot bounce tween here

		}

		if(this.position.y >= this.startingPosition.y + 128) {
			this.position.y = this.startingPosition.y;
			this.currentItemSelected--;
			if(this.currentItemSelected < 0) {
				this.currentItemSelected = 7;
			}
		}
		
		for(var i = 0; i < this.wheellist.length; i++) {
			var newSpriteSize = EF.System.Viewport.worldSizeToPixelSize(this.wheellist[i].pixelSize);

			this.wheellist[i].setSize(newSpriteSize);
			var symbolPos = {x: this.position.x, y: this.position.y + (i * 128)};
			this.wheellist[i].setPosition(EF.System.Viewport.worldPointToPixelPoint(symbolPos));
			this.wheellist[i].setFrame(i + (this.currentItemSelected - 2));
		}
	},
	setTargetItem: function(targetIndex) {
		this.targetItem = targetIndex;
	},
	endlessSpin: function() {
		this.isSpinningForever = true;
	},
	seekTarget: function() {
		this.isSpinningForever = false;
	},
	isRestingPosition: function() {
		return (!this.isSpinningForever && this.targetItem == this.currentItemSelected && this.position.y == this.startingPosition.y);
	},
	getTargetItem: function() {
		return this.targetItem;
	},
	excite: function() {
		this.exciteColor = "#996699";
		this.isExcited = true;
	},
	normal: function() {
		this.isExcited = false;
	}
};
