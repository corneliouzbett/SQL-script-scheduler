'use strict';

const mysql = require('mysql');

export default class DatabaseManager{

    constructor(){}

    createConnection(host, database_name, user, password){
        const connection = mysql.createConnection(
            {
                host: host,
                database: database_name,
                user: user,
                password: password
            }
        );

        return connection;

    }
}