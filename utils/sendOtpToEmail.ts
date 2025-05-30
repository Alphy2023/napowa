// lib/mail/send-email.ts

import { transporter } from "@/lib/mail/mailer";
import { BaseEmailTemplate } from "@/lib/mail/email-template";

interface SendEmailProps {
  to: string;
  subject: string;
  name?: string;
  heading?: string;
  primaryText?: string;
  code?: string;
  paragraphs?: string[];
}

export async function sendEmail({
  to,
  subject,
  name,
  heading,
  primaryText,
  code,
  paragraphs,
}: SendEmailProps) {
  const mailOptions = {
    from: `"Napowa" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html: BaseEmailTemplate({
      name,
      heading,
      primaryText,
      code,
      paragraphs,
    }),
  };

  return transporter.sendMail(mailOptions);
}
