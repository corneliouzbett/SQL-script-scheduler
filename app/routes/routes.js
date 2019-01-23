
import Mail from '../mailer/mail'
const db = require("../../db/models");


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

        app.get('/api/connections', (req, res) => {
            db.mysql_connection.findAll().then(
                (data) => {
                    res.json(data);
                }
            ).catch(
                (error) =>{res.json(error)}
            );
        });


    }
}