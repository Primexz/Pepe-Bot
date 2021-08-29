const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const distube = require('../../modules/variables.js').distube
const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'music-resume',
    permissions: [],

	async execute(client, interaction) {
        const queue = distube.getQueue(interaction)
        if (!queue) return interaction.reply({content: `There is nothing in the queue right now!`})
        distube.resume(interaction)  

        const emb = new Discord.MessageEmbed()
        emb.setColor(Utils.EmbedColors.Success)
        emb.setTitle(":white_check_mark: Resumed music stream!")
        interaction.reply({embeds: [emb]})

    },
};