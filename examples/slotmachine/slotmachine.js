SlotMachine = function() {
	
	
};
SlotMachine.prototype.init = function() {
	EF.System.Assets.addImage("slotwheel.png");
	EF.System.Assets.addImage("slotbackground.png");
	EF.System.Assets.addImage("slotbutton.png");

	this.wheels = [
		new SlotRoller(78, 43),
		new SlotRoller(231, 43),
		new SlotRoller(382, 43)
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
