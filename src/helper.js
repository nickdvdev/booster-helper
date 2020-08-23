module.exports = {
  debug (obj = {}) {
    return JSON.stringify(obj, null, 4); 
  },
  logStart() {
    console.log('Bot has been started...');
  },
  getChatId(msg) {
    return msg.chat.id;
  },
  getName(msg) {
    const firstName = msg.from.first_name || '';
    const lastName = msg.from.last_name || '';
    return [firstName, lastName].join(' ');
  },
  getUserInfo(msg) {
    const userInfo = {
      id: msg.from.id,
      isBot: msg.from.is_bot,
      name: this.getName(msg),
      username: msg.from.username,
      language: msg.from.language_code
    };
    return userInfo;
  }
};
