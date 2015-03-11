(window.EF||(EF={}));
EF.init = function() {

};

EF.update = function(delta) {
};

EF.draw = function(graphics) {
};


EF.worldToPixel = function(worldPoint) {
	var leftRange = canvas.width / 2;
	var topRange = canvas.height / 2;

	var pixelPoint = {x: leftRange, y: topRange};
	pixelPoint.x = Math.round((worldPoint.x * leftRange) + leftRange);
	pixelPoint.y = Math.round((worldPoint.y * topRange) + topRange);

	return pixelPoint;
}
