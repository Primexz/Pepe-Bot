const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'remove',
    permissions: ['MANAGE_CHANNELS'],

	async execute(client, interaction) {
		const ticket = (await client.dbconnection.query("SELECT * FROM tickets WHERE channel_id=?", [interaction.channel.id]))[0]
      if (!ticket) {
        return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`This channel don't exist in my database!`).setTimestamp(new Date())] })
      }
      const user = await interaction.guild.members.fetch(interaction.options.get('user').value)
      const AddedUsers = await client.dbconnection.query("SELECT * FROM ticketsaddedusers WHERE ticket=?", [interaction.channel.id])
      if (!AddedUsers.map(u => u.user).includes(user.id) && !interaction.channel.members.get(user.id)) {
        return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`The user have no access to this ticket!`).setTimestamp(new Date())] })
      }

      client.dbconnection.query("DELETE FROM ticketsaddedusers WHERE ticket=? AND user=?", [interaction.channel.id, user.user.id])

      await interaction.channel.permissionOverwrites.create(user.user.id, {
        VIEW_CHANNEL: null, SEND_MESSAGES: null, ADD_REACTIONS: null, READ_MESSAGE_HISTORY: null
      })

      interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle(`Access removed!`).setDescription(`<@${user.user.id}> don't have access to this ticket now!`).setTimestamp(new Date())] })
	},
};