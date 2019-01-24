'use strict';

import DatabaseManager from '../db/DatabaseManager'
import ConnectionManager from '../db/ConnectionManager'

const db = require("../../db/models");
const db_manager = new DatabaseManager();

export default class BackgroundService {

    constructor() {

    }
    start() {

        db.mysql_connection.findAll({ raw: true }).then(
            (data) => {
                console.log('connections ::', data);
                for (let i = 0; i < data.length; i++) {

                    const connection = db_manager.createConnection(
                        data[i].host, data[i].database_name, data[i].user, data[i].password
                    );
                    db.mysql_connection.update(
                        { connection_id: data[i].connection_id },
                        {
                            where: {
                                id: data[i].id,
                                database_name: data[i].database_name
                            }
                        }
                    ).then(
                        (data) => {console.log('Update ::' , data)}
                    ).catch(
                        (err) => {console.log('Update ::', err)}
                    );
                    const connection_manager = new ConnectionManager(connection);

                    if (connection_manager.isconnectionSuccesful()) {

                        connection_manager.executeSqlScripts('SELECT * FROM student;');
                    }
                }
            }
        ).catch(
            (error) => {
                console.log('Error occurred :: ', error);
            }
        );
    }
}