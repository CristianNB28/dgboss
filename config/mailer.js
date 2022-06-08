const nodemailer = require('nodemailer');

const isTrueSet = (process.env.EMAIL_SECURE === 'true');
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: isTrueSet,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify().then(() => {
    console.log('Listo para enviar emails');
});

module.exports = transporter;