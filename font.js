(window.EF||(EF={}));
EF.Font = function(family, size) {
	this.family = family;
	this.pixelSize = size;
	this.size = size;
	this.position = {x: 0, y: 0};
	this.color = "#FFFFFF";
};

EF.Font.prototype = {
	draw: function(text) {
		EF.System.graphics.font = (this.size | 0) + "px "+ this.family;
		if(EF.System.graphics.fillStyle != this.color) {
			EF.System.graphics.fillStyle = this.color;
		}
		EF.System.graphics.fillText(text, this.position.x, this.position.y);
	},
	setSize: function(size) {
		this.size = size;
	},
	setFamily: function(family) {
		this.family = family;
	},
	setPosition: function(position) {
		this.position.x = position.x;
		this.position.y = position.y;
	},
	setColor: function(color) {
		this.color = color;
	},
	getPosition: function() {
		return this.position;
	}
};

