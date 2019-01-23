'use strict';

import AppRoutes from './app/routes/routes'
const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8005;
const db = require("./db/models");

const cluster = require('cluster');
const numOfCpus = require('os').cpus.length;

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());
app.use(express.static("public"));


const routes  = new AppRoutes(app);

if (cluster.isMaster) {
    console.log('Master ${proccess.pid} is running');

    for (let i = 0; i < numOfCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log('worker ${worker.process.pid} died');
    });
} else {

}
db.sequelize.sync({
    force: false
}).then(function () {
    app.listen(PORT, function (req, res) {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});