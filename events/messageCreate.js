const Utils = require('../modules/utils.js');
const EventHandler = require('../modules/handlers/EventHandler.js');
const Discord = require('discord.js');
const fs = require('fs');

const cooldowns = {
  xp: {
    cooldownSeconds: 5 || 5,
    cooldown: new Set()
  },
  cmd: []
}


module.exports = async (client, message) => {




  // Verification System -> DM -> Channel Partital Needed
  if (message.channel.type == 'DM') {
    if (message.content.startsWith("verify ")) {
      if (message.author.bot) return;
      const givencaptcha = message.content.split(" ").slice(1)[0]
      const captcha = (await client.dbconnection.query("SELECT * FROM verifys WHERE captcha =? AND userid =?", [givencaptcha, message.author.id]))[0]
      if (!captcha) {
        return message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(":x: Sorry, this captcha is invalid! Please try it again!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
      }
      const guild = await client.guilds.cache.get(captcha.guildid)
      let verifysettings = (await client.dbconnection.query(`SELECT * FROM verifysystem WHERE guild = ?`, [guild.id]))[0]
      const givenrole = await guild.roles.cache.find(r => r.id === verifysettings.roleadd);
      const removerole = await guild.roles.cache.find(r => r.id === verifysettings.roleremove);
      const member = await guild.members.fetch(captcha.userid);
      if (givencaptcha && removerole) {
        member.roles.add(givenrole, `Verification Accepted (${givencaptcha})`)
        member.roles.remove(removerole, `Verification Accepted (${givencaptcha})`)
      }
      message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle(":white_check_mark: This captcha was correct and the verification was completed successfully!\n\n**Have fun!**").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
      await client.dbconnection.query("DELETE FROM verifys WHERE userid = ? AND captcha = ?", [message.author.id, givencaptcha])
    }
  }


  else {





    //Transcript Generation
    const ticket = (await client.dbconnection.query("SELECT * FROM tickets WHERE channel_id=?", [message.channel.id]))[0]
    message.ticket = ticket;
    if (ticket) {
      Utils.transcriptMessage(message);
    }




    if (message.author.bot) return;
    //Security Features
    if (!message.member.permissions.has("ADMINISTRATOR"))
      await Utils.AllMessageChecks(message)


    //Stats Stuff
    const statcheck = (await client.dbconnection.query("SELECT * FROM statistics WHERE guild = ? AND user = ?", [message.guild.id, message.author.id]))[0]
    if (!statcheck) {
      await client.dbconnection.query("INSERT INTO statistics(totalmsgs, totalcmds, tickets, user, guild) VALUES(?, ?, ?, ?, ?)", [1, 0, 0, message.author.id, message.guild.id])
    }
    else {
      await client.dbconnection.query("UPDATE statistics SET totalmsgs = totalmsgs + 1  WHERE guild = ? AND user = ?", [message.guild.id, message.author.id])
    }


    //XP Stuff
    let check = (await client.dbconnection.query("SELECT * FROM experience WHERE user=? AND guild=?", [message.author.id, message.guild.id]))[0]
    if (!check) {
      await Utils.updateExperience_Query(message.member, 1, 0, 'set')
    }





    let { level, xp } = (await client.dbconnection.query("SELECT * FROM experience WHERE user=? AND guild=?", [message.author.id, message.guild.id]))[0]


    if (!cooldowns.xp.cooldown.has(message.author.id)) {
      let amt = ~~(Math.random() * 10) + 10;
      let xpNeeded = ~~((level * (175 * level) * 0.5)) - amt - xp;

      if (xpNeeded <= 0) {
        level++;





        const dbcheck = (await client.dbconnection.query("SELECT * FROM othermodules WHERE guild=?", [message.guild.id]))[0]
        if (dbcheck && dbcheck.xpmessage) {

          const lvl_up_embed = new Discord.MessageEmbed()
            .setColor(Utils.EmbedColors.Default)
            .setTitle('✨ Level Up')
            .setDescription(`Congratulations <@${message.author.id}> you leveled up!\nYou new level is **${level}**!`)
            .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp(new Date());

          message.channel.send({ content: `<@${message.author.id}>`, embeds: [lvl_up_embed] }).then(msg => {
            setTimeout(function () {
              msg.delete()
            }, 5000);
          })
        }
      }


      await Utils.updateExperience_Query(message.member, level, amt, 'add');

      cooldowns.xp.cooldown.add(message.author.id);
      setTimeout(function () {
        cooldowns.xp.cooldown.delete(message.author.id);
      }, cooldowns.xp.cooldownSeconds * 1000);
    }








    //Slash Command Generation
    if (message.content.toLowerCase() === '!deploy' && message.author.id == 780821709263077398) {

      try
      {

      // const commands = await client.application?.commands.set(data);
      // console.log(commands);



      const command = await client.application?.commands.set(Utils.SlashCommandData);
      // const command = await client.guilds.cache.get('790700022625992704')?.commands.set(Utils.SlashCommandData);


      

      // await client.application?.commands.set(Utils.ContextCommandData)

      }
      catch (error)
      {
        console.log(error)
        Utils.ErrorHook(error)
      }

      message.reply({ content: `Successfully reloaded ${Utils.SlashCommandData.length} slash command data!` })
    }
    else if (message.content.toLowerCase() === '!reload' && message.author.id == 780821709263077398) {
      try {
        let count = 0
        let count2 = 0
        let count3 = 0
        let count4 = 0
        //Commands
        const commandFolders = fs.readdirSync('./commands');
        for (const folder of commandFolders) {
          const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
          for (const file of commandFiles) {

            count += 1
            delete require.cache[require.resolve(`../commands/${folder}/${file}`)];

            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.name, command);
          }
        }


        //Buttons
        const btninteraction = fs.readdirSync('./btninteraction').filter(file => file.endsWith('.js'));
        for (const file of btninteraction) {

          count2 += 1

          delete require.cache[require.resolve(`../btninteraction/${file}`)];

          const inti = require(`../btninteraction/${file}`);
          client.btninteraction.set(inti.id, inti);
        }


        //Context
        const contextinteraction = fs.readdirSync('./contextmenus').filter(file => file.endsWith('.js'));
        for (const file of contextinteraction) {

          count4 += 1

          delete require.cache[require.resolve(`../contextmenus/${file}`)];

          const inti = require(`../contextmenus/${file}`);
          client.contextinteraction.set(inti.id, inti);
        }


        //Events
        EventHandler.events.forEach(e => {
          count3 += 1
          client.removeListener(e.name, e.call);
          delete require.cache[require.resolve('../events/' + e.name + '.js')];
        })
        EventHandler.events = [];
        EventHandler.init(client);


        //Utils
        delete require.cache[require.resolve('../modules/utils.js')];
        require('../modules/utils.js')






        const emb = new Discord.MessageEmbed()
        emb.setTitle(":white_check_mark: Pepe successfully reloaded")
        emb.setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
        emb.setTimestamp(new Date())
        emb.addFields(
          { name: "Slash Commands", value: `\`\`\`${count}\`\`\``, inline: true },
          { name: "Button Interactions", value: `\`\`\`${count2}\`\`\``, inline: true },
          { name: "Events", value: `\`\`\`${count3}\`\`\``, inline: true },
          { name: "Context", value: `\`\`\`${count4}\`\`\``, inline: true }
        )

        message.reply({ embeds: [emb] })



      }
      catch (err) {
        message.reply({ content: `Failed reloading: \`\`\`${err}\`\`\`` })
      }

    }
  }
}