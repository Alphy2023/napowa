import type * as React from "react"
import { Html, Head, Body, Container, Text, Link, Img, Heading, Section, Button } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

// Define the props interface for your email component
interface PasswordResetEmailProps {
  userName?: string
  resetUrl?: string
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({ userName, resetUrl }) => {
  // Get company info from environment variables or use defaults
  const companyName = process.env.COMPANY_NAME || "Our Company"
  const logoUrl = process.env.LOGO_URL || "https://via.placeholder.com/80"
  const supportEmail = process.env.SUPPORT_EMAIL || "support@example.com"

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="my-10 mx-auto p-8 bg-white rounded-lg shadow-lg">
            <Section>
              <div className="napowa-stripes-top"></div>
            </Section>
            <Section className="text-center mb-6">
              {logoUrl && (
                <Img src={logoUrl} width="80" height="80" alt={`${companyName} Logo`} className="mx-auto mb-4" />
              )}
              <Heading className="text-3xl font-bold text-gray-800 mt-4">Password Reset Request</Heading>
            </Section>

            <Text className="text-gray-700 leading-6 px-4">
              Hello <span className="font-semibold">{userName}</span>,
            </Text>
            <Text className="text-gray-700 leading-6 px-4">
              We received a request to reset your password. If you didn't make this request, you can safely ignore this
              email.
            </Text>
            <Text className="text-gray-700 leading-6 px-4">To reset your password, click the button below:</Text>

            <Section className="text-center mt-4 mb-4 px-4">
              <Button
                href={resetUrl}
                className="bg-primary text-white font-bold cursor-pointer py-2 px-3 text-sm rounded-md no-underline hover:bg-primary/50"
              >
                Reset Password
              </Button>
            </Section>

            <Text className="text-gray-700 leading-6 px-4">
              If the button above doesn't work, you can also copy and paste this URL into your browser:
              <br />
              <Link href={resetUrl} className="text-blue-600 underline">
                {resetUrl}
              </Link>
            </Text>
            <Text className="text-gray-700 leading-6 px-4">
              This password reset link will expire in 1 hour for security reasons.
            </Text>

            <Text className="text-gray-600 text-sm mt-8 px-4">
              Best regards,
              <br />
              <strong>The {companyName} Team</strong>
            </Text>
            <Text className="text-gray-500 text-xs mt-4 px-4">
              If you have any questions, please contact our support at{" "}
              <Link href={`mailto:${supportEmail}`} className="text-primary underline">
                {supportEmail}
              </Link>
            </Text>
            <Text className="text-gray-500 text-xs text-center mt-2 px-4">
              &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
            </Text>
            <Section>
              <div className="napowa-stripes-bottom"></div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default PasswordResetEmail
