/*eslint-env browser*/

var reconnect = require("reconnect/shoe")

function LiveReloadClient() {
    var src = document.currentScript.src;
    var a = document.createElement('a');
    var uri;

    a.href = src;
    uri = '//' + a.host;

    reconnect(function (stream) {
        stream.on("data", ondata)
    }).connect(uri + "/shoe")
}

function ondata(data) {
    if (data === "reload") {
        document.location.reload()
    }
}

LiveReloadClient();
