SlotMachine = function() {
};
SlotMachine.prototype = {
	init: function() {
		this.loaded = false;
		EF.System.Assets.addImage("slotwheel.png");
		EF.System.Assets.addImage("slotbackground.png");
		EF.System.Assets.addImage("slotbutton.png");
		EF.System.Assets.addSound("spin_continue.mp3");
		EF.System.Assets.addSound("spin_finish.mp3");
		EF.System.Assets.addSound("add_coin.mp3");
		EF.System.Assets.addSound("remove_coin.mp3");
		EF.System.Assets.addSound("roller_clunk.mp3");
		EF.System.Assets.addSound("almost.mp3");
		EF.System.Assets.finishLoading(this, "assetsLoaded");
	},
	isLoaded: function() {
		return this.loaded;
	},
	assetsLoaded: function() {
		EF.System.Assets.getSound("almost.mp3").loop = true;
		this.credits = 100;
		this.creditTarget = 100;
		this.creditTimer = 0;
		this.firstPlays = [[7,7,7],[7,7,2],[5,5,5]];

		this.scoreFont = new EF.Font("Arial", 48);

		this.currentMessage = "";
		this.messageFont = new EF.Font("Arial", 48);

		this.font = new EF.Font("sans", 20);
		this.font.setPosition(15, 30);

		this.wheels = [
			new SlotRoller(76, 38),
			new SlotRoller(224, 38),
			new SlotRoller(372, 38)
		];
		this.lastWheel = 0;
		this.buttonLockout = false;

		this.background = new EF.Sprite(EF.System.Assets.getImage("slotbackground.png"), 800, 600);
		this.background.setPosition({x:0, y:0});
		var self = this;
		this.button = new EF.UI.Button("slotbutton.png", 520, 400, function() {
			if(!self.buttonLockout) {
				self.pullLever();
				setTimeout(function() {self.wheels[self.lastWheel].seekTarget(); }, 1000);
				self.buttonLockout = true;
			}
		});
		this.loaded = true;
	},
	update: function(delta) {
		this.findTimer++;
		this.creditTimer++;
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

		if(this.unrewarded) {
			var spinResult = "";
			for(var i = 0; i < this.wheels.length; i++) {
				if(this.wheels[i].isRestingPosition()) {
					spinResult += this.wheels[i].getTargetItem();
				}
			}
			if(spinResult.length == 3) {
				EF.System.Assets.getSound("almost.mp3").pause();
				EF.System.Assets.getSound("almost.mp3").currentTime = 0;
				EF.System.Assets.getSound("spin_continue.mp3").pause();
				EF.System.Assets.getSound("spin_continue.mp3").currentTime = 0;
				EF.System.Assets.getSound("spin_finish.mp3").play();
				this.buttonLockout = false;
				if(spinResult == "777") {
					this.currentMessage = "Jackpot! +25";
					this.creditTarget += 25;
					for(var i = 0; i < this.wheels.length; i++) {
						this.wheels[i].excite();
					}
					this.unrewarded = false;
				} else if(spinResult == "666") {
					this.currentMessage = "Minor Jackpot! +10";
					this.creditTarget += 10;
					this.unrewarded = false;
				} else if(spinResult == "555") {
					this.creditTarget += 5;
					this.currentMessage = "Win! +5";
					this.unrewarded = false;
				} else if(spinResult.substring(0,2) == "77") {
					this.currentMessage = "Oooh, so close!";
					this.unrewarded = false;
					this.wheels[2].normal();
				} else {
					this.unrewarded = false;
				}
			}
			if(spinResult.length == 2 && spinResult == "77") {
				this.wheels[2].excite();
				EF.System.Assets.getSound("almost.mp3").play();
			}
		}
		
		this.background.setSize(EF.System.Viewport.worldSizeToPixelSize(this.background.pixelSize));
		
		this.button.setSize(EF.System.Viewport.worldSizeToPixelSize({width: 236, height: 149}));
		this.button.setPosition(EF.System.Viewport.worldPointToPixelPoint({x:520, y:400}));

		this.button.update(delta);

		this.font.setSize(EF.System.Viewport.worldToPixel(this.font.pixelSize));
		this.font.setPosition(EF.System.Viewport.worldPointToPixelPoint({x: 15, y: 30}));
		
		this.scoreFont.setSize(EF.System.Viewport.worldToPixel(this.scoreFont.pixelSize));
		this.scoreFont.setPosition(EF.System.Viewport.worldPointToPixelPoint({x: 550, y: 380}));

		this.messageFont.setSize(EF.System.Viewport.worldToPixel(this.messageFont.pixelSize));
		this.messageFont.setPosition(EF.System.Viewport.worldPointToPixelPoint({x: 50, y: 140}));

		if(this.credits != this.creditTarget && this.creditTimer > 10) {
			if(this.credits > this.creditTarget) {
				this.credits--;
				EF.System.Assets.getSound("remove_coin.mp3").play();
			} else if(this.credits < this.creditTarget) {
				this.credits++;
				EF.System.Assets.getSound("add_coin.mp3").currentTime = 0;
				EF.System.Assets.getSound("add_coin.mp3").play();
			}
			this.creditTimer = 0;
		}
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
		//this.font.draw('FPS: ' + EF.System.fps);
		this.scoreFont.draw("$" + this.credits + ".00");
		this.messageFont.draw(this.currentMessage);
	},
	pullLever: function() {
		this.creditTarget--;
		this.currentMessage = "";
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
			this.wheels[i].normal();
		}
		this.findTimer = 0;
		this.lastWheel = 0;
		this.unrewarded = true;
		EF.System.Assets.getSound("spin_continue.mp3").loop = true;
		EF.System.Assets.getSound("spin_continue.mp3").play();
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
		if(this.firstPlays.length > 0) {
			return this.firstPlays.pop();
		}
		var payouts = [
			{probability: 10, result: [7,7,7]},
			{probability: 10, result: [6,6,6]},
			{probability: 10, result: [5,5,5]},
			{probability: 20, result: [7,7,"*"]},
			{probability: 50, result: ["*","*","*"]}
		];
		var spinResult = Math.floor((Math.random() * 100));
		var totalOdds = 0;
		for(var i = 0; i < payouts.length; i++) {
			totalOdds += payouts[i].probability;
			if(spinResult <= totalOdds) {
				return payouts[i].result;
			}
		}
	}
}
