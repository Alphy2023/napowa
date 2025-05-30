import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

import webPush from "web-push"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
    const keys = webPush.generateVAPIDKeys()
    console.log(keys)
    return;
//   const { endpoint, keys } = req.body;
//   const userId = req.user?.id; // Or however you get user info

//   if (!endpoint || !keys || !userId) {
//     return res.status(400).json({ error: "Invalid request" });
//   }

//   await prisma.pushSubscription.upsert({
//     where: { endpoint },
//     update: { keys, userId },
//     create: { endpoint, keys, userId },
//   });

//   return res.status(200).json({ success: true });
}
