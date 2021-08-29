const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const Permissions = Discord.Permissions.FLAGS
const distube = require('../../modules/variables.js').distube


module.exports = {

    
    name: 'music-volume',
    permissions: [],

	async execute(client, interaction) {
        const queue = distube.getQueue(interaction)
        if (!queue) return interaction.channel.send(`There is nothing in the queue right now!`)
        const volume = parseInt(interaction.options.get('volume').value)
        if (isNaN(volume)) return interaction.channel.send(`Please enter a valid number!`)
        distube.setVolume(interaction, volume)

        const emb = new Discord.MessageEmbed()
        emb.setColor(Utils.EmbedColors.Success)
        emb.setTitle(`:white_check_mark: The volume is now updated to: ${volume}%`)
        interaction.reply({embeds: [emb]})

    
    },
};