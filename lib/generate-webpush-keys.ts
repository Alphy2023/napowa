const webPush = require("web-push");

const vapidKeys = webPush.generateVAPIDKeys();
console.log(vapidKeys);
// Output will be like:
// {
//   publicKey: 'BLa...',
//   privateKey: '3yG...'
// }
