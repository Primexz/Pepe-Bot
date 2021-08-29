const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'help_giveaway',

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
    emb.setTitle(`**___Giveaway___ Commands/Features**`)
    emb.setColor(Utils.EmbedColors.Default)
    emb.setDescription(`
    :gear: **__Commands__**
    > \`\`gcreate\`\` - Start the setup of a new giveaway
    > \`\`gstop\`\` - Stop a giveaway that has already started
    > \`\`glist\`\` - Get an overview, of all giveaways
    > \`\`greroll\`\` - Choose randomly a new winner
    > \`\`gdelete\`\` - Delete an existing giveaway



    :closed_lock_with_key: **__Features__**
    > **HTML Based Timer** 
    > **Win Chance Calculation** 
    > **Modern entry with buttons, no reactions** 
    > **Requirements (soon)** 
    `)
    emb.setFooter("Pepe Discord Bot\nMade by Prime(aka Johann)", client.user.displayAvatarURL({ dynamic: true }))
    emb.setTimestamp(new Date())


    interaction.message.edit({ components: [row], embeds: [emb] })



  },
};