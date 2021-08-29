const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');
const distube = require('../../modules/variables.js').distube

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'music-skip',
    permissions: [],

	async execute(client, interaction) {
        const queue = distube.getQueue(interaction)
        if (!queue) return interaction.channel.send(`There is nothing in the queue right now!`)
        try {
            await distube.skip(interaction)

            const emb = new Discord.MessageEmbed()
            emb.setColor(Utils.EmbedColors.Success)
            emb.setTitle(`:white_check_mark: Skipped the song! Now playing:\n${queue.songs[0].name}`)
            interaction.reply({embeds: [emb]})
        } catch (e) {

            const emb = new Discord.MessageEmbed()
            emb.setColor(Utils.EmbedColors.Error)
            emb.setTitle(`:x: An error occured`)
            emb.setDescription(`\`\`\`${e}\`\`\``)
            interaction.reply({embeds: [emb]})
        }
    },
};