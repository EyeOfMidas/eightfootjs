SlotMachine = function() {
	
	
};
SlotMachine.prototype.init = function() {
	EF.Assets.addImage("slotwheel.png");

	this.wheels = [
		new SlotRoller(-0.33, -0.25),
		new SlotRoller(0, -0.25),
		new SlotRoller(0.33, -0.25)
	];
};
SlotMachine.prototype.update = function(delta) {
	for(var i = 0; i < this.wheels.length; i++) {
		this.wheels[i].update(delta);
	}

};
SlotMachine.prototype.draw = function(graphics) {
	graphics.fillStyle = "#666666";
	graphics.clearRect(0, 0, EF.System.canvas.width, EF.System.canvas.height);
	graphics.beginPath();
	graphics.rect(0, 0, EF.System.canvas.width, EF.System.canvas.height);
	graphics.fill();
	
	for(var i = 0; i < this.wheels.length; i++) {
		this.wheels[i].draw(graphics);
	}

	graphics.fillStyle = "#FFFFFF";
	graphics.font = "20px sans";
	graphics.fillText('FPS: ' + EF.System.fps, 5, 20)

};
