const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'new',
    permissions: [],

	async execute(client, interaction) {
		await Utils.createTicket(interaction)
	},
};