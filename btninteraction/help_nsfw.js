const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'help_nsfw',

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
    emb.setTitle(`**___NSFW___ Commands**`)
    emb.setColor(Utils.EmbedColors.Default)
    emb.setDescription(`

    **IMPORTANT:** **__ONLY USE THIS COMMANDS, IF YOU ARE OLDER THEN 18!__**

    
    :gear: **__Commands__**
    > \`\`boobs\`\` - Get an b^^^^ picture or gif from reddit
    > \`\`anal\`\` - Get an a^^^ picture or gif from reddit
    > \`\`oral\`\` - Get an o^^^ picture or gif from reddit
    > \`\`penis\`\` - Get an p^^^ picture or gif from reddit
    > \`\`pussy\`\` - Get an p^^^ picture or gif from reddit
    `)
    emb.setFooter("Pepe Discord Bot\nMade by Prime(aka Johann)", client.user.displayAvatarURL({ dynamic: true }))
    emb.setTimestamp(new Date())


    interaction.message.edit({ components: [row], embeds: [emb] })



  },
};