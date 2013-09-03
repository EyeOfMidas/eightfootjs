define(
    ['./promise'],
    function(){
    Ajax = function() {
    this.get = function(url) {
        var promise = new Promise();
        var request = null;
        if (window.XMLHttpRequest){
            // code for IE7+, Firefox, Chrome, Opera, Safari
            request = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        request.onreadystatechange = function() {
                if( request.readyState == 4) {
                    promise.setResult(request);
                    if(request.status == 200 ) {
                        promise.resolve();
                    } else {
                        promise.reject();
                    }
            }
        };
        request.open('GET', url, true);
        request.send();
        return promise;
    };
    this.post = function(url, data) {
        var promise = new Promise();
        var request = null;
        if (window.XMLHttpRequest){
            // code for IE7+, Firefox, Chrome, Opera, Safari
            request = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        request.onreadystatechange = function() {
                if( request.readyState == 4) {
                    promise.setResult(request);
                    if(request.status == 200 ) {
                        promise.resolve();
                    } else {
                        promise.reject();
                    }
            }
        };
        request.open('POST', url, true);
        request.send(this.dataToParams(data));
        return promise;
    };
    var dataToParams = function(data) {
        var paramArray = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var value = data[key];
                paramArray.push(key + "=" + value);
            }
            
        }
        return paramArray.join("&");
    }
};
    });


