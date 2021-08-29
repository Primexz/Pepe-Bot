const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {

    
    name: 'avatar',
    permissions: [],

	async execute(client, interaction) {


        
        let user;
        try {
            user = await interaction.guild.members.fetch(interaction.options.get('user').value)
        }
        catch {
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("I wasn't able to fetch this user on your guild!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }


        let avatar = user.user.displayAvatarURL({ dynamic: true });
        if (!avatar.endsWith('?size=2048')) avatar += "?size=2048";

        interaction.reply({embeds: [new Discord.MessageEmbed().setImage(avatar).setURL(avatar).setTitle("👤 Avatar").setColor(Utils.EmbedColors.Success).setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true })).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})
    
    },
};