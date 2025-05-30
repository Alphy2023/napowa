// self.addEventListener("push", (event) => {
//   const data = event.data.json()
//   self.registration.showNotification(data.title, {
//     body: data.body,
//     icon: "/icons/icon-192x192.png",
//   })
// })

self.addEventListener("push", function (event) {
  const data = event.data?.json() || {}
  const title = data.title || "Notification"
  const options = {
    body: data.body,
    icon: "/icon.png",
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

