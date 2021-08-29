const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'help_fun',

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
    emb.setTitle(`**___Fun___ Commands**`)
    emb.setColor(Utils.EmbedColors.Default)
    emb.setDescription(`
    :gear: **__Commands__**
    > \`\`tictactoe\`\` - Play TicTacToe with a friend
    > \`\`rolldice\`\` - Roll a Dice, get a number between 1-6
    > \`\`rockpaperscissors\`\` - Play RPS with Pepe
    > \`\`asciiart\`\` - Turn a word into ascii art
    > \`\`counting-game\`\` - Create a new counting game, with buttons
    `)
    emb.setFooter("Pepe Discord Bot\nMade by Prime(aka Johann)", client.user.displayAvatarURL({ dynamic: true }))
    emb.setTimestamp(new Date())


    interaction.message.edit({ components: [row], embeds: [emb] })



  },
};