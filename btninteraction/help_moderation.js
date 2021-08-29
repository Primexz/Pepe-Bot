const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'help_moderation',

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
    emb.setTitle(`**___Moderation___ Commands**`)
    emb.setColor(Utils.EmbedColors.Default)
    emb.setDescription(`
    :gear: **__Commands__**
    > \`\`ban\`\` - Ban a member from your server
    > \`\`tempban\`\` - Ban a member from your server for a certain time
    > \`\`kick\`\` - Kick a member from your server
    > \`\`ban-list\`\` - Get an overview of all bans in the past
    > \`\`warn\`\` - Caution a member
    > \`\`warncount\`\` - Get the number of times a member was warned
    > \`\`lock\`\` - Forbid all people to write in the current channel
    > \`\`unlock\`\` - Allow all people to write in the current channel
    > \`\`unban\`\` - Unban a member from your server
    > \`\`topic\`\` - Set the topic for your current channel
    > \`\`clear\`\` - Delete a certain number of messages
    > \`\`history\`\` - View all violations of a member
    > \`\`slowmode\`\` - Set the raid limit. in which users are allowed to write
    `)
    emb.setFooter("Pepe Discord Bot\nMade by Prime(aka Johann)", client.user.displayAvatarURL({ dynamic: true }))
    emb.setTimestamp(new Date())


    interaction.message.edit({ components: [row], embeds: [emb] })



  },
};