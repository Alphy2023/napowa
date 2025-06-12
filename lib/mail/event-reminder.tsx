// emails/EventReminderEmail.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Text, Link, Img, Heading, Section, Button } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

// Define the props interface for your Event Reminder email component
interface EventReminderEmailProps {
  userName?: string; // Optional: Personalize if you have the user's name
  eventName: string;
  eventDate: string; // E.g., "Saturday, July 20, 2025"
  eventTime: string; // E.g., "2:00 PM - 4:00 PM EAT"
  eventLocation: string; // E.g., "Online via Zoom", "Conference Hall, City Center"
  eventDescription: string; // A brief overview of the event
  eventLink: string; // URL to the event's page for more details / RSVP
  companyName: string;
  supportEmail: string;
  logoUrl: string; // URL for your company logo
  organizer?: string; // Optional: If a specific person/department organizes
}

export const EventReminderEmail: React.FC<EventReminderEmailProps> = ({
  userName,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  eventDescription,
  eventLink,
  companyName,
  supportEmail,
  logoUrl,
  organizer,
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
            <Heading className="text-2xl font-bold text-gray-800">Upcoming Event: {eventName}</Heading>
          </Section>

          <Text className="text-gray-700 leading-6">
            {userName ? `Hello ${userName},` : 'Hello there,'}
          </Text>
          <Text className="text-gray-700 leading-6">
            We're excited to invite you to our upcoming event! Here are the details:
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
              **About the Event:** {eventDescription}
            </Text>
          </Section>

          <Section className="text-center my-8">
            <Button
              href={eventLink}
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md no-underline hover:bg-blue-700"
            >
              View Event Details & RSVP
            </Button>
          </Section>

          <Text className="text-gray-700 leading-6 text-center">
            Or copy and paste this link into your browser:
            <br />
            <Link href={eventLink} className="text-blue-600 underline text-sm break-all">
              {eventLink}
            </Link>
          </Text>

          <Text className="text-gray-600 text-sm mt-8">
            We hope to see you there!
          </Text>
          <Text className="text-gray-600 text-sm">
            Best regards,
            <br />
            {organizer ? `${organizer} from the ` : ''}The {companyName} Team
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

export default EventReminderEmail;