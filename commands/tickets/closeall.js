const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'closeall',
    permissions: ['MANAGE_CHANNELS'],

	async execute(client, interaction) {
		const alltickets = await Utils.getOpenTickets(interaction.guild)

		let CloseReason
		if (interaction.options.size >= 1) {
		  CloseReason = interaction.options.get('reason').value
		}
		else {
		  CloseReason = "N/A"
		}
  
		if (alltickets.size <= 0) {
		  return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`There are no active tickets on this guild in the database`).setTimestamp(new Date())] })
		}
  
		alltickets.forEach(async ch => {
		  const ticket = (await client.dbconnection.query("SELECT * FROM tickets WHERE channel_id=?", [ch.id]))[0]
		  if (!ticket)
			return;
  
		  ch.delete();
		  require('../../modules/transcript.js')(ch.id, CloseReason);
		})
		return interaction.reply({ embeds: [new Discord.MessageEmbed().setFooter(`${alltickets.size} tickets deleted • Pepe Discord Bot`, client.user.displayAvatarURL({ dynamic: true })).setColor(Utils.EmbedColors.Success).setTitle(`All tickets in the database have been successfully deleted!`).setTimestamp(new Date())] })
	},
};