const info = "[38;2;87;255;107m[1m[INFO][22m[39m";

const installModules = async () => {
  return new Promise(async (resolve, reject) => {

    const showInfo = process.argv.slice(2).map(a => a.toLowerCase()).includes("--show-install-output");
    const start = Date.now();

    const { spawn } = require('child_process');

    const npmCmd = process.platform == "win32" ? 'npm.cmd' : 'npm';

    const modules = Object.keys(require('./package.json').dependencies);



    const missingModules = modules.filter(module => {
      try {
        require.resolve(module);
        return;
      } catch (err) {
        return module !== "n";
      }
    });

    if (missingModules.length == 0) {
      console.log(info, ' No modules are missing... Bot is starting up');
      resolve();
    } else {
      console.log(info, missingModules.length, `module${missingModules.length == 1 ? ' is' : 's are'} not installed... Installing...`);

      for (let i = 0; i < missingModules.length; i++) {
        const module = missingModules[i];

        console.log(info, `Installing module ${i + 1}/${missingModules.length} (${module})`);

        await new Promise(resolve => {
          const install = spawn(npmCmd, ['i', module]);

          install.stdout.on('data', (data) => {
            if (showInfo) console.log(data.toString().trim())
          })

          install.stderr.on('data', (data) => {
            if (showInfo) console.log("\u001b[31m" + data.toString().trim());
          })

          install.on('exit', () => {
            console.log(info, `Finished installing module ${i + 1}/${missingModules.length} (${((i + 1) / missingModules.length * 100).toFixed(2)}% done)`);
            resolve();
          })
        })
      }

      console.log(info, 'All missing modules have been installed... Bot is starting up');
      resolve();
    }
  })
}


