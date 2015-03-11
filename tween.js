(window.EF||(EF={}));

EF.Tween = {};
EF.Tween.Easing = {
	Linear: {},
	Quadratic: {},
	Cubic: {},
	Quartic: {},
	Quintic: {},
	Sinusoidal: {},
	Exponential: {},
	Circular: {},
	Elastic: {},
	Back: {},
	Bounce: {}
};

EF.Tween.Easing.Linear.EaseIn = function(k) {
	return k;
};
