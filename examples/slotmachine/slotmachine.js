SlotMachine = function() {
	this.font = new EF.Font();
	this.font.setFamily("sans");
	this.font.setSize(20);
	this.font.setPosition(5, 20);
	
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

	this.background.setSize(EF.System.Viewport.worldSizeToPixelSize(this.background.pixelSize));
	this.button.setSize(EF.System.Viewport.worldSizeToPixelSize(this.button.pixelSize));
	this.button.setPosition(EF.System.Viewport.worldPointToPixelPoint({x:520, y:400}));

	this.font.setSize(EF.System.Viewport.worldToPixel(20));
	this.font.setPosition(EF.System.Viewport.worldPointToPixelPoint({x: 15, y: 30}));

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
	this.font.setColor("#FFFFFF");
	this.font.draw('FPS: ' + EF.System.fps);

};
