import Mailgen from "mailgen";
import nodemailer from "nodemailer"


const sendEmail = async(options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const trasporter = nodemailer.createTransport({
        host:process.env.MAILTRAP_SMTP_HOST,
        port:process.env.MAILTRAP_SMTP_PORT,
        auth:{
            user: process.env.MAILTRAP_SMTP_USER,
            pass:process.env.MAILTRAP_SMTP_PASS,
        }
    })

    const mail = {
        from: "mail.taskmanager@exp.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }

    try {
        await trasporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed silently, might have happened due to credentials, make sure you provide correct MAILTRAP credentials")
        console.error("Error", error)
    }
}

const emailVerificationMailgenContent = (usrename, verificationUrl) => {
    return {
        body: {
            name: usrename,
            intro: "Welcome to our App! We're excited to have you on board",
            action: {
                instruction: "To verify your email click on the following button",
                button:{
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificationUrl
                }
            },
            outro: "Need help, or have questions, just reply to this email"
        }
    }
}

const forgotPasswordMailgenContent = (usrename, passwordResetUrl) => {
    return {
        body: {
            name: usrename,
            intro: "We got a request to reset the password of your account",
            action: {
                instruction: "To reset the password of your account click on the following button",
                button:{
                    color: "#22BC66",
                    text: "Reset the password",
                    link: passwordResetUrl,
                },
            },
            outro: "Need help, or have questions, just reply to this email"
        }
    }
}

export default sendEmail;

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent
}