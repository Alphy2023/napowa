// emails/OTPEmail.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Text, Img, Heading, Section, Link } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import { companyName, logoUrl, supportEmail } from '@/constants/mock-data';

// Define the props interface for your OTP email component
interface OTPEmailProps {
  userName?: string; // Optional, as some OTP emails might not include a user name
  otp?: string | number;
  expiresInMinutes?: number; // Optional: how long the OTP is valid
  // companyName?: string;
  // supportEmail?: string;
  // logoUrl?: string; // URL for your company logo
}

export const OTPEmail: React.FC<OTPEmailProps> = ({
  userName,
  otp,
  expiresInMinutes = 10, // Default to 10 minutes if not provided
  // companyName,
  // supportEmail,
  // logoUrl,
}) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-gray-100 font-sans">
        <Container className="my-10 mx-auto p-8 bg-white 
        rounded-lg shadow-lg max-w-md">
          <Section>
            <div className="napowa-stripes-top"></div>
          </Section>

          <Section className="text-center mb-6 px-4 mt-5">
            {logoUrl && (
              <Img
                src={logoUrl}
                width="80"
                height="80"
                alt={`${companyName} Logo`}
                className="mx-auto mb-4"
              />
            )}
            <Heading className="text-2xl font-bold text-gray-800 ">Your One-Time Password (OTP)</Heading>
          </Section>

          <Text className="text-gray-700 leading-6 px-4">
            {userName ? `Hello ${userName},` : 'Hello,'}
          </Text>
          <Text className="text-gray-700 leading-6 px-4">
            We received a request to log in or verify your account. Please use the following One-Time Password (OTP) to complete your action:
          </Text>

          <Section className="text-center my-3 px-4">
            <Text className="text-2xl font-extrabold text-primary
             tracking-wider">
              {otp}
            </Text>
          </Section>

          <Text className="text-gray-700 leading-6 px-4">
            This OTP is valid for the next <strong> **{expiresInMinutes} minutes**</strong>. For security reasons, please do not share this code with anyone.
          </Text>
          <Text className="text-gray-700 leading-6 px-4">
            If you did not request this, please ignore this email.
          </Text>

          <Text className="text-gray-600 text-sm mt-8 px-4">
            Best regards,
            <br />
            <strong>
            The {companyName} Team
            </strong>
          </Text>
          <Text className="text-gray-500 text-xs mt-4 px-4">
            If you have any questions, please contact our support at{' '}
            <Link href={`mailto:${supportEmail}`} className="text-primary
              underline">
              {supportEmail}
            </Link>
          </Text>
          <Text className="text-gray-500 text-xs text-center mt-2 px-4">
            &copy; {new Date().getFullYear()} {companyName}.
              All rights reserved.
          </Text>
          <Section>
            <div className="napowa-stripes-bottom"></div>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default OTPEmail;