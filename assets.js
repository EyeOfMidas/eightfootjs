(window.EF||(EF={}));
EF.Assets = function() {
	this.images = {};
	this.loaded = [];
};

EF.Assets.prototype = {
	addImage: function(imagepath) {
		var tmpImage = new Image();
		var self = this;
		tmpImage.src = imagepath;
		tmpImage.onload = function() {
			self.loaded.push(imagepath);
		};
		this.images[imagepath] = tmpImage;
	},
	getImage: function(imagepath) {
		return this.images[imagepath];
	},
	finishLoading: function(object, callback) {
		var self = EF.System.Assets;
		if(self.loaded.length == Object.keys(self.images).length) {
			object[callback]();
		} else {
			setTimeout(function() {self.finishLoading(object, callback)}, 10);
		}
	}
};

document.addEventListener("DOMContentLoaded", function() {
	EF.System.Assets = new EF.Assets();
});


