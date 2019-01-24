'use strict';

import Mail from '../mailer/mail';
import QueryBuilder from '../db/QueryBuider';

const queryBuilder = new QueryBuilder();
const mail = new Mail(
    'kibett@ampath.or.ke',
    'kbett68@gmail.com',
    'Mailing Test',
    'Hey dude am sending emails now'
);

export default class AppRoutes{
    constructor(app){

        app.get("/api/send", (req, res) => {
            mail.sendEmail();
        });

        app.get('/', (req, res) => {
         res.render('index.ejs',
         {
             title: 'Ampath | Reports',
             result: null
         });
        });

        app.post('/releaseHivMonthlyReport', (req, res) => {
            let date = '2019-02-10'
            queryBuilder.releaseHIVMonthlyReport(date);
        });

        app.get('/patients', (req, res) => {
            queryBuilder.listPatients().then( (results) =>
                {
                    console.log('Patients :: ', results);
                    const info = res.json(results);
                    console.log('info :' , info);
                }
            ).catch(
                (error) => {console.log(error)}
            );
        });


    }
}