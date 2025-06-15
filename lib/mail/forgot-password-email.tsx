// emails/ForgotPasswordEmail.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Text, Link,
   Img, Heading, Section, Button } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import { companyName, logoUrl, supportEmail } from '@/constants/mock-data';

// Define the props interface for your Forgot Password email component
interface ForgotPasswordEmailProps {
  userName?: string; // The user's name
  resetPasswordLink?: string; // The unique, time-limited link to reset the password
  expirationMinutes?: number; // How long the link is valid (e.g., 60 minutes)
  // companyName?: string;
  // supportEmail?: string;
  // logoUrl?: string; 
}
// const logoUrl: string = "/images/napowwa-logo.png"
// const companyName: string = "Napowa";
// const supportEmail: string = "info@napowa.org"


export const ForgotPasswordEmail: React.FC<ForgotPasswordEmailProps> = ({
  userName,
  resetPasswordLink,
  expirationMinutes=60,
  // supportEmail,
  // logoUrl="/images/",
}) => (

  <Html>
    <Head>
       <style>
        {`
        .napowa-stripes-top {
          background: linear-gradient(to bottom, #8b2323 10px, #ffd700 10px, #ffd700 20px, #5ecce9 20px, #5ecce9 30px);
          height: 30px;
          width: 100%;
        }

        .napowa-stripes-bottom {
          background: linear-gradient(to top, #8b2323 10px, #ffd700 10px, #ffd700 20px, #5ecce9 20px, #5ecce9 30px);
          height: 30px;
          width: 100%;
        }
        `}
      </style>
    </Head>
    <Tailwind>
      <Body className="bg-gray-100 font-sans">
        <Container className="my-10 mx-auto p-8 pr-4 pl-4 mt-5 mb-5
        bg-white rounded-lg shadow-lg max-w-md">
           <Section>
            <div className="napowa-stripes-top"></div>
          </Section>
          <Section className="text-center mb-6 mt-5">
            {logoUrl && (
              <Img
                src={logoUrl}
                width="80"
                height="80"
                alt={`${companyName} Logo`}
                className="mx-auto mb-4 "
              />
            )}
            <Heading className="text-2xl font-bold text-gray-800">Password Reset Request</Heading>
          </Section>

          <Text className="text-gray-700 leading-6 px-4">
            Hello <span className="font-semibold">{userName}</span>,
          </Text>
          <Text className="text-gray-700 leading-6 px-4">
            You are receiving this email because a password reset request was made for your account on {companyName}.
          </Text>

          <Section className="text-center my-8">
            <Button
              href={resetPasswordLink}
              className="bg-black text-white font-bold text-sm
              cursor-pointer 
               py-2 px-3 rounded-md no-underline hover:bg-primary/50"
            >
              Reset Your Password
            </Button>
          </Section>

          <Text className="text-gray-700 leading-6 px-4">
            This password reset link is valid for <strong>
              **{expirationMinutes} minutes**
              </strong>. For your security, this link will expire after this time.
          </Text>
          <Text className="text-gray-700 leading-6 px-4">
            If you did not request a password reset, please ignore this email. Your password will remain unchanged.
          </Text>

          <Text className="text-gray-700 leading-6 mt-4 px-4">
            If the button above does not work, copy and paste the following URL into your browser:
            <br />
            <Link href={resetPasswordLink} className="text-primary 
            underline text-sm break-all">
              {resetPasswordLink}
            </Link>
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

export default ForgotPasswordEmail;