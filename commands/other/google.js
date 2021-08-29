const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'google',
    permissions: [],

	async execute(client, interaction) {


        const search = interaction.options.get('search').value
        const link = `https://google.com/search?q=${encodeURIComponent(search)}`


        interaction.reply({embeds: [new Discord.MessageEmbed().setTitle("🔍 Google Search").addField(`Searching Google for '${search}'...`, `[Click Here](${link})`).setColor(Utils.EmbedColors.Default).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})
    
    },
};