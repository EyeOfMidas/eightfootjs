(window.EF||(EF={}));
EF.Font = function() {
	this.family = "sans";
	this.size = 20;
	this.position = {x: 0, y: 0};
	this.color = "#FFFFFF";
};

EF.Font.prototype = {
	draw: function(text) {
		EF.System.graphics.font = (this.size | 0) + "px "+ this.family;
		EF.System.graphics.fillText(text, this.position.x, this.position.y);
	},
	setSize: function(size) {
		this.size = size;
	},
	setFamily: function(family) {
		this.family = family;
	},
	setPosition: function(x, y) {
		this.position.x = x;
		this.position.y = y;
	},
	setColor: function(color) {
		this.color = color;
		if(EF.System.graphics.fillStyle != color) {
			EF.System.graphics.fillStyle = color;
		}
	},
	getPosition: function() {
		return this.position;
	}
};

