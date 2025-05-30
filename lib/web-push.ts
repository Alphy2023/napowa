import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:you@example.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

const sendNotification = async (subscription, dataToSend) => {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(dataToSend));
  } catch (error) {
    console.error("Error sending notification", error);
  }
};
