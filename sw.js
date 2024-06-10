const cacheName = "v1.0.2";
// const cacheAssets = [
//   "index.html",
//   "/assets/css/style.min.css",
//   "/assets/js/main.js",
// ];
// Call Install Event
// self.addEventListener("install", (e) => {
//   console.log("INSTALL");
//   e.waitUntil(
//     caches
//       .open(cacheName)
//       .then((cache) => cache.addAll(cacheAssets))
//       .then(() => self.skipWaiting())
//       .catch((err) => console.log(err))
//   );
// });
// Call Active Event
self.addEventListener("activate", (e) => {
  caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.map((cache) => {
        if (cache !== cacheName) {
          return caches.delete(cache);
        }
      })
    );
  });
});
// Call Fetch Event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request, {cache: "no-store"})
      .then((res) => {
        const resClone = res.clone();
        caches
          .open(cacheName)
          .then((cache) => cache.put(e.request, resClone))
          .catch((err) => console.log("err", err));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
