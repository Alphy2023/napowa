import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@napowa.org',
      ...options,
    });
    return true;
  } catch (error) {
    console.error('[v0] Email send error:', error);
    return false;
  }
};

export const sendMemberCreationEmail = async (
  email: string,
  username: string,
  tempPassword: string,
  resetLink: string
): Promise<boolean> => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Welcome to NAPOWA!</h2>
      <p>Hi ${username},</p>
      <p>Your account has been created by an administrator. Your login details are:</p>
      <p>
        <strong>Email:</strong> ${email}<br>
        <strong>Temporary Password:</strong> ${tempPassword}
      </p>
      <p>For security reasons, you must change your password on first login. Click the link below:</p>
      <p>
        <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Set Your Password
        </a>
      </p>
      <p>This link expires in 24 hours.</p>
      <p>If you did not expect this email, please contact support.</p>
      <br>
      <p>Best regards,<br>NAPOWA Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Welcome to NAPOWA - Set Your Password',
    html,
  });
};

export const send2FAEmail = async (email: string, otp: string): Promise<boolean> => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Two-Factor Authentication</h2>
      <p>Your OTP code is:</p>
      <p style="font-size: 24px; font-weight: bold; color: #007bff; letter-spacing: 2px;">
        ${otp}
      </p>
      <p>This code expires in 10 minutes.</p>
      <p>If you did not request this code, please ignore this email.</p>
      <br>
      <p>Best regards,<br>NAPOWA Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Your Two-Factor Authentication Code',
    html,
  });
};

export const sendDonationReceiptEmail = async (
  email: string,
  donorName: string,
  amount: number,
  transactionId: string,
  date: string
): Promise<boolean> => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Donation Receipt</h2>
      <p>Dear ${donorName},</p>
      <p>Thank you for your generous donation!</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Amount:</strong> KES ${amount.toLocaleString()}</p>
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Date:</strong> ${date}</p>
      </div>
      <p>Your donation will help us make a difference in our community.</p>
      <p>Best regards,<br>NAPOWA Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Donation Receipt - NAPOWA',
    html,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  resetLink: string
): Promise<boolean> => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Password Reset Request</h2>
      <p>We received a request to reset your password. Click the link below to proceed:</p>
      <p>
        <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </p>
      <p>This link expires in 1 hour.</p>
      <p>If you did not request this, please ignore this email.</p>
      <br>
      <p>Best regards,<br>NAPOWA Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Password Reset Request - NAPOWA',
    html,
  });
};
