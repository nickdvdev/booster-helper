const TelegramBot = require('node-telegram-bot-api');
const helper = require('./helper');
const keyboard = require('./keyboard');
const { getChatId } = require('./helper');
let userInfo;
let chatId;
const credentials = {
  login: '',
  password: ''
};

const order = {
  game: '',
  startTier: '',
  endTier: '',
  server: '',
  points: ''
};

const bot = new TelegramBot (config.TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});
helper.logStart();
//=================================================================================

bot.on('callback_query', query => {
  let data;
  try {
    data = JSON.parse(query.data);
  } catch (e) {
    throw new Error ('Data is not an object');
  }
  const { type } = data;
  switch (type) {
    case 'lol':
    case 'dota':
    case 'cs':
      order.game = data.game;
      askStartTear('Which tier are you currently on?');
      break;
    case 'start-diamond':
    case 'start-iron':
    case 'start-bronze':
      order.startTier = data.tier;
      askEndTear('Which tier are we going to boost you to?');
      break;
    case 'end-diamond':
    case 'end-iron':
    case 'end-bronze':
      order.endTier = data.tier;
      askServer('Which server are you playing on?');
      break;
    case 'europe':
    case 'usa':
    case 'asia':
      order.server = data.server;
      bot.sendMessage(chatId, `Please, enter amount of points lost/gain per victory after '/points', like so:\n/points 10/20\nWhere '10' - points lost per losing a match and '20' - points gained per victory`);
      break;
  };
});

bot.onText(/\/start/, msg => {
  const text = `Hi, ${helper.getName(msg)}!\nWhat are we boosting?`;
  userInfo = helper.getUserInfo(msg);
  chatId = getChatId(msg);
  bot.sendMessage(chatId, text, {
    reply_markup: {
      inline_keyboard: keyboard.games
    }
  });
});

bot.onText(/\/login (.+)/, function getLogin(msg, match) {
  credentials.login = match[1];
  bot.sendMessage(chatId, `Your login '${match[1]}' is saved!`);
  bot.sendMessage(chatId, `Now enter your password after '/password', please`);
});

bot.onText(/\/password (.+)/, function getPassword(msg, match) {
  credentials.password = match[1];
  bot.sendMessage(chatId, `Your password '${match[1]}' is saved!`);
  bot.sendMessage(chatId, `Congratulations!\nYour order is successfully placed!`);
  sendOrder(userInfo, order);
});

bot.onText(/\/points (.+)/, function getPoints(msg, match) {
  order.points = match[1];
  bot.sendMessage(chatId, `Info about points '${match[1]}' is saved!`);
  bot.sendMessage(chatId, `Please, enter login to your account after '/login', like so:\n/login test@email.com`);
});

function askStartTear (question) {
  bot.sendMessage(chatId, question, {
    reply_markup: {
      inline_keyboard: keyboard.startTiers
    }
  });
};

function askEndTear (question) {
  bot.sendMessage(chatId, question, {
    reply_markup: {
      inline_keyboard: keyboard.endTiers
    }
  });
};

function askServer (question) {
  bot.sendMessage(chatId, question, {
    reply_markup: {
      inline_keyboard: keyboard.servers
    }
  });
};

// bot.on('message', msg => {
//   const chatId = getChatId(msg);
//   const userInfo = {
//     id: msg.from.id,
//     isBot: msg.from.is_bot,
//     firstName: msg.from.first_name,
//     lastName: msg.from.last_name,
//     username: msg.from.username,
//     language: msg.from.language_code
//   };


//   switch (msg.text) {
//     //games 
//     case kb.games.cs:
//       order.game = kb.games.cs;
//     case kb.games.dota:
//       order.game = kb.games.dota;
//     case kb.games.lol:
//       order.game = kb.games.lol;
//       bot.sendMessage(chatId, `Which tier are you currently on ${msg.from.first_name}?`, {
//         reply_markup: {
//           keyboard: keyboard.tier
//         }
//       })
//       break
//     // startTier 
//     case kb.tier.diamond:
//       break
//     case kb.tier.iron:
//       break
//     case kb.tier.bronze:
//       break
//     //back button
//     case kb.back:
//       bot.sendMessage(chatId, `Hi, ${msg.from.first_name} ${msg.from.last_name}!\nWhat are we boosting?`, {
//         reply_markup: {
//           keyboard: keyboard.games
//         }
//       })
//       break
//   }
// });


//==============================================================
function sendOrder(user, order) {
  const orderInfo = `New order has been placed!
===================
USER INFO
Name: ${user.name}
Username: @${user.username}
Language: ${user.language}
===================
ORDER INFO
Game: ${order.game}
Current Tier: ${order.startTier}
Desired Tier: ${order.endTier}
Server: ${order.server}
Points: ${order.points}
===================
CREDENTIALS
Login: ${credentials.login}
Password: ${credentials.password}
`;
  bot.sendMessage(config.boosterAdmins, orderInfo, {
  });
};
