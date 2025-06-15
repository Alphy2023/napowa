/**
 * Generates a random OTP (One-Time Password) of specified length
 * @param length The length of the OTP to generate (default: 6)
 * @returns A string containing the generated OTP
 */
export function generateOTP(length = 6): string {
  const digits = "0123456789"
  let otp = ""

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)]
  }

  return otp
}

/**
 * Validates if the provided OTP matches the expected OTP
 * @param providedOTP The OTP provided by the user
 * @param expectedOTP The expected OTP to match against
 * @returns Boolean indicating if the OTPs match
 */
export function validateOTP(providedOTP: string, expectedOTP: string): boolean {
  return providedOTP === expectedOTP
}
