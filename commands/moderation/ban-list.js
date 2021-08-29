const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'ban-list',
    permissions: ['BAN_MEMBERS'],

    async execute(client, interaction) {
        let page = interaction.options.get('page') ? parseInt(interaction.options.get('page').value) : 1

        let bans = await interaction.guild.bans.fetch();
        if (bans.size) {


            let display = await Promise.all(bans.map(async ban => {
                let info = "> **User:** {user}\n> **ID:** {id}\n> **Reason:** {reason}".replace(/{user}/g, ban.user.tag).replace(/{id}/g, ban.user.id).replace(/{reason}/g, ban.reason ? ban.reason : "None")
                let punishmentData = await client.dbconnection.query("SELECT * FROM punishments WHERE user=? AND guild =?", [ban.user.id, interaction.guild.id])
                punishmentData = punishmentData ? punishmentData.filter(punishment => punishment.type == 'ban') : [];

                if (!punishmentData.length) return info
                else {
                    let latestBan = punishmentData.find(punishment => punishment.time == Math.max(...punishmentData.map(punishment => punishment.time)));

                
                    let executor = await interaction.guild.members.fetch(latestBan.executor);

                    return info + (latestBan ? "\n> **Date:** {date}\n> **Banned By:** {executor}\n> **Punishment ID:** {id}".replace(/{date}/g, (new Date(latestBan.time).toLocaleString())).replace(/{executor}/g, executor ? executor : latestBan.executor).replace(/{id}/g, latestBan.id) : "")
                }
            }))

            const length = display.length

            if (page > Math.ceil(display.length / 10))
                page = 1;

            display = display.slice((page - 1) * 10, page * 10)



         
            return interaction.reply({embeds: [new Discord.MessageEmbed().setDescription(display.join("\n\n")).setColor(Utils.EmbedColors.Error).setTitle("⛔ Ban List (Page {current-page}/{max-pages})".replace(/{current-page}/g, page).replace(/{max-pages}/g, Math.ceil(length / 10))).setFooter(`Total: ${length} bans • Pepe Discord Bot`, client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})

        } else {

            interaction.reply({embeds: [new Discord.MessageEmbed().setDescription("There are currently **0** bans in this server!").setColor(Utils.EmbedColors.Error).setTitle("⛔ Ban List").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})


        }

    }
};