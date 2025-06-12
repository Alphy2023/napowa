// emails/ForgotPasswordEmail.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Text, Link, Img, Heading, Section, Button } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

// Define the props interface for your Forgot Password email component
interface ForgotPasswordEmailProps {
  userName: string; // The user's name
  resetPasswordLink: string; // The unique, time-limited link to reset the password
  expirationMinutes: number; // How long the link is valid (e.g., 60 minutes)
  companyName: string;
  supportEmail: string;
  logoUrl: string; // URL for your company logo
}

export const ForgotPasswordEmail: React.FC<ForgotPasswordEmailProps> = ({
  userName,
  resetPasswordLink,
  expirationMinutes,
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
            <Heading className="text-2xl font-bold text-gray-800">Password Reset Request</Heading>
          </Section>

          <Text className="text-gray-700 leading-6">
            Hello <span className="font-semibold">{userName}</span>,
          </Text>
          <Text className="text-gray-700 leading-6">
            You are receiving this email because a password reset request was made for your account on {companyName}.
          </Text>

          <Section className="text-center my-8">
            <Button
              href={resetPasswordLink}
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md no-underline hover:bg-blue-700"
            >
              Reset Your Password
            </Button>
          </Section>

          <Text className="text-gray-700 leading-6">
            This password reset link is valid for **{expirationMinutes} minutes**. For your security, this link will expire after this time.
          </Text>
          <Text className="text-gray-700 leading-6">
            If you did not request a password reset, please ignore this email. Your password will remain unchanged.
          </Text>

          <Text className="text-gray-700 leading-6 mt-4">
            If the button above does not work, copy and paste the following URL into your browser:
            <br />
            <Link href={resetPasswordLink} className="text-blue-600 underline text-sm break-all">
              {resetPasswordLink}
            </Link>
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

export default ForgotPasswordEmail;