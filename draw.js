(window.EF||(EF={}));
EF.Draw = function() {
	this.lineWidth = 1;
	this.fillColor = "#FFFFFF";
	this.strokeColor = null;
};

EF.Draw.prototype = {
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
	},
	setFillColor: function(color) {
		this.fillColor = color;
		if(EF.System.graphics.fillStyle != color) {
			EF.System.graphics.fillStyle = color;
		}
	},
	setStrokeColor: function(color) {
		this.strokeColor = color;
		if(EF.System.graphics.strokeStyle != color) {
			EF.System.graphics.strokeStyle = color;
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
	}
};

EF.System.Draw = new EF.Draw();

