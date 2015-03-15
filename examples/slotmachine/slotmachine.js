SlotMachine = function() {
	
	
};
SlotMachine.prototype.init = function() {
	EF.System.Assets.addImage("slotwheel.png");
	EF.System.Assets.addImage("slotbackground.png");
	EF.System.Assets.addImage("slotbutton.png");

	this.wheels = [
		new SlotRoller(76, 38),
		new SlotRoller(224, 38),
		new SlotRoller(372, 38)
	];
	this.background = new EF.Sprite(EF.System.Assets.getImage("slotbackground.png"), 800, 600);
	this.background.setPosition({x:0, y:0});
	this.button = new EF.Sprite(EF.System.Assets.getImage("slotbutton.png"), 236, 149);
	this.button.setPosition({x:520, y:400});
};
SlotMachine.prototype.update = function(delta) {
	for(var i = 0; i < this.wheels.length; i++) {
		this.wheels[i].update(delta);
	}

	var newBackgroundSize = EF.System.Viewport.worldToPixel({x: this.background.pixelSize.width, y: this.background.pixelSize.height});
	this.background.setSize({width:newBackgroundSize.x, height: newBackgroundSize.y});

	var newButtonSize = EF.System.Viewport.worldToPixel({x: this.button.pixelSize.width, y: this.button.pixelSize.height});
	var newButtonPosition = EF.System.Viewport.worldToPixel({x:520, y:400});
	this.button.setSize({width:newButtonSize.x, height: newButtonSize.y});
	this.button.setPosition({x:newButtonPosition.x, y: newButtonPosition.y});
};
SlotMachine.prototype.draw = function() {
	EF.System.graphics.clearRect(0, 0, EF.System.canvas.width, EF.System.canvas.height);
	EF.System.Draw.setFillColor("#000000");
	EF.System.Draw.rect(0,0,EF.System.canvas.width, EF.System.canvas.height);
	
	for(var i = 0; i < this.wheels.length; i++) {
		this.wheels[i].draw();
	}


	this.background.draw();

	
	this.button.draw();

	EF.System.Draw.setFillColor("#FFFFFF");
	EF.System.Draw.setFont("20px sans");
	EF.System.Draw.text('FPS: ' + EF.System.fps, 5, 20);

};
