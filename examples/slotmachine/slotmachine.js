SlotMachine = function() {
};
SlotMachine.prototype = {
	init: function() {
		this.loaded = false;
		EF.System.Assets.addImage("slotwheel.png");
		EF.System.Assets.addImage("slotbackground.png");
		EF.System.Assets.addImage("slotbutton.png");
		EF.System.Assets.finishLoading(this, "assetsLoaded");
	},
	isLoaded: function() {
		return this.loaded;
	},
	assetsLoaded: function() {
		this.font = new EF.Font("sans", 20);
		this.font.setPosition(5, 20);

		this.wheels = [
			new SlotRoller(76, 38),
			new SlotRoller(224, 38),
			new SlotRoller(372, 38)
		];
		this.lastWheel = 0;

		this.background = new EF.Sprite(EF.System.Assets.getImage("slotbackground.png"), 800, 600);
		this.background.setPosition({x:0, y:0});
		var self = this;
		this.button = new EF.UI.Button("slotbutton.png", 520, 400, function() {
			self.pullLever();
			setTimeout(function() {self.wheels[self.lastWheel].seekTarget(); }, 1000);
		});
		this.loaded = true;
	},
	update: function(delta) {
		this.findTimer++;
		for(var i = 0; i < this.wheels.length; i++) {
			this.wheels[i].update(delta);
		}
		if(this.lastWheel >= this.wheels.length) {
			this.lastWheel = 0;
		}
		if(this.findTimer > 160 && this.wheels[this.lastWheel].isRestingPosition()) {
			if(this.lastWheel + 1 < this.wheels.length) {
				this.wheels[++this.lastWheel].seekTarget();
				this.findTimer = 0;
			} else {
				this.findTimer = 0;
			}
		}

		var spinResult = "";
		for(var i = 0; i < this.wheels.length; i++) {
			if(this.wheels[i].isRestingPosition()) {
				spinResult += this.wheels[i].getTargetItem();
			}
		}
		
		if(spinResult == "777") {
			console.log("Jackpot!");
		}
		
		this.background.setSize(EF.System.Viewport.worldSizeToPixelSize(this.background.pixelSize));
		
		this.button.setSize(EF.System.Viewport.worldSizeToPixelSize({width: 236, height: 149}));
		this.button.setPosition(EF.System.Viewport.worldPointToPixelPoint({x:520, y:400}));

		this.button.update(delta);

		this.font.setSize(EF.System.Viewport.worldToPixel(this.font.pixelSize));
		this.font.setPosition(EF.System.Viewport.worldPointToPixelPoint({x: 15, y: 30}));
	},
	draw: function() {
		EF.System.graphics.clearRect(0, 0, EF.System.canvas.width, EF.System.canvas.height);
		EF.System.Draw.setFillColor("#000000");
		EF.System.Draw.rect(0,0,EF.System.canvas.width, EF.System.canvas.height);
	
		for(var i = 0; i < this.wheels.length; i++) {
			this.wheels[i].draw();
		}

		this.background.draw();
		this.button.draw();
		this.font.draw('FPS: ' + EF.System.fps);
	},
	pullLever: function() {
		var result = this.rollNewResult();
		for(var i = 0; i < result.length; i++)	{
			if(result[i] == "*") {
				result[i] = Math.floor(Math.random() * 8);
				if(i > 0) {
					result[i] = this.preventDuplicates(i, result, result[i]);
				}
			}
		}
		for(var i = 0; i < this.wheels.length; i++) {
			this.wheels[i].setTargetItem(result[i]);
			this.wheels[i].endlessSpin();
		}
		this.findTimer = 0;
		this.lastWheel = 0;
	},
	preventDuplicates: function(depth, data, number) {
		if(depth < 0) {
			return number;
		}
		if(data[depth - 1] == number) {
			return this.preventDuplicates(depth, data, Math.floor(Math.random() * 8));
		} else {
			return this.preventDuplicates(depth - 1, data, number);
		}
	},
	rollNewResult: function() {
		var payouts = [
			{probability: 10, result: [7,7,7]},
			{probability: 99, result: ["*","*","*"]}
		];
		var spinResult = 99 - Math.floor((Math.random() * 100));
		for(var i = 0; i < payouts.length; i++) {
			if(payouts[i].probability >= spinResult) {
				return payouts[i].result;
			}
		}
	}
}
