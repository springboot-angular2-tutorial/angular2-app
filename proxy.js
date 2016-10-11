var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var serverOne = 'http://localhost:3001',
    ServerTwo = 'http://localhost:8080',
    ServerThree = 'http://localhost:3002';

app.all("/*.js", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: serverOne});
});

app.all("/*", function(req, res) {
    console.log('redirecting to Server2');
    apiProxy.web(req, res, {target: ServerTwo});
});

app.listen(4200);
