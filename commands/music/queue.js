const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const distube = require('../../modules/variables.js').distube

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'music-queue',
    permissions: [],

	async execute(client, interaction) {
        const queue = distube.getQueue(interaction)
        if (!queue) return interaction.channel.send(`There is nothing playing!`)
        console.log(queue)
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
        interaction.channel.send(`**Server Queue**\n${q}`)
    },
};