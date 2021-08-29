const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'help_music',

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
    emb.setTitle(`**___Music___ Commands**`)
    emb.setColor(Utils.EmbedColors.Default)
    emb.setDescription(`
    :gear: **__Commands__**
    > \`\`play\`\` - Play a song from Youtube, or Spotify
    > \`\`pause\`\` - Pause the current song
    > \`\`filter\`\` - Manage all sound filters
    > \`\`queue\`\` - Get an overview of all songs
    > \`\`volume\`\` - Set volume of the music stream
    > \`\`resume\`\` - Restart song after it was stopped
    > \`\`skip\`\` - Skip the current song
    > \`\`stop\`\` - Stop the current song
    `)
    emb.setFooter("Pepe Discord Bot\nMade by Prime(aka Johann)", client.user.displayAvatarURL({ dynamic: true }))
    emb.setTimestamp(new Date())


    interaction.message.edit({ components: [row], embeds: [emb] })



  },
};