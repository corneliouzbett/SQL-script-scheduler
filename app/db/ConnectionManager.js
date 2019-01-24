'use strict';

export default class ConnectionManager {

    constructor(connection) {
        this.connection = connection;
    }

    isconnectionSuccesful() {
        this.connection.connect((err) => {
            if (err) {
                console.log('Error connecting: ' + err.stack);
                return false;
            } else {
                console.log('connection success as id ' + this.connection.threadId);
                return true;
            }
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }

    pause() {
        this.connection.pause();
    }

    resume() {
        this.connection.resume();
    }

}