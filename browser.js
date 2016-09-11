/*eslint-env browser*/

var reconnect = require("reconnect/shoe")

function LiveReloadClient() {
    var liveReloadUri = '//localhost:9090';

    reconnect(function (stream) {
        stream.on("data", ondata)
    }).connect(liveReloadUri + "/shoe")
}

function ondata(data) {
    if (data === "reload") {
        document.location.reload()
    }
}

LiveReloadClient();
