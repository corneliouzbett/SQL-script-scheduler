'use strict';

import AppRoutes from './app/routes/routes';
import Scheduler from './app/cronjobs/scheduler.cron';

const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8008;
const cluster = require('cluster');
const numOfCpus = require('os').cpus.length;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const routes = new AppRoutes(app);
new Scheduler().everySecond().start();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

if (cluster.isMaster) {
    console.log('Master ${proccess.pid} is running');

    for (let i = 0; i < numOfCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log('worker ${worker.process.pid} died');
    });

} else { }

app.listen(PORT, function (req, res) {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});

process.on('SIGINT', () => {
    process.exit();
});
