var shoe = require("shoe")
    , fs = require("fs")
    , chokidar = require('chokidar')
    , openStreams = []

module.exports = LiveReloadServer

function LiveReloadServer(options) {
    var httpsOpts, server, isHttps;
    if (options.key && options.cert) {
        httpsOpts = {
            key: fs.readFileSync(options.key),
            cert: fs.readFileSync(options.cert)
        };
        isHttps = true;
        server = require("https").createServer(httpsOpts, serveText)
    } else {
        isHttps = false;
        server = require("http").createServer(serveText)
    }
    var sock = shoe(handleStream)
        , paths = options._ || process.cwd()
        , filterIgnored = options.ignore || noop
        , delay = options.delay || 1000
        , port = options.port || 9090
        , host = options.host || 'localhost'
        , uri = (isHttps ? "https" : "http") + "://" + host + ":" + port
        , source = fs.readFileSync('./bundle.js', 'utf8')
            .replace(/(var\s+liveReloadUri\s+=\s+['"]).+?(['"];?)/, '$1' + uri + '$2')
        , timer

    chokidar
        .watch(paths, {
            ignored: /[\/\\]\./,
            ignoreInitial: true
        })
        .on('all', reload)

    sock.install(server, "/shoe")

    server.listen(port, host)

    console.log("Live reload server started on", uri + ". Add to your page:")
    console.log('<script src="' + uri + '/"></script>')

    function serveText(req, res) {
        res.setHeader("content-type", "application/javascript")
        res.end(source)
    }

    function handleStream(stream) {
        openStreams.push(stream)

        stream.on("end", remove)

        function remove() {
            var index = openStreams.indexOf(stream)
            if (index !== -1) {
                openStreams.splice(index, 1)
            }
        }
    }

    function reload(changeType, fileName) {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(function () {
            if (!filterIgnored(fileName)) {
                openStreams.forEach(sendMessage)
            }
        }, delay)
    }

    function sendMessage(stream) {
        stream && stream.write("reload")
    }
}

function noop() {}
