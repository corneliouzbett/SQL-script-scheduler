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
                console.log('connection success as id '+ this.connection.threadId);
                return true;
            }
        });
    }

    endConnection(){
        this.connection.end( (err) => {
            if (err){
                console.log('Error occurred while ending connection');
            }
        });
    }

    executeSqlScripts(query_scripts){
        this.connection.query(query_scripts, (error, res, fields) => {
            if (error){
                return error;
            } else {
                console.log('execution success '+res.rowAffected+' rows affected');
                return res;
            }
        });
    }

    pause(){
        this.connection.pause();
    }

    resume() {
        this.connection.resume();
    }

}