// emails/AnnouncementEmail.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Text, Link, Img, Heading, Section, Button } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

// Define the props interface for your Announcement email component
interface AnnouncementEmailProps {
  userName?: string; // Optional: Personalize if you have the user's name
  announcementTitle: string; // The main title of the announcement
  announcementDate?: string; // Optional: Date of the announcement, e.g., "June 11, 2025"
  primaryMessage: string; // The main text of the announcement
  ctaText?: string; // Optional: Call-to-action button text
  ctaLink?: string; // Optional: URL for the call-to-action button
  companyName: string;
  supportEmail: string;
  logoUrl: string; // URL for your company logo
}

export const AnnouncementEmail: React.FC<AnnouncementEmailProps> = ({
  userName,
  announcementTitle,
  announcementDate,
  primaryMessage,
  ctaText,
  ctaLink,
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
            <Heading className="text-2xl font-bold text-gray-800">{announcementTitle}</Heading>
            {announcementDate && (
              <Text className="text-sm text-gray-500 mt-1">{announcementDate}</Text>
            )}
          </Section>

          <Text className="text-gray-700 leading-6">
            {userName ? `Hello ${userName},` : 'Hello there,'}
          </Text>
          <Text className="text-gray-700 leading-6">
            We have an important update we'd like to share with you:
          </Text>

          <Section className="my-8 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-md">
            <Text className="text-gray-800 text-base leading-relaxed">
              {primaryMessage}
            </Text>
          </Section>

          {ctaText && ctaLink && (
            <Section className="text-center mt-8 mb-8">
              <Button
                href={ctaLink}
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md no-underline hover:bg-blue-700"
              >
                {ctaText}
              </Button>
            </Section>
          )}

          {ctaText && ctaLink && (
            <Text className="text-gray-700 leading-6 text-center">
              Or copy and paste this link into your browser:
              <br />
              <Link href={ctaLink} className="text-blue-600 underline text-sm break-all">
                {ctaLink}
              </Link>
            </Text>
          )}

          <Text className="text-gray-600 text-sm mt-8">
            Thank you for being a valued member,
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

export default AnnouncementEmail;