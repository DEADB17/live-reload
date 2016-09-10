var reconnect = require("reconnect/shoe")

module.exports = LiveReloadClient

function LiveReloadClient(uri) {
    var loc;
    if (typeof uri === "number") {
        loc = document.location || { hostname: "localhost" };
        uri = "//" + loc.hostname + ":" + uri;
    }

    reconnect(function (stream) {
        stream.on("data", ondata)
    }).connect(uri + "/shoe")
}

function ondata(data) {
    if (data === "reload") {
        document.location.reload()
    }
}
