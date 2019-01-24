'use strict';

const cron = require('cron').CronJob;

export default class Scheduler {

    constructor() { }

    everySecond() {
        return new cron('* * * * * *', () => {
            console.log('You will see this message every second');
        }, (onComplete) => {
            console.log('Job completed');
        }, false, 'Africa/Nairobi');
    }
    daily() {

    }

    ownTime(){
        return new cron('* * * * * *', () => {

        }, null, true, 'Africa/Nairobi');
    }

}