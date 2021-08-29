const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'serverinfo',
    permissions: [],

    async execute(client, interaction) {


        let shard = interaction.guild.shard.id




        let GuildChannels = interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT" && !(channel.name.startsWith("ticket-")));
        let tickets = interaction.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT" && (channel.name.startsWith("ticket-")));
        let channels = GuildChannels.map(c => ' <#' + c.id + '>').toString();




        if (channels.length > 1024) {
            while (channels.length > 1024) {
                channels = channels.substring(0, channels.length - 22) + " and more..."
                channels = channels.replace(/<#\s|\s>/gm, '');
            }
        }

        let roles = interaction.guild.roles.cache.map(r => ` <@&${r.id}>`).toString().replace(`<@&${interaction.guild.id}>,`, '');
        if (roles.length > 1024) {
            while (roles.length > 1024) {
                roles = roles.substring(0, roles.length - 22) + " and more..."
                roles = roles.replace(/<@\s|\s>/gm, '');
            }
        }

        const members = await interaction.guild.members.fetch();





        let emojis = interaction.guild.emojis.cache.size ? interaction.guild.emojis.cache.map(emoji => emoji.toString()).join(" ") : "None"
        if (emojis.length > 1024) {
            while (emojis.length > 1024) {
                emojis = emojis.substring(0, emojis.length - 22) + " and more..."
                emojis = emojis.replace(/<#\s|\s>/gm, '');
            }
        }




        const emb = new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setTitle(interaction.guild.name).setThumbnail(interaction.guild.iconURL({ dynamic: true })).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())

        emb.addField("Owner", `<@${interaction.guild.ownerId}>`)
        emb.addField("Created At", interaction.guild.createdAt.toLocaleString())
        emb.addField("Member Count", `${members.filter(m => !m.user.bot).size} humans | ${members.filter(m => m.user.bot).size} bots | ${interaction.guild.memberCount} total`)
        emb.addField("Tickets", tickets.size.toString())
        emb.addField("Shard ID", shard.toString())
        emb.addField(`Text Channels [${GuildChannels.size}]`, channels)
        emb.addField(`Roles [${interaction.guild.roles.cache.size}]`, roles)
        emb.addField(`Emojis [${interaction.guild.emojis.cache.size}]`, emojis)

 



   
        interaction.reply({ embeds: [emb] })


    },
};