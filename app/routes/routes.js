
import Mail from '../mailer/mail'


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


    }
}