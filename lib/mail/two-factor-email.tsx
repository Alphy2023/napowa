import type * as React from "react"
import { Html, Head, Body, Container, Text, Link, Img, Heading, Section, Hr } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

// Define the props interface for your email component
interface TwoFactorEmailProps {
  userName?: string
  twoFactorCode: string
  companyName: string
  logoUrl?: string
  supportEmail: string
}

export const TwoFactorEmail: React.FC<TwoFactorEmailProps> = ({
  userName,
  twoFactorCode,
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
            <Heading className="text-3xl font-bold text-gray-800 mt-4">Two-Factor Authentication</Heading>
          </Section>

          <Text className="text-gray-700 leading-6 px-4">
            Hello <span className="font-semibold">{userName}</span>,
          </Text>
          <Text className="text-gray-700 leading-6 px-4">
            You are receiving this email because you are attempting to log in to your account. To complete the login
            process, please use the following verification code:
          </Text>

          <Section className="text-center my-8">
            <div className="bg-gray-100 py-6 px-4 rounded-lg">
              <Text className="text-3xl font-mono tracking-widest font-bold text-primary">{twoFactorCode}</Text>
              <Text className="text-sm text-gray-500 mt-2">This code will expire in 10 minutes</Text>
            </div>
          </Section>

          <Hr className="border-gray-200 my-6" />

          <Text className="text-gray-700 leading-6 px-4">
            If you did not attempt to log in, please secure your account by changing your password immediately and
            contact our support team.
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

export default TwoFactorEmail
