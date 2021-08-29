const Discord = require('discord.js');
const messageCache = [];
const fetch = require('node-fetch');

module.exports = {


  variables: require('./variables.js'),

  EmbedColors: { Default: "#0390fc", Error: "#f52c2c", Success: "#25de1f" },
  BotVersion: "Pepe: 1.4.2",












  SlashCommandData: [

    //Context Menus
    { name: 'Userinfo', type: 'USER' },


    //Slash Commands
    {
      name: 'automod',
      description: 'Setup all Auto Moderation Features',
    },
    {
      name: 'rolldice',
      description: 'Role a dice',
    },
    {
      name: 'penis',
      description: '(NSFW) - Get an penis picture or gif',
    },
    {
      name: 'anal',
      description: '(NSFW) - Get an anal picture or gif',
    },
    {
      name: 'boobs',
      description: '(NSFW) - Get an boob picture or gif',
    },
    {
      name: 'pussy',
      description: '(NSFW) - Get an pussy picture or gif',
    },
    {
      name: 'oral',
      description: '(NSFW) - Get an oral picture or gif',
    },
    {
      name: 'ticket-manager',
      description: 'Open the setup manager for the ticket system',
    },
    {
      name: 'dashboard',
      description: 'Link to the configuration web-page',
    },
    {
      name: 'help',
      description: 'Get the help menu',
    },
    {
      name: 'ping',
      description: 'Check latency of Pepe!',
    },
    {
      name: 'verify',
      description: 'Send the configured Verification Message (Configure on the dashboard)',
    },
    {
      name: 'usercount',
      description: 'Check, how many users are on your server',
    },
    {
      name: 'encode',
      description: 'Encode an string into binary',
      options: [{
        name: 'encodestr',
        type: 'STRING',
        description: 'Your string, which should be encoded',
        required: true,
      }],
    },
    {
      name: 'lg',
      description: 'Leave an guild',
      options: [{
        name: 'gid',
        type: 'STRING',
        description: 'Guild ID',
        required: true,
      }],
    },
    {
      name: 'decode',
      description: 'Decode an binary string to an readable string',
      options: [{
        name: 'decodestr',
        type: 'STRING',
        description: 'Your binary string',
        required: true,
      }],
    },
    {
      name: 'covidstats',
      description: 'Get current Covid Statistics',
      options: [{
        name: 'country',
        type: 'STRING',
        description: 'Country for Covid Stats',
        required: false,
      }],
    },


    {
      name: 'addemoji',
      description: 'Add Emojis from other guilds, to your guild',
      options: [{
        name: 'emoji',
        type: 'STRING',
        description: 'Emoji you want',
        required: true,
      }],
    },



    {
      name: 'mcuser',
      description: 'Get information about someone`s minecraft account',
      options: [{
        name: 'mcuser',
        type: 'STRING',
        description: 'Minecraft Account Name',
        required: true,
      }],
    },


    {
      name: 'meme',
      description: 'Generate an meme',
      options: [{
        name: 'subred',
        type: 'STRING',
        description: 'Custom subreddit',
        required: false,
      }],
    },


    {
      name: 'say',
      description: 'Say an custom embed message',
      options: [{
        name: 'msg',
        type: 'STRING',
        description: 'Your message',
        required: true,
      }],
    },




    {
      name: 'rockpaperscissors',
      description: 'Play RPS!',
      options: [{
        name: 'try',
        type: 'STRING',
        description: 'Your try',
        required: true,
        choices: [
          {
            name: 'rock',
            value: 'rock',
          },
          {
            name: 'paper',
            value: 'paper',
          },
          {
            name: 'scissors',
            value: 'scissors',
          },
        ],
      }],
    },




    {
      name: 'weather',
      description: 'Get weather from your location',
      options: [{
        name: 'location',
        type: 'STRING',
        description: 'Location, from where you want to check the current weather',
        required: true,
      }],
    },


    {
      name: 'avatar',
      description: 'Get someones avatar/profile picture',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'User, from which you want to recieve the avatar',
        required: true,
      }],
    },



    {
      name: 'invites',
      description: 'Check, how many invites somehave have in your guild',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'User, from which you want to check',
        required: false,
      }],
    },


    {
      name: 'invitetop',
      description: 'Check, the invite leaderboard',
      options: [{
        name: 'page',
        type: 'INTEGER',
        description: 'Invite Top - Page',
        required: false,
      }],
    },


    {
      name: 'go',
      description: 'Get an overview over all guilds',
      options: [{
        name: 'page',
        type: 'INTEGER',
        description: 'GO - Page',
        required: true,
      }],
    },


    {
      name: 'google',
      description: 'Ask google for smth',
      options: [{
        name: 'search',
        type: 'STRING',
        description: 'Your search input',
        required: true,
      }],
    },


    
    {
      name: 'asciiart',
      description: 'Draw your text into ASCII Art',
      options: [{
        name: 'text',
        type: 'STRING',
        description: 'Your text / word',
        required: true,
      }],
    },



    {
      name: 'topic',
      description: 'Set topic of your current channel',
      options: [{
        name: 'topic',
        type: 'STRING',
        description: 'Your custom topic',
        required: true,
      }],
    },

    {
      name: 'uptime',
      description: 'Check pepe`s uptime',
    },

    {
      name: 'gcreate',
      description: 'Create an new Giveaway',
    },
    {
      name: 'botinfo',
      description: 'Get information about Pepe',
    },
    {
      name: 'gdelete',
      description: 'Delete an Giveaway',
      options: [{
        name: 'giveawaymessageid',
        type: 'STRING',
        description: 'Enter here the message id of the giveaway',
        required: true,
      }],
    },
    {
      name: 'greroll',
      description: 'Reroll an Giveaway',
      options: [{
        name: 'giveawaymessageid',
        type: 'STRING',
        description: 'Enter here the message id of the giveaway',
        required: true,
      },
      ],

    },
    {
      name: 'gstop',
      description: 'Stop an Giveaway',
      options: [{
        name: 'giveawaymessageid',
        type: 'STRING',
        description: 'Enter here the message id of the giveaway',
        required: true,
      },
      ],

    },
    {
      name: 'glist',
      description: 'List all Giveaway',
      options: [{
        name: 'page',
        type: 'INTEGER',
        description: 'Giveaway List - Page',
        required: false,
      }],
    },
    {
      name: 'ban-list',
      description: 'List all bans on your guild',
      options: [{
        name: 'page',
        type: 'INTEGER',
        description: 'Page for ban list',
        required: false,
      }],
    },
    {
      name: 'clear',
      description: 'Delete messages from an channel',
      options: [{
        name: 'messageamount',
        type: 'INTEGER',
        description: 'Amount, how many messages should be deleted',
        required: true,
      },
      {
        name: 'channel',
        type: 'CHANNEL',
        description: 'Channel for the message delete',
        required: false,
      },
      ],
    },
    {
      name: 'tban',
      description: 'Ban/Unban User from opening tickets',
      options: [{
        name: 'banuser',
        type: 'USER',
        description: 'User, which should be banned/unbanned',
        required: true,
      }],

    },

    {
      name: 'unban',
      description: 'Unban an user from your guild',
      options: [{
        name: 'user',
        type: 'STRING',
        description: 'ID of the user, which should be unbanned',
        required: true,
      }],

    },

    // {
    // 	name: 'play',
    // 	description: 'Plays a song',
    // 	options: [
    // 		{
    // 			name: 'song',
    // 			type: 'STRING',
    // 			description: 'The URL of the song to play',
    // 			required: true,
    // 		},
    // 	],
    // },




    {
      name: "slowmode",
      description: "Get or edit permissions for a user or a role",
      options: [
        {
          name: "toggle",
          description: "Get or edit permissions for a user",
          type: "SUB_COMMAND_GROUP",
          options: [
            {
              name: "off",
              description: "Toggle off slowmode in your current channel",
              type: "SUB_COMMAND",
            },
            {
              name: "on",
              description: "Toggle on slowmode in your current channel",
              type: "SUB_COMMAND",
              options: [
                {
                  name: "time",
                  description: "The time from how many seconds a user is allowed to write again. Answer in seconds",
                  type: "INTEGER",
                  required: true
                }
              ]
            }
          ]
        }]
    },

    {
      name: 'new',
      description: 'Create an Ticket',
      options: [{
        name: 'reason',
        type: 'STRING',
        description: 'Reason for ticket',
        required: false,
      }],
    },
    {
      name: 'music-play',
      description: 'Play an new Song',
      options: [{
        name: 'song',
        type: 'STRING',
        description: 'Song URL',
        required: true,
      }],
    },
    {
      name: 'music-pause',
      description: 'Pause current Song'
    },
    {
      name: 'music-filter',
      description: 'Manage all music filters'
    },
    {
      name: 'music-resume',
      description: 'Resume current Song'
    },
    {
      name: 'music-volume',
      description: 'Set new volume for song',
      options: [{
        name: 'volume',
        type: 'INTEGER',
        description: 'Volume',
        required: true,
      }],
    },
    {
      name: 'music-stop',
      description: 'Stop playing music',
    },
    {
      name: 'music-skip',
      description: 'Skip current song',
    },
    {
      name: 'music-queue',
      description: 'Show current queue',
    },
    {
      name: 'add',
      description: 'Add an new user to the ticket',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'The User, to add',
        required: true,
      }],

    },
    {
      name: 'remove',
      description: 'Remove a user from the ticket',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'The User, to remove',
        required: true,
      }],

    },
    {
      name: 'close',
      description: 'Close ticket',
      options: [{
        name: 'reason',
        type: 'STRING',
        description: 'Reason for ticket close',
        required: false,
      }],
    },
    {
      name: 'closeall',
      description: 'Close all tickets',
      options: [{
        name: 'reason',
        type: 'STRING',
        description: 'Reason for complete ticket close',
        required: false,
      }],
    },
    {
      name: 'counting-game',
      description: 'Create an new Counting Game',
      options: [{
        name: 'channel',
        type: 'CHANNEL',
        description: 'The Channel, to send the message',
        required: true,
      }],

    },
    {
      name: 'lock',
      description: 'Lock your current channel',
    },

    {
      name: 'unlock',
      description: 'Unlock your current channel',
    },

    {
      name: 'history',
      description: 'Check punishment history of an user',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'User, which should be checked',
        required: true,
      },
      {
        name: 'page',
        type: 'INTEGER',
        description: 'Page of history',
        required: false,
      }]
    },


    {
      name: 'ban',
      description: 'Ban an user from your guild',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'User, which should be banned',
        required: true,
      },
      {
        name: 'reason',
        type: 'STRING',
        description: 'Reason, for the ban',
        required: true,
      },
      {
        name: 'silent',
        type: 'BOOLEAN',
        description: 'Toggle if your ban should be silent (DM to the user)',
        required: true,
      }],

    },


    {
      name: 'tictactoe',
      description: 'Play an tictactoe game',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'User you want to fight with',
        required: true,
      },],
    },


    {
      name: 'profile',
      description: 'Check your or someone`s profile',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'User which should be requested',
        required: false,
      },],
    },



    {
      name: 'tempban',
      description: 'Tempban an user from your guild',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'User, which should be tempbanned',
        required: true,
      },
      {
        name: 'reason',
        type: 'STRING',
        description: 'Reason, for the ban',
        required: true,
      },
      {
        name: 'time',
        type: 'STRING',
        description: 'String, how long the user should be banned: Ex: 1m, 1h, 1d',
        required: true,
      }],

    },


    {
      name: 'userinfo',
      description: 'Check all information from your selected user',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'User, which should be checked',
        required: true,
      }],
    },

    {
      name: 'serverinfo',
      description: 'Get information about your current guild!',
    },

    {
      name: 'roleinfo',
      description: 'Check all information from your selected role',
      options: [{
        name: 'role',
        type: 'ROLE',
        description: 'Role, which should be checked',
        required: true,
      }],
    },


    {
      name: 'warn',
      description: 'warn an user from your guild',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'User, which should be warned',
        required: true,
      },

      {
        name: 'reason',
        type: 'STRING',
        description: 'Reason, for the ban',
        required: true,
      }],

    },


    {
      name: 'warncount',
      description: 'Check how much bans somebody have',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'User, which should be checked',
        required: true,
      }],

    },




    {
      name: 'kick',
      description: 'Kick an user from your guild',
      options: [{
        name: 'user',
        type: 'USER',
        description: 'User, which should be kicked',
        required: true,
      },
      {
        name: 'reason',
        type: 'STRING',
        description: 'Reason, for the kick',
        required: true,
      },
      {
        name: 'silent',
        type: 'BOOLEAN',
        description: 'Toggle if your kick should be silent (DM to the user)',
        required: true,
      }],

    },

  ],



  ErrorHook: async function(message)
  {
    await fetch(
      'error-discord-webhook',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          embeds: [
            {
              avatar_url: 'https://cdn.discordapp.com/avatars/870055161123450891/b8cdd2a522e0212bafe4793e28663f12.webp?size=2048',
              color: 16067628,
              timestamp: new Date(),
              author: {
                name: 'Pepe - Error Manager',
                icon_url: 'https://cdn.discordapp.com/avatars/870055161123450891/b8cdd2a522e0212bafe4793e28663f12.webp?size=2048',
              },
              description: `${message}`,
            },
          ],
        }),
      }
    );
  },


  checkBan: async function (guild, user) {
    return !!(await guild.bans.fetch()).find(b => b.user.id == user);
  },



  DDHHMMSSfromMS(ms) {
    let secs = ms / 1000
    const days = ~~(secs / 86400);
    secs -= days * 86400;
    const hours = ~~(secs / 3600);
    secs -= hours * 3600;
    const minutes = ~~(secs / 60);
    secs -= minutes * 60;
    let total = [];

    if (days > 0)
      total.push(~~days + " days");
    if (hours > 0)
      total.push(~~hours + " hrs")
    if (minutes > 0)
      total.push(~~minutes + " mins")
    if (secs > 0)
      total.push(~~secs + " secs")
    if ([~~days, ~~hours, ~~minutes, ~~secs].every(time => time == 0)) total.push("0 secs");
    return total.join(", ");
  },


  getEmoji: function (number) {
    if (number == 1) return "\u0031\u20E3";
    if (number == 2) return "\u0032\u20E3";
    if (number == 3) return "\u0033\u20E3";
    if (number == 4) return "\u0034\u20E3";
    if (number == 5) return "\u0035\u20E3";
    if (number == 6) return "\u0036\u20E3";
    if (number == 7) return "\u0037\u20E3";
    if (number == 8) return "\u0038\u20E3";
    if (number == 9) return "\u0039\u20E3";
    if (number == 10) return "\uD83D\uDD1F";
  },


  addPunishment: function (data) {
    return new Promise((resolve, reject) => {
      if (['type', 'user', 'tag', 'reason', 'time', 'executor'].some(a => !data[a])) return reject('Invalid arguments!');





      this.variables.client.dbconnection.query('INSERT INTO punishments(type, user, tag, reason, time, executor, length, guild) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [data.type, data.user, data.tag, data.reason, data.time, data.executor, data.length, data.guild], (err) => {
        if (err) reject(err);
        else resolve();
      })

    })
  },
  removePunishment: function (id) {
    return new Promise((resolve, reject) => {


      this.variables.client.dbconnection.query('DELETE FROM punishments WHERE id=?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      })

    })
  },
  addWarning: function (data) {
    return new Promise((resolve, reject) => {
      if (['user', 'tag', 'reason', 'time', 'executor'].some(a => !data[a])) return reject('Invalid arguments!');


      this.variables.client.dbconnection.query('INSERT INTO warnings(user, tag, reason, time, executor) VALUES(?, ?, ?, ?, ?)', [data.user, data.tag, data.reason, data.time, data.executor], (err) => {
        if (err) reject(err);
        else resolve();
      })

    })
  },
  removeWarning: function (id) {
    return new Promise((resolve, reject) => {

      this.variables.client.dbconnection.query('DELETE FROM warnings WHERE id=?', [id], (err) => {
        if (err) reject(err);
        else resolve(err);
      })
    })
  },



  betterInteger: function (integer) {
    return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  },

  hasAdvertisement: function (text) {
    if (!text || typeof text !== 'string') {
      return false;
    }

    let TLDs = [
      'com', 'net', 'org', 'dev',
      'xyz', 'io', 'club', 'shop',
      'de', 'icu', 'uk', 'ru',
      'info', 'top', 'tk', 'cn',
      'ga', 'cf', 'nl', 'tv'
    ]
    let Domains = ['discord.gg', 'discord. gg']

    let hasLink = TLDs.some(TLD => {
      let regexp = new RegExp(`(https:\\/\\/.+|http:\/\/.+|.{2,}\\.${TLD.toLowerCase()}|.{2,}\\.\\s${TLD.toLowerCase()})`)
      return regexp.test(text.toLowerCase())
    }) || Domains.some(domain => text.toLowerCase().includes(domain.toLowerCase()))

    return hasLink
  },


  asyncForEach: async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  },
  delay: async function (seconds) {
    let start = Date.now();
    let end = start;
    while (end < start + (seconds * 1000)) {
      end = Date.now();
    }

    return true;
  },

  waitForResponse: function (userid, channel) {
    return new Promise((resolve, reject) => {
      const filter = m => m.author.id == userid
      channel.awaitMessages({ filter, max: 1 })
        .then(msgs => {
          resolve(msgs.first());
        })
        .catch(reject)
    })
  },

  checkSelfBot: function (message) {
    if (message.author.bot) return false
    else if (message.type !== "default") false
    else if (message.embeds.length >= 1 && message.attachments.size <= 0) return true
  },

  checkMentions: function (message) {
    const users = message.content.match(Discord.MessageMentions.USERS_PATTERN)
    const roles = message.content.match(Discord.MessageMentions.ROLES_PATTERN)
    if (users && users.length >= 5 || roles && roles.length >= 5) {
      return true;
    }
    return false;
  },


  findChannel: function (name, guild, type = "text", notifyIfNotExists = true) {

    const channel = guild.channels.cache.find(c => (c.name.toLowerCase() == name.toLowerCase() || c.id == name) && (type.toLowerCase() == "text" ? ["text", "news"].includes(c.type.toLowerCase()) : c.type.toLowerCase() == type.toLowerCase()));
    if (!channel)
      return false;

    return channel;
  },

  getTimeDifference(date1, date2) {
    let d1 = new Date(date1)
    let d2 = new Date(date2)
    var msec = d2 - d1;
    let secs = Math.floor(msec / 1000);
    var mins = Math.floor(secs / 60);
    var hrs = Math.floor(mins / 60);
    var days = Math.floor(hrs / 24);
    let result = []

    secs = Math.abs(secs % 60)
    mins = Math.abs(mins % 60);
    hrs = Math.abs(hrs % 24);
    days = Math.abs(days % 365);





    if (days !== 0) days == 1 ? result.push("" + `${days} days`) : result.push("" + `${days} days`)
    if (hrs !== 0) hrs == 1 ? result.push("" + `${hrs} hours`) : result.push("" + `${hrs} hours`)
    if (mins !== 0) mins == 1 ? result.push("" + `${mins} minutes`) : result.push("" + `${mins} minutes`)
    if (secs !== 0) secs == 1 ? result.push("" + `${secs} seconds`) : result.push("" + `${secs} seconds`)

    if (result.length == 1 && result[0].endsWith(" seconds")) {
      return "Less than " + result[0]
    } else {
      return "About " + result.join(" ");
    }

  },


  transcriptMessage: function (message, ticket = true) {
    const isEmbed = message.embeds.length > 0;

    const embed = {
      fields: [],
      description: "",
      title: "",
      color: ""
    }

    if (isEmbed) {
      embed.fields = message.embeds[0].fields || [];
      embed.description = message.embeds[0].description || '';
      embed.title = message.embeds[0].title || '';
      embed.color = message.embeds[0].hexColor || "#0023b0";
    }

    if (ticket) {
      if (isEmbed) {
        this.variables.client.dbconnection.query('INSERT INTO ticketmessages(message, author, authorAvatar, authorTag, created_at, embed_title, embed_description, embed_color, attachment, content, ticket) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.id, message.author.id, message.author.displayAvatarURL({ dynamic: true }), message.author.tag, message.createdAt.getTime(), embed.title, embed.description, embed.color, message.attachments.size > 0 ? message.attachments.first().url : null, message.content, message.channel.id])

        embed.fields.forEach(field => {
          this.variables.client.dbconnection.query('INSERT INTO ticketmessages_embed_fields(message, name, value) VALUES(?, ?, ?)', [message.id, field.name, field.value])
        })
      } else {
        this.variables.client.dbconnection.query('INSERT INTO ticketmessages(message, author, authorAvatar, authorTag, created_at, embed_title, embed_description, embed_color, attachment, content, ticket) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.id, message.author.id, message.author.displayAvatarURL({ dynamic: true }), message.author.tag, message.createdAt.getTime(), null, null, null, message.attachments.size > 0 ? message.attachments.first().url : null, message.content, message.channel.id])
      }
    } else {
      if (isEmbed) {
        this.variables.client.dbconnection.query('INSERT INTO applicationmessages(message, author, authorAvatar, authorTag, created_at, embed_title, embed_description, embed_color, attachment, content, application) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.id, message.author.id, message.author.displayAvatarURL({ dynamic: true }), message.author.tag, message.createdAt.getTime(), embed.title, embed.description, embed.color, message.attachments.size > 0 ? message.attachments.first().url : null, message.content, message.channel.id])

        embed.fields.forEach(field => {
          this.variables.client.dbconnection.query('INSERT INTO applicationmessages_embed_fields(message, name, value) VALUES(?, ?, ?)', [message.id, field.name, field.value])
        })
      } else {
        this.variables.client.dbconnection.query('INSERT INTO applicationmessages(message, author, authorAvatar, authorTag, created_at, embed_title, embed_description, embed_color, attachment, content, application) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.id, message.author.id, message.author.displayAvatarURL({ dynamic: true }), message.author.tag, message.createdAt.getTime(), null, null, null, message.attachments.size > 0 ? message.attachments.first().url : null, message.content, message.channel.id])
      }
    }
  },



  createTicket: async function (interaction) {







    // category TEXT, sup_role_id TEXT, welcome_msg TEXT, guild TEXT

    const databaseinfo = (await this.variables.client.dbconnection.query("SELECT * FROM ticket_setup WHERE guild=?", [interaction.guild.id]))[0]
    if (!databaseinfo) {
      return interaction.reply({ content: 'Configure the ticket system on the dashboard, before opening an ticket!', ephemeral: true })
    }
    const Ticket_Category = await interaction.member.guild.channels.cache.get(databaseinfo.category)
    if (!Ticket_Category) {
      return interaction.reply({ content: 'Configure the ticket system on the dashboard, before opening an ticket!', ephemeral: true })
    }
    const guild_support_role = interaction.member.guild.roles.cache.get(databaseinfo.sup_role_id)
    if (!guild_support_role) {
      return interaction.reply({ content: 'The support team role dont exist on this guild, please contact the administrator of the server, to check the ticketmanager and resetup the ticket-system with an new role-id!', ephemeral: true })
    }






    const sdfsdfsdf = (await this.variables.client.dbconnection.query("SELECT * FROM ticket_ban WHERE user=? AND guild=?", [interaction.user.id, interaction.guild.id]))[0]

    
    if (sdfsdfsdf) {
      const embed = new Discord.MessageEmbed()
        .setColor(module.exports.EmbedColors.Error)
        .setDescription(`Sorry, you can't open a ticket because you were banned from opening a tickets.`)
        .setFooter("Pepe Discord Bot", this.variables.client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp(new Date())

      return interaction.reply({ embeds: [embed], ephemeral: true })
    }


    const userTickets = (await module.exports.getOpenUserTickets(interaction.guild, interaction.member)).size

    if (userTickets >= 2) {
      return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(module.exports.EmbedColors.Error).setTitle("You already have a ticket!\nYou can have only 2 tickets").setTimestamp(new Date())], ephemeral: true })
    }



    const statcheck = (await this.variables.client.dbconnection.query("SELECT * FROM statistics WHERE guild = ? AND user = ?", [interaction.guild.id, interaction.user.id]))[0]
    if (!statcheck) {
      await this.variables.client.dbconnection.query("INSERT INTO statistics(totalmsgs, totalcmds, tickets, user, guild) VALUES(?, ?, ?, ?, ?)", [0, 0, 1, interaction.user.id, interaction.guild.id])
    }
    else {
      await this.variables.client.dbconnection.query("UPDATE statistics SET tickets = tickets + 1  WHERE guild = ? AND user = ?", [interaction.guild.id, interaction.user.id])
    }


    const TicketEmbedDescription = databaseinfo.welcome_msg.replace(/{user-mention}/g, `<@${interaction.user.id}>`).replace(/{user-tag}/g, interaction.user.tag).replace(/{user-name}/g, interaction.user.username).replace(/{guild-name}/g, interaction.guild.name)

    interaction.member.guild.channels.create(`ticket-${interaction.user.tag}`, {
      type: 'text',
      permissionOverwrites: [{
        id: interaction.member.guild.id,
        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
      },
      {
        id: interaction.user.id,
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
      }, {
        id: guild_support_role.id,
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
      },
      {
        id: this.variables.client.user.id,
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
      }],
      parent: Ticket_Category,
      topic: `User: ${interaction.user.tag} | Time: ${new Date().toLocaleString()} | ID: ${interaction.user.id}`
    }).then(async ch => {


      this.variables.client.dbconnection.query('INSERT INTO tickets(guild, channel_id, channel_name, creator, reason) VALUES(?, ?, ?, ?, ?)', [interaction.guild.id, ch.id, ch.name, interaction.user.id, "N/A"])


      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()

            .setLabel('Click Here')
            .setStyle("LINK")
            .setURL(`https://discord.com/channels/${ch.guild.id}/${ch.id}`)
        );

      await interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [new Discord.MessageEmbed().setColor(module.exports.EmbedColors.Default).setDescription(`Your new ticket has been generated in <#${ch.id}>`).setTitle(`🎟️ Ticket created`).setFooter("Pepe Discord Bot", this.variables.client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())], ephemeral: true, components: [row] })




      await ch.send({
        content: `<@${interaction.user.id}>, <@&${databaseinfo.sup_role_id}>`, embeds: [new Discord.MessageEmbed()
          .setColor(module.exports.EmbedColors.Default)
          .setTitle(`🎟️ ${interaction.guild.name} - Tickets`)
          .setDescription(TicketEmbedDescription)
          .setFooter("Pepe Discord Bot", this.variables.client.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp(new Date())]
      })
    })
  },



  guildDataBaseSetup: async function (guild) {

    //Security Table
    const databaseinfo = (await this.variables.client.dbconnection.query("SELECT * FROM SecurityFeatures WHERE guild=?", [guild.id]))[0]
    if (!databaseinfo) {
      await this.variables.client.dbconnection.query("INSERT INTO SecurityFeatures (advertise, selfbot, spam , massmention , guild ) VALUES (?, ?, ?, ?, ?)", [0, 0, 0, 0, guild.id])
    }



    //Ticket Table
    const databaseinfo2 = (await this.variables.client.dbconnection.query("SELECT * FROM ticket_setup WHERE guild=?", [guild.id]))[0]
    if (!databaseinfo2) {
      await this.variables.client.dbconnection.query("INSERT INTO ticket_setup (category, sup_role_id, welcome_msg ,  guild ) VALUES (?, ?, ?, ?)", [null, null, null, guild.id])
    }



    const databaseinfo3 = (await this.variables.client.dbconnection.query("SELECT * FROM welcome WHERE guild=?", [guild.id]))[0]
    if (!databaseinfo3) {
      await this.variables.client.dbconnection.query("INSERT INTO welcome (ch_toggle, ch_message, ch_channel, dm_toggle, dm_message, guild ) VALUES (?, ?, ?, ?, ?, ?)", [0, null, null, 0, null, guild.id])
    }



    const databaseinfo4 = (await this.variables.client.dbconnection.query("SELECT * FROM transcriptsettings WHERE guild=?", [guild.id]))[0]
    if (!databaseinfo4) {
      await this.variables.client.dbconnection.query("INSERT INTO transcriptsettings (dmtog, channeltog, channel, guild) VALUES (?, ?, ?, ?)", [0, 0, null, guild.id])
    }


    const databaseinfo5 = (await this.variables.client.dbconnection.query("SELECT * FROM verifysystem WHERE guild=?", [guild.id]))[0]
    if (!databaseinfo5) {
      await this.variables.client.dbconnection.query("INSERT INTO verifysystem (description, roleadd, roleremove, guild) VALUES (?, ?, ?, ?)", [null, null, null, guild.id])
    }


    
    const databaseinfo6 = (await this.variables.client.dbconnection.query("SELECT * FROM logging_system WHERE guild=?", [guild.id]))[0]
    if (!databaseinfo6) {
      await this.variables.client.dbconnection.query("INSERT INTO logging_system (logchannel, userpunished, userunpunished, ticketcreated, ticketclose, ticketrename, ticketuseradd, ticketuserremove, messageupdate, messagedelete, messagedeletebulk, guildmemberupdate, channelcreate, channeldelte, channelupdate, channelpinsupdate, emojicreate, emojiupdate, rolecreate, roledelete, roleupdate, guild) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, guild.id])
    }



    


        
    const databaseinfo7 = (await this.variables.client.dbconnection.query("SELECT * FROM othermodules WHERE guild=?", [guild.id]))[0]
    if (!databaseinfo7) {
      await this.variables.client.dbconnection.query("INSERT INTO othermodules (xpmessage, altaccountdetection, guild) VALUES (?, ?, ?)", [0, 0, guild.id])
    }



  },

  getOpenTickets: async function (guild) {
    let tickets = await this.variables.client.dbconnection.query("SELECT * FROM tickets WHERE guild=?", [guild.id])
    tickets = tickets.filter(ticket => ticket.guild == guild.id).map(ticket => ticket.channel_id);

    return guild.channels.cache.filter(channel => tickets.includes(channel.id));
  },

  getOpenUserTickets: async function (guild, user) {
    let tickets = await this.variables.client.dbconnection.query("SELECT * FROM tickets WHERE guild=? AND creator = ?", [guild.id, user.id])
    tickets = tickets.filter(ticket => ticket.guild == guild.id).map(ticket => ticket.channel_id);

    return guild.channels.cache.filter(channel => tickets.includes(channel.id));
  },

  basic_security_menu: async function (interaction) {
    const newinfo = (await this.variables.client.dbconnection.query("SELECT * FROM SecurityFeatures WHERE guild=?", [interaction.guild.id]))[0]
    let antiadvertise = newinfo.advertise
    let antispam = newinfo.spam
    let antimassmention = newinfo.massmention
    let antiselfbot = newinfo.selfbot
    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('toggle_advertise')
          .setLabel('Anti Advertise')
          .setStyle(antiadvertise ? 'SUCCESS' : 'DANGER')
          .setEmoji('🛡️')
      )
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('toggle_spam')
          .setLabel('Anti Spam')
          .setStyle(antispam ? 'SUCCESS' : 'DANGER')
          .setEmoji('🛡️')
      )
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('toggle_mention')
          .setLabel('Anti Mass Mention')
          .setStyle(antimassmention ? 'SUCCESS' : 'DANGER')
          .setEmoji('🛡️')
      )
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('toggle_selfbot')
          .setLabel('Anti Selfbot')
          .setStyle(antiselfbot ? 'SUCCESS' : 'DANGER')
          .setEmoji('🛡️')
      );

    const embed = new Discord.MessageEmbed()
      .setColor("#0390fc")
      .setTitle('Pepe - Security')
      .setDescription('Here, you can easily setup all security features, by toggeling them on and off!')
      .setFooter("Pepe Discord Bot", this.variables.client.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp(new Date());




    await interaction.message.edit({ embeds: [embed], components: [row] });
  },





  checkSpam: async function (message) {
    if (message.channel.type === 'dm' || message.author.id === this.variables.client.user.id || (message.guild.ownerID === message.author.id)) return;



    const msgcache = await message.channel.messages.cache

    const messageMatches = msgcache.filter(
      m => m.createdTimestamp > Date.now() - 4000 &&
        m.content === message.content &&
        m.author.id === message.author.id
    );


    const spamMatches = msgcache.filter(
      m => m.createdTimestamp > Date.now() - 2000 &&
        m.author.id === message.author.id
    );

    if (spamMatches.size === 4 || messageMatches.size === 3) {
      message.channel.messages.fetch({ limit: 10 }).then(msgs => {
        msgs.filter(m => m.author.id === message.author.id).forEach(m => {
          try {
            m.delete()
          }
          catch {

          }
        })
      })
    }
  },







  AllMessageChecks: async function (message) {


    const securitydatabase = (await this.variables.client.dbconnection.query("SELECT * FROM SecurityFeatures WHERE guild=?", [message.guild.id]))[0]
    if (securitydatabase && securitydatabase.advertise && module.exports.hasAdvertisement(message.content)) {
      const embed = new Discord.MessageEmbed()
        .setColor(module.exports.EmbedColors.Default)
        .setTitle('Pepe - Anti Advertise System')
        .setDescription(`Hey, <@${message.author.id}>! Your message has been flagged for containing a link.\n**Please do not advertise!**`)
        .setFooter("Pepe Discord Bot", this.variables.client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp(new Date());
      const warnmsg = await message.channel.send({ content: `<@${message.author.id}>`, embeds: [embed] })

      setTimeout(function () {
        message.channel.messages.delete(warnmsg.id)
      }, 5000);


      message.delete()
    }

    if (securitydatabase && securitydatabase.selfbot && module.exports.checkSelfBot(message)) {
      message.delete()
      message.guild.members.kick(message.author.id, "Detected Selfbot")
    }
    if (securitydatabase && securitydatabase.massmention && module.exports.checkMentions(message)) {
      const embed = new Discord.MessageEmbed()
        .setColor(module.exports.EmbedColors.Default)
        .setTitle('Pepe - Anti Mass Mention System')
        .setDescription(`Hey, <@${message.author.id}>! Your message has been flagged for spamming mentions.\n**Please do not annoy!**`)
        .setFooter("Pepe Discord Bot", this.variables.client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp(new Date());
      const warningmsg = await message.channel.send({ content: `<@${message.author.id}>`, embeds: [embed] })

      setTimeout(function () {
        message.channel.messages.delete(warningmsg.id)
      }, 5000);

      message.delete()
    }

    if (securitydatabase && securitydatabase.spam) {
      await module.exports.checkSpam(message)
    }

  },




  getExperience: async function(user) {
      if (user) {

        const experience = (await this.variables.client.dbconnection.query('SELECT * FROM experience WHERE user=? AND guild=?', [user.id, user.guild.id]))[0]
        if (experience.length < 1) {
          return ({ level: 1, xp: 0 });
        }
        else return experience;
      } else {
        const experience = (await this.variables.client.dbconnection.query('SELECT * FROM experience'))[0]
        return experience;
      }
  },


  updateExperience_Query: async function (user, level, xp, action) {

    const experience = (await this.variables.client.dbconnection.query('SELECT * FROM experience WHERE user=? AND guild=?', [user.id, user.guild.id]))[0]
    let newxp;
    if (experience) {
      if (action == 'add') newxp = experience.xp + xp;
      if (action == 'remove') newxp = experience.xp - xp;
      if (action == 'set') newxp = xp;
      if (newxp < 0) newxp = 0;
      if (level < 1) level = 1;

      this.variables.client.dbconnection.query('UPDATE experience SET level=?, xp=? WHERE user=? AND guild=?', [level, newxp, user.id, user.guild.id])
    } else {
      if (['add', 'set'].includes(action)) newxp = xp;
      if (action == 'remove') newxp = 0;
      if (newxp < 0) newxp = 0;
      if (level < 1) level = 1;

      this.variables.client.dbconnection.query('INSERT INTO experience(user, guild, level, xp) VALUES(?, ?, ?, ?)', [user.id, user.guild.id, level, newxp])

    }
  }
}
