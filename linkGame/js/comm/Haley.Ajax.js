/*
 * Haley.Ajax.js
 * 
 * Release 2.0.0 Author: Haley Wang<whlok@126.com> License:
 * http://www.gnu.org/licenses/gpl.html GPL Copyright (c) 2008, HaleyWang, All
 * Rights Reserved
 */

if (!Haley)
    var Haley = {};
Haley.Ajax = function() {
    this.construct.apply(this, arguments);
}
Haley.Ajax.prototype = {
    construct : function(options) {
        this.xmlhttp = this.getXmlHttpObject();
        this.options = options || {};
        this.headers = this.options.headers || {};
        this.method = (this.options.method || "get").toLowerCase();
        this.async = this.options.async || true;
        this.url = this.options.url || null;
        this.postdata = this.options.postdata || "";
        this.timeout = null;

        if (this.method == "post")
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    },
    start : function() {
        var instance = this;
        var requestParams = typeof(this.options.parameters) == "string"
                ? this.options.parameters
                : this.encodeParameters(this.options.parameters || {});
        if (requestParams && this.method == "get")
            this.url += (this.url.indexOf('?') > -1 ? '&' : '?')
                    + requestParams;
        this.xmlhttp.open(this.method, this.url, this.async);
        this.onLoading();

        for (header in this.headers)
            this.xmlhttp.setRequestHeader(header, this.headers[header]);

        this.xmlhttp.onreadystatechange = function() {
            instance.dispatchEvent();
        }

        if (this.options.timeout && typeof(this.options.timeout) == "number")
            this.timeout = setTimeout(function() {
                        instance.onAbort();
                        instance.onLoaded();
                        instance.onTimeout();
                    }, this.options.timeout * 1000);

        this.xmlhttp.send(this.method == "post"
                ? (this.postdata || requestParams)
                : null);
        if (!this.async)
            this.dispatchEvent();
    },
    getXmlHttpObject : function() {
        if (window.XMLHttpRequest)
            return new XMLHttpRequest();
        else if (window.ActiveXObject) {
            var msxmls = new Array("Msxml2.XMLHTTP", "Microsoft.XMLHTTP");
            for (var i = 0, len = msxmls.length; i < len; i++) {
                try {
                    return new ActiveXObject(msxmls[i]);
                } catch (e) {
                }
            }
        }
        throw new Error("Could not instantiate XmlHttpObject!");
    },
    encodeParameters : function(parameters) {
        var paras = [];
        for (parameter in parameters)
            paras.push(encodeURIComponent(parameter) + "="
                    + encodeURIComponent(parameters[parameter]));
        return paras.join('&');
    },
    addRequestHeader : function(name, content) {
        this.headers[name] = content;
    },
    onTimeout : function() {
    },
    onLoading : function() {
    },
    onLoaded : function() {
    },
    onComplete : function(responseObject) {
    },
    onError : function(errorObject) {
    },
    onAbort : function() {
        if (this.xmlhttp)
            this.xmlhttp.abort();
    },
    dispatchEvent : function() {
        if (this.xmlhttp.readyState == 4) {
            if (this.timeout)
                clearTimeout(this.timeout);
            this.onLoaded();

            if (this.xmlhttp.status == 200)
                this.onComplete({
                            textString : this.xmlhttp.responseText,
                            xmlDocument : this.xmlhttp.responseXML
                        });
            else if (this.xmlhttp.status == 0)
                this.onAbort();
            else
                this.onError({
                            url : this.url,
                            status : this.xmlhttp.status,
                            statusText : this.xmlhttp.statusText,
                            responseText : this.xmlhttp.responseText
                        });
        }
    }
}