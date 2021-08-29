const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'unban',
    permissions: ['BAN_MEMBERS'],

    async execute(client, interaction) {




        let userID = await interaction.options.get('user').value


        const bans = await interaction.guild.bans.fetch();



        if(isNaN(userID))
             return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("Input an valid user-id (INTEGER)!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })




        let userr = bans.get(userID) || bans.find(ban => ban.user.id == userID);



        if (userr) {
            await interaction.guild.members.unban(userr.user.id, `Unbanned by ${interaction.user.tag}`)

            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle("User unbanned").setDescription(`<@${userr.user.id}> (${userr.user.id}) has been succesfully unbanned!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        } return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("This user don't exist, or isn't banned!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })


    }
};