(window.EF||(EF={}));
EF.Assets = function() {
	this.images = {};
};

EF.Assets.prototype.addImage = function(imagepath) {
	var tmpImage = new Image();
	tmpImage.src = imagepath;
	this.images[imagepath] = tmpImage;
};

EF.Assets.prototype.getImage = function(imagepath) {
	return this.images[imagepath];
};

document.addEventListener("DOMContentLoaded", function() {
	EF.Assets = new EF.Assets();
});


