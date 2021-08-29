const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'help_admin',

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
    emb.setTitle(`**___Admin___ Commands**`)
    emb.setColor(Utils.EmbedColors.Default)
    emb.setDescription(`
    :gear: **__Commands__**
    > \`\`userinfo\`\` - Get information about a user
    > \`\`announce\`\` - Make an annoucment with a premade embed message
    > \`\`usercount\`\` - Check how many users your server has
    > \`\`roleinfo\`\` - Get information about a role
    > \`\`say\`\` - Send your own embed message (Embed Site: [Click Here](https://robyul.chat/embed-creator))
    > \`\`serverinfo\`\` - Get information about your server
    `)
    emb.setFooter("Pepe Discord Bot\nMade by Prime(aka Johann)", client.user.displayAvatarURL({ dynamic: true }))
    emb.setTimestamp(new Date())


    interaction.message.edit({ components: [row], embeds: [emb] })



  },
};