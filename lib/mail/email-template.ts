// lib/mail/email-template.ts

interface BaseEmailTemplateProps {
  name?: string;
  heading?: string;
  primaryText?: string;
  code?: string; // optional, for things like OTP
  paragraphs?: string[];
}

export function BaseEmailTemplate({
  name = "there",
  heading = "Hi",
  primaryText,
  code,
  paragraphs = [],
}: BaseEmailTemplateProps): string {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f6f8; padding: 32px; border-radius: 12px; max-width: 600px; margin: auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <img src="https://napowa.com/logo.png" alt="Napowa Logo" style="height: 50px;" />
      </div>
      <h2 style="color: #1f2937; font-size: 20px;">${heading} ${name} 👋</h2>
      
      ${primaryText ? `<p style="color: #4b5563; font-size: 16px; margin-top: 8px;">${primaryText}</p>` : ""}

      ${code ? `
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; text-align: center; margin: 24px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 6px;">${code}</span>
        </div>
      ` : ""}

      ${paragraphs
        .map(
          (text) =>
            `<p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">${text}</p>`
        )
        .join("")}

      <p style="margin-top: 40px; font-size: 15px; color: #374151;">
        Regards,<br />
        <strong>The Napowa Team</strong>
      </p>
    </div>
  `;
}
