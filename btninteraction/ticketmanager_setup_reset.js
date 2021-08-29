const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    id: 'ticketmanager_setup_reset',
    permissions: ['ADMINISTRATOR'],

	async execute(client, interaction) {
    const databaseinfo = (await client.dbconnection.query("SELECT * FROM ticket_setup WHERE guild=?", [interaction.guild.id]))

    if (!databaseinfo) {
      return interaction.channel.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`Uhm, there aren't any settings yet in the database!`).setTimestamp(new Date())] })
    }


    client.dbconnection.query('DELETE FROM ticket_setup WHERE guild=?', [interaction.guild.id])
    interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`Your settings has been resetted!`).setTimestamp(new Date())] })
    
    
    },
};