
import nodemailer from "nodemailer"
import { Html } from '@react-email/components';
// Define a Transporter for Nodemailer
const createTransporter = () => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.EMAIL_FROM
  ) {
    console.error("Missing SMTP environment variables! Please check your .env.local file.")
    throw new Error("SMTP configuration is incomplete. Cannot create email transporter.")
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

interface SendEmailProps{
    emailHtml:string;
    to:string;
    subject:string;
    attachment?: any
}


export const sendEmail = async({emailHtml,to,subject,attachment}:SendEmailProps)=>{

    try {
        const transporter = createTransporter()

        const mailOptions = {
            from: process.env.EMAIL_FROM!,
            to,
            subject,
            html: emailHtml,
            ...(attachment ?{
                attachment
            }:{})
        }

        const sent = transporter.sendMail(mailOptions)
        console.log(`Email sent to ${to}`)
        return sent;
    } catch (emailError) {
        console.error("Error sending password reset email:", emailError)
    }
    
}
