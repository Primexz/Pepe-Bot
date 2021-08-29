const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    id: 'toggle_spam',
    permissions: ['ADMINISTRATOR'],

	async execute(client, interaction) {

    const databaseinfo = (await client.dbconnection.query("SELECT * FROM SecurityFeatures WHERE guild=?", [interaction.guild.id]))[0]
    if (databaseinfo) {
      client.dbconnection.query("UPDATE SecurityFeatures SET spam=? WHERE guild=?", [databaseinfo.spam ? 0 : 1, interaction.guild.id])
      await Utils.basic_security_menu(interaction)
      await interaction.reply({ content: `Successfully toggled Anti Spam ${databaseinfo.spam ? "off" : "on"}`, ephemeral: true })
    }
    
    },
};