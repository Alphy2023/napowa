// emails/EventTicketEmail.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Text, Link, Img, Heading, Section } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface EventTicketEmailProps {
  attendeeName: string; // The registrant's full name
  eventName: string;
  eventDate: string; // E.g., "Saturday, July 20, 2025"
  eventTime: string; // E.g., "2:00 PM - 4:00 PM EAT"
  eventLocation: string; // E.g., "Online via Zoom", "Conference Hall, City Center"
  ticketId: string; // The unique ticket ID
  qrCodeImageUrl: string; // Base64 encoded image or a publicly accessible URL for the QR code
  eventLink: string; // Link to the event's page for more details
  companyName: string;
  supportEmail: string;
  logoUrl: string; // URL for your company logo
}

export const EventTicketEmail: React.FC<EventTicketEmailProps> = ({
  attendeeName,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  ticketId,
  qrCodeImageUrl,
  eventLink,
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
            <Heading className="text-2xl font-bold text-gray-800">Your Event Ticket for {eventName}</Heading>
            <Text className="text-sm text-gray-500 mt-1">Ticket ID: <span className="font-semibold">{ticketId}</span></Text>
          </Section>

          <Text className="text-gray-700 leading-6">
            Hello <span className="font-semibold">{attendeeName}</span>,
          </Text>
          <Text className="text-gray-700 leading-6">
            Thank you for registering for **{eventName}**! Your ticket is confirmed and details are below.
          </Text>

          <Section className="my-6 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-md">
            <Text className="text-gray-800 text-lg font-semibold mb-2">
              Event: {eventName}
            </Text>
            <Text className="text-gray-700 mb-1">
              <span className="font-medium">Date:</span> {eventDate}
            </Text>
            <Text className="text-gray-700 mb-1">
              <span className="font-medium">Time:</span> {eventTime}
            </Text>
            <Text className="text-gray-700 mb-1">
              <span className="font-medium">Location:</span> {eventLocation}
            </Text>
            <Text className="text-gray-700 mt-4 leading-relaxed">
              **Important:** Please have your QR code ready for scanning at the event entrance.
            </Text>
          </Section>

          <Section className="text-center my-8">
            <Text className="text-lg font-bold text-gray-800">Your QR Code:</Text>
            <Img
              src={qrCodeImageUrl} // This will be a base64 string or public URL
              width="200"
              height="200"
              alt="QR Code"
              className="mx-auto mt-4 border border-gray-300 p-2"
            />
            <Text className="text-sm text-gray-600 mt-2">
              Scan this at the entrance for quick access.
            </Text>
          </Section>

          <Text className="text-gray-700 leading-6 text-center">
            For more details about the event, visit:
            <br />
            <Link href={eventLink} className="text-blue-600 underline text-sm break-all">
              {eventLink}
            </Link>
          </Text>

          <Text className="text-gray-600 text-sm mt-8">
            We look forward to seeing you there!
          </Text>
          <Text className="text-gray-600 text-sm">
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

export default EventTicketEmail;