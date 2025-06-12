// emails/PasswordChangedEmail.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Text, Link, Img, Heading, Section, Button } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

// Define the props interface for your Password Changed email component
interface PasswordChangedEmailProps {
  userName: string; // The user's name
  loginUrl: string; // Link to the login page
  companyName: string;
  supportEmail: string;
  logoUrl: string; // URL for your company logo
  changeDate: string; // Date and time of the password change, e.g., "June 11, 2025 at 9:30 AM EAT"
}

export const PasswordChangedEmail: React.FC<PasswordChangedEmailProps> = ({
  userName,
  loginUrl,
  companyName,
  supportEmail,
  logoUrl,
  changeDate,
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
            <Heading className="text-2xl font-bold text-gray-800">Your Password Has Been Changed</Heading>
          </Section>

          <Text className="text-gray-700 leading-6">
            Hello <span className="font-semibold">{userName}</span>,
          </Text>
          <Text className="text-gray-700 leading-6">
            This is to confirm that the password for your **{companyName}** account was successfully changed on **{changeDate}**.
          </Text>

          <Section className="text-center my-8">
            <Button
              href={loginUrl}
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md no-underline hover:bg-blue-700"
            >
              Log in to Your Account
            </Button>
          </Section>

          <Text className="text-gray-700 leading-6">
            If you did not make this change, please contact our support team immediately at{' '}
            <Link href={`mailto:${supportEmail}`} className="text-blue-600 underline">
              {supportEmail}
            </Link>{' '}
            to secure your account.
          </Text>

          <Text className="text-gray-600 text-sm mt-8">
            Best regards,
            <br />
            The {companyName} Team
          </Text>
          <Text className="text-gray-500 text-xs mt-4">
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default PasswordChangedEmail;