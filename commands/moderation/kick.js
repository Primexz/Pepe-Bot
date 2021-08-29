const Utils = require("../../modules/utils.js");
const Discord = require('discord.js');

const Permissions = Discord.Permissions.FLAGS

module.exports = {


    name: 'kick',
    permissions: ['KICK_MEMBERS'],

    async execute(client, interaction) {

        let user; 
        
        try {
             user = await interaction.guild.members.fetch(interaction.options.get('user').value)
        }
        catch{
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("I wasn't able to fetch this user on your guild!").setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })
        }


        const reason = await interaction.options.get('reason').value


        const silent = await interaction.options.get('silent').value




        if (user.user.bot == true)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`You can't punish bots!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })

        if (user.id == interaction.member.id)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`Uhm, you can't punish yourself.. :=)`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })


        if (user.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("You cannot kick this user!").addField("__Your highest role position__", `${interaction.member.roles.highest.position}`, true).addField(`__${user.user.username}'s highest role position__`, `${user.roles.highest.position}`, true).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })


        if (interaction.guild.me.roles.highest.position <= user.roles.highest.position)
            return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle(`I can't kick this user because ${user.user.username} highest role is higher than my highest role!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())] })







        if(silent.toString().toLowerCase() == "false")
            await user.user.send({embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Error).setTitle("Kicked :=(").setDescription(`Uh no, you got **kicked** on **${interaction.guild.name}!**\n\n**Reason:** ${reason}\n**Executor:** <@${interaction.member.id}> (${interaction.user.tag})`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})


        user.kick(reason);


        let punishment = {
            type: "kick",
            user: user.id,
            tag: user.user.tag,
            reason: reason,
            time: interaction.createdAt.getTime(),
            executor: interaction.member.id,
            length: null,
            guild: interaction.guild.id,

          }


          interaction.reply({embeds: [new Discord.MessageEmbed().setColor(Utils.EmbedColors.Success).setTitle("User punished!").setDescription(`<@${user.id}> (${user.id}) has been successfully kicked by <@${interaction.member.id}>!`).setFooter("Pepe Discord Bot", client.user.displayAvatarURL({ dynamic: true })).setTimestamp(new Date())]})

          
        await Utils.addPunishment(punishment)

        
    



    }
};