(window.EF||(EF={}));
EF.Timer = function() {

	this.base = 0;
	this.target = 0;
	this.running = false;
	this.timerCallback = function(){};
	this.init();
};

EF.Timer.prototype = {
	getMilliseconds: function() {
		return Date.now();
	},
	init: function() {
		var milliseconds = this.getMilliseconds();
		this.base = milliseconds;
		this.target = milliseconds;
	},
	start: function(milliseconds) {
		if(!this.running) {
			this.base = this.getMilliseconds();
			this.target = this.base + milliseconds;
			this.running = true;
		}
	},
	update: function() {
		var remaining = this.target - this.getMilliseconds();
		if(this.running){
			if(remaining <= 0) {
				this.running = false;
				remaining = 0;
				this.timerCallback();
			}
		} else {
			remaining = this.target - this.base;
		}
		return remaining;
	},
	stop: function() {
		if(this.running) {
			this.base = this.getMilliseconds();
			this.running = false;
		}
	},
	reset: function() {
		this.base = this.getMilliseconds();
		this.target = this.base;
	},
	onComplete: function(callback) {
		this.timerCallback = callback;
	}
	
};

