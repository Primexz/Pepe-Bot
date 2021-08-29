const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'ticketmanager_openpanel',
  permissions: ['ADMINISTRATOR'],

  async execute(client, interaction) {
    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('ticket_open')
          .setLabel('Create an Ticket')
          .setStyle('PRIMARY')
          .setEmoji('🖱️')
      )


    const embed = new Discord.MessageEmbed()
      .setColor(Utils.EmbedColors.Default)
      .setTitle(`${interaction.guild.name} - Tickets`)
      .setDescription('> Click on the button, below this embed, to create an new ticket!')
      .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp(new Date());




    await interaction.channel.send({ embeds: [embed], components: [row] });
    interaction.deferUpdate()


  },
};