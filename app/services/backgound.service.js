'use strict';

import DatabaseManager from '../db/DatabaseManager';
import Mail from '../mailer/mail';
import QueryBuilder from '../db/QueryBuider';

const queryBuilder = new QueryBuilder();
const mail = new Mail();

const cron = require('cron').CronJob;
const db_manager = new DatabaseManager();

export default class BackgroundService {

    constructor() {}

    releaseHivMonthlyReport(date) {
        
    }
}