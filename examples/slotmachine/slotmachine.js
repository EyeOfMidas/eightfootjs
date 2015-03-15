SlotMachine = function() {
	
	
};
SlotMachine.prototype.init = function() {
	EF.System.Assets.addImage("slotwheel.png");

	this.wheels = [
		new SlotRoller(200, 300),
		new SlotRoller(400, 300),
		new SlotRoller(600, 300)
	];
};
SlotMachine.prototype.update = function(delta) {
	for(var i = 0; i < this.wheels.length; i++) {
		this.wheels[i].update(delta);
	}

};
SlotMachine.prototype.draw = function() {
	EF.System.graphics.fillStyle = "#666666";
	EF.System.graphics.clearRect(0, 0, EF.System.canvas.width, EF.System.canvas.height);
	EF.System.graphics.beginPath();
	EF.System.graphics.rect(0, 0, EF.System.canvas.width, EF.System.canvas.height);
	EF.System.graphics.fill();
	
	for(var i = 0; i < this.wheels.length; i++) {
		this.wheels[i].draw();
	}

	EF.System.graphics.fillStyle = "#FFFFFF";
	EF.System.graphics.font = "20px sans";
	EF.System.graphics.fillText('FPS: ' + EF.System.fps, 5, 20)

};
