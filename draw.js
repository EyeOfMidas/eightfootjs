(window.EF||(EF={}));
EF.Draw = function() {
	this.lineWidth = 1;
	this.fillColor = null;
	this.strokeColor = null;
	this.font = null;

	this.reset();
};

EF.Draw.prototype = {
	reset: function() {
		this.setLineWidth(0);
		this.setFillColor(null);
		this.setStrokeColor(null);
		this.setFont(null);
	},
	rect: function(x, y, width, height) {
		EF.System.graphics.beginPath();
		EF.System.graphics.rect(x, y, width, height);

		if(this.fillColor) {
			EF.System.graphics.fill();
		}

		if(this.strokeColor) {
			EF.System.graphics.stroke();
		}
		EF.System.graphics.closePath();
		this.reset();
	},

	text: function(text, x, y) {
		EF.System.graphics.fillText(text, x, y);
	},
	setFillColor: function(color) {
		if(this.fillColor != color) {
			this.fillColor = color;
			EF.System.graphics.fillStyle = this.fillColor;
		}
	},
	setStrokeColor: function(color) {
		if(this.strokeColor != color) {
			this.strokeColor = color;
			EF.System.graphics.strokeStyle = this.strokeColor;
			if(this.lineWidth <= 0) {
				this.setLineWidth(1);
			}
		}
	},
	setLineWidth: function(width) {
		if(this.lineWidth != width) {
			this.lineWidth = width;
			EF.System.graphics.lineWidth = this.lineWidth;
		}
	},
	setFont: function(font) {
		if(this.font != font) {
			this.font = font;
			EF.System.graphics.font = this.font;
		}
	}
};

EF.System.Draw = new EF.Draw();

