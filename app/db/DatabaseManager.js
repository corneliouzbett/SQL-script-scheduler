'use strict';

const mysql = require('mysql');

export default class DatabaseManager {

    constructor() { }

    createConnection() {
        const connection = mysql.createConnection(
            {
                host: 'localhost',
                database: 'openmrs',
                user: 'root',
                password: 'password'
            }
        );

        return connection;

    }
}