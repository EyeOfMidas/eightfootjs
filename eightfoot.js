require.config({
	shim: {
		'underscore' : { exports: '_'}
		}
	});
require([
	'underscore',
	'./canvas',
	'./ajax'
	], function(canvas, ajax) {
	if (!document.body) {
		setTimeout()
	}
	eightfoot.canvas = canvas;
	eightfoot.ajax = ajax;
	console.log(eightfoot);
});