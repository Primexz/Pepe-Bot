const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'glist',
    permissions: ['MANAGE_MESSAGES', 'MANAGE_GUILD'],

    async execute(client, interaction) {
       

        const page = interaction.options.get('page') ? parseInt(interaction.options.get('page').value) : 1




        
        let giveaways = await client.dbconnection.query("SELECT * FROM giveaways WHERE guild = ?", [interaction.guild.id])

        let descriptionn = "";




        giveaways.sort((a, b) => b.end - a.end).slice((page - 1) * 5, 5 * page).map((g, i) => {
         
          let status = g.ended ? `**Ended**` : g.end < new Date() ? `**Ended**` : `Ending in **${Utils.getTimeDifference(new Date(), new Date(g.end))}**`



          descriptionn += `🎉 **__Giveaway ${i + 1 + (page - 1) * 5}__**\n> Name: **${g.name}**\n> Channel: <#${g.channel}>\n> Creator: <@${g.creator}>\n> Status: ${status}\n> Winnercount: **${g.winnercount}**\n\n`
        })


        

        const pagecount = Math.ceil(giveaways.length / 5)
        if(page > pagecount || page <= 0)
            return interaction.reply({content: "Invalid page count."})



        


        const embed = new Discord.MessageEmbed()
        .setColor(Utils.EmbedColors.Default)
        .setDescription(descriptionn)
        .setAuthor(`Giveaways on ${interaction.guild.name} | Page: (${page}/${Math.ceil(giveaways.length / 5)})`, interaction.guild.iconURL())
        .setTimestamp(new Date())
        .setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true }))

        interaction.reply({embeds: [embed]})

    }
};