# live-reload

A live reload server & client

## Docs

```
Usage:

  live-reload [uri] --port=somePort --delay=someDelay

    Runs a live-reload server on the port. It listens on all files
        in the uri and sends reload commands to any browsers
        connected to it if the files change.

    If a delay is set then it will send the command once the
        file has changed and the delay has elapsed. This is
        useful if your changing many files at once and only
        want to reload say 1s after all files have been written
        to disk.

    To connect a browser to a live-reload server simply add
        <script src="localhost:somePort"></script> to your page
```

## Installation

`npm install live-reload`

## Contributors

 - Raynos

## MIT Licenced
