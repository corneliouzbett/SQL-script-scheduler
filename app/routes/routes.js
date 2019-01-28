'use strict';

import Mail from '../mailer/mail';
import QueryBuilder from '../db/QueryBuider';

const queryBuilder = new QueryBuilder();
const mail = new Mail();
const from = 'kibett@ampath.or.ke';
const to = 'kbett68@gmail.com';

export default class AppRoutes {
    constructor(app) {

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
            queryBuilder.listPatients().then((results) => {
                console.log('Patients :: ', results);
                console.log('info :', results.affectedRows);
                mail.sendEmail(from, to,
                    '🐸🐸🐸 Ampath SQl scripts scheduler runner',
                    ' ✔️ ✔️ <p>Execution completed successfully </p></br> <ul> <li>rows affected  :' +results.affectedRows +
                    '</li><li> server status : '+ results.serverStatus +' </li><li> change rows : ' + results.changedRows +
                    ' </li> <li>warning count : ' + results.warningCount + '</li>'
                );
            }
            ).catch(
                (error) => { console.log(error) }
            );
        });


    }
}