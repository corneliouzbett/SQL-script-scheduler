'use strict';

import AppRoutes from './app/routes/routes';
import DatabaseManager from './app/db/DatabaseManager';
import ConnectionManager from './app/db/ConnectionManager';

const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8008;
const cluster = require('cluster');
const numOfCpus = require('os').cpus.length;
const db_config = require('./config/database.json');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());
app.use(express.static("public"));


const routes = new AppRoutes(app);
const db_manager = new DatabaseManager();

const conn = db_manager.createConnection();
const db_connection = new ConnectionManager(conn);
if (db_connection.isconnectionSuccesful()) {
    global.db = db;
}

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
} else {

}

app.listen(PORT, function (req, res) {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
