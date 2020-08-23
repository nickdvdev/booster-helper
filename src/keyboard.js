const kb = require('./keyboard-buttons')
const actions = require('./actions');

module.exports = {
  games: [
      [
        {
          text: 'Counter-Strike: Global Offensive',
          callback_data: JSON.stringify({
            type: actions.game.cs,
            game: 'Counter-Strike: Global Offensive'
          })
        }
      ],
      [
        {
          text: 'Dota 2',
          callback_data: JSON.stringify({
            type: actions.game.dota,
            game: 'Dota 2'
          })
        }
      ],
      [
        {
          text: 'League of Legends',
          callback_data: JSON.stringify({
            type: actions.game.lol,
            game: 'League of Legends'
          })
        }
      ]
    ],
  startTiers: [
    [
      {
        text: 'Diamond',
        callback_data: JSON.stringify({
          type: actions.startTiers.diamond,
          tier: 'Diamond'
        })
      }
    ],
    [
      {
        text: 'Iron',
        callback_data: JSON.stringify({
          type: actions.startTiers.iron,
          tier: 'Iron'
        })
      }
    ],
    [
      {
        text: 'Bronze',
        callback_data: JSON.stringify({
          type: actions.startTiers.bronze,
          tier: 'Bronze'
        })
      }
    ]
  ],
  endTiers: [
    [
      {
        text: 'Diamond',
        callback_data: JSON.stringify({
          type: actions.endTiers.diamond,
          tier: 'Diamond'
        })
      }
    ],
    [
      {
        text: 'Iron',
        callback_data: JSON.stringify({
          type: actions.endTiers.iron,
          tier: 'Iron'
        })
      }
    ],
    [
      {
        text: 'Bronze',
        callback_data: JSON.stringify({
          type: actions.endTiers.bronze,
          tier: 'Bronze'
        })
      }
    ]
  ],
  servers: [
    [
      {
        text: 'Europe',
        callback_data: JSON.stringify({
          type: actions.server.europe,
          server: 'Europe'
        })
      }
    ],
    [
      {
        text: 'USA',
        callback_data: JSON.stringify({
          type: actions.server.usa,
          server: 'USA'
        })
      }
    ],
    [
      {
        text: 'Asia',
        callback_data: JSON.stringify({
          type: actions.server.asia,
          server: 'Asia'
        })
      }
    ]
  ]
  //THESE ARE FOR STANDARD KEYBOARD
  // games: [
  //   [kb.games.cs],
  //   [kb.games.dota],
  //   [kb.games.lol]
  // ],
  // tier: [
  //   [kb.tier.diamond],
  //   [kb.tier.iron],
  //   [kb.tier.bronze],
  //   [kb.back]
  // ],
  // server: [
  //   [kb.server.eu],
  //   [kb.server.us],
  //   [kb.server.ru],
  //   [kb.server.jp],
  //   [kb.back]
  // ]
}