'use strict';

import DatabaseManager from '../db/DatabaseManager';
import ConnectionManager from '../db/ConnectionManager';

const db_connection = new DatabaseManager().createConnection();
const connection = new ConnectionManager(db_connection);
const Queue = require('queue-fifo');
const queue = new Queue();


export default class QueryBuilder {

    constructor() { }

    releaseHIVMonthlyReport(date) {

        let query = 'insert into etl.hiv_monthly_report_dataset_frozen' +
            '(select * from etl.hiv_monthly_report_dataset_v1_2 where endDate=“' + date + '”)';
        console.log('query build :', query);

        return connection.query(query);

    }

    listPatients() {
        let query = 'insert into cohort (cohort_id, name, description, creator,'+ 
            'date_created, voided, uuid) values (48,"male betw 23 and 34","oncology patients",1,"1996-01-02",1,"ZZZZZ-MMkl-xxx");';

        return connection.query(query);

    }

}
