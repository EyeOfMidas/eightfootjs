(window.EF||(EF={}));
EF.Assets = function() {
	this.images = {};
	this.sounds = {};
	this.imagesloaded = [];
};

EF.Assets.prototype = {
	addImage: function(imagepath) {
		var tmpImage = new Image();
		var self = this;
		tmpImage.src = imagepath;
		tmpImage.onload = function() {
			self.imagesloaded.push(imagepath);
		};
		this.images[imagepath] = tmpImage;
	},
	getImage: function(imagepath) {
		return this.images[imagepath];
	},
	addSound: function(soundpath) {
		var tmpSound = new Audio(soundpath);
		this.sounds[soundpath] = tmpSound;
		//todo: loading callback
	},
	getSound: function(soundpath) {
		return this.sounds[soundpath];
	},
	finishLoading: function(object, callback) {
		var self = EF.System.Assets;
		if(self.imagesloaded.length == Object.keys(self.images).length) {
			object[callback]();
		} else {
			setTimeout(function() {self.finishLoading(object, callback)}, 10);
		}
	}
};

document.addEventListener("DOMContentLoaded", function() {
	EF.System.Assets = new EF.Assets();
});


