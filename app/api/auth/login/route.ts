import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import axios from "axios";
import { UAParser } from "ua-parser-js";
import { generateOtp } from "@/utils/generateOtp";


// Get public IP using external service
async function getPublicIP(): Promise<string | null> {
  try {
    const response = await axios.get("https://api64.ipify.org?format=json");
    return response.data.ip;
  } catch {
    return null;
  }
}

// Extract IP and location from the request
async function getLocationFromRequest(req: Request) {
  const rawUserAgent = req.headers.get("user-agent") || "unknown device";

  // Parse user agent to readable device string
  const device = getReadableDevice(rawUserAgent);

  let ip = (req.headers.get("x-forwarded-for")?.split(",")[0].trim()) || null;

  // If IP is local, replace with public IP
  if (
    !ip ||
    ip.startsWith("::1") ||
    ip.startsWith("127.") ||
    ip.startsWith("192.") ||
    ip.startsWith("::ffff:127.")
  ) {
    ip = await getPublicIP();
  }

  if (!ip) {
    return {
      ip: "Unknown",
      city: "Unknown",
      region: "Unknown",
      country: "Unknown",
      countryName: "Unknown",
      loc: "Unknown",
      timezone: "Unknown",
      device,
    };
  }

  try {
    const response = await axios.get(`https://ipwho.is/${ip}`);
    const data = response.data;

    return {
      ip,
      city: data.city || "Unknown",
      region: data.continent || "Unknown",
      countryName: data.country || "Unknown",
      country: data.country_code || "Unknown",
      loc:
        data.latitude && data.longitude
          ? { latitude: data.latitude, longitude: data.longitude }
          : "Unknown",
      timezone: data.timezone?.id || "Unknown",
      device,
    };
  } catch (error) {
    console.error("Failed to fetch location:", error);
    return {
      ip,
      city: "Unknown",
      region: "Unknown",
      country: "Unknown",
      countryName: "Unknown",
      loc: "Unknown",
      timezone: "Unknown",
      device,
    };
  }
}

function getReadableDevice(userAgentString: string) {
  const parser = new UAParser(userAgentString);
  const browser = parser.getBrowser(); // { name, version }
  const os = parser.getOS(); // { name, version }
  const device = parser.getDevice(); // { model, type, vendor }

  let osName = os.name || "Unknown OS";
  let osVersion = os.version ? ` ${os.version}` : "";
  let browserName = browser.name || "Unknown Browser";

  let deviceType = device.type ? ` (${device.type})` : "";

  return `${browserName} on ${osName}${osVersion}${deviceType}`;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  if (user?.twoFactorEnabled) {
    const otp = generateOtp(); // 6-digit code
    await sendOtpToEmail(user.email, otp);
    await storeOtpInDBOrCache(user.id, otp); // e.g., Redis or Prisma Session

    return NextResponse.json({
      message: "Two-factor authentication required",
      twoFactorRequired: true,
      userId: user.id,
    }, { status: 202 });
  }

  // Get detailed device and location info
  const sessionData = await getLocationFromRequest(req);

  // Store session info in DB
  await prisma.session.create({
    data: {
      userId: user.id,
      device: sessionData.device,  // <-- nice readable device info here
      ip: sessionData.ip,
      location: JSON.stringify({
        city: sessionData.city,
        region: sessionData.region,
        country: sessionData.country,
        countryName: sessionData.countryName,
        loc: sessionData.loc,
        timezone: sessionData.timezone,
      }),
      isActive: true,
    },
  });

  const token = await encode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: {
      sub: user.id,
      email: user.email,
    },
  });

  return NextResponse.json(
    {
      message: "Welcome back. You are now logged in.",
      data: {
        token,
      },
    },
    { status: 201 }
  );
}
