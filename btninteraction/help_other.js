const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'help_other',

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
    emb.setTitle(`**___Other___ Commands**`)
    emb.setColor(Utils.EmbedColors.Default)
    emb.setDescription(`
    :gear: **__Commands__**
    > \`\`profile\`\` - Show the profile of you, or of a user
    > \`\`invites\`\` - See how many invites a user has
    > \`\`invitestop\`\` - Get an overview, from the best inviters
    > \`\`help\`\` - Open the help menu
    > \`\`weather\`\` - Check the weather, from a specific location 
    > \`\`uptime\`\` - Check the uptime of Pepe
    > \`\`ping\`\` - Check the delays of Pepe
    > \`\`meme\`\` - Create a new meme
    > \`\`mcuser\`\` - Get information about a Minecraft user
    > \`\`google\`\` - Ask google for something
    > \`\`encode\`\` - Encode a text to binary
    > \`\`decode\`\` - Encode a binary string to an readable string
    > \`\`dashboard\`\` - Get the URL to the dashboard
    > \`\`covidstaats\`\` - See information about Corona
    > \`\`botinfo\`\` - Get a great overview, about the bot
    > \`\`avatar\`\` - Get the avatar from a user
    > \`\`addmemoji\`\` - Add an emoji from another server to yours

    `)
    emb.setFooter("Pepe Discord Bot\nMade by Prime(aka Johann)", client.user.displayAvatarURL({ dynamic: true }))
    emb.setTimestamp(new Date())


    interaction.message.edit({ components: [row], embeds: [emb] })



  },
};