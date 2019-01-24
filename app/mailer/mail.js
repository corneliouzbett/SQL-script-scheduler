'use strict';

 const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: "kibett@ampath.or.ke",
            pass: "bett4168"
        }
    }
);
export default class Mail {
    constructor() {}

     sendEmail(from, to, subject, text) {
        let mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: text
        }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.log('Error while sending Mail :', error);
            return false;
        } else {
            console.log('Email successfully sent!');
            return true;
        }
    });
    }
}