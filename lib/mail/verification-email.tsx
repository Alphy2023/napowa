import type * as React from "react"
import { Html, Head, Body, Container, Text, Link, Img, Heading, Section, Button } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

// Define the props interface for your email component
interface VerificationEmailProps {
  userName?: string
  otp: string
  verificationUrl?: string
  companyName: string
  logoUrl?: string
  supportEmail: string
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
  userName,
  otp,
  verificationUrl,
  companyName,
  logoUrl,
  supportEmail,
}) => (
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
            <Heading className="text-3xl font-bold text-gray-800 mt-4">Verify Your Email</Heading>
          </Section>

          <Text className="text-gray-700 leading-6 px-4">
            Hello <span className="font-semibold">{userName}</span>,
          </Text>
          <Text className="text-gray-700 leading-6 px-4">
            Thank you for registering! To complete your account setup, please verify your email address using the
            verification code below:
          </Text>

          <Section className="text-center my-8">
            <div className="bg-gray-100 py-6 px-4 rounded-lg">
              <Text className="text-3xl font-mono tracking-widest font-bold text-primary">{otp}</Text>
              <Text className="text-sm text-gray-500 mt-2">This code will expire in 30 minutes</Text>
            </div>
          </Section>

          {verificationUrl && (
            <Section className="text-center mt-4 mb-4 px-4">
              <Text className="text-gray-700 mb-4">
                Alternatively, you can click the button below to verify your email:
              </Text>
              <Button
                href={verificationUrl}
                className="bg-primary text-white font-bold cursor-pointer py-2 px-3 text-sm rounded-md no-underline hover:bg-primary/50"
              >
                Verify Email Address
              </Button>
            </Section>
          )}

          <Text className="text-gray-700 leading-6 px-4">
            If you did not create an account, please ignore this email or contact our support team.
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

export default VerificationEmail
