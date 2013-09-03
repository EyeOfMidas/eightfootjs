define(
    function(){
        Promise = function() {
            var doneCallbacks = [];
            var failureCallbacks = [];
            var alwaysCallbacks = [];
            var result = null;
            var state = 0;
        
            this.setResult = function(result) {
              this.result = result;
            };
        
            this.resolve = function() {
                this.state = Promise.STATE.FULFILLED;
                this.isDone();
                this.isAlways();
            };
        
            this.reject = function() {
                this.state = Promise.STATE.FAILED;
                this.isFailure();
                this.isAlways();
            };
        
            var operateOnDelegates = function(callbackCollection) {
                var arrayUtils = new ArrayUtils();
                arrayUtils.each(callbackCollection, function(value){
                    value(this.result);
                    }, this);
            };
        
            var isDone = function() {
                this.operateOnDelegates(this.doneCallbacks);
            };
        
            var isFailure = function() {
                this.operateOnDelegates(this.failureCallbacks);
            };
        
            var isAlways = function() {
                this.operateOnDelegates(this.alwaysCallbacks);
            };
        
            this.done = function(newDoneCallback) {
                if (this.state == Promise.STATE.FULFILLED) {
                    newDoneCallback(this.result);
                } else {
                    this.doneCallbacks.push(newDoneCallback);
                }
            };
        
            this.fail = function(newFailCallback) {
                if (this.state == Promise.STATE.FAILED) {
                    newFailCallback(this.result);
                } else {
                    this.failureCallbacks.push(newFailCallback);
                }
            };
        
            this.always = function(newAlwaysCallback) {
                if (this.state == Promise.STATE.UNFULFILLED) {
                    this.alwaysCallbacks.push(newAlwaysCallback);
                } else {
                    newAlwaysCallback(this.result);
                }
            };
        };
        Promise.STATE = {
            UNFULFILLED: 0,
            FULFILLED: 1,
            FAILED: 2
        };
    }
);



