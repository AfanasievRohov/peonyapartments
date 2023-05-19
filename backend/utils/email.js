const nodemailer = require('nodemailer')
const fs = require('fs');
const path = require('path');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email
        this.firstName = user.name.split(' ')[0]
        this.url = url
        this.from = `Peony Apartments <${process.env.EMAIL_FROM}>`
    }

    newTransport() {
        return nodemailer.createTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        })
    }

    async send(subject) {

        const resetPasswordTemplatePath = path.join('..', 'frontend', 'public', 'emails', 'resetPassword.html');

        const html = (fs.readFileSync(resetPasswordTemplatePath, 'utf8'))
        .replace('#RESET URL#', this.url)
        .replace('#User#', this.firstName);

        //2) Define the email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: this.url
        }
        // 3) create a transport & send email
        await this.newTransport().sendMail(mailOptions)

    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)')
    }
}

