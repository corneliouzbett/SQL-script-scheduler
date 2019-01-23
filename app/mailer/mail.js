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
    constructor(from, to, subject, text) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
    }

     sendEmail() {
        let mailOptions = {
            from: this.from,
            to: this.to,
            subject: this.subject,
            text: this.text
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