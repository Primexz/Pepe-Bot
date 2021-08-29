const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'warncount',
    permissions: ['VIEW_GUILD_INSIGHTS'],

    async execute(client, interaction) {

        let user; 
        
        try {
             user = await interaction.guild.members.fetch(interaction.options.get('user').value)
        }
        catch{
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("I wasn't able to fetch this user on your guild!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }




        if (user.user.bot == true)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`You can't check bots!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })





        const warncount = (await client.dbconnection.query("SELECT * FROM punishments WHERE user=? AND guild =? AND type = ?", [user.id, interaction.guild.id, "warn"])).length




        interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Default).setAuthor(`${user.user.username} - Warnings`, user.user.displayAvatarURL({ dynamic: true })).setDescription(`<@${user.id}> has a total of **${warncount}** warnings at the moment.`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })




    }
};