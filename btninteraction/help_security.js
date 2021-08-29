const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'help_security',

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
    emb.setTitle(`**___Security___ Commands/Features**`)
    emb.setColor(Utils.EmbedColors.Default)
    emb.setDescription(`
    :gear: **__Commands__**
    > \`\`verify\`\` - Send the verification message (configure on the [dashboard](https://dash.pepebot.info/)
    > \`\`automod\`\` - Configure security features, or on the [dashboard](https://dash.pepebot.info/)

    :closed_lock_with_key: **__Features__**
    > **Anti Advertise** (configure on the [dashboard](https://dash.pepebot.info/))
    > **Anti Spam** (configure on the [dashboard](https://dash.pepebot.info/))
    > **Anti Mass Mention** (configure on the [dashboard](https://dash.pepebot.info/))
    > **Anti Selfbot** (configure on the [dashboard](https://dash.pepebot.info/))
    > **Captcha Verification**
    `)
    emb.setFooter("Pepe Discord Bot\nMade by Prime(aka Johann)", client.user.displayAvatarURL({ dynamic: true }))
    emb.setTimestamp(new Date())


    interaction.message.edit({ components: [row], embeds: [emb] })



  },
};