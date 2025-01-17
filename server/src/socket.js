const socket = require('socket.io');

module.exports.socket = (server) => {
  const io = socket(server, {
    cors: {
      origin: '*',
    },
  });

  let socketsConnected = new Set();

  function onConnected(sk) {
    console.log('Socket connected: ', sk.id);
    socketsConnected.add({ skId: sk.id, userId: '' });
    console.log(socketsConnected);

    sk.on('disconnect', () => {
      console.log('Socket disconnected: ', sk.id);
      socketsConnected.forEach((conn) => {
        if (conn.skId == sk.id) {
          socketsConnected.delete(conn);
        }
      });
    });

    // update userId
    sk.on('update-user-id', (userId) => {
      console.log('Update user id: ', sk.id);
      socketsConnected.forEach((conn) => {
        if (conn.skId == sk.id) {
          socketsConnected.delete(conn);
        }
      });
      socketsConnected.add({ skId: sk.id, userId });
      console.log(socketsConnected);
    });

    try {
      sk.on('typingMessage', ({ receiver }) => {
        console.log('typing from: ', sk.id);
        let sen = null;
        let rev = null;
        socketsConnected.forEach((conn) => {
          if (conn.skId == sk.id) {
            sen = conn;
          }
          if (conn.userId == receiver) {
            rev = conn;
          }
        });
        sk.to(rev?.skId || '').emit('server-res-typingMessage', sen?.userId || '');
      });

      sk.on('stopTypingMessage', ({ receiver }) => {
        console.log('stop typing from: ', sk.id);
        let sen = null;
        let rev = null;
        socketsConnected.forEach((conn) => {
          if (conn.skId == sk.id) {
            sen = conn;
          }
          if (conn.userId == receiver) {
            rev = conn;
          }
        });
        sk.to(rev?.skId || '').emit('server-res-stopTypingMessage', sen?.userId || '');
      });

      // 1 vs 1 message
      sk.on('new-1-1-msg', ({ receiver, data }) => {
        console.log('New message from: ', sk.id);
        let sen = null;
        let rev = null;
        socketsConnected.forEach((conn) => {
          if (conn.skId == sk.id) {
            sen = conn;
          }
          if (conn.userId == receiver) {
            rev = conn;
          }
        });
        sk.to(rev?.skId || '').emit('server-res-1-1-msg', sen?.userId || '');
      });
    } catch (error) {
      console.log({ error });
    }
  }

  io.on('connection', onConnected);
};
