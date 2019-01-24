'use strict';

const http = require('http');

export default class RestCall {

    constructor(host, port, path, method) {
        this.host = host;
        this.port = port;
        this.path = path;
        this.method = method;
    }

    call() {
        let options = {
            host: this.host,
            port: this.port,
            path: this.path,
            method: this.method};

        http.request(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
                return chunk;
            });
        }).end();
    }
}