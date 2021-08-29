const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    id: 'toggle_mention',
    permissions: ['ADMINISTRATOR'],

	async execute(client, interaction) {
    const databaseinfo = (await client.dbconnection.query("SELECT * FROM SecurityFeatures WHERE guild=?", [interaction.guild.id]))[0]
    if (databaseinfo) {
      client.dbconnection.query("UPDATE SecurityFeatures SET massmention=? WHERE guild=?", [databaseinfo.massmention ? 0 : 1, interaction.guild.id])
      await Utils.basic_security_menu(interaction)
      await interaction.reply({ content: `Successfully toggled Anti Mass Mention ${databaseinfo.massmention ? "off" : "on"}`, ephemeral: true })
    }
    
    
    },
};