console.log('Service Worker Loaded...');

self.addEventListener('push', (e) => {
  const data = e.data;
  console.log('Push Recieved...');
  self.registration.showNotification('Notified by R2Ws!', {
    body: "You're registered to get new notifications from R2Ws",
    icon:
      'https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-9/94262218_112321463790130_9162205595116240896_n.png?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=1t1SX6_MrpEAX9nY7Nq&_nc_ht=scontent-hkg4-2.xx&oh=7687cd0355dcfcb0ef20a20a63261df7&oe=60B5DD0D',
  });
});
