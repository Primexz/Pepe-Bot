const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'ticketmanager_checksettings',
  permissions: ['ADMINISTRATOR'],

  async execute(client, interaction) {
    const databaseinfo = (await client.dbconnection.query("SELECT * FROM ticket_setup WHERE guild=?", [interaction.guild.id]))[0]

    if (!databaseinfo) {
      return interaction.channel.send({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`Uhm, there aren't any settings yet in the database!`).setTimestamp(new Date())] })
    }
    interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setDescription(`Ticket-Category: <#${databaseinfo.category}>\nSupport Role: <@&${databaseinfo.sup_role_id}>\nWelcome Message: \`\`\`${databaseinfo.welcome_msg}\`\`\``).setTitle(interaction.guild.name + ` - Ticket Settings`).setTimestamp(new Date())], ephemeral: true })


  },
};