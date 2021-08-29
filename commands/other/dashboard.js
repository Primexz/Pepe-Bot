const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'dashboard',
    permissions: [],

	async execute(client, interaction) {
        interaction.reply({content: `Link to the Dashboard: **[Here](https://dash.pepebot.info/)**\nDirect Link: https://dash.pepebot.info/`, ephemeral: true})	},
};