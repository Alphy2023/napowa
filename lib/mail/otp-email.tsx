// emails/OTPEmail.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Text, Img, Heading, Section, Link } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

// Define the props interface for your OTP email component
interface OTPEmailProps {
  userName?: string; // Optional, as some OTP emails might not include a user name
  otp: string;
  expiresInMinutes?: number; // Optional: how long the OTP is valid
  companyName: string;
  supportEmail: string;
  logoUrl: string; // URL for your company logo
}

export const OTPEmail: React.FC<OTPEmailProps> = ({
  userName,
  otp,
  expiresInMinutes = 10, // Default to 10 minutes if not provided
  companyName,
  supportEmail,
  logoUrl,
}) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-gray-100 font-sans">
        <Container className="my-10 mx-auto p-8 bg-white rounded-lg shadow-lg max-w-md">
          <Section className="text-center mb-6">
            {logoUrl && (
              <Img
                src={logoUrl}
                width="80"
                height="80"
                alt={`${companyName} Logo`}
                className="mx-auto mb-4"
              />
            )}
            <Heading className="text-2xl font-bold text-gray-800">Your One-Time Password (OTP)</Heading>
          </Section>

          <Text className="text-gray-700 leading-6">
            {userName ? `Hello ${userName},` : 'Hello,'}
          </Text>
          <Text className="text-gray-700 leading-6">
            We received a request to log in or verify your account. Please use the following One-Time Password (OTP) to complete your action:
          </Text>

          <Section className="text-center my-8">
            <Text className="text-5xl font-extrabold text-blue-600 tracking-wider">
              {otp}
            </Text>
          </Section>

          <Text className="text-gray-700 leading-6">
            This OTP is valid for the next **{expiresInMinutes} minutes**. For security reasons, please do not share this code with anyone.
          </Text>
          <Text className="text-gray-700 leading-6">
            If you did not request this, please ignore this email.
          </Text>

          <Text className="text-gray-600 text-sm mt-8">
            Best regards,
            <br />
            The {companyName} Team
          </Text>
          <Text className="text-gray-500 text-xs mt-4">
            If you have any questions, please contact our support at{' '}
            <Link href={`mailto:${supportEmail}`} className="text-blue-600 underline">
              {supportEmail}
            </Link>
          </Text>
          <Text className="text-gray-500 text-xs mt-2">
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default OTPEmail;