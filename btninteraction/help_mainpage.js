const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'help_mainpage',

  async execute(client, interaction) {

    interaction.deferUpdate()


    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId(`help_security`)
          .setLabel('Security')
          .setEmoji("🔒")
          .setStyle('PRIMARY'))
      .addComponents(
        new Discord.MessageButton()
          .setCustomId(`help_tickets`)
          .setLabel('Ticket')
          .setEmoji("🎟️")
          .setStyle('PRIMARY'))
      .addComponents(
        new Discord.MessageButton()
          .setCustomId(`help_moderation`)
          .setEmoji('👮')
          .setLabel('Moderation')
          .setStyle('PRIMARY'))
      .addComponents(
        new Discord.MessageButton()
          .setCustomId(`help_nsfw`)
          .setEmoji('🔞')
          .setLabel('NSFW')
          .setStyle('PRIMARY'))
      ;


    const row2 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId(`help_giveaway`)
          .setLabel('Giveaway')
          .setEmoji("🎉")
          .setStyle('PRIMARY'))
      .addComponents(
        new Discord.MessageButton()
          .setCustomId(`help_fun`)
          .setLabel('Fun')
          .setEmoji("✨")
          .setStyle('PRIMARY'))
      .addComponents(
        new Discord.MessageButton()
          .setCustomId(`help_music`)
          .setLabel('Music')
          .setEmoji("🎵")
          .setStyle('PRIMARY'))
      .addComponents(
        new Discord.MessageButton()
          .setCustomId(`help_other`)
          .setEmoji("🗂️")
          .setLabel('Other')
          .setStyle('PRIMARY'))
      .addComponents(
        new Discord.MessageButton()
          .setCustomId(`help_admin`)
          .setLabel('🛠 Admin')
          .setStyle('PRIMARY'))
      ;



    const emb = new Discord.MessageEmbed()
    emb.setTitle(`Help Menu for ___Pepe___, the discord bot`)
    emb.setColor(Utils.EmbedColors.Default)
    emb.setDescription(`
:bulb: **__Features__**
> 🌐 **One of the most important features** of **Pepe** is the **dashboard**. On our **dashboard** you can fully configure the bot.
> 
> :closed_lock_with_key: **Pepe** offers you one of the **strongest security systems on Discord**, including **raid protection** and **much more**.
> 
> :tickets: **Pepe** also offers you a very good **ticket system** to make the life of their supporters and users easier. With features like **custom embed messages**, but also **Cloud HTML transcripts**, you can customize the system to your needs!
> 
> :police_officer: Your **moderators** are also taken care of! Pepe offers your **moderators** a **full spectrum** of **commands** they need!

> :point_right: **And much much more..** Pepe offers much **much more useful features**. To explore them click through all categories and commands using the **buttons below this message**!

__**Useful links**__
[Dashboard](http://dash.pepebot.info/) | [Invite Pepe](https://google.de) | [Support Server](https://google.de) | [Vote](https://google.de)
`)
    emb.setFooter("Pepe Discord Bot\nMade by Prime(aka Johann)", client.user.displayAvatarURL({ dynamic: true }))
    emb.setTimestamp(new Date())


    interaction.message.edit({ components: [row, row2], embeds: [emb] })



  },
};