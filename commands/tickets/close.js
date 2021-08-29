const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'close',
    permissions: ['MANAGE_CHANNELS'],

	async execute(client, interaction) {
		const ticket = (await client.dbconnection.query("SELECT * FROM tickets WHERE channel_id=?", [interaction.channel.id]))[0]
		if (!ticket) {
		  return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`This channel don't exist in my database!`).setTimestamp(new Date())] })
		}
		let CloseReason
		if (interaction.options.size >= 1) {
		  CloseReason = interaction.options.get('reason').value
		}
		else {
		  CloseReason = "N/A"
		}
		require('../../modules/transcript.js')(interaction.channel.id, CloseReason);
		interaction.channel.delete()
	},
};