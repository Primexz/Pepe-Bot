const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'ticket-manager',
    permissions: ['ADMINISTRATOR'],

	async execute(client, interaction) {
        const databaseinfo = (await client.dbconnection.query("SELECT * FROM ticket_setup WHERE guild=?", [interaction.guild.id]))[0]





        const row = new Discord.MessageActionRow()
  
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('ticketmanager_checksettings')
              .setLabel('Check Settings')
              .setStyle('PRIMARY')
              .setDisabled(databaseinfo && databaseinfo.sup_role_id != null ? false : true)
              .setEmoji('⚙️'))
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('ticketmanager_setup_reset')
              .setLabel('Reset Setup')
              .setStyle('PRIMARY')
              .setDisabled(databaseinfo && databaseinfo.sup_role_id != null ? false : true)
              .setEmoji('🚫')
          );
  
        const row2 = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('ticketmanager_openpanel')
              .setLabel('Create Ticket Opening Panel')
              .setStyle('PRIMARY')
              .setDisabled(databaseinfo && databaseinfo.sup_role_id != null ? false : true)
              .setEmoji('🖱️')
          )
  
  
        const embed = new Discord.MessageEmbed()
          .setColor(Utils.EmbedColors.Default)
          .setTitle('Pepe - Ticket Manager')
          .setDescription('Here you can manage the ticket system of Pepe Bot.\n\nTo set up the ticket system properly go to the [Dashboard](https://dashboard.pepebot.info) , to set up the system with your own messages and channels!')
          .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp(new Date());
  
  
  
  
  
        await interaction.reply({ embeds: [embed], components: [row, row2] });
	},
};