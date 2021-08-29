const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'add',
    permissions: ['MANAGE_CHANNELS'],

	async execute(client, interaction) {
		const ticket = (await client.dbconnection.query("SELECT * FROM tickets WHERE channel_id=?", [interaction.channel.id]))[0]
		if (!ticket) {
		  return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`This channel don't exist in my database!`).setTimestamp(new Date())] })
		}
		const user = await interaction.guild.members.fetch(interaction.options.get('user').value)
		const AddedUsers = await client.dbconnection.query("SELECT * FROM ticketsaddedusers WHERE ticket=?", [interaction.channel.id])
		if (interaction.channel.members.get(user.user.id) || AddedUsers.map(u => u.user).includes(user.id)) {
		  return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`The user have already access to this ticket!`).setTimestamp(new Date())] })
		}
  
		client.dbconnection.query("INSERT INTO ticketsaddedusers(user, ticket) VALUES(?, ?)", [user.user.id, interaction.channel.id])
  
		await interaction.channel.permissionOverwrites.create(user.user.id, {
		  VIEW_CHANNEL: true, SEND_MESSAGES: true, ADD_REACTIONS: true, READ_MESSAGE_HISTORY: true
		})
		interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle(`Access granted`).setDescription(`<@${user.user.id}> have now access to this ticket!`).setTimestamp(new Date())] })
	},
};