const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'help_tickets',

  async execute(client, interaction) {

    interaction.deferUpdate()


    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId(`help_mainpage`)
          .setLabel('<<')
          .setStyle('SECONDARY'))
      ;



    const emb = new Discord.MessageEmbed()
    emb.setTitle(`**___Ticket___ Commands/Features**`)
    emb.setColor(Utils.EmbedColors.Default)
    emb.setDescription(`
    :gear: **__Commands__**
    > \`\`new\`\` - Create an new ticket
    > \`\`close\`\` - Close an ticket
    > \`\`closeall\`\` - Close all tickets on your server
    > \`\`ticket-manager\`\` - Create Embed Opening Panel, Check your Ticket Settings, Reset all Settings
    > \`\`tban\`\` - Bans an user from opening tickets
    > \`\`add\`\` - Give a user access to a ticket
    > \`\`remove\`\` - Remove a user access to a ticket

    :closed_lock_with_key: **__Features__**
    > **Cloud based HTML Transcripts** (DM to the user and/or to an custom channel)
    > **Custom Embed configuration** on the [dashboard](https://dash.pepebot.info/)
    > **Ticket Bans** (ban user from opening tickets)
    > **Close all tickets**
    > **Automatic ticket close**, if the user leaves your server (configure on the [dashboard](https://dash.pepebot.info/)
    > **Custom Supporter Role** (configure on the [dashboard](https://dash.pepebot.info/)
    `)
    emb.setFooter("Pepe Discord Bot\nMade by Prime(aka Johann)", client.user.displayAvatarURL({ dynamic: true }))
    emb.setTimestamp(new Date())


    interaction.message.edit({ components: [row], embeds: [emb] })



  },
};