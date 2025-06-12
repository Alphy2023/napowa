// await sendEmail({
//   to: user.email,
//   subject: "Welcome to Napowa 🎉",
//   name: user.name,
//   heading: "Welcome",
//   primaryText: "Thanks for signing up!",
//   paragraphs: [
//     "We’re excited to have you on board.",
//     "Feel free to reach out if you have any questions.",
//   ],
// });



// emails/WelcomeEmail.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Text, Link, Img, Heading, Section, Button } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind'; // For easy styling with TailwindCSS classes

// Define the props interface for your email component
interface WelcomeEmailProps {
  userName: string;
  loginUrl: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ userName, loginUrl }) => (
  <Html>
    <Head />
    {/* Tailwind component automatically inlines CSS for email compatibility */}
    <Tailwind>
      <Body className="bg-gray-100 font-sans">
        <Container className="my-10 mx-auto p-8 bg-white rounded-lg shadow-lg">
          <Section className="text-center mb-6">
            <Img
              src="https://example.com/your-logo.png" // IMPORTANT: Replace with your actual logo URL (must be publicly accessible)
              width="100"
              height="100"
              alt="Your Company Logo"
              className="mx-auto"
            />
            <Heading className="text-3xl font-bold text-gray-800 mt-4">Welcome to Our Service!</Heading>
          </Section>

          <Text className="text-gray-700 leading-6">
            Hello <span className="font-semibold">{userName}</span>,
          </Text>
          <Text className="text-gray-700 leading-6">
            Thank you for joining our community! We're excited to have you on board.
          </Text>

          <Section className="text-center mt-8 mb-8">
            <Button
              href={loginUrl}
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md no-underline hover:bg-blue-700"
            >
              Get Started Now!
            </Button>
          </Section>

          <Text className="text-gray-700 leading-6">
            If the button above doesn't work, you can also copy and paste this URL into your browser:
            <br />
            <Link href={loginUrl} className="text-blue-600 underline">
              {loginUrl}
            </Link>
          </Text>

          <Text className="text-gray-600 text-sm mt-8">
            Best regards,
            <br />
            The Your Company Team
          </Text>
          <Text className="text-gray-500 text-xs mt-4">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default WelcomeEmail;