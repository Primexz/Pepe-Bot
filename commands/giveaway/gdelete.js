const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'gdelete',
    permissions: ['MANAGE_MESSAGES', 'MANAGE_GUILD'],

    async execute(client, interaction) {

        const giv_id = interaction.options.get('giveawaymessageid').value

        const giveaway = (await client.dbconnection.query("SELECT * FROM giveaways WHERE messageID = ? AND guild = ?", [giv_id, interaction.guild.id]))[0]


        if (!giveaway || giveaway.guild != interaction.guild.id)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`This giveaway don't exist in my database!`).setTimestamp(new Date())] })



        //Delete Giveaway
        interaction.guild.channels.cache.get(giveaway.channel)
            .messages.fetch(giveaway.messageID)
            .then(msg => msg.delete()).catch(err => { });

        await client.dbconnection.query("DELETE FROM giveaways WHERE messageID = ? AND guild = ?", [giv_id, interaction.guild.id])
        interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle(`Giveaway: ${giv_id} deleted.`).setTimestamp(new Date())] })


    },
};