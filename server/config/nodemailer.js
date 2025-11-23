import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    // port: 2525, Use this port for production 😭
    secure: false,
    requireTLS: true,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    logger: true,
    debug: true,
})

export default transporter;