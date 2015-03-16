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
			if(EF.System.graphics.fillStyle != this.fillColor) {
				EF.System.graphics.fillStyle = this.fillColor;
			}
			EF.System.graphics.fill();
		}

		if(EF.System.graphics.lineWidth != this.lineWidth) {
			EF.System.graphics.lineWidth = this.lineWidth;
		}

		if(this.strokeColor) {
			if(EF.System.graphics.strokeStyle != this.strokeColor) {
				EF.System.graphics.strokeStyle = this.strokeColor;
			}
			EF.System.graphics.stroke();
		}
		EF.System.graphics.closePath();
	},
	setFillColor: function(color) {
		this.fillColor = color;
	},
	setStrokeColor: function(color) {
		this.strokeColor = color;
		
	},
	setLineWidth: function(width) {
		this.lineWidth = width;
	}
};

EF.System.Draw = new EF.Draw();

