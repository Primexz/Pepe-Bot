const Utils = require("../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


  id: 'ticket_open',

  async execute(client, interaction) {
    await Utils.createTicket(interaction)


  },
};