installModules().then(async () => {





  const fs = require('fs');
  const Discord = require('discord.js');
  const DisTube = require('distube')
  const { prefix, token, dblogin } = require('./botconfig.json');
  const chalk = require("chalk");
  const client = new Discord.Client({
    shards: 'auto', partials: ['CHANNEL'], intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING]
  });
  
  const { findBestMatch } = require('string-similarity')
  const Utils = require("./modules/utils.js");
  const variables = Utils.variables;
  variables.set('client', client);
  const fetch = require('node-fetch');



  const SpotifyPlugin = require("@distube/spotify")



  const filters = {
    "bassboost2": "bass=g=20,dynaudnorm=f=200"
  }


  const distube = new DisTube.default(client, {
    searchSongs: 10,
    emitNewSongOnly: true,
    plugins: [new SpotifyPlugin({ parallel: true })],
    leaveOnEmpty: true,
    leaveOnFinish: true,
    searchSongs: 1,
    customFilters: filters
  });

  variables.set('distube', distube)





  client.commands = new Discord.Collection();


  const commandFolders = fs.readdirSync('./commands');
  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`./commands/${folder}/${file}`);
      client.commands.set(command.name, command);
    }
  }



  client.btninteraction = new Discord.Collection();

  const btninteraction = fs.readdirSync('./btninteraction').filter(file => file.endsWith('.js'));
  for (const file of btninteraction) {
    const inti = require(`./btninteraction/${file}`);
    client.btninteraction.set(inti.id, inti);
  }



  client.contextinteraction = new Discord.Collection();


  const contextinteraction = fs.readdirSync('./contextmenus').filter(file => file.endsWith('.js'));
  for (const file of contextinteraction) {
    const inti = require(`./contextmenus/${file}`);
    client.contextinteraction.set(inti.id, inti);
  }









  const EventHandler = require('./modules/handlers/EventHandler').init(client);

  const {
    NoSubscriberBehavior,
    StreamType,
    createAudioPlayer,
    createAudioResource,
    entersState,
    AudioPlayerStatus,
    VoiceConnectionStatus,
    joinVoiceChannel,
  } = require('@discordjs/voice');

  const ytdl = require('ytdl-core');

  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Play,
      maxMissedFrames: Math.round(5000 / 20),
    },
  });








  const mariadb = require('mariadb');
  const pool = mariadb.createPool({
    host: dblogin[0],
    user: dblogin[1],
    password: dblogin[2],
    connectionLimit: 5
  });

  let connection = conn = await pool.getConnection();
  client.dbconnection = connection



  const Time1 = Date.now()
  client.dbconnection.query("USE PepeBot")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS ButtonCounting(count BIGINT(20), msgid TEXT, guild TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS SecurityFeatures(advertise BOOLEAN, selfbot BOOLEAN, spam BOOLEAN, massmention BOOLEAN, guild TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS ticketmessages (message text, author text, authorAvatar text, authorTag text, created_at BIGINT(20), embed_title text, embed_description text, embed_color text, attachment text, content text, ticket text)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS ticketmessages_embed_fields (message text, name text, value text)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS tickets(guild text, channel_id text, channel_name text, creator text, reason text)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS ticket_setup(category TEXT, sup_role_id TEXT, welcome_msg TEXT, guild TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS ticketsaddedusers(user text, ticket text)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS experience(user text, guild text, level BIGINT(20), xp BIGINT(20))")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS ticket_ban(user text, guild text)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS giveaways (messageID VARCHAR(18) NOT NULL, name TEXT, end BIGINT(20) NOT NULL, winnercount INT NOT NULL, channel VARCHAR(18) NOT NULL, guild VARCHAR(18) NOT NULL, ended BOOLEAN NOT NULL, start BIGINT(20) NOT NULL, winner TEXT, creator VARCHAR(18) NOT NULL, description TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS giveawayentries(giveaway text, user text, guild TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS welcome(ch_toggle BOOLEAN, ch_message TEXT, ch_channel TEXT, dm_toggle BOOLEAN, dm_message TEXT, guild TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS punishments (id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, type TEXT NOT NULL, user VARCHAR(18) NOT NULL, tag TEXT NOT NULL, reason TEXT NOT NULL, time BIGINT(20) NOT NULL, executor VARCHAR(18) NOT NULL, length INTEGER, guild TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS lockedchannels (CH_ID TEXT, guild TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS transcriptsettings (dmtog BOOLEAN, channeltog BOOLEAN, channel TEXT, guild TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS statistics (totalmsgs  BIGINT(20), totalcmds  BIGINT(20), tickets BIGINT(20), user TEXT, guild TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS botinfostats (slashcmds  BIGINT(20), btnclicks  BIGINT(20), dashlogins BIGINT(20))")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS verifysystem (description TEXT, roleadd TEXT, roleremove TEXT, guild TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS verifys (captcha TEXT, userid TEXT, guildid TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS logging_system(logchannel TEXT, userpunished BOOLEAN, userunpunished BOOLEAN, ticketcreated BOOLEAN, ticketclose BOOLEAN, ticketrename BOOLEAN, ticketuseradd BOOLEAN, ticketuserremove BOOLEAN, messageupdate BOOLEAN, messagedelete BOOLEAN, messagedeletebulk BOOLEAN, guildmemberupdate BOOLEAN, channelcreate BOOLEAN, channeldelte BOOLEAN, channelupdate BOOLEAN, channelpinsupdate BOOLEAN, emojicreate BOOLEAN, emojiupdate BOOLEAN, rolecreate BOOLEAN, roledelete BOOLEAN, roleupdate BOOLEAN, guild TEXT)")
  client.dbconnection.query("CREATE TABLE IF NOT EXISTS othermodules (xpmessage BOOLEAN, altaccountdetection BOOLEAN, guild TEXT)")


  const Time2 = Date.now()


  console.log(`${chalk.hex("#dbeb34")(`[SQL]`)}   Database prepared in ${Time2 - Time1}ms`)




  const DBD = require('./Dashboard');



  const Dashboard = new DBD.Dashboard({
    port: 6547,
    client: {
      id: '889865970640891916',
      secret: 'QDgXqShg2V6YUx96o_oQETOqOq43Z-w7'
    },
    redirectUri: 'http://10.104.0.160:6547/discord/callback',
    domain: 'http://10.104.0.160:6547/',
    bot: client,
    settings: [
      {
        categoryId: 'ticket',
        categoryName: "Ticket System",
        categoryDescription: "Ticket Module Settings",
        categoryOptionsList: [
          {
            optionId: 'tick_welco_msg',
            optionName: "Ticket Opening Message",
            optionDescription: "The Embed Description, after an user opened an ticket | NOTE: You can use placeholders, like in the example!",
            optionType: DBD.formTypes.textarea("Your Message | Example: Hey, {user-mention} {user-tag} {user-name} welcome on {guild-name}. Thx for opening an ticket", 0, 200, false, true),
            getActualSet: async ({ guild }) => {

              await Utils.guildDataBaseSetup(guild)

              return (await client.dbconnection.query("SELECT welcome_msg FROM ticket_setup WHERE guild = ?", [guild.id]))[0].welcome_msg
            },
            setNew: async ({ guild, newData }) => {
              client.dbconnection.query("UPDATE ticket_setup SET welcome_msg=? WHERE guild=?", [newData, guild.id])
              return;
            }
          },
          {
            optionId: 'Support Team',
            optionName: "Role for the Support Team",
            optionDescription: "Role of the support team, that have access + get mention",
            optionType: DBD.formTypes.rolesSelect(false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT sup_role_id FROM ticket_setup WHERE guild = ?", [guild.id]))[0].sup_role_id
            },
            setNew: async ({ guild, newData }) => {
              client.dbconnection.query("UPDATE ticket_setup SET sup_role_id=? WHERE guild=?", [newData, guild.id])
              return;
            }
          },
          {
            optionId: 'ticket_cat',
            optionName: "Ticket Category",
            optionDescription: "Category, where the ticket should be created",
            optionType: DBD.formTypes.categorySelect(false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT category FROM ticket_setup WHERE guild = ?", [guild.id]))[0].category
            },
            setNew: async ({ guild, newData }) => {
              client.dbconnection.query("UPDATE ticket_setup SET category=? WHERE guild=?", [newData, guild.id])
              return;
            }
          },
          {
            optionType: DBD.formTypes.line(),
            getActualSet: async ({ guild }) => {
              return null
            },
            setNew: async ({ guild, newData }) => {
              return;
            }
          },

          {
            optionId: 'transdm',
            optionName: "Transcript DM - Toggle",
            optionDescription: "Toggle on/off transcript sending to the ticket opener",
            optionType: DBD.formTypes.switch(false, false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT dmtog FROM transcriptsettings WHERE guild = ?", [guild.id]))[0].dmtog
            },
            setNew: async ({ guild, newData }) => {
              client.dbconnection.query("UPDATE transcriptsettings SET dmtog=? WHERE guild=?", [newData, guild.id])
              return;
            }
          },
          {
            optionId: 'transchtog',
            optionName: "Transcript Channel - Toggle",
            optionDescription: "Toggle on/off transcript sending to your custom channel",
            optionType: DBD.formTypes.switch(false, false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT channeltog FROM transcriptsettings WHERE guild = ?", [guild.id]))[0].channeltog
            },
            setNew: async ({ guild, newData }) => {
              client.dbconnection.query("UPDATE transcriptsettings SET channeltog=? WHERE guild=?", [newData, guild.id])
              return;
            }
          },
          {
            optionId: 'transch',
            optionName: "Transcript Channel",
            optionDescription: "Channel where transcripts are sent to",
            optionType: DBD.formTypes.channelsSelect(false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT channel FROM transcriptsettings WHERE guild = ?", [guild.id]))[0].channel
            },
            setNew: async ({ guild, newData }) => {
              client.dbconnection.query("UPDATE transcriptsettings SET channel=? WHERE guild=?", [newData, guild.id])
              return;
            }
          },


        ]
      },
      {
        categoryId: 'protection',
        categoryName: "Auto Moderation",
        categoryDescription: "Manage all Protections for your Guild",
        categoryOptionsList: [
          {
            optionId: 'antiad',
            optionName: "Anti Advertise",
            optionDescription: "Block's advertise on your guild",
            optionType: DBD.formTypes.switch(false, false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT * FROM SecurityFeatures WHERE guild=?", [guild.id]))[0].advertise;
            },
            setNew: async ({ guild, newData }) => {
              client.dbconnection.query("UPDATE SecurityFeatures SET advertise=? WHERE guild=?", [newData ? 1 : 0, guild.id])
              return;
            }
          },
          {
            optionId: 'antispam',
            optionName: "Anti Spam",
            optionDescription: "Block's spamming/raids on your guild.",
            optionType: DBD.formTypes.switch(false, false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT * FROM SecurityFeatures WHERE guild=?", [guild.id]))[0].spam;
            },
            setNew: async ({ guild, newData }) => {
              client.dbconnection.query("UPDATE SecurityFeatures SET spam=? WHERE guild=?", [newData ? 1 : 0, guild.id])
            }
          },
          {
            optionId: 'antimassment',
            optionName: "Anti Mass Mention",
            optionDescription: "Block's messages which have over 5 mentions.",
            optionType: DBD.formTypes.switch(false, false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT * FROM SecurityFeatures WHERE guild=?", [guild.id]))[0].massmention;
            },
            setNew: async ({ guild, newData }) => {
              client.dbconnection.query("UPDATE SecurityFeatures SET massmention=? WHERE guild=?", [newData ? 1 : 0, guild.id])
            }
          },
          {
            optionId: 'antiselfbot',
            optionName: "Anti SelfBot",
            optionDescription: "Kick members, when selfbot detected.",
            optionType: DBD.formTypes.switch(false, false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT * FROM SecurityFeatures WHERE guild=?", [guild.id]))[0].selfbot;
            },
            setNew: async ({ guild, newData }) => {
              client.dbconnection.query("UPDATE SecurityFeatures SET selfbot=? WHERE guild=?", [newData ? 1 : 0, guild.id])
            }
          },

        ]
      },


      // ch_toggle BOOLEAN, ch_message TEXT, ch_channel TEXT, dm_toggle TEXT, dm_message TEXT, guild TEXT

      {
        categoryId: 'welcomeleave',
        categoryName: "Welcome Message",
        categoryDescription: "Message when an user leaves/join your guild.",
        categoryOptionsList: [
          {
            optionId: 'welcmsgtoggle',
            optionName: "Welcome Message (Channel)",
            optionDescription: "Toggle, if an welcome message should be sent into the selected channel.",
            optionType: DBD.formTypes.switch(false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT * FROM welcome WHERE guild = ?", [guild.id]))[0].ch_toggle
            },
            setNew: async ({ guild, newData }) => {
              await client.dbconnection.query("UPDATE welcome SET ch_toggle = ? WHERE guild = ?", [newData, guild.id])
              return;

            }
          },
          {
            optionId: 'welcomemsgtext',
            optionName: "Welcome Message (Channel) - Custom Text",
            optionDescription: "Your custom text, for the welcome message | Placeholder: {user-name} {user-tag} {user-mention} {guild-name} {member-count}",
            optionType: DBD.formTypes.textarea("Your Custom Message", 0, 200, false, true),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT * FROM welcome WHERE guild = ?", [guild.id]))[0].ch_message
            },
            setNew: async ({ guild, newData }) => {


              await client.dbconnection.query("UPDATE welcome SET ch_message = ? WHERE guild = ?", [newData, guild.id])
              return;

            }
          },
          {
            optionId: 'welcomemsgch',
            optionName: "Welcome Message (Channel) - Channel Select",
            optionDescription: "Your custom channel, for the welcome message",
            optionType: DBD.formTypes.channelsSelect(false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT * FROM welcome WHERE guild = ?", [guild.id]))[0].ch_channel
            },
            setNew: async ({ guild, newData }) => {

              await client.dbconnection.query("UPDATE welcome SET ch_channel = ? WHERE guild = ?", [newData, guild.id])
              return;

            }
          },

          {
            optionType: DBD.formTypes.line(),
            getActualSet: async ({ guild }) => {
              return null
            },
            setNew: async ({ guild, newData }) => {
              return;
            }
          },



          {
            optionId: 'welcomedmtoggle',
            optionName: "Welcome Message (DM)",
            optionDescription: "Toggle, if an welcome message should be sent to the user.",
            optionType: DBD.formTypes.switch(false),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT * FROM welcome WHERE guild = ?", [guild.id]))[0].dm_toggle

            },
            setNew: async ({ guild, newData }) => {

              await client.dbconnection.query("UPDATE welcome SET dm_toggle = ? WHERE guild = ?", [newData, guild.id])
              return;

            }
          },
          {
            optionId: 'welcomemsgdmtext',
            optionName: "Welcome Message (DM) - Custom Text",
            optionDescription: "Your custom text, for the DM welcome message | Placeholder: {user-name} {user-tag} {user-mention} {guild-name} {member-count}",
            optionType: DBD.formTypes.textarea("Your Custom Message", 0, 200, false, true),
            getActualSet: async ({ guild }) => {
              return (await client.dbconnection.query("SELECT * FROM welcome WHERE guild = ?", [guild.id]))[0].dm_message
            },
            setNew: async ({ guild, newData }) => {

              await client.dbconnection.query("UPDATE welcome SET dm_message = ? WHERE guild = ?", [newData, guild.id])
              return;

            }
          },
        ]
      },





      {
        categoryId: 'verifysys',
        categoryName: "Verify System",
        categoryDescription: "Setup the Verification System",
        categoryOptionsList: [
          {
            optionId: 'verifyembedmsg',
            optionName: "Verify Embed - Message",
            optionDescription: "Description, which should be shown on the Verify Embed",
            optionType: DBD.formTypes.textarea("Your Custom Message", 0, 200, false, true),
            getActualSet: async ({ guild }) => {

              return (await client.dbconnection.query("SELECT * FROM verifysystem WHERE guild = ?", [guild.id]))[0].description
            },
            setNew: async ({ guild, newData }) => {
              await client.dbconnection.query("UPDATE verifysystem SET description = ? WHERE guild = ?", [newData, guild.id])
              return;
            }
          },
          {
            optionId: 'addroleverify',
            optionName: "Role Add",
            optionDescription: "Role, which the user get, after successfull verification",
            optionType: DBD.formTypes.rolesSelect(false),
            getActualSet: async ({ guild }) => {

              return (await client.dbconnection.query("SELECT * FROM verifysystem WHERE guild = ?", [guild.id]))[0].roleadd
            },
            setNew: async ({ guild, newData }) => {
              await client.dbconnection.query("UPDATE verifysystem SET roleadd = ? WHERE guild = ?", [newData, guild.id])
              return;
            }
          },
          {
            optionId: 'removeroleverify',
            optionName: "Role Remove",
            optionDescription: "Role, which the user loose, after successfull verification",
            optionType: DBD.formTypes.rolesSelect(false),
            getActualSet: async ({ guild }) => {

              return (await client.dbconnection.query("SELECT * FROM verifysystem WHERE guild = ?", [guild.id]))[0].roleremove
            },
            setNew: async ({ guild, newData }) => {
              await client.dbconnection.query("UPDATE verifysystem SET roleremove = ? WHERE guild = ?", [newData, guild.id])
              return;
            }
          },
        ]
      },


      {
        categoryId: 'modules',
        categoryName: "Other Modules",
        categoryDescription: "Other Pepe Modules",
        categoryOptionsList: [
          {
            optionId: 'lvlupmsg',
            optionName: "XP System - Message",
            optionDescription: "Toggles Level Up Messages",
            optionType: DBD.formTypes.switch(false),
            getActualSet: async ({ guild }) => {

              return (await client.dbconnection.query("SELECT * FROM othermodules WHERE guild = ?", [guild.id]))[0].xpmessage
            },
            setNew: async ({ guild, newData }) => {
              await client.dbconnection.query("UPDATE othermodules SET xpmessage = ? WHERE guild = ?", [newData, guild.id])
              return;
            }
          },
          {
            optionId: 'altdetopt',
            optionName: "Alt Account Detection",
            optionDescription: "Check if an new member is an fake account. User will be kicked, if the account isn't older than 48 hours",
            optionType: DBD.formTypes.switch(false),
            getActualSet: async ({ guild }) => {

              return (await client.dbconnection.query("SELECT * FROM othermodules WHERE guild = ?", [guild.id]))[0].altaccountdetection
            },
            setNew: async ({ guild, newData }) => {
              await client.dbconnection.query("UPDATE othermodules SET altaccountdetection = ? WHERE guild = ?", [newData, guild.id])
              return;
            }
          }
        ]
      },
    ]
  });

  Dashboard.init();





  const tictactoebuttons = ["accept_tictactoe", "deny_tictactoe", Utils.getEmoji(1), Utils.getEmoji(2), Utils.getEmoji(3), Utils.getEmoji(4), Utils.getEmoji(5), Utils.getEmoji(6), Utils.getEmoji(7), Utils.getEmoji(8), Utils.getEmoji(9),]



  //Context Menu
  client.on('interactionCreate', async interaction => {
    if (!interaction.isContextMenu()) return;


        //BotInfoStat Check
        const databaseinfo = (await client.dbconnection.query("SELECT * FROM botinfostats", []))[0]
        if (!databaseinfo) {
          await client.dbconnection.query("INSERT INTO botinfostats (slashcmds, btnclicks , dashlogins) VALUES (?, ?, ?)", [0, 0, 0])
        }

    client.dbconnection.query("UPDATE botinfostats SET slashcmds = slashcmds + 1")


    const interaction_id = interaction.commandName


    const command = client.contextinteraction.get(interaction_id)
      || client.contextinteraction.find(cmd => cmd.aliases && cmd.aliases.includes(interaction_id));
    if (!command)
      return console.log(`Invalid Context Interaction found: ${interaction_id}`)


      if (command.permissions) {
        const authorPerms = interaction.channel.permissionsFor(interaction.member);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
  
          const emb = new Discord.MessageEmbed()
          emb.setTitle(":x: Error")
          emb.setColor(Utils.EmbedColors.Error)
          emb.setDescription(`**You are missing** the following **permissions**: \`\`${command.permissions.join(`\`\`, \`\``)}\`\``)
          emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
          emb.setTimestamp(new Date())
  
  
          return interaction.reply({ embeds: [emb], ephemeral: true });
        }
      }


      try {
      await command.execute(client, interaction);
    } catch (error) {
      console.error(error);

      Utils.ErrorHook(error)

    }


  })



  //Button Interactions
  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;


    //BotInfoStat Check
    const databaseinfo = (await client.dbconnection.query("SELECT * FROM botinfostats", []))[0]
    if (!databaseinfo) {
      await client.dbconnection.query("INSERT INTO botinfostats (slashcmds, btnclicks , dashlogins) VALUES (?, ?, ?)", [0, 0, 0])
    }

    client.dbconnection.query("UPDATE botinfostats SET btnclicks = btnclicks + 1")


    if (tictactoebuttons.includes(interaction.customId))
      return;

    const interaction_id = interaction.customId
    const command = client.btninteraction.get(interaction_id)
      || client.btninteraction.find(cmd => cmd.aliases && cmd.aliases.includes(interaction_id));
    if (!command)
      return console.log(`Invalid Button Interaction found: ${interaction_id}`)


      if (command.permissions) {
        const authorPerms = interaction.channel.permissionsFor(interaction.member);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
  
          const emb = new Discord.MessageEmbed()
          emb.setTitle(":x: Error")
          emb.setColor(Utils.EmbedColors.Error)
          emb.setDescription(`**You are missing** the following **permissions**: \`\`${command.permissions.join(`\`\`, \`\``)}\`\``)
          emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
          emb.setTimestamp(new Date())
  
  
          return interaction.reply({ embeds: [emb], ephemeral: true });
        }
      }


      try {
      await command.execute(client, interaction);
    } catch (error) {
      console.error(error);
      Utils.ErrorHook(error)
    }
  })



  distube.on("addList", (queue, playlist) => {
    console.log(queue)
    queue.textChannel.send(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`
)
});


  distube.on("addSong", (queue, song) => {




    const emb = new Discord.MessageEmbed()
    emb.setColor(Utils.EmbedColors.Default)
    emb.setTitle(":musical_note: Added new Song")
    emb.setImage(song.thumbnail)
    emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
    emb.addFields(
      { name: "Name", value: song.name.toString(), inline: false },
      { name: "URL", value: song.url.toString(), inline: false },
      { name: "Duration", value: song.formattedDuration.toString(), inline: false },
      { name: "Added by ", value: song.user.toString(), inline: false },
      { name: ":eye: Views", value: Utils.betterInteger(song.views), inline: true },
      { name: ":thumbsup: Likes", value: Utils.betterInteger(song.likes), inline: true },
      { name: ":thumbsdown: Dislikes", value: Utils.betterInteger(song.dislikes), inline: true },
      { name: "Uploader", value: `[${song.uploader.name.toString()}](${song.uploader.url.toString()})`, inline: false },
    )
    queue.textChannel.send({ embeds: [emb] })
  });
  distube.on("searchNoResult", (message, query) => {
    const emb = new Discord.MessageEmbed()
    emb.setColor(Utils.EmbedColors.Error)
    emb.setTitle(":x: Pepe didn't found an song!")
    emb.addField("__Query:__", query)
    message.channel.send({ embeds: [emb] })
  });
  distube.on("empty", queue => {
    const emb = new Discord.MessageEmbed()
    emb.setColor(Utils.EmbedColors.Error)
    emb.setTitle(":x: The voice channel is empty.\nPepe will now leave the channel to save performance!")
    queue.textChannel.send({ embeds: [emb] })
  })
  distube.on("noRelated", (query) => {
    const emb = new Discord.MessageEmbed()
    emb.setColor(Utils.EmbedColors.Error)
    emb.setTitle(":x: Can't find related video to play")
    queue.textChannel.send({ embeds: [emb] })
  });

  distube.on("finish", (query) => {
    const emb = new Discord.MessageEmbed()
    emb.setColor(Utils.EmbedColors.Error)
    emb.setTitle(":white_check_mark: No more songs in queue.\nPepe will now leave the voice channel.")
    query.textChannel.send({ embeds: [emb] })
  });





  //Select Menu
  client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;




    try {


      if (interaction.values.length <= 0) {
        await distube.setFilter(interaction, false)
      }
      else {
        await distube.setFilter(interaction, interaction.values, true)
      }



    }
    catch (er) {
      const emb = new Discord.MessageEmbed()
      emb.setColor(Utils.EmbedColors.Error)
      emb.setTitle(":x: An error occured")
      emb.setDescription(`\`\`\`${er}\`\`\``)
      return interaction.reply({ embeds: [emb], components: [] })
    }

    try {
      await interaction.deferUpdate()
    }
    catch { }
  });





  //Slash Command Interactions
  client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;


        //BotInfoStat Check
        const databaseinfo = (await client.dbconnection.query("SELECT * FROM botinfostats", []))[0]
        if (!databaseinfo) {
          await client.dbconnection.query("INSERT INTO botinfostats (slashcmds, btnclicks , dashlogins) VALUES (?, ?, ?)", [0, 0, 0])
        }

    client.dbconnection.query("UPDATE botinfostats SET slashcmds = slashcmds + 1")





    const commandName = interaction.commandName





    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command)
      return console.log(`Invalid Slash Command executed: ${commandName}`)


    if (command.permissions) {
      const authorPerms = interaction.channel.permissionsFor(interaction.member);
      if (!authorPerms || !authorPerms.has(command.permissions)) {

        const emb = new Discord.MessageEmbed()
        emb.setTitle(":x: Error")
        emb.setColor(Utils.EmbedColors.Error)
        emb.setDescription(`**You are missing** the following **permissions**: \`\`${command.permissions.join(`\`\`, \`\``)}\`\``)
        emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())


        return interaction.reply({ embeds: [emb], ephemeral: true });
      }
    }



    try {
      const statcheck = (await client.dbconnection.query("SELECT * FROM statistics WHERE guild = ? AND user = ?", [interaction.guild.id, interaction.user.id]))[0]
      if (!statcheck) {
        await client.dbconnection.query("INSERT INTO statistics(totalmsgs, totalcmds, tickets, user, guild) VALUES(?, ?, ?, ?, ?)", [0, 1, 0, interaction.user.id, interaction.guild.id])
      }
      else {
        await client.dbconnection.query("UPDATE statistics SET totalcmds = totalcmds + 1  WHERE guild = ? AND user = ?", [interaction.guild.id, interaction.user.id])
      }



      await command.execute(client, interaction);
    } catch (error) {
      console.error(error);
      Utils.ErrorHook(error)
    }

  })





  client.login(token);
})
