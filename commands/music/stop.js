const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const distube = require('../../modules/variables.js').distube

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'music-stop',
    permissions: [],

	async execute(client, interaction) {
        const queue = distube.getQueue(interaction)
        if (!queue) return interaction.channel.send(`There is nothing in the queue right now!`)
        distube.stop(interaction)

        const emb = new Discord.MessageEmbed()
        emb.setColor(Utils.EmbedColors.Success)
        emb.setTitle(":white_check_mark: The voice stream is now stopped!")
        interaction.reply({embeds: [emb]})

    },
};