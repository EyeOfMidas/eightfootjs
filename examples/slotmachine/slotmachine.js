SlotMachine = function() {
	
	
};
SlotMachine.prototype.init = function() {
	EF.System.Assets.addImage("slotwheel.png");

	this.wheels = [
		new SlotRoller(104, 50),
		new SlotRoller(336, 50),
		new SlotRoller(568, 50)
	];
};
SlotMachine.prototype.update = function(delta) {
	for(var i = 0; i < this.wheels.length; i++) {
		this.wheels[i].update(delta);
	}

};
SlotMachine.prototype.draw = function() {
	EF.System.graphics.clearRect(0, 0, EF.System.canvas.width, EF.System.canvas.height);
	EF.System.Draw.setFillColor("#666666");
	EF.System.Draw.rect(0,0,EF.System.canvas.width, EF.System.canvas.height);
	
	for(var i = 0; i < this.wheels.length; i++) {
		this.wheels[i].draw();
	}

	EF.System.Draw.setFillColor("#FFFFFF");
	EF.System.Draw.setFont("20px sans");
	EF.System.Draw.text('FPS: ' + EF.System.fps, 5, 20);

};
