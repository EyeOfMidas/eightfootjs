(window.EF||(EF={}));
EF.worldToPixel = function(worldPoint) {
	var canvas = EF.System.canvas;
	var leftRange = canvas.width / 2;
	var topRange = canvas.height / 2;

	var pixelPoint = {x: leftRange, y: topRange};
	pixelPoint.x = Math.round((worldPoint.x * leftRange) + leftRange);
	pixelPoint.y = Math.round((worldPoint.y * topRange) + topRange);

	return pixelPoint;
};

EF.pixelToWorld = function(pixelPoint) {
	var canvas = EF.System.canvas;
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;

	var worldPoint = {x: 0, y: 0};
	worldPoint.x = (pixelPoint.x - centerX) / centerX;
	worldPoint.y = (pixelPoint.y - centerY) / centerY;

	return worldPoint;
};
